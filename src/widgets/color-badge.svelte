<script>
  import { createEventDispatcher } from 'svelte';
  import { uniqueId } from '../helpers/misc';

  const dispatch = createEventDispatcher();

  // Properties.
  export let color;
  export let radioName;
  export let selected;

  // Internal variables.
  let id = uniqueId('radio-color-');

  $: deletable = !selected;
  $: deleteClass = color.isDark() ? 'text-danger-light' : 'text-danger-dark';
  $: labelClass = color.isDark() ? 'text-light' : 'text-dark';

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
  class={`border border-gray-500 rounded-3 fs-sm-1 d-inline-flex align-items-center ${
    classProp || ''
  }`}
  style:background-color={color.hex()}
>
  <input
    {id}
    type="radio"
    name={radioName}
    value={color.rgbNumber()}
    class="my-0 mx-1"
    checked={selected}
    on:change={onChange}
  />
  <label for={id} class={`font-monospace clickable my-1 ${labelClass}`}>{color.hex()}</label>
  {#if deletable}
    <button class={`btn p-0 ${deleteClass} mx-1`} on:click={onBtnClick}>
      <i class="bi bi-x-circle-fill" />
    </button>
  {:else}
    <i class={`bi bi-check-circle mx-1 my-1 ${labelClass}`} />
  {/if}
</div>
