import React from "react";

class UserClass extends React.Component{
// Class has render methd which returns some piece of jsx
    constructor(props){
        super(props);
       
        
        console.log("Child Constructor");
        this.state={
            count:0,
        };
    };

    componentDidMount(){
        console.log("Child component did mount");
    }

    render(){
        //Let's destructure it so it looks good. And we dont't have to use this.props again
        const {name, location, status}=this.props;
        const { count  }=this.state;
        console.log("Child Render");
        return (
            <div className="user-card">
                <h1>Count: {count}</h1>
                <button onClick={()=>{
                    //NEVER UPDATE STATE VARIABLES DIRECTLY
                    this.setState({
                        count: this.state.count + 1,
                    })
                }}>Count Increase</button>
                <h2>Name: {name}</h2>
                <h3>Location: {location}</h3>
                <h4>Status: {status}</h4>
            </div>
        );
    }
}
export default UserClass;