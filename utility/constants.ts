import { Dimensions, Platform, PlatformColor } from "react-native";

export const WINDOW_WIDTH = Dimensions.get("window").width;
export const WINDOW_HEIGHT = Dimensions.get("window").height;

//----------------------------------------size constants------------------------------------------------
export const SIZE_REF_2 = (2 / 320) * WINDOW_WIDTH;
export const SIZE_REF_4 = (4 / 320) * WINDOW_WIDTH;
export const SIZE_REF_6 = (6 / 320) * WINDOW_WIDTH;
export const SIZE_REF_8 = (8 / 320) * WINDOW_WIDTH;
export const SIZE_REF_10 = Math.floor((10 / 320) * WINDOW_WIDTH);
export const SIZE_REF_12 = Math.floor((12 / 320) * WINDOW_WIDTH);
export const SIZE_REF_14 = Math.floor((14 / 320) * WINDOW_WIDTH);
export const SIZE_REF_16 = Math.floor((16 / 320) * WINDOW_WIDTH);
export const SIZE_REF_18 = Math.floor((18 / 320) * WINDOW_WIDTH);
export const SIZE_REF_20 = Math.floor((20 / 320) * WINDOW_WIDTH);
export const SIZE_REF_1 = (1 / 320) * WINDOW_WIDTH;

//----------------------------------------shutter constants------------------------------------------------
export const SHUTTER_TOP_RADIUS = (16 / 320) * WINDOW_WIDTH;

export const SHUTTER_TRANSLATION_ANIMATION_DURATION = 150;

export const SHUTTER_TRANSLATION_ANIMATION_VELOCITY_THRESHOLD = 0.5;

export const SHUTTER_OVERLAY_MAX_OPACITY = 0.64;

export const SHUTTER_SCROLL_EVENT_THROTTLE = 1;

export const SHUTTER_CAROSOL_ACTIVE_DOT_SIZE = 6;

export const SHUTTER_CAROSOL_NORMAL_DOT_SIZE = 4;

export const SHUTTER_HEIGHT = Math.floor(WINDOW_HEIGHT * 0.47);

export const SHUTTER_ABSOLUTE_BOTTOM_POSITION = -Math.floor(
  (SHUTTER_HEIGHT * 21) / 25
);

export const SHUTTER_TRANSLATION_Y_MIN =
  Math.floor((SHUTTER_HEIGHT * 4) / 25) - SHUTTER_HEIGHT;

export const SHUTTER_TRANSLATION_Y_MAX = 0;

export const SHUTTER_BODY_LIST_ITEM_HEIGHT =
  SHUTTER_HEIGHT * (18 / 25) * (4 / 5);

export const SHUTTER_ICON_VERTICAL_MARGIN =
  (SHUTTER_BODY_LIST_ITEM_HEIGHT - 14 * SIZE_REF_6) / 2;

export const SHUTTER_ICON_HORIZONTAL_MARGIN =
  (WINDOW_WIDTH - 28 * SIZE_REF_6) / 5;

//----------------------------------------other constants------------------------------------------------

export const TAB_INDICATOR_HEIGHT = 2;

export const THERESHOLDLENGTH = 15;

export const IMAGE_POST_MIN_HEIGHT = 150;
export const IMAGE_POST_MAX_HEIGHT = 400;

export const AVATAR_PHOTO_TO_GAP_RATIO = 2.5 / 64;

export const HEADER_HEIGHT = 0.09 * WINDOW_HEIGHT;

export const OVERLAY_SCREEN_IMAGE_MAX_WIDTH = (288 / 320) * WINDOW_WIDTH;
export const OVERLAY_SCREEN_IMAGE_MIN_WIDTH =
  OVERLAY_SCREEN_IMAGE_MAX_WIDTH * 0.5;

export const OVERLAY_SCREEN_IMAGE_MAX_HEIGHT = (360 / 533) * WINDOW_HEIGHT;
export const OVERLAY_SCREEN_IMAGE_MIN_HEIGHT =
  OVERLAY_SCREEN_IMAGE_MAX_HEIGHT * 0.5;

//----------------------------------------Generator Constants-----------------------------------------

export const USER_INFO_WITH_TIMESTAMP_PAGE_SIZE = 15;
export const IMAGE_POST_RESPONSE_PAGE_SIZE = 10;

export const MAX_SCREEN_REFRESH_TIME_INTERVAL = 30 * 1000;

export const SIZE_1 = Math.floor(WINDOW_WIDTH * 0.01);
export const SIZE_2 = Math.floor(WINDOW_WIDTH * 0.02);
export const SIZE_3 = Math.floor(WINDOW_WIDTH * 0.03);
export const SIZE_4 = Math.floor(WINDOW_WIDTH * 0.04);
export const SIZE_5 = Math.floor(WINDOW_WIDTH * 0.05);
export const SIZE_6 = Math.floor(WINDOW_WIDTH * 0.06);
export const SIZE_7 = Math.floor(WINDOW_WIDTH * 0.07);
export const SIZE_8 = Math.floor(WINDOW_WIDTH * 0.08);
export const SIZE_9 = Math.floor(WINDOW_WIDTH * 0.09);
export const SIZE_10 = Math.floor(WINDOW_WIDTH * 0.1);

export const SIZE_12 = Math.floor(WINDOW_WIDTH * 0.12);

export const SIZE_16 = Math.floor(WINDOW_WIDTH * 0.16);

export const SIZE_20 = Math.floor(WINDOW_WIDTH * 0.2);

export const SIZE_25 = Math.floor(WINDOW_WIDTH * 0.25);

export const HEIGHT_9 = Math.floor(WINDOW_HEIGHT * 0.09);

export const SOLID_COLOR_1 = "#FDFDFD";
export const SOLID_COLOR_2 = "#1F1F1F";
export const SOLID_COLOR_3 = "#D1CBCB";
export const SOLID_COLOR_4 = "black";
// Platform.OS === "android" ? "black" : PlatformColor("darkText");

export const SOLID_COLOR_5 = "white";
// Platform.OS === "android"
//   ? PlatformColor("?colorPrimary").toString()
//   : PlatformColor("lightText").toString();

export const SOLID_COLOR_6 = "grey";
// Platform.OS === "android"
//   ? PlatformColor("?colorPrimaryDark")
//   : PlatformColor("systemGray");

export const SOLID_COLOR_7 = "grey";
// Platform.OS === "android"
//   ? PlatformColor("?attr/colorControlHighlight").toString()
//   : PlatformColor("systemGray2").toString();

export const SOLID_COLOR_8 = "#3F71F2";
