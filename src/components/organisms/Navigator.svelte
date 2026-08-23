<script lang="ts">
  import LinkGroup from "../molecules/LinkGroup.svelte";
  import Span from "../atoms/Span.svelte";
  import { fade, fly, slide } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";

  let start = $state(false);
  let passEmoji = $state(false);
  let emojiCount = $state(0)

  $effect(() => {
    setTimeout(() => (start = !start), 1200);

    setTimeout(() => {
      passEmoji = true
    }, 1830);
  });

  function trigger() {

    if(emojiCount == 2){
      console.log("Finished animation")
      return;
    }

    console.log("On unmount")


    $inspect(passEmoji)

    setTimeout(() => {
      passEmoji = false
      emojiCount += 1
    }, 1800);
  }

  const emojis = [
    '🐦',
    '⛰️',
    '✊'
  ]

</script>

<nav
  class="flex flex-wrap content-between justify-center border-box w-full py-2 px-12 h-8"
>
  <LinkGroup />
  <div class="mx-2 min-w-[220px] overflow-clip flex">
    {#if start}
      <h1 transition:fly={{ y: 100, duration: 1100, easing: cubicInOut }}>
        <span> Salvemos </span>
      </h1>
    {/if}

    <span class="mx-1"> Abreo-Malpaso </span>

    {#if passEmoji}
      <Span transition={fly} args={{y: 100, duration:1120}} onFinish={trigger}>
        {emojis[emojiCount]}
      </Span>
    {/if}
  </div>
</nav>

<style lang="postcss">
  @reference 'tailwindcss';

  nav {
    height: max-content;
    background-color: var(--panel-b);
    user-select: none;
  }
</style>
