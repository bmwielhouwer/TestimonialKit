export type Plan = "free" | "pro";

export interface Testimonial {
  id: string;
  businessId: string;
  authorName: string;
  authorRole: string;
  authorCompany: string;
  content: string;
  /** Star rating from 1 to 5. */
  rating: number;
  approved: boolean;
  createdAt: string;
  featured: boolean;
}

export interface Business {
  id: string;
  name: string;
  plan: Plan;
  email: string;
}
