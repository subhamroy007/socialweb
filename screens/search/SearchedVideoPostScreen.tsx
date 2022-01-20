import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BlankScreenPlaceHolder from "../../components/global/BlankScreenPlaceHolder";
import { SearchResultHeader } from "../../components/global/Header";
import LoadingScreenPlaceHolder from "../../components/global/LoadingScreenPlaceHolder";
import RoundedIcon from "../../components/global/RoundedIcon";
import VideoCollection from "../../components/global/VideoCollection";
import { getSearchedVideoPostThunk } from "../../store/appData/reducer";
import {
  selectSearchedVideoPostIdList,
  selectSearchedVideoPostScreenState,
  selectSearchPhase,
  selectSearchScreenError,
  selectVideoPostHasNewSearchPhase,
} from "../../store/appData/selector";
import { useAppDispatch, useAppSelector } from "../../store/appStore";
import { SIZE_REF_14, SIZE_REF_16, SIZE_REF_8 } from "../../utility/constants";
import { globalColors, globalLayouts } from "../../utility/styles";
import { MediumText } from "../../utility/ui";

const SearchedVideoPostScreen = () => {
  const dispatch = useAppDispatch();

  const state = useAppSelector(selectSearchedVideoPostScreenState);

  const error = useAppSelector(selectSearchScreenError);

  const idList = useAppSelector(selectSearchedVideoPostIdList);

  const searchPhase = useAppSelector(selectSearchPhase);

  const hasNewSearchPhase = useAppSelector(selectVideoPostHasNewSearchPhase);

  useFocusEffect(
    useCallback(() => {
      let timeOutId: NodeJS.Timeout;

      if (hasNewSearchPhase) {
        timeOutId = setTimeout(() => {
          dispatch(
            getSearchedVideoPostThunk({
              initRequest: true,
              searchPhase: searchPhase as string,
            })
          );
        }, 300);
      }

      return () => {
        if (timeOutId) {
          clearTimeout(timeOutId);
        }
      };
    }, [searchPhase, hasNewSearchPhase])
  );

  const onEndReachCallback = useCallback(() => {
    dispatch(
      getSearchedVideoPostThunk({
        initRequest: false,
        searchPhase: searchPhase as string,
      })
    );
  }, [searchPhase]);

  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[globalColors.screenColor, globalLayouts.screenLayout]}
    >
      {hasNewSearchPhase ? (
        <LoadingScreenPlaceHolder
          text={`searching videos for "${searchPhase}"`}
        />
      ) : state === "failure" ? (
        <RoundedIcon
          name="chevron-down"
          backgroundColor="transparent"
          scale={0.7}
          size={SIZE_REF_16 * 4}
        />
      ) : state ? (
        !idList || idList.length === 0 ? (
          <BlankScreenPlaceHolder
            icon="video-outline"
            text={`no videos found for "${searchPhase}"`}
          />
        ) : (
          <VideoCollection
            dataState={state}
            ids={idList}
            onEndReach={onEndReachCallback}
            headerComponent={
              <SearchResultHeader
                searchPhase={searchPhase as string}
                type="videos"
              />
            }
          />
        )
      ) : (
        <BlankScreenPlaceHolder
          icon="video-outline"
          text="search for new videos"
        />
      )}
    </SafeAreaView>
  );
};

export default SearchedVideoPostScreen;
