import { useEffect, useState } from "react";

function NotificationIcon({ userId }) {
  const [notifications, setNotifications] = useState([]); // always an array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:5000/api/notifications/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        // Ensure notifications is always an array
        setNotifications(Array.isArray(data) ? data : data.notifications || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setNotifications([]);
        setLoading(false);
      });
  }, [userId]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div style={{ position: "relative", marginRight: "10px" }}>
      <img
        src="/notification-icon.svg"
        alt="Notifications"
        style={{ width: "24px", height: "24px", cursor: "pointer" }}
      />
      {unreadCount > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-5px",
            right: "-5px",
            background: "red",
            color: "white",
            borderRadius: "50%",
            width: "15px",
            height: "15px",
            fontSize: "10px",
            textAlign: "center",
            lineHeight: "15px",
          }}
        >
          {unreadCount}
        </span>
      )}
    </div>
  );
}

export default NotificationIcon;
