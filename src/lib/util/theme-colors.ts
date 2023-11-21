import { browser } from '$app/environment';

export interface ThemeColors {
  primary: string;
  primaryFocus: string;
  primaryContent: string;
  secondary: string;
  secondaryFocus: string;
  secondaryContent: string;
  accent: string;
  accentFocus: string;
  accentContent: string;
  neutral: string;
  neutralFocus: string;
  neutralContent: string;
  base100: string;
  base200: string;
  base300: string;
  baseContent: string;
  info: string;
  infoContent: string;
  success: string;
  successContent: string;
  warning: string;
  warningContent: string;
  error: string;
  errorContent: string;
}

function hslToHex(hslStr: string): string {
  let [h, s, l] = hslStr.split(' ').map((str) => +str.replace('%', ''));
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function extractThemeColorsFromDOM(): ThemeColors | null {
  if (!browser) {
    return null;
  }
  const computedStyles = getComputedStyle(document.querySelector(':root')!);
  return {
    primary: hslToHex(computedStyles.getPropertyValue('--p')),
    primaryFocus: hslToHex(computedStyles.getPropertyValue('--pf')),
    primaryContent: hslToHex(computedStyles.getPropertyValue('--pc')),
    secondary: hslToHex(computedStyles.getPropertyValue('--s')),
    secondaryFocus: hslToHex(computedStyles.getPropertyValue('--sf')),
    secondaryContent: hslToHex(computedStyles.getPropertyValue('--sc')),
    accent: hslToHex(computedStyles.getPropertyValue('--a')),
    accentFocus: hslToHex(computedStyles.getPropertyValue('--af')),
    accentContent: hslToHex(computedStyles.getPropertyValue('--ac')),
    neutral: hslToHex(computedStyles.getPropertyValue('--n')),
    neutralFocus: hslToHex(computedStyles.getPropertyValue('--nf')),
    neutralContent: hslToHex(computedStyles.getPropertyValue('--nc')),
    base100: hslToHex(computedStyles.getPropertyValue('--b1')),
    base200: hslToHex(computedStyles.getPropertyValue('--b2')),
    base300: hslToHex(computedStyles.getPropertyValue('--b3')),
    baseContent: hslToHex(computedStyles.getPropertyValue('--bc')),
    info: hslToHex(computedStyles.getPropertyValue('--in')),
    infoContent: hslToHex(computedStyles.getPropertyValue('--inc')),
    success: hslToHex(computedStyles.getPropertyValue('--su')),
    successContent: hslToHex(computedStyles.getPropertyValue('--suc')),
    warning: hslToHex(computedStyles.getPropertyValue('--wa')),
    warningContent: hslToHex(computedStyles.getPropertyValue('--wac')),
    error: hslToHex(computedStyles.getPropertyValue('--er')),
    errorContent: hslToHex(computedStyles.getPropertyValue('--erc'))
  };
}
