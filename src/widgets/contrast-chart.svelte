<script>
  import Color from 'color';

  import RatioBar from '../widgets/ratio-bar.svelte';

  export let back;
  export let fore;
  export let size = 'md';
  export let ratioBar = false;

  const WHITE = Color('#fff');
  const BLACK = Color('#000');

  $: backColor = back || WHITE;
  $: foreColor = fore || BLACK;
  $: ratio = backColor.contrast(foreColor);
  $: darkishBg =
    backColor.contrast(WHITE) + foreColor.contrast(WHITE) >
    backColor.contrast(BLACK) + foreColor.contrast(BLACK);

  $: svgSize = size === 'lg' ? 100 : size === 'md' ? 75 : 50;
  $: fontSize = size === 'lg' ? 32 : size === 'md' ? 24 : 16;
  $: fontStyle = darkishBg ? 'text-white text-shadow-dark' : 'text-black text-shadow-light';
</script>

<div class="d-inline-block position-relative" style:height={`${svgSize}px`}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-40 -40 80 80" style:height={`${svgSize}px`}>
    <circle r="39" fill={foreColor.hex()} />
    <path fill={backColor.hex()} d="M0,38a38,38 0 0 1 0,-76a19,19 0 0 1 0,38a19,19 0 0 0 0,38" />
    <!-- 
      <circle r="5" cy="19" fill="{backColor.hex()}"/>
      <circle r="5" cy="-19" fill="{foreColor.hex()}"/>
     -->
  </svg>
  <div class={`position-absolute absolute-center ${fontStyle}`} style:font-size={`${fontSize}px`}>
    {ratio.toFixed(ratio > 10 ? 1 : 2)}
  </div>
</div>

{#if ratioBar}
  <RatioBar {ratio} />
{/if}
