const moduleData = {
  edas: { code: 'EDAS', title: 'Engineering Design Database System', desc: 'A central database capturing and synchronizing engineering tags, drawing attributes, and datasheets across all project execution disciplines.', who: ['Design Engineer', 'Engineering Coordinator'], delivers: ['Engineering data repository', 'Source of truth', 'Fabrication engineering reporting'], value: ['Accurate Engineering Information'], color: 'sky' },
  sap: { code: 'SAP', title: 'Systems, Applications & Products (ERP)', desc: 'Enterprise system for procurement, purchasing, receiving, and financial transactions.', who: ['Procurement', 'Warehouse', 'SCM'], delivers: ['Procurement management', 'Purchase requisition & purchase order', 'Expediting management'], value: ['Efficient Procurement Control'], color: 'blue' },
  ematrack_pms: { code: 'eMaTrack PMS', title: 'Material Tracking System', desc: 'Tracks materials from warehouse receipt through storage, issuance, and site utilization.', who: ['Material Coordinator', 'Material Inspector'], delivers: ['Material tracking', 'Material traceability', 'Supply chain visibility'], value: ['Material Visibility'], color: 'teal' },
  spmanager: { code: 'SPManager', title: 'Spool Manager Application', desc: 'Manages spool data, fabrication status, and installation readiness throughout the project lifecycle.', who: ['Fab Team', 'Piping Engineers', 'Construction Team'], delivers: ['Spool tracking', 'Fabrication progress tracking', 'Spool-to-material traceability'], value: ['Fabrication Visibility'], color: 'cyan' },
  cppt: { code: 'CPPT', title: 'Construction Planning & Progress Tracking', desc: 'Monitors construction planning, workpack execution, and actual installation progress.', who: ['PMT', 'Construction Planner', 'Project Management', 'Subcontractor'], delivers: ['Construction planning', 'Work package management', 'Dashboard & reporting'], value: ['Progress Transparency'], color: 'emerald' },
  ocms: { code: 'OCMS', title: 'Onshore Offshore Completion Management System', desc: 'Controls mechanical completion, pre-commissioning, commissioning, punch list, and system handover activities.', who: ['Mechanical Completion', 'Pre-commissioning', 'Inspector', 'Client'], delivers: ['Completion management', 'Pre-commissioning tracking', 'Commissioning management'], value: ['Completion Readiness'], color: 'amber' },
  edms: { code: 'EDMS', title: 'Electronic Document Management System', desc: 'Central repository for engineering documents, drawings, revisions, and transmittals.', who: ['Document Control', 'Engineering Teams', 'Clients'], delivers: ['Document control', 'Project documentation management'], value: ['Controlled Documentation'], color: 'indigo' },
  sms: { code: 'SMS', title: 'Shiploose Management System', desc: 'Tracks and manages shiploose items from onshore preparation through offshore delivery and installation.', who: ['Design Engineer', 'Material Coordinator', 'Offshore'], delivers: ['Ship-loose management', 'Logistics visibility'], value: ['Logistics Visibility'], color: 'purple' }
};

let currentSlide = 1;
const totalSlides = 6;
const $ = id => document.getElementById(id);

function updateSlideUI() {
  for (let i = 1; i <= totalSlides; i++) {
    const slide = $(`slide-${i}`), dot = $(`dot-${i}`);
    if (i === currentSlide) { slide?.classList.remove('hidden'); if (dot) dot.className = 'w-5 h-2.5 rounded-full bg-sky-600 transition-all'; }
    else { slide?.classList.add('hidden'); if (dot) dot.className = 'w-2.5 h-2.5 rounded-full bg-slate-300 hover:bg-slate-400 transition-all'; }
  }
  if ($('slideCounterText')) $('slideCounterText').innerText = `0${currentSlide} / 0${totalSlides}`;
  if ($('btnPrevSlide')) $('btnPrevSlide').disabled = currentSlide === 1;
  const next = $('btnNextSlide');
  if (next) { next.disabled = currentSlide === totalSlides; next.innerHTML = currentSlide === totalSlides ? '<span>End Deck</span>' : '<span class="hidden sm:inline">Next</span><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>'; }
}
function goToSlide(n) { if (n >= 1 && n <= totalSlides) { currentSlide = n; updateSlideUI(); } }
function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

