"use client";

import { useState, useRef, useEffect } from "react";

/* ════════════════════════════════════════════
   SPA QUICK FINDER v2
   ════════════════════════════════════════════
   Improvements:
   1. AI-powered natural language search (Claude API)
   2. Expanded knowledge base (aged care, journal, scope, supervision, etc.)
   3. Member-only / Public tags on every link
   4. Task-based categories ("I'm seeing a client" vs SPA structure)
   5. State filter for CPD events
   ════════════════════════════════════════════ */

const PUBLIC = "Public";
const MEMBERS = "Members";
const MIXED = "Some members-only";

const SPA_KNOWLEDGE = [
  {
    category: "Finding CPD & Events",
    taskLabel: "I need professional development",
    icon: "\u{1F4DA}",
    items: [
      { title: "Upcoming Live Events (All States)", url: "https://www.speechpathologyaustralia.org.au/Public/Shared_Content/Events/PEL.aspx", desc: "Browse and register for live professional education events.", access: PUBLIC, states: ["all"] },
      { title: "On Demand Learning Hub", url: "https://www.speechpathologyaustralia.org.au/Public/Shared_Content/Events/On-Demand-Learning.aspx", desc: "Self-paced online CPD courses you can complete anytime.", access: PUBLIC },
      { title: "Member Events", url: "https://www.speechpathologyaustralia.org.au/Public/Shared_Content/Events/Member-Event-Listing.aspx", desc: "Events exclusively for SPA members.", access: MEMBERS },
      { title: "SPA 2026 Conference (Gold Coast)", url: "https://www.speechpathologyaustralia.org.au/Public/Public/CPD-events/SPA-conference/2026/Home.aspx", desc: "Annual national conference \u2014 program, early bird registration open.", access: PUBLIC },
      { title: "CPD Requirements", url: "https://www.speechpathologyaustralia.org.au/Public/Public/Become/Aus-trained-apps/CPD-Requirements.aspx", desc: "Minimum 20 hours/year including 2hrs cultural learning + 2hrs professional support.", access: PUBLIC },
      { title: "Cultural Learning (CPD)", url: "https://www.speechpathologyaustralia.org.au/Public/Public/Become/Certification-Program/Culture-learning.aspx", desc: "Requirements and resources for the cultural learning component of CPD.", access: PUBLIC },
      { title: "NSW CPD Events", url: "https://www.speechpathologyaustralia.org.au/SPAweb/Professional_Development/CPD_Workshops/SPAweb/Document_Management/CPD/nsw_cpd.aspx", desc: "CPD workshops in New South Wales.", access: MEMBERS, states: ["NSW"] },
      { title: "VIC CPD Events", url: "https://www.speechpathologyaustralia.org.au/SPAWeb/Document_Management/CPD/vic_cpd.aspx", desc: "CPD workshops in Victoria.", access: MEMBERS, states: ["VIC"] },
      { title: "QLD CPD Events", url: "https://www.speechpathologyaustralia.org.au/SPAweb/Professional_Development/CPD_Workshops/SPAweb/Document_Management/CPD/qld_cpd.aspx", desc: "CPD workshops in Queensland.", access: MEMBERS, states: ["QLD"] },
      { title: "SA CPD Events", url: "https://www.speechpathologyaustralia.org.au/SPAweb/whats_on/Events/SPAweb/Document_Management/CPD/sa_cpd.aspx", desc: "CPD workshops in South Australia.", access: MEMBERS, states: ["SA"] },
    ],
  },
  {
    category: "Working with Clients",
    taskLabel: "I\u2019m seeing clients and need clinical resources",
    icon: "\u{1FA7A}",
    items: [
      { title: "Clinical Guidelines", url: "https://www.speechpathologyaustralia.org.au/SPAweb/Members/Clinical_Guidelines/spaweb/Members/Clinical_Guidelines/Clinical_Guidelines.aspx", desc: "Evidence-based practice guidelines \u2014 AAC, autism, dysphagia, education, justice.", access: MEMBERS },
      { title: "Position Statements", url: "https://www.speechpathologyaustralia.org.au/Public/Public/About-Us/Our-organisation/Position-statements/Position-statements.aspx", desc: "Official SPA positions on telehealth, dysphagia, literacy, autism, transdisciplinary practice.", access: PUBLIC },
      { title: "Scope of Practice & Core Documents", url: "https://www.speechpathologyaustralia.org.au/spaweb/About_Us/SPA_Documents/SPA_Documents.aspx", desc: "Parameters of Practice, Professional Standards, and core SPA documents.", access: MIXED },
      { title: "Communication Milestones (Ages 1\u20135)", url: "https://www.speechpathologyaustralia.org.au/Public/Public/Communication/Communication_Milestones.aspx", desc: "Talking and understanding milestones \u2014 great to share with parents.", access: PUBLIC },
      { title: "Fact Sheets for Clients", url: "https://www.speechpathologyaustralia.org.au/Public/Public/Communication/Fact_Sheets.aspx", desc: "Plain-language fact sheets about communication disorders for clients/families.", access: PUBLIC },
      { title: "Dysphagia Resources", url: "https://www.speechpathologyaustralia.org.au/SPAweb/Members/Clinical_Guidelines/spaweb/Members/Clinical_Guidelines/Clinical_Guidelines.aspx", desc: "Clinical guidelines for dysphagia management, including end-of-life decision making.", access: MEMBERS },
      { title: "Autism Practice Guide", url: "https://www.speechpathologyaustralia.org.au/SPAweb/Members/Clinical_Guidelines/spaweb/Members/Clinical_Guidelines/Clinical_Guidelines.aspx", desc: "Practice guide for delivering services to autistic people and their families.", access: MEMBERS },
      { title: "AAC Guidelines", url: "https://www.speechpathologyaustralia.org.au/SPAweb/Members/Clinical_Guidelines/spaweb/Members/Clinical_Guidelines/Clinical_Guidelines.aspx", desc: "Augmentative and alternative communication assessment and support guidelines.", access: MEMBERS },
      { title: "Aged Care & Dementia", url: "https://www.speechpathologyaustralia.org.au/SPAweb/Members/Clinical_Guidelines/spaweb/Members/Clinical_Guidelines/Clinical_Guidelines.aspx", desc: "Resources for speech pathologists working in residential aged care and dementia.", access: MEMBERS },
      { title: "School-Based Services", url: "https://www.speechpathologyaustralia.org.au/SPAweb/Members/Clinical_Guidelines/spaweb/Members/Clinical_Guidelines/Clinical_Guidelines.aspx", desc: "Practice guideline for speech pathology in education settings.", access: MEMBERS },
    ],
  },
  {
    category: "NDIS, Medicare & Funding",
    taskLabel: "I need info about funding and rebates",
    icon: "\u{1F4B0}",
    items: [
      { title: "NDIS & Communication Disability", url: "https://www.speechpathologyaustralia.org.au/Communication_Hub/Communication_Disability/Communication_disability_and_the_NDIS", desc: "Eligibility, applications, and what NDIS funds for communication.", access: PUBLIC },
      { title: "NDIS Therapy Support Guidelines (2025)", url: "https://www.speechpathologyaustralia.org.au/Public/Members/News-and-publications/Articles/2025/10-October/new-ndis-therapy-support-guidelines.aspx", desc: "CPSP now required for all NDIS therapy supports. Key changes explained.", access: MEMBERS },
      { title: "Medicare, DVA & Rebates", url: "https://www.speechpathologyaustralia.org.au/SPAweb/Resources_for_Speech_Pathologists/Medicare/SPAweb/Resources_for_Speech_Pathologists/Medicare/Medicare.aspx", desc: "Medicare CDM items, provider numbers, DVA, private health fund rebates.", access: MEMBERS },
      { title: "How to Get a Medicare Provider Number", url: "https://www.speechpathologyaustralia.org.au/Public/Public/Become/Aus-trained-apps/Certified-Practising-member.aspx", desc: "You need CPSP status to apply for a Medicare provider number.", access: PUBLIC },
    ],
  },
  {
    category: "Running My Practice",
    taskLabel: "I\u2019m managing or growing my business",
    icon: "\u{1F4BC}",
    items: [
      { title: "Private Practice Essentials", url: "https://www.speechpathologyaustralia.org.au/SPAweb/Resources_for_Speech_Pathologists/Private_Practice/SPAweb/Resources_for_Speech_Pathologists/Private_Practice/Private_Practice.aspx", desc: "Starting, running, and growing a speech pathology private practice.", access: MEMBERS },
      { title: "Telehealth / Telepractice", url: "https://www.speechpathologyaustralia.org.au/SPAweb/Resources_for_Speech_Pathologists/Telehealth/SPAweb/Resources_for_Speech_Pathologists/Telehealth/Telehealth.aspx", desc: "Guidance and position statement for delivering services via telehealth.", access: MEMBERS },
      { title: "Working with Allied Health Assistants", url: "https://www.speechpathologyaustralia.org.au/SPAweb/Resources_for_Speech_Pathologists/Support_Workers/SPAweb/Resources_for_Speech_Pathologists/Support_Workers/Support_Workers.aspx", desc: "Guidelines on delegating to and supervising support workers.", access: MEMBERS },
      { title: "Employment Hub & Job Board", url: "https://www.speechpathologyaustralia.org.au/SPAweb/Resources_for_Speech_Pathologists/Employment/SPAweb/Resources_for_Speech_Pathologists/Employment/Employment.aspx", desc: "Post jobs, find candidates, access career resources.", access: MEMBERS },
      { title: "Employing a Speech Pathologist", url: "https://www.speechpathologyaustralia.org.au/Public/Public/services/For-employers/Employing-a-Speech-Pathologist.aspx", desc: "Information for employers on hiring and contracting speech pathologists.", access: PUBLIC },
      { title: "Ethics & Code of Conduct", url: "https://www.speechpathologyaustralia.org.au/spaweb/About_Us/SPA_Documents/SPA_Documents.aspx", desc: "Code of Ethics, professional conduct expectations, making a complaint.", access: MIXED },
    ],
  },
  {
    category: "Membership & CPSP",
    taskLabel: "I need to join, renew, or manage my membership",
    icon: "\u{1FAAA}",
    items: [
      { title: "Become a Member", url: "https://www.speechpathologyaustralia.org.au/Public/Public/Become/join.aspx", desc: "Overview of membership categories, fees, and benefits.", access: PUBLIC },
      { title: "Join as Certified Practising Member", url: "https://www.speechpathologyaustralia.org.au/Public/Public/Become/Aus-trained-apps/Certified-Practising-member.aspx", desc: "CPSP application \u2014 eligibility, documents, recency of practice.", access: PUBLIC },
      { title: "Membership Application Forms", url: "https://www.speechpathologyaustralia.org.au/Public/Public/join/Aus-trained-apps/Member-application-forms.aspx", desc: "Download forms for different membership categories.", access: PUBLIC },
      { title: "Non-Member Certified Practitioner", url: "https://www.speechpathologyaustralia.org.au/Public/Public/join/Aus-trained-apps/Non-Member-Certified-Practitioner.aspx", desc: "CPSP status without full membership \u2014 for Medicare provider numbers.", access: PUBLIC },
      { title: "Membership Inclusions", url: "https://www.speechpathologyaustralia.org.au/Public/Public/join/Inclusions/Membership-inclusions.aspx", desc: "What you get: CPD, resources, insurance, advocacy.", access: PUBLIC },
      { title: "Find a Speech Pathologist", url: "https://www.speechpathologyaustralia.org.au/Public/Shared_Content/Smart-Suite/Smart-Maps/Public/Find-a-Speech-Pathologist.aspx", desc: "Public searchable map to find a CPSP near you.", access: PUBLIC },
      { title: "Telepractice Provider Listing", url: "https://www.speechpathologyaustralia.org.au/Public/Shared_Content/TelePractice/Telepractice-Listing.aspx", desc: "Find a speech pathologist offering telehealth services.", access: PUBLIC },
    ],
  },
  {
    category: "New Grads & Students",
    taskLabel: "I\u2019m starting out in the profession",
    icon: "\u{1F393}",
    items: [
      { title: "Becoming a Speech Pathologist", url: "https://www.speechpathologyaustralia.org.au/Public/Public/Become-a-speech-pathologist/Become-a-Speech-Pathologist.aspx", desc: "University courses, accreditation, and career overview.", access: PUBLIC },
      { title: "New Graduate Info (PDF)", url: "https://speechpathologyaustralia.org.au/Common/Uploaded%20files/Smart%20Suite/Smart%20Library/eeb4217b-e5b5-4252-824d-e17d8f7281b7/20231011%20Information%20for%20new%20graduates_Final.pdf", desc: "Provisional certification, ethics & EBP modules, CPD requirements.", access: PUBLIC },
      { title: "Provisional \u2192 Full CPSP", url: "https://www.speechpathologyaustralia.org.au/Public/Public/Become/Aus-trained-apps/CPD-Requirements.aspx", desc: "200 practice hours, 12hrs supervision, ethics + EBP modules.", access: PUBLIC },
      { title: "Supervision & Mentoring", url: "https://www.speechpathologyaustralia.org.au/Public/Public/Become/Aus-trained-apps/CPD-Requirements.aspx", desc: "12 hours of mentoring/clinical supervision required in first 3 years.", access: PUBLIC },
      { title: "Ethics Module", url: "https://www.speechpathologyaustralia.org.au/Public/Shared_Content/Events/On-Demand-Learning.aspx", desc: "Complete Ethical Decision Making on the Learning Hub \u2014 required.", access: MEMBERS },
      { title: "EBP Module", url: "https://www.speechpathologyaustralia.org.au/Public/Shared_Content/Events/On-Demand-Learning.aspx", desc: "Complete Evidence Based Practice module \u2014 required.", access: MEMBERS },
      { title: "Student Membership", url: "https://www.speechpathologyaustralia.org.au/SPAweb/Join_Us/Students/Student_Application.aspx", desc: "Free first year for enrolled students. Apply online.", access: PUBLIC },
      { title: "Accredited University Programs", url: "https://www.speechpathologyaustralia.org.au/SPAweb/Resources_for_Speech_Pathologists/Accreditation/SPAweb/Resources_for_Speech_Pathologists/Accreditation/Accreditation.aspx", desc: "Accredited speech pathology degrees in Australia.", access: PUBLIC },
      { title: "Return to Practice Program", url: "https://www.speechpathologyaustralia.org.au/Common/Uploaded%20files/Smart%20Suite/Smart%20Library/a2542c63-eb7e-4312-aca4-5555c445c123/2025_1002_SPA_RtP_Guide.pdf", desc: "Re-entry pathway after a career break.", access: PUBLIC },
    ],
  },
  {
    category: "For Clients & the Public",
    taskLabel: "I\u2019m looking for info as a client, parent, or carer",
    icon: "\u{1F44B}",
    items: [
      { title: "What Speech Pathologists Do", url: "https://www.speechpathologyaustralia.org.au/Public/Public/services/About-speech-pathologists/What-speech-pathologists-do.aspx", desc: "Overview of the profession \u2014 who they help and how.", access: PUBLIC },
      { title: "What to Expect at an Appointment", url: "https://www.speechpathologyaustralia.org.au/Public/Public/services/Choose-a-speech-pathologist/What-to-expect.aspx", desc: "Assessment, therapy, fees, referrals, and privacy.", access: PUBLIC },
      { title: "Choosing a Speech Pathologist", url: "https://www.speechpathologyaustralia.org.au/SPAweb/Resources_for_the_Public/Seeing_a_Speech_Pathologist/SPAweb/Resources_for_the_Pubic/Seeing_a_Speech_Pathologist/Seeing_a_Speech_Pathologist.aspx", desc: "How to find, choose, and access services. Fees and FAQs.", access: PUBLIC },
      { title: "Communication Hub", url: "https://www.speechpathologyaustralia.org.au/Communication_Hub", desc: "Public info about communication disorders, milestones, and support.", access: PUBLIC },
      { title: "Find a Speech Pathologist", url: "https://www.speechpathologyaustralia.org.au/Public/Shared_Content/Smart-Suite/Smart-Maps/Public/Find-a-Speech-Pathologist.aspx", desc: "Searchable map to find a certified speech pathologist near you.", access: PUBLIC },
    ],
  },
  {
    category: "About SPA",
    taskLabel: "I need info about the association itself",
    icon: "\u{1F3DB}\uFE0F",
    items: [
      { title: "About SPA", url: "https://www.speechpathologyaustralia.org.au/Public/Public/About-Us/About-SPA.aspx", desc: "History, mission, strategic plan, and governance.", access: PUBLIC },
      { title: "Contact SPA", url: "https://www.speechpathologyaustralia.org.au/Public/Public/Contact-us.aspx", desc: "Phone: (03) 9642 4899 | Email: office@speechpathologyaustralia.org.au", access: PUBLIC },
      { title: "News & Articles", url: "https://www.speechpathologyaustralia.org.au/SPAweb/About_us/News/SPAweb/About_Us/News/News.aspx", desc: "Latest news, media releases, and policy announcements.", access: PUBLIC },
      { title: "Resource Guide", url: "https://www.speechpathologyaustralia.org.au/Public/Public/About-Us/Pubs%20and%20advertise/Resource-guide.aspx", desc: "Annual directory of speech pathology products, tools, and services.", access: PUBLIC },
      { title: "Reconciliation Action Plan", url: "https://www.speechpathologyaustralia.org.au/SPAweb/About_us/Reconciliation/SPAweb/About_Us/Reconciliation/Reconciliation.aspx", desc: "SPA\u2019s RAP, Response to Racism, and cultural commitments.", access: PUBLIC },
      { title: "Speech Pathology 2030", url: "https://www.speechpathologyaustralia.org.au/SPAweb/About_us/speechpath2030/SPAweb/About_Us/Speech_Pathology_2030/Speech_Pathology_2030.aspx", desc: "SPA\u2019s landmark project envisioning the future of the profession.", access: PUBLIC },
      { title: "SPA Website Search", url: "https://www.speechpathologyaustralia.org.au/Public/Public/Search.aspx", desc: "Can\u2019t find it here? Try the SPA site\u2019s own search.", access: PUBLIC },
    ],
  },
];

