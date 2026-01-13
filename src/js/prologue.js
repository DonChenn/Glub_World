document.addEventListener("DOMContentLoaded", () => {
  const slideshow_container = document.getElementById("slideshow-container");
  const dialogue_text_element = document.getElementById("dialogue-text");
  const dialogue_sound = document.getElementById("dialogue-sound");
  const background_music = document.getElementById("background-music");
  const whirlpool_effect = document.getElementById("whirlpool-effect");

  const images = [
    "assets/art/intro1.png",
    "assets/art/intro2.png",
    "assets/art/intro2.png",
    "assets/art/intro3.png",
    "assets/art/intro4.png",
    "assets/art/intro5.png",
  ];
  const dialogues = [
    [
      "Make sure to let the dialogue fully end before advancing. Click happy cat inside the box to advance dialogue.",
    ],
    ["Meow Meow: wowowowowow 7 years... it feels like just yesterday we met."],
    [
      "Glub Glub: happy anniversary! i can't wait to see what's in store for us this year!",
    ],
    ["Meow Meow: WOAH what is that?! be careful!"],
    ["Glub Glub: HELPPP SAVE ME!!"],
    ["Glub Glub: AAHDGGJSLDahaheaghagqgda~~~~~"],
  ];

  let current_image_index = 0;

  let dialogue_manager_instance = new dialogue_manager(
    dialogue_text_element,
    dialogues[0],
    dialogue_sound
  );

  function show_content(image_index) {
    if (image_index < images.length) {
      if (image_index === 1) {
        background_music.play();
      }
      if (image_index === 4) {
        background_music.pause();
      }
      slideshow_container.style.backgroundImage = `url('${images[image_index]}')`;
      dialogue_manager_instance = new dialogue_manager(
        dialogue_text_element,
        dialogues[image_index],
        dialogue_sound
      );
      dialogue_manager_instance.start();
    } else {
      whirlpool_effect.play();
      document.body.classList.add("fade-out");
      setTimeout(() => {
        setTimeout(() => {
          window.location.href = "spawn.html?from=login";
        }, 6000);
      }, 6000);
    }
  }

  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  show_content(current_image_index);

  document.body.addEventListener("click", () => {
    if (
      dialogue_manager_instance.is_typing ||
      dialogue_manager_instance.current_dialogue_index <
        dialogue_manager_instance.dialogues.length
    ) {
      dialogue_manager_instance.show_next_dialogue();
    } else {
      current_image_index++;
      show_content(current_image_index);
    }
  });
});
