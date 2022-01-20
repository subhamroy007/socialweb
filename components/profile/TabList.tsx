import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { WINDOW_WIDTH } from "../../utility/constants";
import TabItemContainer from "./TabItemContainer";

export interface TabListProps {
  children: ReactElement<any>[];
  width?: number;
  onScroll?: (offsetX: number) => void;
  onIndexLoad?: (index: number) => void;
  onFocusChange?: (ibdex: number) => void;
}

const TabList = ({
  children,
  width,
  onIndexLoad,
  onScroll,
  onFocusChange,
}: TabListProps) => {
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [loadedIndex, setLoadedIndex] = useState<number>(0);

  const [heightMap, setHeightMap] = useState<{ [key: number]: number }>({});

  const tabItemListDynamicStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      width: width ? width : WINDOW_WIDTH,
      height: heightMap[focusedIndex],
    }),
    [width, heightMap, focusedIndex]
  );

  const swipeHandlerCallback = useCallback(
    ({
      nativeEvent: {
        contentOffset: { x },
      },
    }: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (onScroll) {
        onScroll(x);
      }

      const index = Math.round(x / WINDOW_WIDTH);
      if (loadedIndex < index) {
        setLoadedIndex(index);
      }
      if (focusedIndex !== index) {
        setFocusedIndex(index);
      }
    },
    [loadedIndex, focusedIndex]
  );

  useEffect(() => {
    if (onFocusChange) {
      onFocusChange(focusedIndex);
    }
  }, [focusedIndex, onFocusChange]);

  useEffect(() => {
    if (onIndexLoad) {
      onIndexLoad(loadedIndex);
    }
  }, [loadedIndex, onIndexLoad]);

  const tabListItemHeightChangeCallback = useCallback(
    (height: number, index: number) => {
      console.log("index " + index + " heigth " + height);
      setHeightMap((prevState) => ({ ...prevState, [index]: height }));
    },
    []
  );

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={tabItemListDynamicStyle}
      pagingEnabled={true}
      onScroll={swipeHandlerCallback}
    >
      {children.map((item, index) => (
        <TabItemContainer
          width={width}
          key={"item@" + index}
          onHeightChange={(height) =>
            tabListItemHeightChangeCallback(height, index)
          }
        >
          {index <= loadedIndex && children[index]}
        </TabItemContainer>
      ))}
    </ScrollView>
  );
};

export default TabList;
