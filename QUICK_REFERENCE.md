# 🚀 Quick Start: Using Feature Flags

## 5-Minute Setup

### Step 1: Create `.env.local`

```bash
copy .env.example .env.local
```

### Step 2: Start Development

```bash
npm run dev
```

### Step 3: Add Feature to Component

```typescript
import { FeatureGate } from '@/FeatureFlags/FeatureGate';

export function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>

      <FeatureGate feature="advancedReporting">
        <ReportingSection />
      </FeatureGate>
    </>
  );
}
```

### Step 4: Enable in Environment

```env
# In .env.local
VITE_FF_ADVANCED_REPORTING=true
```

### Step 5: Test in Browser

- Feature appears when enabled
- Feature disappears when disabled
- Refresh to see changes

**Done! Feature flag is working! ✅**

---

## Common Patterns

### Pattern 1: Simple Check

```typescript
const isEnabled = featureFlagManager.isEnabled('featureName');
```

### Pattern 2: Component Gate

```typescript
<FeatureGate feature="featureName">
  <Component />
</FeatureGate>
```

### Pattern 3: Hook-based

```typescript
const isEnabled = useFeature('featureName');
return isEnabled ? <Active /> : null;
```

### Pattern 4: With Fallback

```typescript
<FeatureGate
  feature="featureName"
  fallback={<p>Coming soon</p>}
>
  <Component />
</FeatureGate>
```

### Pattern 5: Multiple Features

```typescript
<MultiFeatureGate
  features={['feature1', 'feature2']}
  logic="AND"  // or "OR"
>
  <Component />
</MultiFeatureGate>
```

---

## Environment Variables

### Feature Flags (Append to .env.local)

```env
VITE_FF_ADVANCED_REPORTING=true
VITE_FF_REAL_TIME_UPDATES=false
VITE_FF_DARK_MODE=true
```

### Rollout Percentage

```env
VITE_FF_ADVANCED_REPORTING=true
VITE_FF_REPORTING_ROLLOUT=50    # 50% of users
```

### Debugging

```env
VITE_DEBUG_FEATURE_FLAGS=true   # Shows debug UI
```

---

## Testing Features

### In Development

1. Open debug panel (bottom-right corner)
2. See all features and status
3. Override flags for testing

### In Production

```typescript
// Set user identifier for consistent rollout
featureFlagManager.setUserIdentifier(userId);
```

---

## Features Available

| Feature             | Default  | Rollout |
| ------------------- | -------- | ------- |
| authentication      | Enabled  | 100%    |
| vehicleManagement   | Enabled  | 100%    |
| maintenanceTracking | Enabled  | 100%    |
| advancedReporting   | Disabled | 50%     |
| darkMode            | Enabled  | 100%    |
| realTimeUpdates     | Disabled | 25%     |
| notificationSystem  | Enabled  | 100%    |
| exportFeature       | Enabled  | 75%     |

---

## Examples

All examples are in `app/examples/`:

- `FeatureGateExamples.tsx` - 6 component examples
- `FeatureHooksExamples.tsx` - 7 hook examples

Copy and modify for your use case!

---

## Troubleshooting

### Feature not showing?

1. Check `.env.local` has `VITE_FF_FEATURE_NAME=true`
2. Restart dev server (`npm run dev`)
3. Refresh browser

### Feature always enabled?

- Check 'enabled' in `FEATURE_FLAGS` config
- Check rollout percentage
- Check dependencies

### Type errors?

- Run `npm run type-check`
- Import from `~/utils/featureFlags`

---

## Deploy to Production

### Phase 1: Staging

```env
VITE_APP_ENV=staging
VITE_FF_NEW_FEATURE=true
VITE_FF_NEW_FEATURE_ROLLOUT=10
```

### Phase 2: Canary (5%)

```env
VITE_FF_NEW_FEATURE_ROLLOUT=5
```

### Phase 3: Beta (50%)

```env
VITE_FF_NEW_FEATURE_ROLLOUT=50
```

### Phase 4: GA (100%)

```env
VITE_FF_NEW_FEATURE_ROLLOUT=100
```

---

## More Information

- 📚 Full Guide: `FEATURE_FLAGS_GUIDE.md`
- 🏗️ Architecture: `ARCHITECTURE.md`
- 📦 Setup: `SETUP_COMPLETE.md`
- 💻 Examples: `app/examples/`

---

**Ready to build? 🚀**

```bash
npm run dev
```

Happy coding! 🎉
