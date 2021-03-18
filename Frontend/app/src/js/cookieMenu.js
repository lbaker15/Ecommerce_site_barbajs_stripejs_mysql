import $ from "jquery";

export function cookieCheck() {
if (document.readyState === 'loading') {
    return new Promise((res, rej) => {
        let value = document.cookie.split('=')[1]
        let name = document.cookie.split('=')[0]
        console.log("HERE", name === "main_cookie")
        if (name === "main_cookie") {
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
            rej('You are not logged in')
        }
    }) 
}
}

export function innerCookieChecker() {
    let value = document.cookie.split('=')[1]
    let name = document.cookie.split('=')[0]
    let toRet = {value, name}
    return toRet;
}