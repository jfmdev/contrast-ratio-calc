<script>
  import { createEventDispatcher } from 'svelte';
  import uniqueId from '../helpers/unique-id';

  const dispatch = createEventDispatcher();

  // TODO: Add delete button.
  // TODO: Add property to show/hide delete button.

  // Properties.
  export let color;
  export let radioName;
  export let selected;

  // Internal variables.
  let id = uniqueId('radio-color-');
  $: labelClass = color.isDark() ? 'text-light' : 'text-dark';

  // Functions.
  function onChange() {
    dispatch('change', color);
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
    checked={selected === color}
    on:change={onChange}
  />
  <label for={id} class={`font-monospace clickable ${labelClass}`}>{color.hex()}</label>
</div>
