import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";


const Body = () => {
    const [listOfRestaurants,setlistOfRestaurants] = useState([]);

    const fetchData = async () => {
      try {
         // ✅ Fetching restaurant data from Swiggy API
        const response = await fetch("https://www.swiggy.com/dapi/restaurants/search/v3?lat=23.02760&lng=72.58710&str=Pizza%20Hut&trackingId=undefined&submitAction=ENTER&queryUniqueId=bf43b3dc-4cf3-b388-7b87-e9771f2e972a&selectedPLTab=DISH#");
         // ✅ Converting response to JSON format
        const data = await response.json();
        console.log("Full API Response:", data);

        // ✅ Extracting the restaurant info correctly
        const restaurantsArray = data?.data?.cards?.[0]?.groupedCard?.cardGroupMap?.DISH?.cards;

         // ✅ Checking if valid restaurant data exists
         if (restaurantsArray && restaurantsArray.length > 0) {
          // ✅ Extracting only the first 5 restaurants
          const extractedRestaurants = restaurantsArray
               // Take only the first 5 items
              .map(card => card?.card?.card?.restaurant?.info) // Extracting restaurant info
              .filter(Boolean); // Removing undefined values
            
              const uniqueRestaurants = extractedRestaurants.filter(
                (restaurant, index, self) =>
                    index === self.findIndex((res) => res.id === restaurant.id)
            );
        
            setlistOfRestaurants(uniqueRestaurants);
          // ✅ Updating the state with extracted restaurant data
          // setlistOfRestaurants(extractedRestaurants);
          
          console.log("Extracted First 5 Restaurants:", extractedRestaurants);
      } else {
          console.error("Restaurant data not found in expected format.");
      }
  } catch (error) {
      // ✅ Handling any errors that occur during fetching or processing
      console.error("Error fetching data:", error);
  }
    };

    useEffect(() => {
      fetchData();
    }, []);
    
    return (
        <div className="body">
            <div className="filter">
                <button className="filter-btn" 
                onClick={()=>{
                  const filteredList = listOfRestaurants.filter(
                    (res) => res.avgRating > 4
                );
                    setlistOfRestaurants(filteredList);
                }}>
                    Top Rated Restaurant
                </button>
            </div>
            <div className="res-container">
            {listOfRestaurants.map((res) => <RestaurantCard key={res.id} restaurant={res} />)}
                {/* {listOfRestaurants.map((restaurant)=>(
                    <RestaurantCard key={restaurant.id} resData={restaurant}/>
                ))} */}
            </div>
        </div>
    )
}

export default Body;