import { usePersonalInfo, useSkills } from '../hooks/useApi'
import { Link } from 'react-router-dom'

export default function Home() {
  const { data: personal, isLoading: loadingPersonal } = usePersonalInfo()
  const { data: skills, isLoading: loadingSkills } = useSkills()

  if (loadingPersonal) return (
    <div className="min-h-screen flex items-center justify-center text-gray-400">
      Loading...
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">

      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="flex flex-col md:flex-row items-center gap-12 py-16">
        {personal?.photo && (
          <img
            src={personal.photo}
            alt={personal.name}
            className="w-40 h-40 rounded-full object-cover shadow-lg flex-shrink-0"
          />
        )}
        <div>
          <h1 className="text-4xl font-bold text-gray-100 mb-3">
            {personal?.name}
          </h1>
          <p className="text-lg text-gray-400 mb-6 leading-relaxed">
            {personal?.description}
          </p>
          <div className="flex flex-wrap gap-3">
            {personal?.github_link && (
              <a
                href={personal.github_link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                GitHub
              </a>
            )}
            {personal?.linkedin_link && (
              <a
                href={personal.linkedin_link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-500 transition-colors"
              >
                LinkedIn
              </a>
            )}
            <Link
              to="/projects"
              className="px-5 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              See my projects →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Skills ───────────────────────────────────────────── */}
      <section className="py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold text-gray-100 mb-8">Skills</h2>
        {loadingSkills ? (
          <p className="text-gray-400">Loading skills...</p>
        ) : (
          <div className="space-y-8">
            {['Language', 'Framework', 'Tool', 'Other'].map(category => {
              const categorySkills = skills?.filter(s => s.category === category) ?? []
              if (categorySkills.length === 0) return null
              return (
                <div key={category}>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                    {category}s
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {categorySkills.map(skill => (
                      <div
                        key={skill.id}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg border border-gray-700"
                      >
                        {skill.icon && (
                          <i className={`${skill.icon} text-xl`} />
                        )}
                        <span className="text-sm font-medium text-gray-100">
                          {skill.name}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          skill.proficiency === 'Expert'       ? 'bg-indigo-100 text-indigo-700' :
                          skill.proficiency === 'Advanced'     ? 'bg-green-100 text-green-700' :
                          skill.proficiency === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                                                 'bg-gray-100 text-gray-500'
                        }`}>
                          {skill.proficiency}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* ─── Contact ──────────────────────────────────────────── */}
      <section className="py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">Contact</h2>
        <div className="space-y-2 text-gray-400">
          {personal?.email && (
            <p>
              <span className="text-gray-400 text-sm">Email </span>
              <a href={`mailto:${personal.email}`} className="hover:text-indigo-600 transition-colors">
                {personal.email}
              </a>
            </p>
          )}
          {personal?.phone_number && (
            <p>
              <span className="text-gray-400 text-sm">Phone </span>
              {personal.phone_number}
            </p>
          )}
        </div>
      </section>

    </div>
  )
}
