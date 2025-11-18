import React, { useState } from 'react'

export default function RecommendationForm({ onRecommend }) {
  const [task, setTask] = useState('generate marketing images for instagram posts')
  const [categories, setCategories] = useState('image, design')
  const [budget, setBudget] = useState('freemium')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onRecommend({
        task,
        categories: categories.split(',').map(s => s.trim()).filter(Boolean),
        budget: budget || undefined,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 md:p-5">
      <label className="block text-sm text-slate-300 mb-1">What do you want to do?</label>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Describe your task..."
        className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
        <div>
          <label className="block text-sm text-slate-300 mb-1">Categories (comma separated)</label>
          <input
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            placeholder="chat, image, video"
            className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Budget</label>
          <select value={budget} onChange={(e)=>setBudget(e.target.value)} className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500">
            <option value="">Any</option>
            <option value="free">Free</option>
            <option value="freemium">Freemium</option>
            <option value="paid">Paid</option>
            <option value="open-source">Open Source</option>
          </select>
        </div>
        <div className="flex items-end">
          <button disabled={loading} type="submit" className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
            {loading ? 'Finding tools...' : 'Recommend'}
          </button>
        </div>
      </div>
    </form>
  )
}
