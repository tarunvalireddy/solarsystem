import React from 'react';
import { Planet } from '../types';

const PLANETS: Planet[] = [
  { name: 'Mercury', color: '#A0522D', size: 10, orbitRadius: 60, orbitPeriod: 8 },
  { name: 'Venus', color: '#DEB887', size: 15, orbitRadius: 90, orbitPeriod: 12 },
  { name: 'Earth', color: '#4169E1', size: 16, orbitRadius: 120, orbitPeriod: 16 },
  { name: 'Mars', color: '#CD5C5C', size: 12, orbitRadius: 150, orbitPeriod: 20 },
  { name: 'Jupiter', color: '#DAA520', size: 30, orbitRadius: 200, orbitPeriod: 28 },
  { name: 'Saturn', color: '#F4A460', size: 25, orbitRadius: 250, orbitPeriod: 32 },
  { name: 'Uranus', color: '#87CEEB', size: 20, orbitRadius: 290, orbitPeriod: 36 },
  { name: 'Neptune', color: '#1E90FF', size: 18, orbitRadius: 330, orbitPeriod: 40 },
];

const SolarSystem: React.FC = () => {
  return (
    <div className="relative w-[700px] h-[700px]">
      {/* Sun */}
      <div className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full bg-yellow-500 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_60px_20px_rgba(255,255,0,0.4)] animate-pulse">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 to-orange-500" />
      </div>

      {/* Orbits and Planets */}
      {PLANETS.map((planet) => (
        <div
          key={planet.name}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: `${planet.orbitRadius * 2}px`,
            height: `${planet.orbitRadius * 2}px`,
          }}
        >
          {/* Orbit Path */}
          <div
            className="absolute inset-0 rounded-full border border-gray-700"
            style={{ borderWidth: '1px' }}
          />
          
          {/* Planet */}
          <div
            className="absolute rounded-full group"
            style={{
              width: `${planet.size}px`,
              height: `${planet.size}px`,
              backgroundColor: planet.color,
              top: '50%',
              left: '50%',
              '--orbit-radius': `${planet.orbitRadius}px`,
              animation: `orbit ${planet.orbitPeriod}s linear infinite`,
              boxShadow: `0 0 10px ${planet.color}80`,
            } as React.CSSProperties}
          >
            {/* Planet Name Tooltip */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 whitespace-nowrap text-xs text-white bg-gray-800 px-2 py-1 rounded">
              {planet.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SolarSystem;