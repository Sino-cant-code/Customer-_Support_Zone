import { useState, useEffect } from "react";

// ─── Toast System ────────────────────────────────────────────────────────────
function ToastContainer({ toasts, removeToast }) {
  return (
    <div style={{
      position: "fixed", top: 20, right: 20, zIndex: 9999,
      display: "flex", flexDirection: "column", gap: 10, maxWidth: 340
    }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          background: t.type === "success" ? "#0f2" : t.type === "info" ? "#38bdf8" : "#f59e0b",
          color: "#000", padding: "12px 18px", borderRadius: 8,
          fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700,
          boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          animation: "toastIn 0.3s ease",
          border: "1.5px solid rgba(0,0,0,0.15)"
        }}>
          <span>{t.type === "success" ? "✅ " : t.type === "info" ? "📌 " : "⚡ "}{t.msg}</span>
          <button onClick={() => removeToast(t.id)} style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: 16, marginLeft: 12, opacity: 0.6
          }}>✕</button>
        </div>
      ))}
    </div>
  );
}

function useToast() {
  const [toasts, setToasts] = useState([]);
  const addToast = (msg, type = "info") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };
  const removeToast = id => setToasts(prev => prev.filter(t => t.id !== id));
  return { toasts, addToast, removeToast };
}

// ─── Initial Data ─────────────────────────────────────────────────────────────
const INITIAL_TICKETS = [
  { id: 1, title: "Login page crashes on Safari", description: "Users on Safari 16+ report a white screen on login. Affects ~12% of users.", customer: "Aria Hossain", priority: "High", status: "open", createdAt: "2025-02-01" },
  { id: 2, title: "Invoice PDF not generating", description: "PDF export button returns 500 error for invoices older than 6 months.", customer: "Rafi Islam", priority: "Critical", status: "open", createdAt: "2025-02-03" },
  { id: 3, title: "Dark mode toggle missing", description: "The dark mode toggle disappeared after the last UI update.", customer: "Sumaiya Khan", priority: "Low", status: "open", createdAt: "2025-02-05" },
  { id: 4, title: "Email notifications delayed", description: "Transactional emails arrive 20–40 minutes late, causing user confusion.", customer: "Tanvir Ahmed", priority: "High", status: "open", createdAt: "2025-02-06" },
  { id: 5, title: "Cart total miscalculates discount", description: "10% coupon applies on top of already-discounted items instead of base price.", customer: "Nadia Begum", priority: "Critical", status: "open", createdAt: "2025-02-07" },
  { id: 6, title: "Search returns no results for Bengali text", description: "Product search completely fails when query contains Bengali Unicode characters.", customer: "Mahbub Alam", priority: "Medium", status: "open", createdAt: "2025-02-09" },
  { id: 7, title: "Profile photo upload size limit too small", description: "Current 200KB limit is too restrictive. Users request at least 2MB.", customer: "Sadia Parvin", priority: "Low", status: "open", createdAt: "2025-02-10" },
  { id: 8, title: "Two-factor auth SMS not delivered", description: "OTP SMS fails for Grameenphone numbers. Robi and Banglalink work fine.", customer: "Imran Chowdhury", priority: "Critical", status: "open", createdAt: "2025-02-11" },
  { id: 9, title: "Dashboard charts blank on Firefox", description: "All Chart.js graphs render as empty canvases in Firefox 121+.", customer: "Farhan Hasan", priority: "High", status: "open", createdAt: "2025-02-12" },
  { id: 10, title: "Password reset link expires too fast", description: "Reset links expire after 5 minutes. Users request at least 30 minutes.", customer: "Mehnaz Sultana", priority: "Medium", status: "open", createdAt: "2025-02-13" },
  { id: 11, title: "Order tracking page 404", description: "Clicking 'Track Order' in confirmation email leads to a 404 page.", customer: "Zahid Hossain", priority: "High", status: "open", createdAt: "2025-02-14" },
  { id: 12, title: "Export to Excel fails for large datasets", description: "Exporting more than 500 rows times out and shows a generic error.", customer: "Rashida Khanam", priority: "Medium", status: "open", createdAt: "2025-02-15" },
];

