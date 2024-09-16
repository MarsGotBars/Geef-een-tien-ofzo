// pak alle divs die een figure element bevatten
const cards = [...document.querySelectorAll("div:has(figure)")];

// margin van de root (document) en threshold voor de intersections
const options = {
  rootMargin: "0px",
  threshold: 0.25,
};
// callback functie voor alle entries
const callback = (entries) => {
  // voor elke entry
  entries.forEach((entry) => {
    // creeër een target
    const { target } = entry;
    // als het binnen/boven de intersection valt voeg dan een class toe of verwijder deze
    if (entry.intersectionRatio >= 0.25) {
      target.classList.add("reveal");
    } else {
      target.classList.remove("reveal");
    }
  });
};
// intersectionObserver functie aanmaken en gebruik maken van de callback functie + de opties
const observer = new IntersectionObserver(callback, options);

// elke kaart observeren
cards.forEach((card) => {
  observer.observe(card);
});
// https://savvy.co.il/en/blog/wordpress-design/css-scroll-snapping/
// intersection api examples

// https://codepen.io/abirana/pen/GdzQRb
// play sound on hover

// Enable / Disable audio
const confirmationSound = new Audio("./assets/audio/yippee.mp3");
const overlay = document.querySelector(".overlay");
const body = document.querySelector("body");
console.log(overlay);
confirmationSound.volume = .5;

function playMusic(initial) {
  if (!overlay.classList.contains("vanish")) {
    overlay.classList.add("vanish");
    setTimeout(() => {
      overlay.style.display = "none";
      body.style.overflow = "auto";
    }, 800);
    console.log('poof!');
  }
  switch (initial) {
    case true:
      confirmationSound.play().catch((error) => {
        console.error("Error playing confirmation sound:", error);
      });
      
      
      break;

    default:
      break;
  }
}
