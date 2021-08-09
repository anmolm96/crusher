import { Page } from "playwright";
import { iAction } from "@crusher-shared/types/action";
import { iSelectorInfo } from "@crusher-shared/types/selectorInfo";
import { toCrusherSelectorsFormat } from "../utils/helper";
import { waitForSelectors } from "../functions";
import { setPageUrl } from "../utils/state";

export default function click(action: iAction, page: Page) {
	return new Promise(async (success, error) => {
		setPageUrl(await page.url());
		try {
			const selectors = action.payload.selectors as iSelectorInfo[];
			const selectorInfo = await waitForSelectors(page, selectors);

			const elementHandle = await page.$(selectorInfo.value);
			if (!elementHandle) {
				return error(`No element with selector as ${selectors[0].value} exists`);
			}

			await elementHandle.scrollIntoViewIfNeeded();
			await elementHandle.dispatchEvent("click");
			const pageUrl = await page.url();
			return success({
				message: `Clicked on the element ${selectors[0].value}`,
				pageUrl: pageUrl,
				selector: selectorInfo,
			});
		} catch (err) {
			console.error(err);
			return error("Some issue occurred while clicking on element");
		}
	});
}
