import { PureComponent, ReactNode } from "react";
import { LayoutChangeEvent, View } from "react-native";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";
import { BoxUtil } from "../../utility/types";

export interface ListItemProps {
  node: ReactNode;
  animationStartDelay?: number;
  animationEndDelay?: number;
  animationStartDuration?: number;
  animationEndDuration?: number;
  hasEnteringAnimation?: boolean;
  hasExitingAnimation?: boolean;
  hasLayoutAnimation?: boolean;
  layoutTransitionDelay?: number;
  layoutTransitionDuration?: number;
}

export default class ListItem extends PureComponent<
  ListItemProps,
  { isVisible: boolean }
> {
  state: Readonly<{ isVisible: boolean }> = { isVisible: true };
  layout: BoxUtil = { height: 0, width: 0 };
  constructor(props: ListItemProps) {
    super(props);
    this.onLayout = this.onLayout.bind(this);
    this.setVisibility = this.setVisibility.bind(this);
  }

  setVisibility(isVisible: boolean) {
    this.setState({ isVisible });
  }

  onLayout({
    nativeEvent: {
      layout: { height, width },
    },
  }: LayoutChangeEvent) {
    this.layout.height = height;
    this.layout.width = width;
  }

  render(): ReactNode {
    const {
      node,
      animationEndDelay,
      animationEndDuration,
      animationStartDelay,
      animationStartDuration,
      hasEnteringAnimation,
      hasExitingAnimation,
      hasLayoutAnimation,
      layoutTransitionDelay,
      layoutTransitionDuration,
    } = this.props;

    const { isVisible } = this.state;

    const { height, width } = this.layout;
    return (
      <Animated.View
        entering={
          hasEnteringAnimation
            ? FadeIn.delay(
                animationStartDelay ? animationStartDelay : 0
              ).duration(animationStartDuration ? animationStartDuration : 0)
            : undefined
        }
        exiting={
          hasExitingAnimation
            ? FadeOut.delay(animationEndDelay ? animationEndDelay : 0).duration(
                animationEndDuration ? animationEndDuration : 0
              )
            : undefined
        }
        layout={
          hasLayoutAnimation
            ? Layout.delay(
                layoutTransitionDelay ? layoutTransitionDelay : 0
              ).duration(
                layoutTransitionDuration ? layoutTransitionDuration : 0
              )
            : undefined
        }
        onLayout={this.onLayout}
      >
        {isVisible ? node : <View style={{ width, height }}></View>}
      </Animated.View>
    );
  }
}
