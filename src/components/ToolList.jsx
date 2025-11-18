import React from 'react'
import ToolCard from './ToolCard'

export default function ToolList({ items, emptyMessage }) {
  if (!items || items.length === 0) {
    return (
      <div className="text-center text-slate-300 py-10">{emptyMessage || 'No tools yet.'}</div>
    )
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((tool, idx) => (
        <ToolCard key={idx} tool={tool} />
      ))}
    </div>
  )
}
