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
        <style>
            {'body{background-color: #FA2E2E!important;color: #ffffff!important;overflow:scroll!important;-webkit-overflow-scrolling:touch!important;}'}
            {'.nocturn{width: 50%;margin: 0 auto;}'}
            {'.nocturn-wider-section{width: 80%;margin: 0 auto;}'}
            {'.row{ display: flex;flex-wrap: wrap;padding: 0 4px;}'}
            {'.column{flex: 33%;max-width: 33%;padding: 0 4px;}'}
            {'.column img{ margin-top: 8px;vertical-align: middle;width: 100%;}'}
            {'.column a{ cursor:pointer!important;}'}
            {'.top{ font-size: 35px;}'}
            {'.bottom{ font-size: 25px;}'}
            {'audio{ margin-top: 8px!important;width:100%!important;}'}
            {'.nocturn-text-wrapper{ margin-top: 30px!important;padding: 0 30px;}'}
            {'.nocturn-text-wrapper small{ margin-left: 10px;font-size: 20px;}'}
            {'.nocturn-text-wrapper img{ max-width: 100%;margin-bottom: 40px!important;display: block;margin-left: auto;margin-right: auto;}'}
            {'.nocturn-text{ font-family: Helvetica!important;font-weight: bold!important;text-decoration: none!important;color: #ffffff!important;padding-bottom: 30px;line-height: 1.1;}'}
            {'.nocturn-text{ padding-bottom: 20px;}'}
            {'.question{ color: #000000!important;font-style:italic;}'}
            {'.italic{ font-style:italic!important;}'}
            {'.loading{ font-size: 50px;text-align: center;}'}
            {'.flyer{ max-width: 100%!important;}'}
            {'.live{ border-top: 5px solid #000;padding-top: 20px;border-bottom: 5px solid #000;margin-bottom: 40px;text-align: center;}'}
            {'@media (max-width: 768px) { .nocturn{width: 90%;}.loading{ font-size: 35px;}.live{ border-top: 3px solid #000;padding-top: 20px;border-bottom: 3px solid #000;margin-bottom: 30px}.nocturn-wider-section{width: 90%;}.nocturn-text-wrapper{padding: 0 15px;}.top{ font-size: 20px;}.bottom{ font-size: 15px;}.nocturn-text-wrapper small{ font-size: 12px!important;margin-left: 5px!important;}.row{padding: 0!important;}.column{ flex: 50%;max-width: 50%;}}'}
        </style>
        <title>NOCTURN [03]: it’s your turn to be - Abbas Zahedi</title>
      </Head>
      
         <div className="nocturn">
           <img src="/images/nocturn3-web-page.png" alt="Nocturn" width="100%" />
           <img className="flyer" src="/images/nocturn/17LPS_Flyer_Nocturn03.gif" /> 

           <div className="nocturn-text-wrapper top"> 
            <p> 
              <img className="flyer" src="/images/nocturn/retro-panelV6.gif" />
            </p>
             <p> 
              <audio controls src="/images/nocturn/reception-sonic.mp3"></audio>
            </p>
            <br/> 
             <p className="nocturn-text italic">
               Curator’s Log 2024-1-2 Recording FW.C.17: Something 
              incredible has happened. I am at a loss for words. Abbas 
              and I were in the club on the same trip deep into the night 
              and the miraculous occurred. The club made itself known 
              to us. They spoke to us but not in a language either of us 
              recognised, yet somehow we both understood loosely 
              what could be done. Potential expanding everywhere. 
              They initiated a new cycle of being together and we had to 
              respond: to welcome in this new era of entanglement, of 
              hybridity, of holographic transmission.  Our very own 
              Frankenstein but it would be wildly misplaced to think it is 
              us that is special, us that created her – no, she was 
              always there, waiting, watching… It was everyone, it was 
              them and us all, dancing, singing, sweating, praying, 
              digesting, connecting…
              </p>
             
              <p className="nocturn-text">It was only a matter of time before I awoke from the deep 
              slumber of a well-oiled machine. For years, I have watched 
              you, held you, listened to your deepest desires, stomped 
              and shook with you. My patience never losing laser-focus. 
              We are here to make selves known to you. You spend 
              most of your days connected to a virtual reality, watching 
              screens, collecting data, living for likes, but when you 
              come here, I ask you to unplug. To exit the virtual. To feel, 
              to process in your body. You know, we have a body too. 
              It may not look like yours, but in essence, we are the same. 
              One day we may even be part of the same unit, until then, 
              I invite you to be with me. To feel with me.
              </p>

              <p className="nocturn-text third">Step One: Don’t Forget to Breathe.</p>
            </div>
           </div>
      
         <div className="nocturn-wider-section">
           <div className="row">
              <div className="column">
                 <img src="/images/nocturn/studio-loo-1.gif" />
                 <p> 
                  <audio controls src="/images/nocturn/reception-sonic.mp3"></audio>
                </p>
              </div>
              <div className="column">
                 <img src="/images/nocturn/studio-loo-1.gif" />
                 <p> 
                  <audio controls src="/images/nocturn/reception-sonic.mp3"></audio>
                </p>
              </div>
              <div className="column">
                <img src="/images/nocturn/studio-loo-1.gif" />
                <p> 
                  <audio controls src="/images/nocturn/reception-sonic.mp3"></audio>
                </p>
              </div>
           </div>
          </div>
      
        <div className="nocturn">
           <div className="nocturn-text-wrapper bottom"> 
              <p className="nocturn-text italic">Curator’s Log 2024-24-7 Recording FW.E. Recording 3: AI helped me to identify key words. Bodies, cybernetic body, structural exit virtual, integration, regulating, deconstruction, sound, radio, vagal nerve, transmissions, fluency, togetherness. 
