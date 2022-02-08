import { Platform, PlatformColor, StyleSheet } from "react-native";
import {
  HEADER_HEIGHT,
  HEIGHT_9,
  SIZE_1,
  SIZE_2,
  SIZE_3,
  SIZE_4,
  SIZE_5,
  SIZE_6,
  SIZE_7,
  SIZE_REF_1,
  SIZE_REF_10,
  SIZE_REF_12,
  SIZE_REF_14,
  SIZE_REF_16,
  SIZE_REF_18,
  SIZE_REF_2,
  SIZE_REF_20,
  SIZE_REF_4,
  SIZE_REF_6,
  SIZE_REF_8,
  SOLID_COLOR_1,
  SOLID_COLOR_2,
  SOLID_COLOR_3,
  SOLID_COLOR_4,
  SOLID_COLOR_5,
  SOLID_COLOR_6,
  SOLID_COLOR_7,
  SOLID_COLOR_8,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from "./constants";

const APP_STYLE = StyleSheet.create({
  FLEX_NOWRAP: {
    flexWrap: "nowrap",
  },
  FLEX_ROW: {
    flexDirection: "row",
  },
  FLEX_JUSTIFY_SPACE_BETWEEN: {
    justifyContent: "space-between",
  },
  FLEX_JUSTIFY_CENTER: {
    justifyContent: "center",
  },
  FLEX_JUSTIFY_START: {
    justifyContent: "flex-start",
  },
  FLEX_JUSTIFY_END: {
    justifyContent: "flex-end",
  },
  FLEX_ALIGN_ITEM_CENTER: {
    alignItems: "center",
  },
  FLEX_ALIGN_ITEM_START: {
    alignItems: "flex-start",
  },
  FLEX_ALIGN_ITEM_END: {
    alignItems: "flex-end",
  },
  FLEX_1: {
    flex: 1,
  },
  WIDTH_ABSOLUTE_100: {
    width: WINDOW_WIDTH,
  },
  WIDTH_RELATIVE_100: {
    width: "100%",
  },
  HEIGHT_ABSOLUTE_100: {
    height: WINDOW_HEIGHT,
  },
  HEIGHT_RELATIVE_100: {
    height: "100%",
  },
  HEIGHT_ABSOLUTE_9: {
    height: HEIGHT_9,
  },
  HEIGHT_RELATIVE_9: {
    height: "9%",
  },
  HEIGHT_RELATIVE_33: {
    height: "33%",
  },
  BAR_HEIGHT: {
    height: SIZE_REF_2,
  },
  LINE_BORDER: {
    borderWidth: SIZE_REF_1,
  },
  LINE_PADDING_RIGHT: {
    paddingRight: SIZE_REF_1,
  },
  LINE_PADDING_BOTTOM: {
    paddingBottom: SIZE_REF_1,
  },
  THUMBNAIL_HEIGHT: {
    height: Math.floor(WINDOW_HEIGHT / 3),
  },
  IMAGE_GALLERY_ITEM_HEIGHT: {
    height: Math.floor(WINDOW_WIDTH / 3),
  },
  IMAGE_GALLERY_ITEM_WIDTH: {
    width: Math.floor(WINDOW_WIDTH / 3),
  },
  TEXT_PRIMARY_DARK_COLOR: {
    color: SOLID_COLOR_4,
  },
  TEXT_PRIMARY_LIGHT_COLOR: {
    color: SOLID_COLOR_5,
  },
  TEXT_SECONDARY_COLOR: {
    color: SOLID_COLOR_6,
  },
  BACKGROUND_PRIMARY_LIGHT_COLOR: {
    backgroundColor: SOLID_COLOR_1,
  },
  BACKGROUND_SECONDARY_LIGHT_COLOR: {
    backgroundColor: SOLID_COLOR_7,
  },
  BACKGROUND_PRIMARY_DARK_COLOR: {
    backgroundColor: SOLID_COLOR_2,
  },
  SOLID_BACKGROUND_COLOR_1: {
    backgroundColor: SOLID_COLOR_8,
  },
  BORDER_COLOR: {
    borderColor: SOLID_COLOR_3,
  },
  TEXT_SIZE_1: {
    fontSize: SIZE_REF_10,
  },
  TEXT_SIZE_2: {
    fontSize: SIZE_REF_12,
  },
  TEXT_SIZE_3: {
    fontSize: SIZE_REF_14,
  },
  TEXT_SIZE_4: {
    fontSize: SIZE_REF_16,
  },
  TEXT_SIZE_5: {
    fontSize: SIZE_REF_18,
  },
  TEXT_SIZE_6: {
    fontSize: SIZE_REF_20,
  },
  LINE_HEIGHT_1: {
    lineHeight: SIZE_REF_10,
  },
  LINE_HEIGHT_2: {
    lineHeight: SIZE_REF_12,
  },
  LINE_HEIGHT_3: {
    lineHeight: SIZE_REF_14,
  },
  LINE_HEIGHT_4: {
    lineHeight: SIZE_REF_16,
  },
  LINE_HEIGHT_5: {
    lineHeight: SIZE_REF_18,
  },
  LINE_HEIGHT_6: {
    lineHeight: SIZE_REF_20,
  },
  MARGIN_LEFT_1: {
    marginLeft: SIZE_REF_4,
  },
  MARGIN_LEFT_2: {
    marginLeft: SIZE_REF_6,
  },
  MARGIN_LEFT_3: {
    marginLeft: SIZE_REF_8,
  },
  MARGIN_LEFT_4: {
    marginLeft: SIZE_REF_10,
  },
  MARGIN_LEFT_5: {
    marginLeft: SIZE_REF_12,
  },
  MARGIN_LEFT_6: {
    marginLeft: SIZE_REF_14,
  },
  MARGIN_LEFT_7: {
    marginLeft: SIZE_REF_16,
  },
  MARGIN_LEFT_8: {
    marginLeft: SIZE_REF_18,
  },
  MARGIN_RIGHT_1: {
    marginRight: SIZE_REF_4,
  },
  MARGIN_RIGHT_2: {
    marginRight: SIZE_REF_6,
  },
  MARGIN_RIGHT_3: {
    marginRight: SIZE_REF_8,
  },
  MARGIN_RIGHT_4: {
    marginRight: SIZE_REF_10,
  },
  MARGIN_RIGHT_5: {
    marginRight: SIZE_REF_12,
  },
  MARGIN_RIGHT_6: {
    marginRight: SIZE_REF_14,
  },
  MARGIN_RIGHT_7: {
    marginRight: SIZE_REF_16,
  },
  MARGIN_RIGHT_8: {
    marginRight: SIZE_REF_18,
  },
  MARGIN_BOTTOM_1: {
    marginBottom: SIZE_REF_4,
  },
  MARGIN_BOTTOM_2: {
    marginBottom: SIZE_REF_6,
  },
  MARGIN_BOTTOM_3: {
    marginBottom: SIZE_REF_8,
  },
  MARGIN_BOTTOM_4: {
    marginBottom: SIZE_REF_10,
  },
  MARGIN_BOTTOM_5: {
    marginBottom: SIZE_REF_12,
  },
  MARGIN_BOTTOM_6: {
    marginBottom: SIZE_REF_14,
  },
  MARGIN_BOTTOM_7: {
    marginBottom: SIZE_REF_16,
  },
  MARGIN_BOTTOM_8: {
    marginBottom: SIZE_REF_18,
  },
  MARGIN_TOP_1: {
    marginTop: SIZE_REF_4,
  },
  MARGIN_TOP_2: {
    marginTop: SIZE_REF_6,
  },
  MARGIN_TOP_3: {
    marginTop: SIZE_REF_8,
  },
  MARGIN_TOP_4: {
    marginTop: SIZE_REF_10,
  },
  MARGIN_TOP_5: {
    marginTop: SIZE_REF_12,
  },
  MARGIN_TOP_6: {
    marginTop: SIZE_REF_14,
  },
  MARGIN_TOP_7: {
    marginTop: SIZE_REF_16,
  },
  MARGIN_TOP_8: {
    marginTop: SIZE_REF_18,
  },
  MARGIN_1: {
    margin: SIZE_REF_4,
  },
  MARGIN_2: {
    margin: SIZE_REF_6,
  },
  MARGIN_3: {
    margin: SIZE_REF_8,
  },
  MARGIN_4: {
    margin: SIZE_REF_10,
  },
  MARGIN_5: {
    margin: SIZE_REF_12,
  },
  MARGIN_6: {
    margin: SIZE_REF_14,
  },
  MARGIN_7: {
    margin: SIZE_REF_16,
  },
  MARGIN_8: {
    margin: SIZE_REF_18,
  },
  PADDING_LEFT_1: {
    paddingLeft: SIZE_REF_4,
  },
  PADDING_LEFT_2: {
    paddingLeft: SIZE_REF_6,
  },
  PADDING_LEFT_3: {
    paddingLeft: SIZE_REF_8,
  },
  PADDING_LEFT_4: {
    paddingLeft: SIZE_REF_10,
  },
  PADDING_LEFT_5: {
    paddingLeft: SIZE_REF_12,
  },
  PADDING_LEFT_6: {
    paddingLeft: SIZE_REF_14,
  },
  PADDING_LEFT_7: {
    paddingLeft: SIZE_REF_16,
  },
  PADDING_LEFT_8: {
    paddingLeft: SIZE_REF_18,
  },
  PADDING_RIGHT_1: {
    paddingRight: SIZE_REF_4,
  },
  PADDING_RIGHT_2: {
    paddingRight: SIZE_REF_6,
  },
  PADDING_RIGHT_3: {
    paddingRight: SIZE_REF_8,
  },
  PADDING_RIGHT_4: {
    paddingRight: SIZE_REF_10,
  },
  PADDING_RIGHT_5: {
    paddingRight: SIZE_REF_12,
  },
  PADDING_RIGHT_6: {
    paddingRight: SIZE_REF_14,
  },
  PADDING_RIGHT_7: {
    paddingRight: SIZE_REF_16,
  },
  PADDING_RIGHT_8: {
    paddingRight: SIZE_REF_18,
  },
  PADDING_BOTTOM_1: {
    paddingBottom: SIZE_REF_4,
  },
  PADDING_BOTTOM_2: {
    paddingBottom: SIZE_REF_6,
  },
  PADDING_BOTTOM_3: {
    paddingBottom: SIZE_REF_8,
  },
  PADDING_BOTTOM_4: {
    paddingBottom: SIZE_REF_10,
  },
  PADDING_BOTTOM_5: {
    paddingBottom: SIZE_REF_12,
  },
  PADDING_BOTTOM_6: {
    paddingBottom: SIZE_REF_14,
  },
  PADDING_BOTTOM_7: {
    paddingBottom: SIZE_REF_16,
  },
  PADDING_BOTTOM_8: {
    paddingBottom: SIZE_REF_18,
  },
  PADDING_TOP_1: {
    paddingTop: SIZE_REF_4,
  },
  PADDING_TOP_2: {
    paddingTop: SIZE_REF_6,
  },
  PADDING_TOP_3: {
    paddingTop: SIZE_REF_8,
  },
  PADDING_TOP_4: {
    paddingTop: SIZE_REF_10,
  },
  PADDING_TOP_5: {
    paddingTop: SIZE_REF_12,
  },
  PADDING_TOP_6: {
    paddingTop: SIZE_REF_14,
  },
  PADDING_TOP_7: {
    paddingTop: SIZE_REF_16,
  },
  PADDING_TOP_8: {
    paddingTop: SIZE_REF_18,
  },
  PADDING_1: {
    padding: SIZE_REF_4,
  },
  PADDING_2: {
    padding: SIZE_REF_6,
  },
  PADDING_3: {
    padding: SIZE_REF_8,
  },
  PADDING_4: {
    padding: SIZE_REF_10,
  },
  PADDING_5: {
    padding: SIZE_REF_12,
  },
  PADDING_6: {
    padding: SIZE_REF_14,
  },
  PADDING_7: {
    padding: SIZE_REF_16,
  },
  PADDING_8: {
    padding: SIZE_REF_18,
  },
  POSITION_ABSOLUTE: {
    position: "absolute",
  },
  BORDER_RADIUS_1: {
    borderRadius: SIZE_REF_4,
  },
  BORDER_RADIUS_2: {
    borderRadius: SIZE_REF_6,
  },
  BORDER_RADIUS_3: {
    borderRadius: SIZE_REF_8,
  },
  BORDER_RADIUS_4: {
    borderRadius: SIZE_REF_10,
  },
  BORDER_RADIUS_5: {
    borderRadius: SIZE_REF_12,
  },
});

export default APP_STYLE;

export const globalColors = StyleSheet.create({
  defaultViewColor: {
    borderTopColor: "#D1CBCB",
    backgroundColor: "#FDFDFD",
  },
  defaultTextColor: {
    color: "#1D1B1B",
  },
  screenColor: {
    backgroundColor: "#FDFDFD",
  },
  shutterHeaderColor: {
    backgroundColor: "#FDFDFD",
    borderTopColor: "#D1CBCB",
  },
  shutterColor: {
    backgroundColor: "#FDFDFD",
  },
  shutterFooterColor: {
    borderTopColor: "#D1CBCB",
    backgroundColor: "#FDFDFD",
  },
  shutterBodyColor: {
    borderTopColor: "#D1CBCB",
    backgroundColor: "#FDFDFD",
  },
  shutterOverlayColor: {
    backgroundColor: "black",
  },
  avatarColor: {
    backgroundColor: "#FDFDFD",
  },
  avatarContainerColor: {
    borderColor: "#D1CBCB",
  },
  headerColor: {
    backgroundColor: "#FDFDFD",
    borderBottomColor: "#D1CBCB",
  },
});

export const globalLayouts = StyleSheet.create({
  screenLayout: {
    flex: 1,
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  headerLayout: {
    width: WINDOW_WIDTH,
    height: HEADER_HEIGHT,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SIZE_REF_8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
