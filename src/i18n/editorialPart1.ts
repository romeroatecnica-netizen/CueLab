import type {LangCode} from '../types/cuelab';

export interface GuidePillar {
  title: string;
  body: string;
}

export interface MisconceptionRow {
  signal: string;
  naiveMyth: string;
  calibratedReading: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BookResource {
  title: string;
  author: string;
  focus: string;
  summary: string;
  url: string;
  ctaLabel: string;
}

export interface EditorialContent {
  guideHeading: string;
  guideLead: string;
  pillars: GuidePillar[];
  baselineHeading: string;
  baselineBody: string;
  pitfallsHeading: string;
  pitfallsLead: string;
  pitfallsTableHeaders: [string, string, string];
  misconceptions: MisconceptionRow[];
  faqHeading: string;
  faqLead: string;
  faqs: FaqItem[];
  resourcesHeading: string;
  resourcesDisclosure: string;
  resources: BookResource[];
}

export const EDITORIAL_PART_1: Record<Extract<LangCode, 'en' | 'es' | 'fr' | 'de' | 'pt'>, EditorialContent> = {
  en: {
    guideHeading: 'Practical Field Guide to Reading Nonverbal Cues',
    guideLead:
      'Effective body language observation relies on clusters, timing, and context rather than isolated gestures. Use these four analytical pillars during conversations, interviews, and negotiations.',
    pillars: [
      {
        title: '01. Observe Clusters, Never Single Gestures',
        body: 'A single touch to the neck or brief gaze break proves nothing on its own. Look for three or more converging signals appearing together right after a specific question or topic shift.',
      },
      {
        title: '02. Establish a Personal Baseline First',
        body: 'Before interpreting tension, spend the first two minutes observing how the person sits, blinks, gestures, and holds their shoulders during low-stakes small talk.',
      },
      {
        title: '03. Watch Verbal–Nonverbal Congruence',
        body: 'When words convey enthusiasm or certainty ("I am completely fine with that") while the jaw tightens, shoulders lift, or torso angles toward the exit, treat the mismatch as an invitation to clarify gently.',
      },
      {
        title: '04. Account for Proxemics & Physical Barriers',
        body: 'Laptops, notebooks, chair angles, and room temperature heavily shape posture. Crossing arms in a cold conference room or leaning back at 6:30 PM reflects physical comfort before psychology.',
      },
    ],
    baselineHeading: 'Why Baseline and Context Decide Meaning',
    baselineBody:
      'Human posture adapts to physical comfort, fatigue, neurodivergence, and cultural norms long before it reflects deception or hostility. A calibrated observer always checks environment (temperature, noise, seating height), prior baseline (habitual fidgeting vs. sudden freeze), and conversational timing (did the shift happen immediately after a sensitive topic?) before forming a working hypothesis.',
    pitfallsHeading: 'Common Body Language Misinterpretations to Avoid',
    pitfallsLead:
      'Pop-psychology myths turn probabilistic cues into rigid stereotypes. Compare naive assumptions against calibrated observation.',
    pitfallsTableHeaders: ['Observable Signal', 'Naive Pop-Myth', 'Calibrated Observation'],
    misconceptions: [
      {
        signal: 'Crossed arms',
        naiveMyth: '"They are hiding something or closed off."',
        calibratedReading: 'Check room temperature, chair armrests, and timing. Often simply a self-warming or resting posture unless paired with torso retreat.',
      },
      {
        signal: 'Looking away while speaking',
        naiveMyth: '"Averted gaze means lying."',
        calibratedReading: 'People naturally break eye contact when retrieving complex memories or formulating careful phrasing; sudden downward withdrawal after confrontation is more informative.',
      },
      {
        signal: 'Smiling during tense feedback',
        naiveMyth: '"They are happy or mocking me."',
        calibratedReading: 'Without cheek elevation and eye-corner crinkling (Duchenne markers), a tight horizontal smile often functions as a social appeasement or tension buffer.',
      },
      {
        signal: 'Touching neck or collar',
        naiveMyth: '"Guaranteed deception."',
        calibratedReading: 'A pacifying reflex that lowers heart rate during stress, embarrassment, or cognitive overload—not proof of dishonesty.',
      },
    ],
    faqHeading: 'Frequently Asked Questions',
    faqLead: 'Evidence-based answers on nonverbal observation training, accuracy, and privacy.',
    faqs: [
      {
        question: 'Can body language alone prove someone is lying?',
        answer:
          'No. Decades of peer-reviewed behavioral research show there is no universal "Pinocchio cue" for deception. Nonverbal cues indicate emotional load, discomfort, or cognitive effort relative to a person’s baseline—never definitive proof.',
      },
      {
        question: 'Why does CueLab compare two scenes in Baseline Challenge?',
        answer:
          'Because identical gestures carry opposite meanings depending on prior baseline and environment. Seeing two similar postures side by side trains you to ask "what changed?" instead of jumping to conclusions.',
      },
      {
        question: 'How does the Strengths & Blind Spots diagnostic work?',
        answer:
          'CueLab tracks your accuracy and response latency locally in your browser across four channels: Facial & Gaze, Posture & Hands, Verbal-Gesture Match, and Context & Proxemics. Once you sample each channel, it highlights your lowest-scoring channel for targeted drills.',
      },
      {
        question: 'Does CueLab send my quiz data or answers to any server?',
        answer:
          'No. Everything runs 100% locally in your browser using static assets and localStorage. No accounts, cookies, or external AI API calls are used.',
      },
      {
        question: 'How should I respond when I notice a verbal–nonverbal mismatch?',
        answer:
          'Never accuse or say "your body language disagrees." Instead, lower pressure with an open, non-judgmental check-in such as "Take a moment—is there any part of this timeline that feels tight?"',
      },
      {
        question: 'Are nonverbal cues identical across all cultures?',
        answer:
          'While basic emotional facial expressions share broad cross-cultural recognition, eye-contact norms, comfortable interpersonal distance (proxemics), and gesture amplitude vary widely by culture and personal habit.',
      },
    ],
    resourcesHeading: 'Recommended Reading on Communication & Negotiation',
    resourcesDisclosure:
      'Editorial disclosure: The book links below are affiliate-ready external references (rel="sponsored nofollow noopener"). Selecting them helps support free educational tools at no extra cost.',
    resources: [
      {
        title: 'What Every BODY is Saying',
        author: 'Joe Navarro',
        focus: 'Baseline observation & pacifying behaviors',
        summary: 'Practical field framework emphasizing comfort/discomfort clusters and lower-body cues over pop myths.',
        url: 'https://www.amazon.com/s?k=What+Every+BODY+is+Saying+Joe+Navarro',
        ctaLabel: 'View book reference',
      },
      {
        title: 'Emotions Revealed',
        author: 'Paul Ekman',
        focus: 'Facial muscle action & micro-expressions',
        summary: 'Foundational guide to distinguishing genuine Duchenne smiles from social masks and subtle brow/lip tension.',
        url: 'https://www.amazon.com/s?k=Emotions+Revealed+Paul+Ekman',
        ctaLabel: 'View book reference',
      },
      {
        title: 'Never Split the Difference',
        author: 'Chris Voss',
        focus: 'Tactical empathy & calibrated questions',
        summary: 'Shows how labeling unspoken hesitation ("It sounds like...") defuses tension in high-stakes negotiations.',
        url: 'https://www.amazon.com/s?k=Never+Split+the+Difference+Chris+Voss',
        ctaLabel: 'View book reference',
      },
      {
        title: 'Crucial Conversations',
        author: 'Kerry Patterson et al.',
        focus: 'Psychological safety & assertive dialogue',
        summary: 'Actionable methods for spotting silence or verbal aggression early and restoring mutual purpose.',
        url: 'https://www.amazon.com/s?k=Crucial+Conversations+Tools+for+Talking',
        ctaLabel: 'View book reference',
      },
    ],
  },
  es: {
    guideHeading: 'Guía Práctica para Leer Señales No Verbales',
    guideLead:
      'Observar el lenguaje corporal con rigor se basa en conjuntos de señales, sincronía y contexto, nunca en gestos aislados. Aplica estos cuatro pilares en entrevistas, reuniones y negociaciones.',
    pillars: [
      {
        title: '01. Observa conjuntos, nunca gestos sueltos',
        body: 'Tocarse el cuello una vez o desviar la mirada un segundo no demuestra nada por sí solo. Busca tres o más señales convergentes justo después de una pregunta concreta.',
      },
      {
        title: '02. Establece siempre una línea base previa',
        body: 'Antes de interpretar tensión, dedica los dos primeros minutos de charla trivial a observar cómo se sienta, parpadea y gesticula la persona en calma.',
      },
      {
        title: '03. Detecta incongruencias entre palabra y cuerpo',
        body: 'Cuando alguien afirma estar encantado pero aprieta la mandíbula, eleva los hombros o gira el torso hacia la salida, toma el desajuste como invitación a preguntar con tacto.',
      },
      {
        title: '04. Considera proxémica y barreras físicas',
        body: 'Portátiles, mesas, sillas sin reposabrazos o una sala fría moldean la postura. Cruzar los brazos con corriente de aire es termorregulación antes que defensa psicológica.',
      },
    ],
    baselineHeading: 'Por qué la línea base y el contexto definen el significado',
    baselineBody:
      'La postura humana responde al confort físico, el cansancio, la neurodiversidad y las normas culturales mucho antes que al engaño. Un observador calibrado verifica el entorno (temperatura, fatiga, mobiliario), la línea base habitual y el momento exacto del cambio antes de formular hipótesis.',
    pitfallsHeading: 'Errores comunes de interpretación a evitar',
    pitfallsLead:
      'Los mitos populares convierten indicadores probabilísticos en etiquetas rígidas. Contrasta el mito con la lectura calibrada.',
    pitfallsTableHeaders: ['Señal observable', 'Mito popular', 'Lectura calibrada'],
    misconceptions: [
      {
        signal: 'Brazos cruzados',
        naiveMyth: '"Está cerrado o ocultando algo."',
        calibratedReading: 'Revisa temperatura ambiental, ausencia de reposabrazos y momento del cruce. Suele ser comodidad física salvo si se combina con retroceso del torso.',
      },
      {
        signal: 'Desviar la mirada al hablar',
        naiveMyth: '"Si no te mira a los ojos, miente."',
        calibratedReading: 'Rompemos el contacto visual de forma natural al recuperar recuerdos complejos o elegir palabras; resulta más significativo un repliegue brusco hacia abajo tras una confrontación.',
      },
      {
        signal: 'Sonreír en una crítica tensa',
        naiveMyth: '"Está contento o burlándose."',
        calibratedReading: 'Sin elevación de mejillas ni patas de gallo (marcadores de Duchenne), una sonrisa tensa y horizontal suele actuar como amortiguador social o apaciguamiento.',
      },
      {
        signal: 'Tocarse el cuello o el collar',
        naiveMyth: '"Prueba segura de mentira."',
        calibratedReading: 'Es un gesto de autocalma para reducir activación fisiológica ante estrés, vergüenza o sobrecarga cognitiva, jamás prueba de engaño.',
      },
    ],
    faqHeading: 'Preguntas Frecuentes',
    faqLead: 'Respuestas basadas en evidencia sobre entrenamiento observacional, precisión y privacidad.',
    faqs: [
      {
        question: '¿Puede el lenguaje corporal demostrar por sí solo que alguien miente?',
        answer:
          'No. Décadas de investigación conductual confirman que no existe un gesto universal de engaño. Las señales reflejan carga emocional, incomodidad o esfuerzo cognitivo respecto a la línea base.',
      },
      {
        question: '¿Por qué CueLab compara dos escenas en Contexto y Línea Base?',
        answer:
          'Porque un mismo gesto puede deberse al frío o al cansancio en un contexto, y a incomodidad repentina en otro. Comparar pares entrena la pregunta clave: "¿qué cambió respecto a su estado previo?".',
      },
      {
        question: '¿Cómo funciona el diagnóstico de Puntos Fuertes y Puntos Ciegos?',
        answer:
          'CueLab registra localmente tu precisión y tiempo medio en cuatro canales: Rostro y Mirada, Postura y Manos, Congruencia Verbal-Gestual y Contexto/Proxémica, permitiéndote lanzar rondas enfocadas en tu área más débil.',
      },
      {
        question: '¿CueLab envía mis respuestas o datos a algún servidor?',
        answer:
          'No. Todo funciona de forma 100 % estática y local en tu navegador usando localStorage, sin cuentas, rastreadores ni llamadas a APIs externas.',
      },
      {
        question: '¿Cómo conviene actuar al notar una incongruencia entre palabra y gesto?',
        answer:
          'Nunca acuses ni digas "tu cuerpo dice lo contrario". Reduce la presión con una pregunta abierta sin juicio, por ejemplo: "¿Hay alguna parte de este plazo que te genere dudas?".',
      },
      {
        question: '¿Son iguales las señales no verbales en todas las culturas?',
        answer:
          'Aunque las emociones básicas comparten reconocimiento facial amplio, la duración del contacto visual, la distancia interpersonal cómoda y la amplitud gestual varían mucho según la cultura.',
      },
    ],
    resourcesHeading: 'Lecturas y Recursos Recomendados',
    resourcesDisclosure:
      'Aviso transparente: los enlaces siguientes están preparados para afiliación (rel="sponsored nofollow noopener"). Consultar estas obras apoya el mantenimiento gratuito de herramientas educativas sin coste adicional.',
    resources: [
      {
        title: 'El cuerpo habla (What Every BODY is Saying)',
        author: 'Joe Navarro',
        focus: 'Línea base y conductas de apaciguamiento',
        summary: 'Manual práctico centrado en conjuntos de confort/incomodidad y señales reales frente a mitos.',
        url: 'https://www.amazon.com/s?k=What+Every+BODY+is+Saying+Joe+Navarro',
        ctaLabel: 'Ver referencia del libro',
      },
      {
        title: 'Emotions Revealed (El rostro de las emociones)',
        author: 'Paul Ekman',
        focus: 'Acción muscular facial y microexpresiones',
        summary: 'Obra clave para distinguir la sonrisa genuina de Duchenne de máscaras sociales y tensión en labios o cejas.',
        url: 'https://www.amazon.com/s?k=Emotions+Revealed+Paul+Ekman',
        ctaLabel: 'Ver referencia del libro',
      },
      {
        title: 'Rompe la barrera del no (Never Split the Difference)',
        author: 'Chris Voss',
        focus: 'Empatía táctica y preguntas calibradas',
        summary: 'Explica cómo etiquetar la duda no expresada ("Parece que...") desactiva tensiones en negociaciones.',
        url: 'https://www.amazon.com/s?k=Never+Split+the+Difference+Chris+Voss',
        ctaLabel: 'Ver referencia del libro',
      },
      {
        title: 'Conversaciones Cruciales',
        author: 'Kerry Patterson et al.',
        focus: 'Seguridad psicológica y diálogo asertivo',
        summary: 'Técnicas concretas para detectar silencio defensivo a tiempo y restablecer un propósito común.',
        url: 'https://www.amazon.com/s?k=Crucial+Conversations+Tools+for+Talking',
        ctaLabel: 'Ver referencia del libro',
      },
    ],
  },
  fr: {
    guideHeading: 'Guide Pratique de Lecture des Signaux Non Verbaux',
    guideLead:
      'L’observation rigoureuse repose sur les faisceaux d’indices, la synchronisation et le contexte plutôt que sur un geste isolé. Appliquez ces quatre piliers en entretien ou négociation.',
    pillars: [
      {
        title: '01. Observez des faisceaux, jamais un geste isolé',
        body: 'Toucher son cou une fois ne prouve rien. Repérez au moins trois indices convergents apparaissant juste après une question ou un changement de sujet.',
      },
      {
        title: '02. Établissez d’abord une ligne de base personnelle',
        body: 'Consacrez les deux premières minutes d’échange léger à noter la posture habituelle, le rythme de clignement et l’amplitude gestuelle de votre interlocuteur.',
      },
      {
        title: '03. Repérez les dissonances mots-gestes',
        body: 'Si les mots affirment un accord enthousiaste alors que la mâchoire se crispe ou que le buste pivote vers la sortie, considérez ce décalage comme une piste pour clarifier avec tact.',
      },
      {
        title: '04. Intégrez la proxémie et les barrières physiques',
        body: 'Ordinateur portable, table étroite ou pièce fraîche influencent fortement la posture. Croiser les bras dans une salle climatisée relève souvent du confort thermique.',
      },
    ],
    baselineHeading: 'Pourquoi la ligne de base et le contexte décident du sens',
    baselineBody:
      'La posture répond d’abord au confort physique, à la fatigue et aux codes culturels. Un observateur calibré vérifie l’environnement, l’état initial de la personne et le moment précis de la bascule avant toute hypothèse.',
    pitfallsHeading: 'Erreurs courantes d’interprétation à éviter',
    pitfallsLead:
      'Les mythes transforment des indices probabilistes en jugements hâtifs. Comparez cliché et lecture calibrée.',
    pitfallsTableHeaders: ['Signal observé', 'Mythe naïf', 'Lecture calibrée'],
    misconceptions: [
      {
        signal: 'Bras croisés',
        naiveMyth: '« La personne est fermée ou cache quelque chose. »',
        calibratedReading: 'Vérifiez la température de la pièce et la présence d’accoudoirs. C’est souvent une posture de repos ou de chaleur sans recul du buste.',
      },
      {
        signal: 'Détourner le regard en parlant',
        naiveMyth: '« Fuir le regard signifie mentir. »',
        calibratedReading: 'On quitte naturellement le regard pour chercher un souvenir complexe ; un repli soudain vers le bas après une remarque sensible est plus parlant.',
      },
      {
        signal: 'Sourire lors d’un retour tendu',
        naiveMyth: '« Elle est ravie ou moqueuse. »',
        calibratedReading: 'Sans plissement des yeux (sourire de Duchenne), un sourire horizontal tendu sert souvent d’amortisseur social face à la gêne.',
      },
      {
        signal: 'Toucher la nuque ou le col',
        naiveMyth: '« Preuve de mensonge. »',
        calibratedReading: 'Un réflexe d’auto-apaisement pour réguler le stress ou la charge cognitive, jamais une preuve de malhonnêteté.',
      },
    ],
    faqHeading: 'Questions Fréquentes',
    faqLead: 'Réponses fondées sur la recherche comportementale et le fonctionnement local de CueLab.',
    faqs: [
      {
        question: 'Le langage corporel suffit-il à prouver un mensonge ?',
        answer:
          'Non. Aucune recherche scientifique ne valide un signe universel de mensonge. Les indices reflètent une charge émotionnelle ou cognitive par rapport à la ligne de base, jamais une preuve.',
      },
      {
        question: 'Pourquoi comparer deux scènes dans le mode Ligne de Base ?',
        answer:
          'Parce qu’un même geste change de sens selon la fatigue, la température ou l’évolution immédiate de la conversation.',
      },
      {
        question: 'Comment fonctionne le diagnostic des angles morts ?',
        answer:
          'CueLab suit localement votre précision sur quatre canaux (Visage, Posture, Congruence, Contexte) et propose un entraînement ciblé sur votre point le plus faible.',
      },
      {
        question: 'Mes réponses sont-elles envoyées à un serveur ?',
        answer:
          'Non. L’application est 100 % statique et locale dans votre navigateur via localStorage.',
      },
      {
        question: 'Comment réagir face à une dissonance entre paroles et gestes ?',
        answer:
          'Ne portez jamais d’accusation. Posez une question ouverte bienveillante pour vérifier s’il subsiste une réserve non formulée.',
      },
      {
        question: 'Les signaux non verbaux sont-ils identiques dans toutes les cultures ?',
        answer:
          'Si certaines expressions émotionnelles sont largement reconnues, la distance confortable et la norme de contact visuel varient fortement selon les cultures.',
      },
    ],
    resourcesHeading: 'Lectures Recommandées',
    resourcesDisclosure:
      'Transparence : les liens ci-dessous sont préparés pour l’affiliation (rel="sponsored nofollow noopener") afin de soutenir des outils éducatifs gratuits sans coût supplémentaire.',
    resources: [
      {
        title: 'Ces gestes qui vous trahissent (What Every BODY is Saying)',
        author: 'Joe Navarro',
        focus: 'Ligne de base et gestes d’apaisement',
        summary: 'Méthode pragmatique axée sur les faisceaux de confort et d’inconfort plutôt que les mythes.',
        url: 'https://www.amazon.com/s?k=What+Every+BODY+is+Saying+Joe+Navarro',
        ctaLabel: 'Voir le livre',
      },
      {
        title: 'Je sais que vous mentez / Emotions Revealed',
        author: 'Paul Ekman',
        focus: 'Micro-expressions et muscles faciaux',
        summary: 'Référence pour distinguer le sourire authentique de Duchenne des tensions sociales.',
        url: 'https://www.amazon.com/s?k=Emotions+Revealed+Paul+Ekman',
        ctaLabel: 'Voir le livre',
      },
      {
        title: 'Ne coupez jamais la poire en deux',
        author: 'Chris Voss',
        focus: 'Empathie tactique et questions calibrées',
        summary: 'Comment nommer l’hésitation implicite pour désamorcer les blocages en négociation.',
        url: 'https://www.amazon.com/s?k=Never+Split+the+Difference+Chris+Voss',
        ctaLabel: 'Voir le livre',
      },
      {
        title: 'Conversations Cruciales',
        author: 'Kerry Patterson et al.',
        focus: 'Sécurité psychologique et assertivité',
        summary: 'Outils concrets pour repérer le repli silencieux et rétablir un dialogue constructif.',
        url: 'https://www.amazon.com/s?k=Crucial+Conversations+Tools+for+Talking',
        ctaLabel: 'Voir le livre',
      },
    ],
  },
  de: {
    guideHeading: 'Praxisleitfaden für Nonverbale Beobachtung',
    guideLead:
      'Treffsichere Körpersprache-Beobachtung stützt sich auf Signalcluster, Timing und Kontext statt auf Einzelgesten. Nutzen Sie diese vier Grundprinzipien.',
    pillars: [
      {
        title: '01. Cluster beobachten, keine Einzelgesten',
        body: 'Ein einzelner Griff an den Hals beweist nichts. Achten Sie auf mindestens drei zusammenwirkende Signale direkt nach einer heiklen Frage.',
      },
      {
        title: '02. Persönliche Baseline zuerst erfassen',
        body: 'Beobachten Sie in den ersten zwei entspannten Gesprächsminuten die Grundhaltung, Blinzelfrequenz und Gestik der Person.',
      },
      {
        title: '03. Wort-Gestik-Inkongruenz prüfen',
        body: 'Wenn Worte Begeisterung ausdrücken, aber Kiefer, Schultern oder Oberkörperrichtung Spannung zeigen, lohnt eine ruhige Rückfrage.',
      },
      {
        title: '04. Raumklima, Proxemik & Barrieren einbeziehen',
        body: 'Laptops, fehlende Armlehnen oder ein kalter Raum prägen die Haltung oft stärker als psychische Abwehr.',
      },
    ],
    baselineHeading: 'Warum Baseline und Kontext über die Deutung entscheiden',
    baselineBody:
      'Körperhaltung reagiert zuerst auf Temperatur, Ermüdung, Sitzmöbel und kulturelle Gewohnheiten. Prüfen Sie stets Umgebung, Normalzustand und Auslösezeitpunkt, bevor Sie Schlüsse ziehen.',
    pitfallsHeading: 'Typische Deutungsfehler vermeiden',
    pitfallsLead:
      'Populäre Mythen machen aus wahrscheinlichen Hinweisen starre Urteile.',
    pitfallsTableHeaders: ['Beobachtbares Signal', 'Verbreiteter Mythos', 'Kalibrierte Einordnung'],
    misconceptions: [
      {
        signal: 'Verschränkte Arme',
        naiveMyth: '„Abwehrhaltung oder Unehrlichkeit.“',
        calibratedReading: 'Raumtemperatur und Stuhllehnen prüfen. Häufig reine Bequemlichkeit, sofern der Oberkörper nicht zurückweicht.',
      },
      {
        signal: 'Blickabwendung beim Sprechen',
        naiveMyth: '„Wer wegschaut, lügt.“',
        calibratedReading: 'Beim Abrufen von Erinnerungen wandert der Blick natürlich ab; aussagekräftiger ist plötzliches Senken nach Konfrontation.',
      },
      {
        signal: 'Lächeln bei Kritik',
        naiveMyth: '„Freude oder Spott.“',
        calibratedReading: 'Ohne Augenbeteiligung (Duchenne-Zeichen) dient ein flaches Lächeln oft der sozialen Spannungsabfederung.',
      },
      {
        signal: 'Griff an Hals oder Kragen',
        naiveMyth: '„Sicherer Lügendetektor.“',
        calibratedReading: 'Eine Selbstberuhigungsgeste zur Stressregulation – kein Beweis für Täuschung.',
      },
    ],
    faqHeading: 'Häufig gestellte Fragen',
    faqLead: 'Evidenzbasierte Antworten zu Beobachtungstraining, Treffsicherheit und Datenschutz.',
    faqs: [
      {
        question: 'Kann Körpersprache allein eine Lüge beweisen?',
        answer:
          'Nein. Die Verhaltensforschung zeigt eindeutig, dass es kein universelles Täuschungssignal gibt. Hinweise zeigen lediglich Stress oder kognitive Last im Vergleich zur Baseline.',
      },
      {
        question: 'Warum vergleicht CueLab im Baseline-Modus zwei Szenen?',
        answer:
          'Weil dieselbe Geste je nach Ausgangszustand und Umgebung völlig Unterschiedliches bedeuten kann.',
      },
      {
        question: 'Wie funktioniert die Blinder-Fleck-Diagnose?',
        answer:
          'CueLab erfasst lokal im Browser Ihre Genauigkeit über vier Signalkanäle und ermöglicht gezieltes Training für Ihren schwächsten Bereich.',
      },
      {
        question: 'Werden Daten an Server übertragen?',
        answer:
          'Nein. Alles läuft zu 100 % lokal im Browser über localStorage ohne externe APIs oder Tracking.',
      },
      {
        question: 'Wie reagiere ich auf einen Widerspruch zwischen Wort und Gestik?',
        answer:
          'Vermeiden Sie Vorwürfe. Stellen Sie stattdessen eine offene, druckfreie Frage zu möglichen Bedenken.',
      },
      {
        question: 'Gelten nonverbale Signale weltweit identisch?',
        answer:
          'Basisemotionen im Gesicht werden breit erkannt, doch Blickkontaktregeln und angenehme Gesprächsdistanzen variieren stark nach Kultur.',
      },
    ],
    resourcesHeading: 'Empfohlene Fachliteratur',
    resourcesDisclosure:
      'Transparenzhinweis: Die folgenden Buchlinks sind als Affiliate-Verweise (rel="sponsored nofollow noopener") vorbereitet und unterstützen kostenlose Lernangebote.',
    resources: [
      {
        title: 'Menschen lesen (What Every BODY is Saying)',
        author: 'Joe Navarro',
        focus: 'Baseline & Beruhigungsgesten',
        summary: 'Praxisorientierter Leitfaden zu Komfort-/Unbehagensclustern statt Klischees.',
        url: 'https://www.amazon.com/s?k=What+Every+BODY+is+Saying+Joe+Navarro',
        ctaLabel: 'Buchreferenz ansehen',
      },
      {
        title: 'Gefühle lesen (Emotions Revealed)',
        author: 'Paul Ekman',
        focus: 'Mimische Muskulatur & Mikroausdrücke',
        summary: 'Grundlagenwerk zur Unterscheidung echter Duchenne-Freude von sozialer Anspannung.',
        url: 'https://www.amazon.com/s?k=Emotions+Revealed+Paul+Ekman',
        ctaLabel: 'Buchreferenz ansehen',
      },
      {
        title: 'Kompromisslos verhandeln',
        author: 'Chris Voss',
        focus: 'Taktische Empathie & Kalibrierung',
        summary: 'Zeigt, wie das Benennen unausgesprochener Zweifel Verhandlungsblockaden löst.',
        url: 'https://www.amazon.com/s?k=Never+Split+the+Difference+Chris+Voss',
        ctaLabel: 'Buchreferenz ansehen',
      },
      {
        title: 'Heikle Gespräche (Crucial Conversations)',
        author: 'Kerry Patterson et al.',
        focus: 'Psychologische Sicherheit & Klarheit',
        summary: 'Konkrete Techniken, um stillen Rückzug früh zu erkennen und Vertrauen wiederherzustellen.',
        url: 'https://www.amazon.com/s?k=Crucial+Conversations+Tools+for+Talking',
        ctaLabel: 'Buchreferenz ansehen',
      },
    ],
  },
  pt: {
    guideHeading: 'Guia Prático para Leitura de Sinais Não Verbais',
    guideLead:
      'A leitura precisa de linguagem corporal depende de conjuntos de sinais, momento e contexto, nunca de gestos isolados. Aplique estes quatro pilares.',
    pillars: [
      {
        title: '01. Observe conjuntos, nunca gestos isolados',
        body: 'Tocar o pescoço uma vez não prova nada sozinho. Procure três ou mais sinais convergentes logo após uma pergunta específica.',
      },
      {
        title: '02. Estabeleça a linha de base antes de julgar',
        body: 'Use os dois primeiros minutos de conversa leve para observar postura, frequência de piscar e gestual habitual.',
      },
      {
        title: '03. Compare palavras com tensão corporal',
        body: 'Quando a fala demonstra entusiasmo, mas o maxilar trava ou o tronco gira para a saída, trate o contraste como convite para esclarecer com empatia.',
      },
      {
        title: '04. Considere proxêmica e barreiras físicas',
        body: 'Notebooks, mesas, cadeiras sem apoio e ar-condicionado moldam a postura antes de qualquer emoção.',
      },
    ],
    baselineHeading: 'Por que linha de base e contexto definem o significado',
    baselineBody:
      'A postura humana responde primeiro a temperatura, fadiga e hábitos culturais. Um observador calibrado verifica ambiente, estado prévio e gatilho temporal antes de concluir algo.',
    pitfallsHeading: 'Erros comuns de interpretação a evitar',
    pitfallsLead:
      'Mitos populares transformam pistas probabilísticas em rótulos fixos.',
    pitfallsTableHeaders: ['Sinal observado', 'Mito comum', 'Leitura calibrada'],
    misconceptions: [
      {
        signal: 'Braços cruzados',
        naiveMyth: '"Está na defensiva ou escondendo algo."',
        calibratedReading: 'Verifique temperatura da sala e apoio de braços. Muitas vezes é conforto térmico ou descanso, salvo se houver recuo do tronco.',
      },
      {
        signal: 'Desviar o olhar ao falar',
        naiveMyth: '"Quem não olha nos olhos está mentindo."',
        calibratedReading: 'Desviamos o olhar naturalmente para acessar memórias complexas; recuo súbito para baixo após confronto é mais informativo.',
      },
      {
        signal: 'Sorrir durante feedback difícil',
        naiveMyth: '"Está feliz ou debochando."',
        calibratedReading: 'Sem contração ao redor dos olhos (sorriso de Duchenne), um sorriso horizontal tenso funciona como amortecedor social.',
      },
      {
        signal: 'Tocar pescoço ou colarinho',
        naiveMyth: '"Prova absoluta de mentira."',
        calibratedReading: 'Comportamento de apaziguamento para reduzir estresse ou sobrecarga cognitiva, nunca prova de engano.',
      },
    ],
    faqHeading: 'Perguntas Frequentes',
    faqLead: 'Respostas baseadas em evidência sobre treino observacional, precisão e privacidade.',
    faqs: [
      {
        question: 'A linguagem corporal sozinha prova que alguém está mentindo?',
        answer:
          'Não. Pesquisas comportamentais mostram que não existe um sinal universal de mentira. Os gestos indicam carga emocional ou cognitiva relativa à linha de base.',
      },
      {
        question: 'Por que o CueLab compara duas cenas no desafio de Linha de Base?',
        answer:
          'Porque o mesmo gesto pode indicar frio ou cansaço em uma cena e desconforto súbito em outra.',
      },
      {
        question: 'Como funciona o diagnóstico de Pontos Cegos?',
        answer:
          'O CueLab registra localmente no navegador sua precisão nos quatro canais e libera treinos direcionados ao canal com menor desempenho.',
      },
      {
        question: 'Meus dados são enviados para algum servidor?',
        answer:
          'Não. Tudo roda 100% localmente no navegador via localStorage, sem contas ou chamadas de API.',
      },
      {
        question: 'Como responder quando noto incoerência entre fala e gesto?',
        answer:
          'Evite acusações diretas. Use uma pergunta aberta acolhedora para verificar se há alguma preocupação não dita.',
      },
      {
        question: 'Os sinais não verbais são iguais em todas as culturas?',
        answer:
          'Expressões emocionais básicas são amplamente reconhecidas, mas distância confortável e contato visual variam bastante entre culturas.',
      },
    ],
    resourcesHeading: 'Leituras Recomendadas',
    resourcesDisclosure:
      'Transparência: os links abaixo estão preparados para afiliação (rel="sponsored nofollow noopener"), ajudando a manter ferramentas educativas gratuitas sem custo extra.',
    resources: [
      {
        title: 'O Corpo Fala / What Every BODY is Saying',
        author: 'Joe Navarro',
        focus: 'Linha de base e gestos de apaziguamento',
        summary: 'Guia prático focado em conjuntos de conforto e desconforto em vez de mitos populares.',
        url: 'https://www.amazon.com/s?k=What+Every+BODY+is+Saying+Joe+Navarro',
        ctaLabel: 'Ver referência',
      },
      {
        title: 'A Linguagem das Emoções (Emotions Revealed)',
        author: 'Paul Ekman',
        focus: 'Músculos faciais e microexpressões',
        summary: 'Referência clássica para diferenciar sorrisos genuínos de Duchenne de máscaras sociais.',
        url: 'https://www.amazon.com/s?k=Emotions+Revealed+Paul+Ekman',
        ctaLabel: 'Ver referência',
      },
      {
        title: 'Negocie Como Se Sua Vida Dependesse Disso',
        author: 'Chris Voss',
        focus: 'Empatia tática e perguntas calibradas',
        summary: 'Mostra como nomear hesitações silenciosas destrava conversas difíceis.',
        url: 'https://www.amazon.com/s?k=Never+Split+the+Difference+Chris+Voss',
        ctaLabel: 'Ver referência',
      },
      {
        title: 'Conversas Cruciais',
        author: 'Kerry Patterson et al.',
        focus: 'Segurança psicológica e assertividade',
        summary: 'Métodos práticos para identificar silêncio defensivo cedo e restaurar propósito comum.',
        url: 'https://www.amazon.com/s?k=Crucial+Conversations+Tools+for+Talking',
        ctaLabel: 'Ver referência',
      },
    ],
  },
};
