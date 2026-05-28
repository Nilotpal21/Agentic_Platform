# 12 — Authentication & Session

**Implements BRD §9.21 Authentication & Session.**

Every authenticated route is shell-wrapped (`AppShell`) and requires a live session. Pre-auth routes do not. This file specifies the pre-auth surfaces and the in-app session affordances.

## Pre-auth routes

| Route | Purpose |
|---|---|
| `/login` | Sign-in form (email + password + MFA) and SSO entry buttons |
| `/login/sso/[idp]` | SSO redirect (decorative for prototype — bounces to `/auth/callback`) |
| `/auth/callback` | SSO callback (decorative — immediately routes to home with auth state set) |
| `/auth/error` | Auth failure surface |
| `/forgot-password` | Password reset request |
| `/reset-password/[token]` | Single-use reset form |
| `/invite/[token]` | Invitation acceptance (set up account + MFA + project membership) |

Pre-auth routes render **without `AppShell`** — they get a minimal centered layout instead. No sidebar, no topbar, no Helper FAB (the pre-auth Helper if implemented per FR-AUT-13 is a tiny separate component).

## Screen 1: Sign-in (`/login`)

### Layout

- Full-viewport centered card (max-width 420px), `bg-background-elevated`, soft border, ~32px padding.
- Above the card: large Eltropy logo (the same `/eltropy-logo.png`), centered.
- Below the card: small footer with `Privacy · Terms · Need help?` links.

### Card contents

1. Heading: *"Sign in to Eltropy"*
2. Sub: *"Build, evaluate, and deploy credit-union AI apps."*

3. **SSO buttons** — one per configured IdP. For the prototype:
   - **Continue with Cornerstone SSO** (primary button, full-width, with Lucide `KeyRound` icon)
   - Smaller text below: *"Federated via your credit union's identity provider."*

4. Divider: *"or sign in with email"*

5. Email input (with built-in icon)
6. Password input (with show/hide toggle)
7. **Sign in** primary button (full-width)
8. Below: *"Forgot password?"* link → `/forgot-password`

### MFA challenge (state on `/login`)

After clicking Sign in or Continue with SSO, the card transitions to the MFA challenge:

- Heading: *"Verify it's you"*
- Sub: *"Enter the 6-digit code from your authenticator app."*
- 6-digit OTP input (six character boxes)
- "Use a different method" link (opens a popover with options: TOTP, passkey, IdP-asserted, SMS fallback if configured)
- **Verify** primary button
- "Back to sign in" link

### Click model

| Element | Action |
|---|---|
| "Continue with Cornerstone SSO" | Sets auth state to authenticated as `processOwner`, routes to `/` |
| "Sign in" (email + password) | Transitions card to MFA challenge state |
| MFA "Verify" | Sets auth state to authenticated, routes to `/` (or `?next=` if set) |
| "Forgot password?" | → `/forgot-password` |

## Screen 2: Forgot password (`/forgot-password`)

- Same centered card layout
- Heading: *"Reset your password"*
- Email input
- **Send reset link** button
- On submit: card transitions to a success state: *"If that email exists, we've sent a reset link. Check your inbox."*
- "Back to sign in" link

## Screen 3: Reset password (`/reset-password/[token]`)

- Heading: *"Set a new password"*
- New password input + confirm input
- **Reset password** button → success state → "Sign in" link

## Screen 4: Invitation acceptance (`/invite/[token]`)

- Heading: *"You've been invited to Cornerstone FCU's Card Services project"*
- Sub: *"Role: Process Owner. Set up your account and enable MFA to continue."*
- Step indicator: 1) Account · 2) MFA · 3) Done
- **Step 1 — Account**: name, password set, accept terms checkbox
- **Step 2 — MFA**: enroll TOTP (QR code mock + 6-digit confirmation)
- **Step 3 — Done**: *"You're in."* + "Open Eltropy" primary button → `/`

## In-app session affordances

These live within `AppShell` (specified in `01-app-shell-and-dashboard.md`) and are exercised in the Topbar PersonaSwitcher:

### Sign out

In the Persona menu (`01-app-shell-and-dashboard.md`), the **Sign out** item:
- If any unsaved work is detected, opens a small confirmation Dialog: *"You have unsaved changes. Sign out anyway?"*
- On confirm: clears auth state, broadcasts via `BroadcastChannel` to other tabs, routes to `/login` with a toast: *"Signed out. See you again."*

