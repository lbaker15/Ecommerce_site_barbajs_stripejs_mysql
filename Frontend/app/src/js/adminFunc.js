import $ from "jquery";
import {innerCookieChecker} from './cookieMenu';

export function getOrders(value) {
    return new Promise((res, rej) => {
        fetch('http://localhost:8000/get-order', {
            headers: {
                'Authorization': value
            }
        })
        .then(res => res.json())
        .then(data => {
            data['Your orders'].map(x => {
                //console.log()
                let id = x.id;
                let tim = x.createdAt;
                let t = new Date(tim).toTimeString()
                let d = new Date(tim).toLocaleDateString()
                let time = d + " at " + String(t).substring(0, 5)
                // console.log(  String(t).substring(0, 5), d  )
                let prodsArr = x.products;
                let prods = $('<div></div>').addClass('prods').html('<span id="bold" class="bottom"> Products : </span>')
                prodsArr.map(x => {
                    let info = `<span id="semibold"> Item: </span> ${x.title} <span id="semibold"> Price: </span> £ ${x.price} <span id="semibold"> Quantity: </span> ${x.orderitem.quantity}`
                    let thisBt = $('<span><span>').addClass('prodItem').html(info)
                    prods.append(thisBt)
                })
                let dets = `<span><span id="bold">Order ID :</span> ${id} </span> <br> <span id="margin"><span id="bold">Date Order Placed :</span> ${time} </span>`
                let widget = $('<div></div>').addClass('widget')
                let details = $('<div></div>').addClass('details').html(dets)
                widget.append(details, prods)
                $('#protected').prepend(widget)
            })
            res()
        })
        .catch(err => console.log(err))
    })
}

export function getOrdersCook() {
    let {value, name} = innerCookieChecker()
    if (name === 'main_cookie') {
    return new Promise((res, rej) => {
        fetch('http://localhost:8000/get-order', {
            headers: {
                'Authorization': value
            }
        })
        .then(res => res.json())
        .then(data => {
            data['Your orders'].map(x => {
                //console.log()
                let id = x.id;
                let tim = x.createdAt;
                let t = new Date(tim).toTimeString()
                let d = new Date(tim).toLocaleDateString()
                let time = d + " at " + String(t).substring(0, 5)
                // console.log(  String(t).substring(0, 5), d  )
                let prodsArr = x.products;
                let prods = $('<div></div>').addClass('prods').html('<span id="bold" class="bottom"> Products : </span>')
                prodsArr.map(x => {
                    let info = `<span id="semibold"> Item: </span> ${x.title} <span id="semibold"> Price: </span> £ ${x.price} <span id="semibold"> Quantity: </span> ${x.orderitem.quantity}`
                    let thisBt = $('<span><span>').addClass('prodItem').html(info)
                    prods.append(thisBt)
                })
                let dets = `<span><span id="bold">Order ID :</span> ${id} </span> <br> <span id="margin"><span id="bold">Date Order Placed :</span> ${time} </span>`
                let widget = $('<div></div>').addClass('widget')
                let details = $('<div></div>').addClass('details').html(dets)
                widget.append(details, prods)
                $('#protected').prepend(widget)
            })
            res()
        })
        .catch(err => console.log(err))
    })
    }
}