# Backend Integration Plan — 4 Phases

Lovable Cloud is enabled. We'll build this in **4 sequential phases**, each fully working before moving to the next. No mid-phase scope creep.

---

## Phase 1 — Authentication

Players must sign in before joining a match.

**What we build**
- `profiles` table linked to `auth.users` (id, display_name, avatar_url, is_admin, created_at)
- DB trigger to auto-create profile on signup
- `user_roles` table + `app_role` enum (`admin`, `player`) + `has_role()` SECURITY DEFINER function (per security best practice — roles never on profiles)
- RLS: users read/update own profile; anyone can read display_name/avatar
- `/auth` page: email + password sign in / sign up, plus Google sign-in
- `useAuth` hook with `onAuthStateChange` listener (set up before `getSession`)
- `ProtectedRoute` wrapper — redirects unauthenticated users from `/` to `/auth`
- Sign-out button in `GameHeader`
- Auto-confirm email signups enabled (so testing is friction-free)

**Acceptance**: Can sign up, sign out, sign back in, land on the game. Unauthenticated visit to `/` redirects to `/auth`.

---

## Phase 2 — Asset Storage + Admin Page

Upload images to backend; admin configures available maps and unit sprites.

**What we build**
- Storage buckets:
  - `game-assets` (public) — sprites, map tiles, hero portraits
- Tables:
  - `assets` (id, name, category enum: `map`/`unit_sprite`/`building_sprite`/`hero_portrait`, storage_path, public_url, uploaded_by, created_at, is_active)
  - `maps` (id, name, asset_id FK, width, height, is_enabled, created_at)
  - `unit_sprite_configs` (id, unit_type, asset_id FK, is_default, is_enabled)
- RLS:
  - Anyone authenticated can SELECT assets/maps/sprite configs where `is_enabled = true`
  - Only admins (via `has_role(auth.uid(), 'admin')`) can INSERT/UPDATE/DELETE
- `/admin` route — gated by `has_role` check
  - Upload widget (drag & drop → storage bucket → row in `assets`)
  - Tabs: Maps | Unit Sprites | Building Sprites | Hero Portraits
  - Toggle `is_enabled`, set defaults, delete
- Game components read sprites/maps from DB instead of hardcoded paths (with fallback to current uploads)

**Acceptance**: Admin uploads an image, toggles a map on, the map appears in-game for all players. Non-admins get 403 on `/admin`.

---

## Phase 3 — Match State Persistence

Save resources, units, buildings, positions for ongoing games.

**What we build**
- Tables:
  - `matches` (id, host_id, map_id FK, status enum: `waiting`/`active`/`finished`, weather, created_at, started_at, ended_at)
  - `match_players` (id, match_id FK, user_id FK, hero_id, civilization, wood, stone, gold, joined_at)
  - `match_units` (id, match_id FK, owner_id FK, unit_type, x, y, health, training_progress, created_at)
  - `match_buildings` (id, match_id FK, owner_id FK, building_type, x, y, construction_progress, created_at)
  - `match_resource_nodes` (id, match_id FK, type, x, y, amount)
- RLS: only players in a match can read/write its rows; host can update match status
- Refactor `Index.tsx` to load match state from DB on mount and persist all mutations:
  - Resource gathers → UPDATE node + UPDATE match_players
  - Build/train placements → INSERT
  - Progress ticks → UPDATE (debounced/batched, every ~500ms not every 100ms)
- New `/lobby` page: list waiting matches, create match, join match
- "Resume match" picks up exactly where you left off

**Acceptance**: Place a building, refresh the page, building is still there with same progress.

---

## Phase 4 — Realtime Multiplayer Sync

All player actions broadcast to other clients via Supabase Realtime.

**What we build**
- Enable realtime publication on `match_units`, `match_buildings`, `match_resource_nodes`, `match_players`
- `useMatchRealtime(matchId)` hook subscribing to `postgres_changes` on those tables filtered by `match_id`
- Local optimistic updates + reconciliation from realtime payloads (last-write-wins keyed by row id)
- Presence channel per match → show online opponents in `GameHeader`
- Combat resolution moved to a `resolve-combat` edge function (server-authoritative for fairness) — called when units engage
- Match end detection (host edge function caller) sets `status='finished'`

**Acceptance**: Open the same match in two browsers signed in as different users — actions in one show up in the other within ~500ms.

---

## Technical Notes

- **Roles**: separate `user_roles` table + `has_role()` SECURITY DEFINER. Never check roles client-side or store on profiles.
- **Auth init order**: always `onAuthStateChange` listener first, then `getSession()`.
- **Storage**: `game-assets` bucket public for read; uploads only via authenticated admins (RLS on `storage.objects`).
- **Realtime cost**: filter subscriptions by `match_id` to avoid receiving unrelated updates.
- **No Supabase mentions**: UI copy says "Lovable Cloud" / "backend".

---

## What I will NOT do in this plan
- No new gameplay features (movement, combat AI, tech tree) — those wait until backend is solid, as you requested.
- No payments, no leaderboards, no chat — out of scope.

Approve to start with **Phase 1 (Authentication)**.