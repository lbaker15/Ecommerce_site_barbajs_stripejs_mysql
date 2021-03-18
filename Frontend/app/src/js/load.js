import '/scss/main.scss';
import $ from "jquery";

function ReLoadImages(){
    $('img[data-lazysrc]').each( function(){
        //* set the img src from data-src
        $( this ).attr( 'src', $( this ).attr( 'data-lazysrc' ) );
        }
    );
}
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelector('.loaderDiv').style.display = "none";
        ReLoadImages();
        document.querySelector('.content').style.visibility = "visible";
    }, 500)
})