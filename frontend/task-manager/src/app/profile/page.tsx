"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateUserProfile, logoutUser } from "@/features/auth/redux/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import ProfileInput from "../components/profile/ProfileInput";
import { toast } from "react-toastify";
import ProfileImage from "../components/profile/ProfileImage";
import Header from "../components/Header/Header";
import { useRouter } from "next/navigation";
import withAuth from "../hoc/withAuth";


const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    linkedinPhoto:"avatar.png"
  });

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        linkedinPhoto: user.linkedinPhoto || "avatar.png",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const updatedUser = await dispatch(updateUserProfile(formData)).unwrap();
      toast.success("Profile updated successfully!");
      setFormData({
        name: updatedUser.name || "",
        email: updatedUser.email || "",
        linkedinPhoto: updatedUser.linkedinPhoto || "avatar.png",
      }); 
    } catch (err) {
      toast.error("Failed to update profile.");
    }
  };

  const handleLogout = async () => {
    await dispatch(logoutUser()).unwrap();
    router.push("/");
  };

  return (
    <>
      <Header onLogout={handleLogout} />
      <div className="bg-gray-800 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-lg w-full p-6 bg-gray-600 text-white shadow-xl rounded-lg">
          <h1 className="text-3xl font-semibold text-center mb-6 text-gray-100">User Profile</h1>

          {loading ? (
            <p className="text-center text-gray-400">Loading...</p>
          ) : (
            <>
              <ProfileImage linkedinPhoto={formData.linkedinPhoto}/>
              <ProfileInput label="Name" name="name" value={formData.name} onChange={handleChange} />
              <ProfileInput label="Email" name="email" type="email" value={formData.email} onChange={handleChange} /> 
              <button
                onClick={handleSubmit}
                className="w-full bg-purple-600 hover:bg-purple-700 transition p-3 rounded-md font-semibold mt-4"
              >
                Update Profile
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}


export default withAuth(Profile);