const ALL_ITEMS = SPA_KNOWLEDGE.flatMap((cat) =>
  cat.items.map((item) => ({ ...item, category: cat.category, taskLabel: cat.taskLabel, icon: cat.icon }))
);

const SYNONYMS = {
  cpd: ["professional development", "workshop", "training", "learning", "course", "event", "hours", "points"],
  ndis: ["disability", "funding", "scheme", "participant", "therapy support", "plan"],
  membership: ["member", "join", "renew", "fees", "application", "sign up"],
  cpsp: ["certified", "practising", "certification", "renewal", "provisional", "full certification"],
  telehealth: ["online", "virtual", "remote", "telepractice", "teletherapy", "video"],
  job: ["employment", "career", "hiring", "work", "vacancy", "recruit", "post a job"],
  child: ["paediatric", "pediatric", "kids", "children", "developmental", "toddler", "preschool"],
  milestone: ["development", "communication", "talking", "understanding", "age", "speech development"],
  dysphagia: ["swallowing", "feeding", "eating", "drinking", "mealtime", "texture"],
  "private practice": ["business", "practice", "self-employed", "sole trader", "abn"],
  ethics: ["professional standards", "code of conduct", "complaint", "ethical", "code of ethics"],
  conference: ["spa 2026", "gold coast", "annual conference", "national conference"],
  overseas: ["international", "skills assessment", "mutual recognition", "migration", "overseas qualified"],
  find: ["search", "directory", "locate", "near me", "map", "where"],
  guidelines: ["clinical", "evidence", "best practice", "position statement", "guideline"],
  medicare: ["rebate", "provider number", "cdm", "bulk bill", "health fund", "dva", "chronic disease"],
  student: ["university", "course", "degree", "graduate", "accredited", "undergrad", "masters"],
  returning: ["re-enter", "re-entering", "comeback", "break from practice", "return to practice", "re-entry"],
  autism: ["autistic", "asd", "social communication", "neurodivergent"],
  aac: ["augmentative", "alternative communication", "communication device", "complex communication", "ccn"],
  literacy: ["reading", "writing", "spelling", "phonology", "phonological", "language disorder"],
  cultural: ["aboriginal", "torres strait", "indigenous", "reconciliation", "first nations"],
  aged: ["elderly", "older", "dementia", "aged care", "residential", "nursing home"],
  school: ["education", "classroom", "teacher", "school-based", "learning support"],
  supervision: ["mentor", "mentoring", "supervisor", "clinical supervision", "professional support"],
  scope: ["scope of practice", "parameters", "professional standards", "what can i do"],
  new_grad: ["new graduate", "just graduated", "first year", "provisional", "starting out"],
  voice: ["vocal", "dysphonia", "hoarse", "laryngeal", "laryngectomy"],
  stutter: ["stuttering", "fluency", "stammering", "disfluency"],
};

