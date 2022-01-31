import { Component, createRef, RefObject } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { shallowEqual } from "react-redux";
import { WINDOW_WIDTH } from "../../utility/constants";
import { TabListProps } from "../../utility/types";

export default class TabList extends Component<TabListProps> {
  listRef: RefObject<ScrollView> = createRef<ScrollView>();
  currentIndex: number = this.props.focusedIndex ? this.props.focusedIndex : 0;
  constructor(props: TabListProps) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
  }

  shouldComponentUpdate(nextProps: TabListProps) {
    return !shallowEqual(this.props, nextProps);
  }

  componentDidMount() {
    if (this.listRef.current) {
      this.listRef.current.scrollTo({
        x: this.currentIndex * WINDOW_WIDTH,
        animated: false,
      });
    }
    if (this.props.onIndexChange) {
      this.props.onIndexChange(this.currentIndex);
    }
  }

  onScroll({
    nativeEvent: {
      contentOffset: { x },
    },
  }: NativeSyntheticEvent<NativeScrollEvent>) {
    const index = Math.round(x / WINDOW_WIDTH);
    if (this.currentIndex !== index) {
      this.currentIndex = index;
      if (this.props.onIndexChange) {
        this.props.onIndexChange(this.currentIndex);
      }
    }
  }

  render(): React.ReactNode {
    const { tabNames, height, width, children, focusedIndex } = this.props;
    return (
      <ScrollView
        ref={this.listRef}
        style={{ width, height }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        pagingEnabled={true}
        removeClippedSubviews={true}
        onScroll={this.onScroll}
      >
        {tabNames.map((item, index) => children(item, index, width, height))}
      </ScrollView>
    );
  }
}
