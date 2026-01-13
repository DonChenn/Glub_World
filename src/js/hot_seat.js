document.addEventListener("DOMContentLoaded", () => {
  const background_music = document.getElementById("background-music");

  document.body.addEventListener("click", () => {
    background_music.play();
  });

  const dialogue_text_element = document.getElementById("dialogue-text");
  const dialogue_box = document.getElementById("dialogue-box");
  const dialogue_sound = document.getElementById("dialogue-sound");
  let current_question_index = 0;
  let score = 0;
  const quest_pending = document.getElementById("quest_pending_icon");
  let current_dialogue = null;

  const game_questions = [
    {
      question: "Q1: Which film stocks has Meow Meow not tried yet?",
      options: [
        "Portra 400",
        "CineStill 400D",
        "Kodak Ultramax 400",
        "Kodak TMax 400",
      ],
      correct_answer: "Kodak TMax 400",
    },
    {
      question:
        "Q2: How many tiktoks has Meow Meow been included in yours this past year?",
      options: ["3", "4", "5", "6"],
      correct_answer: "5",
    },
    {
      question: "Q3: Who is Meow Meow's Twice Bias?",
      options: ["JIHYO", "NAYEON", "TZUYU", "MOMO"],
      correct_answer: "NAYEON",
    },
    {
      question:
        "Q4: How many times have you and Meow Meow said i love you to each other on discord this past year?",
      options: ["365", "193", "133", "75"],
      correct_answer: "133",
    },
    {
      question:
        "Q5: How many SumOnes have you and Meow Meow completed this past year?",
      options: ["55", "102", "365", "78"],
      correct_answer: "78",
    },
    {
      question:
        "Q6: How many Adventure Time episodes do you and Meow Meow have left?",
      options: ["29", "47", "10", "51"],
      correct_answer: "47",
    },
    {
      question:
        "Q7: How many times did you and Meow Meow collectively visit each other at LA/Irvine this past year?",
      options: ["1000", "25", "15", "30"],
      correct_answer: "25",
    },
    {
      question: "Q8: What is Meow Meow's favorite album this past year?",
      options: [
        "Clipse - Let God Sort Em Out",
        "Kalis Uchis - Sincerely,",
        "Quadeca - Vanisher, Horizon Scraper",
        "TWICE - THIS IS FOR",
      ],
      correct_answer: "Clipse - Let God Sort Em Out",
    },
    {
      question: "Q9: What's Meow Meow's favorite restaurant from the list?",
      options: ["Tomikawa", "BCD", "Popeyes", "Tacos El Gordo"],
      correct_answer: "BCD",
    },
    {
      question:
        "Q10: How many photobooth pics do you and Meow Meow have in the google photos album?",
      options: ["7", "8", "9", "10"],
      correct_answer: "9",
    },
  ];

  function start_game() {
    dialogue_box.style.display = "none";
    const game_container = document.getElementById("game-container");
    game_container.style.display = "block";
    display_question();
  }

  function display_question() {
    const question_data = game_questions[current_question_index];
    const question_element = document.getElementById("question-text");
    const options_container = document.getElementById("options-container");

    question_element.textContent = question_data.question;
    options_container.innerHTML = "";

    question_data.options.forEach((option) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.addEventListener("click", () => handle_answer(option));
      options_container.appendChild(button);
    });
  }

  function handle_answer(selected_option) {
    const question_data = game_questions[current_question_index];
    const options_container = document.getElementById("options-container");
    const buttons = options_container.querySelectorAll("button");

    buttons.forEach((button) => (button.disabled = true));

    buttons.forEach((button) => {
      if (button.textContent === question_data.correct_answer) {
        button.style.backgroundColor = "green";
      }
      if (
        button.textContent === selected_option &&
        selected_option !== question_data.correct_answer
      ) {
        button.style.backgroundColor = "red";
      }
    });

    if (selected_option === question_data.correct_answer) {
      score++;
    }

    setTimeout(() => {
      current_question_index++;
      if (current_question_index < game_questions.length) {
        display_question();
      } else {
        end_game();
      }
    }, 2000);
  }

  function end_game() {
    const game_container = document.getElementById("game-container");
    const question_element = document.getElementById("question-text");
    const options_container = document.getElementById("options-container");

    options_container.innerHTML = "";

    question_element.textContent = `Game Over! You scored ${score} out of ${game_questions.length}.`;

    const restart_button = document.createElement("button");
    restart_button.textContent = "Exit";
    restart_button.addEventListener("click", () => {
      game_container.style.display = "none";
    });
    options_container.appendChild(restart_button);

    localStorage.setItem("gameshow_complete", "true");
  }

  if (localStorage.getItem("hot_seat_intro") !== "true") {
    const dialogues = [
      "Hot Seat Host: WELCOME WELCOME TO OUR SPECIAL PROGRAM",
      "Hot Seat Host: it is I, your host, Finny",
      "Finny: and now for our next contestant... YOU!",
      "Glub Glub: huh me? but i was just swimming by",
      "Glub Glub: i need to get to the fashion ga-",
      "Finny: NONSENSE! this is the most fin-tastic, splash-tacular game show in the entire blue",
      "Finny: and you are going to be the next star",
      "Glub Glub: but im not ready for this type of pressure",
      "Finny: oh you'll be ready alright, ready for fame, ready for fortune, and ready for... THE HOT SEAT!",
      "interact with the chair to start the game!",
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
      localStorage.setItem("hot_seat_intro", "true");
    });

    document.body.addEventListener("click", () => {
      dialogue_manager_instance.show_next_dialogue();
    });
  } else {
    document.getElementById("dialogue-box").style.display = "none";
  }

  document.addEventListener("keydown", (event) => {
    if (event.code !== "Space") {
      return;
    }

    const chair_x = window.innerWidth / 2.1;
    const chair_y = window.innerHeight / 1.55;

    const pengy_x = window.innerWidth / 3.7;
    const pengy_y = window.innerHeight / 1.5;

    const interaction_radius = 100;

    const is_near_chair =
      Math.abs(x - chair_x) < interaction_radius &&
      Math.abs(y - chair_y) < interaction_radius;

    const is_near_pengy =
      Math.abs(x - pengy_x) < interaction_radius &&
      Math.abs(y - pengy_y) < interaction_radius;

    if (is_near_chair) {
      start_game();
    }

    if (is_near_pengy && localStorage.getItem("gameshow_complete")) {
      let dialogues;

      if (score < 10) {
        dialogues = [
          `Finny: yikes... only ${score}?`,
          "Finny: i expected you to get 100% for your Meow Meow of 7 years",
          "Finny: win or lose, here's your prize...",
          "",
        ];
      } else {
        dialogues = [
          `Finny: OUR NEXT STAR!`,
          "Finny: i knew you would get 100% for your Meow Meow of 7 years",
          "Finny: here's your fabulous prize!",
          "",
        ];
      }
      const reward_dialogue_manager = new dialogue_manager(
        dialogue_text_element,
        dialogues,
        dialogue_sound
      );
      current_dialogue = reward_dialogue_manager;

      dialogue_box.style.display = "block";

      reward_dialogue_manager.start(() => {
        dialogue_box.style.display = "none";
      });

      document.body.addEventListener("click", () => {
        if (current_dialogue === reward_dialogue_manager) {
          reward_dialogue_manager.show_next_dialogue();
        }
      });

      quest_pending.style.display = "none";
    }
  });
});
