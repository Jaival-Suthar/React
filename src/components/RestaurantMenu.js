import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "../../utils/constants";

const RestaurantMenu = () => {
    const [resInfo, setResInfo] = useState(null);
    const [itemCards, setItemCards] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const { resId } = useParams();
    
    console.log("Restaurant ID:", resId);

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        try {
            setLoading(true);
            const response = await fetch(MENU_API + resId);
            
            if (!response.ok) {
                throw new Error(`API responded with status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log("Full API Response:", data);
            
            // Extract restaurant info safely
            const resData = data?.data?.cards?.[2]?.card?.card?.info || null;
            
            // Extract item cards safely - handle different possible structures
            let extractedItemCards = [];
            const cardsArray = data?.data?.cards || [];
            
            // Try to find the card with itemCards
            for (const card of cardsArray) {
                if (card?.groupedCard?.cardGroupMap?.REGULAR?.cards) {
                    const regularCards = card.groupedCard.cardGroupMap.REGULAR.cards;
                    for (const regularCard of regularCards) {
                        if (regularCard?.card?.card?.itemCards && regularCard.card.card.itemCards.length > 0) {
                            extractedItemCards = regularCard.card.card.itemCards;
                            break;
                        }
                    }
                }
            }
            
            console.log("Found item cards:", extractedItemCards);
            
            setResInfo(resData);
            setItemCards(extractedItemCards);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching menu:", error);
            setError("Failed to load restaurant menu. Please try again later.");
            setLoading(false);
        }
    };
    
    // Show loading state
    if (loading) return <Shimmer />;
    
    // Show error state
    if (error) return <div className="error-container"><h2>{error}</h2></div>;
    
    // Show message if no data found
    if (!resInfo) return <div className="no-data"><h2>Restaurant information not available</h2></div>;
    
    return (
        <div className="menu">
            <h1>{resInfo?.name || "Restaurant Name Not Available"}</h1>
            <p>{resInfo?.cuisines?.join(", ") || "Cuisines Not Available"} - {resInfo?.costForTwoMessage || "Cost Not Available"}</p>
            
            <h2 className="menu-heading">Menu</h2>
            
            {itemCards.length > 0 ? (
                itemCards.map((item, index) => {
                    const itemData = item?.card?.info;
                    if (!itemData) return null;
                    
                    return (
                        <div key={index} className="menu-item-container">
                            <div className="menu-item-image-container">
                                <img
                                    src={itemData?.imageId ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${itemData.imageId}` : '/default-food-placeholder.jpg'}
                                    alt={itemData?.name || 'Menu item'}
                                    className="menu-item-image"
                                    style={{ width: "200px", height: "145px", objectFit: "cover", borderRadius: "8px" }}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/default-food-placeholder.jpg';
                                    }}
                                />
                            </div>
                            <div className="menu-item-content">
                                <h3>{itemData?.name || "Item Not Available"}</h3>
                                <p><strong>Category:</strong> {itemData?.category || "Not Specified"}</p>
                                <p>{itemData?.description || "No description available"}</p>
                                <p><strong>Price:</strong> ₹{(itemData?.price || 0) / 100}</p>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p>No menu items available</p>
            )}
        </div>
    );
};

export default RestaurantMenu;