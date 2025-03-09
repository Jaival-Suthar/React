 import React from "react";
 import ReactDOM from "react-dom/client";

/***
 * header
 * logo
 * nav bar
 * search
 * restaurentcontainer
 *  restaurentcard
 * footer
 *  copyright
 *  links
 *  address
 *  contact
 */
const Header = () => {
    return (
        <div className="header">
            <div className="logo-container">
                <img className="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTCj5t3zY5bYUTDqWdJWjKib3HAVZAP64WTg&s"/>
            </div>
            <div className="nav-items">
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Cart</li>
                </ul>
            </div>
        </div>
    )
}
const RestaurentCard = (props) => {
    console.log(props);
    return (
        <div className="res-card">
            <img 
        className="res-logo"
        alt={`${props.resName} logo`}
        src={props.image}/>

            <h3>{props.resName}</h3>
            <h4>{props.cuisine}</h4>
            <h4>4.4 starts</h4>
            <h4>38 minutes</h4>
        </div>
    )
}
const Body = () => {
    return (
        <div className="body">
            <div className="search">Search</div>
            <div className="res-container">
                <RestaurentCard 
                resName="Meghana Foods"
                cuisine="Biryani, North Indian, Asian"
                image="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/x4uyxvihmg8qa3pddkgf"
                />
                <RestaurentCard 
                resName="McDonald's"
                cuisine="Burger, Fast Food"
                image="https://b.zmtcdn.com/data/dish_photos/01c/c13b152416d1ebd6edd72f0c877d701c.jpeg"
                />
                <RestaurentCard 
                resName="Meghana Foods"
                cuisine="Biryani, North Indian, Asian"
                image="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/x4uyxvihmg8qa3pddkgf"
                />
                <RestaurentCard 
                resName="McDonald's"
                cuisine="Burger, Fast Food"
                image="https://b.zmtcdn.com/data/dish_photos/01c/c13b152416d1ebd6edd72f0c877d701c.jpeg"
                />
                <RestaurentCard 
                resName="Meghana Foods"
                cuisine="Biryani, North Indian, Asian"
                image="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/x4uyxvihmg8qa3pddkgf"
                />
                <RestaurentCard 
                resName="McDonald's"
                cuisine="Burger, Fast Food"
                image="https://b.zmtcdn.com/data/dish_photos/01c/c13b152416d1ebd6edd72f0c877d701c.jpeg"
                />
                <RestaurentCard 
                resName="Meghana Foods"
                cuisine="Biryani, North Indian, Asian"
                image="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/x4uyxvihmg8qa3pddkgf"
                />
                <RestaurentCard 
                resName="McDonald's"
                cuisine="Burger, Fast Food"
                image="https://b.zmtcdn.com/data/dish_photos/01c/c13b152416d1ebd6edd72f0c877d701c.jpeg"
                />
                

                

                
                
            </div>
        </div>
    )
}
const AppLayout = () => {
    return (
        <div className="app">
            <Header/>
            <Body />
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);