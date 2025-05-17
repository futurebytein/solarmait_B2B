"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, ClipboardList } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const menuGroups = [
  {
    name: "Main Menu",
    menuItems: [
      {
        icon: <LayoutDashboard className="w-6 h-6" />,
        label: "Dashboard",
        route: "/admin",
      },
      {
        icon: <ClipboardList className="w-6 h-6" />,
        label: "Product List",
        route: "/admin/productList",
      },
      {
        icon: <ClipboardList className="w-6 h-6" />,
        label: "Vendors List",
        route: "/admin/vendorList",
      },
      {
        icon: <ClipboardList className="w-6 h-6" />,
        label: "Coupon Manager",
        route: "/admin/couponManager",
      },
      {
        icon: <ClipboardList className="w-6 h-6" />,
        label: "Payout",
        route: "/admin/payout",
      },
      {
        icon: <ClipboardList className="w-6 h-6" />,
        label: "Wallet",
        route: "/admin/wallet",
      },
    ],
  },
];

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();

  // Filter menu items based on user role:
  // If vendor, only show "Wallet" and "Product List"
  const filteredMenuGroups = menuGroups.map((group) => ({
    ...group,
    menuItems: group.menuItems.filter((item) => {
      if (user?.role === "vendor") {
        return item.label === "Wallet" || item.label === "Product List";
      }
      return true; // admin gets all
    }),
  }));

  return (
    <>
      <button
        className="fixed top-4 left-4 mt-10 z-50 lg:hidden bg-white p-2 rounded-md shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-white bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col bg-white text-black border-r border-gray-300 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-700">
          <Link href="/">
            <Image
              width={130}
              height={62}
              src="/assets/images/logo.png"
              alt="Logo"
              className="h-8 w-auto"
            />
          </Link>
          {sidebarOpen && (
            <button
              className="p-2 text-gray-400 hover:text-yellow-500"
              onClick={() => setSidebarOpen(false)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="p-4">
            {filteredMenuGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="mb-6">
                {group.name && (
                  <h3 className="px-3 mb-2 text-xs font-semibold uppercase text-gray-500">
                    {group.name}
                  </h3>
                )}
                <ul>
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <li key={menuIndex}>
                      <Link
                        href={menuItem.route}
                        className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-200 ${
                          pathname === menuItem.route
                            ? "bg-yellow-500 text-gray-900"
                            : "hover:bg-gray-500 hover:text-yellow-500"
                        }`}
                      >
                        <span className="text-yellow-500">{menuItem.icon}</span>
                        {menuItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex items-center justify-center p-4 border-t border-gray-700">
          <button
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-500"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
