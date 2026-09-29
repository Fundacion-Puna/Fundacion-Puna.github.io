<script>
  import { PHOTO_COUNT, YEARS } from "$lib/archive.js";
  import Hero from "../components/organisms/Hero.svelte";
</script>

<svelte:head>
  <title>Salvando Abreo-Malpaso</title>
  <meta
    name="description"
    content="Archivo fotográfico del deterioro del humedal Abreo-Malpaso (Rionegro, Antioquia) entre 2010 y 2024, y campaña por su protección."
  />
  <meta
    name="author"
      content="M.A.R.Reyes, Johana Patricia Reyes"
  />
</svelte:head>

<Hero years={YEARS} photoCount={PHOTO_COUNT} />
