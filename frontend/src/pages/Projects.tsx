import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProjects, useSkills } from '../hooks/useApi'

export default function Projects() {
  const [search, setSearch] = useState('')
  const [selectedSkill, setSelectedSkill] = useState<string | undefined>()

  const { data: projects, isLoading } = useProjects({
    skill: selectedSkill,
    search: search || undefined,
  })
  const { data: skills } = useSkills()

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">

      {/* ─── Header ───────────────────────────────────────────── */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">Projects</h1>
        <p className="text-gray-400">Things I've built.</p>
      </div>

      {/* ─── Filters ──────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-700 rounded-lg text-sm text-gray-100 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          value={selectedSkill ?? ''}
          onChange={e => setSelectedSkill(e.target.value || undefined)}
          className="px-4 py-2 border border-gray-700 rounded-lg text-sm text-gray-100 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All skills</option>
          {skills?.map(skill => (
            <option key={skill.id} value={skill.slug}>
              {skill.name}
            </option>
          ))}
        </select>
      </div>

      {/* ─── Grid ─────────────────────────────────────────────── */}
      {isLoading ? (
        <p className="text-gray-400">Loading projects...</p>
      ) : projects?.length === 0 ? (
        <p className="text-gray-400">No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map(project => (
            <Link
              key={project.id}
              to={`/projects/${project.slug}`}
              className="group border border-gray-800 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="aspect-video bg-gray-50 overflow-hidden">
                <img
                  src={project.main_image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="font-semibold text-gray-100 mb-1 group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h2>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                  {project.short_description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1">
                  {project.skills_used.slice(0, 4).map(skill => (
                    <span
                      key={skill.id}
                      className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full"
                    >
                      {skill.name}
                    </span>
                  ))}
                  {project.skills_used.length > 4 && (
                    <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-400 rounded-full">
                      +{project.skills_used.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
