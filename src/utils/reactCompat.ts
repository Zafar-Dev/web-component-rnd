import React from 'react';

// Type definitions for React 18+ createRoot API
interface ReactRoot {
  render: (element: React.ReactElement) => void;
  unmount: () => void;
}

type CreateRootFunction = (container: Element | DocumentFragment) => ReactRoot;

// Legacy ReactDOM types for React 17
interface LegacyReactDOM {
  render: (element: React.ReactElement, container: Element) => void;
  unmountComponentAtNode: (container: Element) => boolean;
}

// Global variables to track React API availability
let createRoot: CreateRootFunction | undefined;
let ReactDOM: LegacyReactDOM | undefined;
let hasCreateRoot = false;

// Simplified React API detection using only dynamic imports
const initializeReactAPI = async () => {
  // First try to load the modern React 18+ API
  try {
    const reactDomClient = await import('react-dom/client');
    if (reactDomClient.createRoot) {
      createRoot = reactDomClient.createRoot;
      hasCreateRoot = true;
      return; // Success with modern API
    }
  } catch {
    // react-dom/client not available, continue to legacy
  }

  // Fallback to React 17 legacy API
  try {
    const reactDom = await import('react-dom');
    // Use type assertion since React 19 types don't include legacy methods
    const legacyReactDOM = reactDom as unknown as LegacyReactDOM;
    if (typeof legacyReactDOM.render === 'function' && typeof legacyReactDOM.unmountComponentAtNode === 'function') {
      ReactDOM = legacyReactDOM;
      hasCreateRoot = false;
    }
  } catch (error) {
    console.error('Failed to load ReactDOM:', error);
  }
};

// Initialize immediately
initializeReactAPI().catch((error) => {
  console.warn('React API initialization failed:', error);
});

// Initialize immediately
initializeReactAPI().catch((error) => {
  console.warn('React API initialization failed:', error);
});

/**
 * Cross-compatible React root management
 * Supports both React 17 (legacy) and React 18+ (concurrent) APIs
 */
export class CompatibleReactRoot {
  private readonly container: Element | DocumentFragment;
  private modernRoot: ReactRoot | null = null;

  constructor(container: Element | DocumentFragment) {
    this.container = container;
  }

  private async ensureReactAPILoaded(): Promise<void> {
    // If we don't have either API yet, wait for initialization
    if (!hasCreateRoot && !ReactDOM) {
      await initializeReactAPI();
    }
  }

  async render(element: React.ReactElement): Promise<void> {
    await this.ensureReactAPILoaded();

    if (hasCreateRoot && createRoot) {
      // React 18+ concurrent rendering
      this.modernRoot ??= createRoot(this.container);
      this.modernRoot.render(element);
    } else if (ReactDOM) {
      // React 17 legacy rendering
      ReactDOM.render(element, this.container as Element);
    } else {
      console.error('No React rendering API available. Please ensure React and ReactDOM are properly installed.');
    }
  }

  async unmount(): Promise<void> {
    await this.ensureReactAPILoaded();

    if (this.modernRoot) {
      // React 18+ concurrent unmounting
      this.modernRoot.unmount();
      this.modernRoot = null;
    } else if (ReactDOM) {
      // React 17 legacy unmounting
      ReactDOM.unmountComponentAtNode(this.container as Element);
    }
  }

  static isReact18Plus(): boolean {
    return hasCreateRoot;
  }
}

/**
 * Factory function to create a compatible React root
 */
export function createCompatibleRoot(container: Element | DocumentFragment): CompatibleReactRoot {
  return new CompatibleReactRoot(container);
}

/**
 * Check React version compatibility
 */
export function getReactVersion(): string {
  return React.version || 'unknown';
}

/**
 * Check if we're using React 18+ features
 */
export function supportsModernReact(): boolean {
  return hasCreateRoot;
}
