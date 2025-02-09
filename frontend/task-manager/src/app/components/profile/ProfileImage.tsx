"use client";

// interface ProfileImageProps {
//   imageUrl: string;
// }

export default function ProfileImage() {
  return (
    <div className="flex flex-col items-center">

      <img
        src={"avatar.png"} 
        alt="Profile"
        className="w-24 h-24 rounded-full border-2 border-gray-400 object-cover"
      />
    </div>
  );
}
