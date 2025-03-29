import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { user, logout, loading } = useAuth();

  const [userProfile, setUserProfile] = useState({ username: user?.name });
  const [showDropdown, setShowDropdown] = useState(false);

  const router = useRouter();

  const handleLogout = (e) => {
    e.stopPropagation();
    logout();
  };

  const handleProfileClick = () => {
    router.push("/profile");
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showDropdown &&
        !(event.target as Element).closest(".user-dropdown")
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  return (
    <header
      className={`sticky top-0 z-0
         transition-all duration-300 bg-white text-black `}
    >
      <div className="flex justify-between items-center h-16 px-4 border-b border-gray-700">
        {/* Title or Left Content */}
        <span className="text-lg font-semibold"></span>

        {/* Right Content */}
        <div className="flex items-center space-x-6">
          <div className="relative user-dropdown">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-gray-900 font-medium">
                  {userProfile.username
                    ? userProfile.username.substring(0, 2).toUpperCase()
                    : ""}
                </span>
              </div>
              <span className="text-black">
                {userProfile.username ? userProfile.username : ""}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 text-white">
                <button
                  onClick={handleProfileClick}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
