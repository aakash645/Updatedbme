import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { adminFetch } from "@/hooks/use-admin";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, XCircle, Eye, ExternalLink } from "lucide-react";
import type { Membership } from "@shared/schema";

const STATUS_COLORS: Record<string, string> = {
  submitted: "bg-amber-100 text-amber-700 border-amber-200",
  approved: "bg-green-100 text-green-700 border-green-200",
  rejected: "bg-red-100 text-red-700 border-red-200",
};
const PAY_COLORS: Record<string, string> = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  failed: "bg-red-100 text-red-700",
};
const FILTERS = ["all", "submitted", "approved", "rejected"];

export default function AdminMemberships() {
  const [items, setItems] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [detail, setDetail] = useState<Membership | null>(null);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const load = () => {
    adminFetch("/api/admin/memberships").then(r => r.json()).then(setItems).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const filtered = filter === "all" ? items : items.filter(m => m.status === filter);

  const updateStatus = async (id: number, status: string) => {
    setSaving(true);
    try {
      const updated = await adminFetch(`/api/admin/memberships/${id}`, {
        method: "PUT", body: JSON.stringify({ status, adminNote: note }),
      }).then(r => r.json());
      toast({ title: `Application ${status}!` });
      setDetail(updated);
      load();
    } catch { toast({ title: "Update failed", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const gstList = (m: Membership) => {
    if (!m.gstReturnsUrls) return [];
    try { return JSON.parse(m.gstReturnsUrls); } catch { return [m.gstReturnsUrls]; }
  };

  return (
    <AdminLayout title="Membership Applications">
      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all capitalize ${
              filter === f ? "bg-primary text-white border-primary" : "bg-background text-muted-foreground border-border hover:border-primary/30"
            }`}>
            {f === "all" ? `All (${items.length})` : `${f} (${items.filter(m => m.status === f).length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-20 bg-muted animate-pulse rounded-xl" />)}</div>
      ) : filtered.length === 0 ? (
        <Card><CardContent className="py-16 text-center text-muted-foreground">No applications found.</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {filtered.map(m => (
            <Card key={m.id} className={`border-l-4 ${m.status === "approved" ? "border-l-green-500" : m.status === "rejected" ? "border-l-red-400" : "border-l-amber-400"}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${STATUS_COLORS[m.status || "submitted"]}`}>{m.status}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PAY_COLORS[m.paymentStatus || "pending"]}`}>Payment: {m.paymentStatus}</span>
                      <span className="text-xs bg-muted px-2 py-0.5 rounded-full font-mono">{m.membershipType}</span>
                    </div>
                    <h3 className="font-semibold font-serif truncate">{m.companyName}</h3>
                    <div className="text-xs text-muted-foreground mt-0.5 flex gap-3 flex-wrap">
                      <span>GST: <span className="font-mono">{m.gstNumber}</span></span>
                      <span>{m.contactPerson}</span>
                      <span>{m.email}</span>
                      {m.amount && <span className="font-medium text-foreground">₹{m.amount.toLocaleString()}</span>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 font-mono">
                      {new Date(m.createdAt!).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => { setDetail(m); setNote(m.adminNote || ""); }}>
                    <Eye className="h-3.5 w-3.5 mr-1.5" /> Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Detail dialog */}
      <Dialog open={!!detail} onOpenChange={v => !v && setDetail(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">Application Review</DialogTitle>
          </DialogHeader>
          {detail && (
            <div className="space-y-5 py-2">
              {/* Status badges */}
              <div className="flex gap-2 flex-wrap">
                <span className={`text-xs px-3 py-1 rounded-full border font-medium ${STATUS_COLORS[detail.status || "submitted"]}`}>{detail.status}</span>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${PAY_COLORS[detail.paymentStatus || "pending"]}`}>Payment: {detail.paymentStatus}</span>
              </div>

              {/* Company details */}
              <div className="bg-muted/50 rounded-xl p-4">
                <h4 className="font-semibold font-serif mb-3 text-sm uppercase tracking-wide text-muted-foreground">Company Details</h4>
                <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-sm">
                  {[
                    ["Company", detail.companyName],
                    ["Type", detail.membershipType],
                    ["GST Number", detail.gstNumber],
                    ["PAN", detail.panNumber || "—"],
                    ["Address", [detail.address, detail.city, detail.state, detail.pincode].filter(Boolean).join(", ")],
                    ["Amount", detail.amount ? `₹${detail.amount.toLocaleString()}` : "—"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <span className="text-muted-foreground text-xs">{k}</span>
                      <p className="font-medium mt-0.5 break-words">{v}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="bg-muted/50 rounded-xl p-4">
                <h4 className="font-semibold font-serif mb-3 text-sm uppercase tracking-wide text-muted-foreground">Contact Person</h4>
                <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-sm">
                  {[
                    ["Name", detail.contactPerson],
                    ["Designation", detail.designation || "—"],
                    ["Email", detail.email],
                    ["Phone", detail.phone],
                    ["Alt Phone", detail.altPhone || "—"],
                    ["Razorpay ID", detail.razorpayPaymentId || "—"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <span className="text-muted-foreground text-xs">{k}</span>
                      <p className="font-medium mt-0.5 break-words">{v}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents */}
              {(gstList(detail).length > 0 || detail.invoiceDocUrl) && (
                <div className="bg-muted/50 rounded-xl p-4">
                  <h4 className="font-semibold font-serif mb-3 text-sm uppercase tracking-wide text-muted-foreground">Documents</h4>
                  <div className="flex flex-wrap gap-2">
                    {gstList(detail).map((url: string, i: number) => (
                      <a key={i} href={url} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-background border rounded-lg text-primary hover:bg-primary/5 transition-colors">
                        <ExternalLink className="h-3 w-3" /> GST Return {i + 1}
                      </a>
                    ))}
                    {detail.invoiceDocUrl && (
                      <a href={detail.invoiceDocUrl} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-background border rounded-lg text-primary hover:bg-primary/5 transition-colors">
                        <ExternalLink className="h-3 w-3" /> Sample Invoice
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Admin note + actions */}
              {detail.status === "submitted" && (
                <div className="border-t pt-4">
                  <div className="mb-4">
                    <Label>Admin Note (optional — sent to applicant)</Label>
                    <Textarea className="mt-1" rows={3} value={note} onChange={e => setNote(e.target.value)} placeholder="Reason for approval/rejection…" />
                  </div>
                  <div className="flex gap-3 justify-end">
                    <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => updateStatus(detail.id, "rejected")} disabled={saving}>
                      <XCircle className="h-4 w-4 mr-2" /> Reject
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700" onClick={() => updateStatus(detail.id, "approved")} disabled={saving}>
                      <CheckCircle2 className="h-4 w-4 mr-2" /> {saving ? "Saving…" : "Approve Membership"}
                    </Button>
                  </div>
                </div>
              )}

              {detail.status !== "submitted" && detail.adminNote && (
                <div className="bg-muted/50 rounded-xl p-4">
                  <p className="text-xs text-muted-foreground mb-1">Admin Note</p>
                  <p className="text-sm">{detail.adminNote}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetail(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
