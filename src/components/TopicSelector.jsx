import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTopicsByLevel } from '../data/topics.js'
import { getTopicProgress } from '../utils/progress.js'

const levelNames = { primaria: "6è de Primària", eso: "1r d'ESO" }
const levelIcons = { primaria: "🏫", eso: "📚" }

export default function TopicSelector() {
  const { level } = useParams()
  const navigate = useNavigate()
  const topics = getTopicsByLevel(level)
  const [progresses, setProgresses] = useState({})

  useEffect(() => {
    const p = {}
    topics.forEach(t => { p[t.id] = getTopicProgress(t.id) })
    setProgresses(p)
  }, [level])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-gray-600 text-2xl p-2 rounded-xl hover:bg-white transition-all"
            aria-label="Tornar"
          >
            ←
          </button>
          <div>
            <p className="text-sm text-gray-400 font-medium">{levelIcons[level]} {levelNames[level]}</p>
            <h1 className="text-3xl font-extrabold text-gray-800">Escull un tema</h1>
          </div>
        </div>

        {/* Topics grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {topics.map(topic => {
            const prog = progresses[topic.id]
            const accuracy = prog ? Math.round((prog.correct / prog.completed) * 100) : null
            return (
              <button
                key={topic.id}
                onClick={() => navigate(`/exercicis/${level}/${topic.id}`)}
                className={`group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border ${topic.colorClasses.border} text-left`}
              >
                <div className={`text-4xl mb-3 w-14 h-14 ${topic.colorClasses.bgLight} rounded-xl flex items-center justify-center font-bold ${topic.colorClasses.text}`}>
                  {topic.icon}
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">{topic.nom}</h2>
                <p className="text-sm text-gray-500 mb-4">{topic.description}</p>

                {prog ? (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{prog.completed} exercicis</span>
                      <span className={`font-semibold ${accuracy >= 70 ? 'text-green-500' : accuracy >= 40 ? 'text-yellow-500' : 'text-red-400'}`}>
                        {accuracy}% encerts
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${accuracy >= 70 ? 'bg-green-400' : accuracy >= 40 ? 'bg-yellow-400' : 'bg-red-400'}`}
                        style={{ width: `${accuracy}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-gray-300 italic">Sense activitat encara</p>
                )}

                <div className={`mt-3 text-xs font-semibold ${topic.colorClasses.text} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  Practicar →
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