function scoreMatch(item, terms) {
  let score = 0;
  const haystack = (item.title + " " + item.desc + " " + item.category + " " + (item.taskLabel || "")).toLowerCase();
  for (var t = 0; t < terms.length; t++) {
    var term = terms[t];
    if (haystack.indexOf(term) !== -1) {
      score += item.title.toLowerCase().indexOf(term) !== -1 ? 10 : 3;
    }
    var keys = Object.keys(SYNONYMS);
    for (var k = 0; k < keys.length; k++) {
      var key = keys[k];
      var syns = SYNONYMS[key];
      if (term.indexOf(key) !== -1 || key.indexOf(term) !== -1) {
        if (haystack.indexOf(key) !== -1) score += 6;
        for (var s = 0; s < syns.length; s++) if (haystack.indexOf(syns[s]) !== -1) score += 4;
      }
      for (var s2 = 0; s2 < syns.length; s2++) {
        if (term.indexOf(syns[s2]) !== -1 || syns[s2].indexOf(term) !== -1) {
          if (haystack.indexOf(key) !== -1) score += 5;
        }
      }
    }
  }
  return score;
}

function localSearch(query) {
  if (!query.trim()) return [];
  var terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  return ALL_ITEMS.map(function(item) { return Object.assign({}, item, { score: scoreMatch(item, terms) }); })
    .filter(function(r) { return r.score > 0; })
    .sort(function(a, b) { return b.score - a.score; })
    .slice(0, 8);
}

