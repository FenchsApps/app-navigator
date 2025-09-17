import { useMemo, useState } from 'react'

type LinkCard = {
  title: string
  href: string
  subtitle: string
  accent: 'purple' | 'pink' | 'cyan'
}

type Locale = 'en' | 'ru'

const t = {
  en: {
    tagline: 'Neon navigator for my GitHub projects.',
    animations: 'Animations',
    glow: 'Glow',
    on: 'On',
    off: 'Off',
    visit: 'Visit',
    portfolioTitle: 'My Portfolio',
    portfolioSubtitle: 'Projects, contacts, presentations',
    searchTitle: 'My Search Engine',
    searchSubtitle: 'Purple Browser — fast search',
    guruTitle: 'Gentoo USE-Flags GURU',
    guruSubtitle: 'Navigator of USE flags for Gentoo',
    github: 'github.com/FenchsApps',
    lang: 'Language',
  },
  ru: {
    tagline: 'Неоновый навигатор по моим проектам на GitHub.',
    animations: 'Анимации',
    glow: 'Свечение',
    on: 'Вкл',
    off: 'Выкл',
    visit: 'Открыть',
    portfolioTitle: 'Моё портфолио',
    portfolioSubtitle: 'Проекты, контакты, презентации',
    searchTitle: 'Мой поисковик',
    searchSubtitle: 'Purple Browser — быстрый поиск',
    guruTitle: 'Gentoo USE-Flags GURU',
    guruSubtitle: 'Навигатор флагов USE для Gentoo',
    github: 'github.com/FenchsApps',
    lang: 'Язык',
  },
} as const

function getSites(locale: Locale): LinkCard[] {
  const d = t[locale]
  return [
    {
      title: d.portfolioTitle,
      href: 'https://fenchsapps.github.io',
      subtitle: d.portfolioSubtitle,
      accent: 'purple',
    },
    {
      title: d.searchTitle,
      href: 'https://fenchsapps.github.io/purple-browser',
      subtitle: d.searchSubtitle,
      accent: 'pink',
    },
    {
      title: d.guruTitle,
      href: 'https://fenchsapps.github.io/useflags-guru',
      subtitle: d.guruSubtitle,
      accent: 'cyan',
    },
  ]
}

function App() {
  const [locale, setLocale] = useState<Locale>('en')
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [glowEnabled, setGlowEnabled] = useState(true)

  const dict = t[locale]
  const sites = useMemo(() => getSites(locale), [locale])

  const cardClass = useMemo(() => (
    [
      'group relative rounded-2xl p-5 md:p-6 border',
      'bg-black/30 border-white/10 backdrop-blur',
      'transition-transform duration-300 ease-out',
      animationsEnabled ? 'hover:-translate-y-1' : '',
      glowEnabled ? 'shadow-neon' : 'shadow-neonSoft',
    ].join(' ')
  ), [animationsEnabled, glowEnabled])

  const accentRing: Record<LinkCard['accent'], string> = {
    purple: 'ring-[color:var(--color-neon-purple)]',
    pink: 'ring-[color:var(--color-neon-pink)]',
    cyan: 'ring-[color:var(--color-neon-cyan)]',
  }

  const accentGrad: Record<LinkCard['accent'], string> = {
    purple: 'from-[color:var(--color-neon-purple)] to-[color:var(--color-neon-pink)]',
    pink: 'from-[color:var(--color-neon-pink)] to-[color:var(--color-neon-yellow)]',
    cyan: 'from-[color:var(--color-neon-cyan)] to-[color:var(--color-neon-purple)]',
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="pt-10 pb-6 text-center">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[color:var(--color-neon-purple)] via-[color:var(--color-neon-pink)] to-[color:var(--color-neon-cyan)]">
            Fench&apos;s Navigator
          </span>
        </h1>
        <p className="mt-3 text-white/70 max-w-xl mx-auto">
          {dict.tagline}
        </p>
      </header>

      <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
        <section className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs md:text-sm text-white/70">
            <span>{dict.animations}</span>
            <button
              className={[
                'inline-flex items-center rounded-full px-3 py-1 border border-white/10',
                animationsEnabled ? 'bg-white/10' : 'bg-transparent',
              ].join(' ')}
              onClick={() => setAnimationsEnabled(v => !v)}
            >
              {animationsEnabled ? dict.on : dict.off}
            </button>
            <span className="ml-3">{dict.glow}</span>
            <button
              className={[
                'inline-flex items-center rounded-full px-3 py-1 border border-white/10',
                glowEnabled ? 'bg-white/10' : 'bg-transparent',
              ].join(' ')}
              onClick={() => setGlowEnabled(v => !v)}
            >
              {glowEnabled ? dict.on : dict.off}
            </button>
            <span className="ml-3">{dict.lang}</span>
            <div className="inline-flex overflow-hidden rounded-full border border-white/10">
              <button
                className={[
                  'px-3 py-1 text-xs',
                  locale === 'en' ? 'bg-white/10 text-white' : 'text-white/70',
                ].join(' ')}
                onClick={() => setLocale('en')}
              >
                EN
              </button>
              <button
                className={[
                  'px-3 py-1 text-xs',
                  locale === 'ru' ? 'bg-white/10 text-white' : 'text-white/70',
                ].join(' ')}
                onClick={() => setLocale('ru')}
              >
                RU
              </button>
            </div>
          </div>
          <a
            href="https://github.com/FenchsApps"
            target="_blank"
            className="text-xs md:text-sm text-white/70 hover:text-white transition-colors"
          >
            {dict.github}
          </a>
        </section>

        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {sites.map((site) => (
            <a
              key={site.href}
              href={site.href}
              target="_blank"
              className={cardClass}
            >
              <div className={[
                'absolute inset-0 rounded-2xl -z-10 opacity-60',
                'bg-gradient-to-br',
                accentGrad[site.accent],
                glowEnabled ? 'blur-2xl' : 'blur-md',
                animationsEnabled ? 'animate-[pulse_4s_ease-in-out_infinite]' : '',
              ].join(' ')} />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg md:text-xl font-bold">
                    {site.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/70">{site.subtitle}</p>
                </div>
                <span className={[
                  'shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ring-2',
                  accentRing[site.accent],
                ].join(' ')}>
                  {dict.visit}
                </span>
              </div>
            </a>
          ))}
        </main>
      </div>

      <footer className="mt-auto text-center py-10 text-xs md:text-sm text-white/60">
        Fench&apos;s Navigator · GPL-3.0
      </footer>
    </div>
  )
}

export default App
