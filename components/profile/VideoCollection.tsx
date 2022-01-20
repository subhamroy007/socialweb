import React, { useCallback } from "react";
import { View } from "react-native";
import { RootState, useAppSelector } from "../../store/appStore";
import { selectUserVideoPostIdList } from "../../store/user/selector";
import { globalColors, globalLayouts } from "../../utility/styles";
import { Id } from "../../utility/types";
import VideoThumbnail from "../videoPost/VideoThumbnail";

const VideoCollection = ({ id }: Id) => {
  const videoIdListSelectorCallback = useCallback(
    (state: RootState) => selectUserVideoPostIdList(state, id),
    [id]
  );

  const videoIdList = useAppSelector(videoIdListSelectorCallback);

  return (
    <View style={[globalLayouts.screenLayout, globalColors.screenColor]}>
      {videoIdList?.map((id) => (
        <VideoThumbnail id={id} key={id} />
      ))}
    </View>
  );
};

export default VideoCollection;
