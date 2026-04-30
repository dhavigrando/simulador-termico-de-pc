import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer,
} from 'recharts';
import { tempToColor } from '../data/physics';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const temp = payload[0].value;
  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-bright)',
        borderRadius: '6px',
        padding: '8px 12px',
        fontFamily: 'IBM Plex Mono, monospace',
        fontSize: '11px',
      }}
    >
      <div style={{ color: 'var(--text-muted)', marginBottom: '2px' }}>t = {label}s</div>
      <div style={{ color: tempToColor(temp), fontWeight: 600 }}>{temp.toFixed(1)} °C</div>
    </div>
  );
};

export default function TempChart({ data, tFinal, tAmbiente }) {
  const lineColor = tempToColor(tFinal);
  const minY = Math.max(0, tAmbiente - 5);
  const maxY = Math.ceil(tFinal * 1.08 / 10) * 10;

  return (
    <div
      style={{
        background: 'var(--bg-panel)',
        border: '1px solid var(--border)',
        borderRadius: '10px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
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
        CURVA DE AQUECIMENTO T(t)
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} margin={{ top: 4, right: 10, bottom: 0, left: -10 }}>
          <CartesianGrid strokeDasharray="3 6" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="t"
            tickLine={false}
            axisLine={false}
            tick={{ fontFamily: 'IBM Plex Mono', fontSize: 10, fill: 'var(--text-muted)' }}
            tickFormatter={v => `${v}s`}
            interval={11}
          />
          <YAxis
            domain={[minY, maxY]}
            tickLine={false}
            axisLine={false}
            tick={{ fontFamily: 'IBM Plex Mono', fontSize: 10, fill: 'var(--text-muted)' }}
            tickFormatter={v => `${v}°`}
            width={36}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={tFinal}
            stroke={lineColor}
            strokeDasharray="4 4"
            strokeOpacity={0.4}
            strokeWidth={1}
          />
          <Line
            type="monotone"
            dataKey="temp"
            stroke={lineColor}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: lineColor, stroke: 'var(--bg-void)', strokeWidth: 2 }}
            isAnimationActive={true}
            animationDuration={600}
            animationEasing="ease-out"
          />
        </LineChart>
      </ResponsiveContainer>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
        }}
      >
        <Stat label="Equilíbrio (T∞)" value={`${tFinal.toFixed(1)} °C`} color={lineColor} />
        <Stat label="Constante τ" value="60 s" color="var(--text-secondary)" />
        <Stat label="Δ Temperatura" value={`+${(tFinal - tAmbiente).toFixed(1)} °C`} color="var(--accent-warm)" />
        <Stat label="95% em t =" value="~180 s" color="var(--text-secondary)" />
      </div>
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div
      style={{
        background: 'var(--bg-card)',
        borderRadius: '6px',
        padding: '8px 10px',
      }}
    >
      <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '9px', color: 'var(--text-muted)', marginBottom: '3px', letterSpacing: '0.06em' }}>
        {label}
      </div>
      <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '13px', fontWeight: 600, color }}>
        {value}
      </div>
    </div>
  );
}
