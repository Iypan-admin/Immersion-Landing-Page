import { useState, useCallback } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = {
  page:    { minHeight: "100vh", background: "#0d0618", fontFamily: "'DM Sans', system-ui, sans-serif", color: "#c8b8e0" },
  center:  { minHeight: "100vh", background: "#0d0618", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', system-ui, sans-serif" },

  header:  { background: "rgba(19,8,43,0.95)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "14px 32px", display: "flex", alignItems: "center", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 50 },
  logo:    { width: 34, height: 34, background: "linear-gradient(135deg,#3d2080,#5a35b0)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, marginRight: 10 },
  logoText:{ fontWeight: 700, fontSize: 15, color: "#fff", letterSpacing: "-0.02em" },
  logoSub: { fontSize: 11, color: "#7c5cbf", marginLeft: 4 },

  tabBar:  { background: "rgba(13,6,24,0.9)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 32px", display: "flex", gap: 4, position: "sticky", top: 57, zIndex: 40, backdropFilter: "blur(8px)" },
  tab: (a) => ({
    background: "none", border: "none", cursor: "pointer", fontFamily: "inherit",
    padding: "13px 18px", fontSize: 13, fontWeight: 600,
    color: a ? "#a68fd4" : "#5a4680",
    borderBottom: a ? "2px solid #5a35b0" : "2px solid transparent",
    marginBottom: -1, transition: "all 0.15s",
  }),

  content: { padding: "28px 32px", maxWidth: 1400, margin: "0 auto" },

  card:    { background: "rgba(19,8,43,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 20, marginBottom: 20, boxShadow: "0 4px 20px rgba(0,0,0,0.3)" },

  statCard: (accent) => ({
    background: "rgba(19,8,43,0.8)", border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 12, padding: "18px 22px", flex: 1, minWidth: 130,
    borderTop: `3px solid ${accent}`, boxShadow: "0 4px 16px rgba(0,0,0,0.25)"
  }),
  statLabel: { color: "#7c5cbf", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 },
  statValue: { color: "#fff", fontSize: 24, fontWeight: 700, fontFamily: "monospace" },

  tableWrap: { background: "rgba(19,8,43,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" },
  tableHead: { padding: "10px 14px", textAlign: "left", color: "#7c5cbf", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,0.06)", whiteSpace: "nowrap", background: "rgba(30,15,64,0.5)" },
  tableCell: { padding: "10px 14px", color: "#c8b8e0", fontSize: 13 },
  tableInfo: { padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#5a4680", fontSize: 12 },
  emptyMsg:  { textAlign: "center", color: "#5a4680", padding: "48px 0", fontSize: 14 },

  input:    { background: "rgba(30,15,64,0.7)", border: "1px solid rgba(90,53,176,0.3)", color: "#fff", padding: "8px 13px", borderRadius: 8, fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box" },
  inputFull:{ background: "rgba(30,15,64,0.7)", border: "1px solid rgba(90,53,176,0.3)", color: "#fff", padding: "8px 13px", borderRadius: 8, fontSize: 13, fontFamily: "inherit", outline: "none", width: "100%", boxSizing: "border-box" },
  label:    { fontSize: 12, color: "#9b8ab8", fontWeight: 600, display: "block", marginBottom: 4 },

  btnPrimary:   { background: "linear-gradient(135deg,#5a35b0,#3d2080)", color: "#fff", border: "none", padding: "8px 18px", borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" },
  btnSecondary: { background: "rgba(30,15,64,0.7)", color: "#9b8ab8", border: "1px solid rgba(90,53,176,0.3)", padding: "8px 18px", borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" },
  btnSuccess:   { background: "#16a34a", color: "#fff", border: "none", padding: "5px 12px", borderRadius: 6, fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: "inherit" },
  btnWarning:   { background: "#d97706", color: "#fff", border: "none", padding: "6px 14px", borderRadius: 6, fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: "inherit" },
  btnGhost:     { background: "none", color: "#7c5cbf", border: "1px solid rgba(90,53,176,0.3)", padding: "5px 12px", borderRadius: 6, fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: "inherit" },

  loginBox:  { background: "rgba(19,8,43,0.95)", border: "1px solid rgba(90,53,176,0.3)", borderRadius: 18, padding: "44px 38px", width: "100%", maxWidth: 380, textAlign: "center", boxShadow: "0 0 60px rgba(90,53,176,0.2)" },
  loginIcon: { fontSize: 36, marginBottom: 18, display: "block" },
  loginTitle:{ color: "#fff", fontSize: 22, fontWeight: 700, margin: "0 0 6px", fontFamily: "Georgia,serif" },
  loginSub:  { color: "#7c5cbf", fontSize: 14, margin: "0 0 28px" },

  modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: 20 },
  modalBox:     { background: "#13082b", border: "1px solid rgba(90,53,176,0.3)", borderRadius: 16, padding: 28, width: "100%", maxWidth: 520, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" },
};

// ─── Small components ─────────────────────────────────────────────────────────
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
            <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(90,53,176,0.07)"}
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
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#fff" }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#7c5cbf", lineHeight: 1 }}>×</button>
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
      borderColor: active ? "#5a35b0" : "rgba(90,53,176,0.3)",
      background: active ? "rgba(90,53,176,0.25)" : "rgba(30,15,64,0.5)",
      color: active ? "#a68fd4" : "#5a4680"
    }}>{children}</button>
  );
}

function LangBadge({ lang }) {
  const map = { French: "#4f6ef7", German: "#e8c96a", Japanese: "#e86a9e" };
  const color = map[lang] || "#7c5cbf";
  return <span style={{ background: color + "22", color, border: `1px solid ${color}44`, padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{lang}</span>;
}

function DateCell({ v }) {
  if (!v) return <span style={{ color: "#5a4680" }}>—</span>;
  return <span style={{ color: "#7c5cbf" }}>{new Date(v).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span>;
}

// ─── LEADS TAB ────────────────────────────────────────────────────────────────
function LeadsTab({ password }) {
  const [rows, setRows]           = useState([]);
  const [loading, setLoading]     = useState(false);
  const [loaded, setLoaded]       = useState(false);
  const [search, setSearch]       = useState("");
  const [langFilter, setLangFilter] = useState("ALL");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/admin/get-leads`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      if (!res.ok) { alert("Wrong password or server error"); setLoading(false); return; }
      const data = await res.json();
      setRows(data); setLoaded(true);
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
    total:    rows.length,
    french:   rows.filter(r => r.language === "French").length,
    german:   rows.filter(r => r.language === "German").length,
    japanese: rows.filter(r => r.language === "Japanese").length,
    referred: rows.filter(r => r.referral).length,
  };

  const columns = [
    { key: "id",       label: "#",        render: v => <span style={{ color: "#5a4680", fontSize: 11 }}>{v}</span> },
    { key: "name",     label: "Name",     render: v => <span style={{ fontWeight: 600, color: "#fff" }}>{v}</span> },
    { key: "email",    label: "Email",    render: v => <span style={{ color: "#9b8ab8" }}>{v}</span> },
    { key: "phone",    label: "Phone",    render: v => <span style={{ color: "#c8b8e0" }}>{v}</span> },
    { key: "language", label: "Language", render: v => <LangBadge lang={v} /> },
    { key: "level",    label: "Level",    render: v => <span style={{ color: "#9b8ab8", fontSize: 12 }}>{v}</span> },
    { key: "referral", label: "Ref Code", render: v => v
      ? <span style={{ fontFamily: "monospace", color: "#a68fd4", background: "rgba(90,53,176,0.2)", padding: "2px 8px", borderRadius: 4, fontSize: 12 }}>{v}</span>
      : <span style={{ color: "#3d2080" }}>—</span>
    },
    { key: "created_at", label: "Date", render: v => <DateCell v={v} /> },
  ];

  if (!loaded) return (
    <div style={{ textAlign: "center", paddingTop: 80 }}>
      <div style={{ fontSize: 44, marginBottom: 16 }}>📋</div>
      <p style={{ color: "#5a4680", marginBottom: 20, fontSize: 14 }}>Click to load enquiry leads</p>
      <button onClick={load} disabled={loading} style={S.btnPrimary}>{loading ? "Loading..." : "Load Leads"}</button>
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        <StatCard label="Total Leads"  value={counts.total}    accent="#5a35b0" />
        <StatCard label="French"       value={counts.french}   accent="#4f6ef7" />
        <StatCard label="German"       value={counts.german}   accent="#e8c96a" />
        <StatCard label="Japanese"     value={counts.japanese} accent="#e86a9e" />
        <StatCard label="Via Referral" value={counts.referred} accent="#22c55e" />
      </div>

      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, email, phone..."
          style={{ ...S.input, width: 260 }} />
        <div style={{ display: "flex", gap: 6 }}>
          {["ALL", "French", "German", "Japanese"].map(l => (
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
  const [form, setForm]           = useState({ name: "", email: "", phone: "", referred_by: "", referred_by_name: "" });
  const [creating, setCreating]   = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
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
      const data = await res.json();
      setRows(data); setLoaded(true);
    } catch { alert("Failed to load"); }
    setLoading(false);
  }, [password]);

  const createAffiliate = async () => {
    if (!form.name || !form.email || !form.phone) { alert("Name, email and phone are required"); return; }
    setCreating(true);
    try {
      const res = await fetch(`${BACKEND_URL}/admin/create-affiliate`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, ...form })
      });
      const data = await res.json();
      if (!res.ok) { alert(data.error); setCreating(false); return; }
      setGeneratedLink(data.link);
      setForm({ name: "", email: "", phone: "", referred_by: "", referred_by_name: "" });
      if (loaded) load();
    } catch { alert("Error creating"); }
    setCreating(false);
  };

  const openEdit = (row) => {
    setEditRow(row);
    setEditForm({ name: row.name, email: row.email, phone: row.phone, referred_by: row.referred_by || "", referred_by_name: row.referred_by_name || "" });
  };

  const saveEdit = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${BACKEND_URL}/admin/edit-affiliate`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, ref_code: editRow.ref_code, ...editForm })
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
    { key: "ref_code", label: "Ref Code", render: v => <span style={{ fontFamily: "monospace", color: "#a68fd4", fontWeight: 700, fontSize: 12 }}>{v}</span> },
    { key: "name",  label: "Name",  render: v => <span style={{ fontWeight: 600, color: "#fff" }}>{v}</span> },
    { key: "email", label: "Email", render: v => <span style={{ color: "#9b8ab8" }}>{v}</span> },
    { key: "phone", label: "Phone", render: v => <span style={{ color: "#c8b8e0" }}>{v}</span> },
    { key: "referred_by", label: "Referred By", render: v => v
      ? <span style={{ fontFamily: "monospace", color: "#c9a63a", fontSize: 12, background: "rgba(232,201,106,0.1)", padding: "2px 8px", borderRadius: 4 }}>{v}</span>
      : <span style={{ color: "#3d2080" }}>—</span>
    },
    { key: "success",         label: "Sales",    render: v => <span style={{ color: "#22c55e", fontWeight: 700 }}>{v || 0}</span> },
    { key: "pending_payout",  label: "Pending",  render: v => <span style={{ color: "#d97706", fontWeight: 700 }}>₹{parseFloat(v || 0).toLocaleString()}</span> },
    { key: "paid_payout",     label: "Paid",     render: v => <span style={{ color: "#22c55e", fontWeight: 700 }}>₹{parseFloat(v || 0).toLocaleString()}</span> },
    { key: "total_earnings",  label: "Total",    render: v => <span style={{ color: "#a68fd4", fontWeight: 700 }}>₹{parseFloat(v || 0).toLocaleString()}</span> },
    { key: "_edit", label: "", render: (_, row) => <button onClick={() => openEdit(row)} style={S.btnGhost}>✏️ Edit</button> },
  ];

  return (
    <div>
      {/* Create form */}
      <div style={S.card}>
        <div style={{ color: "#5a4680", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>➕ Add New Affiliate</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" }}>
          {[["Name *", "name", 150], ["Email *", "email", 200], ["Phone *", "phone", 140]].map(([lbl, key, w]) => (
            <div key={key}>
              <div style={S.label}>{lbl}</div>
              <input placeholder={lbl.replace(" *", "")} value={form[key]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                style={{ ...S.input, width: w }} />
            </div>
          ))}
          <div>
            <div style={S.label}>Referred By (Ref Code)</div>
            <input placeholder="e.g. PRI123 (optional)" value={form.referred_by}
              onChange={e => setForm(f => ({ ...f, referred_by: e.target.value }))}
              style={{ ...S.input, width: 170 }} />
          </div>
          <div>
            <div style={S.label}>Referred By (Name)</div>
            <input placeholder="Their name (optional)" value={form.referred_by_name}
              onChange={e => setForm(f => ({ ...f, referred_by_name: e.target.value }))}
              style={{ ...S.input, width: 160 }} />
          </div>
          <button onClick={createAffiliate} disabled={creating} style={{ ...S.btnPrimary, alignSelf: "flex-end" }}>
            {creating ? "Creating..." : "+ Generate Link"}
          </button>
        </div>

        {generatedLink && (
          <div style={{ marginTop: 14, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ color: "#22c55e", fontSize: 12, fontWeight: 700 }}>✓ LINK GENERATED</span>
            <span style={{ color: "#c8b8e0", fontSize: 12, fontFamily: "monospace", flex: 1, wordBreak: "break-all" }}>{generatedLink}</span>
            <button onClick={() => { navigator.clipboard.writeText(generatedLink); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={S.btnSecondary}>
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>
        )}
      </div>

      {!loaded ? (
        <div style={{ textAlign: "center", paddingTop: 20 }}>
          <button onClick={load} disabled={loading} style={S.btnPrimary}>{loading ? "Loading..." : "Load Affiliates"}</button>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
            <StatCard label="Total Affiliates" value={rows.length}                                         accent="#5a35b0" />
            <StatCard label="Pending Payouts"  value={`₹${totalPending.toLocaleString()}`}                accent="#d97706" />
            <StatCard label="Total Paid Out"   value={`₹${totalPaid.toLocaleString()}`}                   accent="#22c55e" />
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

      {editRow && (
        <Modal title={`Edit — ${editRow.name} (${editRow.ref_code})`} onClose={() => setEditRow(null)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[["Name", "name"], ["Email", "email"], ["Phone", "phone"]].map(([lbl, key]) => (
              <div key={key}>
                <label style={S.label}>{lbl}</label>
                <input value={editForm[key]} onChange={e => setEditForm(f => ({ ...f, [key]: e.target.value }))} style={S.inputFull} />
              </div>
            ))}
            <div style={{ background: "rgba(30,15,64,0.5)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#5a4680", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Referral Chain</div>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <label style={S.label}>Referred By (Code)</label>
                  <input value={editForm.referred_by} placeholder="Blank to remove"
                    onChange={e => setEditForm(f => ({ ...f, referred_by: e.target.value }))} style={S.inputFull} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={S.label}>Referred By (Name)</label>
                  <input value={editForm.referred_by_name} placeholder="Their name"
                    onChange={e => setEditForm(f => ({ ...f, referred_by_name: e.target.value }))} style={S.inputFull} />
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
  const [rows, setRows]           = useState([]);
  const [loading, setLoading]     = useState(false);
  const [loaded, setLoaded]       = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch]       = useState("");
  const [markingId, setMarkingId] = useState(null);
  const [markingAll, setMarkingAll] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/admin/get-payouts`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      if (!res.ok) { alert("Error loading payouts"); setLoading(false); return; }
      const data = await res.json();
      setRows(data); setLoaded(true);
    } catch { alert("Failed"); }
    setLoading(false);
  }, [password]);

  const markPaid = async (id) => {
    setMarkingId(id);
    await fetch(`${BACKEND_URL}/admin/mark-payout-paid`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, payout_id: id })
    });
    await load(); setMarkingId(null);
  };

  const markAllPaid = async (ref_code) => {
    setMarkingAll(ref_code);
    await fetch(`${BACKEND_URL}/admin/mark-all-paid`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, ref_code })
    });
    await load(); setMarkingAll(null);
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
    if (!acc[r.influencer_ref_code]) acc[r.influencer_ref_code] = { name: r.influencer_name, ref_code: r.influencer_ref_code, total: 0, count: 0 };
    acc[r.influencer_ref_code].total += parseFloat(r.amount || 0);
    acc[r.influencer_ref_code].count += 1;
    return acc;
  }, {});

  const columns = [
    { key: "influencer_name", label: "Affiliate", render: (v, row) => (
      <div>
        <div style={{ fontWeight: 600, color: "#fff" }}>{v}</div>
        <div style={{ fontFamily: "monospace", color: "#a68fd4", fontSize: 11 }}>{row.influencer_ref_code}</div>
      </div>
    )},
    { key: "level", label: "Level", render: v => (
      <span style={{ background: v == 1 ? "rgba(90,53,176,0.2)" : "rgba(124,58,237,0.2)", color: v == 1 ? "#a68fd4" : "#c084fc", padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
        L{v} · {v == 1 ? "₹200" : "₹50"}
      </span>
    )},
    { key: "customer_name", label: "Lead", render: (v, row) => (
      <div>
        <div style={{ color: "#c8b8e0", fontWeight: 600 }}>{v}</div>
        <div style={{ color: "#5a4680", fontSize: 11 }}>{row.customer_email}</div>
      </div>
    )},
    { key: "amount", label: "Amount", render: v => <span style={{ fontWeight: 700, color: "#fff" }}>₹{v}</span> },
    { key: "status", label: "Status", render: v => (
      <span style={{
        background: v === "PAID" ? "rgba(34,197,94,0.12)" : "rgba(234,179,8,0.12)",
        color: v === "PAID" ? "#22c55e" : "#eab308",
        border: `1px solid ${v === "PAID" ? "rgba(34,197,94,0.3)" : "rgba(234,179,8,0.3)"}`,
        padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700,
        display: "inline-flex", alignItems: "center", gap: 5,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: v === "PAID" ? "#22c55e" : "#eab308", display: "inline-block" }} />
        {v}
      </span>
    )},
    { key: "created_at", label: "Date",    render: v => <DateCell v={v} /> },
    { key: "paid_at",    label: "Paid On", render: v => v ? <DateCell v={v} /> : <span style={{ color: "#3d2080" }}>—</span> },
    { key: "_action", label: "", render: (_, row) => row.status === "PENDING"
      ? <button onClick={() => markPaid(row.id)} disabled={markingId === row.id} style={S.btnSuccess}>{markingId === row.id ? "..." : "Mark Paid"}</button>
      : <span style={{ color: "#22c55e", fontSize: 12, fontWeight: 600 }}>✓ Paid</span>
    },
  ];

  if (!loaded) return (
    <div style={{ textAlign: "center", paddingTop: 80 }}>
      <div style={{ fontSize: 44, marginBottom: 16 }}>💰</div>
      <p style={{ color: "#5a4680", marginBottom: 20, fontSize: 14 }}>Click to load payout records</p>
      <button onClick={load} disabled={loading} style={S.btnPrimary}>{loading ? "Loading..." : "Load Payouts"}</button>
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        <StatCard label="Total Payouts" value={rows.length}                             accent="#5a35b0" />
        <StatCard label="Pending"       value={`₹${totalPending.toLocaleString()}`}     accent="#d97706" />
        <StatCard label="Paid Out"      value={`₹${totalPaid.toLocaleString()}`}        accent="#22c55e" />
      </div>

      {/* Quick settle */}
      {Object.keys(pendingByAffiliate).length > 0 && (
        <div style={{ background: "rgba(217,119,6,0.08)", border: "1px solid rgba(217,119,6,0.25)", borderRadius: 12, padding: 16, marginBottom: 20 }}>
          <div style={{ color: "#d97706", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>⚡ Pending — Quick Settle</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {Object.values(pendingByAffiliate).map(aff => (
              <div key={aff.ref_code} style={{ background: "rgba(19,8,43,0.8)", border: "1px solid rgba(217,119,6,0.2)", borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: "#fff" }}>{aff.name}</div>
                  <div style={{ fontSize: 11, color: "#7c5cbf" }}>{aff.ref_code} · {aff.count} payout{aff.count > 1 ? "s" : ""}</div>
                </div>
                <span style={{ fontWeight: 700, color: "#d97706" }}>₹{aff.total.toLocaleString()}</span>
                <button onClick={() => markAllPaid(aff.ref_code)} disabled={markingAll === aff.ref_code} style={S.btnWarning}>
                  {markingAll === aff.ref_code ? "Settling..." : "Mark All Paid"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search affiliate or lead..."
          style={{ ...S.input, width: 280 }} />
        <div style={{ display: "flex", gap: 6 }}>
          {["ALL", "PENDING", "PAID"].map(s => (
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
    </div>
  );
}

// ─── MAIN ADMIN ───────────────────────────────────────────────────────────────
export default function Admin() {
  const [password, setPassword]     = useState("");
  const [authed, setAuthed]         = useState(false);
  const [tab, setTab]               = useState("leads");
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
    } catch { alert("Server error — check VITE_BACKEND_URL"); }
    setAuthLoading(false);
  };

  if (!authed) return (
    <div style={S.center}>
      <div style={S.loginBox}>
        <span style={S.loginIcon}>✦</span>
        <h1 style={S.loginTitle}>Success Learning</h1>
        <p style={S.loginSub}>Admin Dashboard — Enter password to continue</p>
        <input type="password" placeholder="Admin password" value={password}
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={S.logo}>✦</div>
          <span style={S.logoText}>Success Learning <span style={S.logoSub}>Admin</span></span>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e88" }} />
          <span style={{ color: "#5a4680", fontSize: 13 }}>Live</span>
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
