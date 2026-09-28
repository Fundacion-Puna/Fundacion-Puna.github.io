<script lang="ts">
  import { tick } from "svelte";
  import {
    YEARS,
    countArchive,
    loadArchivePage,
    type ArchiveItem,
    type ArchiveKind,
  } from "$lib/archive.js";
  import ArchiveCard from "../molecules/ArchiveCard.svelte";
  import ArchiveViewer from "./ArchiveViewer.svelte";
  import Masonry from "./Masonry.svelte";

  interface Props {
    /** Items fetched per scroll step. */
    pageSize?: number;
  }

  let { pageSize = 12 }: Props = $props();

  /** Room under each preview for the title and date, before it is measured. */
  const CAPTION_HEIGHT = 60;
  /** Start fetching the next page this far before the grid's end scrolls in. */
  const PRELOAD_MARGIN = "0px 0px 800px 0px";

  const KINDS: { value: ArchiveKind | null; label: string }[] = [
    { value: null, label: "Todo" },
    { value: "photo", label: "Fotos" },
    { value: "pdf", label: "Documentos" },
  ];

  /** Skeleton tile heights, so the placeholder already reads as masonry. */
  const PLACEHOLDER_RATIOS = ["aspect-[4/3]", "aspect-[3/4]", "aspect-[4/3]", "aspect-square"];

  let kind = $state<ArchiveKind | null>(null);
  let year = $state<number | null>(null);

  let items = $state<ArchiveItem[]>([]);
  /** Matching items across all pages; `null` until the first page answers. */
  let total = $state<number | null>(null);
  let loading = $state(false);
  let failed = $state(false);

  const hasMore = $derived(total === null || items.length < total);

  /** Item in the viewer; left set after closing so it can fade out. */
  let viewing = $state<ArchiveItem>();
  let viewerOpen = $state(false);

  function view(item: ArchiveItem) {
    viewing = item;
    viewerOpen = true;
  }

  /** Bumped on every filter change, so a page for the old query is dropped. */
  let generation = 0;

  let section = $state<HTMLElement>();
  let sentinel = $state<HTMLElement>();
  let observer: IntersectionObserver | undefined;

  function estimate(item: ArchiveItem, columnWidth: number) {
    const ratio = item.width && item.height ? item.height / item.width : 4 / 3;
    return columnWidth * ratio + CAPTION_HEIGHT;
  }

  async function loadMore() {
    if (loading || failed || !hasMore) return;

    const request = generation;
    loading = true;

    try {
      const page = await loadArchivePage({
        offset: items.length,
        limit: pageSize,
        kind,
        year,
      });
      if (request !== generation) return;
      items.push(...page.items);
      total = page.total;
    } catch {
      if (request === generation) failed = true;
    } finally {
      if (request === generation) loading = false;
    }

    // A tall screen can take in a whole page with the sentinel still in view,
    // and an observer only reports changes. Observing again makes it report
    // the sentinel's current state, which keeps filling until it is off-screen.
    await tick();
    if (request === generation && observer && sentinel) {
      observer.unobserve(sentinel);
      observer.observe(sentinel);
    }
  }

  function retry() {
    failed = false;
    loadMore();
  }

  function filterBy(nextKind: ArchiveKind | null, nextYear: number | null) {
    if (nextKind === kind && nextYear === year) return;

    kind = nextKind;
    year = nextYear;
    generation += 1;
    items = [];
    total = null;
    loading = false;
    failed = false;

    // Deep in the feed, jump back to the top of the grid instead of leaving
    // the reader stranded below a list that just got shorter.
    if (section && section.getBoundingClientRect().top < 0) {
      section.scrollIntoView({ block: "start" });
    }

    loadMore();
  }

  $effect(() => {
    if (!sentinel) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) loadMore();
      },
      { rootMargin: PRELOAD_MARGIN },
    );

    io.observe(sentinel);
    observer = io;

    return () => {
      io.disconnect();
      observer = undefined;
    };
  });
</script>

