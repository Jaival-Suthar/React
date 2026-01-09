import RestaurantCard, {withPromotedLabel} from "./RestaurantCard";
import "./RestaurantCard.css";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../../utils/useOnlineStatus";
import { InputText } from 'primereact/inputtext';   
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { RESTAURANT_LIST_API } from "../../utils/constants";

const Body = () => {
    const [listOfRestaurants, setlistOfRestaurants] = useState([]);
    const [filteredRestaurants, setfilteredRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");
    const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
    const toast = useRef(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(RESTAURANT_LIST_API);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            const restaurantsArray = data?.data?.cards?.slice(3, 40)?.map(card => card?.card?.card?.info);
            
            if (!restaurantsArray || restaurantsArray.length === 0) {
                throw new Error('No restaurants data found');
            }
            //console.log("Fetched Restaurants:", restaurantsArray); // Debugging output
            setlistOfRestaurants(restaurantsArray);
            setfilteredRestaurants(restaurantsArray);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to fetch restaurants. Please try again later.',
                life: 3000
            });
        }
    };

    const handleSearch = () => {
        const filteredRestaurant = listOfRestaurants.filter(
            res => res.name?.toLowerCase().includes(searchText.toLowerCase())
        );
        setfilteredRestaurants(filteredRestaurant);
        
        if (filteredRestaurant.length === 0) {
            toast.current.show({
                severity: 'info',
                summary: 'No Results',
                detail: 'No restaurants found matching your search.',
                life: 3000
            });
        }
    };

    const handleTopRated = () => {
        const filteredList = listOfRestaurants.filter(
            (res) => res.avgRating > 4.5
        );
        setfilteredRestaurants(filteredList);
        
        toast.current.show({
            severity: 'success',
            summary: 'Filter Applied',
            detail: `Showing ${filteredList.length} top-rated restaurants`,
            life: 3000
        });
    };

    const onlineStatus = useOnlineStatus();
    if (onlineStatus === false) return (
        <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Card className="w-6">
                <div className="text-center">
                    <i className="pi pi-wifi-off text-6xl text-red-500 mb-3"></i>
                    <h1 className="text-xl font-bold">Looks like you're Offline</h1>
                    <p className="text-500">Please check your internet connection</p>
                </div>
            </Card>
        </div>
    );

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-3 align-items-center">
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-search"></i>
                    </span>
                    <InputText
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search restaurants..."
                        className="w-20rem"
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <Button
                        icon="pi pi-search"
                        onClick={handleSearch}
                        className="p-button-outlined"
                    />
                </div>
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <Button
                icon="pi pi-star"
                label="Top Rated Restaurants"
                onClick={handleTopRated}
                className="p-button-success"
            />
        );
    };

    return (
        <div className="surface-ground p-4">
            <Toast ref={toast} />
            {listOfRestaurants.length === 0 ? <Shimmer /> : (
                <>
                    <Card className="mb-4">
                        <Toolbar
                            left={leftToolbarTemplate}
                            right={rightToolbarTemplate}
                            className="mb-4"
                        />
                    </Card>
                    <div className="restaurant-list grid">
    {filteredRestaurants.length > 0 ? (
        filteredRestaurants.map((res) => {
            const Card = res?.promoted ? withPromotedLabel(RestaurantCard) : RestaurantCard;
            return (
                <div key={res?.id} className="col-12 md:col-6 lg:col-4 xl:col-3">
                    <Link to={`/restaurants/${res?.id}`} style={{ textDecoration: 'none' }}>
                        <Card restaurant={res} />
                    </Link>
                </div>
            );
        })
    ) : (
        <div className="col-12">
            <Card>
                <div className="text-center">
                    <p>No restaurants found.</p>
                </div>
            </Card>
        </div>
    )}
</div>

                </>
            )}
        </div>
    );
}

export default Body;