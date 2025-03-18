import React from "react";

class UserClass extends React.Component{
// Class has render methd which returns some piece of jsx
    constructor(props){
        super(props);
        console.log(props);

        this.state={
            count:0,
            count2:2
        };
    };

    render(){
        //Let's destructure it so it looks good. And we dont't have to use this.props again
        const {name, location, status}=this.props;
        const { count, count2  }=this.state;
        return (
            <div className="user-card">
                <h1>Count: {count}</h1>
                <h1>Count: {count2}</h1>
                <h2>Name: {name}</h2>
                <h3>Location: {location}</h3>
                <h4>Status: {status}</h4>
            </div>
        );
    }
}
export default UserClass;