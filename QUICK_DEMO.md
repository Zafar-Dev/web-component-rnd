# Quick Demo: Using Your Widget in Another App

## 📋 Summary

You now have a locally packaged widget ready for use! Here's what you have:

### ✅ Built Package
- `your-org-react-web-component-widget-1.0.0.tgz` - Ready to install in other projects
- `test-local.html` - Working demo showing the widget in action

## 🚀 Step-by-Step Usage

### 1. **Test the Current Widget**

Open `test-local.html` in your browser to see the widget working:
- File location: `d:\Zafar\RND\web-component\test-local.html`
- Shows 4 weather widgets with different themes and settings

### 2. **Create a New React App to Test**

```bash
# Create a new test project
npx create-react-app test-weather-app --template typescript
cd test-weather-app

# Install your locally built widget
npm install "d:\Zafar\RND\web-component\your-org-react-web-component-widget-1.0.0.tgz"
```

### 3. **Use the Widget in React**

Replace the contents of `src/App.tsx`:

```tsx
import React from 'react';
import { WeatherWidget } from '@your-org/react-web-component-widget';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My App Using Weather Widget</h1>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px',
          padding: '20px',
          maxWidth: '1000px'
        }}>
          <WeatherWidget 
            city="London" 
            theme="light" 
            showForecast={true}
          />
          
          <WeatherWidget 
            city="Tokyo" 
            theme="dark" 
            showForecast={true}
          />
          
          <WeatherWidget 
            city="New York" 
            theme="light" 
            showForecast={false}
            style={{ width: '350px' }}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
```

### 4. **Run Your Test App**

```bash
npm start
```

Your React app will now show three weather widgets!

## 🌐 Using as Custom Elements (Any Framework)

For non-React frameworks or vanilla HTML:

### Next.js Example

```tsx
// pages/weather.tsx or app/weather/page.tsx
'use client';

import { useEffect } from 'react';
import { defineWeatherWidgetElement } from '@your-org/react-web-component-widget';

export default function WeatherPage() {
  useEffect(() => {
    defineWeatherWidgetElement();
  }, []);

  return (
    <div>
      <h1>Weather Dashboard</h1>
      <weather-widget city="Paris" theme="light" show-forecast="true"></weather-widget>
      <weather-widget city="Berlin" theme="dark" show-forecast="false"></weather-widget>
    </div>
  );
}
```

### Vue.js Example

```vue
<template>
  <div>
    <h1>Vue Weather App</h1>
    <weather-widget city="Sydney" theme="light" show-forecast="true"></weather-widget>
  </div>
</template>

<script>
import { defineWeatherWidgetElement } from '@your-org/react-web-component-widget';

defineWeatherWidgetElement();

export default {
  name: 'WeatherApp'
}
</script>
```

### Vanilla HTML Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website with Weather</title>
</head>
<body>
    <h1>Welcome to My Site</h1>
    <weather-widget city="Mumbai" theme="dark"></weather-widget>

    <script type="module">
        import { defineWeatherWidgetElement } from './node_modules/@your-org/react-web-component-widget/dist/index.js';
        defineWeatherWidgetElement();
    </script>
</body>
</html>
```

## 🔧 Development Tips

### For Active Development:
1. Use `npm link` instead of `npm pack` for faster iteration
2. Keep the dev server running with `npm run dev`
3. Rebuild with `npm run build` after changes

### For Distribution:
1. Update version in `package.json`
2. Run `npm pack` to create new package
3. Test in multiple frameworks
4. Publish to npm with `npm publish`

## 📝 What You Can Customize

- **City**: Any string (currently shows mock data)
- **Theme**: `"light"` or `"dark"`
- **Show Forecast**: `true` or `false` 
- **Styling**: Custom CSS via `style` prop or external CSS
- **Size**: Default 320x280px, fully customizable

## 🎯 Next Steps

1. **Add real weather API**: Replace mock data in `WeatherWidget.tsx`
2. **Customize styling**: Modify the `getStyles` function
3. **Add more props**: Extend `WeatherWidgetProps` interface
4. **Publish to npm**: Run `npm publish` to make it publicly available
5. **Add tests**: Create unit tests for the component

Your widget is now ready to use in any application! 🎉
