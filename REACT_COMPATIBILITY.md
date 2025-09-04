# React Version Compatibility Guide

## Overview

This guide explains how to use `react-web-component-widget` with different React versions. The library automatically detects your React version and uses the appropriate rendering API.

## Supported React Versions

| React Version | Status | Rendering API | Notes |
|---------------|---------|---------------|-------|
| **17.x** | ✅ **Fully Supported** | `ReactDOM.render` | Legacy mode with full functionality |
| **18.x** | ✅ **Fully Supported** | `createRoot` | Concurrent mode support |
| **19.x** | ✅ **Fully Supported** | `createRoot` | Latest features supported |

## Installation & Usage

### For React 17 Projects

```bash
npm install react-web-component-widget
```

```tsx
// Your React 17 app
import React from 'react';
import { WeatherWidget } from 'react-web-component-widget';

function App() {
  return (
    <div>
      <h1>Weather App (React 17)</h1>
      <WeatherWidget city="London" theme="light" />
    </div>
  );
}

export default App;
```

### For React 18+ Projects

```bash
npm install react-web-component-widget
```

```tsx
// Your React 18/19 app
import React from 'react';
import { WeatherWidget } from 'react-web-component-widget';

function App() {
  return (
    <div>
      <h1>Weather App (React 19)</h1>
      <WeatherWidget city="Tokyo" theme="dark" />
    </div>
  );
}

export default App;
```

## Runtime Detection

You can check compatibility at runtime:

```tsx
import { getReactVersion, supportsModernReact } from 'react-web-component-widget';

// Check what React version is being used
console.log('React version:', getReactVersion());

// Check if modern React features are available
if (supportsModernReact()) {
  console.log('Using React 18+ concurrent features');
} else {
  console.log('Using React 17 legacy mode');
}
```

## Migration Guide

### Upgrading from React 17 to React 18+

1. **No changes needed in your widget usage** - the same code works!
2. The library automatically detects the new React version
3. Starts using `createRoot` API automatically
4. No breaking changes in the widget API

```tsx
// This exact code works in both React 17 and React 19
<WeatherWidget city="Paris" theme="light" showForecast={true} />
```

### Peer Dependency Range

The package supports a wide peer dependency range:

```json
{
  "peerDependencies": {
    "react": ">=17.0.0 <20.0.0",
    "react-dom": ">=17.0.0 <20.0.0"
  }
}
```

This means it works with any React version from 17.0.0 up to (but not including) 20.0.0.

## Technical Implementation

The library uses a compatibility layer that:

1. **Detects available React APIs** at runtime
2. **Falls back gracefully** to legacy APIs when needed
3. **Maintains identical functionality** across versions
4. **Uses optimal rendering approach** for each React version

### React 17 Mode
- Uses `ReactDOM.render(element, container)`
- Uses `ReactDOM.unmountComponentAtNode(container)`
- Full feature compatibility maintained

### React 18+ Mode
- Uses `createRoot(container).render(element)`
- Uses `root.unmount()`
- Takes advantage of concurrent features

## Troubleshooting

### Common Issues

1. **TypeScript errors**: Make sure you have compatible `@types/react` installed
2. **Peer dependency warnings**: Install the React version that matches your project
3. **Rendering issues**: Check browser console for compatibility warnings

### Getting Help

If you encounter issues:

1. Check the React version: `getReactVersion()`
2. Verify modern support: `supportsModernReact()`
3. Look for console warnings
4. Check that peer dependencies are satisfied

## Best Practices

1. **Let the library handle compatibility** - don't try to force specific APIs
2. **Test in both React environments** if you're maintaining multiple projects
3. **Use the compatibility utilities** for debugging
4. **Keep peer dependencies in sync** with your main React version

## Example Projects

See the `examples/` directory for complete implementations:
- `react-17-example.tsx` - React 17 usage
- `react-example.tsx` - Modern React usage
- `vanilla-html-example.html` - Framework-agnostic usage
