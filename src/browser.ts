// Browser-safe exports for React web component widget
export type { WeatherWidgetProps } from './components/WeatherWidget';
export { default as WeatherWidget, default } from './components/WeatherWidget';

// Custom Element - only available in browser
let WeatherWidgetElement: typeof HTMLElement | undefined;

export const defineWeatherWidgetElement = async () => {
  if (typeof window !== 'undefined' && typeof HTMLElement !== 'undefined' && typeof customElements !== 'undefined') {
    if (!WeatherWidgetElement) {
      const module = await import('./components/WeatherWidgetElement');
      WeatherWidgetElement = module.default;
    }
    
    if (!customElements.get('weather-widget')) {
      customElements.define('weather-widget', WeatherWidgetElement as CustomElementConstructor);
    }
  }
};

// Named export for WeatherWidgetElement (browser-only)
export const getWeatherWidgetElement = () => {
  if (typeof window !== 'undefined' && typeof HTMLElement !== 'undefined') {
    return import('./components/WeatherWidgetElement').then(module => module.default);
  }
  return Promise.reject(new Error('WeatherWidgetElement is only available in browser environments'));
};
