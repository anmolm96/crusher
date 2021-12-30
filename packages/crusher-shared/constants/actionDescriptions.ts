import { ACTIONS_IN_TEST } from "./recordedActions";
interface ActionMeta {
	selector?: string;
	value?: string;
}

const ACTION_DESCRIPTIONS = {
	[ACTIONS_IN_TEST.SET_DEVICE]: (meta: ActionMeta) => {
		return `Set user agent to ${meta.value}`;
	},
	[ACTIONS_IN_TEST.NAVIGATE_URL]: (meta: ActionMeta) => {
		return `Navigated to ${meta.value}`;
	},
	[ACTIONS_IN_TEST.CLICK]: (meta: ActionMeta) => {
		return `Clicked on ${meta.selector}`;
	},
	[ACTIONS_IN_TEST.HOVER]: (meta: ActionMeta) => {
		return `Hovered on ${meta.selector}`;
	},
	[ACTIONS_IN_TEST.ELEMENT_SCREENSHOT]: (meta: ActionMeta) => {
		return `Took screenshot of ${meta.selector}`;
	},
	[ACTIONS_IN_TEST.PAGE_SCREENSHOT]: () => {
		return `Took page screenshot`;
	},
	[ACTIONS_IN_TEST.ADD_INPUT]: (meta: ActionMeta) => {
		return `Type ${meta.value} in ${meta.selector}`;
	},
	[ACTIONS_IN_TEST.ASSERT_ELEMENT]: (meta: ActionMeta) => {
		return `Assert element info from ${meta.selector}`;
	},
	[ACTIONS_IN_TEST.VALIDATE_SEO]: () => {
		return `Validating SEO info`;
	},
	[ACTIONS_IN_TEST.CUSTOM_CODE]: () => {
		return `Executing custom code`;
	},
	[ACTIONS_IN_TEST.RUN_TEMPLATE]: () => "Running a template with series of steps",
};

export { ACTION_DESCRIPTIONS };
