import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from "react"

const GUIDE_SECTION_SELECTORS: { n: number; sel: string }[] = [
  { n: 1, sel: ".kit-suite" },
  { n: 2, sel: ".kit-rail a:first-of-type" },
  { n: 3, sel: ".kit-site-header" },
  { n: 4, sel: ".kit-personal-bar" },
  { n: 5, sel: ".kit-hero" },
  { n: 6, sel: "#kit-apps" },
  { n: 7, sel: "#kit-announcements" },
  { n: 8, sel: "#kit-news" },
  { n: 9, sel: ".kit-app-download" },
  { n: 10, sel: ".kit-hub-news" },
  { n: 11, sel: ".kit-popular" },
  { n: 12, sel: ".kit-events" },
  { n: 13, sel: "#kit-people" },
  { n: 14, sel: "#kit-staff-needs" },
  { n: 15, sel: ".kit-footer" },
]

function useGuideEmbedMetrics() {
  useLayoutEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("guide") !== "1") return

    const page = document.querySelector(".kit-page")
    if (!page) return

    const publish = () => {
      const pageRect = page.getBoundingClientRect()
      const pageTop = pageRect.top + window.scrollY
      const pageHeight = page.scrollHeight
      const markers = GUIDE_SECTION_SELECTORS.map(({ n, sel }) => {
        const el = document.querySelector(sel)
        if (!el) return { n, top: 0 }
        const rect = el.getBoundingClientRect()
        const inset = Math.min(40, rect.height * 0.15)
        const top = rect.top + window.scrollY - pageTop + inset
        return { n, top: Math.max(0, top) }
      })
      window.parent.postMessage(
        { type: "hthk-guide-metrics", pageHeight, markers },
        "*",
      )
    }

    publish()
    const ro = new ResizeObserver(publish)
    ro.observe(page)
    window.addEventListener("resize", publish)
    window.addEventListener("load", publish)
    const fontsReady = document.fonts?.ready
    fontsReady?.then(publish)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", publish)
      window.removeEventListener("load", publish)
    }
  }, [])
}

type KIconName = "apps" | "bell" | "calendar" | "chevron" | "file" | "gear" | "help" | "home" | "mail" | "menu" | "people" | "search" | "shield" | "spark"

