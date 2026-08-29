"use client"

import { useState, useEffect } from "react"

export default function Nav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 900) setOpen(false)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  function handleShow(section: string) {
    try {
      if (typeof (window as any).show === "function") {
        ;(window as any).show(section)
      } else {
        // fallback: scroll to anchor or navigate to route if applicable
        if (section === "home") window.location.href = "#/"
        else window.location.hash = `#${section}`
      }
    } catch (e) {
      console.error('handleShow failed', e)
    }
    setOpen(false)
  }

  return (
    <nav className="container" style={{display:'flex',alignItems:'center',gap:12}}>
      <div className="nav-logo" onClick={() => handleShow('home')} style={{cursor:'pointer'}}>
        <div className="nav-logo-mark">M</div>
        Monoversal Hub
      </div>

      <div className="nav-links" role="navigation" aria-label="Primary">
        <a className="nav-link" href="#" onClick={(e)=>{e.preventDefault(); handleShow('home')}}>Home</a>
        <a className="nav-link" href="#" onClick={(e)=>{e.preventDefault(); handleShow('products')}}>Products</a>
        <a className="nav-link" href="#" onClick={(e)=>{e.preventDefault(); handleShow('about')}}>About</a>
        <a className="nav-link" href="#" onClick={(e)=>{e.preventDefault(); handleShow('testimonials')}}>Reviews</a>
        <a className="nav-link" href="#" onClick={(e)=>{e.preventDefault(); handleShow('support')}}>Support</a>
        <a className="nav-link" href="#" onClick={(e)=>{e.preventDefault(); handleShow('care')}}>Contact</a>
        <a className="nav-link" href="#" onClick={(e)=>{e.preventDefault(); handleShow('faq')}}>FAQ</a>
      </div>

      <a className="nav-cta" href="#" onClick={(e)=>{e.preventDefault(); handleShow('waitlist')}}>Try BOSS →</a>

      <button className="hamburger" aria-expanded={open} aria-label="Toggle menu" onClick={() => setOpen(!open)}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      {open && (
        <div className="mobile-menu open" role="menu" aria-hidden={!open}>
          <a className="m-link" href="#" onClick={(e)=>{e.preventDefault(); handleShow('home')}}>🏠 Home</a>
          <a className="m-link" href="#" onClick={(e)=>{e.preventDefault(); handleShow('products')}}>📦 Products</a>
          <a className="m-link" href="#" onClick={(e)=>{e.preventDefault(); handleShow('about')}}>🏢 About</a>
          <a className="m-link" href="#" onClick={(e)=>{e.preventDefault(); handleShow('testimonials')}}>⭐ Reviews</a>
          <a className="m-link" href="#" onClick={(e)=>{e.preventDefault(); handleShow('support')}}>❤️ Support</a>
          <a className="m-link" href="#" onClick={(e)=>{e.preventDefault(); handleShow('care')}}>📞 Contact</a>
          <a className="m-link" href="#" onClick={(e)=>{e.preventDefault(); handleShow('faq')}}>❓ FAQ</a>
          <a className="m-link m-cta" href="#" onClick={(e)=>{e.preventDefault(); handleShow('waitlist')}}>Try BOSS →</a>
        </div>
      )}
    </nav>
  )
}
