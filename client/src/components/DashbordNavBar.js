import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/DashbordNavBar.css'; 

const DashboardNavBar = () => {
    const [activeTab, setActiveTab] = useState('home');
    const navigate = useNavigate();

    const handleClick = (tab) => {
        setActiveTab(tab);
        // if (onNavigate) {
        //     onNavigate(tab);
            
        // }
        switch (tab) {
            case 'login':
                navigate('/');
                break;
            case 'home':
                navigate('/home');
                break;
            case 'Profile':
                navigate('/profile');
                break;
            case 'collection':
                navigate('/collection');
                break;
            case 'trades':
                navigate('/trades');
                break;
            case 'market':
                navigate('/market');
                break;
            case 'logout':
                navigate('/logout');
                break;
        }
    };
    return (
        <nav className="dashboard-nav">
            <button className= {activeTab === 'home' ? 'active': ''} 
            onClick={() => handleClick('home')}>Home</button>
            <button className={activeTab === 'Profile' ? 'active' : ''}
             onClick={() => handleClick('Profile')}>Profile</button>
            <button className={activeTab === 'collection' ? 'active' : ''}
             onClick={() => handleClick('collection')}>Collection</button>
            <button className={activeTab === 'trades' ? 'active' : ''}
             onClick={() => handleClick('trades')}>Trades</button>
            <button className={activeTab === 'market' ? 'active' : ''}
             onClick={() => handleClick('market')}>Market</button>
            <button className={activeTab === 'logout' ? 'active' : ''}
             onClick={() => handleClick('logout')}>Logout</button>
        </nav>
    )
}

export default DashboardNavBar;