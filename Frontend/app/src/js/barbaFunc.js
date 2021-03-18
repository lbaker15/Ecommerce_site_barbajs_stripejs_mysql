import barba from '@barba/core';
import $ from "jquery";
import {gsap} from "gsap";
import {TimelineMax, TweenMax} from "gsap/all";

import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {splash} from './indexgsap';
import {splideTweak} from './splide';
import {makePayment, loadCheck, setShip} from './checkoutVFunctions';
import {addToC, increment, decrement, displayProducts} from './productsFunc';
import {login, logout} from './signinFunc';
import {displayCart} from './cartFunc';
import { cookieCheck, innerCookieChecker } from './cookieMenu';
import { getOrders, getOrdersCook } from './adminFunc';

//PRODUCTS PAGE
const eventListener1 = (data) => {
    if (data.next.url.path === '/about.html') {
    $('#productsLinkOpen').click(() => {
        new Promise((res, rej) => {
            let value = document.cookie.split('=')[1]
            let name = document.cookie.split('=')[0]
            console.log("HERE", name === "main_cookie")
            if (name === "main_cookie") {
                displayProducts()
                //CHECK HERE WHETHER COOKIE IS STILL VALID
                res(value)
            } else {
                displayProducts()
                rej('No cookie exists')
            }
        })
        .then((value) => {
            return new Promise((resolve, rej) => {
                fetch('http://localhost:8000/get-cart', {
                    method: 'GET',
                    headers: {
                        'credentials': 'include',
                        'Authorization': value
                    }
                })
                .then(res => {
                    if (res.status === 403) {
                        console.log('You are not authorized')
                        rej('Cookie is expired')
                    } else if (res.status === 200) {
                        console.log('You are authorized')
                        return res.json()
                    }
                })
            })
        })
        .catch(err => console.log(err))
    })
    }
}


//LOGGING IN FUNCTIONS
const eventListener3 = () => {
    $('#submit').on("click", login);
}
const eventListener4 = () => {
    $('#liSix').on('click', logout)
}

//NAVIGATING TO THE CART FROM ICON
const navigateCart = () => {
    //THIS WILL NEED TO OPEN OVERLAY THEN A BUTTON INSIDE OVERLAY SHOULD CARRY OUT FOLLOWING CODE
    let newUrl ='/cart.html'
    $('.hide').attr('href', newUrl)
}
const eventListener5 = () => {
    $('.hide').on('click', navigateCart)
}

//CART FUNCTIONS
const eventListener6 = (data) => {
    if (data.next.url.path === '/cart.html') {
            let {name, value} = innerCookieChecker()
            if (name === "main_cookie") {
                displayCart(value)
            } else {
                return
            }
    }
}

//FONT AWESOME
const eventListener7 = () => {
    library.add(fas) 
    dom.i2svg() 
}

//ANIMATION BETWEEN PAGES 
const eventListener8 = (data) => {
    if (data.next.url.path === '/signin.html') {
        $('body').css('overflow-y', 'hidden')
    } else {
        $('body').css('overflow-y', 'scroll')
    }
}
                    
//CHECKOUT FUNCTIONS
const eventListener9 = (data) => {
        if (data.next.url.path === '/checkoutVerify.html') {
            console.log('on checkout')
            loadCheck()
            $('.shippingOptions button').on('click', setShip)
            $('.payment').on('click', makePayment)
        }
}
//INDEX EVENT LISTENERS ANIMATIONS
const eventListener10 = (data) => {
    if (data.next.url.path === '/index.html') {
        splash()
        splideTweak()
    }
}

const eventListener11 = (data) => {
    if (data.next.url.path === '/admin.html') {
        getOrdersCook()
    }
}

