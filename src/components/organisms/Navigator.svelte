<script lang="ts">
  import { onMount } from "svelte";
  import { base } from "$app/paths";
  import { AppBar } from "@skeletonlabs/skeleton-svelte";
  import { fly, slide } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";
  import LinkGroup from "../molecules/LinkGroup.svelte";
  import Span from "../atoms/Span.svelte";

  const EMOJIS = ["🐦", "⛰️", "✊"] as const;
  const LAST = EMOJIS.length - 1;

  /** Delay before the wordmark flies in. */
  const TITLE_DELAY = 300;
  /** Delay between the wordmark landing and the first emoji. */
  const EMOJI_DELAY = 1300;
  /** How long each emoji stays before the next one replaces it. */
  const EMOJI_HOLD = 900;

  let titleIn = $state(false);
  let emojiStarted = $state(false);
  let emojiIndex = $state(0);
  let menuOpen = $state(false);

  /** Every pending timer, so nothing fires after the component is gone. */
  let timers: ReturnType<typeof setTimeout>[] = [];
  let reduceMotion = false;

  function later(fn: () => void, ms: number) {
    timers.push(setTimeout(fn, ms));
  }

  onMount(() => {
    reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      // Skip straight to the resting state: no motion, same final frame.
      titleIn = true;
      emojiStarted = true;
      emojiIndex = LAST;
      return;
    }

    later(() => (titleIn = true), TITLE_DELAY);
    later(() => (emojiStarted = true), EMOJI_DELAY);

    return () => {
      timers.forEach(clearTimeout);
      timers = [];
    };
  });

  /** Called when an emoji has finished flying in; queues the next one. */
  function queueNextEmoji() {
    if (reduceMotion || emojiIndex >= LAST) return;
    later(() => (emojiIndex += 1), EMOJI_HOLD);
  }

  function closeMenu() {
    menuOpen = false;
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === "Escape" && menuOpen) closeMenu();
  }
</script>

<svelte:window onkeydown={onKeydown} />

<!-- Colour and border live on the root so the bar is full-bleed, while the
     toolbar inside is constrained to the same container as the page content. -->
<AppBar
  class="preset-filled-surface-200-800 border-b border-surface-400-600 select-none"
>
  {#snippet children()}
    <AppBar.Toolbar
      class="mx-auto flex w-full max-w-5xl items-center gap-4 px-4 py-3 md:px-8"
    >
      <AppBar.Lead class="flex min-w-0 shrink-0 items-center">
        <a
          href="{base}/"
          class="flex min-w-0 items-center gap-2 no-underline"
          aria-label="Salvemos Abreo-Malpaso — inicio"
        >
          <!-- Fixed height + overflow-clip so the fly-in never shifts the bar. -->
          <span class="flex h-8 items-center overflow-clip">
            {#if titleIn}
              <strong
                class="font-display text-lg whitespace-nowrap text-primary-900-100 md:text-xl"
                transition:fly={{ y: 40, duration: 1100, easing: cubicInOut }}
              >
                Salvemos
              </strong>
            {/if}
          </span>

          <span
            class="font-display truncate text-lg whitespace-nowrap md:text-xl"
          >
            Abreo-Malpaso
          </span>

          <!-- Fixed box: the outgoing and incoming emoji overlap instead of reflowing. -->
          <span class="relative block h-8 w-7 shrink-0 overflow-clip" aria-hidden="true">
            {#if emojiStarted}
              {#key emojiIndex}
                <Span
                  transition={fly}
                  args={{ y: 32, duration: 700, easing: cubicInOut }}
                  onIntroEnd={queueNextEmoji}
                  styles="absolute inset-0 flex items-center justify-center text-xl"
                >
                  {EMOJIS[emojiIndex]}
                </Span>
              {/key}
            {/if}
          </span>
        </a>
      </AppBar.Lead>

      <div class="vr hidden h-6 shrink-0 md:block" aria-hidden="true"></div>

      <!-- flex-1 + justify-center centres the links in whatever space is left
           over, so they stay put while the wordmark animates in. -->
      <AppBar.Headline class="hidden flex-1 justify-center md:flex">
        <LinkGroup orientation="row" />
      </AppBar.Headline>

      <AppBar.Trail class="ml-auto flex shrink-0 items-center gap-2 md:ml-0">
        <button
          type="button"
          class="btn-icon preset-tonal-primary md:hidden"
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          onclick={() => (menuOpen = !menuOpen)}
        >
          <span aria-hidden="true">{menuOpen ? "✕" : "☰"}</span>
        </button>
      </AppBar.Trail>
    </AppBar.Toolbar>

    {#if menuOpen}
      <div
        id="nav-menu"
        class="preset-filled-surface-100-900 border-t border-surface-400-600 md:hidden"
        transition:slide={{ duration: 220, easing: cubicInOut }}
      >
        <div class="mx-auto max-w-5xl px-4 py-2 md:px-8">
          <LinkGroup orientation="column" onnavigate={closeMenu} />
        </div>
      </div>
    {/if}
  {/snippet}
</AppBar>
