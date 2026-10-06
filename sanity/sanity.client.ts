// sanity/sanity.client.ts
import { createClient } from 'next-sanity' // vagy '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
// Fallback hozzáadása, ha az env változó undefined lenne:
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // fejlesztés alatt érdemes false-ra állítani, hogy azonnal látszódjanak a változások
})