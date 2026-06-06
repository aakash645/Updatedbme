import { useState, useRef, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import PageHero from "@/components/PageHero";
import copperMetalImg from "@assets/Moffatt-Scrap-Iron-Metal-Campbellville-non-ferrous_1773218278459.jpg";

/* ─── BME DESIGN TOKENS ─────────────────────────────────────────────────── */
const RED        = "#E52222";
const RED_DARK   = "#C01A1A";
const RED_PALE   = "#FEF2F2";
const COPPER     = "#E8A528";
const COPPER_PALE = "#FDF6E3";
const DARK       = "#1A1A1A";
const MID        = "#4A5568";
const MUTED      = "#717171";
const BORDER     = "#E5E7EB";
const SURFACE    = "#FFFFFF";
const SURFACE2   = "#F9FAFB";
const GREEN      = "#16A34A";
const GREEN_BG   = "#F0FDF4";
const ERR_BG     = "#FFF1F1";
const ERR_BORDER = "#FECACA";

/* ─── CONSTANTS ─────────────────────────────────────────────────────────── */
const STEPS = ["GST Scan", "Applicant", "Representative", "Business", "Membership", "Documents"];
const ENTITY_TYPES = ["Proprietorship","Partnership","LLP","Pvt. Ltd.","Public Ltd.","Trust / Society"];
const BIZ_NATURES  = ["Importer","Trader","Dealer","Distributor","Manufacturer","Broker","Exporter","Scrap Dealer"];
const STATES_LIST  = [
  "Andhra Pradesh","Goa","Gujarat","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Punjab","Rajasthan","Tamil Nadu","Telangana","Uttar Pradesh",
  "West Bengal","Delhi","Chhattisgarh","Jharkhand","Odisha","Other",
];
const MEM_TYPES = [
  { id: "Annual", label: "Annual Membership",  base: 5000,  entrance: 10000 },
  { id: "Life",   label: "Life Membership",    base: 60000, entrance: 10000 },
];
const DOCS = [
  { id:"d1", name:"Duly filled membership form",       note:"This form, signed with official rubber stamp",                          req:true  },
  { id:"d2", name:"Board / Firm resolution",            note:"Authorising representative — Sec 113(2) Companies Act 2013",            req:true  },
  { id:"d3", name:"GST registration certificate",       note:"Self-attested copy",                                                    req:true  },
  { id:"d4", name:"PAN card",                           note:"Firm / company PAN — self-attested copy",                               req:true  },
  { id:"d5", name:"Sale & purchase invoices",           note:"2 copies each — establishes non-ferrous metals business",               req:true  },
  { id:"d6", name:"MOA & AOA",                          note:"For companies — certified true copy",                                   req:false },
  { id:"d7", name:"Certificate of incorporation",       note:"For companies — certified copy",                                        req:false },
  { id:"d8", name:"Partnership deed",                   note:"For partnership firms — certified true copy",                           req:false },
];

/* ─── TYPES ─────────────────────────────────────────────────────────────── */
interface Person  { name:string; designation:string; mobile:string; email:string; din:string; }
interface GSTData { gstin?:string; legalName?:string; tradeName?:string; address?:string; state?:string; pincode?:string; pan?:string; businessNature?:string; constitutionOfBusiness?:string; }
interface FormData {
  entityType:string; bizNature:Set<string>;
  firmName:string; firmAddr:string; firmCity:string; firmState:string;
  firmPin:string; firmTel:string; firmMob:string; cin:string;
  persons:Person[];
  repName:string; repDesignation:string; repMob:string; repEmail:string; repTel:string; repAddr:string;
  hasGST:boolean; gstin:string; gstState:string; pan:string;
  bankName:string; bankBranch:string; proposer:string; seconder:string; metals:string;
  memType:string; payMode:string; payRef:string; payDate:string; payBank:string;
  docsChecked:Record<string,boolean>; gstReturnsUrls:string;
}

/* ─── VALIDATION ─────────────────────────────────────────────────────────── */
type FieldErrors = Record<string, string>;

function validateStep(step: number, form: FormData): FieldErrors {
  const errors: FieldErrors = {};
  if (step === 1) {
    if (!form.entityType)            errors.entityType = "Please select entity type";
    if (form.bizNature.size === 0)   errors.bizNature  = "Select at least one business nature";
    if (!form.firmName.trim())       errors.firmName   = "Firm name is required";
    if (!form.firmAddr.trim())       errors.firmAddr   = "Address is required";
    if (!form.firmCity.trim())       errors.firmCity   = "City is required";
    if (!form.firmPin.trim())        errors.firmPin    = "Pincode is required";
    else if (!/^\d{6}$/.test(form.firmPin.trim())) errors.firmPin = "Enter a valid 6-digit pincode";
    const p0 = form.persons[0];
    if (!p0.name.trim())             errors["person0_name"]   = "Primary contact name is required";
    if (!p0.mobile.trim())           errors["person0_mobile"] = "Primary contact mobile is required";
    else if (!/^[+\d\s\-()]{8,15}$/.test(p0.mobile.trim())) errors["person0_mobile"] = "Enter a valid mobile number";
  }
  if (step === 2) {
    if (!form.repName.trim())        errors.repName        = "Representative name is required";
    if (!form.repDesignation.trim()) errors.repDesignation = "Designation is required";
    if (!form.repMob.trim())         errors.repMob         = "Mobile is required";
    else if (!/^[+\d\s\-()]{8,15}$/.test(form.repMob.trim())) errors.repMob = "Enter a valid mobile number";
    if (!form.repEmail.trim())       errors.repEmail       = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.repEmail.trim())) errors.repEmail = "Enter a valid email address";
    if (!form.repAddr.trim())        errors.repAddr        = "Residential address is required";
  }
  if (step === 3) {
    if (!form.pan.trim())            errors.pan    = "PAN is required";
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(form.pan.trim())) errors.pan = "Enter a valid PAN (e.g. AABCU9603R)";
    if (form.hasGST) {
      if (!form.gstin.trim())        errors.gstin  = "GSTIN is required when GST is enabled";
      else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(form.gstin.trim()))
        errors.gstin = "Enter a valid 15-character GSTIN";
    }
    if (!form.metals.trim())         errors.metals = "Please specify the metals / commodities your firm trades";
  }
  return errors;
}

