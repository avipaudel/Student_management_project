import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import API from "../services/api";

import "../styles/profile.css";
import { toast } from "react-toastify";

function Profile() {
  const [user, setUser] = useState({});

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get(
        "/auth/profile",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUser(response.data.data);

      if (response.data.data.profile_image) {
        setPreview(
          `http://localhost:5000/uploads/${response.data.data.profile_image}`,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleImageUpload = async () => {
    if (!image) {
      toast.error("Please select an image");

      return;
    }

    const formData = new FormData();

    formData.append("profile_image", image);

    try {
      const token = localStorage.getItem("token");

      await API.put(
        "/auth/profile-image",

        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      toast.error("Profile Image Updated");
    } catch (error) {
      console.log(error);

      toast.error("Upload Failed");
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="content">
          <div className="profile-card">
            <div className="profile-image-container">
              <img
                src={preview || "http://localhost:5000/uploads/default.png"}

                alt="Profile"

                className="profile-image"
              />

              <label className="upload-icon">
                +
                <input
                  type="file"

                  accept="image/*"

                  onChange={handleImageChange}
                />
              </label>
              <button className="save-profile-btn" onClick={handleImageUpload}>
                Save Changes
              </button>
            </div>

            <h2>{user.full_name || "User"}</h2>

            <table>
              <tbody>
                <tr>
                  <td>
                    <b>Name</b>
                  </td>

                  <td>{user.full_name}</td>
                </tr>

                <tr>
                  <td>
                    <b>Email</b>
                  </td>

                  <td>{user.email}</td>
                </tr>

                <tr>
                  <td>
                    <b>Role</b>
                  </td>

                  <td>{user.role}</td>
                </tr>

                <tr>
                  <td>
                    <b>Created At</b>
                  </td>

                  <td>{user.created_at}</td>
                </tr>
              </tbody>
            </table>

            <button
              className="profile-btn"

              onClick={() => navigate("/change-password")}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
