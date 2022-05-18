<script>
  import '../styles/main.scss';

  import { randomColor } from '../helpers/misc';

  import ColorBadge from '../widgets/color-badge.svelte';
  import ColorInput from '../widgets/color-input.svelte';
  import ContrastChart from '../widgets/contrast-chart.svelte';

  // TODO: Initialize lists with Bootstrap default color.
  let backColors = [randomColor(), randomColor(), randomColor(), randomColor()];
  let foreColors = [randomColor(), randomColor(), randomColor()];

  let selectedBack = backColors[backColors.length - 1];
  let selectedFore = foreColors[0];

  // CAVEAT: Since Svelte don't has "watchers", I need to manually notify the color inputs when a badge is clicked.
  let backRef;
  let foreRef;

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
    <div class="mx-3">
      <div>
        <ContrastChart back={selectedBack} fore={selectedFore} size="lg" />
      </div>
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
          selected={selectedBack}
          on:change={(evt) => {
            selectedBack = evt.detail;
            backRef.updateInput(selectedBack);
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
            foreRef.updateInput(selectedFore);
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

<footer class="bg-gray-200 border-top border-dark text-center fs-sm-2">
  <p class="my-1">
    <strong>Copyright &copy; 2022</strong> |
    <a href="https://github.com/jfmdev/contrast-ratio-tool" title="See this project at Github"
      >https://github.com/jfmdev/contrast-ratio-tool</a
    >
  </p>
  <p class="my-1">
    This application is free software; you can redistribute it and/or modify it under the terms of
    the Mozilla Public License v2.0
  </p>
</footer>
