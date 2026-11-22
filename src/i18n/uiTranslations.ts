import type {CueCategory, LangCode, TrainingMode} from '../types/cuelab';

export interface UiStrings {
  brandName: string;
  navTrainer: string;
  navDiagnostics: string;
  navGuide: string;
  navFaq: string;
  languageLabel: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  startSessionCta: string;
  modes: Record<
    TrainingMode,
    {
      label: string;
      shortLabel: string;
      description: string;
      seoTitleSuffix: string;
    }
  >;
  categories: Record<CueCategory, string>;
  stage: {
    zoomFull: string;
    zoomFace: string;
    zoomHands: string;
    cueMarkersOn: string;
    cueMarkersOff: string;
    sceneALabelDefault: string;
    sceneBLabelDefault: string;
    spokenStatementLabel: string;
    contextEnvLabels: Record<string, string>;
    proxemicLabels: Record<string, string>;
  };
  workspace: {
    scenarioCounter: string;
    timedModeLabel: string;
    relaxedModeLabel: string;
    secondsUnit: string;
    timeExpiredLabel: string;
    blindSpotActivePrefix: string;
    exitDrillButton: string;
    keyboardHint: string;
    correctTitle: string;
    incorrectTitle: string;
    whatToObserve: string;
    whyContextMatters: string;
    commonPitfall: string;
    nextScenario: string;
    restartDeck: string;
    copyShareLink: string;
    linkCopied: string;
    roundCompleteTitle: string;
    roundCompleteSummary: string;
  };
  progress: {
    sectionTitle: string;
    sectionSubtitle: string;
    answeredLabel: string;
    accuracyLabel: string;
    avgResponseLabel: string;
    bestStreakLabel: string;
    categoryBreakdownTitle: string;
    strengthBadge: string;
    blindSpotBadge: string;
    balancedBadge: string;
    noDataYet: string;
    practiceBlindSpotCta: string;
    recentLogTitle: string;
    resetButton: string;
    resetConfirmPrompt: string;
    resetConfirmYes: string;
    resetCancel: string;
    passLabel: string;
    missLabel: string;
  };
  ads: {
    disclosure: string;
    slotMidLabel: string;
    slotBottomLabel: string;
  };
  footer: {
    disclaimer: string;
    copyright: string;
  };
  seo: {
    baseTitle: string;
    baseDescription: string;
  };
}

