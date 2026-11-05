import { FormEvent, useState } from "react"
import SharePointKitDesign from "./SharePointKitDesign"

type IconName = "apps" | "arrow" | "book" | "calendar" | "car" | "chevron" | "directory" | "document" | "food" | "globe" | "help" | "home" | "laptop" | "mail" | "menu" | "people" | "search" | "shield" | "spark" | "user"

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    apps: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </>
    ),
    book: (
      <>
        <path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v18H7.5A3.5 3.5 0 0 0 4 23V5.5Z" />
        <path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H13v18h3.5A3.5 3.5 0 0 1 20 23V5.5Z" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </>
    ),
    car: (
      <>
        <path d="m5 17-2-2 2-6h14l2 6-2 2H5Z" />
        <path d="m7 9 2-4h6l2 4M7 17v2M17 17v2M7 13h.01M17 13h.01" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    directory: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 21v-2a6 6 0 0 1 12 0v2M16 4h5M16 8h5M17 12h4" />
      </>
    ),
    document: (
      <>
        <path d="M6 2h8l4 4v16H6z" />
        <path d="M14 2v5h5M9 12h6M9 16h6" />
      </>
    ),
    food: (
      <>
        <path d="M7 3v8M4 3v5a3 3 0 0 0 6 0V3M7 11v10M17 3v18M17 3c3 2 4 6 0 10" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </>
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9a2.5 2.5 0 1 1 3.3 2.37c-.8.3-.8 1.13-.8 1.63M12 17h.01" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v11h14V10M9 21v-7h6v7" />
      </>
    ),
    laptop: (
      <>
        <rect x="4" y="4" width="16" height="12" rx="1" />
        <path d="M2 20h20M9 20h6" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    people: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 21v-2a6 6 0 0 1 12 0v2M16 4.5a3 3 0 0 1 0 5.8M19 21v-2a6 6 0 0 0-3-5.2" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-5" />
      </>
    ),
    spark: (
      <path d="m12 3 1.4 5.1L18 6l-2.1 4.6L21 12l-5.1 1.4L18 18l-4.6-2.1L12 21l-1.4-5.1L6 18l2.1-4.6L3 12l5.1-1.4L6 6l4.6 2.1L12 3Z" />
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
  }
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

const allStaffApps = [
  ["HCM", "Leave, payslips & profile", "people"],
  ["Webmail", "Microsoft Outlook", "mail"],
  ["Staff Directory", "Find people & teams", "directory"],
  ["eLearning", "Courses & compliance", "book"],
  ["e-Form", "Common staff forms", "document"],
  ["IT Service Desk", "Get technical support", "laptop"],
  ["Room Booking", "Find meeting spaces", "calendar"],
  ["My Benefits", "Benefits & wellness", "spark"],
] as const

const news = [
  {
    date: "18 NOV",
    dept: "Corporate Affairs",
    title: "HTHK celebrates 40 years of connecting Hong Kong",
    accent: "#007bc7",
  },
  {
    date: "14 NOV",
    dept: "Human Resources",
    title: "2026 Annual Dinner: registration is now open",
    accent: "#ff6600",
    badge: "NEW",
  },
  {
    date: "11 NOV",
    dept: "Information Security",
    title: "Action required: complete annual cyber security training",
    accent: "#255a00",
  },
  {
    date: "06 NOV",
    dept: "Administration",
    title: "Updated office shuttle schedule from 1 December",
    accent: "#c54601",
  },
]

const essentials = [
  ["Shuttle bus", "car"],
  ["Cafeteria menu", "food"],
  ["Staff Jetso", "spark"],
  ["Leave calendar", "calendar"],
  ["Useful forms", "document"],
] as const

