// components/Notification.tsx (corrigido)
import React, { useEffect, useState } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

const notificationIcons = {
  success: '✅',
  error: '⚠️',
  info: 'ℹ️',
};

const Notification: React.FC<NotificationProps> = ({ 
  message, 
  type, 
  duration = 3000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`notification notification-${type} ${isVisible ? 'show' : 'hide'}`}>
      <div className="notification-content">
        <span className="notification-icon">{notificationIcons[type]}</span>
        <span>{message}</span>
      </div>
      <button className="notification-close" onClick={() => setIsVisible(false)}>
        ❌
      </button>
    </div>
  );
};

export default Notification;