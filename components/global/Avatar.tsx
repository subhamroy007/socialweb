import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import { TapGestureHandler } from "react-native-gesture-handler";
import { SIZE_REF_10, SIZE_REF_2, SIZE_REF_4 } from "../../utility/constants";
import { AvatarProps, RootStackNavigatorParamList } from "../../utility/types";

//not completely type safe
type AvatarNavigatorProps = StackNavigationProp<
  RootStackNavigatorParamList,
  "Tabs"
>;

const Avatar = ({
  profilePictureUri,
  hasUnSeenStroy,
  showOutline,
  size,
  style,
}: AvatarProps) => {
  const navigation = useNavigation<AvatarNavigatorProps>();

  size = size ? size : SIZE_REF_10 * 4;

  const outlineWidth = !showOutline
    ? 0
    : hasUnSeenStroy
    ? Math.max(SIZE_REF_2, Math.min(SIZE_REF_4, size * 0.05))
    : StyleSheet.hairlineWidth;

  size = size - outlineWidth;

  return (
    <TapGestureHandler
      numberOfTaps={1}
      shouldCancelWhenOutside={true}
      onHandlerStateChange={undefined}
    >
      <View
        style={[
          style,
          styles.rootContainerStaticStyle,
          {
            width: size,
            height: size,
            padding: outlineWidth - 2 * StyleSheet.hairlineWidth,
            borderWidth: outlineWidth,
            borderColor: hasUnSeenStroy ? "#3F71F2" : "grey",
            borderRadius: (size + outlineWidth) * 0.5,
          },
        ]}
      >
        <FastImage
          source={{
            cache: "immutable",
            priority: "high",
            uri: profilePictureUri,
          }}
          style={[styles.imageStaticStyle, { borderRadius: size * 0.5 }]}
          resizeMode="cover"
        />
      </View>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  rootContainerStaticStyle: {
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
  },
  imageStaticStyle: {
    backgroundColor: "#FDFDFD",
    width: "100%",
    height: "100%",
  },
});

export default Avatar;
