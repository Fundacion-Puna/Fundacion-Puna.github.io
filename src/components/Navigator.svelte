<script>
  /* Only add navigation is site is not in construction */

  let { isFinished } = $props();

</script>

<nav class="flex">
{#if isFinished === "false"}
  <p>Sitio en construcción &#128522; ...</p>
{:else}
  <h1 class="inline">Salvemos Abreo-Malpaso</h1>
  <p>Archivos</p>
  <p>Blog</p>
  <p>Humedal</p>
{/if}
</nav>

<style lang="postcss">
@reference 'tailwindcss';

  nav {
    box-sizing: border-box;
    width: 100%;
    height: max-content;
    padding: 1.8rem 0;
    background-color: var(--panel-b);
    user-select: none;

    & p {
      display: inline-block;
      margin: 0 1rem;
    }
  }
</style>
