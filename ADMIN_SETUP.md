# BME Website — Admin Panel & Membership Form Setup

## Quick Start

```bash
# 1. Run the database migration
npm run db:push

# 2. Add your Anthropic API key to .env (for GST scanning)
# ANTHROPIC_API_KEY=sk-ant-...

# 3. Start the server
npm run dev
```

## Admin Panel

URL: `http://localhost:5000/admin/login`
Default: `admin@bme.in` / `Admin@123`

### Modules
| Route | Purpose |
|---|---|
| `/admin` | Dashboard — stats + pending alerts |
| `/admin/announcements` | Create, edit, pin, delete announcements |
| `/admin/events` | Manage events & exhibitions |
| `/admin/circulars` | Issue circulars with category tags |
| `/admin/gallery` | Add photos + create albums |
| `/admin/team` | Manage directors & team members |
| `/admin/memberships` | Review & approve/reject applications |

## GST Certificate Scanning

The membership form at `/membership/apply` includes AI-powered GST scanning.

When a user uploads their GST certificate:
1. The image is sent to Claude Vision API
2. Claude extracts: GSTIN, legal name, trade name, address, state, pincode, PAN, business type
3. All matching fields are auto-filled in the form instantly

**To enable:** Add your Anthropic API key to `.env`:
```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxx
```
Get one at: https://console.anthropic.com/settings/keys

Without the key, the scan button shows an error and users fill the form manually.

## Membership Application Flow

1. `/membership/apply` — full-screen 6-step form:
   - Step 0: Upload GST certificate (AI auto-fill) OR skip to manual
   - Step 1: Applicant details — entity type, firm name, address, partners/directors
   - Step 2: Authorised representative details
   - Step 3: GST/PAN/banking/commodity details
   - Step 4: Membership type selection + fee breakdown
   - Step 5: Documents checklist + declaration
2. Submit → Razorpay payment (or mock mode if no keys set)
3. Success screen with BME application reference number
4. Admin sees it in `/admin/memberships` → can approve/reject

## Razorpay Setup (optional)

Leave blank in `.env` to use mock payment mode (useful for testing).
To enable real payments:
```
RAZORPAY_KEY_ID=rzp_test_xxxx
RAZORPAY_KEY_SECRET=xxxx
```

## File Changes Summary

| File | What changed |
|---|---|
| `shared/schema.ts` | Added: admins, memberships, galleryAlbums tables |
| `server/routes.ts` | All admin API routes + GST scan + membership/payment |
| `server/storage.ts` | Methods for all new tables |
| `server/auth.ts` | JWT sign/verify (no external dep) |
| `server/db.ts` | Add `import 'dotenv/config'` as first line if missing |
| `client/src/App.tsx` | Admin routes + `/membership/apply` standalone |
| `client/src/pages/MembershipApply.tsx` | 6-step form with GST scan + Razorpay |
| `client/src/pages/Gallery.tsx` | Now fetches from API (admin images show live) |
| `client/src/pages/Membership.tsx` | "Apply Now" button links to /membership/apply |
| `client/src/pages/admin/*.tsx` | 9 admin pages |
| `client/src/hooks/use-admin.ts` | Admin auth hook |
| `client/index.html` | Razorpay script + DM Serif Display font |
| `migrations/0001_add_admin_features.sql` | SQL for new tables |
| `.env` | Template with all required variables |