//transition element needs to be size of the window
barba.init(
    {
        transitions: [{
            name: 'default-transition',
            leave(data) {
                var done = this.async()
                gsap.to(data.current.container, {opacity: 0, duration: 0.25})
                .then(() => {
                    // document.getElementById('navbar').style.display = "none"
                    const nav = document.getElementsByTagName('nav')
                    const hideMe = Array.from(nav)[0];
                    hideMe.style.visibility = "hidden";

                    var tl2 = gsap.timeline({paused: true,  onComplete: () => {done()}  })
                    tl2.to('.movingTransition', {display: 'block', zIndex: 9000000, duration: 0.1})
                    tl2.to('.movingTransition', {width: 100 + "vw", marginLeft: 0, duration: 0.5}, '-=0.1')
                    tl2.to('.movingTransition', {width: 0 + "vw", marginLeft: 0, duration: 0.5})
                    tl2.to('.movingTransition', {display: 'none', zIndex: -1, marginLeft: 100 + 'vw', duration: 0.1})

                    tl2.restart()
                })
            },
            enter(data) {
                var done = this.async();
                eventListener1(data)
                eventListener3()
                eventListener4()
                eventListener5()
                eventListener6(data)
                eventListener7()
                gsap.fromTo(data.next.container, {opacity: 0}, {
                    opacity: 1, duration: 1
                });
                eventListener8(data)
                eventListener9(data)
                eventListener10(data)
                eventListener11(data)
                done()
            }
        }]
    }
)


var tl = gsap.timeline({paused: true, onComplete: () => {done()}})
tl.to('.movingTransition', {display: 'block', zIndex: 9000000, duration: 0.1})
tl.to('.movingTransition', {width: 100 + "vw", marginLeft: 0, duration: 0.5}, '-=0.1')
tl.to('.movingTransition', {width: 0 + "vw", marginLeft: 0, duration: 0.5})
tl.to('.movingTransition', {display: 'none', zIndex: -1, marginLeft: 100 + 'vw', duration: 0.1})





//Header
$('.burgerIcon').hover(function() {
    TweenMax.to('.burgerLine:first-child', 0.2, { x: -10 });
    TweenMax.to('.burgerLine:last-child', 0.2, { x: 10 });
},
              
function() {
    TweenMax.to('.burgerLine:first-child', 0.2, { x: 0 });
    TweenMax.to('.burgerLine:last-child', 0.2, { x: 0 });
});

var tlmenu = new TimelineMax({paused:true});

tlmenu.to('nav', 0.3, { autoAlpha:1 })
.staggerFromTo('nav li', 0.5, { y: 100, opacity: 0 }, { y: 0, opacity:1 }, 0.1);

$('.burgerIcon').click(function() {
   tlmenu.play(0); 
});

$('.closeButton').click(function() {
   tlmenu.reverse(0); 
});


let listOne = document.getElementById("liOne")
let listTwo = document.getElementById("liTwo")
let listThree = document.getElementById("liThree")
let listFour = document.getElementById("liFour")
let listFive = document.getElementById("liFive")
let imgOne = document.querySelector(".one")
let imgTwo = document.querySelector(".two")
let imgThree = document.querySelector(".three")
let imgFour = document.querySelector(".four")
let imgFive = document.querySelector(".five")

const movement = (listItem, imgItem) => {
  listItem.addEventListener("mouseover", function() { 
    imgItem.style.display = "block"
  })
  listItem.addEventListener("mouseout", function() { 
    imgItem.style.display = "none"
  })
  listItem.addEventListener("mousemove", function(e) {
    const x = e.clientX
    const y = e.clientY
    const target = document.querySelector(".navMenu")
    const targetCoords = target.getBoundingClientRect()
    //targetCoors.left & offsetWidth static numbers larger as window increases
    //offsetWidth hardly changes with window increase - both produce static number that accounts for window
    const top = targetCoords.top 
    const left = targetCoords.left + target.offsetWidth
    //Always subtract the midpoint to create range, add minus here to not break code
    const angleX = -((left - x) - 260)
    const angleY = -(top - y / 2) - 41
    imgItem.style.transform = `translate(${angleX}px, ${angleY}px)`
  })
}
movement(listOne, imgOne)
movement(listTwo, imgTwo)
movement(listThree, imgThree)
movement(listFour, imgFour)
movement(listFive, imgFive)