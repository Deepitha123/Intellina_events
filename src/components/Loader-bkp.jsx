
export function renderLoader() {
  return `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&display=swap');

      :root {
        --color-bg: #000;
        --color-title: #C11B1F;
        --color-credits: #C8C6C7;
        --color-credits-top: #D2D0D1;
        --color-credits-bottom: #C8C6C7;
        --font-title: 'Benguiat', serif;
        --font-credits: 'Oswald', sans-serif;
        --title-fsize: 28vmin;
        --title-fsize-large: 34vmin;
        --title-spacing: -1.3vmin;
        --title-stroke: 0.4vmin;
        --title-shadow: 2vmin;
        --titlebar-height: 1vmin;
        --titlebar-border: 0.4vmin;
        --titlebar-shadow-outer: 1.2vmin;
        --titlebar-shadow-inner: 0.5vmin;
        --titlebar-radius: 0.1vmin;
        --credits-fsize: 6vmin;
        --credits-fsize-small: 4.6vmin;
        --credits-margin: 0vmin;
        --credits-speed: 3000ms;
        --credits-link-size: 12vmin;
        --credits-link-margin: 5vmin;
        --credits-shadow-offset: 0.3vmin;
        --credits-shadow-blur: 0.15vmin;
        --desired-ratio-multiplier: 0.5625;
      }

      @font-face {
        font-family: 'Benguiat';
        src: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/161676/BenguiatProITC-BoldCond.woff') format('woff');
        font-style: normal;
        font-weight: bold;
      }

      #loader-wrapper {
        background: var(--color-bg);
        text-align: center;
        line-height: 1;
        margin: 0;
        -webkit-font-smoothing: subpixel-antialiased;
        overflow: hidden;
        box-sizing: border-box;
        position: fixed;
        inset: 0;
        z-index: 9999;
      }

      #loader-wrapper *, #loader-wrapper *:before, #loader-wrapper *:after {
        box-sizing: inherit;
      }

      .intro {
        padding: 0 20px;
        width: 100%;
        max-width: 440px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: opacity 600ms ease, visibility 0ms linear 800ms;
        z-index: 10;
      }

      .intro--hide {
        opacity: 0;
        visibility: hidden;
      }

      .intro-title {
        font-family: var(--font-title);
        color: var(--color-title);
        font-size: 56px;
        margin-bottom: 20px;
        text-shadow: 0 0 10px rgba(193, 27, 31, 0.6), 0 0 20px rgba(193, 27, 31, 0.4);
        letter-spacing: 1px;
      }

      .intro-text {
        text-align: center;
        color: var(--color-credits);
        font-size: 16px;
        line-height: 24px;
        font-family: 'Courier New', Courier, monospace; /* Lab report style */
        display: none;
        opacity: 0.8;
      }

      .intro-text--show {
        display: block;
      }

      .intro-text-button {
        display: inline-block;
        vertical-align: top;
        cursor: pointer;
        padding: 0;
        margin: 20px 5px 0;
        width: 160px;
        height: 42px;
        line-height: 42px;
        border: 1px solid var(--color-title);
        text-decoration: none;
        font-size: 14px;
        border-radius: 2px;
        font-family: var(--font-credits);
        background: rgba(193, 27, 31, 0.1);
        color: #C8C6C7;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: all 0.3s ease;
      }

      .intro-text-button:hover {
        background: rgba(193, 27, 31, 0.3);
        box-shadow: 0 0 10px rgba(193, 27, 31, 0.4);
        color: #FFF;
      }

      .intro-text-play {
        display: block;
        cursor: pointer;
        margin: 40px auto 0;
        padding: 15px 40px;
        background: transparent;
        border: 1px solid var(--color-title);
        color: var(--color-title);
        font-family: var(--font-title);
        font-size: 18px;
        letter-spacing: 3px;
        text-transform: uppercase;
        transition: all 0.3s ease;
        box-shadow: 0 0 15px rgba(193, 27, 31, 0.2);
        position: relative;
        overflow: hidden;
      }

      .intro-text-play:hover {
        background: var(--color-title);
        color: #000;
        box-shadow: 0 0 30px rgba(193, 27, 31, 0.6), 0 0 60px rgba(193, 27, 31, 0.3);
        transform: scale(1.05);
        text-shadow: none;
      }

      .intro-text-play::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: 0.5s;
      }

      .intro-text-play:hover::before {
        left: 100%;
      }

      .viewport {
        height: 100vh;
        width: 100vw;
        user-select: none;
        display: none;
      }

      .viewport--show {
        display: block;
      }

      .title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -45%);
        width: 100%;
        font-size: 0;
        font-family: var(--font-title);
        color: var(--color-bg);
        letter-spacing: var(--title-spacing);
        font-weight: bold;
        display: none;
        -webkit-text-stroke-color: var(--color-title);
        -webkit-text-stroke-width: var(--title-stroke);
        text-shadow: 0 0 var(--title-shadow) rgba(193, 27, 31, 0.5);
      }

      @media screen and (max-aspect-ratio: 16/9) {
        .title {
          -webkit-text-stroke-width: calc(0.4 * 0.5625vw);
          text-shadow: 0 0 calc(2 * 0.5625vw) rgba(193, 27, 31, 0.5);
        }
      }

      .title--show {
        display: block;
      }

      .title-word {
        position: relative;
        display: inline-block;
      }

      .title-word--second {
        transform: translateY(-38%);
      }

      .title-word-letter {
        display: inline-block;
        position: relative;
        vertical-align: top;
        font-size: var(--title-fsize);
      }
      @media screen and (max-aspect-ratio: 16/9) {
        .title-word-letter { font-size: calc(28 * 0.5625vw); }
      }

      .title-word-letter-large {
        display: inline-block;
        transform: translateY(-2.8%);
        font-size: var(--title-fsize-large);
      }
      @media screen and (max-aspect-ratio: 16/9) {
        .title-word-letter-large { font-size: calc(34 * 0.5625vw); }
      }

      .titlebar {
        position: absolute;
        border-style: solid;
        border-color: var(--color-title);
        height: var(--titlebar-height);
        border-width: var(--titlebar-border);
        border-radius: var(--titlebar-radius);
        box-shadow: 0 0 var(--titlebar-shadow-outer) rgba(193, 27, 31, 0.8),
                    0 0 var(--titlebar-shadow-inner) rgba(193, 27, 31, 0.8) inset;
      }
      @media screen and (max-aspect-ratio: 16/9) {
        .titlebar {
          height: calc(1 * 0.5625vw);
          border-width: calc(0.4 * 0.5625vw);
          border-radius: calc(0.1 * 0.5625vw);
          box-shadow: 0 0 calc(1.2 * 0.5625vw) rgba(193, 27, 31, 0.8),
                      0 0 calc(0.5 * 0.5625vw) rgba(193, 27, 31, 0.8) inset;
        }
      }

      .titlebar--top { bottom: 100%; width: 100%; }
      .titlebar--left, .titlebar--right { top: 90%; }
      .titlebar--left { left: 0; right: -12%; }
      .titlebar--right { left: -15%; right: 0; }

      .credits {
        position: absolute;
        inset: 0;
        font-family: var(--font-credits);
        font-weight: bold;
        font-size: var(--credits-fsize);
      }
      @media screen and (max-aspect-ratio: 16/9) {
        .credits { font-size: calc(6 * 0.5625vw); }
      }

      @keyframes credits-wiggle {
        0%  { transform: translate(-50%, -50%) translate(0, 0); }
        20% { transform: translate(-50%, -50%) translate(0, -0.015vmin); }
        40% { transform: translate(-50%, -50%) translate(0.015vmin, -0.015vmin); }
        60% { transform: translate(-50%, -50%) translate(0, 0.015vmin); }
        80% { transform: translate(-50%, -50%) translate(-0.015vmin, 0); }
        100%{ transform: translate(-50%, -50%) translate(-0.015vmin, 0.015vmin); }
      }
      @keyframes credits-flash {
        0%, 30%   { opacity: 1;    }
        40%       { opacity: 0.97; }
        42%, 85%  { opacity: 1;    }
        92%       { opacity: 0.94; }
        94%, 100% { opacity: 1;    }
      }

      .credits-group, .credits-final {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        opacity: 0;
        transition: opacity 300ms ease;
      }

      .credits-group--show {
        opacity: 1;
        transition-delay: 300ms;
        animation: credits-wiggle 200ms infinite 300ms,
                   credits-flash 2200ms infinite 300ms;
      }

      .credits-group-credit, .credits-group-sub {
        position: relative;
        margin-bottom: var(--credits-margin);
        color: var(--color-credits);
        background: linear-gradient(var(--color-credits-top), var(--color-credits-bottom));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      
      .credits-group-credit:after, .credits-group-sub:after {
        content: attr(data-text);
        position: absolute;
        z-index: -1;
        width: 100%;
        top: 0;
        left: 0;
        background: none;
        text-shadow: var(--credits-shadow-offset) var(--credits-shadow-offset) var(--credits-shadow-blur) #000;
        -webkit-text-fill-color: currentcolor;
      }

      .credits-group-credit { font-weight: 800; text-transform: uppercase; }
      .credits-group-credit > span { font-size: calc(var(--credits-fsize) * 0.8); }
      .credits-group-sub { font-size: var(--credits-fsize-small); }
      @media screen and (max-aspect-ratio: 16/9) {
        .credits-group-sub { font-size: calc(4.6 * 0.5625vw); }
      }

      .credits-final-link {
        display: inline-block;
        width: var(--credits-link-size);
        height: var(--credits-link-size);
        margin: var(--credits-link-margin);
        background-size: 100% 100%;
      }
      @media screen and (max-aspect-ratio: 16/9) {
        .credits-final-link {
          width: calc(12 * 0.5625vw);
          height: calc(12 * 0.5625vw);
          margin: calc(5 * 0.5625vw);
        }
      }
      .credits-final-link:hover { opacity: 0.8; }
      .credits-final-link--website { background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/161676/website.svg"); }
      .credits-final-link--github { background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/161676/github.svg"); }
      .credits-final-link--twitter { background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/161676/twitter.svg"); }
      .credits-final-link--codepen { background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/161676/codepen.svg"); }

      .grain {
        position: fixed;
        top: -50vh;
        left: -50vw;
        height: 200vh;
        width: 200vw;
        background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/161676/grain.png");
        animation: grain-wiggle 5s steps(10) infinite;
        pointer-events: none;
        z-index: 5;
      }
      @keyframes grain-wiggle {
        0%  { transform: translate(8%, -5%);  }
        10% { transform: translate(0%, 0%);   }
        20% { transform: translate(10%, -15%); }
        30% { transform: translate(-10%, 0%);   }
        40% { transform: translate(25%, 15%);  }
        50% { transform: translate(10%, -10%); }
        60% { transform: translate(-5%, 5%);   }
        70% { transform: translate(15%, 0%);   }
        80% { transform: translate(-20%, -10%); }
        90% { transform: translate(20%, 15%);  }
        100%{ transform: translate(4%, 7%);   }
      }

      .letterbox {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 100vh;
        width: calc(100vh / 0.5625);
        pointer-events: none;
        display: none;
        z-index: 100;
      }
      .letterbox--show { display: block; }
      @media screen and (max-aspect-ratio: 16/9) {
        .letterbox { height: calc(100vw * 0.5625); width: 100vw; }
      }
      .letterbox-cover { position: absolute; width: 5000px; height: 5000px; background: #000; }
      .letterbox-cover--top { bottom: 100%; left: 50%; transform: translateX(-50%); }
      .letterbox-cover--bottom { top: 100%; left: 50%; transform: translateX(-50%); }
      .letterbox-cover--left { right: 100%; top: 50%; transform: translateY(-50%); }
      .letterbox-cover--right { left: 100%; top: 50%; transform: translateY(-50%); }

      /* Scene Animations */
      @keyframes scene1 { 0% { transform: translate(-43.85%, -40%) scale(2.2); } 100% { transform: translate(-43.85%, -40%) scale(1); } }
      .title--scene1 [data-letter="A"] { position: absolute; top:50%; left:50%; animation: scene1 7000ms ease-out forwards; transform-origin: 43.85% 40%; font-size: calc(28vmin * 60); }
      @media screen and (max-aspect-ratio: 16/9) { .title--scene1 [data-letter="A"] { font-size: calc(28 * 0.5625vw * 60); } }

      @keyframes scene2-word { 0% { transform: translate(-68%, -41%); } 100% { transform: translate(-68%, -38%); } }
      @keyframes scene2-letter { 0% { transform: scale(1); } 100% { transform: scale(0.92); } }
      .title--scene2 .title-word { position: absolute; top:50%; left:50%; animation: scene2-word 3000ms linear forwards; }
      .title--scene2 [data-letter="N"] { font-size: calc(28vmin * 20); animation: scene2-letter 3000ms linear forwards; transform-origin: 68.4% 40%; }
      @media screen and (max-aspect-ratio: 16/9) { .title--scene2 [data-letter="N"] { font-size: calc(28 * 0.5625vw * 20); } }

      @keyframes scene3-r { 0% { transform: translate(-78%, -30%) scale(0.95); } 100% { transform: translate(-81%, -30%) scale(0.84); } }
      @keyframes scene3-i { 0% { transform: translate(15%, -50%); } 100% { transform: translate(35%, -50%); } }
      .title--scene3 [data-letter="R"] { position: absolute; top:50%; left:50%; font-size: calc(28vmin * 23); animation: scene3-r 3000ms linear forwards; transform-origin: 75% 27%; }
      .title--scene3 [data-letter="I"] { position: absolute; top:50%; left:50%; font-size: calc(28vmin * 23); animation: scene3-i 3000ms linear forwards; }
      @media screen and (max-aspect-ratio: 16/9) { 
        .title--scene3 [data-letter="R"] { font-size: calc(28 * 0.5625vw * 23); }
        .title--scene3 [data-letter="I"] { font-size: calc(28 * 0.5625vw * 23); }
      }

      @keyframes scene4-word { 0% { transform: translate(-50%, -50%) scale(1); } 100% { transform: translate(-50%, -50%) scale(0.9); } }
      @keyframes scene4-s { 0% { transform: translate(-53%, -11%); } 100% { transform: translate(-65%, -11%); } }
      @keyframes scene4-g { 0% { transform: translate(-42%, -90%); } 100% { transform: translate(-34%, -90%); } }
      .title--scene4 .title-word { position: absolute; top:50%; left:50%; animation: scene4-word 3000ms linear forwards; }
      .title--scene4 [data-letter="S"] { position: absolute; top:50%; left:50%; font-size: calc(28vmin * 18); animation: scene4-s 3000ms linear forwards; }
      .title--scene4 [data-letter="G"] { position: absolute; top:50%; left:50%; font-size: calc(28vmin * 18); animation: scene4-g 3000ms linear forwards; }
      @media screen and (max-aspect-ratio: 16/9) {
        .title--scene4 [data-letter="S"] { font-size: calc(28 * 0.5625vw * 18); }
        .title--scene4 [data-letter="G"] { font-size: calc(28 * 0.5625vw * 18); }
      }

      @keyframes scene5-r { 0% { transform: translate(-118%, -30%); } 100% { transform: translate(-112%, -34%); } }
      @keyframes scene5-s { 0% { transform: translate(-19%, -28.5%); } 100% { transform: translate(-22%, -32%); } }
      .title--scene5 [data-letter="R"] { position: absolute; top:50%; left:50%; font-size: calc(28vmin * 14); animation: scene5-r 3000ms linear forwards; }
      .title--scene5 [data-letter="S"] { position: absolute; top:50%; left:50%; font-size: calc(28vmin * 14); animation: scene5-s 3000ms linear forwards; }
      @media screen and (max-aspect-ratio: 16/9) {
        .title--scene5 [data-letter="R"] { font-size: calc(28 * 0.5625vw * 14); }
        .title--scene5 [data-letter="S"] { font-size: calc(28 * 0.5625vw * 14); }
      }

      @keyframes scene6-fade-out { 0%, 40% { opacity: 1; } 85%, 100% { opacity: 0; } }
      @keyframes scene6-i { 0% { transform: translate(-105%, -91%); } 85%, 100% { transform: translate(-135%, -85%); } }
      @keyframes scene6-a { 0% { transform: translate(14%, -91%); } 85%, 100% { transform: translate(34%, -85%); } }
      @keyframes scene6-t { 0% { transform: translate(-134%, -7%); } 85%, 100% { transform: translate(-111%, -1%); } }
      @keyframes scene6-h { 0% { transform: translate(24%, -7%); } 85%, 100% { transform: translate(15%, -1%); } }
      @keyframes scene6-fade-in { 0%, 40% { opacity: 0; } 85%, 100% { opacity: 1; } }
      @keyframes scene6-n { 0%, 40% { transform: translate(-170%, -50%); } 100% { transform: translate(-147%, -50%); } }
      @keyframes scene6-g { 0%, 40% { transform: translate(82%, -50%); } 100% { transform: translate(49%, -50%); } }
      .title--scene6 [data-letter="I"] { position: absolute; top:50%; left:50%; font-size: calc(28vmin * 8); animation: scene6-i 6000ms linear forwards, scene6-fade-out 6000ms linear forwards; }
      .title--scene6 [data-letter="A"] { position: absolute; top:50%; left:50%; font-size: calc(28vmin * 8); animation: scene6-a 6000ms linear forwards, scene6-fade-out 6000ms linear forwards; }
      .title--scene6 [data-letter="T"] { position: absolute; top:50%; left:50%; font-size: calc(28vmin * 8); animation: scene6-t 6000ms linear forwards, scene6-fade-out 6000ms linear forwards; }
      .title--scene6 [data-letter="H"] { position: absolute; top:50%; left:50%; font-size: calc(28vmin * 8); animation: scene6-h 6000ms linear forwards, scene6-fade-out 6000ms linear forwards; }
      .title--scene6 [data-letter="N"] { position: absolute; top:50%; left:50%; font-size: calc(28vmin * 3); animation: scene6-n 6000ms linear forwards, scene6-fade-in 6000ms linear forwards; }
      .title--scene6 [data-letter="G"] { position: absolute; top:50%; left:50%; font-size: calc(28vmin * 3); animation: scene6-g 6000ms linear forwards, scene6-fade-in 6000ms linear forwards; }
      @media screen and (max-aspect-ratio: 16/9) {
        .title--scene6 [data-letter="I"] { font-size: calc(28 * 0.5625vw * 8); }
        .title--scene6 [data-letter="A"] { font-size: calc(28 * 0.5625vw * 8); }
        .title--scene6 [data-letter="T"] { font-size: calc(28 * 0.5625vw * 8); }
        .title--scene6 [data-letter="H"] { font-size: calc(28 * 0.5625vw * 8); }
        .title--scene6 [data-letter="N"] { font-size: calc(28 * 0.5625vw * 3); }
        .title--scene6 [data-letter="G"] { font-size: calc(28 * 0.5625vw * 3); }
      }

      /* Full Title Keyframes */
      @keyframes full-title {
        0% { opacity: 1; transform: translate(-50%, -41%) scale(0.8); color: var(--color-bg); }
        80% { color: var(--color-bg); }
        90% { opacity: 1; color: var(--color-title); }
        100% { opacity: 0; transform: translate(-50%, -45%) scale(0.06); color: var(--color-title); }
      }
      @keyframes full-s1 { 0%, 50% { transform: translateX(-200%); } 76%, 100% { transform: translateX(0%); } }
      @keyframes full-t1 { 0%, 40% { transform: translateY(-120%); } 75%, 100% { transform: translateY(0%); } }
      @keyframes full-r1 { 0%, 25% { transform: translateX(-55%); } 72%, 100% { transform: translateX(0%); } }
      @keyframes full-a { 0% { transform: translateX(-15%); } 40%, 100% { transform: translateX(0%); } }
      @keyframes full-n1 { 0% { transform: translateX(15%); } 40%, 100% { transform: translateX(0%); } }
      @keyframes full-g1 { 0% { transform: translateX(30%); } 55%, 100% { transform: translateX(0%); } }
      @keyframes full-e { 0%, 50% { transform: translateY(-120%); } 75%, 100% { transform: translateY(0%); } }
      @keyframes full-r2 { 0%, 45% { transform: translateX(200%); } 71%, 100% { transform: translateX(0%); } }
      @keyframes full-t2 { 0%, 30% { transform: translateX(-80%); } 60%, 100% { transform: translateX(0%); } }
      @keyframes full-h { 0%, 36% { transform: translateY(200%); } 76%, 100% { transform: translateY(0%); } }
      @keyframes full-i { 0%, 25% { transform: translateX(-70%); } 75%, 100% { transform: translateX(0%); } }
      @keyframes full-n2 { 0%, 10% { transform: translateY(70%); } 40%, 100% { transform: translateY(0%); } }
      @keyframes full-g2 { 0% { transform: translateX(30%); } 45%, 100% { transform: translateX(0%); } }
      @keyframes full-s2 { 0%, 40% { transform: translateY(200%); } 80%, 100% { transform: translateY(0%); } }
      @keyframes full-bar-top { 0%, 67% { transform: scaleX(0); } 72%, 100% { transform: scaleX(1); } }
      @keyframes full-bar-side { 0%, 70% { transform: scaleX(0); } 75%, 100% { transform: scaleX(1); } }

      .title--full { width: 1000vw; animation: full-title 20s cubic-bezier(0.15, 0.7, 0.26, 0.88) forwards; transform-origin: 50% 45%; }
      .title--full .title-word-letter { font-size: calc(28vmin * 10); }
      @media screen and (max-aspect-ratio: 16/9) { .title--full .title-word-letter { font-size: calc(28 * 0.5625vw * 10); } }
      .title--full .title-word-letter-large { font-size: calc(34vmin * 10); }
      @media screen and (max-aspect-ratio: 16/9) { .title--full .title-word-letter-large { font-size: calc(34 * 0.5625vw * 10); } }
      
      .title--full [data-letter="S1"] { animation: full-s1 20s ease forwards; }
      .title--full [data-letter="T1"] { animation: full-t1 20s ease forwards; }
      .title--full [data-letter="R1"] { animation: full-r1 20s ease forwards; }
      .title--full [data-letter="A"] { animation: full-a 20s ease forwards; }
      .title--full [data-letter="N1"] { letter-spacing: -15vmin; animation: full-n1 20s ease forwards; }
      .title--full [data-letter="G1"] { animation: full-g1 20s ease forwards; }
      .title--full [data-letter="E1"] { animation: full-e 20s ease forwards; }
      .title--full [data-letter="E2"] { animation: full-t1 20s ease forwards; }
      .title--full [data-letter="R2"] { animation: full-r2 20s ease forwards; }
      .title--full [data-letter="T2"] { animation: full-t2 20s ease forwards; }
      .title--full [data-letter="H"] { animation: full-h 20s ease forwards; }
      .title--full [data-letter="I"] { animation: full-i 20s ease forwards; }
      .title--full [data-letter="N2"] { letter-spacing: -15vmin; animation: full-n2 20s ease forwards; }
      .title--full [data-letter="G2"] { animation: full-g2 20s ease forwards; }
      .title--full [data-letter="S2"] { animation: full-s2 20s ease forwards; }

      .title--full .titlebar {
        height: calc(1vmin * 10); border-width: calc(0.4vmin * 10); border-radius: calc(0.1vmin * 10);
        box-shadow: 0 0 calc(1.2vmin * 10) rgba(193, 27, 31, 0.8), 0 0 calc(0.5vmin * 10) rgba(193, 27, 31, 0.8) inset;
      }
      @media screen and (max-aspect-ratio: 16/9) {
        .title--full .titlebar {
          height: calc(1 * 0.5625vw * 10); border-width: calc(0.4 * 0.5625vw * 10); border-radius: calc(0.1 * 0.5625vw * 10);
          box-shadow: 0 0 calc(1.2 * 0.5625vw * 10) rgba(193, 27, 31, 0.8), 0 0 calc(0.5 * 0.5625vw * 10) rgba(193, 27, 31, 0.8) inset;
        }
      }
      .title--full .titlebar--top { animation: full-bar-top 20s ease forwards; }
      .title--full .titlebar--left, .title--full .titlebar--right { animation: full-bar-side 20s ease forwards; }
      .title--full .titlebar--left { transform-origin: right; }
      .title--full .titlebar--right { transform-origin: left; }

      /* Skip Intro Button Styles */
      .skip-intro-btn {
        position: fixed;
        bottom: 80px;
        right: 50px;
        z-index: 10000;
        padding: 16px 32px;
        background: rgba(10, 10, 10, 0.7);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 2px solid rgba(193, 27, 31, 0.4);
        border-radius: 8px;
        color: #C8C6C7;
        font-family: 'Benguiat', serif;
        font-size: 16px;
        font-weight: bold;
        letter-spacing: 3px;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), 0 0 30px rgba(193, 27, 31, 0.2);
        overflow: hidden;
        display: none;
        opacity: 0;
      }

      .skip-intro-btn--show {
        display: block;
        opacity: 1;
      }

      .skip-intro-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(193, 27, 31, 0.3), transparent);
        transition: left 0.6s ease;
      }

      .skip-intro-btn:hover::before {
        left: 100%;
      }

      .skip-intro-btn:hover {
        background: rgba(193, 27, 31, 0.2);
        border-color: rgba(193, 27, 31, 0.9);
        color: #FFFFFF;
        transform: translateY(-4px) scale(1.05);
        box-shadow: 0 8px 40px rgba(193, 27, 31, 0.5), 0 0 60px rgba(193, 27, 31, 0.4), inset 0 0 20px rgba(193, 27, 31, 0.2);
        text-shadow: 0 0 10px rgba(193, 27, 31, 0.8), 0 0 20px rgba(193, 27, 31, 0.5);
      }

      .skip-intro-btn:active {
        transform: translateY(-2px) scale(1.02);
        box-shadow: 0 4px 20px rgba(193, 27, 31, 0.4), 0 0 40px rgba(193, 27, 31, 0.3);
      }

      /* Pulsing glow animation */
      @keyframes skip-btn-pulse {
        0%, 100% {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), 0 0 30px rgba(193, 27, 31, 0.2);
        }
        50% {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(193, 27, 31, 0.4);
        }
      }

      .skip-intro-btn {
        animation: skip-btn-pulse 3s ease-in-out infinite;
      }

    </style>

    <div id="loader-wrapper">
      <div class="intro">
        <h1 class="intro-title">INTELLINA 2K26</h1>
        <p class="intro-text intro-text--can intro-text--show" style="max-width: 600px; margin: 0 auto; letter-spacing: 0.5px;">
          <span style="display: block; margin-bottom: 1em; text-transform: uppercase; font-size: 0.8em; letter-spacing: 2px; color: #666;">-- U.S. DEPARTMENT OF ENERGY --</span>
          The Department of AI & Data Science is cracking the dimensional barrier at C.I.T. 
          <br><br>
          <span style="color: #fff; text-shadow: 0 0 5px rgba(255,255,255,0.5);">WARNING:</span> The frequencies are unstable. 
          Engage your audio transmitters for safe passage.
          <br/>
          
          <button class="intro-text-play mt-8" data-play>
            OPEN THE GATE
          </button>
        </p>

        <p class="intro-text intro-text--shouldnt">
          This portal utilizes advanced frequencies only supported by the latest 
          transmitters (Google Chrome). You may proceed, but the dimension may appear 
          unstable. For the best experience, use Chrome.
          <br/>
          <a class="intro-text-button" href="https://www.google.com/chrome/browser/">
            Upgrade Transmitter
          </a>
          <button class="intro-text-button" data-play>
            Enter Portal
          </button>
        </p>

        <p class="intro-text intro-text--cant">
          Your current device is unable to stabilize the rift. 
          Please utilize a Google Chrome transmitter to proceed with this 
          technical encounter.
          <br/>
          <a class="intro-text-button" href="https://www.google.com/chrome/browser/">
            Get Chrome
          </a>
        </p>

        <noscript>
          Stabilizing this rift requires active JavaScript. 
          Please enable it to proceed with the encounter.
        </noscript>
      </div>

      <div class="viewport">
        <div class="scene">
          <div class="title title--full">
            <div class="title-word">
              <span class="title-word-letter" data-letter="S1">
                <span class="title-word-letter-large">I</span>
                <div class="titlebar titlebar--left"></div>
              </span>
              <span class="title-word-letter" data-letter="T1">N</span>
              <span class="title-word-letter" data-letter="R1">T</span>
              <span class="title-word-letter" data-letter="A">E</span>
              <span class="title-word-letter" data-letter="N1">L</span>
              <span class="title-word-letter" data-letter="G1">L</span>
              <span class="title-word-letter" data-letter="E1">I</span>
              <span class="title-word-letter" data-letter="E2">N</span>
              <span class="title-word-letter" data-letter="R2">
                <span class="title-word-letter-large">A</span>
                <div class="titlebar titlebar--right"></div>
              </span>
              <div class="titlebar titlebar--top"></div>
            </div>

            <div></div>

            <div class="title-word title-word--second">
              <span class="title-word-letter" data-letter="T2">2</span>
              <span class="title-word-letter" data-letter="H">K</span>
              <span class="title-word-letter" data-letter="G2">2</span>
              <span class="title-word-letter" data-letter="S2">6</span>
            </div>
          </div>

          <div class="title title--scene title--scene0"></div>
          <div class="title title--scene title--scene1"><div class="title-word"><div class="title-word-letter" data-letter="A">I</div></div></div>
          <div class="title title--scene title--scene2"><div class="title-word"><div class="title-word-letter" data-letter="N">N</div></div></div>
          <div class="title title--scene title--scene3"><div class="title-word"><div class="title-word-letter" data-letter="R">T</div><div class="title-word-letter" data-letter="I">I</div></div></div>
          <div class="title title--scene title--scene4"><div class="title-word"><div class="title-word-letter" data-letter="S">L</div><div class="title-word-letter" data-letter="G">L</div></div></div>
          <div class="title title--scene title--scene5"><div class="title-word"><div class="title-word-letter" data-letter="R">I</div><div class="title-word-letter" data-letter="S">N</div></div></div>
          <div class="title title--scene title--scene6">
            <div class="title-word">
              <div class="title-word-letter" data-letter="I">I</div>
              <div class="title-word-letter" data-letter="A">N</div>
              <div class="title-word-letter" data-letter="T">T</div>
              <div class="title-word-letter" data-letter="H">E</div>
              <div class="title-word-letter" data-letter="N">L</div>
              <div class="title-word-letter" data-letter="G">L</div>
            </div>
          </div>
        </div>

        <div class="credits">
          <div class="credits-group"><div class="credits-group-credit" data-text="A CIT Original Series">A CIT Original Series</div></div>
          <div class="credits-group"><div class="credits-group-credit" data-text="The Department of">The Department of</div></div>
          <div class="credits-group"><div class="credits-group-credit" data-text="Artificial Intelligence and Data Science">Artificial Intelligence and Data Science</div></div>
          <div class="credits-group">
            <div class="credits-group-credit" data-text="Proudly Presents">Proudly Presents</div>
            <div class="credits-group-credit" data-text="A National Level Tech Symposium">A National Level Tech Symposium</div>
          </div>
          <div class="credits-group">
            <div class="credits-group-credit" data-text="INTELLINA">INTELLINA</div>
            <div class="credits-group-credit" data-text="2K26">2K26</div>
          </div>
          <div class="credits-group">
            <div class="credits-group-credit" data-text="Coming Soon">Coming Soon</div>
            <div class="credits-group-credit" data-text="MARCH 6 & 7">MARCH 6 & 7</div>
          </div>
          <div class="credits-group"><div class="credits-group-credit" data-text="Get Ready">Get Ready</div></div>
          <div class="credits-group">
            <div class="credits-group-sub" data-text="To Enter">To Enter</div>
            <div class="credits-group-credit" data-text="The National Level Tech Symposium">The National Level Tech Symposium</div>
          </div>
          
        </div>
      </div>

      <div class="vignette"></div>
      <div class="grain"></div>
      <div class="letterbox">
        <div class="letterbox-cover letterbox-cover--top"></div>
        <div class="letterbox-cover letterbox-cover--left"></div>
        <div class="letterbox-cover letterbox-cover--right"></div>
        <div class="letterbox-cover letterbox-cover--bottom"></div>
      </div>

      <!-- Skip Intro Button -->
      <button class="skip-intro-btn" data-skip-intro>
        Skip Intro
      </button>
    </div>
  `;
}

