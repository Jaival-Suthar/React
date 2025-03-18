import React from "react";

class UserClass extends React.Component{
// Class has render methd which returns some piece of jsx
    constructor(props){
        super(props);
        console.log(props);
    };

    render(){
        //Let's destructure it so it looks good. And we dont't have to use this.props again
        const {name, location, status}=this.props;
        
        return (
            <div className="user-card">
                <h2>Name: {name}</h2>
                <h3>Location: {location}</h3>
                <h4>Status: {status}</h4>
            </div>
        );
    }
}
export default UserClass;