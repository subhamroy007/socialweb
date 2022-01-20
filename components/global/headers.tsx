import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { StackHeaderProps } from "@react-navigation/stack";
import React, { ReactElement, useCallback } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { selectTrendingScreenFocus } from "../../store/appData/selector";
import { useAppSelector } from "../../store/appStore";
import {
  SIZE_REF_10,
  SIZE_REF_12,
  SIZE_REF_4,
  SIZE_REF_6,
  SIZE_REF_8,
} from "../../utility/constants";
import { globalColors, globalLayouts } from "../../utility/styles";
import { MediumText } from "../../utility/ui";
import Icon from "./Icon";
import RoundedIcon from "./RoundedIcon";

export interface HeaderWrapperProps {
  children: ReactElement<any> | ReactElement<any>[];
  style?: StyleProp<ViewStyle>;
}

const HeaderWrapper = ({ children, style }: HeaderWrapperProps) => {
  return (
    <SafeAreaView
      edges={["left", "right", "top"]}
      style={[globalColors.headerColor, globalLayouts.headerLayout, style]}
    >
      {children}
    </SafeAreaView>
  );
};

export const ProfileScreenHeader = (props: BottomTabHeaderProps) => {
  return (
    <HeaderWrapper>
      <View style={styles.headerLeft}>
        <Icon name="user-outline" color="black" size={SIZE_REF_12 * 2} />
        <MediumText
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.headerText}
        >
          roybond007
        </MediumText>
      </View>
      <Icon name="more-solid" color="black" size={SIZE_REF_12 * 2} />
    </HeaderWrapper>
  );
};

export const OtherUserProfileScreenHeader = (props: StackHeaderProps) => {
  return (
    <HeaderWrapper>
      <View style={styles.headerLeft}>
        <Icon name="chevron-left" color="black" size={SIZE_REF_12 * 2} />
        <MediumText
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.headerText}
        >
          roybond007
        </MediumText>
      </View>
      <Icon name="more-solid" color="black" size={SIZE_REF_12 * 2} />
    </HeaderWrapper>
  );
};

export const HashtagInfoScreenHeader = (props: BottomTabHeaderProps) => {
  return (
    <HeaderWrapper>
      <View style={styles.headerLeft}>
        <Icon name="chevron-left" color="black" size={SIZE_REF_12 * 2} />
        <MediumText
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.headerText}
        >
          #bollywoodbuff
        </MediumText>
      </View>
      <Icon name="more-solid" color="black" size={SIZE_REF_12 * 2} />
    </HeaderWrapper>
  );
};

export const VideoFeedScreenHeader = (props: BottomTabHeaderProps) => {
  return (
    <HeaderWrapper>
      <View style={styles.headerLeft}>
        <Icon name="video-outline" color="black" size={SIZE_REF_12 * 2} />
        <MediumText
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.headerText}
        >
          Videos
        </MediumText>
      </View>
      <Icon name="search-bold" color="black" size={SIZE_REF_12 * 2} />
    </HeaderWrapper>
  );
};

export const SavedScreenHeader = (props: BottomTabHeaderProps) => {
  return (
    <HeaderWrapper>
      <View style={styles.headerLeft}>
        <Icon name="bookmark-outline" color="black" size={SIZE_REF_12 * 2} />
        <MediumText
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.headerText}
        >
          Bookmarked
        </MediumText>
      </View>
      <Icon name="search-bold" color="black" size={SIZE_REF_12 * 2} />
    </HeaderWrapper>
  );
};

export const SettingsScreenHeader = (props: BottomTabHeaderProps) => {
  return (
    <HeaderWrapper>
      <View style={styles.headerLeft}>
        <Icon name="gear-outline" color="black" size={SIZE_REF_12 * 2} />
        <MediumText
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.headerText}
        >
          Settings
        </MediumText>
      </View>
    </HeaderWrapper>
  );
};

export const ImageFeedScreenHeader = (props: BottomTabHeaderProps) => {
  return (
    <HeaderWrapper>
      <MediumText
        numberOfLines={1}
        ellipsizeMode="tail"
        style={styles.headerText}
      >
        Social
      </MediumText>
      <Icon name="search-bold" color="black" size={SIZE_REF_12 * 2} />
    </HeaderWrapper>
  );
};

export const NotificationScreenHeader = (props: BottomTabHeaderProps) => {
  return (
    <HeaderWrapper>
      <View style={styles.headerLeft}>
        <Icon
          name="notification-outline"
          color="black"
          size={SIZE_REF_12 * 2}
        />
        <MediumText
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.headerText}
        >
          Notification
        </MediumText>
      </View>
    </HeaderWrapper>
  );
};

export const MetaScreenHeader = ({ options }: StackHeaderProps) => {
  return (
    <HeaderWrapper>
      <View style={styles.headerLeft}>
        <Icon name="chevron-left" color="black" size={SIZE_REF_12 * 2} />
        <MediumText
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.headerText}
        >
          {options.headerTitle}
        </MediumText>
      </View>
    </HeaderWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: SIZE_REF_8,
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: SIZE_REF_6 * 3,
    paddingLeft: SIZE_REF_4,
  },
  headerLeft: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  headerLeftAligned: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  searchIcon: { backgroundColor: "#3F71F2", marginLeft: SIZE_REF_4 },
});
