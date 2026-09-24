<script lang="ts" generics="T">
  import type { Snippet } from "svelte";

  interface Props {
    items: readonly T[];
    key: (item: T) => string;
    /** Best guess at an item's height for a column width, used until the
     * rendered item has been measured. */
    estimate: (item: T, columnWidth: number) => number;
    /** Narrowest a column may get before one is dropped, in px. */
    minColumnWidth?: number;
    minColumns?: number;
    maxColumns?: number;
    /** Space between items, both ways, in px. */
    gap?: number;
    item: Snippet<[T]>;
    /** Rendered until the container has been measured (prerender, first frame). */
    placeholder?: Snippet;
    label?: string;
  }

  let {
    items,
    key,
    estimate,
    minColumnWidth = 220,
    minColumns = 2,
    maxColumns = 5,
    gap = 12,
    item,
    placeholder,
    label,
  }: Props = $props();

  let width = $state(0);

  /** Rendered heights by key, kept across filter changes so a returning item
   * lands in place straight away. */
  const heights: Record<string, number> = $state({});

  const columns = $derived(
    width
      ? Math.min(
          maxColumns,
          Math.max(minColumns, Math.floor((width + gap) / (minColumnWidth + gap))),
        )
      : 0,
  );

  const columnWidth = $derived(
    columns ? (width - gap * (columns - 1)) / columns : 0,
  );

  /*
    Each item goes to the currently shortest column. That greedy pass gives
    the same answer for any prefix of the list, so appending a page never
    moves a card that is already on screen.

    Items are absolutely positioned rather than split into column wrappers so
    the DOM — and with it tab and screen-reader order — stays in list order.
  */
  const layout = $derived.by(() => {
    if (!columns) return { cells: [], height: 0 };

    const tops: number[] = Array(columns).fill(0);

    const cells = items.map((entry) => {
      const id = key(entry);
      const column = tops.indexOf(Math.min(...tops));
      const y = tops[column];
      tops[column] += (heights[id] ?? estimate(entry, columnWidth)) + gap;
      return { id, entry, x: column * (columnWidth + gap), y };
    });

    return { cells, height: Math.max(0, Math.max(...tops) - gap) };
  });
</script>

<div bind:clientWidth={width}>
  {#if columns}
    <ul
      class="relative m-0 list-none p-0"
      style:height="{layout.height}px"
      aria-label={label}
    >
      {#each layout.cells as cell (cell.id)}
        <li
          class="absolute top-0 left-0"
          style:width="{columnWidth}px"
          style:transform="translate({cell.x}px, {cell.y}px)"
          bind:clientHeight={heights[cell.id]}
        >
          {@render item(cell.entry)}
        </li>
      {/each}
    </ul>
  {:else}
    {@render placeholder?.()}
  {/if}
</div>
