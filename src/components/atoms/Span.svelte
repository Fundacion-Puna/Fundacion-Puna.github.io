<script lang="ts">
  import type { Snippet } from "svelte";
  import type { TransitionConfig } from "svelte/transition";

  type Transition = (node: Element, args: any) => TransitionConfig;

  interface Props {
    children?: Snippet;
    /** Used for both directions unless `inTransition`/`outTransition` override it. */
    transition?: Transition;
    args?: Record<string, unknown>;
    /** Entry transition, when it differs from the exit. */
    inTransition?: Transition;
    inArgs?: Record<string, unknown>;
    /** Exit transition, when it differs from the entry. */
    outTransition?: Transition;
    outArgs?: Record<string, unknown>;
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
    inTransition,
    inArgs,
    outTransition,
    outArgs,
    onIntroEnd,
    onOutroEnd,
    styles = "",
  }: Props = $props();

  /** Stand-in when a direction was given no transition at all. */
  const none: Transition = () => ({ duration: 0 });

  // Separate `in:`/`out:` directives rather than one `transition:`, so the two
  // directions can differ. Each falls back to the shared pair when not given.
  const enter = $derived(inTransition ?? transition ?? none);
  const exit = $derived(outTransition ?? transition ?? none);
  const enterArgs = $derived(inArgs ?? args);
  const exitArgs = $derived(outArgs ?? args);
</script>

<span
  in:enter|global={enterArgs}
  out:exit|global={exitArgs}
  onintroend={onIntroEnd}
  onoutroend={onOutroEnd}
  class="block {styles}"
>
  {@render children?.()}
</span>
