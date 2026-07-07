import React from 'react';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className = '', children }: CardProps) {
  return (
    <div className={`bg-card border border-border rounded-lg p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: CardProps) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = '' }: CardProps) {
  return <h2 className={`text-xl font-bold ${className}`}>{children}</h2>;
}

export function CardContent({ children, className = '' }: CardProps) {
  return <div className={className}>{children}</div>;
}
