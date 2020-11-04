import { domElements, colorSchemes, genres } from "./view.js";

// render color scheme menu
export const renderThemeMenu = () => {
  // </li> items for each color scheme
  const itemsArray = [];
  for (const key in colorSchemes) {
    itemsArray.push(`<li id="${key}">
        <div class="button button-small"></div>
      </li>`);
  }
  const html = `<div class="dropDownMenu" id="menu-palette"><ul>
  ${itemsArray.join("")}</ul></div>`;

  // insert html
  domElements.colorPalette.insertAdjacentHTML("afterend", html);

  // add active style to button
  domElements.colorPalette.classList.add("active");

  // add previsualization icon for each color scheme
  document
    .getElementById("menu-palette")
    .querySelectorAll("li")
    .forEach((el) => {
      el.firstElementChild.style.background = `linear-gradient(to right, ${
        colorSchemes[el.id]["--main-bg-color"]
      }, ${colorSchemes[el.id]["--main-bg-color"]} 50%, ${
        colorSchemes[el.id]["--secondary-bg-color"]
      } 50%, ${colorSchemes[el.id]["--secondary-bg-color"]})`;
    });
};

// render genre menu
export const renderGenreMenu = () => {
  // </li> items for genre
  const itemsArray = [];
  for (const element of genres) {
    itemsArray.push(
      `<li id="${element}"><span>${element}</span><div class="button button-small"></div></li>`
    );
  }
  const html = `<div class="dropDownMenu" id="menu-genre"><ul>
${itemsArray.join("")}</ul></div>`;

  // insert html
  domElements.genreBtn.insertAdjacentHTML("afterend", html);

  // add active style to button
  domElements.genreBtn.classList.add("active");
};
