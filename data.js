// ============================================================
// data.js — Fuente de verdad de EstudioFING
// Editá este archivo para que los cambios aparezcan en toda la app
// ============================================================

const DATA = {
  materias: [
    {
      id: "calculo",
      nombre: "Cálculo Integral y Diferencial en Varias Variables II",
      abrev: "Cálculo II",
      color: "#2563eb",
      colorLight: "#eff6ff",
      icono: "∫",
      links: {
        campus: "#",   // reemplazá con el link de EVA
        clases: "#",   // reemplazá con el link a las grabaciones
      },
      textos: [
        { id: "c1", titulo: "Integrales Dobles", tipo: "apunte", fecha: "2026-03-10", resumido: true },
        { id: "c2", titulo: "Integrales Triples", tipo: "apunte", fecha: "2026-03-17", resumido: true },
        { id: "c3", titulo: "Cambio de Variables — Jacobiano", tipo: "apunte", fecha: "2026-03-24", resumido: true },
        { id: "c4", titulo: "Coordenadas Polares, Cilíndricas y Esféricas", tipo: "apunte", fecha: "2026-03-31", resumido: true },
        { id: "c5", titulo: "Integrales de Línea", tipo: "apunte", fecha: "2026-04-07", resumido: false },
        { id: "c6", titulo: "Integrales de Superficie", tipo: "apunte", fecha: "2026-04-14", resumido: false },
        { id: "c7", titulo: "Teorema de Green", tipo: "apunte", fecha: "2026-04-21", resumido: false },
        { id: "c8", titulo: "Teoremas de Stokes y Divergencia", tipo: "apunte", fecha: "2026-04-28", resumido: false },
        { id: "c9", titulo: "Práctica 1 — Integrales Múltiples", tipo: "practica", fecha: "2026-03-15", resumido: false },
      ],
      resumenes: [
        {
          id: "cr1",
          titulo: "Resumen: Integrales Dobles y Triples",
          fecha: "2026-03-20",
          etiquetas: ["integral", "doble", "triple"],
          contenido: "Una integral doble ∬_R f(x,y) dA extiende la idea de integral a funciones de dos variables. Se calcula iterando integrales simples (Fubini). En regiones tipo I (a≤x≤b, g₁(x)≤y≤g₂(x)) o tipo II. Las integrales triples añaden una tercera variable z. Interpretación: volumen bajo la superficie z=f(x,y) cuando f≥0."
        },
        {
          id: "cr2",
          titulo: "Resumen: Cambio de Variables",
          fecha: "2026-03-26",
          etiquetas: ["jacobiano", "cambio de variables"],
          contenido: "El cambio de variables ∬_R f dA = ∬_S f(x(u,v), y(u,v)) |J| du dv donde J es el Jacobiano ∂(x,y)/∂(u,v). En polares: x=r cos θ, y=r sin θ, J=r. En cilíndricas: añadimos z, J=r. En esféricas: x=ρ sin φ cos θ, y=ρ sin φ sin θ, z=ρ cos φ, J=ρ² sin φ."
        },
        {
          id: "cr3",
          titulo: "Resumen: Integrales de Línea",
          fecha: "2026-04-10",
          etiquetas: ["línea", "campo vectorial", "trabajo"],
          contenido: "∫_C F·dr es el trabajo del campo vectorial F a lo largo de la curva C. Si F=∇f (conservativo), entonces ∫_C F·dr = f(final) - f(inicial), independiente del camino. Criterio: F conservativo ⟺ rot F = 0 (en simplemente conexo)."
        },
        {
          id: "cr4",
          titulo: "Resumen: Teorema de Green",
          fecha: "2026-04-22",
          etiquetas: ["Green", "circulación", "flujo"],
          contenido: "Teorema de Green: ∮_C (P dx + Q dy) = ∬_D (∂Q/∂x - ∂P/∂y) dA. Relaciona una integral de línea sobre la frontera orientada positivamente con una integral doble sobre la región interior. Aplicación: calcular áreas A = ½∮(x dy - y dx)."
        },
      ],
      bibliografia: [
        { id: "cb1", titulo: "Cálculo de Varias Variables", autor: "James Stewart", tipo: "libro", edicion: "7ª ed.", url: "", descripcion: "Libro principal del curso. Capítulos 14-16 para integrales múltiples y cálculo vectorial." },
        { id: "cb2", titulo: "Cálculo Vol. 2", autor: "Tom Apostol", tipo: "libro", edicion: "2ª ed.", url: "", descripcion: "Tratamiento más riguroso. Útil para entender demostraciones de los teoremas principales." },
        { id: "cb3", titulo: "Cálculo Vectorial", autor: "Marsden & Tromba", tipo: "libro", edicion: "6ª ed.", url: "", descripcion: "Muy visual. Excelente para integrales de línea y superficie." },
        { id: "cb4", titulo: "Apuntes del Profesor", autor: "Cátedra FING", tipo: "pdf", edicion: "2026", url: "./CDIVV/apuntes.pdf", descripcion: "Apuntes oficiales de la cátedra." },
      ],
      flashcards: [
        { pregunta: "¿Cuál es el Jacobiano en coordenadas polares?", respuesta: "J = r\n\nEn polares: x = r cos θ, y = r sin θ\nEl elemento de área dA = r dr dθ", nivel: "basico" },
        { pregunta: "Enuncia el Teorema de Fubini", respuesta: "Si f es continua en R = [a,b]×[c,d], entonces:\n∬_R f dA = ∫_a^b [∫_c^d f(x,y) dy] dx = ∫_c^d [∫_a^b f(x,y) dx] dy\n\nEl orden de integración puede intercambiarse.", nivel: "basico" },
        { pregunta: "¿Cuándo un campo vectorial F es conservativo?", respuesta: "F es conservativo si existe f tal que F = ∇f.\n\nCondición necesaria y suficiente en dominio simplemente conexo:\nrot F = 0, es decir ∂P/∂y = ∂Q/∂x (en 2D)", nivel: "medio" },
        { pregunta: "¿Cuál es el Jacobiano en coordenadas esféricas?", respuesta: "J = ρ² sin φ\n\nTransformación:\nx = ρ sin φ cos θ\ny = ρ sin φ sin θ\nz = ρ cos φ\n\ndV = ρ² sin φ dρ dφ dθ", nivel: "medio" },
        { pregunta: "Enuncia el Teorema de Stokes", respuesta: "∬_S (rot F) · dS = ∮_∂S F · dr\n\nRelaciona la integral de superficie del rotacional de F sobre S con la integral de línea de F sobre la frontera orientada ∂S.", nivel: "avanzado" },
        { pregunta: "Enuncia el Teorema de la Divergencia (Gauss)", respuesta: "∭_E div F dV = ∯_∂E F · dS\n\nRelaciona la integral de volumen de la divergencia con el flujo neto a través de la superficie cerrada que delimita E.", nivel: "avanzado" },
      ],
      cuestionarios: [
        {
          id: "cq1",
          titulo: "Quiz: Integrales Múltiples y Cambio de Variables",
          preguntas: [
            {
              enunciado: "Al cambiar a coordenadas polares en una integral doble, ¿cuál es el factor que aparece en el integrando?",
              opciones: ["1", "r²", "r", "1/r"],
              correcta: 2,
              explicacion: "El Jacobiano de la transformación a polares es J = r. Por eso dA = r dr dθ."
            },
            {
              enunciado: "¿Qué condición debe cumplir un campo F = (P, Q) para ser conservativo en un dominio simplemente conexo?",
              opciones: ["div F = 0", "∂P/∂y = ∂Q/∂x", "∂P/∂x = ∂Q/∂y", "rot F ≠ 0"],
              correcta: 1,
              explicacion: "Un campo es conservativo (F=∇f) si y solo si ∂P/∂y = ∂Q/∂x en un dominio simplemente conexo."
            },
            {
              enunciado: "El Teorema de Green relaciona:",
              opciones: [
                "Una integral de volumen con una integral de superficie",
                "Una integral de línea cerrada con una integral doble sobre la región interior",
                "Una integral de superficie con una integral de volumen",
                "Dos integrales de línea sobre curvas distintas"
              ],
              correcta: 1,
              explicacion: "Green: ∮_C F·dr = ∬_D (∂Q/∂x - ∂P/∂y) dA. Relaciona la integral sobre la frontera con la integral sobre el interior."
            },
            {
              enunciado: "El Jacobiano en coordenadas esféricas (ρ, φ, θ) es:",
              opciones: ["ρ sin φ", "ρ²", "ρ² sin φ", "ρ cos φ"],
              correcta: 2,
              explicacion: "dV = ρ² sin φ dρ dφ dθ. El factor ρ² sin φ es el Jacobiano de la transformación esférica."
            },
            {
              enunciado: "¿Qué enunciado describe el Teorema de Fubini?",
              opciones: [
                "Una integral sobre una región se puede separar en el producto de dos integrales",
                "Si f es continua en un rectángulo R, la integral doble puede calcularse como dos integrales iteradas en cualquier orden",
                "Toda función continua tiene primitiva",
                "Las integrales de línea son independientes del camino"
              ],
              correcta: 1,
              explicacion: "Fubini garantiza que ∬_R f dA = ∫∫ f dy dx = ∫∫ f dx dy para f continua en un rectángulo."
            }
          ]
        }
      ],
      infografias: [
        {
          titulo: "Sistemas de Coordenadas",
          descripcion: "Resumen de los tres sistemas de coordenadas y sus Jacobianos",
          secciones: [
            { titulo: "Cartesianas", items: ["dV = dx dy dz", "Sin transformación, J = 1", "Útil para regiones rectangulares"] },
            { titulo: "Cilíndricas", items: ["x = r cos θ, y = r sin θ, z = z", "dV = r dr dθ dz", "J = r", "Ideal para sólidos de revolución alrededor del eje z"] },
            { titulo: "Esféricas", items: ["x = ρ sin φ cos θ, y = ρ sin φ sin θ, z = ρ cos φ", "dV = ρ² sin φ dρ dφ dθ", "J = ρ² sin φ", "Ideal para esferas y conos"] }
          ]
        },
        {
          titulo: "Teoremas Fundamentales del Cálculo Vectorial",
          descripcion: "Los tres grandes teoremas y su interpretación geométrica",
          secciones: [
            { titulo: "Teorema de Green (2D)", items: ["∮_∂D F·dr = ∬_D rot F dA", "Circulación = integral del rotacional", "Frontera debe estar orientada positivamente (antihorario)"] },
            { titulo: "Teorema de Stokes (3D)", items: ["∮_∂S F·dr = ∬_S rot F · dS", "Generaliza Green a superficies en R³", "La orientación de S y ∂S deben ser compatibles"] },
            { titulo: "Teorema de Gauss (Divergencia)", items: ["∯_∂E F·dS = ∭_E div F dV", "Flujo neto = integral de la divergencia", "Normal exterior en la superficie"] }
          ]
        }
      ]
    },

    {
      id: "algebra",
      nombre: "Geometría y Álgebra Lineal II",
      abrev: "Álgebra Lineal II",
      color: "#7c3aed",
      colorLight: "#f5f3ff",
      icono: "λ",
      links: {
        campus: "#",
        clases: "#",
      },
      textos: [
        { id: "a1", titulo: "Espacios Vectoriales Abstractos", tipo: "apunte", fecha: "2026-03-09", resumido: true },
        { id: "a2", titulo: "Subespacios y Bases", tipo: "apunte", fecha: "2026-03-16", resumido: true },
        { id: "a3", titulo: "Transformaciones Lineales", tipo: "apunte", fecha: "2026-03-23", resumido: true },
        { id: "a4", titulo: "Matrices de Transformaciones Lineales", tipo: "apunte", fecha: "2026-03-30", resumido: false },
        { id: "a5", titulo: "Valores y Vectores Propios", tipo: "apunte", fecha: "2026-04-06", resumido: false },
        { id: "a6", titulo: "Diagonalización", tipo: "apunte", fecha: "2026-04-13", resumido: false },
        { id: "a7", titulo: "Producto Interno — Espacios Euclídeos", tipo: "apunte", fecha: "2026-04-20", resumido: false },
        { id: "a8", titulo: "Proceso de Gram-Schmidt", tipo: "apunte", fecha: "2026-04-27", resumido: false },
      ],
      resumenes: [
        {
          id: "ar1",
          titulo: "Resumen: Espacios Vectoriales y Subespacios",
          fecha: "2026-03-18",
          etiquetas: ["espacio vectorial", "subespacio", "base"],
          contenido: "Un espacio vectorial V sobre un campo F es un conjunto con suma y producto escalar que satisface 8 axiomas. Subespacio: subconjunto S≤V si es cerrado bajo suma y producto escalar y contiene al cero. Base: conjunto linealmente independiente que genera V. Toda base de un espacio tiene la misma cardinalidad (dimensión)."
        },
        {
          id: "ar2",
          titulo: "Resumen: Transformaciones Lineales",
          fecha: "2026-03-25",
          etiquetas: ["transformación lineal", "núcleo", "imagen"],
          contenido: "T: V→W es lineal si T(u+v)=T(u)+T(v) y T(αv)=αT(v). Núcleo: ker(T)={v∈V : T(v)=0}. Imagen: Im(T)={T(v) : v∈V}. Teorema de la dimensión (rango-nulidad): dim(ker T) + dim(Im T) = dim(V). T es inyectiva ⟺ ker(T)={0}."
        },
        {
          id: "ar3",
          titulo: "Resumen: Valores Propios y Diagonalización",
          fecha: "2026-04-08",
          etiquetas: ["valores propios", "vectores propios", "diagonalización"],
          contenido: "λ es valor propio de A si Av = λv para algún v≠0 (vector propio). Se encuentran con det(A-λI)=0 (polinomio característico). A es diagonalizable si tiene n vectores propios linealmente independientes, equivalentemente si la suma de las multiplicidades geométricas es n."
        },
      ],
      bibliografia: [
        { id: "ab1", titulo: "Álgebra Lineal y sus Aplicaciones", autor: "Gilbert Strang", tipo: "libro", edicion: "4ª ed.", url: "", descripcion: "El libro más accesible. Muy recomendado para intuición geométrica." },
        { id: "ab2", titulo: "Linear Algebra", autor: "Hoffman & Kunze", tipo: "libro", edicion: "2ª ed.", url: "", descripcion: "Tratamiento algebraico riguroso. Referencia estándar para demostraciones." },
        { id: "ab3", titulo: "Álgebra Lineal", autor: "Grossman", tipo: "libro", edicion: "7ª ed.", url: "", descripcion: "Muy didáctico, buenos ejercicios resueltos." },
        { id: "ab4", titulo: "Apuntes de Cátedra GAL II", autor: "Cátedra FING", tipo: "pdf", edicion: "2026", url: "./GAL 2/apuntes.pdf", descripcion: "Apuntes oficiales." },
      ],
      flashcards: [
        { pregunta: "¿Qué es el núcleo (kernel) de una transformación lineal T: V→W?", respuesta: "ker(T) = { v ∈ V : T(v) = 0_W }\n\nEs el conjunto de todos los vectores de V que T mapea al vector cero de W. Siempre es un subespacio de V.", nivel: "basico" },
        { pregunta: "Enuncia el Teorema Rango-Nulidad", respuesta: "Para T: V→W transformación lineal con dim(V) finita:\n\ndim(ker T) + dim(Im T) = dim(V)\n\nNulidad + Rango = dim del dominio", nivel: "basico" },
        { pregunta: "¿Cuándo una matriz A es diagonalizable?", respuesta: "A (n×n) es diagonalizable si y solo si:\n• Tiene n vectores propios linealmente independientes\n• Equivalentemente: para cada valor propio λᵢ, la multiplicidad geométrica = multiplicidad algebraica\n\nSi tiene n valores propios distintos → siempre diagonalizable.", nivel: "medio" },
        { pregunta: "¿Qué condición cumple una base ortonormal?", respuesta: "Un conjunto {v₁, ..., vₙ} es base ortonormal si:\n• ⟨vᵢ, vⱼ⟩ = 0 para i ≠ j (ortogonales)\n• ‖vᵢ‖ = 1 para todo i (normalizados)\n\nEquivalentemente: ⟨vᵢ, vⱼ⟩ = δᵢⱼ (delta de Kronecker)", nivel: "medio" },
        { pregunta: "¿Qué es el proceso de Gram-Schmidt?", respuesta: "Algoritmo para ortogonalizar una base {v₁,...,vₙ}:\n\nu₁ = v₁\nuₖ = vₖ - Σᵢ₌₁^{k-1} (⟨vₖ,uᵢ⟩/⟨uᵢ,uᵢ⟩) uᵢ\n\nLuego se normaliza cada uₖ. Produce base ortonormal.", nivel: "avanzado" },
        { pregunta: "¿Cuál es la relación entre A y su diagonalización A = PDP⁻¹?", respuesta: "D = P⁻¹AP donde:\n• D es diagonal con los valores propios λᵢ en la diagonal\n• P es la matriz cuyas columnas son los vectores propios correspondientes\n\nUtilidad: Aⁿ = PDⁿP⁻¹, fácil de calcular.", nivel: "avanzado" },
      ],
      cuestionarios: [
        {
          id: "aq1",
          titulo: "Quiz: Transformaciones Lineales y Valores Propios",
          preguntas: [
            {
              enunciado: "Si T: ℝ³ → ℝ² es una transformación lineal, ¿cuál es la dimensión mínima posible del núcleo de T?",
              opciones: ["0", "1", "2", "3"],
              correcta: 1,
              explicacion: "Por rango-nulidad: dim(ker T) + dim(Im T) = 3. Como Im T ⊆ ℝ², dim(Im T) ≤ 2, entonces dim(ker T) ≥ 1."
            },
            {
              enunciado: "¿Qué ecuación permite encontrar los valores propios de una matriz A?",
              opciones: ["det(A) = 0", "det(A - λI) = 0", "A·v = 0", "tr(A) = λ"],
              correcta: 1,
              explicacion: "Av = λv ⟺ (A-λI)v = 0 tiene solución no trivial ⟺ det(A-λI) = 0. Esta es la ecuación característica."
            },
            {
              enunciado: "Una transformación lineal T: V→V es diagonalizable. ¿Qué implica esto?",
              opciones: [
                "Existe una base de V formada por vectores propios de T",
                "Todos los valores propios son distintos",
                "T es invertible",
                "T es la identidad"
              ],
              correcta: 0,
              explicacion: "T es diagonalizable ⟺ existe una base de V formada por vectores propios de T. Esto no requiere valores propios distintos."
            },
            {
              enunciado: "El proceso de Gram-Schmidt toma una base y produce:",
              opciones: [
                "Una base de vectores propios",
                "Una base ortogonal (u ortonormal si se normaliza)",
                "La base canónica",
                "Una base con el mismo número de vectores que la original pero con norma 2"
              ],
              correcta: 1,
              explicacion: "Gram-Schmidt ortogonaliza cualquier base linealmente independiente, produciendo una base ortogonal. Si luego normalizamos, obtenemos una base ortonormal."
            },
            {
              enunciado: "¿Qué afirma el Teorema Espectral para matrices simétricas reales?",
              opciones: [
                "Toda matriz simétrica tiene todos sus valores propios iguales a 1",
                "Toda matriz simétrica real es diagonalizable y sus vectores propios de valores propios distintos son ortogonales",
                "Solo las matrices simétricas son invertibles",
                "Una matriz simétrica siempre tiene valores propios complejos"
              ],
              correcta: 1,
              explicacion: "El Teorema Espectral garantiza que A simétrica real es ortogonalmente diagonalizable: A = PDP^T con P ortogonal (P^T = P^{-1})."
            }
          ]
        }
      ],
      infografias: [
        {
          titulo: "Proceso de Diagonalización",
          descripcion: "Pasos para diagonalizar una matriz A",
          secciones: [
            { titulo: "Paso 1: Polinomio Característico", items: ["Calcular det(A - λI) = 0", "Obtener los valores propios λ₁, λ₂, ...", "Multiplicidad algebraica de cada λ"] },
            { titulo: "Paso 2: Vectores Propios", items: ["Para cada λᵢ resolver (A - λᵢI)v = 0", "El espacio solución es el autoespacio Eλᵢ", "Multiplicidad geométrica = dim(Eλᵢ)"] },
            { titulo: "Paso 3: Verificar Diagonalizabilidad", items: ["Comprobar: mult. geométrica = mult. algebraica para cada λ", "Si se cumple → diagonalizable", "Si no → no se puede diagonalizar (en ese campo)"] },
            { titulo: "Paso 4: Construir P y D", items: ["P = [v₁ | v₂ | ... | vₙ] (vectores propios en columnas)", "D = diag(λ₁, λ₂, ..., λₙ) (valores propios en diagonal)", "Verificar: A = PDP⁻¹"] }
          ]
        }
      ]
    },

    {
      id: "prog2",
      nombre: "Programación 2",
      abrev: "Programación 2",
      color: "#059669",
      colorLight: "#ecfdf5",
      icono: "</>",
      links: {
        campus: "#",
        clases: "#",
      },
      textos: [
        { id: "p1", titulo: "TADs — Tipos Abstractos de Datos", tipo: "apunte", fecha: "2026-03-09", resumido: true },
        { id: "p2", titulo: "Recursividad y Análisis de Algoritmos", tipo: "apunte", fecha: "2026-03-16", resumido: true },
        { id: "p3", titulo: "Listas, Pilas y Colas", tipo: "apunte", fecha: "2026-03-23", resumido: true },
        { id: "p4", titulo: "Árboles Binarios y BST", tipo: "apunte", fecha: "2026-03-30", resumido: true },
        { id: "p5", titulo: "Árboles Balanceados (AVL, Rojo-Negro)", tipo: "apunte", fecha: "2026-04-06", resumido: false },
        { id: "p6", titulo: "Heaps y Colas de Prioridad", tipo: "apunte", fecha: "2026-04-13", resumido: false },
        { id: "p7", titulo: "Tablas Hash", tipo: "apunte", fecha: "2026-04-20", resumido: false },
        { id: "p8", titulo: "Grafos — Representación y Recorridos", tipo: "apunte", fecha: "2026-04-27", resumido: false },
        { id: "p9", titulo: "Algoritmos de Ordenamiento", tipo: "apunte", fecha: "2026-04-14", resumido: false },
      ],
      resumenes: [
        {
          id: "pr1",
          titulo: "Resumen: TADs y Complejidad",
          fecha: "2026-03-20",
          etiquetas: ["TAD", "Big-O", "complejidad"],
          contenido: "Un TAD define un tipo por su interfaz (operaciones) independientemente de la implementación. La notación Big-O describe el crecimiento asintótico: O(1) constante, O(log n) logarítmico, O(n) lineal, O(n log n) linealítmico, O(n²) cuadrático. Para analizar: contar operaciones elementales en función del tamaño de entrada n."
        },
        {
          id: "pr2",
          titulo: "Resumen: Estructuras de Datos Lineales",
          fecha: "2026-03-27",
          etiquetas: ["lista", "pila", "cola", "linked list"],
          contenido: "Lista enlazada: nodos con dato y puntero. Inserción/eliminación O(1) si tenés el puntero, búsqueda O(n). Pila (LIFO): push y pop O(1). Cola (FIFO): enqueue y dequeue O(1) con lista doblemente enlazada o arreglo circular. Cola de prioridad: heap binario, inserción O(log n), extraer máx O(log n)."
        },
        {
          id: "pr3",
          titulo: "Resumen: Árboles Binarios de Búsqueda",
          fecha: "2026-04-03",
          etiquetas: ["árbol", "BST", "búsqueda"],
          contenido: "BST: para cada nodo, todos los del subárbol izquierdo son menores, los del derecho son mayores. Búsqueda, inserción, eliminación: O(h) donde h es la altura. En árbol balanceado h=O(log n). En el peor caso (árbol degenerado) h=O(n). AVL garantiza balanceo con rotaciones: h=O(log n) siempre."
        },
      ],
      bibliografia: [
        { id: "pb1", titulo: "Introduction to Algorithms (CLRS)", autor: "Cormen, Leiserson, Rivest, Stein", tipo: "libro", edicion: "4ª ed.", url: "", descripcion: "La biblia de los algoritmos. Referencia principal del curso." },
        { id: "pb2", titulo: "Algorithms", autor: "Sedgewick & Wayne", tipo: "libro", edicion: "4ª ed.", url: "", descripcion: "Muy práctico, con implementaciones en Java. Bueno para estructuras de datos." },
        { id: "pb3", titulo: "Data Structures and Algorithm Analysis", autor: "Mark Allen Weiss", tipo: "libro", edicion: "3ª ed.", url: "", descripcion: "Excelente para análisis de complejidad y estructuras de datos avanzadas." },
        { id: "pb4", titulo: "Apuntes de Programación 2", autor: "Cátedra FING", tipo: "pdf", edicion: "2026", url: "./P 2/apuntes.pdf", descripcion: "Material oficial de la cátedra." },
      ],
      flashcards: [
        { pregunta: "¿Cuál es la complejidad de búsqueda en un BST balanceado?", respuesta: "O(log n)\n\nEn un BST balanceado (AVL, Rojo-Negro), la altura h = O(log n), y la búsqueda recorre desde la raíz hasta una hoja → O(h) = O(log n).\n\nEn el peor caso (degenerado): O(n)", nivel: "basico" },
        { pregunta: "¿Qué condición de balance usa un árbol AVL?", respuesta: "Para cada nodo, la diferencia de alturas entre los subárboles izquierdo y derecho (factor de balance) debe ser -1, 0 o 1.\n\n|altura(izq) - altura(der)| ≤ 1\n\nSi se viola tras una inserción/eliminación, se rebalancea con rotaciones.", nivel: "medio" },
        { pregunta: "¿Cuál es la complejidad de los algoritmos de ordenamiento por comparación más eficientes?", respuesta: "O(n log n)\n\nEjemplos: Merge Sort, Heap Sort, Quick Sort (promedio).\n\nCota inferior teórica para ordenamiento por comparación: Ω(n log n).\nOrdenamiento en O(n): posible sin comparaciones (Counting Sort, Radix Sort) bajo ciertas condiciones.", nivel: "basico" },
        { pregunta: "¿Cómo funciona el recorrido BFS en un grafo?", respuesta: "BFS (Breadth-First Search — Búsqueda en Anchura):\n1. Iniciar desde vértice fuente s\n2. Visitar todos los vecinos de s\n3. Luego los vecinos de los vecinos, etc.\n4. Usa una cola (FIFO)\n\nComplejidad: O(V + E)\nEncuentra el camino más corto (en cantidad de aristas) en grafos sin peso.", nivel: "medio" },
        { pregunta: "¿Cuál es la diferencia entre una tabla hash con encadenamiento y con sondeo lineal?", respuesta: "Encadenamiento (chaining): cada posición de la tabla contiene una lista enlazada de elementos que colisionan. Sin límite de carga.\n\nSondeo lineal (open addressing): ante colisión en posición i, se prueba i+1, i+2, ... módulo m. Todo en el mismo arreglo. Problema: clustering primario.\n\nFactor de carga α = n/m afecta el rendimiento en ambos.", nivel: "avanzado" },
        { pregunta: "Complejidad de las operaciones en un Heap binario (max-heap)", respuesta: "• Insertar: O(log n) — heapify up\n• Extraer máximo: O(log n) — heapify down\n• Obtener máximo (peek): O(1)\n• Construir heap desde arreglo: O(n)\n\nHeap Sort usa estas propiedades: O(n log n) total", nivel: "medio" },
      ],
      cuestionarios: [
        {
          id: "pq1",
          titulo: "Quiz: Estructuras de Datos y Complejidad",
          preguntas: [
            {
              enunciado: "¿Cuál de estas operaciones tiene complejidad O(1) en una tabla hash bien diseñada (caso promedio)?",
              opciones: ["Buscar el mínimo", "Buscar un elemento por clave", "Recorrer todos los elementos", "Ordenar los elementos"],
              correcta: 1,
              explicacion: "En una tabla hash, la búsqueda por clave es O(1) en promedio gracias a la función hash que mapea directamente a la posición."
            },
            {
              enunciado: "Merge Sort tiene complejidad O(n log n). ¿Por qué?",
              opciones: [
                "Porque ordena de a pares",
                "Porque divide en dos mitades log n veces y cada nivel de merge toma O(n)",
                "Porque usa recursividad",
                "Porque compara cada elemento con todos los demás"
              ],
              correcta: 1,
              explicacion: "Hay log n niveles de recursión (dividir a la mitad). En cada nivel, el merge de todas las sublistas toma O(n) total. Por lo tanto: O(n) × O(log n) = O(n log n)."
            },
            {
              enunciado: "¿Cuál es la ventaja principal de DFS sobre BFS?",
              opciones: [
                "Encuentra el camino más corto",
                "Usa menos memoria (O(h) vs O(w) donde h=altura, w=ancho del grafo)",
                "Es siempre más rápido",
                "Funciona solo en árboles"
              ],
              correcta: 1,
              explicacion: "DFS usa una pila de profundidad O(h). BFS usa una cola que puede contener O(w) nodos (el ancho del nivel más ancho). Para grafos muy anchos, DFS es más económico en memoria."
            },
            {
              enunciado: "¿Qué garantiza un árbol AVL que un BST común no garantiza?",
              opciones: [
                "Que todos los elementos son únicos",
                "Que la búsqueda, inserción y eliminación son siempre O(log n)",
                "Que el árbol siempre está completo",
                "Que los elementos están ordenados"
              ],
              correcta: 1,
              explicacion: "Un BST puede degenerarse (e.g., insertar ordenado da una lista enlazada con O(n)). El AVL mantiene el balance estrictamente, garantizando altura O(log n) y por tanto todas las operaciones en O(log n)."
            },
            {
              enunciado: "¿En qué estructura de datos se basa la implementación más eficiente de una Cola de Prioridad?",
              opciones: ["Lista enlazada ordenada", "Árbol de búsqueda binaria", "Heap binario", "Tabla hash"],
              correcta: 2,
              explicacion: "El heap binario permite inserción O(log n) y extracción del máximo O(log n), con acceso al máximo en O(1). Una lista ordenada daría O(n) para inserción o O(1) para extracción, no ambas eficientemente."
            }
          ]
        }
      ],
      infografias: [
        {
          titulo: "Complejidad de Estructuras de Datos",
          descripcion: "Resumen de complejidades para las operaciones principales",
          secciones: [
            { titulo: "Arreglo (Array)", items: ["Acceso por índice: O(1)", "Búsqueda: O(n)", "Inserción al final: O(1) amortizado", "Inserción en posición: O(n)"] },
            { titulo: "Lista Enlazada", items: ["Acceso por índice: O(n)", "Inserción (con puntero): O(1)", "Búsqueda: O(n)", "Sin desperdicio de espacio"] },
            { titulo: "Árbol BST balanceado", items: ["Búsqueda: O(log n)", "Inserción: O(log n)", "Eliminación: O(log n)", "Elementos ordenados in-order"] },
            { titulo: "Tabla Hash", items: ["Búsqueda: O(1) promedio", "Inserción: O(1) promedio", "Sin orden garantizado", "Depende de función hash y factor de carga"] }
          ]
        }
      ]
    },

    {
      id: "discreta",
      nombre: "Matemática Discreta 2",
      abrev: "Discreta 2",
      color: "#d97706",
      colorLight: "#fffbeb",
      icono: "G",
      links: {
        campus: "#",
        clases: "#",
      },
      textos: [
        { id: "d1", titulo: "Grafos: Definiciones y Propiedades", tipo: "apunte", fecha: "2026-03-10", resumido: true },
        { id: "d2", titulo: "Grafos: Caminos, Ciclos, Conexión", tipo: "apunte", fecha: "2026-03-17", resumido: true },
        { id: "d3", titulo: "Árboles y Árboles Generadores", tipo: "apunte", fecha: "2026-03-24", resumido: false },
        { id: "d4", titulo: "Coloración de Grafos", tipo: "apunte", fecha: "2026-03-31", resumido: false },
        { id: "d5", titulo: "Grafos Eulerianos y Hamiltonianos", tipo: "apunte", fecha: "2026-04-07", resumido: false },
        { id: "d6", titulo: "Flujo en Redes", tipo: "apunte", fecha: "2026-04-14", resumido: false },
        { id: "d7", titulo: "Relaciones de Recurrencia", tipo: "apunte", fecha: "2026-04-21", resumido: false },
        { id: "d8", titulo: "Combinatoria y Principio de Inclusión-Exclusión", tipo: "apunte", fecha: "2026-04-28", resumido: false },
      ],
      resumenes: [
        {
          id: "dr1",
          titulo: "Resumen: Conceptos Básicos de Grafos",
          fecha: "2026-03-18",
          etiquetas: ["grafo", "vértice", "arista", "grado"],
          contenido: "Un grafo G=(V,E) tiene vértices V y aristas E. Grado de v: cantidad de aristas incidentes, deg(v). Suma de grados = 2|E| (handshaking lemma). Grafos especiales: completo Kₙ, bipartito Kₘ,ₙ, ciclo Cₙ, camino Pₙ. Isomorfismo: misma estructura, distintos etiquetados."
        },
        {
          id: "dr2",
          titulo: "Resumen: Árboles",
          fecha: "2026-03-25",
          etiquetas: ["árbol", "árbol generador", "Kruskal", "Prim"],
          contenido: "Árbol: grafo conexo sin ciclos. Equivalencias: (1) conexo sin ciclos, (2) conexo con n-1 aristas, (3) acíclico con n-1 aristas, (4) hay único camino entre todo par de vértices. Árbol generador mínimo: Kruskal (aristas de menor peso sin ciclos) y Prim (expandir el árbol de menor costo)."
        },
      ],
      bibliografia: [
        { id: "db1", titulo: "Discrete Mathematics and Its Applications", autor: "Kenneth Rosen", tipo: "libro", edicion: "8ª ed.", url: "", descripcion: "Libro principal. Amplio y didáctico, cubre todos los temas del curso." },
        { id: "db2", titulo: "Graph Theory", autor: "Reinhard Diestel", tipo: "libro", edicion: "5ª ed.", url: "", descripcion: "Referencia avanzada para teoría de grafos. Disponible gratis en el sitio del autor." },
        { id: "db3", titulo: "Introducción a la Matemática Discreta", autor: "Grimaldi", tipo: "libro", edicion: "5ª ed.", url: "", descripcion: "Buen complemento para combinatoria y relaciones de recurrencia." },
        { id: "db4", titulo: "Apuntes de Discreta 2", autor: "Cátedra FING", tipo: "pdf", edicion: "2026", url: "./MD 2/apuntes.pdf", descripcion: "Material oficial con problemas resueltos." },
      ],
      flashcards: [
        { pregunta: "Enuncia el Lema del Apretón de Manos (Handshaking Lemma)", respuesta: "Para todo grafo G = (V, E):\n\nΣᵥ∈V deg(v) = 2|E|\n\nLa suma de todos los grados es igual al doble del número de aristas.\n\nCorolario: en todo grafo, la cantidad de vértices de grado impar es par.", nivel: "basico" },
        { pregunta: "¿Cuándo un grafo tiene un circuito euleriano?", respuesta: "Un grafo conexo tiene circuito euleriano (recorre todas las aristas exactamente una vez y vuelve al inicio) si y solo si:\n\ntodos sus vértices tienen grado par\n\nAlgoritmo de Hierholzer lo construye en O(E).", nivel: "medio" },
        { pregunta: "¿Cuál es la diferencia entre un grafo planar y uno plano?", respuesta: "Grafo planar: puede dibujarse en el plano sin cruzamiento de aristas (propiedad del grafo, independiente del dibujo).\n\nGrafo plano: un dibujo específico sin cruzamientos.\n\nFórmula de Euler para grafos planos conexos: V - E + F = 2 (F = caras incluyendo la exterior).", nivel: "medio" },
        { pregunta: "¿Qué establece el Teorema de los 4 Colores?", respuesta: "Todo grafo planar puede ser coloreado con a lo sumo 4 colores de modo que ningún par de vértices adyacentes tenga el mismo color.\n\nNúmero cromático χ(G) ≤ 4 para todo grafo planar.\n\nDemostrado computacionalmente por Appel y Haken (1976).", nivel: "avanzado" },
        { pregunta: "¿Qué es el Teorema Max-Flow Min-Cut?", respuesta: "En una red de flujo, el flujo máximo de s a t es igual a la capacidad mínima de un corte s-t.\n\nmax-flow(s,t) = min-cut(s,t)\n\nBase del algoritmo Ford-Fulkerson. Implica: el cuello de botella de la red determina el flujo máximo posible.", nivel: "avanzado" },
        { pregunta: "¿Cuándo dos grafos son isomorfos?", respuesta: "G₁ = (V₁, E₁) y G₂ = (V₂, E₂) son isomorfos si existe una biyección f: V₁→V₂ tal que:\n{u,v} ∈ E₁ ⟺ {f(u),f(v)} ∈ E₂\n\nCondiciones necesarias (no suficientes): mismo nº de vértices, aristas, y misma secuencia de grados.", nivel: "basico" },
      ],
      cuestionarios: [
        {
          id: "dq1",
          titulo: "Quiz: Teoría de Grafos",
          preguntas: [
            {
              enunciado: "Un grafo tiene 10 aristas. La suma de todos los grados de sus vértices es:",
              opciones: ["10", "20", "Depende del grafo", "5"],
              correcta: 1,
              explicacion: "Por el Handshaking Lemma: Σ deg(v) = 2|E| = 2 × 10 = 20."
            },
            {
              enunciado: "¿Cuál es la condición para que un grafo conexo tenga un circuito euleriano?",
              opciones: [
                "Todos los vértices tienen grado impar",
                "Exactamente dos vértices tienen grado impar",
                "Todos los vértices tienen grado par",
                "El grafo es bipartito"
              ],
              correcta: 2,
              explicacion: "Teorema de Euler: un grafo conexo tiene circuito euleriano ⟺ todos sus vértices tienen grado par."
            },
            {
              enunciado: "Para un grafo plano conexo con V vértices, E aristas y F caras, ¿qué establece la fórmula de Euler?",
              opciones: ["V + E + F = 2", "V - E + F = 2", "V + E - F = 2", "V - E - F = 2"],
              correcta: 1,
              explicacion: "Fórmula de Euler para grafos planos conexos: V - E + F = 2 (contando la cara exterior)."
            },
            {
              enunciado: "El algoritmo de Kruskal para el árbol generador mínimo:",
              opciones: [
                "Expande siempre desde el vértice más cercano al árbol actual",
                "Selecciona aristas de menor peso que no formen ciclos, hasta tener n-1 aristas",
                "Usa BFS desde el vértice de mayor grado",
                "Ordena los vértices por grado y los conecta"
              ],
              correcta: 1,
              explicacion: "Kruskal: ordena aristas por peso, y greedy agrega las de menor peso que no formen ciclos (verificado con Union-Find). Termina con el AGM."
            },
            {
              enunciado: "¿Qué afirma el teorema Max-Flow Min-Cut?",
              opciones: [
                "El flujo máximo siempre es la mitad de la capacidad total",
                "El flujo máximo de s a t es igual a la capacidad mínima de un corte s-t",
                "Todo grafo tiene flujo máximo igual a su número de aristas",
                "El flujo mínimo es siempre cero"
              ],
              correcta: 1,
              explicacion: "Max-Flow Min-Cut: el máximo flujo posible de la fuente s al sumidero t es exactamente igual a la capacidad del corte mínimo que separa s de t."
            }
          ]
        }
      ],
      infografias: [
        {
          titulo: "Tipos de Grafos y sus Propiedades",
          descripcion: "Clasificación de grafos especiales y condiciones que los caracterizan",
          secciones: [
            { titulo: "Árboles", items: ["Conexo y acíclico", "Exactamente n-1 aristas", "Único camino entre todo par de vértices", "Agregar cualquier arista crea un ciclo"] },
            { titulo: "Grafos Eulerianos", items: ["Tiene circuito euleriano ⟺ todos los vértices con grado par", "Tiene camino euleriano ⟺ exactamente 2 vértices de grado impar", "El circuito/camino euleriano recorre cada arista exactamente una vez"] },
            { titulo: "Grafos Planares", items: ["Se pueden dibujar sin cruzamiento de aristas", "Fórmula de Euler: V - E + F = 2", "K₅ y K₃,₃ son los menores no planares (Kuratowski)"] },
            { titulo: "Grafos Bipartitos", items: ["Vértices en dos grupos A y B", "Aristas solo entre grupos distintos", "Es bipartito ⟺ no tiene ciclos de longitud impar", "Matching perfecto: todos los vértices apareados"] }
          ]
        }
      ]
    }
  ]
};
