function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function gcd(a, b) {
  a = Math.abs(a); b = Math.abs(b)
  while (b) { [a, b] = [b, a % b] }
  return a
}

function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b)
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function makeChoices(correct, wrongFn, count = 4) {
  const wrongs = new Set()
  while (wrongs.size < count - 1) {
    const w = wrongFn()
    if (String(w) !== String(correct)) wrongs.add(String(w))
  }
  return shuffle([String(correct), ...wrongs])
}

// ── GENERATORS ──────────────────────────────────────────────────────────────

function genMultiplicacio() {
  const type = rand(0, 1)
  if (type === 0) {
    const a = rand(2, 12), b = rand(2, 12)
    const answer = a * b
    const options = makeChoices(answer, () => answer + rand(-4, 4) * rand(1, 3) || answer + 1)
    return {
      question: `Quant és ${a} × ${b}?`,
      type: 'multiple_choice',
      options,
      correctAnswer: String(answer),
      explanation: `${a} × ${b} = ${answer}`,
      hint: `Pensa en la taula del ${a}`,
    }
  } else {
    const b = rand(2, 12), answer = rand(2, 12)
    const a = b * answer
    const options = makeChoices(answer, () => answer + rand(-3, 3) || answer + 1)
    return {
      question: `Quant és ${a} ÷ ${b}?`,
      type: 'multiple_choice',
      options,
      correctAnswer: String(answer),
      explanation: `${a} ÷ ${b} = ${answer} perquè ${b} × ${answer} = ${a}`,
      hint: `Quin número multiplicat per ${b} dóna ${a}?`,
    }
  }
}

function genFraccions() {
  const ops = ['suma', 'resta', 'simplifica']
  const op = ops[rand(0, ops.length - 1)]
  if (op === 'suma') {
    const d = rand(2, 8)
    const n1 = rand(1, d - 1), n2 = rand(1, d - 1)
    const numSum = n1 + n2
    const g = gcd(numSum, d)
    const rn = numSum / g, rd = d / g
    const answerStr = rd === 1 ? String(rn) : `${rn}/${rd}`
    const options = makeChoices(answerStr, () => {
      const wn = rand(1, 6), wd = rand(2, 8)
      return `${wn}/${wd}`
    })
    return {
      question: `Quant és ${n1}/${d} + ${n2}/${d}?`,
      type: 'multiple_choice',
      options,
      correctAnswer: answerStr,
      explanation: `${n1}/${d} + ${n2}/${d} = ${numSum}/${d}${g > 1 ? ` = ${answerStr}` : ''}`,
      hint: `Suma els numeradors i manté el denominador`,
    }
  } else if (op === 'resta') {
    const d = rand(2, 9)
    const n2 = rand(1, d - 1)
    const n1 = rand(n2 + 1, d)
    const numRes = n1 - n2
    const g = gcd(numRes, d)
    const rn = numRes / g, rd = d / g
    const answerStr = rd === 1 ? String(rn) : `${rn}/${rd}`
    const options = makeChoices(answerStr, () => `${rand(1, 5)}/${rand(2, 8)}`)
    return {
      question: `Quant és ${n1}/${d} - ${n2}/${d}?`,
      type: 'multiple_choice',
      options,
      correctAnswer: answerStr,
      explanation: `${n1}/${d} - ${n2}/${d} = ${numRes}/${d}${g > 1 ? ` = ${answerStr}` : ''}`,
      hint: `Resta els numeradors i manté el denominador`,
    }
  } else {
    const g = rand(2, 4)
    const n = rand(1, 5) * g, d = rand(2, 6) * g
    const rn = n / g, rd = d / g
    const answerStr = `${rn}/${rd}`
    const options = makeChoices(answerStr, () => `${rand(1, 5)}/${rand(2, 8)}`)
    return {
      question: `Simplifica la fracció ${n}/${d}`,
      type: 'multiple_choice',
      options,
      correctAnswer: answerStr,
      explanation: `${n}/${d}: el MCD de ${n} i ${d} és ${g}, per tant ${n}÷${g}/${d}÷${g} = ${answerStr}`,
      hint: `Busca el màxim comú divisor de ${n} i ${d}`,
    }
  }
}

