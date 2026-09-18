<script lang="ts">
  import { base } from "$app/paths";
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  interface Props {
    /** Background photograph, relative to `static/`. */
    image?: string;
    /** Years covered by the photographic archive. */
    years?: readonly (string | number)[];
    /** Total photographs in the archive. */
    photoCount?: number;
    /** Target of the primary call to action. An in-page `#anchor` also
     * enables the scroll cue; a route link does not. */
    evidenceHref?: string;
  }

  let {
    image = "Espejo_agua_HAM.jpg",
    years = [],
    photoCount = 0,
    evidenceHref = "",
  }: Props = $props();

  const first = $derived(years.at(0));
  const last = $derived(years.at(-1));
  const target = $derived(evidenceHref || `${base}/archive`);
  /** Only offer the scroll cue when there is something further down this page. */
  const scrolls = $derived(target.startsWith("#"));

  const span = $derived(
    first !== undefined && last !== undefined ? Number(last) - Number(first) : 0,
  );
</script>

<section
  class="relative isolate flex min-h-[min(88svh,46rem)] items-center overflow-clip"
  aria-labelledby="hero-title"
>
  <!-- Background photograph -->
  <img
    src="{base}/{image}"
    alt=""
    aria-hidden="true"
    fetchpriority="high"
    decoding="async"
    class="absolute inset-0 -z-20 h-full w-full object-cover"
  />

  <!-- Legibility scrim: dark at the bottom where the copy sits. -->
  <div
    aria-hidden="true"
    class="absolute inset-0 -z-10 bg-gradient-to-t from-surface-950/90 via-surface-950/70 to-surface-950/30"
  ></div>

  <div class="mx-auto w-full max-w-5xl px-4 py-16 text-left md:px-8 md:py-24">
    <p
      class="font-display text-sm tracking-[0.2em] text-primary-200 uppercase"
      in:fly={{ y: 16, duration: 600, delay: 100, easing: cubicOut }}
    >
      Humedal Abreo-Malpaso · Rionegro, Antioquia
    </p>

    <h1
      id="hero-title"
      class="h1 mt-4 max-w-3xl text-balance text-surface-50"
      in:fly={{ y: 24, duration: 700, delay: 200, easing: cubicOut }}
    >
      Un humedal que desaparece a la vista de todos
    </h1>

    <p
      class="mt-6 max-w-2xl text-lg text-pretty text-surface-100 md:text-xl"
      in:fly={{ y: 24, duration: 700, delay: 320, easing: cubicOut }}
    >
      Donde había espejo de agua, aves y bosque de borde, hoy hay planta
      invasora, quemas y basura. Documentamos el humedal año tras año para que
      su deterioro deje de ser invisible — y para exigir su protección.
    </p>

    <div
      class="mt-8 flex flex-wrap items-center gap-3"
      in:fly={{ y: 24, duration: 700, delay: 440, easing: cubicOut }}
    >
      <a href={target} class="btn btn-lg preset-filled-primary-500">
        Ver la evidencia
      </a>
      <a href="{base}/humedal" class="btn btn-lg preset-outlined-primary-500 bg-surface-950/30 text-surface-50 backdrop-blur-sm">
        Conocer el humedal
      </a>
    </div>

    {#if photoCount > 0 && years.length > 0}
      <dl
        class="mt-12 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-3"
        in:fly={{ y: 24, duration: 700, delay: 560, easing: cubicOut }}
      >
        <div>
          <dt class="text-sm text-surface-200">Años documentados</dt>
          <dd class="font-display text-3xl text-surface-50">
            {first}–{last}
          </dd>
        </div>
        <div>
          <dt class="text-sm text-surface-200">Registros fotográficos</dt>
          <dd class="font-display text-3xl text-surface-50">{photoCount}</dd>
        </div>
        <div>
          <dt class="text-sm text-surface-200">Espejo de agua en {last}</dt>
          <dd class="font-display text-3xl text-surface-50">Ninguno</dd>
        </div>
      </dl>
      <p class="sr-only">
        Archivo fotográfico de {span} años del humedal Abreo-Malpaso.
      </p>
    {/if}
  </div>

  {#if scrolls}
    <a
      href={target}
      class="absolute inset-x-0 bottom-4 mx-auto w-fit text-surface-100 no-underline
             motion-safe:animate-bounce"
      aria-label="Bajar a la evolución del humedal"
    >
      <span aria-hidden="true" class="text-2xl">↓</span>
    </a>
  {/if}
</section>