function HthkTaskDesign() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [searchMessage, setSearchMessage] = useState("")
  const [likedPost, setLikedPost] = useState(false)

  function search(event: FormEvent) {
    event.preventDefault()
    setSearchMessage(
      query.trim()
        ? `AI summary ready for “${query.trim()}” · 8 trusted HTHK sources found`
        : "Ask about a person, policy, form, application or news topic.",
    )
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <div className="suitebar">
        <div className="suitebar__inner">
          <button className="waffle" aria-label="Microsoft 365 app launcher">
            <Icon name="apps" size={18} />
          </button>
          <span className="suitebar__brand">Microsoft 365</span>
          <span className="suitebar__divider" />
          <span>HTHK</span>
          <div className="suitebar__spacer" />
          <a href="#help">Help</a>
          <button className="avatar" aria-label="Open profile for Alex Chan">
            AC
          </button>
        </div>
      </div>

      <header className="site-header">
        <div className="site-header__inner">
          <a className="brand" href="#" aria-label="HTHK Intranet home">
            <span className="brand-mark" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
            <span className="brand-copy">
              <strong>HTHK</strong>
              <small>Hutchison Telecom Hong Kong</small>
            </span>
            <span className="brand-rule" />
            <span className="site-name">Intranet</span>
          </a>
          <div className="header-actions">
            <a href="#directory">
              <Icon name="directory" size={18} /> Staff Directory
            </a>
            <button
              className="menu-button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="hub-navigation"
            >
              <Icon name="menu" />
              <span>Menu</span>
            </button>
          </div>
        </div>
        <div className="search-wrap">
          <form className="search" onSubmit={search} role="search">
            <Icon name="search" size={21} />
            <label className="sr-only" htmlFor="site-search">
              Search the HTHK intranet
            </label>
            <input
              id="site-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask HTHK AI about people, policies, forms or news"
            />
            <button type="submit">
              <Icon name="spark" size={16} /> Ask AI
            </button>
          </form>
          {searchMessage && (
            <div className="search-message" role="status">
              <Icon name="spark" size={18} />
              <span>
                <strong>AI-powered search</strong>
                {searchMessage}
              </span>
              <a href="#search-results">View answer and sources</a>
            </div>
          )}
        </div>
        <nav
          id="hub-navigation"
          className={`hub-nav ${menuOpen ? "hub-nav--open" : ""}`}
          aria-label="Hub navigation"
        >
          <div className="hub-nav__inner">
            <a className="active" href="#">
              <Icon name="home" size={17} /> Home
            </a>
            <a href="#departments">Departments</a>
            <a href="#news">News</a>
            <a href="#policies">Policies & forms</a>
            <a href="#people">People & culture</a>
            <a href="#technology">Technology</a>
            <span className="nav-spacer" />
            <a href="#privacy">Data Privacy</a>
            <a href="#sitemap">Site map</a>
            <a href="https://www.three.com.hk/">Three.com.hk</a>
          </div>
        </nav>
      </header>

      <main id="main">
        <div className="welcome content-width">
          <div>
            <p className="eyebrow">For you · Good morning, Alex</p>
            <h1>HTHK staff home</h1>
            <p>
              Your personalised tools, updates and conversations—available on
              desktop and mobile.
            </p>
          </div>
        </div>

        <section className="task-section">
          <div className="task-grid content-width">
            <div className="apps-panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Start here</p>
                  <h2>Online applications</h2>
                </div>
              </div>
              <div className="apps-grid">
                {allStaffApps.map(([title, description, icon]) => (
                  <a
                    className="app-link"
                    href={`#${title.toLowerCase().replaceAll(" ", "-")}`}
                    key={title}
                  >
                    <span className="app-icon">
                      <Icon name={icon as IconName} />
                    </span>
                    <span>
                      <strong>{title}</strong>
                      <small>{description}</small>
                    </span>
                    <Icon name="chevron" size={17} />
                  </a>
                ))}
              </div>
              <a className="text-link" href="#all-apps">
                View all online applications <Icon name="arrow" size={17} />
              </a>
            </div>

            <article className="hero">
              <img
                src="/assets/hthk/hong-kong-harbour.jpg"
                alt="Victoria Harbour and Hong Kong skyline"
              />
              <div className="hero__shade" />
              <div className="hero__content">
                <span className="hero__tag">FEATURED NEWS</span>
                <h2>Connecting Hong Kong for 40 years</h2>
                <p>
                  Celebrating four decades of innovation, service and the people
                  who made it possible.
                </p>
                <a className="button button--orange" href="#featured-story">
                  Read the anniversary story <Icon name="arrow" size={18} />
                </a>
              </div>
            </article>
          </div>
        </section>

        <section className="essentials-section content-width">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Everyday shortcuts</p>
              <h2>Staff essentials</h2>
            </div>
          </div>
          <div className="essentials">
            {essentials.map(([label, icon]) => (
              <a
                href={`#${label.toLowerCase().replaceAll(" ", "-")}`}
                key={label}
              >
                <Icon name={icon as IconName} />
                <span>{label}</span>
                <Icon name="chevron" size={16} />
              </a>
            ))}
          </div>
        </section>

        <section className="news-section" id="news">
          <div className="content-width news-layout">
            <div className="news-main">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Latest across HTHK</p>
                  <h2>What’s hot</h2>
                </div>
                <a className="text-link" href="#all-news">
                  See all news <Icon name="arrow" size={17} />
                </a>
              </div>
              <div className="news-list">
                {news.map((item) => (
                  <a
                    className="news-item"
                    href={`#${item.title.toLowerCase().replaceAll(" ", "-")}`}
                    key={item.title}
                  >
                    <span
                      className="news-date"
                      style={{ borderTopColor: item.accent }}
                    >
                      <strong>{item.date.split(" ")[0]}</strong>
                      <small>{item.date.split(" ")[1]}</small>
                    </span>
                    <span className="news-copy">
                      <span>
                        {item.dept} {item.badge && <b>{item.badge}</b>}
                      </span>
                      <h3>{item.title}</h3>
                    </span>
                    <Icon name="chevron" />
                  </a>
                ))}
              </div>
            </div>
            <aside className="popular" id="policies">
              <p className="eyebrow">Reviewed content repository</p>
              <h2>Trusted policies & forms</h2>
              <ul>
                <li>
                  <a href="#employee-handbook">
                    <Icon name="document" />
                    Employee handbook 2026
                  </a>
                </li>
                <li>
                  <a href="#expense">
                    <Icon name="document" />
                    Expense claim form
                  </a>
                </li>
                <li>
                  <a href="#security">
                    <Icon name="shield" />
                    Information security policies
                  </a>
                </li>
                <li>
                  <a href="#hcm-guide">
                    <Icon name="book" />
                    Download HCM user guide
                  </a>
                </li>
                <li>
                  <a href="#weather">
                    <Icon name="document" />
                    Typhoon & rainstorm policy
                  </a>
                </li>
              </ul>
              <a className="button button--blue" href="#documents">
                Browse policies & forms <Icon name="arrow" size={18} />
              </a>
            </aside>
          </div>
        </section>

        <section className="community-section content-width">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Connect with colleagues</p>
              <h2>Community pulse</h2>
            </div>
            <a className="text-link" href="#community">
              View all conversations <Icon name="arrow" size={17} />
            </a>
          </div>
          <div className="community-grid">
            <article>
              <div className="post-author">
                <span>MC</span>
                <div>
                  <strong>Michelle Chan</strong>
                  <small>People & Culture · 2 hours ago</small>
                </div>
              </div>
              <h3>
                Thank you to everyone who joined our community volunteering day.
              </h3>
              <p>
                More than 80 colleagues contributed 240 service hours across
                Hong Kong. View the recap and upcoming opportunities.
              </p>
              <div className="post-actions">
                <button
                  className={likedPost ? "liked" : ""}
                  onClick={() => setLikedPost(!likedPost)}
                  aria-pressed={likedPost}
                >
                  <Icon name="spark" size={17} />
                  {likedPost ? 49 : 48} Appreciate
                </button>
                <a href="#comments">
                  <Icon name="mail" size={17} /> 12 comments
                </a>
              </div>
            </article>
            <article className="frontline-card">
              <span className="frontline-icon">
                <Icon name="people" size={26} />
              </span>
              <div>
                <p className="eyebrow">Frontline ready</p>
                <h3>HTHK in your pocket</h3>
                <p>
                  Mobile-friendly access to rosters, updates, forms and urgent
                  notices wherever your work takes you.
                </p>
                <a className="text-link" href="#mobile-guide">
                  View mobile access guide <Icon name="arrow" size={17} />
                </a>
              </div>
            </article>
          </div>
        </section>

        <section className="departments content-width" id="departments">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Explore the organisation</p>
              <h2>Department sites</h2>
            </div>
          </div>
          <div className="department-grid">
            {[
              ["Corporate Affairs", "#a50000"],
              ["Business", "#c54601"],
              ["Finance & IR", "#007bc7"],
              ["Sustainability", "#255a00"],
              ["Human Resources", "#0058a2"],
              ["Technology", "#007ead"],
            ].map(([name, color]) => (
              <a
                href={`#${name.toLowerCase().replaceAll(" ", "-")}`}
                style={{ "--accent": color } as React.CSSProperties}
                key={name}
              >
                <span>{name}</span>
                <Icon name="arrow" />
              </a>
            ))}
          </div>
        </section>

        <section className="support-strip content-width" id="people">
          <div>
            <span className="support-icon">
              <Icon name="directory" size={27} />
            </span>
            <span>
              <p className="eyebrow">Find a colleague</p>
              <h2>Who are you looking for?</h2>
            </span>
            <a className="button button--blue" href="#directory">
              Open staff directory <Icon name="arrow" size={18} />
            </a>
          </div>
          <div>
            <span className="support-icon support-icon--orange">
              <Icon name="calendar" size={27} />
            </span>
            <span>
              <p className="eyebrow">Next event · 28 Nov</p>
              <h2>Friday wellness workshop</h2>
            </span>
            <a className="text-link" href="#events">
              View events <Icon name="arrow" size={17} />
            </a>
          </div>
        </section>
      </main>

      <footer id="help">
        <div className="footer-main content-width">
          <div>
            <strong>HTHK Intranet</strong>
            <p>
              A scalable SharePoint hub connecting our people, trusted content,
              tools and ideas.
            </p>
          </div>
          <div>
            <h2>Support</h2>
            <a href="#it-help">IT Service Desk</a>
            <a href="#first-aiders">First aiders</a>
            <a href="#suggestion">Suggestion box</a>
          </div>
          <div>
            <h2>Site information</h2>
            <a href="#accessibility">Accessibility statement</a>
            <a id="privacy" href="#privacy">
              Privacy & data protection
            </a>
            <a href="#sitemap">Site map</a>
          </div>
          <div className="help-card">
            <Icon name="help" size={26} />
            <span>
              <strong>Need help now?</strong>
              <small>Service Desk · ext. 1888</small>
            </span>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="content-width">
            © 2026 Hutchison Telecommunications Hong Kong Holdings Limited{" "}
            <span>Internal use only</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

function readDesignFromUrl(): "task" | "kit" | "kit2" | "kit3" {
  const value = new URLSearchParams(window.location.search).get("design")
  if (value === "task" || value === "kit" || value === "kit2" || value === "kit3") {
    return value
  }
  return "kit"
}

export default function App() {
  const [design, setDesign] = useState(readDesignFromUrl)
  const embedMode =
    new URLSearchParams(window.location.search).get("embed") === "1"

  return (
    <>
      {!embedMode && (
      <div className="design-picker" aria-label="Choose homepage design">
        <span>Homepage design</span>
        <button
          className={design === "task" ? "active" : ""}
          onClick={() => setDesign("task")}
        >
          Task-first
        </button>
        <button
          className={design === "kit" ? "active" : ""}
          onClick={() => setDesign("kit")}
        >
          SharePoint Kit
        </button>
        <button
          className={design === "kit2" ? "active" : ""}
          onClick={() => setDesign("kit2")}
        >
          SharePoint Kit 2
        </button>
        <button
          className={design === "kit3" ? "active" : ""}
          onClick={() => setDesign("kit3")}
        >
          SharePoint Kit 3
        </button>
      </div>
      )}
      {design === "task" ? (
        <HthkTaskDesign />
      ) : (
        <SharePointKitDesign
          heroFullWidth={design === "kit2" || design === "kit3"}
          kit3Bands={design === "kit3"}
        />
      )}
    </>
  )
}
