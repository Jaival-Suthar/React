// RestaurantMenu.js
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "../../utils/constants";
import RestaurantCategory from "./RestaurantCategory";
import { Accordion, AccordionTab } from 'primereact/accordion';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const RestaurantMenu = () => {
    const [resInfo, setResInfo] = useState(null);
    const [categories, setCategories] = useState([]);
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