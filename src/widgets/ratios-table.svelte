<script>
  import { ratioColor } from '../helpers/misc';

  export let backColors;
  export let foreColors;

  const badgeClass = (color) =>
    `rounded-3 fs-sm-2 p-2 ${color.isDark() ? 'text-white' : 'text-black'}`;

  const ratio = (back, fore) => {
    const ratio = back.contrast(fore);
    return ratio.toFixed(ratio > 10 ? 1 : 2);
  };

  const textColor = (back, fore) => ratioColor(back.contrast(fore));
</script>

<table class="border-collapse mx-auto text-center">
  <thead>
    <tr>
      <th />
      {#each foreColors as foreColor}
        <th class="p-1">
          <div class={badgeClass(foreColor)} style:background-color={foreColor.hex()}>
            {foreColor.hex()}
          </div>
        </th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each backColors as backColor}
      <tr>
        <td class="border-bottom border-gray-300 p-1 fw-bold">
          <div class={badgeClass(backColor)} style:background-color={backColor.hex()}>
            {backColor.hex()}
          </div>
        </td>
        {#each foreColors as foreColor}
          <td class="border-bottom border-gray-300" style:color={textColor(backColor, foreColor)}>
            {ratio(backColor, foreColor)}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
