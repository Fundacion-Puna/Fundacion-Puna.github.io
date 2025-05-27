<script>
  let { images }  = $props();
  
  let year = $state();
  let current = $state(0);

  let index = 0;

  let view = $state(images[index]);
  
  let len = images[index].length;

  const interval = 5500;

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  };

  /**
   *
   * @param {Element} image
   * @param {String} src
   */
  const lazyLoad = function (image, src) {
    const onLoad = () => image.classList.add("visible");

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        image.src = src;

        if (image.complete) {
          onLoad();
        } else {
          image.addEventListener("load", onLoad);
        }
      }
    }, options);

    observer.observe(image);

    return {
      destroy() {
        image.removeEventListener("load", onLoad);
      },
    };
  };

  function play() {}

  function stop() {}


  const previous = () => current = (current - 1 + len) % len;

  const next = () => current = (current + 1) % len ;

  function changeYear(){

    index = parseInt(year);

    view = [...images[index]];

    len = images[index].length;
  }
  
</script>

<section
  aria-label="Evolucion del humedal"
  class="evolution"
  onmouseenter={stop}
  onmouseleave={play}
>
<select bind:value={year} onchange={changeYear}>
  <option selected value="0">2010</option>
  <option value="1">2013</option>
  <option value="2">2015</option>
  <option value="3">2017</option>
  <option value="4">2023</option>
  <option value="5">2024</option>
</select>
  <div>
    <figure style="transform: translateX(calc(-{current * 100}% - {current * 16}px))">
    {#each view as image (image.url)}
        <img class="slide visible" use:lazyLoad={image.url} alt={image.title} />
    {/each}
    </figure>
  </div>
  <button class="slider-button left" onclick={previous}>&#8592;</button>
  <button class="slider-button right" onclick={next}>&#8594;</button>
</section>

<style>

  section {
    position:relative;
    width: 100%;
    height: max-content;
    min-height: 480px;
    margin: 0;
    padding: 2rem 0;
    box-sizing: border-box;
    background: linear-gradient(to top, #111a, #2223, #2221, #4441 );
    text-align: center;
  }

  div {
    width: 100%;
    max-width: 640px;
    min-height: 480px;
    margin: auto;
    padding: 1rem;
    background-color: #222;
    overflow: clip;
  }

  figure {
    margin: auto;
    width: 100%;
    height: 95%;
    max-height: 480px;
    display: flex;
    gap: 1rem;
    flex-direction: row;
    transition : transform 0.5s ease;

    & .slide{
      display: inline;
      min-width: 100%;
      height: 100%;
      user-select:none;
      object-fit: cover;
    }
  }

  select{
    max-width: 14%;
    margin: 1rem auto;
    box-sizing: border-box;
    padding: 0.25rem 0.46rem;
    font-size: 1.25rem;
    font-family: "Noticia Text", Georgia, Times, serif;
    border-radius: 8px;
    color: var(--secundary);
  }

  .visible {
    opacity: 1;
  }

  .slider-button.left {
    left:calc(42% - 340px)
  }

  .slider-button.right {
    right: calc(42% - 340px)
  }

  .slider-button{
    position: absolute;
    top:calc(30% + 20px);
    font-size:3.55rem;
    font-weight: 800;
    background: none;
    outline:none;
    border:none;
    user-select:none;
    color: #FFF;
    text-shadow: 1px 2px 2px #222;
  }

  .slider-button:hover{
    text-shadow: 1px 1px 3px #121;
  }

  .slider-button:active{
    text-shadow: -1px 2px 3px #111;
  }
</style>
