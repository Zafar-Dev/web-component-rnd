import WeatherWidgetElement from '../components/WeatherWidgetElement';

/**
 * Register the WeatherWidget as a custom element
 * This allows you to use <weather-widget> tags in any HTML
 */
export const defineWeatherWidgetElement = () => {
  if (typeof window !== 'undefined' && typeof customElements !== 'undefined' && !customElements.get('weather-widget')) {
    customElements.define('weather-widget', WeatherWidgetElement as CustomElementConstructor);
  }
};

/**
 * Auto-register the custom element if we're in a browser environment
 * This makes the component available immediately when imported
 */
if (typeof window !== 'undefined' && typeof customElements !== 'undefined') {
  defineWeatherWidgetElement();
}