function selectModule(key) {
  const data = moduleData[key]; if (!data) return;
  $('mod-code').innerText = data.code; $('mod-title').innerText = data.title; $('mod-desc').innerText = data.desc;
  [['mod-who-list', data.who], ['mod-delivers-list', data.delivers], ['mod-value-list', data.value]].forEach(([id, items]) => { if ($(id)) $(id).innerHTML = items.map(item => `<li class="flex items-center gap-1.5"><span class="text-${data.color}-500 font-bold">•</span> ${item}</li>`).join(''); });
  if ($('mod-icon-tag')) $('mod-icon-tag').className = `w-3 h-3 rounded-full bg-${data.color}-500 ring-4 ring-${data.color}-100`;
  Object.keys(moduleData).forEach(k => { const node = $(`node-${k}`), spoke = $(`spoke-${k}`); node?.classList.toggle('scale-105', k === key); node?.classList.toggle('ring-4', k === key); node?.classList.toggle('ring-sky-100', k === key); node?.classList.toggle('opacity-80', k !== key); if (spoke) { spoke.setAttribute('stroke', k === key ? '#0284C7' : '#CBD5E1'); spoke.setAttribute('stroke-width', k === key ? '2.5' : '1.2'); } });
}

function switchSlide3Workflow(tabIndex) {
  const titles = { 1: 'Project Execution Life Cycle', 2: 'CPT Workflow', 3: 'CPT Integrated Process Flow' };
  if ($('s3-workflow-title')) $('s3-workflow-title').innerText = titles[tabIndex];
  for (let i = 1; i <= 3; i++) { $(`s3-view-${i}`)?.classList.toggle('hidden', i !== tabIndex); $(`s3-tab-btn-${i}`)?.classList.toggle('bg-sky-600', i === tabIndex); $(`s3-tab-btn-${i}`)?.classList.toggle('text-white', i === tabIndex); }
  $('s3-zoom-controls')?.classList.toggle('hidden', tabIndex === 2);
}
function toggleMhbQcDecision(approved) {
  $('mhb-rework-path')?.classList.toggle('hidden', approved); $('mhb-stage-5')?.classList.toggle('opacity-40', !approved); $('mhb-stage-5')?.classList.toggle('grayscale', !approved); $('mhb-draft-box')?.classList.toggle('ring-2', !approved); $('mhb-draft-box')?.classList.toggle('ring-rose-500', !approved); $('mhb-draft-box')?.classList.toggle('bg-rose-50', !approved);
}

const streamMap = {
  all: ['Full Flowchart (21 Nodes Active)', [], []],
  eng: ['Engineering & Planning (6 Nodes Active)', ['spec_p6','cad','dwg_mgmt','mat_cat','eng_db','planning'], ['fp-contract_to_cad','fp-cad_to_planning','fp-p6','fp-cad_to_dwg','fp-cad_to_mto','fp-mto_to_db']],
  scm: ['Procurement & SCM (8 Nodes Active)', ['mat_cat','req','po','finance','expediting','rec','pms','workfront'], ['fp-mto_to_req','fp-req_to_po','fp-finance_to_po','fp-po_to_rec','fp-po_to_exp','fp-exp_to_rec','fp-rec_to_pms','fp-pms_to_rec','fp-rec_to_workfront']],
  site: ['Site Construction & OCMS (8 Nodes Active)', ['dwg_mgmt','rec','workfront','progress_measure','planning','site','ocms','handover'], ['fp-dwg_to_workfront','fp-rec_to_workfront','fp-work_orders','fp-actual_prog_fwd','fp-actual_prog_rev','fp-released_work','fp-rig_to_ocms','fp-rig_to_handover','fp-ocms_to_handover']],
  sms: ['Shiploose SMS Tracking (5 Nodes Active)', ['eng_db','sms','cog','truck','offshore'], ['fp-db_to_sms','fp-sms_to_cog','fp-cog_to_truck','fp-truck_to_ship']]
};
function filterLifecycleStream(stream) {
  // 1. Reset ALL buttons to inactive gray/black text (text-slate-600)
  document.querySelectorAll('.stream-flt-btn').forEach(btn => {
    btn.classList.remove('bg-sky-600', 'text-white', 'font-bold');
    btn.classList.add('text-slate-600', 'hover:text-slate-900', 'font-medium');
  });

  // 2. Apply active blue styling ONLY to the selected button
  const activeBtn = document.getElementById(`flt-${stream}`);
  if (activeBtn) {
    activeBtn.classList.remove('text-slate-600', 'hover:text-slate-900', 'font-medium');
    activeBtn.classList.add('bg-sky-600', 'text-white', 'font-bold');
  }

  // 3. Flowchart filtering logic
  const [label, nodes, paths] = streamMap[stream] || streamMap.all;
  document.querySelectorAll('#lifecycle-svg .flow-node').forEach(el => { const active = stream === 'all' || nodes.includes(el.dataset.node); el.classList.toggle('dimmed', !active); el.classList.toggle('active-step', active); });
  document.querySelectorAll('#lifecycle-svg .flow-path').forEach(el => { const active = stream === 'all' || paths.includes(el.id); el.classList.toggle('dimmed', !active); el.classList.toggle('active-step', active); });
  document.querySelectorAll('#lifecycle-svg .flow-label').forEach(el => el.classList.toggle('dimmed', stream !== 'all' && !paths.includes(el.dataset.path)));
  if ($('lifecycle-filter-label'))$('lifecycle-filter-label').innerText = label;
}

