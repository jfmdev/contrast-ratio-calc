<script>
  import Color from 'color';
  import { onMount } from 'svelte';

  import { randomColor } from '../helpers/misc';

  // --- Variables --- //

  // Constants.
  const MAX_RATIO = 21;

  // Properties.
  export let active;
  export let available;
  export let align = 'left';
  export let partner;

  // Internal.
  let inputText = '';

  // Computed variables.
  $: alreadyAdded =
    available && active && available.find((color) => color.rgbNumber() === active.rgbNumber());
  $: isInvalid = parsedInput === null;
  $: isRight = align === 'right';
  $: parsedInput = safeParseColor(inputText);

  // --- Initialization --- //

  onMount(() => {
    updateInput(active);
  });

  export const updateInput = (newColor) => {
    inputText = newColor ? newColor.hex() : isRight ? '#fff' : '#000';
  };

  // --- Functions --- //

  function addColor() {
    if (alreadyAdded) {
      return;
    }

    if (isRight) {
      available.push(active);
    } else {
      available.unshift(active);
    }

    available = available;
  }

  /**
   * Search for a color with same hue and saturation but with different luminosity to achieve better contrast.
   */
  function improve() {
    const currRatio = active.contrast(partner);
    if (!active || !partner || currRatio >= MAX_RATIO) {
      return;
    }

    // Attempt to improve contrast by 0.5.
    let nextRatio = Math.ceil((currRatio + 0.1) / 0.5) * 0.5;
    if (nextRatio >= MAX_RATIO) {
      nextRatio = MAX_RATIO;
    }

    let nextColor = Color(active.hex());
    let nextLightness = 50;

    while (nextColor.contrast(partner) < nextRatio && nextLightness > 0 && nextLightness < 100) {
      const hslValues = nextColor.hsl().color;
      nextLightness = hslValues[2] + (partner.isDark() ? 1 : -1);

      if (nextLightness > 100) nextLightness = 100;
      if (nextLightness < 0) nextLightness = 0;

      nextColor = Color(`hsl(${hslValues[0]}, ${hslValues[1]}%, ${nextLightness}%)`);
    }

    // Check that color was indeed improved.
    if (currRatio < nextColor.contrast(partner)) {
      active = nextColor;
      inputText = nextColor.hex();
    }
  }

  function onInput() {
    active = parsedInput;
  }

  function safeParseColor(textColor) {
    try {
      return Color(textColor);
    } catch (err) {
      return null;
    }
  }

  function setRandom() {
    active = randomColor();
    inputText = active.hex();
  }
</script>

<!-- TODO: Use color picker -->
<div class={`d-flex ${isRight ? 'flex-row-reverse' : 'flex-row'}`}>
  <input
    type="text"
    class={`border rounded-3 p-1 fs-lg-2 outline-0 ${isInvalid ? 'border-danger' : 'border-dark'} ${
      isRight ? 'text-end' : 'text-start'
    }`}
    bind:value={inputText}
    on:input={onInput}
  />
  <span class="border border-dark rounded-3 size-30 mx-1" style:background-color={inputText} />
</div>

<div class={`d-flex ${isRight ? 'flex-row-reverse' : 'flex-row'} mt-2`}>
  <button
    class="btn btn-success btn-sm rounded-pill"
    on:click={addColor}
    disabled={isInvalid || alreadyAdded}
    title="Add color to list"
  >
    <i class="bi bi-plus-circle-fill" />
    Add
  </button>

  <button
    class="btn btn-primary btn-sm rounded-pill mx-2"
    on:click={improve}
    disabled={isInvalid || !partner}
    title="Improve contrast"
  >
    <i class="bi bi-lightbulb" />
    Improve
  </button>

  <button
    class="btn btn-secondary btn-sm rounded-pill"
    on:click={setRandom}
    title="Get a random color"
  >
    <i class="bi bi-arrow-repeat" />
    Random
  </button>
</div>
