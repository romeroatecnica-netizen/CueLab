import React from 'react';
import {Eye, EyeOff, Maximize2, Hand, UserCheck} from 'lucide-react';
import type {FocusZone, SceneSpec, ViewZoomMode} from '../types/cuelab';
import type {UiStrings} from '../i18n/uiTranslations';

interface SingleSceneSvgProps {
  spec: SceneSpec;
  zoom: ViewZoomMode;
  showMarkers: boolean;
  ui: UiStrings;
  compact?: boolean;
}

function getViewBox(zoom: ViewZoomMode): string {
  switch (zoom) {
    case 'face':
      return '92 22 176 144';
    case 'hands':
      return '48 122 264 186';
    case 'full':
    default:
      return '0 0 360 310';
  }
}

function renderContextGlyph(glyph: SceneSpec['contextGlyph']) {
  if (!glyph || glyph === 'none') return null;

  if (glyph === 'cold') {
    return (
      <g transform="translate(268, 22)" aria-hidden="true">
        <rect x="0" y="0" width="72" height="28" rx="6" fill="#E0F2FE" stroke="#BAE6FD" />
        <path
          d="M16 7v14M10 10.5l12 7M22 10.5l-12 7"
          stroke="#0284C7"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <text x="30" y="18" fontSize="11" fontWeight="600" fill="#0369A1" fontFamily="IBM Plex Mono, monospace">
          17°C
        </text>
      </g>
    );
  }

  if (glyph === 'late') {
    return (
      <g transform="translate(268, 22)" aria-hidden="true">
        <rect x="0" y="0" width="72" height="28" rx="6" fill="#F1F5F9" stroke="#CBD5E1" />
        <circle cx="15" cy="14" r="6.5" fill="none" stroke="#475569" strokeWidth="1.6" />
        <path d="M15 10.5V14l2.5 1.8" stroke="#475569" strokeWidth="1.6" strokeLinecap="round" />
        <text x="27" y="18" fontSize="11" fontWeight="600" fill="#334155" fontFamily="IBM Plex Mono, monospace">
          19:15
        </text>
      </g>
    );
  }

  if (glyph === 'notes') {
    return (
      <g transform="translate(284, 22)" aria-hidden="true">
        <rect x="0" y="0" width="56" height="28" rx="6" fill="#EEF2FF" stroke="#C7D2FE" />
        <rect x="11" y="7" width="12" height="14" rx="2" fill="none" stroke="#4F46E5" strokeWidth="1.5" />
        <path d="M14 11h6M14 14.5h6M14 18h4" stroke="#4F46E5" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M30 14h16" stroke="#6366F1" strokeWidth="1.4" strokeDasharray="2 2" />
      </g>
    );
  }

  if (glyph === 'rush') {
    return (
      <g transform="translate(284, 22)" aria-hidden="true">
        <rect x="0" y="0" width="56" height="28" rx="6" fill="#FEF3C7" stroke="#FDE68A" />
        <path d="M14 11h11v7a4 4 0 0 1-4 4h-3a4 4 0 0 1-4-4v-7z" fill="none" stroke="#B45309" strokeWidth="1.5" />
        <path d="M25 13h2.5a2 2 0 0 1 0 4H25" fill="none" stroke="#B45309" strokeWidth="1.5" />
        <path d="M17 7c0 1.2 1 1.8 1 2.6M21 7c0 1.2 1 1.8 1 2.6" stroke="#D97706" strokeWidth="1.3" strokeLinecap="round" />
      </g>
    );
  }

  return null;
}

