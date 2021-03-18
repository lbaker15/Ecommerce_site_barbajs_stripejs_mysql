//Splide
import Splide from '@splidejs/splide';
export function splide() {
const grid6 = document.querySelector('.grid6');
//This should not fire on products page
document.addEventListener('DOMContentLoaded', () => {
    new Splide('#card-slider', {
        perPage: 3,
        type: 'loop',
        classes: {
            next: 'splide__arrow--next right'
        },
        autoplay: true,
        gap: 40,
        fixedWidth: 390,
        focus: 'center',
        updateOnMove: true,
        pauseOnHover: true
    }).mount()
    console.log('content')
})
}

export function splideTweak() {
    const grid6 = document.querySelector('.grid6');
    //This should not fire on products page
        new Splide('#card-slider', {
            perPage: 3,
            type: 'loop',
            classes: {
                next: 'splide__arrow--next right'
            },
            autoplay: true,
            gap: 40,
            fixedWidth: 390,
            focus: 'center',
            updateOnMove: true,
            pauseOnHover: true
        }).mount()
        console.log('content')

}