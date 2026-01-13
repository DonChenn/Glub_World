document.addEventListener("DOMContentLoaded", () => {
  const dialogue_text_element = document.getElementById("dialogue-text");
  const dialogue_box = document.getElementById("dialogue-box");
  const dialogue_sound = document.getElementById("dialogue-sound");
  const quest_exclaim = document.getElementById("quest_icon");
  const quest_pending = document.getElementById("quest_pending_icon");
  const background_music = document.getElementById("background-music");
  const dog = document.getElementById("dog");

  document.body.addEventListener("click", () => {
    background_music.play();
  });

  let current_dialogue = null;

  if (!localStorage.getItem("quest_complete")) {
    dog.style.display = "none";
  }

  if (localStorage.getItem("dog_quest_accepted") === "true") {
    quest_exclaim.style.display = "none";
    quest_pending.style.display = "block";
  } else {
    quest_exclaim.style.display = "block";
    quest_pending.style.display = "none";
  }

  if (localStorage.getItem("quest_complete")) {
    quest_pending.style.display = "none";
  }

  document.body.addEventListener("click", () => {
    background_music.play();
    if (current_dialogue) {
      current_dialogue.show_next_dialogue();
    }
  });

  if (localStorage.getItem("has_seen_intro") !== "true") {
    const dialogues = [
      "Glub Glub: (oh. look at that stupid looking pufferfish).",
      "Glub Glub: i wonder if he knows anything about Meow Meow.",
      "Use ␣ to interact",
      "",
    ];

    const dialogue_manager_instance = new dialogue_manager(
      dialogue_text_element,
      dialogues,
      dialogue_sound
    );
    current_dialogue = dialogue_manager_instance;
    dialogue_manager_instance.start(() => {
      dialogue_box.style.display = "none";
      localStorage.setItem("has_seen_intro", "true");
      current_dialogue = null;
    });
  } else {
    document.getElementById("dialogue-box").style.display = "none";
  }

  document.addEventListener("keydown", (event) => {
    if (event.code !== "Space") {
      return;
    }

    const puffer_x = window.innerWidth / 1.5;
    const puffer_y = window.innerHeight / 1.45;
    const interaction_radius = 100;

    const is_near_puffer =
      Math.abs(x - puffer_x) < interaction_radius &&
      Math.abs(y - puffer_y) < interaction_radius;

    if (is_near_puffer) {
      dialogue_box.style.display = "block";

      if (localStorage.getItem("dog_quest_accepted") === "true") {
        if (localStorage.getItem("dog_picked_up")) {
          const dialogues = [
            "Stupid Looking Pufferfish: BARK BARK! you found him! thank you so much!",
            "Stupid Looking Pufferfish: oh, i was so worried! who’s a good boy? who’s a good boy?!",
            "Stupid Looking Pufferfish: here's some seaweed as a reward!",
            "Glub Glub: could you help me out now?",
            "Glub Glub: have you seen a cat anywhere? i got a little lost.",
            "Stupid Looking Pufferfish: oh yeah! i’ve seen a cat for sure!",
            "Stupid Looking Pufferfish: i saw him way, way down there. at the bottom of the ocean where the floor is",
            "Stupid Looking Pufferfish: he's a little judgy and he just stared at me with his big ol' whiskers",
            "Glub Glub: oooh Meow Meow is a little sigma. that sounds just like him. i'll take a look ty!",
            "",
          ];

          quest_pending.style.display = "none";
          dog.style.display = "block";

          localStorage.setItem("quest_complete", "true");

          const complete_dialogue = new dialogue_manager(
            dialogue_text_element,
            dialogues,
            dialogue_sound
          );
          current_dialogue = complete_dialogue;
          complete_dialogue.start(() => {
            dialogue_box.style.display = "none";
            current_dialogue = null;
          });
        } else {
          const dialogues = [
            "Stupid Looking Pufferfish: help find my dog, i was last with him when i was at the Jellyfish Fields, just outside the city.",
            "",
          ];
          const accepted_dialogue = new dialogue_manager(
            dialogue_text_element,
            dialogues,
            dialogue_sound
          );
          current_dialogue = accepted_dialogue;
          accepted_dialogue.start(() => {
            dialogue_box.style.display = "none";
            current_dialogue = null;
          });
        }
      } else {
        const dialogues = [
          "Stupid Looking Pufferfish: ohhh mannn what am i going to do???",
          "Stupid Looking Pufferfish: my dog ran away from me or worse FLOATED",
          "Stupid Looking Pufferfish: i was counting my golden pebbles, i looked away for just one second, and POOF! he was gone…",
          "Stupid Looking Pufferfish: hey! you!",
          "Stupid Looking Pufferfish: you look like you could find things! could you help me find my dog?",
          "Glub Glub: mmm I guess so, only if you can hel-",
          "Stupid Looking Pufferfish: PERFECT! I KNEW IT!",
          "Stupid Looking Pufferfish: help find my dog, i last saw him when i was skipping him across the water in the Jellyfish Fields! please find him!.",
          "",
        ];

        const puffer_dialogue = new dialogue_manager(
          dialogue_text_element,
          dialogues,
          dialogue_sound
        );
        current_dialogue = puffer_dialogue;
        puffer_dialogue.start(() => {
          dialogue_box.style.display = "none";
          localStorage.setItem("dog_quest_accepted", "true");
          if (quest_exclaim) {
            quest_exclaim.style.display = "none";
            quest_pending.style.display = "block";
          }

          current_dialogue = null;
        });
      }
    }
  });

  const debugBox = document.createElement("div");
  debugBox.style.position = "fixed";
  debugBox.style.backgroundColor = "rgba(211, 227, 208, 0.3)";
  debugBox.style.pointerEvents = "none";
  debugBox.style.zIndex = "9999";
  document.body.appendChild(debugBox);

  function updateDebugHitbox() {
    const puffer_x = window.innerWidth / 1.5;
    const puffer_y = window.innerHeight / 1.45;
    const interaction_radius = 100;

    const diameter = interaction_radius * 2;

    debugBox.style.width = diameter + "px";
    debugBox.style.height = diameter + "px";

    debugBox.style.left = puffer_x - interaction_radius + "px";
    debugBox.style.top = puffer_y - interaction_radius + "px";
  }

  updateDebugHitbox();
  window.addEventListener("resize", updateDebugHitbox);
});
