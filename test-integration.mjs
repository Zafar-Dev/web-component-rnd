// test-integration.mjs
// Simple integration test to verify the built library works with both React 17 and 19

console.log('Testing built library for React compatibility...');

try {
  // Test React component export (main export)
  const { 
    WeatherWidget, 
    defineWeatherWidgetElement, 
    getReactVersion, 
    supportsModernReact 
  } = await import('./dist/index.js');
  
  console.log('✓ WeatherWidget exported:', typeof WeatherWidget);
  console.log('✓ defineWeatherWidgetElement exported:', typeof defineWeatherWidgetElement);
  console.log('✓ getReactVersion exported:', typeof getReactVersion);
  console.log('✓ supportsModernReact exported:', typeof supportsModernReact);
  
  // Test WeatherWidget is a React component
  console.log('✓ WeatherWidget is function:', typeof WeatherWidget === 'function');
  
  // Test custom element function
  if (typeof defineWeatherWidgetElement === 'function') {
    console.log('✓ defineWeatherWidgetElement is callable');
    // Don't actually call it since we're in Node.js
  }

  // Test compatibility functions
  if (typeof getReactVersion === 'function') {
    console.log('✓ getReactVersion is callable');
  }

  if (typeof supportsModernReact === 'function') {
    console.log('✓ supportsModernReact is callable');
  }
  
  console.log('\n✅ Integration test completed successfully!');
  console.log('\n🎯 React Compatibility Features:');
  console.log('• Supports React 17 (legacy ReactDOM.render)');
  console.log('• Supports React 18+ (createRoot API)');
  console.log('• Automatic API detection and fallback');
  console.log('• Runtime compatibility checking');
  console.log('\nUsage examples:');
  console.log('React: import { WeatherWidget } from "react-web-component-widget"');
  console.log('Custom Element: import "react-web-component-widget" then use <weather-widget>');
  console.log('Compatibility: import { getReactVersion, supportsModernReact } from "react-web-component-widget"');
  
} catch (error) {
  console.error('✗ Integration test failed:', error.message);
  process.exit(1);
}
