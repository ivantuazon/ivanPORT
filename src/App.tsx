import { useEffect, useMemo, useState } from 'react'
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronDown, Code2, Command, Copy, Github, Linkedin, Mail, Menu, Moon, Search, Sun, X } from 'lucide-react'
import { experience, profile, projects, skillGroups, type Project } from './data'

const sections = [
  { name:'About', hash:'#about' }, { name:'Projects', hash:'#projects' },
  { name:'Experience', hash:'#experience' }, { name:'Stack', hash:'#stack' }, { name:'Contact', hash:'#contact' },
]

function ProjectArt({ type }: { type: Project['image'] }) {
  if (type === 'lasfamilias') return <div className="art art-lasfamilias">
    <div className="resort-sun"/><div className="resort-hill resort-hill-back"/><div className="resort-hill resort-hill-front"/>
    <div className="resort-preview"><div className="resort-preview-top"><span>✳ &nbsp; LAS FAMILIAS</span><span>RESORT</span></div><div className="resort-preview-content"><span className="resort-kicker">YOUR NEXT ESCAPE</span><strong>Relax. Refresh.<br/>Reconnect.</strong><span className="resort-mini-pill">Explore your stay ↗</span></div></div>
  </div>
  return null
}

function SectionHead({ number, title, aside }: { number:string;title:string;aside?:string }) {
 return <div className="section-heading"><h2><span>{number}</span><span className="heading-dash">—</span>{title}</h2>{aside && <div className="section-aside">{aside}<ArrowUpRight size={15}/></div>}</div>
}

