# React Weather Widget

A reusable weather widget component built with React and Shadow DOM encapsulation. Framework-agnostic - works in React, Next.js, Vue, Angular, and vanilla HTML. **Compatible with both React 17 and React 19**.

## Features

- ✅ **React 17 & 19 Compatible** - Automatic API detection and fallback
- ✅ **Shadow DOM Encapsulation** - Complete style isolation
- ✅ **Framework Agnostic** - Works in React, Next.js, Vue, Angular, vanilla HTML
- ✅ **TypeScript Support** - Full type definitions included
- ✅ **Multiple Themes** - Light and dark mode support
- ✅ **Customizable** - Props for city, theme, and forecast display
- ✅ **Self-Contained** - No external CSS dependencies
- ✅ **SSR Safe** - Works with server-side rendering

## Installation

```bash
npm install react-web-component-widget
```

## Quick Start

### React/Next.js

```tsx
import { WeatherWidget } from 'react-web-component-widget';

export default function App() {
  return (
    <div>
      <WeatherWidget 
        city="London"
        theme="light"
        showForecast={true}
      />
    </div>
  );
}
```

### HTML/Vanilla JS

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import { defineWeatherWidgetElement } from 'react-web-component-widget';
    defineWeatherWidgetElement();
  </script>
</head>
<body>
  <weather-widget city="Paris" theme="dark"></weather-widget>
</body>
</html>
```

### Vue.js

```vue
<template>
  <weather-widget city="Tokyo" theme="light" show-forecast="true"></weather-widget>
</template>

<script>
import { defineWeatherWidgetElement } from 'react-web-component-widget';
defineWeatherWidgetElement();
</script>
```

### Angular

```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { defineWeatherWidgetElement } from 'react-web-component-widget';

defineWeatherWidgetElement();

@NgModule({
  // ...
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
```

```html
<!-- app.component.html -->
<weather-widget city="Berlin" theme="dark"></weather-widget>
```

## API Reference

### React Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `city` | `string` | `"London"` | City name for weather display |
| `theme` | `"light" \| "dark"` | `"light"` | Visual theme |
| `showForecast` | `boolean` | `true` | Show additional weather details |
| `className` | `string` | `undefined` | CSS class name |
| `style` | `React.CSSProperties` | `undefined` | Inline styles |

### Custom Element Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `city` | `string` | `"London"` | City name for weather display |
| `theme` | `"light" \| "dark"` | `"light"` | Visual theme |
| `show-forecast` | `"true" \| "false"` | `"true"` | Show additional weather details |

### Functions

#### `defineWeatherWidgetElement()`

Registers the `<weather-widget>` custom element. Call this before using the widget as a custom element.

```javascript
import { defineWeatherWidgetElement } from 'react-web-component-widget';
defineWeatherWidgetElement();
```

## Styling

The widget uses Shadow DOM for complete style encapsulation. The component has a default size of 320×280px but can be customized:

### React Component

```tsx
<WeatherWidget 
  style={{ 
    width: '400px', 
    height: '300px',
    borderRadius: '12px'
  }}
/>
```

### Custom Element

```css
weather-widget {
  width: 400px;
  height: 300px;
  display: block;
  border-radius: 12px;
}
```

## React Compatibility

This library automatically detects your React version and uses the appropriate rendering API:

- **React 17**: Uses legacy `ReactDOM.render()` and `ReactDOM.unmountComponentAtNode()`
- **React 18+**: Uses modern `createRoot()` and `root.unmount()` APIs

### Compatibility Utilities

```tsx
import { getReactVersion, supportsModernReact } from 'react-web-component-widget';

// Check React version at runtime
console.log('React version:', getReactVersion()); // "17.0.2" or "19.0.0"

// Check if modern React APIs are available
console.log('Modern React:', supportsModernReact()); // true for React 18+
```

### Supported React Versions

| React Version | Status | Rendering API |
|---------------|---------|---------------|
| 17.x | ✅ Supported | `ReactDOM.render` (legacy) |
| 18.x | ✅ Supported | `createRoot` (concurrent) |
| 19.x | ✅ Supported | `createRoot` (concurrent) |

The library automatically detects the available API and falls back gracefully.

## Advanced Usage

### Next.js with Dynamic Import

```tsx
import dynamic from 'next/dynamic';

const WeatherWidget = dynamic(
  () => import('react-web-component-widget').then(mod => mod.WeatherWidget),
  { ssr: false }
);

export default function Page() {
  return <WeatherWidget city="Tokyo" />;
}
```

### Manual Custom Element Registration

```javascript
import { getWeatherWidgetElement } from 'react-web-component-widget';

// Get the custom element class for advanced usage
getWeatherWidgetElement().then(WeatherWidgetElement => {
  customElements.define('my-weather', WeatherWidgetElement);
});
```

## Examples

Check the `examples/` directory for complete implementations:

- `react-example.tsx` - React usage
- `nextjs-example.tsx` - Next.js with SSR
- `vue-example.vue` - Vue.js integration
- `vanilla-html-example.html` - Plain HTML usage

## Browser Support

- Modern browsers with Custom Elements v1 and Shadow DOM v1 support
- ES2018+ features
- React 18+ for React usage

## Development

```bash
# Clone and install
git clone <repo-url>
cd react-web-component-widget
npm install

# Start development server
npm run dev

# Build library
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## License

MIT
