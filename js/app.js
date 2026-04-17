/**
 * SmartProcure 360 — NovaTech Industries Pvt. Ltd.
 * SAP BTP Capstone Project | Application Logic
 * FI + MM + SD Functional Areas
 */

'use strict';

// ── DATA STORE ──────────────────────────────────────────────────────────────

let poData = [
  { id:'PO-2024-041', vendor:'IndustrialParts (V003)',  material:'Steel Rods 20mm',         dept:'MM', amount:'₹2,40,000', date:'2024-11-10', status:'Rejected'  },
  { id:'PO-2024-042', vendor:'OfficeNeeds Ltd. (V002)', material:'Office Furniture Set',      dept:'FI', amount:'₹85,000',  date:'2024-11-15', status:'Approved'  },
  { id:'PO-2024-043', vendor:'CloudServ Inc. (V004)',   material:'Cloud Hosting (Annual)',    dept:'FI', amount:'₹3,20,000',date:'2024-11-18', status:'Approved'  },
  { id:'PO-2024-044', vendor:'TechSupply Co. (V001)',   material:'Laptops x 20',             dept:'MM', amount:'₹6,80,000',date:'2024-11-20', status:'Approved'  },
  { id:'PO-2024-045', vendor:'IndustrialParts (V003)',  material:'Hydraulic Pumps',          dept:'MM', amount:'₹4,50,000',date:'2024-11-25', status:'Pending'   },
  { id:'PO-2024-046', vendor:'TechSupply Co. (V001)',   material:'Network Switches x 10',   dept:'SD', amount:'₹1,20,000',date:'2024-11-28', status:'Approved'  },
  { id:'PO-2024-047', vendor:'OfficeNeeds Ltd. (V002)', material:'Stationery Bulk Pack',     dept:'SD', amount:'₹45,000',  date:'2024-11-30', status:'Pending'   },
];

let approvalData = [
  { id:'PO-2024-045', vendor:'IndustrialParts (V003)',  material:'Hydraulic Pumps',         dept:'MM', amount:'₹4,50,000', urgency:'High'   },
  { id:'PO-2024-047', vendor:'OfficeNeeds Ltd. (V002)', material:'Stationery Bulk Pack',    dept:'SD', amount:'₹45,000',   urgency:'Low'    },
  { id:'PO-2024-048', vendor:'TechSupply Co. (V001)',   material:'Industrial Bearings 50mm',dept:'MM', amount:'₹1,80,000', urgency:'Medium' },
];

let poCounter = 49;

// ── TAB NAVIGATION ───────────────────────────────────────────────────────────

const TAB_IDS = ['dashboard','po','budget','approvals','org','about'];

function showTab(t) {
  TAB_IDS.forEach(id => {
    document.getElementById('tab-' + id).classList.add('hidden');
  });
  document.getElementById('tab-' + t).classList.remove('hidden');

  document.querySelectorAll('.sp-nav-item').forEach((el, i) => {
    el.classList.toggle('active', TAB_IDS[i] === t);
  });
}

// ── RENDER PO TABLE ──────────────────────────────────────────────────────────

function renderPO() {
  const tb = document.getElementById('po-tbody');
  tb.innerHTML = poData.map(p => {
    const cls = {
      'Approved': 'badge-approved',
      'Rejected': 'badge-rejected',
      'Pending':  'badge-pending',
    }[p.status] || 'badge-inprogress';

    return `<tr>
      <td style="font-weight:700;color:#0854a0">${p.id}</td>
      <td>${p.vendor}</td>
      <td>${p.material}</td>
      <td><span class="badge badge-inprogress" style="background:#e8f0fa;color:#0854a0">${p.dept}</span></td>
      <td style="font-weight:700">${p.amount}</td>
      <td style="color:#888">${p.date}</td>
      <td><span class="badge ${cls}">${p.status}</span></td>
    </tr>`;
  }).join('');

  // Update KPI
  const totalEl = document.getElementById('kpi-total-po');
  if (totalEl) totalEl.textContent = poData.length;
}

// ── RENDER APPROVALS ─────────────────────────────────────────────────────────

