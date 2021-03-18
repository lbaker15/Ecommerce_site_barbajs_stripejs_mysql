import $ from 'jquery';

export function displayCart(value) {
    return new Promise((res, rej) => {
        fetch('http://localhost:8000/get-cart', {
            method: 'GET',
            headers: {
                Authorization: value
            }
        })
        .then(res => res.json())
        .then(data=> {
            let finalPriceNoDelivery = 0;
            let mapMe = Object.values(data)[0];
            mapMe.map(x => {
                console.log(x)
                let box = $('<div></div>').addClass('box').attr('data-value', x.id);
                let boxFlex = $('<div></div>').addClass('boxFlex');
                let title = $('<h2></h2>').text(x.title)
                let price = $('<h3></h3>').text(x.description)
                let del = $('<button></button>').text('Delete').attr('id', 'del')
                let img = $('<img />').attr('src', x.imageUrl)
                let quantity = $('<h4></h4>').text("Qty:  ");
                let quanInput = $('<input></input>').attr('value', + x.cartitem.quantity)
                let quanContainer = $('<div></div>').addClass('quanContainer').append(quantity, quanInput);
                boxFlex.append(title, price, del)
                let desc = $('<div></div>').addClass('priceArea')
                let realPrice = $('<h5></h5>').text((x.price - Math.floor(x.price) === 0) ? '£ ' + x.price + '.00' : '£ ' + x.price)
                let totalPriceLabel = $('<h6></h6>').text('Total Price: ')
                let tot = x.cartitem.quantity * x.price;
                let num = (finalPriceNoDelivery + tot) * 100;
                let newNum = Math.round(num) / 100;
                finalPriceNoDelivery = newNum;
                let totalPrice = $('<h5></h5>').text((tot - Math.floor(tot) === 0) ? '£ ' + tot + '.00' : '£ ' + tot)
                desc.append(realPrice, totalPriceLabel, totalPrice)
                box.append(img, boxFlex, quanContainer, desc)
                $('.basket').append(box)
            })
        
            let finalPriceHeader = $('<h4></h4>').text('Your Total: ');
            let final = finalPriceNoDelivery - Math.floor(finalPriceNoDelivery) === 0 ? finalPriceNoDelivery + ".00" : finalPriceNoDelivery
            let finalPriceEl = $('<h5></h5>').text('£ ' + final);
            let finalPriceDiv = $('<div></div>').addClass('finalPriceDiv').append(finalPriceHeader, finalPriceEl);
            let checkout = $('<a></a>').addClass('checkoutBtn').text('Checkout').attr('href', '/checkoutVerify.html')
            $('.grid1').append(finalPriceDiv, checkout)
            $('#del').on('click', deleteItem);
            $('.quanContainer input').on('blur', editQuantity)
            res()
        })
    })
}

const navigateCheck = () => {}

const editQuantity = (e) => {
    //IF QUANTITY IS 0 NEED TO CALL DELETE FROM CART
    //ROUND FINAL PRICE TO 2DP.
    const prodId = e.target.parentElement.parentElement.dataset.value;
    const quan = e.target.value
    let obj = {prodId, quan};
    new Promise((res, rej) => {
        let value = document.cookie.split('=')[1]
        let name = document.cookie.split('=')[0]
        if (name === "main_cookie") {
            res(value)
        } else {
            rej()
        }
    })
    .then((value) => {
        console.log('obj', obj)
        fetch('http://localhost:8000/edit-cart-item', {
            method: 'PATCH',
            headers: {
                'credentials': 'include',
                'Authorization': value,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        .then(res => {
            console.log('res', res)
            if (res.status === 200) {
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            }
        })
        .catch(err => console.log(err))
    })
}

const deleteItem = (e) => {
    new Promise((res, rej) => {
        let value = document.cookie.split('=')[1]
        let name = document.cookie.split('=')[0]
        if (name === "main_cookie") {
            res(value)
        } else {
            rej()
        }
    })
    .then((value) => {
        const id = e.target.parentElement.parentElement.dataset.value
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
            if (res.status === 200) {
                window.location.reload()
            }
        })
        .catch(err => console.log(err))
    })
}
