<script>
  import { PHOTO_COUNT, YEARS } from "$lib/archive.js";
  import Hero from "../components/organisms/Hero.svelte";
</script>

<svelte:head>
  <title>Salvemos Abreo-Malpaso — humedal de Rionegro</title>
  <meta
    name="description"
    content="Archivo fotográfico del deterioro del humedal Abreo-Malpaso (Rionegro, Antioquia) entre 2010 y 2024, y campaña por su protección."
  />
</svelte:head>

<Hero years={YEARS} photoCount={PHOTO_COUNT} />