### Persona switching

Already specified in `01-app-shell-and-dashboard.md`. The switch is allowed without re-auth **only** when the underlying user has multiple roles. For the prototype:
- Switching between Process Owner / Reviewer / Admin is treated as "this is a demo persona switch" and is allowed instantly with a toast: *"Now viewing as <persona>."*

### Step-up re-auth (sensitive actions)

When the user attempts a sensitive action (Deploy app, Approve app, Modify baseline guardrail, Rotate model credential, Modify project membership):
- A modal Dialog appears: *"Confirm with your authenticator"*
- 6-digit OTP input
- **Confirm** button → on success, the underlying action proceeds; the auth state records the timestamp of last step-up
- "Cancel" button → action aborted; user remains on the same page

For the prototype, the OTP input accepts any 6 digits.

### Idle lock

After the configured idle timeout (for the prototype, set to a demo-friendly 5 minutes; production default per BRD is 30 minutes), a full-viewport overlay appears:

- Centered card on a `bg-background/85 backdrop-blur` overlay
- Heading: *"You've been signed out for inactivity"*
- Sub: *"Confirm it's still you to continue."*
- 6-digit OTP input (or "Continue with SSO" button)
- **Resume session** primary button → unlocks and dismisses overlay; unsaved work preserved
- "Sign out" link → clears state, routes to `/login`

The overlay is dismissible only via re-auth, never by clicking outside.

### Cross-tab logout

When the user signs out in one tab, all other tabs receive a `BroadcastChannel` message and show the idle-lock overlay (with a "Your session ended in another tab" sub-line instead of the default).

### Admin-initiated revocation

When a CU Admin revokes a session in Settings (future surface), affected user sees the idle-lock overlay with sub-line: *"Your session was ended by an administrator. Sign in again to continue."*

## Auth state shape (mock)

```ts
// lib/auth.ts (zustand store)
export interface AuthState {
  isAuthenticated: boolean;
  signedInAt: string | null;      // ISO; null when signed out
  lastStepUpAt: string | null;    // for sensitive-action gating
  idleLock: boolean;              // when true, AppShell shows the overlay
  authMethod: 'sso' | 'password' | null;
}
```

For the prototype, default is `isAuthenticated: true` so the demo lands directly on the dashboard. The `/login` route is reachable explicitly via the persona menu's "Sign out" action.

## Click model summary

| Element | Action |
|---|---|
| `/login` SSO button | Sets auth → `/` |
| `/login` Sign in (after password) | Transitions to MFA |
| `/login` MFA Verify | Sets auth → `/` |
| Forgot password Send | Card transitions to success state |
| Reset password Reset | Card transitions to success state → `/login` |
| Invitation steps | Walks 3 steps → `/` |
| Persona menu "Sign out" | Clears auth → `/login` |
| Sensitive action invocation | Step-up Dialog → action proceeds on confirm |
| Idle (5 min demo) | Idle-lock overlay |
| Idle lock "Resume session" | Overlay closes; auth retained |
| Idle lock "Sign out" | Clears auth → `/login` |

## States to render

- **Default (signed in)** — most demo time spent here; reaches dashboard directly.
- **Signed out** — `/login` reachable explicitly; AppShell does not render until sign-in completes.
- **MFA challenge** — `/login` card in MFA state.
- **Idle lock** — overlay (testable by forcing the state from a debug toggle if useful, or by waiting out the 5-minute timer).
- **Step-up modal** — visible when invoking a sensitive action.

## Out of scope

- Real IdP integration; real password storage; real MFA; real session tokens.
- Lockout / rate-limiting behavior (visual only).
- Reset-link email delivery.
- Real cross-tab `BroadcastChannel` wiring (the visible effect can be faked by a button in the persona menu that toggles idle lock).
- Per-user session history view (FR-AUT-15) — deferred.

## Acceptance criteria

- `/login` renders centered with logo above, SSO button + password fallback, MFA challenge state.
- `/forgot-password`, `/reset-password/[token]`, `/invite/[token]` render with their respective flows.
- AppShell guard redirects unauthenticated users to `/login?next=<original>` and back on sign-in.
- Persona menu "Sign out" clears auth and routes to `/login`.
- Idle-lock overlay can be triggered (via a developer affordance or timer) and resumed.
- Step-up modal can be triggered (Deploy app, Approve app) and dismissed.
