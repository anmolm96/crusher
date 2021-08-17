export enum ACTIONS_IN_TEST {
	SET_DEVICE = "BROWSER_SET_DEVICE",
	NAVIGATE_URL = "PAGE_NAVIGATE_URL",
	VALIDATE_SEO = "PAGE_VALIDATE_SEO",
	CLICK = "ELEMENT_CLICK",
	ADD_INPUT = "ELEMENT_ADD_INPUT",
	HOVER = "ELEMENT_HOVER",
	WAIT_FOR_NAVIGATION = "PAGE_WAIT_FOR_NAVIGATION",
	PAGE_SCROLL = "PAGE_SCROLL",
	ELEMENT_SCROLL = "ELEMENT_SCROLL",
	ASSERT_ELEMENT = "ELEMENT_ASSERT",
	CUSTOM_ELEMENT_SCRIPT = "ELEMENT_CUSTOM_SCRIPT",
	ELEMENT_SCREENSHOT = "ELEMENT_SCREENSHOT",
	ELEMENT_FOCUS = "ELEMENT_FOCUS",
	BLACKOUT = "ELEMENT_BLACKOUT",
	PAGE_SCREENSHOT = "PAGE_SCREENSHOT",
}

export enum ActionsInTestEnum  {
	SET_DEVICE = "BROWSER_SET_DEVICE",
	NAVIGATE_URL = "PAGE_NAVIGATE_URL",
	VALIDATE_SEO = "PAGE_VALIDATE_SEO",
	CLICK = "ELEMENT_CLICK",
	ADD_INPUT = "ELEMENT_ADD_INPUT",
	HOVER = "ELEMENT_HOVER",
	WAIT_FOR_NAVIGATION = "PAGE_WAIT_FOR_NAVIGATION",
	PAGE_SCROLL = "PAGE_SCROLL",
	ELEMENT_SCROLL = "ELEMENT_SCROLL",
	ASSERT_ELEMENT = "ELEMENT_ASSERT",
	CUSTOM_ELEMENT_SCRIPT = "ELEMENT_CUSTOM_SCRIPT",
	ELEMENT_SCREENSHOT = "ELEMENT_SCREENSHOT",
	ELEMENT_FOCUS = "ELEMENT_FOCUS",
	BLACKOUT = "ELEMENT_BLACKOUT",
	PAGE_SCREENSHOT = "PAGE_SCREENSHOT",
}


export const ACTIONS_TO_LABEL_MAP: Record<ACTIONS_IN_TEST, string> = {
	[ACTIONS_IN_TEST.ELEMENT_SCROLL]: "Eleemnt Scroll",
	[ACTIONS_IN_TEST.SET_DEVICE]: "Set a device",
	[ACTIONS_IN_TEST.NAVIGATE_URL]: "Navigate to URL",
	[ACTIONS_IN_TEST.ADD_INPUT]: "Add input",
	[ACTIONS_IN_TEST.ASSERT_ELEMENT]: "Assert element",
	[ACTIONS_IN_TEST.ELEMENT_SCREENSHOT]: "Screenshot element",
	[ACTIONS_IN_TEST.PAGE_SCREENSHOT]: "Screenshot page",
	[ACTIONS_IN_TEST.ELEMENT_FOCUS]: "Focus on element",
	[ACTIONS_IN_TEST.VALIDATE_SEO]: "Validate SEO",
	[ACTIONS_IN_TEST.BLACKOUT]: "Blackout",
	[ACTIONS_IN_TEST.CLICK]: "Click on element",
	[ACTIONS_IN_TEST.WAIT_FOR_NAVIGATION]: "Wait for navigation",
	[ACTIONS_IN_TEST.CUSTOM_ELEMENT_SCRIPT]: "Add custom element script",
	[ACTIONS_IN_TEST.HOVER]: "Hover on element",
	[ACTIONS_IN_TEST.PAGE_SCROLL]: "Scroll page",
	[ACTIONS_IN_TEST.ELEMENT_SCROLL]: "Scroll element",
};
