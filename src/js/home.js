document.addEventListener("DOMContentLoaded", () => {
  const background_music = document.getElementById("background-music");

  document.body.addEventListener("click", () => {
    background_music.play();
  });

  const creditsContainer = document.getElementById("credits-container");
  const creditsContent = document.querySelector(".credits-content");
  const finalDateContainer = document.getElementById("final-date-container");

  function startCredits() {
    creditsContainer.classList.remove("hidden");
    creditsContent.classList.add("scroll-up");

    setTimeout(() => {
      creditsContainer.classList.add("hidden");
      finalDateContainer.classList.remove("hidden");
    }, 125000);
  }

  setTimeout(startCredits, 3000);
});