async function aiSearch(query) {
  var systemPrompt = "You are a search assistant for Speech Pathology Australia (SPA) website. Given a user query, return the indices of the most relevant items from the knowledge base. Return ONLY a JSON array of indices (e.g. [0, 5, 12]). Maximum 6 results. If nothing is relevant, return [].\n\nKnowledge base items:\n" +
    ALL_ITEMS.map(function(item, i) { return i + ": " + item.title + " - " + item.desc + " [" + item.category + "]"; }).join("\n");

  try {
    var response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 200,
        system: systemPrompt,
        messages: [{ role: "user", content: query }],
      }),
    });
    var data = await response.json();
    var text = (data.content && data.content[0] && data.content[0].text) || "[]";
    var clean = text.replace(/```json|```/g, "").trim();
    var indices = JSON.parse(clean);
    return indices.map(function(i, pos) { return ALL_ITEMS[i] ? Object.assign({}, ALL_ITEMS[i], { score: 100 - pos }) : null; }).filter(Boolean);
  } catch(e) {
    return [];
  }
}

var STATES = ["All States", "NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"];

var QUICK_LINKS = [
  { label: "Find a Speechie", query: "find speech pathologist near me" },
  { label: "CPD Events", query: "upcoming cpd events" },
  { label: "NDIS Info", query: "ndis funding speech pathology" },
  { label: "Join / CPSP", query: "how to get cpsp certification" },
  { label: "Milestones", query: "communication milestones children" },
  { label: "New Grad Help", query: "new graduate provisional certification supervision" },
  { label: "Telehealth", query: "telehealth telepractice" },
  { label: "Medicare", query: "medicare provider number rebate" },
];

