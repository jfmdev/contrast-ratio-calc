<script>
  export let back;
  export let fore;
  export let size = 'md';

  $: svgSize = size === 'lg' ? 100 : size === 'md' ? 75 : 50;
</script>

<div class="d-inline-block position-relative" style:height={`${svgSize}px`}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-40 -40 80 80" style:height={`${svgSize}px`}>
    <circle r="39" fill={fore.hex()} />
    <path fill={back.hex()} d="M0,38a38,38 0 0 1 0,-76a19,19 0 0 1 0,38a19,19 0 0 0 0,38" />
    <!-- 
      <circle r="5" cy="19" fill="{back.hex()}"/>
      <circle r="5" cy="-19" fill="{fore.hex()}"/>
     -->
  </svg>
</div>
