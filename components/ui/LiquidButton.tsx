
import React from 'react';

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  size?: 'md' | 'lg' | 'xl';
}

export const LiquidButton: React.FC<LiquidButtonProps> = ({ children, className = '', size = 'md', ...props }) => {
  const sizeClasses = {
    md: 'px-6 py-2 text-sm',
    lg: 'px-8 py-3 text-md',
    xl: 'px-12 py-5 text-lg'
  };

  return (
    <button 
      className={`relative overflow-hidden group transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,123,255,0.3)] ${sizeClasses[size]} ${className}`}
      {...props}
    >
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm group-hover:bg-white/10 transition-colors" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,_rgba(0,123,255,0.2)_0%,_transparent_70%)]" />
      <span className="relative z-10 font-bold uppercase tracking-widest">{children}</span>
    </button>
  );
};
