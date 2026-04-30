import { tempToColor, tempLabel } from '../data/physics';

export default function TempCard({ tFinal, tAmbiente }) {
  const color = tempToColor(tFinal);
  const label = tempLabel(tFinal);
  const ratio = Math.min(Math.max((tFinal - 25) / 75, 0), 1);

  const dangerThresholds = [
    { temp: 50, label: 'Seguro', color: '#0099ee' },
    { temp: 70, label: 'Normal', color: '#44cc88' },
    { temp: 85, label: 'Quente', color: '#ff8c00' },
    { temp: 100, label: 'Critico', color: '#ff5500' },
    { temp: 120, label: 'PERIGO', color: '#ff0000' },
  ];

  const activeThreshold = dangerThresholds.findLast(t => tFinal >= t.temp) || dangerThresholds[0];

  return (
    <div
      style={{
        background: 'var(--bg-panel)',
        border: `1px solid ${color}33`,
        borderRadius: '10px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        boxShadow: `0 0 30px ${color}18`,
        transition: 'border-color 0.6s, box-shadow 0.6s',
      }}
    >
      <div
        style={{
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          color: 'var(--text-muted)',
        }}
      >
        TEMPERATURA EM REGIME PERMANENTE
      </div>

      <div style={{ textAlign: 'center', padding: '8px 0' }}>
        <div
          style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '64px',
            fontWeight: 700,
            lineHeight: 1,
            color,
            textShadow: `0 0 40px ${color}66`,
            transition: 'color 0.6s, text-shadow 0.6s',
            letterSpacing: '-0.02em',
          }}
        >
          {tFinal.toFixed(1)}
        </div>
        <div
          style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '20px',
            color: 'var(--text-muted)',
            marginTop: '-4px',
          }}
        >
          °C
        </div>
        <div
          style={{
            marginTop: '10px',
            display: 'inline-block',
            padding: '4px 14px',
            borderRadius: '12px',
            background: `${color}1a`,
            border: `1px solid ${color}44`,
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            color,
          }}
        >
          {label}
        </div>
      </div>

      {/* Thermometer bar */}
      <div>
        <div
          style={{
            height: '6px',
            borderRadius: '3px',
            background: 'var(--border)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${ratio * 100}%`,
              background: `linear-gradient(90deg, #0099ee, #ff8c00, #ff5500)`,
              borderRadius: '3px',
              transition: 'width 0.6s ease',
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '4px',
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '9px',
            color: 'var(--text-muted)',
          }}
        >
          <span>25°C</span>
          <span>100°C</span>
        </div>
      </div>

      {/* Status levels */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {dangerThresholds.map((t, i) => {
          const isActive = tFinal >= t.temp && (i === dangerThresholds.length - 1 || tFinal < dangerThresholds[i + 1].temp);
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '4px 8px',
                borderRadius: '4px',
                background: isActive ? `${t.color}18` : 'transparent',
                border: isActive ? `1px solid ${t.color}33` : '1px solid transparent',
                transition: 'all 0.3s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div
                  style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: isActive ? t.color : 'var(--text-muted)',
                    opacity: isActive ? 1 : 0.3,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '10px',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? t.color : 'var(--text-muted)',
                  }}
                >
                  {t.label}
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '10px',
                  color: isActive ? t.color : 'var(--text-muted)',
                  opacity: isActive ? 1 : 0.4,
                }}
              >
                &ge; {t.temp}°C
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
