import { motion, useMotionValue } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useSystemState } from '../lib/context/SystemState';
import { csi } from '../lib/utils/bolt';

function Notification({
  id,
  type,
  message,
  title,
  duration,
  link,
  linkText,
}: NotificationType) {
  const { removeNotification } = useSystemState();
  const [isHovering, setIsHovering] = useState(false);
  const opacity = useMotionValue(0);
  const y = useMotionValue(-100);

  useEffect(() => {
    let timeoutId: any;
    if (!isHovering) {
      timeoutId = setTimeout(() => removeNotification(id), duration);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isHovering, removeNotification, duration]);

  const handleLinkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    csi.openURLInDefaultBrowser(link);
  };

  return (
    <motion.div
      key={id}
      onClick={() => removeNotification(id)}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className={`flex flex-col items-center bg-blk-300 hover:bg-blk-200 px-4 py-2 rounded-md border-[1px] mb-2 cursor-pointer
        ${type === 'error' && 'w-full border-red'}
        ${type === 'success' && ' border-gray-600'}
        ${type === 'info' && 'w-full border-purple'}
      `}
      style={{ opacity, y }}
    >
      <h2 className="text-center text-wht-0">{title}</h2>
      {message !== undefined && message.length !== 0 && (
        <p className="text-wht-200 text-xs">{message}</p>
      )}
      {link && linkText && (
        <button
          className="text-center text-blue-400 hover:text-blue-600 font-semibold"
          onClick={handleLinkClick}
        >
          {linkText}
        </button>
      )}
    </motion.div>
  );
}

export default Notification;
