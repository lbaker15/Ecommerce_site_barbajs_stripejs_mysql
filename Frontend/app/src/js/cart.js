import '/scss/main.scss';
import $ from "jquery";
//Font awesome
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {cookieCheck} from './cookieMenu';
import {displayCart} from './cartFunc';
library.add(fas) 
dom.i2svg() 

cookieCheck()
.then((value) => {
    displayCart(value)
}) 
.catch(err => console.log(err))
