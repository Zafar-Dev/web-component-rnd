# React Weather Widget

A reusable weather widget component built with React and Shadow DOM encapsulation. Can be used as a React component or as a native web component in any framework. React is bundled internally, making it compatible with any React version in host applications.

## Installation

```bash
npm install react-web-component-widget
```

## Usage

### As a React Component

```tsx
import React from 'react';
import { WeatherWidget } from 'react-web-component-widget';

function App() {
  return (
    <div>
      <WeatherWidget 
        city="New York"
        theme="light"
        showForecast={true}
      />
    </div>
  );
}

export default App;
```

### As a Custom Element (HTML/Vanilla JS)

First, import the library to register the custom element:

```javascript
import 'react-web-component-widget';
```

Then use it in your HTML:

```html
<weather-widget 
  city="London" 
  theme="dark" 
  show-forecast="true">
</weather-widget>
```

### Manual Registration

If you prefer to manually register the custom element:

```javascript
import { defineWeatherWidgetElement } from 'react-web-component-widget';

defineWeatherWidgetElement();
```

### In Next.js

```tsx
// pages/index.tsx or app/page.tsx
import dynamic from 'next/dynamic';

const WeatherWidget = dynamic(
  () => import('react-web-component-widget').then(mod => mod.WeatherWidget),
  { ssr: false }
);

export default function HomePage() {
  return (
    <div>
      <WeatherWidget city="Tokyo" theme="light" />
    </div>
  );
}
```

### In Vue.js

```vue
<template>
  <div>
    <weather-widget 
      city="Paris" 
      theme="dark" 
      show-forecast="true">
    </weather-widget>
  </div>
</template>

<script>
import 'react-web-component-widget';

export default {
  name: 'App'
}
</script>
```

### In Angular

```typescript
// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import 'react-web-component-widget';

@Component({
  selector: 'app-root',
  template: `
    <weather-widget 
      city="Berlin" 
      theme="light" 
      show-forecast="true">
    </weather-widget>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {}
```

## Props/Attributes

### React Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `city` | `string` | `"London"` | The city to display weather for |
| `theme` | `"light" \| "dark"` | `"light"` | Visual theme |
| `showForecast` | `boolean` | `true` | Whether to show additional weather details |
| `className` | `string` | `undefined` | CSS class name |
| `style` | `React.CSSProperties` | `undefined` | Inline styles |

### Custom Element Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `city` | `string` | `"London"` | The city to display weather for |
| `theme` | `"light" \| "dark"` | `"light"` | Visual theme |
| `show-forecast` | `"true" \| "false"` | `"true"` | Whether to show additional weather details |

## Styling

The widget uses Shadow DOM for complete style encapsulation. The component has a fixed size of 320x280px by default but can be customized through props/CSS.

### React Component Styling

```tsx
<WeatherWidget 
  city="London"
  style={{ width: '400px', height: '300px' }}
  className="my-weather-widget"
/>
```

### Custom Element Styling

```css
weather-widget {
  width: 400px;
  height: 300px;
  display: block;
}
```

## Features

- ✅ Shadow DOM encapsulation
- ✅ Framework agnostic
- ✅ TypeScript support
- ✅ Light and dark themes
- ✅ Responsive design
- ✅ Mock weather data (easily replaceable with real API)
- ✅ Loading states
- ✅ Error handling

## Development

This widget is built with:
- React 19
- TypeScript
- Vite
- Shadow DOM

## Browser Support

Modern browsers that support:
- Custom Elements v1
- Shadow DOM v1
- ES2018+

## License

MIT