function genDecimals() {
  const type = rand(0, 2)
  if (type === 0) {
    const a = (rand(10, 99) / 10), b = (rand(10, 99) / 10)
    const answer = Math.round((a + b) * 10) / 10
    const options = makeChoices(answer, () => Math.round((answer + (rand(-3, 3) * 0.1 || 0.2)) * 10) / 10)
    return {
      question: `Quant és ${a} + ${b}?`,
      type: 'multiple_choice',
      options,
      correctAnswer: String(answer),
      explanation: `${a} + ${b} = ${answer}`,
      hint: `Alinea les comes decimals i suma`,
    }
  } else if (type === 1) {
    const a = (rand(20, 99) / 10), b = (rand(10, Math.floor(a * 10) - 1) / 10)
    const answer = Math.round((a - b) * 10) / 10
    const options = makeChoices(answer, () => Math.round((answer + (rand(-3, 3) * 0.1 || 0.2)) * 10) / 10)
    return {
      question: `Quant és ${a} - ${b}?`,
      type: 'multiple_choice',
      options,
      correctAnswer: String(answer),
      explanation: `${a} - ${b} = ${answer}`,
      hint: `Alinea les comes decimals i resta`,
    }
  } else {
    const a = rand(1, 9) + rand(1, 9) * 0.1
    const b = rand(2, 5)
    const answer = Math.round(a * b * 10) / 10
    const options = makeChoices(answer, () => Math.round((answer + rand(-2, 2)) * 10) / 10)
    return {
      question: `Quant és ${a} × ${b}?`,
      type: 'multiple_choice',
      options,
      correctAnswer: String(answer),
      explanation: `${a} × ${b} = ${answer}`,
      hint: `Multiplica com si fossin enters i posa la coma`,
    }
  }
}

function genPercentatges() {
  const type = rand(0, 2)
  if (type === 0) {
    const pcts = [10, 20, 25, 30, 40, 50, 75]
    const pct = pcts[rand(0, pcts.length - 1)]
    const base = rand(2, 20) * 10
    const answer = (pct / 100) * base
    const options = makeChoices(answer, () => answer + rand(-3, 3) * 5 || answer + 5)
    return {
      question: `Quant és el ${pct}% de ${base}?`,
      type: 'multiple_choice',
      options,
      correctAnswer: String(answer),
      explanation: `El ${pct}% de ${base} = ${base} × ${pct}/100 = ${answer}`,
      hint: `Multiplica ${base} per ${pct} i divideix per 100`,
    }
  } else if (type === 1) {
    const pct = rand(1, 4) * 10
    const total = rand(5, 20) * 10
    const discount = (pct / 100) * total
    const answer = total - discount
    const options = makeChoices(answer, () => answer + rand(-2, 2) * 5 || answer + 5)
    return {
      question: `Tens ${total}€ i gastes el ${pct}%. Quant et queda?`,
      type: 'multiple_choice',
      options,
      correctAnswer: String(answer),
      explanation: `${pct}% de ${total} = ${discount}€. Restes: ${total} - ${discount} = ${answer}€`,
      hint: `Primer calcula el ${pct}% de ${total}`,
    }
  } else {
    const part = rand(1, 9) * 5
    const total = rand(2, 10) * part
    const answer = (part / total) * 100
    const options = makeChoices(answer, () => answer + rand(-2, 2) * 5 || answer + 5)
    return {
      question: `Quin percentatge és ${part} de ${total}?`,
      type: 'multiple_choice',
      options,
      correctAnswer: String(answer),
      explanation: `(${part} ÷ ${total}) × 100 = ${answer}%`,
      hint: `Divideix ${part} entre ${total} i multiplica per 100`,
    }
  }
}

