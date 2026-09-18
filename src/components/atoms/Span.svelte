<script lang="ts">
  import type { Snippet } from "svelte";
  import type { TransitionConfig } from "svelte/transition";

  interface Props {
    children?: Snippet;
    transition: (node: Element, args: any) => TransitionConfig;
    args?: Record<string, unknown>;
    /** Fires when the intro transition has actually finished. */
    onIntroEnd?: () => void;
    /** Fires when the outro transition has actually finished. */
    onOutroEnd?: () => void;
    styles?: string;
  }

  let {
    children,
    transition,
    args = {},
    onIntroEnd,
    onOutroEnd,
    styles = "",
  }: Props = $props();
</script>

<span
  transition:transition={args}
  onintroend={onIntroEnd}
  onoutroend={onOutroEnd}
  class="block {styles}"
>
  {@render children?.()}
</span>
