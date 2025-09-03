# Deployment Guide

This guide explains how to build, package, and deploy the React Web Component Widget.

## Building for Production

### 1. Build the Library

```bash
npm run build:lib
```

This creates the following files in the `dist/` directory:
- `index.js` - ES module version
- `index.umd.cjs` - UMD version for broader compatibility  
- `index.d.ts` - TypeScript definitions

### 2. Test the Build Locally

```bash
npm run preview
```

This serves the demo application using the built library.

## Publishing to NPM

### 1. Update Package Information

Before publishing, update the following in `package.json`:

```json
{
  "name": "react-web-component-widget",
  "version": "1.0.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/Zafar-Dev/web-component-rnd.git"
  },
  "bugs": {
    "url": "https://github.com/Zafar-Dev/web-component-rnd/issues"
  },
  "homepage": "https://github.com/Zafar-Dev/web-component-rnd#readme"
}
```

### 2. Login to NPM

```bash
npm login
```

### 3. Publish the Package

```bash
npm publish --access public
```

For scoped packages (starting with @), you need the `--access public` flag for the first publish.

### 4. Update Version for Future Releases

```bash
# Patch version (1.0.0 -> 1.0.1)
npm version patch

# Minor version (1.0.0 -> 1.1.0) 
npm version minor

# Major version (1.0.0 -> 2.0.0)
npm version major
```

## Using the Published Package

### Installation

```bash
npm install react-web-component-widget
```

### Import and Use

```tsx
import { WeatherWidget } from 'react-web-component-widget';

function App() {
  return (
    <WeatherWidget 
      city="London" 
      theme="light" 
      showForecast={true} 
    />
  );
}
```

## Bundle Analysis

The built package includes:

- **ES Module**: Optimized for modern bundlers (Webpack, Vite, Rollup)
- **UMD Bundle**: Works in browsers and older build systems
- **TypeScript Types**: Full type support for TypeScript projects

### Bundle Sizes (Approximate)

- ES Module: ~15KB gzipped
- UMD Bundle: ~18KB gzipped
- TypeScript definitions: ~2KB

## Browser Compatibility

- ✅ Chrome/Edge 53+ (Shadow DOM support)
- ✅ Firefox 63+ (Shadow DOM support)  
- ✅ Safari 10+ (Shadow DOM support)
- ❌ Internet Explorer (Shadow DOM not supported)

## Framework Compatibility

### React Applications
```tsx
import { WeatherWidget } from 'react-web-component-widget';

function App() {
  return <WeatherWidget city="London" />;
}
```

### Next.js Applications
```tsx
// pages/index.tsx
import { WeatherWidget } from 'react-web-component-widget';

export default function Home() {
  return (
    <div>
      <WeatherWidget city="Tokyo" theme="dark" />
    </div>
  );
}
```

### HTML/Vanilla JS (using UMD)
```html
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/react-web-component-widget@1.0.0/dist/index.umd.cjs"></script>

<div id="widget-container"></div>

<script>
const { WeatherWidget } = ReactWebComponentWidget;
const container = document.getElementById('widget-container');
const root = ReactDOM.createRoot(container);
root.render(React.createElement(WeatherWidget, { city: 'Paris' }));
</script>
```

## Continuous Integration

### GitHub Actions Example

Create `.github/workflows/publish.yml`:

```yaml
name: Publish Package

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build package
        run: npm run build:lib
      
      - name: Publish to NPM
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Troubleshooting

### Build Issues

1. **TypeScript errors**: Ensure all dependencies are installed
2. **Missing types**: Install `@types/node` if needed
3. **Path resolution**: Make sure Vite config uses proper path resolution

### Runtime Issues

1. **Shadow DOM not supported**: Check browser compatibility
2. **Styles not applied**: Verify Shadow DOM is properly created
3. **React hydration issues**: Ensure proper cleanup in useEffect

### Publishing Issues

1. **Access denied**: Use `--access public` for scoped packages
2. **Version conflicts**: Update version number before publishing
3. **Package size**: Check bundle size with `npm pack --dry-run`
