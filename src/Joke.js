import facade from "./apiFacade.js";
import React, { useState, useEffect } from "react";

function Joke() {
  let obj = {
    id: "",
    joke: "Default Joke",
  };

  const [dataFromServer, setDataFromServer] = useState(obj);

  const fetchAJoke = () => {
    facade.fetchJoke().then((data) => setDataFromServer(data));
  };

  return (
    <div>
      <h1>Welcome to the Joke Route </h1>

      <h3>{dataFromServer.joke} </h3>

      <button onClick={() => fetchAJoke()}>Press here to get a joke</button>
    </div>
  );
}

export default Joke;
