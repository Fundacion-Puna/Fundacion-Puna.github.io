<script>

let{ name, description, scientificName, profileSrc} = $props();

</script>

<!-- -->

<div>
   <div class="profile-parent">
      <img src={profileSrc} alt="" class="profile">
   </div>

   <p class="name">{name}</p>
   <p class="scientific-name">{scientificName}</p>
   <p class="description">{description}</p>
</div>