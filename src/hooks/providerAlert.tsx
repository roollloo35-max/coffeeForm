// context/NotificationContext.tsx
'use client';
import Close from '@/SVGassets/close';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Notification {
    id: string;
    content: ReactNode; // может быть любой React-компонент
    duration?: number;  // время показа в мс (по умолчанию 3000)
}

interface NotificationContextType {


    notifications: Notification | null;
    showNotification: (content: ReactNode, duration?: number) => void;
    hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification | null>(null);

    const showNotification = (content: ReactNode, duration = 3000) => {
        const id = Math.random().toString(36).substring(2, 9);

        setNotifications({ id, content, duration });



        // Автоматически удаляем через duration
        setTimeout(() => {
            setNotifications((current) => (current?.id === id ? null : current));
        }, duration);
    };
    
    const hideNotification = () => setNotifications(null);
    
    return (
        <NotificationContext.Provider value={{ notifications, showNotification, hideNotification}}>
            {children}
            {/* Рендерим все активные уведомления */}
            <NotificationContainer />
        </NotificationContext.Provider>
    );
};

// Хук для использования
export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error('useNotification must be used within NotificationProvider');
    return context;
};

export const NotificationContainer = () => {
  const { notifications, hideNotification } = useNotification();
  const [isLeaving, setIsLeaving,] = useState(false);
  const [content, setContent] = useState<React.ReactNode>(null);

  // При изменении уведомления сбрасываем isLeaving и запоминаем контент
  useEffect(() => {
    if (notifications) {
      setContent(notifications.content);
      setIsLeaving(false);

    }
  }, [notifications]);

  // Если уведомление исчезло, запускаем анимацию выезда
  useEffect(() => {
    if (!notifications && content) {
      setIsLeaving(true);

      // Даём время на анимацию (0.3 сек), потом убираем из DOM
      const timer = setTimeout(() => {
        setContent(null);
        setIsLeaving(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [notifications, content]);

  if (!content && !isLeaving) return null;

  return (
    <div className="fixed top-5 left-1/2 w-[90%] md:w-[30%] transform -translate-x-1/2 z-50">
      <div
        className={`transition-all  duration-200 ease-in-out ${
          isLeaving ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        {content}
        {/* Можно добавить кнопку закрытия */}
        <button
          onClick={hideNotification}
          className="absolute top-2 right-2 scale-[0.5] md:scale-[1] cursor-pointer"
        >
          <Close />
        </button>
      </div>
    </div>
  );
};