import { mkdirSync } from "fs"
import path from "path"
import { DatabaseSync } from "node:sqlite"
import type { LeadInput } from "@/lib/lead-schema"

export const LEAD_INBOX_PATH = "/ops/inbox/r7k2m9qx4w"

export type StoredLead = LeadInput & {
  id: string
  createdAt: string
}

type LeadRow = {
  id: string
  created_at: string
  first_name: string
  last_name: string
  email: string
  phone: string
  company: string
  website: string
  country: string
  listings: string
  pms: string
  automate: string
  notes: string
}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT NOT NULL,
  website TEXT NOT NULL,
  country TEXT NOT NULL,
  listings TEXT NOT NULL,
  pms TEXT NOT NULL,
  automate TEXT NOT NULL,
  notes TEXT NOT NULL
)`

function openDatabase() {
  const candidates = [
    path.join(process.cwd(), "data", "leads.sqlite"),
    path.join("/tmp", "talktogenie", "leads.sqlite"),
  ]
  let lastError: unknown
  for (const file of candidates) {
    try {
      mkdirSync(path.dirname(file), { recursive: true })
      const db = new DatabaseSync(file)
      db.exec(SCHEMA)
      return { db, file, ephemeral: file.startsWith("/tmp") }
    } catch (error) {
      lastError = error
    }
  }
  throw lastError
}

let cached: ReturnType<typeof openDatabase> | null = null

function database() {
  if (!cached) cached = openDatabase()
  return cached
}

export function storeLead(lead: StoredLead) {
  const { db } = database()
  db.prepare(
    `INSERT INTO leads (
      id, created_at, first_name, last_name, email, phone, company, website,
      country, listings, pms, automate, notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    lead.id,
    lead.createdAt,
    lead.firstName,
    lead.lastName,
    lead.email,
    lead.phone,
    lead.company,
    lead.website,
    lead.country,
    lead.listings,
    lead.pms,
    JSON.stringify(lead.automate),
    lead.notes,
  )
  return { ephemeral: database().ephemeral }
}

export function listLeads(): StoredLead[] {
  const { db } = database()
  const rows = db.prepare("SELECT * FROM leads ORDER BY created_at DESC").all() as LeadRow[]
  return rows.map((row) => ({
    id: row.id,
    createdAt: row.created_at,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    company: row.company,
    website: row.website,
    country: row.country,
    listings: row.listings,
    pms: row.pms,
    automate: parseList(row.automate),
    notes: row.notes,
    intent: "meet",
  }))
}

export function leadStoreIsEphemeral() {
  return database().ephemeral
}

function parseList(value: string) {
  try {
    const parsed = JSON.parse(value) as unknown
    if (Array.isArray(parsed)) return parsed.filter((item): item is string => typeof item === "string")
  } catch {
    return []
  }
  return []
}
