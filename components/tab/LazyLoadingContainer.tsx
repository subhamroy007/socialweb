import { PureComponent } from "react";
import { View } from "react-native";
import { LazyLoadingContainerProps } from "../../utility/types";

export default class LazyLoadingContainer extends PureComponent<
  LazyLoadingContainerProps,
  { hasLoaded: boolean }
> {
  state: Readonly<{ hasLoaded: boolean }> = {
    hasLoaded: this.props.preload ? this.props.preload : false,
  };
  constructor(props: LazyLoadingContainerProps) {
    super(props);
    this.load = this.load.bind(this);
  }

  load() {
    if (!this.state.hasLoaded) {
      this.setState({ hasLoaded: true });
    }
  }

  render(): React.ReactNode {
    const { width, height, children } = this.props;
    const { hasLoaded } = this.state;
    return (
      <View
        style={{
          width,
          height,
          flexWrap: "nowrap",
          justifyContent: "flex-start",
          alignItems: "stretch",
        }}
      >
        {hasLoaded && children}
      </View>
    );
  }
}
