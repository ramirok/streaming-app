// save current color scheme to localStorage
const saveColor = (state) => ({
  saveColorScheme(newScheme) {
    state.colorScheme = newScheme;
    localStorage.setItem("config", JSON.stringify(state));
  },
});

// save current playlist genre to localStorage
const saveGenre = (state) => ({
  saveGenre(newGenre) {
    state.genre = newGenre;
    localStorage.setItem("config", JSON.stringify(state));
  },
});

// menu object composition
const Menu = () => {
  const state = JSON.parse(localStorage.getItem("config")) || {
    genre: "electro",
    colorScheme: "scheme1",
  };

  return Object.assign(state, saveColor(state), saveGenre(state));
};

export default Menu;
