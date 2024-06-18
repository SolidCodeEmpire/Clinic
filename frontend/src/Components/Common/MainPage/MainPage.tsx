import React from "react";
import "./MainPage.css"

export function MainPage() {
  return (
    <div className="main-page-container">
      <h1>Hello user!</h1>
      <h2>Brief instruction on how to use our program:</h2>
      <ul className="instruction-container">
        <li>
          1. On titlte bar {"(upper bar)"} you can see name of our program and button to log out of your account.
        </li>
        <li>
          2. There's navbar on the left side of the page. From there you can choose what do you want to do.
        </li>
        <li>
          3. If the instruction is unclear or you are having trouble with our site contact administrator.
        </li>
      </ul>
    </div>
  );
}
