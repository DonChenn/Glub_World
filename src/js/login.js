function setup_confetti() {
  const confetti_settings = {
    target: "confetti-canvas",
    max: 80,
    size: 1,
    animate: true,
    props: ["circle", "square", "triangle", "line"],
    colors: [
      [165, 104, 246],
      [230, 61, 135],
      [0, 199, 228],
      [253, 214, 126],
    ],
    clock: 10,
    rotate: true,
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const confetti = new ConfettiGenerator(confetti_settings);
  confetti.render();
}

function handle_failed_login(count, message_element) {
  if (count === 1) {
    message_element.textContent =
      "TIP: for the best experience, play in 1680x1050 resolution!";
  } else if (count === 2) {
    message_element.textContent = "HINT: what are our nicknames?";
  } else if (count === 3) {
    message_element.textContent = "HINT: Yours goes first.";
  } else if (count === 4) {
    message_element.textContent = "HINT: ⟩<^,«⋗ AND /ᐠ > ˕ <マ";
  } else {
    message_element.textContent = "bruh";
  }
}

function initialize_login_form() {
  const login_form = document.getElementById("login-form");
  const username_input = document.getElementById("username");
  const password_input = document.getElementById("password");
  const message_element = document.getElementById("message");
  let attempt_count = 0;

  login_form.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = username_input.value;
    const password = password_input.value;

    if (
      (username === "glub glub" && password === "meow meow") ||
      (username === "Glub Glub" && password === "Meow Meow")
    ) {
      message_element.textContent = `Entering Glub World...`;

      setTimeout(() => {
        document.body.classList.add("fade-out");

        setTimeout(() => {
          window.location.href = "prologue.html";
        }, 2000);
      }, 2000);
    } else {
      attempt_count++;
      handle_failed_login(attempt_count, message_element);
    }
  });
}

function initialize_start_screen() {
  const start_screen = document.getElementById("start-screen");
  const app = document.querySelector(".App");
  const footer = document.querySelector(".login-footer");
  const audio = document.getElementById("background-music");

  start_screen.addEventListener("click", () => {
    start_screen.style.pointerEvents = "none";

    start_screen.classList.add("fade-out-start");

    setTimeout(() => {
      start_screen.classList.add("hidden");
    }, 1000);

    app.classList.remove("hidden");
    app.classList.add("fade-in");

    footer.classList.remove("hidden");
    footer.classList.add("fade-in");

    localStorage.setItem("userInteracted", "true");
    audio.play();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  localStorage.clear();
  setup_confetti();
  initialize_login_form();
  initialize_start_screen();
});
