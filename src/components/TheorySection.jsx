import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTopicById } from '../data/topics.js'
import { getTheory } from '../data/theory.js'

// ── SVG GRAPHICS ──────────────────────────────────────────────────────────────

function TimesTableGrid() {
  const size = 10
  const cell = 36
  const offset = 38
  return (
    <div className="overflow-x-auto">
      <svg width={offset + size * cell} height={offset + size * cell} className="mx-auto" style={{ maxWidth: '100%' }}>
        {/* Headers row */}
        {Array.from({ length: size }, (_, i) => (
          <g key={`h${i}`}>
            <rect x={offset + i * cell} y={0} width={cell} height={offset - 2} fill="#6366f1" rx={4} />
            <text x={offset + i * cell + cell / 2} y={offset - 8} textAnchor="middle" fontSize={13} fontWeight="bold" fill="white">{i + 1}</text>
          </g>
        ))}
        {/* Headers col */}
        {Array.from({ length: size }, (_, i) => (
          <g key={`v${i}`}>
            <rect x={0} y={offset + i * cell} width={offset - 2} height={cell} fill="#6366f1" rx={4} />
            <text x={(offset - 2) / 2} y={offset + i * cell + cell / 2 + 5} textAnchor="middle" fontSize={13} fontWeight="bold" fill="white">{i + 1}</text>
          </g>
        ))}
        {/* Cells */}
        {Array.from({ length: size }, (_, row) =>
          Array.from({ length: size }, (_, col) => {
            const val = (row + 1) * (col + 1)
            const isSpecial = row === col
            return (
              <g key={`${row}-${col}`}>
                <rect
                  x={offset + col * cell + 1} y={offset + row * cell + 1}
                  width={cell - 2} height={cell - 2}
                  fill={isSpecial ? '#e0e7ff' : (row + col) % 2 === 0 ? '#f8fafc' : '#f1f5f9'}
                  rx={3}
                />
                <text
                  x={offset + col * cell + cell / 2} y={offset + row * cell + cell / 2 + 5}
                  textAnchor="middle" fontSize={12}
                  fontWeight={isSpecial ? 'bold' : 'normal'}
                  fill={isSpecial ? '#4f46e5' : '#374151'}
                >{val}</text>
              </g>
            )
          })
        )}
      </svg>
    </div>
  )
}

function FractionParts() {
  return (
    <svg viewBox="0 0 400 160" className="w-full max-w-md mx-auto">
      {/* Fraction display */}
      <rect x="150" y="20" width="100" height="120" rx="12" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
      <text x="200" y="72" textAnchor="middle" fontSize="36" fontWeight="bold" fill="#15803d">3</text>
      <line x1="165" y1="85" x2="235" y2="85" stroke="#15803d" strokeWidth="3" />
      <text x="200" y="125" textAnchor="middle" fontSize="36" fontWeight="bold" fill="#15803d">4</text>
      {/* Labels */}
      <text x="60" y="68" textAnchor="middle" fontSize="13" fill="#374151" fontWeight="600">Numerador</text>
      <text x="60" y="82" textAnchor="middle" fontSize="11" fill="#6b7280">(parts que tenim)</text>
      <line x1="110" y1="72" x2="148" y2="72" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4" />
      <text x="340" y="120" textAnchor="middle" fontSize="13" fill="#374151" fontWeight="600">Denominador</text>
      <text x="340" y="134" textAnchor="middle" fontSize="11" fill="#6b7280">(parts totals)</text>
      <line x1="252" y1="120" x2="295" y2="120" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4" />
      {/* Visual fraction */}
      {[0, 1, 2, 3].map(i => (
        <rect key={i} x={10 + i * 28} y="135" width="24" height="20"
          fill={i < 3 ? '#86efac' : '#f0fdf4'} stroke="#15803d" strokeWidth="1.5" rx="3" />
      ))}
      <text x="66" y="150" textAnchor="middle" fontSize="10" fill="#6b7280">3 de 4 parts</text>
    </svg>
  )
}