export const UI_TRANSLATIONS: Record<LangCode, UiStrings> = {
  en: {
    brandName: 'CueLab',
    navTrainer: 'Trainer',
    navDiagnostics: 'Diagnostics',
    navGuide: 'Field Guide',
    navFaq: 'FAQ',
    languageLabel: 'Language',
    heroEyebrow: 'Browser-local observational training · 28 interactive scenarios',
    heroTitle: 'Nonverbal Communication Trainer & Body Language Quiz',
    heroSubtitle:
      'Practice structured observation of facial micro-cues, posture shifts, verbal-gesture incongruence, baseline calibration, and assertive responses without guesswork.',
    startSessionCta: 'Start Training',
    modes: {
      rapid: {
        label: 'Rapid Cue Spotter',
        shortLabel: 'Rapid Spotter',
        description: 'Identify primary cue clusters under optional timed pressure or relaxed study.',
        seoTitleSuffix: 'Rapid Cue Spotter',
      },
      mismatch: {
        label: 'Mismatch / Congruence Lab',
        shortLabel: 'Mismatch Lab',
        description: 'Compare explicit spoken words against posture, facial tension, and pacifiers.',
        seoTitleSuffix: 'Mismatch & Congruence Lab',
      },
      baseline: {
        label: 'Context & Baseline Challenge',
        shortLabel: 'Baseline Lab',
        description: 'Compare paired scenes to separate environmental habits from emotional shifts.',
        seoTitleSuffix: 'Context & Baseline Challenge',
      },
      coach: {
        label: 'Scenario Response Coach',
        shortLabel: 'Response Coach',
        description: 'Select calibrated verbal and nonverbal responses for tense real-world moments.',
        seoTitleSuffix: 'Scenario Response Coach',
      },
    },
    categories: {
      facial: 'Facial & Gaze',
      posture: 'Posture & Hands',
      mismatch: 'Verbal-Gesture Match',
      context: 'Context & Proxemics',
    },
    stage: {
      zoomFull: 'Full Scene',
      zoomFace: 'Face Zoom',
      zoomHands: 'Hands & Posture',
      cueMarkersOn: 'Hide Cue Markers',
      cueMarkersOff: 'Show Cue Markers',
      sceneALabelDefault: 'Baseline / Context A',
      sceneBLabelDefault: 'Target / Context B',
      spokenStatementLabel: 'Spoken statement',
      contextEnvLabels: {
        'office-desk': 'Office Desk',
        'interview-table': 'Interview Room',
        'cafe-table': 'Cafe Table',
        'negotiation-room': 'Negotiation Table',
        'standing-hall': 'Hallway / Standing',
      },
      proxemicLabels: {
        'close-invasive': 'Close / Invasive',
        comfortable: 'Comfortable Space',
        'distant-guarded': 'Distant / Guarded',
      },
    },
    workspace: {
      scenarioCounter: 'Scenario {current} of {total}',
      timedModeLabel: '15s Timed',
      relaxedModeLabel: 'Relaxed',
      secondsUnit: 's',
      timeExpiredLabel: 'Timer elapsed — pick your best observation',
      blindSpotActivePrefix: 'Focused Blind-Spot Drill:',
      exitDrillButton: 'Return to Mode Deck',
      keyboardHint: 'Keys 1–4 to answer · Enter for next',
      correctTitle: 'Accurate observation',
      incorrectTitle: 'Misread cue cluster',
      whatToObserve: 'What to observe',
      whyContextMatters: 'Why baseline & context matter',
      commonPitfall: 'Common misinterpretation to avoid',
      nextScenario: 'Next Scenario',
      restartDeck: 'Restart Mode Deck',
      copyShareLink: 'Share Exercise Link',
      linkCopied: 'Link copied',
      roundCompleteTitle: 'Deck Completed',
      roundCompleteSummary: 'Review your blind-spot diagnostics below or start another pass.',
    },
    progress: {
      sectionTitle: 'Strengths & Blind Spots',
      sectionSubtitle: 'Stored locally in your browser. Identify which cue channels need sharper calibration.',
      answeredLabel: 'Scenarios Completed',
      accuracyLabel: 'Overall Accuracy',
      avgResponseLabel: 'Avg. Response Time',
      bestStreakLabel: 'Best Streak',
      categoryBreakdownTitle: 'Accuracy by Cue Channel',
      strengthBadge: 'Strongest Channel',
      blindSpotBadge: 'Primary Blind Spot',
      balancedBadge: 'Calibrated',
      noDataYet: 'Complete at least 1 scenario per channel to unlock blind-spot targeting.',
      practiceBlindSpotCta: 'Drill Blind Spot',
      recentLogTitle: 'Recent Observations',
      resetButton: 'Reset Local Progress',
      resetConfirmPrompt: 'Clear all saved scores and history?',
      resetConfirmYes: 'Yes, clear data',
      resetCancel: 'Cancel',
      passLabel: 'Match',
      missLabel: 'Miss',
    },
    ads: {
      disclosure: 'Sponsored / Advertisement',
      slotMidLabel: 'Contextual Partner Placement (Media.net Ready)',
      slotBottomLabel: 'Display Placement (Media.net Ready)',
    },
    footer: {
      disclaimer:
        'Educational training tool for practicing observation of nonverbal cues. Body language signals are probabilistic indicators and always depend on baseline and context, never definitive proof.',
      copyright: 'CueLab · Browser-Local Nonverbal Observation Trainer',
    },
    seo: {
      baseTitle: 'CueLab — Nonverbal Communication Trainer & Body Language Quiz',
      baseDescription:
        'Train structured observation of facial cues, posture, verbal-gesture incongruence, and baseline calibration in this 100% browser-local nonverbal communication lab.',
    },
  },
  es: {
    brandName: 'CueLab',
    navTrainer: 'Entrenador',
    navDiagnostics: 'Diagnóstico',
    navGuide: 'Guía Práctica',
    navFaq: 'Preguntas',
    languageLabel: 'Idioma',
    heroEyebrow: 'Entrenamiento observacional 100 % local · 28 escenarios interactivos',
    heroTitle: 'Entrenador de Comunicación No Verbal y Quiz de Lenguaje Corporal',
    heroSubtitle:
      'Practica la observación estructurada de microgestos faciales, cambios de postura, incongruencias entre palabra y gesto, línea base y respuestas asertivas sin suposiciones arbitrarias.',
    startSessionCta: 'Empezar a entrenar',
    modes: {
      rapid: {
        label: 'Lectura Rápida de Señales',
        shortLabel: 'Lectura Rápida',
        description: 'Identifica grupos de señales clave con temporizador opcional o estudio pausado.',
        seoTitleSuffix: 'Lectura Rápida de Señales',
      },
      mismatch: {
        label: 'Detector de Incongruencia',
        shortLabel: 'Incongruencia',
        description: 'Contrasta declaraciones verbales explícitas con tensión facial, postura y autocalma.',
        seoTitleSuffix: 'Detector de Incongruencia',
      },
      baseline: {
        label: 'Contexto y Línea Base',
        shortLabel: 'Línea Base',
        description: 'Compara dos escenas para distinguir hábitos o entorno físico de cambios emocionales.',
        seoTitleSuffix: 'Contexto y Línea Base',
      },
      coach: {
        label: 'Calibración y Respuesta',
        shortLabel: 'Respuesta',
        description: 'Elige la respuesta verbal y no verbal más eficaz ante situaciones reales de tensión.',
        seoTitleSuffix: 'Entrenador de Respuesta',
      },
    },
    categories: {
      facial: 'Rostro y Mirada',
      posture: 'Postura y Manos',
      mismatch: 'Congruencia Verbal-Gestual',
      context: 'Contexto y Proxémica',
    },
    stage: {
      zoomFull: 'Escena completa',
      zoomFace: 'Zoom rostro',
      zoomHands: 'Manos y postura',
      cueMarkersOn: 'Ocultar marcadores',
      cueMarkersOff: 'Ver marcadores',
      sceneALabelDefault: 'Línea base / Contexto A',
      sceneBLabelDefault: 'Objetivo / Contexto B',
      spokenStatementLabel: 'Declaración verbal',
      contextEnvLabels: {
        'office-desk': 'Escritorio de oficina',
        'interview-table': 'Sala de entrevista',
        'cafe-table': 'Mesa de cafetería',
        'negotiation-room': 'Mesa de negociación',
        'standing-hall': 'Pasillo / De pie',
      },
      proxemicLabels: {
        'close-invasive': 'Cercana / Invasiva',
        comfortable: 'Distancia cómoda',
        'distant-guarded': 'Distante / Reservada',
      },
    },
    workspace: {
      scenarioCounter: 'Escenario {current} de {total}',
      timedModeLabel: '15s Contrarreloj',
      relaxedModeLabel: 'Sin prisa',
      secondsUnit: 's',
      timeExpiredLabel: 'Tiempo agotado — selecciona tu mejor observación',
      blindSpotActivePrefix: 'Repaso de punto ciego:',
      exitDrillButton: 'Volver al modo normal',
      keyboardHint: 'Teclas 1–4 para responder · Enter para avanzar',
      correctTitle: 'Observación precisa',
      incorrectTitle: 'Lectura imprecisa',
      whatToObserve: 'Qué observar',
      whyContextMatters: 'Por qué importa el contexto y la línea base',
      commonPitfall: 'Error común a evitar',
      nextScenario: 'Siguiente escenario',
      restartDeck: 'Reiniciar ronda',
      copyShareLink: 'Copiar enlace del ejercicio',
      linkCopied: 'Enlace copiado',
      roundCompleteTitle: 'Ronda completada',
      roundCompleteSummary: 'Revisa tu diagnóstico de puntos ciegos abajo o repite la serie.',
    },
    progress: {
      sectionTitle: 'Puntos Fuertes y Puntos Ciegos',
      sectionSubtitle: 'Guardado localmente en tu navegador. Detecta qué canales de señal requieren mayor calibración.',
      answeredLabel: 'Escenarios completados',
      accuracyLabel: 'Precisión global',
      avgResponseLabel: 'Tiempo medio',
      bestStreakLabel: 'Mejor racha',
      categoryBreakdownTitle: 'Precisión por categoría de señal',
      strengthBadge: 'Punto fuerte',
      blindSpotBadge: 'Punto ciego',
      balancedBadge: 'Calibrado',
      noDataYet: 'Completa al menos 1 escenario por categoría para activar el repaso de puntos ciegos.',
      practiceBlindSpotCta: 'Entrenar punto ciego',
      recentLogTitle: 'Observaciones recientes',
      resetButton: 'Reiniciar progreso local',
      resetConfirmPrompt: '¿Borrar todas las puntuaciones e historial?',
      resetConfirmYes: 'Sí, borrar datos',
      resetCancel: 'Cancelar',
      passLabel: 'Acierto',
      missLabel: 'Fallo',
    },
    ads: {
      disclosure: 'Publicidad / Patrocinado',
      slotMidLabel: 'Espacio contextual para anuncios (Media.net)',
      slotBottomLabel: 'Espacio inferior para anuncios (Media.net)',
    },
    footer: {
      disclaimer:
        'Educational training tool for practicing observation of nonverbal cues. Body language signals are probabilistic indicators and always depend on baseline and context, never definitive proof. (Herramienta educativa de entrenamiento: las señales no verbales son indicadores probabilísticos sujetos a línea base y contexto, nunca prueba definitiva).',
      copyright: 'CueLab · Entrenador de Observación No Verbal en el Navegador',
    },
    seo: {
      baseTitle: 'CueLab — Entrenador de Comunicación No Verbal y Quiz de Lenguaje Corporal',
      baseDescription:
        'Entrena la observación estructurada de señales faciales, postura, incongruencia verbal-gestual y línea base en un laboratorio 100 % local en tu navegador.',
    },
  },
  fr: {
    brandName: 'CueLab',
    navTrainer: 'Atelier',
    navDiagnostics: 'Diagnostic',
    navGuide: 'Guide',
    navFaq: 'FAQ',
    languageLabel: 'Langue',
    heroEyebrow: 'Entraînement local dans le navigateur · 28 scénarios interactifs',
    heroTitle: 'Entraîneur de Communication Non Verbale & Quiz Langage Corporel',
    heroSubtitle:
      'Exercez l’observation structurée des micro-signaux faciaux, des postures, des dissonances mots-gestes, du niveau de référence et des réponses assertives.',
    startSessionCta: 'Commencer',
    modes: {
      rapid: {
        label: 'Lecture Rapide des Signaux',
        shortLabel: 'Lecture Rapide',
        description: 'Identifiez les faisceaux d’indices avec minuteur optionnel ou en mode libre.',
        seoTitleSuffix: 'Lecture Rapide des Signaux',
      },
      mismatch: {
        label: 'Détecteur d’Incongruence',
        shortLabel: 'Incongruence',
        description: 'Confrontez les paroles explicites à la tension faciale, la posture et l’auto-apaisement.',
        seoTitleSuffix: 'Détecteur d’Incongruence',
      },
      baseline: {
        label: 'Contexte et Ligne de Base',
        shortLabel: 'Ligne de Base',
        description: 'Comparez deux scènes pour distinguer les facteurs environnementaux d’un changement émotionnel.',
        seoTitleSuffix: 'Contexte et Ligne de Base',
      },
      coach: {
        label: 'Coach de Réponse & Calibration',
        shortLabel: 'Coach Réponse',
        description: 'Choisissez la réponse verbale et non verbale adaptée aux situations tendues.',
        seoTitleSuffix: 'Coach de Réponse',
      },
    },
    categories: {
      facial: 'Visage et Regard',
      posture: 'Posture et Mains',
      mismatch: 'Congruence Mots-Gestes',
      context: 'Contexte et Proxémie',
    },
    stage: {
      zoomFull: 'Scène complète',
      zoomFace: 'Zoom visage',
      zoomHands: 'Mains et posture',
      cueMarkersOn: 'Masquer les repères',
      cueMarkersOff: 'Afficher les repères',
      sceneALabelDefault: 'Ligne de base / Contexte A',
      sceneBLabelDefault: 'Cible / Contexte B',
      spokenStatementLabel: 'Déclaration verbale',
      contextEnvLabels: {
        'office-desk': 'Bureau',
        'interview-table': 'Salle d’entretien',
        'cafe-table': 'Table de café',
        'negotiation-room': 'Salle de négociation',
        'standing-hall': 'Couloir / Debout',
      },
      proxemicLabels: {
        'close-invasive': 'Proche / Invasive',
        comfortable: 'Distance confortable',
        'distant-guarded': 'Distante / Réservée',
      },
    },
    workspace: {
      scenarioCounter: 'Scénario {current} sur {total}',
      timedModeLabel: 'Chrono 15s',
      relaxedModeLabel: 'Libre',
      secondsUnit: 's',
      timeExpiredLabel: 'Temps écoulé — choisissez votre meilleure observation',
      blindSpotActivePrefix: 'Session ciblée :',
      exitDrillButton: 'Quitter le ciblage',
      keyboardHint: 'Touches 1–4 pour répondre · Entrée pour continuer',
      correctTitle: 'Observation exacte',
      incorrectTitle: 'Lecture imprécise',
      whatToObserve: 'Ce qu’il faut observer',
      whyContextMatters: 'Pourquoi le contexte et la base comptent',
      commonPitfall: 'Erreur d’interprétation à éviter',
      nextScenario: 'Scénario suivant',
      restartDeck: 'Recommencer la série',
      copyShareLink: 'Partager cet exercice',
      linkCopied: 'Lien copié',
      roundCompleteTitle: 'Série terminée',
      roundCompleteSummary: 'Consultez votre diagnostic ci-dessous ou relancez une série.',
    },
    progress: {
      sectionTitle: 'Points Forts et Angles Morts',
      sectionSubtitle: 'Enregistré localement dans votre navigateur. Repérez les canaux à affiner.',
      answeredLabel: 'Scénarios complétés',
      accuracyLabel: 'Précision globale',
      avgResponseLabel: 'Temps moyen',
      bestStreakLabel: 'Meilleure série',
      categoryBreakdownTitle: 'Précision par canal',
      strengthBadge: 'Point fort',
      blindSpotBadge: 'Angle mort',
      balancedBadge: 'Équilibré',
      noDataYet: 'Complétez au moins 1 scénario par canal pour débloquer le ciblage.',
      practiceBlindSpotCta: 'Travailler l’angle mort',
      recentLogTitle: 'Observations récentes',
      resetButton: 'Réinitialiser les progrès',
      resetConfirmPrompt: 'Effacer tout l’historique local ?',
      resetConfirmYes: 'Oui, effacer',
      resetCancel: 'Annuler',
      passLabel: 'Juste',
      missLabel: 'Erreur',
    },
    ads: {
      disclosure: 'Publicité / Sponsorisé',
      slotMidLabel: 'Emplacement publicitaire contextuel (Media.net)',
      slotBottomLabel: 'Emplacement publicitaire inférieur (Media.net)',
    },
    footer: {
      disclaimer:
        'Outil éducatif pour s’exercer à l’observation des signaux non verbaux. Les indices corporels sont probabilistes et dépendent toujours de la ligne de base et du contexte, jamais d’une preuve absolue.',
      copyright: 'CueLab · Entraîneur d’Observation Non Verbale',
    },
    seo: {
      baseTitle: 'CueLab — Entraîneur de Communication Non Verbale & Quiz Langage Corporel',
      baseDescription:
        'Entraînez l’observation structurée du visage, de la posture, des incongruences mots-gestes et de la ligne de base 100 % localement.',
    },
  },
  de: {
    brandName: 'CueLab',
    navTrainer: 'Trainer',
    navDiagnostics: 'Diagnose',
    navGuide: 'Praxisleitfaden',
    navFaq: 'FAQ',
    languageLabel: 'Sprache',
    heroEyebrow: 'Lokales Beobachtungstraining im Browser · 28 interaktive Szenarien',
    heroTitle: 'Trainer für Nonverbale Kommunikation & Körpersprache-Quiz',
    heroSubtitle:
      'Trainieren Sie strukturierte Beobachtung von Mimik, Körperhaltung, Wort-Gestik-Diskrepanzen, Baseline-Kalibrierung und souveränen Reaktionen.',
    startSessionCta: 'Training starten',
    modes: {
      rapid: {
        label: 'Schnellanalyse von Signalen',
        shortLabel: 'Schnellanalyse',
        description: 'Erkennen Sie zentrale Signalcluster wahlweise mit Timer oder in Ruhe.',
        seoTitleSuffix: 'Schnellanalyse von Signalen',
      },
      mismatch: {
        label: 'Inkongruenz-Detektor',
        shortLabel: 'Inkongruenz',
        description: 'Vergleichen Sie gesprochene Aussagen mit Kieferanspannung, Haltung und Beruhigungsgesten.',
        seoTitleSuffix: 'Inkongruenz-Detektor',
      },
      baseline: {
        label: 'Kontext & Baseline-Check',
        shortLabel: 'Baseline-Check',
        description: 'Vergleichen Sie zwei Szenen, um Raumklima oder Müdigkeit von emotionalen Wechseln zu trennen.',
        seoTitleSuffix: 'Kontext & Baseline-Check',
      },
      coach: {
        label: 'Antwort- & Kalibrierungscoach',
        shortLabel: 'Antwortcoach',
        description: 'Wählen Sie die wirksamste verbale und nonverbale Reaktion für heikle Gespräche.',
        seoTitleSuffix: 'Antwort- & Kalibrierungscoach',
      },
    },
    categories: {
      facial: 'Mimik & Blick',
      posture: 'Haltung & Hände',
      mismatch: 'Wort-Gestik-Abgleich',
      context: 'Kontext & Proxemik',
    },
    stage: {
      zoomFull: 'Gesamtszene',
      zoomFace: 'Gesichtszoom',
      zoomHands: 'Hände & Haltung',
      cueMarkersOn: 'Marker ausblenden',
      cueMarkersOff: 'Marker einblenden',
      sceneALabelDefault: 'Baseline / Kontext A',
      sceneBLabelDefault: 'Zielszene / Kontext B',
      spokenStatementLabel: 'Gesprochene Aussage',
      contextEnvLabels: {
        'office-desk': 'Büroschreibtisch',
        'interview-table': 'Gesprächsraum',
        'cafe-table': 'Cafétisch',
        'negotiation-room': 'Verhandlungstisch',
        'standing-hall': 'Flur / Stehend',
      },
      proxemicLabels: {
        'close-invasive': 'Nah / Distanzlos',
        comfortable: 'Angenehmer Abstand',
        'distant-guarded': 'Distanziert / Zurückhaltend',
      },
    },
    workspace: {
      scenarioCounter: 'Szenario {current} von {total}',
      timedModeLabel: '15s Timer',
      relaxedModeLabel: 'Ohne Zeitlimit',
      secondsUnit: 's',
      timeExpiredLabel: 'Zeit abgelaufen — wählen Sie Ihre beste Beobachtung',
      blindSpotActivePrefix: 'Fokus-Training blinder Fleck:',
      exitDrillButton: 'Zurück zum Modus',
      keyboardHint: 'Tasten 1–4 zur Antwort · Enter für weiter',
      correctTitle: 'Präzise Beobachtung',
      incorrectTitle: 'Fehlinterpretation',
      whatToObserve: 'Worauf Sie achten sollten',
      whyContextMatters: 'Warum Baseline & Kontext entscheidend sind',
      commonPitfall: 'Typischer Deutungsfehler',
      nextScenario: 'Nächstes Szenario',
      restartDeck: 'Runde neu starten',
      copyShareLink: 'Übungslink teilen',
      linkCopied: 'Link kopiert',
      roundCompleteTitle: 'Runde abgeschlossen',
      roundCompleteSummary: 'Prüfen Sie unten Ihre Diagnose oder starten Sie eine neue Runde.',
    },
    progress: {
      sectionTitle: 'Stärken & Blinde Flecken',
      sectionSubtitle: 'Lokal im Browser gespeichert. Erkennen Sie, welche Signalkanäle Übung brauchen.',
      answeredLabel: 'Bearbeitete Szenarien',
      accuracyLabel: 'Gesamtgenauigkeit',
      avgResponseLabel: 'Ø Reaktionszeit',
      bestStreakLabel: 'Beste Serie',
      categoryBreakdownTitle: 'Genauigkeit nach Signalkanal',
      strengthBadge: 'Stärkster Kanal',
      blindSpotBadge: 'Blinder Fleck',
      balancedBadge: 'Ausbalanciert',
      noDataYet: 'Lösen Sie mindestens 1 Szenario pro Kanal für die Diagnose.',
      practiceBlindSpotCta: 'Blinden Fleck trainieren',
      recentLogTitle: 'Letzte Beobachtungen',
      resetButton: 'Fortschritt zurücksetzen',
      resetConfirmPrompt: 'Alle gespeicherten Ergebnisse löschen?',
      resetConfirmYes: 'Ja, löschen',
      resetCancel: 'Abbrechen',
      passLabel: 'Treffer',
      missLabel: 'Daneben',
    },
    ads: {
      disclosure: 'Anzeige / Gesponsert',
      slotMidLabel: 'Kontextueller Werbeplatz (Media.net)',
      slotBottomLabel: 'Unterer Werbeplatz (Media.net)',
    },
    footer: {
      disclaimer:
        'Bildungstool zum Trainieren der Beobachtung nonverbaler Signale. Körpersprachliche Hinweise sind probabilistische Indikatoren und hängen stets von Baseline und Kontext ab – niemals ein endgültiger Beweis.',
      copyright: 'CueLab · Lokaler Trainer für Nonverbale Kommunikation',
    },
    seo: {
      baseTitle: 'CueLab — Trainer für Nonverbale Kommunikation & Körpersprache-Quiz',
      baseDescription:
        'Trainieren Sie strukturierte Beobachtung von Mimik, Haltung, Wort-Gestik-Inkongruenz und Baseline-Kalibrierung komplett lokal im Browser.',
    },
  },
  pt: {
    brandName: 'CueLab',
    navTrainer: 'Treinador',
    navDiagnostics: 'Diagnóstico',
    navGuide: 'Guia Prático',
    navFaq: 'FAQ',
    languageLabel: 'Idioma',
    heroEyebrow: 'Treino observacional local no navegador · 28 cenários interativos',
    heroTitle: 'Treinador de Comunicação Não Verbal e Quiz de Linguagem Corporal',
    heroSubtitle:
      'Pratique a observação estruturada de microexpressões faciais, postura, incongruência entre fala e gesto, linha de base e respostas assertivas.',
    startSessionCta: 'Começar treino',
    modes: {
      rapid: {
        label: 'Leitura Rápida de Sinais',
        shortLabel: 'Leitura Rápida',
        description: 'Identifique conjuntos de sinais com cronômetro opcional ou estudo calmo.',
        seoTitleSuffix: 'Leitura Rápida de Sinais',
      },
      mismatch: {
        label: 'Detector de Incongruência',
        shortLabel: 'Incongruência',
        description: 'Compare frases explícitas com tensão mandibular, postura e gestos de apaziguamento.',
        seoTitleSuffix: 'Detector de Incongruência',
      },
      baseline: {
        label: 'Contexto e Linha de Base',
        shortLabel: 'Linha de Base',
        description: 'Compare duas cenas para separar fatores físicos do ambiente de mudanças emocionais.',
        seoTitleSuffix: 'Contexto e Linha de Base',
      },
      coach: {
        label: 'Treinador de Resposta',
        shortLabel: 'Respostas',
        description: 'Escolha a resposta verbal e não verbal mais calibrada em interações tensas.',
        seoTitleSuffix: 'Treinador de Resposta',
      },
    },
    categories: {
      facial: 'Rosto e Olhar',
      posture: 'Postura e Mãos',
      mismatch: 'Congruência Fala-Gesto',
      context: 'Contexto e Proxêmica',
    },
    stage: {
      zoomFull: 'Cena completa',
      zoomFace: 'Zoom rosto',
      zoomHands: 'Mãos e postura',
      cueMarkersOn: 'Ocultar marcadores',
      cueMarkersOff: 'Mostrar marcadores',
      sceneALabelDefault: 'Linha de base / Contexto A',
      sceneBLabelDefault: 'Alvo / Contexto B',
      spokenStatementLabel: 'Declaração verbal',
      contextEnvLabels: {
        'office-desk': 'Mesa de escritório',
        'interview-table': 'Sala de entrevista',
        'cafe-table': 'Mesa de café',
        'negotiation-room': 'Mesa de negociação',
        'standing-hall': 'Corredor / Em pé',
      },
      proxemicLabels: {
        'close-invasive': 'Próxima / Invasiva',
        comfortable: 'Distância confortável',
        'distant-guarded': 'Distante / Reservada',
      },
    },
    workspace: {
      scenarioCounter: 'Cenário {current} de {total}',
      timedModeLabel: '15s Cronometrado',
      relaxedModeLabel: 'Sem pressa',
      secondsUnit: 's',
      timeExpiredLabel: 'Tempo esgotado — escolha sua melhor observação',
      blindSpotActivePrefix: 'Treino de ponto cego:',
      exitDrillButton: 'Voltar ao modo',
      keyboardHint: 'Teclas 1–4 para responder · Enter para avançar',
      correctTitle: 'Observação precisa',
      incorrectTitle: 'Leitura imprecisa',
      whatToObserve: 'O que observar',
      whyContextMatters: 'Por que linha de base e contexto importam',
      commonPitfall: 'Erro comum a evitar',
      nextScenario: 'Próximo cenário',
      restartDeck: 'Reiniciar série',
      copyShareLink: 'Compartilhar exercício',
      linkCopied: 'Link copiado',
      roundCompleteTitle: 'Série concluída',
      roundCompleteSummary: 'Veja seu diagnóstico de pontos cegos abaixo ou reinicie a série.',
    },
    progress: {
      sectionTitle: 'Pontos Fortes e Pontos Cegos',
      sectionSubtitle: 'Salvo localmente no navegador. Descubra quais canais exigem melhor calibração.',
      answeredLabel: 'Cenários concluídos',
      accuracyLabel: 'Precisão geral',
      avgResponseLabel: 'Tempo médio',
      bestStreakLabel: 'Melhor sequência',
      categoryBreakdownTitle: 'Precisão por canal de sinal',
      strengthBadge: 'Ponto forte',
      blindSpotBadge: 'Ponto cego',
      balancedBadge: 'Calibrado',
      noDataYet: 'Conclua ao menos 1 cenário por categoria para ativar o diagnóstico.',
      practiceBlindSpotCta: 'Treinar ponto cego',
      recentLogTitle: 'Observações recentes',
      resetButton: 'Limpar progresso local',
      resetConfirmPrompt: 'Apagar todas as pontuações salvas?',
      resetConfirmYes: 'Sim, apagar',
      resetCancel: 'Cancelar',
      passLabel: 'Acerto',
      missLabel: 'Erro',
    },
    ads: {
      disclosure: 'Publicidade / Patrocinado',
      slotMidLabel: 'Espaço publicitário contextual (Media.net)',
      slotBottomLabel: 'Espaço publicitário inferior (Media.net)',
    },
    footer: {
      disclaimer:
        'Ferramenta educacional para praticar a observação de sinais não verbais. Indicadores corporais são probabilísticos e dependem sempre de linha de base e contexto, nunca prova definitiva.',
      copyright: 'CueLab · Treinador Local de Observação Não Verbal',
    },
    seo: {
      baseTitle: 'CueLab — Treinador de Comunicação Não Verbal e Quiz de Linguagem Corporal',
      baseDescription:
        'Treine a observação estruturada de sinais faciais, postura, incongruência fala-gesto e linha de base 100% localmente no navegador.',
    },
  },
  ru: {
    brandName: 'CueLab',
    navTrainer: 'Тренажёр',
    navDiagnostics: 'Диагностика',
    navGuide: 'Руководство',
    navFaq: 'Вопросы',
    languageLabel: 'Язык',
    heroEyebrow: 'Локальная тренировка в браузере · 28 интерактивных сценариев',
    heroTitle: 'Тренажёр невербальной коммуникации и тест по языку тела',
    heroSubtitle:
      'Тренируйте структурное наблюдение за мимикой, позой, несоответствием слов и жестов, базовой линией и уверенными ответами без догадок.',
    startSessionCta: 'Начать тренировку',
    modes: {
      rapid: {
        label: 'Быстрое чтение сигналов',
        shortLabel: 'Быстрый разбор',
        description: 'Определяйте ключевые кластеры сигналов на время или в спокойном режиме.',
        seoTitleSuffix: 'Быстрое чтение сигналов',
      },
      mismatch: {
        label: 'Детектор несоответствий',
        shortLabel: 'Несоответствия',
        description: 'Сопоставляйте сказанные слова с напряжением челюсти, позой и жестами самоуспокоения.',
        seoTitleSuffix: 'Детектор несоответствий',
      },
      baseline: {
        label: 'Контекст и базовая линия',
        shortLabel: 'Базовая линия',
        description: 'Сравнивайте две сцены, чтобы отличать физический дискомфорт от эмоционального сдвига.',
        seoTitleSuffix: 'Контекст и базовая линия',
      },
      coach: {
        label: 'Тренер калибровки ответа',
        shortLabel: 'Тренер ответа',
        description: 'Выбирайте оптимальную вербальную и невербальную реакцию в напряжённых ситуациях.',
        seoTitleSuffix: 'Тренер калибровки ответа',
      },
    },
    categories: {
      facial: 'Мимика и взгляд',
      posture: 'Поза и руки',
      mismatch: 'Согласованность слов и жестов',
      context: 'Контекст и проксемика',
    },
    stage: {
      zoomFull: 'Вся сцена',
      zoomFace: 'Лицо крупно',
      zoomHands: 'Руки и поза',
      cueMarkersOn: 'Скрыть маркеры',
      cueMarkersOff: 'Показать маркеры',
      sceneALabelDefault: 'Базовая линия / Контекст A',
      sceneBLabelDefault: 'Цель / Контекст B',
      spokenStatementLabel: 'Реплика',
      contextEnvLabels: {
        'office-desk': 'Офисный стол',
        'interview-table': 'Переговорная (интервью)',
        'cafe-table': 'Столик в кафе',
        'negotiation-room': 'Стол переговоров',
        'standing-hall': 'Коридор / Стоя',
      },
      proxemicLabels: {
        'close-invasive': 'Слишком близко',
        comfortable: 'Комфортная дистанция',
        'distant-guarded': 'Закрытая дистанция',
      },
    },
    workspace: {
      scenarioCounter: 'Сценарий {current} из {total}',
      timedModeLabel: 'Таймер 15с',
      relaxedModeLabel: 'Без таймера',
      secondsUnit: 'с',
      timeExpiredLabel: 'Время вышло — выберите лучший вариант',
      blindSpotActivePrefix: 'Тренировка слепой зоны:',
      exitDrillButton: 'Вернуться в режим',
      keyboardHint: 'Клавиши 1–4 для ответа · Enter — далее',
      correctTitle: 'Точное наблюдение',
      incorrectTitle: 'Неточное чтение',
      whatToObserve: 'На что обратить внимание',
      whyContextMatters: 'Почему важны базовая линия и контекст',
      commonPitfall: 'Типичная ошибка трактовки',
      nextScenario: 'Следующий сценарий',
      restartDeck: 'Начать заново',
      copyShareLink: 'Поделиться упражнением',
      linkCopied: 'Ссылка скопирована',
      roundCompleteTitle: 'Серия завершена',
      roundCompleteSummary: 'Изучите диагностику слепых зон ниже или пройдите серию ещё раз.',
    },
    progress: {
      sectionTitle: 'Сильные стороны и слепые зоны',
      sectionSubtitle: 'Сохраняется локально в браузере. Узнайте, какие каналы сигналов требуют калибровки.',
      answeredLabel: 'Пройдено сценариев',
      accuracyLabel: 'Общая точность',
      avgResponseLabel: 'Среднее время',
      bestStreakLabel: 'Лучшая серия',
      categoryBreakdownTitle: 'Точность по каналам сигналов',
      strengthBadge: 'Сильная сторона',
      blindSpotBadge: 'Слепая зона',
      balancedBadge: 'Сбалансировано',
      noDataYet: 'Пройдите хотя бы по 1 сценарию в каждом канале для диагностики.',
      practiceBlindSpotCta: 'Тренировать слепую зону',
      recentLogTitle: 'Недавние ответы',
      resetButton: 'Сбросить прогресс',
      resetConfirmPrompt: 'Удалить всю сохранённую статистику?',
      resetConfirmYes: 'Да, очистить',
      resetCancel: 'Отмена',
      passLabel: 'Верно',
      missLabel: 'Промах',
    },
    ads: {
      disclosure: 'Реклама / Партнёрский блок',
      slotMidLabel: 'Контекстный рекламный блок (Media.net)',
      slotBottomLabel: 'Нижний рекламный блок (Media.net)',
    },
    footer: {
      disclaimer:
        'Образовательный тренажёр для практики наблюдения за невербальными сигналами. Сигналы языка тела носят вероятностный характер и всегда зависят от базовой линии и контекста, а не служат доказательством.',
      copyright: 'CueLab · Локальный тренажёр невербального наблюдения',
    },
    seo: {
      baseTitle: 'CueLab — Тренажёр невербальной коммуникации и тест по языку тела',
      baseDescription:
        'Практикуйте структурное наблюдение за мимикой, позой, расхождением слов и жестов и базовой линией в браузерном тренажёре без регистрации.',
    },
  },
  hi: {
    brandName: 'CueLab',
    navTrainer: 'प्रशिक्षक',
    navDiagnostics: 'विश्लेषण',
    navGuide: 'मार्गदर्शिका',
    navFaq: 'प्रश्नोत्तर',
    languageLabel: 'भाषा',
    heroEyebrow: 'ब्राउज़र-आधारित अवलोकन प्रशिक्षण · 28 संवादात्मक परिदृश्य',
    heroTitle: 'गैर-मौखिक संचार प्रशिक्षक और बॉडी लैंग्वेज क्विज़',
    heroSubtitle:
      'चेहरे के सूक्ष्म संकेतों, मुद्रा परिवर्तन, कथन-मुद्रा विरोधाभास, बेसलाइन संतुलन और सधे हुए उत्तरों का संरचित अभ्यास करें।',
    startSessionCta: 'प्रशिक्षण शुरू करें',
    modes: {
      rapid: {
        label: 'त्वरित संकेत पहचान',
        shortLabel: 'त्वरित पहचान',
        description: 'वैकल्पिक टाइमर या शांत अध्ययन मोड में प्रमुख संकेत समूहों को पहचानें।',
        seoTitleSuffix: 'त्वरित संकेत पहचान',
      },
      mismatch: {
        label: 'असंगति / सामंजस्य प्रयोगशाला',
        shortLabel: 'असंगति जांच',
        description: 'कहे गए शब्दों की तुलना जबड़े के तनाव, मुद्रा और आत्म-शांति संकेतों से करें।',
        seoTitleSuffix: 'असंगति प्रयोगशाला',
      },
      baseline: {
        label: 'संदर्भ और बेसलाइन चुनौती',
        shortLabel: 'बेसलाइन जांच',
        description: 'भौतिक वातावरण की आदतों को भावनात्मक बदलाव से अलग करने के लिए दो दृश्य देखें।',
        seoTitleSuffix: 'संदर्भ और बेसलाइन',
      },
      coach: {
        label: 'प्रतिक्रिया और संतुलन कोच',
        shortLabel: 'प्रतिक्रिया कोच',
        description: 'तनावपूर्ण वास्तविक स्थितियों के लिए श्रेष्ठ मौखिक और गैर-मौखिक प्रतिक्रिया चुनें।',
        seoTitleSuffix: 'प्रतिक्रिया कोच',
      },
    },
    categories: {
      facial: 'चेहरा और दृष्टि',
      posture: 'मुद्रा और हाथ',
      mismatch: 'शब्द-संकेत सामंजस्य',
      context: 'संदर्भ और दूरी',
    },
    stage: {
      zoomFull: 'पूरा दृश्य',
      zoomFace: 'चेहरा ज़ूम',
      zoomHands: 'हाथ और मुद्रा',
      cueMarkersOn: 'संकेत चिह्न छिपाएं',
      cueMarkersOff: 'संकेत चिह्न दिखाएं',
      sceneALabelDefault: 'बेसलाइन / संदर्भ A',
      sceneBLabelDefault: 'लक्ष्य / संदर्भ B',
      spokenStatementLabel: 'बोला गया कथन',
      contextEnvLabels: {
        'office-desk': 'कार्यालय डेस्क',
        'interview-table': 'साक्षात्कार कक्ष',
        'cafe-table': 'कैफ़े टेबल',
        'negotiation-room': 'वार्ता मेज़',
        'standing-hall': 'गलियारा / खड़े होकर',
      },
      proxemicLabels: {
        'close-invasive': 'अत्यधिक निकट',
        comfortable: 'सहज दूरी',
        'distant-guarded': 'दूर / सतर्क',
      },
    },
    workspace: {
      scenarioCounter: 'परिदृश्य {current} / {total}',
      timedModeLabel: '15 सेकंड टाइमर',
      relaxedModeLabel: 'आराम से',
      secondsUnit: 'से',
      timeExpiredLabel: 'समय समाप्त — अपना श्रेष्ठ अवलोकन चुनें',
      blindSpotActivePrefix: 'कमज़ोर पक्ष अभ्यास:',
      exitDrillButton: 'सामान्य मोड पर लौटें',
      keyboardHint: 'उत्तर के लिए 1–4 दबाएं · आगे बढ़ने के लिए Enter',
      correctTitle: 'सटीक अवलोकन',
      incorrectTitle: 'संकेत पढ़ने में चूक',
      whatToObserve: 'क्या देखें',
      whyContextMatters: 'बेसलाइन और संदर्भ क्यों महत्वपूर्ण हैं',
      commonPitfall: 'आम गलतफहमी से बचें',
      nextScenario: 'अगला परिदृश्य',
      restartDeck: 'फिर से शुरू करें',
      copyShareLink: 'अभ्यास लिंक साझा करें',
      linkCopied: 'लिंक कॉपी हो गया',
      roundCompleteTitle: 'दौर पूरा हुआ',
      roundCompleteSummary: 'नीचे अपना कमज़ोर पक्ष विश्लेषण देखें या नया अभ्यास शुरू करें।',
    },
    progress: {
      sectionTitle: 'मजबूत पक्ष और कमज़ोर बिंदु',
      sectionSubtitle: 'आपके ब्राउज़र में स्थानीय रूप से सहेजा गया। जानें किन संकेतों पर अधिक ध्यान देना है।',
      answeredLabel: 'पूर्ण परिदृश्य',
      accuracyLabel: 'कुल सटीकता',
      avgResponseLabel: 'औसत प्रतिक्रिया समय',
      bestStreakLabel: 'सर्वश्रेष्ठ क्रम',
      categoryBreakdownTitle: 'संकेत श्रेणी के अनुसार सटीकता',
      strengthBadge: 'सबसे मजबूत',
      blindSpotBadge: 'सुधार क्षेत्र',
      balancedBadge: 'संतुलित',
      noDataYet: 'विश्लेषण अनलॉक करने के लिए प्रत्येक श्रेणी में कम से कम 1 परिदृश्य पूरा करें।',
      practiceBlindSpotCta: 'कमज़ोर बिंदु का अभ्यास करें',
      recentLogTitle: 'हाल के अवलोकन',
      resetButton: 'स्थानीय प्रगति रीसेट करें',
      resetConfirmPrompt: 'सभी सहेजे गए स्कोर हटाएं?',
      resetConfirmYes: 'हाँ, हटाएं',
      resetCancel: 'रद्द करें',
      passLabel: 'सही',
      missLabel: 'चूक',
    },
    ads: {
      disclosure: 'विज्ञापन / प्रायोजित',
      slotMidLabel: 'प्रासंगिक विज्ञापन स्थान (Media.net)',
      slotBottomLabel: 'निचला विज्ञापन स्थान (Media.net)',
    },
    footer: {
      disclaimer:
        'गैर-मौखिक संकेतों के अवलोकन का अभ्यास करने के लिए शैक्षिक प्रशिक्षण उपकरण। शारीरिक भाषा के संकेत संभाव्य सूचक होते हैं और हमेशा बेसलाइन तथा संदर्भ पर निर्भर करते हैं, कभी अंतिम प्रमाण नहीं।',
      copyright: 'CueLab · ब्राउज़र-स्थानीय गैर-मौखिक अवलोकन प्रशिक्षक',
    },
    seo: {
      baseTitle: 'CueLab — गैर-मौखिक संचार प्रशिक्षक और बॉडी लैंग्वेज क्विज़',
      baseDescription:
        'इस 100% ब्राउज़र-स्थानीय प्रशिक्षण प्रयोगशाला में चेहरे के संकेतों, मुद्रा, शब्द-संकेत असंगति और बेसलाइन संतुलन का अभ्यास करें।',
    },
  },
  ar: {
    brandName: 'CueLab',
    navTrainer: 'المدرب',
    navDiagnostics: 'التشخيص',
    navGuide: 'الدليل العملي',
    navFaq: 'الأسئلة',
    languageLabel: 'اللغة',
    heroEyebrow: 'تدريب ملاحظة محلي بالكامل في المتصفح · 28 سيناريو تفاعلياً',
    heroTitle: 'مدرب التواصل غير اللفظي واختبار لغة الجسد',
    heroSubtitle:
      'تدرّب على الملاحظة المنهجية لإشارات الوجه، وتغير الوضعية، والتناقض بين القول والإيماءة، ومعايرة خط الأساس، والاستجابة الواثقة دون تخمين.',
    startSessionCta: 'ابدأ التدريب',
    modes: {
      rapid: {
        label: 'قراءة الإشارات السريعة',
        shortLabel: 'قراءة سريعة',
        description: 'حدّد حزم الإشارات الأساسية مع مؤقت اختياري أو في وضع الدراسة الهادئة.',
        seoTitleSuffix: 'قراءة الإشارات السريعة',
      },
      mismatch: {
        label: 'مختبر التناقض والاتساق',
        shortLabel: 'كشف التناقض',
        description: 'قارن العبارات المنطوقة الصريحة بتوتر الفك والوضعية وإيماءات التهدئة الذاتية.',
        seoTitleSuffix: 'مختبر التناقض والاتساق',
      },
      baseline: {
        label: 'تحدي السياق وخط الأساس',
        shortLabel: 'خط الأساس',
        description: 'قارن بين مشهدين لفصل العادات البيئية عن التحولات الانفعالية الحقيقية.',
        seoTitleSuffix: 'السياق وخط الأساس',
      },
      coach: {
        label: 'مدرب المعايرة والاستجابة',
        shortLabel: 'مدرب الاستجابة',
        description: 'اختر الاستجابة اللفظية وغير اللفظية الأنسب للمواقف الواقعية المتوترة.',
        seoTitleSuffix: 'مدرب المعايرة والاستجابة',
      },
    },
    categories: {
      facial: 'الوجه والنظرة',
      posture: 'الوضعية واليدان',
      mismatch: 'تطابق القول والإيماءة',
      context: 'السياق والمسافة الشخصية',
    },
    stage: {
      zoomFull: 'المشهد الكامل',
      zoomFace: 'تكبير الوجه',
      zoomHands: 'اليدان والوضعية',
      cueMarkersOn: 'إخفاء المؤشرات',
      cueMarkersOff: 'إظهار المؤشرات',
      sceneALabelDefault: 'خط الأساس / السياق أ',
      sceneBLabelDefault: 'الهدف / السياق ب',
      spokenStatementLabel: 'العبارة المنطوقة',
      contextEnvLabels: {
        'office-desk': 'مكتب عمل',
        'interview-table': 'غرفة مقابلة',
        'cafe-table': 'طاولة مقهى',
        'negotiation-room': 'طاولة تفاوض',
        'standing-hall': 'ممر / وقوفاً',
      },
      proxemicLabels: {
        'close-invasive': 'قريبة / مقتحمة',
        comfortable: 'مسافة مريحة',
        'distant-guarded': 'متباعدة / متحفظة',
      },
    },
    workspace: {
      scenarioCounter: 'السيناريو {current} من {total}',
      timedModeLabel: 'مؤقت 15 ثانية',
      relaxedModeLabel: 'دون مؤقت',
      secondsUnit: 'ث',
      timeExpiredLabel: 'انتهى الوقت — اختر أفضل ملاحظة',
      blindSpotActivePrefix: 'تدريب نقطة الضعف:',
      exitDrillButton: 'العودة إلى الوضع',
      keyboardHint: 'الأرقام 1–4 للإجابة · Enter للتالي',
      correctTitle: 'ملاحظة دقيقة',
      incorrectTitle: 'قراءة غير دقيقة',
      whatToObserve: 'ما الذي يجب ملاحظته',
      whyContextMatters: 'لماذا يهم خط الأساس والسياق',
      commonPitfall: 'خطأ شائع يجب تجنبه',
      nextScenario: 'السيناريو التالي',
      restartDeck: 'إعادة المجموعة',
      copyShareLink: 'مشاركة رابط التمرين',
      linkCopied: 'تم نسخ الرابط',
      roundCompleteTitle: 'اكتملت المجموعة',
      roundCompleteSummary: 'راجع تشخيص نقاط الضعف أدناه أو أعد بدء الجولة.',
    },
    progress: {
      sectionTitle: 'نقاط القوة ونقاط الضعف',
      sectionSubtitle: 'محفوظ محلياً في متصفحك. اكتشف قنوات الإشارات التي تحتاج إلى معايرة أدق.',
      answeredLabel: 'السيناريوهات المكتملة',
      accuracyLabel: 'الدقة الإجمالية',
      avgResponseLabel: 'متوسط زمن الاستجابة',
      bestStreakLabel: 'أفضل سلسلة',
      categoryBreakdownTitle: 'الدقة حسب قناة الإشارة',
      strengthBadge: 'نقطة القوة',
      blindSpotBadge: 'نقطة عمياء',
      balancedBadge: 'متوازن',
      noDataYet: 'أكمل سيناريو واحداً على الأقل في كل قناة لتفعيل التشخيص.',
      practiceBlindSpotCta: 'تدرّب على النقطة العمياء',
      recentLogTitle: 'الملاحظات الأخيرة',
      resetButton: 'إعادة تعيين التقدم',
      resetConfirmPrompt: 'هل تريد مسح جميع النتائج المحفوظة؟',
      resetConfirmYes: 'نعم، امسح البيانات',
      resetCancel: 'إلغاء',
      passLabel: 'صحيح',
      missLabel: 'خطأ',
    },
    ads: {
      disclosure: 'إعلان / محتوى مدعوم',
      slotMidLabel: 'مساحة إعلانية سياقية (Media.net)',
      slotBottomLabel: 'مساحة إعلانية سفلية (Media.net)',
    },
    footer: {
      disclaimer:
        'أداة تدريب تعليمية لممارسة ملاحظة الإشارات غير اللفظية. إشارات لغة الجسد مؤشرات احتمالية تعتمد دائماً على خط الأساس والسياق، وليست دليلاً قاطعاً أبداً.',
      copyright: 'CueLab · مدرب الملاحظة غير اللفظية المحلي',
    },
    seo: {
      baseTitle: 'CueLab — مدرب التواصل غير اللفظي واختبار لغة الجسد',
      baseDescription:
        'تدرّب على الملاحظة المنهجية لإشارات الوجه والوضعية وتناقض القول مع الإيماءة ومعايرة خط الأساس محلياً بالكامل في متصفحك.',
    },
  },
  zh: {
    brandName: 'CueLab',
    navTrainer: '训练器',
    navDiagnostics: '盲区诊断',
    navGuide: '观察指南',
    navFaq: '常见问题',
    languageLabel: '语言',
    heroEyebrow: '浏览器本地观察训练 · 28 个交互情境',
    heroTitle: '非语言沟通训练器与肢体语言测验',
    heroSubtitle:
      '系统训练面部微表情、体态手势、言行不一致识别、基线校准与高情商回应，告别主观臆断。',
    startSessionCta: '开始训练',
    modes: {
      rapid: {
        label: '快速信号捕捉',
        shortLabel: '快速捕捉',
        description: '在可选 15 秒倒计时或舒缓模式下，识别核心非语言信号簇。',
        seoTitleSuffix: '快速信号捕捉',
      },
      mismatch: {
        label: '言行不一致实验室',
        shortLabel: '言行对照',
        description: '将明确说出的话语与下颌紧张、躯干朝向和自我安抚动作进行比对。',
        seoTitleSuffix: '言行不一致实验室',
      },
      baseline: {
        label: '情境与基线校准',
        shortLabel: '基线校准',
        description: '对比两组场景，学会区分环境习惯与真实的情绪变化。',
        seoTitleSuffix: '情境与基线校准',
      },
      coach: {
        label: '情境校准与回应教练',
        shortLabel: '回应教练',
        description: '为真实高压对话选择最能缓和气氛或稳健立场的言行组合。',
        seoTitleSuffix: '情境回应教练',
      },
    },
    categories: {
      facial: '面部与眼神',
      posture: '体态与手势',
      mismatch: '言行一致性',
      context: '情境与空间距离',
    },
    stage: {
      zoomFull: '全景视图',
      zoomFace: '面部特写',
      zoomHands: '手势与体态',
      cueMarkersOn: '隐藏线索标记',
      cueMarkersOff: '显示线索标记',
      sceneALabelDefault: '基线 / 情境 A',
      sceneBLabelDefault: '目标 / 情境 B',
      spokenStatementLabel: '口头陈述',
      contextEnvLabels: {
        'office-desk': '办公桌',
        'interview-table': '面试室',
        'cafe-table': '咖啡桌',
        'negotiation-room': '谈判桌',
        'standing-hall': '走廊 / 站姿交谈',
      },
      proxemicLabels: {
        'close-invasive': '过近 / 压迫感',
        comfortable: '舒适距离',
        'distant-guarded': '疏远 / 防备',
      },
    },
    workspace: {
      scenarioCounter: '第 {current} 题 / 共 {total} 题',
      timedModeLabel: '15秒限时',
      relaxedModeLabel: '自由节奏',
      secondsUnit: '秒',
      timeExpiredLabel: '计时结束 — 请选择你的最佳判断',
      blindSpotActivePrefix: '盲区专项训练：',
      exitDrillButton: '返回模式列表',
      keyboardHint: '按数字键 1–4 作答 · 回车键进入下一题',
      correctTitle: '观察准确',
      incorrectTitle: '信号误判',
      whatToObserve: '观察重点',
      whyContextMatters: '为什么基线与情境至关重要',
      commonPitfall: '需避免的常见误读',
      nextScenario: '下一题',
      restartDeck: '重新开始本组',
      copyShareLink: '复制练习链接',
      linkCopied: '链接已复制',
      roundCompleteTitle: '本组练习完成',
      roundCompleteSummary: '查看下方的强弱项诊断，或再次巩固练习。',
    },
    progress: {
      sectionTitle: '强项与盲区诊断',
      sectionSubtitle: '数据完全保存在本地浏览器中，帮助你发现最需校准的信号维度。',
      answeredLabel: '已完成题数',
      accuracyLabel: '综合准确率',
      avgResponseLabel: '平均反应时间',
      bestStreakLabel: '最高连对',
      categoryBreakdownTitle: '各信号维度准确率',
      strengthBadge: '优势维度',
      blindSpotBadge: '重点盲区',
      balancedBadge: '均衡',
      noDataYet: '每个维度至少完成 1 题后即可开启盲区专项训练。',
      practiceBlindSpotCta: '专项突破盲区',
      recentLogTitle: '近期观察记录',
      resetButton: '重置本地进度',
      resetConfirmPrompt: '确定清除所有本地成绩与记录吗？',
      resetConfirmYes: '确认清除',
      resetCancel: '取消',
      passLabel: '正确',
      missLabel: '偏差',
    },
    ads: {
      disclosure: '广告 / 赞助内容',
      slotMidLabel: '上下文广告位（Media.net 就绪）',
      slotBottomLabel: '底部展示广告位（Media.net 就绪）',
    },
    footer: {
      disclaimer:
        '用于练习非语言信号观察的教育训练工具。肢体语言信号仅为概率性参考，始终依赖个人基线与当下情境，绝非绝对证据。',
      copyright: 'CueLab · 浏览器本地非语言观察训练器',
    },
    seo: {
      baseTitle: 'CueLab — 非语言沟通训练器与肢体语言测验',
      baseDescription:
        '在 100% 本地运行的互动训练室中，系统练习面部微表情、体态手势、言行不一致识别与基线校准。',
    },
  },
  ja: {
    brandName: 'CueLab',
    navTrainer: 'トレーナー',
    navDiagnostics: '診断',
    navGuide: '観察ガイド',
    navFaq: 'FAQ',
    languageLabel: '言語',
    heroEyebrow: 'ブラウザ完結型・観察トレーニング · 全28シナリオ',
    heroTitle: '非言語コミュニケーション・トレーナー＆ボディランゲージ・クイズ',
    heroSubtitle:
      '表情の微細なサイン、姿勢の変化、言動の不一致、ベースライン比較、そして落ち着いた対応力を、思い込みに頼らず体系的に鍛えます。',
    startSessionCta: 'トレーニング開始',
    modes: {
      rapid: {
        label: 'ラピッド・キュー観察',
        shortLabel: '高速観察',
        description: '15秒タイマーまたはリラックスモードで、主要な非言語サイン群を見抜きます。',
        seoTitleSuffix: 'ラピッド・キュー観察',
      },
      mismatch: {
        label: '言動不一致ラボ',
        shortLabel: '不一致ラボ',
        description: '発話内容と顎の緊張、体の向き、自己鎮静仕草のズレを比較します。',
        seoTitleSuffix: '言動不一致ラボ',
      },
      baseline: {
        label: '文脈＆ベースライン比較',
        shortLabel: 'ベースライン',
        description: '2つのシーンを並べて、環境要因や癖と感情変化を切り分ける力を養います。',
        seoTitleSuffix: '文脈＆ベースライン比較',
      },
      coach: {
        label: '状況対応＆キャリブレーション',
        shortLabel: '対応コーチ',
        description: '緊張感のある場面で、最も効果的に場を和らげ境界を守る言動を選びます。',
        seoTitleSuffix: '状況対応コーチ',
      },
    },
    categories: {
      facial: '表情と視線',
      posture: '姿勢と手元',
      mismatch: '言葉と仕草の一致',
      context: '文脈と対人距離',
    },
    stage: {
      zoomFull: '全体シーン',
      zoomFace: '顔ズーム',
      zoomHands: '手元・姿勢',
      cueMarkersOn: '注目ポイントを隠す',
      cueMarkersOff: '注目ポイントを表示',
      sceneALabelDefault: 'ベースライン / 文脈 A',
      sceneBLabelDefault: '観察対象 / 文脈 B',
      spokenStatementLabel: '発話内容',
      contextEnvLabels: {
        'office-desk': 'オフィスデスク',
        'interview-table': '面談室',
        'cafe-table': 'カフェテーブル',
        'negotiation-room': '交渉テーブル',
        'standing-hall': '廊下・立ち話',
      },
      proxemicLabels: {
        'close-invasive': '近すぎ・圧迫',
        comfortable: '適切な距離',
        'distant-guarded': '遠め・警戒',
      },
    },
    workspace: {
      scenarioCounter: 'シナリオ {current} / {total}',
      timedModeLabel: '15秒制限',
      relaxedModeLabel: '時間制限なし',
      secondsUnit: '秒',
      timeExpiredLabel: '時間切れ — 最も適切な観察を選んでください',
      blindSpotActivePrefix: '弱点集中ドリル:',
      exitDrillButton: '通常モードに戻る',
      keyboardHint: '1〜4キーで回答 · Enterで次へ',
      correctTitle: '的確な観察です',
      incorrectTitle: '解釈がずれています',
      whatToObserve: '観察すべきポイント',
      whyContextMatters: 'ベースラインと文脈が重要な理由',
      commonPitfall: '避けるべき誤解',
      nextScenario: '次のシナリオ',
      restartDeck: 'このモードをやり直す',
      copyShareLink: '演習リンクをコピー',
      linkCopied: 'コピーしました',
      roundCompleteTitle: 'セット完了',
      roundCompleteSummary: '下の強み・盲点診断を確認するか、もう一度挑戦できます。',
    },
    progress: {
      sectionTitle: '強みと盲点の診断',
      sectionSubtitle: 'ブラウザ内にローカル保存されます。どの観察チャネルを強化すべきか把握しましょう。',
      answeredLabel: '完了シナリオ数',
      accuracyLabel: '総合正答率',
      avgResponseLabel: '平均回答時間',
      bestStreakLabel: '最高連続正解',
      categoryBreakdownTitle: 'チャネル別正答率',
      strengthBadge: '得意分野',
      blindSpotBadge: '優先強化ポイント',
      balancedBadge: 'バランス良好',
      noDataYet: '各カテゴリで1問以上回答すると弱点集中ドリルが解放されます。',
      practiceBlindSpotCta: '弱点を集中練習',
      recentLogTitle: '最近の回答履歴',
      resetButton: 'ローカル履歴をリセット',
      resetConfirmPrompt: '保存されたスコアをすべて消去しますか？',
      resetConfirmYes: 'はい、消去する',
      resetCancel: 'キャンセル',
      passLabel: '正解',
      missLabel: '不正解',
    },
    ads: {
      disclosure: '広告 / スポンサー',
      slotMidLabel: 'コンテキスト広告枠（Media.net対応）',
      slotBottomLabel: 'フッター上広告枠（Media.net対応）',
    },
    footer: {
      disclaimer:
        '非言語サインの観察力を養うための教育トレーニングツールです。ボディランゲージのサインは確率的な手がかりであり、常に個人のベースラインと文脈に依存し、断定的な証拠にはなりません。',
      copyright: 'CueLab · ローカル非言語観察トレーナー',
    },
    seo: {
      baseTitle: 'CueLab — 非言語コミュニケーション・トレーナー＆ボディランゲージ・クイズ',
      baseDescription:
        '表情・姿勢・言動の不一致・ベースライン比較を、外部通信なしのローカル環境で体系的に学べるインタラクティブ練習ラボ。',
    },
  },
};
