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
  let nextRandom = randomColor();
  let colorTimer;

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

  function onColorInput(evt) {
    clearTimeout(colorTimer);
    colorTimer = setTimeout(() => {
      updateMainColor(Color(evt.target.value));
    }, 100);
  }

  function onTextInput() {
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
    updateMainColor(nextRandom);
    inputText = nextRandom.hex();

    nextRandom = randomColor();
  }

  function updateMainColor(newColor) {
    colorList[colorIndex] = newColor;
    colorList = colorList;
  }
</script>

<div class={`d-flex ${isRight ? 'flex-row-reverse' : 'flex-row'}`}>
  <input
    type="text"
    class={`border fs-lg-2 outline-0 ${isInvalid ? 'border-danger' : 'border-dark'} ${
      isRight ? 'text-end rounded-end border-start-0' : 'text-start rounded-start  border-end-0'
    }`}
    bind:value={inputText}
    on:input={onTextInput}
  />

  <input
    type="color"
    class={`border border-dark clickable size-32 ${isRight ? 'rounded-start' : 'rounded-end'}`}
    style:background-color={mainColor.hex()}
    value={mainColor.hex()}
    on:input={onColorInput}
  />

  <button
    type="button"
    class="btn p-0 border border-dark rounded-3 size-32 mx-2"
    style:background-color={betterColor.hex()}
    style:color={betterColor.isDark() ? 'white' : 'black'}
    on:click={improve}
    disabled={isInvalid || mainColor.rgbNumber() === betterColor.rgbNumber()}
    title="Increase contrast"
  >
    <i class="bi bi-lightbulb-fill" />
  </button>

  <button
    type="button"
    class="btn p-0 border border-dark rounded-3 size-32"
    style:background-color={nextRandom}
    style:color={nextRandom.isDark() ? 'white' : 'black'}
    on:click={setRandom}
    title="Get a random color"
  >
    <i class="bi bi-arrow-repeat" />
  </button>
</div>
