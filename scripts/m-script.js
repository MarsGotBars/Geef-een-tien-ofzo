const sectioning = document.querySelectorAll('section');
console.log(sectioning[0].children[0].classList);

window.onscroll=(e)=>{
    console.log(window.scrollY);
}

// https://savvy.co.il/en/blog/wordpress-design/css-scroll-snapping/
// intersection api examples