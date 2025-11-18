import React from 'react'

export default function Header() {
  return (
    <header className="text-center mb-10">
      <div className="inline-flex items-center justify-center mb-4">
        <img src="/flame-icon.svg" alt="logo" className="w-14 h-14 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">AI Toolbox</h1>
      <p className="text-blue-200/90 mt-2 max-w-2xl mx-auto">Describe your task and get tailored AI tool recommendations. Browse by category, budget, and tags.</p>
    </header>
  )
}
