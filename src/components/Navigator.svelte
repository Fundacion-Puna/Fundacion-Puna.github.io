<script lang="ts">
  import Link from "./atoms/Link.svelte";
  import { fade, fly, slide } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";

  /* Only add navigation is site is not in construction */

  let { isFinished } = $props();
  let start = $state(false);
  $effect(() => {
    setTimeout(() => (start = !start), 1200);
  });

  const SECTIONS = [
    { route: "archive", content: "Archivos" },
    { route: "blog", content: "Blog" },
    { route: "humedal", content: "Humedal" },
  ] as const;
</script>

<nav
  class="flex flex-wrap content-between justify-strecth border-box w-full py-2 px-12 h-8"
>
  <div class="mx-2 min-w-[220px]">
    {#if start}
      <h1 transition:fly={{ y: -100, duration: 1100, easing: cubicInOut }}>
        <span> Salvemos </span>
        Abreo-Malpaso
      </h1>
    {/if}
  </div>
  <div class="mx-2">
    {#each SECTIONS as section}
      <Link
        styles="px-2 mx-4"
        route={section.route}
        content={section.content}
      />
    {/each}
  </div>
</nav>

<style lang="postcss">
  @reference 'tailwindcss';

  nav {
    height: max-content;
    background-color: var(--panel-b);
    user-select: none;
  }
</style>
