import React, { useState } from 'react';
import WeatherWidget from '../../../src/components/WeatherWidget';
import './App.css';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [selectedCity, setSelectedCity] = useState('London');

  const cities = ['London', 'New York', 'Tokyo', 'Paris', 'Sydney'];

  return (
    <div className={`app ${theme}`}>
      <header className="app-header">
        <h1>React Weather Widget Example</h1>
        <p>Demonstrating the use of React Web Component Widget</p>
      </header>

      <div className="controls">
        <div className="control-group">
          <label htmlFor="city">Select City:</label>
          <select 
            id="city"
            value={selectedCity} 
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="theme">Theme:</label>
          <select 
            id="theme"
            value={theme} 
            onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>

      <main className="main-content">
        <section className="widget-demo">
          <h2>Single Widget Demo</h2>
          <WeatherWidget 
            city={selectedCity}
            theme={theme}
            showForecast={true}
          />
        </section>

        <section className="multiple-widgets-demo">
          <h2>Multiple Widgets Demo</h2>
          <div className="widgets-grid">
            <WeatherWidget city="London" theme="light" showForecast={false} />
            <WeatherWidget city="Tokyo" theme="dark" showForecast={true} />
            <WeatherWidget city="New York" theme="light" showForecast={true} />
            <WeatherWidget city="Paris" theme="dark" showForecast={false} />
          </div>
        </section>

        <section className="features">
          <h2>Key Features</h2>
          <ul>
            <li>✨ Complete style encapsulation with Shadow DOM</li>
            <li>🎨 Light and dark theme support</li>
            <li>📱 Fully responsive design</li>
            <li>⚛️ Built with modern React patterns</li>
            <li>🔧 Highly customizable props</li>
            <li>🚀 Optimized performance</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
