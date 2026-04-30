# Simulador Térmico de PC

Projeto acadêmico de Física II — Universidade do Vale do Itajaí (Univali), Campus Itajaí.
Autores: Dhavi Grandó da Silva, Felipe Scremin e Henrique de Souza. Professora: Paola Egert.

## Stack

- **React** + **Vite** — framework e build
- **Tailwind CSS** (plugin `@tailwindcss/vite`) — utilitários de estilo; estilos de componente são inline
- **Recharts** — gráfico da curva de aquecimento T(t)
- **React Router DOM** — três rotas client-side (`/`, `/fisica`, `/sobre`)
- Sem backend. Toda a lógica roda no browser.

## Modelo Físico

### Temperatura em regime permanente

```
T_final = T_amb + (TDP × carga) × (R_pasta + R_cooler)
```

### Curva temporal de aquecimento

```
T(t) = T_final − (T_final − T_amb) × e^(−t/τ)
```

Parâmetros: `τ = 60 s`, 61 pontos de `t = 0` a `t = 300 s`, recalculado em tempo real.

## Dados de Hardware

Definidos em `src/data/hardware.js`:

```js
// CPUs
{ nome: string, tdp: number }           // TDP em watts

// Coolers e pastas térmicas
{ nome: string, resistencia_termica: number }  // em °C/W
```

## Design

- Tema escuro — fundo `#09090c`, superfícies `#10`–`#1c`
- Acentos laranja/vermelho para calor: gradiente `#0099ee` → `#ff8c00` → `#ff5500` proporcional à temperatura (25–100 °C)
- Tipografia: **IBM Plex Mono** para dados numéricos; **DM Sans** para texto
- Responsivo: hook `useIsMobile` (breakpoint 768 px) alterna entre grid de 3 colunas e coluna única

## Fluxo de Trabalho

Todo commit deve incluir push imediato para o GitHub:

```bash
git add <arquivos>
git commit -m "mensagem"
git push
```

O Vercel detecta o push e atualiza o deploy automaticamente.
