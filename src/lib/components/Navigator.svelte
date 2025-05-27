<script>
  /* Only add navigation is site is not in construction */

  let { isFinished } = $props();

</script>

<nav>
{#if isFinished}
  <p>Sitio en construcción &#128522; ...</p>
{:else}
  <p>Archivos</p>
  <p>Blog</p>
  <p>Humedal</p>
{/if}
</nav>

<style>
  nav {
    box-sizing: border-box;
    margin: auto;
    width: 100%;
    height: max-content;
    max-height: 68px;
    padding: 1rem;
    background-color: var(--panel-b);
    user-select: none;

    & p {
      display: inline-block;
      margin: 0 1rem;
    }
  }
</style>
