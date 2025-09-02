import React, { useState, useEffect } from 'react';

export interface SimpleWeatherWidgetProps {
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

const SimpleWeatherWidget: React.FC<SimpleWeatherWidgetProps> = ({
  city = 'London',
  theme = 'light',
  showForecast = true,
  className,
  style
}) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('SimpleWeatherWidget mounting for city:', city);
    
    // Mock weather data
    const mockData: WeatherData = {
      city,
      temperature: 22,
      description: 'Partly Cloudy',
      humidity: 65,
      windSpeed: 8,
      icon: '🌤️'
    };

    // Simulate API call
    setLoading(true);
    const timer = setTimeout(() => {
      console.log('Setting weather data:', mockData);
      setWeatherData(mockData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [city]);

  console.log('SimpleWeatherWidget render - loading:', loading, 'data:', weatherData);

  const containerStyle: React.CSSProperties = {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    background: theme === 'light' 
      ? 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)' 
      : 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
    color: theme === 'light' ? 'white' : '#ddd',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    maxWidth: '320px',
    minHeight: '200px',
    position: 'relative',
    overflow: 'hidden',
    ...style
  };

  if (loading) {
    return (
      <div className={className} style={containerStyle}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '150px' 
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid rgba(255, 255, 255, 0.3)',
            borderTop: '4px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '16px'
          }}></div>
          <span>Loading weather data...</span>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className={className} style={containerStyle}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '150px' 
        }}>
          <span style={{
            background: 'rgba(231, 76, 60, 0.2)',
            color: '#e74c3c',
            padding: '12px 20px',
            borderRadius: '8px',
            border: '1px solid rgba(231, 76, 60, 0.3)'
          }}>❌ No data available</span>
        </div>
      </div>
    );
  }

  return (
    <div className={className} style={containerStyle}>
      {/* Add spinner keyframes */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px' 
      }}>
        <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 600 }}>
          {weatherData.city}
        </h3>
        <div style={{ 
          fontSize: '2.5rem',
          animation: 'float 3s ease-in-out infinite'
        }}>
          {weatherData.icon}
        </div>
      </div>
      
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ fontSize: '3rem', fontWeight: 300, lineHeight: 1, marginBottom: '8px' }}>
          {weatherData.temperature}°C
        </div>
        <div style={{ fontSize: '1.1rem', opacity: 0.9, textTransform: 'capitalize' }}>
          {weatherData.description}
        </div>
      </div>

      {showForecast && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '16px', 
          marginBottom: '20px' 
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '12px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '4px' }}>
              Humidity
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>
              {weatherData.humidity}%
            </div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '12px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '4px' }}>
              Wind
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>
              {weatherData.windSpeed} km/h
            </div>
          </div>
        </div>
      )}

      <div style={{ 
        fontSize: '0.8rem', 
        opacity: 0.7, 
        textAlign: 'center' 
      }}>
        Last updated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};

export default SimpleWeatherWidget;