/* ─── SHARED STYLE PRIMITIVES ────────────────────────────────────────────── */
const inputBase: React.CSSProperties = {
  width:"100%", fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:15,
  padding:"13px 16px", border:`1.5px solid ${BORDER}`, borderRadius:8,
  background:SURFACE, color:DARK, outline:"none", boxSizing:"border-box",
};
const inputFocusOk:  React.CSSProperties = { borderColor: GREEN,      background: GREEN_BG  };
const inputError:    React.CSSProperties = { borderColor: RED,        background: ERR_BG    };
const labelStyle: React.CSSProperties = {
  fontSize:12, fontWeight:600, color:MID,
  textTransform:"uppercase", letterSpacing:"0.6px", marginBottom:7, display:"block",
};
const cardStyle: React.CSSProperties = {
  background:SURFACE, borderRadius:12, border:`1px solid ${BORDER}`,
  marginBottom:20, overflow:"hidden",
};
const cardHeaderStyle: React.CSSProperties = {
  padding:"16px 22px", borderBottom:`1px solid ${BORDER}`,
  display:"flex", alignItems:"center", gap:12, background:SURFACE2,
};
const cardBodyStyle: React.CSSProperties = { padding:"22px 22px 6px" };
const fieldStyle: React.CSSProperties = { marginBottom:20 };
const chipBase = (active:boolean, color:"red"|"copper"="red"): React.CSSProperties => ({
  display:"inline-flex", alignItems:"center", padding:"8px 16px",
  borderRadius:20, fontSize:13, fontWeight:500, cursor:"pointer",
  userSelect:"none", transition:"all 0.15s",
  border:`1.5px solid ${active ? (color==="red" ? RED : COPPER) : BORDER}`,
  color: active ? (color==="red" ? RED_PALE : COPPER_PALE) : MID,
  background: active ? (color==="red" ? RED : COPPER) : SURFACE,
});
const rowStyle: React.CSSProperties = { display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 };
const infoBoxStyle: React.CSSProperties = {
  background:"#EFF6FF", borderLeft:`3px solid #3B82F6`, borderRadius:"0 8px 8px 0",
  padding:"13px 16px", marginBottom:20, fontSize:13, color:"#1D4ED8", lineHeight:1.6,
};

