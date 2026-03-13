# In-Sync Service Agent — Portal Deployment Checklist

Deploy the service agent to any client portal in ~10 minutes.

## Prerequisites

- Agent backend is deployed and running (shared across all portals)
- Backend URL known (e.g. `https://insync-agent.azurewebsites.net`)
- Portal domain added to `ALLOWED_ORIGINS` in Azure App Service settings

## Per-Portal Deployment Steps

### 1. Copy agent module files into the portal repo

Copy these files/folders into the target portal:

```
src/components/ServiceAgent/
  ├── FloatingAgent.tsx
  ├── ServiceAgent.css
  └── supabaseAgent.ts

src/pages/
  ├── SupportPage.tsx
  └── SupportAdmin.tsx
```

### 2. Set the PROJECT_NAME environment variable

In the portal's Azure Static Web Apps environment settings, set:

```
VITE_AGENT_API_URL=https://insync-agent.azurewebsites.net
```

The `PROJECT_NAME` is set on the shared backend per request — it reads from the backend's `.env`. For multi-portal, each portal's tickets are tagged by the backend's `PROJECT_NAME`.

### 3. Add FloatingAgent to App.jsx/App.tsx

Add the import at the top:
```tsx
import FloatingAgent from "@/components/ServiceAgent/FloatingAgent";
```

Add the component inside the root provider (before `<BrowserRouter>` or equivalent):
```tsx
<FloatingAgent />
```

### 4. Add /support and /support/admin routes

Add the imports:
```tsx
import SupportPage from "./pages/SupportPage";
import SupportAdmin from "./pages/SupportAdmin";
```

Add the routes (before the catch-all `*` route):
```tsx
<Route path="/support" element={<SupportPage />} />
<Route path="/support/admin" element={<SupportAdmin />} />
```

### 5. Add portal domain to ALLOWED_ORIGINS

In Azure App Service → Configuration → Application settings, update `ALLOWED_ORIGINS`:

```
in-sync.co.in,wa.in-sync.co.in,newportal.example.com
```

Comma-separated, no spaces.

### 6. Deploy

Push changes and let the portal's CI/CD pipeline deploy.

### 7. Verify

- [ ] Floating chat widget appears on all pages (bottom-right corner)
- [ ] `/support` page loads with capability cards and chat
- [ ] `/support/admin` shows OTP gate
- [ ] Raising a ticket returns a ticket ID
- [ ] Ticket appears in Supabase with correct `project_name`
