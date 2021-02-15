{
  const scheme = localStorage.getItem("config");
  if (scheme) {
    const savedScheme = JSON.parse(scheme).colorScheme;
    document.querySelector(":root").classList = "";
    document.querySelector(":root").classList.add(savedScheme);
  } else {
    document.querySelector(":root").classList.add("scheme1");
  }
}