<section bind:this={section} aria-label="Registros del archivo">
  <!-- Filters stay reachable however far down the feed the reader is. -->
  <div
    class="sticky top-0 z-10 border-y border-surface-200-800 bg-surface-50-950/85 backdrop-blur-md select-none"
  >
    <!-- One row at every width: on phones it swipes sideways instead of
         stacking, so the sticky bar never eats more than a chip's height. -->
    <div
      class="mx-auto flex max-w-5xl items-center gap-3 overflow-x-auto px-4 py-3 [scrollbar-width:none]
             md:gap-4 md:px-8 [&::-webkit-scrollbar]:hidden"
    >
      <div role="group" aria-label="Tipo de archivo" class="flex shrink-0 gap-2">
        {#each KINDS as option (option.label)}
          {@const count = countArchive({ kind: option.value, year })}
          <button
            type="button"
            class="chip shrink-0 {kind === option.value
              ? 'preset-filled-primary-500'
              : 'preset-tonal'}"
            aria-pressed={kind === option.value}
            disabled={count === 0 && kind !== option.value}
            onclick={() => filterBy(option.value, year)}
          >
            {option.label}
            <span class="tabular-nums opacity-70">{count}</span>
          </button>
        {/each}
      </div>

      <div class="vr h-6 shrink-0" aria-hidden="true"></div>

      <div role="group" aria-label="Año" class="flex shrink-0 gap-2">
        <button
          type="button"
          class="chip shrink-0 {year === null ? 'preset-filled-primary-500' : 'preset-tonal'}"
          aria-pressed={year === null}
          onclick={() => filterBy(kind, null)}
        >
          Todos los años
        </button>
        {#each YEARS as option (option)}
          {@const count = countArchive({ kind, year: option })}
          <button
            type="button"
            class="chip shrink-0 tabular-nums {year === option
              ? 'preset-filled-primary-500'
              : 'preset-tonal'}"
            aria-pressed={year === option}
            disabled={count === 0 && year !== option}
            onclick={() => filterBy(kind, option)}
          >
            {option}
          </button>
        {/each}
      </div>
    </div>
  </div>

  <div class="mx-auto max-w-5xl px-4 pt-6 pb-16 md:px-8">
    <Masonry
      {items}
      key={(item) => item.id}
      {estimate}
      label="Fotografías y documentos"
    >
      {#snippet item(entry)}
        <ArchiveCard item={entry} onopen={view} />
      {/snippet}

      {#snippet placeholder()}
        <div class="grid grid-cols-2 items-start gap-3 sm:grid-cols-3 lg:grid-cols-4" aria-hidden="true">
          {#each Array(8) as _, i}
            <div class="placeholder animate-pulse rounded-container {PLACEHOLDER_RATIOS[i % PLACEHOLDER_RATIOS.length]}"></div>
          {/each}
        </div>
      {/snippet}
    </Masonry>

    <!-- Screen readers hear progress without having to find the counter. -->
    <p role="status" class="sr-only">
      {#if total !== null}
        Mostrando {items.length} de {total} registros.
      {/if}
    </p>

    {#if total === 0}
      <div class="py-16 text-center">
        <p class="text-surface-700-300">No hay registros para este filtro.</p>
        <button
          type="button"
          class="btn mt-4 preset-tonal-primary"
          onclick={() => filterBy(null, null)}
        >
          Ver todo el archivo
        </button>
      </div>
    {:else if hasMore}
      <!--
        Scrolling this into view loads the next page. It stays a real button
        for keyboards and for browsers where the observer never fires.
      -->
      <div bind:this={sentinel} class="flex flex-col items-center gap-3 pt-10">
        {#if failed}
          <p class="text-sm text-surface-700-300">No se pudieron cargar más registros.</p>
          <button type="button" class="btn preset-tonal-primary" onclick={retry}>
            Reintentar
          </button>
        {:else}
          <button
            type="button"
            class="btn preset-tonal-primary"
            aria-disabled={loading}
            onclick={loadMore}
          >
            {#if loading}
              <svg
                class="size-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                aria-hidden="true"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Cargando…
            {:else}
              Cargar más
            {/if}
          </button>
        {/if}
      </div>
    {:else}
      <p class="pt-12 text-center text-sm text-surface-700-300">
        Fin del archivo · {total} {total === 1 ? "registro" : "registros"}
      </p>
    {/if}
  </div>
</section>

<ArchiveViewer item={viewing} bind:open={viewerOpen} />
