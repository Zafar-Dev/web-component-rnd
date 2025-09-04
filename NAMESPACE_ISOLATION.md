# React Namespace Isolation Strategy - v2.2.0

## Overview

Version 2.2.0 implements **React Namespace Isolation** - an advanced strategy that bundles React internally while creating complete isolation from the host application's React instance. This approach allows the component to work with **any React version** without conflicts.

## How It Works

### 1. **Isolated React Context**
- Creates a separate React context manager
- Uses WeakMap to track component instances
- Completely isolates React roots from host app

### 2. **Namespace Isolation**
- Bundles React internally (~315KB)
- Creates isolated React instances per component
- No global React conflicts

### 3. **Component Architecture**
```
Host React App
├── NamespacedWeatherWidget (uses host React)
    └── IsolatedWeatherWidget (uses bundled React)
        └── WeatherWidget (actual component)
```

## API Usage

### Basic Usage (Same as Before)
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

### Advanced Usage - Direct Isolation
```tsx
import { IsolatedWeatherWidget } from 'react-web-component-widget';

// Create isolated instance
const widget = new IsolatedWeatherWidget({ 
  city: 'Paris', 
  theme: 'dark' 
});

// Mount to DOM
document.body.appendChild(widget.getElement());

// Update props
widget.updateProps({ city: 'Tokyo' });

// Cleanup
widget.destroy();
```

### Advanced Usage - Custom Isolated Components
```tsx
import { createIsolatedComponent, withIsolatedReact } from 'react-web-component-widget';

// Create your own isolated React component
const MyIsolatedComponent = createIsolatedComponent((React) => {
  return ({ title }: { title: string }) => {
    const [count, setCount] = React.useState(0);
    return React.createElement('div', null, 
      React.createElement('h1', null, title),
      React.createElement('button', { 
        onClick: () => setCount(c => c + 1) 
      }, `Count: ${count}`)
    );
  };
});
```

## Benefits

✅ **Universal React Compatibility** - Works with React 16.8+ through 19.x
✅ **Zero Version Conflicts** - Complete isolation from host React
✅ **Pure React Component** - Real React, not a wrapper or alternative
✅ **Same API** - No breaking changes from previous versions
✅ **Memory Efficient** - Proper cleanup and WeakMap usage
✅ **Production Ready** - Minified and optimized bundle

## Bundle Sizes

- **ES Module**: 315KB (73KB gzipped)
- **UMD**: 193KB (61KB gzipped)
- **Includes**: React 19, ReactDOM, isolation utilities

## How Isolation Works

### 1. **Context Separation**
```typescript
// Host app's React
const hostReact = window.React; // React 18

// Our component's React (completely separate)
const isolatedReact = bundledReact; // React 19

// No conflicts!
```

### 2. **Instance Management**
```typescript
class IsolatedReactContext {
  private containerMap = new WeakMap<HTMLElement, Root>();
  
  createRoot(container: HTMLElement): Root {
    // Each component gets its own React root
    const root = createRoot(container);
    this.containerMap.set(container, root);
    return root;
  }
}
```

### 3. **Memory Safety**
- Uses WeakMap for automatic garbage collection
- Proper root unmounting on component destroy
- No memory leaks

## Compatibility Matrix

| Host React Version | v2.2.0 Support | Bundle Size Impact |
|-------------------|----------------|-------------------|
| React 16.8+       | ✅ Full        | +315KB (isolated) |
| React 17.x        | ✅ Full        | +315KB (isolated) |
| React 18.x        | ✅ Full        | +315KB (isolated) |
| React 19.x        | ✅ Full        | +315KB (isolated) |
| No React         | ✅ Full        | +315KB (provides React) |

## Performance

- **Initial Load**: ~315KB (73KB gzipped)
- **Runtime**: No performance impact after load
- **Memory**: Isolated context per component
- **Cleanup**: Automatic garbage collection

## Use Cases

### ✅ **Perfect For:**
- Multi-version React environments
- Micro-frontend architectures
- Third-party widget distribution
- Library components with React conflicts
- Cross-team component sharing

### ⚠️ **Consider Alternatives For:**
- Single React version environments (use peer deps)
- Bundle size critical applications (< 100KB budgets)
- Simple internal components

## Migration

**From v2.0/v2.1**: No code changes required!
```tsx
// Works exactly the same
import { WeatherWidget } from 'react-web-component-widget';
<WeatherWidget city="London" />
```

**From v1.x**: Update import and install
```bash
npm install react-web-component-widget@^2.2.0
```

## Troubleshooting

### Q: Still getting React conflicts?
A: Ensure you're importing from the package, not local files. The isolation only works in the built/distributed version.

### Q: Bundle size too large?
A: Consider using peer dependencies if you control the React version across your apps.

### Q: Development mode issues?
A: Use `npm run build` and test the built version for accurate conflict testing.