function DecimalPlaceValue() {
  const places = [
    { label: 'Centenes', value: '3', color: '#fbbf24' },
    { label: 'Desenes', value: '2', color: '#f97316' },
    { label: 'Unitats', value: '7', color: '#ef4444' },
    { label: '(coma)', value: ',', color: '#e5e7eb', text: '#9ca3af' },
    { label: 'Dècimes', value: '4', color: '#22c55e' },
    { label: 'Centèsimes', value: '5', color: '#06b6d4' },
  ]
  return (
    <svg viewBox="0 0 420 100" className="w-full max-w-lg mx-auto">
      {places.map((p, i) => (
        <g key={i}>
          <rect x={10 + i * 67} y={8} width={58} height={52} rx={8}
            fill={p.color} opacity={p.label === '(coma)' ? 1 : 0.85} />
          <text x={10 + i * 67 + 29} y={40} textAnchor="middle" fontSize={p.label === '(coma)' ? 28 : 26}
            fontWeight="bold" fill={p.text || 'white'}>{p.value}</text>
          <text x={10 + i * 67 + 29} y={78} textAnchor="middle" fontSize={10}
            fill="#374151">{p.label}</text>
        </g>
      ))}
      <text x={210} y={98} textAnchor="middle" fontSize={11} fill="#6b7280">327,45</text>
    </svg>
  )
}

function PercentageBar() {
  const segments = [
    { pct: 25, label: '25%', color: '#818cf8' },
    { pct: 25, label: '25%', color: '#a5b4fc' },
    { pct: 25, label: '25%', color: '#c7d2fe' },
    { pct: 25, label: '25%', color: '#e0e7ff' },
  ]
  let x = 20
  return (
    <svg viewBox="0 0 360 90" className="w-full max-w-sm mx-auto">
      <text x="180" y="16" textAnchor="middle" fontSize="12" fill="#6b7280">100% = 4 quarts</text>
      {segments.map((s, i) => {
        const w = s.pct * 3.2
        const el = (
          <g key={i}>
            <rect x={x} y={22} width={w - 2} height={36} rx={i === 0 ? '8 0 0 8' : i === 3 ? '0 8 8 0' : 0} fill={s.color} stroke="#6366f1" strokeWidth="1" />
            <text x={x + w / 2 - 1} y={45} textAnchor="middle" fontSize={13} fontWeight="bold" fill="#3730a3">{s.label}</text>
          </g>
        )
        x += w
        return el
      })}
      <text x="20" y="78" fontSize="11" fill="#374151">0%</text>
      <text x="155" y="78" textAnchor="middle" fontSize="11" fill="#374151">50% = ½</text>
      <text x="340" y="78" textAnchor="end" fontSize="11" fill="#374151">100%</text>
    </svg>
  )
}

function GeometryShapes() {
  return (
    <svg viewBox="0 0 420 160" className="w-full max-w-lg mx-auto">
      {/* Rectangle */}
      <rect x={20} y={30} width={100} height={60} fill="#dbeafe" stroke="#3b82f6" strokeWidth={2} rx={3} />
      <text x={70} y={24} textAnchor="middle" fontSize={11} fill="#1d4ed8" fontWeight="600">base (b)</text>
      <line x1={20} y1={18} x2={120} y2={18} stroke="#3b82f6" strokeWidth={1} markerEnd="url(#arr)" />
      <text x={128} y={63} fontSize={11} fill="#1d4ed8" fontWeight="600">h</text>
      <text x={70} y={108} textAnchor="middle" fontSize={11} fill="#1e40af" fontWeight="700">Rectangle</text>
      <text x={70} y={120} textAnchor="middle" fontSize={10} fill="#374151">A = b × h</text>
      <text x={70} y={132} textAnchor="middle" fontSize={10} fill="#374151">P = 2(b+h)</text>

      {/* Triangle */}
      <polygon points="230,30 180,100 280,100" fill="#dcfce7" stroke="#22c55e" strokeWidth={2} />
      <line x1={230} y1={30} x2={230} y2={100} stroke="#16a34a" strokeWidth={1.5} strokeDasharray="5,3" />
      <text x={235} y={68} fontSize={11} fill="#15803d" fontWeight="600">h</text>
      <text x={230} y={116} textAnchor="middle" fontSize={11} fill="#166534" fontWeight="700">Triangle</text>
      <text x={230} y={128} textAnchor="middle" fontSize={10} fill="#374151">A = (b × h) / 2</text>

      {/* Circle */}
      <circle cx={360} cy={65} r={42} fill="#fef3c7" stroke="#f59e0b" strokeWidth={2} />
      <line x1={360} y1={65} x2={402} y2={65} stroke="#d97706" strokeWidth={1.5} strokeDasharray="5,3" />
      <text x={381} y={60} textAnchor="middle" fontSize={11} fill="#b45309" fontWeight="600">r</text>
      <text x={360} y={122} textAnchor="middle" fontSize={11} fill="#92400e" fontWeight="700">Cercle</text>
      <text x={360} y={134} textAnchor="middle" fontSize={10} fill="#374151">A = π × r²</text>
      <text x={360} y={146} textAnchor="middle" fontSize={10} fill="#374151">C = 2πr</text>
    </svg>
  )
}

