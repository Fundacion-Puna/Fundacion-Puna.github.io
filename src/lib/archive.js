/**
 * The photographic and documentary archive of the wetland.
 *
 * To add an item: drop the file in `static/` (photos) or `static/docs/`
 * (PDFs), run `python3 scripts/thumbnails.py`, then list it below under its
 * year. Entries without a `title` are shown as a generic photo record.
 *
 * @typedef {'photo' | 'pdf'} ArchiveKind
 *
 * @typedef {object} CatalogEntry
 * @property {string} file   Path relative to `static/`.
 * @property {string} [title]
 * @property {string} [date] ISO `yyyy-mm-dd`, when the exact day is known.
 *
 * @typedef {object} ArchiveItem
 * @property {string} id
 * @property {ArchiveKind} kind
 * @property {string} file
 * @property {string} title
 * @property {number} year
 * @property {string} [date]
 * @property {string} [thumb] Preview relative to `static/`; PDFs may lack one.
 * @property {number} [width] Oriented size of the photo or PDF cover.
 * @property {number} [height]
 * @property {number} [pages]
 *
 * @typedef {object} ArchiveFilter
 * @property {ArchiveKind | null} [kind]
 * @property {number | null} [year]
 *
 * @typedef {object} ArchivePage
 * @property {ArchiveItem[]} items
 * @property {number} total Matching items across every page.
 */

import media from './media.json';

const UNTITLED = 'Registro fotográfico';

/** @type {Record<number, CatalogEntry[]>} */
const CATALOG = {
	2010: [
		{ file: 'Cabecera-norte_HAM.jpg', title: 'Cabecera norte del humedal' },
		{ file: 'Equilibrio_agua_vegetación_HAM.jpg', title: 'Equilibrio entre agua y vegetación' },
		{ file: 'Espejo_agua_buchón.jpg', title: 'Espejo de agua con buchón' },
		{ file: 'Espejo_agua_HAM_I.jpg', title: 'Espejo de agua' },
		{ file: 'Espejo_agua_HAM.jpg', title: 'Espejo de agua' },
		{ file: 'Espejo_agua_HAMII.jpg', title: 'Espejo de agua' },
		{ file: 'Espejo_agua_HAMIII.jpg', title: 'Espejo de agua' },
		{ file: 'Espejo_agua_HAMIV.jpg', title: 'Espejo de agua' },
		{ file: 'Espejo_agua_HAMV.jpg', title: 'Espejo de agua' },
		{ file: 'Espejo_agua_HAMVI.jpg', title: 'Espejo de agua' },
		{ file: 'Espejo_agua_HAMVII.jpg', title: 'Espejo de agua' },
		{ file: 'Hembras_N_dominicus.jpg', title: 'Hembras de N. dominicus' },
		{ file: 'Hembras_N_dominicusI.jpg', title: 'Hembras de N. dominicus' },
		{ file: 'Presencia de Typha.jpg', title: 'Presencia de Typha' }
	],
	2013: [
		{ file: 'Dendrocygna bicolorI.JPG', title: 'Dendrocygna bicolor' },
		{ file: 'EMPRESA_PRESTADORA_AGUAS_RIONEGRO_2013.JPG', title: 'Empresa Prestadora de Aguas de Rionegro' },
		{ file: 'EMPRESA_PRESTADORA_AGUAS_RIONEGRO_2013I.JPG', title: 'Empresa Prestadora de Aguas de Rionegro' },
		{ file: 'HAM.JPG' },
		{ file: 'HAMI.JPG' },
		{ file: 'HAMII.JPG' },
		{ file: 'HAMIII.JPG' },
		{ file: 'Presencia_espejo_agua.JPG', title: 'Presencia de espejo de agua' },
		{ file: 'Presencia_espejo_aguaI.JPG', title: 'Presencia de espejo de agua' },
		{ file: 'Presencia_espejo_aguaII.JPG', title: 'Presencia de espejo de agua' },
		{ file: 'Presencia_espejo_aguaIV.JPG', title: 'Presencia de espejo de agua' },
		{ file: 'Presencia_espejo_aguaIX.JPG', title: 'Presencia de espejo de agua' },
		{ file: 'Presencia_espejo_aguaV.JPG', title: 'Presencia de espejo de agua' },
		{ file: 'Presencia_espejo_aguaVI.JPG', title: 'Presencia de espejo de agua' },
		{ file: 'Presencia_espejo_aguaVII.JPG', title: 'Presencia de espejo de agua' },
		{ file: 'Presencia_espejo_aguaVIII.JPG', title: 'Presencia de espejo de agua' },
		{ file: 'Presencia_espejo_aguaX.JPG', title: 'Presencia de espejo de agua' },
		{ file: 'Presencia_espejo_aguaXI.JPG', title: 'Presencia de espejo de agua' },
		{ file: 'Presencia_espejo_aguaXII.JPG', title: 'Presencia de espejo de agua' },
		{ file: 'Presencia_espejo_aguaXIII.JPG', title: 'Presencia de espejo de agua' },
		{ file: 'Vegetación_borde_escasa_pinos.JPG', title: 'Vegetación de borde escasa y pinos' }
	],
	2015: [
		{ file: 'Presencia_residuos_sólidos.jpg', title: 'Presencia de residuos sólidos' },
		{ file: 'Presencia_residuos_sólidosI.jpg', title: 'Presencia de residuos sólidos' },
		{ file: 'Quemas_Bosque.jpg', title: 'Quemas en el bosque' },
		{ file: 'Quemas_BosqueI.jpg', title: 'Quemas en el bosque' },
		{ file: 'Resto_fogata_uso_turístico.jpg', title: 'Restos de fogata por uso turístico' }
	],
	2017: [
		{ file: 'CAM00514.jpg' },
		{ file: 'CAM00515.jpg' },
		{ file: 'CAM00516.jpg' },
		{ file: 'CAM00517.jpg' }
	],
	2023: [
		{ file: '20230303_093941.jpg', date: '2023-03-03' },
		{ file: '20230303_093944.jpg', date: '2023-03-03' },
		{ file: '20230303_093947.jpg', date: '2023-03-03' },
		{ file: '20230303_094004.jpg', date: '2023-03-03' },
		{ file: '20230303_094007.jpg', date: '2023-03-03' },
		{ file: '20230303_094025.jpg', date: '2023-03-03' },
		{ file: '20230303_094139.jpg', date: '2023-03-03' },
		{ file: '20230303_094146.jpg', date: '2023-03-03' },
		{ file: '20230714_101022.jpg', date: '2023-07-14' },
		{ file: '20230714_120220.jpg', date: '2023-07-14' },
		{ file: '20230915_090152.jpg', date: '2023-09-15' },
		{ file: '20230915_090155.jpg', date: '2023-09-15' },
		{ file: '20230915_090731.jpg', date: '2023-09-15' },
		{ file: '20230915_090736.jpg', date: '2023-09-15' },
		{ file: '20230915_090819.jpg', date: '2023-09-15' },
		{ file: '20230915_090902.jpg', date: '2023-09-15' },
		{ file: '20230915_090921.jpg', date: '2023-09-15' },
		{ file: '20230915_091236.jpg', date: '2023-09-15' },
		{ file: '20230915_091251.jpg', date: '2023-09-15' },
		{ file: '20230915_091254.jpg', date: '2023-09-15' },
		{ file: '20230915_091959.jpg', date: '2023-09-15' },
		{ file: '20230915_092005.jpg', date: '2023-09-15' },
		{ file: '20230915_092008.jpg', date: '2023-09-15' },
		{ file: '20230915_092013.jpg', date: '2023-09-15' },
		{ file: '20230915_092016.jpg', date: '2023-09-15' },
		{ file: 'Cobertura  casi total del espejo de agua.jpg', title: 'Cobertura casi total del espejo de agua' }
	],
	2024: [
		{ file: 'Disminución tangencial de las aves.jpg', title: 'Disminución tangencial de las aves' },
		{ file: 'Sin espejo de agua 2024.jpg', title: 'Sin espejo de agua' },
		{ file: 'Totalmente cubierto por planta invasora.jpg', title: 'Totalmente cubierto por planta invasora' }
	]
};

