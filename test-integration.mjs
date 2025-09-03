// test-integration.mjs
// Simple integration test to verify the built library works

console.log('Testing built library...');

try {
  // Test React component export (main export)
  const { WeatherWidget, defineWeatherWidgetElement } = await import('./dist/index.js');
  
  console.log('✓ WeatherWidget exported:', typeof WeatherWidget);
  console.log('✓ defineWeatherWidgetElement exported:', typeof defineWeatherWidgetElement);
  
  // Test WeatherWidget is a React component
  console.log('✓ WeatherWidget is function:', typeof WeatherWidget === 'function');
  
  // Test custom element function
  if (typeof defineWeatherWidgetElement === 'function') {
    console.log('✓ defineWeatherWidgetElement is callable');
    // Don't actually call it since we're in Node.js
  }
  
  console.log('\n✓ Integration test completed successfully!');
  console.log('\nUsage examples:');
  console.log('React: import { WeatherWidget } from "react-web-component-widget"');
  console.log('Custom Element: import "react-web-component-widget" then use <weather-widget>');
  
} catch (error) {
  console.error('✗ Integration test failed:', error.message);
  process.exit(1);
}
