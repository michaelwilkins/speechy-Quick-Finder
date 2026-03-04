"use client";
import { useState, useRef, useEffect } from "react";

/* ═══════════════════════════════════════
   SPA QUICK FINDER v2.1
   Modern redesign + verified URLs + AI search
   ═══════════════════════════════════════ */

const PUB = "Public";
const MEM = "Members";

const KB = [
  {
    cat: "Finding CPD & Events", task: "I need professional development", icon: "\u{1F4DA}",
    items: [
      { t: "Upcoming Live Events", u: "https://www.speechpathologyaustralia.org.au/Public/Shared_Content/Events/PEL.aspx", d: "Browse and register for live professional education events across Australia.", a: PUB, st: ["all"] },
      { t: "On Demand Learning Hub", u: "https://www.speechpathologyaustralia.org.au/Public/Shared_Content/Events/On-Demand-Learning.aspx", d: "Self-paced online CPD courses you can complete anytime.", a: PUB },
      { t: "Member Events", u: "https://www.speechpathologyaustralia.org.au/Public/Shared_Content/Events/Member-Event-Listing.aspx", d: "Events exclusively for SPA members.", a: MEM },
      { t: "SPA 2026 Conference (Gold Coast)", u: "https://www.speechpathologyaustralia.org.au/Public/Public/CPD-events/SPA-conference/2026/Home.aspx", d: "Annual national conference \u2014 program and early bird registration.", a: PUB },
      { t: "CPD Requirements", u: "https://www.speechpathologyaustralia.org.au/Public/Public/Become/Aus-trained-apps/CPD-Requirements.aspx", d: "Minimum 20 hours/year including cultural learning + professional support.", a: PUB },
      { t: "Cultural Learning (CPD)", u: "https://www.speechpathologyaustralia.org.au/Public/Public/Become/Certification-Program/Culture-learning.aspx", d: "Resources for the cultural learning component of CPD.", a: PUB },
      { t: "NSW CPD Events", u: "https://www.speechpathologyaustralia.org.au/SPAweb/Professional_Development/CPD_Workshops/SPAweb/Document_Management/CPD/nsw_cpd.aspx", d: "CPD workshops in New South Wales.", a: MEM, st: ["NSW"] },
      { t: "VIC CPD Events", u: "https://www.speechpathologyaustralia.org.au/SPAWeb/Document_Management/CPD/vic_cpd.aspx", d: "CPD workshops in Victoria.", a: MEM, st: ["VIC"] },
      { t: "QLD CPD Events", u: "https://www.speechpathologyaustralia.org.au/SPAweb/Professional_Development/CPD_Workshops/SPAweb/Document_Management/CPD/qld_cpd.aspx", d: "CPD workshops in Queensland.", a: MEM, st: ["QLD"] },
      { t: "SA CPD Events", u: "https://www.speechpathologyaustralia.org.au/SPAweb/whats_on/Events/SPAweb/Document_Management/CPD/sa_cpd.aspx", d: "CPD workshops in South Australia.", a: MEM, st: ["SA"] },
    ],
  },
  {
    cat: "Working with Clients", task: "I\u2019m seeing clients and need clinical resources", icon: "\u{1FA7A}",
    items: [
      { t: "Clinical Guidelines", u: "https://www.speechpathologyaustralia.org.au/SPAweb/Members/Clinical_Guidelines/spaweb/Members/Clinical_Guidelines/Clinical_Guidelines.aspx?hkey=f66634e4-825a-4f1a-910d-644553f59140", d: "Evidence-based practice guidelines \u2014 AAC, autism, dysphagia, education, justice.", a: MEM },
      { t: "Position Statements", u: "https://www.speechpathologyaustralia.org.au/Public/Public/About-Us/Our-organisation/Position-statements/Position-statements.aspx", d: "Official SPA positions on telehealth, dysphagia, literacy, autism, and more.", a: PUB },
      { t: "Scope of Practice", u: "https://www.speechpathologyaustralia.org.au/Public/Public/About-Us/Ethics-and-standards/Scope-of-Practice.aspx", d: "What speech pathologists can and should do \u2014 roles, settings, and boundaries.", a: PUB },
      { t: "Professional Standards", u: "https://www.speechpathologyaustralia.org.au/Public/Public/About-Us/Ethics-and-standards/Professional-standards/Professional-Standards.aspx", d: "Minimum professional standards for all speech pathologists in Australia.", a: PUB },
      { t: "Parameters of Practice", u: "https://www.speechpathologyaustralia.org.au/Public/Public/About-Us/Ethics-and-standards/Parameters-of-practice.aspx", d: "Delegation, collaboration and teamwork guidelines.", a: PUB },
      { t: "Communication Milestones", u: "https://www.speechpathologyaustralia.org.au/Public/Public/Communication/Communication_Milestones.aspx", d: "Talking and understanding milestones ages 1\u20135 \u2014 share with parents.", a: PUB },
      { t: "Fact Sheets (Communication Hub)", u: "https://www.speechpathologyaustralia.org.au/CommunicationHub/Communication_Hub/Resources/Fact-Sheets.aspx", d: "Plain-language sheets on aphasia, autism, dysphagia, dementia, literacy and more.", a: PUB },
      { t: "Dysphagia Guidelines", u: "https://www.speechpathologyaustralia.org.au/SPAweb/Members/Clinical_Guidelines/spaweb/Members/Clinical_Guidelines/Clinical_Guidelines.aspx?hkey=f66634e4-825a-4f1a-910d-644553f59140", d: "Clinical guidelines for dysphagia management including end-of-life.", a: MEM },
      { t: "Autism Practice Guide", u: "https://www.speechpathologyaustralia.org.au/SPAweb/Members/Clinical_Guidelines/spaweb/Members/Clinical_Guidelines/Clinical_Guidelines.aspx?hkey=f66634e4-825a-4f1a-910d-644553f59140", d: "Delivering services to autistic people and their families.", a: MEM },
      { t: "AAC Guidelines", u: "https://www.speechpathologyaustralia.org.au/SPAweb/Members/Clinical_Guidelines/spaweb/Members/Clinical_Guidelines/Clinical_Guidelines.aspx?hkey=f66634e4-825a-4f1a-910d-644553f59140", d: "Augmentative and alternative communication support guidelines.", a: MEM },
      { t: "Aged Care & Dementia", u: "https://www.speechpathologyaustralia.org.au/SPAweb/Members/Clinical_Guidelines/spaweb/Members/Clinical_Guidelines/Clinical_Guidelines.aspx?hkey=f66634e4-825a-4f1a-910d-644553f59140", d: "Resources for working in aged care and with dementia.", a: MEM },
      { t: "School-Based Services", u: "https://www.speechpathologyaustralia.org.au/SPAweb/Members/Clinical_Guidelines/spaweb/Members/Clinical_Guidelines/Clinical_Guidelines.aspx?hkey=f66634e4-825a-4f1a-910d-644553f59140", d: "Practice guideline for speech pathology in education settings.", a: MEM },
    ],
  },
  {
    cat: "NDIS, Medicare & Funding", task: "I need info about funding and rebates", icon: "\u{1F4B0}",
    items: [
      { t: "NDIS & Communication Disability", u: "https://www.speechpathologyaustralia.org.au/Communication_Hub/Communication_Disability/Communication_disability_and_the_NDIS", d: "Eligibility, applications, and what NDIS funds for communication.", a: PUB },
      { t: "NDIS Therapy Support Guidelines", u: "https://www.speechpathologyaustralia.org.au/Public/Members/News-and-publications/Articles/2025/10-October/new-ndis-therapy-support-guidelines.aspx", d: "CPSP now required for all NDIS therapy supports. Key changes.", a: MEM },
      { t: "Medicare, DVA & Rebates", u: "https://www.speechpathologyaustralia.org.au/SPAweb/Resources_for_Speech_Pathologists/Medicare/SPAweb/Resources_for_Speech_Pathologists/Medicare/Medicare.aspx", d: "Medicare CDM items, provider numbers, DVA, health fund rebates.", a: MEM },
      { t: "How to Get a Medicare Provider Number", u: "https://www.speechpathologyaustralia.org.au/Public/Public/Become/Aus-trained-apps/Certified-Practising-member.aspx", d: "You need CPSP status to apply for a Medicare provider number.", a: PUB },
    ],
  },
  {
    cat: "Running My Practice", task: "I\u2019m managing or growing my business", icon: "\u{1F4BC}",
    items: [
      { t: "Private Practice Essentials", u: "https://www.speechpathologyaustralia.org.au/SPAweb/Resources_for_Speech_Pathologists/Private_Practice/SPAweb/Resources_for_Speech_Pathologists/Private_Practice/Private_Practice.aspx", d: "Starting, running, and growing a speech pathology private practice.", a: MEM },
      { t: "Telehealth / Telepractice", u: "https://www.speechpathologyaustralia.org.au/SPAweb/Resources_for_Speech_Pathologists/Telehealth/SPAweb/Resources_for_Speech_Pathologists/Telehealth/Telehealth.aspx", d: "Guidance and position statement for delivering services via telehealth.", a: MEM },
      { t: "Working with Allied Health Assistants", u: "https://www.speechpathologyaustralia.org.au/SPAweb/Resources_for_Speech_Pathologists/Support_Workers/SPAweb/Resources_for_Speech_Pathologists/Support_Workers/Support_Workers.aspx", d: "Guidelines on delegating to and supervising support workers.", a: MEM },
      { t: "Employment Hub & Job Board", u: "https://www.speechpathologyaustralia.org.au/SPAweb/Resources_for_Speech_Pathologists/Employment/SPAweb/Resources_for_Speech_Pathologists/Employment/Employment.aspx", d: "Post jobs, find candidates, access career resources.", a: MEM },
      { t: "Employing a Speech Pathologist", u: "https://www.speechpathologyaustralia.org.au/Public/Public/services/For-employers/Employing-a-Speech-Pathologist.aspx", d: "Info for employers on hiring and contracting.", a: PUB },
      { t: "Ethics & Code of Conduct", u: "https://www.speechpathologyaustralia.org.au/Public/Public/About-Us/Ethics-and-standards/Professional-standards/Professional-Standards.aspx", d: "Code of Ethics, professional conduct, making a complaint.", a: PUB },
    ],
  },
  {
    cat: "Membership & CPSP", task: "I need to join, renew, or manage my membership", icon: "\u{1FAAA}",
    items: [
      { t: "Become a Member", u: "https://www.speechpathologyaustralia.org.au/Public/Public/Become/join.aspx", d: "Membership categories, fees, and benefits overview.", a: PUB },
      { t: "Join as Certified Practising Member", u: "https://www.speechpathologyaustralia.org.au/Public/Public/Become/Aus-trained-apps/Certified-Practising-member.aspx", d: "CPSP application \u2014 eligibility, documents, recency of practice.", a: PUB },
      { t: "Membership Application Forms", u: "https://www.speechpathologyaustralia.org.au/Public/Public/Become/Aus-trained-apps/Member-application-forms.aspx", d: "Download forms for different membership categories.", a: PUB },
      { t: "Non-Member Certified Practitioner", u: "https://www.speechpathologyaustralia.org.au/Public/Public/join/Aus-trained-apps/Non-Member-Certified-Practitioner.aspx", d: "CPSP status without full membership.", a: PUB },
      { t: "Member Benefits", u: "https://www.speechpathologyaustralia.org.au/Public/Public/join/benefits/Member-benefits.aspx", d: "What you get: CPD, resources, insurance, discounts, advocacy.", a: PUB },
      { t: "Find a Speech Pathologist", u: "https://www.speechpathologyaustralia.org.au/Public/Shared_Content/Smart-Suite/Smart-Maps/Public/Find-a-Speech-Pathologist.aspx", d: "Public searchable map to find a CPSP near you.", a: PUB },
      { t: "Telepractice Provider Listing", u: "https://www.speechpathologyaustralia.org.au/Public/Shared_Content/TelePractice/Telepractice-Listing.aspx", d: "Find a speech pathologist offering telehealth services.", a: PUB },
    ],
  },
  {
    cat: "New Grads & Students", task: "I\u2019m starting out in the profession", icon: "\u{1F393}",
    items: [
      { t: "Becoming a Speech Pathologist", u: "https://www.speechpathologyaustralia.org.au/Public/Public/services/Become-a-sp/Become-a-SP.aspx", d: "University courses, accreditation, and career overview.", a: PUB },
      { t: "University Programs by State", u: "https://www.speechpathologyaustralia.org.au/Public/Public/services/Become-a-sp/University-programs.aspx", d: "Accredited speech pathology degrees listed by state.", a: PUB },
      { t: "Early Career Resources", u: "https://www.speechpathologyaustralia.org.au/Public/Public/join/Students/Early-career.aspx", d: "Wellbeing, mentoring, core documents, and career guidance for new grads.", a: PUB },
      { t: "Provisional \u2192 Full CPSP", u: "https://www.speechpathologyaustralia.org.au/Public/Public/Become/Certification-Program/Provisional-Certification.aspx", d: "200 practice hours, 12hrs supervision, ethics + EBP modules.", a: PUB },
      { t: "Supervision & Mentoring", u: "https://www.speechpathologyaustralia.org.au/Public/Public/Become/Aus-trained-apps/CPD-Requirements.aspx", d: "12 hours of mentoring/clinical supervision required in first 3 years.", a: PUB },
      { t: "Ethics & EBP Modules", u: "https://www.speechpathologyaustralia.org.au/Public/Shared_Content/Events/On-Demand-Learning.aspx", d: "Complete required ethics and EBP modules on the Learning Hub.", a: MEM },
      { t: "Student Membership", u: "https://www.speechpathologyaustralia.org.au/Public/Public/Become/Students/Students.aspx", d: "Free first year for enrolled students. Info on discounts and benefits.", a: PUB },
      { t: "Overseas Qualified", u: "https://www.speechpathologyaustralia.org.au/Public/Public/Overseas-trained/I-m-an-overseas-qualified-speech-pathologist.aspx", d: "Skills assessment process for overseas-trained speech pathologists.", a: PUB },
      { t: "Mutual Recognition (MRA)", u: "https://www.speechpathologyaustralia.org.au/Public/Public/Overseas-trained/Mutual-Recognition-MRA.aspx", d: "Recognition from ASHA, RCSLT, SAC, IASLT, NZSTA.", a: PUB },
      { t: "Re-entry Membership", u: "https://www.speechpathologyaustralia.org.au/Public/Public/Become/Re-entrying-the-Profession/Re-entry-membership.aspx", d: "Returning to practice after a career break.", a: PUB },
    ],
  },
  {
    cat: "For Clients & the Public", task: "I\u2019m looking for info as a client, parent, or carer", icon: "\u{1F44B}",
    items: [
      { t: "What Speech Pathologists Do", u: "https://www.speechpathologyaustralia.org.au/Public/Public/services/About-speech-pathologists/What-speech-pathologists-do.aspx", d: "Overview of the profession \u2014 who they help and how.", a: PUB },
      { t: "What to Expect at an Appointment", u: "https://www.speechpathologyaustralia.org.au/Public/Public/services/Choose-a-speech-pathologist/What-to-expect.aspx", d: "Assessment, therapy, fees, referrals, and privacy.", a: PUB },
      { t: "Telehealth Services (Client Guide)", u: "https://www.speechpathologyaustralia.org.au/Public/Public/services/Choose-a-speech-pathologist/Telehealth-services.aspx", d: "What to expect from telehealth speech pathology sessions.", a: PUB },
      { t: "Communication Hub", u: "https://www.speechpathologyaustralia.org.au/Communication_Hub", d: "Public hub about communication disorders, milestones, and support.", a: PUB },
      { t: "Find a Speech Pathologist", u: "https://www.speechpathologyaustralia.org.au/Public/Shared_Content/Smart-Suite/Smart-Maps/Public/Find-a-Speech-Pathologist.aspx", d: "Searchable map to find a certified practitioner near you.", a: PUB },
    ],
  },
  {
    cat: "About SPA", task: "I need info about the association itself", icon: "\u{1F3DB}\uFE0F",
    items: [
      { t: "About SPA", u: "https://www.speechpathologyaustralia.org.au/Public/Public/About-Us/About-SPA.aspx", d: "History, mission, strategic plan, and governance.", a: PUB },
      { t: "Contact SPA", u: "https://www.speechpathologyaustralia.org.au/Public/Public/Contact-us.aspx", d: "Phone: (03) 9642 4899 | office@speechpathologyaustralia.org.au", a: PUB },
      { t: "News & Articles", u: "https://www.speechpathologyaustralia.org.au/SPAweb/About_us/News/SPAweb/About_Us/News/News.aspx", d: "Latest news, media releases, and policy updates.", a: PUB },
      { t: "Reconciliation Action Plan", u: "https://www.speechpathologyaustralia.org.au/SPAweb/About_us/Reconciliation/SPAweb/About_Us/Reconciliation/Reconciliation.aspx", d: "SPA\u2019s RAP and cultural commitments.", a: PUB },
      { t: "Speech Pathology 2030", u: "https://www.speechpathologyaustralia.org.au/SPAweb/About_us/speechpath2030/SPAweb/About_Us/Speech_Pathology_2030/Speech_Pathology_2030.aspx", d: "Vision for the future of the profession.", a: PUB },
      { t: "Search SPA Website", u: "https://www.speechpathologyaustralia.org.au/Public/Public/Search.aspx", d: "Can\u2019t find it here? Try the SPA site\u2019s own search.", a: PUB },
    ],
  },
];

