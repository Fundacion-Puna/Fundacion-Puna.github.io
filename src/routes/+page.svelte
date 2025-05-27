<script>
  import Slider from "$lib/components/Slider.svelte";
  import Navigator from "$lib/components/Navigator.svelte";

  let images = [
    [
      // 2010
      { url: "Cabecera-norte_HAM.jpg", title: "HAM" },
      { url: "Equilibrio_agua_vegetación_HAM.jpg", title: "HAM" },
      { url: "Espejo_agua_buchón.jpg", title: "HAM" },
      { url: "Espejo_agua_HAM_I.jpg", title: "HAM" },
      { url: "Espejo_agua_HAM.jpg", title: "HAM" },
      { url: "Espejo_agua_HAMII.jpg", title: "HAM" },
      { url: "Espejo_agua_HAMIII.jpg", title: "HAM" },
      { url: "Espejo_agua_HAMIV.jpg", title: "HAM" },
      { url: "Espejo_agua_HAMV.jpg", title: "HAM" },
      { url: "Espejo_agua_HAMVI.jpg", title: "HAM" },
      { url: "Espejo_agua_HAMVII.jpg", title: "HAM" },
      { url: "Hembras_N_dominicus.jpg", title: "HAM" },
      { url: "Hembras_N_dominicusI.jpg", title: "HAM" },
      { url: "Presencia de Typha.jpg", title: "HAM" },
    ],
    [
      // 2013
      { url: "Dendrocygna bicolorI.JPG", title: "HAM" },
      { url: "EMPRESA_PRESTADORA_AGUAS_RIONEGRO_2013.JPG", title: "HAM" },
      { url: "EMPRESA_PRESTADORA_AGUAS_RIONEGRO_2013I.JPG", title: "HAM" },
      { url: "HAM.JPG", title: "HAM" },
      { url: "HAMI.JPG", title: "HAM" },
      { url: "HAMII.JPG", title: "HAM" },
      { url: "HAMIII.JPG", title: "HAM" },
      { url: "Presencia_espejo_agua.JPG", title: "HAM" },
      { url: "Presencia_espejo_aguaI.JPG", title: "HAM" },
      { url: "Presencia_espejo_aguaII.JPG", title: "HAM" },
      { url: "Presencia_espejo_aguaIV.JPG", title: "HAM" },
      { url: "Presencia_espejo_aguaIX.JPG", title: "HAM" },
      { url: "Presencia_espejo_aguaV.JPG", title: "HAM" },
      { url: "Presencia_espejo_aguaVI.JPG", title: "HAM" },
      { url: "Presencia_espejo_aguaVII.JPG", title: "HAM" },
      { url: "Presencia_espejo_aguaVIII.JPG", title: "HAM" },
      { url: "Presencia_espejo_aguaX.JPG", title: "HAM" },
      { url: "Presencia_espejo_aguaXI.JPG", title: "HAM" },
      { url: "Presencia_espejo_aguaXII.JPG", title: "HAM" },
      { url: "Presencia_espejo_aguaXIII.JPG", title: "HAM" },
      { url: "Vegetación_borde_escasa_pinos.JPG", title: "HAM" },
    ],
    [
      // 2015
      { url: "Presencia_residuos_sólidos.jpg", title: "HAM" },
      { url: "Presencia_residuos_sólidosI.jpg", title: "HAM" },
      { url: "Quemas_Bosque.jpg", title: "HAM" },
      { url: "Quemas_BosqueI.jpg", title: "HAM" },
      { url: "Resto_fogata_uso_turístico.jpg", title: "HAM" },
    ],
    [
      //2017
      { url: "CAM00514.jpg", title: "HAM" },
      { url: "CAM00515.jpg", title: "HAM" },
      { url: "CAM00516.jpg", title: "HAM" },
      { url: "CAM00517.jpg", title: "HAM" },
    ],
    [
      //2023
      { url: "20230303_093941.jpg", title: "HAM" },
      { url: "20230303_093944.jpg", title: "HAM" },
      { url: "20230303_093947.jpg", title: "HAM" },
      { url: "20230303_094004.jpg", title: "HAM" },
      { url: "20230303_094007.jpg", title: "HAM" },
      { url: "20230303_094025.jpg", title: "HAM" },
      { url: "20230303_094139.jpg", title: "HAM" },
      { url: "20230303_094146.jpg", title: "HAM" },
      { url: "20230714_101022.jpg", title: "HAM" },
      { url: "20230714_120220.jpg", title: "HAM" },
      { url: "20230915_090152.jpg", title: "HAM" },
      { url: "20230915_090155.jpg", title: "HAM" },
      { url: "20230915_090731.jpg", title: "HAM" },
      { url: "20230915_090736.jpg", title: "HAM" },
      { url: "20230915_090819.jpg", title: "HAM" },
      { url: "20230915_090902.jpg", title: "HAM" },
      { url: "20230915_090921.jpg", title: "HAM" },
      { url: "20230915_091236.jpg", title: "HAM" },
      { url: "20230915_091251.jpg", title: "HAM" },
      { url: "20230915_091254.jpg", title: "HAM" },
      { url: "20230915_091959.jpg", title: "HAM" },
      { url: "20230915_092005.jpg", title: "HAM" },
      { url: "20230915_092008.jpg", title: "HAM" },
      { url: "20230915_092013.jpg", title: "HAM" },
      { url: "20230915_092016.jpg", title: "HAM" },
      { url: "Cobertura  casi total del espejo de agua.jpg", title: "HAM" },
    ],
    [
      // 2024
      { url: "Disminución tangencial de las aves.jpg", title: "HAM" },
      { url: "Sin espejo de agua 2024.jpg", title: "HAM" },
      { url: "Totalmente cubierto por planta invasora.jpg", title: "HAM" },
    ],
  ];
