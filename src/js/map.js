document.addEventListener("DOMContentLoaded", () => {
  const all_locations = [
    "home",
    "wallace",
    "spawn",
    "seaweed_castle",
    "threek",
    "jellyfish_fields",
    "crevice",
    "hot_seat",
    "crystal_crab_cave",
    "sunken_ship",
  ];

  const map_overlay = document.getElementById("map-overlay");
  const map_container = document.getElementById("map-container");

  if (map_overlay) {
    map_overlay.style.display = "none";
  }

  function update_map() {
    if (!map_container) return;
    map_container.innerHTML = "";
    const visited_locations =
      JSON.parse(localStorage.getItem("visited_locations")) || [];

    all_locations.forEach((location) => {
      const location_element = document.createElement("div");
      location_element.classList.add("map-location");
      location_element.id = `map-${location}`;

      if (visited_locations.includes(location)) {
        location_element.textContent = location.replace(/_/g, " ");
      } else {
        location_element.textContent = "???";
      }
      map_container.appendChild(location_element);
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "m" && map_overlay) {
      const is_visible = map_overlay.style.display === "flex";
      if (is_visible) {
        map_overlay.style.display = "none";
      } else {
        update_map();
        map_overlay.style.display = "flex";
      }
    }
  });
});
