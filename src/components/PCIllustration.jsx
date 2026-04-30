import { tempToColor, tempLabel } from '../data/physics';

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function tempRatio(temp) {
  return Math.min(Math.max((temp - 25) / 75, 0), 1);
}

export default function PCIllustration({ tFinal, tAmbiente }) {
  const ratio = tempRatio(tFinal);
  const color = tempToColor(tFinal);
  const label = tempLabel(tFinal);

  const glowOpacity = 0.1 + ratio * 0.5;
  const t2 = (ratio - 0.5) * 2;
  const g1 = Math.round(lerp(140, 0, t2));
  const g2 = Math.round(lerp(170, 0, ratio * 2));
  const b2 = Math.round(lerp(238, 0, ratio * 2));
  const glowColor = ratio > 0.5
    ? `rgba(255, ${g1}, 0, ${glowOpacity})`
    : `rgba(0, ${g2}, ${b2}, ${glowOpacity})`;

  const cpuTemp = tFinal;
  const pastaTemp = tAmbiente + (tFinal - tAmbiente) * 0.6;
  const coolerTemp = tAmbiente + (tFinal - tAmbiente) * 0.25;

  return (
    <div
      style={{
        background: 'var(--bg-panel)',
        border: '1px solid var(--border)',
        borderRadius: '10px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 50% 60%, ${glowColor}, transparent 70%)`,
          pointerEvents: 'none',
          transition: 'background 0.8s ease',
        }}
      />

      <div
        style={{
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          color: 'var(--text-muted)',
          alignSelf: 'flex-start',
        }}
      >
        VISUALIZACAO TERMICA
      </div>

      <svg
        viewBox="0 0 320 260"
        width="100%"
        style={{ maxWidth: '380px', transition: 'all 0.6s ease' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="cpuGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={tempToColor(cpuTemp)} stopOpacity="0.9" />
            <stop offset="100%" stopColor={tempToColor(cpuTemp)} stopOpacity="0.3" />
          </radialGradient>
          <radialGradient id="pastaGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={tempToColor(pastaTemp)} stopOpacity="0.7" />
            <stop offset="100%" stopColor={tempToColor(pastaTemp)} stopOpacity="0.2" />
          </radialGradient>
          <radialGradient id="coolerGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={tempToColor(coolerTemp)} stopOpacity="0.7" />
            <stop offset="100%" stopColor={tempToColor(coolerTemp)} stopOpacity="0.1" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Motherboard background */}
        <rect x="30" y="20" width="260" height="220" rx="8" fill="#0f1117" stroke="#1e2433" strokeWidth="1.5" />
        <rect x="38" y="28" width="244" height="204" rx="5" fill="none" stroke="#1a1f2e" strokeWidth="0.5" strokeDasharray="4 6" />

        {/* PCB traces */}
        {[60, 90, 200, 230].map((x, i) => (
          <line key={`h${i}`} x1={x} y1="28" x2={x} y2="224" stroke="#151b28" strokeWidth="1" />
        ))}
        {[55, 100, 160, 210].map((y, i) => (
          <line key={`v${i}`} x1="38" y1={y} x2="282" y2={y} stroke="#151b28" strokeWidth="1" />
        ))}

        {/* Cooler (fan) */}
        <g filter="url(#glow)">
          <rect x="95" y="55" width="130" height="105" rx="8" fill="url(#coolerGrad)" stroke={tempToColor(coolerTemp)} strokeWidth="1" strokeOpacity="0.6" />
          <circle cx="160" cy="107" r="42" fill="#0d1019" stroke={tempToColor(coolerTemp)} strokeWidth="1" strokeOpacity="0.4" />
          {/* Fan blades */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <path
              key={i}
              d={`M 160 107 Q ${160 + Math.cos((angle + 20) * Math.PI / 180) * 28} ${107 + Math.sin((angle + 20) * Math.PI / 180) * 28} ${160 + Math.cos((angle + 45) * Math.PI / 180) * 38} ${107 + Math.sin((angle + 45) * Math.PI / 180) * 38}`}
              fill={tempToColor(coolerTemp)}
              fillOpacity="0.35"
              stroke={tempToColor(coolerTemp)}
              strokeWidth="0.5"
              strokeOpacity="0.5"
            />
          ))}
          <circle cx="160" cy="107" r="8" fill={tempToColor(coolerTemp)} fillOpacity="0.3" stroke={tempToColor(coolerTemp)} strokeWidth="1" />
        </g>

        {/* Pasta termica (thin layer between cooler and CPU) */}
        <rect x="118" y="160" width="84" height="8" rx="2" fill="url(#pastaGrad)" stroke={tempToColor(pastaTemp)} strokeWidth="0.8" strokeOpacity="0.7" />

        {/* CPU */}
        <g filter="url(#glow)">
          <rect x="108" y="168" width="104" height="80" rx="4" fill="url(#cpuGrad)" stroke={tempToColor(cpuTemp)} strokeWidth="1.5" strokeOpacity="0.9" />
          {/* CPU die */}
          <rect x="130" y="185" width="60" height="46" rx="2" fill={tempToColor(cpuTemp)} fillOpacity="0.25" stroke={tempToColor(cpuTemp)} strokeWidth="1" />
          {/* CPU pins */}
          {[0, 1, 2, 3, 4, 5, 6].map(i => (
            <line key={`pt${i}`} x1={115 + i * 12} y1="168" x2={115 + i * 12} y2="160" stroke="#1e2433" strokeWidth="1.5" strokeLinecap="round" />
          ))}
          {[0, 1, 2, 3, 4, 5, 6].map(i => (
            <line key={`pb${i}`} x1={115 + i * 12} y1="248" x2={115 + i * 12} y2="256" stroke="#1e2433" strokeWidth="1.5" strokeLinecap="round" />
          ))}
        </g>

        {/* Ambient temp indicator */}
        <rect x="38" y="35" width="40" height="28" rx="4" fill="#0f1117" stroke="#1e2433" strokeWidth="1" />
        <text x="58" y="46" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="7" fill="#4a5168">AMB</text>
        <text x="58" y="57" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="9" fontWeight="600" fill={tempToColor(tAmbiente)}>
          {tAmbiente}°C
        </text>

        {/* Labels */}
        <text x="232" y="115" fontFamily="IBM Plex Mono" fontSize="8" fill={tempToColor(coolerTemp)} opacity="0.9">COOLER</text>
        <text x="232" y="124" fontFamily="IBM Plex Mono" fontSize="7" fill={tempToColor(coolerTemp)} opacity="0.6">{coolerTemp.toFixed(0)}°C</text>

        <text x="232" y="167" fontFamily="IBM Plex Mono" fontSize="8" fill={tempToColor(pastaTemp)} opacity="0.9">PASTA</text>
        <text x="232" y="176" fontFamily="IBM Plex Mono" fontSize="7" fill={tempToColor(pastaTemp)} opacity="0.6">{pastaTemp.toFixed(0)}°C</text>

        <text x="232" y="210" fontFamily="IBM Plex Mono" fontSize="8" fill={tempToColor(cpuTemp)} opacity="0.9">CPU</text>
        <text x="232" y="219" fontFamily="IBM Plex Mono" fontSize="7" fill={tempToColor(cpuTemp)} opacity="0.6">{cpuTemp.toFixed(0)}°C</text>

        {/* Connector lines */}
        <line x1="225" y1="107" x2="222" y2="107" stroke={tempToColor(coolerTemp)} strokeWidth="0.6" strokeOpacity="0.5" strokeDasharray="2 2" />
        <line x1="225" y1="164" x2="200" y2="164" stroke={tempToColor(pastaTemp)} strokeWidth="0.6" strokeOpacity="0.5" strokeDasharray="2 2" />
        <line x1="225" y1="208" x2="210" y2="208" stroke={tempToColor(cpuTemp)} strokeWidth="0.6" strokeOpacity="0.5" strokeDasharray="2 2" />
      </svg>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: '20px',
          background: 'var(--bg-card)',
          border: `1px solid ${color}44`,
        }}
      >
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: color,
            boxShadow: `0 0 8px ${color}`,
            animation: ratio > 0.7 ? 'pulse 1s ease-in-out infinite' : 'none',
          }}
        />
        <span
          style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '11px',
            fontWeight: 600,
            color,
            letterSpacing: '0.08em',
          }}
        >
          {label}
        </span>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
}