const ALL = KB.flatMap(c => c.items.map(i => ({...i, cat: c.cat, task: c.task, icon: c.icon})));

const SYN = {
  cpd:["professional development","workshop","training","learning","course","event","hours","points"],
  ndis:["disability","funding","scheme","participant","therapy support","plan"],
  membership:["member","join","renew","fees","application","sign up"],
  cpsp:["certified","practising","certification","renewal","provisional","full certification"],
  telehealth:["online","virtual","remote","telepractice","teletherapy","video"],
  job:["employment","career","hiring","work","vacancy","recruit","post a job"],
  child:["paediatric","pediatric","kids","children","developmental","toddler","preschool"],
  milestone:["development","communication","talking","understanding","age","speech development"],
  dysphagia:["swallowing","feeding","eating","drinking","mealtime","texture"],
  "private practice":["business","practice","self-employed","sole trader","abn"],
  ethics:["professional standards","code of conduct","complaint","ethical","code of ethics"],
  conference:["spa 2026","gold coast","annual conference","national conference"],
  find:["search","directory","locate","near me","map","where"],
  guidelines:["clinical","evidence","best practice","position statement","guideline"],
  medicare:["rebate","provider number","cdm","bulk bill","health fund","dva","chronic disease"],
  student:["university","course","degree","graduate","accredited","undergrad","masters"],
  autism:["autistic","asd","social communication","neurodivergent"],
  aac:["augmentative","alternative communication","communication device","complex communication","ccn"],
  literacy:["reading","writing","spelling","phonology","phonological","language disorder"],
  cultural:["aboriginal","torres strait","indigenous","reconciliation","first nations"],
  aged:["elderly","older","dementia","aged care","residential","nursing home"],
  school:["education","classroom","teacher","school-based","learning support"],
  supervision:["mentor","mentoring","supervisor","clinical supervision","professional support"],
  scope:["scope of practice","parameters","professional standards","what can i do"],
  voice:["vocal","dysphonia","hoarse","laryngeal","laryngectomy"],
  stutter:["stuttering","fluency","stammering","disfluency"],
  overseas:["international","skills assessment","mutual recognition","migration"],
  returning:["re-enter","comeback","break from practice","return to practice","re-entry"],
};

