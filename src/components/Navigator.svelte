<script lang="ts">
  import Link from './atoms/Link.svelte'

  /* Only add navigation is site is not in construction */

  let { isFinished } = $props();

  const SECTIONS = [
    {route: "archive", content: "Archivos"},
    {route: "blog",    content: "Blog"},
    {route: "humedal", content: "Humedal"},
  ] as const

</script>

<nav class="flex content-between border-box w-full py-2 px-4 h-8">
  <h1 class="inline">Salvemos Abreo-Malpaso</h1>

  <div class="mx-2">
  {#each SECTIONS as section}
    <Link
      styles="px-2 mx-4"
      route={section.route}
      content={section.content}/>
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
