import User from "./User";
import UserClass from "./UserClass";
import React from "react"; //Can also be written as just { Component } by destructuring (extends Component)

class About extends React.Component{

    constructor(props){
        super(props);
        //console.log("Parent Contructor");
    }

    componentDidMount(){
        //console.log("Parent component did mount");
    }

    render (){
        //console.log("Parent Render")
        return(
            <div>
                <h1>About</h1>
                <h2>We are one of most trusted App. Choosen by Millions.</h2>
                <UserClass />
    
            </div>
        ); 
    }
}

 
export default About;