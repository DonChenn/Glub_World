document.addEventListener("DOMContentLoaded", () => {
  const dialogue_text_element = document.getElementById("dialogue-text");
  const dialogue_box = document.getElementById("dialogue-box");
  const dialogue_sound = document.getElementById("dialogue-sound");
  const background_music = document.getElementById("background-music");

  if (localStorage.getItem("spawn_intro") !== "true") {
    const dialogues = [
      "Glub Glub: aghh my head hurts.",
      "Glub Glub: its really cold and scary down here.",
      "Glub Glub: i need to find a way to get back to Meow Meow.",
      "Glub Glub: maybe the locals around here can help me find back home.",
      'use "WASD" to move',
      "use L SHIFT to sprint",
      "",
    ];

    const dialogue_manager_instance = new dialogue_manager(
      dialogue_text_element,
      dialogues,
      dialogue_sound
    );
    dialogue_manager_instance.start(() => {
      dialogue_box.style.display = "none";
      localStorage.setItem("spawn_intro", "true");
    });

    document.body.addEventListener("click", () => {
      background_music.play();
      dialogue_manager_instance.show_next_dialogue();
    });
  } else {
    document.getElementById("dialogue-box").style.display = "none";
  }
});
