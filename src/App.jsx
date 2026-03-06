import { useState } from "react";

// ─── Toast ────────────────────────────────────────────────────────────────────
function useToast() {
  const [toasts, setToasts] = useState([]);
  const addToast = (msg, type = "info") => {
    const id = Date.now();
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
  };
  const removeToast = id => setToasts(p => p.filter(t => t.id !== id));
  return { toasts, addToast, removeToast };
}

function ToastContainer({ toasts, removeToast }) {
  const colors = { success: "#22c55e", error: "#ef4444", info: "#7c3aed" };
  const icons  = { success: "✅", error: "❌", info: "📌" };
  return (
    <div style={{ position:"fixed", top:20, right:20, zIndex:9999, display:"flex", flexDirection:"column", gap:10, maxWidth:320 }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          background: colors[t.type], color:"#fff", padding:"12px 16px", borderRadius:10,
          fontFamily:"Inter,sans-serif", fontSize:13, fontWeight:600,
          boxShadow:"0 4px 20px rgba(0,0,0,0.18)",
          display:"flex", justifyContent:"space-between", alignItems:"center",
          animation:"slideIn 0.3s ease"
        }}>
          <span>{icons[t.type]} {t.msg}</span>
          <button onClick={() => removeToast(t.id)} style={{ background:"none", border:"none", color:"#fff", cursor:"pointer", fontSize:16, marginLeft:10 }}>✕</button>
        </div>
      ))}
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const INITIAL_TICKETS = [
  { id:1001, title:"Login Issues - Can't Access Account",    description:"Customer is unable to log in to their account. They've tried resetting their password multiple times but still can't get in.", customer:"John Smith",    priority:"High",   status:"open", createdAt:"1/15/2024" },
  { id:1002, title:"Payment Failed - Card Declined",         description:"Customer attempted to pay using Visa ending 1234 but the payment keeps failing despite sufficient balance.",                  customer:"Sarah Johnson", priority:"High",   status:"open", createdAt:"1/16/2024" },
  { id:1003, title:"Unable to Download Invoice",             description:"Customer cannot download their January invoice from the billing section. The download button is not responding.",             customer:"Michael Brown", priority:"Medium", status:"open", createdAt:"1/17/2024" },
  { id:1004, title:"Incorrect Billing Address",              description:"Customer's billing address shows a different city. They updated it but it still displays the old one.",                       customer:"Emily Davis",   priority:"Low",    status:"open", createdAt:"1/18/2024" },
  { id:1005, title:"App Crash on Launch",                    description:"Customer reports that the mobile app crashes immediately upon opening on Android 13.",                                        customer:"David Wilson",  priority:"High",   status:"open", createdAt:"1/19/2024" },
  { id:1006, title:"Refund Not Processed",                   description:"Customer requested a refund two weeks ago but has not received the amount yet.",                                              customer:"Sophia Taylor", priority:"Medium", status:"open", createdAt:"1/20/2024" },
  { id:1007, title:"Two-Factor Authentication Issue",        description:"Customer is not receiving 2FA codes on their registered phone number.",                                                       customer:"James Anderson",priority:"High",   status:"open", createdAt:"1/21/2024" },
  { id:1008, title:"Unable to Update Profile Picture",       description:"Customer tries to upload a new profile picture but gets 'Upload failed' error.",                                             customer:"Olivia Martinez",priority:"Low",  status:"open", createdAt:"1/22/2024" },
  { id:1009, title:"Subscription Auto-Renewal",              description:"Customer wants to enable auto-renewal for their subscription but the toggle is disabled.",                                   customer:"Liam Thomas",   priority:"Medium", status:"open", createdAt:"1/17/2024" },
  { id:1010, title:"Missing Order Confirmation Email",       description:"Customer placed an order but didn't receive a confirmation email even though payment succeeded.",                            customer:"Isabella Garcia",priority:"Medium",status:"open", createdAt:"1/24/2024" },
  { id:1011, title:"Discount Code Not Working",              description:"Customer is trying to apply a discount code at checkout but keeps getting an invalid code error.",                           customer:"Noah Lee",      priority:"Low",    status:"open", createdAt:"1/25/2024" },
  { id:1012, title:"Account Locked After Multiple Attempts", description:"Customer account got locked after entering the wrong password 3 times. They need it unlocked.",                             customer:"Emma White",    priority:"High",   status:"open", createdAt:"1/26/2024" },
];

