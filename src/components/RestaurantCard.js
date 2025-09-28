import { Card } from 'primereact/card';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import 'primeflex/primeflex.css';


const RestaurantCard = ({ restaurant }) => {
  //console.log("Received restaurant data:", restaurant); // Debugging log

  const toast = useRef(null);

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
      <h3 className="res-name">{restaurant.name || "Unknown Restaurant"}</h3>
      <h4>{restaurant.cuisines?.join(", ") || "No cuisines available"}</h4>
      <h4>{restaurant.avgRating ? `${restaurant.avgRating} stars` : "No rating available"}</h4>
      <h4>{restaurant.costForTwo || "Price not available"}</h4>
      <h4>{restaurant.sla?.deliveryTime ? `${restaurant.sla.deliveryTime} minutes` : "Delivery time unknown"}</h4>
      <h4>{restaurant.areaName || restaurant.locality || "Location unknown"}</h4>
    </div>
  );
};
//Higher Order Component (HOC) 

//input - RestaurantCard => RestaurantCardPromoted 
export const withPromotedLabel = (BaseComponent) => {
  return (props) => {
    const { restaurant } = props;
    const isPromoted = restaurant?.promoted;

    return (
      <div className="relative">
        {isPromoted && (
          <div className="absolute top-0 left-0 m-2 px-2 py-1 text-xs font-bold text-white uppercase bg-black-alpha-90 border-round-sm shadow-2 z-2">
            Promoted
          </div>
        )}
        <BaseComponent {...props} />
      </div>
    );
  };
};




export default RestaurantCard;
