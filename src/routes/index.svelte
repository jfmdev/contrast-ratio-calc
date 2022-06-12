<script>
  import '../styles/main.scss';

  import Color from 'color';
  import { onMount } from 'svelte';

  import ColorBadge from '../widgets/color-badge.svelte';
  import ColorInput from '../widgets/color-input.svelte';
  import RatioChart from '../widgets/ratio-chart.svelte';
  import RatiosTable from '../widgets/ratios-table.svelte';
  import Taijitu from '../widgets/taijitu.svelte';
  import TextSamples from '../widgets/text-samples.svelte';

  const BLACK = Color('#000');
  const WHITE = Color('#FFF');

  // --- Initialization --- //

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

  let mounted = false;
  onMount(() => {
    // Check if colors must be initialized with values from URL or Local Storage.
    const newBack = getURLOrLocalStorageColors('back');
    if (newBack) {
      backColors = newBack;
      if (backIndex >= newBack.length) {
        backIndex = newBack.length - 1;
      }
      selectColor(backIndex, 'back'); // CAVEAT: Update input.
    }
    const newFore = getURLOrLocalStorageColors('fore');
    if (newFore) {
      foreColors = newFore;
      if (foreIndex >= newFore.length) {
        foreIndex = newFore.length - 1;
      }
      selectColor(foreIndex, 'fore'); // CAVEAT: Update input.
    }

    mounted = true;
  });

  $: colorsWatcher = onColorsUpdated(backColors, foreColors);

  // --- Functions --- //

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

  function removeColor(colorIndex, type) {
    if (type === 'back') {
      if (colorIndex >= 0 && colorIndex < backColors.length) {
        backColors.splice(colorIndex, 1);
        backColors = backColors;
      }
    } else {
      if (colorIndex >= 0 && colorIndex < foreColors.length) {
        foreColors.splice(colorIndex, 1);
        foreColors = foreColors;
      }
    }
  }

  function onColorsUpdated(back, fore) {
    if (!mounted) return;

    // Update local storage.
    localStorage.setItem('back', JSON.stringify(back.map((color) => color.hex())));
    localStorage.setItem('fore', JSON.stringify(fore.map((color) => color.hex())));

    // Update URL.
    const searchParams = new URLSearchParams();
    searchParams.set('back', back.map((color) => color.hex().substring(1)).join('-'));
    searchParams.set('fore', fore.map((color) => color.hex().substring(1)).join('-'));
    history.replaceState(null, null, '?' + searchParams.toString());
  }

  function getLocalStorageColors(key) {
    const res = [];

    try {
      const rawData = JSON.parse(localStorage.getItem(key));
      rawData.forEach((colorString) => res.push(new Color(colorString)));
    } catch (err) {
      // Do nothing.
    }

    return res;
  }

  function getURLParamsColors(key) {
    const res = [];

    try {
      const params = new URLSearchParams(window.location.search);
      if (params.has(key)) {
        const rawData = params.get(key).split('-');
        rawData.forEach((colorString) => res.push(new Color(`#${colorString}`)));
      }
    } catch (err) {
      // Do nothing.
    }

    return res;
  }

  function getURLOrLocalStorageColors(key) {
    const urlColors = getURLParamsColors(key);
    if (urlColors.length > 0) return urlColors;

    const lsColors = getLocalStorageColors(key);
    if (lsColors.length > 0) return lsColors;

    return null;
  }
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
