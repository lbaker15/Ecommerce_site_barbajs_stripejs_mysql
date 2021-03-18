import '/scss/main.scss';
import {gsap} from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Splide from '@splidejs/splide';

gsap.registerPlugin(ScrollTrigger);



//One - image tilt
gsap.fromTo(".left2 .image", {rotate: 5}, {
    scrollTrigger: {
        trigger: '.grid2',
        start: 'top 70%',
        end: 'top 30%',
        scrub: true,
        toggleActions: "restart none none none",
        markers: true
    },
    rotate: 0,
    duration: 1
})
gsap.fromTo(".right2 .image", {rotate: 5}, {
    scrollTrigger: {
        trigger: '.grid2',
        start: 'top 20%',
        end: 'top -10%',
        scrub: true,
        toggleActions: "restart none none none",
        markers: true
    },
    rotate: 0,
    duration: 1
})

//Three - parallax section 
gsap.to(".grid3", {
    scrollTrigger: {
        trigger: '.grid3',
        start: '20% bottom',
        end: 'top top',
        scrub: true,
        toggleActions: "restart none none none",
        markers: true
    },
    marginTop: 0,
    duration: 1
})
gsap.to(".grid4", {
    scrollTrigger: {
        trigger: '.grid4',
        start: '20% bottom',
        end: 'top top',
        scrub: true,
        toggleActions: "restart none none none",
        markers: {startColor: 'green'}
    },
    marginTop: -10 + 'vh',
    duration: 1
})

//Four - image section
gsap.fromTo(".left4 .image", {rotate: 5}, {
    scrollTrigger: {
        trigger: '.grid4',
        start: 'top 70%',
        end: 'top 30%',
        scrub: true,
        toggleActions: "restart none none none",
        markers: true
    },
    rotate: 0,
    duration: 1
})
gsap.fromTo(".right4 .image", {rotate: 5}, {
    scrollTrigger: {
        trigger: '.grid4',
        start: 'top 20%',
        end: 'top -10%',
        scrub: true,
        toggleActions: "restart none none none",
        markers: true
    },
    rotate: 0,
    duration: 1
})

//Five - orange section
gsap.fromTo(".img1", {marginTop: -1600}, {
    scrollTrigger: {
        trigger: '.trig1',
        start: 'top 100%',
        end: 'top 0%',
        scrub: true,
        toggleActions: "restart none none none",
        // markers: {startColor: 'blue'}
    },
    marginTop: -2000 + 'px'
})

gsap.fromTo(".img2", {marginTop: -1200}, {
    scrollTrigger: {
        trigger: '.trig2',
        start: 'top 100%',
        end: 'top 0%',
        scrub: true,
        toggleActions: "restart none none none",
        markers: {startColor: 'pink'}
    },
    marginTop: -1500 + 'px'
})

gsap.fromTo(".img3", {marginTop: -800}, {
    scrollTrigger: {
        trigger: '.trig3',
        start: 'top 100%',
        end: 'top 0%',
        scrub: true,
        toggleActions: "restart none none none",
        markers: {startColor: 'pink'}
    },
    marginTop: -1100 + 'px'
})

//Splide
const grid6 = document.querySelector('.grid6');
//This should not fire on products page
document.addEventListener('DOMContentLoaded', () => {
    new Splide('#card-slider', {
        perPage: 3,
        type: 'loop',
        classes: {
            next: 'splide__arrow--next right'
        },
        autoplay: true,
        gap: 40,
        fixedWidth: 390,
        focus: 'center',
        updateOnMove: true,
        pauseOnHover: true
    }).mount()
})
//Font awesome
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas) 

dom.i2svg() 



