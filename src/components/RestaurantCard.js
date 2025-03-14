const RestaurantCard = ({ restaurant }) => {
  console.log("Received restaurant data:", restaurant); // Debugging log

  if (!restaurant) {
      console.warn("No restaurant data available!");
      return <div className="res-card">No restaurant data available</div>;
  }

  return (
      <div className="res-card">
          <img 
              className="res-logo"
              alt={`${restaurant.name || "Restaurant"} logo`}
              src={restaurant.cloudinaryImageId 
                  ? `https://media-assets.swiggy.com/swiggy/image/upload/${restaurant.cloudinaryImageId}`
                  : "https://via.placeholder.com/150"
              }
          />
          <h3>{restaurant.name || "Unknown Restaurant"}</h3> 
          <h4>{restaurant.cuisines?.length ? restaurant.cuisines.join(", ") : "No cuisines available"}</h4> 
          <h4>{restaurant.avgRating ? `${restaurant.avgRating} stars` : "No rating available"}</h4> 
          <h4>{restaurant.costForTwoMessage}</h4>
          <h4>{restaurant.sla?.deliveryTime ? `${restaurant.sla.deliveryTime} minutes` : "Delivery time unknown"}</h4> 
      </div>
  );
};


// const RestaurantCard = (resData) => {
//     console.log(resData);

//     return (
//       <div className="res-card">
//           <img 
//               className="res-logo"
//               alt={`${resData.info.name} logo`}
//               src={`https://media-assets.swiggy.com/swiggy/image/upload/${resData.info.cloudinaryImageId}`}
//           />

//           <h3>{resData.info.name}</h3>
//           <h4>{resData.info.cuisines.join(", ")}</h4>
//           <h4>{resData.info.avgRating} stars</h4>
//           <h4>{resData.info.sla.deliveryTime} minutes</h4> 
//       </div>
//     );
    // return (
    //     <div className="res-card">
    //         <img 
    //             className="res-logo"
    //             alt={`${props.resData.resName} logo`}
    //             src={props.resData.image}
    //         />

    //         <h3>{props.resData.resName}</h3>
    //         <h4>{props.resData.cuisine}</h4>
    //         <h4>{props.resData.rating} stars</h4>
    //         <h4>{props.resData.delivery} minutes</h4> 
    //     </div>
    // );


export default RestaurantCard;

