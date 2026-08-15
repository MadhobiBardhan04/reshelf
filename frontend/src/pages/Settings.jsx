import { useState } from "react";
import {FaBell, FaShieldAlt, FaLock, FaKey, FaSignOutAlt, FaSave,} from "react-icons/fa";
import "./Settings.css";

export default function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    listingNotifications: true,
    favoriteNotifications: false,
    showEmail: true,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, checked } = e.target;

    setSettings({
      ...settings,
      [name]: checked,
    });

    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "settings",
      JSON.stringify(settings)
    );

    setSaved(true);
  };

  return (
    <div className="settings_page">
      <div className="settings_header">
        <h1>Settings</h1>
        <p>
          Manage your ReShelf preferences
        </p>

      </div>

      <form
        className="settings_form"
        onSubmit={handleSave}
      >

        <div className="settings_form_card">
          <div className="settings_form_title">
            <div className="settings_title_icon">
              <FaBell />
            </div>
            <div>
              <h2>Notifications</h2>
              <p>
                Choose which notifications you receive
              </p>
            </div>
          </div>

          <div className="toggle_list">

            <div className="toggle_row">
              <div>
                <h3>Email Notifications</h3>

                <p>
                  Receive important updates and
                  announcements by email.
                </p>
              </div>

              <label className="switch">

                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={
                    settings.emailNotifications
                  }
                  onChange={handleChange}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="toggle_row">
              <div>
                <h3>Listing Activity</h3>
                <p>
                  Get notified when there is activity
                  on your listings.
                </p>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  name="listingNotifications"
                  checked={
                    settings.listingNotifications
                  }
                  onChange={handleChange}
                />
                <span className="slider"></span>
              </label>
            </div>


            <div className="toggle_row">
              <div>
                <h3>Favorite Items</h3>
                <p>
                  Receive updates about your favorite
                  items and listings.
                </p>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  name="favoriteNotifications"
                  checked={
                    settings.favoriteNotifications
                  }
                  onChange={handleChange}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>


        <div className="settings_form_card">
          <div className="settings_form_title">
            <div className="settings_title_icon">
              <FaShieldAlt />
            </div>
            <div>
              <h2>Privacy</h2>
              <p>
                Control how your information is displayed
              </p>
            </div>
          </div>

          <div className="toggle_row privacy_row">
            <div>
              <h3>Show Email on Listings</h3>
              <p>
                Allow other users to see your email
                when viewing your listings.
              </p>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                name="showEmail"
                checked={settings.showEmail}
                onChange={handleChange}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <div className="settings_form_card">
          <div className="settings_form_title">
            <div className="settings_title_icon">
              <FaLock />
            </div>
            <div>
              <h2>Security</h2>

              <p>
                Keep your ReShelf account secure
              </p>
            </div>
          </div>

          <div className="security_option">

            <div className="security_option_left">

              <div className="security_option_icon">
                <FaKey />
              </div>
              <div>
                <h3>Change Password</h3>
                <p>
                  Update your password to keep
                  your account secure.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="secondary_btn"
              onClick={() =>
                alert("Change password feature coming soon.")
              }
            >
              Change Password
            </button>

          </div>

          <div className="security_option">

            <div className="security_option_left">

              <div className="security_option_icon">
                <FaSignOutAlt />
              </div>

              <div>
                <h3>Sign Out of All Devices</h3>
                <p>
                  Sign out from all devices where
                  your account is currently active.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="secondary_btn"
              onClick={() =>
                alert("Sign out of all devices feature coming soon.")
              }
            >
              Sign Out
            </button>
          </div>
        </div>


        <div className="settings_save_area">
          {saved && (
            <span className="saved_message">
              Settings saved successfully
            </span>
          )}
          <button
            type="submit"
            className="save_settings_btn"
          >
            <FaSave />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}