<script>
  import { ARCHIVE, YEARS } from "$lib/archive.js";
  import ArchiveGallery from "../../components/organisms/ArchiveGallery.svelte";

  const first = YEARS.at(0);
  const last = YEARS.at(-1);
</script>

<svelte:head>
  <title>Archivos — Salvando Abreo-Malpaso</title>
  <meta
    name="description"
    content="Fotografías y documentos del humedal Abreo-Malpaso (Rionegro, Antioquia) entre {first} y {last}."
  />
</svelte:head>

<header class="mx-auto max-w-5xl px-4 pt-12 pb-8 md:px-8 md:pt-16">
  <p class="font-display text-sm tracking-[0.2em] text-primary-700-300 uppercase">
    {first}–{last} · {ARCHIVE.length} registros
  </p>
  <h1 class="h1 mt-2">Archivos</h1>
  <p class="mt-4 max-w-2xl text-pretty text-surface-700-300">
    Fotografías y documentos que registran el estado del humedal año tras año.
    Abre cualquier tarjeta para ver el archivo original.
  </p>
</header>

<ArchiveGallery />
