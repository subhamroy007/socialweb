import React, { useCallback, useMemo } from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import Animated, { Easing, FadeInLeft } from "react-native-reanimated";
import { shallowEqual } from "react-redux";
import { switchSelectedKeyWordSuggestion } from "../../store/appData/slice";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../store/appStore";
import { selectHashTagName } from "../../store/hashTag/selector";
import { SIZE_REF_12, SIZE_REF_14 } from "../../utility/constants";
import { HighlightedItemProps, Id, PostType } from "../../utility/types";
import { MediumText } from "../../utility/ui";

const HighlightedItem = ({
  text,
  onTap,
  size,
  style,
  type,
  backgroundColor,
  borderColor,
  color,
}: HighlightedItemProps) => {
  const calculatedSize = size ? size : SIZE_REF_12;

  const calculatedBackGroundColor = backgroundColor
    ? backgroundColor
    : "#EBE8FB";

  const calculatedBorderColor = borderColor ? borderColor : "#D1CBCB";

  const calculatedColor = color ? color : "black";

  const rootContainerDynamicStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      style,
      styles.rootContainerStaticStyle,
      {
        borderRadius: calculatedSize,
        paddingVertical: calculatedSize * 0.47,
        paddingHorizontal: calculatedSize * 0.47,
        borderColor: type === "outline" ? calculatedBorderColor : undefined,
        backgroundColor:
          type === "solid" ? calculatedBackGroundColor : "transparent",
        borderWidth: type === "outline" ? 1 : undefined,
      },
    ],
    [calculatedSize, calculatedBackGroundColor, calculatedBorderColor]
  );

  const textDynamicStyle = useMemo<StyleProp<TextStyle>>(
    () => ({
      fontSize: calculatedSize,
      lineHeight: calculatedSize,
      color: calculatedColor,
    }),
    [calculatedSize, calculatedColor]
  );

  return (
    // <Animated.View
    //   entering={FadeInLeft.duration(200).easing(Easing.in(Easing.quad))}
    // >
    <View style={rootContainerDynamicStyle}>
      <MediumText style={textDynamicStyle} onPress={onTap}>
        {text}
      </MediumText>
    </View>
    // </Animated.View>
  );
};

export const HashTag = React.memo<Id>(({ id }) => {
  const nameSelectorCallback = useCallback(
    (state: RootState) => {
      return selectHashTagName(state, id);
    },
    [id]
  );

  const name = useAppSelector(nameSelectorCallback);

  const tapHandler = useCallback(() => {
    console.log("hashtag name is " + name);
  }, []);

  return <HighlightedItem type="solid" text={"#" + name} onTap={tapHandler} />;
}, shallowEqual);

export const KeyWord = React.memo<{
  keyword: string;
  postType: PostType;
  focused: boolean;
}>(({ keyword, postType, focused }) => {
  const dispatch = useAppDispatch();

  const tapHandler = useCallback(() => {
    dispatch(switchSelectedKeyWordSuggestion(keyword, postType));
  }, [keyword, postType]);

  return !focused ? (
    <HighlightedItem
      text={keyword}
      size={SIZE_REF_14}
      type="outline"
      onTap={tapHandler}
    />
  ) : (
    <HighlightedItem text={keyword} size={SIZE_REF_14} type="solid" />
  );
});

const styles = StyleSheet.create({
  rootContainerStaticStyle: {
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HighlightedItem;