function AccessBadge({ access }) {
  var isPublic = access === PUBLIC;
  return (
    <span style={{
      fontSize: 10, fontWeight: 600, letterSpacing: ".03em", padding: "2px 7px", borderRadius: 4,
      background: isPublic ? "rgba(30,90,70,0.1)" : "rgba(180,120,20,0.1)",
      color: isPublic ? "#1E5A46" : "#8B6914", whiteSpace: "nowrap", textTransform: "uppercase",
    }}>
      {isPublic ? "\u{1F513} Public" : "\u{1F512} Members"}
    </span>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [aiResults, setAiResults] = useState(null);
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [browsing, setBrowsing] = useState(false);
  const [focusedCategory, setFocusedCategory] = useState(null);
  const [stateFilter, setStateFilter] = useState("All States");
  const inputRef = useRef(null);
  const aiTimeoutRef = useRef(null);

  useEffect(() => {
    var local = localSearch(query);
    setResults(local);
    if (aiTimeoutRef.current) clearTimeout(aiTimeoutRef.current);
    setAiResults(null);
    if (query.trim().length > 3) {
      aiTimeoutRef.current = setTimeout(async () => {
        setIsAiSearching(true);
        var ai = await aiSearch(query);
        setAiResults(ai);
        setIsAiSearching(false);
      }, 800);
    }
    return () => { if (aiTimeoutRef.current) clearTimeout(aiTimeoutRef.current); };
  }, [query]);

  useEffect(() => { if (inputRef.current) inputRef.current.focus(); }, []);

  var handleQuickLink = (q) => { setQuery(q); setBrowsing(false); setFocusedCategory(null); };

  var displayResults = (() => {
    if (!query.trim()) return [];
    var seen = {};
    var merged = [];
    for (var i = 0; i < results.length; i++) {
      if (!seen[results[i].url]) { seen[results[i].url] = true; merged.push(results[i]); }
    }
    if (aiResults) {
      for (var j = 0; j < aiResults.length; j++) {
        if (!seen[aiResults[j].url]) { seen[aiResults[j].url] = true; merged.push(Object.assign({}, aiResults[j], { aiSuggested: true })); }
      }
    }
    return merged.slice(0, 8);
  })();

  var filterByState = (items) => {
    if (stateFilter === "All States") return items;
    return items.filter((item) => !item.states || (item.states.indexOf("all") !== -1) || (item.states.indexOf(stateFilter) !== -1));
  };

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF7", fontFamily: "'Source Sans 3','Source Sans Pro',system-ui,sans-serif" }}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideIn{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}
        @keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}
        .search-input:focus{outline:none;box-shadow:0 0 0 3px rgba(30,90,70,.15),0 4px 24px rgba(0,0,0,.08)}
        .result-card{animation:fadeUp .25s ease-out both;transition:all .2s ease}
        .result-card:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(0,0,0,.1)}
        .quick-chip{transition:all .15s ease;cursor:pointer}
        .quick-chip:hover{background:#1E5A46!important;color:#fff!important;transform:translateY(-1px)}
        .cat-card{transition:all .2s ease;cursor:pointer}
        .cat-card:hover{transform:translateY(-3px);box-shadow:0 12px 40px rgba(0,0,0,.1)}
        .browse-link{transition:all .15s ease;text-decoration:none}
        .browse-link:hover{background:rgba(30,90,70,.06);transform:translateX(2px)}
        .state-btn{transition:all .15s ease;cursor:pointer;border:none;font-family:inherit}
        .state-btn:hover{background:#1E5A46!important;color:#fff!important}
        a{text-decoration:none;color:inherit}
      `}</style>

      <header style={{ background: "linear-gradient(135deg,#1E5A46 0%,#2A7A5E 50%,#1B4F3E 100%)", padding: "36px 24px 44px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "radial-gradient(circle at 20% 50%,#fff 1px,transparent 1px),radial-gradient(circle at 80% 20%,#fff 1px,transparent 1px)", backgroundSize: "60px 60px,40px 40px" }} />
        <div style={{ maxWidth: 760, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 12, letterSpacing: ".08em", color: "rgba(255,255,255,.6)", fontWeight: 500, textTransform: "uppercase" }}>Speech Pathology Australia</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,.4)", fontWeight: 500 }}>v2.0</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(26px,5vw,36px)", fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 6 }}>Quick Finder</h1>
          <p style={{ color: "rgba(255,255,255,.7)", fontSize: 15, fontWeight: 300, maxWidth: 460, lineHeight: 1.5 }}>Skip the maze. Ask in plain English \u2014 or browse by what you're trying to do.</p>
        </div>
      </header>

      <div style={{ maxWidth: 760, margin: "-22px auto 0", padding: "0 24px", position: "relative", zIndex: 10 }}>
        <div style={{ position: "relative" }}>
          <input ref={inputRef} className="search-input" type="text" value={query}
            onChange={(e) => { setQuery(e.target.value); setBrowsing(false); setFocusedCategory(null); }}
            placeholder="Ask anything: 'How do I get a Medicare provider number?'"
            style={{ width: "100%", padding: "18px 20px 18px 52px", fontSize: 16, fontFamily: "inherit", border: "1.5px solid #e0ddd6", borderRadius: 14, background: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,.06)", color: "#1a1a18", transition: "all .2s ease" }}
          />
          <svg style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", opacity: 0.4 }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a18" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
          {query && <button onClick={() => { setQuery(""); setAiResults(null); }} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,.06)", border: "none", borderRadius: "50%", width: 28, height: 28, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#666" }}>{"\u2715"}</button>}
        </div>
        {isAiSearching && <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, paddingLeft: 4 }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1E5A46", animation: "pulse 1s ease-in-out infinite" }} /><span style={{ fontSize: 12, color: "#888" }}>AI is thinking...</span></div>}
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "16px 24px 60px" }}>
        {query && displayResults.length > 0 && (
          <div style={{ marginTop: 8 }}>
            <p style={{ fontSize: 12, color: "#888", marginBottom: 10, fontWeight: 500 }}>
              {displayResults.length} result{displayResults.length !== 1 ? "s" : ""}
              {aiResults && aiResults.length > 0 && <span style={{ color: "#1E5A46" }}> &middot; AI-enhanced</span>}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {displayResults.map((r, i) => (
                <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="result-card" style={{ animationDelay: (i * 0.04) + "s", background: "#fff", border: "1px solid #e8e5de", borderRadius: 12, padding: "14px 18px", display: "block" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ fontSize: 18, lineHeight: 1, marginTop: 2, flexShrink: 0 }}>{r.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 3 }}>
                        <span style={{ fontSize: 15, fontWeight: 600, color: "#1E5A46", lineHeight: 1.3 }}>{r.title}</span>
                        <AccessBadge access={r.access} />
                        {r.aiSuggested && <span style={{ fontSize: 10, color: "#888", background: "#f0f0ec", padding: "1px 6px", borderRadius: 4 }}>{"\u2728"} AI</span>}
                      </div>
                      <p style={{ fontSize: 13, color: "#666", lineHeight: 1.4 }}>{r.desc}</p>
                      <span style={{ fontSize: 11, color: "#aaa", marginTop: 4, display: "block" }}>{r.category}</span>
                    </div>
                    <svg style={{ flexShrink: 0, opacity: 0.25, marginTop: 4 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7" /><path d="M7 7h10v10" /></svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {query && displayResults.length === 0 && !isAiSearching && (
          <div style={{ textAlign: "center", padding: "36px 20px", animation: "fadeUp .3s ease-out" }}>
            <span style={{ fontSize: 28, display: "block", marginBottom: 10 }}>{"\u{1F914}"}</span>
            <p style={{ fontSize: 15, color: "#666", marginBottom: 6 }}>No matches for &ldquo;<strong>{query}</strong>&rdquo;</p>
            <p style={{ fontSize: 13, color: "#999", marginBottom: 16 }}>Try different keywords, or browse categories below.</p>
            <a href={"https://www.speechpathologyaustralia.org.au/Public/Public/Search.aspx?SearchTerms=" + encodeURIComponent(query)} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#1E5A46", color: "#fff", padding: "10px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600 }}>Search on SPA website &rarr;</a>
          </div>
        )}

        {!query && !browsing && (
          <div style={{ animation: "fadeUp .3s ease-out" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, color: "#888", fontWeight: 600 }}>My state:</span>
              {STATES.map((s) => (
                <button key={s} className="state-btn" onClick={() => setStateFilter(s)} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 12, fontWeight: 500, background: stateFilter === s ? "#1E5A46" : "rgba(30,90,70,.08)", color: stateFilter === s ? "#fff" : "#1E5A46" }}>{s}</button>
              ))}
            </div>

            <p style={{ fontSize: 12, color: "#888", fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase", marginBottom: 10 }}>Popular searches</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 28 }}>
              {QUICK_LINKS.map((ql, i) => (
                <button key={i} className="quick-chip" onClick={() => handleQuickLink(ql.query)} style={{ background: "rgba(30,90,70,.08)", color: "#1E5A46", border: "none", borderRadius: 20, padding: "7px 14px", fontSize: 13, fontWeight: 500, fontFamily: "inherit" }}>{ql.label}</button>
              ))}
            </div>

            <p style={{ fontSize: 12, color: "#888", fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase", marginBottom: 14 }}>What are you trying to do?</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 10 }}>
              {SPA_KNOWLEDGE.map((cat, i) => (
                <div key={i} className="cat-card" onClick={() => { setBrowsing(true); setFocusedCategory(cat.category); }} style={{ animation: "fadeUp .3s ease-out " + (i * 0.04) + "s both", background: "#fff", border: "1px solid #e8e5de", borderRadius: 12, padding: "16px 18px" }}>
                  <span style={{ fontSize: 22, display: "block", marginBottom: 6 }}>{cat.icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18", lineHeight: 1.3, display: "block" }}>{cat.category}</span>
                  <span style={{ display: "block", fontSize: 12, color: "#888", marginTop: 3, lineHeight: 1.4, fontStyle: "italic" }}>{cat.taskLabel}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {browsing && focusedCategory && (
          <div style={{ animation: "fadeUp .25s ease-out" }}>
            <button onClick={() => { setBrowsing(false); setFocusedCategory(null); }} style={{ background: "none", border: "none", color: "#1E5A46", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5, marginBottom: 14, padding: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>
              All categories
            </button>
            {SPA_KNOWLEDGE.filter((c) => c.category === focusedCategory).map((cat) => (
              <div key={cat.category}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 26 }}>{cat.icon}</span>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a1a18", fontFamily: "'Playfair Display',Georgia,serif" }}>{cat.category}</h2>
                </div>
                <p style={{ fontSize: 13, color: "#888", marginBottom: 16, fontStyle: "italic" }}>{cat.taskLabel}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {filterByState(cat.items).map((item, j) => (
                    <a key={j} href={item.url} target="_blank" rel="noopener noreferrer" className="browse-link" style={{ animation: "slideIn .2s ease-out " + (j * 0.03) + "s both", display: "block", padding: "12px 14px", borderRadius: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 2 }}>
                            <span style={{ fontSize: 14, fontWeight: 600, color: "#1E5A46" }}>{item.title}</span>
                            <AccessBadge access={item.access} />
                          </div>
                          <p style={{ fontSize: 12, color: "#888", lineHeight: 1.4 }}>{item.desc}</p>
                        </div>
                        <svg style={{ flexShrink: 0, opacity: 0.2, marginLeft: 10 }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7" /><path d="M7 7h10v10" /></svg>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 44, paddingTop: 20, borderTop: "1px solid #e8e5de", textAlign: "center" }}>
          <p style={{ fontSize: 11, color: "#aaa", lineHeight: 1.6 }}>
            Community tool &mdash; not officially affiliated with Speech Pathology Australia.
            <br />{"\u{1F513}"} = publicly accessible &nbsp;|&nbsp; {"\u{1F512}"} = may require SPA member login
          </p>
        </div>
      </div>

      <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
    </div>
  );
}
