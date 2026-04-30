import { useState, useMemo } from 'react';
import { cpus, coolers, pastas } from '../data/hardware';
import { calcTFinal, calcCurva } from '../data/physics';
import ControlPanel from '../components/ControlPanel';
import PCIllustration from '../components/PCIllustration';
import TempCard from '../components/TempCard';
import TempChart from '../components/TempChart';

const initialState = {
  cpuIdx: 1,
  coolerIdx: 1,
  pastaIdx: 1,
  tAmbiente: 25,
  carga: 100,
};

export default function Simulador() {
  const [state, setState] = useState(initialState);

  const onChange = (key, value) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  const { cpuIdx, coolerIdx, pastaIdx, tAmbiente, carga } = state;
  const cpu = cpus[cpuIdx];
  const cooler = coolers[coolerIdx];
  const pasta = pastas[pastaIdx];

  const tFinal = useMemo(
    () => calcTFinal(cpu.tdp, carga, pasta.resistencia_termica, cooler.resistencia_termica, tAmbiente),
    [cpu.tdp, carga, pasta.resistencia_termica, cooler.resistencia_termica, tAmbiente]
  );

  const curva = useMemo(() => calcCurva(tFinal, tAmbiente), [tFinal, tAmbiente]);

  return (
    <div
      style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '80px 24px 40px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gap: '16px',
          alignItems: 'start',
          flex: 1,
        }}
      >
        <ControlPanel state={state} onChange={onChange} />

        <PCIllustration tFinal={tFinal} tAmbiente={tAmbiente} />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            minWidth: '280px',
            maxWidth: '320px',
          }}
        >
          <TempCard tFinal={tFinal} tAmbiente={tAmbiente} />
          <TempChart data={curva} tFinal={tFinal} tAmbiente={tAmbiente} />
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '12px',
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize: '10px',
          color: 'var(--text-muted)',
          textAlign: 'center',
          letterSpacing: '0.06em',
        }}
      >
        T<sub>final</sub> = T<sub>amb</sub> + (TDP × carga) × (R<sub>pasta</sub> + R<sub>cooler</sub>) &nbsp;|&nbsp;
        T(t) = T<sub>final</sub> − (T<sub>final</sub> − T<sub>amb</sub>) × e<sup>−t/τ</sup> &nbsp;|&nbsp; τ = 60 s
      </div>
    </div>
  );
}
