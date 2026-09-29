<script lang="ts">
  import { base } from "$app/paths";
  import type { ArchiveItem } from "$lib/archive.js";

  interface Props {
    /** Item on show. Kept while the viewer fades out, so it never goes blank. */
    item?: ArchiveItem;
    open?: boolean;
  }

  let { item, open = $bindable(false) }: Props = $props();

  // Catalogue dates are plain days; formatting them in UTC stops Colombia's
  // UTC-5 from turning 15 September into the 14th.
  const DAY = new Intl.DateTimeFormat("es-CO", { dateStyle: "long", timeZone: "UTC" });

  /** Static files keep their original names, spaces and accents included. */
  const asset = (path: string) => `${base}/${encodeURI(path)}`;

  const INFO_ID = "archive-viewer-info";

  let dialog = $state<HTMLDialogElement>();
  let showInfo = $state(false);
  /** Last original that finished loading; the preview shows until it matches. */
  let loadedSrc = $state<string>();

  const isPdf = $derived(item?.kind === "pdf");
  const when = $derived(item?.date ? DAY.format(new Date(item.date)) : String(item?.year ?? ""));
  const ratio = $derived(
    item?.width && item?.height ? item.width / item.height : isPdf ? 3 / 4 : 4 / 3,
  );
  const original = $derived(item && !isPdf ? asset(item.file) : undefined);
  const fileName = $derived(item?.file.split("/").at(-1));

  $effect(() => {
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  });

  function close() {
    open = false;
  }

  /** The stage fills the screen, so a click on its bare part is a click "outside". */
  function onStageClick(event: MouseEvent) {
    if (event.target === event.currentTarget) close();
  }
</script>

<!--
  A native modal dialog: it traps focus, closes on Escape, hides the page from
  assistive tech and hands focus back to the card it was opened from.
-->
<dialog
  bind:this={dialog}
  aria-label={item?.title}
  onclose={close}
  class="m-0 h-dvh max-h-none w-full max-w-none overscroll-contain border-0 bg-surface-950/95 p-0
         text-surface-50 opacity-0 transition-[opacity,display,overlay] transition-discrete
         duration-300 backdrop:bg-transparent open:opacity-100 starting:open:opacity-0"
>
  {#if item}
    <!-- Keyboards close with Escape or the close button; this is for pointers. -->
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
    <div class="relative flex size-full items-center justify-center" onclick={onStageClick}>
      <div
        class="relative max-h-full"
        style:aspect-ratio={ratio}
        style:width="min(100%, 100dvh * {ratio})"
      >
        {#if item.thumb}
          <!-- The grid already fetched this preview, so it shows at once while
               the full-size original streams in on top. -->
          <img
            src={asset(item.thumb)}
            alt={original ? "" : item.title}
            class="absolute inset-0 size-full object-contain"
          />
        {:else}
          <div class="absolute inset-0 flex items-center justify-center text-surface-400">
            <svg
              class="size-20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.25"
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

        {#if original}
          <img
            src={original}
            alt={item.title}
            width={item.width}
            height={item.height}
            decoding="async"
            onload={() => (loadedSrc = original)}
            class="absolute inset-0 size-full object-contain transition-opacity duration-500
                   {loadedSrc === original ? 'opacity-100' : 'opacity-0'}"
          />
        {/if}
      </div>

      <!-- Actions, faded in from the top so they read over bright skies. -->
      <div
        class="pointer-events-none absolute inset-x-0 top-0 flex justify-end gap-2
               bg-gradient-to-b from-surface-950/70 to-transparent p-3 pb-10 md:p-4 md:pb-12"
      >
        <button
          type="button"
          class="btn-icon pointer-events-auto backdrop-blur-md {showInfo
            ? 'preset-filled-primary-500'
            : 'bg-surface-950/50 text-surface-50 hover:bg-surface-950/70'}"
          aria-label="Información del archivo"
          aria-expanded={showInfo}
          aria-controls={INFO_ID}
          onclick={() => (showInfo = !showInfo)}
        >
          <svg
            class="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
        </button>

        <a
          href={asset(item.file)}
          download={fileName}
          class="btn-icon pointer-events-auto bg-surface-950/50 text-surface-50 no-underline
                 backdrop-blur-md hover:bg-surface-950/70"
          aria-label="Descargar {isPdf ? 'documento' : 'fotografía'}"
        >
          <svg
            class="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M12 15V3M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <path d="m7 10 5 5 5-5" />
          </svg>
        </a>

        <button
          type="button"
          class="btn-icon pointer-events-auto bg-surface-950/50 text-surface-50 backdrop-blur-md
                 hover:bg-surface-950/70"
          aria-label="Cerrar visor"
          onclick={close}
        >
          <svg
            class="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <aside
        id={INFO_ID}
        hidden={!showInfo}
        aria-label="Información del archivo"
        class="absolute top-16 right-3 w-[min(20rem,calc(100%-1.5rem))] card p-4 text-sm
               preset-filled-surface-50-950 shadow-xl md:top-18 md:right-4"
      >
        <dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
          <dt class="text-surface-700-300">Fecha</dt>
          <dd><time datetime={item.date ?? String(item.year)}>{when}</time></dd>

          <dt class="text-surface-700-300">Tipo</dt>
          <dd>{isPdf ? "Documento PDF" : "Fotografía"}</dd>

          {#if item.width && item.height}
            <dt class="text-surface-700-300">Tamaño</dt>
            <dd class="tabular-nums">{item.width} × {item.height} px</dd>
          {/if}

          {#if isPdf && item.pages}
            <dt class="text-surface-700-300">Páginas</dt>
            <dd class="tabular-nums">{item.pages}</dd>
          {/if}

          <dt class="text-surface-700-300">Archivo</dt>
          <dd class="break-all">{fileName}</dd>
        </dl>
      </aside>

      <!--
        Legend, over a scrim that fades up into the photo. The minimum height
        keeps room for a caption even when the catalogue has none yet.
      -->
      <div
        class="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-surface-950
               via-surface-950/75 to-transparent pt-24"
      >
        <div
          class="pointer-events-auto mx-auto flex min-h-24 max-w-5xl flex-col justify-end px-4 pb-6
                 md:px-8 md:pb-8"
        >
          <h2 class="h4 text-balance text-surface-50">{item.title}</h2>
          <p class="mt-1 text-sm text-surface-300">
            <time datetime={item.date ?? String(item.year)}>{when}</time>
            {#if isPdf && item.pages}
              · {item.pages} {item.pages === 1 ? "página" : "páginas"}
            {/if}
          </p>
          {#if item.legend}
            <p class="mt-3 max-h-32 max-w-prose overflow-y-auto text-pretty text-surface-100">
              {item.legend}
            </p>
          {/if}
          {#if isPdf}
            <a
              href={asset(item.file)}
              target="_blank"
              rel="noopener"
              class="btn mt-4 self-start preset-filled-primary-500 no-underline"
            >
              Leer documento
            </a>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</dialog>
