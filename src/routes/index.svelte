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
  import { randomColor } from '../helpers/misc';

  const BLACK = Color('#000');
  const WHITE = Color('#FFF');

  // --- Initialization --- //

  // Initialize lists with Bootstrap 5 colors.
  const BACK_DEFAULT = [Color('#CCE5FF'), Color('#E9ECEF'), Color('#F8F9FA')];
  const FORE_DEFAULT = [
    Color('#343A40'),
    Color('#007BFF'),
    Color('#868E96'),
    Color('#28A745'),
    Color('#DC3545'),
    Color('#FFC107'),
    Color('#17A2B8')
  ];

  let backColors = [...BACK_DEFAULT];
  let foreColors = [...FORE_DEFAULT];

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
      selectColor(newBack.length - 1, 'back');
    }
    const newFore = getURLOrLocalStorageColors('fore');
    if (newFore) {
      foreColors = newFore;
      selectColor(0, 'fore');
    }

    mounted = true;
  });

  $: colorsWatcher = onColorsUpdated(backColors, foreColors);

  // --- Functions --- //

  function addColor(type) {
    if (type === 'fore') {
      foreColors.unshift(randomColor());
      foreColors = foreColors;
      selectColor(0, 'fore');
    } else {
      backColors.push(randomColor());
      backColors = backColors;
      selectColor(backColors.length - 1, 'back');
    }
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

  function removeColor(colorIndex, type) {
    if (type === 'back') {
      const currentSelected = backColors[backIndex];

      backColors.splice(colorIndex, 1);
      backColors = backColors;

      backIndex = backColors.indexOf(currentSelected);
    } else {
      const currentSelected = foreColors[foreIndex];

      foreColors.splice(colorIndex, 1);
      foreColors = foreColors;

      foreIndex = foreColors.indexOf(currentSelected);
    }
  }

  function resetColors(type) {
    if (!confirm('Are you sure you want to reset the list of colors?')) {
      return;
    }

    if (type === 'fore') {
      foreColors = [...FORE_DEFAULT];
      selectColor(0, 'fore');
    } else {
      backColors = [...BACK_DEFAULT];
      selectColor(backColors.length - 1, 'back');
    }
  }

  // CAVEAT: Since Svelte don't has "watchers", inputs need to be manually notified when a badge is clicked.
  function selectColor(colorIndex, type) {
    if (type === 'back') {
      backIndex = colorIndex;
      if (backRef) backRef.updateInput(backColors[colorIndex]);
    } else {
      foreIndex = colorIndex;
      if (foreRef) foreRef.updateInput(foreColors[colorIndex]);
    }
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

  <div class="d-md-flex justify-content-center align-items-center my-2">
    <div class="py-2 pe-2">
      <ColorInput
        bind:this={backRef}
        bind:colorList={backColors}
        bind:colorIndex={backIndex}
        partner={foreColors[foreIndex]}
        align="right"
      />
    </div>
    <div class="text-center mx-3">
      <Taijitu
        back={backColors[backIndex] || WHITE}
        fore={foreColors[foreIndex] || BLACK}
        size="lg"
      />
    </div>
    <div class="py-2 ps-2">
      <ColorInput
        bind:this={foreRef}
        bind:colorList={foreColors}
        bind:colorIndex={foreIndex}
        partner={backColors[backIndex]}
      />
    </div>
  </div>

  <div class="d-flex justify-content-center">
    <div class="flex-1 pe-4 text-end d-flex flex-column justify-content-between">
      <div>
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

      <div>
        <button
          type="button"
          class="btn btn-warning btn-sm rounded-pill mx-1"
          on:click={() => resetColors('back')}
          title="Reset background colors to default values"
        >
          <i class="bi bi-arrow-counterclockwise" />
          Reset
        </button>
        <button
          type="button"
          class="btn btn-success btn-sm rounded-pill"
          on:click={() => addColor('back')}
          title="Add background color"
        >
          <i class="bi bi-plus-circle" />
          Add
        </button>
      </div>
    </div>

    <div class="mx-2 min-w-80px">
      <RatioChart back={backColors[backIndex] || WHITE} fore={foreColors[foreIndex] || BLACK} />
    </div>

    <div class="flex-1 ps-4 text-start d-flex flex-column justify-content-between">
      <div>
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

      <div>
        <button
          type="button"
          class="btn btn-success btn-sm rounded-pill"
          on:click={() => addColor('fore')}
          title="Add foreground color"
        >
          <i class="bi bi-plus-circle" />
          Add
        </button>
        <button
          type="button"
          class="btn btn-warning btn-sm rounded-pill mx-1"
          on:click={() => resetColors('fore')}
          title="Reset foreground colors to default values"
        >
          <i class="bi bi-arrow-counterclockwise" />
          Reset
        </button>
      </div>
    </div>
  </div>
</header>

<main class="py-2">
  <h2 class="text-center m-2">Text samples</h2>

  <TextSamples {backColors} {foreColors} />

  <h2 class="text-center m-2">Ratio table</h2>

  <div class="w-100 overflow-auto">
    <RatiosTable {backColors} {foreColors} />
  </div>
</main>

<footer class="bg-gray-200 border-top border-dark text-center fs-sm-2 mt-2">
  <p class="my-1">
    <strong>Copyright &copy; 2022 JFMDev</strong>

    <span class="d-none d-sm-inline">|</span>
    <br class="d-sm-none" />

    <a href="https://github.com/jfmdev/contrast-ratio-calc" title="See this project at Github"
      >https://github.com/jfmdev/contrast-ratio-calc</a
    >
  </p>
  <p class="my-1">
    This application is free software; you can redistribute it and/or modify it under the terms of
    the Mozilla Public License v2.0
  </p>
</footer>
