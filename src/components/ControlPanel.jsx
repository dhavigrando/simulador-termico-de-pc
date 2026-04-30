import { cpus, coolers, pastas } from '../data/hardware';

const Label = ({ children }) => (
  <div
    style={{
      fontFamily: 'IBM Plex Mono, monospace',
      fontSize: '10px',
      fontWeight: 600,
      letterSpacing: '0.1em',
      color: 'var(--text-muted)',
      textTransform: 'uppercase',
      marginBottom: '6px',
    }}
  >
    {children}
  </div>
);

const Section = ({ label, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
    <Label>{label}</Label>
    {children}
  </div>
);

const Divider = () => (
  <div style={{ height: '1px', background: 'var(--border)', margin: '4px 0' }} />
);

export default function ControlPanel({ state, onChange }) {
  const { cpuIdx, coolerIdx, pastaIdx, tAmbiente, carga } = state;
  const cpu = cpus[cpuIdx];
  const cooler = coolers[coolerIdx];
  const pasta = pastas[pastaIdx];

  return (
    <div
      style={{
        background: 'var(--bg-panel)',
        border: '1px solid var(--border)',
        borderRadius: '10px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        minWidth: '240px',
        maxWidth: '280px',
      }}
    >
      <div>
        <div
          style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: 'var(--accent-hot)',
            marginBottom: '14px',
          }}
        >
          CONFIGURACAO DO SISTEMA
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Section label="Processador (CPU)">
            <select
              value={cpuIdx}
              onChange={e => onChange('cpuIdx', parseInt(e.target.value))}
            >
              {cpus.map((c, i) => (
                <option key={i} value={i}>
                  {c.nome}
                </option>
              ))}
            </select>
            <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', color: 'var(--text-muted)' }}>
              TDP: <span style={{ color: 'var(--accent-warm)' }}>{cpu.tdp} W</span>
            </div>
          </Section>

          <Divider />

          <Section label="Cooler">
            <select
              value={coolerIdx}
              onChange={e => onChange('coolerIdx', parseInt(e.target.value))}
            >
              {coolers.map((c, i) => (
                <option key={i} value={i}>
                  {c.nome}
                </option>
              ))}
            </select>
            <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', color: 'var(--text-muted)' }}>
              R<sub>cooler</sub>: <span style={{ color: 'var(--accent-warm)' }}>{cooler.resistencia_termica} °C/W</span>
            </div>
          </Section>

          <Section label="Pasta Termica">
            <select
              value={pastaIdx}
              onChange={e => onChange('pastaIdx', parseInt(e.target.value))}
            >
              {pastas.map((p, i) => (
                <option key={i} value={i}>
                  {p.nome}
                </option>
              ))}
            </select>
            <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', color: 'var(--text-muted)' }}>
              R<sub>pasta</sub>: <span style={{ color: 'var(--accent-warm)' }}>{pasta.resistencia_termica} °C/W</span>
            </div>
          </Section>

          <Divider />

          <Section label={`Temp. Ambiente — ${tAmbiente}°C`}>
            <input
              type="range"
              min={15}
              max={40}
              value={tAmbiente}
              onChange={e => onChange('tAmbiente', parseInt(e.target.value))}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', color: 'var(--text-muted)' }}>
              <span>15°C</span>
              <span>40°C</span>
            </div>
          </Section>

          <Section label={`Carga de Uso — ${carga}%`}>
            <input
              type="range"
              min={0}
              max={100}
              value={carga}
              onChange={e => onChange('carga', parseInt(e.target.value))}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', color: 'var(--text-muted)' }}>
              <span>0%</span>
              <span>100%</span>
            </div>
          </Section>
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}
      >
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', color: 'var(--text-muted)' }}>
          Potencia Dissipada
        </div>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '20px', fontWeight: 700, color: 'var(--accent-warm)' }}>
          {(cpu.tdp * carga / 100).toFixed(1)} <span style={{ fontSize: '12px', fontWeight: 400 }}>W</span>
        </div>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', color: 'var(--text-muted)' }}>
          R<sub>total</sub> = {(cooler.resistencia_termica + pasta.resistencia_termica).toFixed(3)} °C/W
        </div>
      </div>
    </div>
  );
}
