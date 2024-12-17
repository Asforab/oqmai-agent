import React from 'react';
import { Logo } from './Logo';

export function Header() {
  return (
    <div className="text-center space-y-8">
      <div className="flex flex-col items-center">
        <Logo />
        <h1 className="text-5xl font-bold text-white tracking-wider">OQM.ia</h1>
      </div>
    </div>
  );
}