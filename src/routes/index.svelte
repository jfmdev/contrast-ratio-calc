<script>
  import '../styles/main.scss';
  import Color from 'color';

  import ColorBadge from '../widgets/color-badge.svelte';
  import ContrastChart from '../widgets/contrast-chart.svelte';

  // TODO: Initialize lists with Bootstrap default color.
  let backColors = [randomColor(), randomColor(), randomColor(), randomColor()];
  let foreColors = [randomColor(), randomColor(), randomColor()];

  let selectedBack = backColors[backColors.length - 1];
  let selectedFore = foreColors[0];

  function randomColor() {
    return Color.rgb(
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255)
    );
  }

  function addBackColor() {
    // TODO: This should be the input's color (if different from existing ones).
    const newColor = randomColor();
    backColors.push(newColor);
    backColors = backColors;
    selectedBack = newColor;
  }

  function addForeColor() {
    // TODO: This should be the input's color (if different from existing ones).
    const newColor = randomColor();
    foreColors.unshift(newColor);
    foreColors = foreColors;
    selectedFore = newColor;
  }

  // TODO: Update URL with list of background and foreground colors (later parse URL for get values).
  // TODO: Add color picker to inputs.
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
      <!-- TODO: Add box showing the color -->
      <!-- TODO: Add optimize button -->
      <!-- TODO: Add random color button -->
      <!-- TODO: Style button and input -->
      <input type="text" class="text-end" value={selectedBack.hex()} />
      <div class="text-end mt-2">
        <button on:click={addBackColor}>Add</button>
      </div>
    </div>
    <div class="mx-3">
      <div>
        <ContrastChart back={selectedBack} fore={selectedFore} size="lg" />
      </div>
    </div>
    <div>
      <!-- TODO: Add box showing the color -->
      <!-- TODO: Add optimize button -->
      <!-- TODO: Add random color button -->
      <!-- TODO: Style button and input -->
      <input type="text" value={selectedFore.hex()} />
      <div class="text-start mt-2">
        <button on:click={addForeColor}>Add</button>
      </div>
    </div>
  </div>

  <div class="d-flex">
    <div class="flex-1 pe-4 text-end">
      {#each backColors as backColor}
        <ColorBadge
          color={backColor}
          selected={selectedBack}
          on:change={(evt) => {
            selectedBack = evt.detail;
          }}
          radioName="back-colors"
          class="mb-2 ms-2"
        />
      {/each}
    </div>
    <div class="flex-1 ps-4 text-start">
      {#each foreColors as foreColor}
        <ColorBadge
          color={foreColor}
          selected={selectedFore}
          on:change={(evt) => {
            selectedFore = evt.detail;
          }}
          radioName="fore-colors"
          class="mb-2 me-2"
        />
      {/each}
    </div>
  </div>
</header>

<main class="py-2">
  <!-- TODO: Improve how text samples are show -->
  <div class="container">
    <div class="row g-0">
      {#each backColors as backColor}
        <div class="col-md-3 col-sm-4 col-6" style:background-color={backColor.hex()}>
          {#each foreColors as foreColor}
            <p class="mx-2" style:color={foreColor.hex()}>
              Lorem ipsum <em>dolor sit amet</em>, consectetur <strong>adipiscing elit</strong>, sed
              do <del>eiusmod</del> tempor incididunt <small>ut labore</small> et dolore magna aliqua.
            </p>
          {/each}
        </div>
      {/each}
    </div>
  </div>

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

<!-- TODO: Style footer -->
<footer class="bg-light border-top border-dark text-center py-2">
  <div>Copyright &copy; 2022</div>
  <div>
    This application is free software; you can redistribute it and/or modify it under the terms of
    the Mozilla Public License v2.0
  </div>
  <div>
    <a href="https://github.com/jfmdev/contrast-ratio-tool" title="See this project at Github"
      >https://github.com/jfmdev/contrast-ratio-tool</a
    >
  </div>
</footer>
