<style>

   @font-face
   {
      font-family: "Baloo Tamma";
      src : url("/BalooTamma.woff2");
   }
   :root
   {
      --underall : #616;
      --panel-a : #484;
      --panel-b : #55C;
      --black : #222;
      font-size : 16px;
      font-family: 'Baloo Tamma';
   }


   :global(body){
      margin : 0;
      padding :0;
      width:100%;
      height:max-content;
      padding: 0 1vh;
      box-sizing: border-box;
      background-color: #111;
   }

   :global(main) {
      display: flex;
      flex-direction: column;
      gap: 0;
      height: max-content;
      min-height: 100vh;
      min-width: 100%;
      margin:0;
      padding:0;
      box-sizing: border-box;
      background-color: var(--panel-a);
   }

   section
   {
      width:100%;
      height: 340px;
      margin : 0;
      box-sizing: border-box;
      background: linear-gradient(to top, #111A, #2223, #2221);
      text-align: center;

      & h3
      {
         color : #FFF;
         font-weight: 300;
      }
   }

   section.middle-stroke
   {
      background: linear-gradient(to bottom, #111A, #2225, #2221, transparent);
   }
   
   section.gross-stroke
   {
      background: unset;
      background-color: #111;
      flex-grow: 0.1;
   }

   section.last-stroke
   {
      height: 30rem;
      background: linear-gradient(to bottom, #2220, #1113, #1118);
      flex-grow: 3;
   }

</style>
<section>
   <h1>Puna</h1>
</section>
<section class="gross-stroke">
   <h1>Puna</h1>
</section>
<section class="middle-stroke">
   <h3>El humedal ha sido explotado</h3>
</section>
<section class="last-stroke">
   <h3>Con tu ayuda lo podemos limpiar</h3>
</section>