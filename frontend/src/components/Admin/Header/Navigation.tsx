// Navigation.tsx
import React, { useState, useEffect } from "react";

interface NavigationProps {
  totalLeads: number;
}

const Navigation = (props: NavigationProps) => {
  const navItems = [
    { id: "all", label: "ALL", isActive: true },
    { id: "assigned", label: "Today My Assigned" },
    { id: "favourites", label: "My Favourites" },
    { id: "csl", label: "CSL" },
    { id: "cll", label: "CLL" },
    { id: "unverified", label: "Unverified" },
    { id: "untouched", label: "Untouched" },
    { id: "reEnquired", label: "Re-Enquired" },
    { id: "callBack", label: "Call Back Later Stage" },
    { id: "notInterested", label: "Not Interested Stage" },
  ];

  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-full mx-auto px-6">
        <div className="flex items-center justify-between py-2">
          <div className="flex-shrink-0 ml-4">
            <span className="text-blue_1 font-medium">
              Total Leads: {props.totalLeads}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
