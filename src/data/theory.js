// Theory content for each topic
// Each section has a type: 'text' | 'formula' | 'example' | 'tip' | 'table' | 'svg' | 'list'

export const theory = {
  // ── 6è PRIMÀRIA ─────────────────────────────────────────────────────────────

  multiplicacio: {
    title: 'Multiplicació i Divisió',
    intro: 'La multiplicació és una suma repetida, i la divisió és el repartiment igualitari.',
    sections: [
      {
        type: 'text',
        content: 'La multiplicació és una manera ràpida de sumar el mateix número diverses vegades. Per exemple, 4 × 3 és el mateix que 4 + 4 + 4 = 12.',
      },
      {
        type: 'formula',
        title: 'Propietat commutativa',
        formula: 'a × b = b × a',
        note: "L'ordre dels factors no canvia el producte. 3 × 7 = 7 × 3 = 21",
      },
      {
        type: 'svg',
        graphic: 'multiplication_grid',
      },
      {
        type: 'formula',
        title: 'Parts de la divisió',
        formula: 'Dividend ÷ Divisor = Quocient (resta R)',
        note: 'Comprovació: Divisor × Quocient + Resta = Dividend',
      },
      {
        type: 'example',
        title: 'Exemple de divisió',
        steps: [
          '147 ÷ 6 = ?',
          '6 cap a 14 → 2 vegades (6×2=12), resta 2',
          'Baixem el 7 → 27',
          '6 cap a 27 → 4 vegades (6×4=24), resta 3',
          'Resultat: 147 ÷ 6 = 24 (resta 3)',
          'Comprovació: 6 × 24 + 3 = 144 + 3 = 147 ✓',
        ],
      },
      {
        type: 'tip',
        content: 'Truc: per multiplicar per 10, afegeix un zero. Per multiplicar per 100, afegeix dos zeros.',
      },
    ],
  },

  taules: {
    title: 'Taules de Multiplicar',
    intro: 'Les taules de multiplicar són la base de les matemàtiques. Memoritzar-les et farà molt més ràpid.',
    sections: [
      {
        type: 'svg',
        graphic: 'times_table',
      },
      {
        type: 'list',
        title: 'Trucs per memoritzar',
        items: [
          'Taula del 2: és doblar el número (2×6 = 12, pensa "6+6")',
          'Taula del 5: el resultat sempre acaba en 0 o 5',
          'Taula del 10: afegeix un zero al número',
          'Taula del 9: els dígits del resultat sumen sempre 9 (9×4=36 → 3+6=9)',
          'Taula del 11 (fins al 9): repeteix el dígit (11×7=77)',
        ],
      },
      {
        type: 'formula',
        title: 'Relació multiplicació-divisió',
        formula: 'Si 6 × 8 = 48, llavors 48 ÷ 6 = 8 i 48 ÷ 8 = 6',
        note: 'Aprendre una multiplicació et dona dues divisions de regal.',
      },
      {
        type: 'tip',
        content: 'Consell: practica cada dia 5 minuts les taules que et costen més. La repetició és clau.',
      },
    ],
  },

  fraccions: {
    title: 'Fraccions',
    intro: 'Una fracció representa una part d\'un tot. S\'escriu amb un numerador (a dalt) i un denominador (a baix).',
    sections: [
      {
        type: 'svg',
        graphic: 'fraction_parts',
      },
      {
        type: 'formula',
        title: 'Suma i resta (mateix denominador)',
        formula: 'a/n ± b/n = (a ± b)/n',
        note: 'Es sumen o resten els numeradors i el denominador es manté igual.',
      },
      {
        type: 'example',
        title: 'Suma amb diferent denominador',
        steps: [
          'Volem calcular 1/3 + 1/4',
          'Pas 1: Troba el MCM de 3 i 4 → MCM(3,4) = 12',
          'Pas 2: Converteix → 1/3 = 4/12 i 1/4 = 3/12',
          'Pas 3: Suma → 4/12 + 3/12 = 7/12',
        ],
      },
      {
        type: 'formula',
        title: 'Multiplicació de fraccions',
        formula: '(a/b) × (c/d) = (a×c) / (b×d)',
        note: 'Es multipliquen numeradors entre si, i denominadors entre si.',
      },
      {
        type: 'formula',
        title: 'Simplificació',
        formula: 'a/b = (a÷MCD) / (b÷MCD)',
        note: 'Divideix numerador i denominador pel seu Màxim Comú Divisor.',
      },
      {
        type: 'tip',
        content: 'Una fracció és equivalent si multipliques o divideixes el numerador i el denominador pel mateix número.',
      },
    ],
  },

  decimals: {
    title: 'Nombres Decimals',
    intro: 'Els nombres decimals representen quantitats que no són enters. La coma decimal separa la part entera de la part decimal.',
    sections: [
      {
        type: 'svg',
        graphic: 'decimal_place_value',
      },
      {
        type: 'formula',
        title: 'Suma i resta',
        formula: 'Alinea les comes i opera columna per columna',
        note: '   3,45\n+ 1,80\n------\n   5,25',
      },
      {
        type: 'example',
        title: 'Multiplicació de decimals',
        steps: [
          'Volem calcular 2,4 × 3',
          'Pas 1: Ignora la coma i multiplica → 24 × 3 = 72',
          'Pas 2: Compta els decimals del problema → 1 decimal',
          'Pas 3: Posa la coma al resultat → 7,2',
        ],
      },
      {
        type: 'list',
        title: 'Arrodoniment',
        items: [
          'Mira el dígit a la dreta de la posició on vols arrodonir',
          'Si és 0,1,2,3,4 → arrodoneix cap avall (el dígit no canvia)',
          'Si és 5,6,7,8,9 → arrodoneix cap amunt (suma 1 al dígit)',
          'Exemple: 3,47 arrodonit a les dècimes → 3,5 (perquè 7 ≥ 5)',
        ],
      },
      {
        type: 'tip',
        content: 'Per convertir una fracció a decimal: divideix el numerador entre el denominador. 3/4 = 3 ÷ 4 = 0,75',
      },
    ],
  },

  percentatges: {
    title: 'Percentatges',
    intro: '"Per cent" significa "de cada cent". El percentatge expressa una part de 100.',
    sections: [
      {
        type: 'svg',
        graphic: 'percentage_bar',
      },
      {
        type: 'formula',
        title: 'Calcular el percentatge d\'un número',
        formula: 'p% de N = N × p ÷ 100',
        note: 'Exemple: 30% de 80 = 80 × 30 ÷ 100 = 24',
      },
      {
        type: 'formula',
        title: 'Trobar quin percentatge és A de B',
        formula: '% = (A ÷ B) × 100',
        note: 'Exemple: quin % és 15 de 60? → (15÷60)×100 = 25%',
      },
      {
        type: 'table',
        title: 'Percentatges i fraccions equivalents',
        headers: ['Percentatge', 'Fracció', 'Decimal'],
        rows: [
          ['10%', '1/10', '0,1'],
          ['25%', '1/4', '0,25'],
          ['50%', '1/2', '0,5'],
          ['75%', '3/4', '0,75'],
          ['100%', '1', '1'],
        ],
      },
      {
        type: 'tip',
        content: 'Truc per al 10%: divideix el número per 10. Per al 5%: divideix entre 10 i torna a dividir per 2.',
      },
    ],
  },

  geometria: {
    title: 'Geometria Bàsica',
    intro: 'L\'àrea mesura la superfície d\'una figura (en unitats quadrades). El perímetre és la suma dels costats.',
    sections: [
      {
        type: 'svg',
        graphic: 'geometry_shapes',
      },
      {
        type: 'formula',
        title: 'Rectangle',
        formula: 'Àrea = base × altura    |    Perímetre = 2 × (base + altura)',
        note: 'Unitats d\'àrea: cm², m²... Unitats de perímetre: cm, m...',
      },
      {
        type: 'formula',
        title: 'Triangle',
        formula: 'Àrea = (base × altura) ÷ 2',
        note: 'L\'altura és sempre perpendicular a la base.',
      },
      {
        type: 'formula',
        title: 'Cercle',
        formula: 'Àrea = π × r²    |    Circumferència = 2 × π × r',
        note: 'r = radi (distància del centre a la vora). Usa π ≈ 3,14',
      },
      {
        type: 'tip',
        content: 'Recorda les unitats! Si la base és en cm, l\'àrea és en cm². Si les mides estan en m, l\'àrea és en m².',
      },
    ],
  },

  problemes: {
    title: 'Resolució de Problemes',
    intro: 'Resoldre un problema matemàtic requereix seguir un procés ordenat de 4 passos.',
    sections: [
      {
        type: 'list',
        title: 'Els 4 passos per resoldre un problema',
        items: [
          '1. COMPRÈN: Llegeix el problema dues vegades. Identifica les dades i la pregunta.',
          '2. PLANIFICA: Decideix quina operació cal fer (+, -, ×, ÷).',
          '3. RESOL: Realitza els càlculs amb ordre.',
          '4. COMPROVA: Verifica que el resultat té sentit.',
        ],
      },
      {
        type: 'table',
        title: 'Paraules clau i operacions',
        headers: ['Paraules clau', 'Operació'],
        rows: [
          ['en total, sumen, junts', 'Suma (+)'],
          ['queda, diferència, menys', 'Resta (-)'],
          ['vegades, cada, per', 'Multiplicació (×)'],
          ['repartir, parts iguals, quant toca', 'Divisió (÷)'],
        ],
      },
      {
        type: 'example',
        title: 'Exemple resolt',
        steps: [
          'Problema: Una caixa té 6 paquets. Cada paquet té 8 galetes. Quantes galetes hi ha?',
          'Comprèn: 6 paquets, 8 galetes per paquet. Pregunta: total galetes.',
          'Planifica: "cada" indica multiplicació → 6 × 8',
          'Resol: 6 × 8 = 48 galetes',
          'Comprova: 8+8+8+8+8+8 = 48 ✓',
        ],
      },
      {
        type: 'tip',
        content: 'Si el resultat és molt gran o molt petit per al context del problema, probablement has triat l\'operació equivocada.',
      },
    ],
  },

  mcd_mcm: {
    title: 'MCD i MCM',
    intro: 'El MCD és el divisor comú més gran de dos nombres. El MCM és el múltiple comú més petit.',
    sections: [
      {
        type: 'formula',
        title: 'Màxim Comú Divisor (MCD)',
        formula: 'MCD(a, b) = el número més gran que divideix a i b exactament',
        note: 'Exemple: MCD(12, 8) = 4, perquè 4 és el divisor comú més gran',
      },
      {
        type: 'example',
        title: 'Càlcul del MCD per descomposició',
        steps: [
          'Volem MCD(12, 18)',
          '12 = 2² × 3',
          '18 = 2 × 3²',
          'MCD = agafa els factors comuns amb el menor exponent',
          'MCD(12, 18) = 2¹ × 3¹ = 6',
        ],
      },
      {
        type: 'formula',
        title: 'Mínim Comú Múltiple (MCM)',
        formula: 'MCM(a, b) = el número més petit que és múltiple de a i de b',
        note: 'Exemple: MCM(4, 6) = 12, perquè 12 és el primer múltiple de 4 i de 6',
      },
      {
        type: 'example',
        title: 'Càlcul del MCM per descomposició',
        steps: [
          'Volem MCM(4, 6)',
          '4 = 2²',
          '6 = 2 × 3',
          'MCM = agafa tots els factors amb el major exponent',
          'MCM(4, 6) = 2² × 3 = 12',
        ],
      },
      {
        type: 'svg',
        graphic: 'mcd_mcm_venn',
      },
      {
        type: 'table',
        title: 'Quan s\'usa cada un',
        headers: ['Concepte', 'S\'usa per a...'],
        rows: [
          ['MCD', 'Simplificar fraccions, repartir en grups iguals'],
          ['MCM', 'Sumar fraccions, trobar coincidències periòdiques'],
        ],
      },
      {
        type: 'tip',
        content: 'Relació útil: MCD(a,b) × MCM(a,b) = a × b',
      },
    ],
  },

  // ── 1r ESO ───────────────────────────────────────────────────────────────────

  enters: {
    title: 'Nombres Enters',
    intro: 'Els nombres enters inclouen els nombres positius, el zero i els nombres negatius (…-3, -2, -1, 0, 1, 2, 3…).',
    sections: [
      {
        type: 'svg',
        graphic: 'number_line',
      },
      {
        type: 'table',
        title: 'Regles de la suma i resta',
        headers: ['Situació', 'Exemple', 'Resultat'],
        rows: [
          ['+a + (+b)', '5 + 3', '8 (suma normal)'],
          ['+a + (-b)', '5 + (-3)', '5 - 3 = 2'],
          ['-a + (+b)', '-5 + 3', '3 - 5 = -2'],
          ['-a + (-b)', '-5 + (-3)', '-(5+3) = -8'],
        ],
      },
      {
        type: 'formula',
        title: 'Regla dels signes (multiplicació i divisió)',
        formula: '(+) × (+) = (+)    |    (-) × (-) = (+)\n(+) × (-) = (-)    |    (-) × (+) = (-)',
        note: 'Signes iguals → positiu. Signes diferents → negatiu.',
      },
      {
        type: 'example',
        title: 'Exemples',
        steps: [
          '(-4) + 7 = 7 - 4 = 3',
          '(-3) - (-5) = -3 + 5 = 2',
          '(-6) × (-3) = +18',
          '(-10) ÷ 2 = -5',
        ],
      },
      {
        type: 'tip',
        content: 'Imagina la recta numèrica: sumar és anar cap a la dreta, restar és anar cap a l\'esquerra.',
      },
    ],
  },

  fraccions_avancades: {
    title: 'Fraccions Avançades',
    intro: 'Les fraccions equivalents representen la mateixa quantitat. Aprendrem a comparar, simplificar i operar amb qualsevol fracció.',
    sections: [
      {
        type: 'formula',
        title: 'Fraccions equivalents',
        formula: 'a/b = (a×n)/(b×n) per a qualsevol n ≠ 0',
        note: 'Exemple: 2/3 = 4/6 = 6/9 = 8/12 (multipliquem per 2, 3, 4...)',
      },
      {
        type: 'formula',
        title: 'Simplificació (forma irreductible)',
        formula: 'a/b simplificada = (a÷MCD) / (b÷MCD)',
        note: 'Exemple: 12/18 → MCD(12,18)=6 → 12÷6 / 18÷6 = 2/3',
      },
      {
        type: 'example',
        title: 'Suma amb diferent denominador',
        steps: [
          'Calcula 2/3 + 3/4',
          'MCM(3, 4) = 12',
          '2/3 = 8/12  i  3/4 = 9/12',
          '8/12 + 9/12 = 17/12',
          'Com a nombre mixt: 1 i 5/12',
        ],
      },
      {
        type: 'formula',
        title: 'Nombre mixt ↔ Fracció impropia',
        formula: 'a (b/c) = (a×c + b) / c',
        note: 'Exemple: 3 i 2/5 = (3×5+2)/5 = 17/5',
      },
      {
        type: 'tip',
        content: 'Per comparar fraccions, redueix-les al mateix denominador (MCM) i compara els numeradors.',
      },
    ],
  },

  potencies: {
    title: 'Potències i Arrels',
    intro: 'Una potència és una multiplicació repetida d\'un número per ell mateix.',
    sections: [
      {
        type: 'svg',
        graphic: 'power_notation',
      },
      {
        type: 'table',
        title: 'Propietats de les potències',
        headers: ['Propietat', 'Fórmula', 'Exemple'],
        rows: [
          ['Producte de potències', 'aⁿ × aᵐ = aⁿ⁺ᵐ', '2³ × 2⁴ = 2⁷ = 128'],
          ['Quocient de potències', 'aⁿ ÷ aᵐ = aⁿ⁻ᵐ', '3⁵ ÷ 3² = 3³ = 27'],
          ['Potència de potència', '(aⁿ)ᵐ = aⁿˣᵐ', '(2³)² = 2⁶ = 64'],
          ['Exponent zero', 'a⁰ = 1', '7⁰ = 1'],
          ['Exponent u', 'a¹ = a', '5¹ = 5'],
        ],
      },
      {
        type: 'formula',
        title: 'Arrel quadrada',
        formula: '√a = b  si  b² = a',
        note: 'Exemple: √25 = 5 perquè 5² = 25. Arrels exactes: √1=1, √4=2, √9=3, √16=4, √25=5...',
      },
      {
        type: 'table',
        title: 'Potències de 10',
        headers: ['Potència', 'Valor', 'Nom'],
        rows: [
          ['10⁰', '1', 'u'],
          ['10¹', '10', 'desena'],
          ['10²', '100', 'centena'],
          ['10³', '1.000', 'miler'],
          ['10⁶', '1.000.000', 'milió'],
        ],
      },
      {
        type: 'tip',
        content: 'Les potències de 10 s\'usen en notació científica: 3.400.000 = 3,4 × 10⁶',
      },
    ],
  },

  algebra: {
    title: 'Àlgebra: Equacions',
    intro: 'Una equació és una igualtat on hi ha una incògnita (x). Resoldre-la és trobar el valor de x que fa certa la igualtat.',
    sections: [
      {
        type: 'svg',
        graphic: 'equation_balance',
      },
      {
        type: 'list',
        title: 'Regles bàsiques per resoldre equacions',
        items: [
          'El que fas a un costat de l\'= ho has de fer a l\'altre costat.',
          'Per eliminar una suma, resta el mateix dels dos costats.',
          'Per eliminar una multiplicació, divideix els dos costats.',
          'L\'objectiu és deixar x sola a un costat.',
        ],
      },
      {
        type: 'example',
        title: 'Exemple tipus 1: ax + b = c',
        steps: [
          'Resol: 3x + 5 = 14',
          'Resta 5 als dos costats: 3x = 14 - 5 = 9',
          'Divideix per 3: x = 9 ÷ 3 = 3',
          'Comprovació: 3×3 + 5 = 9 + 5 = 14 ✓',
        ],
      },
      {
        type: 'example',
        title: 'Exemple tipus 2: termes x als dos costats',
        steps: [
          'Resol: 5x - 2 = 2x + 7',
          'Agrupa termes amb x: 5x - 2x = 7 + 2',
          'Simplifica: 3x = 9',
          'Divideix per 3: x = 3',
          'Comprovació: 5×3-2 = 13 = 2×3+7 = 13 ✓',
        ],
      },
      {
        type: 'tip',
        content: 'Quan un terme canvia de costat de l\'=, canvia de signe: +5 passa a -5, i viceversa.',
      },
    ],
  },

  geometria_eso: {
    title: 'Àrees i Volums',
    intro: 'Aprenem a calcular àrees de figures planes més complexes i volums de cossos tridimensionals.',
    sections: [
      {
        type: 'svg',
        graphic: 'eso_geometry_shapes',
      },
      {
        type: 'formula',
        title: 'Trapezi',
        formula: 'Àrea = (Base major + Base menor) × altura ÷ 2',
        note: 'A = (B + b) × h / 2',
      },
      {
        type: 'formula',
        title: 'Rombe',
        formula: 'Àrea = Diagonal major × Diagonal menor ÷ 2',
        note: 'A = D × d / 2',
      },
      {
        type: 'formula',
        title: 'Prisma rectangular (caixa)',
        formula: 'Volum = llarg × ample × alt',
        note: 'V = l × a × h  (en cm³ o m³)',
      },
      {
        type: 'formula',
        title: 'Cilindre',
        formula: 'Volum = π × radi² × altura',
        note: 'V = π × r² × h  (usa π ≈ 3,14)',
      },
      {
        type: 'tip',
        content: 'L\'àrea s\'expressa en unitats quadrades (cm², m²). El volum en unitats cúbiques (cm³, m³).',
      },
    ],
  },

  estadistica: {
    title: 'Estadística Bàsica',
    intro: 'L\'estadística ens permet resumir i entendre conjunts de dades amb un sol número representatiu.',
    sections: [
      {
        type: 'formula',
        title: 'Mitjana aritmètica (mitja)',
        formula: 'Mitja = Suma de tots els valors ÷ Nombre de valors',
        note: 'Exemple: mitja de 4, 7, 3, 8, 3 = (4+7+3+8+3) ÷ 5 = 25 ÷ 5 = 5',
      },
      {
        type: 'list',
        title: 'Mediana',
        items: [
          'Pas 1: Ordena les dades de menor a major',
          'Pas 2: Si hi ha un nombre senar de dades, la mediana és la del mig',
          'Pas 3: Si hi ha un nombre parell, la mediana és la mitja dels dos del mig',
          'Exemple: 2, 3, 5, 7, 9 → mediana = 5',
          'Exemple: 2, 4, 6, 8 → mediana = (4+6)/2 = 5',
        ],
      },
      {
        type: 'formula',
        title: 'Moda',
        formula: 'Moda = el valor que apareix més sovint',
        note: 'Exemple: 3, 5, 3, 7, 3, 9 → moda = 3 (apareix 3 vegades)',
      },
      {
        type: 'svg',
        graphic: 'statistics_example',
      },
      {
        type: 'table',
        title: 'Resum de mesures',
        headers: ['Mesura', 'Descripció', 'Quan s\'usa'],
        rows: [
          ['Mitja', 'Promig de tots els valors', 'Dades sense valors extrems'],
          ['Mediana', 'Valor central ordenat', 'Quan hi ha valors molt alts/baixos'],
          ['Moda', 'Valor més freqüent', 'Dades categòriques o repetides'],
        ],
      },
      {
        type: 'tip',
        content: 'Exemple real: les notes 3, 8, 8, 9 tenen mitja 7, mediana 8 i moda 8. La mediana i moda reflecteixen millor el rendiment habitual.',
      },
    ],
  },
}

export function getTheory(topicId) {
  return theory[topicId] || null
}
