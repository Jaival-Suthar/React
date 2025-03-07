// const heading = React.createElement("h1",{id:"heading"},"Hello World from React");
// const root = ReactDOM.createRoot(document.getElementById("root"));
 import React from "react";
 import ReactDOM from "react-dom/client";

const parent = React.createElement("div",{id:"parent"},[
    React.createElement("div",{id:"child"},[
    React.createElement("h1",{},"I'm a H1 tag"),
    React.createElement("h2",{},"I'm a H2 tag")
   ]),
    React.createElement("div",{id:"child"},[
    React.createElement("h1",{},"I'm a H1 tag"),
    React.createElement("h2",{},"I'm a H2 tag")
   ]),
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);