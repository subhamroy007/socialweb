import { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { SIZE_REF_14, SIZE_REF_2, SIZE_REF_4 } from "../../utility/constants";
import { RegularText } from "../../utility/ui";

export interface InfoProps {
  picture: ReactNode;
  pictureGapSize?: number;
  secondaryText?: string;
  secondaryTextSize?: number;
  secondaryTextColor?: string;
  children: (size: number, color: string) => ReactNode;
  textSize?: number;
  textColor?: string;
  textGapSize?: number;
  style?: StyleProp<ViewStyle>;
}

const Info = ({
  children,
  picture,
  pictureGapSize,
  secondaryText,
  secondaryTextColor,
  secondaryTextSize,
  style,
  textGapSize,
  textColor,
  textSize,
}: InfoProps) => {
  textSize = textSize ? textSize : SIZE_REF_14;
  textColor = textColor ? textColor : "black";
  textGapSize = textGapSize ? textGapSize : SIZE_REF_4;
  secondaryTextSize = secondaryTextSize
    ? secondaryTextSize
    : textSize - SIZE_REF_2;
  secondaryTextColor = secondaryTextColor ? secondaryTextColor : "grey";
  pictureGapSize = pictureGapSize ? pictureGapSize : SIZE_REF_4;

  return (
    <View style={[style, styles.rootContainerStaticStyle]}>
      {picture}
      <View
        style={[
          styles.textContainerStaticStyle,
          { marginLeft: pictureGapSize },
        ]}
      >
        {children(textSize, textColor)}
        {secondaryText && (
          <RegularText
            style={[
              {
                fontSize: secondaryTextSize,
                lineHeight: secondaryTextSize,
                color: secondaryTextColor,
                marginTop: textGapSize,
              },
            ]}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {secondaryText}
          </RegularText>
        )}
      </View>
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
  rootContainerStaticStyle: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  textContainerStaticStyle: {
    flexWrap: "nowrap",
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
  },
});
