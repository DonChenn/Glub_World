document.addEventListener("DOMContentLoaded", () => {
  const dialogue_text_element = document.getElementById("dialogue-text");
  const dialogue_box = document.getElementById("dialogue-box");
  const dialogue_sound = document.getElementById("dialogue-sound");
  const background_music = document.getElementById("background-music");

  document.body.addEventListener("click", () => {
    background_music.play();
  });

  if (localStorage.getItem("wallace_intro") !== "true") {
    const dialogues = [
      "Glub Glub: OH this was what was blocking the path above!",
      "Glub Glub: excuse me? i'm looking for a friend, have you seen him? his name is Meow Meow.",

      "Wallace: Meow Meow. what a peculiar name for a fish. you know, that reminds me of the time i met a " +
        "shrimp named ‘geoff’. with a ‘g’. can you believe it? i always thought it should be with a ‘j’. ‘jeoff’. " +
        "it just has a better… shimmer to it, don’t you think? we debated it for hours until the tide changed " +
        "and he was swept away. lovely fellow.",

      "Glub Glub: he's not a fish, he's a cat. he lives up there. at the top of the ocean. " +
        "i need to get to the surface.",

      "Wallace: the surface. oh, the big shiny ceiling. i touched it once. it was very wet, but on the " +
        "wrong side. it's not nearly as interesting as the bottom. have you ever tried to count all the " +
        "grains of sand down here? i have. i always get stuck after nine. it’s my unlucky number. " +
        "reminds me of a sea urchin i once knew who had nine spines. or was it nine and a half? " +
        "one was a bit wobbly.",

      "Glub Glub: so you don't know the fastest way up?",

      "Wallace: fast. you know, a dog once challenged me to a race. he was surprisingly quick. " +
        "all zig-zaggy. it was a blur of fur and determination. i, of course, being a whale, created a rather " +
        "large wake and he ended up somewhere near Jellyfish Fields. i think i won, but he never came back. " +
        "you can have the trophy tho",

      "Glub Glub: right. a race. of course. this is useless. how am i supposed to get all the way up there?",

      "Wallace: up where? to upperwear? i wouldn’t recommend it this time of year. the currents are just " +
        "dreadful for one’s complexion. makes my skin all... pruney.",
      "Glub Glub: no, to the... wait a minute. that big hole on your back... you breathe out of that, right? " +
        "it goes all the way to the top.",

      "Wallace: my blowhole? oh yes, it's wonderful for making bubbles. i can make one that looks just like " +
        "a squid if the water pressure is right. you just have to think squiddy thoughts.",

      "Glub Glub: hmm. that gives me an idea.",

      "Wallace: is your idea about squiddy thoughts? you have to really commit. you can’t be thinking about" +
        " jellyfish, it ruins the whole shape.",

      "",
    ];

    const dialogue_manager_instance = new dialogue_manager(
      dialogue_text_element,
      dialogues,
      dialogue_sound
    );
    dialogue_manager_instance.start(() => {
      dialogue_box.style.display = "none";
      localStorage.setItem("wallace_intro", "true");
    });

    document.body.addEventListener("click", () => {
      dialogue_manager_instance.show_next_dialogue();
    });
  } else {
    document.getElementById("dialogue-box").style.display = "none";
  }
});
