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

// Check if we're using React 18+ (has createRoot)
let createRoot: CreateRootFunction | undefined;
let legacyReactDOM: LegacyReactDOM | undefined;
let hasCreateRoot = false;

// Initialize React API detection
const initializeReactAPI = async () => {
  try {
    // Try to import createRoot from react-dom/client (React 18+)
    const reactDomClient = await import('react-dom/client');
    createRoot = reactDomClient.createRoot;
    hasCreateRoot = true;
  } catch {
    // Fall back to legacy ReactDOM.render for React 17
    try {
      const reactDom = await import('react-dom');
      legacyReactDOM = reactDom as unknown as LegacyReactDOM;
      hasCreateRoot = false;
    } catch (error) {
      console.warn('Failed to import ReactDOM:', error);
    }
  }
};

// Initialize immediately
initializeReactAPI().catch(console.warn);

/**
 * Cross-compatible React root management
 * Supports both React 17 (legacy) and React 18+ (concurrent) APIs
 */
export class CompatibleReactRoot {
  private container: Element | DocumentFragment;
  private modernRoot: ReactRoot | null = null;
  private isLegacy: boolean;
  private isInitialized = false;

  constructor(container: Element | DocumentFragment) {
    this.container = container;
    this.isLegacy = !hasCreateRoot;
  }

  private async ensureInitialized(): Promise<void> {
    if (this.isInitialized) return;

    if (!hasCreateRoot && !legacyReactDOM) {
      await initializeReactAPI();
      this.isLegacy = !hasCreateRoot;
    }

    if (!this.isLegacy && createRoot && !this.modernRoot) {
      this.modernRoot = createRoot(this.container);
    }

    this.isInitialized = true;
  }

  async render(element: React.ReactElement): Promise<void> {
    await this.ensureInitialized();

    if (this.isLegacy && legacyReactDOM) {
      // React 17 legacy rendering
      legacyReactDOM.render(element, this.container as Element);
    } else if (this.modernRoot) {
      // React 18+ concurrent rendering
      this.modernRoot.render(element);
    }
  }

  async unmount(): Promise<void> {
    await this.ensureInitialized();

    if (this.isLegacy && legacyReactDOM) {
      // React 17 legacy unmounting
      legacyReactDOM.unmountComponentAtNode(this.container as Element);
    } else if (this.modernRoot) {
      // React 18+ concurrent unmounting
      this.modernRoot.unmount();
      this.modernRoot = null;
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
