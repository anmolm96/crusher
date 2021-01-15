import React from "react";
import { SettingsContent } from "@ui/components/settings/SettingsContent";
import { css } from "@emotion/core";
import { PIXEL_REM_RATIO } from "@constants/other";
import { SettingsContentHeader } from "@ui/components/settings/SettingsContentHeader";
import MonitoringCard from "@ui/containers/settings/monitoringCard";
import withSession from "@hoc/withSession";
import { WithSettingsLayout } from "@hoc/v2/withSettingLayout";
import Router from "next/router";

const MonitoringSettings = () => {
	const handleAddMonitoringClick = () => {
		Router.replace("/app/settings/project/add-monitoring");
	};

	return (
		<div css={monitoringCSS}>
			<SettingsContent contentCSS={settingContentCSS}>
				<SettingsContentHeader
					title={"Monitoring"}
					desc={"List of all team members in current project"}
					button={<AddMonitoringButton onClick={handleAddMonitoringClick} />}
				/>
				<div css={containerCSS}>
					<MonitoringCard
						title={"Prod Monitoring"}
						host={"Production"}
						tags={["Production", "Development"]}
						countries={["India", "UK"]}
						duration={1800}
						escalation={"Production"}
					/>
				</div>
			</SettingsContent>
		</div>
	);
};

interface iButtonProps {
	onClick: () => void;
}

const AddMonitoringButton = (props: iButtonProps) => {
	const { onClick } = props;
	return (
		<div css={buttonCSS} onClick={onClick}>
			Add Monitoring
		</div>
	);
};

const containerCSS = css`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	width: 100%;
	margin-top: ${42 / PIXEL_REM_RATIO}rem;
`;

const monitoringCSS = css`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const buttonCSS = css`
	background: #5286ff;
	border-radius: ${4 / PIXEL_REM_RATIO}rem;
	padding: ${8 / PIXEL_REM_RATIO}rem ${8 / PIXEL_REM_RATIO}rem;
	min-width: ${180 / PIXEL_REM_RATIO}rem;
	font-size: ${16 / PIXEL_REM_RATIO}rem;
	font-weight: 600;
	color: #fff;
	text-align: center;
`;

const settingContentCSS = css`
	width: ${720 / PIXEL_REM_RATIO}rem;
`;

export default withSession(WithSettingsLayout(MonitoringSettings));
