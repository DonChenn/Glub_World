document.addEventListener("DOMContentLoaded", () => {
  const keys_pressed = {
    w: false,
    a: false,
    s: false,
    d: false,
    Shift: false,
  };

  const background_music = document.getElementById("background-music");

  if (background_music) {
    const uniqueSongKey = "music_time_" + background_music.getAttribute("src");
    const saved_time = sessionStorage.getItem(uniqueSongKey);

    if (saved_time) {
      background_music.currentTime = parseFloat(saved_time);
    }
  }

  document.addEventListener("keydown", (event) => {
    const key = event.key;
    background_music.play();

    if (key === "Shift") {
      keys_pressed.Shift = true;
    } else if (key.toLowerCase() in keys_pressed) {
      keys_pressed[key.toLowerCase()] = true;
    }
  });

  document.addEventListener("keyup", (event) => {
    const key = event.key;
    background_music.play();

    if (key === "Shift") {
      keys_pressed.Shift = false;
    } else if (key.toLowerCase() in keys_pressed) {
      keys_pressed[key.toLowerCase()] = false;
    }
  });

  window.addEventListener("beforeunload", () => {
    if (background_music) {
      const uniqueSongKey =
        "music_time_" + background_music.getAttribute("src");
      sessionStorage.setItem(
        uniqueSongKey,
        background_music.currentTime.toString()
      );
    }
  });
});
