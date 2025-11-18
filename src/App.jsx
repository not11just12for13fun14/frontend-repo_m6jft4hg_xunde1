import { useState, useEffect } from 'react'
import Header from './components/Header'
import RecommendationForm from './components/RecommendationForm'
import ToolList from './components/ToolList'

function App() {
  const [tools, setTools] = useState([])
  const [recommended, setRecommended] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const seedIfEmpty = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/tools`)
      if (!res.ok) return
      const list = await res.json()
      if (list.length === 0) {
        const seedData = [
          {
            name: 'ChatGPT',
            description: 'General-purpose conversational AI for ideation, writing, code, and reasoning tasks.',
            categories: ['chatbot', 'code', 'writing'],
            use_cases: ['draft emails', 'explain code', 'brainstorm'],
            tags: ['gpt', 'openai', 'assistant'],
            pricing: 'freemium',
            link: 'https://chat.openai.com',
            rating: 4.7,
            company: 'OpenAI'
          },
          {
            name: 'Midjourney',
            description: 'High-quality image generation from text prompts. Great for concept art and marketing visuals.',
            categories: ['image', 'design'],
            use_cases: ['social posts', 'posters', 'storyboards'],
            tags: ['images', 'generative'],
            pricing: 'paid',
            link: 'https://midjourney.com',
            rating: 4.6,
            company: 'Midjourney'
          },
          {
            name: 'Stable Diffusion WebUI',
            description: 'Open-source image generation with lots of community models and extensions.',
            categories: ['image', 'open-source'],
            use_cases: ['fine-tuned images', 'local generation'],
            tags: ['stable-diffusion', 'local'],
            pricing: 'open-source',
            link: 'https://github.com/AUTOMATIC1111/stable-diffusion-webui',
            rating: 4.4,
            company: 'Community'
          },
          {
            name: 'Whisper',
            description: 'Speech-to-text model for accurate transcriptions across many languages.',
            categories: ['audio', 'transcription'],
            use_cases: ['meeting notes', 'podcast transcripts'],
            tags: ['stt', 'openai', 'audio'],
            pricing: 'open-source',
            link: 'https://github.com/openai/whisper',
            rating: 4.5,
            company: 'OpenAI'
          },
          {
            name: 'Claude.ai',
            description: 'Helpful assistant that excels at thoughtful writing, analysis, and long-context tasks.',
            categories: ['chatbot', 'writing'],
            use_cases: ['summaries', 'product specs', 'analysis'],
            tags: ['anthropic', 'assistant'],
            pricing: 'freemium',
            link: 'https://claude.ai',
            rating: 4.6,
            company: 'Anthropic'
          },
          {
            name: 'ElevenLabs',
            description: 'Lifelike text-to-speech for voiceovers and narration with cloning options.',
            categories: ['audio', 'tts'],
            use_cases: ['voiceover', 'audiobooks', 'dubbing'],
            tags: ['speech', 'voice'],
            pricing: 'freemium',
            link: 'https://elevenlabs.io',
            rating: 4.3,
            company: 'ElevenLabs'
          }
        ]
        for (const item of seedData) {
          await fetch(`${baseUrl}/api/tools`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
          })
        }
      }
    } catch (e) {
      // ignore seed errors
    }
  }

  const fetchTools = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/tools`)
      if (!res.ok) throw new Error('Failed to load tools')
      const data = await res.json()
      setTools(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRecommend = async ({ task, categories, budget }) => {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams()
      params.set('task', task)
      if (categories && categories.length) {
        categories.forEach(c => params.append('categories', c))
      }
      if (budget) params.set('budget', budget)
      const res = await fetch(`${baseUrl}/api/recommend?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to get recommendations')
      const data = await res.json()
      setRecommended(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    seedIfEmpty().then(fetchTools)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
      <div className="relative min-h-screen p-6 md:p-10 max-w-6xl mx-auto">
        <Header />
        <RecommendationForm onRecommend={handleRecommend} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2">
            <h2 className="text-white font-semibold mb-3">All Tools</h2>
            {loading && tools.length === 0 ? (
              <div className="text-slate-300">Loading...</div>
            ) : (
              <ToolList items={tools} emptyMessage="No tools yet. Use the form to seed some." />
            )}
          </section>
          <aside>
            <h2 className="text-white font-semibold mb-3">Recommendations</h2>
            {recommended.length === 0 ? (
              <div className="text-slate-300 bg-slate-800/60 border border-slate-700/60 rounded-xl p-5">Use the form to get tailored picks.</div>
            ) : (
              <ToolList items={recommended} emptyMessage="No matches" />
            )}
          </aside>
        </div>

        {error && (
          <div className="mt-6 text-red-300">{error}</div>
        )}
      </div>
    </div>
  )
}

export default App
