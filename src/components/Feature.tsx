import React from 'react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function Feature({ icon, title, description }: FeatureProps) {
  return (
    <div className="flex items-start space-x-4 bg-[#1f1f1f] p-4 rounded-lg">
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-white font-semibold">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
}