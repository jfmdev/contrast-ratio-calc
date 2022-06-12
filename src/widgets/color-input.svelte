<script>
  import Color from 'color';
  import { onMount } from 'svelte';

  import { improveContrast, randomColor } from '../helpers/misc';

  // --- Variables --- //

  // Properties.
  export let colorIndex;
  export let colorList;
  export let align = 'left';
  export let partner;

  // Internal.
  let inputText = '';

  // Computed variables.
  $: isInvalid = parsedInput === null;
  $: isRight = align === 'right';
  $: mainColor = colorList[colorIndex];
  $: betterColor = improveContrast(mainColor, partner);
  $: parsedInput = safeParseColor(inputText);

  // --- Initialization --- //

  onMount(() => {
    updateInput(mainColor);
  });

  export const updateInput = (newColor) => {
    inputText = newColor ? newColor.hex() : isRight ? '#fff' : '#000';
  };

  // --- Functions --- //

  function improve() {
    updateMainColor(betterColor);
    inputText = betterColor.hex();
  }

  function onInput() {
    if (parsedInput) {
      updateMainColor(parsedInput);
    }
  }

  function safeParseColor(textColor) {
    try {
      return Color(textColor);
    } catch (err) {
      return null;
    }
  }

  function setRandom() {
    const newColor = randomColor();
    updateMainColor(newColor);
    inputText = newColor.hex();
  }

  function updateMainColor(newColor) {
    colorList[colorIndex] = newColor;
    colorList = colorList;
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

  <button
    type="button"
    class="btn p-0 border border-dark rounded-3 size-30 mx-1"
    style:background-color={mainColor}
    style:color={mainColor.isDark() ? 'white' : 'black'}
    on:click={setRandom}
    title="Get a random color"
  >
    <i class="bi bi-arrow-repeat" />
  </button>

  <button
    type="button"
    class="btn p-0 border border-dark rounded-3 size-30 mx-1"
    style:background-color={betterColor.hex()}
    style:color={betterColor.isDark() ? 'white' : 'black'}
    on:click={improve}
    disabled={isInvalid || mainColor.rgbNumber() === betterColor.rgbNumber()}
    title="Increase contrast"
  >
    <i class="bi bi-lightbulb-fill" />
  </button>
</div>
