import { useRef, useState, useEffect, MouseEvent } from "react";
import useDoubleClick from "use-double-click";
import useDeviceDetect from "@utils/useDeviceDetect";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//Hooks
// import useMousePosition from "../utils/useMousePosition";
interface CanvasProps {
  removeSelf: (value: boolean) => void;
}

const Canvas: React.FC<CanvasProps> = ({ removeSelf }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  const { isMobile } = useDeviceDetect();

  useDoubleClick({
    onSingleClick: (e) => {
      if (!isMobile) {
        removeSelf(false);
      }
      // removeSelf(false);
    },
    // onDoubleClick: (e) => {
    //   if (isMobile) {
    //     removeSelf(false);
    //   }
    // },
    ref: mountRef,
    latency: 250,
  });

  const touchHandler = (e: any) => {
    e.preventDefault();
    removeSelf(false);
  };

  const vertexShader = `

  attribute float scale;

  void main() {

    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

    gl_PointSize = scale * ( 300.0 / - mvPosition.z );

    gl_Position = projectionMatrix * mvPosition;

  }
  `;

  const fragmentShader = `
  uniform vec3 color;

			void main() {

				if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;

				gl_FragColor = vec4( color, 1.0 );

			}
  `;

  let removeAll = () => {
    // console.log("hi");
  };

  useEffect(() => {
    const SEPARATION = 80;
    const AMOUNTX = 50;
    const AMOUNTY = 50;

    const mount = mountRef.current;
    /**
     * Mouse
     */
    let mouseX: number = 0,
      mouseY: number = 0;

    let particles,
      count = 0;

    let frameId: number;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.001);

    /**
     * Sizes
     */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      1,
      10000
    );
    camera.position.z = 100;
    scene.add(camera);

    /**
     * Galaxy
     */

    const numParticles = AMOUNTX * AMOUNTY;

    const positions = new Float32Array(numParticles * 3);
    const scales = new Float32Array(numParticles);

    let i = 0,
      j = 0;

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        positions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2; // x
        positions[i + 1] = 0; // y
        positions[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2; // z

        scales[j] = 1;

        i += 3;
        j++;
      }
    }

    //Geometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0xeeeedd) },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    //add points

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    /**
     * Mousemovement
     */
    document.addEventListener("mousemove", onPointerMove);

    function onPointerMove(event: PointerEvent) {
      if (event.isPrimary === false) return;

      mouseX = (event.clientX - sizes.width / 2) * 3;
      mouseY = (event.clientY - sizes.height / 2) * 3;
    }

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /**
     * Controls
     */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    /**
     * Animate
     */
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime: number = clock.getElapsedTime();

      //Rotate
      // particles.rotation.x = elapsedTime / 128;
      // controls.update();
      if (isMobile) {
        controls.update();
      }

      // Render
      render();

      // Call tick again on the next frame
      frameId = window.requestAnimationFrame(tick);
    };

    const render = () => {
      camera.position.x += (mouseX - camera.position.x) * 0.005;
      camera.position.y += (-mouseY - camera.position.y) * 0.005;
      camera.lookAt(scene.position);

      const positions = particles.geometry.attributes.position.array;
      const scales = particles.geometry.attributes.scale.array;

      let i = 0,
        j = 0;

      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          positions[i + 1] =
            Math.sin((ix + count) * 0.3) * 50 +
            Math.sin((iy + count) * 0.5) * 50;

          scales[j] =
            (Math.sin((ix + count) * 0.3) + 1) * 20 +
            (Math.sin((iy + count) * 0.5) + 1) * 20;

          i += 3;
          j++;
        }
      }

      particles.geometry.attributes.position.needsUpdate = true;
      particles.geometry.attributes.scale.needsUpdate = true;

      renderer.render(scene, camera);

      count += 0.05;
    };

    const start = () => {
      if (!frameId) {
        frameId = requestAnimationFrame(tick);
      }
    };

    const stop = () => {
      cancelAnimationFrame(frameId);
      frameId = null;
    };

    //Remove all
    removeAll = () => {
      stop();
      // console.log(mount);

      mount.removeChild(renderer.domElement);

      scene.remove(particles);
      geometry.dispose();
      material.dispose();
      // Callback to cleanup three js, cancel animationFrame, etc
      // mountRef.current.removeChild(renderer.domElement);
    };

    /**
     * Setup
     */
    mount.appendChild(renderer.domElement);
    start();

    // console.log(mountRef.current);

    return () => {
      stop();
      // console.log(mount);

      mount.removeChild(renderer.domElement);

      scene.remove(particles);
      geometry.dispose();
      material.dispose();
      // Callback to cleanup three js, cancel animationFrame, etc
    };
  }, [mountRef.current]);

  return (
    <>
      <div
        ref={mountRef}
        onTouchEnd={touchHandler}
        style={{ position: "fixed", top: 0, left: 0, zIndex: 2, opacity: 1 }}
      ></div>
      {/* <div className="center-logo" onClick={removeAll}>
        CLICK ME
      </div> */}
    </>
  );
};

export default Canvas;
