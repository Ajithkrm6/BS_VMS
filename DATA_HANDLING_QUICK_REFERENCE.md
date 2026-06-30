# 🎯 Data Handling - Quick Reference

## 🏗️ 3-Tier Architecture (Current Implementation)

```
┌─────────────────────────────────────────────────────┐
│ TIER 1: Redux Store (Primary - During Session)     │
│                                                      │
│ state.auth = {                                      │
│   user: { id, email, name, role, ... },             │
│   token: "token_xyz",                               │
│   isAuthenticated: true,                            │
│   isLoading: false,                                 │
│   error: null                                       │
│ }                                                    │
└─────────────────────────────────────────────────────┘
                     ↕
              (Synced at key points)
                     ↕
┌─────────────────────────────────────────────────────┐
│ TIER 2: Browser localStorage (Backup Persistence)  │
│                                                      │
│ localStorage = {                                    │
│   "auth_token": "token_xyz",                        │
│   "auth_user": "{...}"                              │
│ }                                                    │
└─────────────────────────────────────────────────────┘
                     ↕
              (Validated at startup)
                     ↕
┌─────────────────────────────────────────────────────┐
│ TIER 3: Backend API (Source of Truth)               │
│                                                      │
│ POST /auth/login        → Validate credentials      │
│ POST /auth/register     → Create account            │
│ GET /auth/validate      → Check if token valid      │
│ POST /auth/logout       → Invalidate token          │
└─────────────────────────────────────────────────────┘
```

---

## 📌 Key Mechanisms

### 1️⃣ LOGIN - How Data Flows

```typescript
// User fills form and clicks Login
LoginForm.tsx
  ↓
const { login } = useAuth();  // Get login function from custom hook
  ↓
await login('vendor@test.com', 'vendor123')
  ↓
useAuth() dispatches: loginUser({ email, password })  // to Redux
  ↓
Redux authSlice receives action:
  • Sets: isLoading = true
  • Calls: loginAPI(email, password)  // Backend call
  ↓
Backend validates and returns:
  {
    user: { id: "1", email: "vendor@test.com", ... },
    token: "token_123..."
  }
  ↓
Redux authSlice.fulfilled runs:
  • Sets: state.auth.user = user object
  • Sets: state.auth.token = token
  • Sets: state.auth.isAuthenticated = true
  • Sets: state.auth.isLoading = false
  ✅ ALSO SAVES TO localStorage:
     • localStorage.setItem('auth_token', token)
     • localStorage.setItem('auth_user', JSON.stringify(user))
  ↓
Component gets callback that login succeeded
  ↓
Redirects to home page
  ↓
Redux ProtectedRoute checks: state.auth.isAuthenticated
  • Finds: true
  • Allows: User to see dashboard
```

---

### 2️⃣ PAGE REFRESH - How Session Persists

```typescript
// User refreshes browser (F5)
Page reloads
  ↓
app/main.tsx loads
  ↓
AppInitializer component runs
  ↓
useEffect checks: localStorage.getItem('auth_token')
  ↓
FOUND! → "token_xyz"
  ↓
Calls: dispatch(validateSession('token_xyz'))
  ↓
Redux validateSession thunk runs:
  • Calls: validateTokenAPI('token_xyz')  // Backend call
  ↓
Backend checks if token still valid
  ↓
If VALID → Returns user object
  ↓
Redux authSlice.fulfilled runs:
  • Sets: state.auth.user = user (from backend)
  • Sets: state.auth.token = token
  • Sets: state.auth.isAuthenticated = true
  • NOTE: Does NOT save again (already in localStorage)
  ↓
AppInitializer sets: initialized = true
  ↓
Routes render
  ↓
ProtectedRoute checks: state.auth.isAuthenticated
  • Finds: true
  • Shows: Dashboard (user stays logged in! ✅)
```

---

### 3️⃣ LOGOUT - How Data is Cleared

```typescript
// User clicks Logout button
TopNavigation.tsx
  ↓
const { logout } = useAuth()
  ↓
await logout()
  ↓
Redux dispatches: logoutUser(token)
  ↓
Redux logoutUser thunk runs:
  • Calls: logoutAPI(token)  // Backend call
  ↓
Backend invalidates token (makes it unusable)
  ↓
Redux authSlice.fulfilled runs:
  ✅ Clears Redux state:
     • state.auth.user = null
     • state.auth.token = null
     • state.auth.isAuthenticated = false
     • state.auth.error = null

  ✅ Clears localStorage:
     • localStorage.removeItem('auth_token')
     • localStorage.removeItem('auth_user')
  ↓
Component redirects to: /auth
  ↓
Next time user tries to access protected route:
  • ProtectedRoute checks: state.auth.isAuthenticated
  • Finds: false
  • Redirects: /auth (login page)
```

