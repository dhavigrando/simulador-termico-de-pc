const TAU = 60;
const T_INICIAL = 25;
const T_MAX_POINTS = 60;
const T_END = 300;

export function calcTFinal(tdp, carga, rPasta, rCooler, tAmbiente) {
  const potencia = tdp * (carga / 100);
  return tAmbiente + potencia * (rPasta + rCooler);
}

export function calcCurva(tFinal, tAmbiente) {
  const tInicial = tAmbiente;
  const points = [];
  for (let i = 0; i <= T_MAX_POINTS; i++) {
    const t = (i / T_MAX_POINTS) * T_END;
    const temp = tFinal - (tFinal - tInicial) * Math.exp(-t / TAU);
    points.push({ t: Math.round(t), temp: parseFloat(temp.toFixed(1)) });
  }
  return points;
}

export function tempToColor(temp) {
  const cold = 25;
  const hot = 100;
  const ratio = Math.min(Math.max((temp - cold) / (hot - cold), 0), 1);

  if (ratio < 0.5) {
    const r = Math.round(ratio * 2 * 255);
    const g = Math.round(ratio * 2 * 140 + (1 - ratio * 2) * 170);
    const b = Math.round((1 - ratio * 2) * 238);
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    const t = (ratio - 0.5) * 2;
    const r = 255;
    const g = Math.round((1 - t) * 140);
    const b = 0;
    return `rgb(${r}, ${g}, ${b})`;
  }
}

export function tempLabel(temp) {
  if (temp < 50) return 'Frio';
  if (temp < 70) return 'Normal';
  if (temp < 85) return 'Quente';
  if (temp < 100) return 'Critico';
  return 'PERIGO';
}
