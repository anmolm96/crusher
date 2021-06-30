import { getXpath } from "./element";
import { generateSortedCueSets } from "./generateCueSets";
import { buildSelectorForCues, isSelectorMatch } from "./selectorEngine";
import { RankedSelector, Rect } from "./types";

export function* generateSelectors(
	target: HTMLElement,
	timeout = 1000,
	selectorCache?: Map<HTMLElement, RankedSelector>,
): Generator<RankedSelector, void, unknown> {
	const start = Date.now();

	const rectCache = new Map<HTMLElement, Rect>();

	if (selectorCache && selectorCache.has(target)) {
		const rankedSelector = selectorCache.get(target);
		const isMatch = isSelectorMatch(rankedSelector!.selector, target, rectCache);
		if (isMatch) {
			yield rankedSelector!;
		} else {
			// delete from cache if not a match
			selectorCache.delete(target);
		}
	}

	const cueSets = generateSortedCueSets(target);

	let count = 0;

	for (const cueSet of cueSets) {
		const selector = buildSelectorForCues(cueSet.cues);

		const isMatch = isSelectorMatch(selector, target, rectCache);
		if (isMatch) {
			const rankedSelector = { penalty: cueSet.penalty, selector };
			if (selectorCache) {
				selectorCache.set(target, rankedSelector);
			}
			yield rankedSelector;
			count += 1;
		}

		if (timeout > 0 && Date.now() - start > timeout) break;
	}

	if (count < 1) yield { penalty: 1000, selector: getXpath(target) };
}

export function getSelector(target: HTMLElement, timeout = 1000, selectorCache?: Map<HTMLElement, RankedSelector>): string | undefined {
	const selectors = generateSelectors(target, timeout, selectorCache);

	for (const selector of selectors) {
		// take the first one
		return selector.selector;
	}

	return null;
}
