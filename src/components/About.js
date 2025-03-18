import User from "./User";
import UserClass from "./UserClass";

const About = () => {
    return(
        <div>
            <h1>About</h1>
            <h2>We are one of most trusted App. Choosen by Millions.</h2>
            <User name="JS"/>
            <UserClass name={"JNS"} location={"Gujarat, India"} status={"Focusing"}/>

        </div>
    );
};
 
export default About;