export function initLoader(onComplete) {
  // Minimal Modernizr-like check
  const Modernizr = {
    audio: !!(document.createElement('audio').canPlayType),
    cssanimations: true,
    textshadow: true,
    textstroke: (function () {
      const h1 = document.createElement('h1');
      return ('webkitTextStroke' in h1.style) || ('textStroke' in h1.style);
    })()
  };

  const intro = document.querySelector('.intro');
  const viewport = document.querySelector('.viewport');
  const letterbox = document.querySelector('.letterbox');
  const scenes = document.querySelectorAll('.title--scene');
  const fullTitle = document.querySelector('.title--full');
  const credits = document.querySelectorAll('.credits-group');
  const finalCredit = document.querySelector('.credits-final');

  const music = new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/161676/music.mp3");
  const timeouts = [];

  const start = () => {
    intro.classList.add('intro--hide');
    music.addEventListener('canplay', () => {
      setTimeout(() => {
        startAnimation();
        setTimeout(() => music.play(), 200);
      }, 1500);
    }, { once: true });
    // Force start if canplay doesn't fire fast enough
    setTimeout(() => {
      if (music.paused) {
        startAnimation();
        music.play();
      }
    }, 2000);
  };

  const startAnimation = () => {
    const creditsMs = 3000;
    const scenesMs = [creditsMs, creditsMs * 2, creditsMs, creditsMs, creditsMs, creditsMs, creditsMs * 2, 19500];

    viewport.classList.add('viewport--show');
    letterbox.classList.add('letterbox--show');

    // Show the skip intro button when animation starts
    const skipBtn = document.querySelector('[data-skip-intro]');
    if (skipBtn) {
      skipBtn.classList.add('skip-intro-btn--show');
    }

    credits.forEach((credit, i) => {
      const t1 = setTimeout(() => {
        if (credits[i - 1]) credits[i - 1].classList.remove('credits-group--show');
        credit.classList.add('credits-group--show');
      }, i * creditsMs);
      timeouts.push(t1);
    });

    // Hide the last credit after its duration
    const tLastCredit = setTimeout(() => {
      if (credits[credits.length - 1]) credits[credits.length - 1].classList.remove('credits-group--show');
    }, credits.length * creditsMs);
    timeouts.push(tLastCredit);

    let offset = 0;
    scenes.forEach((scene, i) => {
      const tScene = setTimeout(() => {
        if (scenes[i - 1]) scenes[i - 1].classList.remove('title--show');
        scene.classList.add('title--show');
      }, offset);
      timeouts.push(tScene);
      offset += scenesMs[i];
    });

    const tFullTitle = setTimeout(() => {
      scenes[scenes.length - 1].classList.remove('title--show');
      fullTitle.classList.add('title--show');

      // Complete callback after sequence
      const tComplete = setTimeout(() => {
        onComplete();
      }, 20000);
      timeouts.push(tComplete);
    }, offset);
    timeouts.push(tFullTitle);

    const tFinalCredit = setTimeout(() => {
      finalCredit.classList.add('credits-group--show');
    }, offset + 21000);
    timeouts.push(tFinalCredit);
  };

  const btns = document.querySelectorAll("[data-play]");
  btns.forEach(btn => btn.addEventListener('click', start));

  // Skip Intro Button Handler
  const skipBtn = document.querySelector('[data-skip-intro]');
  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      // Clear all active timeouts
      timeouts.forEach(t => clearTimeout(t));

      // Stop music if playing
      if (!music.paused) {
        music.pause();
        music.currentTime = 0;
      }

      // Hide the skip button
      skipBtn.style.display = 'none';

      // Ensure intro is hidden
      if (intro) intro.classList.add('intro--hide');

      // Ensure viewport and letterbox are shown
      if (viewport) viewport.classList.add('viewport--show');
      if (letterbox) letterbox.classList.add('letterbox--show');

      // Reset visibility of all elements
      credits.forEach(c => c.classList.remove('credits-group--show'));
      scenes.forEach(s => s.classList.remove('title--show'));

      // Immediately show the final title (Intellina 2K26)
      fullTitle.classList.add('title--show');

      // Wait 3 seconds at the final look, then transition
      setTimeout(() => {
        onComplete();
      }, 3000);
    });
  }
}
