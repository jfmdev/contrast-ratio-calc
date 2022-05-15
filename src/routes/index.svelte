<script>
  import '../styles/main.scss';
  import Color from 'color';

  let x = 1;
  let y = 2;

  const color = Color.rgb(255, 128, 255);

  function yPlusAValue(value) {
    return value + y;
  }

  $: total = yPlusAValue(x);
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<p class="text-test">{x} and {y} = {color.hsl()}</p>

<div class="container text-center">
  <div class="row">
    <div class="col">Column</div>
    <div class="col">Column</div>
    <div class="col">Column</div>
  </div>
</div>

<style lang="scss">
  $test-color: #0080ff;

  h1 {
    color: $test-color;
  }
</style>
