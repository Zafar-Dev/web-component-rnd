import { useState } from 'react'
import './App.css'
import WeatherWidget from './components/WeatherWidget'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [city, setCity] = useState('London')
  const [showForecast, setShowForecast] = useState(true)

  const cities = ['London', 'New York', 'Tokyo', 'Paris', 'Sydney', 'Mumbai']

  return (
    <div className="app" data-theme={theme}>
      <header className="app-header">
        <h1>React Web Component Widget Demo</h1>
        <p>A weather widget that uses Shadow DOM for complete style encapsulation</p>
      </header>

      <div className="controls">
        <div className="control-group">
          <label htmlFor="city-select">City:</label>
          <select 
            id="city-select"
            value={city} 
            onChange={(e) => setCity(e.target.value)}
          >
            {cities.map(cityName => (
              <option key={cityName} value={cityName}>{cityName}</option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="theme-select">Theme:</label>
          <select 
            id="theme-select"
            value={theme} 
            onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={showForecast}
              onChange={(e) => setShowForecast(e.target.checked)}
            />
            Show Details
          </label>
        </div>
      </div>

      <div className="widget-showcase">
        <div className="widget-container">
          <h2>Weather Widget (Shadow DOM)</h2>
          <WeatherWidget
            city={city}
            theme={theme}
            showForecast={showForecast}
          />
        </div>

        <div className="widget-container">
          <h2>Multiple Widgets</h2>
          <div className="multiple-widgets">
            <WeatherWidget city="Paris" theme="light" showForecast={false} />
            <WeatherWidget city="Tokyo" theme="dark" showForecast={true} />
          </div>
        </div>
      </div>

      <div className="features">
        <h2>Features</h2>
        <ul>
          <li>🔒 <strong>Shadow DOM Encapsulation:</strong> Styles are completely isolated</li>
          <li>⚛️ <strong>React-based:</strong> Built with modern React hooks and patterns</li>
          <li>🎨 <strong>Themeable:</strong> Light and dark theme support</li>
          <li>📱 <strong>Responsive:</strong> Works on all screen sizes</li>
          <li>🔧 <strong>Customizable:</strong> Configurable props for different use cases</li>
          <li>📦 <strong>Reusable:</strong> Can be used in React, Next.js, and other frameworks</li>
        </ul>
      </div>

      <div className="usage-example">
        <h2>Usage Example</h2>
        <pre><code>{`import { WeatherWidget } from 'react-web-component-widget';

function MyApp() {
  return (
    <WeatherWidget
      city="London"
      theme="light"
      showForecast={true}
    />
  );
}`}</code></pre>
      </div>
    </div>
  )
}

export default App
