import {loadStripe} from '@stripe/stripe-js';
import $ from "jquery";

let shipping;
let totalPrice;
let products;
let actualProducts;


export function loadCheck() {
    return new Promise((res, rej) => {
        let value = document.cookie.split('=')[1]
        let name = document.cookie.split('=')[0]
        console.log("HERE", name === "main_cookie")
        if (name === "main_cookie") {
            console.log('fired')
            //VALIDATE THE SESSION ON BACKEND HERE
            $("#liFour").css("display", "block");
            $('.hide').css("display", "block");
            $('.signInIcon').css('display', 'none');
            $('#liThree').css('display', 'none');
            $('#liSix').css("display", "block");
            res(value)
        } else {
            $('#liFour').css('display', 'none');
            $('.hide').css('display', 'none');
            $('.signInIcon').css('display', 'block');
            $('#liThree').css('display', 'block');
            $('#liSix').css("display", "none");
            rej()
        }
    }).then(value => {
        getTotal(value)
        getShipping(value)
        //PAGE SHOULD NOT BE INTERACTIVE UNTIL THIS IS FINISHED
    })
}

export function getTotal(value) {
    fetch('http://localhost:8000/get-cart-total', {
        method: 'GET',
        headers: {
            Authorization: value
        }
    }).then(res => res.json())
    .then(data => {
        console.log(data)
        totalPrice = Object.values(data)[0].totalPrice;
        //CHECKIF SHIPPING IS ALREADY SET
        let ship = new Array;
        let prods = Object.values(data)[0].products;
        prods.map(x => {
            if (x.title === 'Shipping') {
                ship.push(x)
            }
        })
        products = prods.filter(x => x.title !== 'Shipping')

        if (ship.length === 0) {
            //NOT ALREADY SET
            $('.alert').text('Please Choose Your Shipping')
        } else {
            //IS ALREADY SET
            $('.alert').text('Shipping is selected.')
            shipping = ship[0].price;
            totalPrice = totalPrice - shipping;
            let shippingType = ship[0].description;
            handleShipping(shippingType)
        }
    })
    .then(() => {
        fetch('http://localhost:8000/get-products', {
            method: 'GET',
            headers: {
                Authorization: value
            }
        })
        .then(res => res.json())
        .then(prods => actualProducts = prods)
    })
}

export function getShipping (value) {
    fetch('http://localhost:8000/get-products', {
        method: 'GET'
    })
    .then(prods => prods.json())
    .then(products => {
        const mapMe = products["All Products"]
        mapMe.map((x, i) => {
            if (x.title === 'Shipping') {
                let price = x.price; let type = x.description; let id = x.id;
                let textEl = `${type} \n ${price}`
                let btn = $('<button></button>').text(textEl).attr('value', price).attr('data-value', type).attr('id', id).addClass('theBtn')
                //btn.html(btn.html().replace())

                $('.shippingOptions').append(btn)
            }
        })
        $('.theBtn').on('click', setShip)
    })
}

