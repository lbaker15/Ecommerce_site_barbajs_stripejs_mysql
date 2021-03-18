import {gsap} from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import $ from "jquery";
gsap.registerPlugin(ScrollTrigger);

export function splash() {
    ScrollTrigger.matchMedia({
    "(min-width: 1200px)": () => {
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
    gsap.fromTo(".img1", {marginTop: -1400}, {
        scrollTrigger: {
            trigger: '.trig1',
            start: 'top 100%',
            end: 'top 0%',
            scrub: true,
            toggleActions: "restart none none none",
            // markers: {startColor: 'blue'}
        },
        marginTop: -2200 + 'px'
    })
    gsap.fromTo(".img2", {marginTop: -1050}, {
        scrollTrigger: {
            trigger: '.trig2',
            start: 'top 100%',
            end: 'top 0%',
            scrub: true,
            toggleActions: "restart none none none",
            markers: {startColor: 'pink'}
        },
        marginTop: -1650 + 'px'
    })
    gsap.fromTo(".img3", {marginTop: -500}, {
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

    ScrollTrigger.create({
        trigger: ".grid5bg",
        start: "top top", 
        pin: true, 
        markers: {startColor: 'yellow'},
        pinSpacing: false 
      });
      ScrollTrigger.create({
        trigger: ".grid6",
        start: "top top", 
        pin: true, 
        markers: {startColor: 'yellow'},
        pinSpacing: false 
      });

    }})
    ScrollTrigger.matchMedia({
    "(min-width: 900px)": () => {
    //One - image tilt
    gsap.fromTo(".left2 .image", {rotate: 5}, {
        scrollTrigger: {
            trigger: '.grid2',
            start: 'top 50%',
            end: 'top 10%',
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
            start: 'top 50%',
            end: 'top 10%',
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
    gsap.fromTo(".img1", {marginTop: -1400}, {
        scrollTrigger: {
            trigger: '.trig1',
            start: 'top 100%',
            end: 'top 0%',
            scrub: true,
            toggleActions: "restart none none none",
            // markers: {startColor: 'blue'}
        },
        marginTop: -2200 + 'px'
    })
    gsap.fromTo(".img2", {marginTop: -1050}, {
        scrollTrigger: {
            trigger: '.trig2',
            start: 'top 100%',
            end: 'top 0%',
            scrub: true,
            toggleActions: "restart none none none",
            markers: {startColor: 'pink'}
        },
        marginTop: -1650 + 'px'
    })
    gsap.fromTo(".img3", {marginTop: -500}, {
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
    ScrollTrigger.create({
        trigger: ".grid5bg",
        start: "top top", 
        pin: true, 
        markers: {startColor: 'yellow'},
        pinSpacing: false 
      });
      ScrollTrigger.create({
        trigger: ".grid6",
        start: "top top", 
        pin: true, 
        markers: {startColor: 'yellow'},
        pinSpacing: false 
      });

    }})
    ScrollTrigger.matchMedia({
        "(max-width: 900px)": () => {
            reset('.left2 .image')
            reset('.right2 .image')
            reset('.left4 .image')
            reset('.right4 .image')
            hide('.img1') 
            hide('.img2') 
            hide('.img3')
        }
    })
}
const hide = (el) => {
    gsap.to(el, {opacity: 0})
}
const reset = (el) => {
    gsap.fromTo(el, {rotate: 0}, {
       scrollTrigger: {
           trigger: 'body',
           start: 'top 0%',
           end: 'top 0%',
        },
        rotate: 0
    })
}