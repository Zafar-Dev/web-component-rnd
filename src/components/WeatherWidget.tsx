import React, { useEffect, useRef } from 'react';
import { createCompatibleRoot, type CompatibleReactRoot } from '../utils/reactCompat';

export interface WeatherWidgetProps {
  city?: string;
  theme?: 'light' | 'dark';
  showForecast?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

// Separate component for the weather content rendering
const WeatherContent: React.FC<{
  weatherData: WeatherData;
  theme: 'light' | 'dark';
  showForecast: boolean;
}> = ({ weatherData, theme, showForecast }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: '240px',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        background:
          theme === 'light'
            ? 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)'
            : 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
        color: theme === 'light' ? 'white' : '#ddd',
        borderRadius: '16px',
        padding: '24px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: '1.4rem',
            fontWeight: '600',
          }}
        >
          {weatherData.city}
        </h3>
        <div style={{ fontSize: '2.5rem' }}>{weatherData.icon}</div>
      </div>

      {/* Main temperature */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '24px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: '3rem',
            fontWeight: '300',
            lineHeight: 1,
            marginBottom: '8px',
          }}
        >
          {weatherData.temperature}°C
        </div>
        <div
          style={{
            fontSize: '1.1rem',
            opacity: 0.9,
          }}
        >
          {weatherData.description}
        </div>
      </div>

      {/* Details */}
      {showForecast && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '12px',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '0.9rem',
                opacity: 0.8,
                marginBottom: '4px',
              }}
            >
              Humidity
            </div>
            <div
              style={{
                fontSize: '1.1rem',
                fontWeight: '600',
              }}
            >
              {weatherData.humidity}%
            </div>
          </div>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '12px',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '0.9rem',
                opacity: 0.8,
                marginBottom: '4px',
              }}
            >
              Wind Speed
            </div>
            <div
              style={{
                fontSize: '1.1rem',
                fontWeight: '600',
              }}
            >
              {weatherData.windSpeed} mph
            </div>
          </div>
        </div>
      )}

      {/* Last updated */}
      <div
        style={{
          fontSize: '0.8rem',
          opacity: 0.7,
          textAlign: 'center',
        }}
      >
        Last updated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};

// Hook for generating mock weather data
const useWeatherData = (city: string): WeatherData => {
  return React.useMemo(
    () => ({
      city,
      temperature: Math.round(Math.random() * 30) + 5,
      description: 'Partly Cloudy',
      humidity: Math.round(Math.random() * 40) + 40,
      windSpeed: Math.round(Math.random() * 20) + 5,
      icon: ['🌤️', '☀️', '⛅', '🌦️', '🌧️'][Math.floor(Math.random() * 5)],
    }),
    [city]
  );
};

// Hook for Shadow DOM management
const useShadowDOM = (containerRef: React.RefObject<HTMLDivElement | null>) => {
  const reactRootRef = useRef<CompatibleReactRoot | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Get or create shadow root
    let shadowRoot: ShadowRoot;
    if (container.shadowRoot) {
      shadowRoot = container.shadowRoot;
    } else {
      shadowRoot = container.attachShadow({ mode: 'open' });
    }

    // Always clear and recreate to ensure clean state
    shadowRoot.innerHTML = '';
    const reactContainer = document.createElement('div');
    reactContainer.style.cssText = 'width: 100%; height: 100%; display: block;';
    shadowRoot.appendChild(reactContainer);

    // Create new React root using compatibility layer
    reactRootRef.current = createCompatibleRoot(reactContainer);

    // Cleanup function
    const cleanup = () => {
      if (reactRootRef.current) {
        const rootToCleanup = reactRootRef.current;
        reactRootRef.current = null;
        rootToCleanup.unmount().catch(() => {
          // Silently handle unmount errors
        });
      }
    };

    // Cleanup only on unmount
    return () => {
      // Defer unmount to avoid race conditions
      setTimeout(cleanup, 0);
    };
  }, [containerRef]); // Include containerRef in dependencies

  return reactRootRef;
};

const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  city = 'London',
  theme = 'light',
  showForecast = true,
  className,
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Use custom hooks for separation of concerns
  const weatherData = useWeatherData(city);
  const reactRootRef = useShadowDOM(containerRef);

  // Render content when props change
  useEffect(() => {
    if (!reactRootRef.current) return;

    // Render the weather content
    reactRootRef.current.render(
      <WeatherContent
        weatherData={weatherData}
        theme={theme}
        showForecast={showForecast}
      />
    ).catch((error) => {
      console.warn('Failed to render weather widget:', error);
    });
  }, [weatherData, theme, showForecast, reactRootRef]); // Re-render when props change

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        display: 'block',
        width: '320px',
        minHeight: '280px',
        position: 'relative',
        ...style,
      }}
    />
  );
};

export default WeatherWidget;
