## 🔗 Important Links

### 🛡️ Auth

- **Better Auth Docs (Frontend client)**  
  https://www.better-auth.com/docs/concepts/client

### 🗺️ Routing

- **Tanstack Router**  
  https://tanstack.com/router/latest/docs/framework/react/overview

### ⚙️ Async State (Queries and Mutations)

- **Tanstack Query**  
  https://tanstack.com/query/latest/docs/framework/react/overview

- **Better Fetch**
  https://better-fetch.vercel.app/docs

### 🎨 UI

- **Shadcn**
  https://ui.shadcn.com/docs

- **Tailwind (v4)**
  https://tailwindcss.com/docs/installation/using-vite

### 🧩 Zod (v4)

> _Note: Always import from `zod/v4`_

- **Zod v4 Docs**  
  https://zod.dev/v4

---

## 🚀 Auth Flow Overview

We’re combining **TanStack Router**, **TanStack Query**, **better-auth** and **better-fetch** to build a fast, network efficient, flash-free authentication flow.

### 🏠 1. Root Component & `beforeLoad`

- The **root route** wraps the entire app, (will get matched for every route)
- A `beforeLoad` hook fetches the current session **before** any UI renders
- UI waits until the session is known—**no flashing** between screens 🎉
- The fetched session is stored in the **route context**, making it available to every child route

### 🌐 2. Session Caching & Context

- **TanStack Query** caches the session for **5 minutes** ⏳
- Within that window, all navigations reuse the **cached** session for instant loading
- Session lives in the **context object**, so any component or route can read it

### 🔄 3. Sign In / Sign Out / Sign Up

- Authentication actions use **mutations** (e.g. sign-in, sign-out, sign-up)
- Upon success:
  1. The session-related mutation updates credentials (e.g. tokens) 🔑
  2. The **session query is invalidated** to mark it stale ❗
  3. A programatic navigation to the desired page is fired off
  4. A fresh session is refetched automatically 🔄 (session query was invalidated)

### 🚫 4. 401 Handling & Forced Re-Auth

- If **any** backend request returns **401 Unauthorized**:
  1. Invalidate the cached session ❌
  2. Reset or redirect the router to the login / root route 🔀
  3. `beforeLoad` refires and fetches a new session 🔄
