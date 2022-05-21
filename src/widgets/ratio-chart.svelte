<script>
  const BAR_HEIGHT = 20;
  const TRIANGLE_SIZE = 8;

  const HUE_GREEN = 120;
  const HUE_YELLOW = 60;
  const HUE_RED = 0;

  const RATIO_GOOD = 4.5;
  const RATIO_MIN = 1;
  const RATIO_MAX = 21;
  const RATIO_OKAY = 3;

  export let back;
  export let fore;

  $: ratio = back.contrast(fore);
  $: arrowPos = (100 * Math.log10(ratio)) / Math.log10(RATIO_MAX);

  function getRatioColor(ratio) {
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
</script>

<div class="text-center fs-4 fw-bold mb-2" style:color={getRatioColor(ratio)}>
  {ratio.toFixed(ratio > 10 ? 1 : 2)}
</div>

<div class="bg-ratio-bar rounded-3 position-relative" style:height={`${BAR_HEIGHT}px`}>
  <div
    class="position-absolute triangle-down-8px"
    style:top={`-${TRIANGLE_SIZE / 2}px`}
    style:left={`calc(${arrowPos}% - ${TRIANGLE_SIZE}px)`}
    style:transition="left 1s"
  />
</div>
