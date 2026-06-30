# 🎨 Visual Quick Reference - Vendor Management Module & Feature Flag Cheat Sheet

This is a quick reference for copy-paste patterns. For detailed explanations, see **DEVELOPERS_COMPLETE_GUIDE.md**.

---

## 🚀 5-Minute Module Creation

### Step 1: Create Feature Flag (2 minutes)

**File: `app/utils/featureFlags.ts`**

```typescript
// ADD THIS to FEATURE_FLAGS object:
myModule: {
  name: 'myModule',
  enabled: false,                              // Start disabled
  description: 'What does this module do?',
  rolloutPercentage: 100,                      // Will be 100% when enabled
  targetEnvironments: ['development', 'staging', 'production'],
  config: {
    // Your config here
    maxItems: 50
  },
  dependencies: ['core', 'vehicleManagement']  // What it needs
}
```

**Enable it:** Create `.env.local`

```env
VITE_FF_MY_MODULE=true
```

### Step 2: Create Folder Structure (1 minute)

```bash
mkdir -p app/modules/myModule/{components,pages,stores,services,types,hooks}
```

### Step 3: Copy Template Files (2 minutes)

**File: `app/modules/myModule/types/myModule.ts`**

```typescript
export interface MyData {
  id: string;
  name: string;
  createdAt: string;
}
```

**File: `app/modules/myModule/services/myModuleAPI.ts`**

```typescript
export const myModuleAPI = {
  async getAll() {
    const res = await fetch('/api/mymodule');
    return res.json();
  },
};
```

**File: `app/modules/myModule/stores/myModuleSlice.ts`**

```typescript
import { createSlice } from '@reduxjs/toolkit';

const initialState = { items: [], isLoading: false };

export const myModuleSlice = createSlice({
  name: 'myModule',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export default myModuleSlice.reducer;
```

**File: `app/modules/myModule/pages/MyModulePage.tsx`**

```typescript
import { useAppSelector } from '~/stores';

export function MyModulePage() {
  const items = useAppSelector(state => state.myModule.items);

  return (
    <div className="p-4">
      <h1>My Module</h1>
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

**File: `app/modules/myModule/module.config.ts`**

```typescript
import { lazy } from 'react';
import myModuleReducer from './stores/myModuleSlice';
import type { ModuleConfig } from '~/utils/moduleRegistry';

export const myModuleConfig: ModuleConfig = {
  name: 'myModule',
  version: '1.0.0',
  featureFlag: 'myModule',
  description: 'My module description',
  dependencies: ['core'],
  routes: [
    {
      path: '/my-module',
      component: lazy(() =>
        import('./pages/MyModulePage').then((m) => ({ default: m.MyModulePage }))
      ),
      name: 'My Module',
      icon: '📦',
      order: 5,
    },
  ],
  stores: [{ name: 'myModule', reducer: myModuleReducer }],
};
```

### Step 4: Register Module (1 minute)

**File: `app/main.tsx`**

```typescript
import { moduleRegistry } from '~/utils/moduleRegistry';
import { myModuleConfig } from './modules/myModule/module.config';

// Register it
moduleRegistry.registerModule(myModuleConfig);
```

### Step 5: Test It!

```bash
npm run dev
# Visit: http://localhost:5173/my-module
```

---

## 🎯 Using Feature Flags

### Pattern 1: Simple Check

```typescript
import { useFeature } from '~/hooks/useFeature';

if (useFeature('featureName')) {
  // Show feature
}
```

### Pattern 2: Component Gate

```typescript
import { FeatureGate } from '@/FeatureFlags/FeatureGate';

<FeatureGate feature="featureName">
  <MyComponent />
</FeatureGate>
```

### Pattern 3: With Fallback

```typescript
<FeatureGate
  feature="featureName"
  fallback={<p>Coming soon</p>}
>
  <MyComponent />
</FeatureGate>
```

### Pattern 4: Multiple Features

```typescript
<MultiFeatureGate
  features={['feature1', 'feature2']}
  logic="AND"  // or "OR"
>
  <MyComponent />
</MultiFeatureGate>
```

### Pattern 5: Get Config

```typescript
import { useFeatureConfig } from '~/hooks/useFeature';

const config = useFeatureConfig('myModule');
const maxItems = config?.maxItems || 50;
```

---

## 📋 Common Files Templates

### Module Config Template

```typescript
import { lazy } from 'react';
import reducer from './stores/mySlice';
import type { ModuleConfig } from '~/utils/moduleRegistry';

export const myConfig: ModuleConfig = {
  name: 'myModule',
  version: '1.0.0',
  featureFlag: 'myModule',
  description: 'Description',
  dependencies: ['core'],
  routes: [
    {
      path: '/path',
      component: lazy(() => import('./pages/Page')),
      name: 'Name',
      icon: '📦',
      order: 5,
    },
  ],
  stores: [{ name: 'myModule', reducer }],
};
```

### Redux Slice Template

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  items: any[];
  isLoading: boolean;
  error: string | null;
}

const initial: State = { items: [], isLoading: false, error: null };

export const mySlice = createSlice({
  name: 'myModule',
  initialState: initial,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    setItems: (state, action: PayloadAction<any[]>) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setLoading, setItems, setError } = mySlice.actions;
export default mySlice.reducer;
```

### Component Template

```typescript
import { Card, CardHeader, CardTitle, CardContent } from '@/Common/Card';
import { Button } from '@/Common/Button';

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={onAction}>Action</Button>
      </CardContent>
    </Card>
  );
}
```

