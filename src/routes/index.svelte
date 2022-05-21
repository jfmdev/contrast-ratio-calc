<script>
  import '../styles/main.scss';
  import Color from 'color';

  import ColorBadge from '../widgets/color-badge.svelte';
  import ColorInput from '../widgets/color-input.svelte';
  import ContrastChart from '../widgets/contrast-chart.svelte';
  import TextSamples from '../widgets/text-samples.svelte';

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

  let selectedBack = backColors[backColors.length - 1];
  let selectedFore = foreColors[0];

  let backRef;
  let foreRef;

  // CAVEAT: Since Svelte don't has "watchers",inputs need to be manually notified when a badge is clicked.
  function selectColor(newColor, type) {
    if (type === 'back') {
      selectedBack = newColor;
      backRef.updateInput(selectedBack);
    } else {
      selectedFore = newColor;
      foreRef.updateInput(selectedFore);
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
        bind:active={selectedBack}
        bind:available={backColors}
        partner={selectedFore}
        align="right"
      />
    </div>
    <div class="mx-3 text-center">
      <ContrastChart back={selectedBack} fore={selectedFore} size="lg" ratioBar={true} />
    </div>
    <div>
      <ColorInput
        bind:this={foreRef}
        bind:active={selectedFore}
        bind:available={foreColors}
        partner={selectedBack}
      />
    </div>
  </div>

  <div class="d-flex">
    <div class="flex-1 pe-4 text-end">
      {#each backColors as backColor}
        <ColorBadge
          color={backColor}
          deletable={backColors.length > 1}
          selected={selectedBack}
          on:select={(evt) => selectColor(evt.detail, 'back')}
          on:remove={(evt) => removeColor(evt.detail, 'back')}
          radioName="back-colors"
          class="mb-2 ms-2"
        />
      {/each}
    </div>
    <div class="flex-1 ps-4 text-start">
      {#each foreColors as foreColor}
        <ColorBadge
          color={foreColor}
          deletable={foreColors.length > 1}
          selected={selectedFore}
          on:select={(evt) => selectColor(evt.detail, 'fore')}
          on:remove={(evt) => removeColor(evt.detail, 'fore')}
          radioName="fore-colors"
          class="mb-2 me-2"
        />
      {/each}
    </div>
  </div>
</header>

<main class="py-2">
  <TextSamples {backColors} {foreColors} />

  <!-- TODO: Improve how ratio matrix is displayed -->
  <div class="container text-center mt-3">
    {#each backColors as backColor}
      <div class="row">
        {#each foreColors as foreColor}
          <div class="col">
            <ContrastChart back={backColor} fore={foreColor} />
          </div>
        {/each}
      </div>
    {/each}
  </div>
</main>

<footer class="bg-gray-200 border-top border-dark text-center fs-sm-2">
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
