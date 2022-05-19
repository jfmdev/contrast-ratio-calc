<script>
  import { createEventDispatcher } from 'svelte';
  import { uniqueId } from '../helpers/misc';

  const dispatch = createEventDispatcher();

  // Properties.
  export let color;
  export let deletable;
  export let radioName;
  export let selected;

  // Internal variables.
  let id = uniqueId('radio-color-');
  $: labelClass = color.isDark() ? 'text-light' : 'text-dark';
  $: isChecked = selected && selected.rgbNumber() === color.rgbNumber();

  // Functions.
  function onChange() {
    dispatch('select', color);
  }

  function onBtnClick() {
    dispatch('remove', color);
  }

  // Auxiliary code to read instance class attribute.
  let classProp;
  export { classProp as class };
</script>

<div
  class={`border border-dark rounded-pill d-inline-flex align-items-center p-1 ${classProp || ''}`}
  style:background-color={color.hex()}
>
  <input
    {id}
    type="radio"
    name={radioName}
    value={color.rgbNumber()}
    class="my-0 mx-1"
    checked={isChecked}
    on:change={onChange}
  />
  <label for={id} class={`font-monospace clickable ${labelClass}`}>{color.hex()}</label>
  {#if deletable}
    <!-- TODO: Style button -->
    <button class="ms-1 rounded-circle clickable" on:click={onBtnClick}>X</button>
  {/if}
</div>
