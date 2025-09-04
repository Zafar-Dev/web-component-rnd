// Main exports for React web component widget
export type { WeatherWidgetProps } from './components/WeatherWidget';
export { default as WeatherWidget } from './components/WeatherWidget';
export { default } from './components/WeatherWidget';

// Browser-only utilities
export const defineWeatherWidgetElement = async () => {
  if (typeof window !== 'undefined' && typeof HTMLElement !== 'undefined' && typeof customElements !== 'undefined') {
    try {
      const { default: WeatherWidgetElement } = await import('./components/WeatherWidgetElement');
      
      if (!customElements.get('weather-widget')) {
        customElements.define('weather-widget', WeatherWidgetElement as CustomElementConstructor);
      }
    } catch (error) {
      console.warn('Failed to register weather-widget custom element:', error);
    }
  }
};

// For advanced usage - get the custom element class (browser-only)
export const getWeatherWidgetElement = () => {
  if (typeof window !== 'undefined' && typeof HTMLElement !== 'undefined') {
    return import('./components/WeatherWidgetElement').then(module => module.default);
  }
  return Promise.reject(new Error('WeatherWidgetElement is only available in browser environments'));
};
