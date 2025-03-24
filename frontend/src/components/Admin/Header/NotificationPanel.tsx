import React, { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";

interface Notification {
  _id: string;
  type: string;
  content: string;
  url: string;
  isSeen: boolean;
  createdAt: string;
}

interface NotificationPanelProps {
  notifications: Notification[];
  unreadCount: number;
}

export const NotificationPanel = ({
  notifications,
  unreadCount,
}: NotificationPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={panelRef}>
      <button className="relative" onClick={() => setIsOpen(!isOpen)}>
        <Bell className="w-5 h-5 text-gray-600 hover:text-gray-900 transition-colors" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full min-w-[18px] flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[380px] bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h3 className="font-semibold text-lg">Notifications</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  {unreadCount} new
                </span>
              )}
              <button className="text-sm text-blue-600 hover:text-blue-800">
                Mark all as read
              </button>
            </div>
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[300px] text-gray-500">
                <Bell className="w-12 h-12 mb-2 text-gray-400" />
                <p>No notifications yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <div
                    key={notification._id}
                    className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                      !notification.isSeen ? "bg-blue-50" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-1"></div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm line-clamp-2 ${
                            notification.isSeen
                              ? "text-gray-500"
                              : "text-gray-700"
                          }`}
                        >
                          {notification.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 bg-gray-50 border-t text-center">
            <button className="text-sm text-gray-600 hover:text-gray-900">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
