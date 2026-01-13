let x = window.innerWidth / 2;
let y = window.innerHeight / 2;

document.addEventListener("DOMContentLoaded", () => {
  const character = document.getElementById("character");
  const character_img = character.querySelector("img");

  let norm_speed = 5;
  let sprint_speed = 10;
  let speed = norm_speed;

  const path = window.location.pathname;
  const page_html = path.split("/").pop();
  const page = page_html.split(".")[0];

  const query_string = window.location.search;
  const url_params = new URLSearchParams(query_string);
  const from = url_params.get("from");

  if (page === "crystal_crab_cave") {
    norm_speed = 1;
    sprint_speed = 2;
  }

  let visited_locations =
    JSON.parse(localStorage.getItem("visited_locations")) || [];
  if (!visited_locations.includes(page)) {
    visited_locations.push(page);
    localStorage.setItem(
      "visited_locations",
      JSON.stringify(visited_locations)
    );
  }

  let path_dict;

  if (localStorage.getItem("catfish_quest_complete")) {
    path_dict = {
      spawn: [null, "seaweed_castle", null, null],
      seaweed_castle: ["spawn", "threek", null, null],
      threek: ["seaweed_castle", "jellyfish_fields", "wallace", "crevice"],
      crevice: [null, null, "threek", "sunken_ship"],
      sunken_ship: [null, null, "crevice", null],
      jellyfish_fields: ["threek", null, null, "hot_seat"],
      hot_seat: [null, "crystal_crab_cave", "jellyfish_fields", null],
      crystal_crab_cave: ["hot_seat", null, null, null],
      wallace: [null, null, "home", "threek"],
      home: [null, null, null, "wallace"],
    };
  } else {
    path_dict = {
      spawn: [null, "seaweed_castle", null, null],
      seaweed_castle: ["spawn", "threek", null, null],
      threek: ["seaweed_castle", "jellyfish_fields", null, "crevice"],
      crevice: [null, null, "threek", "sunken_ship"],
      sunken_ship: [null, null, "crevice", null],
      jellyfish_fields: ["threek", null, null, "hot_seat"],
      hot_seat: [null, "crystal_crab_cave", "jellyfish_fields", null],
      crystal_crab_cave: ["hot_seat", null, null, null],
      wallace: [null, null, "home", "threek"],
      home: [null, null, null, "wallace"],
    };
  }

  const pages = path_dict[page];
  const left = pages[0];
  const right = pages[1];
  const up = pages[2];
  const down = pages[3];

  let is_flipped = false;

  if (from === left) {
    x = 0;
  } else if (from === right) {
    x = window.innerWidth;
    is_flipped = true;
    character_img.classList.add("flipped");
  } else if (from === up) {
    y = 0;
  } else if (from === down) {
    y = window.innerHeight;
  } else if (from === "login") {
    x = window.innerWidth / 3.1;
    y = window.innerHeight / 1.7;
  }

  const keys_pressed = {
    w: false,
    a: false,
    s: false,
    d: false,
    Shift: false,
  };

  const update_position = () => {
    const char_rect = character.getBoundingClientRect();
    character.style.left = `${x - char_rect.width / 2}px`;
    character.style.top = `${y - char_rect.height / 2}px`;
  };

  document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (key === "Shift") {
      keys_pressed.Shift = true;
    } else if (key.toLowerCase() in keys_pressed) {
      keys_pressed[key.toLowerCase()] = true;
    }
  });

  document.addEventListener("keyup", (event) => {
    const key = event.key;
    if (key === "Shift") {
      keys_pressed.Shift = false;
    } else if (key.toLowerCase() in keys_pressed) {
      keys_pressed[key.toLowerCase()] = false;
    }
  });

  function navigate_to(page_name) {
    const backgroundMusic = document.getElementById("background-music");
    if (backgroundMusic) {
      sessionStorage.setItem("music_time", backgroundMusic.currentTime);
    }
    window.location.href = `${page_name}.html?from=${page}`;
    System.exit(0);
  }

  function move_loop() {
    if (keys_pressed.Shift) {
      speed = sprint_speed;
    } else {
      speed = norm_speed;
    }

    let dx = 0;
    let dy = 0;

    if (keys_pressed.w) dy -= 1;
    if (keys_pressed.s) dy += 1;
    if (keys_pressed.a) dx -= 1;
    if (keys_pressed.d) dx += 1;

    if (dx < 0 && !is_flipped) {
      is_flipped = true;
      character_img.classList.add("flipped");
    } else if (dx > 0 && is_flipped) {
      is_flipped = false;
      character_img.classList.remove("flipped");
    }

    if (dx !== 0 && dy !== 0) {
      const diagonal_speed = speed / Math.sqrt(2);
      x += dx * diagonal_speed;
      y += dy * diagonal_speed;
    } else {
      x += dx * speed;
      y += dy * speed;
    }

    update_position();

    if (x < 0 && left) {
      navigate_to(left);
    } else if (x > window.innerWidth && right) {
      navigate_to(right);
    } else if (y < 0 && up) {
      navigate_to(up);
    } else if (y > window.innerHeight && down) {
      navigate_to(down);
    }

    requestAnimationFrame(move_loop);
  }

  update_position();
  move_loop();
});
