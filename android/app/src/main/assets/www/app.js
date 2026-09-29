/* Field Complaint Reporter — offline app. All data on-device. */
'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ---------- i18n ---------- */
const STR={
en:{welcome:"Welcome",chooseRole:"Choose your profile to continue",roleAdmin:"Admin / Field Officer",roleClient:"Client",roleWorker:"Team Member",environmentalist:"Environmentalist",dashboard:"Dashboard",complaints:"Complaints",resolved:"Resolved",volunteers:"Volunteers",events:"Events",credits:"Credits",recentComplaints:"Recent complaints",emergency:"Emergency",emergencyDesc:"One-tap GPS report via WhatsApp",sendEmergency:"Send emergency report",newComplaint:"New complaint",title:"Title",description:"Description",photoVideo:"Photo / video",getGps:"Get GPS",submit:"Submit",all:"All",pending:"Pending",inprogress:"In progress",catAir:"Air pollution",catWater:"Water pollution",catWaste:"Waste / litter",catNoise:"Noise",catOther:"Other",aqiTitle:"Air Quality (AQI)",logAqi:"Log AQI reading",location:"Location",save:"Save",aqiGuide:"AQI guide",aqiGood:"Good",aqiModerate:"Moderate",aqiUSG:"Unhealthy (sensitive)",aqiUnhealthy:"Unhealthy",aqiVUnhealthy:"Very unhealthy",aqiHazardous:"Hazardous",aqiAdvice:"Above 150: limit outdoor activity, wear a mask. Above 200: avoid outdoor exertion.",aqiHistory:"History",carbonCalc:"Carbon Calculator",energyUse:"Energy use (kWh per month)",gridFactor:"Grid emission factor (kg CO₂/kWh)",calculate:"Calculate",results:"Results",perHour:"Per hour",perDay:"Per day",perYear:"Per year",solarSave:"Solar panels save (est.)",windSave:"Wind turbine saves (est.)",creditEst:"Carbon credits (est./yr)",saveFootprint:"Save as client footprint",reports:"Reports",genReport:"Generate signed report",reportTitle:"Report title",reportBody:"Report details",generate:"Generate",date:"Date",digitallySigned:"digitally signed (on-device)",print:"Print / Save PDF",beforeAfter:"Before / after comparison",voiceNotes:"Voice notes",record:"Record",stop:"Stop",more:"More",surveys:"Surveys",team:"Team",clients:"Clients",vault:"Vault",backup:"Backup",settings:"Settings",support:"Support",newSurvey:"New survey",surveyTitle:"Survey title",surveyQs:"Questions, one per line",create:"Create",registerVolunteer:"Register volunteer",name:"Name",phone:"Phone",area:"Area / skills",register:"Register",newEvent:"New event",eventTitle:"Event title",addWorker:"Add team member",roleField:"Role",points:"Points",add:"Add",leaderboard:"Leaderboard",addClient:"Add client / project",clientName:"Client name",project:"Project",contact:"Contact",clientFootprints:"Client carbon footprints",addReview:"Add review",review:"Review",reviews:"Reviews",documents:"Documents",docTitle:"Document title",note:"Note",news:"News",newsTitle:"News title",details:"Details",donations:"Donation pledges",amount:"Amount",creditMarket:"Carbon credit listings",listingTitle:"Listing title",quantity:"Quantity",price:"Price",inventory:"Plant / equipment inventory",itemName:"Item name",condition:"Condition",scheduled:"Scheduled reports",audit:"Audit trail",backupDesc:"Export all on-device data to a JSON file, or restore from one.",exportJson:"Export JSON",importJson:"Import JSON",profile:"Profile",roleNote:"Stored only on this device.",about:"About",home:"Home",carbon:"Carbon",delete:"Delete",mark:"Mark",rsvp:"RSVP",attend:"Attend",fill:"Fill",view:"View",responses:"responses",noData:"No entries yet.",saved:"Saved ✓",gpsOk:"GPS captured ✓",gpsFail:"GPS unavailable",idCard:"ID Card",roleSet:"Profile saved",imported:"Import complete ✓",exported:"Exported ✓",confirmDel:"Delete this entry?",emergencyMsg:"EMERGENCY environmental report",needGps:"Could not get GPS location.",status:"Status",heroKicker:"Carbon Nexus Green Pvt. Ltd.",heroTitle:"Climate Solutions & Carbon Credits in Pakistan",heroSub:"Field intelligence, environmental consultancy and carbon services — led by Saad Ashraf, Environmentalist.",reportNow:"📢 Report a complaint",chatWhats:"💬 WhatsApp us",missionT:"Our mission",missionD:"Practical environmental solutions for Pakistan — from carbon management and EIA studies to field-level pollution reporting and community action.",servicesT:"Our services",svc1t:"Environmental Impact Assessment",svc1d:"EIA / IEE studies & approvals",svc2t:"Carbon Footprint Assessment",svc2d:"Measure emissions, find reductions",svc3t:"Carbon Credit Development",svc3d:"Projects that earn carbon credits",svc4t:"Carbon Trading Advisory",svc4d:"Brokerage & offset program design",svc5t:"Climate Risk Assessment",svc5d:"Resilience strategies for business",svc6t:"Environmental Consultancy",svc6d:"Field surveys, audits & compliance",impactT:"Field impact",quickT:"Quick actions",goComplaints:"New complaint",goCalc:"Carbon calculator",goAqi:"Log AQI",goReports:"Make report",whyT:"Why Carbon Nexus Green",why1t:"Field-first",why1d:"Real GPS-tagged evidence from the ground",why2t:"End-to-end carbon",why2d:"From footprint to credits to trading",why3t:"Community powered",why3d:"Volunteers, events and local action",footerD:"Climate solutions & carbon credits — Faisalabad, Pakistan",callUs:"📞 Call",liveAqi:"Live AQI",liveAqiDesc:"Real-time air quality from your GPS location (needs internet + API key).",getLiveAqi:"📡 Get Live AQI",fetching:"Fetching…",needOwmKey:"Please add your OpenWeatherMap API key in Settings → API Keys.",netFail:"Could not fetch live data. Check internet and API key.",apiKeys:"🔑 Live API Keys",apiKeysDesc:"Free keys: OpenWeatherMap (openweathermap.org) for live AQI, Google AI Studio (aistudio.google.com) for the AI bot.",owmKeyPh:"OpenWeatherMap API key",geminiKeyPh:"Gemini API key",botTile:"AI Bot",botTitle:"🤖 CNG AI Assistant",botHello:"Assalam-o-Alaikum! I am the Carbon Nexus Green AI assistant. Ask me about air quality, carbon footprints, or environmental issues.",botPh:"Ask something…",needGeminiKey:"Please add your Gemini API key in Settings → API Keys to chat.",botThinking:"Thinking…"},
ur:{welcome:"خوش آمدید",chooseRole:"جاری رکھنے کے لیے پروفائل منتخب کریں",roleAdmin:"ایڈمن / فیلڈ آفیسر",roleClient:"کلائنٹ",roleWorker:"ٹیم ممبر",environmentalist:"ماہر ماحولیات",dashboard:"ڈیش بورڈ",complaints:"شکایات",resolved:"حل شدہ",volunteers:"رضاکار",events:"تقریبات",credits:"کریڈٹس",recentComplaints:"حالیہ شکایات",emergency:"ایمرجنسی",emergencyDesc:"واٹس ایپ کے ذریعے ایک ٹیپ GPS رپورٹ",sendEmergency:"ایمرجنسی رپورٹ بھیجیں",newComplaint:"نئی شکایت",title:"عنوان",description:"تفصیل",photoVideo:"تصویر / ویڈیو",getGps:"GPS حاصل کریں",submit:"جمع کرائیں",all:"تمام",pending:"زیر التواء",inprogress:"جاری",catAir:"فضائی آلودگی",catWater:"آبی آلودگی",catWaste:"کچرا",catNoise:"شور",catOther:"دیگر",aqiTitle:"ہوا کا معیار (AQI)",logAqi:"AQI ریڈنگ درج کریں",location:"مقام",save:"محفوظ کریں",aqiGuide:"AQI رہنمائی",aqiGood:"اچھی",aqiModerate:"معتدل",aqiUSG:"غیر صحت بخش (حساس)",aqiUnhealthy:"غیر صحت بخش",aqiVUnhealthy:"بہت غیر صحت بخش",aqiHazardous:"خطرناک",aqiAdvice:"150 سے زائد: باہر کم نکلیں، ماسک پہنیں۔ 200 سے زائد: مشقت سے گریز کریں۔",aqiHistory:"ریکارڈ",carbonCalc:"کاربن کیلکولیٹر",energyUse:"بجلی کا استعمال (kWh فی ماہ)",gridFactor:"گرڈ اخراج عنصر (kg CO₂/kWh)",calculate:"حساب کریں",results:"نتائج",perHour:"فی گھنٹہ",perDay:"فی دن",perYear:"فی سال",solarSave:"سولر پینل بچت (تخمینہ)",windSave:"ونڈ ٹربائن بچت (تخمینہ)",creditEst:"کاربن کریڈٹس (تخمینہ/سال)",saveFootprint:"کلائنٹ فٹ پرنٹ محفوظ کریں",reports:"رپورٹس",genReport:"دستخط شدہ رپورٹ بنائیں",reportTitle:"رپورٹ کا عنوان",reportBody:"رپورٹ کی تفصیل",generate:"بنائیں",date:"تاریخ",digitallySigned:"ڈیجیٹل دستخط شدہ",print:"پرنٹ / PDF محفوظ کریں",beforeAfter:"پہلے / بعد موازنہ",voiceNotes:"صوتی نوٹس",record:"ریکارڈ",stop:"روکیں",more:"مزید",surveys:"سروے",team:"ٹیم",clients:"کلائنٹس",vault:"والٹ",backup:"بیک اپ",settings:"ترتیبات",support:"مدد",newSurvey:"نیا سروے",surveyTitle:"سروے کا عنوان",surveyQs:"سوالات، ہر لائن پر ایک",create:"بنائیں",registerVolunteer:"رضاکار رجسٹر کریں",name:"نام",phone:"فون",area:"علاقہ / مہارت",register:"رجسٹر کریں",newEvent:"نئی تقریب",eventTitle:"تقریب کا عنوان",addWorker:"ٹیم ممبر شامل کریں",roleField:"کردار",points:"پوائنٹس",add:"شامل کریں",leaderboard:"لیڈر بورڈ",addClient:"کلائنٹ / منصوبہ شامل کریں",clientName:"کلائنٹ کا نام",project:"منصوبہ",contact:"رابطہ",clientFootprints:"کلائنٹ کاربن فٹ پرنٹس",addReview:"جائزہ شامل کریں",review:"جائزہ",reviews:"جائزے",documents:"دستاویزات",docTitle:"دستاویز کا عنوان",note:"نوٹ",news:"خبریں",newsTitle:"خبر کا عنوان",details:"تفصیل",donations:"عطیہ وعدے",amount:"رقم",creditMarket:"کاربن کریڈٹ لسٹنگ",listingTitle:"لسٹنگ کا عنوان",quantity:"مقدار",price:"قیمت",inventory:"پلانٹ / آلات",itemName:"شے کا نام",condition:"حالت",scheduled:"شیڈول شدہ رپورٹس",audit:"آڈٹ ٹریل",backupDesc:"تمام ڈیٹا JSON فائل میں ایکسپورٹ کریں یا بحال کریں۔",exportJson:"JSON ایکسپورٹ",importJson:"JSON امپورٹ",profile:"پروفائل",roleNote:"صرف اس ڈیوائس پر محفوظ۔",about:"متعلق",home:"ہوم",carbon:"کاربن",delete:"حذف کریں",mark:"نشان زد",rsvp:"شرکت",attend:"حاضری",fill:"پُر کریں",view:"دیکھیں",responses:"جوابات",noData:"ابھی کوئی اندراج نہیں۔",saved:"محفوظ ہو گیا ✓",gpsOk:"GPS مل گیا ✓",gpsFail:"GPS دستیاب نہیں",idCard:"شناختی کارڈ",roleSet:"پروفائل محفوظ",imported:"امپورٹ مکمل ✓",exported:"ایکسپورٹ ہو گیا ✓",confirmDel:"کیا یہ اندراج حذف کریں؟",emergencyMsg:"ایمرجنسی ماحولیاتی رپورٹ",needGps:"GPS لوکیشن نہیں ملی۔",status:"حیثیت",heroKicker:"کاربن نیکسس گرین پرائیویٹ لمیٹڈ",heroTitle:"پاکستان میں موسمیاتی حل اور کاربن کریڈٹس",heroSub:"فیلڈ انٹیلی جنس، ماحولیاتی مشاورت اور کاربن خدمات — سعد اشرف، ماہر ماحولیات کی قیادت میں۔",reportNow:"📢 شکایت درج کریں",chatWhats:"💬 واٹس ایپ کریں",missionT:"ہمارا مشن",missionD:"پاکستان کے لیے عملی ماحولیاتی حل — کاربن مینجمنٹ اور EIA سے فیلڈ سطح پر آلودگی کی رپورٹنگ اور کمیونٹی ایکشن تک۔",servicesT:"ہماری خدمات",svc1t:"ماحولیاتی اثرات کا جائزہ",svc1d:"EIA / IEE مطالعہ اور منظوری",svc2t:"کاربن فٹ پرنٹ کا جائزہ",svc2d:"اخراج ناپیں، کمی کے راستے تلاش کریں",svc3t:"کاربن کریڈٹ ڈیولپمنٹ",svc3d:"کاربن کریڈٹ کمانے والے منصوبے",svc4t:"کاربن ٹریڈنگ مشاورت",svc4d:"بروکریج اور آفسیٹ پروگرام ڈیزائن",svc5t:"موسمیاتی رسک اسیسمنٹ",svc5d:"کاروبار کے لیے لچکدار حکمت عملی",svc6t:"ماحولیاتی مشاورت",svc6d:"فیلڈ سروے، آڈٹ اور تعمیل",impactT:"فیلڈ اثرات",quickT:"فوری اقدامات",goComplaints:"نئی شکایت",goCalc:"کاربن کیلکولیٹر",goAqi:"AQI درج کریں",goReports:"رپورٹ بنائیں",whyT:"کاربن نیکسس گرین کیوں",why1t:"فیلڈ فرسٹ",why1d:"زمین سے GPS ٹیگ شدہ اصل شواہد",why2t:"مکمل کاربن حل",why2d:"فٹ پرنٹ سے کریڈٹس سے ٹریڈنگ تک",why3t:"کمیونٹی کی طاقت",why3d:"رضاکار، تقریبات اور مقامی ایکشن",footerD:"موسمیاتی حل اور کاربن کریڈٹس — فیصل آباد، پاکستان",callUs:"📞 کال کریں",liveAqi:"براہ راست AQI",liveAqiDesc:"آپ کی GPS لوکیشن سے تازہ ہوا کا معیار (انٹرنیٹ + API key درکار)۔",getLiveAqi:"📡 لائیو AQI حاصل کریں",fetching:"حاصل کیا جا رہا ہے…",needOwmKey:"براہ کرم Settings → API Keys میں اپنی OpenWeatherMap API key شامل کریں۔",netFail:"لائیو ڈیٹا نہیں مل سکا۔ انٹرنیٹ اور API key چیک کریں۔",apiKeys:"🔑 لائیو API Keys",apiKeysDesc:"مفت keys: لائیو AQI کے لیے OpenWeatherMap (openweathermap.org)، AI bot کے لیے Google AI Studio (aistudio.google.com)۔",owmKeyPh:"OpenWeatherMap API key",geminiKeyPh:"Gemini API key",botTile:"AI Bot",botTitle:"🤖 CNG AI اسسٹنٹ",botHello:"السلام علیکم! میں کاربن نیکسس گرین AI اسسٹنٹ ہوں۔ ہوا کے معیار، کاربن فٹ پرنٹ یا ماحولیاتی مسائل کے بارے میں پوچھیں۔",botPh:"کچھ پوچھیں…",needGeminiKey:"چیٹ کے لیے Settings → API Keys میں اپنی Gemini API key شامل کریں۔",botThinking:"سوچ رہا ہے…"}};
let lang=localStorage.getItem('fcr_lang')||'en';
const t=k=>(STR[lang]&&STR[lang][k])||STR.en[k]||k;
function applyI18n(){$$('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));$$('[data-i18n-ph]').forEach(el=>el.placeholder=t(el.dataset.i18nPh));document.documentElement.lang=lang;$('#langToggle').textContent=lang==='en'?'اردو':'EN';}

/* ---------- storage ---------- */
const DBKEY='fcr_data_v1';
const blank=()=>({complaints:[],surveys:[],responses:[],volunteers:[],events:[],rsvps:[],attendance:[],workers:[],clients:[],projects:[],footprints:[],reviews:[],documents:[],audit:[],scheduled:[],news:[],donations:[],credits:[],inventory:[],aqiLog:[],botChat:[],settings:{role:null}});
let DB;
try{DB=JSON.parse(localStorage.getItem(DBKEY))||blank();}catch(e){DB=blank();}
Object.keys(blank()).forEach(k=>{if(!(k in DB))DB[k]=blank()[k];});
const save=()=>localStorage.setItem(DBKEY,JSON.stringify(DB));
function audit(action){DB.audit.unshift({id:uid(),action,ts:Date.now()});DB.audit=DB.audit.slice(0,200);save();}
/* IndexedDB for media blobs */
let idb=null;
function idbOpen(){return new Promise(res=>{const r=indexedDB.open('fcr_media',1);r.onupgradeneeded=()=>r.result.createObjectStore('media',{keyPath:'id'});r.onsuccess=()=>{idb=r.result;res();};r.onerror=()=>res();});}
function idbPut(rec){return new Promise(res=>{if(!idb)return res(null);const tx=idb.transaction('media','readwrite');tx.objectStore('media').put(rec);tx.oncomplete=()=>res(rec.id);tx.onerror=()=>res(null);});}
function idbGet(id){return new Promise(res=>{if(!idb)return res(null);const q=idb.transaction('media').objectStore('media').get(id);q.onsuccess=()=>res(q.result||null);q.onerror=()=>res(null);});}
function idbDel(id){if(!idb)return;idb.transaction('media','readwrite').objectStore('media').delete(id);}
function blobUrl(rec){return rec&&rec.blob?URL.createObjectURL(rec.blob):'';}

/* ---------- navigation ---------- */
function go(name){$$('.screen').forEach(s=>s.classList.remove('active'));$('#screen-'+name).classList.add('active');$$('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.screen===name));window.scrollTo(0,0);const R={home:renderHome,complaints:renderComplaints,aqi:renderAqi,calc:()=>{},reports:renderVoiceNotes,surveys:renderSurveys,volunteers:renderVolunteers,events:renderEvents,team:renderTeam,clients:renderClients,vault:renderVault,backup:()=>{},settings:renderSettings,bot:renderBot};(R[name]||(()=>{}))();}
$$('.nav-btn').forEach(b=>b.onclick=()=>go(b.dataset.screen));
$$('.menu-tile').forEach(b=>b.onclick=()=>go(b.dataset.go));
$$('[data-goto]').forEach(b=>b.onclick=()=>go(b.dataset.goto));

/* ---------- theme & language ---------- */
function setDark(d){document.documentElement.dataset.theme=d?'dark':'';localStorage.setItem('fcr_dark',d?'1':'0');$('#darkToggle').textContent=d?'☀️':'🌙';}
setDark(localStorage.getItem('fcr_dark')==='1');
$('#darkToggle').onclick=()=>setDark(document.documentElement.dataset.theme!=='dark');
$('#langToggle').onclick=()=>{lang=lang==='en'?'ur':'en';localStorage.setItem('fcr_lang',lang);applyI18n();renderAll();};

/* ---------- role gate ---------- */
function checkRole(){if(!DB.settings.role)$('#roleGate').classList.remove('hidden');}
$$('#roleGate [data-role], .role-pick').forEach(b=>b.onclick=()=>{DB.settings.role=b.dataset.role;save();audit('Role set: '+b.dataset.role);$('#roleGate').classList.add('hidden');alert(t('roleSet'));});

function safeRender(fn){try{fn();}catch(e){console.warn('render skipped:',e&&e.message);}}
function renderAll(){safeRender(applyI18n);safeRender(renderHome);safeRender(renderComplaints);safeRender(renderAqi);safeRender(renderSurveys);safeRender(renderVolunteers);safeRender(renderEvents);safeRender(renderTeam);safeRender(renderClients);safeRender(renderVault);safeRender(renderBot);safeRender(renderVoiceNotes);}

/* ---------- dashboard ---------- */
function renderHome(){
  $('#statComplaints').textContent=DB.complaints.length;
  $('#statResolved').textContent=DB.complaints.filter(c=>c.status==='resolved').length;
  $('#statVolunteers').textContent=DB.volunteers.length;
  $('#statEvents').textContent=DB.events.length;
  $('#statCO2').textContent=Math.round(DB.footprints.reduce((s,f)=>s+(+f.perYear||0),0));
  $('#statCredits').textContent=DB.credits.reduce((s,c)=>s+(+c.qty||0),0);
  const box=$('#recentList');
  const items=DB.complaints.slice(0,5);
  box.innerHTML=items.length?items.map(c=>`<div class="item"><div class="t">${esc(c.title)}</div><div class="d">${esc(c.category)} · ${new Date(c.ts).toLocaleDateString()}</div><div class="meta"><span class="pill ${c.status}">${t(c.status==='in-progress'?'inprogress':c.status)}</span></div></div>`).join(''):`<div class="item muted">${t('noData')}</div>`;
}
$('#emergencyBtn').onclick=()=>{getGps(pos=>{const msg=encodeURIComponent(`${t('emergencyMsg')}: https://maps.google.com/?q=${pos.lat},${pos.lng}`);window.open('https://wa.me/923000388276?text='+msg,'_blank');audit('Emergency report sent');},()=>alert(t('needGps')));};
function getGps(ok,fail){if(!navigator.geolocation)return fail&&fail();navigator.geolocation.getCurrentPosition(p=>ok({lat:p.coords.latitude.toFixed(6),lng:p.coords.longitude.toFixed(6)}),()=>fail&&fail(),{timeout:15000});}

/* ---------- complaints ---------- */
let cGps=null,cMediaIds=[];
$('#cGpsBtn').onclick=()=>getGps(p=>{cGps=p;$('#cGpsLabel').textContent=t('gpsOk')+` ${p.lat},${p.lng}`;},()=>{$('#cGpsLabel').textContent=t('gpsFail');});
$('#cMedia').onchange=e=>{cMediaIds=[];$('#cMediaPreview').innerHTML='';[...e.target.files].slice(0,6).forEach(f=>{const id=uid();idbPut({id,kind:f.type.startsWith('video')?'video':'photo',blob:f,name:f.name,ts:Date.now()}).then(()=>{cMediaIds.push(id);const url=URL.createObjectURL(f);$('#cMediaPreview').insertAdjacentHTML('beforeend',f.type.startsWith('video')?`<video src="${url}" controls></video>`:`<img src="${url}">`);});});};
$('#cSubmit').onclick=()=>{const title=$('#cTitle').value.trim();if(!title)return alert(t('title'));DB.complaints.unshift({id:uid(),title,category:$('#cCategory').value,desc:$('#cDesc').value.trim(),media:cMediaIds,gps:cGps,status:'pending',ts:Date.now()});save();audit('Complaint added: '+title);$('#cTitle').value='';$('#cDesc').value='';cGps=null;cMediaIds=[];$('#cGpsLabel').textContent='';$('#cMediaPreview').innerHTML='';$('#cMedia').value='';renderComplaints();renderHome();alert(t('saved'));};
async function mediaThumb(id){const r=await idbGet(id);if(!r)return'';const u=blobUrl(r);return r.kind==='video'?`<video src="${u}" controls style="width:72px;height:72px;object-fit:cover;border-radius:8px"></video>`:`<img src="${u}" style="width:72px;height:72px;object-fit:cover;border-radius:8px">`;}
async function renderComplaints(){
  const f=$('#cFilter').value,box=$('#complaintList');
  const items=DB.complaints.filter(c=>f==='all'||c.status===f);
  box.innerHTML=items.length?'':`<div class="item muted">${t('noData')}</div>`;
  for(const c of items){
    const thumbs=(await Promise.all((c.media||[]).map(mediaThumb))).join('');
    const div=document.createElement('div');div.className='item';
    div.innerHTML=`<div class="t">${esc(c.title)}</div><div class="d">${esc(c.category)} · ${c.gps?`📍 ${c.gps.lat},${c.gps.lng}`:''} · ${new Date(c.ts).toLocaleString()}</div><div class="d">${esc(c.desc)}</div>${thumbs?`<div class="media-row">${thumbs}</div>`:''}<div class="meta"><span class="pill ${c.status}">${t(c.status==='in-progress'?'inprogress':c.status)}</span><select class="stSel"><option value="pending"${c.status==='pending'?' selected':''}>${t('pending')}</option><option value="in-progress"${c.status==='in-progress'?' selected':''}>${t('inprogress')}</option><option value="resolved"${c.status==='resolved'?' selected':''}>${t('resolved')}</option></select><button class="link-btn del">${t('delete')}</button></div>`;
    div.querySelector('.stSel').onchange=e=>{c.status=e.target.value;save();audit('Complaint '+c.id+' → '+c.status);renderComplaints();renderHome();};
    div.querySelector('.del').onclick=()=>{if(confirm(t('confirmDel'))){(c.media||[]).forEach(idbDel);DB.complaints=DB.complaints.filter(x=>x.id!==c.id);save();audit('Complaint deleted');renderComplaints();renderHome();}};
    box.appendChild(div);
  }
}
$('#cFilter').onchange=renderComplaints;
$('#cExportCsv').onclick=()=>{const rows=[['id','title','category','status','lat','lng','date'],...DB.complaints.map(c=>[c.id,`"${c.title.replace(/"/g,'""')}"`,c.category,c.status,c.gps?.lat||'',c.gps?.lng||'',new Date(c.ts).toISOString()])];const blob=new Blob([rows.map(r=>r.join(',')).join('\n')],{type:'text/csv'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='complaints.csv';a.click();audit('Complaints CSV exported');};

/* ---------- AQI ---------- */
function aqiCat(v){v=+v;if(v<=50)return['aqiGood','#00e400'];if(v<=100)return['aqiModerate','#ffff00'];if(v<=150)return['aqiUSG','#ff7e00'];if(v<=200)return['aqiUnhealthy','#ff0000'];if(v<=300)return['aqiVUnhealthy','#8f3f97'];return['aqiHazardous','#7e0023'];}
$('#aqiAdd').onclick=()=>{const v=+$('#aqiValue').value;if(!v)return;DB.aqiLog.unshift({id:uid(),v,place:$('#aqiPlace').value.trim(),ts:Date.now()});save();audit('AQI logged: '+v);$('#aqiValue').value='';$('#aqiPlace').value='';renderAqi();};
function renderAqi(){const box=$('#aqiList');box.innerHTML=DB.aqiLog.length?DB.aqiLog.slice(0,30).map(a=>{const[k,col]=aqiCat(a.v);return`<div class="item"><div class="t"><span style="display:inline-block;width:14px;height:14px;border-radius:50%;background:${col}"></span> ${a.v} — ${t(k)}</div><div class="d">${esc(a.place)} · ${new Date(a.ts).toLocaleString()}</div><div class="meta"><button class="link-btn del" data-id="${a.id}">${t('delete')}</button></div></div>`;}).join(''):`<div class="item muted">${t('noData')}</div>`;box.querySelectorAll('.del').forEach(b=>b.onclick=()=>{if(confirm(t('confirmDel'))){DB.aqiLog=DB.aqiLog.filter(x=>x.id!==b.dataset.id);save();renderAqi();}});}

/* ---------- carbon calculator ---------- */
$('#calcBtn').onclick=()=>{
  const kwh=+$('#kwhInput').value||0, gf=+$('#gridFactor').value||0.45;
  const perHour=kwh/730*gf, perDay=kwh/30*gf, perYear=kwh*12*gf;
  const solar=perYear*0.7, wind=perYear*0.35, credits=(solar+wind)/1000;
  $('#rHour').textContent=perHour.toFixed(3)+' kg';$('#rDay').textContent=perDay.toFixed(2)+' kg';$('#rYear').textContent=perYear.toFixed(1)+' kg';
  $('#rSolar').textContent=solar.toFixed(1)+' kg/yr';$('#rWind').textContent=wind.toFixed(1)+' kg/yr';$('#rCredits').textContent=credits.toFixed(2);
  $('#calcResult').classList.remove('hidden');
  $('#calcSave').onclick=()=>{DB.footprints.unshift({id:uid(),client:'—',kwh,perYear:+perYear.toFixed(1),ts:Date.now()});save();audit('Footprint saved: '+kwh+' kWh');renderClients();renderHome();alert(t('saved'));};
};

/* ---------- reports ---------- */
$('#repGen').onclick=()=>{
  const title=$('#repTitle').value.trim()||'Field Report', body=$('#repBody').value.trim();
  const id='FCR-'+Date.now().toString(36).toUpperCase(), date=new Date().toLocaleString();
  $('#repViewTitle').textContent=title;$('#repViewBody').textContent=body;$('#repViewId').textContent=id;$('#repViewDate').textContent=date;
  $('#repQr').innerHTML='';new QRCode($('#repQr'),{text:`${id}|${title}|${date}|Saad Ashraf, Environmentalist`,width:140,height:140});
  $('#repView').classList.remove('hidden');audit('Report generated: '+id);$('#repView').scrollIntoView({behavior:'smooth'});
};
$('#repPrint').onclick=()=>window.print();
function fileToUrl(input,img){const f=input.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{img.src=r.result;img.style.minHeight='0';};r.readAsDataURL(f);}
$('#baBefore').onchange=e=>fileToUrl(e.target,$('#baImgB'));
$('#baAfter').onchange=e=>fileToUrl(e.target,$('#baImgA'));
$('#baSlider').oninput=e=>{$('#baImgA').style.clipPath=`inset(0 0 0 ${e.target.value}%)`;};
/* voice notes */
let mr=null,mrChunks=[];
$('#vnRec').onclick=async()=>{try{const s=await navigator.mediaDevices.getUserMedia({audio:true});mr=new MediaRecorder(s);mrChunks=[];mr.ondataavailable=e=>mrChunks.push(e.data);mr.onstop=async()=>{const blob=new Blob(mrChunks,{type:mr.mimeType||'audio/webm'});const id=uid();await idbPut({id,kind:'audio',blob,name:'note_'+new Date().toLocaleString(),ts:Date.now()});DB.audit.unshift({id:uid(),action:'Voice note recorded',ts:Date.now()});save();renderVoiceNotes();s.getTracks().forEach(x=>x.stop());};mr.start();$('#vnRec').classList.add('hidden');$('#vnStop').classList.remove('hidden');}catch(e){alert('Mic unavailable');}};
$('#vnStop').onclick=()=>{if(mr&&mr.state!=='inactive'){mr.stop();}$('#vnRec').classList.remove('hidden');$('#vnStop').classList.add('hidden');};
async function renderVoiceNotes(){const box=$('#vnList');if(!idb){box.innerHTML='';return;}const tx=idb.transaction('media').objectStore('media').getAll();tx.onsuccess=()=>{const items=(tx.result||[]).filter(r=>r.kind==='audio').sort((a,b)=>b.ts-a.ts);box.innerHTML=items.length?items.map(r=>`<div class="item"><div class="t">🎙️ ${esc(r.name)}</div><div class="meta"><audio controls src="${blobUrl(r)}" style="max-width:100%"></audio><button class="link-btn del" data-id="${r.id}">${t('delete')}</button></div></div>`).join(''):`<div class="item muted">${t('noData')}</div>`;box.querySelectorAll('.del').forEach(b=>b.onclick=()=>{if(confirm(t('confirmDel'))){idbDel(b.dataset.id);renderVoiceNotes();}});};}

/* ---------- surveys ---------- */
$('#svCreate').onclick=()=>{const title=$('#svTitle').value.trim();const qs=$('#svQs').value.split('\n').map(s=>s.trim()).filter(Boolean);if(!title||!qs.length)return alert(t('surveyTitle'));DB.surveys.unshift({id:uid(),title,qs,ts:Date.now()});save();audit('Survey created: '+title);$('#svTitle').value='';$('#svQs').value='';renderSurveys();alert(t('saved'));};
function renderSurveys(){const box=$('#surveyList');box.innerHTML=DB.surveys.length?DB.surveys.map(s=>{const n=DB.responses.filter(r=>r.surveyId===s.id).length;return`<div class="item"><div class="t">${esc(s.title)}</div><div class="d">${s.qs.length} Q · ${n} ${t('responses')}</div><div class="meta"><button class="link-btn fill" data-id="${s.id}">${t('fill')}</button><button class="link-btn view" data-id="${s.id}">${t('view')}</button><button class="link-btn del" data-id="${s.id}">${t('delete')}</button></div></div>`;}).join(''):`<div class="item muted">${t('noData')}</div>`;
box.querySelectorAll('.fill').forEach(b=>b.onclick=()=>{const s=DB.surveys.find(x=>x.id===b.dataset.id);const ans=s.qs.map((q,i)=>prompt(q)||'');DB.responses.unshift({id:uid(),surveyId:s.id,ans,ts:Date.now()});save();audit('Survey filled: '+s.title);renderSurveys();});
box.querySelectorAll('.view').forEach(b=>b.onclick=()=>{const s=DB.surveys.find(x=>x.id===b.dataset.id);const rs=DB.responses.filter(r=>r.surveyId===s.id);alert(rs.length?rs.map(r=>r.ans.map((a,i)=>`Q${i+1}: ${a}`).join('\n')).join('\n---\n'):t('noData'));});
box.querySelectorAll('.del').forEach(b=>b.onclick=()=>{if(confirm(t('confirmDel'))){DB.surveys=DB.surveys.filter(x=>x.id!==b.dataset.id);save();renderSurveys();}});}

/* ---------- volunteers ---------- */
$('#vAdd').onclick=()=>{const n=$('#vName').value.trim();if(!n)return;DB.volunteers.unshift({id:uid(),name:n,phone:$('#vPhone').value.trim(),area:$('#vArea').value.trim(),ts:Date.now()});save();audit('Volunteer: '+n);$('#vName').value='';$('#vPhone').value='';$('#vArea').value='';renderVolunteers();renderHome();alert(t('saved'));};
function renderVolunteers(){$('#volList').innerHTML=DB.volunteers.length?DB.volunteers.map(v=>`<div class="item"><div class="t">${esc(v.name)}</div><div class="d">${esc(v.phone)} · ${esc(v.area)}</div><div class="meta"><button class="link-btn del" data-id="${v.id}">${t('delete')}</button></div></div>`).join(''):`<div class="item muted">${t('noData')}</div>`;$$('#volList .del').forEach(b=>b.onclick=()=>{if(confirm(t('confirmDel'))){DB.volunteers=DB.volunteers.filter(x=>x.id!==b.dataset.id);save();renderVolunteers();renderHome();}});}

/* ---------- events ---------- */
$('#eAdd').onclick=()=>{const title=$('#eTitle').value.trim();if(!title)return;DB.events.unshift({id:uid(),title,date:$('#eDate').value,place:$('#ePlace').value.trim(),ts:Date.now()});save();audit('Event: '+title);$('#eTitle').value='';$('#eDate').value='';$('#ePlace').value='';renderEvents();renderHome();alert(t('saved'));};
function renderEvents(){$('#eventList').innerHTML=DB.events.length?DB.events.map(e=>{const r=DB.rsvps.filter(x=>x.eventId===e.id).length,a=DB.attendance.filter(x=>x.eventId===e.id).length;return`<div class="item"><div class="t">${esc(e.title)}</div><div class="d">📅 ${esc(e.date)} · 📍 ${esc(e.place)} · ${r} RSVP · ${a} ✓</div><div class="meta"><button class="link-btn rsvp" data-id="${e.id}">${t('rsvp')}</button><button class="link-btn att" data-id="${e.id}">${t('attend')}</button><button class="link-btn del" data-id="${e.id}">${t('delete')}</button></div></div>`;}).join(''):`<div class="item muted">${t('noData')}</div>`;
$$('#eventList .rsvp').forEach(b=>b.onclick=()=>{const n=prompt(t('name'));if(n){DB.rsvps.unshift({id:uid(),eventId:b.dataset.id,name:n,ts:Date.now()});save();renderEvents();}});
$$('#eventList .att').forEach(b=>b.onclick=()=>{const n=prompt(t('name'));if(n){DB.attendance.unshift({id:uid(),eventId:b.dataset.id,name:n,ts:Date.now()});save();audit('Attendance marked');renderEvents();}});
$$('#eventList .del').forEach(b=>b.onclick=()=>{if(confirm(t('confirmDel'))){DB.events=DB.events.filter(x=>x.id!==b.dataset.id);save();renderEvents();renderHome();}});}

/* ---------- team ---------- */
$('#wAdd').onclick=()=>{const n=$('#wName').value.trim();if(!n)return;DB.workers.unshift({id:uid(),name:n,role:$('#wRole').value.trim(),points:+$('#wPoints').value||0,ts:Date.now()});save();audit('Worker: '+n);$('#wName').value='';$('#wRole').value='';$('#wPoints').value='';renderTeam();alert(t('saved'));};
function renderTeam(){
  const lb=[...DB.workers].sort((a,b)=>b.points-a.points);
  $('#leaderList').innerHTML=lb.length?lb.map((w,i)=>`<div class="item"><div class="t">${i+1}. ${esc(w.name)} — ${w.points} pts</div></div>`).join(''):`<div class="item muted">${t('noData')}</div>`;
  $('#teamList').innerHTML=DB.workers.length?DB.workers.map(w=>`<div class="item"><div class="t">${esc(w.name)}</div><div class="d">${esc(w.role)} · ${w.points} pts</div><div class="meta"><button class="link-btn idc" data-id="${w.id}">${t('idCard')}</button><button class="link-btn del" data-id="${w.id}">${t('delete')}</button></div></div>`).join(''):`<div class="item muted">${t('noData')}</div>`;
  $$('#teamList .del').forEach(b=>b.onclick=()=>{if(confirm(t('confirmDel'))){DB.workers=DB.workers.filter(x=>x.id!==b.dataset.id);save();renderTeam();}});
  $$('#teamList .idc').forEach(b=>b.onclick=()=>{const w=DB.workers.find(x=>x.id===b.dataset.id);const win=window.open('','_blank');win.document.write(`<html><head><title>ID</title><style>body{font-family:sans-serif}.id{border:3px solid #0f5132;border-radius:14px;padding:20px;max-width:340px;text-align:center}.id h2{color:#0f5132;margin:6px}</style></head><body><div class="id"><h2>Carbon Nexus Green</h2><h2>${esc(w.name)}</h2><p>${esc(w.role)}</p><p>ID: FCR-W-${w.id.toUpperCase()}</p><p><small>Powered by CNG — Carbon Nexus Green Pvt. Ltd.</small></p></div><script>window.print()<\/script></body></html>`);});
}

/* ---------- clients ---------- */
$('#clAdd').onclick=()=>{const n=$('#clName').value.trim();if(!n)return;DB.clients.unshift({id:uid(),name:n,project:$('#clProject').value.trim(),contact:$('#clContact').value.trim(),ts:Date.now()});save();audit('Client: '+n);$('#clName').value='';$('#clProject').value='';$('#clContact').value='';renderClients();alert(t('saved'));};
$('#rvAdd').onclick=()=>{const c=$('#rvClient').value.trim();if(!c)return;DB.reviews.unshift({id:uid(),client:c,stars:+$('#rvStars').value,text:$('#rvText').value.trim(),ts:Date.now()});save();audit('Review: '+c);$('#rvClient').value='';$('#rvText').value='';renderClients();alert(t('saved'));};
function renderClients(){
  $('#clientList').innerHTML=DB.clients.length?DB.clients.map(c=>`<div class="item"><div class="t">${esc(c.name)}</div><div class="d">${esc(c.project)} · ${esc(c.contact)}</div><div class="meta"><button class="link-btn del" data-id="${c.id}">${t('delete')}</button></div></div>`).join(''):`<div class="item muted">${t('noData')}</div>`;
  $$('#clientList .del').forEach(b=>b.onclick=()=>{if(confirm(t('confirmDel'))){DB.clients=DB.clients.filter(x=>x.id!==b.dataset.id);save();renderClients();}});
  $('#fpList').innerHTML=DB.footprints.length?DB.footprints.map(f=>`<div class="item"><div class="t">${esc(f.client)} — ${f.kwh} kWh/mo</div><div class="d">${f.perYear} kg CO₂/yr</div><div class="meta"><button class="link-btn del" data-id="${f.id}">${t('delete')}</button></div></div>`).join(''):`<div class="item muted">${t('noData')}</div>`;
  $$('#fpList .del').forEach(b=>b.onclick=()=>{if(confirm(t('confirmDel'))){DB.footprints=DB.footprints.filter(x=>x.id!==b.dataset.id);save();renderClients();renderHome();}});
  $('#revList').innerHTML=DB.reviews.length?DB.reviews.map(r=>`<div class="item"><div class="t">${esc(r.client)} ${'⭐'.repeat(r.stars)}</div><div class="d">${esc(r.text)}</div></div>`).join(''):`<div class="item muted">${t('noData')}</div>`;
}

/* ---------- vault ---------- */
function bindVault(){
  const add=(btnId,arr,vals,msg)=>{$(btnId).onclick=()=>{const v=vals();if(v===null)return;DB[arr].unshift({id:uid(),...v,ts:Date.now()});save();audit(msg);renderVault();};};
  add('#dAdd','documents',()=>{const title=$('#dTitle').value.trim();if(!title)return null;const r={title,note:$('#dNote').value.trim()};$('#dTitle').value='';$('#dNote').value='';return r;},'Document added');
  add('#nAdd','news',()=>{const title=$('#nTitle').value.trim();if(!title)return null;const r={title,body:$('#nBody').value.trim()};$('#nTitle').value='';$('#nBody').value='';return r;},'News added');
  add('#dnAdd','donations',()=>{const name=$('#dnName').value.trim();if(!name)return null;const r={name,amt:+$('#dnAmt').value||0};$('#dnName').value='';$('#dnAmt').value='';return r;},'Donation pledged');
  add('#ccAdd','credits',()=>{const title=$('#ccTitle').value.trim();if(!title)return null;const r={title,qty:+$('#ccQty').value||0,price:+$('#ccPrice').value||0};$('#ccTitle').value='';$('#ccQty').value='';$('#ccPrice').value='';return r;},'Credit listing added');
  add('#iAdd','inventory',()=>{const name=$('#iName').value.trim();if(!name)return null;const r={name,qty:+$('#iQty').value||0,cond:$('#iCond').value.trim()};$('#iName').value='';$('#iQty').value='';$('#iCond').value='';return r;},'Inventory added');
  add('#sAdd','scheduled',()=>{const title=$('#sTitle').value.trim();if(!title)return null;const r={title,date:$('#sDate').value};$('#sTitle').value='';$('#sDate').value='';return r;},'Scheduled report added');
}
function vItem(arr,id,main,sub){return`<div class="item"><div class="t">${main}</div>${sub?`<div class="d">${sub}</div>`:''}<div class="meta"><button class="link-btn del" data-arr="${arr}" data-id="${id}">${t('delete')}</button></div></div>`;}
function renderVault(){
  const E=esc;
  $('#docList').innerHTML=DB.documents.length?DB.documents.map(d=>vItem('documents',d.id,E(d.title),E(d.note))).join(''):`<div class="item muted">${t('noData')}</div>`;
  $('#newsList').innerHTML=DB.news.length?DB.news.map(n=>vItem('news',n.id,E(n.title),E(n.body))).join(''):`<div class="item muted">${t('noData')}</div>`;
  $('#donList').innerHTML=DB.donations.length?DB.donations.map(d=>vItem('donations',d.id,E(d.name),d.amt)).join(''):`<div class="item muted">${t('noData')}</div>`;
  $('#ccList').innerHTML=DB.credits.length?DB.credits.map(c=>vItem('credits',c.id,E(c.title),`${c.qty} × ${c.price}`)).join(''):`<div class="item muted">${t('noData')}</div>`;
  $('#invList').innerHTML=DB.inventory.length?DB.inventory.map(i=>vItem('inventory',i.id,E(i.name),`${i.qty} · ${E(i.cond)}`)).join(''):`<div class="item muted">${t('noData')}</div>`;
  $('#schList').innerHTML=DB.scheduled.length?DB.scheduled.map(s=>vItem('scheduled',s.id,E(s.title),E(s.date))).join(''):`<div class="item muted">${t('noData')}</div>`;
  $('#auditList').innerHTML=DB.audit.length?DB.audit.slice(0,50).map(a=>`<div class="item"><div class="d">${E(a.action)}<br><span class="small">${new Date(a.ts).toLocaleString()}</span></div></div>`).join(''):`<div class="item muted">${t('noData')}</div>`;
  $$('#screen-vault .del').forEach(b=>b.onclick=()=>{if(confirm(t('confirmDel'))){DB[b.dataset.arr]=DB[b.dataset.arr].filter(x=>x.id!==b.dataset.id);save();renderVault();renderHome();}});
}

/* ---------- backup ---------- */
$('#bkExport').onclick=()=>{const blob=new Blob([JSON.stringify(DB,null,1)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='fcr-backup-'+new Date().toISOString().slice(0,10)+'.json';a.click();audit('Backup exported');alert(t('exported'));};
$('#bkImport').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);if(!d.complaints)throw 0;DB=d;save();audit('Backup imported');renderAll();alert(t('imported'));}catch(_){alert('Invalid file');}};r.readAsText(f);};

/* ---------- settings ---------- */
function renderSettings(){$('#owmKey').value=DB.settings.owmKey||'';$('#geminiKey').value=DB.settings.geminiKey||'';}
$('#apiKeySave').onclick=()=>{DB.settings.owmKey=$('#owmKey').value.trim();DB.settings.geminiKey=$('#geminiKey').value.trim();save();audit('API keys updated');alert(t('saved'));};

/* ---------- live AQI ---------- */
function pm25ToAqi(c){const B=[[0,12,0,50],[12.1,35.4,51,100],[35.5,55.4,101,150],[55.5,150.4,151,200],[150.5,250.4,201,300],[250.5,500,301,500]];for(const[cl,ch,al,ah]of B){if(c<=ch)return Math.round((ah-al)/(ch-cl)*(c-cl)+al);}return 500;}
const OWM_LBL={1:'aqiGood',2:'aqiModerate',3:'aqiModerate',4:'aqiUnhealthy',5:'aqiVUnhealthy'};
function gpsPos(){return new Promise(res=>{if(!navigator.geolocation)return res(null);navigator.geolocation.getCurrentPosition(p=>res(p),()=>res(null),{timeout:15000});});}
async function fetchLiveAqi(){
  const key=(DB.settings.owmKey||'').trim();
  if(!key){alert(t('needOwmKey'));go('settings');return;}
  const box=$('#liveAqiResult');box.innerHTML='<div class="item">'+t('fetching')+'</div>';
  const pos=await gpsPos();
  if(!pos){box.innerHTML='<div class="item muted">'+t('needGps')+'</div>';return;}
  const lat=pos.coords.latitude,lon=pos.coords.longitude;
  try{
    const r=await fetch('https://api.openweathermap.org/data/2.5/air_pollution?lat='+lat+'&lon='+lon+'&appid='+encodeURIComponent(key));
    if(!r.ok)throw new Error('http '+r.status);
    const d=await r.json();const cur=d.list[0];
    const pm25=cur.components.pm2_5,pm10=cur.components.pm10;
    const aqi=pm25ToAqi(pm25);const[k,col]=aqiCat(aqi);
    box.innerHTML='<div class="item"><div class="t"><span style="display:inline-block;width:14px;height:14px;border-radius:50%;background:'+col+'"></span> AQI '+aqi+' — '+t(k)+'</div><div class="d">PM2.5: '+pm25+' µg/m³ · PM10: '+pm10+' µg/m³<br>'+lat.toFixed(4)+', '+lon.toFixed(4)+' · '+new Date(cur.dt*1000).toLocaleString()+'</div></div>';
    DB.aqiLog.unshift({id:uid(),v:aqi,place:'📡 Live ('+lat.toFixed(3)+','+lon.toFixed(3)+')',ts:Date.now()});
    save();audit('Live AQI fetched: '+aqi);renderAqi();
  }catch(e){box.innerHTML='<div class="item muted">'+t('netFail')+'</div>';}
}
$('#liveAqiBtn').onclick=fetchLiveAqi;

/* ---------- AI bot ---------- */
let botBusy=false;
const BOT_SYS="You are the AI assistant of Carbon Nexus Green Pvt. Ltd., an environmental consultancy in Faisalabad, Pakistan led by Saad Ashraf, Environmentalist. Answer briefly and helpfully about air quality, AQI, smog, carbon footprints, carbon credits, EIA, and environmental issues in Pakistan. Reply in the user's language (English or Urdu).";
function renderBot(){
  const box=$('#botMsgs');if(!box)return;
  if(!DB.botChat.length)DB.botChat=[{r:'bot',x:t('botHello')}];
  box.innerHTML=DB.botChat.map(m=>'<div class="msg '+m.r+'">'+esc(m.x).replace(/\n/g,'<br>')+'</div>').join('');
  box.scrollTop=box.scrollHeight;
}
async function sendBotMsg(){
  const inp=$('#botInput');const text=inp.value.trim();if(!text||botBusy)return;
  const key=(DB.settings.geminiKey||'').trim();
  if(!key){alert(t('needGeminiKey'));go('settings');return;}
  botBusy=true;inp.value='';
  DB.botChat.push({r:'user',x:text});
  const thinking={r:'bot',x:t('botThinking')};DB.botChat.push(thinking);
  save();renderBot();
  try{
    const hist=DB.botChat.filter(m=>m.x!==t('botThinking')).slice(-10)
      .map(m=>({role:m.r==='user'?'user':'model',parts:[{text:m.x}]}));
    const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key='+encodeURIComponent(key),{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({system_instruction:{parts:[{text:BOT_SYS}]},contents:hist})
    });
    if(!r.ok)throw new Error('http '+r.status);
    const d=await r.json();
    const ans=d.candidates&&d.candidates[0]&&d.candidates[0].content&&d.candidates[0].content.parts&&d.candidates[0].content.parts[0]&&d.candidates[0].content.parts[0].text;
    thinking.x=ans||'…';
  }catch(e){thinking.x=t('netFail');}
  save();renderBot();botBusy=false;
}
$('#botSend').onclick=sendBotMsg;
$('#botInput').addEventListener('keydown',e=>{if(e.key==='Enter')sendBotMsg();});

/* ---------- init ---------- */
document.addEventListener('DOMContentLoaded',async()=>{
  try{applyI18n();}catch(e){console.warn('i18n:',e&&e.message);}
  try{bindVault();}catch(e){console.warn('vault bind:',e&&e.message);}
  try{await Promise.race([idbOpen(),new Promise(r=>setTimeout(r,4000))]);}catch(e){console.warn('idb:',e&&e.message);}
  try{checkRole();}catch(e){console.warn('role:',e&&e.message);}
  renderAll();
});
