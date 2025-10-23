#!/bin/bash
# Integration Script for Modern ROI Calculator
# This script copies files from ringsnap2/integration to ringsnap

set -e  # Exit on error

echo "🚀 Modern ROI Calculator Integration Script"
echo "============================================"
echo ""

# Check if we're in the right directory
if [ ! -d "integration" ]; then
    echo "❌ Error: integration directory not found"
    echo "Please run this script from the ringsnap2 repository root"
    exit 1
fi

# Ask for target directory
read -p "Enter the path to your ringsnap repository: " RINGSNAP_PATH

# Validate target directory
if [ ! -d "$RINGSNAP_PATH" ]; then
    echo "❌ Error: Directory '$RINGSNAP_PATH' not found"
    exit 1
fi

if [ ! -d "$RINGSNAP_PATH/src" ]; then
    echo "❌ Error: '$RINGSNAP_PATH' doesn't look like a React project (no src/ folder)"
    exit 1
fi

echo ""
echo "📂 Target directory: $RINGSNAP_PATH"
echo ""

# Create backup
echo "💾 Creating backup of existing EmergencyCalculator.tsx..."
if [ -f "$RINGSNAP_PATH/src/components/EmergencyCalculator.tsx" ]; then
    cp "$RINGSNAP_PATH/src/components/EmergencyCalculator.tsx" \
       "$RINGSNAP_PATH/src/components/EmergencyCalculator.tsx.backup"
    echo "✅ Backup created: EmergencyCalculator.tsx.backup"
else
    echo "⚠️  No existing EmergencyCalculator.tsx found (this might be ok)"
fi

echo ""
echo "📋 Copying component files..."

# Copy all component files
cp integration/EmergencyCalculator.tsx "$RINGSNAP_PATH/src/components/"
echo "✅ EmergencyCalculator.tsx"

cp integration/AnimatedCounter.tsx "$RINGSNAP_PATH/src/components/"
echo "✅ AnimatedCounter.tsx"

cp integration/CircularProgress.tsx "$RINGSNAP_PATH/src/components/"
echo "✅ CircularProgress.tsx"

cp integration/ModernSlider.tsx "$RINGSNAP_PATH/src/components/"
echo "✅ ModernSlider.tsx"

cp integration/TradeSelector.tsx "$RINGSNAP_PATH/src/components/"
echo "✅ TradeSelector.tsx"

cp integration/ROIChart.tsx "$RINGSNAP_PATH/src/components/"
echo "✅ ROIChart.tsx"

echo ""
echo "🎨 CSS Integration Instructions:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Add the contents of integration/CUSTOM_STYLES.css to your global CSS file"
echo "(usually src/index.css or src/App.css)"
echo ""
echo "You can view the CSS file here: integration/CUSTOM_STYLES.css"

echo ""
echo "📦 Installing dependencies..."
cd "$RINGSNAP_PATH"

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found in target directory"
    exit 1
fi

# Install dependencies
if command -v npm &> /dev/null; then
    echo "Using npm..."
    npm install framer-motion recharts
elif command -v yarn &> /dev/null; then
    echo "Using yarn..."
    yarn add framer-motion recharts
else
    echo "❌ Error: Neither npm nor yarn found"
    exit 1
fi

echo ""
echo "✅ Dependencies installed!"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 Integration Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 Next Steps:"
echo "1. Add CSS from integration/CUSTOM_STYLES.css to your global CSS"
echo "2. Run: npm run dev"
echo "3. Test the calculator"
echo "4. Commit and push your changes"
echo ""
echo "📚 Documentation:"
echo "- integration/README.md - Quick start guide"
echo "- integration/MIGRATION_GUIDE.md - Detailed instructions"
echo "- integration/CHECKLIST.md - Testing checklist"
echo "- integration/COMPARISON.md - Before/after comparison"
echo ""
echo "🔄 Rollback:"
echo "If needed, restore: mv src/components/EmergencyCalculator.tsx.backup src/components/EmergencyCalculator.tsx"
echo ""
