const sections = [
  {
    id: '01',
    title: 'Calor e Temperatura',
    formula: 'Q = m · c · ΔT',
    formulaDesc: 'Q = calor (J) | m = massa (kg) | c = calor específico | ΔT = variação de temperatura',
    content: `Temperatura é uma propriedade que mede o estado de agitação térmica médio das moléculas de um material — expressada em graus Celsius (°C) ou Kelvin (K). Calor, por sua vez, é energia em trânsito: surge sempre que existe diferença de temperatura entre dois corpos e flui do mais quente para o mais frio.

No contexto de processadores, o TDP (Thermal Design Power) especifica a potência máxima que o cooler deve dissipar para manter a CPU dentro de sua temperatura de operação segura. Um TDP de 95 W significa que o processador dissipa até 95 joules de energia por segundo na forma de calor.`,
  },
  {
    id: '02',
    title: 'Condução de Calor — Lei de Fourier',
    formula: 'q = −k · A · (dT/dx)',
    formulaDesc: 'q = fluxo de calor (W) | k = condutividade térmica (W/m·K) | A = área | dT/dx = gradiente de temperatura',
    content: `A condução ocorre quando o calor se propaga através de um material sólido por vibração e colisão entre moléculas vizinhas, sem transporte de matéria. A Lei de Fourier quantifica esse fenômeno: o fluxo de calor é proporcional ao gradiente de temperatura e à condutividade térmica do material.

Na pasta térmica, esse mecanismo é fundamental: ela preenche as microasperezas entre o IHS (Integrated Heat Spreader) da CPU e a base do cooler, substituindo o ar (k ≈ 0,026 W/m·K) por um composto de alta condutividade (k = 4–12 W/m·K), reduzindo drasticamente a resistência térmica de contato.`,
  },
  {
    id: '03',
    title: 'Convecção — Lei de Newton do Resfriamento',
    formula: 'Q = h · A · (T_s − T_∞)',
    formulaDesc: 'h = coef. de convecção (W/m²·K) | A = área de troca | T_s = temp. superfície | T_∞ = temp. do fluido',
    content: `A convecção é a transferência de calor entre uma superfície sólida e um fluido (líquido ou gás) em movimento. A Lei de Newton do Resfriamento estabelece que a taxa de troca de calor é proporcional à diferença de temperatura entre a superfície e o fluido longe da interface.

Nos coolers de ar, as aletas do heatsink aumentam a área A e o ventilador eleva o coeficiente h forçando o escoamento. Coolers a líquido vão mais longe: ao circular água (c_p ≈ 4186 J/kg·K) pelo bloco de cobre, atingem coeficientes h muito superiores ao ar, reduzindo a resistência térmica junction-to-ambient para valores abaixo de 0,1 °C/W.`,
  },
  {
    id: '04',
    title: 'Equilíbrio Térmico — Regime Permanente',
    formula: 'T(t) = T_final − (T_final − T₀) · e^(−t/τ)',
    formulaDesc: 'T_final = temperatura de equilíbrio | T₀ = temperatura inicial | τ = constante de tempo',
    content: `Quando o sistema atinge o regime permanente (steady state), a taxa de calor gerado pelo processador iguala a taxa de calor dissipado pelo cooler: não há mais acúmulo de energia interna e a temperatura estabiliza em Tfinal.

A trajetória até o equilíbrio segue uma exponencial negativa com constante de tempo τ (tau). Após τ1, o sistema atingiu ≈ 63% da variação total; após τ3, ≈ 95%; após τ5, praticamente 100%. Neste simulador usamos τ = 60 s como estimativa para sistemas de desktop típicos — na prática, τ depende da capacidade calorífica (massa × calor específico) do heatsink.`,
  },
  {
    id: '05',
    title: 'Resistência Térmica — Modelo do Simulador',
    formula: 'T_final = T_amb + P · (R_pasta + R_cooler)',
    formulaDesc: 'P = potência dissipada (W) | R = resistência térmica (°C/W) — analogia ao circuito elétrico',
    content: `A resistência térmica R (°C/W) é a grandeza que quantifica a dificuldade de um caminho em transferir calor: assim como a resistência elétrica R = ΔV/I, a resistência térmica define R = ΔT/Q, onde ΔT é a diferença de temperatura e Q é o fluxo de calor.

O modelo do simulador empilha as resistências em série — pasta e cooler — e calcula a temperatura de junção em regime permanente multiplicando a potência dissipada pela resistência total. Valores típicos: pasta ~ 0,02–0,05 °C/W; cooler de torre ~ 0,2–0,5 °C/W; cooler a ar básico ~ 0,6–1,0 °C/W. Quanto menor o R, melhor o resfriamento.`,
  },
];

export default function Fisica() {
  return (
    <div
      style={{
        maxWidth: '860px',
        margin: '0 auto',
        padding: '88px 24px 60px',
      }}
    >
      <div style={{ marginBottom: '40px' }}>
        <div
          style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.16em',
            color: 'var(--accent-hot)',
            marginBottom: '10px',
          }}
        >
          FUNDAMENTOS TEORICOS
        </div>
        <h1
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '36px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}
        >
          A Física por Trás do Simulador
        </h1>
        <p
          style={{
            marginTop: '12px',
            color: 'var(--text-secondary)',
            fontSize: '15px',
            maxWidth: '560px',
            lineHeight: 1.7,
          }}
        >
          Termodinâmica e transferência de calor aplicadas ao gerenciamento térmico de processadores.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {sections.map((s, i) => (
          <PhysicsSection key={s.id} section={s} isLast={i === sections.length - 1} />
        ))}
      </div>
    </div>
  );
}

function PhysicsSection({ section, isLast }) {
  return (
    <div
      style={{
        borderLeft: '2px solid var(--border)',
        paddingLeft: '28px',
        paddingBottom: isLast ? 0 : '36px',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '-5px',
          top: '4px',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'var(--accent-hot)',
          border: '2px solid var(--bg-void)',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
        <span
          style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '11px',
            color: 'var(--text-muted)',
            fontWeight: 600,
          }}
        >
          {section.id}
        </span>
        <h2
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '18px',
            fontWeight: 600,
            color: 'var(--text-primary)',
          }}
        >
          {section.title}
        </h2>
      </div>

      <div
        style={{
          background: 'var(--bg-panel)',
          border: '1px solid var(--border)',
          borderLeft: '3px solid var(--accent-hot)',
          borderRadius: '0 8px 8px 0',
          padding: '16px 20px',
          marginBottom: '14px',
        }}
      >
        <div
          style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '18px',
            fontWeight: 600,
            color: 'var(--accent-warm)',
            letterSpacing: '0.02em',
            marginBottom: '8px',
          }}
        >
          {section.formula}
        </div>
        <div
          style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '10px',
            color: 'var(--text-muted)',
            letterSpacing: '0.04em',
          }}
        >
          {section.formulaDesc}
        </div>
      </div>

      <div
        style={{
          color: 'var(--text-secondary)',
          fontSize: '14px',
          lineHeight: 1.75,
          maxWidth: '680px',
          whiteSpace: 'pre-line',
        }}
      >
        {section.content}
      </div>
    </div>
  );
}
