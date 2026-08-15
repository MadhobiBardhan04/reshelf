import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUniversity,
  FaEdit,
  FaBoxOpen,
  FaHeart,
} from "react-icons/fa";

import "./Profile.css";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Your Name",
    email: "student@email.com",
    phone: "+880 1XXXXXXXXX",
    university: "Your University",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="profile_page">

      <div className="profile_page_header">
        <div>
          <h1>My Profile</h1>
          <p>
            Manage your account information
          </p>
        </div>
        <button
          className="edit_profile_btn"
          onClick={() => setIsEditing(!isEditing)}
        >
          <FaEdit />
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>

      </div>

      <div className="profile_main_card">

        <div className="profile_avatar_large">
          <FaUser />
        </div>
        <div className="profile_main_info">
          <h2>{profile.name}</h2>
          <p>
            <FaEnvelope />
            {profile.email}
          </p>
        </div>
      </div>


      <div className="profile_section">

        <h2>Account Information</h2>
        <div className="profile_information_card">
          <div className="profile_field">
            <div className="profile_field_icon">
              <FaUser />
            </div>
            <div className="profile_field_content">
              <label>Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                />
              ) : (
                <p>{profile.name}</p>
              )}

            </div>

          </div>
          <div className="profile_field">

            <div className="profile_field_icon">
              <FaEnvelope />
            </div>
            <div className="profile_field_content">
              <label>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                />
              ) : (
                <p>{profile.email}</p>
              )}
            </div>
          </div>

          <div className="profile_field">

            <div className="profile_field_icon">
              <FaPhone />
            </div>

            <div className="profile_field_content">

              <label>Phone</label>

              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                />
              ) : (
                <p>{profile.phone}</p>
              )}

            </div>

          </div>

          <div className="profile_field">
            <div className="profile_field_icon">
              <FaUniversity />
            </div>
            <div className="profile_field_content">
              <label>University</label>
              {isEditing ? (
                <input
                  type="text"
                  name="university"
                  value={profile.university}
                  onChange={handleChange}
                />
              ) : (
                <p>{profile.university}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="profile_section">
        <h2>My Activity</h2>
        <div className="profile_activity_grid">
          <div className="activity_card">
            <div className="activity_icon">
              <FaBoxOpen />
            </div>
            <div>
              <h3>4</h3>
              <p>My Listings</p>
            </div>
          </div>
          <div className="activity_card">
            <div className="activity_icon">
              <FaHeart />
            </div>
            <div>
              <h3>7</h3>
              <p>Favorites</p>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (

        <div className="profile_save_container">
          <button
            className="save_profile_btn"
            onClick={() => setIsEditing(false)}
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}