/* ─── REUSABLE SUB-COMPONENTS ────────────────────────────────────────────── */
function ErrorMsg({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <div style={{ fontSize:12, color:RED, marginTop:5, display:"flex", alignItems:"center", gap:4 }}>
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5.5" stroke={RED} strokeWidth="1"/><path d="M6 3.5v3M6 8h.01" stroke={RED} strokeWidth="1.2" strokeLinecap="round"/></svg>
    {msg}
  </div>;
}

function Field({ label, req, children, style, error }: { label:string; req?:boolean; children:React.ReactNode; style?:React.CSSProperties; error?:string }) {
  return (
    <div style={{ ...fieldStyle, ...style }}>
      <label style={labelStyle}>{label}{req && <span style={{ color:RED, marginLeft:2 }}>*</span>}</label>
      {children}
      <ErrorMsg msg={error} />
    </div>
  );
}

function TInput({ value, onChange, placeholder, type="text", ok, hasError }: any) {
  return (
    <input type={type} value={value} placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      style={{ ...inputBase, ...(hasError ? inputError : ok && value ? inputFocusOk : {}) }} />
  );
}

function TSelect({ value, onChange, options }: { value:string; onChange:(v:string)=>void; options:string[] }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{ ...inputBase, backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%234A5568' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat:"no-repeat", backgroundPosition:"right 14px center", paddingRight:40 }}>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  );
}

function CardSection({ icon, title, sub, children }: { icon:React.ReactNode; title:string; sub:string; children:React.ReactNode }) {
  return (
    <div style={cardStyle}>
      <div style={cardHeaderStyle}>
        <div style={{ width:36, height:36, borderRadius:8, background:RED_PALE, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:RED }}>{icon}</div>
        <div>
          <div style={{ fontSize:15, fontWeight:600, color:DARK, fontFamily:"'Playfair Display',serif" }}>{title}</div>
          <div style={{ fontSize:12, color:MUTED, marginTop:2 }}>{sub}</div>
        </div>
      </div>
      <div style={cardBodyStyle}>{children}</div>
    </div>
  );
}

/* ─── STEP INDICATOR ─────────────────────────────────────────────────────── */
function StepBar({ step }: { step:number }) {
  return (
    <div style={{ background:SURFACE, borderBottom:`1px solid ${BORDER}`, padding:"18px 32px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ display:"flex", alignItems:"center" }}>
          {STEPS.map((label, i) => (
            <div key={label} style={{ display:"flex", alignItems:"center", flex: i < STEPS.length-1 ? 1 : "none" }}>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:5 }}>
                <div style={{
                  width:34, height:34, borderRadius:"50%", display:"flex", alignItems:"center",
                  justifyContent:"center", fontSize:13, fontWeight:700, transition:"all 0.3s",
                  background: i < step ? RED : i === step ? RED : BORDER,
                  color: i <= step ? "#fff" : MUTED,
                  boxShadow: i === step ? `0 0 0 4px ${RED_PALE}` : "none",
                }}>
                  {i < step
                    ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7l3.5 3.5 5.5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    : i+1}
                </div>
                <span style={{ fontSize:11, fontWeight:i===step?600:400, color:i===step?RED:MUTED, whiteSpace:"nowrap" }}>{label}</span>
              </div>
              {i < STEPS.length-1 && (
                <div style={{ flex:1, height:2, margin:"0 6px", marginBottom:20, background:i<step?RED:BORDER, transition:"background 0.3s" }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────── */
export default function MembershipApply() {
  const { toast } = useToast();
  const [step, setStep]             = useState(0);
  const [errors, setErrors]         = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone]             = useState<string|null>(null);
  const [scanning, setScanning]     = useState(false);
  const [prefillFields, setPrefillFields] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormData>({
    entityType:"Proprietorship", bizNature:new Set(),
    firmName:"", firmAddr:"", firmCity:"", firmState:"Maharashtra",
    firmPin:"", firmTel:"", firmMob:"", cin:"",
    persons:[{ name:"", designation:"", mobile:"", email:"", din:"" }],
    repName:"", repDesignation:"", repMob:"", repEmail:"", repTel:"", repAddr:"",
    hasGST:false, gstin:"", gstState:"", pan:"",
    bankName:"", bankBranch:"", proposer:"", seconder:"", metals:"",
    memType:"Annual", payMode:"", payRef:"", payDate:"", payBank:"",
    docsChecked:{ d1:true, d2:false, d3:false, d4:false, d5:false, d6:false, d7:false, d8:false },
    gstReturnsUrls:"",
  });
  const setF = useCallback((k:keyof FormData, v:any) => setForm(f => ({ ...f, [k]:v })), []);

  /* GST SCAN */
  const handleGSTFile = (file:File) => {
    const reader = new FileReader();
    reader.onload = async e => {
      const dataUrl = e.target?.result as string;
      const base64 = dataUrl.split(",")[1];
      const mediaType = dataUrl.startsWith("data:image/png") ? "image/png" : "image/jpeg";
      setScanning(true);
      try {
        const res = await fetch("/api/scan-gst", { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify({ imageData:base64, mediaType }) });
        if (!res.ok) { const err = await res.json(); throw new Error(err.message || "Scan failed"); }
        const { data }: { data:GSTData } = await res.json();
        const filled:string[] = [];
        setForm(f => {
          const u = { ...f };
          if (data.gstin)     { u.gstin = data.gstin; u.hasGST = true; filled.push("GSTIN"); }
          if (data.pan)       { u.pan = data.pan; filled.push("PAN"); }
          if (data.legalName && !f.firmName)  { u.firmName = data.legalName; filled.push("Firm name"); }
          if (data.tradeName && !u.firmName)  { u.firmName = data.tradeName; filled.push("Trade name"); }
          if (data.address && !f.firmAddr)    { u.firmAddr = data.address; filled.push("Address"); }
          if (data.pincode && !f.firmPin)     { u.firmPin = data.pincode; filled.push("Pincode"); }
          if (data.state && !f.gstState)      { u.gstState = data.state; filled.push("State"); }
          return u;
        });
        setPrefillFields(filled);
        if (filled.length) toast({ title:`✅ Auto-filled ${filled.length} fields`, description: filled.join(", ") });
        setTimeout(() => setStep(1), 700);
      } catch (err:any) {
        toast({ title:"Scan failed", description:err.message, variant:"destructive" });
      } finally { setScanning(false); }
    };
    reader.readAsDataURL(file);
  };

  /* PERSONS */
  const updatePerson = (i:number, k:keyof Person, v:string) =>
    setForm(f => { const ps=[...f.persons]; ps[i]={ ...ps[i], [k]:v }; return { ...f, persons:ps }; });
  const addPerson = () => form.persons.length < 6 && setF("persons", [...form.persons, { name:"",designation:"",mobile:"",email:"",din:"" }]);
  const removePerson = (i:number) => { const ps=form.persons.filter((_,idx)=>idx!==i); setF("persons", ps.length ? ps : [{ name:"",designation:"",mobile:"",email:"",din:"" }]); };

  /* NAVIGATION with validation */
  const goNext = () => {
    const errs = validateStep(step, form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // scroll to top of form content
      window.scrollTo({ top: 200, behavior: "smooth" });
      toast({ title: "Please fix the errors before continuing", variant: "destructive" });
      return;
    }
    setErrors({});
    setStep(s => s + 1);
  };

  /* SUBMIT */
  const submitApplication = async () => {
    setSubmitting(true);
    try {
      const memInfo = MEM_TYPES.find(m => m.id === form.memType)!;
      const payload = {
        companyName:form.firmName, membershipType:form.memType,
        gstNumber:form.gstin||"NOT_REGISTERED", panNumber:form.pan,
        address:form.firmAddr, city:form.firmCity, state:form.firmState, pincode:form.firmPin,
        contactPerson:form.persons[0]?.name||form.repName,
        designation:form.persons[0]?.designation||form.repDesignation,
        email:form.persons[0]?.email||form.repEmail,
        phone:form.persons[0]?.mobile||form.repMob,
        altPhone:form.firmTel, gstReturnsUrls:form.gstReturnsUrls,
        amount:memInfo.base,
      };
      const appRes = await fetch("/api/membership/apply", { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify(payload) });
      if (!appRes.ok) throw new Error("Submission failed");
      const app = await appRes.json();
      const orderRes = await fetch("/api/membership/create-order", { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify({ membershipId:app.id }) });
      const orderData = await orderRes.json();
      if (orderData.key === "mock_key") { setDone(app.id.toString()); setSubmitting(false); return; }
      const options = {
        key:orderData.key, amount:(orderData.amount||memInfo.base)*100, currency:"INR",
        name:"Bombay Metal Exchange Ltd.", description:`${form.memType} Membership`,
        order_id:orderData.orderId,
        prefill:{ name:payload.contactPerson, email:payload.email, contact:payload.phone },
        theme:{ color:RED },
        handler: async (response:any) => {
          await fetch("/api/membership/verify-payment", { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify({ ...response, membershipId:app.id }) });
          setDone(app.id.toString()); setSubmitting(false);
        },
        modal:{ ondismiss:() => { setSubmitting(false); toast({ title:"Payment cancelled", variant:"destructive" }); } },
      };
      new (window as any).Razorpay(options).open();
    } catch (err:any) {
      toast({ title:"Submission failed", description:err.message, variant:"destructive" });
      setSubmitting(false);
    }
  };

  /* SUCCESS SCREEN */
  if (done) return (
    <div style={{ background:SURFACE2, minHeight:"60vh", display:"flex", alignItems:"center", justifyContent:"center", padding:32 }}>
      <div style={{ background:SURFACE, borderRadius:20, padding:"52px 40px", width:"100%", maxWidth:520, textAlign:"center", boxShadow:"0 4px 32px rgba(0,0,0,0.08)", border:`1px solid ${BORDER}` }}>
        <div style={{ width:80, height:80, background:GREEN_BG, borderRadius:"50%", border:`2px solid ${GREEN}`, margin:"0 auto 24px", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <svg width="40" height="40" viewBox="0 0 36 36" fill="none"><path d="M8 18l7 7 13-13" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, color:DARK, marginBottom:10 }}>Application Submitted!</h2>
        <p style={{ fontSize:15, color:MID, lineHeight:1.7, marginBottom:28 }}>Your BME membership application has been received. Our team will review it within 5–7 working days.</p>
        <div style={{ background:RED_PALE, border:`1px solid rgba(229,34,34,0.2)`, borderRadius:10, padding:"16px 20px", marginBottom:28 }}>
          <p style={{ fontSize:12, color:MUTED, marginBottom:4 }}>Application Reference</p>
          <p style={{ fontFamily:"monospace", fontWeight:700, color:RED, fontSize:20 }}>BME-APP-{done.padStart(6,"0")}</p>
        </div>
        <div style={{ display:"flex", gap:12 }}>
          <button onClick={() => window.location.href="/"} style={{ flex:1, padding:15, borderRadius:8, background:RED, color:"#fff", fontSize:15, fontWeight:600, border:"none", cursor:"pointer" }}>Back to Home</button>
          <button onClick={() => { setDone(null); setStep(0); setPrefillFields([]); setErrors({}); }} style={{ flex:1, padding:15, borderRadius:8, background:SURFACE, color:RED, fontSize:15, fontWeight:600, border:`2px solid ${RED}`, cursor:"pointer" }}>New Application</button>
        </div>
      </div>
    </div>
  );

  const memInfo = MEM_TYPES.find(m => m.id === form.memType)!;
  const gst18   = Math.round((memInfo.base + memInfo.entrance) * 0.18);
  const total   = memInfo.base + memInfo.entrance + gst18;

  /* ── VALIDATION SUMMARY BANNER ── */
  const ErrorBanner = () => {
    const keys = Object.keys(errors);
    if (keys.length === 0) return null;
    return (
      <div style={{ background:ERR_BG, border:`1.5px solid ${ERR_BORDER}`, borderRadius:10, padding:"14px 18px", marginBottom:24 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, fontWeight:600, color:RED, fontSize:14, marginBottom:6 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke={RED} strokeWidth="1.5"/><path d="M8 5v4M8 11h.01" stroke={RED} strokeWidth="1.5" strokeLinecap="round"/></svg>
          Please fix {keys.length} error{keys.length>1?"s":""} before continuing
        </div>
        <ul style={{ margin:0, padding:"0 0 0 20px", fontSize:13, color:MID, lineHeight:1.8 }}>
          {Object.values(errors).map((msg, i) => <li key={i}>{msg}</li>)}
        </ul>
      </div>
    );
  };

  /* MAIN LAYOUT */
  return (
    <div style={{ background:SURFACE2, minHeight:"100vh" }}>

      {/* Page hero */}
      <PageHero
        title="Membership Application"
        subtitle="Join the Apex Body of Non-Ferrous Metals Trade & Industry. Complete the form below — upload your GST certificate for instant auto-fill."
        backgroundImage={copperMetalImg}
        category="Apply Now"
      />

      {/* GST Scan overlay */}
      {scanning && (
        <div style={{ position:"fixed", inset:0, background:"rgba(26,26,26,0.92)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
          <div style={{ background:SURFACE, borderRadius:16, padding:"40px 36px", maxWidth:380, width:"100%", textAlign:"center" }}>
            <div style={{ width:60, height:60, borderRadius:14, background:RED_PALE, margin:"0 auto 20px", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="30" height="30" viewBox="0 0 28 28" fill="none"><rect x="3" y="7" width="22" height="16" rx="3" stroke={RED} strokeWidth="1.8"/><path d="M9 12h10M9 16h7" stroke={RED} strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:DARK, marginBottom:8 }}>Reading GST Certificate…</h3>
            <p style={{ fontSize:14, color:MID, lineHeight:1.6, marginBottom:22 }}>AI is extracting your details. This takes a few seconds.</p>
            <div style={{ height:4, background:BORDER, borderRadius:2, overflow:"hidden" }}>
              <div style={{ height:"100%", width:"65%", background:RED, borderRadius:2 }} />
            </div>
            <p style={{ fontSize:12, color:MUTED, marginTop:10 }}>Detecting GSTIN · Extracting firm name · Reading address…</p>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input ref={fileRef} type="file" accept="image/*,.pdf" style={{ display:"none" }}
        onChange={e => { const f=e.target.files?.[0]; if(f) handleGSTFile(f); e.target.value=""; }} />

      {/* Step bar */}
      <StepBar step={step} />

      {/* Content — wider, less side padding */}
      <div style={{ maxWidth:1060, margin:"0 auto", padding:"36px 28px 130px" }}>

        {/* ── STEP 0: GST SCAN ── */}
        {step === 0 && (
          <div style={{ maxWidth:680, margin:"0 auto" }}>
            <div style={{ marginBottom:28 }}>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, color:DARK, marginBottom:8 }}>Scan Your GST Certificate</h2>
              <p style={{ fontSize:15, color:MID, lineHeight:1.6 }}>Upload a photo or PDF of your GST registration certificate — our AI will extract GSTIN, PAN, firm name, and address and pre-fill them instantly.</p>
            </div>

            {prefillFields.length > 0 && (
              <div style={{ background:GREEN_BG, border:`1.5px solid ${GREEN}`, borderRadius:12, padding:"16px 20px", marginBottom:24 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:14, fontWeight:600, color:GREEN, marginBottom:8 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-6" stroke={GREEN} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Auto-filled {prefillFields.length} fields from your GST certificate
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {prefillFields.map(f => <span key={f} style={{ fontSize:12, padding:"4px 10px", borderRadius:10, background:SURFACE, border:`1px solid rgba(22,163,74,0.3)`, color:GREEN, fontWeight:500 }}>{f}</span>)}
                </div>
              </div>
            )}

            <div onClick={() => fileRef.current?.click()}
              style={{ background:SURFACE, border:`2px dashed ${RED}`, borderRadius:14, padding:"40px 28px", cursor:"pointer", textAlign:"center", marginBottom:14, transition:"all 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = RED_PALE)}
              onMouseLeave={e => (e.currentTarget.style.background = SURFACE)}>
              <div style={{ width:60, height:60, borderRadius:14, background:RED, margin:"0 auto 18px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="30" height="30" viewBox="0 0 28 28" fill="none"><rect x="4" y="7" width="20" height="15" rx="3" stroke="#fff" strokeWidth="1.8"/><path d="M9 12h10M9 16h7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/><circle cx="22" cy="7" r="4" fill={COPPER}/></svg>
              </div>
              <div style={{ fontSize:17, fontWeight:700, color:DARK, fontFamily:"'Playfair Display',serif", marginBottom:6 }}>Upload GST Certificate</div>
              <div style={{ fontSize:14, color:MID }}>Click to choose a photo or PDF · GSTIN, PAN, name & address auto-extracted</div>
            </div>

            <div style={{ textAlign:"center", fontSize:13, color:MUTED, margin:"10px 0", fontWeight:500 }}>— or —</div>

            <div onClick={() => setStep(1)}
              style={{ background:SURFACE, border:`2px solid ${BORDER}`, borderRadius:14, padding:"26px", cursor:"pointer", textAlign:"center", transition:"all 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = COPPER)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = BORDER)}>
              <div style={{ width:52, height:52, borderRadius:12, background:COPPER_PALE, border:`2px solid ${COPPER}`, margin:"0 auto 14px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="24" height="24" viewBox="0 0 22 22" fill="none"><path d="M11 5v12M5 11h12" stroke={COPPER} strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <div style={{ fontSize:16, fontWeight:600, color:DARK }}>Fill Manually</div>
              <div style={{ fontSize:14, color:MID, marginTop:5 }}>Enter your GST and company details step by step</div>
            </div>

            <p style={{ textAlign:"center", fontSize:12, color:MUTED, marginTop:22 }}>
              🔒 Your document is processed securely and never stored on our servers.
            </p>
          </div>
        )}

        {/* ── STEP 1: APPLICANT ── */}
        {step === 1 && (
          <div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, color:DARK, marginBottom:6 }}>Applicant Details</h2>
            <p style={{ fontSize:15, color:MID, marginBottom:28, lineHeight:1.6 }}>Legal name, entity type, registered address, and all partners / directors</p>

            <ErrorBanner />

            <CardSection
              icon={<svg width="18" height="18" viewBox="0 0 16 16" fill="none"><rect x="2" y="8" width="5" height="7" rx="1" stroke={RED} strokeWidth="1.4"/><rect x="9" y="4" width="5" height="11" rx="1" stroke={RED} strokeWidth="1.4"/></svg>}
              title="Entity Type & Nature of Business" sub="Legal constitution and business activities">
              <Field label="Constitution of firm" req error={errors.entityType}>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:4 }}>
                  {ENTITY_TYPES.map(e => <span key={e} style={chipBase(form.entityType===e)} onClick={() => { setF("entityType",e); setErrors(prev => ({ ...prev, entityType: "" })); }}>{e}</span>)}
                </div>
              </Field>
              <Field label="Nature of business" req error={errors.bizNature}>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {BIZ_NATURES.map(b => {
                    const active = form.bizNature.has(b);
                    return <span key={b} style={chipBase(active)} onClick={() => {
                      const s2=new Set(form.bizNature); active?s2.delete(b):s2.add(b); setF("bizNature",s2);
                      if (s2.size > 0) setErrors(prev => ({ ...prev, bizNature: "" }));
                    }}>{b}</span>;
                  })}
                </div>
              </Field>
            </CardSection>

            <CardSection
              icon={<svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M8 2L2 6v8h4v-4h4v4h4V6L8 2z" stroke={RED} strokeWidth="1.4" strokeLinejoin="round"/></svg>}
              title="Firm / Company Details" sub="Registered legal name and address">
              <Field label="Full legal name of firm" req error={errors.firmName}>
                <TInput value={form.firmName} onChange={(v:string)=>{ setF("firmName",v); if(v.trim()) setErrors(p=>({...p,firmName:""})); }} placeholder="ABC Metals Pvt. Ltd." ok hasError={!!errors.firmName} />
              </Field>
              <Field label="Registered address" req error={errors.firmAddr}>
                <TInput value={form.firmAddr} onChange={(v:string)=>{ setF("firmAddr",v); if(v.trim()) setErrors(p=>({...p,firmAddr:""})); }} placeholder="Street, area, landmark" ok hasError={!!errors.firmAddr} />
              </Field>
              <div style={rowStyle}>
                <Field label="City" req error={errors.firmCity}>
                  <TInput value={form.firmCity} onChange={(v:string)=>{ setF("firmCity",v); if(v.trim()) setErrors(p=>({...p,firmCity:""})); }} placeholder="Mumbai" ok hasError={!!errors.firmCity} />
                </Field>
                <Field label="Pincode" req error={errors.firmPin}>
                  <TInput value={form.firmPin} onChange={(v:string)=>{ setF("firmPin",v); if(/^\d{6}$/.test(v.trim())) setErrors(p=>({...p,firmPin:""})); }} placeholder="400001" ok hasError={!!errors.firmPin} />
                </Field>
              </div>
              <Field label="State">
                <TSelect value={form.firmState} onChange={(v:string)=>setF("firmState",v)} options={STATES_LIST} />
              </Field>
              <div style={rowStyle}>
                <Field label="Office telephone">
                  <TInput value={form.firmTel} onChange={(v:string)=>setF("firmTel",v)} placeholder="022-XXXXXXXX" type="tel" ok />
                </Field>
                <Field label="Mobile">
                  <TInput value={form.firmMob} onChange={(v:string)=>setF("firmMob",v)} placeholder="+91 9XXXXXXXXX" type="tel" ok />
                </Field>
              </div>
              <Field label="CIN / Registration No.">
                <TInput value={form.cin} onChange={(v:string)=>setF("cin",v)} placeholder="U27100MH2001PTC132418" ok />
              </Field>
            </CardSection>

            {/* Partners / Directors */}
            <div style={{ marginBottom:10, fontSize:12, fontWeight:600, color:MUTED, textTransform:"uppercase", letterSpacing:"0.7px" }}>Partners / Directors</div>
            {form.persons.map((p,i) => (
              <div key={i} style={{ ...cardStyle, marginBottom:14 }}>
                <div style={{ ...cardHeaderStyle, justifyContent:"space-between" }}>
                  <span style={{ fontSize:14, fontWeight:600, color:DARK }}>Person {i+1}{i===0?" (primary)":""}</span>
                  {form.persons.length > 1 && <span onClick={() => removePerson(i)} style={{ fontSize:13, color:RED, cursor:"pointer", padding:"4px 10px" }}>Remove</span>}
                </div>
                <div style={cardBodyStyle}>
                  <div style={rowStyle}>
                    <Field label="Full name" req={i===0} error={i===0 ? errors["person0_name"] : undefined}>
                      <TInput value={p.name} onChange={(v:string)=>{ updatePerson(i,"name",v); if(i===0 && v.trim()) setErrors(prev=>({...prev,person0_name:""})); }} placeholder="Full legal name" ok hasError={i===0 && !!errors["person0_name"]} />
                    </Field>
                    <Field label="Designation">
                      <TInput value={p.designation} onChange={(v:string)=>updatePerson(i,"designation",v)} placeholder="Director / Partner" ok />
                    </Field>
                  </div>
                  <div style={rowStyle}>
                    <Field label="Mobile" req={i===0} error={i===0 ? errors["person0_mobile"] : undefined}>
                      <TInput value={p.mobile} onChange={(v:string)=>{ updatePerson(i,"mobile",v); if(i===0 && /^[+\d\s\-()]{8,15}$/.test(v.trim())) setErrors(prev=>({...prev,person0_mobile:""})); }} placeholder="+91 9XXXXXXXXX" type="tel" ok hasError={i===0 && !!errors["person0_mobile"]} />
                    </Field>
                    <Field label="Email">
                      <TInput value={p.email} onChange={(v:string)=>updatePerson(i,"email",v)} placeholder="name@co.com" type="email" ok />
                    </Field>
                  </div>
                  <Field label="DIN / PAN">
                    <TInput value={p.din} onChange={(v:string)=>updatePerson(i,"din",v)} placeholder="Director ID or PAN" ok />
                  </Field>
                </div>
              </div>
            ))}
            {form.persons.length < 6 && (
              <button onClick={addPerson} style={{ display:"flex", alignItems:"center", gap:8, padding:"12px 18px", fontSize:14, fontWeight:500, color:RED, cursor:"pointer", background:"transparent", border:`1.5px dashed ${RED}`, borderRadius:8, marginBottom:20, width:"100%" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke={RED} strokeWidth="1.5"/><path d="M8 5v6M5 8h6" stroke={RED} strokeWidth="1.5" strokeLinecap="round"/></svg>
                Add another partner / director
              </button>
            )}
          </div>
        )}

        {/* ── STEP 2: REPRESENTATIVE ── */}
        {step === 2 && (
          <div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, color:DARK, marginBottom:6 }}>Authorised Representative</h2>
            <p style={{ fontSize:15, color:MID, marginBottom:24, lineHeight:1.6 }}>Person authorised to represent the firm at BME (Article 19 of Bye-laws)</p>
            <div style={infoBoxStyle}>The authorised representative must be a proprietor, partner, or director. Their name and signature will appear on all BME correspondence.</div>

            <ErrorBanner />

            <CardSection
              icon={<svg width="18" height="18" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3" stroke={RED} strokeWidth="1.4"/><path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke={RED} strokeWidth="1.4" strokeLinecap="round"/></svg>}
              title="Representative Details" sub="Authorised to act on behalf of the firm">
              <div style={rowStyle}>
                <Field label="Full name" req error={errors.repName}>
                  <TInput value={form.repName} onChange={(v:string)=>{ setF("repName",v); if(v.trim()) setErrors(p=>({...p,repName:""})); }} placeholder="Full legal name" ok hasError={!!errors.repName} />
                </Field>
                <Field label="Designation" req error={errors.repDesignation}>
                  <TInput value={form.repDesignation} onChange={(v:string)=>{ setF("repDesignation",v); if(v.trim()) setErrors(p=>({...p,repDesignation:""})); }} placeholder="Director / Partner" ok hasError={!!errors.repDesignation} />
                </Field>
              </div>
              <div style={rowStyle}>
                <Field label="Mobile" req error={errors.repMob}>
                  <TInput value={form.repMob} onChange={(v:string)=>{ setF("repMob",v); if(/^[+\d\s\-()]{8,15}$/.test(v.trim())) setErrors(p=>({...p,repMob:""})); }} placeholder="+91 9XXXXXXXXX" type="tel" ok hasError={!!errors.repMob} />
                </Field>
                <Field label="Email" req error={errors.repEmail}>
                  <TInput value={form.repEmail} onChange={(v:string)=>{ setF("repEmail",v); if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) setErrors(p=>({...p,repEmail:""})); }} placeholder="rep@company.com" type="email" ok hasError={!!errors.repEmail} />
                </Field>
              </div>
              <Field label="Office telephone">
                <TInput value={form.repTel} onChange={(v:string)=>setF("repTel",v)} placeholder="022-XXXXXXXX" type="tel" ok />
              </Field>
              <Field label="Residential address" req error={errors.repAddr}>
                <textarea value={form.repAddr} onChange={e=>{ setF("repAddr",e.target.value); if(e.target.value.trim()) setErrors(p=>({...p,repAddr:""})); }} placeholder="Full residential address…" rows={3}
                  style={{ ...inputBase, resize:"none", minHeight:90, ...(errors.repAddr ? inputError : {}) }} />
                <ErrorMsg msg={errors.repAddr} />
              </Field>
            </CardSection>
          </div>
        )}

        {/* ── STEP 3: BUSINESS ── */}
        {step === 3 && (
          <div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, color:DARK, marginBottom:6 }}>Business & Tax Details</h2>
            <p style={{ fontSize:15, color:MID, marginBottom:24, lineHeight:1.6 }}>GST registration, PAN, commodities traded, and banking/references</p>

            <ErrorBanner />

            <CardSection
              icon={<svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M8 2l6 3v5c0 3-6 5-6 5S2 13 2 10V5L8 2z" stroke={RED} strokeWidth="1.4" strokeLinejoin="round"/></svg>}
              title="GST & Tax" sub="Registration number and PAN details">
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 0", borderBottom:`1px solid ${BORDER}`, marginBottom:20 }}>
                <div><div style={{ fontSize:15, fontWeight:500, color:DARK }}>GST Registered</div><div style={{ fontSize:13, color:MUTED }}>Does the firm have GST registration?</div></div>
                <label style={{ position:"relative", width:50, height:28, cursor:"pointer", display:"block" }}>
                  <input type="checkbox" checked={form.hasGST} onChange={e=>setF("hasGST",e.target.checked)} style={{ opacity:0, width:0, height:0 }} />
                  <div style={{ position:"absolute", inset:0, background:form.hasGST?RED:BORDER, borderRadius:14, transition:"background 0.2s" }}>
                    <div style={{ position:"absolute", width:22, height:22, left:form.hasGST?25:3, top:3, background:"#fff", borderRadius:"50%", transition:"left 0.2s", boxShadow:"0 1px 4px rgba(0,0,0,0.15)" }} />
                  </div>
                </label>
              </div>
              {form.hasGST && (<>
                <Field label="GSTIN" req error={errors.gstin}>
                  <TInput value={form.gstin} onChange={(v:string)=>{ setF("gstin",v.toUpperCase()); if(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(v.toUpperCase())) setErrors(p=>({...p,gstin:""})); }} placeholder="27AABCU9603R1ZX" ok hasError={!!errors.gstin} />
                </Field>
                <Field label="GST State">
                  <TSelect value={form.gstState||form.firmState} onChange={(v:string)=>setF("gstState",v)} options={STATES_LIST} />
                </Field>
              </>)}
              <Field label="PAN (Firm / Company)" req error={errors.pan}>
                <TInput value={form.pan} onChange={(v:string)=>{ setF("pan",v.toUpperCase()); if(/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(v.toUpperCase())) setErrors(p=>({...p,pan:""})); }} placeholder="AABCU9603R" ok hasError={!!errors.pan} />
              </Field>
            </CardSection>

            <CardSection
              icon={<svg width="18" height="18" viewBox="0 0 16 16" fill="none"><rect x="2" y="10" width="4" height="4" rx="1" fill={COPPER}/><rect x="6" y="6" width="4" height="8" rx="1" fill={COPPER} opacity="0.7"/><rect x="10" y="2" width="4" height="12" rx="1" fill={COPPER} opacity="0.4"/></svg>}
              title="Commodities Dealt In" sub="Non-ferrous metals your firm trades">
              <Field label="Metals & commodities" req error={errors.metals}>
                <textarea value={form.metals} onChange={e=>{ setF("metals",e.target.value); if(e.target.value.trim()) setErrors(p=>({...p,metals:""})); }} placeholder="e.g. Copper cathodes, Aluminium ingots, Zinc, Lead scrap, Brass…" rows={3}
                  style={{ ...inputBase, resize:"none", minHeight:90, ...(errors.metals ? inputError : {}) }} />
                <ErrorMsg msg={errors.metals} />
              </Field>
              <Field label="GST returns / documents link">
                <TInput value={form.gstReturnsUrls} onChange={(v:string)=>setF("gstReturnsUrls",v)} placeholder="Google Drive folder link to GST returns…" ok />
              </Field>
            </CardSection>

            <CardSection
              icon={<svg width="18" height="18" viewBox="0 0 16 16" fill="none"><rect x="2" y="7" width="12" height="7" rx="1" stroke={RED} strokeWidth="1.4"/><path d="M5 7V5a3 3 0 016 0v2" stroke={RED} strokeWidth="1.4"/></svg>}
              title="Banking & References" sub="Bank details and BME member references">
              <div style={rowStyle}>
                <Field label="Bank name">
                  <TInput value={form.bankName} onChange={(v:string)=>setF("bankName",v)} placeholder="Bank of Baroda" ok />
                </Field>
                <Field label="Branch">
                  <TInput value={form.bankBranch} onChange={(v:string)=>setF("bankBranch",v)} placeholder="Fort, Mumbai" ok />
                </Field>
              </div>
              <div style={rowStyle}>
                <Field label="Proposed by (BME member)">
                  <TInput value={form.proposer} onChange={(v:string)=>setF("proposer",v)} placeholder="Member name" ok />
                </Field>
                <Field label="Seconded by (BME member)">
                  <TInput value={form.seconder} onChange={(v:string)=>setF("seconder",v)} placeholder="Member name" ok />
                </Field>
              </div>
            </CardSection>
          </div>
        )}

        {/* ── STEP 4: MEMBERSHIP ── */}
        {step === 4 && (
          <div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, color:DARK, marginBottom:6 }}>Membership Type & Fees</h2>
            <p style={{ fontSize:15, color:MID, marginBottom:24, lineHeight:1.6 }}>Select your membership category and review the fee structure</p>

            <div style={cardStyle}>
              <div style={cardHeaderStyle}>
                <div style={{ width:36, height:36, borderRadius:8, background:COPPER_PALE, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M8 2l1.8 3.6L14 6.5l-3 2.9.7 4.1L8 11.4l-3.7 1.9.7-4.1L2 6.5l4.2-.9L8 2z" stroke={COPPER} strokeWidth="1.3" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div style={{ fontSize:15, fontWeight:600, color:DARK, fontFamily:"'Playfair Display',serif" }}>Choose Membership</div>
                  <div style={{ fontSize:12, color:MUTED, marginTop:2 }}>Annual renewal or lifetime benefit</div>
                </div>
              </div>
              <div style={cardBodyStyle}>
                <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:20 }}>
                  {MEM_TYPES.map(m => (
                    <div key={m.id} onClick={() => setF("memType",m.id)}
                      style={{ flex:1, minWidth:220, padding:"20px 22px", borderRadius:10, border:`2px solid ${form.memType===m.id ? COPPER : BORDER}`, cursor:"pointer", background:form.memType===m.id ? COPPER_PALE : SURFACE, transition:"all 0.2s" }}>
                      <div style={{ fontSize:12, fontWeight:600, color:COPPER, textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:6 }}>{m.label}</div>
                      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:700, color:DARK }}>₹{(m.base+m.entrance).toLocaleString("en-IN")}</div>
                      <div style={{ fontSize:12, color:MUTED, marginTop:3 }}>Entrance + {m.id==="Life"?"Life":"Annual"} + 18% GST</div>
                    </div>
                  ))}
                </div>
                <div style={infoBoxStyle}>
                  {form.memType==="Annual"
                    ? "Annual membership valid till 31 March 2026. Includes entrance fee + annual subscription + 18% GST."
                    : "Life membership — one-time payment, no annual renewal required. Includes entrance fee + life subscription + 18% GST."}
                </div>
              </div>
            </div>

            {/* Fee breakdown */}
            <div style={{ background:DARK, borderRadius:14, padding:"24px 28px", marginBottom:20 }}>
              {[
                ["Entrance fee", `₹ ${memInfo.entrance.toLocaleString("en-IN")}`],
                [form.memType==="Life"?"Life membership":"Annual subscription", `₹ ${memInfo.base.toLocaleString("en-IN")}`],
              ].map(([l,v]) => (
                <div key={l} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0" }}>
                  <span style={{ fontSize:14, color:"rgba(255,255,255,0.6)" }}>{l}</span>
                  <span style={{ fontSize:15, color:"#fff", fontWeight:500 }}>{v}</span>
                </div>
              ))}
              <div style={{ height:1, background:"rgba(255,255,255,0.12)", margin:"12px 0" }} />
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"4px 0" }}>
                <span style={{ fontSize:14, color:"rgba(255,255,255,0.6)" }}>GST @ 18%</span>
                <span style={{ fontSize:15, color:"#fff", fontWeight:500 }}>₹ {gst18.toLocaleString("en-IN")}</span>
              </div>
              <div style={{ height:1, background:"rgba(255,255,255,0.12)", margin:"12px 0" }} />
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontSize:16, color:"#fff", fontWeight:600 }}>Total Payable</span>
                <span style={{ fontSize:24, color:COPPER, fontWeight:700, fontFamily:"'Playfair Display',serif" }}>₹ {total.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* <CardSection
              icon={<svg width="18" height="18" viewBox="0 0 16 16" fill="none"><rect x="2" y="4" width="12" height="9" rx="2" stroke={RED} strokeWidth="1.4"/><path d="M5 8h2M5 10.5h4" stroke={RED} strokeWidth="1.2" strokeLinecap="round"/></svg>}
              title="Payment Details" sub="DD / Cheque / NEFT / RTGS to BME bank account">
              <div style={{ ...infoBoxStyle, marginBottom:16 }}>Bank of Baroda, Zaveri Bazar Branch · A/c: 70130100009852 · IFSC: BARB0DBZAVE</div>
              <div style={rowStyle}>
                <Field label="Payment mode">
                  <TSelect value={form.payMode||"NEFT/RTGS"} onChange={(v:string)=>setF("payMode",v)} options={["NEFT/RTGS","Cheque","DD","UPI","Cash"]} />
                </Field>
                <Field label="Ref / UTR / Cheque no.">
                  <TInput value={form.payRef} onChange={(v:string)=>setF("payRef",v)} placeholder="Reference number" ok />
                </Field>
              </div>
              <div style={rowStyle}>
                <Field label="Payment date">
                  <TInput value={form.payDate} onChange={(v:string)=>setF("payDate",v)} type="date" ok />
                </Field>
                <Field label="Drawn on bank">
                  <TInput value={form.payBank} onChange={(v:string)=>setF("payBank",v)} placeholder="Bank name" ok />
                </Field>
              </div>
            </CardSection> */}
          </div>
        )}

        {/* ── STEP 5: DOCUMENTS ── */}
        {step === 5 && (
          <div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, color:DARK, marginBottom:6 }}>Documents Checklist</h2>
            <p style={{ fontSize:15, color:MID, marginBottom:24, lineHeight:1.6 }}>Mark all documents you are enclosing with the application form</p>

            <div style={cardStyle}>
              {DOCS.map((doc,i) => (
                <div key={doc.id}
                  style={{ display:"flex", alignItems:"flex-start", gap:16, padding:"18px 22px", borderBottom: i < DOCS.length-1 ? `1px solid ${BORDER}` : "none", cursor:"pointer" }}
                  onClick={() => setF("docsChecked", { ...form.docsChecked, [doc.id]:!form.docsChecked[doc.id] })}>
                  <div style={{ width:22, height:22, borderRadius:5, border:`2px solid ${form.docsChecked[doc.id] ? RED : BORDER}`, background:form.docsChecked[doc.id] ? RED : SURFACE, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2, transition:"all 0.2s" }}>
                    {form.docsChecked[doc.id] && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6l3 3 4-4.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:15, fontWeight:500, color:DARK, marginBottom:4 }}>{doc.name}</div>
                    <div style={{ fontSize:13, color:MUTED, lineHeight:1.5 }}>{doc.note}</div>
                    <span style={{ fontSize:11, padding:"3px 10px", borderRadius:8, marginTop:7, display:"inline-block", fontWeight:600, background:doc.req ? RED_PALE : GREEN_BG, color:doc.req ? RED : GREEN }}>{doc.req ? "Required" : "Optional"}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background:RED_PALE, borderRadius:12, padding:"18px 22px", border:`1px solid rgba(229,34,34,0.15)`, marginBottom:8 }}>
              <p style={{ fontSize:14, fontWeight:600, color:RED, marginBottom:8 }}>Declaration</p>
              <p style={{ fontSize:14, color:MID, lineHeight:1.7 }}>
                I/We declare that the above statements are true and correct and agree to abide by the Memorandum, Articles of Association and Bye-laws of Bombay Metal Exchange Ltd. and to pay such fees as may be prescribed by the Exchange.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── BOTTOM NAVIGATION ── */}
      <div style={{ position:"fixed", bottom:0, left:0, right:0, background:SURFACE, borderTop:`1px solid ${BORDER}`, padding:"16px 28px", display:"flex", gap:12, zIndex:100, boxShadow:"0 -4px 20px rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth:1060, margin:"0 auto", width:"100%", display:"flex", gap:12 }}>
          {step > 0 && (
            <button onClick={() => { setErrors({}); setStep(s => s-1); }}
              style={{ padding:"14px 28px", borderRadius:8, fontSize:15, fontWeight:600, cursor:"pointer", border:`1.5px solid ${BORDER}`, background:SURFACE2, color:MID, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
              ← Back
            </button>
          )}
          {step < STEPS.length-1 ? (
            <button onClick={step === 0 ? () => setStep(1) : goNext}
              style={{ flex:1, padding:14, borderRadius:8, fontSize:15, fontWeight:600, cursor:"pointer", border:"none", background:RED, color:"#fff", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
              {step===0 ? "Get Started →" : "Continue →"}
            </button>
          ) : (
            <button onClick={submitApplication} disabled={submitting}
              style={{ flex:1, padding:14, borderRadius:8, fontSize:15, fontWeight:600, cursor:"pointer", border:"none", background:COPPER, color:"#fff", fontFamily:"'Plus Jakarta Sans',sans-serif", opacity:submitting?0.7:1 }}>
              {submitting ? "Processing…" : "Submit Application"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}