import { useExperiences, useEducation } from '../hooks/useApi'

export default function Experience() {
  const { data: experiences, isLoading: loadingExp } = useExperiences()
  const { data: education, isLoading: loadingEdu } = useEducation()

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">

      {/* ─── Header ───────────────────────────────────────────── */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Experience</h1>
        <p className="text-gray-500">My professional journey and education.</p>
      </div>

      {/* ─── Work Experience ──────────────────────────────────── */}
      <section className="mb-16">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-8">
          Work Experience
        </h2>

        {loadingExp ? (
          <p className="text-gray-400">Loading...</p>
        ) : experiences?.length === 0 ? (
          <p className="text-gray-400">No experience added yet.</p>
        ) : (
          <div className="space-y-8">
            {experiences?.map(exp => (
              <div key={exp.id} className="flex gap-6">
                {/* Timeline dot */}
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                  <div className="w-px flex-1 bg-gray-100 mt-2" />
                </div>

                {/* Content */}
                <div className="pb-8 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                      <p className="text-gray-500 text-sm">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {exp.duration}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4 whitespace-pre-line">
                    {exp.description}
                  </p>

                  {exp.skills_earned.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.skills_earned.map(skill => (
                        <span
                          key={skill.id}
                          className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ─── Education ────────────────────────────────────────── */}
      <section>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-8">
          Education
        </h2>

        {loadingEdu ? (
          <p className="text-gray-400">Loading...</p>
        ) : education?.length === 0 ? (
          <p className="text-gray-400">No education added yet.</p>
        ) : (
          <div className="space-y-8">
            {education?.map(edu => (
              <div key={edu.id} className="flex gap-6">
                {/* Timeline dot */}
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                  <div className="w-px flex-1 bg-gray-100 mt-2" />
                </div>

                {/* Content */}
                <div className="pb-8 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-500 text-sm">
                        {edu.field_of_study} · {edu.school}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {edu.duration}
                    </span>
                  </div>

                  {edu.description && (
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                      {edu.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  )
}
