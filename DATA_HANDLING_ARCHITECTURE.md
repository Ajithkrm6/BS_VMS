# 🔄 Data Handling Architecture - Complete Guide

**Date:** 2026-06-30  
**Status:** Production-Ready

---

## 📊 Data Flow Overview

Your authentication system uses a **3-tier hybrid approach**:

```
┌─────────────────────────────────────────────────────────────────┐
│  TIER 1: Redux Store (Primary - While App Running)              │
│  ├─ user: User | null                                           │
│  ├─ token: string | null                                        │
│  ├─ isAuthenticated: boolean                                    │
│  ├─ isLoading: boolean                                          │
│  └─ error: string | null                                        │
└─────────────────────────────────────────────────────────────────┘
                            ↕ (Syncs with)
┌─────────────────────────────────────────────────────────────────┐
│  TIER 2: localStorage (Secondary - Persistent)                  │
│  ├─ auth_token: "token_123..."                                  │
│  └─ auth_user: '{"id":"1","email":"...","name":"..."}'         │
└─────────────────────────────────────────────────────────────────┘
                            ↕ (Validated by)
┌─────────────────────────────────────────────────────────────────┐
│  TIER 3: Backend API (Source of Truth)                          │
│  └─ Validates token on app load                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 1️⃣ Redux Store (Primary Runtime State)

**File:** `app/stores/authSlice.ts`

**What's Stored:**

```typescript
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
  token: "token_1719768000000_0.8234...",
  isAuthenticated: true,
  isLoading: false,
  error: null
}
```

**When Updated:**

- ✅ After successful login
- ✅ After successful registration
- ✅ After session validation on app load
- ✅ After logout (cleared)
- ❌ NOT persisted across browser refresh (unless localStorage has it)

**Why Redux?**

- Centralized state management
- Easy access from any component
- Reactive updates (all components re-render when state changes)
- Time-travel debugging available
- Works seamlessly with React hooks

---

## 2️⃣ localStorage (Persistent Storage)

**File:** Browser Storage → DevTools → Application → Local Storage

**What's Stored:**

```javascript
// Key 1: auth_token
localStorage.getItem('auth_token');
// Value: "token_1719768000000_0.8234..."

// Key 2: auth_user
localStorage.getItem('auth_user');
// Value: '{"id":"1","email":"vendor@test.com","name":"John Vendor",...}'
```

**When Saved:**

- ✅ When login succeeds → `localStorage.setItem('auth_token', token)`
- ✅ When registration succeeds → `localStorage.setItem('auth_user', JSON.stringify(user))`
- ✅ Persists across browser refresh/close
- ❌ Cleared on logout → `localStorage.removeItem('auth_token')`

**Why localStorage?**

- Survives page refresh
- Survives browser close/reopen
- Stored in browser permanently (until manually cleared)
- Used to restore session after refresh

---

## 3️⃣ Backend API (Source of Truth)

**File:** `app/services/authAPI.ts`

**When Contacted:**

- 🔐 **Login** → Backend validates email/password
- 📝 **Register** → Backend creates user account
- ✅ **Validate Token** → Backend checks if token is still valid
- 🚪 **Logout** → Backend invalidates token

**How Validation Works on App Load:**

```typescript
// app/main.tsx - AppInitializer Component

1. Page loads
   ↓
2. Check localStorage for token
   └─ localStorage.getItem('auth_token')
   ↓
3. If token exists:
   └─ Call validateSession(token) to backend
   ↓
4. Backend responds:
   ├─ If valid: Update Redux with user data
   └─ If invalid: Clear localStorage, redirect to /auth
   ↓
5. If no token in localStorage:
   └─ User not logged in, redirect to /auth
```

---

## 🔄 Complete Data Flow: Login Example

### Step-by-Step Login Flow

```
USER ENTERS EMAIL/PASSWORD
        ↓
LoginForm.tsx calls useAuth().login(email, password)
        ↓
useAuth hook dispatches loginUser(email, password) action
        ↓
authSlice.ts receives action:
├─ Sets isLoading = true
├─ Clears error = null
        ↓
loginAPI(email, password) called (app/services/authAPI.ts)
├─ Makes API call to backend
├─ Backend validates credentials
├─ Backend returns: { user, token }
        ↓
Backend response received:
├─ authSlice.fulfilled handler runs
├─ Redux state updated:
│  ├─ user = { id, email, name, role, ... }
│  ├─ token = "token_1719..."
│  ├─ isAuthenticated = true
│  ├─ isLoading = false
│  ├─ error = null
├─ ALSO save to localStorage:
│  ├─ localStorage.setItem('auth_token', token)
│  ├─ localStorage.setItem('auth_user', JSON.stringify(user))
        ↓
LoginForm.tsx sees onAuthSuccess() called
        ↓
Redirects to home ("/")
        ↓
ProtectedRoute checks isAuthenticated
├─ Redux says isAuthenticated = true
├─ Allow access to Dashboard
        ↓
