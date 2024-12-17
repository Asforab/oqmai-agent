import React from 'react';
import { LogoCircle } from './LogoCircle';
import { LogoLetter } from './LogoLetter';

export function Logo() {
  return (
    <div className="w-20 h-20 relative mb-6">
      <LogoCircle />
      <LogoLetter />
    </div>
  );
}