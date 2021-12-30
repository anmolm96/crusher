import { SocialButtonBase } from "../SocialButtonBase";

const GithubIcon = () => (
	<svg width="17" height="17" viewBox="0 0 17 17" fill="none">
		<path
			d="M15.8597 4.44137C15.0996 3.13905 14.0686 2.108 12.7664 1.34799C11.464 0.587936 10.0421 0.208008 8.49986 0.208008C6.95779 0.208008 5.53549 0.588052 4.23336 1.34799C2.93104 2.10796 1.90007 3.13905 1.13998 4.44137C0.380005 5.74365 0 7.16575 0 8.70764C0 10.5598 0.540373 12.2253 1.62139 13.7046C2.70229 15.184 4.09865 16.2077 5.81037 16.7757C6.00961 16.8127 6.15711 16.7867 6.25301 16.6984C6.34895 16.6099 6.39687 16.4991 6.39687 16.3665C6.39687 16.3443 6.39497 16.1452 6.39129 15.7688C6.38749 15.3925 6.3857 15.0642 6.3857 14.784L6.13114 14.828C5.96883 14.8578 5.76408 14.8704 5.51688 14.8668C5.2698 14.8634 5.0133 14.8375 4.74772 14.7893C4.48203 14.7416 4.23491 14.6309 4.00616 14.4575C3.77753 14.2841 3.61523 14.0572 3.51928 13.777L3.40861 13.5223C3.33484 13.3528 3.21871 13.1644 3.06005 12.9579C2.90138 12.7513 2.74094 12.6112 2.57863 12.5374L2.50114 12.482C2.44951 12.4451 2.4016 12.4006 2.35729 12.349C2.31302 12.2974 2.27988 12.2458 2.25774 12.1941C2.23557 12.1423 2.25394 12.0999 2.31306 12.0666C2.37217 12.0333 2.47901 12.0171 2.63403 12.0171L2.85529 12.0502C3.00287 12.0798 3.18541 12.1681 3.40315 12.3158C3.62077 12.4633 3.79967 12.6551 3.93988 12.8911C4.10966 13.1937 4.31422 13.4243 4.55413 13.5829C4.79385 13.7416 5.03555 13.8208 5.27899 13.8208C5.52242 13.8208 5.73268 13.8023 5.90983 13.7656C6.08679 13.7287 6.25282 13.6733 6.40784 13.5995C6.47424 13.105 6.65504 12.725 6.95007 12.4595C6.52956 12.4153 6.15149 12.3487 5.81568 12.2602C5.48005 12.1716 5.13323 12.0278 4.77544 11.8284C4.41745 11.6293 4.12048 11.382 3.88444 11.087C3.64837 10.7918 3.45463 10.4043 3.30348 9.92487C3.15227 9.4452 3.07664 8.89188 3.07664 8.26476C3.07664 7.37182 3.36814 6.61197 3.95104 5.98476C3.67799 5.31345 3.70376 4.56088 4.02845 3.72714C4.24243 3.66066 4.55975 3.71055 4.98027 3.8765C5.40086 4.04252 5.7088 4.18475 5.90441 4.30267C6.10001 4.42055 6.25673 4.52045 6.37481 4.60146C7.06113 4.4097 7.76939 4.3138 8.49979 4.3138C9.23018 4.3138 9.9386 4.4097 10.625 4.60146L11.0455 4.33597C11.3331 4.15882 11.6727 3.99647 12.0635 3.8489C12.4546 3.7014 12.7536 3.66077 12.9603 3.72725C13.2922 4.56103 13.3218 5.31356 13.0486 5.98488C13.6315 6.61209 13.9231 7.37213 13.9231 8.26487C13.9231 8.892 13.8472 9.44707 13.6962 9.93042C13.5451 10.4138 13.3497 10.8009 13.1099 11.0925C12.8699 11.3841 12.5711 11.6294 12.2133 11.8285C11.8554 12.0278 11.5085 12.1716 11.1728 12.2602C10.8371 12.3488 10.459 12.4154 10.0385 12.4597C10.422 12.7916 10.6138 13.3155 10.6138 14.0311V16.3662C10.6138 16.4988 10.66 16.6096 10.7523 16.6981C10.8445 16.7864 10.9902 16.8124 11.1894 16.7754C12.9013 16.2074 14.2977 15.1837 15.3786 13.7043C16.4593 12.225 16.9999 10.5595 16.9999 8.70733C16.9995 7.16564 16.6193 5.74365 15.8597 4.44137Z"
			fill="white"
		/>
	</svg>
);
export type GithubSocialBtnProps = {
	count: number;
	onClick: Function;
};

export const GithubSocialBtn = ({ count, ...props }: GithubSocialBtnProps) => (
	<SocialButtonBase {...props}>
		<div className={"flex items-center"}>
			<div>
				<GithubIcon />
			</div>
			<div style={{ marginRight: "10rem" }} className={"ml-12 leading-none mt-2 font-600"}>
				Github
			</div>
		</div>
		<div style={{ color: "#88A2FF" }}>{count}</div>
	</SocialButtonBase>
);