TopNavigation shows user info from Redux
├─ Displays: "John Vendor" (from Redux state.auth.user.name)
        ↓
LOGIN COMPLETE ✅
```

---

## 🔄 Complete Data Flow: Page Refresh

### Session Persistence on Refresh

```
USER REFRESHES PAGE (F5)
        ↓
App reloads in browser
        ↓
AppInitializer component runs (main.tsx)
├─ Called useEffect(() => { ... }, [])
        ↓
Check localStorage for token:
├─ const token = localStorage.getItem('auth_token')
├─ Found: "token_1719..."
        ↓
Dispatch validateSession(token) action
        ↓
validateSession thunk:
├─ Calls validateTokenAPI(token) - backend call
├─ Backend checks if token is still valid
        ↓
Backend responds:
├─ If valid: Returns user object
│  ├─ authSlice.fulfilled runs
│  ├─ Redux updated: user, token, isAuthenticated=true
│  ├─ Do NOT save again (already in localStorage)
│
├─ If invalid/expired: Returns error
│  ├─ authSlice.rejected runs
│  ├─ Redux cleared: user=null, token=null, isAuthenticated=false
│  ├─ localStorage.removeItem('auth_token')
│  ├─ Redirect to /auth
        ↓
setInitialized(true) - App ready
        ↓
Routes render
├─ ProtectedRoute checks isAuthenticated
├─ If true: Show dashboard
├─ If false: Redirect to /auth
        ↓
PAGE LOADED WITH SESSION RESTORED ✅
```

---

## 🔄 Complete Data Flow: Logout

### Clear All Traces

```
USER CLICKS LOGOUT (TopNavigation)
        ↓
TopNavigation.tsx calls useAuth().logout()
        ↓
useAuth hook dispatches logoutUser(token) action
        ↓
logoutUser thunk:
├─ Calls logoutAPI(token) - backend call
├─ Backend invalidates token
        ↓
Backend responds with success
        ↓
authSlice.fulfilled handler runs:
├─ Redux state cleared:
│  ├─ user = null
│  ├─ token = null
│  ├─ isAuthenticated = false
│  ├─ error = null
├─ localStorage cleared:
│  ├─ localStorage.removeItem('auth_token')
│  ├─ localStorage.removeItem('auth_user')
        ↓
ProtectedRoute detects isAuthenticated = false
        ↓
Redirect to "/auth" page
        ↓
LOGOUT COMPLETE ✅
```

---

## 📍 Data Storage Locations

### When User is Logged In

```
┌────────────────────────────────┐
│ Redux Store (In Memory)        │
├────────────────────────────────┤
│ ✅ user: { ... }               │
│ ✅ token: "token_..."          │
│ ✅ isAuthenticated: true       │
│ ✅ isLoading: false            │
│ ✅ error: null                 │
└────────────────────────────────┘
         (Synced with)
┌────────────────────────────────┐
│ localStorage (Persistent)      │
├────────────────────────────────┤
│ ✅ auth_token: "token_..."     │
│ ✅ auth_user: {...}            │
└────────────────────────────────┘
         (Validated by)
┌────────────────────────────────┐
│ Backend Database               │
├────────────────────────────────┤
│ ✅ User record                 │
│ ✅ Token mapping               │
│ ✅ Session tracking            │
└────────────────────────────────┘
```

### When User is NOT Logged In

```
┌────────────────────────────────┐
│ Redux Store (In Memory)        │
├────────────────────────────────┤
│ ❌ user: null                  │
│ ❌ token: null                 │
│ ❌ isAuthenticated: false      │
│ ✅ isLoading: false            │
│ ❌ error: null                 │
└────────────────────────────────┘

┌────────────────────────────────┐
│ localStorage (Persistent)      │
├────────────────────────────────┤
│ ❌ auth_token: (empty)         │
│ ❌ auth_user: (empty)          │
└────────────────────────────────┘

