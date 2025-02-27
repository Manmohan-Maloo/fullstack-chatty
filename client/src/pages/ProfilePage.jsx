import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const {
    authUser,
    isUpdatingProfile,
    updateProfile,
    isUpdatingBio,
    updateBio,
  } = useAuthStore();

  const [selectedImg, setSelectedImg] = useState(null);
  const [bio, setBio] = useState(null);

  useEffect(() => {
    setBio(authUser?.bio || ""); // ✅ Updates bio when `authUser` changes
  }, [authUser?.bio]);


  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const handleSaveBio = async () => {
    await updateBio(bio);
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div
          className="rounded-xl p-6 space-y-8"
          style={{
            backgroundColor: "var(--bg-color)",
            color: "var(--text-color)",
          }}
        >
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* Avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4"
                style={{ borderColor: "var(--accent-color)" }}
              />
              <label
                htmlFor="avatar-upload"
                className={`
              absolute bottom-0 right-0
              p-2 rounded-full cursor-pointer 
              transition-all duration-200
              ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
            `}
                style={{
                  backgroundColor: "var(--primary-color)",
                }}
              >
                <Camera
                  className="w-5 h-5"
                  style={{ color: "var(--bg-color)" }}
                />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm" style={{ color: "var(--text-color)" }}>
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm flex items-center gap-2">
                <User className="w-4 h-4" />
                <span style={{ color: "var(--text-color)" }}>Full Name</span>
              </div>
              <p
                className="px-4 py-2.5 rounded-lg border"
                style={{
                  backgroundColor: "var(--secondary-color)",
                  borderColor: "var(--accent-color)",
                  color: "var(--bg-color)",
                }}
              >
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span style={{ color: "var(--text-color)" }}>
                  Email Address
                </span>
              </div>
              <p
                className="px-4 py-2.5 rounded-lg border"
                style={{
                  backgroundColor: "var(--secondary-color)",
                  borderColor: "var(--accent-color)",
                  color: "var(--bg-color)",
                }}
              >
                {authUser?.email}
              </p>
            </div>

            {/* bio section */}
            <div className="space-y-1.5">
              <div className="text-sm flex items-center gap-2">
                <User className="w-4 h-4" />
                <span style={{ color: "var(--text-color)" }}>Bio</span>
              </div>
              <div className="flex gap-1">
              <input
              maxLength={50}
                type="text"
                placeholder="Enter your bio"
                className="px-4 py-2.5 w-full rounded-lg border"
                style={{
                  backgroundColor: "var(--secondary-color)",
                  borderColor: "var(--accent-color)",
                  color: "var(--bg-color)",
                }}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <button
                className="px-4 py-2.5 rounded-lg border"
                style={{
                  backgroundColor: "var(--primary-color)",
                  borderColor: "var(--accent-color)",
                  color: "var(--bg-color)",
                }}
                onClick={handleSaveBio}
                disabled={isUpdatingBio}
              >
                {isUpdatingBio ? "Saving..." : "Save"}
              </button>
              </div>
            </div>
          </div>

          <div
            className="mt-6 rounded-xl p-6"
            style={{
              backgroundColor: "var(--bg-color)",
              color: "var(--text-color)",
            }}
          >
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