function score(item, terms) {
  let s = 0;
  const h = (item.t+" "+item.d+" "+item.cat+" "+(item.task||"")).toLowerCase();
  for (const term of terms) {
    if (h.includes(term)) s += h.indexOf(term) < item.t.length ? 10 : 3;
    for (const [k,vs] of Object.entries(SYN)) {
      if (term.includes(k)||k.includes(term)) { if(h.includes(k))s+=6; for(const v of vs)if(h.includes(v))s+=4; }
      for (const v of vs) { if(term.includes(v)||v.includes(term)){if(h.includes(k))s+=5;} }
    }
  }
  return s;
}

function localSearch(q) {
  if (!q.trim()) return [];
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  return ALL.map(i=>({...i,sc:score(i,terms)})).filter(r=>r.sc>0).sort((a,b)=>b.sc-a.sc).slice(0,8);
}

async function aiSearch(q) {
  const sys = "You are a search assistant for Speech Pathology Australia. Return ONLY a JSON array of indices (max 6). If nothing relevant, return [].\n\n"+ALL.map((i,n)=>n+": "+i.t+" - "+i.d+" ["+i.cat+"]").join("\n");
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:200,system:sys,messages:[{role:"user",content:q}]})});
    const d = await r.json();
    const txt = (d.content&&d.content[0]&&d.content[0].text)||"[]";
    const idx = JSON.parse(txt.replace(/```json|```/g,"").trim());
    return idx.map((i,p)=>ALL[i]?{...ALL[i],sc:100-p}:null).filter(Boolean);
  } catch(e){return [];}
}

