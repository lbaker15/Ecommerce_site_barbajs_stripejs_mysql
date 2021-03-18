import $ from "jquery";
import {gsap} from "gsap";
import {TimelineMax, TweenMax} from "gsap/all";
//PRODUCTS DISPLAY
export function displayProducts() {
    fetch('http://localhost:8000/get-products', {
        method: 'GET'
    })
    .then(prods => prods.json())
    .then(products => {
        const mapMe = products["All Products"]
        $('.messageProducts').css("display", "none")
        mapMe.map((x, i) => {
            if (x.title !== 'Shipping') {
                let contain = $('<div></div>').addClass('contain').attr('id', x.id).attr('data-value', i)
                let img = x.imageUrl;
                let image = $('<img />').attr('src', img)
                let title = x.title;
                let h1 = $('<h1></h1>').text(title);
                let descript = x.description
                let desc = $('<h3></h3>').text(descript);
                let price = x.price;
                let h2 = $('<h2></h2>').text("£" + price);
                let btn1 = $('<button></button>').text('-').addClass('btn1').attr('id', `btn${i}`); let btn2 = $('<button></button>').text('+').addClass('btn2').attr('id', `btn${i}`); 
                let input = $('<input></input>').attr('id', `input${i}`).attr('value', '1');
                let quant = $('<div></div>').addClass('quantityHolder').append(btn1, input, btn2)
                let button = $('<button></button>').text('Add To Cart').addClass('addToCart')
                contain.append(image, h1, desc, h2, quant, button)
                $('.grid1').append(contain)
            }
        })
        $('.addToCart').on("click", addToC)
        $('.btn1').on("click", decrement)
        $('.btn2').on("click", increment)
    })
}
export function increment(e) {
    const i = e.target.parentElement.parentElement.dataset.value;
    console.log('fired', i)
    const input = $(`#input${i}`).val()
    let newValue = Number(input) + 1
    $(`#input${i}`).attr('value', newValue)
}
export function decrement(e) {
    const i = e.target.parentElement.parentElement.dataset.value;
    console.log('fired', i)
    const input = $(`#input${i}`).val()
    if (Number(input) > 1) {
    let newValue = Number(input) - 1
    $(`#input${i}`).attr('value', newValue)
    }
}

var tl = gsap.timeline({paused:true})
tl.to('.hide', {marginTop: -20 + "px", duration: 0.25})
tl.to('.hide', {marginTop: 0, duration: 0.25})

export function addToC(e) {
    const id = e.target.parentElement.id;
    const i = e.target.parentElement.dataset.value;
    const quantity = $(`#input${i}`).val()
    const cookie = String(document.cookie).split("=")
    const value = cookie[1]
    const obj = {
        "prodId": id,
        "quan": Number(quantity)
    }
    if (id) {
        setTimeout(() => {
        fetch('http://localhost:8000/add-to-cart', {
            method: 'POST',
            headers: {
                "Authorization": value,
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(obj)
        })
        .then(res => {
            if (res.status === 200) {
                tl.play()
            }
        })
    },1000)
    }
}