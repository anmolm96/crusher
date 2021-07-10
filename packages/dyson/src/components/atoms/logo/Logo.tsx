import React from "react";

export interface LogoProps {
	showOnlyIcon: boolean;
	isMonochrome: boolean;
	height?: number | string;
	/**
	 * Emotion CSS style if any
	 */
	css?: [string] | string;
	/**
	 * Optional click handler
	 */
	onClick?: () => void;
}

const LogoDefaultProps = {
	showOnlyIcon: false,
	isMonochrome: false,
	height: "100%",
};

/**
 * Crusher Logo component.
 */
export const Logo: React.FC<LogoProps> = ({ showOnlyIcon, isMonochrome, height, ...props }) => {
	return (
		<svg height={height} viewBox={`0 0 ${showOnlyIcon?"100":644} 100`} fill="none" {...props}>
			{!showOnlyIcon && (
				<>
					<path
						d="M195.879 40.686c-3.544-4.407-7.922-6.61-13.134-6.61-2.293 0-4.43.424-6.411 1.274a15.31 15.31 0 00-5.004 3.504c-1.407 1.434-2.528 3.16-3.361 5.177-.782 2.018-1.173 4.195-1.173 6.531 0 2.39.391 4.593 1.173 6.611.833 2.018 1.954 3.77 3.361 5.257a16.224 16.224 0 005.082 3.504c1.929.85 4.013 1.275 6.255 1.275 4.899 0 9.303-2.124 13.212-6.372v18.478l-1.563.558c-2.346.85-4.535 1.46-6.568 1.832a29.36 29.36 0 01-6.019.637c-4.066 0-7.975-.77-11.728-2.31a32.013 32.013 0 01-9.851-6.61c-2.814-2.868-5.081-6.24-6.801-10.116-1.72-3.93-2.58-8.204-2.58-12.823 0-4.62.833-8.841 2.501-12.664 1.72-3.876 3.988-7.195 6.802-9.956a30.646 30.646 0 019.929-6.531 29.91 29.91 0 0111.806-2.39c2.345 0 4.638.266 6.88.797 2.293.478 4.691 1.248 7.192 2.31v18.637zM204.244 39.81h14.151v6.69c1.512-2.442 3.362-4.3 5.551-5.575 2.189-1.327 4.743-1.991 7.662-1.991h1.173c.469 0 .99.053 1.563.16v13.778c-1.876-.956-3.909-1.434-6.098-1.434-3.284 0-5.759 1.01-7.427 3.027-1.616 1.965-2.424 4.859-2.424 8.682v17.522h-14.151V39.81zM254.814 39.81v23.018c0 5.044 2.397 7.567 7.192 7.567 4.796 0 7.193-2.522 7.193-7.567V39.81h14.151v25.806c0 5.522-1.798 9.664-5.395 12.425-3.544 2.76-8.86 4.142-15.949 4.142-7.088 0-12.43-1.381-16.027-4.142-3.544-2.761-5.316-6.903-5.316-12.425V39.81h14.151zM319.544 50.324c-2.606-1.381-5.16-2.071-7.662-2.071-1.303 0-2.371.265-3.205.796-.782.531-1.173 1.248-1.173 2.15 0 .478.052.877.156 1.195.157.266.443.531.86.797.469.265 1.121.504 1.955.717.886.212 2.033.477 3.44.796 3.909.797 6.828 2.23 8.756 4.301 1.929 2.018 2.893 4.62 2.893 7.806 0 2.389-.469 4.54-1.407 6.45a14.061 14.061 0 01-3.909 4.86c-1.668 1.274-3.675 2.256-6.02 2.946-2.346.744-4.926 1.116-7.74 1.116-5.421 0-10.763-1.567-16.028-4.7l5.16-10.195c3.961 2.761 7.714 4.142 11.258 4.142 1.303 0 2.372-.292 3.206-.876.834-.584 1.251-1.328 1.251-2.23 0-.531-.078-.956-.235-1.275-.104-.371-.365-.69-.782-.955-.417-.319-1.042-.584-1.876-.797-.782-.265-1.824-.53-3.127-.796-4.378-.903-7.454-2.23-9.226-3.983-1.72-1.805-2.58-4.274-2.58-7.407 0-2.283.417-4.327 1.251-6.133a12.665 12.665 0 013.597-4.699c1.563-1.274 3.44-2.257 5.629-2.947 2.241-.69 4.717-1.035 7.427-1.035 4.43 0 8.73.876 12.9 2.628l-4.769 9.399zM332.74 14.562h14.151v30.425c1.928-2.39 3.883-3.982 5.864-4.779 1.98-.85 4.3-1.274 6.958-1.274 5.056 0 8.86 1.434 11.414 4.3 2.606 2.815 3.909 6.638 3.909 11.47V80.67h-14.151V60.041c0-2.071-.156-3.744-.469-5.018-.312-1.275-.834-2.257-1.563-2.947-1.251-1.115-2.763-1.673-4.535-1.673-2.397 0-4.248.744-5.551 2.23-1.251 1.434-1.876 3.505-1.876 6.213v21.823H332.74V14.562zM413.976 54.306c-.469-2.018-1.434-3.637-2.893-4.859-1.459-1.22-3.231-1.832-5.316-1.832-2.189 0-3.988.584-5.395 1.753-1.355 1.168-2.215 2.814-2.58 4.938h16.184zm-16.575 8.363c0 6.212 2.867 9.319 8.6 9.319 3.075 0 5.395-1.275 6.958-3.823h13.682c-2.762 9.345-9.668 14.017-20.718 14.017-3.388 0-6.489-.504-9.304-1.513-2.814-1.062-5.238-2.549-7.27-4.46-1.981-1.912-3.519-4.195-4.613-6.85-1.095-2.655-1.642-5.628-1.642-8.92 0-3.399.521-6.452 1.564-9.16 1.042-2.76 2.527-5.097 4.456-7.009 1.928-1.911 4.248-3.372 6.958-4.38 2.763-1.062 5.864-1.593 9.304-1.593 3.388 0 6.437.53 9.147 1.593 2.71 1.008 5.004 2.495 6.88 4.46 1.876 1.965 3.31 4.38 4.3 7.248.99 2.814 1.485 6 1.485 9.558v1.513h-29.787zM435.277 39.81h14.151v6.69c1.512-2.442 3.362-4.3 5.551-5.575 2.189-1.327 4.743-1.991 7.662-1.991h1.173c.469 0 .99.053 1.563.16v13.778c-1.876-.956-3.909-1.434-6.098-1.434-3.284 0-5.759 1.01-7.427 3.027-1.616 1.965-2.424 4.859-2.424 8.682v17.522h-14.151V39.81zM466.106 73.023c0-1.274.234-2.47.703-3.584a9.128 9.128 0 011.955-3.027 9.138 9.138 0 012.893-1.99 9.253 9.253 0 013.596-.718c1.251 0 2.424.24 3.518.717a8.917 8.917 0 012.971 1.991 9.113 9.113 0 011.955 3.027 9.148 9.148 0 01.703 3.584 9.743 9.743 0 01-.703 3.664 9.33 9.33 0 01-1.955 2.947 8.917 8.917 0 01-2.971 1.99 8.692 8.692 0 01-3.518.718 9.253 9.253 0 01-3.596-.717 9.138 9.138 0 01-2.893-1.991 9.347 9.347 0 01-1.955-2.947 9.743 9.743 0 01-.703-3.664zM506.514 60.12c0 1.328.234 2.575.703 3.744a10.082 10.082 0 001.877 2.947 9.134 9.134 0 002.892 1.99 9.459 9.459 0 003.675.718 8.696 8.696 0 003.518-.717c1.147-.478 2.111-1.142 2.893-1.992a9.327 9.327 0 001.954-2.947 8.362 8.362 0 00.782-3.584c0-1.274-.261-2.469-.782-3.584a9.112 9.112 0 00-1.954-3.026c-.782-.85-1.746-1.514-2.893-1.991a8.696 8.696 0 00-3.518-.717c-1.251 0-2.45.239-3.597.717a9.145 9.145 0 00-2.892 1.99 11.51 11.51 0 00-1.955 2.948c-.469 1.062-.703 2.23-.703 3.504zm17.825-45.558h14.229v66.107h-14.229v-4.54c-3.023 3.876-7.115 5.814-12.275 5.814-2.918 0-5.603-.557-8.052-1.672a19.922 19.922 0 01-6.411-4.62c-1.824-1.964-3.258-4.274-4.3-6.929-.99-2.655-1.486-5.522-1.486-8.602 0-2.92.469-5.681 1.408-8.283.99-2.655 2.371-4.965 4.143-6.93a19.064 19.064 0 016.333-4.62c2.502-1.167 5.238-1.751 8.209-1.751 5.004 0 9.147 1.778 12.431 5.336v-29.31zM577.516 54.306c-.469-2.018-1.433-3.637-2.893-4.859-1.459-1.22-3.231-1.832-5.316-1.832-2.189 0-3.987.584-5.395 1.753-1.355 1.168-2.215 2.814-2.58 4.938h16.184zm-16.575 8.363c0 6.212 2.867 9.319 8.6 9.319 3.076 0 5.395-1.275 6.959-3.823h13.681c-2.762 9.345-9.668 14.017-20.718 14.017-3.388 0-6.489-.504-9.303-1.513-2.815-1.062-5.239-2.549-7.271-4.46-1.981-1.912-3.518-4.195-4.613-6.85-1.095-2.655-1.642-5.628-1.642-8.92 0-3.399.521-6.452 1.564-9.16 1.042-2.76 2.528-5.097 4.456-7.009 1.929-1.911 4.248-3.372 6.958-4.38 2.763-1.062 5.864-1.593 9.304-1.593 3.388 0 6.437.53 9.147 1.593 2.71 1.008 5.004 2.495 6.88 4.46 1.877 1.965 3.31 4.38 4.3 7.248.99 2.814 1.486 6 1.486 9.558v1.513h-29.788zM608.01 39.81l9.539 20.947 9.694-20.947h15.793l-20.875 40.86h-9.46l-20.64-40.86h15.949zM21.493 27.247c-1.727 0-2.879 1.201-2.879 3.003v24.025c0 1.801 1.152 3.003 2.88 3.003h5.758V27.247h-5.759z"
						fill="#fff"
					/>
				</>
			)}
			<path
				d="M27.249 27.246v30.03l11.392-3.003V30.25l-11.392-3.003zM64.377 75.295H47.102v24.32h17.275v-24.32zM87.123 61.18c-.576-19.82-11.805-33.934-25.625-33.934H49.405l-8.061 3.003v24.024l4.894 5.105c.576.601.864 1.202.864 2.103v10.81h17.275V60.88c0-.3 0-.901.288-1.201l1.728-3.604c.576-1.201 1.44-1.802 2.59-1.802 6.335.3 12.381 2.703 16.988 7.508.288.9 1.44.3 1.152-.6z"
				fill="#fff"
			/>

			<rect y={0.769} width={94.769} height={98.846} rx={10} fill="url(#prefix__paint0_linear)" />
			<path
				d="M15.853 27.247c-1.728 0-2.88 1.201-2.88 3.003v24.025c0 1.801 1.152 3.003 2.88 3.003h5.758V27.247h-5.758z"
				fill={isMonochrome ? "#0E1115" : "#fff"}
			/>
			<path
				d="M21.61 27.246v30.03l11.392-3.003V30.25L21.61 27.246zM58.739 73.138h-17.56v26.477h17.56V73.138zM81.486 61.18C80.91 41.36 69.68 27.246 55.86 27.246H43.768l-8.062 3.003v24.024l4.895 5.105c.576.601.864 1.202.864 2.103v10.81H58.74V60.88c0-.3 0-.901.288-1.201l1.727-3.604c.576-1.201 1.44-1.802 2.592-1.802 6.334.3 12.38 2.703 16.987 7.508.614.767 1.151.345 1.151-.6z"
				fill={isMonochrome ? "#0E1115" : "#fff"}
			/>

			<defs>
				<linearGradient id="prefix__paint0_linear" x1={47.384} y1={0.769} x2={47.384} y2={99.615} gradientUnits="userSpaceOnUse">
					<stop stopColor={isMonochrome ? "#FFF" : "#7C50FF"} />
					<stop offset={1} stopColor={isMonochrome ? "#FFF" : "#4FB2FF"} />
				</linearGradient>
			</defs>
		</svg>
	);
};

Logo.defaultProps = LogoDefaultProps;
