import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon,
  iconPosition = 'right',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-primary hover:shadow-lg hover:scale-105',
    secondary: 'bg-white text-primary-600 border-2 border-primary-500 hover:bg-primary-50 focus:ring-primary-500',
    outline: 'bg-transparent text-neutral-700 border-2 border-neutral-300 hover:border-primary-500 hover:text-primary-600 focus:ring-primary-500',
    ghost: 'bg-transparent text-neutral-700 hover:bg-neutral-100 focus:ring-neutral-500',
    gradient: 'bg-gradient-accent text-white hover:shadow-lg hover:scale-105 focus:ring-primary-500',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2.5',
    xl: 'px-10 py-5 text-xl gap-3',
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span>{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span>{icon}</span>}
    </button>
  );
};

export default Button;