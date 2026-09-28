<script lang="ts">
  import { base } from "$app/paths";
  import type { ArchiveItem } from "$lib/archive.js";

  interface Props {
    item: ArchiveItem;
    /** Shows the item in place instead of following the link to the file. */
    onopen?: (item: ArchiveItem) => void;
  }

  let { item, onopen }: Props = $props();

  // Catalogue dates are plain days; formatting them in UTC stops Colombia's
  // UTC-5 from turning 15 September into the 14th.
  const DAY = new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

  /** Static files keep their original names, spaces and accents included. */
  const asset = (path: string) => `${base}/${encodeURI(path)}`;

  const isPdf = $derived(item.kind === "pdf");
  const when = $derived(item.date ? DAY.format(new Date(item.date)) : String(item.year));

  let loaded = $state(false);

  function onclick(event: MouseEvent) {
    // Modified clicks keep the link's own behaviour: new tab, window, save.
    if (!onopen || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onopen(item);
  }
</script>

<a
  href={asset(item.file)}
  target="_blank"
  rel="noopener"
  aria-haspopup={onopen ? "dialog" : undefined}
  {onclick}
  class="group block rounded-container no-underline transition-[opacity,translate] duration-500
         ease-out starting:translate-y-3 starting:opacity-0"
>
  <div
    class="relative overflow-hidden rounded-container bg-surface-200-800 shadow-sm
           transition-shadow duration-300 group-hover:shadow-xl"
  >
    {#if item.thumb}
      <img
        src={asset(item.thumb)}
        width={item.width}
        height={item.height}
        alt=""
        loading="lazy"
        decoding="async"
        onload={() => (loaded = true)}
        class="block h-auto w-full transition-[opacity,scale] duration-500 ease-out
               group-hover:scale-[1.04] {loaded ? 'opacity-100' : 'opacity-0'}"
      />
    {:else}
      <!-- A PDF without a generated cover: a sheet-shaped stand-in. -->
      <div
        class="flex aspect-[3/4] flex-col items-center justify-center gap-3 bg-grain
               preset-filled-surface-100-900 text-surface-600-400"
      >
        <svg
          class="size-12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <path d="M10 13H8M16 13h-4M16 17H8" />
        </svg>
      </div>
    {/if}

    <!-- Hover/focus veil with the "open" affordance: expand in place, or
         leave for the original file. -->
    <div
      aria-hidden="true"
      class="absolute inset-0 flex items-start justify-end bg-surface-950/0 p-2 transition-colors
             duration-300 group-hover:bg-surface-950/25 group-focus-visible:bg-surface-950/25"
    >
      <span
        class="btn-icon btn-icon-sm preset-filled-surface-50-950 opacity-0 shadow transition-opacity
               duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <svg
          class="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          {#if onopen}
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          {:else}
            <path d="M7 17 17 7M7 7h10v10" />
          {/if}
        </svg>
      </span>
    </div>

    {#if isPdf}
      <span class="badge absolute top-2 left-2 preset-filled-error-500 shadow">PDF</span>
    {/if}
  </div>

  <div class="px-1 pt-2 pb-1">
    <p class="line-clamp-2 text-sm leading-snug text-surface-950-50">
      {item.title}
    </p>
    <p class="mt-1 text-xs text-surface-700-300">
      <time datetime={item.date ?? String(item.year)}>{when}</time>
      {#if isPdf && item.pages}
        · {item.pages} {item.pages === 1 ? "página" : "páginas"}
      {/if}
    </p>
    <span class="sr-only">
      ({isPdf ? "documento PDF, " : ""}{onopen ? "se abre en el visor" : "se abre en una pestaña nueva"})
    </span>
  </div>
</a>
