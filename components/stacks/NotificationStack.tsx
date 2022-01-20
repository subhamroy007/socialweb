import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { MediumText, RegularText } from "../../utility/ui";
import RoundedIcon from "../global/RoundedIcon";

export interface NotificationStackProps {
  style?: StyleProp<ViewStyle>;
}

const NotificationStack = ({ style }: NotificationStackProps) => {
  return (
    <View style={[styles.stack, style]}>
      <View style={[styles.leftContainer]}>
        <RoundedIcon color="black" name="heart-solid" size={32} />
        <RegularText
          style={[styles.notificationText]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          <MediumText>akshay_kumar</MediumText> started following you
        </RegularText>
      </View>
      <RegularText style={[styles.timestampText]}>5 mins ago</RegularText>
    </View>
  );
};

const styles = StyleSheet.create({
  stack: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  notificationText: {
    fontSize: 12,
    marginLeft: 4,
    flex: 1,
  },
  timestampText: {
    fontSize: 10,
    marginLeft: 4,
  },
});

export default NotificationStack;