function genGeometria() {
  const type = rand(0, 3)
  if (type === 0) {
    const w = rand(3, 15), h = rand(3, 15)
    const area = w * h
    const options = makeChoices(`${area} cm²`, () => `${area + rand(-3, 3) * w || area + w} cm²`)
    return {
      question: `Quina és l'àrea d'un rectangle de ${w} cm × ${h} cm?`,
      type: 'multiple_choice',
      options,
      correctAnswer: `${area} cm²`,
      explanation: `Àrea = base × altura = ${w} × ${h} = ${area} cm²`,
      hint: `Àrea del rectangle = base × altura`,
    }
  } else if (type === 1) {
    const w = rand(3, 15), h = rand(3, 15)
    const perim = 2 * (w + h)
    const options = makeChoices(`${perim} cm`, () => `${perim + rand(-2, 2) * 2 || perim + 2} cm`)
    return {
      question: `Quin és el perímetre d'un rectangle de ${w} cm × ${h} cm?`,
      type: 'multiple_choice',
      options,
      correctAnswer: `${perim} cm`,
      explanation: `Perímetre = 2 × (base + altura) = 2 × (${w} + ${h}) = ${perim} cm`,
      hint: `Suma tots els costats del rectangle`,
    }
  } else if (type === 2) {
    const b = rand(4, 14), h = rand(3, 12)
    const area = (b * h) / 2
    const options = makeChoices(`${area} cm²`, () => `${area + rand(-2, 2) * b / 2 || area + b} cm²`)
    return {
      question: `Quina és l'àrea d'un triangle de base ${b} cm i altura ${h} cm?`,
      type: 'multiple_choice',
      options,
      correctAnswer: `${area} cm²`,
      explanation: `Àrea = (base × altura) / 2 = (${b} × ${h}) / 2 = ${area} cm²`,
      hint: `Àrea del triangle = (base × altura) ÷ 2`,
    }
  } else {
    const r = rand(2, 8)
    const area = Math.round(3.14 * r * r * 10) / 10
    const options = makeChoices(`${area} cm²`, () => `${Math.round((area + rand(-5, 5)) * 10) / 10} cm²`)
    return {
      question: `Quina és l'àrea d'un cercle de radi ${r} cm? (usa π ≈ 3.14)`,
      type: 'multiple_choice',
      options,
      correctAnswer: `${area} cm²`,
      explanation: `Àrea = π × r² = 3.14 × ${r}² = 3.14 × ${r * r} = ${area} cm²`,
      hint: `Àrea del cercle = π × radi²`,
    }
  }
}

const problemTemplates = [
  () => {
    const candies = rand(3, 8) * rand(2, 6)
    const friends = rand(2, 6)
    while (candies % friends !== 0) {}
    const ans = candies / friends
    return {
      question: `En Joan té ${candies} caramels i els reparteix entre ${friends} amics iguals. Quants caramels toca a cada amic?`,
      type: 'fill_in',
      options: null,
      correctAnswer: String(ans),
      explanation: `${candies} ÷ ${friends} = ${ans} caramels per amic`,
      hint: `Divideix el total entre el nombre d'amics`,
    }
  },
  () => {
    const price = rand(2, 9)
    const qty = rand(3, 8)
    const total = price * qty
    return {
      question: `Una botella d'aigua costa ${price}€. Quant costen ${qty} botelles?`,
      type: 'fill_in',
      options: null,
      correctAnswer: String(total),
      explanation: `${price} × ${qty} = ${total}€`,
      hint: `Multiplica el preu per la quantitat`,
    }
  },
  () => {
    const initial = rand(20, 100)
    const spent = rand(5, initial - 5)
    const ans = initial - spent
    return {
      question: `La Maria tenia ${initial}€ i ha gastat ${spent}€. Quants euros li queden?`,
      type: 'fill_in',
      options: null,
      correctAnswer: String(ans),
      explanation: `${initial} - ${spent} = ${ans}€`,
      hint: `Resta el que ha gastat del total`,
    }
  },
  () => {
    const perDay = rand(2, 8)
    const days = rand(5, 15)
    const ans = perDay * days
    return {
      question: `Un cotxe recorre ${perDay * 10} km cada hora. Quants km fa en ${days} hores?`,
      type: 'fill_in',
      options: null,
      correctAnswer: String(ans * 10),
      explanation: `${perDay * 10} × ${days} = ${ans * 10} km`,
      hint: `Multiplica la velocitat per les hores`,
    }
  },
]

function genProblemes() {
  const tmpl = problemTemplates[rand(0, problemTemplates.length - 1)]
  return tmpl()
}

