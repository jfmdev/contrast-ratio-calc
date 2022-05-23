<script>
  import { ratioColor, RATIO_MAX } from '../helpers/misc';

  const BAR_HEIGHT = 20;
  const TRIANGLE_SIZE = 8;

  export let back;
  export let fore;

  $: ratio = back.contrast(fore);
  $: arrowPos = (100 * Math.log10(ratio)) / Math.log10(RATIO_MAX);
</script>

<div class="text-center fs-4 fw-bold mb-2" style:color={ratioColor(ratio)}>
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
