import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TeacherSidebar from "../components/TeacherSidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { toast } from "react-toastify";
import "../styles/profile.css";

function TeacherProfile() {
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

  const uploadImage = async () => {
    try {
      const formData = new FormData();

      formData.append(
        "profile_image",

        image,
      );

      const token = localStorage.getItem("token");

      await API.put(
        `/teachers/profile-image/${user.id}`,

        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`,

            "Content-Type": "multipart/form-data",
          },
        },
      );

      toast.error("Profile image updated successfully");
    } catch (error) {
      console.log(error);

      toast.error("Image upload failed");
    }
  };

  return (
    <div className="dashboard">
      <TeacherSidebar />

      <div className="main">
        <Navbar />

        <div className="content">
          <div className="profile-card">
            <img
              src={
                preview ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="Teacher"
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

            <button
              className="profile-btn"
              onClick={uploadImage}
              disabled={!image}
            >
              Upload Image
            </button>

            <h2>{user.full_name}</h2>

            <table>
              <tbody>
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

export default TeacherProfile;
