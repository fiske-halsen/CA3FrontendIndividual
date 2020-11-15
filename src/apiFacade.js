import { URL } from "./settings.js";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function apiFacade() {
  /* Insert utility-methods from a latter step (d) here (REMEMBER to uncomment in the returned object when you do)*/
  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };

  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };

  const loggedIn = () => {
    const loggedIn = getToken() != null;

    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  const login = (user, password) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
      });
  };

  const getRole = () => {
    let myToken = getToken();
    let tokenData = myToken.split(".")[1];
    let decoedeJsonData = window.atob(tokenData);
    let decodedJwtData = JSON.parse(decoedeJsonData);
    let role = decodedJwtData.roles;
    console.log(role);

    return role;
  };

  const getUserName = () => {
    let myToken = getToken();
    let tokenData = myToken.split(".")[1];
    let decoedeJsonData = window.atob(tokenData);
    let decodedJwtData = JSON.parse(decoedeJsonData);
    let uName = decodedJwtData.username;
    console.log(uName);

    return uName;
  };

  const fetchData = () => {
    const options = makeOptions("GET", true); //True add's the token

    let role = getRole();

    return fetch(URL + "/api/info/" + role, options).then(handleHttpErrors);
  };

  const fetchStarwars = () => {
    const options = makeOptions("GET");

    return fetch(URL + "/api/info/parrallel/", options).then(handleHttpErrors);
  };

  const addPhone = (phone) => {
    let userName = getUserName();

    const options = makeOptions("PUT", true, {
      pNumber: phone.pNumber,
      uName: userName,
    });

    return fetch(URL + "/api/info/edit/" + userName, options).then(
      handleHttpErrors
    );
  };

  const fetchJoke = () => {
    const options = makeOptions("GET");
    return fetch(URL + "/api/info/joke/", options).then(handleHttpErrors);
  };

  const fetchPhones = () => {
    let userName = getUserName();
    const options = makeOptions("GET");
    return fetch(URL + "/api/info/getuserphones/" + userName, options).then(
      handleHttpErrors
    );
  };

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };
  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    fetchStarwars,
    fetchJoke,
    addPhone,
    getRole,
    fetchPhones,
  };
}

const facade = apiFacade();
export default facade;