function renderFocusOverlay(zones: FocusZone[]) {
  const map: Record<FocusZone, {cx: number; cy: number; rx: number; ry: number}> = {
    'brows-eyes': {cx: 180, cy: 84, rx: 34, ry: 17},
    'mouth-jaw': {cx: 180, cy: 121, rx: 28, ry: 16},
    'neck-hands': {cx: 180, cy: 196, rx: 56, ry: 34},
    'torso-space': {cx: 180, cy: 205, rx: 86, ry: 68},
  };

  return (
    <g aria-hidden="true">
      {zones.map((z) => {
        const box = map[z];
        return (
          <ellipse
            key={z}
            cx={box.cx}
            cy={box.cy}
            rx={box.rx}
            ry={box.ry}
            fill="rgba(79, 70, 229, 0.06)"
            stroke="#4F46E5"
            strokeWidth="1.75"
            strokeDasharray="5 4"
          />
        );
      })}
    </g>
  );
}

const SingleSceneSvg: React.FC<SingleSceneSvgProps> = ({spec, zoom, showMarkers, ui, compact}) => {
  const {persona, eyebrows, eyes, mouth, jawTension, headTilt, torso, shoulders, hands, proxemics, environment, barrier} =
    spec;

  // Torso / scale transforms
  let bodyTransform = '';
  if (torso === 'leaning-forward') {
    bodyTransform = 'translate(0, 8) scale(1.04)';
  } else if (torso === 'leaning-back') {
    bodyTransform = 'translate(0, -4) scale(0.95)';
  } else if (torso === 'closed-hunched') {
    bodyTransform = 'translate(0, 10) scale(0.98)';
  } else if (torso === 'angled-away') {
    bodyTransform = 'translate(14, 2) rotate(5 180 220)';
  }

  // Head tilt transform
  let headTransform = '';
  if (headTilt === 'left') headTransform = 'rotate(-7 180 96)';
  else if (headTilt === 'right') headTransform = 'rotate(7 180 96)';
  else if (headTilt === 'forward') headTransform = 'translate(0, 5)';
  else if (headTilt === 'back') headTransform = 'translate(0, -4)';

  // Shoulder Y offsets
  const leftShoulderY =
    shoulders === 'raised-tense' ? 162 : shoulders === 'asymmetric-shrug' ? 161 : torso === 'closed-hunched' ? 174 : 172;
  const rightShoulderY =
    shoulders === 'raised-tense' ? 162 : shoulders === 'asymmetric-shrug' ? 173 : torso === 'closed-hunched' ? 174 : 172;

  // Eye pupil offset
  const pupilDx = eyes === 'averted-left' ? -4.5 : eyes === 'averted-right' ? 4.5 : 0;
  const pupilDy = eyes === 'downcast' ? 3 : 0;

  // Environment accent colors
  const wallBg =
    environment === 'cafe-table'
      ? '#FFFBEB'
      : environment === 'negotiation-room'
      ? '#F1F5F9'
      : environment === 'standing-hall'
      ? '#F8FAFC'
      : '#F8FAFC';

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white">
      <svg
        viewBox={getViewBox(zoom)}
        className={`block w-full transition-all duration-300 ease-out cuelab-stage-enter ${
          compact ? 'h-56 sm:h-64' : 'h-64 sm:h-80 lg:h-[340px]'
        }`}
        role="img"
        aria-label={`${ui.stage.contextEnvLabels[environment]} — ${ui.stage.proxemicLabels[proxemics]}`}
      >
        <defs>
          <linearGradient id={`bg-${environment}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={wallBg} />
            <stop offset="100%" stopColor="#EFF6FF" stopOpacity="0.45" />
          </linearGradient>
          <clipPath id="stage-clip">
            <rect x="0" y="0" width="360" height="310" />
          </clipPath>
        </defs>

        <g clipPath="url(#stage-clip)">
          {/* Backdrop */}
          <rect x="0" y="0" width="360" height="310" fill={`url(#bg-${environment})`} />

          {/* Architectural background lines */}
          {environment === 'office-desk' || environment === 'interview-table' || environment === 'negotiation-room' ? (
            <g stroke="#E2E8F0" strokeWidth="1.2" opacity="0.85">
              <rect x="28" y="34" width="110" height="128" rx="4" fill="#FFFFFF" fillOpacity="0.55" />
              <line x1="28" y1="98" x2="138" y2="98" />
              <line x1="83" y1="34" x2="83" y2="162" />
              <line x1="0" y1="226" x2="360" y2="226" />
            </g>
          ) : environment === 'cafe-table' ? (
            <g stroke="#FDE68A" strokeWidth="1.2" opacity="0.8">
              <circle cx="56" cy="72" r="24" fill="#FEF3C7" fillOpacity="0.55" />
              <line x1="0" y1="228" x2="360" y2="228" stroke="#E2E8F0" />
            </g>
          ) : (
            <g stroke="#CBD5E1" strokeWidth="1.2" opacity="0.7">
              <line x1="44" y1="24" x2="44" y2="250" />
              <line x1="316" y1="24" x2="316" y2="250" />
              <line x1="0" y1="248" x2="360" y2="248" />
            </g>
          )}

          {/* Proxemic spatial indicator arc / observer shoulder edge */}
          {proxemics === 'close-invasive' && (
            <g aria-hidden="true">
              <path
                d="M -12 310 C 12 246, 48 232, 74 268 L 74 310 Z"
                fill="#CBD5E1"
                opacity="0.65"
              />
              <path
                d="M 86 244 A 42 42 0 0 1 94 282"
                fill="none"
                stroke="#D97706"
                strokeWidth="1.6"
                strokeDasharray="3 3"
              />
            </g>
          )}
          {proxemics === 'distant-guarded' && (
            <g aria-hidden="true" opacity="0.5">
              <line x1="42" y1="274" x2="96" y2="274" stroke="#64748B" strokeWidth="1.4" strokeDasharray="3 3" />
              <circle cx="42" cy="274" r="2.5" fill="#64748B" />
              <circle cx="96" cy="274" r="2.5" fill="#64748B" />
            </g>
          )}

          {/* Chair backrest (if seated) */}
          {environment !== 'standing-hall' && (
            <path
              d="M 116 142 C 116 128, 244 128, 244 142 L 248 258 L 112 258 Z"
              fill="#E2E8F0"
              stroke="#CBD5E1"
              strokeWidth="1.5"
            />
          )}

          {/* Context environmental glyph */}
          {renderContextGlyph(spec.contextGlyph)}

          {/* Character Group with subtle breathing */}
          <g className="cuelab-breathe" transform={bodyTransform} style={{transformOrigin: '180px 210px'}}>
            {/* Back hair layer for curly/bob */}
            {persona.hairStyle === 'curly' && (
              <g fill={persona.hairColor}>
                <circle cx="138" cy="86" r="20" />
                <circle cx="222" cy="86" r="20" />
                <circle cx="145" cy="112" r="16" />
                <circle cx="215" cy="112" r="16" />
              </g>
            )}
            {persona.hairStyle === 'bob' && (
              <path
                d="M 134 86 C 132 118, 138 134, 148 136 L 212 136 C 222 134, 228 118, 226 86 Z"
                fill={persona.hairColor}
              />
            )}
            {persona.hairStyle === 'bun' && (
              <circle cx="180" cy="36" r="17" fill={persona.hairColor} />
            )}

            {/* Torso & Shoulders */}
            <path
              d={`M 104 295 L 114 ${leftShoulderY + 14} Q 118 ${leftShoulderY} 148 ${leftShoulderY - 4} L 212 ${rightShoulderY - 4} Q 242 ${rightShoulderY} 246 ${rightShoulderY + 14} L 256 295 Z`}
              fill={persona.outfitColor}
            />

            {/* Outfit details (Blazer lapels / Shirt collar / Turtleneck) */}
            {persona.outfitStyle === 'blazer' && (
              <g>
                <path d="M 156 168 L 180 230 L 204 168 Z" fill="#F8FAFC" />
                <path d="M 154 168 L 168 228 L 146 218 Z" fill="#1E293B" opacity="0.28" />
                <path d="M 206 168 L 192 228 L 214 218 Z" fill="#1E293B" opacity="0.28" />
              </g>
            )}
            {persona.outfitStyle === 'shirt' && (
              <g>
                <path d="M 158 168 L 180 198 L 202 168 Z" fill="#FFFFFF" opacity="0.92" />
                <line x1="180" y1="196" x2="180" y2="270" stroke="#CBD5E1" strokeWidth="1.5" />
              </g>
            )}
            {persona.outfitStyle === 'turtleneck' && (
              <rect x="160" y="148" width="40" height="22" rx="6" fill={persona.outfitColor} stroke="#0F172A" strokeOpacity="0.12" />
            )}

            {/* Neck */}
            <rect x="166" y="132" width="28" height="36" rx="10" fill={persona.skinTone} />
            {/* Subtle suprasternal notch shadow */}
            <path d="M 173 162 Q 180 166 187 162" fill="none" stroke="#0F172A" strokeOpacity="0.15" strokeWidth="1.5" />

            {/* Head Group */}
            <g transform={headTransform}>
              {/* Ears */}
              <ellipse cx="137" cy="96" rx="6.5" ry="11" fill={persona.skinTone} />
              <ellipse cx="223" cy="96" rx="6.5" ry="11" fill={persona.skinTone} />

              {/* Face base */}
              <path
                d="M 140 82 C 140 48, 220 48, 220 82 L 218 110 C 216 134, 198 147, 180 147 C 162 147, 144 134, 142 110 Z"
                fill={persona.skinTone}
              />

              {/* Jaw tension lines */}
              {jawTension && (
                <g stroke="#7C2D12" strokeOpacity="0.34" strokeWidth="1.6" strokeLinecap="round" fill="none">
                  <path d="M 148 118 Q 152 128 160 135" />
                  <path d="M 212 118 Q 208 128 200 135" />
                </g>
              )}

              {/* Hair front */}
              {persona.hairStyle === 'short' && (
                <path
                  d="M 139 84 C 138 45, 222 45, 221 84 C 216 62, 196 58, 180 58 C 164 58, 144 62, 139 84 Z"
                  fill={persona.hairColor}
                />
              )}
              {persona.hairStyle === 'parted' && (
                <path
                  d="M 138 88 C 136 44, 224 44, 222 88 C 212 64, 192 59, 174 62 C 158 64, 146 72, 138 88 Z"
                  fill={persona.hairColor}
                />
              )}
              {persona.hairStyle === 'bob' && (
                <path
                  d="M 137 86 C 138 44, 222 44, 223 86 C 212 62, 194 58, 180 60 C 162 62, 146 68, 137 86 Z"
                  fill={persona.hairColor}
                />
              )}
              {persona.hairStyle === 'bun' && (
                <path
                  d="M 139 82 C 140 46, 220 46, 221 82 C 210 60, 150 60, 139 82 Z"
                  fill={persona.hairColor}
                />
              )}
              {persona.hairStyle === 'curly' && (
                <path
                  d="M 136 82 C 135 42, 225 42, 224 82 C 214 60, 198 56, 180 58 C 162 56, 146 60, 136 82 Z"
                  fill={persona.hairColor}
                />
              )}

              {/* Forehead lines for raised brows */}
              {eyebrows === 'raised' && (
                <g stroke="#7C2D12" strokeOpacity="0.22" strokeWidth="1.2" fill="none">
                  <path d="M 164 62 Q 180 60 196 62" />
                  <path d="M 168 67 Q 180 65 192 67" />
                </g>
              )}

              {/* Glabella crease lines for furrowed brows */}
              {eyebrows === 'furrowed' && (
                <g stroke="#7C2D12" strokeOpacity="0.38" strokeWidth="1.4" strokeLinecap="round">
                  <line x1="177" y1="73" x2="177" y2="81" />
                  <line x1="183" y1="73" x2="183" y2="81" />
                </g>
              )}

              {/* Eyebrows */}
              <g fill="none" stroke="#1E293B" strokeWidth="2.6" strokeLinecap="round">
                {eyebrows === 'relaxed' && (
                  <>
                    <path d="M 152 78 Q 163 74 173 77" />
                    <path d="M 187 77 Q 197 74 208 78" />
                  </>
                )}
                {eyebrows === 'raised' && (
                  <>
                    <path d="M 151 73 Q 163 66 173 72" />
                    <path d="M 187 72 Q 197 66 209 73" />
                  </>
                )}
                {eyebrows === 'furrowed' && (
                  <>
                    <path d="M 152 76 L 173 82" />
                    <path d="M 208 76 L 187 82" />
                  </>
                )}
                {eyebrows === 'asymmetric' && (
                  <>
                    <path d="M 152 79 Q 163 77 173 79" />
                    <path d="M 187 74 Q 198 67 209 73" />
                  </>
                )}
                {eyebrows === 'inner-raised' && (
                  <>
                    <path d="M 152 81 Q 163 79 173 74" />
                    <path d="M 187 74 Q 197 79 208 81" />
                  </>
                )}
              </g>

              {/* Eyes */}
              <g className="cuelab-blink">
                {eyes === 'squint-smile' ? (
                  <>
                    {/* Raised cheek push + happy eye arc */}
                    <path d="M 153 91 Q 163 85 173 91" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
                    <path d="M 187 91 Q 197 85 207 91" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
                    {/* Crow's feet Duchenne markers */}
                    <path d="M 148 89 l -5 -2 M 148 93 l -5 1" stroke="#7C2D12" strokeOpacity="0.45" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M 212 89 l 5 -2 M 212 93 l 5 1" stroke="#7C2D12" strokeOpacity="0.45" strokeWidth="1.2" strokeLinecap="round" />
                  </>
                ) : (
                  <>
                    {/* Sclera */}
                    <ellipse
                      cx="163"
                      cy="90"
                      rx="9.5"
                      ry={eyes === 'wide' ? 7.5 : eyes === 'narrowed' ? 3.8 : eyes === 'downcast' ? 4.4 : 5.8}
                      fill="#FFFFFF"
                    />
                    <ellipse
                      cx="197"
                      cy="90"
                      rx="9.5"
                      ry={eyes === 'wide' ? 7.5 : eyes === 'narrowed' ? 3.8 : eyes === 'downcast' ? 4.4 : 5.8}
                      fill="#FFFFFF"
                    />
                    {/* Irises & pupils */}
                    <circle cx={163 + pupilDx} cy={90 + pupilDy} r={eyes === 'wide' ? 4.3 : 3.9} fill="#1E293B" />
                    <circle cx={197 + pupilDx} cy={90 + pupilDy} r={eyes === 'wide' ? 4.3 : 3.9} fill="#1E293B" />
                    <circle cx={164.3 + pupilDx} cy={88.6 + pupilDy} r="1.2" fill="#FFFFFF" />
                    <circle cx={198.3 + pupilDx} cy={88.6 + pupilDy} r="1.2" fill="#FFFFFF" />
                    {/* Upper eyelid crease */}
                    {eyes === 'downcast' && (
                      <>
                        <path d="M 153 88 Q 163 92 173 88" fill="none" stroke="#334155" strokeWidth="1.8" />
                        <path d="M 187 88 Q 197 92 207 88" fill="none" stroke="#334155" strokeWidth="1.8" />
                      </>
                    )}
                    {eyes === 'narrowed' && (
                      <>
                        <line x1="153" y1="86" x2="173" y2="87" stroke="#334155" strokeWidth="1.8" />
                        <line x1="187" y1="87" x2="207" y2="86" stroke="#334155" strokeWidth="1.8" />
                      </>
                    )}
                  </>
                )}
              </g>

              {/* Nose */}
              <path d="M 180 94 L 177 109 Q 180 112 184 109" fill="none" stroke="#7C2D12" strokeOpacity="0.28" strokeWidth="1.8" strokeLinecap="round" />

              {/* Mouth */}
              {mouth === 'neutral' && (
                <path d="M 168 124 Q 180 125 192 124" fill="none" stroke="#7C2D12" strokeWidth="2.3" strokeLinecap="round" />
              )}
              {mouth === 'duchenne-smile' && (
                <g>
                  <path d="M 163 120 Q 180 135 197 120 Z" fill="#FFFFFF" stroke="#9A3412" strokeWidth="2" />
                  <circle cx="154" cy="113" r="6" fill="#F43F5E" opacity="0.13" />
                  <circle cx="206" cy="113" r="6" fill="#F43F5E" opacity="0.13" />
                </g>
              )}
              {mouth === 'tense-smile' && (
                <g>
                  <path d="M 162 124 Q 180 129 198 124" fill="none" stroke="#7C2D12" strokeWidth="2.4" strokeLinecap="round" />
                  <line x1="160" y1="122" x2="162" y2="127" stroke="#7C2D12" strokeOpacity="0.45" strokeWidth="1.5" />
                  <line x1="200" y1="122" x2="198" y2="127" stroke="#7C2D12" strokeOpacity="0.45" strokeWidth="1.5" />
                </g>
              )}
              {mouth === 'tight-lips' && (
                <g>
                  <line x1="165" y1="124" x2="195" y2="124" stroke="#7C2D12" strokeWidth="2.7" strokeLinecap="round" />
                  <path d="M 173 132 Q 180 130 187 132" fill="none" stroke="#7C2D12" strokeOpacity="0.32" strokeWidth="1.4" />
                </g>
              )}
              {mouth === 'asymmetric-smirk' && (
                <path d="M 167 125 Q 182 126 197 119" fill="none" stroke="#7C2D12" strokeWidth="2.4" strokeLinecap="round" />
              )}
              {mouth === 'parted' && (
                <ellipse cx="180" cy="124" rx="9" ry="5.5" fill="#9A3412" fillOpacity="0.82" />
              )}
              {mouth === 'downturned' && (
                <path d="M 166 127 Q 180 120 194 127" fill="none" stroke="#7C2D12" strokeWidth="2.4" strokeLinecap="round" />
              )}
            </g>

            {/* Arms & Hands Layer */}
            {hands === 'open-visible' && (
              <g>
                <path d={`M 118 ${leftShoulderY + 26} L 106 238 L 138 256`} fill="none" stroke={persona.outfitColor} strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
                <path d={`M 242 ${rightShoulderY + 26} L 254 238 L 222 256`} fill="none" stroke={persona.outfitColor} strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
                <ellipse cx="144" cy="258" rx="13" ry="8" fill={persona.skinTone} />
                <ellipse cx="216" cy="258" rx="13" ry="8" fill={persona.skinTone} />
              </g>
            )}

            {hands === 'arms-crossed' && (
              <g>
                <path d={`M 118 ${leftShoulderY + 24} L 112 222 L 210 218`} fill="none" stroke={persona.outfitColor} strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
                <path d={`M 242 ${rightShoulderY + 24} L 248 228 L 148 228`} fill="none" stroke={persona.outfitColor} strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="145" y1="218" x2="215" y2="226" stroke="#0F172A" strokeOpacity="0.18" strokeWidth="2" />
                <ellipse cx="144" cy="228" rx="10" ry="7" fill={persona.skinTone} />
                <ellipse cx="214" cy="218" rx="10" ry="7" fill={persona.skinTone} />
              </g>
            )}

            {hands === 'neck-touch' && (
              <g>
                <path d={`M 118 ${leftShoulderY + 24} L 110 245 L 146 258`} fill="none" stroke={persona.outfitColor} strokeWidth="21" strokeLinecap="round" strokeLinejoin="round" />
                <ellipse cx="150" cy="258" rx="11" ry="7" fill={persona.skinTone} />
                {/* Right arm raised to collarbone/neck */}
                <path d={`M 242 ${rightShoulderY + 24} L 252 214 L 194 166`} fill="none" stroke={persona.outfitColor} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
                <ellipse cx="187" cy="162" rx="11" ry="7.5" transform="rotate(-18 187 162)" fill={persona.skinTone} />
              </g>
            )}

            {hands === 'face-touch' && (
              <g>
                <path d={`M 242 ${rightShoulderY + 24} L 250 246 L 212 258`} fill="none" stroke={persona.outfitColor} strokeWidth="21" strokeLinecap="round" strokeLinejoin="round" />
                <ellipse cx="208" cy="258" rx="11" ry="7" fill={persona.skinTone} />
                {/* Left hand supporting cheek/chin */}
                <path d={`M 118 ${leftShoulderY + 24} L 106 206 L 143 130`} fill="none" stroke={persona.outfitColor} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
                <ellipse cx="145" cy="124" rx="9" ry="12" transform="rotate(14 145 124)" fill={persona.skinTone} />
              </g>
            )}

            {hands === 'hands-clasped' && (
              <g>
                <path d={`M 118 ${leftShoulderY + 24} L 112 240 L 172 252`} fill="none" stroke={persona.outfitColor} strokeWidth="21" strokeLinecap="round" strokeLinejoin="round" />
                <path d={`M 242 ${rightShoulderY + 24} L 248 240 L 188 252`} fill="none" stroke={persona.outfitColor} strokeWidth="21" strokeLinecap="round" strokeLinejoin="round" />
                <ellipse cx="180" cy="253" rx="18" ry="10" fill={persona.skinTone} stroke="#7C2D12" strokeOpacity="0.22" />
              </g>
            )}

            {hands === 'illustrative-gesture' && (
              <g>
                <path d={`M 118 ${leftShoulderY + 24} L 92 214 L 122 190`} fill="none" stroke={persona.outfitColor} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
                <path d={`M 242 ${rightShoulderY + 24} L 268 214 L 238 190`} fill="none" stroke={persona.outfitColor} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="126" cy="186" r="10.5" fill={persona.skinTone} />
                <circle cx="234" cy="186" r="10.5" fill={persona.skinTone} />
              </g>
            )}

            {hands === 'palms-down' && (
              <g>
                <path d={`M 118 ${leftShoulderY + 24} L 108 238 L 132 256`} fill="none" stroke={persona.outfitColor} strokeWidth="21" strokeLinecap="round" strokeLinejoin="round" />
                <path d={`M 242 ${rightShoulderY + 24} L 252 238 L 228 256`} fill="none" stroke={persona.outfitColor} strokeWidth="21" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="122" y="254" width="26" height="10" rx="5" fill={persona.skinTone} stroke="#0F172A" strokeOpacity="0.18" />
                <rect x="212" y="254" width="26" height="10" rx="5" fill={persona.skinTone} stroke="#0F172A" strokeOpacity="0.18" />
              </g>
            )}

            {hands === 'fidget-cuff' && (
              <g>
                <path d={`M 118 ${leftShoulderY + 24} L 114 236 L 170 242`} fill="none" stroke={persona.outfitColor} strokeWidth="21" strokeLinecap="round" strokeLinejoin="round" />
                <path d={`M 242 ${rightShoulderY + 24} L 246 238 L 182 242`} fill="none" stroke={persona.outfitColor} strokeWidth="21" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="160" y="232" width="12" height="18" rx="3" fill="#FFFFFF" opacity="0.9" />
                <ellipse cx="177" cy="242" rx="11" ry="8" fill={persona.skinTone} />
              </g>
            )}
          </g>

          {/* Physical Barrier Layer */}
          {barrier === 'table-edge' && (
            <g>
              <rect x="0" y="264" width="360" height="46" fill="#E2E8F0" />
              <line x1="0" y1="264" x2="360" y2="264" stroke="#94A3B8" strokeWidth="2" />
            </g>
          )}
          {barrier === 'laptop' && (
            <g>
              <rect x="0" y="266" width="360" height="44" fill="#E2E8F0" />
              <line x1="0" y1="266" x2="360" y2="266" stroke="#94A3B8" strokeWidth="2" />
              <path d="M 114 214 L 246 214 L 238 272 L 122 272 Z" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.8" />
              <circle cx="180" cy="243" r="5" fill="#94A3B8" />
            </g>
          )}
          {barrier === 'notebook-shield' && (
            <g>
              <rect x="136" y="198" width="88" height="66" rx="5" fill="#FFFFFF" stroke="#475569" strokeWidth="1.8" />
              <line x1="146" y1="214" x2="214" y2="214" stroke="#CBD5E1" strokeWidth="1.5" />
              <line x1="146" y1="226" x2="206" y2="226" stroke="#CBD5E1" strokeWidth="1.5" />
              <line x1="146" y1="238" x2="196" y2="238" stroke="#CBD5E1" strokeWidth="1.5" />
            </g>
          )}

          {/* Optional Focus Markers */}
          {showMarkers && renderFocusOverlay(spec.focusZones)}
        </g>
      </svg>

      {/* Clean unboxed scene metadata bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/80 px-3.5 py-2 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span>{ui.stage.contextEnvLabels[environment]}</span>
          <span aria-hidden="true">·</span>
          <span>{ui.stage.proxemicLabels[proxemics]}</span>
        </div>
      </div>
    </div>
  );
};

interface NonverbalSceneStageProps {
  scene: SceneSpec;
  baselineScene?: SceneSpec;
  sceneALabel?: string;
  sceneBLabel?: string;
  statement?: string;
  zoom: ViewZoomMode;
  onZoomChange: (z: ViewZoomMode) => void;
  showMarkers: boolean;
  onToggleMarkers?: () => void;
  canToggleMarkers: boolean;
  ui: UiStrings;
}

export const NonverbalSceneStage: React.FC<NonverbalSceneStageProps> = ({
  scene,
  baselineScene,
  sceneALabel,
  sceneBLabel,
  statement,
  zoom,
  onZoomChange,
  showMarkers,
  onToggleMarkers,
  canToggleMarkers,
  ui,
}) => {
  const isComparison = Boolean(baselineScene);

  return (
    <div className="space-y-3">
      {/* Stage Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div
          className="inline-flex items-center gap-1 rounded-lg bg-slate-100 p-1"
          role="group"
          aria-label="Scene zoom controls"
        >
          <button
            type="button"
            onClick={() => onZoomChange('full')}
            className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              zoom === 'full' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{ui.stage.zoomFull}</span>
          </button>
          <button
            type="button"
            onClick={() => onZoomChange('face')}
            className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              zoom === 'face' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{ui.stage.zoomFace}</span>
          </button>
          <button
            type="button"
            onClick={() => onZoomChange('hands')}
            className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              zoom === 'hands' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Hand className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{ui.stage.zoomHands}</span>
          </button>
        </div>

        {canToggleMarkers && onToggleMarkers && (
          <button
            type="button"
            onClick={onToggleMarkers}
            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {showMarkers ? (
              <EyeOff className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Eye className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            <span>{showMarkers ? ui.stage.cueMarkersOn : ui.stage.cueMarkersOff}</span>
          </button>
        )}
      </div>

      {/* Spoken statement banner for Mismatch Lab */}
      {statement && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3">
          <div className="text-xs font-medium text-amber-800">{ui.stage.spokenStatementLabel}</div>
          <blockquote className="mt-1 text-base font-semibold text-slate-900 leading-snug">
            {statement}
          </blockquote>
        </div>
      )}

      {/* Single or Dual Comparison Stage */}
      {isComparison && baselineScene ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <div className="text-xs font-semibold text-slate-700">
              {sceneALabel ?? ui.stage.sceneALabelDefault}
            </div>
            <SingleSceneSvg spec={baselineScene} zoom={zoom} showMarkers={showMarkers} ui={ui} compact />
          </div>
          <div className="space-y-1.5">
            <div className="text-xs font-semibold text-indigo-700">
              {sceneBLabel ?? ui.stage.sceneBLabelDefault}
            </div>
            <SingleSceneSvg spec={scene} zoom={zoom} showMarkers={showMarkers} ui={ui} compact />
          </div>
        </div>
      ) : (
        <SingleSceneSvg spec={scene} zoom={zoom} showMarkers={showMarkers} ui={ui} />
      )}
    </div>
  );
};
