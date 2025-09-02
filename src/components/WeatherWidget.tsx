import React, { useEffect, useRef } from 'react';
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

interface WeatherContentProps {
  loading: boolean;
  weatherData: WeatherData | null;
  showForecast: boolean;
  city: string;
}

const WeatherContent: React.FC<WeatherContentProps> = ({ loading, weatherData, showForecast, city }) => {
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <span>Loading weather for {city}...</span>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="error">
        <span>❌ Failed to load weather data</span>
      </div>
    );
  }

  return (
    <>
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
    </>
  );
};

const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  city = 'London',
  theme = 'light',
  showForecast = true,
  className,
  style
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reactRootRef = useRef<Root | null>(null);

  // Single useEffect to handle everything
  useEffect(() => {
    console.log(`[${city}] Setting up weather widget...`);
    
    if (!containerRef.current) {
      console.log(`[${city}] No container ref`);
      return;
    }

    // Generate mock weather data
    const weatherData: WeatherData = {
      city,
      temperature: Math.round(Math.random() * 30) + 5,
      description: 'Partly Cloudy',
      humidity: Math.round(Math.random() * 40) + 40,
      windSpeed: Math.round(Math.random() * 20) + 5,
      icon: ['🌤️', '☀️', '⛅', '🌦️', '🌧️'][Math.floor(Math.random() * 5)]
    };

    try {
      // Create or get shadow root
      let shadowRoot: ShadowRoot;
      if (!containerRef.current.shadowRoot) {
        shadowRoot = containerRef.current.attachShadow({ mode: 'open' });
        console.log(`[${city}] Shadow root created`);
      } else {
        shadowRoot = containerRef.current.shadowRoot;
      }

      // Clear and create container
      shadowRoot.innerHTML = '';
      const reactContainer = document.createElement('div');
      reactContainer.style.width = '100%';
      reactContainer.style.height = '100%';
      reactContainer.style.display = 'block';
      shadowRoot.appendChild(reactContainer);
      
      // Create React root and render immediately
      reactRootRef.current = createRoot(reactContainer);
      
      reactRootRef.current.render(
        <div style={{ width: '100%', height: '100%' }}>
          <style>{getStyles(theme)}</style>
          <div className="weather-widget" data-theme={theme}>
            <WeatherContent 
              loading={false}
              weatherData={weatherData}
              showForecast={showForecast}
              city={city}
            />
          </div>
        </div>
      );

      console.log(`[${city}] Weather widget rendered successfully`);

    } catch (error) {
      console.error(`[${city}] Error setting up weather widget:`, error);
    }

    return () => {
      if (reactRootRef.current) {
        try {
          reactRootRef.current.unmount();
        } catch (error) {
          console.error('Error unmounting:', error);
        }
        reactRootRef.current = null;
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
        ...style
      }}
    />
  );
};

const getStyles = (theme: 'light' | 'dark') => `
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

  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 16px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .loading span {
    font-size: 1rem;
    opacity: 0.8;
  }

  .error {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
  }

  .error span {
    background: rgba(231, 76, 60, 0.2);
    color: #e74c3c;
    padding: 12px 20px;
    border-radius: 8px;
    border: 1px solid rgba(231, 76, 60, 0.3);
  }
`;

export default WeatherWidget;
