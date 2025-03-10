const RestaurentCard = (props) => {
    console.log(props);

    return (
        <div className="res-card">
            <img 
                className="res-logo"
                alt={`${props.resData.resName} logo`}
                src={props.resData.image}
            />

            <h3>{props.resData.resName}</h3>
            <h4>{props.resData.cuisine}</h4>
            <h4>{props.resData.rating} stars</h4>
            <h4>{props.resData.delivery} minutes</h4>
        </div>
    );
};

export default RestaurentCard;
