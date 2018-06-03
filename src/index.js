import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const AsyncMode = React.unstable_AsyncMode;

ReactDOM.render(
  <AsyncMode>
    <App />
  </AsyncMode>,
  document.getElementById("js-app")
);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(() => console.log("Service Worker has been registered"));
}
