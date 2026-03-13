import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

                :root {
                    --red: #E8341A;
                    --red-dim: #c42c15;
                    --ink: #1A1612;
                    --ink-soft: #4a4540;
                    --parchment: #F7F4EF;
                    --parchment-dark: #EDE9E3;
                    --rule: rgba(26,22,18,0.12);
                    --card-bg: rgba(255,255,255,0.72);
                }

                *, *::before, *::after { box-sizing: border-box; }

                .welcome-root {
                    min-height: 100vh;
                    background-color: var(--parchment);
                    background-image:
                        radial-gradient(ellipse 80% 50% at 50% -10%, rgba(232,52,26,0.07) 0%, transparent 70%),
                        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M0 60L60 0M-5 5L5 -5M55 65L65 55' stroke='%231A1612' stroke-opacity='0.025' stroke-width='1'/%3E%3C/svg%3E");
                    font-family: 'DM Sans', sans-serif;
                    color: var(--ink);
                }

                .welcome-inner {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }

                /* Header */
                .site-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 2rem 0;
                    border-bottom: 1px solid var(--rule);
                }

                .site-logo {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .site-logo svg {
                    height: 2rem;
                    width: auto;
                    color: var(--red);
                }

                .site-logo-name {
                    font-family: 'DM Serif Display', serif;
                    font-size: 1.35rem;
                    color: var(--ink);
                    letter-spacing: -0.01em;
                }

                .site-nav {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                }

                .nav-link {
                    font-size: 0.875rem;
                    font-weight: 500;
                    letter-spacing: 0.02em;
                    text-transform: uppercase;
                    color: var(--ink-soft);
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    text-decoration: none;
                    transition: color 0.2s, background 0.2s;
                }
                .nav-link:hover { color: var(--ink); background: var(--parchment-dark); }

                .nav-link-cta {
                    background: var(--ink);
                    color: var(--parchment) !important;
                    padding: 0.5rem 1.25rem;
                }
                .nav-link-cta:hover { background: var(--red) !important; color: white !important; }

                /* Hero */
                .hero {
                    padding: 5rem 0 3.5rem;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4rem;
                    align-items: end;
                }

                @media (max-width: 768px) {
                    .hero { grid-template-columns: 1fr; gap: 2rem; padding: 3rem 0 2rem; }
                }

                .hero-eyebrow {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 1.25rem;
                }

                .hero-eyebrow-line {
                    width: 2rem;
                    height: 1px;
                    background: var(--red);
                }

                .hero-eyebrow-text {
                    font-size: 0.75rem;
                    font-weight: 500;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: var(--red);
                }

                .hero-headline {
                    font-family: 'DM Serif Display', serif;
                    font-size: clamp(2.75rem, 5vw, 4.25rem);
                    line-height: 1.05;
                    letter-spacing: -0.02em;
                    color: var(--ink);
                    margin: 0 0 1.5rem;
                }

                .hero-headline em {
                    font-style: italic;
                    color: var(--red);
                }

                .hero-body {
                    font-size: 1.0625rem;
                    line-height: 1.7;
                    color: var(--ink-soft);
                    font-weight: 300;
                    max-width: 38ch;
                }

                .hero-right {
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                    padding-bottom: 0.5rem;
                }

                .stat-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.25rem;
                }

                .stat-card {
                    background: var(--card-bg);
                    border: 1px solid var(--rule);
                    border-radius: 8px;
                    padding: 1.25rem 1.5rem;
                    backdrop-filter: blur(8px);
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                .stat-card:hover {
                    border-color: rgba(232,52,26,0.3);
                    box-shadow: 0 4px 24px rgba(232,52,26,0.08);
                }

                .stat-number {
                    font-family: 'DM Serif Display', serif;
                    font-size: 2rem;
                    color: var(--ink);
                    line-height: 1;
                    margin-bottom: 0.25rem;
                }

                .stat-label {
                    font-size: 0.8rem;
                    color: var(--ink-soft);
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    font-weight: 500;
                }

                /* Divider */
                .section-rule {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    margin: 1rem 0 3rem;
                }
                .section-rule::before,
                .section-rule::after {
                    content: '';
                    flex: 1;
                    height: 1px;
                    background: var(--rule);
                }
                .section-rule-label {
                    font-size: 0.7rem;
                    font-weight: 500;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    color: var(--ink-soft);
                    opacity: 0.6;
                    white-space: nowrap;
                }

                /* Cards grid */
                .cards-grid {
                    display: grid;
                    grid-template-columns: 1.4fr 1fr;
                    grid-template-rows: auto auto;
                    gap: 1.25rem;
                    margin-bottom: 1.25rem;
                }

                @media (max-width: 900px) {
                    .cards-grid { grid-template-columns: 1fr; }
                }

                .card {
                    background: var(--card-bg);
                    border: 1px solid var(--rule);
                    border-radius: 10px;
                    padding: 2rem 2.25rem;
                    text-decoration: none;
                    color: inherit;
                    transition: border-color 0.25s, box-shadow 0.25s, transform 0.2s;
                    backdrop-filter: blur(8px);
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    position: relative;
                    overflow: hidden;
                }

                .card::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(232,52,26,0.04) 0%, transparent 60%);
                    opacity: 0;
                    transition: opacity 0.25s;
                }

                .card:hover {
                    border-color: rgba(232,52,26,0.25);
                    box-shadow: 0 8px 40px rgba(26,22,18,0.08), 0 2px 8px rgba(232,52,26,0.06);
                    transform: translateY(-2px);
                }
                .card:hover::before { opacity: 1; }

                .card-span-2 {
                    grid-row: span 2;
                }

                .card-icon {
                    width: 2.5rem;
                    height: 2.5rem;
                    background: var(--parchment-dark);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    transition: background 0.2s;
                }
                .card:hover .card-icon { background: rgba(232,52,26,0.1); }

                .card-icon svg {
                    width: 1.25rem;
                    height: 1.25rem;
                    color: var(--ink-soft);
                    transition: color 0.2s;
                }
                .card:hover .card-icon svg { color: var(--red); }

                .card-header { display: flex; align-items: flex-start; justify-content: space-between; }

                .card-arrow {
                    color: var(--ink-soft);
                    opacity: 0.4;
                    transition: opacity 0.2s, transform 0.2s, color 0.2s;
                    margin-top: 0.25rem;
                }
                .card:hover .card-arrow { opacity: 1; color: var(--red); transform: translate(3px, -3px); }

                .card-title {
                    font-family: 'DM Serif Display', serif;
                    font-size: 1.3rem;
                    color: var(--ink);
                    margin: 0;
                    letter-spacing: -0.01em;
                }

                .card-body {
                    font-size: 0.9rem;
                    line-height: 1.65;
                    color: var(--ink-soft);
                    font-weight: 300;
                    flex: 1;
                }

                .card-tag {
                    display: inline-block;
                    font-size: 0.7rem;
                    font-weight: 500;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: var(--red);
                    background: rgba(232,52,26,0.08);
                    border-radius: 4px;
                    padding: 0.25rem 0.6rem;
                    align-self: flex-start;
                }

                /* Docs card image */
                .docs-preview {
                    border-radius: 8px;
                    overflow: hidden;
                    border: 1px solid var(--rule);
                    background: var(--parchment-dark);
                    aspect-ratio: 16/9;
                    position: relative;
                }

                .docs-preview img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: top;
                }

                .docs-preview-fade {
                    position: absolute;
                    bottom: 0; left: 0; right: 0;
                    height: 40%;
                    background: linear-gradient(to bottom, transparent, var(--card-bg));
                }

                /* Ecosystem links */
                .ecosystem-links {
                    font-size: 0.875rem;
                    line-height: 1.8;
                    color: var(--ink-soft);
                    font-weight: 300;
                }

                .eco-link {
                    color: var(--ink);
                    font-weight: 500;
                    text-decoration: underline;
                    text-underline-offset: 2px;
                    text-decoration-color: rgba(232,52,26,0.3);
                    transition: color 0.15s, text-decoration-color 0.15s;
                }
                .eco-link:hover { color: var(--red); text-decoration-color: var(--red); }

                /* Footer */
                .site-footer {
                    padding: 2.5rem 0;
                    border-top: 1px solid var(--rule);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 2rem;
                }

                .footer-text {
                    font-size: 0.8rem;
                    color: var(--ink-soft);
                    opacity: 0.55;
                    letter-spacing: 0.02em;
                }

                .footer-badge {
                    font-size: 0.7rem;
                    font-weight: 500;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: var(--ink-soft);
                    opacity: 0.4;
                }

                /* Animations */
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .animate-in { animation: fadeUp 0.6s ease both; }
                .delay-1 { animation-delay: 0.1s; }
                .delay-2 { animation-delay: 0.2s; }
                .delay-3 { animation-delay: 0.3s; }
                .delay-4 { animation-delay: 0.4s; }
                .delay-5 { animation-delay: 0.5s; }
            `}</style>

            <div className="welcome-root">
                <div className="welcome-inner">
                    {/* Header */}
                    <header className="site-header animate-in">
                        <div className="site-logo">
                            <svg viewBox="0 0 62 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M61.8548 14.6253C61.8778 14.7102 61.8895 14.7978 61.8897 14.8858V28.5615C61.8898 28.737 61.8434 28.9095 61.7554 29.0614C61.6675 29.2132 61.5409 29.3392 61.3887 29.4265L49.9104 36.0351V49.1337C49.9104 49.4902 49.7209 49.8192 49.4118 49.9987L25.4519 63.7916C25.3971 63.8227 25.3372 63.8427 25.2774 63.8639C25.255 63.8714 25.2338 63.8851 25.2101 63.8913C25.0426 63.9354 24.8666 63.9354 24.6991 63.8913C24.6716 63.8838 24.6467 63.8689 24.6205 63.8589C24.5657 63.8389 24.5084 63.8215 24.456 63.7916L0.501061 49.9987C0.348882 49.9113 0.222437 49.7853 0.134469 49.6334C0.0465019 49.4816 0.000120578 49.3092 0 49.1337L0 8.10652C0 8.01678 0.0124642 7.92953 0.0348998 7.84477C0.0423783 7.8161 0.0598282 7.78993 0.0697995 7.76126C0.0884958 7.70891 0.105946 7.65531 0.133367 7.6067C0.152063 7.5743 0.179485 7.54812 0.20192 7.51821C0.230588 7.47832 0.256763 7.43719 0.290416 7.40229C0.319084 7.37362 0.356476 7.35243 0.388883 7.32751C0.425029 7.29759 0.457436 7.26518 0.498568 7.2415L12.4779 0.345059C12.6296 0.257786 12.8015 0.211853 12.9765 0.211853C13.1515 0.211853 13.3234 0.257786 13.475 0.345059L25.4531 7.2415H25.4556C25.4955 7.26643 25.5292 7.29759 25.5653 7.32626C25.5977 7.35119 25.6339 7.37362 25.6625 7.40104C25.6974 7.43719 25.7224 7.47832 25.7523 7.51821C25.7735 7.54812 25.8021 7.5743 25.8196 7.6067C25.8483 7.65656 25.8645 7.70891 25.8844 7.76126C25.8944 7.78993 25.9118 7.8161 25.9193 7.84602C25.9423 7.93096 25.954 8.01853 25.9542 8.10652V33.7317L35.9355 27.9844V14.8846C35.9355 14.7973 35.948 14.7088 35.9704 14.6253C35.9792 14.5954 35.9954 14.5692 36.0053 14.5405C36.0253 14.4882 36.0427 14.4346 36.0702 14.386C36.0888 14.3536 36.1163 14.3274 36.1375 14.2975C36.1674 14.2576 36.1923 14.2165 36.2272 14.1816C36.2559 14.1529 36.292 14.1317 36.3244 14.1068C36.3618 14.0769 36.3942 14.0445 36.4341 14.0208L48.4147 7.12434C48.5663 7.03694 48.7383 6.99094 48.9133 6.99094C49.0883 6.99094 49.2602 7.03694 49.4118 7.12434L61.3899 14.0208C61.4323 14.0457 61.4647 14.0769 61.5021 14.1055C61.5333 14.1305 61.5694 14.1529 61.5981 14.1803C61.633 14.2165 61.6579 14.2576 61.6878 14.2975C61.7103 14.3274 61.7377 14.3536 61.7551 14.386C61.7838 14.4346 61.8 14.4882 61.8199 14.5405C61.8312 14.5692 61.8474 14.5954 61.8548 14.6253ZM59.893 27.9844V16.6121L55.7013 19.0252L49.9104 22.3593V33.7317L59.8942 27.9844H59.893ZM47.9149 48.5566V37.1768L42.2187 40.4299L25.953 49.7133V61.2003L47.9149 48.5566ZM1.99677 9.83281V48.5566L23.9562 61.199V49.7145L12.4841 43.2219L12.4804 43.2194L12.4754 43.2169C12.4368 43.1945 12.4044 43.1621 12.3682 43.1347C12.3371 43.1097 12.3009 43.0898 12.2735 43.0624L12.271 43.0586C12.2386 43.0275 12.2162 42.9888 12.1887 42.9539C12.1638 42.9203 12.1339 42.8916 12.114 42.8567L12.1127 42.853C12.0903 42.8156 12.0766 42.7707 12.0604 42.7283C12.0442 42.6909 12.023 42.656 12.013 42.6161C12.0005 42.5688 11.998 42.5177 11.9931 42.4691C11.9881 42.4317 11.9781 42.3943 11.9781 42.3569V15.5801L6.18848 12.2446L1.99677 9.83281ZM12.9777 2.36177L2.99764 8.10652L12.9752 13.8513L22.9541 8.10527L12.9752 2.36177H12.9777ZM18.1678 38.2138L23.9574 34.8809V9.83281L19.7657 12.2459L13.9749 15.5801V40.6281L18.1678 38.2138ZM48.9133 9.14105L38.9344 14.8858L48.9133 20.6305L58.8909 14.8846L48.9133 9.14105ZM47.9149 22.3593L42.124 19.0252L37.9323 16.6121V27.9844L43.7219 31.3174L47.9149 33.7317V22.3593ZM24.9533 47.987L39.59 39.631L46.9065 35.4555L36.9352 29.7145L25.4544 36.3242L14.9907 42.3482L24.9533 47.987Z" fill="currentColor"/>
                            </svg>
                            <span className="site-logo-name">Laravel</span>
                        </div>
                        <nav className="site-nav">
                            {auth.user ? (
                                <Link href={route('dashboard')} className="nav-link nav-link-cta">Dashboard</Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="nav-link">Sign in</Link>
                                    <Link href={route('register')} className="nav-link nav-link-cta">Get started</Link>
                                </>
                            )}
                        </nav>
                    </header>

                    {/* Hero */}
                    <section className="hero">
                        <div className="animate-in delay-1">
                            <div className="hero-eyebrow">
                                <div className="hero-eyebrow-line"></div>
                                <span className="hero-eyebrow-text">The PHP Framework</span>
                            </div>
                            <h1 className="hero-headline">
                                Build something <em>extraordinary</em>
                            </h1>
                            <p className="hero-body">
                                Laravel gives you the tools and structure to craft web applications with elegance and precision — from expressive routing to powerful queuing.
                            </p>
                        </div>
                        <div className="hero-right animate-in delay-2">
                            <div className="stat-row">
                                <div className="stat-card">
                                    <div className="stat-number">10M+</div>
                                    <div className="stat-label">Downloads / mo</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-number">90k+</div>
                                    <div className="stat-label">GitHub Stars</div>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number" style={{fontSize:'1.4rem', marginBottom:'0.1rem'}}>Expressive · Elegant · Scalable</div>
                                <div className="stat-label">Crafted for developer happiness</div>
                            </div>
                        </div>
                    </section>

                    {/* Section divider */}
                    <div className="section-rule animate-in delay-2">
                        <span className="section-rule-label">Resources & Ecosystem</span>
                    </div>

                    {/* Cards */}
                    <main>
                        <div className="cards-grid animate-in delay-3">
                            {/* Docs — tall card */}
                            <a href="https://laravel.com/docs" id="docs-card" className="card card-span-2">
                                <div className="card-header">
                                    <div className="card-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                            <polyline points="14 2 14 8 20 8"/>
                                            <line x1="16" y1="13" x2="8" y2="13"/>
                                            <line x1="16" y1="17" x2="8" y2="17"/>
                                            <polyline points="10 9 9 9 8 9"/>
                                        </svg>
                                    </div>
                                    <svg className="card-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                                    </svg>
                                </div>
                                <div id="screenshot-container" className="docs-preview">
                                    <img
                                        src="https://laravel.com/assets/img/welcome/docs-light.svg"
                                        alt="Laravel documentation"
                                        onError={handleImageError}
                                    />
                                    <div className="docs-preview-fade"></div>
                                </div>
                                <div>
                                    <h2 className="card-title">Documentation</h2>
                                    <p className="card-body">
                                        Laravel has wonderful, thorough documentation covering every aspect of the framework. Whether you're new or have prior experience, start here.
                                    </p>
                                </div>
                                <span className="card-tag">Start here</span>
                            </a>

                            {/* Laracasts */}
                            <a href="https://laracasts.com" className="card">
                                <div className="card-header">
                                    <div className="card-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                                            <polygon points="23 7 16 12 23 17 23 7"/>
                                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                                        </svg>
                                    </div>
                                    <svg className="card-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="card-title">Laracasts</h2>
                                    <p className="card-body">Thousands of video tutorials on Laravel, PHP, and JavaScript. Level up your craft.</p>
                                </div>
                                <span className="card-tag">Video series</span>
                            </a>

                            {/* News */}
                            <a href="https://laravel-news.com" className="card">
                                <div className="card-header">
                                    <div className="card-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                                            <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
                                            <path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6z"/>
                                        </svg>
                                    </div>
                                    <svg className="card-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="card-title">Laravel News</h2>
                                    <p className="card-body">Tutorials, packages, and the latest from the Laravel community in one place.</p>
                                </div>
                                <span className="card-tag">Community</span>
                            </a>
                        </div>

                        {/* Ecosystem card */}
                        <div className="card animate-in delay-4" style={{marginBottom: '0'}}>
                            <div className="card-header">
                                <div className="card-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                                        <circle cx="12" cy="12" r="2"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                                    </svg>
                                </div>
            </div>
                            <div>
                                <h2 className="card-title">The Ecosystem</h2>
                                <p className="card-body ecosystem-links">
                                    <a href="https://vapor.laravel.com" className="eco-link">Vapor</a>,{' '}
                                    <a href="https://forge.laravel.com" className="eco-link">Forge</a>,{' '}
                                    <a href="https://nova.laravel.com" className="eco-link">Nova</a>,{' '}
                                    <a href="https://envoyer.io" className="eco-link">Envoyer</a>, and{' '}
                                    <a href="https://herd.laravel.com" className="eco-link">Herd</a> help you take projects to the next level.
                                    Pair with libraries like{' '}
                                    <a href="https://laravel.com/docs/billing" className="eco-link">Cashier</a>,{' '}
                                    <a href="https://laravel.com/docs/dusk" className="eco-link">Dusk</a>,{' '}
                                    <a href="https://laravel.com/docs/broadcasting" className="eco-link">Echo</a>,{' '}
                                    <a href="https://laravel.com/docs/horizon" className="eco-link">Horizon</a>,{' '}
                                    <a href="https://laravel.com/docs/sanctum" className="eco-link">Sanctum</a>, and{' '}
                                    <a href="https://laravel.com/docs/telescope" className="eco-link">Telescope</a>.
                                </p>
                            </div>
                        </div>
                    </main>

                    <footer className="site-footer animate-in delay-5">
                        <span className="footer-text">Laravel v{laravelVersion} · PHP v{phpVersion}</span>
                        <span className="footer-badge">Built with care</span>
                    </footer>
                </div>
            </div>
        </>
    );
}
