import type { Metadata } from "next";
import ApproveButton from "@/components/ApproveButton";
import StarRating from "@/components/StarRating";
import {
  getApproved,
  getBusiness,
  getSeedTestimonials,
  getSubmissions,
} from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Owner dashboard",
  robots: { index: false, follow: false },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function preview(text: string, max = 90): string {
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}

export default async function DashboardPage() {
  const [pending, fileApproved] = await Promise.all([getSubmissions(), getApproved()]);

  // Sort pending newest first.
  const sortedPending = [...pending].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const seedApprovedCount = getSeedTestimonials().filter((t) => t.approved).length;
  const totalApproved = seedApprovedCount + fileApproved.length;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Owner dashboard</h1>
          <p className="mt-1 text-slate-600">Review and approve incoming testimonials.</p>
        </header>

        <div className="mb-8 grid grid-cols-2 gap-4 sm:max-w-md">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="text-3xl font-bold text-slate-900">{sortedPending.length}</div>
            <div className="mt-1 text-sm text-slate-500">Pending review</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="text-3xl font-bold text-slate-900">{totalApproved}</div>
            <div className="mt-1 text-sm text-slate-500">Total approved</div>
          </div>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-100 px-6 py-4">
            <h2 className="font-semibold text-slate-900">Pending testimonials</h2>
          </div>

          {sortedPending.length === 0 ? (
            <p className="px-6 py-12 text-center text-slate-500">
              No pending testimonials. New submissions will appear here.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-6 py-3 font-medium">Author</th>
                    <th className="px-6 py-3 font-medium">Company</th>
                    <th className="px-6 py-3 font-medium">Rating</th>
                    <th className="px-6 py-3 font-medium">Content</th>
                    <th className="px-6 py-3 font-medium">Submitted</th>
                    <th className="px-6 py-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sortedPending.map((t) => {
                    const business = getBusiness(t.businessId);
                    return (
                      <tr key={t.id} className="align-top">
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-900">{t.authorName}</div>
                          {business && (
                            <div className="text-xs text-slate-400">for {business.name}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-slate-600">{t.authorCompany || "—"}</td>
                        <td className="px-6 py-4">
                          <StarRating rating={t.rating} />
                        </td>
                        <td className="max-w-xs px-6 py-4 text-slate-600">{preview(t.content)}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-slate-500">
                          {formatDate(t.createdAt)}
                        </td>
                        <td className="px-6 py-4">
                          <ApproveButton id={t.id} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
