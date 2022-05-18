<script>
  import Color from 'color';

  export let back;
  export let fore;
  export let size = 'md';

  const white = Color('#fff');
  const black = Color('#000');

  $: backColor = back || white;
  $: foreColor = fore || black;
  $: ratio = backColor.contrast(foreColor);
  $: svgSize = size === 'lg' ? 100 : size === 'md' ? 75 : 50;
  $: fontSize = size === 'lg' ? 32 : size === 'md' ? 24 : 16;
  $: fontColor =
    backColor.contrast(white) + foreColor.contrast(white) >
    backColor.contrast(black) + foreColor.contrast(black)
      ? 'text-light text-shadow-dark'
      : 'text-dark text-shadow-light';
</script>

<!-- TODO: Make ratio color to be red/orange/yellow/green/black depending of value -->
<div class="d-inline-block position-relative" style:height={`${svgSize}px`}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-40 -40 80 80" style:height={`${svgSize}px`}>
    <circle r="39" fill={foreColor.hex()} />
    <path fill={backColor.hex()} d="M0,38a38,38 0 0 1 0,-76a19,19 0 0 1 0,38a19,19 0 0 0 0,38" />
    <!-- 
      <circle r="5" cy="19" fill="{backColor.hex()}"/>
      <circle r="5" cy="-19" fill="{foreColor.hex()}"/>
     -->
  </svg>
  <div class={`position-absolute absolute-center ${fontColor}`} style:font-size={`${fontSize}px`}>
    {ratio.toFixed(ratio > 10 ? 1 : 2)}
  </div>
</div>
