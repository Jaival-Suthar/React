import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";


const Body = () => {
    const [listOfRestaurants,setlistOfRestaurants] = useState([]);
    const [filteredRestaurants,setfilteredRestaurants] = useState([]);
    const [searchText,setSearchText] = useState("");
    useEffect(() => {
        fetchData();
      }, []);

    const fetchData = async () => {
      try {
         // ✅ Fetching restaurant data from Swiggy API
        const response = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.022505&lng=72.5713621&collection=83633&tags=layout_CCS_NorthIndian&sortBy=&filters=&type=rcv2&offset=0&page_type=null");
         // ✅ Converting response to JSON format
 
        const data = await response.json();
       console.log("Full API Response:", data);
        

        
        // ✅ Extracting the restaurant info correctly
        const restaurantsArray = data?.data?.cards?.slice(3, 9)?.map(card => card?.card?.card?.info);
        //console.log("Data Extracted Loading: ", restaurantsArray);
        setlistOfRestaurants(restaurantsArray);
        setfilteredRestaurants(restaurantsArray);
       } catch (error) {
      // ✅ Handling any errors that occur during fetching or processing
      console.error("Error fetching data:", error);
        }
    };
    
    return listOfRestaurants.length===0 ? <Shimmer/> : (
        <div className="body">
            <div className="filter">
                <div className="search">                                                                                                                                                                                                                                                                                            
                    <input type="text" 
                        className="search-box" 
                        value={searchText} 
                        onChange={(e)=>{
                            setSearchText(e.target.value);
                        }}/>
                    <button
                        onClick={()=>{
                            //Filter the restuarant cards and update the UI
                            const filteredRestaurant = listOfRestaurants.filter(
                                res => res.name?.toLowerCase().includes(searchText.toLowerCase()) 
                            );  
                            console.log(searchText);
                            setfilteredRestaurants(filteredRestaurant);
                        }}    
                    >Search</button>
                </div>
                
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
            {/* {filteredRestaurants.map((res) => <RestaurantCard key={res.id} restaurant={res} />)} */}
            {
            filteredRestaurants.map((res) => {
                console.log("Restaurant object:", res);
                return res ? 
            
            <Link 
                key={res?.id}
                to={"/restaurants/" + res?.id}>
                <RestaurantCard restaurant={res} />
            </Link>  : (
                <p>No restaurants found.</p>
            )})};
            </div>
        </div>
    )
}

export default Body;