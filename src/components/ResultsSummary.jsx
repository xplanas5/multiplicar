import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { saveSessionResult } from '../utils/progress.js'
import { getTopicById } from '../data/topics.js'

function Stars({ count }) {
  return (
    <div className="flex gap-1 justify-center text-4xl">
      {[1, 2, 3].map(i => (
        <span key={i} className={i <= count ? 'opacity-100' : 'opacity-20'}>⭐</span>
      ))}
    </div>
  )
}

const messages = {
  3: ["Excel·lent! Ets un crack de les matemàtiques!", "Increïble! Continua així!", "Perfecte! Tens un talent especial!"],
  2: ["Molt bé! Amb una mica més de pràctica ho aconseguiràs!", "Bon treball! Continua practicant!", "Gairebé perfecte! Segueix endavant!"],
  1: ["No et rendeixis! La pràctica fa el mestre.", "Tots cometem errors. Torna-ho a intentar!", "Les matemàtiques necessiten pràctica. Ànim!"],
}

export default function ResultsSummary() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state || {}
  const { topicId, level, correct = 0, total = 10, answers = [] } = state
  const topic = getTopicById(topicId)
  const pct = Math.round((correct / total) * 100)
  const stars = pct >= 70 ? 3 : pct >= 40 ? 2 : 1
  const msgs = messages[stars]
  const msg = msgs[Math.floor(Math.random() * msgs.length)]

  useEffect(() => {
    if (topicId) saveSessionResult(topicId, correct, total)
  }, [])

  if (!topicId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">No hi ha resultats per mostrar.</p>
        <button onClick={() => navigate('/')} className="text-indigo-600 underline">Tornar a l'inici</button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        {/* Score card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-4">Resultats</h1>

          {/* Circle score */}
          <div className="relative inline-flex items-center justify-center mb-4">
            <svg width="140" height="140" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="58" fill="none" stroke="#e5e7eb" strokeWidth="12" />
              <circle
                cx="70" cy="70" r="58" fill="none"
                stroke={pct >= 70 ? '#22c55e' : pct >= 40 ? '#f59e0b' : '#ef4444'}
                strokeWidth="12"
                strokeDasharray={`${2 * Math.PI * 58}`}
                strokeDashoffset={`${2 * Math.PI * 58 * (1 - pct / 100)}`}
                strokeLinecap="round"
                transform="rotate(-90 70 70)"
              />
            </svg>
            <div className="absolute text-center">
              <p className="text-4xl font-extrabold text-gray-800">{correct}/{total}</p>
              <p className="text-sm text-gray-400">{pct}%</p>
            </div>
          </div>

          <Stars count={stars} />
          <p className="mt-3 text-gray-600 font-medium">{msg}</p>

          {topic && (
            <p className="mt-2 text-sm text-gray-400">Tema: <span className="font-semibold">{topic.nom}</span></p>
          )}
        </div>

        {/* Review answers */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Revisió de preguntes</h2>
          <div className="space-y-3">
            {answers.map((a, i) => (
              <div
                key={i}
                className={`rounded-xl p-4 border ${a.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">{a.isCorrect ? '✅' : '❌'}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm">{a.exercise.question}</p>
                    {!a.isCorrect && (
                      <p className="text-sm text-gray-500 mt-0.5">
                        La teva resposta: <span className="text-red-500 font-medium">{a.userAnswer}</span>
                        {' · '}Correcta: <span className="text-green-600 font-medium">{a.exercise.correctAnswer}</span>
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">{a.exercise.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate(`/exercicis/${level}/${topicId}`)}
            className="flex-1 bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 transition-all"
          >
            🔄 Torna a intentar-ho
          </button>
          <button
            onClick={() => navigate(`/temes/${level}`)}
            className="flex-1 bg-white border-2 border-indigo-200 text-indigo-600 font-bold py-4 rounded-2xl hover:bg-indigo-50 transition-all"
          >
            📚 Escull un altre tema
          </button>
        </div>
      </div>
    </div>
  )
}
