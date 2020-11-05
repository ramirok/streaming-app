import { domElements } from "../view/view.js";

export let auth2; //GoogleAuth object

const appStart = function () {
  gapi.load("auth2", initSigninV2);
};

var initSigninV2 = function () {
  auth2 = gapi.auth2.init({
    client_id:
      "397804942588-e4lg1b6sk340v0hj10it0cvc97te2sk8.apps.googleusercontent.com",
  });

  // listen for sign-in state changes.
  auth2.isSignedIn.listen(signinChanged);

  // sign in the user if they are currently signed in.
  if (auth2.isSignedIn.get() == true) {
    auth2.signIn();
  }
};

// show/hide login/logout button, recives loggedIn? boolean
const signinChanged = function (val) {
  if (val) {
    domElements.googleBtn.style.display = "none";
    domElements.logoutBtn.style.display = "block";
  } else {
    domElements.logoutBtn.style.display = "none";
    domElements.googleBtn.style.display = "block";
  }
};

// render login button
function renderButton() {
  gapi.signin2.render("my-signin2", {
    // function fires on succeed login
    onsuccess: async (google) => {
      // if there's no auth token from server, fetch and save to localStorage and reload
      if (!localStorage.getItem("sesion")) {
        const token = await fetch("/api/users", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${google.getAuthResponse().id_token}`,
          },
        });
        const tokenParsed = await token.json();
        localStorage.setItem("sesion", JSON.stringify(tokenParsed));
        window.location.reload();
      }
    },
    onfailure: () => {
      localStorage.removeItem("sesion"); //remove token
    },
  });
}

// change login button
let timer;
export const changeGoogleBUtnStyle = () => {
  domElements.googleBtn.style.borderRadius = "15px";
  domElements.googleBtn.style.width = "13rem";
  domElements.googleBtn.style.background = "white";

  //remove changes after 2s
  clearTimeout(timer);
  timer = setTimeout(() => {
    domElements.googleBtn.style.width = "4rem";
    domElements.googleBtn.style.borderRadius = "50%";
  }, 2000);
};

// initialize google login
export const initGoogle = () => {
  // load google script
  const script = document.createElement("script");
  script.src = "https://apis.google.com/js/platform.js";
  document.head.append(script);

  // render login button and initialize auth2 object
  script.onload = () => {
    renderButton();
    appStart();
  };
};
