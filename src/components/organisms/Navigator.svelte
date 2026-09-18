<script lang="ts">
  import { base } from "$app/paths";
  import { AppBar } from "@skeletonlabs/skeleton-svelte";
  import { fly, slide } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";
  import LinkGroup from "../molecules/LinkGroup.svelte";
  import Title from "../molecules/Title.svelte";
  import Span from "../atoms/Span.svelte";

  let menuOpen = $state(false);

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
          class="flex min-w-0 items-center gap-2 no-underline md:w-[285px]"
          aria-label="Salvemos Abreo-Malpaso — inicio"
        >
        <Title />
        </a>
      </AppBar.Lead>

      <div class="vr hidden h-6 shrink-0 md:block" aria-hidden="true"></div>

      <!-- flex-1 + justify-center centres the links in whatever space is left
           over, so they stay put while the wordmark animates in. -->
      <AppBar.Headline class="hidden flex-1 justify-left md:flex">
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
