-- ============================================================
-- Akro Ventures — Supabase Database Schema
-- Run this once in Supabase → SQL Editor → New Query → Run
-- ============================================================


-- ── 1. CONTACT SUBMISSIONS ───────────────────────────────────
create table if not exists contact_submissions (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  name            text not null,
  email           text not null,
  phone           text not null,
  company         text,
  industry        text,
  revenue_lakhs   integer,
  funding_amount  text,
  message         text
);

-- Index for quick lookup by email / date
create index if not exists idx_contact_email      on contact_submissions (email);
create index if not exists idx_contact_created_at on contact_submissions (created_at desc);

-- Row Level Security — anon can INSERT only, cannot read or modify
alter table contact_submissions enable row level security;

create policy "anon insert contact"
  on contact_submissions
  for insert
  to anon
  with check (true);


-- ── 2. NEWSLETTER SUBSCRIPTIONS ──────────────────────────────
create table if not exists newsletter_subscriptions (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  email       text not null unique
);

-- Index for duplicate check
create index if not exists idx_newsletter_email on newsletter_subscriptions (email);

-- Row Level Security — anon can INSERT only
alter table newsletter_subscriptions enable row level security;

create policy "anon insert newsletter"
  on newsletter_subscriptions
  for insert
  to anon
  with check (true);


-- ── 3. LOAN AUDIT SUBMISSIONS ────────────────────────────────
create table if not exists loan_audit_submissions (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  phone       text not null,
  q1_answer   text,
  q2_answer   text,
  q3_answer   text,
  q4_answer   text,
  score       integer,          -- 0–100, stored internally, never shown to user
  contacted   boolean default false  -- team marks true once they've called
);

create index if not exists idx_audit_email      on loan_audit_submissions (email);
create index if not exists idx_audit_created_at on loan_audit_submissions (created_at desc);
create index if not exists idx_audit_contacted  on loan_audit_submissions (contacted);

alter table loan_audit_submissions enable row level security;

create policy "anon insert audit"
  on loan_audit_submissions
  for insert
  to anon
  with check (true);


-- ── 4. SERVICE ASSESSMENT SUBMISSIONS ───────────────────────
-- Unified table for all 6 interactive service tool flows.
-- service_type discriminates which tool the submission came from.
-- answers is jsonb — stores per-question label + points, fully queryable.
create table if not exists service_assessments (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  service_type text not null,           -- e.g. 'unsecured-loans', 'startup-fundraising'
  name         text not null,
  email        text not null,
  phone        text not null,
  company      text,
  answers      jsonb not null default '{}',  -- { "vintage": { "label": "2-5 years", "points": 17 }, ... }
  score        integer not null,             -- 0–100 readiness percentage
  result_tier  text not null,               -- 'high' | 'mid' | 'low'
  max_score    integer,                     -- total possible points (for internal audit)
  contacted    boolean default false        -- team marks true once actioned
);

create index if not exists idx_assessments_service_type on service_assessments (service_type);
create index if not exists idx_assessments_email        on service_assessments (email);
create index if not exists idx_assessments_created_at   on service_assessments (created_at desc);
create index if not exists idx_assessments_tier         on service_assessments (result_tier);
create index if not exists idx_assessments_contacted    on service_assessments (contacted);

alter table service_assessments enable row level security;

create policy "anon insert service assessment"
  on service_assessments
  for insert
  to anon
  with check (true);


-- ── DONE ─────────────────────────────────────────────────────
-- Tables: contact_submissions, newsletter_subscriptions,
--         loan_audit_submissions, service_assessments
-- All with RLS enabled and anon insert-only policies.
-- service_assessments uses jsonb answers for flexible, schema-free
-- question storage — add new services without schema migrations.