function renderApprovals() {
  const el = document.getElementById('approval-list');
  const allMsg = document.getElementById('all-approved-msg');
  const pendingLabel = document.getElementById('pending-label');

  if (!el) return;

  if (approvalData.length === 0) {
    el.innerHTML = '';
    allMsg.classList.remove('hidden');
  } else {
    allMsg.classList.add('hidden');
    el.innerHTML = approvalData.map((a, i) => {
      const urgencyColor = a.urgency === 'High' ? '#bb0000' : a.urgency === 'Medium' ? '#e76500' : '#107e3e';
      return `<div class="approval-card" id="acard-${i}">
        <div class="approval-header">
          <div>
            <div class="approval-po">${a.id}</div>
            <div class="approval-vendor">${a.vendor} &nbsp;·&nbsp; ${a.dept}</div>
            <div style="font-size:11px;color:#888;margin-top:2px">${a.material}</div>
          </div>
          <div>
            <div class="approval-amount">${a.amount}</div>
            <div style="font-size:11px;color:#888;margin-top:4px;text-align:right">
              Urgency: <b style="color:${urgencyColor}">${a.urgency}</b>
            </div>
          </div>
        </div>
        <div class="approval-actions">
          <button class="btn btn-success btn-sm" onclick="approveItem(${i})">✓ Approve</button>
          <button class="btn btn-danger btn-sm"  onclick="rejectItem(${i})">✕ Reject</button>
          <button class="btn btn-outline btn-sm">View Details</button>
        </div>
      </div>`;
    }).join('');
  }

  if (pendingLabel) pendingLabel.textContent = approvalData.length;
  updatePendingBadge();
}

function updatePendingBadge() {
  const cnt = document.getElementById('pending-count');
  const kpi = document.getElementById('kpi-pending');
  if (cnt) {
    if (approvalData.length > 0) {
      cnt.style.display = 'inline';
      cnt.textContent = approvalData.length;
    } else {
      cnt.style.display = 'none';
    }
  }
  if (kpi) kpi.textContent = approvalData.length;
}

function approveItem(i) {
  const a = approvalData[i];
  poData = poData.map(p => p.id === a.id ? { ...p, status: 'Approved' } : p);
  approvalData.splice(i, 1);
  renderApprovals();
  renderPO();
  showToast('✓ ' + a.id + ' approved! FI document posting triggered.');
}

function rejectItem(i) {
  const a = approvalData[i];
  poData = poData.map(p => p.id === a.id ? { ...p, status: 'Rejected' } : p);
  approvalData.splice(i, 1);
  renderApprovals();
  renderPO();
  showToast('✕ ' + a.id + ' rejected. Requester notified via email.');
}

// ── CREATE PO MODAL ──────────────────────────────────────────────────────────

function showCreatePO() {
  document.getElementById('modal-create').classList.remove('hidden');
  document.getElementById('po-success').classList.add('hidden');
}

function hideCreate() {
  document.getElementById('modal-create').classList.add('hidden');
}

function submitPO() {
  const vendor   = document.getElementById('f-vendor').value;
  const deptRaw  = document.getElementById('f-dept').value;
  const material = document.getElementById('f-material').value || 'General Procurement Item';
  const qty      = parseInt(document.getElementById('f-qty').value) || 10;
  const price    = parseInt(document.getElementById('f-price').value) || 1000;

  const total = (qty * price).toLocaleString('en-IN');
  const deptCode = deptRaw.includes('MM') ? 'MM' : deptRaw.includes('FI') ? 'FI' : 'SD';
  const today = new Date().toISOString().split('T')[0];
  const newId = 'PO-2024-0' + poCounter++;

  const newPO = { id: newId, vendor, material, dept: deptCode, amount: '₹' + total, date: today, status: 'Pending' };
  poData.unshift(newPO);
  approvalData.push({ id: newId, vendor, material, dept: deptCode, amount: '₹' + total, urgency: 'Medium' });

  renderPO();
  renderApprovals();
  document.getElementById('po-success').classList.remove('hidden');

  setTimeout(() => {
    hideCreate();
    showToast('PO ' + newId + ' created! BTP Workflow triggered.');
  }, 1400);
}

// ── TOAST ────────────────────────────────────────────────────────────────────

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  setTimeout(() => t.classList.add('hidden'), 3800);
}

// ── CLOSE MODAL ON BACKDROP CLICK ────────────────────────────────────────────

document.getElementById('modal-create').addEventListener('click', function(e) {
  if (e.target === this) hideCreate();
});

// ── INIT ─────────────────────────────────────────────────────────────────────

renderPO();
renderApprovals();
