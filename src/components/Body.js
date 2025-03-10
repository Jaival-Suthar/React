import RestaurentCard from "./RestaurentCard";
import { useState } from "react";
import resList from "../../utils/mockData";

const Body = () => {
    const [listOfRestaurents,setlisOfRestaurents] = useState(resList);

    return (
        <div className="body">
            <div className="filter">
                <button className="filter-btn" 
                onClick={()=>{
                    const filteredList = listOfRestaurents.filter(
                        (res)=>res.rating>4
                    );
                    setlisOfRestaurents(filteredList);
                }}>
                    Top Rated Restaurent
                </button>
            </div>
            <div className="res-container">
                {listOfRestaurents.map((restaurent)=>(
                    <RestaurentCard key={restaurent.id} resData={restaurent}/>
                ))}
            </div>
        </div>
    )
}

export default Body;