import React, { RefObject } from "react";
import { ActionStepList } from "./actionStepList";
import { useSelector } from "react-redux";
import { getActions } from "../../../redux/selectors/actions";
import { getActionsRecordingState } from "../../../redux/selectors/recorder";
import { Conditional } from "../../components/conditional";
import { ACTIONS_RECORDING_STATE } from "../../../interfaces/actionsRecordingState";
import { TopLevelActionsList } from "./topLevelActionsList";
import { ElementLevelActionsList } from "./elementLevelActionsList";
import {
	FLEX_DIRECTION,
	FONT_WEIGHT,
	OVERFLOW,
	POSITION,
} from "../../../interfaces/css";
import { SelectElementPlaceholder } from "./selectElementPlaceholder";

interface iSidebarActionBoxProps {
	deviceIframeRef: RefObject<HTMLIFrameElement>;
}

const SidebarActionsBox = (props: iSidebarActionBoxProps) => {
	const actions = useSelector(getActions);
	const recordingState = useSelector(getActionsRecordingState);
	return (
		<div style={sidebarStyle}>
			<div style={tipContainerStyle}>
				<div>
					<img src="/icons/bulb.svg" width={31} />
				</div>
				<div style={tipContentStyle}>
					<div style={tipTitleStyle}>Tip of the session</div>
					<div style={tipDescStyle}>Click on play to replay selected test</div>
				</div>
			</div>
			<div style={mainContainerStyle}>
				<div style={stepsContainerStyle}>
					<ActionStepList items={actions} />
				</div>
				<div style={actionContainerStyle}>
					<Conditional
						If={recordingState.type === ACTIONS_RECORDING_STATE.SELECT_ELEMENT}
					>
						<SelectElementPlaceholder deviceIframeRef={props.deviceIframeRef} />
					</Conditional>
					<Conditional If={recordingState.type === ACTIONS_RECORDING_STATE.PAGE}>
						<TopLevelActionsList deviceIframeRef={props.deviceIframeRef} />
					</Conditional>
					<Conditional If={recordingState.type === ACTIONS_RECORDING_STATE.ELEMENT}>
						<ElementLevelActionsList deviceIframeRef={props.deviceIframeRef} />
					</Conditional>
				</div>
			</div>
		</div>
	);
};

const sidebarStyle = {
	display: "flex",
	flexDirection: FLEX_DIRECTION.COLUMN,
	position: POSITION.FIXED,
	bottom: "0",
	right: "0%",
	marginLeft: "auto",
	maxWidth: "22rem",
	borderTopLeftRadius: 20,
	width: "25vw",
};

const tipContainerStyle = {
	display: "flex",
	flexDirection: FLEX_DIRECTION.ROW,
	background: "rgb(1, 1, 1)",
	borderRadius: "0.62rem 0 0 0",
	padding: "0.88rem 1.63rem",
};

const tipContentStyle = {
	color: "#FFFFFF",
	fontFamily: "DM Sans",
	marginLeft: "0.898rem",
};

const tipTitleStyle = {
	color: "#FFFFFF",
	fontFamily: "DM Sans",
	fontSize: "0.85rem",
};

const tipDescStyle = {
	fontSize: "0.66rem",
	marginTop: "0.125rem",
	fontWeight: FONT_WEIGHT.BOLD,
};

const mainContainerStyle = {
	borderTopLeftRadius: 12,
	background: "#14181F",
	maxHeight: "80vh",
	overflow: "auto",
};

const stepsContainerStyle = {
	paddingBottom: "0rem",
	borderTopLeftRadius: 12,
};

const actionContainerStyle = {
	padding: "1.1rem 1.25rem",
	position: POSITION.RELATIVE,
	background: "#1C1F26",
	marginTop: "-0.55rem",
	borderTopLeftRadius: "12px",
	overflow: OVERFLOW.AUTO,
};

export { SidebarActionsBox };
