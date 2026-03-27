import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProgress, getTotalStats, resetProgress } from '../utils/progress.js'
import { getAllTopics } from '../data/topics.js'

export default function ProgressDashboard() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState({})
  const [stats, setStats] = useState({ totalExercises: 0, totalCorrect: 0, percentage: 0, topicsCompleted: 0 })
  const [confirmReset, setConfirmReset] = useState(false)
  const allTopics = getAllTopics()

  const reload = () => {
    setProgress(getProgress())
    setStats(getTotalStats())
  }

  useEffect(() => { reload() }, [])

  const handleReset = () => {
    if (confirmReset) {
      resetProgress()
      reload()
      setConfirmReset(false)
    } else {
      setConfirmReset(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-gray-600 text-2xl p-2 rounded-xl hover:bg-white transition-all"
          >
            ←
          </button>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">El meu Progrés</h1>
            <p className="text-gray-400 text-sm">Seguiment del teu aprenentatge</p>
          </div>
        </div>

        {/* Global stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Exercicis fets', value: stats.totalExercises, color: 'indigo', icon: '📝' },
            { label: '% Encerts', value: `${stats.percentage}%`, color: 'green', icon: '✅' },
            { label: 'Temes provats', value: stats.topicsCompleted, color: 'purple', icon: '📚' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl shadow-sm p-5 text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <p className="text-3xl font-extrabold text-gray-800">{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Per topic */}
        {['primaria', 'eso'].map(lvl => {
          const lvlTopics = allTopics.filter(t =>
            lvl === 'primaria'
              ? ['multiplicacio','fraccions','decimals','percentatges','geometria','problemes'].includes(t.id)
              : ['enters','fraccions_avancades','potencies','algebra','geometria_eso','estadistica'].includes(t.id)
          )
          const lvlName = lvl === 'primaria' ? "6è de Primària" : "1r d'ESO"
          return (
            <div key={lvl} className="bg-white rounded-2xl shadow-sm p-6 mb-4">
              <h2 className="text-lg font-bold text-gray-700 mb-4">{lvlName}</h2>
              <div className="space-y-4">
                {lvlTopics.map(topic => {
                  const p = progress[topic.id]
                  const accuracy = p ? Math.round((p.correct / p.completed) * 100) : 0
                  const barColor = !p ? 'bg-gray-200' : accuracy >= 70 ? 'bg-green-400' : accuracy >= 40 ? 'bg-yellow-400' : 'bg-red-400'
                  return (
                    <div key={topic.id}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold w-8 text-center ${topic.colorClasses.text}`}>{topic.icon}</span>
                          <span className="font-semibold text-gray-700 text-sm">{topic.nom}</span>
                        </div>
                        <div className="text-right">
                          {p ? (
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${accuracy >= 70 ? 'bg-green-100 text-green-700' : accuracy >= 40 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-600'}`}>
                              {accuracy}% · {p.completed} ex.
                            </span>
                          ) : (
                            <span className="text-xs text-gray-300">Sense activitat</span>
                          )}
                        </div>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-700 ${barColor}`}
                          style={{ width: p ? `${accuracy}%` : '0%' }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}

        {/* Reset button */}
        <div className="text-center mt-6">
          {confirmReset ? (
            <div className="flex flex-col items-center gap-3">
              <p className="text-red-600 font-semibold">Segur que vols esborrar tot el progrés?</p>
              <div className="flex gap-3">
                <button onClick={handleReset} className="bg-red-500 text-white font-bold py-2 px-6 rounded-xl hover:bg-red-600">
                  Sí, esborra-ho
                </button>
                <button onClick={() => setConfirmReset(false)} className="bg-gray-100 text-gray-600 font-bold py-2 px-6 rounded-xl hover:bg-gray-200">
                  Cancel·la
                </button>
              </div>
            </div>
          ) : (
            <button onClick={handleReset} className="text-red-400 text-sm hover:text-red-600 underline">
              Reinicia el progrés
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