function genEnters() {
  const type = rand(0, 2)
  if (type === 0) {
    const a = rand(-9, 9), b = rand(-9, 9)
    const ans = a + b
    const options = makeChoices(ans, () => ans + rand(-3, 3) || ans + 1)
    return {
      question: `Quant és (${a}) + (${b})?`,
      type: 'multiple_choice',
      options,
      correctAnswer: String(ans),
      explanation: `(${a}) + (${b}) = ${ans}`,
      hint: a < 0 && b < 0 ? 'Dos negatius sumats donen un negatiu més gran' : 'Pensa en la recta numèrica',
    }
  } else if (type === 1) {
    const a = rand(-9, 9), b = rand(-9, 9)
    const ans = a - b
    const options = makeChoices(ans, () => ans + rand(-3, 3) || ans + 1)
    return {
      question: `Quant és (${a}) - (${b})?`,
      type: 'multiple_choice',
      options,
      correctAnswer: String(ans),
      explanation: `(${a}) - (${b}) = ${ans}`,
      hint: `Restar un negatiu és equivalent a sumar-lo`,
    }
  } else {
    const a = rand(-6, 6) || 1, b = rand(-6, 6) || 2
    const ans = a * b
    const options = makeChoices(ans, () => ans + rand(-3, 3) * 2 || ans + 2)
    const sign = (a > 0 && b > 0) || (a < 0 && b < 0) ? 'positiu' : 'negatiu'
    return {
      question: `Quant és (${a}) × (${b})?`,
      type: 'multiple_choice',
      options,
      correctAnswer: String(ans),
      explanation: `(${a}) × (${b}) = ${ans}. Signes ${a < 0 ? '-' : '+'}i ${b < 0 ? '-' : '+'} donen ${sign}`,
      hint: `Signes iguals → positiu; signes diferents → negatiu`,
    }
  }
}

function genFraccionsAvancades() {
  const type = rand(0, 2)
  if (type === 0) {
    // Fraccions equivalents
    const n = rand(1, 5), d = rand(2, 8)
    const mult = rand(2, 4)
    const equivN = n * mult, equivD = d * mult
    const fakeN = n * (mult + 1)
    const options = shuffle([`${equivN}/${equivD}`, `${fakeN}/${d * mult}`, `${n + 1}/${d + 1}`, `${n * 2}/${d + 1}`])
    return {
      question: `Quina fracció és equivalent a ${n}/${d}?`,
      type: 'multiple_choice',
      options,
      correctAnswer: `${equivN}/${equivD}`,
      explanation: `${n}/${d} = ${n}×${mult}/${d}×${mult} = ${equivN}/${equivD}`,
      hint: `Multiplica numerador i denominador pel mateix número`,
    }
  } else if (type === 1) {
    // Suma fraccions diferent denominador
    const d1 = rand(2, 5), d2 = rand(2, 5)
    const l = lcm(d1, d2)
    const n1 = rand(1, d1 - 1) || 1, n2 = rand(1, d2 - 1) || 1
    const sumN = n1 * (l / d1) + n2 * (l / d2)
    const g = gcd(sumN, l)
    const rn = sumN / g, rd = l / g
    const answerStr = rd === 1 ? String(rn) : `${rn}/${rd}`
    const options = makeChoices(answerStr, () => `${rand(1, 8)}/${rand(2, 10)}`)
    return {
      question: `Quant és ${n1}/${d1} + ${n2}/${d2}?`,
      type: 'multiple_choice',
      options,
      correctAnswer: answerStr,
      explanation: `MCM(${d1},${d2})=${l}. Resultat: ${n1 * (l / d1)}/${l} + ${n2 * (l / d2)}/${l} = ${sumN}/${l}${g > 1 ? ` = ${answerStr}` : ''}`,
      hint: `Primer troba el mínim comú múltiple de ${d1} i ${d2}`,
    }
  } else {
    // Nombre mixt a fracció
    const whole = rand(1, 4), n = rand(1, 5), d = rand(2, 6)
    const improperN = whole * d + n
    const answerStr = `${improperN}/${d}`
    const options = makeChoices(answerStr, () => `${improperN + rand(-2, 2) || improperN + 1}/${d}`)
    return {
      question: `Converteix ${whole} i ${n}/${d} a fracció impropia`,
      type: 'multiple_choice',
      options,
      correctAnswer: answerStr,
      explanation: `${whole} × ${d} + ${n} = ${improperN}. Resultat: ${answerStr}`,
      hint: `Multiplica la part entera per el denominador i suma el numerador`,
    }
  }
}

const perfectSquares = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225]

