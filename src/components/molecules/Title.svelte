<script lang="ts">
  import { onMount } from "svelte";

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

  let reduceMotion = false;

  /** Every pending timer, so nothing fires after the component is gone. */
  let timers: ReturnType<typeof setTimeout>[] = [];

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

</script>

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
