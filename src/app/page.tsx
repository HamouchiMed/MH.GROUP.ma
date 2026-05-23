'use client'

import { ArrowRight, ExternalLink } from 'lucide-react'
import Reveal from '@/components/dom/Reveal'
import Magnetic from '@/components/dom/Magnetic'
import MinimalProjectCard from '@/components/dom/MinimalProjectCard'
import StackedProjects from '@/components/dom/StackedProjects'
import SkewContainer from '@/components/dom/SkewContainer'
import HeroText from '@/components/dom/HeroText'
import ScrambleText from '@/components/dom/ScrambleText'
import ElasticText from '@/components/dom/ElasticText'
import Marquee from '@/components/dom/Marquee'
import Testimonials from '@/components/dom/Testimonials'
import ContactForm from '@/components/dom/ContactForm'
import TechIcon from '@/components/dom/TechLogos'
import AbstractIllustration from '@/components/dom/AbstractIllustration'
import MagneticHeading from '@/components/dom/MagneticHeading'
import ExperienceTimeline from '@/components/dom/ExperienceTimeline'
import { useStore } from '@/store/useStore'

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
)

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
)

export default function Home() {
  const { language, setCursorText, setHoveredSkill } = useStore()

  const t = {
    EN: {
      subtitle: 'Full-Stack Developer Junior',
      heroDesc: 'I build digital architectures that merge technical precision with immersive aesthetics. Currently shaping the future of web and mobile applications from Berrechid, Maroc.',
      viewWork: 'VIEW RECENT WORK',
      downloadCv: 'DOWNLOAD CV',
      marquee: 'OPEN FOR FREELANCE • AVAILABLE IN MOROCCO • READY TO BUILD • FULL-STACK SOLUTIONS',
      expertiseTitle: 'Core Expertise',
      exp01: 'Frontend Architecture',
      exp01Desc: 'Designing high-performance, immersive interfaces with React, Next.js, and GSAP.',
      exp02: 'Mobile Product Design',
      exp02Desc: 'Building robust, native-feel mobile applications for iOS and Android with React Native.',
      exp03: 'Full-Stack Engineering',
      exp03Desc: 'Scaling secure backend systems using Node.js, Laravel, and complex PostgreSQL databases.',
      bioTitle: 'Biography',
      bioHeadline: 'Bridging the gap between robust backend systems and fluid frontend interfaces.',
      bioDesc: 'I am a 2nd-year IT Management student at EST Dakhla, passionate about software and mobile development with a solid foundation in programming, databases, and application design. I thrive on hands-on projects and building efficient, real-world solutions.',
      eduTitle: 'Education',
      timelineTitle: 'Professional Track',
      skillsTitle: 'Technical Skills',
      softTitle: 'Soft Skills',
      availability: 'Availability',
      openFor: 'Open for Freelance',
      projects: 'Full-Stack & Mobile Projects',
      getInTouch: 'Get in Touch',
      startProject: 'START A PROJECT'
    },
    FR: {
      subtitle: 'Développeur Full-Stack Junior',
      heroDesc: 'Je construis des architectures digitales alliant précision technique et esthétique immersive. Je façonne actuellement l’avenir des applications web et mobiles depuis Berrechid, Maroc.',
      viewWork: 'VOIR MES TRAVAUX',
      downloadCv: 'TÉLÉCHARGER CV',
      marquee: 'DISPONIBLE POUR FREELANCE • BASÉ AU MAROC • PRÊT À CONSTRUIRE • SOLUTIONS FULL-STACK',
      expertiseTitle: 'Domaines d’Expertise',
      exp01: 'Architecture Frontend',
      exp01Desc: 'Conception d’interfaces immersives haute performance avec React, Next.js et GSAP.',
      exp02: 'Design de Produit Mobile',
      exp02Desc: 'Développement d’applications mobiles robustes pour iOS et Android via React Native.',
      exp03: 'Ingénierie Full-Stack',
      exp03Desc: 'Mise à l’échelle de systèmes backend sécurisés avec Node.js, Laravel et PostgreSQL.',
      bioTitle: 'Biographie',
      bioHeadline: 'Combler le fossé entre les systèmes backend robustes et les interfaces frontend fluides.',
      bioDesc: 'Je suis étudiant en 2ème année de DUT en Informatique de Gestion à l’EST Dakhla, passionné par le développement logiciel et mobile. J’ai une base solide en programmation, bases de données et conception d’applications.',
      eduTitle: 'Formation',
      timelineTitle: 'Parcours Professionnel',
      skillsTitle: 'Compétences Techniques',
      softTitle: 'Soft Skills',
      availability: 'Disponibilité',
      openFor: 'Disponible en Freelance',
      projects: 'Projets Full-Stack & Mobiles',
      getInTouch: 'Contactez-moi',
      startProject: 'LANCER UN PROJET'
    }
  }

  const content = language === 'EN' ? t.EN : t.FR

  const categorizedSkills = [
    { label: { EN: 'Mobile', FR: 'Mobile' }, skills: ['React Native'] },
    { label: { EN: 'Full-Stack Web', FR: 'Développement Web Full-Stack' }, skills: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'Express.js'] },
    { label: { EN: 'Backend', FR: 'Backend' }, skills: ['Java', 'Laravel', 'Python', 'C', 'API REST'] },
    { label: { EN: 'Database', FR: 'Base de données' }, skills: ['PostgreSQL', 'pgAdmin4', 'SQL', 'mysql'] },
    { label: { EN: 'Auth & Security', FR: 'Authentification & Sécurité' }, skills: ['OAuth 2.0', 'JWT'] },
    { label: { EN: 'Tools', FR: 'Outils' }, skills: ['Git', 'GitHub', 'Postman', 'Hostinger', 'Slack', 'Loom'] }
  ]

  const timelineEvents = [
    {
      date: '2026 - PRESENT',
      title: 'FMMED Portfolio',
      company: 'Creative Architect',
      desc: language === 'EN' ? 'Designing immersive WebGL experiences.' : 'Conception d’expériences WebGL immersives.'
    },
    {
      date: '2025 - 2026',
      title: 'OneBotAds',
      company: 'Full-Stack Intern',
      desc: language === 'EN' ? 'Automating SaaS advertising workflows.' : 'Automatisation des workflows publicitaires SaaS.'
    },
    {
      date: '2024 - 2025',
      title: 'SIENDO Group',
      company: 'Mobile Developer Intern',
      desc: language === 'EN' ? 'Standardizing mobile security & auth.' : 'Standardisation de la sécurité et auth mobile.'
    },
    {
      date: '2024',
      title: 'Obbo Mobile',
      company: 'Lead Freelance',
      desc: language === 'EN' ? 'Building anti-waste marketplace MVP.' : 'Construction du MVP de marketplace anti-gaspi.'
    },
    {
      date: '2024 - 2026',
      title: 'EST Dakhla',
      company: 'Academic DUT',
      desc: language === 'EN' ? 'Studying IT Management & Systems.' : 'Études en Informatique de Gestion.'
    }
  ]

  return (
    <SkewContainer className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="h-screen flex flex-col justify-center px-10 md:px-20">
        <Reveal delay={0.2}>
          <h2 className="text-[11px] uppercase tracking-[0.3em] text-white/20 mb-8 mt-10">
            <ScrambleText text={content.subtitle} />
          </h2>
        </Reveal>
        
        <Reveal delay={0.4} duration={1.5}>
          <div onMouseEnter={() => setCursorText("NAME")} onMouseLeave={() => setCursorText(null)} className="flex flex-col">
            <MagneticHeading 
              text="MOHAMED" 
              className="text-[14vw] md:text-[9vw] font-black leading-[0.8] tracking-[-0.04em] mix-blend-difference text-white uppercase select-none cursor-default"
            />
            <MagneticHeading 
              text="HAMOUCHI" 
              className="text-[14vw] md:text-[9vw] font-black mb-10 leading-[0.8] tracking-[-0.04em] mix-blend-difference text-white uppercase select-none cursor-default"
            />
          </div>
        </Reveal>

        <Reveal delay={0.6}>
          <p className="max-w-xl text-lg text-gray-400 mb-10 leading-relaxed">
            {content.heroDesc}
          </p>
        </Reveal>

        <div className="flex flex-wrap items-center gap-8">
          <Reveal delay={0.8}>
            <div className="flex flex-wrap items-center gap-4">
              <Magnetic strength={0.2}>
                <a href="#work" className="group flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full transition-transform duration-500 font-bold tracking-tight text-xs">
                  <ScrambleText text={content.viewWork} /> <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a href="/cv.pdf" target="_blank" className="group flex items-center gap-4 border border-white/20 text-white px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-500 font-bold tracking-tight cursor-pointer text-xs">
                  <ScrambleText text={content.downloadCv} />
                </a>
              </Magnetic>
            </div>
          </Reveal>
          
          <div className="flex items-center gap-4">
            <Reveal delay={1.0}>
              <Magnetic strength={0.3}>
                <a href="https://github.com/HamouchiMed" target="_blank" className="p-4 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              </Magnetic>
            </Reveal>
            <Reveal delay={1.1}>
              <Magnetic strength={0.3}>
                <a href="https://linkedin.com/in/mohamed-hamouchi-5093743a8" target="_blank" className="p-4 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Interactive Marquee */}
      <Marquee text={content.marquee} speed={0.4} />

      {/* Trusted By / Brands Section */}
      <section className="py-20 px-10 md:px-20 border-t border-white/5 bg-white/[0.01]">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 mb-12 text-center font-bold italic underline underline-offset-8 decoration-white/5">Industry Collaborations</p>
        </Reveal>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 hover:opacity-100 transition-opacity duration-1000">
           {['JOBISTART', 'SIENDO GROUP', 'OBBO', 'ESTD', 'ENCG', 'OUCHARI SUD'].map((brand) => (
             <Reveal key={brand} delay={0.2}>
               <Magnetic strength={0.2}>
                 <div 
                   onMouseEnter={() => {
                     setCursorText(
                        brand === 'JOBISTART' ? 'REACT' : 
                        brand === 'SIENDO GROUP' ? 'MOBILE' : 
                        brand === 'OBBO' ? 'FREELANCE' : 
                        brand === 'ESTD' ? 'ACADEMIC' : 
                        brand === 'ENCG' ? 'INSTITUTION' : 'ENTERPRISE'
                     )
                     setHoveredSkill(
                        brand === 'JOBISTART' ? 'React.js' : 
                        brand === 'SIENDO GROUP' ? 'React Native' : 
                        brand === 'OBBO' ? 'Node.js' : 
                        brand === 'ESTD' ? 'Java' : 
                        brand === 'ENCG' ? 'React 19' : 'Vanilla JS'
                     )
                   }}
                   onMouseLeave={() => {
                     setCursorText(null)
                     setHoveredSkill(null)
                   }}
                   className="cursor-help"
                 >
                   <ScrambleText text={brand} className="text-xl md:text-2xl font-black tracking-tighter hover:text-white transition-colors" />
                 </div>
               </Magnetic>
             </Reveal>
           ))}
        </div>
      </section>

      {/* Projects Section */}
      <div onMouseEnter={() => setCursorText("EXPLORE")} onMouseLeave={() => setCursorText(null)}>
        <StackedProjects />
      </div>

      {/* Expertise Pillars Section */}
      <section className="py-40 px-10 md:px-20 border-t border-white/5 relative overflow-hidden">
        <AbstractIllustration className="absolute -right-20 top-20 w-[40vw] h-[40vw] opacity-10" />
        
        <div className="mb-24 relative z-10">
          <Reveal>
            <h2 className="text-[9px] uppercase tracking-[0.5em] text-white/20 mb-4">{content.expertiseTitle}</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <MagneticHeading text={content.expertiseTitle} className="text-4xl md:text-6xl font-black uppercase text-white/40 italic" />
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {[
            { id: '01', title: content.exp01, desc: content.exp01Desc },
            { id: '02', title: content.exp02, desc: content.exp02Desc },
            { id: '03', title: content.exp03, desc: content.exp03Desc }
          ].map((item, i) => (
            <Reveal key={item.id} delay={i * 0.1}>
              <div className="h-full p-10 bg-white/[0.03] border border-white/10 rounded-[3rem] backdrop-blur-2xl hover:bg-white/[0.06] hover:border-white/20 transition-all duration-700 group">
                <span className="text-[10px] font-mono text-white/20 mb-10 block group-hover:text-white/60 transition-colors italic">{item.id}</span>
                <h3 className="text-2xl font-bold uppercase tracking-tighter mb-6 group-hover:italic transition-all duration-500">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* About Section */}
      <section id="about" className="py-32 px-10 md:px-20 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
          {/* Left Column: Text Content */}
          <div className="space-y-24">
            <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] backdrop-blur-xl">
              <Reveal>
                <h2 className="text-[9px] uppercase tracking-[0.5em] text-white/20 mb-10">
                  <ScrambleText text={content.bioTitle} />
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-xl md:text-2xl text-white leading-tight mb-10 tracking-tight">
                  {content.bioHeadline}
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-base text-gray-500 leading-relaxed max-w-xl">
                  {content.bioDesc}
                </p>
              </Reveal>
            </div>
            
            <div className="space-y-16">
              {/* God-Tier Experience Timeline */}
              <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] backdrop-blur-xl">
                <ExperienceTimeline events={timelineEvents} title={content.timelineTitle} />
              </div>

              {/* Technical Skill Blueprint Grid */}
              <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] backdrop-blur-xl overflow-hidden relative">
                <Reveal>
                  <h4 className="text-[10px] uppercase tracking-widest text-white/30 mb-16 font-bold text-center">
                    <ScrambleText text={content.skillsTitle} />
                  </h4>
                </Reveal>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                   {categorizedSkills.map((group, idx) => (
                     <Reveal key={idx} delay={0.05 * idx} direction="left">
                        <div className="relative pl-6 border-l border-white/10">
                           <div className="absolute top-0 left-0 w-1 h-1 bg-white/40 -translate-x-1/2 rounded-full" />
                           <p className="text-[9px] uppercase tracking-[0.2em] text-white/20 mb-6 font-bold">{language === 'EN' ? group.label.EN : group.label.FR}</p>
                           <div className="flex flex-wrap gap-2">
                              {group.skills.map((skill) => (
                                <span 
                                  key={skill} 
                                  onMouseEnter={() => setHoveredSkill(skill)}
                                  onMouseLeave={() => setHoveredSkill(null)}
                                  className="px-4 py-2 border border-white/5 rounded-full text-[10px] uppercase tracking-widest text-white/40 hover:text-white hover:border-white/30 transition-all duration-300 cursor-help bg-white/[0.01]"
                                >
                                  {skill}
                                </span>
                              ))}
                           </div>
                        </div>
                     </Reveal>
                   ))}
                </div>

                {/* Background Decoration */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 border border-white/5 rounded-full pointer-events-none opacity-20" />
                <div className="absolute -top-10 -left-10 w-64 h-64 border border-white/5 rounded-full pointer-events-none opacity-10" />
              </div>

              {/* Soft Skills Section */}
              <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] backdrop-blur-xl">
                <Reveal>
                  <h4 className="text-[10px] uppercase tracking-widest text-white/30 mb-10 font-bold">
                    <ScrambleText text={content.softTitle} />
                  </h4>
                </Reveal>
                <div className="grid grid-cols-2 gap-4">
                   {(language === 'EN' 
                     ? ['Motivated & Serious', 'Team Spirit', 'Creative & Autonomous', 'Fast Learner', 'Problem Solving', 'Adaptability']
                     : ['Motivé & Sérieux', 'Esprit d’équipe', 'Créatif & Autonome', 'Apprentissage rapide', 'Résolution de problèmes', 'Adaptabilité']
                   ).map((skill, i) => (
                     <Reveal key={skill} delay={0.1 * i} direction="left">
                        <div className="flex items-center gap-3 group">
                           <div className="w-1 h-1 bg-white/10 group-hover:bg-white group-hover:scale-150 transition-all duration-500 rounded-full" />
                           <span className="text-xs text-white/40 group-hover:text-white transition-colors font-medium">{skill}</span>
                        </div>
                     </Reveal>
                   ))}
                </div>
              </div>

            </div>
          </div>
          
          {/* Right Column: Profile */}
          <div className="sticky top-28 space-y-12">
            <div className="flex justify-center lg:justify-end">
              <Reveal delay={0.5} className="relative w-full max-w-xs aspect-[3/4] bg-white/5 rounded-[2.5rem] overflow-hidden border border-white/10 group">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                <img src="/images/profile.jpg" alt="Mohamed Hamouchi" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms] opacity-80 grayscale group-hover:grayscale-0" />
                <div className="absolute bottom-12 left-12 z-20">
                    <Reveal delay={0.6}>
                      <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 mb-4">{content.availability}</p>
                      <p className="text-xl font-bold mb-1">{content.openFor}</p>
                      <p className="text-gray-500 text-sm">{content.projects}</p>
                    </Reveal>
                </div>
              </Reveal>
            </div>
            <AbstractIllustration className="w-full h-64 opacity-5" />
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex flex-col justify-center items-center text-center px-10 py-32 border-t border-white/5">
        <Reveal>
          <h2 className="text-[10px] uppercase tracking-[0.5em] text-white/20 mb-6">
            <ScrambleText text={content.getInTouch} />
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-col items-center gap-16">
            <div onMouseEnter={() => setCursorText("SAY HI")} onMouseLeave={() => setCursorText(null)}>
              <a href="mailto:mohamedhamouchi2006@gmail.com" className="group block relative">
                <MagneticHeading 
                  text={language === 'EN' ? 'START A PROJECT' : 'LANCER UN PROJET'} 
                  className="text-4xl md:text-[7.5rem] font-bold tracking-tighter hover:italic transition-all duration-700 uppercase leading-none text-white cursor-default"
                />
                <div className="h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left mt-4" />
              </a>
            </div>
            
            <ContactForm />
          </div>
        </Reveal>
        
        <div className="mt-20 flex flex-col gap-8 items-center">
          <Reveal delay={0.4}>
            <Magnetic strength={0.2}>
              <div onMouseEnter={() => setCursorText("EMAIL")} onMouseLeave={() => setCursorText(null)}>
                <a href="mailto:mohamedhamouchi2006@gmail.com" className="group block">
                  <ElasticText 
                    text="mohamedhamouchi2006@gmail.com" 
                    className="text-lg text-gray-400 group-hover:text-white transition-colors cursor-pointer font-bold tracking-tight"
                  />
                </a>
              </div>
            </Magnetic>
          </Reveal>
          
          <Reveal delay={0.5}>
            <Magnetic strength={0.2}>
              <div onMouseEnter={() => setCursorText("WHATSAPP")} onMouseLeave={() => setCursorText(null)}>
                <a 
                  href="https://wa.me/212687709337" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center"
                >
                  <ElasticText 
                    text="+212 6 87 70 93 37" 
                    className="text-lg text-gray-400 group-hover:text-green-400 transition-colors cursor-pointer font-bold tracking-tight"
                  />
                </a>
              </div>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      <footer className="pb-12 pt-0 px-10 md:px-20 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] uppercase tracking-[0.4em] text-white/20 transition-colors duration-500">
        <p>© 2026 MOHAMED HAMOUCHI — EST DAKHLA</p>
        <div className="flex gap-12">
          <a href="https://github.com/HamouchiMed" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors group">
            <ScrambleText text="Github" />
          </a>
          <a href="https://linkedin.com/in/mohamed-hamouchi-5093743a8" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors group">
            <ScrambleText text="LinkedIn" />
          </a>
        </div>
      </footer>
    </SkewContainer>
  )
}
