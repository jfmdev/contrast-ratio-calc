<script>
  export let backColors;
  export let foreColors;

  $: colClass =
    backColors.length <= 1
      ? 'col -xs-12'
      : backColors.length === 2
      ? 'col-xs-12 col-sm-6'
      : backColors.length === 3
      ? 'col-xs-12 col-sm-6 col-md-4'
      : 'col-xs-12 col-sm-6 col-md-4 col-lg-3';
</script>

<div class="container-fluid p-0">
  <div class="row g-0">
    {#each backColors as backColor}
      <div class={colClass}>
        <div class="border border-dark rounded-3 m-2 px-2" style:background-color={backColor.hex()}>
          {#each foreColors as foreColor}
            <p style:color={foreColor.hex()}>
              Lorem ipsum <em>dolor sit amet</em>, consectetur <strong>adipiscing elit</strong>, sed
              do <del>eiusmod</del> tempor incididunt <small>ut labore</small> et dolore
              <u>magna aliqua</u>.
            </p>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>
