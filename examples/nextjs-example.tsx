// examples/nextjs-example.tsx
'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamic import to avoid SSR issues
const WeatherWidget = dynamic(
  () => import('react-web-component-widget').then(mod => mod.WeatherWidget),
  { 
    ssr: false,
    loading: () => <div style={{ 
      width: '320px', 
      height: '280px', 
      background: '#f0f0f0', 
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>Loading weather...</div>
  }
);

export default function WeatherPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Next.js Weather Widget Example</h1>
      
      <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
        <Suspense fallback={<div>Loading...</div>}>
          <WeatherWidget city="London" theme="light" />
        </Suspense>
        
        <Suspense fallback={<div>Loading...</div>}>
          <WeatherWidget city="Berlin" theme="dark" />
        </Suspense>
        
        <Suspense fallback={<div>Loading...</div>}>
          <WeatherWidget 
            city="Mumbai" 
            theme="light" 
            showForecast={false}
            style={{ width: '280px', height: '240px' }}
          />
        </Suspense>
      </div>
    </div>
  );
}