function genPotencies() {
  const type = rand(0, 2)
  if (type === 0) {
    const base = rand(2, 6), exp = rand(2, 4)
    const ans = Math.pow(base, exp)
    const options = makeChoices(ans, () => ans + rand(-5, 5) * base || ans + base)
    return {
      question: `Quant és ${base}${exp === 2 ? '²' : exp === 3 ? '³' : '⁴'} (${base} elevat a ${exp})?`,
      type: 'multiple_choice',
      options,
      correctAnswer: String(ans),
      explanation: `${base}^${exp} = ${Array(exp).fill(base).join(' × ')} = ${ans}`,
      hint: `Multiplica ${base} per ell mateix ${exp} vegades`,
    }
  } else if (type === 1) {
    const sq = perfectSquares[rand(0, perfectSquares.length - 1)]
    const root = Math.sqrt(sq)
    const options = makeChoices(root, () => root + rand(-2, 2) || root + 1)
    return {
      question: `Quina és l'arrel quadrada de ${sq}?`,
      type: 'multiple_choice',
      options,
      correctAnswer: String(root),
      explanation: `√${sq} = ${root} perquè ${root} × ${root} = ${sq}`,
      hint: `Quin número multiplicat per ell mateix dóna ${sq}?`,
    }
  } else {
    const exp = rand(1, 5)
    const ans = Math.pow(10, exp)
    const options = makeChoices(ans, () => Math.pow(10, exp + rand(-1, 1)) || Math.pow(10, exp + 1))
    return {
      question: `Quant és 10${exp === 2 ? '²' : exp === 3 ? '³' : `^${exp}`}?`,
      type: 'multiple_choice',
      options,
      correctAnswer: String(ans),
      explanation: `10^${exp} = 1 seguit de ${exp} zeros = ${ans}`,
      hint: `10 elevat a n és 1 seguit de n zeros`,
    }
  }
}

function genAlgebra() {
  const type = rand(0, 2)
  if (type === 0) {
    // ax + b = c
    const a = rand(2, 5), x = rand(1, 10)
    const b = rand(1, 10)
    const c = a * x + b
    return {
      question: `Resol: ${a}x + ${b} = ${c}`,
      type: 'fill_in',
      options: null,
      correctAnswer: String(x),
      explanation: `${a}x = ${c} - ${b} = ${c - b}. x = ${c - b} ÷ ${a} = ${x}`,
      hint: `Passa ${b} a l'altre costat restant`,
    }
  } else if (type === 1) {
    // x/a = b
    const a = rand(2, 6), b = rand(2, 9)
    const x = a * b
    return {
      question: `Resol: x/${a} = ${b}`,
      type: 'fill_in',
      options: null,
      correctAnswer: String(x),
      explanation: `x = ${b} × ${a} = ${x}`,
      hint: `Multiplica els dos costats per ${a}`,
    }
  } else {
    // ax - b = cx + d  =>  (a-c)x = d+b
    const c = rand(1, 3), x = rand(1, 8)
    const a = c + rand(1, 3)
    const b = rand(1, 8)
    const d = (a - c) * x - b
    return {
      question: `Resol: ${a}x - ${b} = ${c}x + ${d}`,
      type: 'fill_in',
      options: null,
      correctAnswer: String(x),
      explanation: `${a}x - ${c}x = ${d} + ${b}. ${a - c}x = ${d + b}. x = ${x}`,
      hint: `Agrupa els termes amb x a un costat i els nombres a l'altre`,
    }
  }
}

