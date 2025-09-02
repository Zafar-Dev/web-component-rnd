import React, { useEffect, useRef, useState } from 'react';
import { createRoot, type Root } from 'react-dom/client';

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

const WeatherWidgetSimple: React.FC<WeatherWidgetProps> = ({
  city = 'London',
  theme = 'light',
  showForecast = true,
  className,
  style
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<Root | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Single useEffect to handle everything
  useEffect(() => {
    console.log(`[${city}] Setting up widget...`);
    
    if (!containerRef.current) {
      console.log(`[${city}] No container ref`);
      return;
    }

    // Create mock data
    const weatherData: WeatherData = {
      city,
      temperature: Math.round(Math.random() * 30) + 5,
      description: 'Partly Cloudy',
      humidity: Math.round(Math.random() * 40) + 40,
      windSpeed: Math.round(Math.random() * 20) + 5,
      icon: ['🌤️', '☀️', '⛅', '🌦️', '🌧️'][Math.floor(Math.random() * 5)]
    };

    try {
      // Create shadow root
      let shadowRoot: ShadowRoot;
      if (!containerRef.current.shadowRoot) {
        shadowRoot = containerRef.current.attachShadow({ mode: 'open' });
        console.log(`[${city}] Shadow root created`);
      } else {
        shadowRoot = containerRef.current.shadowRoot;
        console.log(`[${city}] Using existing shadow root`);
      }

      // Create container
      shadowRoot.innerHTML = '';
      const reactContainer = document.createElement('div');
      reactContainer.style.width = '100%';
      reactContainer.style.height = '100%';
      reactContainer.style.display = 'block';
      shadowRoot.appendChild(reactContainer);
      
      // Create React root and render immediately
      rootRef.current = createRoot(reactContainer);
      
      const styles = `
        .weather-widget {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          background: ${theme === 'light' ? 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)' : 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)'};
          color: ${theme === 'light' ? 'white' : '#ddd'};
          border-radius: 16px;
          padding: 24px;
          width: 100%;
          height: 100%;
          min-height: 240px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
        }
        .weather-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .city-name {
          margin: 0;
          font-size: 1.4rem;
          font-weight: 600;
        }
        .weather-icon {
          font-size: 2.5rem;
        }
        .weather-main {
          text-align: center;
          margin-bottom: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .temperature {
          font-size: 3rem;
          font-weight: 300;
          line-height: 1;
          margin-bottom: 8px;
        }
        .description {
          font-size: 1.1rem;
          opacity: 0.9;
        }
        .weather-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 20px;
        }
        .detail-item {
          background: rgba(255, 255, 255, 0.1);
          padding: 12px;
          border-radius: 8px;
          text-align: center;
        }
        .detail-item .label {
          display: block;
          font-size: 0.9rem;
          opacity: 0.8;
          margin-bottom: 4px;
        }
        .detail-item .value {
          display: block;
          font-size: 1.1rem;
          font-weight: 600;
        }
        .last-updated {
          font-size: 0.8rem;
          opacity: 0.7;
          text-align: center;
        }
      `;

      rootRef.current.render(
        <div style={{ width: '100%', height: '100%' }}>
          <style>{styles}</style>
          <div className="weather-widget">
            <div className="weather-header">
              <h3 className="city-name">{weatherData.city}</h3>
              <div className="weather-icon">{weatherData.icon}</div>
            </div>
            
            <div className="weather-main">
              <div className="temperature">{weatherData.temperature}°C</div>
              <div className="description">{weatherData.description}</div>
            </div>

            {showForecast && (
              <div className="weather-details">
                <div className="detail-item">
                  <span className="label">Humidity</span>
                  <span className="value">{weatherData.humidity}%</span>
                </div>
                <div className="detail-item">
                  <span className="label">Wind</span>
                  <span className="value">{weatherData.windSpeed} km/h</span>
                </div>
              </div>
            )}

            <div className="last-updated">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      );

      console.log(`[${city}] Widget rendered successfully`);
      setIsReady(true);

    } catch (error) {
      console.error(`[${city}] Error setting up widget:`, error);
    }

    return () => {
      if (rootRef.current) {
        try {
          rootRef.current.unmount();
        } catch (error) {
          console.error('Error unmounting:', error);
        }
        rootRef.current = null;
      }
    };
  }, [city, theme, showForecast]);

  return (
    <div 
      ref={containerRef}
      className={className}
      style={{
        display: 'block',
        width: '320px',
        height: '280px',
        position: 'relative',
        border: '2px solid green', // Different color for this test
        ...style
      }}
    >
      {/* Debug overlay */}
      <div style={{
        position: 'absolute',
        top: '-30px',
        left: 0,
        background: 'green',
        color: 'white',
        padding: '4px 8px',
        fontSize: '11px',
        zIndex: 1000,
        borderRadius: '4px'
      }}>
        SIMPLE {city}: Ready={isReady ? '✅' : '❌'}
      </div>
    </div>
  );
};

export default WeatherWidgetSimple;