const PRIORITY = {
  High:     { color:"#ef4444", label:"HIGH PRIORITY" },
  Medium:   { color:"#f59e0b", label:"MEDIUM PRIORITY" },
  Low:      { color:"#22c55e", label:"LOW PRIORITY" },
  Critical: { color:"#7c3aed", label:"CRITICAL" },
};

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ onNew, mobileOpen, setMobileOpen }) {
  return (
    <>
      <nav style={{
        background:"#fff", borderBottom:"1px solid #e5e7eb",
        padding:"0 40px", height:60,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        position:"sticky", top:0, zIndex:100,
        boxShadow:"0 1px 4px rgba(0,0,0,0.07)"
      }}>
        <span style={{ fontFamily:"Inter,sans-serif", fontWeight:800, fontSize:17, color:"#111", letterSpacing:-0.5 }}>
          CS — Ticket System
        </span>
        <div style={{ display:"flex", alignItems:"center", gap:28 }} className="nav-links">
          {["Home","FAQ","Changelog","Blog","Download","Contact"].map(n => (
            <a key={n} href="#" style={{ fontFamily:"Inter,sans-serif", fontSize:13, color:"#6b7280", textDecoration:"none", transition:"color 0.2s" }}
              onMouseEnter={e=>e.target.style.color="#111"} onMouseLeave={e=>e.target.style.color="#6b7280"}>{n}</a>
          ))}
          <button onClick={onNew} style={{
            background:"linear-gradient(135deg,#7c3aed,#6d28d9)", color:"#fff", border:"none",
            borderRadius:8, padding:"8px 18px", fontFamily:"Inter,sans-serif",
            fontWeight:700, fontSize:13, cursor:"pointer",
            boxShadow:"0 2px 8px rgba(124,58,237,0.35)", transition:"transform 0.15s"
          }}
          onMouseEnter={e=>e.currentTarget.style.transform="translateY(-1px)"}
          onMouseLeave={e=>e.currentTarget.style.transform=""}>
            + New Ticket
          </button>
        </div>
        <button onClick={()=>setMobileOpen(!mobileOpen)} className="hamburger" style={{
          display:"none", background:"none", border:"none", cursor:"pointer", flexDirection:"column", gap:5, padding:4
        }}>
          {[0,1,2].map(i=><span key={i} style={{ display:"block", width:22, height:2, background:"#111", borderRadius:2 }}/>)}
        </button>
      </nav>

      {mobileOpen && (
        <div style={{ position:"fixed", inset:0, zIndex:99, background:"#fff", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:28 }}>
          <button onClick={()=>setMobileOpen(false)} style={{ position:"absolute", top:20, right:24, background:"none", border:"none", fontSize:26, cursor:"pointer" }}>✕</button>
          {["Home","FAQ","Changelog","Blog","Download","Contact"].map(n=>(
            <a key={n} onClick={()=>setMobileOpen(false)} href="#" style={{ fontFamily:"Inter,sans-serif", fontSize:20, color:"#111", textDecoration:"none" }}>{n}</a>
          ))}
          <button onClick={()=>{onNew();setMobileOpen(false);}} style={{ background:"#7c3aed", color:"#fff", border:"none", borderRadius:8, padding:"12px 32px", fontFamily:"Inter,sans-serif", fontWeight:700, fontSize:15, cursor:"pointer" }}>+ New Ticket</button>
        </div>
      )}

      <style>{`@media(max-width:768px){ .nav-links{display:none!important;} .hamburger{display:flex!important;} }`}</style>
    </>
  );
}

