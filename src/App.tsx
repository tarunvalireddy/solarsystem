import React from 'react';
import { Sun } from 'lucide-react';
import SolarSystem from './components/SolarSystem';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sun className="w-8 h-8 text-yellow-500" />
          <h1 className="text-3xl font-bold">SOLAR-SYSTEM</h1>
        </div>
        <p className="text-gray-400">Watch the planets orbit around the sun</p>
      </div>

      <div className="relative">
        <SolarSystem/>
      </div>

      <div className="mt-8 text-sm text-gray-400 max-w-md text-center">
        <p>
          This is a simplified model of our solar system. The sizes and orbital periods
          are not to scale to make the visualization more engaging.
        </p>
      </div>
    </div>
  );
}

export default App;
