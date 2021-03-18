import '/scss/main.scss';
import $ from "jquery";
//Font awesome
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {logout} from './signinFunc';
import {setShip, makePayment, getTotal, getShipping} from './checkoutVFunctions';
import { cookieCheck } from './cookieMenu';

$('#liSix').on('click', logout)
library.add(fas) 
dom.i2svg() 


cookieCheck()
.then((value) => {
    getTotal(value)
    getShipping(value)
})


$('.payment').on('click', makePayment)