function McdMcmVenn() {
  return (
    <svg viewBox="0 0 360 150" className="w-full max-w-sm mx-auto">
      {/* Example: 12 and 18 */}
      <text x="180" y="16" textAnchor="middle" fontSize="12" fill="#374151" fontWeight="600">Divisors de 12 i 18</text>
      {/* Left circle */}
      <ellipse cx="140" cy="85" rx="100" ry="52" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" fillOpacity="0.7" />
      {/* Right circle */}
      <ellipse cx="220" cy="85" rx="100" ry="52" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" fillOpacity="0.7" />
      {/* Left only */}
      <text x="90" y="80" textAnchor="middle" fontSize="12" fill="#1d4ed8">1, 4, 12</text>
      <text x="90" y="96" textAnchor="middle" fontSize="10" fill="#3b82f6">només de 12</text>
      {/* Intersection */}
      <text x="180" y="80" textAnchor="middle" fontSize="13" fill="#374151" fontWeight="bold">1,2,</text>
      <text x="180" y="96" textAnchor="middle" fontSize="13" fill="#374151" fontWeight="bold">3,6</text>
      {/* Right only */}
      <text x="272" y="80" textAnchor="middle" fontSize="12" fill="#166534">1,9,18</text>
      <text x="272" y="96" textAnchor="middle" fontSize="10" fill="#22c55e">només de 18</text>
      {/* MCD label */}
      <text x="180" y="128" textAnchor="middle" fontSize="11" fill="#7c3aed" fontWeight="700">MCD(12,18) = 6 (el major comú)</text>
    </svg>
  )
}

function NumberLine() {
  const nums = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]
  return (
    <svg viewBox="0 0 380 70" className="w-full max-w-md mx-auto">
      <line x1="10" y1="35" x2="370" y2="35" stroke="#6b7280" strokeWidth="2" />
      <polygon points="370,30 380,35 370,40" fill="#6b7280" />
      {nums.map((n, i) => {
        const x = 20 + i * 32
        return (
          <g key={n}>
            <line x1={x} y1={29} x2={x} y2={41} stroke={n === 0 ? '#374151' : '#9ca3af'} strokeWidth={n === 0 ? 2.5 : 1.5} />
            <text x={x} y={56} textAnchor="middle" fontSize={12}
              fontWeight={n === 0 ? 'bold' : 'normal'}
              fill={n < 0 ? '#ef4444' : n === 0 ? '#374151' : '#2563eb'}>{n}</text>
          </g>
        )
      })}
      <text x="10" y="18" fontSize="11" fill="#ef4444" fontWeight="600">← negatius</text>
      <text x="220" y="18" fontSize="11" fill="#2563eb" fontWeight="600">positius →</text>
    </svg>
  )
}

