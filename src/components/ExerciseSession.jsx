import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { generateExercises } from '../utils/exerciseGenerator.js'
import { getTopicById } from '../data/topics.js'

const TOTAL = 10

export default function ExerciseSession() {
  const { level, topicId } = useParams()
  const navigate = useNavigate()
  const topic = getTopicById(topicId)

  const [exercises, setExercises] = useState([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [answered, setAnswered] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    setExercises(generateExercises(topicId, TOTAL))
  }, [topicId])

  const exercise = exercises[current]
  const progress = ((current) / TOTAL) * 100

  const checkAnswer = useCallback((answer) => {
    if (answered) return
    const ex = exercises[current]
    const isCorrect = String(answer).trim().toLowerCase() === String(ex.correctAnswer).trim().toLowerCase()
    setSelected(String(answer))
    setAnswered(true)
    if (isCorrect) setCorrect(c => c + 1)
    setAnswers(prev => [...prev, { exercise: ex, userAnswer: String(answer), isCorrect }])
  }, [answered, exercises, current])

  const handleInput = (e) => {
    e.preventDefault()
    if (inputValue.trim()) checkAnswer(inputValue.trim())
  }

  const nextQuestion = () => {
    if (current + 1 >= TOTAL) {
      navigate('/resultats', {
        state: {
          topicId,
          level,
          correct: correct + (answers.length > current ? 0 : (selected === exercises[current]?.correctAnswer ? 1 : 0)),
          total: TOTAL,
          answers,
        }
      })
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
      setInputValue('')
      setAnswered(false)
      setShowHint(false)
    }
  }

  if (!exercise || !topic) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400">Carregant exercicis...</div>
  }

  const isCorrectAnswer = selected === String(exercise.correctAnswer)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(`/temes/${level}`)}
            className="text-gray-400 hover:text-gray-600 text-xl p-2 rounded-xl hover:bg-white"
          >
            ←
          </button>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className={`text-sm font-semibold ${topic.colorClasses.text}`}>{topic.nom}</span>
              <span className="text-sm text-gray-400">Pregunta {current + 1} de {TOTAL}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${topic.colorClasses.bg}`}
                style={{ width: `${((current + 1) / TOTAL) * 100}%` }}
              />
            </div>
          </div>
          <div className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
            ✓ {correct}
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">
          <p className="text-2xl font-bold text-gray-800 text-center mb-6 leading-relaxed">
            {exercise.question}
          </p>

          {/* Hint */}
          {!answered && (
            <div className="text-center mb-4">
              {showHint ? (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-700 text-sm">
                  💡 {exercise.hint}
                </div>
              ) : (
                <button
                  onClick={() => setShowHint(true)}
                  className="text-amber-500 text-sm hover:text-amber-700 underline"
                >
                  💡 Veure pista
                </button>
              )}
            </div>
          )}

          {/* Multiple choice */}
          {exercise.type === 'multiple_choice' && (
            <div className="grid grid-cols-2 gap-3">
              {exercise.options.map((opt, i) => {
                let cls = 'border-2 border-gray-200 bg-white text-gray-700 hover:border-indigo-300 hover:bg-indigo-50'
                if (answered) {
                  if (opt === String(exercise.correctAnswer)) cls = 'border-2 border-green-400 bg-green-50 text-green-700 font-bold'
                  else if (opt === selected) cls = 'border-2 border-red-300 bg-red-50 text-red-600'
                  else cls = 'border-2 border-gray-100 bg-gray-50 text-gray-400'
                }
                return (
                  <button
                    key={i}
                    onClick={() => checkAnswer(opt)}
                    disabled={answered}
                    className={`rounded-2xl p-4 text-center font-semibold transition-all duration-150 ${cls} disabled:cursor-default`}
                  >
                    <span className="text-xs text-gray-400 block mb-1">{String.fromCharCode(65 + i)}</span>
                    {opt}
                  </button>
                )
              })}
            </div>
          )}

          {/* Fill in */}
          {exercise.type === 'fill_in' && (
            <form onSubmit={handleInput} className="flex flex-col items-center gap-4">
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                disabled={answered}
                placeholder="Escriu la teva resposta..."
                className={`w-full max-w-xs text-center text-xl font-bold border-2 rounded-2xl py-4 px-6 outline-none transition-all
                  ${answered
                    ? isCorrectAnswer
                      ? 'border-green-400 bg-green-50 text-green-700'
                      : 'border-red-300 bg-red-50 text-red-600'
                    : 'border-indigo-300 focus:border-indigo-500 bg-white'
                  }`}
                autoFocus
              />
              {!answered && (
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="bg-indigo-600 text-white font-bold py-3 px-10 rounded-2xl hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Comprovar
                </button>
              )}
            </form>
          )}

          {/* True/False */}
          {exercise.type === 'true_false' && (
            <div className="flex gap-4 justify-center">
              {['Veritat', 'Fals'].map((opt) => {
                let cls = 'border-2 border-gray-200 bg-white text-gray-700 hover:border-indigo-300'
                if (answered) {
                  if (opt === exercise.correctAnswer) cls = 'border-2 border-green-400 bg-green-50 text-green-700 font-bold'
                  else if (opt === selected) cls = 'border-2 border-red-300 bg-red-50 text-red-600'
                  else cls = 'border-2 border-gray-100 bg-gray-50 text-gray-400'
                }
                return (
                  <button
                    key={opt}
                    onClick={() => checkAnswer(opt)}
                    disabled={answered}
                    className={`flex-1 max-w-xs rounded-2xl p-5 font-bold text-lg transition-all ${cls} disabled:cursor-default`}
                  >
                    {opt === 'Veritat' ? '✓ ' : '✗ '}{opt}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Feedback */}
        {answered && (
          <div className={`rounded-2xl p-5 mb-6 ${isCorrectAnswer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className={`font-bold text-lg mb-1 ${isCorrectAnswer ? 'text-green-700' : 'text-red-600'}`}>
              {isCorrectAnswer ? '🎉 Correcte!' : `❌ Incorrecte. La resposta era: ${exercise.correctAnswer}`}
            </div>
            <p className="text-sm text-gray-600">{exercise.explanation}</p>
          </div>
        )}

        {answered && (
          <div className="text-center">
            <button
              onClick={nextQuestion}
              className={`${topic.colorClasses.bg} text-white font-bold py-4 px-12 rounded-2xl shadow-lg hover:opacity-90 transition-all hover:scale-105`}
            >
              {current + 1 >= TOTAL ? 'Veure resultats →' : 'Següent →'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
