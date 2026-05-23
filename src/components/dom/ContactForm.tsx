'use client'

import { useState, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { playHoverSound } from '@/lib/audio'
import Magnetic from './Magnetic'

export default function ContactForm() {
  const { language, triggerShockwave } = useStore()
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  const t = {
    EN: {
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send Message',
      success: 'Message Sent Successfully',
      error: 'Something went wrong. Please try again.',
      placeholder: 'Tell me about your project...'
    },
    FR: {
      name: 'Nom',
      email: 'Email',
      message: 'Message',
      send: 'Envoyer le Message',
      success: 'Message Envoyé avec Succès',
      error: 'Une erreur est survenue. Veuillez réessayer.',
      placeholder: 'Parlez-moi de votre projet...'
    }
  }

  const content = language === 'EN' ? t.EN : t.FR

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    
    const formData = new FormData(e.currentTarget)
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        playHoverSound()
        triggerShockwave() // WebGL reward
        if (formRef.current) formRef.current.reset()
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        console.error("Submission Error:", data)
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      }
    } catch (error) {
      console.error("Fetch Error:", error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const inputStyles = "w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-white/40 focus:bg-white/[0.05] transition-all duration-500 placeholder:text-white/20"

  if (status === 'success') {
    return (
      <div className="w-full max-w-xl p-12 bg-white/[0.02] border border-white/10 rounded-[3rem] flex flex-col items-center justify-center text-center animate-fade-in">
        <CheckCircle2 className="w-16 h-16 text-white mb-6" />
        <h4 className="text-2xl font-bold mb-2">{content.success}</h4>
        <p className="text-white/40 text-sm italic">I will get back to you shortly.</p>
      </div>
    )
  }

  return (
    <form 
      ref={formRef} 
      onSubmit={handleSubmit}
      className="w-full max-w-2xl p-8 md:p-12 bg-white/[0.02] border border-white/10 rounded-[3rem] backdrop-blur-xl relative overflow-hidden group"
    >
      {/* Background Interactive Glow */}
      <div className="absolute -inset-[100%] bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

      <div className="space-y-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2 text-left">
            <label className="text-[10px] uppercase tracking-widest text-white/30 ml-2">{content.name}</label>
            <input required name="name" type="text" placeholder="Mohamed Hamouchi" className={inputStyles} />
          </div>
          <div className="space-y-2 text-left">
            <label className="text-[10px] uppercase tracking-widest text-white/30 ml-2">{content.email}</label>
            <input required name="email" type="email" placeholder="mohamed@example.com" className={inputStyles} />
          </div>
        </div>
        
        <div className="space-y-2 text-left">
          <label className="text-[10px] uppercase tracking-widest text-white/30 ml-2">{content.message}</label>
          <textarea required name="message" rows={4} placeholder={content.placeholder} className={`${inputStyles} resize-none`} />
        </div>

        <div className="pt-6 flex justify-center">
          <Magnetic strength={0.1}>
            <button 
              disabled={status === 'submitting'}
              type="submit" 
              className="px-20 relative group/btn overflow-hidden border border-white/10 bg-white/5 py-6 rounded-2xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-10 transition-opacity duration-500" />
              
              <span className="relative z-10 text-white font-bold uppercase tracking-[0.2em] text-[10px] group-hover/btn:tracking-[0.3em] transition-all duration-500">
                {status === 'submitting' ? (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : status === 'error' ? (
                  <span className="flex items-center gap-2 text-red-400">
                    <AlertCircle className="w-4 h-4" /> {content.error}
                  </span>
                ) : (
                  <span className="flex items-center gap-3">
                    {content.send} <Send className="w-3 h-3 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-500" />
                  </span>
                )}
              </span>
            </button>
          </Magnetic>
        </div>
      </div>
    </form>
  )
}
