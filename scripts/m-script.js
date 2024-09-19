window.onload = () => {
  window.scrollTo(0, 0);
};

let audio = false;
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
let currentAudio = null;
cards.forEach((card) => {
  console.log(card);
  
  observer.observe(card);
  if (audio) {
  }
  card.addEventListener("mouseenter", async (e) => {
    let person = e.target.children[0].textContent;
    person = person.toLowerCase();
    // let person = "yippee";
    let audioFilePath = `./assets/audio/${person}.mp3`;
    if (currentAudio instanceof Audio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    if (audio) {
      try {
        const response = await fetch(audioFilePath, { method: "HEAD" });
        
        if (response.ok) {
          // If the file exists, create and play the audio
          currentAudio = new Audio(audioFilePath);  
          currentAudio.play().catch(error => {
            console.error("Audio playback failed:", error);
          });
        } else {
          currentAudio = new Audio(`./assets/audio/rickpartykick.mp3`);
          currentAudio.play();
        }
      } catch (error) {
        console.error("Error checking audio file:", error);
      }
    }
  });

  card.addEventListener("mouseleave", (e) => {
    if (currentAudio instanceof Audio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }
  });
});

// https://savvy.co.il/en/blog/wordpress-design/css-scroll-snapping/
// intersection api examples

// https://codepen.io/abirana/pen/GdzQRb
// play sound on hover


const confirmationSound = new Audio("./assets/audio/yippee.mp3");
const overlay = document.querySelector(".overlay");
const overlayTitle = overlay.firstElementChild;
const body = document.querySelector("body");
confirmationSound.volume = 0.5;

function playMusic(initial) {
  audio = initial;
  if (!overlay.classList.contains("vanish")) {
    overlay.classList.add("vanish");
    setTimeout(() => {
      overlay.style.display = "none";
      body.style.overflow = "auto";
    }, 800);
  }

  switch (initial) {
    case true:
      confirmationSound.play().catch((error) => {
        console.error("Error playing confirmation sound:", error);
      });
      overlayTitle.innerHTML = ":D";
      break;
    default:
      overlayTitle.innerHTML = ":(";
      break;
  }
}