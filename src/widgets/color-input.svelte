<script>
  import Color from 'color';
  import { onMount } from 'svelte';

  import { improveContrast, randomColor } from '../helpers/misc';

  // --- Variables --- //

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
  $: betterColor = improveContrast(active, partner);
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

  function improve() {
    active = betterColor;
    inputText = betterColor.hex();
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
    <i class="bi bi-bookmark" />
    Add
  </button>

  <button
    class="btn btn-primary btn-sm rounded-pill mx-2"
    on:click={improve}
    disabled={isInvalid || !active || !partner || active.rgbNumber() === betterColor.rgbNumber()}
    title="Improve contrast"
  >
    <i class="bi bi-plus-lg" />
    Contrast
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
