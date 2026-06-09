import { promises as fs } from "fs";
import path from "path";
import seed from "@/data/testimonials.json";
import type { Business, Testimonial } from "@/types";

const dataDir = path.join(process.cwd(), "data");
const submissionsPath = path.join(dataDir, "submissions.json");
const approvedPath = path.join(dataDir, "approved.json");

interface SeedFile {
  businesses: Business[];
  testimonials: Testimonial[];
}

const seedData = seed as SeedFile;

export function getBusinesses(): Business[] {
  return seedData.businesses;
}

export function getBusiness(businessId: string): Business | undefined {
  return seedData.businesses.find((b) => b.id === businessId);
}

/** Seed testimonials that ship with the demo dataset. */
export function getSeedTestimonials(): Testimonial[] {
  return seedData.testimonials;
}

async function readJsonArray(filePath: string): Promise<Testimonial[]> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Testimonial[]) : [];
  } catch {
    return [];
  }
}

async function writeJsonArray(filePath: string, value: Testimonial[]): Promise<void> {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(value, null, 2), "utf-8");
}

/** Pending testimonials submitted through the public collection page. */
export async function getSubmissions(): Promise<Testimonial[]> {
  return readJsonArray(submissionsPath);
}

export async function addSubmission(testimonial: Testimonial): Promise<void> {
  const current = await readJsonArray(submissionsPath);
  current.push(testimonial);
  await writeJsonArray(submissionsPath, current);
}

/** Testimonials approved through the dashboard (separate from seed data). */
export async function getApproved(): Promise<Testimonial[]> {
  return readJsonArray(approvedPath);
}

/** Move a pending submission into the approved list. Returns the approved item. */
export async function approveSubmission(id: string): Promise<Testimonial | null> {
  const submissions = await readJsonArray(submissionsPath);
  const index = submissions.findIndex((t) => t.id === id);
  if (index === -1) return null;

  const [item] = submissions.splice(index, 1);
  const approvedItem: Testimonial = { ...item, approved: true };

  const approved = await readJsonArray(approvedPath);
  approved.push(approvedItem);

  await writeJsonArray(submissionsPath, submissions);
  await writeJsonArray(approvedPath, approved);

  return approvedItem;
}

/** All approved testimonials for a business: seed approved + dashboard approved. */
export async function getApprovedForBusiness(businessId: string): Promise<Testimonial[]> {
  const seedApproved = getSeedTestimonials().filter(
    (t) => t.businessId === businessId && t.approved
  );
  const fileApproved = (await getApproved()).filter((t) => t.businessId === businessId);
  return [...seedApproved, ...fileApproved];
}

/** Sort featured testimonials first, then newest first. */
export function sortForDisplay(testimonials: Testimonial[]): Testimonial[] {
  return [...testimonials].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}
