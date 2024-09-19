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
let fadeInFrame = null;

cards.forEach((card) => {
  observer.observe(card);

  // Define the function before using it in event listeners
  const handleMouseEnterOrTouchStart = async (e) => {
    console.log(e.target);
    
    let person = e.target.children[0].textContent;
    person = person.toLowerCase();
    let audioFilePath = `./assets/songs/${person}.mp3`;

    // Stop and reset the current audio if it's playing
    if (currentAudio instanceof Audio) {
      cancelAnimationFrame(fadeInFrame); // Cancel any existing fade animation
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    try {
      // Check if the audio file exists
      const response = await fetch(audioFilePath, { method: "HEAD" });
      
      if (response.ok) {
        // Create a new audio instance for the current card
        currentAudio = new Audio(audioFilePath);
        currentAudio.volume = 0; // Start with volume at 0

        // Play the audio
        currentAudio.play().catch(error => {
          console.error("Audio playback failed:", error);
        });

        // Fade in the volume over 2 seconds (2000ms)
        let start = null;
        const duration = 2000; // 2 seconds fade-in duration

        const fadeIn = (timestamp) => {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          currentAudio.volume = Math.min(progress / duration, 1); // Increase volume based on elapsed time

          if (progress < duration) {
            fadeInFrame = requestAnimationFrame(fadeIn);
          } else {
            currentAudio.volume = 1; // Ensure volume is exactly 1 when the fade completes
          }
        };

        fadeInFrame = requestAnimationFrame(fadeIn);

      } else {
        currentAudio = new Audio("./assets/songs/rickpartykick.mp3");
        currentAudio.play();
      }
    } catch (error) {
      console.error("Error checking audio file:", error);
    }
  };

  // Now add the event listeners after the function is defined
  card.addEventListener("mouseenter", handleMouseEnterOrTouchStart);
  card.addEventListener("touchstart", handleMouseEnterOrTouchStart);  // For mobile devices

  // Mouseleave for desktops, touchend for mobile
  card.addEventListener("mouseleave", (e) => {
    if (currentAudio instanceof Audio) {
      console.log("pause");
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
      cancelAnimationFrame(fadeInFrame);
    }
  });

  card.addEventListener("touchend", (e) => {
    if (currentAudio instanceof Audio) {
      console.log("pause");
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
      cancelAnimationFrame(fadeInFrame);
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
