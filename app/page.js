"use client";

import { useState, useRef, useEffect } from "react";

/* ────────────────────────────────────────────
   SPA Site Knowledge Base — VERIFIED URLs
   ──────────────────────────────────────────── */
const SPA_KNOWLEDGE = [
  {
    category: "CPD & Professional Development",
    icon: "📚",
    items: [
      { title: "Upcoming Live Events", url: "https://www.speechpathologyaustralia.org.au/Public/Shared_Content/Events/PEL.aspx", desc: "Browse and register for live professional education events across all states." },
      { title: "On Demand Learning Hub", url: "https://www.speechpathologyaustralia.org.au/Public/Shared_Content/Events/On-Demand-Learning.aspx", desc: "Self-paced online CPD courses you can complete anytime." },
      { title: "Member Events", url: "https://www.speechpathologyaustralia.org.au/Public/Shared_Content/Events/Member-Event-Listing.aspx", desc: "Professional education events for SPA members." },
      { title: "SPA 2026 Conference (Gold Coast)", url: "https://www.speechpathologyaustralia.org.au/Public/Public/CPD-events/SPA-conference/2026/Home.aspx", desc: "Annual national conference — program, registration, and sponsorship info." },
      { title: "CPD Requirements", url: "https://www.speechpathologyaustralia.org.au/Public/Public/Become/Aus-trained-apps/CPD-Requirements.aspx", desc: "Minimum 20 hours/year — details on cultural learning, professional support, and logging." },
      { title: "Cultural Learning (CPD)", url: "https://www.speechpathologyaustralia.org.au/Public/Public/Become/Certification-Program/Culture-learning.aspx", desc: "Requirements for the 2-hour cultural learning component of CPD." },
    ],
  },
  {
    category: "Membership & CPSP",
    icon: "🪪",
    items: [
      { title: "Join SPA — Certified Practising Member", url: "https://www.speechpathologyaustralia.org.au/Public/Public/Become/Aus-trained-apps/Certified-Practising-member.aspx", desc: "Eligibility, application, and requirements for CPSP membership." },
      { title: "Non-Member Certified Practitioner", url: "https://www.speechpathologyaustralia.org.au/Public/Public/join/Aus-trained-apps/Non-Member-Certified-Practitioner.aspx", desc: "CPSP status without full SPA membership — for Medicare provider numbers." },
      { title: "Find a Speech Pathologist", url: "https://www.speechpathologyaustralia.org.au/Public/Shared_Content/Smart-Suite/Smart-Maps/Public/Find-a-Speech-Pathologist.aspx", desc: "Public directory to find a CPSP near you — searchable map." },
      { title: "Telepractice Provider Listing", url: "https://www.speechpathologyaustralia.org.au/Public/Shared_Content/TelePractice/Telepractice-Listing.aspx", desc: "Find a speech pathologist offering online/telehealth services." },
      { title: "Student Membership", url: "https://www.speechpathologyaustralia.org.au/SPAweb/Membership/Students/SPAweb/Members/Students/Students.aspx", desc: "Benefits and application for student members." },
    ],
  },
  {
    category: "Clinical Resources & Guidelines",
    icon: "🩺",
    items: [
      { title: "Position Statements", url: "https://www.speechpathologyaustralia.org.au/Public/Public/About-Us/Our-organisation/Position-statements/Position-statements.aspx", desc: "Official SPA positions on clinical topics (telehealth, dysphagia, literacy, autism, etc)." },
      { title: "Clinical Guidelines (Members)", url: "https://www.speechpathologyaustralia.org.au/SPAweb/Members/Clinical_Guidelines/spaweb/Members/Clinical_Guidelines/Clinical_Guidelines.aspx", desc: "Evidence-based practice guidelines — AAC, autism, dysphagia, education, justice." },
      { title: "SPA Core Documents", url: "https://www.speechpathologyaustralia.org.au/spaweb/About_Us/SPA_Documents/SPA_Documents.aspx", desc: "Parameters of Practice, Scope of Practice, Professional Standards, and annual reports." },
      { title: "Communication Milestones", url: "https://www.speechpathologyaustralia.org.au/Public/Public/Communication/Communication_Milestones.aspx", desc: "Talking and understanding milestones for children aged 1–5 years." },
      { title: "Fact Sheets", url: "https://www.speechpathologyaustralia.org.au/Public/Public/Communication/Fact_Sheets.aspx", desc: "Plain-language fact sheets about communication disorders and speech pathology." },
      { title: "Resource Guide", url: "https://www.speechpathologyaustralia.org.au/Public/Public/About-Us/Pubs%20and%20advertise/Resource-guide.aspx", desc: "Annual directory of speech pathology products, tools, and service providers." },
    ],
  },
  {
    category: "NDIS & Funding",
    icon: "📋",
    items: [
      { title: "Communication Disability & the NDIS", url: "https://www.speechpathologyaustralia.org.au/Communication_Hub/Communication_Disability/Communication_disability_and_the_NDIS", desc: "Info for consumers — eligibility, applications, and what NDIS funds for communication." },
      { title: "NDIS Therapy Support Guidelines", url: "https://www.speechpathologyaustralia.org.au/Public/Members/News-and-publications/Articles/2025/10-October/new-ndis-therapy-support-guidelines.aspx", desc: "CPSP now required for all NDIS therapy supports — key changes explained." },
      { title: "Rebates & Funded Programs", url: "https://www.speechpathologyaustralia.org.au/SPAweb/Resources_for_Speech_Pathologists/Medicare/SPAweb/Resources_for_Speech_Pathologists/Medicare/Medicare.aspx", desc: "Medicare CDM items, DVA, private health fund rebates, and other funding sources." },
    ],
  },
  {
    category: "Practice & Employment",
    icon: "💼",
    items: [
      { title: "Private Practice Resources", url: "https://www.speechpathologyaustralia.org.au/SPAweb/Resources_for_Speech_Pathologists/Private_Practice/SPAweb/Resources_for_Speech_Pathologists/Private_Practice/Private_Practice.aspx", desc: "Starting, running, and growing a speech pathology private practice." },
      { title: "Employment Hub", url: "https://www.speechpathologyaustralia.org.au/SPAweb/Resources_for_Speech_Pathologists/Employment/SPAweb/Resources_for_Speech_Pathologists/Employment/Employment.aspx", desc: "Job boards, career resources, and information for employers." },
      { title: "Telehealth Resources", url: "https://www.speechpathologyaustralia.org.au/SPAweb/Resources_for_Speech_Pathologists/Telehealth/SPAweb/Resources_for_Speech_Pathologists/Telehealth/Telehealth.aspx", desc: "Guidance and resources for delivering speech pathology via telehealth." },
      { title: "Allied Health Assistants", url: "https://www.speechpathologyaustralia.org.au/SPAweb/Resources_for_Speech_Pathologists/Support_Workers/SPAweb/Resources_for_Speech_Pathologists/Support_Workers/Support_Workers.aspx", desc: "Guidelines on working with and delegating to support workers." },
      { title: "Employing a Speech Pathologist", url: "https://www.speechpathologyaustralia.org.au/Public/Public/services/For-employers/Employing-a-Speech-Pathologist.aspx", desc: "Information for employers on hiring and contracting speech pathologists." },
    ],
  },
  {
    category: "For the Public",
    icon: "👋",
    items: [
      { title: "What Speech Pathologists Do", url: "https://www.speechpathologyaustralia.org.au/Public/Public/services/About-speech-pathologists/What-speech-pathologists-do.aspx", desc: "Overview of the profession — who they help and how." },
      { title: "What to Expect", url: "https://www.speechpathologyaustralia.org.au/Public/Public/services/Choose-a-speech-pathologist/What-to-expect.aspx", desc: "What happens when you see a speech pathologist — assessment, therapy, fees." },
      { title: "Seeing a Speech Pathologist", url: "https://www.speechpathologyaustralia.org.au/SPAweb/Resources_for_the_Public/Seeing_a_Speech_Pathologist/SPAweb/Resources_for_the_Pubic/Seeing_a_Speech_Pathologist/Seeing_a_Speech_Pathologist.aspx", desc: "How to find, choose, and access speech pathology services including fees and funding." },
      { title: "Communication Hub", url: "https://www.speechpathologyaustralia.org.au/Communication_Hub", desc: "Public-facing info hub about communication disorders, milestones, and support." },
    ],
  },
  {
    category: "About SPA & Contact",
    icon: "🏛️",
    items: [
      { title: "About SPA", url: "https://www.speechpathologyaustralia.org.au/Public/Public/About-Us/About-SPA.aspx", desc: "History, mission, strategic plan, and governance of the national association." },
      { title: "Contact SPA", url: "https://www.speechpathologyaustralia.org.au/SPAweb/Contact_Us/SPAweb/Contact_Us/Contact_Us.aspx", desc: "Phone: (03) 9642 4899 | Email: office@speechpathologyaustralia.org.au" },
      { title: "News & Articles", url: "https://www.speechpathologyaustralia.org.au/SPAweb/About_us/News/SPAweb/About_Us/News/News.aspx", desc: "Latest news, media releases, and announcements from SPA." },
      { title: "Reconciliation", url: "https://www.speechpathologyaustralia.org.au/SPAweb/About_us/Reconciliation/SPAweb/About_Us/Reconciliation/Reconciliation.aspx", desc: "SPA's Reconciliation Action Plan and Response to Racism." },
      { title: "Speech Pathology 2030", url: "https://www.speechpathologyaustralia.org.au/SPAweb/About_us/speechpath2030/SPAweb/About_Us/Speech_Pathology_2030/Speech_Pathology_2030.aspx", desc: "SPA's landmark project envisioning the future of the profession." },
      { title: "SPA Website Search", url: "https://www.speechpathologyaustralia.org.au/Public/Public/Search.aspx", desc: "Can't find it? Use the SPA site's own search as a fallback." },
    ],
  },
  {
    category: "Students & New Grads",
    icon: "🎓",
    items: [
      { title: "Becoming a Speech Pathologist", url: "https://www.speechpathologyaustralia.org.au/Public/Public/Become-a-speech-pathologist/Become-a-Speech-Pathologist.aspx", desc: "University courses, accreditation, and career information." },
      { title: "Accredited University Programs", url: "https://www.speechpathologyaustralia.org.au/SPAweb/Resources_for_Speech_Pathologists/Accreditation/SPAweb/Resources_for_Speech_Pathologists/Accreditation/Accreditation.aspx", desc: "List of accredited speech pathology degrees in Australia." },
      { title: "New Graduate Info", url: "https://speechpathologyaustralia.org.au/Common/Uploaded%20files/Smart%20Suite/Smart%20Library/eeb4217b-e5b5-4252-824d-e17d8f7281b7/20231011%20Information%20for%20new%20graduates_Final.pdf", desc: "PDF guide — provisional certification, CPD, ethics and EBP modules." },
      { title: "Return to Practice Program", url: "https://www.speechpathologyaustralia.org.au/Common/Uploaded%20files/Smart%20Suite/Smart%20Library/a2542c63-eb7e-4312-aca4-5555c445c123/2025_1002_SPA_RtP_Guide.pdf", desc: "Pathway for speech pathologists returning after a break from practice." },
    ],
  },
];