// ─── Banner ───────────────────────────────────────────────────────────────────
function Banner({ inProgress, resolved }) {
  return (
    <section style={{ background:"#f3f4f6", padding:"28px 40px 32px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }} className="banner-grid">

        {/* In Progress */}
        <div style={{
          borderRadius:18, overflow:"hidden", position:"relative",
          background:"linear-gradient(135deg,#7c3aed 0%,#5b21b6 100%)",
          minHeight:155, display:"flex", flexDirection:"column",
          alignItems:"center", justifyContent:"center", padding:"32px 24px",
          boxShadow:"0 8px 32px rgba(124,58,237,0.25)"
        }}>
          <div style={{
            position:"absolute", inset:0,
            backgroundImage:"url('/vector1.png')",
            backgroundSize:"cover", backgroundPosition:"center right",
            opacity:0.2, mixBlendMode:"screen"
          }}/>
          <div style={{ position:"absolute", top:-40, right:-40, width:180, height:180, borderRadius:"50%", background:"rgba(167,139,250,0.3)", filter:"blur(40px)" }}/>
          <p style={{ fontFamily:"Inter,sans-serif", fontSize:15, color:"rgba(255,255,255,0.8)", fontWeight:500, marginBottom:10, zIndex:1, letterSpacing:0.3 }}>In-Progress</p>
          <p style={{ fontFamily:"Inter,sans-serif", fontSize:72, fontWeight:800, color:"#fff", lineHeight:1, zIndex:1 }}>{inProgress}</p>
        </div>

        {/* Resolved */}
        <div style={{
          borderRadius:18, overflow:"hidden", position:"relative",
          background:"linear-gradient(135deg,#16a34a 0%,#15803d 100%)",
          minHeight:155, display:"flex", flexDirection:"column",
          alignItems:"center", justifyContent:"center", padding:"32px 24px",
          boxShadow:"0 8px 32px rgba(22,163,74,0.25)"
        }}>
          <div style={{
            position:"absolute", inset:0,
            backgroundImage:"url('/vector1.png')",
            backgroundSize:"cover", backgroundPosition:"center right",
            opacity:0.15, mixBlendMode:"screen"
          }}/>
          <div style={{ position:"absolute", top:-40, left:-40, width:180, height:180, borderRadius:"50%", background:"rgba(74,222,128,0.25)", filter:"blur(40px)" }}/>
          <p style={{ fontFamily:"Inter,sans-serif", fontSize:15, color:"rgba(255,255,255,0.8)", fontWeight:500, marginBottom:10, zIndex:1, letterSpacing:0.3 }}>Resolved</p>
          <p style={{ fontFamily:"Inter,sans-serif", fontSize:72, fontWeight:800, color:"#fff", lineHeight:1, zIndex:1 }}>{resolved}</p>
        </div>
      </div>
      <style>{`@media(max-width:600px){.banner-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}

// ─── Ticket Card ──────────────────────────────────────────────────────────────
function TicketCard({ ticket, onAdd, isInProgress }) {
  const ps = PRIORITY[ticket.priority] || PRIORITY.Medium;
  return (
    <div onClick={()=>!isInProgress && onAdd(ticket)} style={{
      background:"#fff", border:"1px solid #e5e7eb", borderRadius:12,
      padding:"18px 20px", cursor:isInProgress?"default":"pointer",
      transition:"box-shadow 0.2s, transform 0.15s",
      boxShadow:"0 1px 3px rgba(0,0,0,0.06)",
      borderLeft: isInProgress ? "3px solid #7c3aed" : "3px solid transparent"
    }}
    onMouseEnter={e=>{ if(!isInProgress){ e.currentTarget.style.boxShadow="0 6px 20px rgba(0,0,0,0.1)"; e.currentTarget.style.transform="translateY(-2px)"; }}}
    onMouseLeave={e=>{ e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.06)"; e.currentTarget.style.transform=""; }}>

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8, gap:10 }}>
        <h3 style={{ fontFamily:"Inter,sans-serif", fontWeight:700, fontSize:14, color:"#111", lineHeight:1.4, margin:0 }}>
          {ticket.title}
        </h3>
        <span style={{
          background: isInProgress ? "#ede9fe" : "#dcfce7",
          color: isInProgress ? "#7c3aed" : "#16a34a",
          border:`1px solid ${isInProgress?"#c4b5fd":"#bbf7d0"}`,
          borderRadius:20, padding:"3px 10px", fontSize:10,
          fontFamily:"Inter,sans-serif", fontWeight:700,
          whiteSpace:"nowrap", flexShrink:0, letterSpacing:0.3
        }}>
          {isInProgress ? "In-Progress" : "Open"}
        </span>
      </div>

      <p style={{
        fontFamily:"Inter,sans-serif", fontSize:12, color:"#6b7280",
        lineHeight:1.65, marginBottom:14,
        display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden"
      }}>{ticket.description}</p>

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:6 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontFamily:"Inter,sans-serif", fontSize:11, color:"#9ca3af", fontWeight:500 }}>#{ticket.id}</span>
          <span style={{ fontFamily:"Inter,sans-serif", fontSize:10, color:ps.color, fontWeight:700, letterSpacing:0.5 }}>{ps.label}</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontFamily:"Inter,sans-serif", fontSize:11, color:"#6b7280" }}>{ticket.customer}</span>
          <span style={{ fontFamily:"Inter,sans-serif", fontSize:11, color:"#9ca3af" }}>📅 {ticket.createdAt}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Task Status ──────────────────────────────────────────────────────────────
function TaskStatus({ inProgress, resolved, onComplete }) {
  return (
    <div style={{ fontFamily:"Inter,sans-serif" }}>
      <h2 style={{ fontSize:17, fontWeight:800, color:"#111", marginBottom:4 }}>Task Status</h2>
      <p style={{ fontSize:12, color:"#9ca3af", marginBottom:20 }}>
        {inProgress.length===0 ? "Select a ticket to add to Task Status" : `${inProgress.length} ticket${inProgress.length>1?"s":""} in progress`}
      </p>

      {inProgress.length > 0 && (
        <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:28 }}>
          {inProgress.map(t=>(
            <div key={t.id} style={{ background:"#faf5ff", border:"1px solid #e9d5ff", borderRadius:10, padding:"14px 14px 12px" }}>
              <p style={{ fontSize:13, fontWeight:600, color:"#111", marginBottom:10, lineHeight:1.4 }}>{t.title}</p>
              <button onClick={()=>onComplete(t)} style={{
                width:"100%", background:"linear-gradient(135deg,#7c3aed,#6d28d9)",
                color:"#fff", border:"none", borderRadius:7, padding:"8px 0",
                fontFamily:"Inter,sans-serif", fontWeight:700, fontSize:12,
                cursor:"pointer", boxShadow:"0 2px 8px rgba(124,58,237,0.3)",
                transition:"transform 0.15s"
              }}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-1px)"}
              onMouseLeave={e=>e.currentTarget.style.transform=""}>
                ✓ Complete
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={{ height:1, background:"#f3f4f6", marginBottom:20 }}/>
      <h2 style={{ fontSize:17, fontWeight:800, color:"#111", marginBottom:4 }}>Resolved Task</h2>
      {resolved.length===0 ? (
        <p style={{ fontSize:12, color:"#9ca3af" }}>No resolved tasks yet.</p>
      ):(
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {resolved.map(t=>(
            <div key={t.id} style={{
              background:"#f0fdf4", border:"1px solid #bbf7d0",
              borderRadius:10, padding:"10px 14px",
              display:"flex", alignItems:"center", gap:10
            }}>
              <span style={{ color:"#16a34a", fontSize:14, fontWeight:700 }}>✓</span>
              <span style={{ fontSize:12, color:"#6b7280", textDecoration:"line-through" }}>{t.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function Modal({ onClose, onSubmit }) {
  const [form, setForm] = useState({ title:"", description:"", customer:"", priority:"Medium" });
  const set = (k,v) => setForm(p=>({...p,[k]:v}));
  const inp = {
    width:"100%", border:"1px solid #e5e7eb", borderRadius:8,
    padding:"10px 14px", fontSize:13, fontFamily:"Inter,sans-serif",
    outline:"none", color:"#111", background:"#fff", boxSizing:"border-box"
  };
  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(0,0,0,0.45)", backdropFilter:"blur(4px)", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }} onClick={onClose}>
      <div style={{ background:"#fff", borderRadius:18, padding:32, width:"100%", maxWidth:460, boxShadow:"0 24px 60px rgba(0,0,0,0.18)" }} onClick={e=>e.stopPropagation()}>
        <h2 style={{ fontFamily:"Inter,sans-serif", fontWeight:800, fontSize:20, color:"#111", marginBottom:24 }}>Submit New Ticket</h2>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {[["title","Title","Briefly describe the issue","input"],["description","Description","Detailed description...","textarea"],["customer","Customer Name","Full name","input"]].map(([k,label,ph,type])=>(
            <div key={k}>
              <label style={{ fontFamily:"Inter,sans-serif", fontSize:12, fontWeight:700, color:"#374151", display:"block", marginBottom:5, textTransform:"uppercase", letterSpacing:0.5 }}>{label}</label>
              {type==="input"
                ? <input style={inp} placeholder={ph} value={form[k]} onChange={e=>set(k,e.target.value)} onFocus={e=>e.target.style.borderColor="#7c3aed"} onBlur={e=>e.target.style.borderColor="#e5e7eb"}/>
                : <textarea style={{...inp,minHeight:80,resize:"vertical"}} placeholder={ph} value={form[k]} onChange={e=>set(k,e.target.value)} onFocus={e=>e.target.style.borderColor="#7c3aed"} onBlur={e=>e.target.style.borderColor="#e5e7eb"}/>
              }
            </div>
          ))}
          <div>
            <label style={{ fontFamily:"Inter,sans-serif", fontSize:12, fontWeight:700, color:"#374151", display:"block", marginBottom:5, textTransform:"uppercase", letterSpacing:0.5 }}>Priority</label>
            <select style={{...inp,cursor:"pointer"}} value={form.priority} onChange={e=>set("priority",e.target.value)}>
              {["Low","Medium","High","Critical"].map(p=><option key={p}>{p}</option>)}
            </select>
          </div>
          <div style={{ display:"flex", gap:12, marginTop:8 }}>
            <button onClick={onClose} style={{ flex:1, background:"#f3f4f6", border:"1px solid #e5e7eb", borderRadius:8, padding:"11px 0", fontFamily:"Inter,sans-serif", fontSize:13, fontWeight:600, color:"#6b7280", cursor:"pointer" }}>Cancel</button>
            <button onClick={()=>{ if(!form.title.trim()||!form.customer.trim()) return; onSubmit(form); }} style={{ flex:1, background:"linear-gradient(135deg,#7c3aed,#6d28d9)", border:"none", borderRadius:8, padding:"11px 0", fontFamily:"Inter,sans-serif", fontSize:13, fontWeight:700, color:"#fff", cursor:"pointer" }}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const cols = [
    { title:"Company",     links:["About Us","Our Mission","Team & Culture","Contact Us","Donate Now"] },
    { title:"Services",    links:["Features & Pricing","Product & Service","Terms & Condition","Download App"] },
    { title:"Information", links:["Privacy Policy","Terms & Condition","Refund Policy","FAQ"] },
    { title:"Social Links",links:["Twitter / X","LinkedIn","GitHub","Discord","YouTube"] },
  ];
  return (
    <footer style={{ background:"#111827", padding:"52px 40px 28px", marginTop:80 }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1.4fr repeat(4,1fr)", gap:40, marginBottom:44 }} className="footer-grid">
          <div>
            <h3 style={{ fontFamily:"Inter,sans-serif", fontWeight:800, fontSize:17, color:"#fff", marginBottom:14 }}>CS — Ticket System</h3>
            <p style={{ fontFamily:"Inter,sans-serif", fontSize:13, color:"#9ca3af", lineHeight:1.9, maxWidth:220 }}>
              Streamlined customer support management built for modern teams.
            </p>
            <div style={{ marginTop:20 }}>
              <p style={{ fontFamily:"Inter,sans-serif", fontSize:11, color:"#6b7280", letterSpacing:0.5, textTransform:"uppercase", marginBottom:8 }}>Contact</p>
              <p style={{ fontFamily:"Inter,sans-serif", fontSize:12, color:"#9ca3af", marginBottom:4 }}>support@csticket.com</p>
              <p style={{ fontFamily:"Inter,sans-serif", fontSize:12, color:"#9ca3af" }}>+1 (800) 123-4567</p>
            </div>
          </div>
          {cols.map(col=>(
            <div key={col.title}>
              <h4 style={{ fontFamily:"Inter,sans-serif", fontSize:12, fontWeight:700, color:"#fff", marginBottom:14, textTransform:"uppercase", letterSpacing:1 }}>{col.title}</h4>
              {col.links.map(l=>(
                <a key={l} href="#" style={{ display:"block", fontFamily:"Inter,sans-serif", fontSize:13, color:"#9ca3af", textDecoration:"none", marginBottom:9, transition:"color 0.2s" }}
                  onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="#9ca3af"}>{l}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop:"1px solid #1f2937", paddingTop:22, textAlign:"center" }}>
          <span style={{ fontFamily:"Inter,sans-serif", fontSize:12, color:"#4b5563" }}>
            © 2025 CS — Ticket System. All rights reserved. | Assignment-02 সহজ সরল সিম্পল
          </span>
        </div>
      </div>
      <style>{`@media(max-width:768px){.footer-grid{grid-template-columns:1fr 1fr!important;}}`}</style>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [tickets, setTickets]       = useState(INITIAL_TICKETS);
  const [inProgress, setInProgress] = useState([]);
  const [resolved, setResolved]     = useState([]);
  const [showModal, setShowModal]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  const handleAdd = ticket => {
    if (inProgress.find(t=>t.id===ticket.id)) { addToast("Already in progress!","error"); return; }
    setInProgress(p=>[...p,ticket]);
    addToast("Ticket added to In-Progress!","info");
  };

  const handleComplete = ticket => {
    setInProgress(p=>p.filter(t=>t.id!==ticket.id));
    setResolved(p=>[...p,ticket]);
    setTickets(p=>p.filter(t=>t.id!==ticket.id));
    addToast("Ticket resolved! 🎉","success");
  };

  const handleNew = form => {
    setTickets(p=>[{ id:Date.now(), ...form, status:"open", createdAt:new Date().toLocaleDateString("en-US") }, ...p]);
    setShowModal(false);
    addToast("New ticket submitted!","success");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{background:#f3f4f6;font-family:Inter,sans-serif;}
        @keyframes slideIn{from{opacity:0;transform:translateX(20px);}to{opacity:1;transform:none;}}
        ::-webkit-scrollbar{width:6px;}
        ::-webkit-scrollbar-thumb{background:#e5e7eb;border-radius:3px;}
        @media(max-width:900px){.main-layout{grid-template-columns:1fr!important;}}
        @media(max-width:560px){.ticket-grid{grid-template-columns:1fr!important;}}
      `}</style>

      <ToastContainer toasts={toasts} removeToast={removeToast}/>
      {showModal && <Modal onClose={()=>setShowModal(false)} onSubmit={handleNew}/>}

      <Navbar onNew={()=>setShowModal(true)} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>
      <Banner inProgress={inProgress.length} resolved={resolved.length}/>

      <main style={{ maxWidth:1100, margin:"0 auto", padding:"36px 24px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 268px", gap:36, alignItems:"start" }} className="main-layout">

          <div>
            <div style={{ display:"flex", alignItems:"center", marginBottom:18 }}>
              <h2 style={{ fontFamily:"Inter,sans-serif", fontWeight:800, fontSize:19, color:"#111" }}>
                Customer Tickets
                <span style={{ fontFamily:"Inter,sans-serif", fontWeight:500, fontSize:14, color:"#9ca3af", marginLeft:8 }}>({tickets.length})</span>
              </h2>
            </div>

            {tickets.length===0 ? (
              <div style={{ textAlign:"center", padding:"80px 40px", background:"#fff", borderRadius:14, border:"1px solid #e5e7eb" }}>
                <div style={{ fontSize:48, marginBottom:14 }}>🎉</div>
                <p style={{ fontFamily:"Inter,sans-serif", color:"#6b7280", fontWeight:600 }}>All tickets resolved!</p>
              </div>
            ):(
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }} className="ticket-grid">
                {tickets.map(t=>(
                  <TicketCard key={t.id} ticket={t} onAdd={handleAdd} isInProgress={!!inProgress.find(x=>x.id===t.id)}/>
                ))}
              </div>
            )}
          </div>

          <div style={{ position:"sticky", top:76, background:"#fff", borderRadius:14, border:"1px solid #e5e7eb", padding:"24px 20px", boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
            <TaskStatus inProgress={inProgress} resolved={resolved} onComplete={handleComplete}/>
          </div>
        </div>
      </main>

      <Footer/>
    </>
  );
}