const STATES = ["All","NSW","VIC","QLD","SA","WA","TAS","NT","ACT"];
const CHIPS = [
  {l:"Find a Speechie",q:"find speech pathologist near me"},
  {l:"CPD Events",q:"upcoming cpd events"},
  {l:"NDIS",q:"ndis funding speech pathology"},
  {l:"Join / CPSP",q:"cpsp certification join"},
  {l:"Milestones",q:"communication milestones children"},
  {l:"New Grad",q:"new graduate provisional certification"},
  {l:"Telehealth",q:"telehealth telepractice"},
  {l:"Medicare",q:"medicare provider number rebate"},
];

function Badge({a}){
  const pub = a===PUB;
  return <span style={{fontSize:10,fontWeight:700,letterSpacing:".05em",padding:"3px 8px",borderRadius:20,background:pub?"#E8F5E9":"#FFF3E0",color:pub?"#2E7D32":"#E65100",textTransform:"uppercase"}}>{pub?"\u2713 Public":"\u{1F512} Members only"}</span>;
}

export default function Home() {
  const [q,setQ]=useState("");
  const [res,setRes]=useState([]);
  const [aiRes,setAiRes]=useState(null);
  const [aiLoading,setAiLoading]=useState(false);
  const [browse,setBrowse]=useState(false);
  const [focus,setFocus]=useState(null);
  const [st,setSt]=useState("All");
  const inp=useRef(null);
  const aiT=useRef(null);

  useEffect(()=>{
    setRes(localSearch(q));
    if(aiT.current)clearTimeout(aiT.current);
    setAiRes(null);
    if(q.trim().length>3){
      aiT.current=setTimeout(async()=>{
        setAiLoading(true);
        setAiRes(await aiSearch(q));
        setAiLoading(false);
      },800);
    }
    return ()=>{if(aiT.current)clearTimeout(aiT.current);};
  },[q]);

  useEffect(()=>{inp.current&&inp.current.focus();},[]);

  const merged=(()=>{
    if(!q.trim())return[];
    const seen={},out=[];
    for(const r of res)if(!seen[r.u]){seen[r.u]=1;out.push(r);}
    if(aiRes)for(const r of aiRes)if(!seen[r.u]){seen[r.u]=1;out.push({...r,ai:1});}
    return out.slice(0,8);
  })();

  const filt=items=>{
    if(st==="All")return items;
    return items.filter(i=>!i.st||(i.st.indexOf("all")!==-1)||(i.st.indexOf(st)!==-1));
  };

  return (
    <div style={{minHeight:"100vh",background:"#0F1A14",fontFamily:"'DM Sans',system-ui,sans-serif",color:"#E8E6E1"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Instrument+Serif&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::selection{background:#3DD68C44;color:#fff}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideIn{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}
        @keyframes glow{0%,100%{opacity:.5}50%{opacity:1}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        .si:focus{outline:none;border-color:#3DD68C!important;box-shadow:0 0 0 3px rgba(61,214,140,.2),0 8px 32px rgba(0,0,0,.4)}
        .rc{animation:fadeUp .3s ease-out both;transition:all .2s ease}
        .rc:hover{transform:translateY(-2px);border-color:#3DD68C55!important;box-shadow:0 8px 40px rgba(61,214,140,.08)}
        .ch{transition:all .15s ease;cursor:pointer;border:1px solid #2A3D30!important}
        .ch:hover{background:#3DD68C!important;color:#0F1A14!important;border-color:#3DD68C!important;transform:translateY(-1px)}
        .cc{transition:all .25s ease;cursor:pointer}
        .cc:hover{transform:translateY(-4px);border-color:#3DD68C55!important;box-shadow:0 16px 48px rgba(0,0,0,.4)}
        .bl{transition:all .15s ease;text-decoration:none}
        .bl:hover{background:rgba(61,214,140,.06)!important;transform:translateX(3px)}
        .sb{transition:all .15s ease;cursor:pointer;border:none;font-family:inherit}
        .sb:hover{background:#3DD68C!important;color:#0F1A14!important}
        a{text-decoration:none;color:inherit}
      `}</style>

      {/* ── HEADER ── */}
      <header style={{padding:"48px 24px 56px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 80% 60% at 50% 0%,#1B3D2A 0%,transparent 70%)"}}/>
        <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,#3DD68C44,transparent)"}}/>
        <div style={{maxWidth:720,margin:"0 auto",position:"relative"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:"#3DD68C",boxShadow:"0 0 12px #3DD68C66"}}/>
            <span style={{fontSize:11,letterSpacing:".12em",color:"#3DD68C",fontWeight:600,textTransform:"uppercase"}}>Speech Pathology Australia</span>
          </div>
          <h1 style={{fontFamily:"'Instrument Serif',Georgia,serif",fontSize:"clamp(32px,6vw,48px)",fontWeight:400,color:"#fff",lineHeight:1.1,marginBottom:10}}>
            Quick Finder
          </h1>
          <p style={{color:"#7A8A7F",fontSize:15,fontWeight:400,maxWidth:440,lineHeight:1.6}}>
            Skip the maze. Search in plain English or browse by what you need.
          </p>
        </div>
      </header>

      {/* ── SEARCH ── */}
      <div style={{maxWidth:720,margin:"-24px auto 0",padding:"0 24px",position:"relative",zIndex:10}}>
        <div style={{position:"relative"}}>
          <input ref={inp} className="si" value={q}
            onChange={e=>{setQ(e.target.value);setBrowse(false);setFocus(null);}}
            placeholder='Try: "How do I get a Medicare provider number?"'
            style={{width:"100%",padding:"18px 20px 18px 52px",fontSize:16,fontFamily:"inherit",border:"1px solid #2A3D30",borderRadius:12,background:"#162420",color:"#E8E6E1",transition:"all .2s ease"}}
          />
          <svg style={{position:"absolute",left:18,top:"50%",transform:"translateY(-50%)",opacity:.4}} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3DD68C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          {q&&<button onClick={()=>{setQ("");setAiRes(null);}} style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",background:"#2A3D30",border:"none",borderRadius:"50%",width:28,height:28,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:"#7A8A7F"}}>{"\u2715"}</button>}
        </div>
        {aiLoading&&<div style={{display:"flex",alignItems:"center",gap:6,marginTop:10,paddingLeft:4}}><span style={{width:6,height:6,borderRadius:"50%",background:"#3DD68C",animation:"glow 1s ease-in-out infinite"}}/><span style={{fontSize:12,color:"#5A6A5F"}}>AI searching...</span></div>}
      </div>

      {/* ── CONTENT ── */}
      <div style={{maxWidth:720,margin:"0 auto",padding:"20px 24px 80px"}}>

        {/* Results */}
        {q&&merged.length>0&&(
          <div style={{marginTop:8}}>
            <p style={{fontSize:11,color:"#5A6A5F",marginBottom:12,fontWeight:600,letterSpacing:".04em",textTransform:"uppercase"}}>
              {merged.length} result{merged.length!==1?"s":""}
              {aiRes&&aiRes.length>0&&<span style={{color:"#3DD68C"}}> &middot; AI-enhanced</span>}
            </p>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {merged.map((r,i)=>(
                <a key={i} href={r.u} target="_blank" rel="noopener noreferrer" className="rc" style={{animationDelay:(i*0.04)+"s",background:"#162420",border:"1px solid #1E3028",borderRadius:12,padding:"16px 18px",display:"block"}}>
                  <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
                    <span style={{fontSize:20,lineHeight:1,marginTop:1,flexShrink:0}}>{r.icon}</span>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:4}}>
                        <span style={{fontSize:15,fontWeight:600,color:"#fff",lineHeight:1.3}}>{r.t}</span>
                        <Badge a={r.a}/>
                        {r.ai&&<span style={{fontSize:9,color:"#3DD68C",background:"#1E3028",padding:"2px 6px",borderRadius:8,fontWeight:600}}>{"\u2728"} AI</span>}
                      </div>
                      <p style={{fontSize:13,color:"#7A8A7F",lineHeight:1.5}}>{r.d}</p>
                      <span style={{fontSize:11,color:"#3A4A3F",marginTop:4,display:"block"}}>{r.cat}</span>
                    </div>
                    <svg style={{flexShrink:0,opacity:.2,marginTop:4}} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3DD68C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* No results */}
        {q&&merged.length===0&&!aiLoading&&(
          <div style={{textAlign:"center",padding:"44px 20px",animation:"fadeUp .3s ease-out"}}>
            <span style={{fontSize:32,display:"block",marginBottom:12}}>{"\u{1F914}"}</span>
            <p style={{fontSize:15,color:"#7A8A7F",marginBottom:6}}>No matches for &ldquo;<strong style={{color:"#fff"}}>{q}</strong>&rdquo;</p>
            <p style={{fontSize:13,color:"#5A6A5F",marginBottom:20}}>Try different keywords or browse categories below.</p>
            <a href={"https://www.speechpathologyaustralia.org.au/Public/Public/Search.aspx?SearchTerms="+encodeURIComponent(q)} target="_blank" rel="noopener noreferrer" style={{display:"inline-block",background:"#3DD68C",color:"#0F1A14",padding:"11px 22px",borderRadius:8,fontSize:14,fontWeight:700}}> Search SPA website &rarr;</a>
          </div>
        )}

        {/* Home view */}
        {!q&&!browse&&(
          <div style={{animation:"fadeUp .3s ease-out"}}>
            {/* State filter */}
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:24,flexWrap:"wrap"}}>
              <span style={{fontSize:11,color:"#5A6A5F",fontWeight:700,letterSpacing:".06em",textTransform:"uppercase"}}>State:</span>
              {STATES.map(s=>(
                <button key={s} className="sb" onClick={()=>setSt(s)} style={{fontSize:11,padding:"4px 12px",borderRadius:20,fontWeight:600,background:st===s?"#3DD68C":"transparent",color:st===s?"#0F1A14":"#5A6A5F",border:st===s?"1px solid #3DD68C":"1px solid #2A3D30"}}>{s}</button>
              ))}
            </div>

            {/* Chips */}
            <p style={{fontSize:11,color:"#5A6A5F",fontWeight:700,letterSpacing:".06em",textTransform:"uppercase",marginBottom:10}}>Popular</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:32}}>
              {CHIPS.map((c,i)=>(
                <button key={i} className="ch" onClick={()=>{setQ(c.q);setBrowse(false);setFocus(null);}} style={{background:"transparent",color:"#A8B8AD",borderRadius:20,padding:"8px 16px",fontSize:13,fontWeight:500,fontFamily:"inherit"}}>{c.l}</button>
              ))}
            </div>

            {/* Categories */}
            <p style={{fontSize:11,color:"#5A6A5F",fontWeight:700,letterSpacing:".06em",textTransform:"uppercase",marginBottom:14}}>What are you trying to do?</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:10}}>
              {KB.map((c,i)=>(
                <div key={i} className="cc" onClick={()=>{setBrowse(true);setFocus(c.cat);}} style={{animation:"fadeUp .3s ease-out "+(i*0.04)+"s both",background:"#162420",border:"1px solid #1E3028",borderRadius:14,padding:"20px"}}>
                  <span style={{fontSize:24,display:"block",marginBottom:8}}>{c.icon}</span>
                  <span style={{fontSize:14,fontWeight:600,color:"#fff",lineHeight:1.3,display:"block"}}>{c.cat}</span>
                  <span style={{display:"block",fontSize:12,color:"#5A6A5F",marginTop:4,lineHeight:1.4}}>{c.task}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category detail */}
        {browse&&focus&&(
          <div style={{animation:"fadeUp .25s ease-out"}}>
            <button onClick={()=>{setBrowse(false);setFocus(null);}} style={{background:"none",border:"none",color:"#3DD68C",cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:"inherit",display:"flex",alignItems:"center",gap:6,marginBottom:16,padding:0}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
              All categories
            </button>
            {KB.filter(c=>c.cat===focus).map(c=>(
              <div key={c.cat}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                  <span style={{fontSize:28}}>{c.icon}</span>
                  <h2 style={{fontFamily:"'Instrument Serif',Georgia,serif",fontSize:24,fontWeight:400,color:"#fff"}}>{c.cat}</h2>
                </div>
                <p style={{fontSize:13,color:"#5A6A5F",marginBottom:20}}>{c.task}</p>
                <div style={{display:"flex",flexDirection:"column",gap:2}}>
                  {filt(c.items).map((item,j)=>(
                    <a key={j} href={item.u} target="_blank" rel="noopener noreferrer" className="bl" style={{animation:"slideIn .2s ease-out "+(j*0.03)+"s both",display:"block",padding:"14px 16px",borderRadius:10}}>
                      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:3}}>
                            <span style={{fontSize:14,fontWeight:600,color:"#fff"}}>{item.t}</span>
                            <Badge a={item.a}/>
                          </div>
                          <p style={{fontSize:12,color:"#5A6A5F",lineHeight:1.5}}>{item.d}</p>
                        </div>
                        <svg style={{flexShrink:0,opacity:.15,marginLeft:12}} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3DD68C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div style={{marginTop:56,paddingTop:24,borderTop:"1px solid #1E3028",textAlign:"center"}}>
          <p style={{fontSize:11,color:"#3A4A3F",lineHeight:1.7}}>
            Community tool &mdash; not affiliated with Speech Pathology Australia
            <br/><span style={{color:"#2E7D32"}}>{"\u2713"}</span> = public &nbsp;&middot;&nbsp; <span style={{color:"#E65100"}}>{"\u{1F512}"}</span> = requires SPA member login
          </p>
        </div>
      </div>
    </div>
  );
}