function toggleMhbQcDecision(approved) {
  // 1. TOP HEADER BUTTONS (Matching id="mhb-btn-approved" & id="mhb-btn-rework")
  const btnApprove = document.getElementById('mhb-btn-approved');
  const btnRework = document.getElementById('mhb-btn-rework');

  if (btnApprove && btnRework) {
    if (approved) {
      // Approved Active: Solid Green highlight, Rework becomes Slate
      btnApprove.className = 'px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-600 text-white shadow-sm transition-all flex items-center gap-1 cursor-pointer';
      btnRework.className = 'px-2.5 py-1 rounded-md text-[10px] font-semibold text-slate-600 hover:text-rose-600 transition-all flex items-center gap-1 cursor-pointer';
    } else {
      // Rework Active: Solid Red highlight, Approved becomes Slate
      btnApprove.className = 'px-2.5 py-1 rounded-md text-[10px] font-semibold text-slate-600 hover:text-emerald-600 transition-all flex items-center gap-1 cursor-pointer';
      btnRework.className = 'px-2.5 py-1 rounded-md text-[10px] font-bold bg-rose-600 text-white shadow-sm transition-all flex items-center gap-1 cursor-pointer';
    }
  }

  // 2. BOTTOM CARD TAGS (Inside Stage 4 Card)
  const tagApproved = document.getElementById('qc-tag-approved');
  const tagRework = document.getElementById('qc-tag-rework');

  if (tagApproved && tagRework) {
    if (approved) {
      tagApproved.className = 'px-2 py-1 rounded text-[9px] font-bold bg-emerald-600 text-white shadow-sm transition-all cursor-pointer';
      tagRework.className = 'px-2 py-1 rounded text-[9px] font-bold bg-slate-200 text-slate-500 hover:text-rose-600 transition-all cursor-pointer';
    } else {
      tagApproved.className = 'px-2 py-1 rounded text-[9px] font-bold bg-slate-200 text-slate-500 hover:text-emerald-600 transition-all cursor-pointer';
      tagRework.className = 'px-2 py-1 rounded text-[9px] font-bold bg-rose-600 text-white shadow-sm transition-all cursor-pointer';
    }
  }

  // 3. REWORK OVERLAY & STAGE 5 TOGGLES
  $('mhb-rework-path')?.classList.toggle('hidden', approved);
  $('mhb-stage-5')?.classList.toggle('opacity-40', !approved);
  $('mhb-stage-5')?.classList.toggle('grayscale', !approved);
  $('mhb-draft-box')?.classList.toggle('ring-2', !approved);
  $('mhb-draft-box')?.classList.toggle('ring-rose-500', !approved);
  $('mhb-draft-box')?.classList.toggle('bg-rose-50', !approved);
}
function changeActiveSlide3DiagramZoom(delta) { const view = document.querySelector('#slide-3 > [id^="s3-view-"]:not(.hidden)'), svg = view?.querySelector('svg'); if (!svg) return; const zoom = Math.min(1.6, Math.max(.5, +(parseFloat(svg.style.zoom || 1) + delta).toFixed(2))); svg.style.zoom = zoom; if ($('s3-zoom-label')) $('s3-zoom-label').textContent = `${Math.round(zoom * 100)}%`; }

window.addEventListener('keydown', e => { if (['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)) return; if (['ArrowRight','ArrowDown',' ','Enter','n','N'].includes(e.key)) { e.preventDefault(); nextSlide(); } else if (['ArrowLeft','ArrowUp','Backspace','p','P'].includes(e.key)) { e.preventDefault(); prevSlide(); } });
window.addEventListener('load', () => { updateSlideUI(); selectModule('edas'); toggleMhbQcDecision(true); switchSlide3Workflow(1); filterLifecycleStream('all'); });
