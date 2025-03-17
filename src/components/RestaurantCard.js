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
      <h4>{restaurant.costForTwo || "Price not available"}</h4>
      <h4>{restaurant.sla?.deliveryTime ? `${restaurant.sla.deliveryTime} minutes` : "Delivery time unknown"}</h4> 
      <h4>{restaurant.areaName || restaurant.locality || "Location unknown"}</h4> 
      </div>
  );
};

export default RestaurantCard;

