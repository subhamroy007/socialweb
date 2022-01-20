import React from "react";
import { StyleSheet, View } from "react-native";
import { SIZE_REF_12, SIZE_REF_8 } from "../../utility/constants";
import NotificationStack from "./NotificationStack";

const NotificationGroup = () => {
  return (
    <View style={styles.stackGroup}>
      <NotificationStack />
      <NotificationStack style={styles.stack} />
      <NotificationStack style={styles.stack} />
    </View>
  );
};

const styles = StyleSheet.create({
  stackGroup: {
    width: "100%",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  timestampText: {
    fontSize: SIZE_REF_12,
    marginBottom: SIZE_REF_8,
  },
  stack: {
    marginTop: SIZE_REF_8,
  },
});

export default NotificationGroup;
