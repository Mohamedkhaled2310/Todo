"use client";

interface ProfileImageProps {
  linkedinPhoto: string;
}

export default function ProfileImage({linkedinPhoto} : ProfileImageProps) {
  return (
    <div className="flex flex-col items-center">

      <img
        src={linkedinPhoto} 
        onError={(e) => e.currentTarget.src = "avatar.png"}
        alt="Profile"
        className="w-24 h-24 rounded-full border-2 border-gray-400 object-cover"
      />
    </div>
  );
}