function genGeometriaEso() {
  const type = rand(0, 3)
  if (type === 0) {
    // Trapezi: (B+b)*h/2
    const B = rand(6, 14), b = rand(3, B - 1), h = rand(3, 10)
    const area = ((B + b) * h) / 2
    const options = makeChoices(`${area} cm²`, () => `${area + rand(-3, 3) * h || area + h} cm²`)
    return {
      question: `Quina és l'àrea d'un trapezi de bases ${B} cm i ${b} cm, i altura ${h} cm?`,
      type: 'multiple_choice',
      options,
      correctAnswer: `${area} cm²`,
      explanation: `Àrea = (B+b) × h / 2 = (${B}+${b}) × ${h} / 2 = ${B + b} × ${h} / 2 = ${area} cm²`,
      hint: `Àrea trapezi = (base major + base menor) × altura ÷ 2`,
    }
  } else if (type === 1) {
    // Volum prisma rectangular
    const l = rand(3, 10), w = rand(3, 8), h = rand(3, 8)
    const vol = l * w * h
    const options = makeChoices(`${vol} cm³`, () => `${vol + rand(-3, 3) * l || vol + l} cm³`)
    return {
      question: `Quin és el volum d'un prisma rectangular de ${l} cm × ${w} cm × ${h} cm?`,
      type: 'multiple_choice',
      options,
      correctAnswer: `${vol} cm³`,
      explanation: `Volum = llarg × ample × alt = ${l} × ${w} × ${h} = ${vol} cm³`,
      hint: `Multiplica les tres dimensions`,
    }
  } else if (type === 2) {
    // Àrea rombe: D*d/2
    const D = rand(4, 14) * 2, d = rand(2, D / 2 - 1) * 2
    const area = (D * d) / 2
    const options = makeChoices(`${area} cm²`, () => `${area + rand(-3, 3) * d || area + d} cm²`)
    return {
      question: `Quina és l'àrea d'un rombe amb diagonals ${D} cm i ${d} cm?`,
      type: 'multiple_choice',
      options,
      correctAnswer: `${area} cm²`,
      explanation: `Àrea = (D × d) / 2 = (${D} × ${d}) / 2 = ${area} cm²`,
      hint: `Àrea del rombe = (diagonal major × diagonal menor) ÷ 2`,
    }
  } else {
    // Volum cilindre: π*r²*h
    const r = rand(2, 6), h = rand(3, 10)
    const vol = Math.round(3.14 * r * r * h * 10) / 10
    const options = makeChoices(`${vol} cm³`, () => `${Math.round((vol + rand(-5, 5) * r) * 10) / 10} cm³`)
    return {
      question: `Quin és el volum d'un cilindre de radi ${r} cm i altura ${h} cm? (π ≈ 3.14)`,
      type: 'multiple_choice',
      options,
      correctAnswer: `${vol} cm³`,
      explanation: `Volum = π × r² × h = 3.14 × ${r}² × ${h} = 3.14 × ${r * r} × ${h} = ${vol} cm³`,
      hint: `Volum cilindre = π × radi² × altura`,
    }
  }
}

function genEstadistica() {
  const type = rand(0, 2)
  if (type === 0) {
    // Mitja
    const count = rand(4, 6)
    const data = Array.from({ length: count }, () => rand(3, 10))
    const sum = data.reduce((a, b) => a + b, 0)
    const mean = Math.round((sum / count) * 10) / 10
    const options = makeChoices(mean, () => Math.round((mean + rand(-2, 2) * 0.5 || mean + 0.5) * 10) / 10)
    return {
      question: `Quina és la mitja de: ${data.join(', ')}?`,
      type: 'multiple_choice',
      options,
      correctAnswer: String(mean),
      explanation: `Suma: ${data.join('+')} = ${sum}. Mitja: ${sum} ÷ ${count} = ${mean}`,
      hint: `Suma tots els valors i divideix pel nombre de dades`,
    }
  } else if (type === 1) {
    // Mediana
    const count = rand(3, 5) * 2 - 1  // imparells per simplicitat
    const data = Array.from({ length: count }, () => rand(2, 15))
    const sorted = [...data].sort((a, b) => a - b)
    const median = sorted[Math.floor(count / 2)]
    const options = makeChoices(median, () => sorted[rand(0, count - 1)])
    return {
      question: `Quina és la mediana de: ${data.join(', ')}?`,
      type: 'multiple_choice',
      options,
      correctAnswer: String(median),
      explanation: `Ordenats: ${sorted.join(', ')}. La mediana (valor central) és ${median}`,
      hint: `Ordena les dades de menor a major i troba el valor central`,
    }
  } else {
    // Moda
    const base = rand(1, 8)
    const extra = Array.from({ length: rand(2, 4) }, () => rand(1, 10))
    const data = shuffle([base, base, base, ...extra])
    const options = makeChoices(base, () => extra[rand(0, extra.length - 1)] || base + 1)
    return {
      question: `Quina és la moda de: ${data.join(', ')}?`,
      type: 'multiple_choice',
      options,
      correctAnswer: String(base),
      explanation: `La moda és ${base} perquè apareix més vegades que els altres`,
      hint: `La moda és el valor que apareix més sovint`,
    }
  }
}

const generators = {
  multiplicacio: genMultiplicacio,
  fraccions: genFraccions,
  decimals: genDecimals,
  percentatges: genPercentatges,
  geometria: genGeometria,
  problemes: genProblemes,
  enters: genEnters,
  fraccions_avancades: genFraccionsAvancades,
  potencies: genPotencies,
  algebra: genAlgebra,
  geometria_eso: genGeometriaEso,
  estadistica: genEstadistica,
}

export function generateExercises(topicId, count = 10) {
  const gen = generators[topicId]
  if (!gen) return []
  return Array.from({ length: count }, (_, i) => ({ id: i + 1, ...gen() }))
}
