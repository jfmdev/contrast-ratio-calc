import Color from 'color';

// --- Constants --- //

export const RATIO_GOOD = 4.5;
export const RATIO_MIN = 1;
export const RATIO_MAX = 21;
export const RATIO_OKAY = 3;

// --- Random color --- //

export function randomColor() {
  return Color.rgb(
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255)
  );
}

// --- Ratio color --- //

const HUE_GREEN = 120;
const HUE_YELLOW = 60;
const HUE_RED = 0;

/**
 * Search for a color with same hue and saturation but with different luminosity to achieve better contrast.
 */
export function improveContrast(main, partner) {
  if (!main || !partner) return main;

  const currRatio = main.contrast(partner);
  if (currRatio >= RATIO_MAX) {
    return main;
  }

  // Attempt to improve contrast by 0.5.
  let nextRatio = Math.ceil((currRatio + 0.1) / 0.5) * 0.5;
  if (nextRatio >= RATIO_MAX) {
    nextRatio = RATIO_MAX;
  }

  let nextColor = Color(main.hex());
  let nextLightness = 50;

  while (nextColor.contrast(partner) < nextRatio && nextLightness > 0 && nextLightness < 100) {
    const hslValues = nextColor.hsl().color;
    nextLightness = hslValues[2] + (partner.isDark() ? 1 : -1);

    if (nextLightness > 100) nextLightness = 100;
    if (nextLightness < 0) nextLightness = 0;

    nextColor = Color(`hsl(${hslValues[0]}, ${hslValues[1]}%, ${nextLightness}%)`);
  }

  // Check that color was indeed improved.
  if (currRatio < nextColor.contrast(partner)) {
    return nextColor;
  }

  return main;
}

/**
 * Returns a color describing how good a contrast ratio value (e.g. green for good, red for bad).
 */
export function ratioColor(ratio) {
  const hue =
    ratio >= RATIO_GOOD
      ? HUE_GREEN
      : ratio >= RATIO_OKAY
      ? ((HUE_GREEN - HUE_YELLOW) * (ratio - RATIO_OKAY)) / (RATIO_GOOD - RATIO_OKAY) + HUE_YELLOW
      : ((HUE_YELLOW - HUE_RED) * (ratio - RATIO_MIN)) / (RATIO_OKAY - RATIO_MIN) + HUE_RED;

  const lightness =
    ratio >= RATIO_GOOD ? 32 - (32 * (ratio - RATIO_GOOD)) / (RATIO_MAX - RATIO_GOOD) : 32;

  return `hsl(${Math.round(hue)}, 100%, ${lightness}%)`;
}

// --- Unique ID --- //

let uniqueId_count = 0;

export function uniqueId(preffix) {
  return `${preffix || ''}${uniqueId_count++}`;
}

export default {
  RATIO_GOOD,
  RATIO_MIN,
  RATIO_MAX,
  RATIO_OKAY,

  randomColor,
  ratioColor,
  uniqueId
};
