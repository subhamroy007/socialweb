import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { shallowEqual } from "react-redux";
import { RootState, useAppSelector } from "../../store/appStore";
import { selectImagePostOverlayData } from "../../store/imagePost/selectors";
import {
  SIZE_REF_1,
  SIZE_REF_12,
  SIZE_REF_14,
  SIZE_REF_16,
  SIZE_REF_4,
  SIZE_REF_6,
  SIZE_REF_8,
} from "../../utility/constants";
import { countAbbreviator } from "../../utility/helpers";
import { ImagePostOverlayProps } from "../../utility/types";
import { MediumText, RegularText } from "../../utility/ui";
import HighlightedItem from "../global/HighlightedItem";
import RoundedIcon from "../global/RoundedIcon";
import Tag from "../global/Tag";

const ImagePostOverlay = ({ width, height, id }: ImagePostOverlayProps) => {
  const mutableDataSelectorCallback = useCallback(
    (state: RootState) => {
      return selectImagePostOverlayData(state, id);
    },
    [id]
  );

  const mutableData = useAppSelector(mutableDataSelectorCallback, shallowEqual);
  return (
    <Animated.View style={[styles.rootContainerStaticStyle, { width, height }]}>
      {mutableData && (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.rootListStaticStyle}
          pagingEnabled={true}
        >
          <View
            style={[styles.metaDataContainerStaticStyle, { width, height }]}
          >
            <View style={styles.countsContainerStaticStyle}>
              <View style={styles.iconCountPairContainerStaticStyle}>
                <RoundedIcon
                  name="heart-solid"
                  backgroundColor="transparent"
                  color="white"
                  scale={0.7}
                  size={SIZE_REF_8 * 7}
                  style={{
                    borderWidth: StyleSheet.hairlineWidth,
                    borderColor: "white",
                  }}
                />
                <MediumText style={styles.countTextStaticStyle}>
                  {countAbbreviator(mutableData.counts.likesCount)}
                </MediumText>
              </View>
              <View style={styles.iconCountPairContainerStaticStyle}>
                <RoundedIcon
                  name="comment-solid"
                  backgroundColor="transparent"
                  color="white"
                  scale={0.7}
                  size={SIZE_REF_8 * 7}
                  style={{
                    borderWidth: StyleSheet.hairlineWidth,
                    borderColor: "white",
                  }}
                />
                <MediumText style={styles.countTextStaticStyle}>
                  {countAbbreviator(mutableData.counts.commentsCount)}
                </MediumText>
              </View>
              <View style={styles.iconCountPairContainerStaticStyle}>
                <RoundedIcon
                  name="send"
                  backgroundColor="transparent"
                  color="white"
                  scale={0.7}
                  size={SIZE_REF_8 * 7}
                  style={{
                    borderWidth: StyleSheet.hairlineWidth,
                    borderColor: "white",
                  }}
                />
                <MediumText style={styles.countTextStaticStyle}>
                  {countAbbreviator(mutableData.counts.sharesCount)}
                </MediumText>
              </View>
            </View>
            {mutableData.likedBy && mutableData.likedBy.length > 0 && (
              <RegularText style={styles.likeTextStaticStyle}>
                liked by{" "}
                <MediumText>{mutableData.likedBy[0].socialId}</MediumText>
                {mutableData.likedBy.length > 1 && (
                  <RegularText>
                    {" "}
                    and{" "}
                    <MediumText>{mutableData.likedBy[1].socialId}</MediumText>
                  </RegularText>
                )}
              </RegularText>
            )}
            <HighlightedItem
              text={mutableData.genre}
              type="solid"
              color="white"
              size={SIZE_REF_12 + SIZE_REF_1}
              backgroundColor="#292828"
              style={{
                position: "absolute",
                top: SIZE_REF_8,
                left: SIZE_REF_8,
              }}
            />
          </View>
          {mutableData.tags && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, height }}
              contentContainerStyle={styles.tagListContentContainerStaticStyle}
            >
              {mutableData.tags.map((id, index) => (
                <Tag
                  id={id}
                  key={"tag" + index}
                  style={styles.tagStaticStyle}
                />
              ))}
            </ScrollView>
          )}
        </ScrollView>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  rootContainerStaticStyle: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    position: "absolute",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  metaDataContainerStaticStyle: {
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
  },
  countsContainerStaticStyle: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  iconCountPairContainerStaticStyle: {
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: SIZE_REF_8,
  },
  countTextStaticStyle: {
    color: "white",
    fontSize: SIZE_REF_12,
    lineHeight: SIZE_REF_12,
    marginTop: SIZE_REF_6,
  },
  likeTextStaticStyle: {
    color: "white",
    fontSize: SIZE_REF_12 + SIZE_REF_1,
    lineHeight: SIZE_REF_12 + SIZE_REF_1,
    marginTop: SIZE_REF_16 * 2,
  },
  tagListContentContainerStaticStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: SIZE_REF_8,
    paddingVertical: SIZE_REF_16,
  },
  rootListStaticStyle: {
    width: "100%",
    flex: 1,
  },
  tagStaticStyle: {
    marginHorizontal: SIZE_REF_8,
    marginVertical: SIZE_REF_16,
  },
});

export default ImagePostOverlay;
