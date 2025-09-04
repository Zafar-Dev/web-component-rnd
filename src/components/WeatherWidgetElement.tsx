import React from 'react';
import { createCompatibleRoot, type CompatibleReactRoot } from '../utils/reactCompat';
import WeatherWidget, { type WeatherWidgetProps } from './WeatherWidget';

/**
 * Custom Element wrapper for WeatherWidget
 * This allows the widget to be used as a native web component
 * in any HTML page or framework
 */
class WeatherWidgetElement extends HTMLElement {
  private reactRoot: CompatibleReactRoot | null = null;
  private mountPoint: HTMLDivElement | null = null;

  static get observedAttributes() {
    return ['city', 'theme', 'show-forecast'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    if (this.reactRoot) {
      this.reactRoot.unmount().catch(() => {
        // Silently handle unmount errors
      });
      this.reactRoot = null;
    }
  }

  attributeChangedCallback() {
    if (this.isConnected) {
      this.render();
    }
  }

  private getProps(): WeatherWidgetProps {
    return {
      city: this.getAttribute('city') || 'London',
      theme: (this.getAttribute('theme') as 'light' | 'dark') || 'light',
      showForecast: this.getAttribute('show-forecast') !== 'false',
      style: {
        width: '100%',
        height: '100%'
      }
    };
  }

  private render() {
    if (!this.shadowRoot) return;

    if (!this.mountPoint) {
      this.mountPoint = document.createElement('div');
      this.mountPoint.style.width = '100%';
      this.mountPoint.style.height = '100%';
      this.mountPoint.style.display = 'block';
      this.shadowRoot.appendChild(this.mountPoint);
    }

    this.reactRoot ??= createCompatibleRoot(this.mountPoint);

    const props = this.getProps();
    this.reactRoot.render(React.createElement(WeatherWidget, props)).catch((error) => {
      console.warn('Failed to render weather widget element:', error);
    });
  }
}

export default WeatherWidgetElement;