function App() {
 const [dark,setDark] = useState(false)
 const [menu,setMenu] = useState(false)
 const [searchOpen,setSearchOpen] = useState(false)
 const [term,setTerm] = useState('')
 const [filter,setFilter] = useState('All')
 const [copied,setCopied] = useState(false)
 const [expanded,setExpanded] = useState(false)
 const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))]
 const filtered = useMemo(() => projects.filter(p => filter === 'All' || p.category === filter), [filter])
 const searchResults = useMemo(() => [...sections.map(s=>({name:s.name,detail:'Portfolio section',href:s.hash})),...projects.map(p=>({name:p.title,detail:p.eyebrow,href:'#projects'}))].filter(v => `${v.name} ${v.detail}`.toLowerCase().includes(term.toLowerCase())),[term])
 useEffect(() => {
  const theme = window.localStorage.getItem('portfolio-theme')
  if (theme === 'dark') setDark(true)
 }, [])
 useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light'; window.localStorage.setItem('portfolio-theme',dark?'dark':'light') },[dark])
 useEffect(() => {
  const handler = (e: KeyboardEvent) => {
   if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault();setSearchOpen(v=>!v) }
   if (e.key === 'Escape') { setSearchOpen(false);setMenu(false) }
  }
  window.addEventListener('keydown',handler)
  return () => window.removeEventListener('keydown',handler)
 },[])
 const copyEmail = async () => {
  if (!profile.email) return
  try { await navigator.clipboard.writeText(profile.email);setCopied(true);window.setTimeout(()=>setCopied(false),1800) } catch { window.location.href = `mailto:${profile.email}` }
 }
 const closeMenu = () => setMenu(false)
 return <>
  <div className="site-shell">
   <header className="header"><a href="#top" className="brand" onClick={closeMenu}><span className="brand-dot"/>{profile.name}<span className="brand-period">.</span></a>
    <nav className="desktop-nav" aria-label="Main navigation">{sections.map(s=><a key={s.name} href={s.hash}>{s.name}</a>)}</nav>
    <div className="nav-actions"><button className="search-trigger" onClick={()=>setSearchOpen(true)} aria-label="Open site search"><Search size={15}/><span>Quick find</span><kbd>⌘ K</kbd></button><button className="icon-button" onClick={()=>setDark(!dark)} aria-label={dark?'Switch to light theme':'Switch to dark theme'}>{dark?<Sun size={17}/>:<Moon size={17}/>}</button><button className="icon-button mobile-menu" onClick={()=>setMenu(!menu)} aria-label="Toggle navigation">{menu?<X size={20}/>:<Menu size={20}/>}</button></div>
   </header>
   {menu && <nav className="mobile-nav">{sections.map(s=><a key={s.name} onClick={closeMenu} href={s.hash}>{s.name}<ArrowUpRight size={16}/></a>)}</nav>}
   <main id="top">
    <section className="hero" id="about">
     <div className="hero-main"><div className="hero-left"><div className="eyebrow"><span className="status-dot"/> {profile.availability}</div><div className="hero-avatar" aria-label={profile.image ? `${profile.name || 'Portfolio'} profile image` : 'Placeholder profile image'}>{profile.image ? <img src={profile.image} alt={`${profile.name || 'Portfolio'} profile`} className="hero-avatar-image"/> : <span>{profile.initials}</span>}<div className="avatar-stamp">BUILD<br/>LEARN<br/>CREATE</div></div></div>
      <div className="hero-content"><div className="small-topline">HELLO, I'M A</div><h1>{profile.name}<span className="hero-spark">✳</span></h1><p className="hero-role">{profile.role}<span className="hero-location"> / {profile.location}</span></p><p className="hero-intro">{profile.intro}</p><p className="hero-description">{profile.description}</p><div className="hero-socials">{profile.github && <a href={profile.github} target="_blank" rel="noreferrer"><Github size={16}/> github <ArrowUpRight size={14}/></a>}{profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16}/> linkedin <ArrowUpRight size={14}/></a>}{profile.email && <a href={`mailto:${profile.email}`}><Mail size={16}/> email <ArrowUpRight size={14}/></a>}{profile.resume && <a href={profile.resume} target="_blank" rel="noreferrer">resume <ArrowUpRight size={14}/></a>}{!profile.github && !profile.linkedin && !profile.email && <span className="pending-social">Social links will appear here once configured.</span>}</div></div></div>
     <div className="hero-bottom"><div className="hero-note">A selection of things I've been building, exploring, and learning.</div><a className="scroll-cue" href="#projects">SCROLL TO EXPLORE <ArrowDownRight size={17}/></a></div>
    </section>
    <section className="portfolio-section" id="projects"><SectionHead number="01" title="selected projects" aside="Things I've been working on"/>
      <div className="section-subtitle">A look at what I've been building and learning along the way.</div>
      <div className="filter-row" aria-label="Filter projects">{categories.map(cat=><button key={cat} onClick={()=>setFilter(cat)} className={`filter-pill ${filter===cat?'selected':''}`}>{cat}</button>)}</div>
      <div className="projects-grid">{filtered.length ? filtered.map(p=><article className="project-card" key={p.title}><ProjectArt type={p.image}/><div className="project-details"><div className="project-meta"><span>{p.eyebrow}</span><span>{p.number} / {String(projects.length).padStart(2, '0')}</span></div><div className="project-title-row"><h3>{p.title}</h3>{(p.demo || p.github) && <a href={(p.demo || p.github)!} target="_blank" rel="noreferrer" aria-label={`View ${p.title}`}><ArrowUpRight size={20}/></a>}</div><p>{p.description}</p><div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div></div></article>) : <div className="no-results">No projects in this category yet. <button onClick={()=>setFilter('All')}>Show all projects</button></div>}</div>
     </section>
    <section className="portfolio-section experience-section" id="experience"><SectionHead number="02" title="experience" aside="Learning & building"/><div className="experience-list">{experience.map((e,i)=><div className="experience-item" key={i}><span className="exp-year">{e.time}</span><div><h3>{e.title}</h3><div className="exp-org">{e.organization}</div><p>{e.detail}</p></div><ArrowUpRight className="exp-arrow" size={19}/></div>)}</div></section>
    <section className="portfolio-section stack-section" id="stack"><SectionHead number="03" title="toolkit" aside="Technologies & tools"/><div className="stack-intro"><Code2 size={23}/><p>Languages, tools, and areas I use or am learning through coursework and projects. <span>Always learning, always building.</span></p></div><div className="skill-groups">{skillGroups.map(group=><div className="skill-group" key={group.category}><div className="skill-label">{group.category}</div><div className="skill-items">{group.skills.map(t=><span className="skill-tag" key={t}>{t}</span>)}</div></div>)}</div></section>
    <section className="portfolio-section now-section"><SectionHead number="04" title="a little more"/><button className="now-toggle" onClick={()=>setExpanded(!expanded)} aria-expanded={expanded}><div><span className="mini-eyebrow">CURRENTLY FOCUSED ON</span><h3>Learning to build the apps and games I imagine.</h3></div><ChevronDown size={20} className={expanded?'rotated':''}/></button>{expanded && <p className="now-expanded">I'm exploring game development and building applications while sharpening my programming skills through practice and real projects. I'm excited to keep learning and improve with every project.</p>}</section>
    <section className="contact-section" id="contact"><div className="contact-small"><span className="status-dot"/> HAVE SOMETHING IN MIND?</div><h2>Let's build<br/><em>something good.</em></h2><p>I'm always excited to learn, connect with other builders, and explore new ideas in games and applications.</p>{profile.email ? <div className="contact-actions"><a className="contact-primary" href={`mailto:${profile.email}`}>Get in touch <ArrowUpRight size={19}/></a><button onClick={copyEmail} className="contact-copy">{copied?<Check size={17}/>:<Copy size={17}/>} {copied?'Copied!':'Copy email'}</button></div> : <div className="contact-placeholder">Add your email in <code>src/data.ts</code> to enable contact buttons.</div>}<div className="contact-deco">✳</div></section>
   </main>
   <footer className="footer"><div><span className="footer-mark">✳</span> {profile.name} <span className="footer-muted">© {new Date().getFullYear()}</span></div><div className="footer-right"><span>Made with curiosity.</span><a href="#top">Back to top ↑</a></div></footer>
  </div>
  {searchOpen && <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setSearchOpen(false)}}><div className="command-dialog" role="dialog" aria-modal="true" aria-label="Quick navigation"><div className="command-input"><Search size={19}/><input autoFocus placeholder="Search pages or projects..." value={term} onChange={e=>setTerm(e.target.value)}/><button onClick={()=>setSearchOpen(false)} aria-label="Close search"><X size={17}/></button></div><div className="command-heading">QUICK NAVIGATION</div><div className="command-results">{searchResults.length?searchResults.map((r,i)=><a key={`${r.name}-${i}`} href={r.href} onClick={()=>{setSearchOpen(false);setTerm('')}}><span><Command size={16}/><span><strong>{r.name}</strong><small>{r.detail}</small></span></span><ArrowRight size={17}/></a>):<p className="command-empty">No matching sections found.</p>}</div><div className="command-footer"><span><kbd>ESC</kbd> to close</span><span><kbd>⌘</kbd> + <kbd>K</kbd> to toggle</span></div></div></div>}
 </>
}
export default App