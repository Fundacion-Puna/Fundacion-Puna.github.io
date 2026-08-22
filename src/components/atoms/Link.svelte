<script lang='ts'>
  interface Route {
    route: string
    content: string
  }

  interface Atom {
    styles: string
  }

  let { route, content, styles }: Route & Atom = $props()
</script>

<a class={styles} href={route}>{content}</a>
