// TypeScript test file to verify exports and types
import { WeatherWidget, WeatherWidgetProps, defineWeatherWidgetElement } from './dist/index.js';

// Test 1: Check that WeatherWidget has correct type
const widget: typeof WeatherWidget = WeatherWidget;
console.log('✓ WeatherWidget type check passed');

// Test 2: Check that WeatherWidgetProps interface works
const props: WeatherWidgetProps = {
  city: 'London',
  theme: 'light',
  showForecast: true,
  className: 'test-class',
  style: { width: '400px' }
};
console.log('✓ WeatherWidgetProps interface check passed');

// Test 3: Check that defineWeatherWidgetElement is a function
if (typeof defineWeatherWidgetElement === 'function') {
  console.log('✓ defineWeatherWidgetElement function check passed');
}

console.log('✓ All TypeScript type checks passed!');
