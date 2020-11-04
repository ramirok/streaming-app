// fetch songs list
const fetchLibrary = (state) => ({
  async get(url) {
    try {
      const response = await fetch(`/api/${url}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("sesion"))}`,
        },
      });
      const parsedResponse = await response.json();
      state.list = [...parsedResponse];
    } catch (error) {}
  },
});

// songList object composition
const SongList = () => {
  const list = []; //current playlist
  return Object.assign(list, fetchLibrary(list));
};

export default SongList;
