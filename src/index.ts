// Main exports for React web component widget with namespace isolation
export type { WeatherWidgetProps } from './components/WeatherWidget';

// Export the namespaced React component as the main component
export { NamespacedWeatherWidget as WeatherWidget, NamespacedWeatherWidget as default } from './components/NamespacedWeatherWidget';

// Export the isolated widget class for advanced usage
export { IsolatedWeatherWidget } from './components/NamespacedWeatherWidget';

// Export namespace utilities for advanced use cases
export { 
  initializeIsolatedReact, 
  withIsolatedReact, 
  createIsolatedComponent 
} from './utils/reactNamespace';

// Browser-only utilities (keeping custom element support for non-React usage)
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