/** @type {Record<string, { width?: number, height?: number, thumb?: string, pages?: number }>} */
const MEDIA = media;

/**
 * Every item, oldest first, so scrolling follows the wetland's decline.
 *
 * @type {readonly ArchiveItem[]}
 */
export const ARCHIVE = Object.entries(CATALOG).flatMap(([year, entries]) =>
	entries.map(({ file, title, date }) => ({
		id: file,
		kind: /** @type {ArchiveKind} */ (file.toLowerCase().endsWith('.pdf') ? 'pdf' : 'photo'),
		file,
		title: title ?? UNTITLED,
		year: Number(year),
		date,
		...MEDIA[file]
	}))
);

/** Years that have at least one item, ascending. */
export const YEARS = [...new Set(ARCHIVE.map((item) => item.year))];

export const PHOTO_COUNT = ARCHIVE.filter((item) => item.kind === 'photo').length;

/** @param {ArchiveFilter} filter */
function matches({ kind = null, year = null }) {
	/** @param {ArchiveItem} item */
	return (item) => (kind === null || item.kind === kind) && (year === null || item.year === year);
}

/**
 * How many items match a filter, without paging through them.
 *
 * @param {ArchiveFilter} [filter]
 */
export function countArchive(filter = {}) {
	return ARCHIVE.filter(matches(filter)).length;
}

/**
 * One page of the archive. Async on purpose: the gallery only talks to this
 * seam, so the catalogue can later move behind a JSON endpoint or a CMS
 * without the infinite scroll changing.
 *
 * @param {{ offset: number, limit: number } & ArchiveFilter} query
 * @returns {Promise<ArchivePage>}
 */
export async function loadArchivePage({ offset, limit, ...filter }) {
	const found = ARCHIVE.filter(matches(filter));
	return { items: found.slice(offset, offset + limit), total: found.length };
}
