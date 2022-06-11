<script>
  import '../styles/main.scss';
  import Color from 'color';

  import ColorBadge from '../widgets/color-badge.svelte';
  import ColorInput from '../widgets/color-input.svelte';
  import RatioChart from '../widgets/ratio-chart.svelte';
  import RatiosTable from '../widgets/ratios-table.svelte';
  import Taijitu from '../widgets/taijitu.svelte';
  import TextSamples from '../widgets/text-samples.svelte';

  const BLACK = Color('#000');
  const WHITE = Color('#FFF');

  // Initialize lists with Bootstrap 5 colors.
  let backColors = [Color('#CCE5FF'), Color('#E9ECEF'), Color('#F8F9FA')];
  let foreColors = [
    Color('#343A40'),
    Color('#007BFF'),
    Color('#868E96'),
    Color('#28A745'),
    Color('#DC3545'),
    Color('#FFC107'),
    Color('#17A2B8')
  ];

  let backIndex = backColors.length - 1;
  let foreIndex = 0;

  let backRef;
  let foreRef;

  // CAVEAT: Since Svelte don't has "watchers", inputs need to be manually notified when a badge is clicked.
  function selectColor(colorIndex, type) {
    if (type === 'back') {
      backIndex = colorIndex;
      backRef.updateInput(backColors[colorIndex]);
    } else {
      foreIndex = colorIndex;
      foreRef.updateInput(foreColors[colorIndex]);
    }
  }

  function removeColor(color, type) {
    if (type === 'back') {
      const colorIndex = backColors.findIndex((item) => item.rgbNumber() === color.rgbNumber());
      if (colorIndex >= 0 && backColors.length > 1) {
        backColors.splice(colorIndex, 1);
        backColors = backColors;
      }
    } else {
      const colorIndex = foreColors.findIndex((item) => item.rgbNumber() === color.rgbNumber());
      if (colorIndex >= 0 && foreColors.length > 1) {
        foreColors.splice(colorIndex, 1);
        foreColors = foreColors;
      }
    }
  }

  // TODO: Update URL with list of background and foreground colors (later parse URL for get values).
</script>

<header class="bg-split border-bottom border-dark py-2">
  <h1 class="text-center mt-0 mb-2">Constrast Ratio Calculator</h1>

  <div class="d-flex justify-content-center">
    <div class="pe-4">
      <h2 class="text-muted my-0">Background colors</h2>
    </div>
    <div class="ps-4">
      <h2 class="text-muted my-0">Foreground colors</h2>
    </div>
  </div>

  <div class="d-flex justify-content-center align-items-center my-2">
    <div>
      <ColorInput
        bind:this={backRef}
        bind:colorList={backColors}
        bind:colorIndex={backIndex}
        partner={foreColors[foreIndex]}
        align="right"
      />
    </div>
    <div class="mx-3">
      <Taijitu
        back={backColors[backIndex] || WHITE}
        fore={foreColors[foreIndex] || BLACK}
        size="lg"
      />
    </div>
    <div>
      <ColorInput
        bind:this={foreRef}
        bind:colorList={foreColors}
        bind:colorIndex={foreIndex}
        partner={backColors[backIndex]}
      />
    </div>
  </div>

  <div class="d-flex justify-content-center">
    <div class="flex-1 pe-4 text-end">
      {#each backColors as backColor, index}
        <ColorBadge
          color={backColor}
          selected={backIndex === index}
          on:select={() => selectColor(index, 'back')}
          on:remove={() => removeColor(index, 'back')}
          radioName="back-colors"
          class="mb-2 ms-2"
        />
      {/each}
    </div>
    <div class="mx-2 min-w-80px">
      <RatioChart back={backColors[backIndex] || WHITE} fore={foreColors[foreIndex] || BLACK} />
    </div>
    <div class="flex-1 ps-4 text-start">
      {#each foreColors as foreColor, index}
        <ColorBadge
          color={foreColor}
          selected={foreIndex === index}
          on:select={() => selectColor(index, 'fore')}
          on:remove={() => removeColor(index, 'fore')}
          radioName="fore-colors"
          class="mb-2 me-2"
        />
      {/each}
    </div>
  </div>
</header>

<main class="py-2">
  <h2 class="text-center m-2">Text samples</h2>

  <TextSamples {backColors} {foreColors} />

  <h2 class="text-center m-2">Ratio table</h2>

  <RatiosTable {backColors} {foreColors} />
</main>

<footer class="bg-gray-200 border-top border-dark text-center fs-sm-2 mt-2">
  <p class="my-1">
    <strong>Copyright &copy; 2022 JFMDev</strong> |
    <a href="https://github.com/jfmdev/contrast-ratio-tool" title="See this project at Github"
      >https://github.com/jfmdev/contrast-ratio-tool</a
    >
  </p>
  <p class="my-1">
    This application is free software; you can redistribute it and/or modify it under the terms of
    the Mozilla Public License v2.0
  </p>
</footer>
