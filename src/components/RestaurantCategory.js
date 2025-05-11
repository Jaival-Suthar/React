// RestaurantCategory.js
import React from 'react';

const RestaurantCategory = ({ data }) => {
    //console.log("Category Data:", data);
    return (
        <div className="restaurant-category">
    <h3>{data?.title}</h3>
    {data?.itemCards && data.itemCards.map((item, index) => {
        const info = item?.card?.info;
        return (
            <div key={index} className="menu-item" style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px", borderRadius: "8px", display: "flex", gap: "15px" }}>
                <img 
                    src={info?.imageId
                        ? `https://media-assets.swiggy.com/swiggy/image/upload/${info.imageId}`
                        : "https://via.placeholder.com/150"}
                    alt={info?.name || "Food item"}
                    style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
                />

               
                <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h3 style={{ margin: 0 }}>{info?.name}</h3>
                        <span style={{ color: info?.itemAttribute?.vegClassifier === "VEG" ? "green" : "red", fontWeight: "bold" }}>
                            {info?.itemAttribute?.vegClassifier === "VEG" ? "🟢 VEG" : "🔴 NON-VEG"}
                        </span>
                    </div>

                    {info?.isBestseller && (
                        <p style={{ color: "#e67e22", fontWeight: "bold", margin: "4px 0" }}>★ Bestseller</p>
                    )}

                    <p style={{ fontStyle: "italic", margin: "4px 0" }}>{info?.description}</p>
                    <p style={{ margin: "4px 0" }}>Price: ₹{(info?.price || info?.defaultPrice || 0) / 100}</p>

                    {info?.ratings?.aggregatedRating?.rating && (
                        <p style={{ margin: "4px 0" }}>Rating: ⭐ {info.ratings.aggregatedRating.rating}</p>
                    )}
                </div>
            </div>
        );
    })}
</div>


    );
};

export default RestaurantCategory;