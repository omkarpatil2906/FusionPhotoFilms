import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className, ...props }) => {
  return (
    <motion.div
      className={`w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const CardMedia = ({ children, className, ...props }) => {
  return (
    <div className={`h-56 w-full overflow-hidden ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardContent = ({ children, className, ...props }) => {
  return (
    <div className={`p-6 h-32 flex flex-col justify-between ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardTitle = ({ children, className, ...props }) => {
  return (
    <h3 className={`text-xl font-bold tracking-tight text-gray-900 ${className}`} {...props}>
      {children}
    </h3>
  );
};

const CardDescription = ({ children, className, ...props }) => {
  return (
    <p className={`text-gray-500 text-sm ${className}`} {...props}>
      {children}
    </p>
  );
};

export { Card, CardMedia, CardContent, CardTitle, CardDescription };