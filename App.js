// const heading = React.createElement("h1",{id:"heading"},"Hello World from React");
// const root = ReactDOM.createRoot(document.getElementById("root"));
 import React from "react";
 import ReactDOM from "react-dom/client";

// JSX ( transpiled before it reaches the JS ) - PARCEL - BABEL
// JSX => Babel transpiles it to Reaact.createElement => ReactElement-JS Obj => HTMLElement(render)
//React Element
const Title = () => (
    <h1 className="head" tabIndex="5">Hello World from JSX</h1>
);
//React Component
const HeadingComponent = () =>(
     <div id="container">
     {<Title/>}
     <h1 className="heading">This is React functional component</h1>
     </div>   
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<HeadingComponent />);