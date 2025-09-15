import React from "react";
import Head from "next/head";
import Image from "next/image";

//Components
import CenterContainer from "@components/UX/CenterContainer/CenterContainer";

//hooks
import useFetchContent from "@utils/useFetchContent";

const Menu = ({ menuImage }) => {
  
  return (
    <>
       <Head>
        <title>NOCTURN [05] feat. Richie Culver</title>

        {/* Put ALL css in ONE node */}
        <style jsx global>{`
          html {
            overflow: auto !important;
            overflow-x: hidden !important;
          }
          body {
            background: url("/images/nocturn/nocturn-05/noise_bg.png") repeat #000 !important;
            background-color: #000000;
            overflow: auto !important;
            overflow-x: initial !important;
            background-repeat: repeat;
            background-size: 50px 50px;
          }
          .nocturn { width: 60%; margin: 0 auto; }
          .nocturn-header { width: 50%; margin: 0 auto; }
          .nocturn-wider-section { width: 60%; margin: 0 auto; }
          .video-section { width: 80%; margin: 0 auto 30px auto; }
          .row { display: flex; flex-wrap: wrap; padding: 0 4px; }
          .column { flex: 50%; max-width: 50%; padding: 0 4px; }
          .single .row,
          .video-section .row { justify-content: center; align-items: center; }
          .single .column { flex: 80%; max-width: 80%; }
          .video-section .column { flex: 60%; max-width: 60%; }
          .audio { margin-top: 30px; }
          video { width: 100% !important; max-width: 100% !important; }
          .column img {
            margin-top: 8px; vertical-align: middle; width: 100%;
            border: 5px solid #000; outline: 2px solid #fff; outline-offset: 0; display: inline-block;
          }
          .column a { cursor: pointer !important; }
          .top { font-size: 30px; }
          .bottom { font-size: 25px; }
          a:hover { text-decoration: underline !important; }
          .caption { font-size: 20px !important; margin: 20px auto 30px auto !important; text-align: center !important; max-width: 90% !important; }
          audio { margin-top: 8px !important; width: 100% !important; }
          .nocturn-text-wrapper { margin-top: 20px !important; padding: 0 30px; }
          .nocturn-text-wrapper small { margin-left: 10px; font-size: 20px; }
          .nocturn-text-wrapper img { max-width: 100%; margin-bottom: 40px !important; display: block; margin-left: auto; margin-right: auto; }
          .nocturn-text { font-family: Helvetica !important; font-weight: bold !important; text-decoration: none !important; color: #ffffff !important; padding-bottom: 30px; line-height: 1.1; }
          .nocturn-text { padding-bottom: 20px; }
          .nocturn-text-two { padding-top: 20px; }
          .nocturn-text-author { padding-top: 20px; }
          .question { color: #000000 !important; font-style: italic; }
          .italic { font-style: italic !important; }
          .loading { font-size: 50px; text-align: center; }
          .flyer { max-width: 100% !important; margin: 0 auto !important; display: block; }
          .preloader { margin: 30px 0 10px 0 !important; }
          .spacing { margin-top: 30px !important; }
          .live { border-top: 5px solid #000; padding-top: 20px; border-bottom: 5px solid #000; margin-bottom: 40px; text-align: center; }

          /* Spotify CTA */
          :root { --cta-bg: #a5a5a5; --cta-fg: #1d1c1b; --radius: 10px; }
          .container { width: min(900px, 92vw); margin: 10vh auto; }
          .spotify-btn {
            width: 100%; display: inline-flex; align-items: center; justify-content: center; gap: 12px;
            padding: 14px 20px; background: var(--cta-bg); color: var(--cta-fg);
            border-radius: var(--radius); text-decoration: none;
            font: 700 16px/1.2 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
            transition: filter .15s ease, transform .02s ease;
          }
          .spotify-btn:hover { filter: brightness(0.95); }
          .spotify-btn:active { transform: translateY(1px); }
          .spotify-btn:focus-visible { outline: 3px solid rgba(29, 28, 27, 0.35); outline-offset: 2px; }
          .spotify-icon { width: 1.4em; height: 1.4em; flex: 0 0 auto; fill: currentColor; }

          @media (max-width: 768px) {
            .nocturn { margin-top: 30px; width: 90%; }
            .spacing { margin-top: 15px !important; }
            .video-section .column { flex: 100%; max-width: 100%; margin-bottom: 7px; }
            .caption { font-size: 15px !important; margin-top: 10px !important; }
            .audio .caption { margin-top: 30px !important; }
            .preloader { margin: 15px 0 -15px 0 !important; }
            .nocturn-text-two { padding-top: 10px; }
            .nocturn-wider-section { width: 90%; }
            .nocturn-text-wrapper { padding: 0 15px; }
            .top p { font-size: 20px; }
            .bottom p { font-size: 15px; }
            .nocturn-text-wrapper small { font-size: 12px !important; margin-left: 5px !important; }
            .row { padding: 0 !important; }
            .column { flex: 50%; max-width: 50%; }
            .spotify-btn { padding: 12px 16px; font-size: 15px; }
          }
        `}</style>
      </Head>
      
         <div className="nocturn nocturn-header">
           <img src="/images/nocturn/nocturn-05/nocturn5-web-page-top.png" alt="Nocturn" width="100%" />
           <img className="flyer" src="/images/nocturn/nocturn-05/17LPS_Nocturn_5_Richie_Culver.gif" /> 
           
           <div className="nocturn-text-wrapper top"> 
            <br/> 
              <p className="nocturn-text italic">For Nocturn [05] feat. Richie Culver, Little Portland Street is re-imagined as an architecture of disclosure – a space where rawness and repetition, doubt and distortion, are not only textures of experience but conditions of being.</p>

              <p className="nocturn-text italic">Working across sound, text, video and painting, Richie Culver’s practice bridges the emotional pressure zones of techno, noise and visual art. In this Nocturn, the club is not sanctuary or spectacle–but a confessional zone, where unfiltered emotional states, (un)satisfactory attempts at catharsis, and vulnerability are given space to surface, loop and unravel.</p>

              <p className="nocturn-text italic">Merging the artists’ studio as a site of solitary creative expression and the nightclub as locus of collective resonance and shared rhythms, Culver peels back the layers of his own experiences and lived worlds–from trap houses to Berlin raves to fashion and “high art” contexts–making visible an emergent, complex and unapologetic terrain of intimacy and unease.</p>

              <p className="nocturn-text italic">Excavating in the liminality between the public and the private, high and low, fear and love, confession and concealment, Culver conveys the unresolved, constantly transforming realm of the personal. Nothing may be resolved, but something held and heard–suspended–like the hypnotic tension before the beat finally drops.</p>

              <p className="nocturn-text nocturn-text-author italic">Bianca Chu</p>
               <br/> 
            </div>
           </div>

                <div className="nocturn-wider-section video-section">
                 <div className="row">
                    <div className="column"> 
                        <video autoPlay loop muted playsInline className="video-background">
                        <source src="/images/nocturn/nocturn-05/video_01.mp4" type="video/mp4"/> 
                      </video>
                      <p className="nocturn-text italic caption">Caption goes here!</p>
                      </div>
                   </div>
                  
                  <div className="row">
                    <div className="column"> 
                        <video autoPlay loop muted playsInline className="video-background">
                        <source src="/images/nocturn/nocturn-05/video_02.mp4" type="video/mp4"/> 
                      </video>
                      <p className="nocturn-text italic caption">Caption goes here!</p>
                      </div>
                   </div>

                   <div className="row">
                    <div className="column">
                        <video autoPlay loop muted playsInline className="video-background">
                        <source src="/images/nocturn/nocturn-05/video_03.mp4" type="video/mp4"/> 
                      </video>  
                       <p className="nocturn-text italic caption">Caption goes here!</p>
                      </div>
                   </div>

                  <div className="row">
                    <div className="column"> 
                        <video autoPlay loop muted playsInline className="video-background">
                        <source src="/images/nocturn/nocturn-05/video_04.mp4" type="video/mp4"/> 
                      </video>  
                      <p className="nocturn-text italic caption">Caption goes here!</p>
                      </div>
                   </div>
                  <br/> 
                </div>
      
            <div className="nocturn">
                <div className="row">
                  <div className="column">
                    <img src="/images/nocturn/nocturn-05/img_01.jpg" />
                    <img src="/images/nocturn/nocturn-05/img_02.jpg" />
                    <img src="/images/nocturn/nocturn-05/img_03.jpg" />
                    <img src="/images/nocturn/nocturn-05/img_04.jpg" />
                    <img src="/images/nocturn/nocturn-05/img_05.jpg" />
                    <img src="/images/nocturn/nocturn-05/img_06.jpg" />
                    <img src="/images/nocturn/nocturn-05/img_07.jpg" />
                    <img src="/images/nocturn/nocturn-05/img_08.jpg" />
                    <img src="/images/nocturn/nocturn-05/img_09.jpg" />
                    <img src="/images/nocturn/nocturn-05/img_10.png" />
                  </div>
                  <div className="column">
                    <img src="/images/nocturn/nocturn-05/img_11.png" />
                    <img src="/images/nocturn/nocturn-05/img_12.png" />
                    <img src="/images/nocturn/nocturn-05/img_13.jpg" />
                    <img src="/images/nocturn/nocturn-05/img_14.jpg" />
                    <img src="/images/nocturn/nocturn-05/img_15.png" />
                    <img src="/images/nocturn/nocturn-05/img_16.jpg" />
                    <img src="/images/nocturn/nocturn-05/img_17.jpg" />
                    <img src="/images/nocturn/nocturn-05/img_18.png" />
                    <img src="/images/nocturn/nocturn-05/img_19.jpg" />
                    <img src="/images/nocturn/nocturn-05/img_20.png" />
                  </div>
               </div>
              </div>

         <div className="nocturn-text-wrapper"> 
            <br/> 
              <p className="nocturn-text">
                  <a href="https://open.spotify.com/album/47WsQF1FFmDxMvWgK4bfTm?si=nb7BLOoARfu7wwh8OSSVAg" target="_blank" rel="noopener" class="spotify-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168 168" className="spotify-icon" aria-hidden="true" focusable="false">
                    <path d="M84,0C37.7,0,0,37.7,0,84c0,46.3,37.7,84,84,84c46.3,0,84-37.7,84-84C168,37.7,130.3,0,84,0z M122.1,121.5
                      c-1.5,2.4-4.6,3.2-7,1.7c-19.2-11.7-43.2-14.3-71.5-7.7c-2.8,0.6-5.5-1.1-6.2-3.9c-0.6-2.8,1.1-5.5,3.9-6.2
                      c31.5-7.1,58.6-4.2,80,9c2.4,1.5,3.2,4.6,1.7,7z M132.5,99.3c-1.9,3.1-5.9,4.1-9,2.2c-22-13.5-55.4-17.4-81.4-9.4
                      c-3.4,1-7-0.9-8-4.3c-1-3.4,0.9-7,4.3-8c29.9-9,67.2-4.6,92.4,11.1C133.5,92.2,134.5,96.2,132.5,99.3z M133.9,75.5
                      c-26.4-15.7-70.1-17.1-95.4-9.3c-4,1.2-8.2-1.1-9.4-5.1c-1.2-4,1.1-8.2,5.1-9.4c28.9-8.6,77.2-7,107.4,11.2c3.6,2.1,4.8,6.7,2.7,10.3
                      C142.2,76.4,137.5,77.6,133.9,75.5z"/>
                  </svg>
                  QUIET HUSBAND - RELIGIOUS EQUIPMENT
                </a>
              </p>

              <p className="nocturn-text">
                  <a href="https://open.spotify.com/album/5kxx3vFDFzPX231pFwDv0X?si=5FWzoDvuRDeKGlLVs1rstw" target="_blank" rel="noopener" class="spotify-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168 168" className="spotify-icon" aria-hidden="true" focusable="false">
                    <path d="M84,0C37.7,0,0,37.7,0,84c0,46.3,37.7,84,84,84c46.3,0,84-37.7,84-84C168,37.7,130.3,0,84,0z M122.1,121.5
                      c-1.5,2.4-4.6,3.2-7,1.7c-19.2-11.7-43.2-14.3-71.5-7.7c-2.8,0.6-5.5-1.1-6.2-3.9c-0.6-2.8,1.1-5.5,3.9-6.2
                      c31.5-7.1,58.6-4.2,80,9c2.4,1.5,3.2,4.6,1.7,7z M132.5,99.3c-1.9,3.1-5.9,4.1-9,2.2c-22-13.5-55.4-17.4-81.4-9.4
                      c-3.4,1-7-0.9-8-4.3c-1-3.4,0.9-7,4.3-8c29.9-9,67.2-4.6,92.4,11.1C133.5,92.2,134.5,96.2,132.5,99.3z M133.9,75.5
                      c-26.4-15.7-70.1-17.1-95.4-9.3c-4,1.2-8.2-1.1-9.4-5.1c-1.2-4,1.1-8.2,5.1-9.4c28.9-8.6,77.2-7,107.4,11.2c3.6,2.1,4.8,6.7,2.7,10.3
                      C142.2,76.4,137.5,77.6,133.9,75.5z"/>
                  </svg>
                  Chase Money
                </a>
              </p>

              <p className="nocturn-text">
                  <a href="https://open.spotify.com/album/6Z4iivw2zkHxxEpUnMXjOe?si=vvxXl-OMTC-muxJFNWOm9Q" target="_blank" rel="noopener" class="spotify-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168 168" className="spotify-icon" aria-hidden="true" focusable="false">
                    <path d="M84,0C37.7,0,0,37.7,0,84c0,46.3,37.7,84,84,84c46.3,0,84-37.7,84-84C168,37.7,130.3,0,84,0z M122.1,121.5
                      c-1.5,2.4-4.6,3.2-7,1.7c-19.2-11.7-43.2-14.3-71.5-7.7c-2.8,0.6-5.5-1.1-6.2-3.9c-0.6-2.8,1.1-5.5,3.9-6.2
                      c31.5-7.1,58.6-4.2,80,9c2.4,1.5,3.2,4.6,1.7,7z M132.5,99.3c-1.9,3.1-5.9,4.1-9,2.2c-22-13.5-55.4-17.4-81.4-9.4
                      c-3.4,1-7-0.9-8-4.3c-1-3.4,0.9-7,4.3-8c29.9-9,67.2-4.6,92.4,11.1C133.5,92.2,134.5,96.2,132.5,99.3z M133.9,75.5
                      c-26.4-15.7-70.1-17.1-95.4-9.3c-4,1.2-8.2-1.1-9.4-5.1c-1.2-4,1.1-8.2,5.1-9.4c28.9-8.6,77.2-7,107.4,11.2c3.6,2.1,4.8,6.7,2.7,10.3
                      C142.2,76.4,137.5,77.6,133.9,75.5z"/>
                  </svg>
                  I Trust Pain
                </a>
              </p>

              <p className="nocturn-text">
                  <a href="https://open.spotify.com/album/2XWp1GG0wp0QWUCTMgOUlD?si=MNsqYEYtSWWqfhxRGXi7WQ" target="_blank" rel="noopener" class="spotify-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168 168" className="spotify-icon" aria-hidden="true" focusable="false">
                    <path d="M84,0C37.7,0,0,37.7,0,84c0,46.3,37.7,84,84,84c46.3,0,84-37.7,84-84C168,37.7,130.3,0,84,0z M122.1,121.5
                      c-1.5,2.4-4.6,3.2-7,1.7c-19.2-11.7-43.2-14.3-71.5-7.7c-2.8,0.6-5.5-1.1-6.2-3.9c-0.6-2.8,1.1-5.5,3.9-6.2
                      c31.5-7.1,58.6-4.2,80,9c2.4,1.5,3.2,4.6,1.7,7z M132.5,99.3c-1.9,3.1-5.9,4.1-9,2.2c-22-13.5-55.4-17.4-81.4-9.4
                      c-3.4,1-7-0.9-8-4.3c-1-3.4,0.9-7,4.3-8c29.9-9,67.2-4.6,92.4,11.1C133.5,92.2,134.5,96.2,132.5,99.3z M133.9,75.5
                      c-26.4-15.7-70.1-17.1-95.4-9.3c-4,1.2-8.2-1.1-9.4-5.1c-1.2-4,1.1-8.2,5.1-9.4c28.9-8.6,77.2-7,107.4,11.2c3.6,2.1,4.8,6.7,2.7,10.3
                      C142.2,76.4,137.5,77.6,133.9,75.5z"/>
                  </svg>
                  I Was Born By The Sea
                </a>
              </p>
           
              <p className="nocturn-text">
                  <a href="https://open.spotify.com/album/0Hlwv9mVeBx5hIO10u9L8I?si=Y3mbqt0IR3KD7DcjNnX_vg" target="_blank" rel="noopener" class="spotify-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168 168" className="spotify-icon" aria-hidden="true" focusable="false">
                    <path d="M84,0C37.7,0,0,37.7,0,84c0,46.3,37.7,84,84,84c46.3,0,84-37.7,84-84C168,37.7,130.3,0,84,0z M122.1,121.5
                      c-1.5,2.4-4.6,3.2-7,1.7c-19.2-11.7-43.2-14.3-71.5-7.7c-2.8,0.6-5.5-1.1-6.2-3.9c-0.6-2.8,1.1-5.5,3.9-6.2
                      c31.5-7.1,58.6-4.2,80,9c2.4,1.5,3.2,4.6,1.7,7z M132.5,99.3c-1.9,3.1-5.9,4.1-9,2.2c-22-13.5-55.4-17.4-81.4-9.4
                      c-3.4,1-7-0.9-8-4.3c-1-3.4,0.9-7,4.3-8c29.9-9,67.2-4.6,92.4,11.1C133.5,92.2,134.5,96.2,132.5,99.3z M133.9,75.5
                      c-26.4-15.7-70.1-17.1-95.4-9.3c-4,1.2-8.2-1.1-9.4-5.1c-1.2-4,1.1-8.2,5.1-9.4c28.9-8.6,77.2-7,107.4,11.2c3.6,2.1,4.8,6.7,2.7,10.3
                      C142.2,76.4,137.5,77.6,133.9,75.5z"/>
                  </svg>
                  I Was Born By The Sea (The Remixes)
                </a>
              </p>

              <p className="nocturn-text">
                  <a href="https://open.spotify.com/album/2s13QM1KJdtdZqh0hQqLSZ?si=C8yprN0UQCuqXUAhL6uYJQ" target="_blank" rel="noopener" class="spotify-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168 168" className="spotify-icon" aria-hidden="true" focusable="false">
                    <path d="M84,0C37.7,0,0,37.7,0,84c0,46.3,37.7,84,84,84c46.3,0,84-37.7,84-84C168,37.7,130.3,0,84,0z M122.1,121.5
                      c-1.5,2.4-4.6,3.2-7,1.7c-19.2-11.7-43.2-14.3-71.5-7.7c-2.8,0.6-5.5-1.1-6.2-3.9c-0.6-2.8,1.1-5.5,3.9-6.2
                      c31.5-7.1,58.6-4.2,80,9c2.4,1.5,3.2,4.6,1.7,7z M132.5,99.3c-1.9,3.1-5.9,4.1-9,2.2c-22-13.5-55.4-17.4-81.4-9.4
                      c-3.4,1-7-0.9-8-4.3c-1-3.4,0.9-7,4.3-8c29.9-9,67.2-4.6,92.4,11.1C133.5,92.2,134.5,96.2,132.5,99.3z M133.9,75.5
                      c-26.4-15.7-70.1-17.1-95.4-9.3c-4,1.2-8.2-1.1-9.4-5.1c-1.2-4,1.1-8.2,5.1-9.4c28.9-8.6,77.2-7,107.4,11.2c3.6,2.1,4.8,6.7,2.7,10.3
                      C142.2,76.4,137.5,77.6,133.9,75.5z"/>
                  </svg>
                  Scream If You Don't Exist
                </a>
              </p>

              <p className="nocturn-text">
                  <a href="https://open.spotify.com/album/6JAoKiSGoHiKmKvbeWvYRl?si=YEv39XcUQs-nxxEgXHxdbg" target="_blank" rel="noopener" class="spotify-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168 168" className="spotify-icon" aria-hidden="true" focusable="false">
                    <path d="M84,0C37.7,0,0,37.7,0,84c0,46.3,37.7,84,84,84c46.3,0,84-37.7,84-84C168,37.7,130.3,0,84,0z M122.1,121.5
                      c-1.5,2.4-4.6,3.2-7,1.7c-19.2-11.7-43.2-14.3-71.5-7.7c-2.8,0.6-5.5-1.1-6.2-3.9c-0.6-2.8,1.1-5.5,3.9-6.2
                      c31.5-7.1,58.6-4.2,80,9c2.4,1.5,3.2,4.6,1.7,7z M132.5,99.3c-1.9,3.1-5.9,4.1-9,2.2c-22-13.5-55.4-17.4-81.4-9.4
                      c-3.4,1-7-0.9-8-4.3c-1-3.4,0.9-7,4.3-8c29.9-9,67.2-4.6,92.4,11.1C133.5,92.2,134.5,96.2,132.5,99.3z M133.9,75.5
                      c-26.4-15.7-70.1-17.1-95.4-9.3c-4,1.2-8.2-1.1-9.4-5.1c-1.2-4,1.1-8.2,5.1-9.4c28.9-8.6,77.2-7,107.4,11.2c3.6,2.1,4.8,6.7,2.7,10.3
                      C142.2,76.4,137.5,77.6,133.9,75.5z"/>
                  </svg>
                  Hostile Environments
                </a>
              </p>

               <br/> 
           </div>
              
           <div className="nocturn nocturn-header">
            <div className="nocturn-text-wrapper bottom">
            <br/> 
              <p className="nocturn-text">Richie Culver (born Hull, UK) is a multidisciplinary artist working in painting, music, performance and photography. He completed his MA in Painting at Royal College of Art in 2023. Culver has exhibited nationally and internationally and lives and works in London.</p>
              <p><a className="nocturn-text" href="https://www.instagram.com/richieculver/" target="_blank">@richieculver</a></p>
              <p><a className="nocturn-text" href="https://www.quiethusband.com/" target="_blank">www.quiethusband.com</a></p>
              <br/> 
            </div>
         </div>      
    </>
  );
};

export default Menu;

export async function getStaticProps() {
  const menuData = await useFetchContent(`
    {
        menuCollection{
            items {
              menuImage {
                title
                description
                url
                width
                height
              }
            }
          }
    }
  `);

  const menuImage = menuData.menuCollection.items[0].menuImage;

  return {
    props: {
      menuImage,
    }, // will be passed to the page component as props
    revalidate: 30, // In seconds
  };
}
