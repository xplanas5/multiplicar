import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTotalStats } from '../utils/progress.js'

const mathSymbols = ['+', '−', '×', '÷', '=', '%', '½', 'π', '²', '√']

export default function Home() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({ totalExercises: 0, percentage: 0, topicsCompleted: 0 })

  useEffect(() => {
    setStats(getTotalStats())
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Floating math symbols */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        {mathSymbols.map((sym, i) => (
          <span
            key={i}
            className="absolute text-indigo-100 font-bold opacity-60"
            style={{
              fontSize: `${2 + (i % 3)}rem`,
              top: `${(i * 17 + 5) % 90}%`,
              left: `${(i * 23 + 3) % 95}%`,
            }}
          >
            {sym}
          </span>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-6xl font-extrabold text-indigo-700 mb-2 tracking-tight">
            Matemàtiques
          </h1>
          <p className="text-2xl font-semibold text-purple-500 mb-4">Aprèn i Practica</p>
          <p className="text-gray-500 max-w-md mx-auto">
            Exercicis interactius per a 6è de Primària i 1r d'ESO. Practica cada dia i millora el teu nivell!
          </p>
        </div>

        {/* Stats card */}
        {stats.totalExercises > 0 && (
          <div className="bg-white rounded-2xl shadow-md px-8 py-4 mb-8 flex gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-indigo-600">{stats.totalExercises}</p>
              <p className="text-xs text-gray-400">Exercicis fets</p>
            </div>
            <div className="w-px bg-gray-100" />
            <div>
              <p className="text-3xl font-bold text-green-500">{stats.percentage}%</p>
              <p className="text-xs text-gray-400">Encerts</p>
            </div>
            <div className="w-px bg-gray-100" />
            <div>
              <p className="text-3xl font-bold text-purple-500">{stats.topicsCompleted}</p>
              <p className="text-xs text-gray-400">Temes provats</p>
            </div>
          </div>
        )}

        {/* Level cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl mb-8">
          <button
            onClick={() => navigate('/temes/primaria')}
            className="group bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 text-left"
          >
            <div className="text-5xl mb-4">🏫</div>
            <h2 className="text-2xl font-bold mb-1">6è de Primària</h2>
            <p className="text-blue-100 text-sm">Multiplicació, fraccions, decimals, percentatges, geometria i més</p>
            <div className="mt-4 flex items-center gap-2 text-blue-200 text-sm font-medium">
              <span>Comença ara</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </button>

          <button
            onClick={() => navigate('/temes/eso')}
            className="group bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 text-left"
          >
            <div className="text-5xl mb-4">📚</div>
            <h2 className="text-2xl font-bold mb-1">1r d'ESO</h2>
            <p className="text-purple-100 text-sm">Enters, potències, àlgebra, àrees, volums i estadística</p>
            <div className="mt-4 flex items-center gap-2 text-purple-200 text-sm font-medium">
              <span>Comença ara</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </button>
        </div>

        {/* Progress button */}
        <button
          onClick={() => navigate('/progres')}
          className="flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-800 transition-colors px-6 py-3 rounded-xl hover:bg-indigo-50"
        >
          <span>📊</span>
          <span>El meu Progrés</span>
        </button>
      </div>
    </div>
  )
}
