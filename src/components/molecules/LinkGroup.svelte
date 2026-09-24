<script lang="ts">
  import { SECTIONS } from "$lib/sections.js";
  import Link from "../atoms/Link.svelte";

  interface Props {
    /** `row` for the desktop bar, `column` for the mobile drawer. */
    orientation?: "row" | "column";
    linkStyles?: string;
    onnavigate?: () => void;
  }

  let {
    orientation = "row",
    linkStyles = "",
    onnavigate,
  }: Props = $props();
</script>

<ul
  class="flex list-none gap-2 p-0 {orientation === 'column'
    ? 'flex-col items-stretch gap-1'
    : 'flex-row items-center'}"
>
  {#each SECTIONS as section (section.route)}
    <li>
      <Link
        route={section.route}
        content={section.content}
        onclick={onnavigate}
        styles="block py-2 {orientation === 'column'
          ? 'w-full px-3 text-lg'
          : 'px-4'} {linkStyles}"
      />
    </li>
  {/each}
</ul>
