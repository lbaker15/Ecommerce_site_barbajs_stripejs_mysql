import '/scss/main.scss';
import $ from "jquery";
import {logout} from './signinFunc';
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { cookieCheck } from './cookieMenu';
import {displayProducts} from './productsFunc';

library.add(fas) 
dom.i2svg() 
$('#liSix').on('click', logout)

cookieCheck()
.then(value => {
    displayProducts()
})


            




//NEEDS ADDING TO ALL PAGES
const navigateCart = () => {
    //THIS WILL NEED TO OPEN OVERLAY THEN A BUTTON INSIDE OVERLAY SHOULD CARRY OUT FOLLOWING CODE
    let newUrl ='/cart.html'
    $('.hide').attr('href', newUrl)
}
$('.hide').on('click', navigateCart)