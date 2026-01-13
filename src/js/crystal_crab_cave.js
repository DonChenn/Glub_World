document.addEventListener("DOMContentLoaded", () => {
  const dialogue_text_element = document.getElementById("dialogue-text");
  const dialogue_box = document.getElementById("dialogue-box");
  const dialogue_sound = document.getElementById("dialogue-sound");

  let current_dialogue = null;

  document.body.addEventListener("click", () => {
    if (current_dialogue) {
      current_dialogue.show_next_dialogue();
    }
  });

  if (localStorage.getItem("crab_seen_intro") !== "true") {
    const intro_dialogues = [
      "Glub Glub: it's pitch black in here!",
      "Glub Glub: maybe there's a light switch around...",
      "",
    ];

    let current_dialogue_manager = new dialogue_manager(
      dialogue_text_element,
      intro_dialogues,
      dialogue_sound
    );
    current_dialogue_manager.start(() => {
      dialogue_box.style.display = "none";
    });

    document.body.addEventListener("click", () => {
      if (current_dialogue_manager) {
        current_dialogue_manager.show_next_dialogue();
      }
    });
    localStorage.setItem("crab_seen_intro", "true");
  } else {
    document.getElementById("dialogue-box").style.display = "none";
  }

  const runway_music = document.getElementById("background-music");
  const shutter_sound = document.getElementById("shutter_sound");
  runway_music.pause();
  document.addEventListener("keydown", (event) => {
    if (event.code !== "Space") {
      return;
    }
    const character_element = document.getElementById("character");
    let x = 0;
    let y = 0;
    if (character_element) {
      const char_rect = character_element.getBoundingClientRect();
      x = char_rect.left + char_rect.width / 2;
      y = char_rect.top + char_rect.height / 2;
    }

    const switch_x = window.innerWidth / 8;
    const switch_y = window.innerHeight / 2;

    const crystal_x = window.innerWidth / 1.2;
    const crystal_y = window.innerHeight / 2;

    const interaction_radius = 75;

    const is_near_switch =
      Math.abs(x - switch_x) < interaction_radius &&
      Math.abs(y - switch_y) < interaction_radius;

    if (is_near_switch) {
      document.body.classList.add("activated");
      runway_music.play();
      shutter_sound.play();
    }

    const is_near_crystal =
      Math.abs(x - crystal_x) < interaction_radius &&
      Math.abs(y - crystal_y) < interaction_radius;

    if (is_near_crystal) {
      const crystal_dialogues = [
        "Glub Glub: i received the spectacular first place prize!",
        "Glub Glub: let's return back to Nyatfish, the Feline of the Abyss",
        "",
      ];

      const winning_dialogue_manager = new dialogue_manager(
        dialogue_text_element,
        crystal_dialogues,
        dialogue_sound
      );
      current_dialogue = winning_dialogue_manager;
      dialogue_box.style.display = "block";
      winning_dialogue_manager.start(() => {
        dialogue_box.style.display = "none";
      });

      localStorage.setItem("fashion_show_won", "true");
    }
  });
});
