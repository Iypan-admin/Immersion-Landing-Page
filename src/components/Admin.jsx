import { useState, useCallback } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

// ─── Light Theme Styles ───────────────────────────────────────────────────────
const S = {
  page:    { minHeight: "100vh", background: "#f5f5f5", fontFamily: "'DM Sans', system-ui, sans-serif", color: "#111827" },
  center:  { minHeight: "100vh", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', system-ui, sans-serif" },

  header:  { background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "14px 32px", display: "flex", alignItems: "center", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" },
  logo:    { width: 34, height: 34, background: "linear-gradient(135deg,#4f46e5,#7c3aed)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, marginRight: 10, flexShrink: 0 },
  logoText:{ fontWeight: 700, fontSize: 15, color: "#111827" },
  logoSub: { fontSize: 11, color: "#9ca3af", marginLeft: 4 },

  tabBar:  { background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 32px", display: "flex", gap: 4, position: "sticky", top: 57, zIndex: 40 },
  tab: (a) => ({
    background: "none", border: "none", cursor: "pointer", fontFamily: "inherit",
    padding: "13px 18px", fontSize: 13, fontWeight: 600,
    color: a ? "#4f46e5" : "#6b7280",
    borderBottom: a ? "2px solid #4f46e5" : "2px solid transparent",
    marginBottom: -1, transition: "all 0.15s",
  }),

  content: { padding: "28px 32px", maxWidth: 1400, margin: "0 auto" },
  card:    { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 20, marginBottom: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" },

  statCard: (accent) => ({
    background: "#fff", border: "1px solid #e5e7eb",
    borderRadius: 12, padding: "18px 22px", flex: 1, minWidth: 130,
    borderTop: `3px solid ${accent}`, boxShadow: "0 1px 4px rgba(0,0,0,0.05)"
  }),
  statLabel: { color: "#9ca3af", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 },
  statValue: { color: "#111827", fontSize: 24, fontWeight: 700, fontFamily: "monospace" },

  tableWrap: { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" },
  tableHead: { padding: "10px 14px", textAlign: "left", color: "#6b7280", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", borderBottom: "1px solid #f3f4f6", whiteSpace: "nowrap", background: "#f9fafb" },
  tableCell: { padding: "10px 14px", color: "#374151", fontSize: 13 },
  tableInfo: { padding: "10px 16px", borderBottom: "1px solid #f3f4f6", color: "#9ca3af", fontSize: 12 },
  emptyMsg:  { textAlign: "center", color: "#9ca3af", padding: "48px 0", fontSize: 14 },

  input:    { background: "#fff", border: "1px solid #d1d5db", color: "#111827", padding: "8px 13px", borderRadius: 8, fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box" },
  inputFull:{ background: "#fff", border: "1px solid #d1d5db", color: "#111827", padding: "8px 13px", borderRadius: 8, fontSize: 13, fontFamily: "inherit", outline: "none", width: "100%", boxSizing: "border-box" },
  label:    { fontSize: 12, color: "#6b7280", fontWeight: 600, display: "block", marginBottom: 4 },

  btnPrimary:   { background: "#4f46e5", color: "#fff", border: "none", padding: "8px 18px", borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" },
  btnSecondary: { background: "#fff", color: "#6b7280", border: "1px solid #d1d5db", padding: "8px 18px", borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" },
  btnSuccess:   { background: "#16a34a", color: "#fff", border: "none", padding: "5px 12px", borderRadius: 6, fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: "inherit" },
  btnWarning:   { background: "#d97706", color: "#fff", border: "none", padding: "6px 14px", borderRadius: 6, fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: "inherit" },
  btnGhost:     { background: "#fff", color: "#6b7280", border: "1px solid #d1d5db", padding: "5px 12px", borderRadius: 6, fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: "inherit" },
  btnDanger:    { background: "#fff", color: "#dc2626", border: "1px solid #fca5a5", padding: "5px 12px", borderRadius: 6, fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: "inherit" },

  loginBox:  { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 18, padding: "44px 38px", width: "100%", maxWidth: 380, textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" },
  loginIcon: { fontSize: 36, marginBottom: 18, display: "block" },
  loginTitle:{ color: "#111827", fontSize: 22, fontWeight: 700, margin: "0 0 6px" },
  loginSub:  { color: "#9ca3af", fontSize: 14, margin: "0 0 28px" },

  modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: 20 },
  modalBox:     { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: 28, width: "100%", maxWidth: 520, boxShadow: "0 20px 60px rgba(0,0,0,0.15)", maxHeight: "90vh", overflowY: "auto" },
};

// ─── Small helpers ────────────────────────────────────────────────────────────
function StatCard({ label, value, accent }) {
  return (
    <div style={S.statCard(accent)}>
      <div style={S.statLabel}>{label}</div>
      <div style={S.statValue}>{value}</div>
    </div>
  );
}

function Table({ columns, rows, emptyMsg }) {
  if (!rows || rows.length === 0) return <div style={S.emptyMsg}>{emptyMsg || "No data"}</div>;
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>{columns.map(c => <th key={c.key} style={S.tableHead}>{c.label}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}
              onMouseEnter={e => e.currentTarget.style.background = "#f9fafb"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              {columns.map(c => (
                <td key={c.key} style={{ ...S.tableCell, whiteSpace: c.wrap ? "normal" : "nowrap" }}>
                  {c.render ? c.render(row[c.key], row) : (row[c.key] ?? "—")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div style={S.modalOverlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={S.modalBox}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#111827" }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#9ca3af", lineHeight: 1 }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function FilterBtn({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      padding: "6px 13px", borderRadius: 8, border: "1px solid", fontSize: 12, fontWeight: 600,
      cursor: "pointer", fontFamily: "inherit",
      borderColor: active ? "#4f46e5" : "#d1d5db",
      background: active ? "#eef2ff" : "#fff",
      color: active ? "#4f46e5" : "#6b7280"
    }}>{children}</button>
  );
}

function LangBadge({ lang }) {
  const map = { French: ["#eef2ff","#4f46e5"], German: ["#fefce8","#ca8a04"], Japanese: ["#fdf2f8","#db2777"] };
  const [bg, color] = map[lang] || ["#f3f4f6","#6b7280"];
  return <span style={{ background: bg, color, border: `1px solid ${color}33`, padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{lang}</span>;
}

function StatusPill({ status }) {
  const map = {
    PENDING: ["#fefce8","#ca8a04","#fde047"],
    PAID:    ["#f0fdf4","#16a34a","#86efac"],
  };
  const [bg, color, dot] = map[status] || map.PENDING;
  return (
    <span style={{ background: bg, color, border: `1px solid ${dot}`, padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 5 }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, display: "inline-block" }} />
      {status}
    </span>
  );
}

function DateCell({ v }) {
  if (!v) return <span style={{ color: "#d1d5db" }}>—</span>;
  return <span style={{ color: "#6b7280" }}>{new Date(v).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span>;
}

function CodeChip({ value, color = "#4f46e5", bg = "#eef2ff" }) {
  if (!value) return <span style={{ color: "#d1d5db" }}>—</span>;
  return (
    <span style={{ fontFamily: "monospace", color, background: bg, padding: "2px 8px", borderRadius: 4, fontSize: 12, fontWeight: 700 }}>
      {value}
    </span>
  );
}

// ─── LEADS TAB ────────────────────────────────────────────────────────────────
function LeadsTab({ password }) {
  const [rows, setRows]             = useState([]);
  const [loading, setLoading]       = useState(false);
  const [loaded, setLoaded]         = useState(false);
  const [search, setSearch]         = useState("");
  const [langFilter, setLangFilter] = useState("ALL");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/admin/get-leads`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      if (!res.ok) { alert("Wrong password or server error"); setLoading(false); return; }
      setRows(await res.json()); setLoaded(true);
    } catch { alert("Failed to load leads"); }
    setLoading(false);
  }, [password]);

  const download = async () => {
    const res = await fetch(`${BACKEND_URL}/admin/download-leads`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "leads.csv";
    document.body.appendChild(a); a.click(); a.remove();
  };

  const filtered = rows.filter(r => {
    const matchLang = langFilter === "ALL" || r.language === langFilter;
    const q = search.toLowerCase();
    return matchLang && (!q || r.name?.toLowerCase().includes(q) || r.email?.toLowerCase().includes(q) || r.phone?.includes(q));
  });

  const counts = {
    total: rows.length,
    french: rows.filter(r => r.language === "French").length,
    german: rows.filter(r => r.language === "German").length,
    japanese: rows.filter(r => r.language === "Japanese").length,
    referred: rows.filter(r => r.referral).length,
  };

  const columns = [
    { key: "id",       label: "#",        render: v => <span style={{ color: "#9ca3af", fontSize: 11 }}>{v}</span> },
    { key: "name",     label: "Name",     render: v => <span style={{ fontWeight: 600, color: "#111827" }}>{v}</span> },
    { key: "email",    label: "Email",    render: v => <span style={{ color: "#6b7280" }}>{v}</span> },
    { key: "phone",    label: "Phone" },
    { key: "language", label: "Language", render: v => <LangBadge lang={v} /> },
    { key: "level",    label: "Level",    render: v => <span style={{ color: "#6b7280", fontSize: 12 }}>{v}</span> },
    // ── Referral column: shows code, highlights when present ──
    { key: "referral", label: "Ref Code", render: v => v
      ? <CodeChip value={v} />
      : <span style={{ color: "#d1d5db", fontSize: 12 }}>No ref</span>
    },
    { key: "created_at", label: "Date", render: v => <DateCell v={v} /> },
  ];

  if (!loaded) return (
    <div style={{ textAlign: "center", paddingTop: 80 }}>
      <div style={{ fontSize: 44, marginBottom: 16 }}>📋</div>
      <p style={{ color: "#9ca3af", marginBottom: 20, fontSize: 14 }}>Click to load enquiry leads</p>
      <button onClick={load} disabled={loading} style={S.btnPrimary}>{loading ? "Loading..." : "Load Leads"}</button>
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        <StatCard label="Total"    value={counts.total}    accent="#4f46e5" />
        <StatCard label="French"   value={counts.french}   accent="#4f6ef7" />
        <StatCard label="German"   value={counts.german}   accent="#ca8a04" />
        <StatCard label="Japanese" value={counts.japanese} accent="#db2777" />
        <StatCard label="Referred" value={counts.referred} accent="#16a34a" />
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, email, phone..."
          style={{ ...S.input, width: 260 }} />
        <div style={{ display: "flex", gap: 6 }}>
          {["ALL","French","German","Japanese"].map(l => (
            <FilterBtn key={l} active={langFilter === l} onClick={() => setLangFilter(l)}>{l}</FilterBtn>
          ))}
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button onClick={load} style={S.btnSecondary} disabled={loading}>↻ Refresh</button>
          <button onClick={download} style={S.btnPrimary}>↓ Export CSV</button>
        </div>
      </div>
      <div style={S.tableWrap}>
        <div style={S.tableInfo}>Showing {filtered.length} of {rows.length} leads</div>
        <Table columns={columns} rows={filtered} emptyMsg="No leads yet" />
      </div>
    </div>
  );
}

// ─── AFFILIATES TAB ───────────────────────────────────────────────────────────
function AffiliatesTab({ password }) {
  const [rows, setRows]           = useState([]);
  const [loading, setLoading]     = useState(false);
  const [loaded, setLoaded]       = useState(false);
  const [search, setSearch]       = useState("");

  // ── Create form — now has ame_code + ap_code instead of referred_by fields ──
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    ame_code: "",       // Internal employee who is hiring this affiliate
    ap_code: "",        // Existing affiliate who recommended this new person
  });
  const [creating, setCreating]   = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [copied, setCopied]       = useState(false);
  const [editRow, setEditRow]     = useState(null);
  const [editForm, setEditForm]   = useState({});
  const [saving, setSaving]       = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/admin/get-affiliates`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      if (!res.ok) { alert("Error loading"); setLoading(false); return; }
      setRows(await res.json()); setLoaded(true);
    } catch { alert("Failed to load"); }
    setLoading(false);
  }, [password]);

  const createAffiliate = async () => {
    if (!form.name || !form.email || !form.phone) { alert("Name, email and phone are required"); return; }
    setCreating(true);
    try {
      const res = await fetch(`${BACKEND_URL}/admin/create-affiliate`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          name: form.name,
          email: form.email,
          phone: form.phone,
          // Map to backend field names
          ame_code: form.ame_code || null,       // employee who hired this affiliate
          referred_by: form.ap_code || null,     // existing affiliate who referred this person
        })
      });
      const data = await res.json();
      if (!res.ok) { alert(data.error); setCreating(false); return; }
      setGeneratedLink(data.link);
      setGeneratedCode(data.ref_code);
      setForm({ name: "", email: "", phone: "", ame_code: "", ap_code: "" });
      if (loaded) load();
    } catch { alert("Error creating"); }
    setCreating(false);
  };

  const openEdit = row => {
    setEditRow(row);
    setEditForm({
      name: row.name,
      email: row.email,
      phone: row.phone,
      ame_code: row.ame_code || "",
      ap_code: row.referred_by || "",
    });
  };

  const saveEdit = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${BACKEND_URL}/admin/edit-affiliate`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          ref_code: editRow.ref_code,
          name: editForm.name,
          email: editForm.email,
          phone: editForm.phone,
          ame_code: editForm.ame_code || null,
          referred_by: editForm.ap_code || null,
        })
      });
      if (!res.ok) { alert("Save failed"); setSaving(false); return; }
      setEditRow(null); load();
    } catch { alert("Error saving"); }
    setSaving(false);
  };

  const filtered = rows.filter(r => {
    const q = search.toLowerCase();
    return !q || r.name?.toLowerCase().includes(q) || r.ref_code?.toLowerCase().includes(q) || r.email?.toLowerCase().includes(q);
  });

  const totalPending = rows.reduce((s, r) => s + parseFloat(r.pending_payout || 0), 0);
  const totalPaid    = rows.reduce((s, r) => s + parseFloat(r.paid_payout || 0), 0);

  const columns = [
    { key: "ref_code",  label: "AP Ref Code", render: v => <CodeChip value={v} /> },
    { key: "name",      label: "Name",         render: v => <span style={{ fontWeight: 600, color: "#111827" }}>{v}</span> },
    { key: "email",     label: "Email",        render: v => <span style={{ color: "#6b7280" }}>{v}</span> },
    { key: "phone",     label: "Phone" },
    { key: "ame_code",  label: "AME Code",     render: v => <CodeChip value={v} color="#7c3aed" bg="#faf5ff" /> },
    { key: "referred_by", label: "Referred By (AP)", render: v => <CodeChip value={v} color="#0891b2" bg="#ecfeff" /> },
    { key: "success",        label: "Sales",   render: v => <span style={{ color: "#16a34a", fontWeight: 700 }}>{v || 0}</span> },
    { key: "pending_payout", label: "Pending", render: v => <span style={{ color: "#d97706", fontWeight: 700 }}>₹{parseFloat(v || 0).toLocaleString()}</span> },
    { key: "paid_payout",    label: "Paid",    render: v => <span style={{ color: "#16a34a", fontWeight: 700 }}>₹{parseFloat(v || 0).toLocaleString()}</span> },
    { key: "total_earnings", label: "Total",   render: v => <span style={{ color: "#4f46e5", fontWeight: 700 }}>₹{parseFloat(v || 0).toLocaleString()}</span> },
    { key: "_edit", label: "", render: (_, row) => <button onClick={() => openEdit(row)} style={S.btnGhost}>✏️ Edit</button> },
  ];

  return (
    <div>
      {/* ── Create affiliate card ── */}
      <div style={S.card}>
        <div style={{ color: "#9ca3af", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>➕ Add New Affiliate</div>

        {/* Row 1: basic info */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end", marginBottom: 12 }}>
          {[["Name *","name",160],["Email *","email",210],["Phone *","phone",150]].map(([lbl,key,w]) => (
            <div key={key}>
              <div style={S.label}>{lbl}</div>
              <input placeholder={lbl.replace(" *","")} value={form[key]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                style={{ ...S.input, width: w }} />
            </div>
          ))}
        </div>

        {/* Row 2: code fields with explanations */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end", marginBottom: 14 }}>
          <div>
            <div style={S.label}>
              AME Code
              <span style={{ fontWeight: 400, color: "#9ca3af", marginLeft: 6, fontSize: 11 }}>
                — Internal employee who is hiring this affiliate
              </span>
            </div>
            <input
              placeholder="e.g. AME001"
              value={form.ame_code}
              onChange={e => setForm(f => ({ ...f, ame_code: e.target.value }))}
              style={{ ...S.input, width: 160, fontFamily: "monospace" }}
            />
          </div>

          <div>
            <div style={S.label}>
              AP Code
              <span style={{ fontWeight: 400, color: "#9ca3af", marginLeft: 6, fontSize: 11 }}>
                — Existing affiliate who recommended this new person
              </span>
            </div>
            <input
              placeholder="e.g. RAJ456"
              value={form.ap_code}
              onChange={e => setForm(f => ({ ...f, ap_code: e.target.value }))}
              style={{ ...S.input, width: 160, fontFamily: "monospace" }}
            />
          </div>

          <button onClick={createAffiliate} disabled={creating}
            style={{ ...S.btnPrimary, alignSelf: "flex-end", paddingTop: 9, paddingBottom: 9 }}>
            {creating ? "Creating..." : "+ Generate Link"}
          </button>
        </div>

        {/* Code legend */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", padding: "10px 14px", background: "#f9fafb", borderRadius: 8, fontSize: 12, color: "#6b7280" }}>
          <span>
            <strong style={{ color: "#7c3aed" }}>AME Code</strong> — "Account Manager Employee": the internal staff member who onboarded this affiliate.
          </span>
          <span>
            <strong style={{ color: "#0891b2" }}>AP Code</strong> — "Affiliate Partner": an existing affiliate who referred/recommended this new affiliate.
          </span>
        </div>

        {/* Generated link display */}
        {generatedLink && (
          <div style={{ marginTop: 14, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "12px 14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ color: "#16a34a", fontSize: 12, fontWeight: 700 }}>✓ AFFILIATE CREATED</span>
              <span style={{ background: "#dcfce7", color: "#16a34a", fontFamily: "monospace", fontSize: 13, fontWeight: 700, padding: "2px 10px", borderRadius: 6 }}>
                {generatedCode}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={{ color: "#374151", fontSize: 12, fontFamily: "monospace", flex: 1, wordBreak: "break-all" }}>{generatedLink}</span>
              <button onClick={() => { navigator.clipboard.writeText(generatedLink); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={S.btnSecondary}>
                {copied ? "✓ Copied!" : "Copy Link"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Affiliates table ── */}
      {!loaded ? (
        <div style={{ textAlign: "center", paddingTop: 20 }}>
          <button onClick={load} disabled={loading} style={S.btnPrimary}>{loading ? "Loading..." : "Load Affiliates"}</button>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
            <StatCard label="Total Affiliates" value={rows.length}                          accent="#4f46e5" />
            <StatCard label="Pending Payouts"  value={`₹${totalPending.toLocaleString()}`} accent="#d97706" />
            <StatCard label="Total Paid Out"   value={`₹${totalPaid.toLocaleString()}`}    accent="#16a34a" />
          </div>
          <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, ref code, email..."
              style={{ ...S.input, width: 280 }} />
            <div style={{ marginLeft: "auto" }}>
              <button onClick={load} style={S.btnSecondary} disabled={loading}>↻ Refresh</button>
            </div>
          </div>
          <div style={S.tableWrap}>
            <div style={S.tableInfo}>{filtered.length} affiliate{filtered.length !== 1 ? "s" : ""}</div>
            <Table columns={columns} rows={filtered} emptyMsg="No affiliates yet" />
          </div>
        </>
      )}

      {/* ── Edit modal ── */}
      {editRow && (
        <Modal title={`Edit — ${editRow.name} (${editRow.ref_code})`} onClose={() => setEditRow(null)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[["Name","name"],["Email","email"],["Phone","phone"]].map(([lbl,key]) => (
              <div key={key}>
                <label style={S.label}>{lbl}</label>
                <input value={editForm[key]} onChange={e => setEditForm(f => ({ ...f, [key]: e.target.value }))} style={S.inputFull} />
              </div>
            ))}

            <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, padding: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Code Fields</div>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <label style={S.label}>AME Code <span style={{ fontWeight: 400, color: "#9ca3af" }}>(employee)</span></label>
                  <input value={editForm.ame_code} placeholder="Blank to clear"
                    onChange={e => setEditForm(f => ({ ...f, ame_code: e.target.value }))}
                    style={{ ...S.inputFull, fontFamily: "monospace" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={S.label}>AP Code <span style={{ fontWeight: 400, color: "#9ca3af" }}>(referring affiliate)</span></label>
                  <input value={editForm.ap_code}
                    onChange={e => setEditForm(f => ({ ...f, ap_code: e.target.value }))}
                    style={{ ...S.inputFull, fontFamily: "monospace" }} />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
              <button onClick={() => setEditRow(null)} style={S.btnSecondary}>Cancel</button>
              <button onClick={saveEdit} disabled={saving} style={S.btnPrimary}>{saving ? "Saving..." : "Save Changes"}</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── PAYOUTS TAB ──────────────────────────────────────────────────────────────
function PayoutsTab({ password }) {
  const [rows, setRows]               = useState([]);
  const [loading, setLoading]         = useState(false);
  const [loaded, setLoaded]           = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch]           = useState("");

  const [payModal, setPayModal]       = useState(null);
  const [payAmount, setPayAmount]     = useState("");
  const [payNote, setPayNote]         = useState("");
  const [paying, setPaying]           = useState(false);

  const [bulkModal, setBulkModal]     = useState(null);
  const [bulkAmounts, setBulkAmounts] = useState({});
  const [bulkPaying, setBulkPaying]   = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/admin/get-payouts`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      if (!res.ok) { alert("Error loading payouts"); setLoading(false); return; }
      setRows(await res.json()); setLoaded(true);
    } catch { alert("Failed"); }
    setLoading(false);
  }, [password]);

  const openPayModal = (row) => {
    setPayModal(row);
    setPayAmount(String(row.amount || ""));
    setPayNote("");
  };

  const confirmPay = async () => {
    if (!payAmount || isNaN(payAmount) || parseFloat(payAmount) < 0) { alert("Enter a valid amount"); return; }
    setPaying(true);
    try {
      const res = await fetch(`${BACKEND_URL}/admin/mark-payout-paid`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, payout_id: payModal.id, amount: parseFloat(payAmount) })
      });
      if (!res.ok) { alert("Failed to update"); setPaying(false); return; }
      setPayModal(null); await load();
    } catch { alert("Error"); }
    setPaying(false);
  };

  const openBulkModal = (ref_code) => {
    const aff = pendingByAffiliate[ref_code];
    const amounts = {};
    aff.rows.forEach(r => { amounts[r.id] = String(r.amount); });
    setBulkAmounts(amounts);
    setBulkModal(aff);
  };

  const confirmBulkPay = async () => {
    setBulkPaying(true);
    try {
      const res = await fetch(`${BACKEND_URL}/admin/mark-all-paid`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, ref_code: bulkModal.ref_code, amounts: bulkAmounts })
      });
      if (!res.ok) { alert("Failed"); setBulkPaying(false); return; }
      setBulkModal(null); await load();
    } catch { alert("Error"); }
    setBulkPaying(false);
  };

  const download = async () => {
    const res = await fetch(`${BACKEND_URL}/admin/download-payouts`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "payouts.csv";
    document.body.appendChild(a); a.click(); a.remove();
  };

  const filtered = rows.filter(r => {
    const matchStatus = statusFilter === "ALL" || r.status === statusFilter;
    const q = search.toLowerCase();
    return matchStatus && (!q || r.influencer_name?.toLowerCase().includes(q) || r.influencer_ref_code?.toLowerCase().includes(q) || r.customer_name?.toLowerCase().includes(q));
  });

  const totalPending = rows.filter(r => r.status === "PENDING").reduce((s, r) => s + parseFloat(r.amount || 0), 0);
  const totalPaid    = rows.filter(r => r.status === "PAID").reduce((s, r) => s + parseFloat(r.amount || 0), 0);

  const pendingByAffiliate = rows.filter(r => r.status === "PENDING").reduce((acc, r) => {
    if (!acc[r.influencer_ref_code]) acc[r.influencer_ref_code] = { name: r.influencer_name, ref_code: r.influencer_ref_code, total: 0, count: 0, rows: [] };
    acc[r.influencer_ref_code].total += parseFloat(r.amount || 0);
    acc[r.influencer_ref_code].count += 1;
    acc[r.influencer_ref_code].rows.push(r);
    return acc;
  }, {});

  const columns = [
    { key: "influencer_name", label: "Affiliate", render: (v, row) => (
      <div>
        <div style={{ fontWeight: 600, color: "#111827" }}>{v}</div>
        <div style={{ fontFamily: "monospace", color: "#4f46e5", fontSize: 11 }}>{row.influencer_ref_code}</div>
      </div>
    )},
    { key: "level", label: "Level", render: v => (
      <span style={{ background: v == 1 ? "#eef2ff" : "#faf5ff", color: v == 1 ? "#4f46e5" : "#7c3aed", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>L{v}</span>
    )},
    { key: "customer_name", label: "Lead", render: (v, row) => (
      <div>
        <div style={{ color: "#374151", fontWeight: 600 }}>{v}</div>
        <div style={{ color: "#9ca3af", fontSize: 11 }}>{row.customer_email}</div>
      </div>
    )},
    { key: "amount",     label: "Amount", render: v => <span style={{ fontWeight: 700, color: "#111827" }}>₹{parseFloat(v).toLocaleString()}</span> },
    { key: "status",     label: "Status", render: v => <StatusPill status={v} /> },
    { key: "created_at", label: "Date",    render: v => <DateCell v={v} /> },
    { key: "paid_at",    label: "Paid On", render: v => v ? <DateCell v={v} /> : <span style={{ color: "#d1d5db" }}>—</span> },
    { key: "_action", label: "", render: (_, row) => row.status === "PENDING"
      ? <button onClick={() => openPayModal(row)} style={S.btnSuccess}>Mark Paid</button>
      : <span style={{ color: "#16a34a", fontSize: 12, fontWeight: 600 }}>✓ Paid</span>
    },
  ];

  if (!loaded) return (
    <div style={{ textAlign: "center", paddingTop: 80 }}>
      <div style={{ fontSize: 44, marginBottom: 16 }}>💰</div>
      <p style={{ color: "#9ca3af", marginBottom: 20, fontSize: 14 }}>Click to load payout records</p>
      <button onClick={load} disabled={loading} style={S.btnPrimary}>{loading ? "Loading..." : "Load Payouts"}</button>
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        <StatCard label="Total Payouts" value={rows.length}                         accent="#4f46e5" />
        <StatCard label="Pending"       value={`₹${totalPending.toLocaleString()}`} accent="#d97706" />
        <StatCard label="Paid Out"      value={`₹${totalPaid.toLocaleString()}`}    accent="#16a34a" />
      </div>

      {Object.keys(pendingByAffiliate).length > 0 && (
        <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 12, padding: 16, marginBottom: 20 }}>
          <div style={{ color: "#92400e", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>⚡ Pending — Quick Settle</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {Object.values(pendingByAffiliate).map(aff => (
              <div key={aff.ref_code} style={{ background: "#fff", border: "1px solid #fde68a", borderRadius: 8, padding: "10px 16px", display: "flex", alignItems: "center", gap: 14 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: "#111827" }}>{aff.name}</div>
                  <div style={{ fontSize: 11, color: "#9ca3af" }}>{aff.ref_code} · {aff.count} payout{aff.count > 1 ? "s" : ""}</div>
                </div>
                <span style={{ fontWeight: 700, color: "#d97706" }}>₹{aff.total.toLocaleString()}</span>
                <button onClick={() => openBulkModal(aff.ref_code)} style={S.btnWarning}>Settle All</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search affiliate or lead..."
          style={{ ...S.input, width: 280 }} />
        <div style={{ display: "flex", gap: 6 }}>
          {["ALL","PENDING","PAID"].map(s => (
            <FilterBtn key={s} active={statusFilter === s} onClick={() => setStatusFilter(s)}>{s}</FilterBtn>
          ))}
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button onClick={load} style={S.btnSecondary} disabled={loading}>↻ Refresh</button>
          <button onClick={download} style={S.btnPrimary}>↓ Export CSV</button>
        </div>
      </div>

      <div style={S.tableWrap}>
        <div style={S.tableInfo}>Showing {filtered.length} of {rows.length} payouts</div>
        <Table columns={columns} rows={filtered} emptyMsg="No payouts yet" />
      </div>

      {payModal && (
        <Modal title="Mark Payout as Paid" onClose={() => setPayModal(null)}>
          <div style={{ marginBottom: 16, background: "#f9fafb", borderRadius: 8, padding: "12px 14px" }}>
            <div style={{ fontSize: 13, color: "#374151" }}>
              <strong>{payModal.influencer_name}</strong> ({payModal.influencer_ref_code})
            </div>
            <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
              Lead: {payModal.customer_name} · {payModal.customer_email}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={S.label}>Payout Amount (₹)</label>
            <input type="number" min="0" value={payAmount}
              onChange={e => setPayAmount(e.target.value)}
              style={{ ...S.inputFull, fontSize: 18, fontWeight: 700, padding: "10px 14px" }}
              placeholder="Enter amount" autoFocus />
            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 5 }}>
              Default from DB: ₹{payModal.amount} — edit if actual payout differs
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={S.label}>Note (optional)</label>
            <input value={payNote} onChange={e => setPayNote(e.target.value)}
              style={S.inputFull} placeholder="e.g. Paid via UPI on 12 Mar" />
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={() => setPayModal(null)} style={S.btnSecondary}>Cancel</button>
            <button onClick={confirmPay} disabled={paying} style={S.btnSuccess}>
              {paying ? "Saving..." : `✓ Confirm Pay ₹${payAmount || 0}`}
            </button>
          </div>
        </Modal>
      )}

      {bulkModal && (
        <Modal title={`Settle All — ${bulkModal.name} (${bulkModal.ref_code})`} onClose={() => setBulkModal(null)}>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>
            Review and adjust each payout amount before confirming.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20, maxHeight: 320, overflowY: "auto" }}>
            {bulkModal.rows.map(r => (
              <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 12, background: "#f9fafb", borderRadius: 8, padding: "10px 12px" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{r.customer_name}</div>
                  <div style={{ fontSize: 11, color: "#9ca3af" }}>{r.customer_email}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 13, color: "#374151" }}>₹</span>
                  <input type="number" min="0"
                    value={bulkAmounts[r.id] ?? r.amount}
                    onChange={e => setBulkAmounts(a => ({ ...a, [r.id]: e.target.value }))}
                    style={{ ...S.input, width: 90, fontWeight: 700, textAlign: "right" }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "10px 14px", marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, color: "#374151" }}>Total to be paid</span>
            <span style={{ fontWeight: 700, color: "#16a34a", fontSize: 15 }}>
              ₹{Object.values(bulkAmounts).reduce((s, v) => s + (parseFloat(v) || 0), 0).toLocaleString()}
            </span>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={() => setBulkModal(null)} style={S.btnSecondary}>Cancel</button>
            <button onClick={confirmBulkPay} disabled={bulkPaying} style={S.btnSuccess}>
              {bulkPaying ? "Settling..." : "✓ Confirm Settle All"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── MAIN ADMIN ───────────────────────────────────────────────────────────────
export default function Admin() {
  const [password, setPassword]       = useState("");
  const [authed, setAuthed]           = useState(false);
  const [tab, setTab]                 = useState("leads");
  const [authLoading, setAuthLoading] = useState(false);

  const handleAuth = async () => {
    if (!password) return;
    setAuthLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/admin/get-leads`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      if (res.ok) setAuthed(true);
      else alert("Wrong password");
    } catch { alert("Server error"); }
    setAuthLoading(false);
  };

  if (!authed) return (
    <div style={S.center}>
      <div style={S.loginBox}>
        <span style={S.loginIcon}>✦</span>
        <h1 style={S.loginTitle}>Success Learning</h1>
        <p style={S.loginSub}>Admin Dashboard</p>
        <input type="password" placeholder="Enter admin password" value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleAuth()}
          style={{ ...S.inputFull, padding: "12px 16px", fontSize: 14, marginBottom: 12 }} />
        <button onClick={handleAuth} disabled={authLoading}
          style={{ ...S.btnPrimary, width: "100%", padding: "12px", fontSize: 14 }}>
          {authLoading ? "Checking..." : "Enter Dashboard"}
        </button>
      </div>
    </div>
  );

  return (
    <div style={S.page}>
      <div style={S.header}>
        <div style={S.logo}>✦</div>
        <span style={S.logoText}>Success Learning <span style={S.logoSub}>Admin</span></span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e88" }} />
            <span style={{ color: "#9ca3af", fontSize: 13 }}>Live</span>
          </div>
          <button onClick={() => { setAuthed(false); setPassword(""); }} style={S.btnSecondary}>Logout</button>
        </div>
      </div>

      <div style={S.tabBar}>
        {[
          { id: "leads",      label: "📋 Leads" },
          { id: "affiliates", label: "🔗 Affiliates" },
          { id: "payouts",    label: "💰 Payouts" },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={S.tab(tab === t.id)}>{t.label}</button>
        ))}
      </div>

      <div style={S.content}>
        {tab === "leads"      && <LeadsTab      password={password} />}
        {tab === "affiliates" && <AffiliatesTab password={password} />}
        {tab === "payouts"    && <PayoutsTab    password={password} />}
      </div>
    </div>
  );
}
