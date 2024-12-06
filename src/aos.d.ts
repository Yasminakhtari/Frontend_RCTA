// src/@types/aos.d.ts

declare module "aos" {
    interface AOSOptions {
      offset?: number; // offset (in px) from the original trigger point
      delay?: number; // values from 0 to 3000, with step 50ms
      duration?: number; // values from 0 to 3000, with step 50ms
      easing?: string; // default easing for AOS animations
      once?: boolean; // whether animation should happen only once - while scrolling down
      mirror?: boolean; // whether elements should animate out while scrolling past them
      anchorPlacement?: string; // defines which position of the element regarding to window should trigger the animation
    }
  
    const AOS: {
      init: (options?: AOSOptions) => void;
      refresh: () => void;
    };
    export default AOS;
  }
  