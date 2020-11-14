import React, { useState, useEffect } from "react";
import facade from "./apiFacade.js";
function User() {
  let obj = { pNumber: "" };

  const [phone, setPhone] = useState(obj);

  const onChange = (evt) => {
    const value = evt.target.value;
    phone.pNumber = value;
    setPhone({ ...phone });
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    facade.addPhone(phone);
    setPhone({ ...obj });
  };

  return (
    <div>
      <h1>Du er logget ind som user og har adgang til denne side</h1>
      <h3> Du kan tilføje et telefonnummer her </h3>

      <form>
        <h4></h4>
        <label>
          Telefonnummer
          <input id="pNumber" value={phone.pNumber} onChange={onChange} />
        </label>
        <p>{phone.pNumber} </p>

        <button onClick={handleSubmit} className="btn btn-info">
          Save
        </button>
      </form>
    </div>
  );
}

export default User;
