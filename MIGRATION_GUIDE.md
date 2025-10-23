# Migration Guide: Modern ROI Calculator

## Overview
This guide will help you replace the existing `EmergencyCalculator.tsx` with the modernized version.

## Step 1: Install New Dependencies

Add these dependencies to your `package.json`:

```bash
npm install framer-motion recharts
# or
yarn add framer-motion recharts
```

Update your `package.json` to include:
```json
{
  "dependencies": {
    "framer-motion": "^11.0.0",
    "recharts": "^2.12.0"
  }
}
```

## Step 2: Add Custom CSS

Add these styles to your global CSS file (likely `src/index.css` or `src/App.css`):

```css
/* Smooth number transitions */
.metric-number {
  font-variant-numeric: tabular-nums;
  transition: all 0.3s ease-out;
}

/* Glass morphism effect */
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.dark .glass {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

## Step 3: Copy New Component Files

Copy these new files into your project:

### Components to Add (in `src/components/` or your component directory):
1. `AnimatedCounter.tsx`
2. `CircularProgress.tsx`
3. `ModernSlider.tsx`
4. `TradeSelector.tsx`
5. `ROIChart.tsx`

### Component to Replace:
6. `EmergencyCalculator.tsx` (Replace existing)

## Step 4: File Structure

Your component directory should look like:
```
src/components/
├── ui/
│   ├── card.tsx (existing)
│   ├── button.tsx (existing)
│   └── ... (other existing UI components)
├── EmergencyCalculator.tsx (REPLACE THIS)
├── EmailCaptureModal.tsx (existing, keep as-is)
├── AnimatedCounter.tsx (NEW)
├── CircularProgress.tsx (NEW)
├── ModernSlider.tsx (NEW)
├── TradeSelector.tsx (NEW)
└── ROIChart.tsx (NEW)
```

## Step 5: Verify Imports

The new `EmergencyCalculator.tsx` maintains the same exports and props, so it should be a drop-in replacement. Verify that wherever you import it, it still works:

```tsx
import { EmergencyCalculator } from "@/components/EmergencyCalculator";
```

## Step 6: Test

1. Run your development server
2. Navigate to the calculator section
3. Test all interactions:
   - Trade selection
   - Slider adjustments
   - Responsive behavior on mobile
   - Email modal trigger

## What's New?

### Visual Changes
- Split-screen layout (desktop)
- Glass-morphism effects
- Animated counters
- Circular ROI progress ring
- Interactive revenue comparison chart
- Smooth transitions and micro-interactions

### Technical Changes
- Uses Framer Motion for animations
- Uses Recharts for data visualization
- Custom slider component with better visual feedback
- More engaging mobile experience

## Rollback

If you need to rollback, simply:
1. Remove the new component files
2. Restore the old `EmergencyCalculator.tsx` from git
3. Remove the new dependencies (optional)

## Troubleshooting

### Issue: Build errors about missing modules
**Solution:** Make sure you ran `npm install` after adding dependencies

### Issue: Styles look broken
**Solution:** Verify the custom CSS was added to your global stylesheet

### Issue: Components not rendering
**Solution:** Check that all component files were copied to the correct directory

### Issue: TypeScript errors
**Solution:** Your TypeScript version should be 5.0+, check `tsconfig.json`

## Support

If you encounter issues:
1. Check the console for errors
2. Verify all files were copied correctly
3. Ensure dependencies are installed
4. Check that file paths match your project structure
