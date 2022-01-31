import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, { Easing, FadeIn, FadeOut } from "react-native-reanimated";
import {
  SIZE_REF_1,
  SIZE_REF_12,
  SIZE_REF_16,
  SIZE_REF_6,
  SIZE_REF_8,
} from "../../utility/constants";
import { countAbbreviator } from "../../utility/helpers";
import { ImagePostOverlayProps } from "../../utility/types";
import { MediumText, RegularText } from "../../utility/ui";
import HighlightedItem from "../global/HighlightedItem";
import RoundedIcon from "../global/RoundedIcon";
import Tag from "../global/Tag";

const ImagePostOverlay = ({
  width,
  height,
  filteredLikes,
  genre,
  noOfComments,
  noOfLikes,
  noOfShares,
  tags,
}: ImagePostOverlayProps) => {
  return (
    <Animated.View
      style={[styles.rootContainerStaticStyle, { width, height }]}
      entering={FadeIn.duration(200).easing(Easing.in(Easing.quad))}
      exiting={FadeOut.duration(200).easing(Easing.out(Easing.quad))}
    >
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.listStaticStyle}
        pagingEnabled={true}
      >
        <View style={[styles.metaDataContainerStaticStyle, { width, height }]}>
          <View style={styles.countsContainerStaticStyle}>
            <View style={styles.iconCountPairContainerStaticStyle}>
              <RoundedIcon
                name="heart-solid"
                color="white"
                scale={0.7}
                type="outline"
                size={SIZE_REF_8 * 7}
              />
              <MediumText style={styles.countTextStaticStyle}>
                {countAbbreviator(noOfLikes)}
              </MediumText>
            </View>
            <View style={styles.iconCountPairContainerStaticStyle}>
              <RoundedIcon
                name="comment-solid"
                color="white"
                scale={0.7}
                size={SIZE_REF_8 * 7}
                type="outline"
              />
              <MediumText style={styles.countTextStaticStyle}>
                {countAbbreviator(noOfComments)}
              </MediumText>
            </View>
            <View style={styles.iconCountPairContainerStaticStyle}>
              <RoundedIcon
                name="send"
                color="white"
                scale={0.7}
                size={SIZE_REF_8 * 7}
                type="outline"
              />
              <MediumText style={styles.countTextStaticStyle}>
                {countAbbreviator(noOfShares)}
              </MediumText>
            </View>
          </View>
          {filteredLikes && (
            <RegularText style={styles.likeTextStaticStyle}>
              liked by <MediumText>{filteredLikes[0].socialId}</MediumText>
              {filteredLikes.length > 1 && (
                <RegularText>
                  {" "}
                  and <MediumText>{filteredLikes[1].socialId}</MediumText>
                </RegularText>
              )}
            </RegularText>
          )}
          <HighlightedItem
            text={genre}
            type="solid"
            color="white"
            size={SIZE_REF_12 + SIZE_REF_1}
            backgroundColor="#292828"
            style={styles.genreContainerStaticStyle}
          />
        </View>
        {tags && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width, height }}
            contentContainerStyle={styles.tagListContentContainerStaticStyle}
          >
            {tags.map((tag) => (
              <Tag {...tag} key={tag.id} style={styles.tagStaticStyle} />
            ))}
          </ScrollView>
        )}
      </ScrollView>
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
  listStaticStyle: {
    width: "100%",
    flex: 1,
  },
  tagStaticStyle: {
    marginHorizontal: SIZE_REF_8,
    marginVertical: SIZE_REF_16,
  },
  genreContainerStaticStyle: {
    position: "absolute",
    top: SIZE_REF_8,
    left: SIZE_REF_8,
  },
});

export default ImagePostOverlay;
