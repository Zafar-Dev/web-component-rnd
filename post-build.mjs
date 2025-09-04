// post-build.mjs - Fix type declarations after build
import { writeFileSync } from 'fs';

const typeDeclarations = `import React from 'react';

export interface WeatherWidgetProps {
  city?: string;
  theme?: 'light' | 'dark';
  showForecast?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export declare const WeatherWidget: React.FC<WeatherWidgetProps>;
export declare const defineWeatherWidgetElement: () => Promise<void>;
export declare const getWeatherWidgetElement: () => Promise<typeof HTMLElement>;

// Compatibility utilities
export declare function getReactVersion(): string;
export declare function supportsModernReact(): boolean;

declare const _default: React.FC<WeatherWidgetProps>;
export default _default;
`;

// Write the correct type declarations
writeFileSync('dist/index.d.ts', typeDeclarations);
console.log('✅ Type declarations fixed with React 17/19 compatibility!');