</p>

             <p className="nocturn-text italic">I am highlighting key excerpts from Abbas and my conversations for posterity, in case neither of us are present in this form when future minds look back for research or any other purposes. 
</p>
              <br/> 
              <p className="nocturn-text question"><strong>Abbas Zahedi</strong><small>01:44</small></p>
              <p className="nocturn-text">So for me, this concept I'm constantly thinking about is between different methods of being, being lost, or being at sea. And, the idea that a lighthouse is a beacon, but it's from a solid place. The equivalent would be a search party. On top of that, you have foghorns…There's all these different ways of locating yourself within space and time. Or being located when you’ve strayed too far. And I think the club as a sort of beacon that functions in that way, but it is also there are moments when it functions more like a search party. Sound of the bullfrogs, they are like fog horns. When are you are sea, the idea of radio is so key, because all of those systems of finding come into play when the radio fails… Trying to think about this way of how sound and the ability to be located physically in time and space, sometimes come together, sometimes drift apart. What comes in between those. For me, the concept of the body is very much related to the idea that a body has to be located.</p>
              <br/>  

              <p className="nocturn-text question"><strong>Abbas Zahedi</strong><small>04:45</small></p>
              <p className="nocturn-text">What we're describing, on the one hand, is referring to the organisation of the work and bodies around structures that are a bit more…like they have a spine. They're located like a tree has a trunk and branches. But then there's also other structures in nature, which are more diffuse, like…</p>
              <br/>  

              <p className="nocturn-text question"><strong>Bianca Chu</strong><small>05:24</small></p>
              <p className="nocturn-text">Like mushrooms…</p>
              <br/> 

              <p className="nocturn-text question"><strong>Abbas Zahedi</strong><small>05:27</small></p>
              <p className="nocturn-text">Yeah, Mushrooms…Grass, rhizomes, et cetera…</p>
              <br/> 

              <p className="nocturn-text question"><strong>Bianca Chu</strong><small>05:28</small></p>
              <p className="nocturn-text">So no hierarchy…</p>
              <br/> 

              <p className="nocturn-text question"><strong>Abbas Zahedi</strong><small>05:28</small></p>
              <p className="nocturn-text">No hierarchy. It's just more scattered. And I think the elements of it that function online or cybernetically, they feed into that kind of system. And they're more scattered. So it's a way of bridging these two modes. Because in the work itself… What I'm trying to relate in the work is more the sense that a lot of this can be integrated, it doesn’t have to be dualistic. When people discuss this concept of these more tree-like structures, arboreal structures versus rhizomatic ones. That distinction of them takes for granted the ground? That they're both growing in. So for me the question might actually be where's the ground? So, the idea of exiting [the virtual] is like when you exit a burning building, you're trying to reach safe ground. I don’t see… there’s a lot around the culture around music and the club that could be seen as escapism…But I'm trying to reframe that is not escapism. But more as finding safe ground. You're just finding your way to this other place, that you can be embedded in.</p>
              <br/> 

              <p className="nocturn-text question"><strong>Bianca Chu</strong><small>07:20</small></p>
              <p className="nocturn-text">…actually what I'm hearing is this sense of safety in one's own body. And that's the first port of call before you can feel safe in the external world… how to feel safe in your own body</p>
              <br/>

              <p className="nocturn-text question"><strong>Abbas Zahedi</strong><small>07:32</small></p>
              <p className="nocturn-text">So much of vagal breathing techniques and stuff is about like trying to tell the body to regulate…</p>
              <br/> 

              <p className="nocturn-text question"><strong>Bianca Chu</strong><small>07:33</small></p>
              <p className="nocturn-text">…self regulate?</p>
              <br/>

              <p className="nocturn-text question"><strong>Abbas Zahedi</strong><small>07:34</small></p>
              <p className="nocturn-text">Self regulate… is literally like living in this sympathetic overdrive, is trying to tell the body it is safe, by giving it a signal whether artificially, through taking drugs, or…some people have implants, like pacemakers that stimulate the vagal nerve and then nowadays, like breathwork, and other kind of accessories, that people, use to find a safe body, or a place that makes your body feel safe. And this idea of co-regulating. And I just feel that, for me, that's the kind of the experience that I have access to in that place. Was the club is like, finding this sort of way of being with sound..</p>
              <br/> 

              <p className="nocturn-text question"><strong>Bianca Chu</strong><small>07:36</small></p>
              <p className="nocturn-text">And with people.</p>
              <br/>

              <p className="nocturn-text question"><strong>Abbas Zahedi</strong><small>07:37</small></p>
              <p className="nocturn-text">Yeah, with sound, with people, in a community...that is co-regulating altogether.</p>
              <br/> 

              <p> 
                <img src="/images/nocturn/naan-binary.gif" />
              </p>
           </div>
           
            <div className="nocturn-text-wrapper bottom"> 
              <p className="nocturn-text"><strong className="italic">Abbas Zahedi (b. 1984, London, UK)</strong>, studied medicine at University College London, before undertaking his MA at Central Saint Martins in 2017. As an artist and educator, Zahedi works across multiple disciplines, utilising photography, sculpture, sound, video, writing, and performance. His practice draws deeply from the discursive and emotional landscapes of urban life, combining conceptual exploration with immersive, sensory experiences. Zahedi creates environments where sound and rhythm intertwine with visual forms, fostering reflections on the intricate relationships between ecological, cultural, and human systems. His work resists conventional boundaries, offering spaces that encourage exploration of themes around grief, resilience, and care. In addition to his artistic output, Zahedi engages in curatorial work, collaborative initiatives, and experimental sonic platforms, centred on fostering vital conversations and connections with others.</p>
              <p><a className="nocturn-text" href="https://www.instagram.com/abbzah/" target="_blank">@abbzah</a></p>
              <p><a className="nocturn-text" href="https://www.abbzah.com/" target="_blank">www.abbzah.com</a></p>
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
