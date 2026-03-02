import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

//Components
import CenterContainer from "@components/UX/CenterContainer/CenterContainer";

//hooks
import useFetchContent from "@utils/useFetchContent";

const Menu = ({ menuImage }) => {
  
  const [showFullText, setShowFullText] = useState(false);
  const [height, setHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(showFullText ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [showFullText]);
  
  return (
    <>
      <Head>
        <style>
            {'html, body { height: 100%; margin: 0; padding: 0; }'}
            {'html { overflow-x: hidden; }'}
            {'body { overflow-x: hidden; -webkit-overflow-scrolling: touch; overscroll-behavior-y: auto; }'}
            {'.nocturn{width: 50%;margin: 0 auto;}'}
            {'.row{ display: flex;flex-wrap: wrap;padding: 0 4px;}'}
            {'.column{flex: 50%;max-width: 50%;padding: 0 4px;}'}
            {'.column img{ margin-top: 8px;vertical-align: middle;width: 100%;}'}
            {'.column a{ cursor:pointer!important;}'}
            {'.top{ font-size: 30px;}'}
            {'.bottom{ font-size: 25px;}'}
            {'.featured{padding: 0 8px;margin-bottom: 30px;}'}
            {'audio{ margin-top: 8px!important;width:100%!important;}'}
            {'.nocturn-text-wrapper{ margin-top: 30px!important;padding: 0 30px;}'}
            {'.nocturn-text-wrapper img{ max-width: 25%;margin-bottom: 30px!important;}'}
            {'.nocturn-text-wrapper h3{ font-family: Helvetica!important;text-shadow: 1px 1px 1px rgba(171, 209, 227, 0.6);font-size: 35px;font-weight: bold!important;text-transform:uppercase!important;color: #660003!important;padding-bottom: 15px;line-height: 1.1;}'}
            {'.nocturn-text-wrapper p{ font-family: Helvetica!important;text-shadow: 1px 1px 1px rgba(102, 0, 3, 0.6);font-weight: 400;text-decoration: none!important;color: #abd1e3!important;padding-bottom: 30px;line-height: 1.1;}'}
            {'.nocturn-text-wrapper a{ font-family: Helvetica!important;text-shadow: 1px 1px 1px rgba(102, 0, 3, 0.6);font-weight: 400;text-decoration: none!important;color: #abd1e3!important;padding-bottom: 30px;line-height: 1.1;}'}
            {'.nocturn-text-wrapper strong{font-weight: bold !important;}'}
            {'.nocturn-text{ padding-bottom: 20px;}'}
            {'@media (max-width: 768px) { .nocturn{margin-top: 30px;width: 90%;}.featured{padding: 0 4px;margin-bottom: -2px;}.nocturn-text-wrapper h3{font-size: 25px;}.nocturn-text-wrapper{padding: 0 15px;}.top p{ font-size: 20px;}.bottom p{ font-size: 15px;}.row{padding: 0!important;}.column{ flex: 50%;max-width: 50%;}}'}
            {'::-webkit-scrollbar {width: 10px;!important}'}
            {'::-webkit-scrollbar-thumb {background: rgba(102, 0, 3, 0.8)!important;border-radius: 6px!important;}'}
            {'::-webkit-scrollbar-thumb:window-inactive {background: rgba(102, 0, 3, 0.4)!important;}'}
        </style>
        <title>Nocturn 06 - Sammy Lee</title>
      </Head>
      
         <div className="nocturn">
           <img src="/images/nocturn/nocturn-06/header.png" alt="Nocturn" width="100%" />
           <img src="/images/nocturn/nocturn-06/flyer.png" alt="Nocturn" width="100%" />

           <div className="nocturn-text-wrapper top">
             <h3>PROLOGUE</h3>
              <p><strong>Exterior.</strong> While Oxford Street bustles with the noise of cars, buses and people rushing home, Little Portland Street remains quiet – a calm ocean before the storm. You arrive at an unmarked entrance.</p>
              <h3>THRESHOLD</h3> 
              <p><strong>Interior.</strong> An outer gate swings open into an empty inner chamber and a face greets you. You step inward. A velvety darkness envelops your body. Low frequencies purr from multiple directions, rising through the floor, vibrating from behind a black curtain. Other faces hover, half-hidden. A silent question hangs in the air:</p> 
              <p>What adventure will unfold tonight?</p>
              <h3>STUDIO</h3> 
              <p>Your body registers first. Not quite arousal but close.</p>
              <h3>ENCOUNTER</h3>
              <p>[You enter the bathroom. A figure stands beside a cubicle. Or perhaps it is your own reflection.]</p>
              <p><strong>VOICE:</strong> Will you dissolve? Or will you hold your edges?</p>
              <p><strong>SELF:</strong> I seek an audience with Eros.</p>
              <p>A pause.</p>
              <p><strong>VOICE:</strong> No such separate entity. Enter the field. </p>
              <p><strong>SELF:</strong> A field of what?</p>
              <p><strong>VOICE:</strong> Relations. Sensations. Moods. Forces that move through you and those that exceed you. </p>
              <p>[A hand gestures outwards.]</p>
              <h3>ORIENTATION</h3>
              <p>[You return to the bar. The architecture trembles. Light and shadow articulate a matrix, visible only in your mind’s eye.]</p>
              <p><strong>To the West:</strong> a serpentine form coils in blackness.</p>
              <p><strong>To the East:</strong> wings cut through thin air, a golden unfurling.</p>
              <p><strong>To the North:</strong> crimson fires blaze above water – crackling, insistent, burning.</p>
              <p><strong>To the South:</strong> a hidden ocean beckons.</p> 
              <p>[Descent feels imminent.]</p>
              <h3>ENTANGLEMENT</h3>
              <p>[Deep, rhythmic music pulses across the space. Sensation precedes language. Time loosens. Lasers refract across skin. Sigils glow in the darklight.] </p>
              <p>Other bodies approach and retreat. </p>
              <p>Touching. Not Touching.</p> 
              <p>What binds dissolves. What dissolves binds.</p>
              <p><strong>Bianca Chu</strong></p>
            </div>

            <img className="featured" src="/images/nocturn/nocturn-06/featured.png" alt="Nocturn" width="100%" />

            <div className="nocturn-text-wrapper top">
             <h3>“EROS, AN EXQUISITE CORPUS”</h3>
             <p>In an exercise of collaboration, spontaneity and relinquishing control over singular authorship, Sammy and Bianca participated in a textual “exquisite corpse” on Eros.</p>
             <button
                className="read-more-btn"
                onClick={() => setShowFullText(!showFullText)}
              >
                {showFullText ? "Hide full text" : "Read the full text"}
              </button>
    
              <div
                ref={contentRef}
                style={{ maxHeight: height }}
                className={`collapsible ${showFullText ? "open" : ""}`}
              >
            <div className="inner-content bottom">
              <p>
                EROS, my sweetbitter…<br>
                The surfaces of contact you conjure…<br>
                Eros, our life-blood, what song do you sing?<br>
                </p>
                 
                 <p>In the sticky, impenetrable blackness of night, you rise, I listen for the same beat that drums in my body, the same rhythm that shakes the cosmos…
                 
                I draw the three of swords.
                Three swords piercing a heart against a stormy sky.
                Absence. Division. Rupture.
                But what is the third thing?
                 
                That thing I will never be able to name.
                I desire you, but I desire my sovereignty more. Somewhere in-between there lies the riddle of Sphinx I’ll never solve. Will we touch? Will I surrender? Together, a dance unfolds. Some days we are made, other days I am unmade and re-made. What contours the shape of the thing itself?
                 
                What is the sound of just one foot on the ground?
                 
                Follow the S-curve boundary where worlds fold into each other. You might hear the hissssss of a serpent or feel a sine wave like a spinal root reaching for the back side of the moon.
                The sky is a thin, lucid blue holding the Sweetbitter Full Moon. What is the information that you seek from her hidden seams?
                 
                Last night, Luna kept me up through the night, whisssssspering sweet nothings, you can’t be my everything. But everything contains me, just as I contain worlds inside me.
                How do I shed what I no longer need to carry? The lifeless skins of old versions of myself, no longer animated, no longer necessary… The rawness of fresh scales undulating underneath, waiting to be seen. Where does your skin begin and mine end?
                 
                A window I peer through: dirty and opaque in parts from years of dust collecting and forgotten chores but still my eye streams in on cold, sunny days.
                 
                In the dark of night when I wake to see what all those souls are doing down there, I feel their watery bodies and the bodies of water that surround them.
                 
                The particles of my being act like waves transmitting, sending signals out into the blackness of space, bumping up against all the other electromagnetic pearls that tell me your story. Gravitons crashing and weaving in and out and pulsing between all of you and all of me.
                 
                The fever of my curiosity never lessens even as I watch with dispassionate observation at the randomness of the order of the cosmos and sometimes, I am pensive: why do I get to witness you? Will you ever remember that we were at one time and still made of the same primordial dust, like the ones you forget to clean off your window sill?
                Seething with anger I smash the window into broken shards. The space and my mirrored body undergo a kind of disintegration, a collapse into a chaotic state.
                
                Have I joined those watery bodies below?
                
                In this wet geometry I can only surrender to my lack of control and trust. There is some inner force that knows how to return me back home. Or is this my true home?
                
                Home is where I stomp and seethe and soothe and sing:
                 
                Is the ground burning?
                Is the burning-ground of your heart a portal into the fourth dimension? A meaty, bloody tornado trapped in your chest, desiring to burst out.
                
                All force, energy and movement, yet where do you want to go?
                
                We can travel along the double helical ladder inside of us, long enough to make 150,000 trips to the moon and back.
                 
                Then we will transform into our opposites.
                 
                And another portal opens… another layer of reality, a new dimension which is an ancient one too. I am you and you are me. We are free.
                 
                I am going in, diving into the sticky hot mess that is both random and written. The inner reaches of outer space, let’s keep this pace?
                 
                There my desires have many faces and many voices and many chances to express, without limitation, without fear…
                 
                Deep into the Earth we go, traipsing and trawling all over the ground, what will be found?
                Find the trap door into the hidden ocean. That deep reservoir of crystalline waters 400 miles under the earth’s mantle.
                
                Crawl under my skin like a seismic wave. We are all bodies of water longing to return to the source.
                
                I used to be afraid of my longings, my yearnings, always trying to tie them up in a nice bow, to delineate, to define. Now, I want to swim in the deep abyss of my longing, of the potentiality of what could be, what might never be, or who I might become.
                
                Needing things to last: that was what I was told we were supposed to be doing here, but what is it to truly stay? What is actual staying power? It is not stasis – that I know.
                
                The lasting is the longing and the longing is what keeps us alive. I long to long for you and for me and for we.
                
                I long to return to the source, but what is our source? From where does this vital energy flow?
                
                I dream of a giant golden egg at the moment of its hatching. The yolk pours outwards into a vast ocean of light, rippling with swirling geometric patterns. It is not a visible light, but one that is felt in the heart like the heat from the rising sun after a frozen, eternal night.
                
                Suddenly this realm of energy turns a hot pink and moist fleshiness. The skin of my leg is peeled back to reveal roots growing rapidly, forming bulbous bodies of fruit in red and white. I tentatively pick one of these fruits and take a bite. The bittersweet taste masks the shame I feel for eating from my own body. The initial disgust turns into revelation when I realise my body will provide the cure for any ailments I suffer from.
                
                The exquisite pain of true passion: the root of all passion and ecstasy is suffering. It is the ability and desire to endure.
                
                My body is intelligent, it heals itself in time, but before that moment, I wade through and sometimes seem to drown in an abyssal pool of self-doubt, physical and psychic pain, horror, tears, shame. The flesh of the underside of my feet are now being peeled back and there is some rot festering around.
                
                Shifting sands in the lower vibrational realms; it seems we must do that too sometimes, even if I know my preference is not too. That’s it, isn’t it? Preference. I prefer to fly high and be in good energy all the time, but who doesn’t? Where would the distinction be then? How would I know it is bliss when I never experienced “hell”?
                
                Tonight, I cried myself to sleep as my body continues to heal itself from random viruses, exhaustion and energy depletion, sorcery of the ill-natured kind, my own ignorance and unawareness, a spiral down when I’ve been spiraling up for so long. What goes up must come down – that proverbial old hat.
                
                And inside that dream of golden yolk and creamy milk, I dream another dream. My hands become my feet and my feet are in the air, suspended by thickly woven threads upon threads of copper wire that bend and curve like the sinews of my own flesh. Inverted, I look down and I sense the underworld reflected in my own eyes. I close them and I begin to see…
                
                Accept the stillness. Metabolise the pain.
                Allow the body to sink deeper and deeper into that lightless trench of sleep.
                When you’re so exhausted that even your astral body quits its side quests.
                With your hands and feet bound, your eyes closed, a new kind of motion begins.
                A doing not doing.
                 
                You see a rocky island rising vertically from still, dark water. At the base of the cliff, sheltered by tall, dense trees is a rectangular opening cut into the rock. Legend has it that this island is a sleeping dragon, coiled like a snake. Will you awaken the dragon?
                 
                If you spend long enough in the doorway
                it becomes a tunnel.
                Are you willing to step through?
                 
                The courage it takes to take that step through, I muster it. I gather it all, I summon it to me, I call out and I hear the wings of a falcon but I do not see her with my eyes. The silence is music to my ears.
                 
                I stand atop this giant rock, surveying the land and the rivers before me. My feet perched on the edge of the cliff of this island. Will I jump to meet her?
                The earth below me pulses, I feel the dragon’s breath and I wait. I wait and I wait.  
                 
                And then, a screech – I see her, my darling Eros, feathers black as night and with eyes, yellow and piercing, matching the tourmaline waters coloured by the rays of the sun that surround me. Petite and contained, her body moves with lightness, speed and agility. Her wings spread out, catching the wind that allows her to ride it. Her claws open their grip and –
                 
                Without a shadow of a doubt, without a moment’s hesitation, I leap from the edge and my arms cast themselves wide, outstretched to each side, and she catches me on each shoulder.
                 
                And there we are soaring through the pale sky together, she carries me with her and I carry her with me. Up, up, up, higher we go, until instinct pauses us and together, we are suspended in air, my body, her body, we enmesh and I look down to see a dark rectangular opening below.
                 
                We dive into the rock crater and the heat of its insides ignites me too.
                 
                I am a falcon making love to a dragon, what will we make anew?
                 
                She watched that dense, dark arrow cut precise spirals into the white sky, before that fateful plunge into darkness.
                 
                The Ocean had always known Eros. After all, they went way back to the Creation time. A fluid, porous body of time faintly held in her consciousness. In one version of the story she remembers giving birth to Eros, holding that tempestuous egg in her patient, all-encompassing embrace. In another version it was Eros giving birth to her, pouring out from a broken shell between earth and sky. Either way, their destinies were conjoined. She was not surprised when Eros returned home, seeking the gates to the Underworld.
                 
                The Ocean had always had a penchant for drama. In contemporary times, she became the Chorus, speaking at once as one voice and as many. Her voice shifting between intimacy and vastness.
                 
                Should she warn Eros? Or withhold?
                 
                The forever dance between what is uttered and that which resides in the sound behind silence continues to elude Falcon, but then again she has been designed, and desires to live within the mystery of it all.
                 
                Flying through the air, the wind beneath her wings, the reptilian mind does very little, it is all instinct, all primordial movement. Yet, from high above, her sharp, all-seeing eyes cast across the landscape and The Ocean below.
                 
                *
                 
                I see the undulating waves, the fish swimming below the surface, the corals glistening in the light from the sun. I hear the crashing of bodies of water against the hard, shiny cliffside of the same rocky island that I know I will dive into, for no other reason but because I can.
                
                Inside the womb of the rock, a Golden Egg rests gently on a granite plinth and my clawed feet reach out in front of my body to touch down. The smell of sweet nectar, I sense a humming vibration. As I approach, I notice a crack in the shell of the Egg and curiosity draws me in. My beak tap, tap, taps and the cracks begin to brittle, its integrity collapsing slowly. I insert my head side the golden ovoid and feel the sensuous sticky membrane inside. Aromas of the Earth–fertile and wet wood, whispering wind, minerality, the same scent of blood, the residue of salt from evaporated water–fill my nostrils and I fall into a trance.
                 
                Show me…
                 
                The Chorus sings: Show me the true form of desire.
                 
                Entering into reverie my thoughts and vision become alchemised into the state of music. Hot, sweaty and pressurised. Held in a centrifugal field, unspooling into fine threads of copper wire. The drum beats along the spine to a 8/6 polyrhythm. A crackling, sizzling pervades my skull like the popping of microscopic bubbles.
                 
                Are my cells conspiring against me?
                 
                A softness envelops a sharp thought. Inside this chamber of micro-bubbles I feel myself reorganising. Each bubble is a catalyst for new growth. Every seed is a small death. Bonds loosen.
                 
                Touching not touching.
                 
                Touching, not touching. Sinking, not swimming. Caressing, not kissing. Flying, not dying. Dying, not sighing. Roots, not fruits. But fruits, not roots. Sighing, not dying. Dying, not flying. Kissing, not caressing. Swimming, not sinking. Not touching, touching, touching, not touching.
                 
                The Ocean had another dream to show Eros.
                 
                A black, shadowy mass in the distance, like a giant serpent coiling and uncoiling. As I drift closer to the edge of this void, its skin reveals itself: not scales, but countless silver fish, flashing and then vanishing into a dense, spiralling vortex.
                 
                Swarming. Dancing. Churning the ocean.
                 
                An overwhelming urge rises in me — to be swallowed by this monstrous entity. With the body of a sea lion, I dive in. I glide in slow motion as the fish part, opening a corridor through the living storm.
                 
                I’m going to devour the moon.
                 
                And in my pregnant belly, a seed re-forms, dense and striated with patterns, touching all the curves of my internal world.
                 
                Returning to the blackness of night, the moon, she shimmers as her surfaces undulates, the pace quickens and then gradually loosening, thickening, dropping in frequency… almost to a halt, but it never stops.
                 
                Two beating hearts, they play: one swallowed by another, another inside other, foreign and family, a wave cascading over another wave, their crests touch again – and again a heightened, luscious sensation ripples across the entire vibrating world.
                 
                What is this world? Where do I begin and end? What power seeps inside, what power dies outside?
                 
                As pressure swells,
                desire bends toward form,
                a low thunder rolling through me.
                My belly sprouts spines,
                my heart grows teeth,
                the moon calcifies into armour.
                I turn inside out,
                releasing a milk of stars.
                My interior becomes ocean.
                 
                A body of water is never truly contained and yet it is held by the earth. I am a body of water and my skin, a membrane, a vessel. And in my wateriness, I follow and trace a million mitochondria, churning in the cytoplasm of every cell: ancient bacterial mothers, ocean-born, passing their fire through sticky passages of undergrowth and dark, stagnant waters, who await new life once more. Within my aqueous form, I taste the salt of the earth containing my joy, my sorrow, my compassion, my bliss.
                
                And seeped in this viscous, fertile liquidity, fire blazes over water, burning white-hot like a Mother Star. The crackle and flicker of the flames evaporates into thin air and my interior world spreads open, unlocking and rotating outward like the feathered wings of an eagle, seeking new heights and other forms to feel real.
                 
                The never-ending drama of two bodies of water meeting.
                You, a ferocious river, thick with cascading silt.
                Me, an ocean summoned by the moon.
                 
                Our meeting is turbulence,
                a force that threatens sovereignty,
                undoing the borders we mistook for selves.
                A third formation rises between us,
                a whirling life-form of its own,
                curling, rolling, folding,
                carving a hollow space,
                a receptacle in waiting.
                 
                Boundary surfaces are the birthplaces of living things.
                There we find Eros, in the forces of difference
                between our cells.
                 
                When you held me, I put my ear to your chest.
                Thump-thump thump-thump,
                accepting-rejecting accepting-rejecting,
                the pattern of a river meeting still water.
                 
                Why does your mouth taste bitter?
                Is it the taste of blood?
                Or is it the taste of love?
                 
                And Eros called out into the vibrating Cosmos.
                 
                Sensation is an ever-changing field, they said, a moveable feast.
                Wait a moment and the mood shifts and melds into others. Take a breath and the atmosphere sings a different scent. Close your eyes and listen to the different rhythms.
                 
                And with the deepest compassion for all the particles in the air, Eros exploded across the Spheres and was infused into the fabric of the world.
                 
                The sweetbitter taste of dark chocolate and ground coffee melted on our tongues and I tasted you for the very first time, again.
                 
                I did not know yet that we could be re-made.
                 
                Then you hung me upside down by my ankles
                and planted three seeds at the root
                on the underside of my tongue,
                whispering,
                you belong right here with me.
                 
                Will you allow us to grow?
                 
                One Eye on the Underworld, Another on the Upper Realm, but I don’t want to be blind here, I whisper in reply to you.
                 
                The illusion begins to dissolve, and I remember thatness which is you and I. We.
                We were always together and never.
                We were never together and always forever.
                Now, what song do we sing?
                 
                &lt;3 &lt;3 &lt;3
                 
                &lt;3 &lt;3 &lt;3
                 
                The song sings itself to wake and lulls itself to sleep. And in between all the singing and sleeping and waking, there the gold dust settles and unsettles forever: messy, beautiful, insufferable ecstasy. And we dance and dance and dance and dance and dance…
              </p>
               </div>
              </div>
            </div>

           <div className="row">
              <div className="column">
                <img src="/images/nocturn/nocturn-06/image01.png" />
                <img src="/images/nocturn/nocturn-06/image02.png" />
                <img src="/images/nocturn/nocturn-06/golden.gif" />
                <img src="/images/nocturn/nocturn-06/image03.png" />
                <img src="/images/nocturn/nocturn-06/image04.png" />
                <img src="/images/nocturn/nocturn-06/image05.png" />
                <img src="/images/nocturn/nocturn-06/image06.png" />
                <img src="/images/nocturn/nocturn-06/image07.png" />
              </div>
              <div className="column">
                <img src="/images/nocturn/nocturn-06/image08.png" />
                <img src="/images/nocturn/nocturn-06/image09.png" />
                <img src="/images/nocturn/nocturn-06/image10.png" />
                <img src="/images/nocturn/nocturn-06/image11.png" />
                <img src="/images/nocturn/nocturn-06/image12.png" />
                <img src="/images/nocturn/nocturn-06/image13.png" />
                <img src="/images/nocturn/nocturn-06/image14.png" />
                <img src="/images/nocturn/nocturn-06/image15.png" />
              </div>
           </div>
           
            <div className="nocturn-text-wrapper bottom"> 
              <p className="nocturn-text">Sammy Lee (b. Vancouver, Canada) is a London-based artist working across drawing, sculpture, moving image, and immersive media. Informed by her background in architecture, she approaches the future as a site of memory, weaving lived experience and ancestral lineage through affect, ritual, and embodied practice.</p>
              <p><a className="nocturn-text" href="https://sammyleestudio.com/" target="_blank">www.sammyleestudio.com</a></p>
            </div>
           
         </div>   

         <style jsx global>{`
        
        body {
          background-color: #b94b18;
          overflow-x: hidden;
          position: relative;
          z-index: 0;
        }
        
        body::before {
          content: "";
          position: fixed;
          top: 0;
          left: -50%;
          width: 200%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
        
          background: linear-gradient(
            90deg,
            #b94b18 0%,
            #b94b18 38%,
            #c95522 43%,
            #d76e3d 47%,
            #ed8344 49%,
            #ff9a5c 50%,
            #ed8344 51%,
            #d76e3d 53%,
            #c95522 57%,
            #b94b18 62%,
            #b94b18 100%
          );
        
          animation: gradientMoveMobile 10s ease-in-out infinite;
          will-change: transform;
        }
        
        
        /* MOBILE (current behaviour) */
        @keyframes gradientMoveMobile {
          0%   { transform: translateX(-20%); }
          50%  { transform: translateX(20%); }
          100% { transform: translateX(-20%); }
        }
        
        
        /* DESKTOP – reduced movement */
        @media (min-width: 1024px) {
        
          body::before {
            animation: gradientMoveDesktop 12s ease-in-out infinite;
          }
        
          @keyframes gradientMoveDesktop {
            0%   { transform: translateX(-10%); }
            50%  { transform: translateX(10%); }
            100% { transform: translateX(-10%); }
          }
        
        }

             .collapsible {
          overflow: hidden;
          transition: max-height 0.7s ease, opacity 0.5s ease;
          opacity: 0;
        }

        .collapsible.open {
          opacity: 1;
        }

        .inner-content {
          padding-top: 20px;
        }

        .read-more-btn {
          background: none;
          border: none;
          font-family: Helvetica;
          color: #abd1e3;
          cursor: pointer;
          font-size: 18px;
          padding: 10px 0;
          transition: opacity 0.3s ease;
        }

        .read-more-btn:hover {
          opacity: 0.7;
        }

        @media (max-width: 768px) {
          .read-more-btn {
            font-size: 16px;
          }
        }
        
        `}</style>
      
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
