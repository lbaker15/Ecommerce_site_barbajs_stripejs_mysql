import '/scss/main.scss';
import $ from "jquery";
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { cookieCheck } from './cookieMenu';
import { login, logout } from './signinFunc';

library.add(fas) 
dom.i2svg() 

const navigateCart = () => {
    //THIS WILL NEED TO OPEN OVERLAY THEN A BUTTON INSIDE OVERLAY SHOULD CARRY OUT FOLLOWING CODE
    let newUrl ='/cart.html'
    $('.hide').attr('href', newUrl)
}
$('.hide').on('click', navigateCart)

cookieCheck()
$('#submit').on("click", login);
$('#liSix').on('click', logout)