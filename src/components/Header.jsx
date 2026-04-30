import { NavLink } from 'react-router-dom';
import { useIsMobile } from '../hooks/useIsMobile';

export default function Header() {
  const isMobile = useIsMobile();

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(9, 9, 12, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: isMobile ? '0 16px' : '0 24px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <ThermalIcon />
          <span
            style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: isMobile ? '9.5px' : '13px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: isMobile ? '0.02em' : '0.04em',
              whiteSpace: 'nowrap',
            }}
          >
            SIMULADOR TERMICO DE PC
          </span>
        </div>

        <nav style={{ display: 'flex', gap: '2px', flexShrink: 0 }}>
          {[
            { to: '/', label: 'Simulador' },
            { to: '/fisica', label: 'A Fisica' },
            { to: '/sobre', label: 'Sobre' },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              style={({ isActive }) => ({
                padding: isMobile ? '3px 8px' : '4px 12px',
                borderRadius: '4px',
                fontSize: isMobile ? '11px' : '13px',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'background 0.15s, color 0.15s',
                background: isActive ? 'var(--bg-card)' : 'transparent',
                color: isActive ? 'var(--accent-hot)' : 'var(--text-secondary)',
                border: isActive ? '1px solid var(--border-bright)' : '1px solid transparent',
                whiteSpace: 'nowrap',
                lineHeight: '1.4',
              })}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

function ThermalIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="14" height="14" rx="2" stroke="var(--accent-hot)" strokeWidth="1.5" />
      <rect x="7" y="7" width="8" height="8" rx="1" fill="var(--accent-hot)" fillOpacity="0.2" stroke="var(--accent-hot)" strokeWidth="1" />
      <line x1="2" y1="8" x2="4" y2="8" stroke="var(--border-bright)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="2" y1="11" x2="4" y2="11" stroke="var(--border-bright)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="2" y1="14" x2="4" y2="14" stroke="var(--border-bright)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="8" x2="20" y2="8" stroke="var(--border-bright)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="11" x2="20" y2="11" stroke="var(--border-bright)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="14" x2="20" y2="14" stroke="var(--border-bright)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="2" x2="8" y2="4" stroke="var(--border-bright)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="11" y1="2" x2="11" y2="4" stroke="var(--border-bright)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="2" x2="14" y2="4" stroke="var(--border-bright)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="18" x2="8" y2="20" stroke="var(--border-bright)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="11" y1="18" x2="11" y2="20" stroke="var(--border-bright)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="18" x2="14" y2="20" stroke="var(--border-bright)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
