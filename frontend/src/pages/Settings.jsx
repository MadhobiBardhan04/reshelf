import { useState } from "react";
import {
  FaShieldAlt,
  FaLock,
  FaKey,
  FaSignOutAlt,
  FaCog,
  FaSave,
} from "react-icons/fa";

import "./Settings.css";

export default function Settings() {
  const [settings, setSettings] = useState({
    showEmail: true,
    showPhone: false,
    language: "English",
    currency: "BDT",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
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
              <FaShieldAlt />
            </div>

            <div>
              <h2>Privacy</h2>
              <p>
                Control how your information is displayed
              </p>
            </div>
          </div>


          <div className="toggle_list">
            <div className="toggle_row">

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

            <div className="toggle_row">

              <div>
                <h3>Show Phone Number</h3>
                <p>
                  Allow buyers to see your phone number
                  on your listings.
                </p>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  name="showPhone"
                  checked={settings.showPhone}
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
                alert(
                  "Sign out of all devices feature coming soon."
                )
              }
            >
              Sign Out
            </button>
          </div>
        </div>


        <div className="settings_form_card">
          <div className="settings_form_title">
            <div className="settings_title_icon">
              <FaCog />
            </div>
            <div>
              <h2>General</h2>
              <p>
                Manage your marketplace preferences
              </p>
            </div>
          </div>


          <div className="general_options">
            <div className="general_row">
              <div>
                <h3>Language</h3>
                <p>
                  Choose the language used throughout
                  ReShelf.
                </p>
              </div>

              <select
                name="language"
                value={settings.language}
                onChange={handleChange}
                className="settings_select"
              >
                <option value="English">
                  English
                </option>
                <option value="Bangla">
                  Bangla
                </option>
              </select>
            </div>

            <div className="general_row">
              <div>
                <h3>Currency</h3>
                <p>
                  Choose the currency used for item
                  prices.
                </p>
              </div>

              <select
                name="currency"
                value={settings.currency}
                onChange={handleChange}
                className="settings_select"
              >
                <option value="BDT">
                  ৳ BDT
                </option>
              </select>
            </div>
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