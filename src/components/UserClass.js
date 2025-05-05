import React from "react";

class UserClass extends React.Component{
// Class has render methd which returns some piece of jsx
    constructor(props){
        super(props);

        //console.log(this.props.name+"Child Constructor");
        this.state={
            userInfo:{
                name: "Dummy",
                location: "Default",
                avatar_url: "",
            }
        };
        
    };

    async componentDidMount(){
        //console.log(this.props.name+"Child component did mount");
        const data = await fetch("https://api.github.com/users/Jaival-Suthar");
        const json = await data.json();

        this.setState({
            userInfo: json,
        })
        console.log(json);
    }

    render(){
        //Let's destructure it so it looks good. And we dont't have to use this.props again
        const {name, location, bio, avatar_url}=this.props;
        //console.log(this.props.name+"Child Render");
        return (
            <div className="user-card">
                {/* <h1>Count: {count}</h1> */}
                {/* <button onClick={()=>{
                    //NEVER UPDATE STATE VARIABLES DIRECTLY
                    this.setState({
                        count: this.state.count + 1,
                    })
                }}>Count Increase</button> */}
                <img className="user-card-img" src={this.state.userInfo.avatar_url}/>
                <h2>Name: {this.state.userInfo.name}</h2>
                <h3>Location: {this.state.userInfo.location}</h3>
                <h4>Bio: {this.state.userInfo.bio}</h4>
            </div>
        );
    }
}
export default UserClass;