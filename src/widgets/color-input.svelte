<script>
  import Color from 'color';
  import { onMount } from 'svelte';

  import { randomColor } from '../helpers/misc';

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
  $: parsedInput = safeParseColor(inputText);

  // --- Initialization --- //

  onMount(() => {
    updateInput(active);
  });

  export const updateInput = (newColor) => {
    inputText = newColor ? newColor.hex() : isRight ? '#fff' : '#000';
  };

  // --- Functions --- //

  function onInput() {
    active = parsedInput;
  }

  // TODO: Implement (improve contrast to 3, 4.5, 6, 7.5...)
  function improve() {
    alert('WIP');
  }

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
<input
  type="text"
  class={`border rounded-3 p-1 fs-lg-2 outline-0 ${isInvalid ? 'border-danger' : 'border-dark'} ${
    isRight ? 'text-end' : 'text-start'
  }`}
  bind:value={inputText}
  on:input={onInput}
/>

<!-- TODO: Style buttons -->
<div class={`d-flex ${isRight ? 'flex-row-reverse' : 'flex-row'} mt-2`}>
  <button on:click={addColor} disabled={isInvalid || alreadyAdded} title="Add color to list"
    >Add</button
  >
  <button on:click={improve} disabled={isInvalid || !partner} class="mx-2" title="Improve contrast"
    >Improve</button
  >
  <button on:click={setRandom} title="Get a random color">Random</button>
</div>
