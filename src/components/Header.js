import { LOGO_URL } from "../../utils/constants";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../../utils/useOnlineStatus";
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';

const Header = () => {
    const [btnNameReact, setbtnNameReact] = useState("Login");
    const onlineStatus = useOnlineStatus();

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            url: '/'
        },
        {
            label: 'About Us',
            icon: 'pi pi-info-circle',
            url: '/about'
        },
        {
            label: 'Contact Us',
            icon: 'pi pi-envelope',
            url: '/contact'
        },
        {
            label: 'Grocery',
            icon: 'pi pi-shopping-cart',
            url: '/grocery'
        }
    ];

    const start = (
        <div className="flex align-items-center">
            <img alt="logo" src={LOGO_URL} height="40" className="mr-2" />
        </div>
    );

    const end = (
        <div className="flex align-items-center gap-3">
            <div className="flex align-items-center">
                <i className="pi pi-circle-fill mr-2" style={{ color: onlineStatus ? '#22c55e' : '#ef4444', fontSize: '0.8rem' }}></i>
                <span className="text-sm">{onlineStatus ? "Online" : "Offline"}</span>
            </div>
            <Button 
                icon="pi pi-shopping-cart" 
                className="p-button-rounded p-button-text"
                aria-label="Cart"
            />
            <Button
                label={btnNameReact}
                icon={btnNameReact === "Login" ? "pi pi-sign-in" : "pi pi-sign-out"}
                onClick={() => {
                    btnNameReact === "Login" ? setbtnNameReact("Logout") : setbtnNameReact("Login");
                }}
                className="p-button-outlined"
            />
        </div>
    );

    return (
        <div className="card">
            <Menubar 
                model={items} 
                start={start} 
                end={end}
                className="border-none"
                style={{ 
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
                }}
            />
        </div>
    );
}

export default Header;