import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import SectionHeader from './components/SectionHeader'
import WorkCard from './components/WorkCard'
import { navLinks, skills, projects } from './data'
import perfil2 from './assets/perfil2.png'
import work1 from './assets/work1.png'
import work3 from './assets/work3.jpg'
import './App.css'

const aboutText = `I’m Robert Musili. I build websites with React and keep things simple, reliable, and easy to understand.

I care about writing clean components and sensible styles, not tricks. I try to make the interface easy to use and the code easy to follow. When I work on a site, I think about how it will behave across devices and how it will hold up over time.

On the backend, I like straightforward logic and clear input handling. I prefer code that does what it says and is easy to maintain.

Security is part of the process, not an afterthought. I pay attention to data handling, validation, and keeping the boundaries between parts of the system clear.

I don’t chase every trend. I build things that work, and I improve them with real feedback. No shortcuts. No excuses.`

function App() {
  const [status, setStatus] = useState(null)
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    // If the page was reloaded, force scroll to top and clear hash to avoid automatic jump
    try {
      let isReload = false
      const navEntries = performance.getEntriesByType ? performance.getEntriesByType('navigation') : null
      if (navEntries && navEntries.length) {
        isReload = navEntries[0].type === 'reload'
      } else if (performance.navigation) {
        isReload = performance.navigation.type === 1
      }

      if (isReload) {
        window.scrollTo(0, 0)
        if (window.location.hash) {
          history.replaceState(null, '', window.location.pathname + window.location.search)
        }
      }
    } catch (e) {
      // ignore
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    setIsSending(true)
    setStatus(null)

    try {
      const response = await fetch('https://formspree.io/f/mbdpqkao', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })

      if (response.ok) {
        setStatus({ message: 'Message sent successfully.', type: 'success' })
        form.reset()
      } else {
        setStatus({ message: 'Something went wrong.', type: 'error' })
      }
    } catch {
      setStatus({ message: 'Network error.', type: 'error' })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="app">
      <Navbar links={navLinks} />
      <main>
        <section className="Home Grid" id="Home">
          <div className="Home__Data">
            <h1 className="Home__Title">
              Hi,
              <br />
              I'm
              <span className="home__Title__color"> ROBERT MUSILI </span>
              <br />
              Web Developer.
            </h1>
            <a href="#Contact" className="Home__Button__Contact">
              Contact
            </a>
          </div>
          <div className="Home__img">
            <img src={perfil2} alt="Robert Musili" />
          </div>
        </section>

        <section className="About Section" id="About">
          <SectionHeader title="ABOUT" />
          <div className="About__Container Grid">
            <div className="About__Image">
              <img src={perfil2} alt="About Robert" />
            </div>
            <div>
              <h2 className="About__SubTitle">I'm ROBERT MUSILI</h2>
              <p className="About__Text">{aboutText}</p>
            </div>
          </div>
        </section>

        <section className="Work Section" id="Work">
          <SectionHeader title="PROJECTS" />
          <div className="Work__Container Grid">
            {projects.map((project, index) => (
              <WorkCard
                key={`${project.title}-${index}`}
                href={project.href}
                image={work1}
                title={project.title}
                note={project.note}
              />
            ))}
          </div>
        </section>

        <section className="Contact Section" id="Contact">
          <SectionHeader title="CONTACT" />
          <div className="Contact__Container Grid">
            <form id="contact-form" className="Contact__Form" onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Your Full Name" className="Contact__Input" required />
              <input type="tel" name="phone" placeholder="Your Phone Number" className="Contact__Input" />
              <input type="email" name="email" placeholder="Your Email" className="Contact__Input" required />
              <div className="TextareaWrapper">
                {status ? (
                  <div className={`form-status-floating ${status.type === 'error' ? 'error' : ''}`}>
                    {status.message}
                  </div>
                ) : null}
                <textarea name="message" rows="10" className="Contact__Input" placeholder="Your Message..." required />
              </div>
              <button type="submit" className="Contact__Button Button" disabled={isSending}>
                {isSending ? 'Sending...' : 'SEND'}
              </button>
            </form>
          </div>
        </section>
        
        <section className="Skills Section" id="Skills">
          <SectionHeader title="SKILLS" />
          <div className="Skills__Container Grid">
            <h2 className="Skills__Subtitle">PROFESSIONAL SKILLS</h2>
            <div>
              {skills.map((skill) => (
                <div key={skill.name} className="Skills__Data">
                  <div className="Skills__Names">
                    <i className={`${skill.icon} Skills__Icons`} />
                    <span className="Skills__Name">{skill.name}</span>
                  </div>
                  <p className="Skills__Description">{skill.description}</p>
                </div>
              ))}
            </div>
            <div>
              <img src={work3} alt="Skills" className="Skills__IMG" />
            </div>
          </div>
        </section>
      </main>

      <footer className="Footers">
        <p className="Footer__Title">SOCIAL MEDIA</p>
        <div className="Footer__Social">
          <a href="https://www.facebook.com/" className="Footer__Icon" target="_blank" rel="noreferrer">
            <i className="bx bxl-facebook" />
          </a>
          <a href="https://www.tiktok.com/" className="Footer__Icon" target="_blank" rel="noreferrer">
            <i className="bx bxl-tiktok" />
          </a>
          <a href="https://twitter.com/" className="Footer__Icon" target="_blank" rel="noreferrer">
            <i className="bx bxl-twitter" />
          </a>
        </div>
        <a href="#Home" className="BackToTop" aria-label="Back to top">
          <i className="bx bx-up-arrow-alt" />
        </a>
        <p>&#169; 2026 COPYRIGHT ALL RIGHT RESERVED</p>
      </footer>
    </div>
  )
}

export default App
