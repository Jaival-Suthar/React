const User = ({name})=>{
    return (
        <div className="user-card">
            <h2>Name: {name}</h2>
            <h3>Location: Gujarat, India</h3>
            <h4>Obsessed with making a positive impact</h4>
        </div>
    );
};

export default User;