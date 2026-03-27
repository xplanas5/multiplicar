const STORAGE_KEY = 'matematiques_progress'

export function getProgress() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : {}
  } catch {
    return {}
  }
}

export function saveSessionResult(topicId, correct, total) {
  const progress = getProgress()
  const existing = progress[topicId] || { completed: 0, correct: 0, sessions: 0, lastPlayed: null }
  progress[topicId] = {
    completed: existing.completed + total,
    correct: existing.correct + correct,
    sessions: existing.sessions + 1,
    lastPlayed: new Date().toISOString(),
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function getTopicProgress(topicId) {
  const progress = getProgress()
  return progress[topicId] || null
}

export function getTotalStats() {
  const progress = getProgress()
  const entries = Object.values(progress)
  const totalExercises = entries.reduce((acc, e) => acc + e.completed, 0)
  const totalCorrect = entries.reduce((acc, e) => acc + e.correct, 0)
  const percentage = totalExercises > 0 ? Math.round((totalCorrect / totalExercises) * 100) : 0
  const topicsCompleted = entries.filter(e => e.sessions > 0).length
  return { totalExercises, totalCorrect, percentage, topicsCompleted }
}

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY)
}
