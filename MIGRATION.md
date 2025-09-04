# Migration Guide: v1.x to v2.0.0

## What Changed

Version 2.0.0 introduces a significant architectural change: **React is now bundled with the component** instead of being a peer dependency.

## Benefits

✅ **Version Independence**: Works with any React version in your host application
✅ **No Peer Dependency Conflicts**: No more React version mismatches
✅ **True Isolation**: Component uses its own React instance within Shadow DOM
✅ **Easier Integration**: No need to match React versions

## Breaking Changes

### Package Dependencies
- **Before (v1.x)**: React was a peer dependency
- **After (v2.0)**: React is bundled internally

### Bundle Size
- **Before**: ~50KB (excluding React)
- **After**: ~909KB (including React 19)

## Migration Steps

### For New Installations
```bash
npm install react-web-component-widget@^2.0.0
```

### For Existing Projects
1. Update your package.json:
   ```bash
   npm install react-web-component-widget@^2.0.0
   ```

2. **No code changes required** - the API remains identical:
   ```tsx
   // This works exactly the same
   import { WeatherWidget } from 'react-web-component-widget';
   
   <WeatherWidget city="London" theme="light" />
   ```

3. **Remove React peer dependency warnings** from your build tools if any.

## Compatibility

| Host React Version | v1.x Support | v2.0 Support |
|-------------------|--------------|--------------|
| React 16.x        | ❌           | ✅           |
| React 17.x        | ❌           | ✅           |
| React 18.x        | ❌           | ✅           |
| React 19.x        | ✅           | ✅           |
| No React         | ❌           | ✅           |

## When to Use v2.0

- ✅ Multiple React applications with different versions
- ✅ Non-React applications (Vue, Angular, vanilla)
- ✅ Micro-frontend architectures
- ✅ Third-party widget distribution
- ✅ When you want guaranteed isolation

## When to Consider Staying on v1.x

- ⚠️ Bundle size is critical (v1.x is ~85% smaller)
- ⚠️ You control the React version across all applications
- ⚠️ You're building internal components for a single React version

## FAQ

**Q: Will this cause React duplication in my app?**
A: The bundled React runs inside Shadow DOM, so it's isolated from your app's React instance.

**Q: Can I still use this in React applications?**
A: Yes! The component API is identical and works perfectly in React apps.

**Q: What about performance?**
A: Initial bundle size is larger, but runtime performance is the same due to Shadow DOM isolation.