### API Service Template

```typescript
export const myAPI = {
  async getAll() {
    const res = await fetch('/api/endpoint');
    return res.json();
  },

  async create(data: any) {
    const res = await fetch('/api/endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async update(id: string, data: any) {
    const res = await fetch(`/api/endpoint/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async delete(id: string) {
    const res = await fetch(`/api/endpoint/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  },
};
```

---

## 🎨 Component Patterns

### List Component

```typescript
import { Card, CardHeader, CardTitle, CardContent } from '@/Common/Card';

interface Item { id: string; name: string; }

export function ItemList({ items }: { items: Item[] }) {
  return (
    <Card>
      <CardHeader><CardTitle>Items</CardTitle></CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
```

### Form Component

```typescript
import { useState } from 'react';
import { Input } from '@/Common/Input';
import { Button } from '@/Common/Button';

export function MyForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [data, setData] = useState({ name: '' });

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(data); }}>
      <Input
        label="Name"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### Feature Toggle Component

```typescript
import { useFeature } from '~/hooks/useFeature';

export function FeatureUI() {
  const isEnabled = useFeature('myFeature');

  return isEnabled ? (
    <div>Feature is ON ✅</div>
  ) : (
    <div>Feature is OFF ❌</div>
  );
}
```

---

## ⚙️ Environment Configuration

### Development

```env
VITE_APP_ENV=development
VITE_DEBUG_FEATURE_FLAGS=true
VITE_FF_MY_MODULE=true
VITE_FF_MY_MODULE_ROLLOUT=100
```

### Staging

```env
VITE_APP_ENV=staging
VITE_FF_MY_MODULE=true
VITE_FF_MY_MODULE_ROLLOUT=50
```

### Production

```env
VITE_APP_ENV=production
VITE_FF_MY_MODULE=true
VITE_FF_MY_MODULE_ROLLOUT=100
```

---

## 🧪 Testing Checklist

### Before Deployment

- [ ] Module works with feature enabled
- [ ] Fallback UI works with feature disabled
- [ ] No console errors
- [ ] TypeScript compiles: `npm run type-check`
- [ ] Builds successfully: `npm run build`

### Testing Feature Flag

- [ ] Set to enabled locally
- [ ] Test functionality
- [ ] Set to disabled
- [ ] Test fallback appears
- [ ] Test gradual rollout (5%, 25%, 100%)

### Load Testing

- [ ] App loads under 2 seconds
- [ ] No memory leaks
- [ ] No infinite loops
- [ ] Works offline (with Query cache)

---

## 🐛 Debug Commands

### Check if Feature is Enabled

```javascript
// In browser console:
window.__featureFlags?.isEnabled('myModule');
```

### Get All Enabled Features

```javascript
window.__featureFlags?.getEnabledFeatures();
```

### Get Feature Config

```javascript
window.__featureFlags?.getConfig('myModule');
```

### Override Feature (Dev Only)

```javascript
window.__featureFlags?.override('myModule', true);
```

### Check Redux State

```javascript
// Redux DevTools or:
window.__REDUX_DEVTOOLS_EXTENSION__?.
```

### View Network Requests

```
F12 → Network tab → See API calls
```

---

## 📦 Deployment Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run type-check       # TypeScript validation
npm run lint             # Check for errors
npm run lint:fix         # Auto-fix errors
npm run format           # Format code
npm run format:check     # Check formatting
```

---

## ✅ Quick Troubleshooting

| Problem             | Solution                                        |
| ------------------- | ----------------------------------------------- |
| Feature not showing | Enable in .env.local, restart server            |
| Build fails         | Run `npm run type-check`, fix errors            |
| Module not loading  | Check featureFlag in config, check dependencies |
| Redux errors        | Import correctly: `~/stores` not `./stores`     |
| Component errors    | Check props, use TypeScript for type safety     |
| Performance slow    | Check Network tab, reduce bundle size           |

---

## 🎯 Workflow Summary

### Add New Feature (5 minutes)

1. Add to FEATURE_FLAGS
2. Create module folder
3. Copy templates
4. Enable in .env.local
5. Test at localhost:5173

### Deploy Feature (1 minute)

1. Code ready with feature DISABLED
2. Deploy to production
3. Enable for 5% users (monitor)
4. Enable for 25% users (gather feedback)
5. Enable for 100% users (done)

### Remove Feature (2 minutes)

1. Disable in FEATURE_FLAGS
2. Deploy
3. Remove code after 2 weeks
4. Deploy again

---

## 🚀 Pro Tips

✅ **Keep modules small** - One feature per module
✅ **Use TypeScript** - Catch bugs early
✅ **Test disabled states** - Don't assume
✅ **Document configs** - Help future you
✅ **Monitor rollouts** - Watch the analytics
✅ **Clean up old code** - Don't accumulate technical debt
✅ **Ask for code review** - Learn from seniors
✅ **Follow patterns** - Consistency is key

---

## 📞 Help Resources

1. **Read This First**: DEVELOPERS_COMPLETE_GUIDE.md
2. **Examples**: app/examples/FeatureGateExamples.tsx
3. **Integration**: app/FEATURE_FLAGS_GUIDE.md
4. **Production**: PRODUCTION_VALIDATION_REPORT.md
5. **Ask**: Slack/Team channel or senior developer

---

**Print this page for quick reference! 📄**

_Happy coding! 🚀_
