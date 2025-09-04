import * as React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import WeatherWidget, { type WeatherWidgetProps } from './WeatherWidget';

/**
 * Isolated React Context Manager
 * This creates a completely isolated React context that doesn't interfere with host React
 */
class IsolatedReactContext {
  private static instance: IsolatedReactContext | null = null;
  private containerMap = new WeakMap<HTMLElement, Root>();

  static getInstance(): IsolatedReactContext {
    if (!IsolatedReactContext.instance) {
      IsolatedReactContext.instance = new IsolatedReactContext();
    }
    return IsolatedReactContext.instance;
  }

  createRoot(container: HTMLElement): Root {
    if (this.containerMap.has(container)) {
      return this.containerMap.get(container)!;
    }

    const root = createRoot(container);
    this.containerMap.set(container, root);
    return root;
  }

  unmountRoot(container: HTMLElement): void {
    const root = this.containerMap.get(container);
    if (root) {
      root.unmount();
      this.containerMap.delete(container);
    }
  }
}

/**
 * Isolated React Component
 * This component renders in its own React context, completely isolated from host React
 */
export class IsolatedWeatherWidget {
  private container: HTMLDivElement;
  private root: Root;
  private contextManager: IsolatedReactContext;

  constructor(props: WeatherWidgetProps = {}) {
    this.contextManager = IsolatedReactContext.getInstance();
    
    // Create container
    this.container = document.createElement('div');
    this.container.style.width = '100%';
    this.container.style.height = '100%';
    this.container.style.display = 'block';
    
    // Create isolated React root
    this.root = this.contextManager.createRoot(this.container);
    
    // Initial render
    this.render(props);
  }

  private render(props: WeatherWidgetProps): void {
    this.root.render(React.createElement(WeatherWidget, props));
  }

  public updateProps(props: WeatherWidgetProps): void {
    this.render(props);
  }

  public getElement(): HTMLElement {
    return this.container;
  }

  public destroy(): void {
    this.contextManager.unmountRoot(this.container);
  }
}

/**
 * React Component Wrapper for Host Applications
 * This creates a bridge between the host React app and our isolated React component
 */
export const NamespacedWeatherWidget: React.FC<WeatherWidgetProps> = (props) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isolatedWidgetRef = React.useRef<IsolatedWeatherWidget | null>(null);

  React.useEffect(() => {
    if (containerRef.current && !isolatedWidgetRef.current) {
      // Create isolated widget
      isolatedWidgetRef.current = new IsolatedWeatherWidget(props);
      containerRef.current.appendChild(isolatedWidgetRef.current.getElement());
    }

    return () => {
      if (isolatedWidgetRef.current) {
        isolatedWidgetRef.current.destroy();
        isolatedWidgetRef.current = null;
      }
    };
    // Only run on mount/unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (isolatedWidgetRef.current) {
      isolatedWidgetRef.current.updateProps(props);
    }
  }, [props]);

  return React.createElement('div', {
    ref: containerRef,
    style: props.style,
    className: props.className
  });
};

export default NamespacedWeatherWidget;
