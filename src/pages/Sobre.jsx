const autores = [
  { nome: 'Dhavi Grandó da Silva', papel: 'Desenvolvedor / Autor' },
  { nome: 'Felipe Scremin', papel: 'Desenvolvedor / Autor' },
  { nome: 'Henrique de Souza', papel: 'Desenvolvedor / Autor' },
];

const referencias = [
  'HALLIDAY, David; RESNICK, Robert; WALKER, Jearl. Fundamentos de física: Gravitação, Ondas e Termodinâmica. 9. ed. Rio de Janeiro: LTC, 2012.',
  'YOUNG, Hugh D. et al. Física II: Termodinâmica e Ondas. 12. ed. São Paulo: Pearson, 2008.',
  'TIPLER, Paul Allen; MOSCA, Gene. Física para cientistas e engenheiros: Mecânica, Oscilações, Ondas e Termodinâmica. 6. ed. Rio de Janeiro: LTC, 2009.',
];

export default function Sobre() {
  return (
    <div
      style={{
        maxWidth: '780px',
        margin: '0 auto',
        padding: '88px 24px 60px',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
      }}
    >
      {/* Cabeçalho do projeto */}
      <div>
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
          TRABALHO FINAL — FISICA 2
        </div>
        <h1
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '36px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '6px',
          }}
        >
          Simulador Termico de PC
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
          Transferência de calor aplicada ao gerenciamento térmico de processadores
        </p>
      </div>

      {/* Informações acadêmicas */}
      <div
        style={{
          background: 'var(--bg-panel)',
          border: '1px solid var(--border)',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '12px 20px',
            borderBottom: '1px solid var(--border)',
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: 'var(--text-muted)',
          }}
        >
          INFORMACOES ACADEMICAS
        </div>
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[
            { label: 'Instituição', value: 'Universidade do Vale do Itajaí — Univali, Campus Itajaí' },
            { label: 'Curso', value: 'Engenharia da Computação — 3ª Fase' },
            { label: 'Disciplina', value: 'Física II' },
            { label: 'Tema', value: 'Termodinâmica' },
            { label: 'Professora', value: 'Paola Egert' },
            { label: 'Período', value: 'Maio de 2026' },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', gap: '16px', alignItems: 'baseline' }}>
              <div
                style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '10px',
                  color: 'var(--text-muted)',
                  minWidth: '90px',
                  letterSpacing: '0.04em',
                  flexShrink: 0,
                }}
              >
                {label}
              </div>
              <div style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: 500 }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Autores */}
      <div>
        <div
          style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: 'var(--text-muted)',
            marginBottom: '14px',
          }}
        >
          AUTORES
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {autores.map((a, i) => (
            <div
              key={i}
              style={{
                background: 'var(--bg-panel)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-bright)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--accent-hot)',
                  }}
                >
                  {a.nome.charAt(0)}
                </div>
                <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>
                  {a.nome}
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '10px',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.04em',
                }}
              >
                {a.papel}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Referências */}
      <div>
        <div
          style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: 'var(--text-muted)',
            marginBottom: '14px',
          }}
        >
          REFERENCIAS BIBLIOGRAFICAS
        </div>
        <div
          style={{
            background: 'var(--bg-panel)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            padding: '20px',
            minHeight: '80px',
            display: 'flex',
            alignItems: referencias.length === 0 ? 'center' : 'flex-start',
            justifyContent: referencias.length === 0 ? 'center' : 'flex-start',
          }}
        >
          {referencias.length === 0 ? (
            <span
              style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '11px',
                color: 'var(--text-muted)',
                fontStyle: 'italic',
              }}
            >
              — a preencher —
            </span>
          ) : (
            <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {referencias.map((ref, i) => (
                <li key={i} style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6 }}>
                  {ref}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>

      {/* Stack técnica */}
      <div>
        <div
          style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: 'var(--text-muted)',
            marginBottom: '14px',
          }}
        >
          TECNOLOGIAS UTILIZADAS
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {['React 19', 'Vite', 'Tailwind CSS', 'React Router', 'Recharts'].map(tech => (
            <span
              key={tech}
              style={{
                padding: '5px 12px',
                borderRadius: '5px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '11px',
                color: 'var(--text-secondary)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
