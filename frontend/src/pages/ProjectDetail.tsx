import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProject, useReviews, usePostReview } from '../hooks/useApi'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { data: project, isLoading } = useProject(slug ?? '')
  const { data: reviews } = useReviews(slug ?? '')
  const postReview = usePostReview(slug ?? '')

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await postReview.mutateAsync(form)
      setSubmitted(true)
      setForm({ name: '', email: '', message: '' })
    } catch {
      alert('Something went wrong. Please try again.')
    }
  }

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center text-gray-400">
      Loading...
    </div>
  )

  if (!project) return (
    <div className="min-h-screen flex items-center justify-center text-gray-400">
      Project not found.
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">

      {/* ─── Back ─────────────────────────────────────────────── */}
      <Link to="/projects" className="text-sm text-gray-400 hover:text-gray-600 transition-colors mb-8 inline-block">
        ← Back to projects
      </Link>

      {/* ─── Header ───────────────────────────────────────────── */}
      <h1 className="text-3xl font-bold text-gray-900 mb-3">{project.title}</h1>
      <p className="text-gray-500 mb-6">{project.short_description}</p>

      {/* ─── Links ────────────────────────────────────────────── */}
      <div className="flex gap-3 mb-8">
        {project.github_link && (
          <a
            href={project.github_link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
          >
            GitHub
          </a>
        )}
        {project.live_preview_link && (
          <a
            href={project.live_preview_link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-500 transition-colors"
          >
            Live preview
          </a>
        )}
      </div>

      {/* ─── Main image ───────────────────────────────────────── */}
      <div className="rounded-xl overflow-hidden mb-8 border border-gray-100">
        <img
          src={project.main_image}
          alt={project.title}
          className="w-full object-cover"
        />
      </div>

      {/* ─── Description ──────────────────────────────────────── */}
      <div className="prose prose-gray max-w-none mb-10">
        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
          {project.description}
        </p>
      </div>

      {/* ─── Skills ───────────────────────────────────────────── */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Technologies used</h2>
        <div className="flex flex-wrap gap-2">
          {project.skills_used.map(skill => (
            <span
              key={skill.id}
              className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-full"
            >
              {skill.icon && <i className={`${skill.icon} text-base`} />}
              {skill.name}
            </span>
          ))}
        </div>
      </div>

      {/* ─── Gallery ──────────────────────────────────────────── */}
      {project.images && project.images.length > 0 && (
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.images.map(img => (
              <div key={img.id} className="rounded-lg overflow-hidden border border-gray-100">
                <img src={img.image} alt={img.caption} className="w-full object-cover" />
                {img.caption && (
                  <p className="text-xs text-gray-400 px-3 py-2">{img.caption}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── Reviews ──────────────────────────────────────────── */}
      <div className="border-t border-gray-100 pt-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Reviews</h2>

        {/* Existing reviews */}
        {reviews && reviews.length > 0 ? (
          <div className="space-y-4 mb-10">
            {reviews.map(review => (
              <div key={review.id} className="bg-gray-50 rounded-xl p-5">
                <p className="text-gray-700 mb-3">{review.message}</p>
                <p className="text-sm text-gray-400">{review.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm mb-8">No reviews yet. Be the first!</p>
        )}

        {/* Review form */}
        {submitted ? (
          <div className="bg-green-50 border border-green-100 rounded-xl p-5 text-green-700 text-sm">
            Thanks for your review! It will appear after approval.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="font-medium text-gray-900">Leave a review</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your name"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <input
                type="email"
                placeholder="Your email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <textarea
              placeholder="Your review..."
              required
              rows={4}
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
            />
            <button
              type="submit"
              disabled={postReview.isPending}
              className="px-6 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-500 transition-colors disabled:opacity-50"
            >
              {postReview.isPending ? 'Sending...' : 'Send review'}
            </button>
          </form>
        )}
      </div>

    </div>
  )
}
