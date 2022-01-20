import React, { useMemo } from "react";
import { TextProps, View } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import { SIZE_REF_8 } from "../../utility/constants";
import { IconProps } from "../../utility/types";
import { CustomIcon } from "../../utility/ui";

const Icon = ({ name, color, onTap, size, style }: IconProps) => {
  const calculatedSize = size ? size : SIZE_REF_8 * 3;
  const calculatedColor = color ? color : "black";

  //combine the default properties and passed on properties for the target icon
  const iconDefaultProps = useMemo<TextProps>(
    () => ({
      allowFontScaling: true,
      maxFontSizeMultiplier: 2.0,
      minimumFontScale: 0.5,
    }),
    []
  );

  return (
    <TapGestureHandler
      enabled={onTap ? true : false}
      onHandlerStateChange={onTap}
      shouldCancelWhenOutside={true}
      numberOfTaps={1}
    >
      <View style={style}>
        <CustomIcon
          name={name}
          size={calculatedSize}
          color={calculatedColor}
          {...iconDefaultProps}
        />
      </View>
    </TapGestureHandler>
  );
};

export default Icon;
