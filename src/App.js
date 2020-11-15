import React, { useState } from "react";
import facade from "./apiFacade";
import LogIn, { LoggedIn } from "./LogIn.js";
import Header from "./Header.js";
import Starwars from "./Starwars.js";
import Admin from "./Admin.js";
import User from "./User.js";
import Joke from "./Joke";
import { Switch, Route } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  //const [role, setRole] = useState("");

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };

  const login = (user, pass) => {
    facade
      .login(user, pass)
      .then((res) => setLoggedIn(true), setError(""))
      .catch((err) => {
        setError("Wrong username or password");
      });
  };

  return (
    <div>
      <Header />
      <Switch>
        <Route path="/starwars">
          <Starwars />
        </Route>
        <Route path="/joke">
          <Joke />
        </Route>
        <Route path="/phone">
          <Joke />
        </Route>

        {!loggedIn ? (
          <div>
            <Route exact path="/">
              <LogIn login={login} />
              <p>{error}</p>
              <h3>Introduktion</h3>
              <p>
                Dette er velkomstsiden til mit lille projekt.
                <br />
                <br />
                Jeg har anvendt vores startcode som udgangspunkt i mit projekt.
                <br />
                I backenden har jeg implementeret en ny Entity klasse "Phone"
                med et forhold til en User. <br /> Jeg har implementeret
                funktioner, der gør det muligt at tilknytte telefonnumre til en
                bestemt User. <br /> Derudover har jeg som ekstra fetchet fra et
                JokeAPI mere, og lavet et tilhørende endpoint. <br /> <br />I
                frontenden har jeg lavet en Route mere, herunder "Joke". <br />{" "}
                Herinde kan man fetche en random joke fra en eksternal server.{" "}
                <br />
                Hvis man logger ind som User, har man mulighed for at indtaste
                et telefon nummer og tilkoble det Useren. <br /> <br />
                <b> Log ind med: User: user PW: testuser</b>
              </p>
            </Route>
          </div>
        ) : (
          <div>
            <div>
              <Route exact path="/">
                <LoggedIn />
                <button onClick={logout}>Logout</button>
              </Route>
            </div>
            <div>
              <Route path="/user">
                {facade.getRole() === "user" ? (
                  <User />
                ) : (
                  <p>Du er ikke logget ind som user</p>
                )}
              </Route>
            </div>
            <div>
              <Route path="/admin">
                {facade.getRole() === "admin" ? (
                  <Admin />
                ) : (
                  <p>Du er ikke logget ind som admin</p>
                )}
              </Route>
            </div>
          </div>
        )}
      </Switch>
    </div>
  );
}
export default App;