function PowerNotation() {
  return (
    <svg viewBox="0 0 360 120" className="w-full max-w-sm mx-auto">
      {/* Main power display */}
      <rect x="100" y="15" width="160" height="70" rx="12" fill="#faf5ff" stroke="#a855f7" strokeWidth="2" />
      <text x="165" y="62" fontSize="42" fontWeight="bold" fill="#7e22ce">2</text>
      <text x="197" y="40" fontSize="22" fontWeight="bold" fill="#a855f7">5</text>
      {/* Arrows and labels */}
      <line x1="60" y1="58" x2="98" y2="58" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4" />
      <text x="30" y="50" textAnchor="middle" fontSize="12" fill="#374151" fontWeight="600">Base</text>
      <text x="30" y="64" textAnchor="middle" fontSize="11" fill="#6b7280">el número</text>
      <line x1="262" y1="35" x2="300" y2="35" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4" />
      <text x="330" y="30" textAnchor="middle" fontSize="12" fill="#374151" fontWeight="600">Exponent</text>
      <text x="330" y="44" textAnchor="middle" fontSize="11" fill="#6b7280">vegades</text>
      {/* Expansion */}
      <text x="180" y="103" textAnchor="middle" fontSize="13" fill="#374151">
        2⁵ = 2×2×2×2×2 = <tspan fontWeight="bold" fill="#7e22ce">32</tspan>
      </text>
    </svg>
  )
}

function EquationBalance() {
  return (
    <svg viewBox="0 0 360 140" className="w-full max-w-sm mx-auto">
      {/* Balance beam */}
      <rect x="170" y="90" width="20" height="40" fill="#9ca3af" rx="4" />
      <polygon points="145,125 215,125 180,135" fill="#6b7280" />
      <rect x="60" y="86" width="120" height="8" fill="#6b7280" rx="4" />
      <rect x="180" y="86" width="120" height="8" fill="#6b7280" rx="4" />
      {/* Left plate */}
      <rect x="55" y="40" width="130" height="50" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
      <text x="120" y="72" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#1d4ed8">3x + 5</text>
      {/* Right plate */}
      <rect x="175" y="40" width="130" height="50" rx="10" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
      <text x="240" y="72" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#15803d">14</text>
      {/* = sign */}
      <text x="180" y="70" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#374151">=</text>
      {/* Label */}
      <text x="180" y="18" textAnchor="middle" fontSize="12" fill="#6b7280">Equilibri: el que fas a un costat, ho fas a l'altre</text>
    </svg>
  )
}

function EsoGeometryShapes() {
  return (
    <svg viewBox="0 0 420 180" className="w-full max-w-lg mx-auto">
      {/* Trapezoid */}
      <polygon points="30,100 110,100 95,40 45,40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
      <line x1="30" y1="108" x2="110" y2="108" stroke="#ec4899" strokeWidth="1" />
      <text x="70" y="120" textAnchor="middle" fontSize="10" fill="#be185d">B (base major)</text>
      <line x1="45" y1="32" x2="95" y2="32" stroke="#ec4899" strokeWidth="1" />
      <text x="70" y="28" textAnchor="middle" fontSize="10" fill="#be185d">b (base menor)</text>
      <line x1="15" y1="40" x2="15" y2="100" stroke="#be185d" strokeWidth="1.5" strokeDasharray="4,2" />
      <text x="8" y="72" textAnchor="middle" fontSize="10" fill="#be185d">h</text>
      <text x="70" y="140" textAnchor="middle" fontSize="11" fontWeight="700" fill="#9d174d">Trapezi</text>
      <text x="70" y="153" textAnchor="middle" fontSize="10" fill="#374151">A=(B+b)×h÷2</text>

      {/* Rhombus */}
      <polygon points="210,40 170,85 210,130 250,85" fill="#fef9c3" stroke="#eab308" strokeWidth="2" />
      <line x1="170" y1="85" x2="250" y2="85" stroke="#ca8a04" strokeWidth="1.5" strokeDasharray="5,3" />
      <line x1="210" y1="40" x2="210" y2="130" stroke="#ca8a04" strokeWidth="1.5" strokeDasharray="5,3" />
      <text x="230" y="82" fontSize="10" fill="#a16207">D</text>
      <text x="212" y="58" fontSize="10" fill="#a16207">d</text>
      <text x="210" y="148" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">Rombe</text>
      <text x="210" y="161" textAnchor="middle" fontSize="10" fill="#374151">A = D×d ÷ 2</text>

      {/* Cylinder */}
      <ellipse cx="355" cy="50" rx="42" ry="14" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
      <rect x="313" y="50" width="84" height="70" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
      <ellipse cx="355" cy="120" rx="42" ry="14" fill="#7dd3fc" stroke="#0284c7" strokeWidth="2" />
      <line x1="355" y1="50" x2="400" y2="50" stroke="#0369a1" strokeWidth="1.5" strokeDasharray="4,2" />
      <text x="380" y="46" fontSize="10" fill="#0369a1">r</text>
      <line x1="402" y1="50" x2="402" y2="120" stroke="#0369a1" strokeWidth="1.5" />
      <text x="410" y="88" fontSize="10" fill="#0369a1">h</text>
      <text x="355" y="148" textAnchor="middle" fontSize="11" fontWeight="700" fill="#075985">Cilindre</text>
      <text x="355" y="161" textAnchor="middle" fontSize="10" fill="#374151">V = π×r²×h</text>
    </svg>
  )
}

