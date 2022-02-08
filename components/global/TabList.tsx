import { useCallback, useEffect, useRef, useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { WINDOW_WIDTH } from "../../utility/constants";
import { TabListProps } from "../../utility/types";

const TabList = ({
  children,
  height,
  tabNames,
  width,
  focusedIndex,
  onIndexChange,
  onScrollCallback,
}: TabListProps) => {
  const listRef = useRef<ScrollView>(null);
  const currentIndex = useRef<number>(focusedIndex ? focusedIndex : 0);
  const [loadedIndices, setLoadedIndices] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({
        x: currentIndex.current * WINDOW_WIDTH,
        animated: false,
      });
    }
    if (!loadedIndices[currentIndex.current]) {
      setLoadedIndices((state) => ({ ...state, [currentIndex.current]: true }));
    }
    if (onIndexChange) {
      onIndexChange(currentIndex.current);
    }
  }, [onIndexChange, setLoadedIndices, loadedIndices]);

  const onScroll = useCallback(
    ({
      nativeEvent: {
        contentOffset: { x },
      },
    }: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(x / WINDOW_WIDTH);
      if (onScrollCallback) {
        onScrollCallback(x);
      }
      if (currentIndex.current !== index) {
        currentIndex.current = index;

        if (!loadedIndices[currentIndex.current]) {
          setLoadedIndices((state) => ({
            ...state,
            [currentIndex.current]: true,
          }));
        }

        if (onIndexChange) {
          onIndexChange(currentIndex.current);
        }
      }
    },
    [loadedIndices, setLoadedIndices, onIndexChange]
  );

  return (
    <ScrollView
      ref={listRef}
      style={{ width, height }}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      pagingEnabled={true}
      removeClippedSubviews={true}
      onScroll={onScroll}
    >
      {tabNames.map((item, index) => {
        return (
          <View
            style={{
              width,
              height,
              alignItems: "stretch",
              justifyContent: "flex-start",
              flexWrap: "nowrap",
            }}
            key={item + "-" + index}
          >
            {true && children(item, index, width, height)}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default TabList;
