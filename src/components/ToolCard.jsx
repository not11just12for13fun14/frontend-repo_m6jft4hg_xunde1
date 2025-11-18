import React from 'react'

export default function ToolCard({ tool }) {
  return (
    <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5 hover:border-blue-500/40 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-white font-semibold text-lg">{tool.name}</h3>
          <p className="text-blue-200/80 text-sm mt-1 line-clamp-3">{tool.description}</p>
        </div>
        {tool.pricing && (
          <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-200 border border-blue-400/30">{tool.pricing}</span>
        )}
      </div>
      {tool.categories?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {tool.categories.map((c) => (
            <span key={c} className="text-xs px-2 py-1 rounded bg-slate-700/60 text-blue-200 border border-slate-600/60">{c}</span>
          ))}
        </div>
      )}
      {tool.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {tool.tags.slice(0,6).map((t) => (
            <span key={t} className="text-[11px] px-2 py-0.5 rounded bg-slate-700/40 text-slate-300 border border-slate-600/50">#{t}</span>
          ))}
        </div>
      )}
      <div className="mt-4 flex items-center gap-3">
        {tool.link && (
          <a href={tool.link} target="_blank" rel="noreferrer" className="text-sm text-blue-300 hover:text-blue-200 underline">Visit</a>
        )}
      </div>
    </div>
  )
}
