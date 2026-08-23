<script lang="ts">
  import Link from "../atoms/Link.svelte";

  const SECTIONS = [
    { route: "archive", content: "Archivos" },
    { route: "blog", content: "Blog" },
    { route: "humedal", content: "Humedal" },
  ] as const;
</script>

  <div class="mx-2">
    {#each SECTIONS as section}
      <Link
        styles="px-2 mx-4"
        route={section.route}
        content={section.content}
      />
    {/each}
  </div>