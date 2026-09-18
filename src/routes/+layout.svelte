<script>
  import "./app.css";
  import Navigator from "../components/organisms/Navigator.svelte";

  let { children } = $props();
</script>

<div class="flex min-h-svh flex-col bg-surface-50-950">
  <Navigator />

  <main id="contenido" class="flex-1">
    {@render children()}
  </main>
</div>
