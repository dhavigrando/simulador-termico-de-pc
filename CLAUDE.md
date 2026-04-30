# Simulador Térmico de PC

Trabalho final de Física 2 (Termodinâmica) — Engenharia da Computação, Univali, Campus Itajaí, 3ª fase.
Autores: Dhavi Grandó da Silva, Felipe Scremin, Henrique de Souza. Professora: Paola Egert.

## Stack

- **React 19** + **Vite 8** — scaffolding e build
- **Tailwind CSS** via plugin `@tailwindcss/vite` — utilitários; estilos de componente são inline
- **Recharts** — gráfico da curva de aquecimento T(t)
- **React Router DOM** — roteamento client-side (sem backend)
- **IBM Plex Mono** + **DM Sans** — fontes (Google Fonts)

## Estrutura

```
src/
  data/
    hardware.js   # arrays de CPUs, coolers e pastas com nome e parâmetros físicos
    physics.js    # funções calcTFinal, calcCurva, tempToColor, tempLabel
  hooks/
    useIsMobile.js  # detecta largura < 768px com resize listener
  components/
    Header.jsx        # navbar fixa, responsiva
    ControlPanel.jsx  # dropdowns e sliders do simulador
    PCIllustration.jsx # SVG com glow térmico proporcional à temperatura
    TempCard.jsx      # card de temperatura final com barra de status
    TempChart.jsx     # gráfico Recharts da curva T(t)
  pages/
    Simulador.jsx  # rota /  — layout em 3 colunas (desktop) / 1 coluna (mobile)
    Fisica.jsx     # rota /fisica — 5 seções teóricas com fórmulas
    Sobre.jsx      # rota /sobre — dados acadêmicos e referências ABNT
```

## Modelo Físico

### Temperatura em regime permanente

```
T_final = T_ambiente + (TDP × carga/100) × (R_pasta + R_cooler)
```

- `TDP` em watts, definido por CPU
- `carga` em % (0–100), controlada pelo slider
- `R_pasta` e `R_cooler` em °C/W, definidos pelos dropdowns
- `T_ambiente` em °C (15–40), controlada pelo slider

### Curva temporal de aquecimento

```
T(t) = T_final − (T_final − T_ambiente) × exp(−t / τ)
```

- `τ = 60 s` (constante de tempo padrão para desktop)
- 61 pontos gerados de t = 0 s a t = 300 s
- Curva recalculada em tempo real a cada mudança de controle

### Escala de risco

| Faixa | Status |
|-------|--------|
| < 50 °C | Frio |
| 50–69 °C | Normal |
| 70–84 °C | Quente |
| 85–99 °C | Crítico |
| ≥ 100 °C | PERIGO |

## Design

- **Tema escuro** — fundo `#09090c`, superfícies em tons de `#10–#1c`
- **Calor → cor**: gradiente azul (`#0099ee`) → laranja (`#ff8c00`) → vermelho (`#ff5500`) proporcional à temperatura (25 °C–100 °C), aplicado em tempo real ao glow da ilustração, ao texto da temperatura e à linha do gráfico
- **Tipografia**: IBM Plex Mono para dados numéricos e labels; DM Sans para texto corrido
- **Responsividade**: hook `useIsMobile` (breakpoint 768 px) alterna o grid de 3 colunas para coluna única; header reduz fonte do título no mobile
- **Gráfico mobile**: `touch-action: none` no wrapper do Recharts impede scroll indesejado; `outline: none` remove borda de foco do browser

## Dados de Hardware

Definidos em `src/data/hardware.js` como arrays de objetos:

```js
// CPUs
{ nome: string, tdp: number }          // tdp em watts

// Coolers e pastas
{ nome: string, resistencia_termica: number }  // em °C/W
```

## Repositório

- GitHub: https://github.com/dhavigrando/simulador-termico-de-pc
- Deploy: Vercel (CI automático a cada push no branch master)

## Fluxo de trabalho

Todo commit deve ser seguido de push imediato para o GitHub:

```bash
git add <arquivos>
git commit -m "mensagem"
git push
```

O Vercel detecta o push e atualiza o deploy automaticamente.