const ALL_ITEMS = SPA_KNOWLEDGE.flatMap((cat) =>
  cat.items.map((item) => ({ ...item, category: cat.category, icon: cat.icon }))
);

/* ────────────────────────────────────────────
   Search engine with synonym expansion
   ──────────────────────────────────────────── */
const SYNONYMS = {
  cpd: ["professional development", "workshop", "training", "learning", "course", "event", "hours"],
  ndis: ["disability", "funding", "scheme", "participant", "therapy support"],
  membership: ["member", "join", "renew", "fees", "application"],
  cpsp: ["certified", "practising", "certification", "renewal", "provider number"],
  telehealth: ["online", "virtual", "remote", "telepractice", "teletherapy"],
  job: ["employment", "career", "hiring", "work", "vacancy", "post"],
  child: ["paediatric", "pediatric", "kids", "children", "developmental"],
  milestone: ["development", "communication", "talking", "understanding", "age"],
  dysphagia: ["swallowing", "feeding", "eating", "drinking"],
  "private practice": ["business", "practice", "self-employed", "sole trader"],
  ethics: ["professional standards", "code of conduct", "complaint"],
  conference: ["spa 2026", "gold coast", "annual conference"],
  overseas: ["international", "skills assessment", "mutual recognition", "migration"],
  find: ["search", "directory", "locate", "near me", "map"],
  guidelines: ["clinical", "evidence", "best practice", "position statement"],
  medicare: ["rebate", "provider number", "cdm", "bulk bill", "health fund", "dva"],
  student: ["university", "course", "degree", "graduate", "accredited"],
  returning: ["re-enter", "re-entering", "comeback", "break from practice", "return to practice"],
  autism: ["autistic", "asd", "social communication"],
  aac: ["augmentative", "alternative communication", "communication device", "complex communication"],
  literacy: ["reading", "writing", "spelling", "phonology"],
  cultural: ["aboriginal", "torres strait", "indigenous", "reconciliation"],
};

