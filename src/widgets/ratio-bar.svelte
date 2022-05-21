<script>
  export let barHeight = 20;
  export let ratio;

  // const MIN_RATIO = 1;
  const MAX_RATIO = 21;
  const TRIANGLE_SIZE = 12;

  $: arrowPos = (100 * Math.log10(ratio)) / Math.log10(MAX_RATIO);
</script>

<div class="bg-ratio-bar rounded-3 mt-2 position-relative" style:height={`${barHeight}px`}>
  <div
    class="position-absolute triangle-down-12px"
    style:top={`-${TRIANGLE_SIZE / 2}px`}
    style:left={`calc(${arrowPos}% - ${TRIANGLE_SIZE}px)`}
    style:transition="left 1s"
  />
</div>
