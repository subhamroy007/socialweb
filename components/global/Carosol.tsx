import React, { useMemo } from "react";
import { Animated, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WINDOW_WIDTH } from "../../utility/constants";
import { CarosolProps } from "../../utility/types";
import { AnimatedSafeAreaView } from "../../utility/ui";

const Carosol = ({
  activeDotSize,
  noOfItems,
  normalDotSize,
  scrollReference,
}: CarosolProps) => {
  //a dummy list to iterate and render the dots
  const dummyList = useMemo(() => {
    const list = [];
    for (let i = 0; i < noOfItems; i++) {
      list.push(i);
    }
    return list;
  }, [noOfItems]);

  //carosol container width calculated as 3 times with of the total number of dots combined
  const carosolDynamicStyle: StyleProp<ViewStyle> = useMemo(
    () => ({
      width: noOfItems * normalDotSize * 3,
    }),
    [noOfItems, normalDotSize]
  );

  return (
    <SafeAreaView edges={[]} style={[styles.carosol, carosolDynamicStyle]}>
      {dummyList.map((_, index) => {
        //check the current dot size based on the scroll index
        const size = scrollReference.interpolate({
          inputRange: [
            WINDOW_WIDTH * (index - 1),
            WINDOW_WIDTH * index,
            WINDOW_WIDTH * (index + 1),
          ],
          outputRange: [normalDotSize, activeDotSize, normalDotSize],
          extrapolate: "clamp",
        });

        return (
          <AnimatedSafeAreaView
            edges={[]}
            style={[
              {
                width: size,
                height: size,
                borderRadius: Animated.divide(size, 2),
                backgroundColor: "black",
              },
            ]}
            key={index}
          ></AnimatedSafeAreaView>
        );
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  carosol: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export default Carosol;