function scoreMatch(item, terms) {
  let score = 0;
  const haystack = `${item.title} ${item.desc} ${item.category}`.toLowerCase();
  for (const term of terms) {
    if (haystack.includes(term)) {
      score += item.title.toLowerCase().includes(term) ? 10 : 3;
    }
    for (const [key, syns] of Object.entries(SYNONYMS)) {
      if (term.includes(key) || key.includes(term)) {
        if (haystack.includes(key)) score += 6;
        for (const s of syns) if (haystack.includes(s)) score += 4;
      }
      for (const s of syns) {
        if (term.includes(s) || s.includes(term)) {
          if (haystack.includes(key)) score += 5;
        }
      }
    }
  }
  return score;
}

function search(query) {
  if (!query.trim()) return [];
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  return ALL_ITEMS.map((item) => ({ ...item, score: scoreMatch(item, terms) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
}

/* ────────────────────────────────────────────
   Quick-link chips
   ──────────────────────────────────────────── */
const QUICK_LINKS = [
  { label: "Find a Speechie", query: "find speech pathologist" },
  { label: "CPD Events", query: "cpd events" },
  { label: "NDIS Resources", query: "ndis" },
  { label: "Join / CPSP", query: "cpsp join membership" },
  { label: "Milestones", query: "communication milestones child" },
  { label: "Telehealth", query: "telehealth" },
  { label: "Private Practice", query: "private practice" },
  { label: "Conference 2026", query: "conference 2026" },
];

/* ────────────────────────────────────────────
   Component
   ──────────────────────────────────────────── */
export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [browsing, setBrowsing] = useState(false);
  const [focusedCategory, setFocusedCategory] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setResults(search(query));
  }, [query]);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleQuickLink = (q) => {
    setQuery(q);
    setBrowsing(false);
    setFocusedCategory(null);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FAFAF7",
        fontFamily: "'Source Sans 3', 'Source Sans Pro', system-ui, sans-serif",
      }}
    >
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideIn{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}
        .search-input:focus{outline:none;box-shadow:0 0 0 3px rgba(30,90,70,.15),0 4px 24px rgba(0,0,0,.08)}
        .result-card{animation:fadeUp .25s ease-out both;transition:all .2s ease}
        .result-card:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(0,0,0,.1)}
        .quick-chip{transition:all .15s ease;cursor:pointer}
        .quick-chip:hover{background:#1E5A46!important;color:#fff!important;transform:translateY(-1px)}
        .cat-card{transition:all .2s ease;cursor:pointer}
        .cat-card:hover{transform:translateY(-3px);box-shadow:0 12px 40px rgba(0,0,0,.1)}
        .browse-link{transition:all .15s ease;text-decoration:none}
        .browse-link:hover{background:rgba(30,90,70,.06);transform:translateX(2px)}
        a{text-decoration:none;color:inherit}
      `}</style>

      {/* ── Header ── */}
      <header
        style={{
          background: "linear-gradient(135deg,#1E5A46 0%,#2A7A5E 50%,#1B4F3E 100%)",
          padding: "40px 24px 48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.06,
            backgroundImage:
              "radial-gradient(circle at 20% 50%,#fff 1px,transparent 1px),radial-gradient(circle at 80% 20%,#fff 1px,transparent 1px)",
            backgroundSize: "60px 60px,40px 40px",
          }}
        />
        <div style={{ maxWidth: 720, margin: "0 auto", position: "relative" }}>
          <span
            style={{
              fontSize: 13,
              letterSpacing: ".08em",
              color: "rgba(255,255,255,.7)",
              fontWeight: 500,
              textTransform: "uppercase",
              display: "block",
              marginBottom: 6,
            }}
          >
            Speech Pathology Australia
          </span>
          <h1
            style={{
              fontFamily: "'Playfair Display',Georgia,serif",
              fontSize: "clamp(28px,5vw,38px)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.2,
              marginBottom: 8,
            }}
          >
            Quick Finder
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,.75)",
              fontSize: 16,
              fontWeight: 300,
              maxWidth: 440,
              lineHeight: 1.5,
            }}
          >
            Skip the maze. Find exactly what you need on the SPA website.
          </p>
        </div>
      </header>

      {/* ── Search Bar ── */}
      <div
        style={{
          maxWidth: 720,
          margin: "-24px auto 0",
          padding: "0 24px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ position: "relative" }}>
          <input
            ref={inputRef}
            className="search-input"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setBrowsing(false);
              setFocusedCategory(null);
            }}
            placeholder="Try: 'CPD events', 'NDIS', 'renew CPSP', 'milestones'…"
            style={{
              width: "100%",
              padding: "18px 20px 18px 52px",
              fontSize: 17,
              fontFamily: "inherit",
              border: "1.5px solid #e0ddd6",
              borderRadius: 14,
              background: "#fff",
              boxShadow: "0 4px 20px rgba(0,0,0,.06)",
              color: "#1a1a18",
              transition: "all .2s ease",
            }}
          />
          <svg
            style={{
              position: "absolute",
              left: 18,
              top: "50%",
              transform: "translateY(-50%)",
              opacity: 0.4,
            }}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1a1a18"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{
                position: "absolute",
                right: 14,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,.06)",
                border: "none",
                borderRadius: "50%",
                width: 28,
                height: 28,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                color: "#666",
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "20px 24px 60px" }}>
        {/* Results */}
        {query && results.length > 0 && (
          <div style={{ marginTop: 8 }}>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 12, fontWeight: 500 }}>
              {results.length} result{results.length !== 1 ? "s" : ""} found
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {results.map((r, i) => (
                <a
                  key={i}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="result-card"
                  style={{
                    animationDelay: `${i * 0.05}s`,
                    background: "#fff",
                    border: "1px solid #e8e5de",
                    borderRadius: 12,
                    padding: "16px 20px",
                    display: "block",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <span style={{ fontSize: 20, lineHeight: 1, marginTop: 2, flexShrink: 0 }}>
                      {r.icon}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}
                      >
                        <span
                          style={{ fontSize: 16, fontWeight: 600, color: "#1E5A46", lineHeight: 1.3 }}
                        >
                          {r.title}
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            color: "#888",
                            background: "#f4f3ef",
                            padding: "2px 8px",
                            borderRadius: 6,
                            fontWeight: 500,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {r.category}
                        </span>
                      </div>
                      <p style={{ fontSize: 14, color: "#666", lineHeight: 1.5, marginTop: 4 }}>
                        {r.desc}
                      </p>
                    </div>
                    <svg
                      style={{ flexShrink: 0, opacity: 0.3, marginTop: 4 }}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* No results */}
        {query && results.length === 0 && (
          <div
            style={{ textAlign: "center", padding: "40px 20px", animation: "fadeUp .3s ease-out" }}
          >
            <span style={{ fontSize: 32, display: "block", marginBottom: 12 }}>🤔</span>
            <p style={{ fontSize: 16, color: "#666", marginBottom: 8 }}>
              No matches for &ldquo;<strong>{query}</strong>&rdquo;
            </p>
            <p style={{ fontSize: 14, color: "#999", marginBottom: 16 }}>
              Try different keywords, or browse categories below.
            </p>
            <a
              href={`https://www.speechpathologyaustralia.org.au/Public/Public/Search.aspx?SearchTerms=${encodeURIComponent(query)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                background: "#1E5A46",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Search on SPA website →
            </a>
          </div>
        )}

        {/* Quick links + categories */}
        {!query && !browsing && (
          <div style={{ animation: "fadeUp .3s ease-out" }}>
            <p
              style={{
                fontSize: 13,
                color: "#888",
                fontWeight: 600,
                letterSpacing: ".04em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Popular searches
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
              {QUICK_LINKS.map((ql, i) => (
                <button
                  key={i}
                  className="quick-chip"
                  onClick={() => handleQuickLink(ql.query)}
                  style={{
                    background: "rgba(30,90,70,.08)",
                    color: "#1E5A46",
                    border: "none",
                    borderRadius: 20,
                    padding: "8px 16px",
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "inherit",
                  }}
                >
                  {ql.label}
                </button>
              ))}
            </div>

            <p
              style={{
                fontSize: 13,
                color: "#888",
                fontWeight: 600,
                letterSpacing: ".04em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Browse by category
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
                gap: 10,
              }}
            >
              {SPA_KNOWLEDGE.map((cat, i) => (
                <div
                  key={i}
                  className="cat-card"
                  onClick={() => {
                    setBrowsing(true);
                    setFocusedCategory(cat.category);
                  }}
                  style={{
                    animation: `fadeUp .3s ease-out ${i * 0.04}s both`,
                    background: "#fff",
                    border: "1px solid #e8e5de",
                    borderRadius: 12,
                    padding: "16px 18px",
                  }}
                >
                  <span style={{ fontSize: 24, display: "block", marginBottom: 8 }}>{cat.icon}</span>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#1a1a18", lineHeight: 1.3 }}>
                    {cat.category}
                  </span>
                  <span style={{ display: "block", fontSize: 12, color: "#999", marginTop: 4 }}>
                    {cat.items.length} resources
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category detail */}
        {browsing && focusedCategory && (
          <div style={{ animation: "fadeUp .25s ease-out" }}>
            <button
              onClick={() => {
                setBrowsing(false);
                setFocusedCategory(null);
              }}
              style={{
                background: "none",
                border: "none",
                color: "#1E5A46",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 16,
                padding: 0,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <path d="m12 19-7-7 7-7" />
              </svg>
              Back to categories
            </button>
            {SPA_KNOWLEDGE.filter((c) => c.category === focusedCategory).map((cat) => (
              <div key={cat.category}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <span style={{ fontSize: 28 }}>{cat.icon}</span>
                  <h2
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: "#1a1a18",
                      fontFamily: "'Playfair Display',Georgia,serif",
                    }}
                  >
                    {cat.category}
                  </h2>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {cat.items.map((item, j) => (
                    <a
                      key={j}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="browse-link"
                      style={{
                        animation: `slideIn .2s ease-out ${j * 0.03}s both`,
                        display: "block",
                        padding: "14px 16px",
                        borderRadius: 10,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <span style={{ fontSize: 15, fontWeight: 600, color: "#1E5A46" }}>
                            {item.title}
                          </span>
                          <p style={{ fontSize: 13, color: "#888", marginTop: 2, lineHeight: 1.4 }}>
                            {item.desc}
                          </p>
                        </div>
                        <svg
                          style={{ flexShrink: 0, opacity: 0.25, marginLeft: 12 }}
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7 17L17 7" />
                          <path d="M7 7h10v10" />
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: "1px solid #e8e5de",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 12, color: "#aaa", lineHeight: 1.6 }}>
            Community tool — not officially affiliated with Speech Pathology Australia.
            <br />
            Links point to speechpathologyaustralia.org.au. Some pages may require member login.
          </p>
        </div>
      </div>
    </div>
  );
}
