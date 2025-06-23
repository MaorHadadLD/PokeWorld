import React, {useEffect, useState} from 'react';
import {getUserProfile} from '../api/user';

const ProfilePage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getUserProfile();
                setUser(data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        }
        fetchProfile();
    }, []);

    if (!user) return <p>Loading...</p>;

    return (
        <div>
            <div>
                <div>
                    <h2>{user.username}</h2>
                    <p>member from {new Date(user.createdAt).toLocaleDateString('he-IL', {year: 'numeric', month: 'long'})}</p>
                </div>
            </div>
        </div>
    )
    
};

export default ProfilePage;