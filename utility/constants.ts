import { Dimensions } from "react-native";

export const WINDOW_WIDTH = Dimensions.get("window").width;
export const WINDOW_HEIGHT = Dimensions.get("window").height;

//----------------------------------------size constants------------------------------------------------
export const SIZE_REF_2 = (2 / 320) * WINDOW_WIDTH;
export const SIZE_REF_4 = (4 / 320) * WINDOW_WIDTH;
export const SIZE_REF_6 = (6 / 320) * WINDOW_WIDTH;
export const SIZE_REF_8 = (8 / 320) * WINDOW_WIDTH;
export const SIZE_REF_10 = (10 / 320) * WINDOW_WIDTH;
export const SIZE_REF_12 = (12 / 320) * WINDOW_WIDTH;
export const SIZE_REF_14 = (14 / 320) * WINDOW_WIDTH;
export const SIZE_REF_16 = (16 / 320) * WINDOW_WIDTH;
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
