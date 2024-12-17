import React from 'react';
import { Header } from '../Header';
import { FeatureGrid } from '../Features/FeatureGrid';

export function WelcomeSection() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-56px)] px-4 mt-14">
      <div className="max-w-4xl w-full mx-auto space-y-16">
        <div className="flex flex-col items-center justify-center space-y-16">
          <Header />
          <FeatureGrid />
          <p className="text-gray-400 text-lg text-center">
            Como posso ajudar na sua preparação para o TEOT hoje?
          </p>
        </div>
      </div>
    </div>
  );
}