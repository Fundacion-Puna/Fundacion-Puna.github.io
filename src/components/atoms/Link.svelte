<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/state";

  interface Route {
    route: string;
    content: string;
  }

  interface Atom {
    styles?: string;
    onclick?: (event: MouseEvent) => void;
  }

  let { route, content, styles = "", onclick }: Route & Atom = $props();

  // Respect `paths.base` so links keep working under the GitHub Pages BASE_PATH.
  const href = $derived(`${base}/${route}`);

  const current = $derived(
    page.url.pathname === href || page.url.pathname.startsWith(`${href}/`),
  );
</script>

<a
  {href}
  {onclick}
  aria-current={current ? "page" : undefined}
  class="rounded-base text-surface-900-100 no-underline transition-colors
         hover:bg-surface-300-700 hover:text-primary-900-100
         aria-[current=page]:text-primary-900-100 aria-[current=page]:underline
         aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-4 {styles}"
>
  {content}
</a>
