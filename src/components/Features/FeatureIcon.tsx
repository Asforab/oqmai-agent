import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureIconProps {
  icon: LucideIcon;
}

export function FeatureIcon({ icon: Icon }: FeatureIconProps) {
  return <Icon className="w-6 h-6 text-orange-500" />;
}