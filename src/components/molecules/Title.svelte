<script lang="ts">
  import { onMount } from "svelte";
  import { fly, slide } from "svelte/transition";
  import { cubicIn, cubicOut } from "svelte/easing";
  import Span from "../atoms/Span.svelte";

  interface Props {
    /** Milliseconds to wait after mount before "Salvemos" starts sliding in. */
    delay?: number;
  }

  let { delay = 100 }: Props = $props();

  const EMOJIS = ["🐦", "⛰️", "✊"] as const;
  const LAST = EMOJIS.length - 1;

  /** How long "Salvemos" takes to arrive and push the rest across. */
  const TITLE_DURATION = 700;
  /** Beat between the wordmark settling and the first emoji rising. */
  const EMOJI_GAP = 150;
  /** An emoji rising into place from below. */
  const EMOJI_ENTER = 450;
  /** The outgoing emoji continuing upwards and out of the box. */
  const EMOJI_EXIT = 450;
  /** How long the replacement waits after the outgoing one starts leaving. */
  const EMOJI_RELAY = 120;
  /** How long an emoji rests before handing over to the next. */
  const EMOJI_HOLD = 900;

  let titleIn = $state(false);
  let emojiIn = $state(false);
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
      emojiIn = true;
      emojiIndex = LAST;
      return;
    }

    later(() => (titleIn = true), delay);
    later(() => (emojiIn = true), delay + TITLE_DURATION + EMOJI_GAP);

    return () => {
      timers.forEach(clearTimeout);
      timers = [];
    };
  });

  /** An emoji has finished rising; hold it, then hand over to the next one. */
  function queueNextEmoji() {
    if (reduceMotion || emojiIndex >= LAST) return;
    later(() => (emojiIndex += 1), EMOJI_HOLD);
  }
</script>

<!-- w-full so the centring has the reserved wordmark width to centre within;
     without it the flex row shrink-wraps and justify-center is a no-op. -->
<span class="flex w-full min-w-0 items-center justify-center">
  {#if titleIn}
    <!--
      Two transitions, one entrance:
        · the outer span animates its WIDTH, so "Abreo-Malpaso" is pushed
          rightwards instead of jumping across in a single frame;
        · the inner word rides in from the left inside that growing box.
      Padding lives on the inner word so the slide animates the gap too.
    -->
    <span
      class="flex h-8 items-center overflow-clip"
      in:slide={{ axis: "x", duration: TITLE_DURATION, easing: cubicOut }}
    >
      <strong
        class="wordmark font-display block pr-2 text-lg whitespace-nowrap text-primary-900-100 md:text-xl"
        in:fly={{
          x: -32,
          duration: TITLE_DURATION * 0.8,
          easing: cubicOut,
        }}
      >
        Salvemos
      </strong>
    </span>
  {/if}

  <span class="flex h-8 min-w-0 items-center overflow-hidden">
    <span class="wordmark font-display text-lg whitespace-nowrap md:text-xl">
      Abreo-Malpaso
    </span>
  </span>

  <!-- Fixed box so the emoji rising from below never reflows the bar. -->
  <span
    class="relative ml-1 block h-8 w-7 shrink-0 overflow-clip"
    aria-hidden="true"
  >
    {#if emojiIn}
      <!--
        Keyed on the index so each emoji is its own element: the outgoing one
        keeps rising out of the top while its replacement comes up from the
        bottom a beat later. Both are absolute, so they overlap in place.
      -->
      {#key emojiIndex}
        <Span
          inTransition={fly}
          inArgs={{
            y: 32,
            duration: EMOJI_ENTER,
            easing: cubicOut,
            delay: emojiIndex === 0 ? 0 : EMOJI_RELAY,
          }}
          outTransition={fly}
          outArgs={{ y: -32, duration: EMOJI_EXIT, easing: cubicIn }}
          onIntroEnd={queueNextEmoji}
          styles="absolute inset-0 flex items-center justify-center text-xl"
        >
          {EMOJIS[emojiIndex]}
        </Span>
      {/key}
    {/if}
  </span>
</span>

<style>
  /*
    `items-center` centres the line BOXES, but Baloo Tamma ships
    Devanagari-sized ascent/descent metrics, so its glyphs sit high inside that
    box — the words end up level with the top of the emoji instead of its
    middle. Trimming the box down to cap-height/alphabetic-baseline makes the
    visible letters the thing that gets centred.

    Browsers without `text-box` fall back to `line-height: 1` plus the shared
    h-8 flex boxes, which removes the half-leading and gets most of the way.

    NOTE: nothing that carries this class may also carry `overflow: hidden`
    (e.g. Tailwind's `truncate`). Trimming to `alphabetic` puts the box edge on
    the baseline, so a hidden overflow shears the descenders off p/g/y. Clip on
    a full-height ancestor instead.
  */
  .wordmark {
    line-height: 1;
    text-box: trim-both cap alphabetic;
  }
</style>