const PRIORITY_COLOR = {
  Critical: { bg: "#ff2d55", text: "#fff" },
  High:     { bg: "#ff9500", text: "#000" },
  Medium:   { bg: "#38bdf8", text: "#000" },
  Low:      { bg: "#34c759", text: "#000" },
};

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ onNewTicket, mobileOpen, setMobileOpen }) {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(8,8,12,0.85)", backdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      padding: "0 32px", height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 8,
          background: "linear-gradient(135deg,#00ff88,#00b4d8)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 900, fontSize: 16, color: "#000"
        }}>S</div>
        <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 17, color: "#fff", letterSpacing: -0.5 }}>
          SupportZone
        </span>
      </div>

      {/* Desktop Nav */}
      <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="desktop-nav">
        {["Home", "Tickets", "Docs", "Status"].map(item => (
          <a key={item} href="#" style={{
            fontFamily: "'Space Mono', monospace", fontSize: 13, color: "rgba(255,255,255,0.55)",
            textDecoration: "none", letterSpacing: 0.5,
            transition: "color 0.2s"
          }}
          onMouseEnter={e => e.target.style.color = "#fff"}
          onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.55)"}
          >{item}</a>
        ))}
        <button onClick={onNewTicket} style={{
          background: "linear-gradient(135deg,#00ff88,#00b4d8)",
          border: "none", borderRadius: 8, padding: "9px 20px",
          fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 13,
          cursor: "pointer", color: "#000", letterSpacing: 0.3,
          transition: "transform 0.15s, box-shadow 0.15s",
          boxShadow: "0 0 16px rgba(0,255,136,0.3)"
        }}
        onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 4px 24px rgba(0,255,136,0.45)"; }}
        onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = "0 0 16px rgba(0,255,136,0.3)"; }}
        >+ New Ticket</button>
      </div>

      {/* Mobile Hamburger */}
      <button onClick={() => setMobileOpen(!mobileOpen)} className="hamburger" style={{
        background: "none", border: "none", cursor: "pointer", display: "none",
        flexDirection: "column", gap: 5, padding: 4
      }}>
        {[0,1,2].map(i => <span key={i} style={{ display: "block", width: 22, height: 2, background: "#fff", borderRadius: 2 }} />)}
      </button>

      <style>{`
        @media(max-width:768px){
          .desktop-nav{display:none!important;}
          .hamburger{display:flex!important;}
        }
      `}</style>
    </nav>
  );
}

// ─── Mobile Menu ──────────────────────────────────────────────────────────────
function MobileMenu({ open, onNewTicket, onClose }) {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99,
      background: "rgba(8,8,12,0.97)", backdropFilter: "blur(20px)",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: 32
    }}>
      <button onClick={onClose} style={{
        position: "absolute", top: 20, right: 24,
        background: "none", border: "none", color: "#fff", fontSize: 26, cursor: "pointer"
      }}>✕</button>
      {["Home", "Tickets", "Docs", "Status"].map(item => (
        <a key={item} onClick={onClose} href="#" style={{
          fontFamily: "'Space Mono', monospace", fontSize: 22, color: "#fff",
          textDecoration: "none", letterSpacing: 1
        }}>{item}</a>
      ))}
      <button onClick={() => { onNewTicket(); onClose(); }} style={{
        background: "linear-gradient(135deg,#00ff88,#00b4d8)",
        border: "none", borderRadius: 10, padding: "14px 36px",
        fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 15,
        cursor: "pointer", color: "#000"
      }}>+ New Ticket</button>
    </div>
  );
}

