import '/scss/main.scss';
import $ from "jquery";
import {logout} from './signinFunc';
import { cookieCheck } from './cookieMenu';
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas) 
dom.i2svg() 

//NEEDS TO BE ON ALL PAGES
$('#liSix').on('click', logout)
cookieCheck()
.then((value) => {
    console.log('here')
})
const navigateCart = () => {
    //THIS WILL NEED TO OPEN OVERLAY THEN A BUTTON INSIDE OVERLAY SHOULD CARRY OUT FOLLOWING CODE
    let newUrl ='/cart.html'
    $('.hide').attr('href', newUrl)
}
$('.hide').on('click', navigateCart)