# Local Development & Testing Guide

## 🔧 Running the Widget Locally

### 1. Development Server

Start the development server to see the widget in action:

```bash
cd d:\Zafar\RND\web-component
npm install
npm run dev
```

This will start a Vite dev server at `http://localhost:5173` (or `5174` if port is in use) where you can see the widget running.

### 2. Build the Library

To create the distributable version:

```bash
npm run build
```

This creates the `dist/` folder with:
- `index.js` - ES Module build
- `index.umd.cjs` - UMD build  
- `index.d.ts` - TypeScript declarations
- `WeatherWidgetElement-*.js` - Custom element chunk

### 3. Test the Build

Run the integration test to verify everything works:

```bash
npm test
```

## 📦 Using in Other Applications Locally

### Method 1: Using npm pack (Recommended)

This creates a local package file you can install in other projects:

```bash
# In the widget project directory
cd d:\Zafar\RND\web-component
npm pack
```

This creates a file like `your-org-react-web-component-widget-1.0.0.tgz`

Then in your other project:

```bash
# In your test project
npm install /path/to/your-org-react-web-component-widget-1.0.0.tgz
```

### Method 2: Using npm link (For Active Development)

Link the package globally, then link it in your test project:

```bash
# In the widget project
cd d:\Zafar\RND\web-component
npm link

# In your test project
npm link react-web-component-widget
```

### Method 3: Direct File Import (Quick Testing)

You can directly import the built files:

```javascript
// Import from the built dist folder
import { WeatherWidget } from 'file:///d:/Zafar/RND/web-component/dist/index.js';
```

## 🚀 Example Test Projects

### Create a React Test Project

```bash
# Create a new React app
npx create-react-app my-test-app --template typescript
cd my-test-app

# Install the widget (using npm pack method)
npm install /path/to/your-org-react-web-component-widget-1.0.0.tgz

# Or use npm link method
npm link react-web-component-widget
```

**src/App.tsx**:
```tsx
import React from 'react';
import { WeatherWidget } from 'react-web-component-widget';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Testing Weather Widget</h1>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <WeatherWidget city="London" theme="light" />
          <WeatherWidget city="Tokyo" theme="dark" />
          <WeatherWidget city="New York" theme="light" showForecast={false} />
        </div>
      </header>
    </div>
  );
}

export default App;
```

### Create a Next.js Test Project

```bash
# Create a new Next.js app
npx create-next-app@latest my-next-test --typescript --tailwind --app
cd my-next-test

# Install the widget
npm install /path/to/your-org-react-web-component-widget-1.0.0.tgz
```

**app/page.tsx**:
```tsx
'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const WeatherWidget = dynamic(
  () => import('react-web-component-widget').then(mod => mod.WeatherWidget),
  { 
    ssr: false,
    loading: () => <div className="w-80 h-70 bg-gray-200 rounded-2xl animate-pulse flex items-center justify-center">Loading...</div>
  }
);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Weather Widget Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Suspense fallback={<div>Loading widget...</div>}>
            <WeatherWidget city="London" theme="light" />
          </Suspense>
          
          <Suspense fallback={<div>Loading widget...</div>}>
            <WeatherWidget city="Paris" theme="dark" />
          </Suspense>
          
          <Suspense fallback={<div>Loading widget...</div>}>
            <WeatherWidget city="Berlin" theme="light" showForecast={false} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
```

### Create a Vanilla HTML Test

**test.html**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather Widget Test</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
            gap: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        h1 {
            text-align: center;
            color: white;
            margin-bottom: 2rem;
        }
        
        weather-widget {
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            border-radius: 16px;
            overflow: hidden;
        }
    </style>
</head>
<body>
    <h1>Weather Widget Demo</h1>
    
    <div class="container">
        <weather-widget city="London" theme="light" show-forecast="true"></weather-widget>
        <weather-widget city="Tokyo" theme="dark" show-forecast="true"></weather-widget>
        <weather-widget city="New York" theme="light" show-forecast="false"></weather-widget>
        <weather-widget city="Paris" theme="dark" show-forecast="false"></weather-widget>
    </div>

    <!-- Option 1: Import from node_modules (if installed via npm pack) -->
    <script type="module">
        // If you installed the package
        import { defineWeatherWidgetElement } from './node_modules/react-web-component-widget/dist/index.js';
        defineWeatherWidgetElement();
    </script>

    <!-- Option 2: Direct import from your project (for quick testing) -->
    <!-- 
    <script type="module">
        import { defineWeatherWidgetElement } from 'file:///d:/Zafar/RND/web-component/dist/index.js';
        defineWeatherWidgetElement();
    </script>
    -->
</body>
</html>
```

### Create a Vue Test Project

```bash
# Create Vue app
npm create vue@latest my-vue-test
cd my-vue-test
npm install

# Install the widget
npm install /path/to/your-org-react-web-component-widget-1.0.0.tgz
```

**src/App.vue**:
```vue
<template>
  <div id="app">
    <header>
      <h1>Vue + Weather Widget Test</h1>
    </header>
    
    <main class="widget-grid">
      <weather-widget city="London" theme="light" show-forecast="true"></weather-widget>
      <weather-widget city="Tokyo" theme="dark" show-forecast="true"></weather-widget>
      <weather-widget city="Sydney" theme="light" show-forecast="false"></weather-widget>
    </main>
  </div>
</template>

<script>
import { defineWeatherWidgetElement } from 'react-web-component-widget';

// Register the custom element
defineWeatherWidgetElement();

export default {
  name: 'App',
  mounted() {
    console.log('Weather widgets should be rendered');
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  max-width: 1200px;
}

.widget-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 20px;
  padding: 20px;
}

weather-widget {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  overflow: hidden;
}

h1 {
  margin-bottom: 2rem;
}
</style>
```

## 🔄 Development Workflow

### For Active Development:

1. **Start the widget dev server**:
   ```bash
   cd d:\Zafar\RND\web-component
   npm run dev
   ```

2. **In another terminal, build on changes**:
   ```bash
   npm run build
   ```

3. **Test in your application** using `npm link` method for real-time updates.

### For Testing Releases:

1. **Build the package**:
   ```bash
   npm run build
   ```

2. **Create package file**:
   ```bash
   npm pack
   ```

3. **Install in test project**:
   ```bash
   npm install /path/to/package.tgz
   ```

## 🐛 Troubleshooting

### Common Issues:

1. **"HTMLElement is not defined" in Node.js**:
   - This is normal - the custom element only works in browsers
   - The integration test handles this gracefully

2. **Widget not showing in custom element**:
   - Make sure you called `defineWeatherWidgetElement()`
   - Check browser console for errors

3. **TypeScript errors**:
   - Make sure the `dist/index.d.ts` file exists
   - Try rebuilding with `npm run build`

4. **Module resolution issues**:
   - Clear node_modules and reinstall
   - Check that the import paths are correct

### Debug Commands:

```bash
# Check build output
npm run build && ls -la dist/

# Test the package
npm test

# Verify exports work
node -e "import('./dist/index.js').then(console.log)"
```

This setup allows you to develop locally and test in multiple environments before publishing to npm!
