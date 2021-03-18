import $ from 'jquery';

export function login(e) {
    e.preventDefault()
    let email = $('#email').val()
    let password = $('#password').val()
    console.log(email, password)
    let obj = {'email': email, 'password': password}
    if (email && password) {
    fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'credentials': 'include'
        },
        body: JSON.stringify(obj)
    })
    .then(res => {
        return res.json() })
    .then(data => {
        const id = Object.keys(data)[0]
        const cook = Object.values(data)[0]
        let value = {[id]: cook}
        let now = new Date; let nowStamp = now.getTime(); let future = nowStamp + (((1*1000)*60)*15); let date = new Date(future);
        document.cookie = "main_cookie" + "=" + JSON.stringify(value) + "; expires=" + date.toGMTString();
    })
    .then(() => {
        $('.signInIcon').css("display", "none")
        $('.hide').css("display", "block")
        $('#liFour').css("display", "block")
        $('#liThree').css("display", "none")
        $('#liSix').css("display", "block")
        console.log('here')
    })
    } else {
        //VALIDATION HERE
    }
}

export function logout() {
    new Promise((res, rej) => {
                let value = document.cookie.split('=')[1]
                let name = document.cookie.split('=')[0]
                console.log("HERE", name === "main_cookie")
                if (name === "main_cookie") {
                    //VALIDATE COOKIE ON BACKEND HERE TO CHECK COOKIE IS STILL VALID
                    res(value)
                }
            })
            .then(value => {  
    fetch('http://localhost:8000/logout', {
        method: 'POST',
        headers: {
            'credentials': 'include',
            'Authorization': value
        }
    })
    .then(res => res.json())
    .then(data => {
        let details = {"name": "main_cookie"}
        let name = document.cookie.split('=')[0]
        var date = new Date();
        document.cookie = name + "=" + "; expires=" + date.toGMTString();
        setTimeout(() => {location.reload()}, 500)
    })
    })
}