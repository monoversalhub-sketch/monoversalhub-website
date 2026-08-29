// src/app/admin/page.js
// This page.js simply renders the admin HTML shell.
// All data comes from /api/admin/data (server-side, service role key).
// No secrets are ever in this file or the browser.

export const metadata = {
  title: "Monoversal Admin",
  robots: "noindex, nofollow",
}

export default function AdminPage() {
  return <AdminShell />
}

function AdminShell() {
  const html = getAdminHTML()
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

function getAdminHTML() {
  return `
<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
:root{
  --bg:#0a0a0f;--s1:#111118;--s2:#18181f;--s3:#20202a;
  --border:rgba(255,255,255,0.07);--border2:rgba(255,255,255,0.12);
  --accent:#f5a623;--red:#f87171;--green:#4ade80;--blue:#60a5fa;--purple:#a78bfa;
  --text:#f0f0f5;--muted:#6b7280;--sub:#9ca3af;
  --nav:60px;--tab:64px;--font:'DM Sans',system-ui,sans-serif;--r:12px;--r-sm:8px;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;overflow:hidden;background:var(--bg);color:var(--text);font-family:var(--font);font-size:15px;-webkit-tap-highlight-color:transparent;-webkit-text-size-adjust:100%}
input,select,textarea,button{font-family:var(--font)}
::-webkit-scrollbar{width:0;height:0}

/* ── SCREENS ── */
.scr{display:none;height:100dvh;flex-direction:column;overflow:hidden}
.scr.on{display:flex}

/* ── AUTH ── */
#s-auth{align-items:center;justify-content:center;padding:32px;background:var(--bg)}
.auth-box{width:100%;max-width:340px;display:flex;flex-direction:column;gap:18px}
.auth-logo{display:flex;align-items:center;gap:10px;margin-bottom:4px}
.auth-logo-mark{width:40px;height:40px;background:var(--accent);border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:18px;color:#000}
.auth-title{font-size:21px;font-weight:700;letter-spacing:-.4px}
.auth-sub{font-size:14px;color:var(--muted)}
.auth-lbl{font-size:12px;font-weight:600;color:var(--sub);text-transform:uppercase;letter-spacing:.4px;margin-bottom:6px;display:block}
.auth-inp{background:var(--s2);border:1px solid var(--border);border-radius:var(--r-sm);padding:14px 16px;font-size:15px;color:var(--text);outline:none;transition:border-color .15s;width:100%}
.auth-inp:focus{border-color:rgba(245,166,35,.5)}
.auth-btn{background:var(--accent);border:none;border-radius:var(--r-sm);padding:14px;font-size:15px;font-weight:700;color:#000;cursor:pointer;width:100%;transition:opacity .15s;font-family:var(--font)}
.auth-btn:active{opacity:.85}
.auth-err{background:rgba(248,113,113,.1);border:1px solid rgba(248,113,113,.2);border-radius:var(--r-sm);padding:11px 14px;font-size:13px;color:var(--red);display:none}

/* ── APP ── */
.app-hdr{height:var(--nav);background:rgba(10,10,15,.95);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 16px;gap:12px;flex-shrink:0}
.hdr-logo{font-size:15px;font-weight:700;flex:1;letter-spacing:-.2px}
.hdr-logo span{color:var(--accent)}
.hdr-actions{display:flex;align-items:center;gap:8px}
.icon-btn{width:36px;height:36px;background:var(--s2);border:1px solid var(--border);border-radius:var(--r-sm);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:16px;transition:all .15s;border:none;color:var(--text)}
.icon-btn:active{background:var(--s3)}

/* ── CONTENT ── */
.content{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:0 0 calc(var(--tab) + 16px)}

/* ── BOTTOM TABS ── */
.btabs{height:var(--tab);background:rgba(10,10,15,.97);backdrop-filter:blur(20px);border-top:1px solid var(--border);display:flex;align-items:stretch;flex-shrink:0;padding-bottom:env(safe-area-inset-bottom,0);position:fixed;bottom:0;left:0;right:0;z-index:40}
.tab{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;border:none;background:none;cursor:pointer;color:var(--muted);font-size:10px;font-weight:600;letter-spacing:.2px;text-transform:uppercase;padding:0;transition:color .15s}
.tab .t-ic{font-size:20px;line-height:1;transition:transform .2s}
.tab.on{color:var(--accent)}
.tab.on .t-ic{transform:scale(1.15)}

/* ── VIEWS ── */
.view{display:none;animation:fadeIn .2s ease}
.view.on{display:block}
@keyframes fadeIn{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:none}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
@keyframes spin{to{transform:rotate(360deg)}}

/* ── SECTION ── */
.sec{padding:18px 16px 0}
.sec-lbl{font-size:12px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.6px;margin-bottom:10px}

/* ── KPI ROW ── */
.kpi-row{display:flex;gap:8px;padding:0 16px 14px;overflow-x:auto;-webkit-overflow-scrolling:touch}
.kpi{background:var(--s2);border:1px solid var(--border);border-radius:20px;padding:8px 14px;display:flex;flex-direction:column;align-items:center;min-width:76px;flex-shrink:0}
.kpi-val{font-size:18px;font-weight:700;line-height:1}
.kpi-lbl{font-size:10px;color:var(--muted);margin-top:2px;white-space:nowrap;text-transform:uppercase;letter-spacing:.3px}

/* ── STAT CARDS ── */
.stats-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:0 16px 14px}
.stat-card{background:var(--s1);border:1px solid var(--border);border-radius:var(--r);padding:16px;position:relative}
.stat-card.a{border-color:rgba(245,166,35,.2);background:rgba(245,166,35,.04)}
.stat-card.g{border-color:rgba(74,222,128,.2);background:rgba(74,222,128,.04)}
.stat-card.b{border-color:rgba(96,165,250,.2);background:rgba(96,165,250,.04)}
.stat-card.r{border-color:rgba(248,113,113,.2);background:rgba(248,113,113,.04)}
.stat-num{font-size:30px;font-weight:700;letter-spacing:-1px;line-height:1;margin-bottom:4px}
.stat-lbl{font-size:11px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.4px}

/* ── COMPLIANCE GRID ── */
.comp-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:0 16px 14px}
.comp-card{background:var(--s1);border:1px solid var(--border);border-radius:var(--r);padding:13px}
.comp-lbl{font-size:11px;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:.4px;margin-bottom:7px}
.comp-status{display:flex;align-items:center;gap:6px;font-size:13px;font-weight:600}
.c-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}
.c-g{background:var(--green)}
.c-a{background:var(--accent)}
.c-r{background:var(--red)}
.prog{height:4px;background:rgba(255,255,255,.06);border-radius:2px;overflow:hidden;margin-top:7px}
.prog-fill{height:100%;border-radius:2px;transition:width 1s ease}

/* ── LIST CARD ── */
.list-card{background:var(--s1);border:1px solid var(--border);border-radius:var(--r);margin:0 16px 10px;overflow:hidden}
.li{display:flex;align-items:center;gap:12px;padding:13px 15px;cursor:pointer;transition:background .1s;border-bottom:1px solid var(--border)}
.li:last-child{border-bottom:none}
.li:active{background:var(--s2)}
.li-av{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex-shrink:0}
.li-body{flex:1;min-width:0}
.li-title{font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:2px}
.li-sub{font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.li-right{text-align:right;flex-shrink:0}
.li-val{font-size:13px;font-weight:600}
.li-meta{font-size:11px;color:var(--muted);margin-top:2px}

/* ── BADGES ── */
.badge{font-size:10px;font-weight:700;padding:3px 8px;border-radius:20px;display:inline-flex;align-items:center;gap:3px;text-transform:uppercase;letter-spacing:.3px}
.b-new{background:rgba(245,166,35,.12);color:var(--accent)}
.b-pending{background:rgba(96,165,250,.12);color:var(--blue)}
.b-approved{background:rgba(74,222,128,.12);color:var(--green)}
.b-read{background:rgba(107,114,128,.12);color:var(--muted)}
.b-boss{background:rgba(245,166,35,.12);color:var(--accent)}
.b-sovr{background:rgba(248,113,113,.12);color:var(--red)}
.b-both{background:rgba(167,139,250,.12);color:var(--purple)}

/* ── FILTER CHIPS ── */
.chips{display:flex;gap:7px;padding:10px 16px 14px;overflow-x:auto;-webkit-overflow-scrolling:touch}
.chip{background:var(--s2);border:1px solid var(--border);border-radius:20px;padding:7px 14px;font-size:13px;font-weight:500;color:var(--sub);cursor:pointer;transition:all .15s;white-space:nowrap;flex-shrink:0;border:1px solid var(--border)}
.chip:active{background:var(--s3)}
.chip.on{background:var(--accent);color:#000;border-color:var(--accent);font-weight:700}

/* ── SHEETS ── */
.backdrop{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:100;display:flex;flex-direction:column;justify-content:flex-end;opacity:0;pointer-events:none;transition:opacity .25s}
.backdrop.on{opacity:1;pointer-events:all}
.sheet{background:var(--s1);border-radius:20px 20px 0 0;border-top:1px solid var(--border2);transform:translateY(100%);transition:transform .3s cubic-bezier(.32,.72,0,1);max-height:88dvh;display:flex;flex-direction:column}
.backdrop.on .sheet{transform:translateY(0)}
.sheet-handle{width:36px;height:4px;background:var(--border2);border-radius:2px;margin:12px auto 0;flex-shrink:0}
.sheet-hdr{padding:16px 18px;border-bottom:1px solid var(--border);flex-shrink:0;display:flex;align-items:center;gap:10px}
.sheet-title{font-size:16px;font-weight:700;flex:1}
.sheet-body{overflow-y:auto;-webkit-overflow-scrolling:touch;padding:18px;display:flex;flex-direction:column;gap:13px}
.sheet-foot{padding:14px 18px;border-top:1px solid var(--border);display:flex;gap:8px;flex-shrink:0;padding-bottom:calc(14px + env(safe-area-inset-bottom,0))}

/* ── BUTTONS ── */
.btn{border:none;border-radius:var(--r-sm);padding:12px 18px;font-size:14px;font-weight:700;cursor:pointer;transition:opacity .15s;font-family:var(--font);display:flex;align-items:center;gap:7px;justify-content:center}
.btn:active{opacity:.8}
.btn-p{background:var(--accent);color:#000;flex:1}
.btn-d{background:rgba(248,113,113,.12);color:var(--red);border:1px solid rgba(248,113,113,.2);flex:1}
.btn-g{background:var(--s2);color:var(--text);flex:1}
.btn-green{background:rgba(74,222,128,.12);color:var(--green);border:1px solid rgba(74,222,128,.2);flex:1}

/* ── SETTINGS ── */
.set-group{background:var(--s1);border:1px solid var(--border);border-radius:var(--r);margin:0 16px 10px;overflow:hidden}
.set-row{display:flex;align-items:center;gap:13px;padding:13px 15px;border-bottom:1px solid var(--border);cursor:pointer;transition:background .1s}
.set-row:last-child{border-bottom:none}
.set-row:active{background:var(--s2)}
.set-ic{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0}
.set-lbl{flex:1;font-size:14px;font-weight:500}
.set-r{font-size:13px;color:var(--muted)}

/* ── EMPTY + TOAST ── */
.empty{display:flex;flex-direction:column;align-items:center;text-align:center;padding:44px 20px;gap:9px}
.empty-ic{font-size:38px;margin-bottom:3px}
.empty-t{font-size:15px;font-weight:600}
.empty-s{font-size:13px;color:var(--muted);max-width:230px;line-height:1.5}
.adm-toast{position:fixed;bottom:calc(var(--tab) + 10px);left:50%;transform:translateX(-50%) translateY(4px);background:var(--text);color:var(--bg);font-size:13px;font-weight:600;padding:10px 18px;border-radius:40px;z-index:200;opacity:0;transition:all .22s;white-space:nowrap;pointer-events:none;max-width:calc(100% - 40px)}
.adm-toast.on{opacity:1;transform:translateX(-50%) translateY(0)}
.spin-btn{transition:transform .4s}
.spin-btn.spinning{animation:spin .8s linear infinite}

/* ── FIELD (sheet detail) ── */
.field{display:flex;flex-direction:column;gap:3px}
.field-lbl{font-size:11px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.4px}
.field-val{font-size:14px;font-weight:500;color:var(--text)}
.msg-body{background:var(--s2);border:1px solid var(--border);border-radius:var(--r-sm);padding:13px;font-size:14px;color:var(--sub);line-height:1.7}
</style>

<!-- ════ AUTH ════ -->
<div class="scr on" id="s-auth">
  <div class="auth-box">
    <div>
      <div class="auth-logo">
        <div class="auth-logo-mark">A</div>
        <div><div class="auth-title">Monoversal Admin</div><div class="auth-sub">Operations dashboard</div></div>
      </div>
    </div>
    <div>
      <label class="auth-lbl">Admin Passcode</label>
      <input class="auth-inp" type="password" id="auth-inp" placeholder="Enter passcode" autocomplete="current-password"/>
    </div>
    <div class="auth-err" id="auth-err">Incorrect passcode. Try again.</div>
    <button class="auth-btn" id="auth-btn" onclick="doAuth()">Sign In →</button>
    <p style="font-size:12px;color:var(--muted);text-align:center;line-height:1.5">Internal use only. Unauthorised access prohibited under Cybercrimes Act 2015.</p>
  </div>
</div>

<!-- ════ APP ════ -->
<div class="scr" id="s-app">
  <div class="app-hdr">
    <div class="hdr-logo">Mono<span>Admin</span></div>
    <div class="hdr-actions">
      <button class="icon-btn spin-btn" id="ref-btn" onclick="refreshAll()" title="Refresh">↻</button>
      <button class="icon-btn" onclick="signOut()" title="Sign out" style="font-size:14px">Exit</button>
    </div>
  </div>

  <div class="content">

    <!-- ── OVERVIEW ── -->
    <div class="view on" id="v-overview">
      <div style="padding:16px 16px 0;display:flex;align-items:center;justify-content:space-between">
        <div><div style="font-size:18px;font-weight:700;letter-spacing:-.4px" id="greet-txt">Good morning</div>
          <div style="font-size:12px;color:var(--muted);margin-top:1px" id="today-txt">—</div></div>
        <div style="background:rgba(74,222,128,.1);border:1px solid rgba(74,222,128,.2);border-radius:20px;padding:5px 12px;font-size:11px;color:var(--green);font-weight:600;display:flex;align-items:center;gap:5px">
          <span style="width:6px;height:6px;border-radius:50%;background:var(--green);animation:pulse 2s infinite;display:inline-block"></span>Live
        </div>
      </div>

      <div class="kpi-row" style="margin-top:14px">
        <div class="kpi"><div class="kpi-val" id="kpi-wl">—</div><div class="kpi-lbl">Waitlist</div></div>
        <div class="kpi"><div class="kpi-val" id="kpi-msg">—</div><div class="kpi-lbl">Messages</div></div>
        <div class="kpi"><div class="kpi-val" id="kpi-rev">—</div><div class="kpi-lbl">Reviews</div></div>
        <div class="kpi"><div class="kpi-val" id="kpi-pend">—</div><div class="kpi-lbl">Pending</div></div>
        <div class="kpi"><div class="kpi-val" style="color:var(--green)">✓</div><div class="kpi-lbl">DB</div></div>
      </div>

      <div class="stats-row">
        <div class="stat-card a"><div class="stat-num" id="st-wl" style="color:var(--accent)">—</div><div class="stat-lbl">Waitlist Signups</div></div>
        <div class="stat-card g"><div class="stat-num" id="st-msg" style="color:var(--green)">—</div><div class="stat-lbl">Messages</div></div>
        <div class="stat-card b"><div class="stat-num" id="st-pend" style="color:var(--blue)">—</div><div class="stat-lbl">Pending Reviews</div></div>
        <div class="stat-card r"><div class="stat-num" id="st-unread" style="color:var(--red)">—</div><div class="stat-lbl">Unreplied</div></div>
      </div>

      <div class="sec"><div class="sec-lbl">Compliance Status</div></div>
      <div class="comp-grid">
        <div class="comp-card"><div class="comp-lbl">CAC Registration</div><div class="comp-status"><div class="c-dot c-g"></div>Registered</div><div class="prog"><div class="prog-fill" style="width:100%;background:var(--green)"></div></div></div>
        <div class="comp-card"><div class="comp-lbl">Paystack KYC</div><div class="comp-status"><div class="c-dot c-a"></div>In Progress</div><div class="prog"><div class="prog-fill" style="width:65%;background:var(--accent)"></div></div></div>
        <div class="comp-card"><div class="comp-lbl">NDPR Privacy</div><div class="comp-status"><div class="c-dot c-a"></div>Policy Live</div><div class="prog"><div class="prog-fill" style="width:70%;background:var(--accent)"></div></div></div>
        <div class="comp-card"><div class="comp-lbl">Data Security</div><div class="comp-status"><div class="c-dot c-g"></div>Supabase RLS</div><div class="prog"><div class="prog-fill" style="width:80%;background:var(--green)"></div></div></div>
        <div class="comp-card"><div class="comp-lbl">Trademark</div><div class="comp-status"><div class="c-dot c-r"></div>Not Filed</div><div class="prog"><div class="prog-fill" style="width:10%;background:var(--red)"></div></div></div>
        <div class="comp-card"><div class="comp-lbl">VAT (FIRS)</div><div class="comp-status"><div class="c-dot c-a"></div>Below Threshold</div><div class="prog"><div class="prog-fill" style="width:40%;background:var(--accent)"></div></div></div>
      </div>

      <div class="sec"><div class="sec-lbl">Recent Activity</div></div>
      <div class="list-card" id="activity-list">
        <div class="li"><div style="font-size:20px">⏳</div><div class="li-body"><div class="li-title" style="color:var(--muted)">Loading…</div></div></div>
      </div>
    </div>

    <!-- ── WAITLIST ── -->
    <div class="view" id="v-waitlist">
      <div class="sec" style="display:flex;align-items:center;justify-content:space-between">
        <div class="sec-lbl" style="margin-bottom:0">Waitlist Signups</div>
        <button onclick="exportCSV('waitlist')" style="font-size:12px;background:var(--s2);border:1px solid var(--border);border-radius:6px;padding:5px 11px;color:var(--sub);cursor:pointer;font-family:var(--font)">⬇ CSV</button>
      </div>
      <div class="chips">
        <div class="chip on" onclick="filterWL('all',this)">All</div>
        <div class="chip" onclick="filterWL('boss',this)">BOSS</div>
        <div class="chip" onclick="filterWL('sovr',this)">SOVR</div>
        <div class="chip" onclick="filterWL('both',this)">Both</div>
      </div>
      <div id="wl-list"><div class="empty"><div class="empty-ic">⏳</div><div class="empty-t">Loading…</div></div></div>
    </div>

    <!-- ── MESSAGES ── -->
    <div class="view" id="v-messages">
      <div class="sec" style="display:flex;align-items:center;justify-content:space-between">
        <div class="sec-lbl" style="margin-bottom:0">Contact Messages</div>
        <button onclick="exportCSV('messages')" style="font-size:12px;background:var(--s2);border:1px solid var(--border);border-radius:6px;padding:5px 11px;color:var(--sub);cursor:pointer;font-family:var(--font)">⬇ CSV</button>
      </div>
      <div class="chips">
        <div class="chip on" onclick="filterMsgs('all',this)">All</div>
        <div class="chip" onclick="filterMsgs('unreplied',this)">Unreplied</div>
        <div class="chip" onclick="filterMsgs('replied',this)">Replied</div>
      </div>
      <div id="msg-list"><div class="empty"><div class="empty-ic">⏳</div><div class="empty-t">Loading…</div></div></div>
    </div>

    <!-- ── REVIEWS ── -->
    <div class="view" id="v-reviews">
      <div class="sec" style="display:flex;align-items:center;justify-content:space-between">
        <div class="sec-lbl" style="margin-bottom:0">Testimonials</div>
        <div style="font-size:12px;color:var(--muted)">Approve to publish</div>
      </div>
      <div class="chips">
        <div class="chip on" onclick="filterRevs('pending',this)">Pending</div>
        <div class="chip" onclick="filterRevs('approved',this)">Approved</div>
        <div class="chip" onclick="filterRevs('all',this)">All</div>
      </div>
      <div id="rev-list"><div class="empty"><div class="empty-ic">⏳</div><div class="empty-t">Loading…</div></div></div>
    </div>

    <!-- ── SETTINGS ── -->
    <div class="view" id="v-settings">
      <div class="sec"><div class="sec-lbl">System</div></div>
      <div class="set-group">
        <div class="set-row"><div class="set-ic" style="background:rgba(74,222,128,.1)">🗄️</div><div class="set-lbl">Database Status</div><div class="set-r" id="db-status" style="color:var(--muted)">Checking…</div></div>
        <div class="set-row" onclick="refreshAll()"><div class="set-ic" style="background:rgba(245,166,35,.1)">↻</div><div class="set-lbl">Refresh All Data</div><div class="set-r">→</div></div>
      </div>

      <div class="sec" style="margin-top:6px"><div class="sec-lbl">Compliance Checklist</div></div>
      <div class="set-group">
        <div class="set-row"><div class="set-ic" style="background:rgba(74,222,128,.1)">✅</div><div class="set-lbl">CAC BN: 9319562</div><div class="set-r" style="color:var(--green)">Done</div></div>
        <div class="set-row" onclick="adm_toast('Upload: CAC BN cert + BN1 + ID + address to Paystack dashboard')"><div class="set-ic" style="background:rgba(245,166,35,.1)">⏳</div><div class="set-lbl">Paystack KYC Docs</div><div class="set-r" style="color:var(--accent)">Action →</div></div>
        <div class="set-row" onclick="adm_toast('File trademark for BOSS + Monoversal Hub at: iponigeria.gov.ng')"><div class="set-ic" style="background:rgba(248,113,113,.1)">🔴</div><div class="set-lbl">Trademark (TMO)</div><div class="set-r" style="color:var(--red)">Not Done →</div></div>
        <div class="set-row" onclick="adm_toast('Appoint DPO, schedule NITDA Data Protection Audit, update privacy policy yearly')"><div class="set-ic" style="background:rgba(245,166,35,.1)">⏳</div><div class="set-lbl">NDPR Full Compliance</div><div class="set-r" style="color:var(--accent)">Partial →</div></div>
        <div class="set-row" onclick="adm_toast('VAT required when annual turnover exceeds ₦25M. Monitor and register with FIRS.')"><div class="set-ic" style="background:rgba(107,114,128,.1)">ℹ️</div><div class="set-lbl">VAT Registration (FIRS)</div><div class="set-r" style="color:var(--muted)">Below ₦25M</div></div>
      </div>

      <div class="sec" style="margin-top:6px"><div class="sec-lbl">External Links</div></div>
      <div class="set-group">
        <div class="set-row" onclick="window.open('https://boss-app-nine.vercel.app','_blank')"><div class="set-ic" style="background:rgba(245,166,35,.1)">🚀</div><div class="set-lbl">BOSS App (Live)</div><div class="set-r">↗</div></div>
        <div class="set-row" onclick="window.open('https://supabase.com/dashboard','_blank')"><div class="set-ic" style="background:rgba(74,222,128,.1)">🗄️</div><div class="set-lbl">Supabase Dashboard</div><div class="set-r">↗</div></div>
        <div class="set-row" onclick="window.open('https://dashboard.paystack.com','_blank')"><div class="set-ic" style="background:rgba(96,165,250,.1)">💳</div><div class="set-lbl">Paystack Dashboard</div><div class="set-r">↗</div></div>
        <div class="set-row" onclick="window.open('https://vercel.com/dashboard','_blank')"><div class="set-ic" style="background:rgba(167,139,250,.1)">▲</div><div class="set-lbl">Vercel Dashboard</div><div class="set-r">↗</div></div>
      </div>

      <div class="sec" style="margin-top:6px"><div class="sec-lbl">Account</div></div>
      <div class="set-group">
        <div class="set-row" onclick="signOut()" style="color:var(--red)"><div class="set-ic" style="background:rgba(248,113,113,.1)">🚪</div><div class="set-lbl" style="color:var(--red)">Sign Out</div><div class="set-r">→</div></div>
      </div>

      <div style="padding:22px 16px 8px;text-align:center;font-size:11px;color:var(--muted);line-height:1.6">
        Monoversal Admin v2.0 · CAC BN: 9319562<br/>
        Internal use only · All access logged
      </div>
    </div>

  </div><!-- end .content -->

  <div class="btabs">
    <button class="tab on" id="tab-overview"  onclick="switchTab('overview')"><div class="t-ic">⬛</div>Overview</button>
    <button class="tab"    id="tab-waitlist"  onclick="switchTab('waitlist')"><div class="t-ic">📋</div>Waitlist</button>
    <button class="tab"    id="tab-messages"  onclick="switchTab('messages')"><div class="t-ic">💬</div>Messages</button>
    <button class="tab"    id="tab-reviews"   onclick="switchTab('reviews')"><div class="t-ic">⭐</div>Reviews</button>
    <button class="tab"    id="tab-settings"  onclick="switchTab('settings')"><div class="t-ic">⚙️</div>Settings</button>
  </div>
</div>

<!-- ════ SHEETS ════ -->

<!-- Signup detail -->
<div class="backdrop" id="bd-signup" onclick="closeSheet('signup')">
  <div class="sheet" onclick="e=>e.stopPropagation()">
    <div class="sheet-handle"></div>
    <div class="sheet-hdr"><div class="sheet-title" id="sh-su-name">Signup</div><div id="sh-su-badge"></div></div>
    <div class="sheet-body" id="sh-su-body"></div>
    <div class="sheet-foot">
      <button class="btn btn-g" onclick="closeSheet('signup')">Close</button>
      <button class="btn btn-p" onclick="waSignup()">💬 WhatsApp</button>
    </div>
  </div>
</div>

<!-- Message detail -->
<div class="backdrop" id="bd-msg" onclick="closeSheet('msg')">
  <div class="sheet" onclick="e=>e.stopPropagation()">
    <div class="sheet-handle"></div>
    <div class="sheet-hdr"><div class="sheet-title" id="sh-msg-name">Message</div><div id="sh-msg-badge"></div></div>
    <div class="sheet-body" id="sh-msg-body"></div>
    <div class="sheet-foot">
      <button class="btn btn-g" onclick="closeSheet('msg')">Close</button>
      <button class="btn btn-green" onclick="markReplied()">✓ Replied</button>
      <button class="btn btn-p" onclick="replyEmail()">📧 Reply</button>
    </div>
  </div>
</div>

<!-- Review detail -->
<div class="backdrop" id="bd-rev" onclick="closeSheet('rev')">
  <div class="sheet" onclick="e=>e.stopPropagation()">
    <div class="sheet-handle"></div>
    <div class="sheet-hdr"><div class="sheet-title" id="sh-rev-name">Review</div><div id="sh-rev-badge"></div></div>
    <div class="sheet-body" id="sh-rev-body"></div>
    <div class="sheet-foot">
      <button class="btn btn-g" onclick="closeSheet('rev')">Close</button>
      <button class="btn btn-d" id="sh-rev-rej" onclick="rejectRev()">✕ Delete</button>
      <button class="btn btn-p" id="sh-rev-app" onclick="approveRev()">✓ Approve</button>
    </div>
  </div>
</div>

<div class="adm-toast" id="adm-toast"></div>

<script>
// ═══════════════════════════════════════════════
// MONOVERSAL ADMIN — All API calls go through
// /api/admin/* — no secrets in browser ever.
// ═══════════════════════════════════════════════

const ST = { waitlist:[], messages:[], testimonials:[], wlF:'all', msgF:'all', revF:'pending', curSU:null, curMsg:null, curRev:null };

// ── AUTH ────────────────────────────────────────
async function doAuth() {
  const btn = document.getElementById('auth-btn');
  const inp = document.getElementById('auth-inp');
  const err = document.getElementById('auth-err');
  btn.textContent = 'Signing in…'; btn.disabled = true;
  err.style.display = 'none';
  try {
    const r = await fetch('/api/admin/auth', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ passcode: inp.value })
    });
    if (r.ok) {
      document.getElementById('s-auth').classList.remove('on');
      document.getElementById('s-app').classList.add('on');
      initApp();
    } else {
      err.style.display = 'block'; inp.value = '';
    }
  } catch { err.textContent = 'Network error. Try again.'; err.style.display = 'block'; }
  btn.textContent = 'Sign In →'; btn.disabled = false;
}
document.getElementById('auth-inp')?.addEventListener('keydown', e => { if(e.key==='Enter') doAuth(); });

async function signOut() {
  await fetch('/api/admin/auth', { method:'DELETE' });
  document.getElementById('s-app').classList.remove('on');
  document.getElementById('s-auth').classList.add('on');
  document.getElementById('auth-inp').value = '';
}

// ── INIT ────────────────────────────────────────
function initApp() {
  const h = new Date().getHours();
  document.getElementById('greet-txt').textContent = h<12?'Good morning':h<17?'Good afternoon':'Good evening';
  document.getElementById('today-txt').textContent = new Date().toLocaleDateString('en-NG',{weekday:'short',day:'numeric',month:'short'});
  refreshAll();
}

// ── DATA ────────────────────────────────────────
async function refreshAll() {
  const btn = document.getElementById('ref-btn');
  btn.classList.add('spinning');
  try {
    const r = await fetch('/api/admin/data');
    if (r.status === 401) { signOut(); return; }
    if (!r.ok) throw new Error('Fetch failed');
    const { waitlist, messages, testimonials } = await r.json();
    ST.waitlist     = waitlist     || [];
    ST.messages     = messages     || [];
    ST.testimonials = testimonials || [];
    updateDash(); renderWL(); renderMsgs(); renderRevs();
    document.getElementById('db-status').textContent = '✓ Connected';
    document.getElementById('db-status').style.color = 'var(--green)';
  } catch(e) {
    adm_toast('⚠️ Failed to fetch data');
    document.getElementById('db-status').textContent = 'Error';
    document.getElementById('db-status').style.color = 'var(--red)';
  }
  setTimeout(() => btn.classList.remove('spinning'), 600);
}

async function apiPatch(table, id, data) {
  const r = await fetch('/api/admin/data', {
    method:'PATCH', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ table, id, data })
  });
  if (r.status === 401) { signOut(); return false; }
  return r.ok;
}

async function apiDelete(table, id) {
  const r = await fetch('/api/admin/data', {
    method:'DELETE', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ table, id })
  });
  if (r.status === 401) { signOut(); return false; }
  return r.ok;
}

// ── DASHBOARD ────────────────────────────────────
function updateDash() {
  const { waitlist: wl, messages: ms, testimonials: ts } = ST;
  const unreplied = ms.filter(m => !m.replied).length;
  const pending   = ts.filter(t => !t.approved).length;
  ['kpi-wl','st-wl'].forEach(id => document.getElementById(id).textContent = wl.length);
  ['kpi-msg','st-msg'].forEach(id => document.getElementById(id).textContent = ms.length);
  document.getElementById('kpi-rev').textContent  = ts.length;
  document.getElementById('kpi-pend').textContent = pending;
  document.getElementById('st-pend').textContent  = pending;
  document.getElementById('st-unread').textContent = unreplied;

  const acts = [
    ...wl.slice(0,3).map(w => ({ ic:'📋', t:\`\${w.name} joined waitlist\`, s:\`\${w.interest||'General'} · \${rel(w.created_at)}\` })),
    ...ms.slice(0,3).map(m => ({ ic:'💬', t:\`Message from \${m.fname}\`, s:\`\${m.subject||'General'} · \${rel(m.created_at)}\` })),
    ...ts.filter(t=>!t.approved).slice(0,2).map(t => ({ ic:'⭐', t:\`Review from \${t.name}\`, s:\`Needs approval · \${rel(t.created_at)}\` })),
  ].slice(0,7);

  document.getElementById('activity-list').innerHTML = acts.length
    ? acts.map(a => \`<div class="li"><div style="font-size:19px">\${a.ic}</div><div class="li-body"><div class="li-title">\${esc(a.t)}</div><div class="li-sub">\${esc(a.s)}</div></div></div>\`).join('')
    : \`<div class="li"><div class="li-body"><div class="li-title" style="color:var(--muted)">No recent activity</div></div></div>\`;
}

// ── WAITLIST ─────────────────────────────────────
function filterWL(f, btn) {
  ST.wlF = f;
  document.querySelectorAll('#v-waitlist .chip').forEach(c => c.classList.remove('on'));
  btn.classList.add('on'); renderWL();
}
function renderWL() {
  const data = ST.wlF === 'all' ? ST.waitlist : ST.waitlist.filter(w => w.interest === ST.wlF);
  if (!data.length) { document.getElementById('wl-list').innerHTML = \`<div class="empty"><div class="empty-ic">📋</div><div class="empty-t">No signups yet</div><div class="empty-s">Waitlist submissions will appear here.</div></div>\`; return; }
  const COLS = ['#f5a623','#2dd4bf','#f87171','#60a5fa','#a78bfa','#4ade80'];
  document.getElementById('wl-list').innerHTML = \`<div class="list-card">\${data.map((w,i) => {
    const ini = w.name.trim().split(' ').slice(0,2).map(x=>x[0]).join('').toUpperCase();
    const bc = w.interest === 'boss' ? 'b-boss' : w.interest === 'sovr' ? 'b-sovr' : w.interest === 'both' ? 'b-both' : 'b-new';
    return \`<div class="li" onclick="openSU(\${i})"><div class="li-av" style="background:\${COLS[i%COLS.length]};color:#000">\${ini}</div><div class="li-body"><div class="li-title">\${esc(w.name)}</div><div class="li-sub">\${esc(w.email)}</div></div><div class="li-right"><div class="badge \${bc}">\${w.interest||'all'}</div><div class="li-meta">\${rel(w.created_at)}</div></div></div>\`;
  }).join('')}</div>\`;
}
function openSU(i) {
  const data = ST.wlF === 'all' ? ST.waitlist : ST.waitlist.filter(w => w.interest === ST.wlF);
  const w = data[i]; if(!w) return; ST.curSU = w;
  document.getElementById('sh-su-name').textContent = w.name;
  document.getElementById('sh-su-badge').innerHTML = \`<div class="badge b-new">\${w.interest||'general'}</div>\`;
  document.getElementById('sh-su-body').innerHTML = field('Name',w.name)+field('Email',w.email)+field('Interest',w.interest||'—')+field('Signed up',fmtDate(w.created_at))+field('ID',w.id);
  openSheet('signup');
}
function waSignup() {
  const w = ST.curSU; if(!w) return;
  const msg = encodeURIComponent(\`Hi \${w.name.split(' ')[0]}! 👋\\n\\nThank you for joining the Monoversal Hub waitlist for \${w.interest==='boss'?'BOSS':w.interest==='sovr'?'SOVR':'our products'}.\\n\\nWe'll be in touch soon — your spot is reserved.\\n\\nBuild Trust. Grow Faster.\\n— Monoversal Hub\`);
  window.open('https://wa.me/?text='+msg, '_blank');
}

// ── MESSAGES ─────────────────────────────────────
function filterMsgs(f, btn) {
  ST.msgF = f;
  document.querySelectorAll('#v-messages .chip').forEach(c => c.classList.remove('on'));
  btn.classList.add('on'); renderMsgs();
}
function renderMsgs() {
  const data = ST.msgF === 'unreplied' ? ST.messages.filter(m=>!m.replied) : ST.msgF === 'replied' ? ST.messages.filter(m=>m.replied) : ST.messages;
  if(!data.length){document.getElementById('msg-list').innerHTML=\`<div class="empty"><div class="empty-ic">💬</div><div class="empty-t">No messages</div><div class="empty-s">Contact form submissions appear here.</div></div>\`;return;}
  document.getElementById('msg-list').innerHTML = \`<div class="list-card">\${data.map((m,i) => \`
    <div class="li" onclick="openMsg('\${m.id}')">
      <div class="li-av" style="background:\${m.replied?'#1f2937':'#1e3a5f'};color:\${m.replied?'var(--muted)':'var(--blue)'}">
        \${(m.fname||'?')[0].toUpperCase()}</div>
      <div class="li-body"><div class="li-title">\${esc(m.fname)} \${esc(m.lname||'')}</div>
        <div class="li-sub">\${esc(m.subject||'General')} · \${esc(m.email)}</div></div>
      <div class="li-right"><div class="badge \${m.replied?'b-read':'b-pending'}">\${m.replied?'Replied':'Unread'}</div>
        <div class="li-meta">\${rel(m.created_at)}</div></div>
    </div>\`).join('')}</div>\`;
}
function openMsg(id) {
  const m = ST.messages.find(x=>x.id===id); if(!m) return; ST.curMsg = m;
  document.getElementById('sh-msg-name').textContent = (\`\${m.fname} \${m.lname||''}\`).trim();
  document.getElementById('sh-msg-badge').innerHTML  = \`<div class="badge \${m.replied?'b-read':'b-pending'}">\${m.replied?'Replied':'Unread'}</div>\`;
  document.getElementById('sh-msg-body').innerHTML   = field('From',(\`\${m.fname} \${m.lname||''}\`).trim())+field('Email',m.email)+field('Subject',m.subject||'General')+field('Date',fmtDate(m.created_at))+\`<div class="msg-body">\${esc(m.message)}</div>\`+field('Status',m.replied?'✓ Replied':'⏳ Needs reply');
  openSheet('msg');
}
async function markReplied() {
  const m = ST.curMsg; if(!m) return;
  const ok = await apiPatch('website_messages', m.id, { replied:true });
  if(ok){adm_toast('✅ Marked as replied');closeSheet('msg');await refreshAll();}
  else adm_toast('❌ Update failed');
}
function replyEmail() {
  const m = ST.curMsg; if(!m) return;
  const sub  = encodeURIComponent(\`Re: \${m.subject||'Your message to Monoversal Hub'}\`);
  const body = encodeURIComponent(\`Hi \${m.fname},\\n\\nThank you for reaching out to Monoversal Hub.\\n\\n[Your reply here]\\n\\nBest regards,\\nMonoversal Hub\\nmonoversalhub@gmail.com\`);
  window.open(\`mailto:\${m.email}?subject=\${sub}&body=\${body}\`,'_blank');
}

// ── REVIEWS ──────────────────────────────────────
function filterRevs(f, btn) {
  ST.revF = f;
  document.querySelectorAll('#v-reviews .chip').forEach(c => c.classList.remove('on'));
  btn.classList.add('on'); renderRevs();
}
function renderRevs() {
  const data = ST.revF === 'pending' ? ST.testimonials.filter(t=>!t.approved) : ST.revF === 'approved' ? ST.testimonials.filter(t=>t.approved) : ST.testimonials;
  if(!data.length){document.getElementById('rev-list').innerHTML=\`<div class="empty"><div class="empty-ic">⭐</div><div class="empty-t">\${ST.revF==='pending'?'No pending reviews':'No testimonials'}</div><div class="empty-s">Testimonial submissions appear here.</div></div>\`;return;}
  document.getElementById('rev-list').innerHTML = \`<div class="list-card">\${data.map(t => \`
    <div class="li" onclick="openRev('\${t.id}')">
      <div class="li-av" style="background:\${t.approved?'#14532d':'#1e3a5f'};color:\${t.approved?'var(--green)':'var(--blue)'}">
        \${(t.name||'?')[0].toUpperCase()}</div>
      <div class="li-body"><div class="li-title">\${esc(t.name)}</div>
        <div class="li-sub">\${esc((t.text||'').slice(0,55))}…</div></div>
      <div class="li-right"><div class="badge \${t.approved?'b-approved':'b-pending'}">\${t.approved?'Live':'Pending'}</div>
        <div class="li-meta">\${rel(t.created_at)}</div></div>
    </div>\`).join('')}</div>\`;
}
function openRev(id) {
  const t = ST.testimonials.find(x=>x.id===id); if(!t) return; ST.curRev = t;
  document.getElementById('sh-rev-name').textContent = t.name;
  document.getElementById('sh-rev-badge').innerHTML  = \`<div class="badge \${t.approved?'b-approved':'b-pending'}">\${t.approved?'Live':'Pending'}</div>\`;
  document.getElementById('sh-rev-body').innerHTML   = field('From',t.name)+field('Role',t.role||'—')+field('Date',fmtDate(t.created_at))+\`<div class="msg-body" style="font-style:italic">"\${esc(t.text)}"</div>\`;
  const appBtn = document.getElementById('sh-rev-app');
  const rejBtn = document.getElementById('sh-rev-rej');
  if(t.approved){ appBtn.textContent='✓ Already Live'; appBtn.disabled=true; rejBtn.textContent='✕ Unpublish'; }
  else { appBtn.textContent='✓ Approve & Publish'; appBtn.disabled=false; rejBtn.textContent='✕ Delete'; }
  openSheet('rev');
}
async function approveRev() {
  const t = ST.curRev; if(!t||t.approved) return;
  const ok = await apiPatch('website_testimonials', t.id, { approved:true });
  if(ok){adm_toast('✅ Published on website');closeSheet('rev');await refreshAll();}
  else adm_toast('❌ Approval failed');
}
async function rejectRev() {
  const t = ST.curRev; if(!t) return;
  if(!confirm(\`Delete \${t.name}'s testimonial? Cannot be undone.\`)) return;
  const ok = await apiDelete('website_testimonials', t.id);
  if(ok){adm_toast('🗑️ Deleted');closeSheet('rev');await refreshAll();}
  else adm_toast('❌ Delete failed');
}

// ── NAV ──────────────────────────────────────────
function switchTab(id) {
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('on'));
  document.querySelectorAll('.tab').forEach(b=>b.classList.remove('on'));
  document.getElementById('v-'+id).classList.add('on');
  document.getElementById('tab-'+id).classList.add('on');
}

// ── SHEETS ───────────────────────────────────────
function openSheet(id)  { document.getElementById('bd-'+id).classList.add('on'); }
function closeSheet(id) { document.getElementById('bd-'+id).classList.remove('on'); }

// ── CSV EXPORT ───────────────────────────────────
function exportCSV(type) {
  const data = type === 'waitlist' ? ST.waitlist : ST.messages;
  if(!data.length){adm_toast('No data to export');return;}
  const keys = Object.keys(data[0]);
  const csv  = [keys.join(','),...data.map(row=>keys.map(k=>\`"\${String(row[k]||'').replace(/"/g,'""')}"\`).join(','))].join('\\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv],{type:'text/csv'}));
  a.download = \`monoversal-\${type}-\${new Date().toISOString().slice(0,10)}.csv\`;
  a.click(); URL.revokeObjectURL(a.href);
  adm_toast(\`✅ \${data.length} rows exported\`);
}

// ── UTILS ─────────────────────────────────────────
function field(lbl, val) {
  return \`<div class="field"><div class="field-lbl">\${lbl}</div><div class="field-val">\${esc(String(val||'—'))}</div></div>\`;
}
function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function rel(ts){if(!ts)return'—';const m=Math.floor((Date.now()-new Date(ts).getTime())/60000);if(m<1)return'just now';if(m<60)return m+'m ago';const h=Math.floor(m/60);if(h<24)return h+'h ago';const d=Math.floor(h/24);return d<7?d+'d ago':new Date(ts).toLocaleDateString('en-NG',{day:'numeric',month:'short'});}
function fmtDate(ts){if(!ts)return'—';return new Date(ts).toLocaleString('en-NG',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});}
let toastT;
function adm_toast(msg){const el=document.getElementById('adm-toast');el.textContent=msg;el.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>el.classList.remove('on'),3200);}
</script>
  `
}