// ─── Banner ───────────────────────────────────────────────────────────────────
function Banner({ inProgressCount, resolvedCount, totalCount }) {
  return (
    <section style={{
      position: "relative", overflow: "hidden",
      background: "linear-gradient(135deg, #080810 0%, #0a1628 45%, #081420 100%)",
      padding: "72px 40px 64px",
      borderBottom: "1px solid rgba(255,255,255,0.06)"
    }}>
      {/* Background vector image */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('/mnt/user-data/uploads/vector1.png')",
        backgroundSize: "cover", backgroundPosition: "center",
        opacity: 0.18
      }} />
      {/* Glow */}
      <div style={{
        position: "absolute", top: -80, right: -80,
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,255,136,0.12) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", bottom: -100, left: 100,
        width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,180,216,0.1) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          display: "inline-block",
          background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.3)",
          borderRadius: 100, padding: "4px 14px", marginBottom: 20,
          fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#00ff88",
          letterSpacing: 2, textTransform: "uppercase"
        }}>Live Support System</div>

        <h1 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(36px, 5vw, 64px)", color: "#fff",
          lineHeight: 1.1, marginBottom: 16, letterSpacing: -1
        }}>
          Customer<br />
          <span style={{ background: "linear-gradient(90deg,#00ff88,#00b4d8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Support Zone
          </span>
        </h1>
        <p style={{
          fontFamily: "'Space Mono', monospace", color: "rgba(255,255,255,0.45)",
          fontSize: 14, maxWidth: 480, lineHeight: 1.8, marginBottom: 48
        }}>
          Track, manage, and resolve customer issues efficiently. Real-time ticket management for your support team.
        </p>

        {/* Stats */}
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {[
            { label: "Total Tickets", value: totalCount, accent: "#fff" },
            { label: "In Progress", value: inProgressCount, accent: "#f59e0b" },
            { label: "Resolved", value: resolvedCount, accent: "#00ff88" },
          ].map(stat => (
            <div key={stat.label} style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              borderRadius: 14, padding: "20px 32px",
              textAlign: "center", minWidth: 130
            }}>
              <div style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800,
                fontSize: 42, color: stat.accent, lineHeight: 1,
                marginBottom: 6
              }}>{stat.value}</div>
              <div style={{
                fontFamily: "'Space Mono', monospace", fontSize: 11,
                color: "rgba(255,255,255,0.4)", letterSpacing: 1.5,
                textTransform: "uppercase"
              }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Ticket Card ──────────────────────────────────────────────────────────────
function TicketCard({ ticket, onAdd, isInProgress }) {
  const pc = PRIORITY_COLOR[ticket.priority] || { bg: "#888", text: "#fff" };
  return (
    <div
      onClick={() => !isInProgress && onAdd(ticket)}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${isInProgress ? "rgba(245,158,11,0.4)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 14, padding: "20px 22px",
        cursor: isInProgress ? "default" : "pointer",
        transition: "border-color 0.2s, transform 0.15s, box-shadow 0.2s",
        position: "relative", overflow: "hidden"
      }}
      onMouseEnter={e => {
        if (!isInProgress) {
          e.currentTarget.style.borderColor = "rgba(0,255,136,0.35)";
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)";
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = isInProgress ? "rgba(245,158,11,0.4)" : "rgba(255,255,255,0.07)";
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      {isInProgress && (
        <div style={{
          position: "absolute", top: 0, right: 0,
          background: "rgba(245,158,11,0.15)", borderBottomLeftRadius: 8,
          padding: "3px 10px", fontSize: 10,
          fontFamily: "'Space Mono', monospace", color: "#f59e0b", letterSpacing: 1
        }}>IN PROGRESS</div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <span style={{
          fontFamily: "'Space Mono', monospace", fontSize: 11,
          color: "rgba(255,255,255,0.3)", letterSpacing: 1
        }}>#{ticket.id.toString().padStart(4, "0")}</span>
        <span style={{
          background: pc.bg, color: pc.text, borderRadius: 6,
          padding: "3px 10px", fontSize: 10, fontWeight: 700,
          fontFamily: "'Space Mono', monospace", letterSpacing: 0.5
        }}>{ticket.priority}</span>
      </div>

      <h3 style={{
        fontFamily: "'Syne', sans-serif", fontWeight: 700,
        fontSize: 15, color: "#fff", marginBottom: 8, lineHeight: 1.4
      }}>{ticket.title}</h3>

      <p style={{
        fontFamily: "'Space Mono', monospace", fontSize: 12,
        color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginBottom: 14,
        display: "-webkit-box", WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical", overflow: "hidden"
      }}>{ticket.description}</p>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: "linear-gradient(135deg,#00ff88,#00b4d8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700, color: "#000"
          }}>{ticket.customer[0]}</div>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: 11,
            color: "rgba(255,255,255,0.5)"
          }}>{ticket.customer}</span>
        </div>
        <span style={{
          fontFamily: "'Space Mono', monospace", fontSize: 10,
          color: "rgba(255,255,255,0.25)"
        }}>{ticket.createdAt}</span>
      </div>
    </div>
  );
}

// ─── Task Status Panel ────────────────────────────────────────────────────────
function TaskStatusPanel({ inProgress, resolved, onComplete }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 16, padding: 24,
      position: "sticky", top: 80,
      maxHeight: "calc(100vh - 100px)", overflowY: "auto"
    }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b", boxShadow: "0 0 8px #f59e0b" }} />
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 700,
            fontSize: 16, color: "#fff", margin: 0
          }}>In Progress ({inProgress.length})</h2>
        </div>

        {inProgress.length === 0 ? (
          <div style={{
            border: "1px dashed rgba(255,255,255,0.1)",
            borderRadius: 10, padding: "24px 16px", textAlign: "center"
          }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>📭</div>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.3)", margin: 0 }}>
              Click any ticket to start working
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {inProgress.map(t => (
              <div key={t.id} style={{
                background: "rgba(245,158,11,0.06)",
                border: "1px solid rgba(245,158,11,0.2)",
                borderRadius: 10, padding: 14
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{
                    fontFamily: "'Space Mono', monospace", fontSize: 10,
                    color: "rgba(255,255,255,0.3)"
                  }}>#{t.id.toString().padStart(4, "0")}</span>
                  <span style={{
                    background: PRIORITY_COLOR[t.priority]?.bg, color: PRIORITY_COLOR[t.priority]?.text,
                    borderRadius: 4, padding: "1px 7px", fontSize: 9, fontFamily: "'Space Mono', monospace"
                  }}>{t.priority}</span>
                </div>
                <p style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 600,
                  fontSize: 13, color: "#fff", marginBottom: 12, lineHeight: 1.4
                }}>{t.title}</p>
                <button onClick={() => onComplete(t)} style={{
                  width: "100%", background: "linear-gradient(135deg,#00ff88,#00b4d8)",
                  border: "none", borderRadius: 7, padding: "8px 0",
                  fontFamily: "'Space Mono', monospace", fontWeight: 700,
                  fontSize: 11, cursor: "pointer", color: "#000", letterSpacing: 0.5,
                  transition: "opacity 0.15s"
                }}
                onMouseEnter={e => e.target.style.opacity = 0.85}
                onMouseLeave={e => e.target.style.opacity = 1}
                >✓ Mark Complete</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Resolved */}
      {resolved.length > 0 && (
        <div>
          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 20 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00ff88", boxShadow: "0 0 8px #00ff88" }} />
            <h2 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 700,
              fontSize: 16, color: "#fff", margin: 0
            }}>Resolved ({resolved.length})</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {resolved.map(t => (
              <div key={t.id} style={{
                background: "rgba(0,255,136,0.04)",
                border: "1px solid rgba(0,255,136,0.15)",
                borderRadius: 10, padding: "10px 14px",
                display: "flex", alignItems: "center", gap: 10
              }}>
                <span style={{ color: "#00ff88", fontSize: 14 }}>✓</span>
                <span style={{
                  fontFamily: "'Space Mono', monospace", fontSize: 11,
                  color: "rgba(255,255,255,0.45)", textDecoration: "line-through"
                }}>{t.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── New Ticket Modal ─────────────────────────────────────────────────────────
function NewTicketModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({ title: "", description: "", customer: "", priority: "Medium" });
  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const inputStyle = {
    width: "100%", background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8,
    padding: "10px 14px", color: "#fff", outline: "none",
    fontFamily: "'Space Mono', monospace", fontSize: 13,
    boxSizing: "border-box"
  };
  const labelStyle = {
    fontFamily: "'Space Mono', monospace", fontSize: 11,
    color: "rgba(255,255,255,0.5)", letterSpacing: 1, textTransform: "uppercase",
    display: "block", marginBottom: 6
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20
    }} onClick={onClose}>
      <div style={{
        background: "#0e0e18", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 18, padding: 32, width: "100%", maxWidth: 480,
        boxShadow: "0 24px 80px rgba(0,0,0,0.6)"
      }} onClick={e => e.stopPropagation()}>
        <h2 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: 22, color: "#fff", marginBottom: 24
        }}>Submit New Ticket</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={labelStyle}>Title</label>
            <input style={inputStyle} placeholder="Briefly describe the issue"
              value={form.title} onChange={e => set("title", e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Description</label>
            <textarea style={{ ...inputStyle, minHeight: 90, resize: "vertical" }}
              placeholder="Detailed description..."
              value={form.description} onChange={e => set("description", e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Customer Name</label>
            <input style={inputStyle} placeholder="Your full name"
              value={form.customer} onChange={e => set("customer", e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Priority</label>
            <select style={{ ...inputStyle, cursor: "pointer" }}
              value={form.priority} onChange={e => set("priority", e.target.value)}>
              {["Low", "Medium", "High", "Critical"].map(p => (
                <option key={p} value={p} style={{ background: "#0e0e18" }}>{p}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <button onClick={onClose} style={{
              flex: 1, background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8,
              padding: "11px 0", fontFamily: "'Space Mono', monospace",
              fontSize: 13, color: "rgba(255,255,255,0.6)", cursor: "pointer"
            }}>Cancel</button>
            <button onClick={() => {
              if (!form.title.trim() || !form.customer.trim()) return;
              onSubmit(form);
            }} style={{
              flex: 1, background: "linear-gradient(135deg,#00ff88,#00b4d8)",
              border: "none", borderRadius: 8, padding: "11px 0",
              fontFamily: "'Space Mono', monospace", fontWeight: 700,
              fontSize: 13, cursor: "pointer", color: "#000"
            }}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      background: "#05050c",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "48px 40px 32px"
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 40, marginBottom: 48
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 34, height: 34, borderRadius: 8,
                background: "linear-gradient(135deg,#00ff88,#00b4d8)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 900, fontSize: 16, color: "#000"
              }}>S</div>
              <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 16, color: "#fff" }}>SupportZone</span>
            </div>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.9 }}>
              Streamlined customer support ticket management for modern teams.
            </p>
          </div>

          {[
            { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
            { title: "Support", links: ["Docs", "API Reference", "Status", "Contact"] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{
                fontFamily: "'Space Mono', monospace", fontSize: 11,
                color: "rgba(255,255,255,0.5)", letterSpacing: 2,
                textTransform: "uppercase", marginBottom: 16
              }}>{col.title}</h4>
              {col.links.map(l => (
                <a key={l} href="#" style={{
                  display: "block", fontFamily: "'Space Mono', monospace",
                  fontSize: 13, color: "rgba(255,255,255,0.4)",
                  textDecoration: "none", marginBottom: 10,
                  transition: "color 0.2s"
                }}
                onMouseEnter={e => e.target.style.color = "#00ff88"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}
                >{l}</a>
              ))}
            </div>
          ))}
        </div>

        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: 24, display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: 12
        }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
            © 2025 SupportZone. Built for Assignment-02 (সহজ সরল সিম্পল).
          </span>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy", "Terms", "Cookies"].map(l => (
              <a key={l} href="#" style={{
                fontFamily: "'Space Mono', monospace", fontSize: 11,
                color: "rgba(255,255,255,0.25)", textDecoration: "none"
              }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [inProgress, setInProgress] = useState([]);
  const [resolved, setResolved] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  const handleAddToProgress = (ticket) => {
    if (inProgress.find(t => t.id === ticket.id)) {
      addToast("Already in progress!", "warning");
      return;
    }
    setInProgress(prev => [...prev, ticket]);
    addToast(`"${ticket.title}" added to In Progress`, "info");
  };

  const handleComplete = (ticket) => {
    setInProgress(prev => prev.filter(t => t.id !== ticket.id));
    setResolved(prev => [...prev, ticket]);
    setTickets(prev => prev.filter(t => t.id !== ticket.id));
    addToast(`"${ticket.title}" resolved! 🎉`, "success");
  };

  const handleNewTicket = (form) => {
    const newTicket = {
      id: Date.now(),
      title: form.title,
      description: form.description,
      customer: form.customer,
      priority: form.priority,
      status: "open",
      createdAt: new Date().toISOString().split("T")[0]
    };
    setTickets(prev => [newTicket, ...prev]);
    setShowModal(false);
    addToast("New ticket submitted!", "success");
  };

  const openTickets = tickets.filter(t => !resolved.find(r => r.id === t.id));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #08080e; color: #fff; }
        @keyframes toastIn { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:none; } }
        ::-webkit-scrollbar { width: 6px; } 
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
      `}</style>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
      {showModal && <NewTicketModal onClose={() => setShowModal(false)} onSubmit={handleNewTicket} />}
      <MobileMenu open={mobileOpen} onNewTicket={() => setShowModal(true)} onClose={() => setMobileOpen(false)} />

      <Navbar onNewTicket={() => setShowModal(true)} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <Banner
        inProgressCount={inProgress.length}
        resolvedCount={resolved.length}
        totalCount={openTickets.length}
      />

      {/* Main */}
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: 32,
          alignItems: "start"
        }} className="main-grid">
          {/* Left: Tickets */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <h2 style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800,
                fontSize: 20, color: "#fff"
              }}>Customer Tickets
                <span style={{
                  fontFamily: "'Space Mono', monospace", fontWeight: 400,
                  fontSize: 13, color: "rgba(255,255,255,0.3)", marginLeft: 10
                }}>({openTickets.length})</span>
              </h2>
            </div>

            {openTickets.length === 0 ? (
              <div style={{
                textAlign: "center", padding: "80px 40px",
                border: "1px dashed rgba(255,255,255,0.1)", borderRadius: 16
              }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                <p style={{ fontFamily: "'Space Mono', monospace", color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
                  All tickets resolved!
                </p>
              </div>
            ) : (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 16
              }} className="ticket-grid">
                {openTickets.map(ticket => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onAdd={handleAddToProgress}
                    isInProgress={!!inProgress.find(t => t.id === ticket.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: Task Status */}
          <div>
            <TaskStatusPanel
              inProgress={inProgress}
              resolved={resolved}
              onComplete={handleComplete}
            />
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        @media(max-width: 900px) {
          .main-grid { grid-template-columns: 1fr !important; }
          .ticket-grid { grid-template-columns: 1fr !important; }
        }
        @media(max-width: 480px) {
          .ticket-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}