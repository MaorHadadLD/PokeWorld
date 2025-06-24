import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../api/user';
import '../css/ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // חדש

  useEffect(() => {
    const loadUserProfile = async () => {
      console.log('Loading user profile...');
      try {
        console.log('Fetching user profile...');
        const profileData = await getUserProfile();
        console.log('User profile loaded:', profileData);
        setUser(profileData);
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, []);

  if (loading) {
    return <p>טוען פרופיל...</p>;
  }

  if (!user) {
    return <p>לא הצלחנו לטעון את פרטי המשתמש.</p>;
  }

  return (
    <div className="profile-container">
      {/* כרטיס פרופיל ראשי */}
      <div className="profile-card">
        <div className="profile-avatar">{user.username[0]}</div>
        <h2>{user.username}</h2>
        <p>member from {new Date(user.createdAt).toLocaleDateString('he-IL', { year: 'numeric', month: 'long' })}</p>

        <button className="edit-profile-btn">Edit Profile ✏️</button>
      </div>
    </div>
  )

};

export default ProfilePage;