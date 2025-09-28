// RestaurantMenu.js
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MENU_API } from "../../utils/constants";
import RestaurantCategory from "./RestaurantCategory";
import { Accordion, AccordionTab } from 'primereact/accordion';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { ProgressSpinner } from 'primereact/progressspinner';

const RestaurantMenu = () => {
    const [resInfo, setResInfo] = useState(null);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const { resId } = useParams();

    //console.log("Restaurant ID:", resId);

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
            //console.log("Full API Response:", data);

            // Extract restaurant info safely
            const resData = data?.data?.cards?.[2]?.card?.card?.info || null;

            // Extract categories for accordion
            const extractedCategories = data?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
                (c) => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
            ) || [];

            //console.log("Extracted categories data:", extractedCategories);

            setResInfo(resData);
            setCategories(extractedCategories);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching menu:", error);
            setError("Failed to load restaurant menu. Please try again later.");
            setLoading(false);
        }
    };



    // Show error state
    if (error) return <div className="error-container"><h2>{error}</h2></div>;

    useEffect(() => {
  let timer;
  if (!loading) {
    // Keep spinner visible for at least 1 second after actual loading completes
    timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }
  
  return () => {
    if (timer) clearTimeout(timer);
  };
}, [loading]);

if (isLoading) {
  return (
    <div className="spinner-container" style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.7)' // Semi-transparent background
    }}>
      <ProgressSpinner 
        style={{width: '50px', height: '50px'}} 
        strokeWidth="8" 
        fill="transparent" 
        animationDuration=".5s" 
      />
    </div>
  );
}

    if (!resInfo) return <div className="no-data"><h2>Restaurant information not available</h2></div>;

    return (
        <div className="menu">
            <h1>{resInfo?.name || "Restaurant Name Not Available"}</h1>
            <p>{resInfo?.cuisines?.join(", ") || "Cuisines Not Available"} - {resInfo?.costForTwoMessage || "Cost Not Available"}</p>

            <h2 className="menu-heading">Menu</h2>

            <Accordion activeIndex={0}>
                {categories.length > 0 &&
                    categories.map((category, index) => (
                        <AccordionTab key={category?.card?.card?.title} header={category?.card?.card?.title}>
                            <RestaurantCategory data={category?.card?.card} />
                        </AccordionTab>
                    ))}
            </Accordion>
        </div>
    );
};

export default RestaurantMenu;