import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
};

export default function LayoutContainer(layoutProps: LayoutProps) {
  const { children, className } = layoutProps;

  return (
    <div className={`mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 ${className ?? ''}`}>
      {children}
    </div>
  );
}