┌────────────────────────────────┐
│ Backend Database               │
├────────────────────────────────┤
│ ✅ User record exists          │
│ ❌ Token invalidated           │
└────────────────────────────────┘
```

---

## 🎯 Which Storage to Use? (For Developers)

### Use **Redux** When:

- ✅ Need real-time UI updates (user profile in header)
- ✅ Component needs to react to auth state changes
- ✅ Building UI that depends on user role/permissions
- ✅ Accessing from multiple components

**Example:**

```typescript
function TopNavigation() {
  const { user, logout } = useAuth();  // Reads from Redux

  return (
    <div>
      <p>{user?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Use **localStorage** When:

- ✅ Need to persist data across refresh
- ✅ App initialization (restore session)
- ✅ Don't need real-time updates
- ✅ Backend validation is enough

**Example:**

```typescript
// In AppInitializer
const token = localStorage.getItem('auth_token');
if (token) {
  dispatch(validateSession(token));
}
```

### Use **Redux + localStorage Together**:

- ✅ Best practice for auth systems
- ✅ Redux for runtime access
- ✅ localStorage for persistence
- ✅ Backend for validation (source of truth)

---

## 📋 Data Sync Summary

| Operation             | Redux                        | localStorage        | Backend             |
| --------------------- | ---------------------------- | ------------------- | ------------------- |
| **Login**             | ✅ Set user, token           | ✅ Save token, user | ✅ Validate creds   |
| **Page Refresh**      | ✅ Restore from localStorage | ✅ Provides token   | ✅ Validates token  |
| **Logout**            | ✅ Clear all                 | ✅ Clear all        | ✅ Invalidate token |
| **Real-time Updates** | ✅ Instant                   | ⏳ Requires save    | ⏳ API call         |
| **Persistence**       | ❌ Lost on refresh           | ✅ Survives refresh | ✅ Permanent        |

---

## 🔒 Security Considerations

### Current Implementation

```typescript
// ✅ Token stored in localStorage
localStorage.setItem('auth_token', token);

// ⚠️ User info also stored (JSON)
localStorage.setItem('auth_user', JSON.stringify(user));

// ✅ Token validated on app load
validateSession(token);

// ✅ Cleared on logout
localStorage.removeItem('auth_token');
```

### For Production:

1. **Use httpOnly Cookies** (more secure than localStorage)

   ```typescript
   // Instead of localStorage
   // Backend sets: Set-Cookie: auth_token=...; HttpOnly; Secure; SameSite=Strict
   ```

2. **Validate on Every Request**

   ```typescript
   // Every API call includes token
   // Backend validates before returning data
   ```

3. **Add Token Expiration**

   ```typescript
   // Token expires in 24 hours
   // Refresh token mechanism for renewal
   ```

4. **Add CSRF Protection**
   ```typescript
   // Include CSRF token with state-changing requests
   ```

---

## 🔍 Inspecting Data in Browser

### View Redux State

```javascript
// Browser Console
// If Redux DevTools installed
store.getState();
// Output:
// {
//   auth: {
//     user: {...},
//     token: "...",
//     isAuthenticated: true,
//     isLoading: false,
//     error: null
//   }
// }
```

### View localStorage

```javascript
// Browser Console
localStorage.getItem('auth_token');
// Output: "token_1719768000000_0.8234..."

localStorage.getItem('auth_user');
// Output: '{"id":"1","email":"vendor@test.com",...}'

// View all keys
Object.keys(localStorage);
// Output: ['auth_token', 'auth_user']
```

### View in DevTools

1. **Redux State:**
   - Open DevTools
   - Application tab → Redux tab (if Redux DevTools installed)

2. **localStorage:**
   - Open DevTools
   - Application tab → Local Storage → (your domain)
   - Shows all keys/values

---

## 📊 Data Architecture Diagram

```
                        ┌──────────────────┐
                        │   User Browser   │
                        └──────────────────┘
                                 │
                ┌────────────────┼────────────────┐
                │                │                │
                ▼                ▼                ▼
        ┌───────────────┐ ┌────────────┐ ┌──────────────┐
        │ Redux Store   │ │localStorage│ │React Router  │
        ├───────────────┤ ├────────────┤ ├──────────────┤
        │ • user        │ │ auth_token │ │ /auth        │
        │ • token       │ │ auth_user  │ │ /dashboard   │
        │ • isAuth      │ │            │ │ /protected   │
        │ • isLoading   │ │ [Persists] │ │              │
        │ • error       │ │            │ │ ProtectedRoute
        │               │ │            │ │ checks Redux │
        │ [Runtime]     │ │ [Refresh]  │ │ isAuth value │
        └───────────────┘ └────────────┘ └──────────────┘
                │                │                │
                └────────────────┼────────────────┘
                                 │
                        ┌────────────────┐
                        │  Components    │
                        ├────────────────┤
                        │ useAuth()      │
                        │ Reads: Redux   │
                        │ Writes: Redux  │
                        └────────────────┘
                                 │
                        ┌────────────────┐
                        │  Backend API   │
                        ├────────────────┤
                        │ POST /login    │
                        │ POST /register │
                        │ GET /validate  │
                        │ POST /logout   │
                        └────────────────┘
```

---

## ✨ Summary

| Layer             | Technology   | Purpose                                     | Persists? |
| ----------------- | ------------ | ------------------------------------------- | --------- |
| **Runtime State** | Redux Store  | Real-time UI updates, easy component access | ❌ No     |
| **Persistence**   | localStorage | Survives page refresh                       | ✅ Yes    |
| **Validation**    | Backend API  | Source of truth, token validation           | ✅ Yes    |

**Typical Flow:**

1. User logs in → Redux updates + save to localStorage
2. Page refreshes → Read from localStorage + validate with backend
3. User logs out → Clear Redux + clear localStorage
4. Components → Read from Redux (always available, real-time)
5. Backend → Validates token, source of truth

---

**Questions?**

- How much data should be stored where?
- Should we add token refresh logic?
- How to handle token expiration?