function StatisticsExample() {
  const data = [4, 7, 3, 8, 3, 6]
  const sorted = [...data].sort((a, b) => a - b)
  const sum = data.reduce((a, b) => a + b, 0)
  const mean = sum / data.length
  const maxVal = 10
  const barW = 38
  return (
    <svg viewBox="0 0 340 160" className="w-full max-w-sm mx-auto">
      <text x="170" y="14" textAnchor="middle" fontSize="12" fill="#374151" fontWeight="600">Dades: {data.join(', ')}</text>
      {/* Bar chart */}
      {data.map((v, i) => {
        const h = (v / maxVal) * 90
        const x = 20 + i * (barW + 8)
        return (
          <g key={i}>
            <rect x={x} y={120 - h} width={barW} height={h} fill="#818cf8" rx={4} opacity={0.85} />
            <text x={x + barW / 2} y={115 - h} textAnchor="middle" fontSize={11} fill="#4338ca" fontWeight="600">{v}</text>
            <text x={x + barW / 2} y={133} textAnchor="middle" fontSize={10} fill="#9ca3af">d{i + 1}</text>
          </g>
        )
      })}
      {/* Mean line */}
      <line x1="15" y1={120 - (mean / maxVal) * 90} x2="305" y2={120 - (mean / maxVal) * 90}
        stroke="#ef4444" strokeWidth="2" strokeDasharray="6,3" />
      <text x="310" y={120 - (mean / maxVal) * 90 + 4} fontSize="10" fill="#ef4444" fontWeight="600">x̄={mean.toFixed(1)}</text>
      {/* Summary */}
      <text x="170" y="150" textAnchor="middle" fontSize="10" fill="#374151">
        Mitja={mean.toFixed(1)} | Mediana={sorted[2]} | Moda=3
      </text>
    </svg>
  )
}