---

## 🔍 Where to Find Data

### In Your Redux Store (In-Memory)

```javascript
// Browser Console → Type:
store.getState().auth

// Output:
{
  user: {
    id: "1",
    email: "vendor@test.com",
    name: "John Vendor",
    role: "vendor",
    company: "ABC Logistics",
    phone: "+1234567890",
    verified: true
  },
  token: "token_1719768000000_0.8234567890",
  isAuthenticated: true,
  isLoading: false,
  error: null
}
```

### In Browser's localStorage

```javascript
// Browser Console → Type:
localStorage

// Output (as object):
Storage {
  auth_token: "token_1719768000000_0.8234567890",
  auth_user: '{"id":"1","email":"vendor@test.com","name":"John Vendor",...}',
  length: 2
}

// Access specific values:
localStorage.getItem('auth_token')
// → "token_1719768000000_0.8234567890"

localStorage.getItem('auth_user')
// → '{"id":"1","email":"vendor@test.com",...}'
```

### In Browser's DevTools

1. **Redux State:**
   - DevTools → Application → Redux (if extension installed)
   - Shows: All Redux state, action history, time-travel

2. **localStorage:**
   - DevTools → Application → Local Storage → (your domain)
   - Shows: All stored key-value pairs
   - Can: Delete, edit, inspect

---

## ⚡ Real Code Examples

### Example 1: Accessing User in a Component

```typescript
import { useAuth } from '~/hooks/useAuth';

function UserProfile() {
  const { user, isAuthenticated, logout } = useAuth();
  // useAuth reads directly from Redux state.auth

  if (!isAuthenticated) {
    return <p>Not logged in</p>;
  }

  return (
    <div>
      <p>Name: {user?.name}</p>           {/* From Redux */}
      <p>Email: {user?.email}</p>         {/* From Redux */}
      <p>Role: {user?.role}</p>           {/* From Redux */}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Example 2: Checking if User is Vendor

```typescript
const { isVendor, hasRole } = useAuth();

// Method 1:
if (isVendor) {
  // Show vendor-specific features
}

// Method 2:
if (hasRole('vendor')) {
  // Same thing, more flexible
}

// Method 3:
if (hasRole(['vendor', 'admin'])) {
  // Multiple roles
}
```

### Example 3: Protecting Routes

```typescript
// In app/main.tsx
<Route
  path="/admin"
  element={
    <ProtectedRoute requiredRoles={['admin']}>
      <AdminPanel />
    </ProtectedRoute>
  }
/>

// If user is:
// ✅ Authenticated + Admin role → Show AdminPanel
// ❌ Not authenticated → Redirect to /auth
// ❌ Authenticated but not Admin → Show "Access Denied"
```

---

## 📊 Data Summary Table

| Question                                                | Answer                                            |
| ------------------------------------------------------- | ------------------------------------------------- |
| **Where is user data stored while app is running?**     | Redux store (state.auth.user)                     |
| **Where is token stored for security?**                 | localStorage + Redux                              |
| **How does app remember me after refresh?**             | localStorage provides token, backend validates it |
| **What happens on logout?**                             | Redux cleared + localStorage cleared              |
| **Which tier is the source of truth?**                  | Backend (validates token on app load)             |
| **Can I access Redux from any component?**              | Yes, via useAuth() hook                           |
| **Do I need to manually sync Redux with localStorage?** | No, authSlice handles it automatically            |
| **What if token is invalid after refresh?**             | localStorage cleared, user redirected to /auth    |

---

## 🎯 Component Access Pattern

```
Any Component
    ↓
import { useAuth } from '~/hooks/useAuth'
    ↓
const { user, isAuthenticated, login, logout, ... } = useAuth()
    ↓
useAuth hook reads from Redux store
    ↓
Redux state.auth contains: user, token, isAuthenticated, etc.
    ↓
Component renders with user data (reactive updates)
    ↓
User clicks "Logout"
    ↓
logout() action dispatched
    ↓
Redux state updated → localStorage cleared → Page reacts
```

---

## ✨ Best Practices Used

✅ **Redux for Runtime** - Fast, reactive, easy to access  
✅ **localStorage for Persistence** - Survives refresh  
✅ **Backend Validation** - Source of truth, security  
✅ **Custom Hook** - Clean API for components  
✅ **Async Thunks** - Handle API calls automatically  
✅ **Auto-sync** - Redux ↔ localStorage synchronized

---

**Think of it like:**

- 🧠 **Redux** = Your app's brain (what it knows right now)
- 💾 **localStorage** = Your app's memory (what it remembers)
- 🔒 **Backend** = The real record keeper (proof of identity)
