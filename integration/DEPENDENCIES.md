# Required Dependencies

## New Dependencies to Install

Run this command in your project root:

```bash
npm install framer-motion recharts
```

Or with yarn:

```bash
yarn add framer-motion recharts
```

## Package.json Changes

Add these to your `dependencies` section:

```json
{
  "dependencies": {
    "framer-motion": "^11.0.0",
    "recharts": "^2.12.0"
  }
}
```

## Existing Dependencies (Verify These Exist)

Make sure these are already in your project:

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "lucide-react": "^0.300.0",
    "tailwindcss": "^3.0.0"
  }
}
```

## Dependency Details

### Framer Motion (^11.0.0)
- **Purpose:** Smooth animations and transitions
- **Size:** ~200KB (gzipped: ~50KB)
- **Used for:**
  - Animated counters with spring physics
  - Entrance animations
  - Micro-interactions
  - Confetti effects

### Recharts (^2.12.0)
- **Purpose:** Data visualization
- **Size:** ~400KB (gzipped: ~120KB)
- **Used for:**
  - Revenue comparison bar chart
  - Responsive charts

## Total Bundle Impact

- Combined size: ~600KB (~170KB gzipped)
- Load time impact: Minimal with code splitting
- Tree-shakeable: Yes, only used components are bundled

## Peer Dependencies

Both packages work with:
- React 16.8+
- React DOM 16.8+

Your existing React 18 setup is perfect!

## Optional: Code Splitting

To reduce initial bundle size, you can lazy load the calculator:

```tsx
import { lazy, Suspense } from 'react';

const EmergencyCalculator = lazy(() =>
  import('./components/EmergencyCalculator')
);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmergencyCalculator />
    </Suspense>
  );
}
```

## TypeScript

Both packages include TypeScript definitions, no additional `@types` packages needed!