function MultiplicationGrid() {
  return (
    <div className="text-center">
      <p className="text-sm text-gray-500 mb-2">Taula de multiplicar (extracte 2-5)</p>
      <div className="inline-grid gap-px bg-indigo-200 rounded-lg overflow-hidden text-sm">
        {[['×','2','3','4','5'],['2','4','6','8','10'],['3','6','9','12','15'],['4','8','12','16','20'],['5','10','15','20','25']].map((row, r) => (
          <div key={r} className="flex">
            {row.map((cell, c) => (
              <div key={c} className={`w-10 h-8 flex items-center justify-center font-semibold
                ${r === 0 || c === 0 ? 'bg-indigo-500 text-white' : r === c ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-700'}`}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

const SVG_COMPONENTS = {
  times_table: TimesTableGrid,
  fraction_parts: FractionParts,
  decimal_place_value: DecimalPlaceValue,
  percentage_bar: PercentageBar,
  geometry_shapes: GeometryShapes,
  mcd_mcm_venn: McdMcmVenn,
  number_line: NumberLine,
  power_notation: PowerNotation,
  equation_balance: EquationBalance,
  eso_geometry_shapes: EsoGeometryShapes,
  statistics_example: StatisticsExample,
  multiplication_grid: MultiplicationGrid,
}

// ── SECTION RENDERERS ─────────────────────────────────────────────────────────

function TextSection({ content }) {
  return <p className="text-gray-700 leading-relaxed">{content}</p>
}

function FormulaSection({ title, formula, note }) {
  return (
    <div className="rounded-xl overflow-hidden border border-indigo-200">
      <div className="bg-indigo-600 px-4 py-2">
        <p className="text-white font-semibold text-sm">{title}</p>
      </div>
      <div className="bg-indigo-50 px-4 py-3">
        <pre className="text-indigo-800 font-mono font-bold text-base whitespace-pre-wrap">{formula}</pre>
        {note && <p className="text-indigo-600 text-sm mt-2">{note}</p>}
      </div>
    </div>
  )
}

function ExampleSection({ title, steps }) {
  return (
    <div className="rounded-xl border border-emerald-200 overflow-hidden">
      <div className="bg-emerald-600 px-4 py-2">
        <p className="text-white font-semibold text-sm">{title}</p>
      </div>
      <div className="bg-emerald-50 px-4 py-3 space-y-1">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span className="text-emerald-400 font-mono text-sm mt-0.5 shrink-0">{i === 0 ? '▶' : '→'}</span>
            <span className="text-gray-700 text-sm">{step}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function TipSection({ content }) {
  return (
    <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
      <span className="text-xl shrink-0">💡</span>
      <p className="text-amber-800 text-sm leading-relaxed">{content}</p>
    </div>
  )
}

function TableSection({ title, headers, rows }) {
  return (
    <div>
      {title && <p className="text-sm font-semibold text-gray-600 mb-2">{title}</p>}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-700 text-white">
              {headers.map((h, i) => (
                <th key={i} className="px-4 py-2 text-left font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-2 text-gray-700 border-t border-gray-100">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ListSection({ title, items }) {
  return (
    <div>
      {title && <p className="text-sm font-semibold text-gray-600 mb-2">{title}</p>}
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 items-start">
            <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
            <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SvgSection({ graphic }) {
  const Component = SVG_COMPONENTS[graphic]
  if (!Component) return null
  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
      <Component />
    </div>
  )
}

function renderSection(section, i) {
  switch (section.type) {
    case 'text':    return <TextSection key={i} {...section} />
    case 'formula': return <FormulaSection key={i} {...section} />
    case 'example': return <ExampleSection key={i} {...section} />
    case 'tip':     return <TipSection key={i} {...section} />
    case 'table':   return <TableSection key={i} {...section} />
    case 'list':    return <ListSection key={i} {...section} />
    case 'svg':     return <SvgSection key={i} {...section} />
    default:        return null
  }
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function TheorySection() {
  const { level, topicId } = useParams()
  const navigate = useNavigate()
  const topic = getTopicById(topicId)
  const theory = getTheory(topicId)

  if (!topic || !theory) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Contingut no disponible</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 px-4 py-8">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(`/temes/${level}`)}
            className="text-gray-400 hover:text-gray-600 text-2xl p-2 rounded-xl hover:bg-white transition-all"
            aria-label="Tornar"
          >
            ←
          </button>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Teoria</p>
            <h1 className="text-2xl font-extrabold text-gray-800">{theory.title}</h1>
          </div>
        </div>

        {/* Intro card */}
        <div className={`${topic.colorClasses.bgLight} border ${topic.colorClasses.border} rounded-2xl px-5 py-4 mb-6`}>
          <div className="flex gap-3 items-start">
            <span className={`text-3xl w-12 h-12 ${topic.colorClasses.bg} rounded-xl flex items-center justify-center shrink-0 text-white font-bold`}>
              {topic.icon}
            </span>
            <p className={`${topic.colorClasses.text} font-medium leading-relaxed`}>{theory.intro}</p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-5">
          {theory.sections.map((section, i) => renderSection(section, i))}
        </div>

        {/* CTA: go to exercises */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate(`/exercicis/${level}/${topicId}`)}
            className={`${topic.colorClasses.bg} text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all text-lg`}
          >
            Practicar ara →
          </button>
          <p className="text-gray-400 text-sm mt-2">Posa en pràctica el que has après</p>
        </div>

      </div>
    </div>
  )
}
