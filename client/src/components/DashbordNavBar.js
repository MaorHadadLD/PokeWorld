import React, {useState} from 'react';
import '../css/DashbordNavBar.css'; 

const DashboardNavBar = ({onNavigate}) => {
    const [activeTab, setActiveTab] = useState('home');

    const handleClick = (tab) => {
        setActiveTab(tab);
        if (onNavigate) {
            onNavigate(tab);
        }
    }
    return (
        <nav className="dashboard-nav">
            <button className= {activeTab === 'home' ? 'active': ''} 
            onClick={() => onNavigate('home')}>Home</button>
            <button className={activeTab === 'profile' ? 'active' : ''}
             onClick={() => onNavigate('profile')}>Profile</button>
            <button className={activeTab === 'collection' ? 'active' : ''}
             onClick={() => onNavigate('collection')}>Collection</button>
            <button className={activeTab === 'trades' ? 'active' : ''}
             onClick={() => onNavigate('trades')}>Trades</button>
            <button className={activeTab === 'market' ? 'active' : ''}
             onClick={() => onNavigate('market')}>Market</button>
            <button className={activeTab === 'logout' ? 'active' : ''}
             onClick={() => onNavigate('logout')}>Logout</button>
        </nav>
    )
}

export default DashboardNavBar;