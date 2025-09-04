/**
 * React Namespace Isolation Utilities
 * These utilities ensure our bundled React doesn't conflict with host React
 */
import * as React from 'react';
import type * as ReactDOMClient from 'react-dom/client';

// Save reference to our isolated React instance
let isolatedReact: typeof React | null = null;
let isolatedReactDOM: typeof ReactDOMClient | null = null;

/**
 * Initialize isolated React namespace
 * This should be called once when the library is loaded
 */
export const initializeIsolatedReact = async () => {
  if (isolatedReact && isolatedReactDOM) {
    return { React: isolatedReact, ReactDOM: isolatedReactDOM };
  }

  try {
    // Import React dynamically to avoid conflicts during module loading
    const ReactModule = await import('react');
    const ReactDOMModule = await import('react-dom/client');
    
    isolatedReact = ReactModule;
    isolatedReactDOM = ReactDOMModule;
    
    return { React: ReactModule, ReactDOM: ReactDOMModule };
  } catch (error) {
    console.error('Failed to initialize isolated React:', error);
    throw error;
  }
};

/**
 * Get isolated React instance
 */
export const getIsolatedReact = () => {
  if (!isolatedReact) {
    throw new Error('Isolated React not initialized. Call initializeIsolatedReact() first.');
  }
  return isolatedReact;
};

/**
 * Get isolated ReactDOM instance
 */
export const getIsolatedReactDOM = () => {
  if (!isolatedReactDOM) {
    throw new Error('Isolated ReactDOM not initialized. Call initializeIsolatedReact() first.');
  }
  return isolatedReactDOM;
};

/**
 * Execute function with isolated React context
 */
export const withIsolatedReact = async <T>(
  fn: (React: typeof import('react'), ReactDOM: typeof import('react-dom/client')) => T
): Promise<T> => {
  const { React, ReactDOM } = await initializeIsolatedReact();
  return fn(React, ReactDOM);
};

/**
 * Create a React component factory that uses isolated React
 */
export const createIsolatedComponent = <P extends object>(
  componentFn: (React: typeof import('react')) => React.ComponentType<P>
) => {
  return (props: P) => {
    const [Component, setComponent] = React.useState<React.ComponentType<P> | null>(null);

    React.useEffect(() => {
      withIsolatedReact((IsolatedReact) => {
        const IsolatedComponent = componentFn(IsolatedReact);
        setComponent(() => IsolatedComponent);
      }).catch(console.error);
    }, []);

    if (!Component) {
      return React.createElement('div', null, 'Loading...');
    }

    return React.createElement(Component, props);
  };
};