function KIcon({ name, size = 20 }: { name: KIconName; size?: number }) {
  const paths: Record<KIconName, React.ReactNode> = {
    apps: (
      <>
        <rect x="3" y="3" width="6" height="6" />
        <rect x="15" y="3" width="6" height="6" />
        <rect x="3" y="15" width="6" height="6" />
        <rect x="15" y="15" width="6" height="6" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    file: (
      <>
        <path d="M6 2h8l4 4v16H6z" />
        <path d="M14 2v5h5M9 12h6M9 16h6" />
      </>
    ),
    gear: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.6-1H3v-4h.09A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.51V3h4v.09A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.51 1H21v4h-.09A1.7 1.7 0 0 0 19.4 15Z" />
      </>
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9a2.5 2.5 0 1 1 3.2 2.4c-.7.25-.7 1.1-.7 1.6M12 17h.01" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v11h14V10M9 21v-7h6v7" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    people: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 21v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6M19 21v-2a6 6 0 0 0-3-5" />
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
      <path d="m12 3 1.5 5.5L18 6l-2.5 5.5L21 13l-5.5 1.5L18 20l-5.5-2.5L11 23l-1.5-5.5L4 20l2.5-5.5L1 13l5.5-1.5L4 6l5.5 2.5L12 3Z" />
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
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

type MockupVariant = "anniversary" | "event" | "people" | "sustainability" | "security" | "office" | "bus" | "food" | "offers" | "culture"

const variantPhotos: Record<MockupVariant, { src: string; alt: string }> = {
  anniversary: {
    src: "/assets/hero/anniversary.jpg",
    alt: "Victoria Harbour and Hong Kong skyline",
  },
  event: {
    src: "/assets/hero/event.jpg",
    alt: "Corporate event and professional networking",
  },
  people: {
    src: "/assets/hero/people.jpg",
    alt: "Colleagues collaborating in a modern workplace",
  },
  culture: {
    src: "/assets/hero/culture.jpg",
    alt: "Team meeting and workplace culture",
  },
  sustainability: {
    src: "/assets/hero/sustainability.jpg",
    alt: "Wind turbines and sustainable energy",
  },
  security: {
    src: "/assets/hero/security.jpg",
    alt: "Cyber security and technology protection",
  },
  office: {
    src: "/assets/hero/office.jpg",
    alt: "Modern corporate office workspace",
  },
  bus: {
    src: "/assets/hero/bus.jpg",
    alt: "Passenger coaches on a city street",
  },
  food: {
    src: "/assets/hero/food.jpg",
    alt: "Staff cafeteria and dining",
  },
  offers: {
    src: "/assets/hero/offers.jpg",
    alt: "Staff offers and employee benefits",
  },
}

function MockupImage({
  variant,
  label = "",
}: {
  variant: MockupVariant
  label?: string
}) {
  const photo = variantPhotos[variant]
  const alt = label || photo.alt
  return (
    <img
      className="kit-mockup"
      src={photo.src}
      alt={alt}
      loading="lazy"
      decoding="async"
    />
  )
}

const heroTiles = [
  {
    image: "anniversary",
    title: "HTHK celebrates 40 years of connecting Hong Kong",
    large: true,
  },
  { image: "event", title: "Annual Dinner registration is now open" },
  { image: "people", title: "People and culture: grow with us" },
  { image: "sustainability", title: "Building a more sustainable future" },
  { image: "security", title: "Complete cyber security training" },
]

const appLinks = [
  ["HCM", "people"],
  ["Webmail", "mail"],
  ["Staff Directory", "people"],
  ["eLearning", "spark"],
  ["e-Form", "file"],
  ["IT Service Desk", "help"],
  ["Room Booking", "calendar"],
  ["My Benefits", "shield"],
] as const

function newsTopicSlug(tag: string) {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

type StoryCard = {
  image: MockupVariant
  tag: string
  title: string
  excerpt: string
  date: string
  author: string
}

const storyCards: StoryCard[] = [
  {
    image: "anniversary",
    tag: "Corporate Affairs",
    title: "HTHK celebrates 40 years of connecting Hong Kong",
    excerpt:
      "Highlights from our anniversary programme, colleague stories and community events marking four decades of service.",
    date: "18 November 2026",
    author: "Corporate Affairs",
  },
  {
    image: "culture",
    tag: "Corporate Affairs",
    title: "CEO message: our priorities for the year ahead",
    excerpt:
      "A quarterly update on customer commitment, network investment and opportunities for every HTHK colleague.",
    date: "15 November 2026",
    author: "Leadership Office",
  },
  {
    image: "event",
    tag: "Human Resources",
    title: "2026 Annual Dinner: registration is now open",
    excerpt:
      "Reserve your seat, view the dress code and find answers to frequently asked questions about this year’s celebration.",
    date: "14 November 2026",
    author: "Human Resources",
  },
  {
    image: "offers",
    tag: "Human Resources",
    title: "New colleague onboarding hub refreshed for 2026",
    excerpt:
      "Updated checklists, buddy programme details and links to essential forms for people joining HTHK this quarter.",
    date: "12 November 2026",
    author: "Human Resources",
  },
  {
    image: "security",
    tag: "Information Security",
    title: "Complete annual cyber security training",
    excerpt:
      "Mandatory refresher for all staff—complete modules by 30 November to maintain access to key applications.",
    date: "10 November 2026",
    author: "Information Security",
  },
  {
    image: "office",
    tag: "Information Security",
    title: "Phishing alerts: what to report and how",
    excerpt:
      "Recognise suspicious messages, use the report button in Outlook and know when to contact the security team.",
    date: "8 November 2026",
    author: "Information Security",
  },
  {
    image: "bus",
    tag: "Administration",
    title: "Updated office shuttle schedule from 1 December",
    excerpt:
      "Revised pick-up times for HQ and key business parks—download the PDF and save the route map to your phone.",
    date: "6 November 2026",
    author: "Administration",
  },
  {
    image: "food",
    tag: "Administration",
    title: "Seasonal cafeteria hours at HQ",
    excerpt:
      "Holiday opening hours, festive menus and pre-order options for teams working through the end of year.",
    date: "4 November 2026",
    author: "Administration",
  },
]

const newsTopics = Array.from(
  storyCards.reduce((acc, story) => {
    acc.set(newsTopicSlug(story.tag), story.tag)
    return acc
  }, new Map<string, string>()),
).sort((a, b) => a[1].localeCompare(b[1]))

const newsTopicHomeCards = storyCards.slice(0, 4)

const popular = [
  "Employee handbook 2026",
  "Expense claim form",
  "Information security policies",
  "Download HCM user guide",
  "Typhoon & rainstorm policy",
  "Medical benefits guide",
]

const announcements = [
  {
    type: "Staff offer",
    title: "New Xtra Mall offers for HTHK colleagues",
    description:
      "Save on dining, wellness, electronics and everyday essentials with this month’s staff-exclusive offers.",
    image: "offers",
    action: "Explore staff offers",
    date: "Today",
  },
  {
    type: "People update",
    title: "Welcome to our new HTHK colleagues",
    description:
      "Meet the newest members of our teams and find resources to support a smooth onboarding journey.",
    image: "people",
    action: "View new staff onboarding",
    date: "18 Nov",
  },
  {
    type: "Leadership",
    title: "CEO message: building our next chapter together",
    description:
      "A quarterly update on our priorities, customer commitment and the opportunities ahead for HTHK.",
    image: "office",
    action: "Watch the CEO’s speech",
    date: "15 Nov",
  },
] as const

type NewsRoute = "home" | "all" | { topic: string }

function parseNewsRoute(hash: string): NewsRoute {
  const value = hash.replace(/^#/, "")
  if (value === "kit-all-news") return "all"
  if (value.startsWith("kit-news-topic-")) {
    return { topic: value.slice("kit-news-topic-".length) }
  }
  return "home"
}

function KitNewsHubStoryCard({
  story,
  featured = false,
}: {
  story: StoryCard
  featured?: boolean
}) {
  const href = `#news-article-${newsTopicSlug(story.title)}`
  return (
    <article
      className={
        featured ? "kit-news-card kit-news-card--featured" : "kit-news-card"
      }
    >
      <a className="kit-news-card__media" href={href} tabIndex={-1} aria-hidden="true">
        <MockupImage variant={story.image} />
      </a>
      <div className="kit-news-card__body">
        <a
          className="kit-story-tag"
          href={`#kit-news-topic-${newsTopicSlug(story.tag)}`}
        >
          {story.tag}
        </a>
        <h3>
          <a href={href}>{story.title}</a>
        </h3>
        <p>{story.excerpt}</p>
        <div className="kit-news-card__meta">
          <time dateTime="2026-11-18">{story.date}</time>
          {story.author !== story.tag && (
            <>
              <span aria-hidden="true">·</span>
              <span>{story.author}</span>
            </>
          )}
        </div>
      </div>
    </article>
  )
}

function KitNewsHubView({ route }: { route: Exclude<NewsRoute, "home"> }) {
  const topicSlug = route === "all" ? null : route.topic
  const topicLabel =
    topicSlug === null
      ? null
      : newsTopics.find(([slug]) => slug === topicSlug)?.[1]
  const stories =
    topicSlug === null
      ? storyCards
      : storyCards.filter((story) => newsTopicSlug(story.tag) === topicSlug)
  const featuredStory = topicSlug === null ? stories[0] : null
  const gridStories =
    featuredStory && stories.length > 1 ? stories.slice(1) : stories

  const filterLinks = (
    <>
      <a
        className={
          topicSlug === null
            ? "kit-news-filter__link is-active"
            : "kit-news-filter__link"
        }
        href="#kit-all-news"
      >
        All topics
        <span className="kit-news-filter__count">{storyCards.length}</span>
      </a>
      {newsTopics.map(([slug, label]) => {
        const count = storyCards.filter(
          (story) => newsTopicSlug(story.tag) === slug,
        ).length
        return (
          <a
            key={slug}
            className={
              topicSlug === slug
                ? "kit-news-filter__link is-active"
                : "kit-news-filter__link"
            }
            href={`#kit-news-topic-${slug}`}
          >
            {label}
            <span className="kit-news-filter__count">{count}</span>
          </a>
        )
      })}
    </>
  )

  return (
    <div
      className="kit-news-hub"
      id={topicSlug ? `kit-news-topic-${topicSlug}` : "kit-all-news"}
    >
      <div className="kit-news-hub__titlebar">
        <div className="kit-content kit-news-hub__titlebar-inner">
          <nav className="kit-breadcrumb" aria-label="Breadcrumb">
            <a href="#kit-main">Home</a>
            <span aria-hidden="true">›</span>
            {topicLabel ? (
              <>
                <a href="#kit-all-news">News</a>
                <span aria-hidden="true">›</span>
                <span aria-current="page">{topicLabel}</span>
              </>
            ) : (
              <span aria-current="page">News</span>
            )}
          </nav>
          <header className="kit-news-hub__header">
            <h2>{topicLabel ?? "News"}</h2>
            <p>
              {topicLabel
                ? `Updates from ${topicLabel}.`
                : "Site news archive—promoted stories, filters and card layout as on a SharePoint communication site."}
            </p>
          </header>
        </div>
      </div>

      <div className="kit-news-hub__filters-scroll kit-content">
        <div
          className="kit-news-hub__filters-track"
          role="navigation"
          aria-label="Filter news by topic"
        >
          {filterLinks}
        </div>
      </div>

      <div className="kit-content kit-news-hub__layout">
        <aside
          className="kit-news-hub__sidebar"
          aria-label="Filter news by topic"
        >
          <p className="kit-news-hub__sidebar-label">Topic</p>
          <nav className="kit-news-filter">{filterLinks}</nav>
        </aside>

        <div className="kit-news-hub__main">
          <div className="kit-news-hub__results">
            <p>
              <strong>{stories.length}</strong>{" "}
              {stories.length === 1 ? "story" : "stories"}
              {topicLabel ? ` · ${topicLabel}` : ""}
            </p>
            <span className="kit-news-hub__sort">Newest first</span>
          </div>

          {featuredStory && (
            <KitNewsHubStoryCard story={featuredStory} featured />
          )}

          <div className="kit-news-hub-grid" role="list">
            {gridStories.map((story) => (
              <div key={story.title} role="listitem">
                <KitNewsHubStoryCard story={story} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

type SharePointKitDesignProps = {
  /** SharePoint Kit 2: same 5-tile hero as Kit 1, full width (no 1204px cap) */
  heroFullWidth?: boolean
}

export default function SharePointKitDesign({
  heroFullWidth = false,
}: SharePointKitDesignProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [result, setResult] = useState("")
  const [likedStory, setLikedStory] = useState<string | null>(null)
  const [newsRoute, setNewsRoute] = useState<NewsRoute>("home")
  const [heroSlide, setHeroSlide] = useState(0)
  const heroSlideCount = heroTiles.length
  const heroTouchStartX = useRef<number | null>(null)

  useGuideEmbedMetrics()

  useEffect(() => {
    const syncNewsRouteFromHash = () => {
      const route = parseNewsRoute(window.location.hash)
      setNewsRoute(route)
      setMenuOpen(false)
      if (route !== "home") window.scrollTo(0, 0)
    }
    syncNewsRouteFromHash()
    window.addEventListener("hashchange", syncNewsRouteFromHash)
    return () => window.removeEventListener("hashchange", syncNewsRouteFromHash)
  }, [])

  function closeHubNav() {
    setMenuOpen(false)
  }

  function goHeroSlide(next: number) {
    setHeroSlide((next + heroSlideCount) % heroSlideCount)
  }

  function onHeroTouchStart(clientX: number) {
    heroTouchStartX.current = clientX
  }

  function onHeroTouchEnd(clientX: number) {
    const start = heroTouchStartX.current
    heroTouchStartX.current = null
    if (start === null) return
    const delta = clientX - start
    if (Math.abs(delta) < 48) return
    goHeroSlide(delta > 0 ? heroSlide - 1 : heroSlide + 1)
  }

  function submitSearch(event: FormEvent) {
    event.preventDefault()
    setResult(
      query.trim()
        ? `AI summary ready for “${query.trim()}” · grounded in trusted HTHK content`
        : "Ask about a policy, person, form, application or update.",
    )
  }

  return (
    <div
      className={
        newsRoute === "home" ? "kit-page" : "kit-page kit-page--news-hub"
      }
    >
      <a className="skip-link" href="#kit-main">
        Skip to main content
      </a>
      <header className="kit-suite">
        <button aria-label="Microsoft 365 app launcher">
          <KIcon name="apps" />
        </button>
        <strong>Microsoft 365</strong>
        <span>SharePoint</span>
        <form onSubmit={submitSearch} role="search">
          <KIcon name="search" size={17} />
          <label className="sr-only" htmlFor="kit-search">
            Search this site
          </label>
          <input
            id="kit-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask HTHK AI"
          />
        </form>
        <div className="kit-suite__actions">
          <button aria-label="Notifications">
            <KIcon name="bell" />
          </button>
          <button aria-label="Settings">
            <KIcon name="gear" />
          </button>
          <button aria-label="Help">
            <KIcon name="help" />
          </button>
          <button className="kit-avatar" aria-label="Alex Chan profile">
            AC
          </button>
        </div>
        {result && (
          <div className="kit-search-result" role="status">
            {result}
          </div>
        )}
      </header>

      <aside className="kit-rail" aria-label="Microsoft 365 navigation">
        {(["home", "spark", "file", "people"] as KIconName[]).map(
          (icon, index) => (
            <a
              className={index === 0 ? "active" : ""}
              href={`#rail-${icon}`}
              key={icon}
              aria-label={icon}
            >
              <KIcon name={icon} />
            </a>
          ),
        )}
      </aside>

      <div className="kit-wrap">
        <header className="kit-site-header">
          <div className="kit-identity">
            <span className="brand-mark" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
            <div>
              <h1>HTHK Intranet</h1>
              <p>Hutchison Telecommunications Hong Kong</p>
            </div>
          </div>
          <div className="kit-site-actions">
            <button>
              <KIcon name="people" size={17} /> 1,640 members
            </button>
            <button>Follow</button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="kit-menu"
              aria-expanded={menuOpen}
            >
              <KIcon name="menu" /> Menu
            </button>
          </div>
          <nav
            className={menuOpen ? "open" : ""}
            aria-label="HTHK hub navigation"
            onClick={(event) => {
              if ((event.target as HTMLElement).closest("a")) closeHubNav()
            }}
          >
            <a
              className={newsRoute === "home" ? "active" : ""}
              href="#kit-main"
            >
              Home
            </a>
            <a href="#kit-apps">My tools</a>
            <a href="#kit-announcements">Staff announcements</a>
            <a
              className={newsRoute !== "home" ? "active" : ""}
              href="#kit-all-news"
            >
              News
            </a>
            <a href="#kit-staff-needs">Staff services</a>
            <a href="#kit-policies">Policies & forms</a>
            <a href="#kit-people">Learning & community</a>
          </nav>
        </header>

        <main id="kit-main">
          {newsRoute === "home" ? (
          <>
          <section
            className={
              heroFullWidth
                ? "kit-personal-bar kit-personal-bar--full"
                : "kit-personal-bar kit-content"
            }
            aria-label="Personalised homepage status"
          >
            <div className="kit-personal-bar__start">
              <span className="kit-personal-bar__you">
                <KIcon name="spark" size={20} />
                <strong>For you, Alex</strong>
                <span className="kit-personal-bar__meta">
                  Personalised automatically
                </span>
              </span>
              <span className="kit-personal-bar__trust">
                <KIcon name="shield" size={20} />
                AI answers use trusted HTHK sources
              </span>
            </div>
            <a className="kit-personal-bar__action" href="#personalise">
              Personalise this page
            </a>
          </section>

          <section
            className={
              heroFullWidth ? "kit-hero kit-hero--full" : "kit-hero kit-content"
            }
          >
            <div
              className="kit-hero-carousel"
              aria-roledescription="carousel"
              aria-label="Featured stories"
            >
              <div
                className="kit-hero-grid kit-hero-track"
                style={{ "--hero-slide": heroSlide } as React.CSSProperties}
                onTouchStart={(e) =>
                  onHeroTouchStart(e.touches[0]?.clientX ?? 0)
                }
                onTouchEnd={(e) =>
                  onHeroTouchEnd(e.changedTouches[0]?.clientX ?? 0)
                }
              >
                {heroTiles.map((tile, index) => (
                  <a
                    href={`#story-${index}`}
                    className={`kit-hero-tile ${tile.large ? "large" : ""}`}
                    key={tile.title}
                    aria-hidden={heroSlide !== index}
                    tabIndex={heroSlide === index ? 0 : -1}
                  >
                    <MockupImage variant={tile.image as MockupVariant} />
                    <span className="kit-image-shade" />
                    <span className="kit-hero-copy">
                      {index === 0 && <b>Featured story</b>}
                      <strong>{tile.title}</strong>
                      {index === 0 && (
                        <small>
                          Read the anniversary story{" "}
                          <span aria-hidden="true">→</span>
                        </small>
                      )}
                    </span>
                  </a>
                ))}
              </div>
              <div className="kit-hero-carousel__chrome">
                <button
                  type="button"
                  className="kit-hero-carousel__arrow kit-hero-carousel__arrow--prev"
                  aria-label="Previous featured story"
                  onClick={() => goHeroSlide(heroSlide - 1)}
                >
                  <KIcon name="chevron" size={22} />
                </button>
                <div
                  className="kit-hero-carousel__dots"
                  role="tablist"
                  aria-label="Featured story slides"
                >
                  {heroTiles.map((tile, index) => (
                    <button
                      key={tile.title}
                      type="button"
                      role="tab"
                      className={
                        heroSlide === index ? "active" : undefined
                      }
                      aria-label={`Story ${index + 1}: ${tile.title}`}
                      aria-selected={heroSlide === index}
                      onClick={() => setHeroSlide(index)}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="kit-hero-carousel__arrow kit-hero-carousel__arrow--next"
                  aria-label="Next featured story"
                  onClick={() => goHeroSlide(heroSlide + 1)}
                >
                  <KIcon name="chevron" size={22} />
                </button>
              </div>
            </div>
          </section>

          <section className="kit-apps kit-content" id="kit-apps">
            <div className="kit-section-title">
              <div>
                <h2>Online applications</h2>
                <p>Your most-used tools, all in one place.</p>
              </div>
            </div>
            <div className="kit-app-grid">
              {appLinks.map(([name, icon]) => (
                <a href={`#app-${name}`} key={name}>
                  <span>
                    <KIcon name={icon as KIconName} />
                  </span>
                  <strong>{name}</strong>
                  <KIcon name="chevron" size={16} />
                </a>
              ))}
            </div>
          </section>

          <section
            className="kit-announcements kit-content"
            id="kit-announcements"
          >
            <div className="kit-section-title">
              <div>
                <p className="kit-topic">Important for staff</p>
                <h2>Staff announcements</h2>
                <p>
                  Offers, people updates and leadership messages in one place.
                </p>
              </div>
              <a href="#all-announcements">See all announcements →</a>
            </div>
            <div className="kit-announcement-grid">
              {announcements.map((item) => (
                <article key={item.title}>
                  <MockupImage variant={item.image as MockupVariant} label="" />
                  <div className="kit-announcement-body">
                    <div>
                      <span>{item.type}</span>
                      <time>{item.date}</time>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <a href={`#${item.title}`}>{item.action} →</a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="kit-news kit-content" id="kit-news">
            <div className="kit-section-title">
              <div>
                <h2>What’s hot</h2>
                <p>Latest updates from across HTHK.</p>
              </div>
              <a href="#kit-all-news">See all news →</a>
            </div>
            <div className="kit-news-grid">
              {newsTopicHomeCards.map((story) => (
                <article className="kit-story-card" key={story.title}>
                  <a
                    className="kit-story-card__media"
                    href={`#news-article-${newsTopicSlug(story.title)}`}
                    aria-hidden="true"
                    tabIndex={-1}
                  >
                    <MockupImage variant={story.image} />
                  </a>
                  <div>
                    <a
                      className="kit-story-tag"
                      href={`#kit-news-topic-${newsTopicSlug(story.tag)}`}
                      title={`All ${story.tag} news`}
                    >
                      {story.tag}
                    </a>
                    <h3>
                      <a href={`#news-article-${newsTopicSlug(story.title)}`}>
                        {story.title}
                      </a>
                    </h3>
                    <small>18 November 2026 · 3 min read</small>
                    <div className="kit-social-actions">
                      <button
                        className={likedStory === story.title ? "liked" : ""}
                        onClick={() =>
                          setLikedStory(
                            likedStory === story.title ? null : story.title,
                          )
                        }
                        aria-pressed={likedStory === story.title}
                      >
                        <KIcon name="spark" size={15} />
                        {likedStory === story.title ? 25 : 24}
                      </button>
                      <a href={`#comments-${story.title}`}>
                        <KIcon name="mail" size={15} />6
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="kit-app-download kit-content">
            <div className="kit-app-download__copy">
              <p className="kit-topic">HTHK Mobile</p>
              <h2>Your intranet, wherever work takes you.</h2>
              <p>
                Get staff announcements, urgent notices, schedules and everyday
                tools on your phone. Designed to help frontline and office
                colleagues stay connected.
              </p>
              <ul>
                <li>
                  <KIcon name="bell" size={18} />
                  Receive important staff alerts
                </li>
                <li>
                  <KIcon name="shield" size={18} />
                  Secure sign-in with your HTHK account
                </li>
                <li>
                  <KIcon name="apps" size={18} />
                  Open forms and staff tools quickly
                </li>
              </ul>
              <div className="kit-store-buttons">
                <a href="#ios-app">
                  <small>Download on the</small>
                  <strong>App Store</strong>
                </a>
                <a href="#android-app">
                  <small>Get it on</small>
                  <strong>Google Play</strong>
                </a>
              </div>
            </div>
            <div
              className="kit-phone-preview"
              aria-label="HTHK mobile intranet app preview"
            >
              <div className="kit-phone">
                <span className="kit-phone__speaker" />
                <div className="kit-phone__screen">
                  <div className="kit-phone__brand">
                    <span className="brand-mark" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                      <i />
                    </span>
                    <strong>HTHK</strong>
                  </div>
                  <p>Good morning, Alex</p>
                  <h3>What do you need today?</h3>
                  <div className="kit-phone__search">
                    <KIcon name="search" size={15} />
                    Ask HTHK AI
                  </div>
                  <div className="kit-phone__tiles">
                    <span>My roster</span>
                    <span>Staff offers</span>
                    <span>Forms</span>
                    <span>News</span>
                  </div>
                  <div className="kit-phone__notice">
                    <b>NEW</b>
                    <strong>Xtra Mall staff offers</strong>
                    <small>View this month’s savings</small>
                  </div>
                </div>
              </div>
              <div className="kit-qr" aria-label="QR code placeholder">
                <svg viewBox="0 0 84 84" aria-hidden="true">
                  <path
                    d="M4 4h24v24H4zM10 10v12h12V10zM56 4h24v24H56zM62 10v12h12V10zM4 56h24v24H4zM10 62v12h12V62zM36 4h8v8h-8zM36 20h8v16h-8zM48 32h12v8H48zM68 36h12v12H68zM32 44h8v8h-8zM44 48h16v8H44zM64 56h8v8h-8zM36 64h16v8H36zM56 72h24v8H56z"
                    fill="#012d90"
                  />
                </svg>
                <span>Scan to download</span>
              </div>
            </div>
          </section>

          <section className="kit-hub-news" id="kit-policies">
            <div className="kit-content kit-hub-layout">
              <div>
                <h2>Staff essentials</h2>
                <p className="kit-lead">
                  Everyday information and services for our people.
                </p>
              </div>
              <div className="kit-filmstrip">
                {[
                  ["Shuttle bus schedule", "bus"],
                  ["Cafeteria menu", "food"],
                  ["Staff Jetso offers", "offers"],
                ].map(([title, image]) => (
                  <a href={`#${title}`} key={title}>
                    <MockupImage variant={image as MockupVariant} />
                    <strong>{title}</strong>
                    <span>View details →</span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section className="kit-popular kit-content">
            <div className="kit-section-title">
              <div>
                <h2>Trusted policies and forms</h2>
                <p>Reviewed and migrated to the central content repository.</p>
              </div>
              <a href="#all-policies">Browse all →</a>
            </div>
            <div className="kit-popular-grid">
              {popular.map((item) => (
                <a href={`#${item}`} key={item}>
                  <KIcon name={item.includes("security") ? "shield" : "file"} />
                  <span>{item}</span>
                  <KIcon name="chevron" size={16} />
                </a>
              ))}
            </div>
          </section>

          <section className="kit-events">
            <div className="kit-content">
              <div className="kit-section-title">
                <div>
                  <h2>Company events</h2>
                </div>
                <a href="#all-events">See all →</a>
              </div>
              <div className="kit-event-grid">
                {[
                  [
                    "28",
                    "NOV",
                    "Friday wellness workshop",
                    "12:30 PM · Training Room 1",
                  ],
                  [
                    "04",
                    "DEC",
                    "Annual Dinner briefing",
                    "3:00 PM · Microsoft Teams",
                  ],
                  [
                    "12",
                    "DEC",
                    "Volunteer day: community visit",
                    "9:00 AM · Kowloon",
                  ],
                  ["18", "DEC", "Technology town hall", "4:30 PM · Auditorium"],
                ].map(([day, month, title, meta]) => (
                  <article key={title}>
                    <div className="kit-date">
                      <strong>{day}</strong>
                      <span>{month}</span>
                    </div>
                    <div>
                      <h3>{title}</h3>
                      <p>{meta}</p>
                      <a href={`#${title}`}>View event →</a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="kit-feature kit-content" id="kit-people">
            <MockupImage
              variant="culture"
              label="HTHK colleagues collaborating together"
            />
            <div>
              <p className="kit-kicker">People and culture</p>
              <h2>Grow, connect and make a difference.</h2>
              <p>
                Discover learning, volunteering and wellbeing opportunities
                designed to help every HTHK colleague thrive.
              </p>
              <a className="kit-button" href="#people-culture">
                Explore people & culture
              </a>
            </div>
          </section>

          <section className="kit-departments kit-content" id="kit-staff-needs">
            <div className="kit-section-title">
              <div>
                <p className="kit-topic">Browse by what you need</p>
                <h2>Staff services</h2>
                <p>Find information by task—not by organisation chart.</p>
              </div>
            </div>
            <div>
              {[
                [
                  "Pay, leave & benefits",
                  "HCM, medical benefits and employee offers",
                ],
                ["Working at HTHK", "Policies, forms and workplace guidance"],
                ["Learning & career", "Training, onboarding and development"],
                ["Workplace services", "Shuttle, cafeteria and room booking"],
                [
                  "Wellbeing & support",
                  "Wellness, first aiders and employee support",
                ],
                [
                  "IT & digital tools",
                  "Applications, security and technical help",
                ],
              ].map(([name, description], index) => (
                <a
                  href={`#${name}`}
                  key={name}
                  style={
                    {
                      "--kit-accent": [
                        "#a50000",
                        "#c54601",
                        "#007bc7",
                        "#255a00",
                        "#0058a2",
                        "#007ead",
                      ][index],
                    } as React.CSSProperties
                  }
                >
                  <strong>{name}</strong>
                  <small>{description}</small>
                  <span>Visit site →</span>
                </a>
              ))}
            </div>
          </section>
          </>
          ) : (
            <KitNewsHubView route={newsRoute} />
          )}
        </main>

        <footer className="kit-footer">
          <div className="kit-content">
            <div className="kit-footer-brand">
              <span className="brand-mark" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>
              <span>
                <strong>HTHK Intranet</strong>
                <small>Scalable SharePoint hub · Trusted content</small>
              </span>
            </div>
            <nav aria-label="Footer">
              <a href="#privacy">Data Privacy</a>
              <a href="#directory">Staff Directory</a>
              <a href="#suggestion">Suggestion box</a>
              <a href="#accessibility">Accessibility</a>
              <a href="#help">Help Desk · ext. 1888</a>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  )
}
