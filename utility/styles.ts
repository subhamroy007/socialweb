import { StyleSheet } from "react-native";
import { HEADER_HEIGHT, SIZE_REF_8, WINDOW_WIDTH } from "./constants";

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
    display: "flex",
    flexDirection: "column",
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
