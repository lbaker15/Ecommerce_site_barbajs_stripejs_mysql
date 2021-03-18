import '/scss/main.scss';
import $ from "jquery";
import {splash} from './indexgsap';
import {splide} from './splide';
//Font awesome
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { cookieCheck } from './cookieMenu';
import {logout} from './signinFunc';


library.add(fas) 
dom.i2svg() 
splash()
splide()
cookieCheck()
$('#liSix').on('click', logout)

//THIS COULD GO IN LOADER?
const navigateCart = () => {
    //THIS WILL NEED TO OPEN OVERLAY THEN A BUTTON INSIDE OVERLAY SHOULD CARRY OUT FOLLOWING CODE
    let newUrl ='/cart.html'
    $('.hide').attr('href', newUrl)
}
$('.hide').on('click', navigateCart)