let btnDisabled = false;
export function setShip (e) {

    if (!btnDisabled) {
        btnDisabled = true;
        //NEED TO CHECK CODE AND SEND TO DATABASE SOMEHOW
        shipping = e.target.value;
        let shippingType = e.target.getAttribute('data-value');
        let shippingId = e.target.id;
        let noShipping = products.filter(x => x.title === 'Shipping')
        console.log('set ship', totalPrice, noShipping)

        if (totalPrice && noShipping.length === 0) {
            console.log('first', shippingId)
            //NO SHIPPING IS IN CART
            addShipToCart(shippingId)
            .then(() => {
                handleShipping(shippingType) 
                setTimeout(() => {btnDisabled = false}, 1000)
            })
        } else if (totalPrice && noShipping.length > 0) {
            console.log('second')
            //SHIPPING IS IN CART
            new Promise((res, rej) => {
                //FIND THE SHIPPING CART ITEM
                let ship = products.filter(x => {
                    return x.title === 'Shipping'
                })
                res(ship)
            }).then(ship => {
                let shipDesc = ship[0].description;
                if (shipDesc === shippingType) {
                    console.log('already set')
                    setTimeout(() => {btnDisabled = false}, 1000)
                    return
                } else {
                    console.log('reset')
                    //GET THE ID SO CAN REMOVE OLD SHIPPING FROM CART
                    let getId = products.filter(x => {
                        return x.title === 'Shipping'
                    })
                    let toMatch = getId[0].description;
                    let theId = actualProducts['All Products'].filter(x => {
                        return x.description === toMatch
                    })
                    let id = theId[0].id;
                    removeShipping(id)
                    .then(() => {
                        //THIS SEEMS TO BE GETTING OVERLOADED
                        //TAKE OUT OLD SHIPPING
                        products = products.filter(x => {
                            return x.title !== 'Shipping'
                        })
                    })
                    .then(() => addShipToCart(shippingId) )
                    .then(() => {
                        //PUSH IN NEW SHIPPING
                        handleShipping(shippingType) 
                        setTimeout(() => {btnDisabled = false}, 1000)
                    })
                }
            })
    }
    } else {
        console.log('please wait')
    }
}
const removeShipping = (id) => {
    return new Promise((resolve, rej) => {
        let value = document.cookie.split('=')[1]
        let name = document.cookie.split('=')[0]
        if (name === "main_cookie") {
            resolve(value)
        } else {
            rej()
        }
    })
    .then((value) => {
        const obj = {"prodId": id}
        console.log(obj)
        fetch('http://localhost:8000/delete-cart-item', {
            method: 'POST',
            headers: {
                'credentials': 'include',
                'Authorization': value,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        .then(res => {
            console.log(res)
            // if (res.status === 200) {
            //     window.location.reload()
            // }
        })
        .catch(err => console.log(err))
    })
}
const handleShipping = (shippingType) => {
    let s = {'price': shipping, 'quantity': 1, title: 'Shipping', description: shippingType}
    products.push(s)
    $('.priceInsert').text('£ ' + totalPrice)
    $('.shippingInsert').text('£ ' + shipping)
    console.log(totalPrice, shipping)
    let finalTot = Number(shipping) + Number(totalPrice)
    $('.totalInsert').text('£ ' + finalTot)
    $('.alert').text('Shipping is selected.')

    //ADDING THE SELECT CLASS
    let btn = $('.theBtn')
    Array.from(btn).map(x => {
        let type = x.getAttribute('data-value')
        if (type === shippingType) {
            // x.addClass('selected')
            let a = $(x)
            a.addClass('selected')
        } else {
            let a = $(x)
            a.removeClass('selected')
        }
    }) 
}
const addShipToCart = (id) => {
    const quantity = 1;
    const cookie = String(document.cookie).split("=")
    const value = cookie[1]
    const obj = {
        "prodId": id,
        "quan": Number(quantity)
    }
    return new Promise((resolve, rej) => {
        fetch('http://localhost:8000/add-to-cart', {
            method: 'POST',
            headers: {
            "Authorization": value,
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(obj)
        })
        .then(res => {
            console.log(res)
            resolve()
        })
    })
}










export function makePayment() {
    let value = document.cookie.split('=')[1]
    if (shipping && totalPrice) {
        //HAD ISSUES WITH REFRIGERATOR RUNTIME AND USING AWAIT ON LOAD STRIPE?
        var stripe;
        new Promise((res, rej) => {
            res( 
            loadStripe('pk_test_51INIbUITCpkMMLVMNHXTCbX18JUvwq3Lp72J5sXKcQuMr6DKRYgIX70NUOttEowfHH885OsPPSK9asqNJklomrsS00ihHryPZM')
            )
        }).then(strip => {stripe = strip})
        .then(() => {
        let obj = JSON.stringify({products})
        console.log(obj)
        setTimeout(() => {
            fetch('http://localhost:8000/make-payment', {
                method: 'POST',
                headers: {
                    Authorization: value,
                    'Content-Type': 'application/json'
                },
                body: obj,
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(session) {
                return stripe.redirectToCheckout({ sessionId: session.id });
            })
        }, 1000)
        })
    }
}