</script>

<svelte:head></svelte:head>

<Navigator isFinished="false" />
<section class="introduction">
  <h1>Humedal:
    Abreo-Malpaso</h1>
</section>
<Slider {images} />
<section class="gross-stroke">
  <h1>Puna - 2025</h1>
</section>

<style>
  @font-face {
    font-family: "Baloo Tamma";
    src: url("/BalooTamma.woff2");
  }

  @font-face {
    font-family: "Noticia Text";
    src: url("/NoticiaText-Regular.woff2");
  }

  :root {
    /* Color pallete */
    --panel-a: #b0c4b1;
    --panel-b: #6a8a82;
    --headings: #4a403a;
    --secundary: #7d7064;
    --black: #222;
    font-size: 16px;
    font-family: "Noticia Text";
  }

  :global(body) {
    margin: 0;
    padding: 0;
    width: 100%;
    height: max-content;
    padding: 0 1vh;
    box-sizing: border-box;
    background-color: var(--black);
  }

  :global(main) {
    display: flex;
    flex-direction: column;
    gap: 0;
    height: max-content;
    min-height: 100vh;
    min-width: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: var(--panel-a);
  }

  section {
    width: 100%;
    height: max-content;
    margin: 0;
    box-sizing: border-box;
    text-align: center;
  }

  section.introduction {
    padding: 0 2vw;
    text-align: left;
    background: linear-gradient(to bottom, #1119, #2223, #2221, #3331, #4441);

    & h1 {
      font-size: 3rem;
      white-space: pre-wrap;
      user-select: none;
      max-width: 45%;
      color: var(--headings);
    }

    & aside {
      float: right;
      font-size: 1.45rem;
    }
  }

  section.gross-stroke {
    height: 80px;
    background: unset;
    background-color: #111;
    flex-grow: 0.1;
    color: #fff;
    font-family: "Baloo Tamma";
  }

  /* section.last-stroke {
    height: 30rem;
    background: linear-gradient(to bottom, #2220, #1113, #1118);
    flex-grow: 3;
  }

  section.middle-stroke {
    background: linear-gradient(to bottom, #111a, #2225, #2221, transparent);
  } */
</style>
