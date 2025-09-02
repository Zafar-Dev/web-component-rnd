# React Weather Widget Library

A beautiful, fully encapsulated weather widget built with React and Shadow DOM for complete style isolation. Perfect for embedding in any React-based application without CSS conflicts.

## Features

- 🔒 **Shadow DOM Encapsulation**: Styles are completely isolated and won't interfere with your app
- ⚛️ **React-based**: Built with modern React hooks and patterns
- 🎨 **Themeable**: Light and dark theme support
- 📱 **Responsive**: Works on all screen sizes
- 🔧 **TypeScript**: Full TypeScript support with proper type definitions
- 📦 **Framework Agnostic**: Works in React, Next.js, and other React-based frameworks

## Installation

```bash
npm install @your-org/react-web-component-widget
```

## Quick Start

### Basic Usage

```tsx
import React from 'react';
import { WeatherWidget } from '@your-org/react-web-component-widget';

function App() {
  return (
    <div className="App">
      <WeatherWidget city="London" />
    </div>
  );
}

export default App;
```

### With Custom Props

```tsx
import { WeatherWidget } from '@your-org/react-web-component-widget';

function MyComponent() {
  return (
    <WeatherWidget
      city="New York"
      theme="dark"
      showForecast={true}
      style={{ margin: '20px' }}
      className="my-weather-widget"
    />
  );
}
```
- 🔧 **Customizable**: Extensive prop configuration options
- 📦 **Framework Ready**: Works with React, Next.js, and other frameworks
- ⚡ **Performance**: Minimal bundle size with efficient rendering
- 💻 **TypeScript**: Full TypeScript support with comprehensive type definitions

## Installation

```bash
npm install @your-org/react-web-component-widget
```

## Usage

### Basic Usage

```tsx
import React from 'react';
import { WeatherWidget } from '@your-org/react-web-component-widget';

function App() {
  return (
    <div>
      <h1>My App</h1>
      <WeatherWidget city="London" />
    </div>
  );
}

export default App;
```

### Advanced Usage

```tsx
import React from 'react';
import { WeatherWidget, WeatherWidgetProps } from '@your-org/react-web-component-widget';

function App() {
  const widgetProps: WeatherWidgetProps = {
    city: "New York",
    theme: "dark",
    showForecast: true,
    className: "my-custom-class",
    style: { margin: '20px' }
  };

  return (
    <div>
      <WeatherWidget {...widgetProps} />
    </div>
  );
}
```

### Next.js Usage

```tsx
// pages/index.tsx or app/page.tsx
import { WeatherWidget } from '@your-org/react-web-component-widget';

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to my Next.js App</h1>
      <WeatherWidget 
        city="Tokyo"
        theme="light"
        showForecast={true}
      />
    </div>
  );
}
```

## API Reference

### WeatherWidgetProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `city` | `string` | `"London"` | The city to display weather information for |
| `theme` | `"light" \| "dark"` | `"light"` | Visual theme of the widget |
| `showForecast` | `boolean` | `true` | Whether to show additional weather details |
| `className` | `string` | `undefined` | Additional CSS class for the container |
| `style` | `React.CSSProperties` | `undefined` | Inline styles for the container |

## Development

### Prerequisites

- Node.js 16 or higher
- npm or yarn

### Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Build for production: `npm run build`

### Building the Library

To build the library for distribution:

```bash
npm run build:lib
```

This creates optimized bundles in the `dist` directory:
- `index.js` - ES modules version
- `index.umd.cjs` - UMD version for broader compatibility
- `index.d.ts` - TypeScript definitions

## Technical Details

### Shadow DOM Implementation

The component uses Shadow DOM to create a completely isolated rendering context. This means:

- ✅ Widget styles cannot be affected by parent page CSS
- ✅ Widget CSS cannot leak out to affect parent page
- ✅ Multiple instances can coexist without conflicts
- ✅ Third-party CSS frameworks won't interfere

### React Integration

The widget wraps a React component inside Shadow DOM using:
- `attachShadow()` for DOM isolation
- `createRoot()` for React rendering inside shadow tree
- `useEffect()` for lifecycle management
- `useRef()` for DOM element references

## Browser Support

- ✅ Chrome/Edge 53+
- ✅ Firefox 63+
- ✅ Safari 10+
- ❌ Internet Explorer (Shadow DOM not supported)

## Examples

### Multiple Widgets

```tsx
function Dashboard() {
  return (
    <div className="dashboard">
      <WeatherWidget city="London" theme="light" />
      <WeatherWidget city="Tokyo" theme="dark" />
      <WeatherWidget city="New York" showForecast={false} />
    </div>
  );
}
```

### Dynamic Configuration

```tsx
function ConfigurableWidget() {
  const [city, setCity] = useState('London');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div>
      <select value={city} onChange={(e) => setCity(e.target.value)}>
        <option value="London">London</option>
        <option value="Tokyo">Tokyo</option>
        <option value="New York">New York</option>
      </select>
      
      <WeatherWidget city={city} theme={theme} />
    </div>
  );
}
```

## License

This project is licensed under the MIT License.
