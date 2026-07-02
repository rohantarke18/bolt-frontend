/*
# AI Discovery Platform — Core Schema

## Overview
Creates the database schema for an AI discovery directory (similar to "There's An AI For That").
The app is a public, no-auth directory — all data is intentionally shared/public.
No user_id columns, no auth.users references.

## New Tables

1. **categories** — AI tool categories (e.g. "Writing", "Coding", "Design")
   - id (uuid, PK)
   - name (text, unique, not null)
   - slug (text, unique, not null) — URL-friendly identifier
   - description (text)
   - icon_name (text) — Lucide icon name for the category
   - is_featured (boolean, default false) — shown on homepage
   - sort_order (int, default 0)
   - created_at (timestamptz)

2. **tasks** — Specific jobs users want done with AI (e.g. "Write blog posts", "Generate images")
   - id (uuid, PK)
   - name (text, unique, not null)
   - slug (text, unique, not null)
   - description (text)
   - is_popular (boolean, default false) — shown on homepage/tasks page
   - sort_order (int, default 0)
   - created_at (timestamptz)

3. **tools** — AI products/tools (e.g. "ChatGPT", "Midjourney")
   - id (uuid, PK)
   - name (text, not null)
   - slug (text, unique, not null)
   - description (text)
   - website_url (text)
   - logo_url (text) — optional logo image URL
   - pricing_type (text) — 'Free', 'Freemium', 'Paid', 'Free Trial'
   - created_at (timestamptz)

4. **tool_categories** — Many-to-many join between tools and categories
   - id (uuid, PK)
   - tool_id (uuid, FK → tools, ON DELETE CASCADE)
   - category_id (uuid, FK → categories, ON DELETE CASCADE)
   - UNIQUE(tool_id, category_id)

5. **tool_tasks** — Many-to-many join between tools and tasks
   - id (uuid, PK)
   - tool_id (uuid, FK → tools, ON DELETE CASCADE)
   - task_id (uuid, FK → tasks, ON DELETE CASCADE)
   - UNIQUE(tool_id, task_id)

## Security (RLS)
- All tables have RLS enabled.
- All policies use `TO anon, authenticated` with `USING (true)` / `WITH CHECK (true)` because
  this is a single-tenant public directory — all data is intentionally shared and readable/writable
  by the anon-key frontend client.

## Indexes
- Indexes on slug columns for fast lookups.
- Indexes on join table foreign keys.
- Indexes on featured/popular flags.
*/

-- ============================================================
-- CATEGORIES
-- ============================================================
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  icon_name text DEFAULT 'Sparkles',
  is_featured boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_categories" ON categories;
CREATE POLICY "anon_select_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_categories" ON categories;
CREATE POLICY "anon_insert_categories" ON categories FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_categories" ON categories;
CREATE POLICY "anon_update_categories" ON categories FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_categories" ON categories;
CREATE POLICY "anon_delete_categories" ON categories FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories (slug);
CREATE INDEX IF NOT EXISTS idx_categories_featured ON categories (is_featured) WHERE is_featured = true;

-- ============================================================
-- TASKS
-- ============================================================
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  is_popular boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_tasks" ON tasks;
CREATE POLICY "anon_select_tasks" ON tasks FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_tasks" ON tasks;
CREATE POLICY "anon_insert_tasks" ON tasks FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_tasks" ON tasks;
CREATE POLICY "anon_update_tasks" ON tasks FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_tasks" ON tasks;
CREATE POLICY "anon_delete_tasks" ON tasks FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_tasks_slug ON tasks (slug);
CREATE INDEX IF NOT EXISTS idx_tasks_popular ON tasks (is_popular) WHERE is_popular = true;

-- ============================================================
-- TOOLS
-- ============================================================
CREATE TABLE IF NOT EXISTS tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  website_url text,
  logo_url text,
  pricing_type text DEFAULT 'Freemium',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_tools" ON tools;
CREATE POLICY "anon_select_tools" ON tools FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_tools" ON tools;
CREATE POLICY "anon_insert_tools" ON tools FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_tools" ON tools;
CREATE POLICY "anon_update_tools" ON tools FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_tools" ON tools;
CREATE POLICY "anon_delete_tools" ON tools FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_tools_slug ON tools (slug);

-- ============================================================
-- TOOL_CATEGORIES (join)
-- ============================================================
CREATE TABLE IF NOT EXISTS tool_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id uuid NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  UNIQUE(tool_id, category_id)
);

ALTER TABLE tool_categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_tool_categories" ON tool_categories;
CREATE POLICY "anon_select_tool_categories" ON tool_categories FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_tool_categories" ON tool_categories;
CREATE POLICY "anon_insert_tool_categories" ON tool_categories FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_tool_categories" ON tool_categories;
CREATE POLICY "anon_update_tool_categories" ON tool_categories FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_tool_categories" ON tool_categories;
CREATE POLICY "anon_delete_tool_categories" ON tool_categories FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_tool_categories_tool ON tool_categories (tool_id);
CREATE INDEX IF NOT EXISTS idx_tool_categories_category ON tool_categories (category_id);

-- ============================================================
-- TOOL_TASKS (join)
-- ============================================================
CREATE TABLE IF NOT EXISTS tool_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id uuid NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
  task_id uuid NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  UNIQUE(tool_id, task_id)
);

ALTER TABLE tool_tasks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_tool_tasks" ON tool_tasks;
CREATE POLICY "anon_select_tool_tasks" ON tool_tasks FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_tool_tasks" ON tool_tasks;
CREATE POLICY "anon_insert_tool_tasks" ON tool_tasks FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_tool_tasks" ON tool_tasks;
CREATE POLICY "anon_update_tool_tasks" ON tool_tasks FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_tool_tasks" ON tool_tasks;
CREATE POLICY "anon_delete_tool_tasks" ON tool_tasks FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_tool_tasks_tool ON tool_tasks (tool_id);
CREATE INDEX IF NOT EXISTS idx_tool_tasks_task ON tool_tasks (task_id);
