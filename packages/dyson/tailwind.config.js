// const { FUNDAMENTAL_COLORS } = require("./src/constant/color");
// const { PADDING_SIZES, MARGIN_SIZES } = require("./src/constant/layout");
// const { FONTS, FONT_WEIGHT_VALUE, LINE_HEIGHT_VALUE, FONT_SIZES } = require("./src/constant/fonts");

module.exports = {
  important: false,
  theme: {
    screens: {},
    fontFamily: {
      heading: ["Cera Pro", "sans-serif"],
      content: ["Gilroy", "sans-serif"],
    },
    // colors: FUNDAMENTAL_COLORS,
    // backgroundColor: FUNDAMENTAL_COLORS,
    // borderColor: FUNDAMENTAL_COLORS,
    // fontSize: FONT_SIZES,
    // fontWeight: FONT_WEIGHT_VALUE,
    // extend: {
    // 	gridColumnStart: 0,
    // 	gridColumnEnd: 1,
    // 	margin: MARGIN_SIZES,
    // 	padding: PADDING_SIZES,
    // 	lineHeight: MARGIN_SIZES, // Change it line height later on
    // },
    objectPosition: {},
    order: {},
  },
  variants: {
    accessibility: ["focus"],
    alignContent: [],
    alignItems: [],
    alignSelf: [],
    appearance: [],
    backgroundAttachment: [],
    backgroundColor: ["hover", "focus"],
    backgroundPosition: [],
    backgroundRepeat: [],
    backgroundSize: [],
    borderCollapse: [],
    borderColor: ["hover", "focus"],
    borderRadius: [],
    borderStyle: [],
    borderWidth: {
      0: "0px;",
    },
    boxShadow: ["hover", "focus"],
    cursor: [],
    display: [],
    fill: [],
    flex: [],
    flexDirection: [],
    flexGrow: [],
    flexShrink: [],
    flexWrap: [],
    float: [],
    fontFamily: [],
    fontSize: [],
    fontSmoothing: [],
    fontStyle: [],
    fontWeight: ["hover", "focus"],
    height: [],
    inset: [],
    justifyContent: [],
    letterSpacing: [],
    lineHeight: [],
    listStylePosition: [],
    listStyleType: [],
    margin: [],
    maxHeight: [],
    maxWidth: [],
    minHeight: [],
    minWidth: [],
    objectFit: [],
    objectPosition: [],
    opacity: ["hover", "focus"],
    order: [],
    outline: ["focus"],
    overflow: [],
    padding: [],
    placeholderColor: ["focus"],
    pointerEvents: [],
    position: [],
    resize: [],
    stroke: [],
    tableLayout: [],
    textAlign: [],
    textColor: ["hover", "focus"],
    textDecoration: ["hover", "focus"],
    textTransform: [],
    userSelect: [],
    verticalAlign: [],
    visibility: [],
    whitespace: [],
    width: [],
    wordBreak: [],
    zIndex: [],
  },
  corePlugins: {
    float: false,
    translate: false,
    gradientColorStops: false,
    skew: false,
    scale: false,
    // gridAutoFlow: false,
    // gridColumn: false,
    // gridColumnEnd: false,
    // gridColumnStart: false,
    // gridRow: false,
    // gridAutoColumns: false,
    // gridRowEnd: false,
    // gridRowStart: false,
    // gridTemplateColumns: false,
    // gridTemplateRows: false,
  },
  plugins: [],
};