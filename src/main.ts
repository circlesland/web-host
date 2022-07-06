import App from 'frame-app/src/App.svelte';

import { AUTH_API_URL } from '../config/api';

import type { ICirclesCustomWindow } from "@circlesland/frame-app/types/types";
declare global {
  interface Window extends ICirclesCustomWindow {}
}

window.authApi = {
  login: () => {
    window.location.assign(AUTH_API_URL);
  },
  logout: () => {
    localStorage.removeItem("privateKey");
    localStorage.removeItem("openlogin_store");
  },
  processAuth: (userDataParam) => {
    try {
      if (userDataParam) {
        const userDataJson = JSON.parse(atob(userDataParam));
        if (userDataJson) {
          Object.keys(userDataJson).forEach(function (k) {
            localStorage.setItem(k, userDataJson[k]);
          });
        }

        const _url = new URL(window.location.toString());
        _url.searchParams.delete("user_data");
        window.location.assign(_url.toString());

        return true;
      }
    } finally {
      return false;
    }
  },
  getDataFromLocalStorage: () => {
    const privateKey = localStorage.getItem("privateKey");
    const _accountData = localStorage.getItem("openlogin_store");
    if (privateKey && _accountData) {
      const accountData = JSON.parse(_accountData);
      return {
        sessionId: accountData.sessionId,
        email: accountData.email,
        name: accountData.name,
        profileImage: accountData.profileImage,
        privateKey,
      };
    }

    return null;
  },
};

const app = new App({
  target: document.getElementById("app"),
});

export default app;
