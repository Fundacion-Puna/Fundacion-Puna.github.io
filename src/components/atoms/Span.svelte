<script lang="ts">
  import { onMount } from "svelte";
  let { children, transition, args, onFinish } = $props()

  onMount(() => {
    onFinish()
    return () => {
    }
  })
</script>

<span transition:transition={{...args}} class="mx-1 block">
  {@render children?.()}
</span>

