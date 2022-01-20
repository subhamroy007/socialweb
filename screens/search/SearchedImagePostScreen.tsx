import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BlankScreenPlaceHolder from "../../components/global/BlankScreenPlaceHolder";
import { SearchResultHeader } from "../../components/global/Header";
import ImageGallery from "../../components/global/ImageGallery";
import LoadingScreenPlaceHolder from "../../components/global/LoadingScreenPlaceHolder";
import RoundedIcon from "../../components/global/RoundedIcon";
import { getSearchedImagePostThunk } from "../../store/appData/reducer";
import {
  selectImagePostHasNewSearchPhase,
  selectSearchedImagePostIdList,
  selectSearchedImagePostScreenState,
  selectSearchPhase,
  selectSearchScreenError,
} from "../../store/appData/selector";
import { useAppDispatch, useAppSelector } from "../../store/appStore";
import { SIZE_REF_14, SIZE_REF_16, SIZE_REF_8 } from "../../utility/constants";
import { globalColors, globalLayouts } from "../../utility/styles";
import { MediumText } from "../../utility/ui";

const SearchedImagePostScreen = () => {
  const dispatch = useAppDispatch();

  const state = useAppSelector(selectSearchedImagePostScreenState);

  const error = useAppSelector(selectSearchScreenError);

  const idList = useAppSelector(selectSearchedImagePostIdList);

  const searchPhase = useAppSelector(selectSearchPhase);

  const hasNewSearchPhase = useAppSelector(selectImagePostHasNewSearchPhase);

  useFocusEffect(
    useCallback(() => {
      let timeOutId: NodeJS.Timeout;

      if (hasNewSearchPhase) {
        timeOutId = setTimeout(() => {
          dispatch(
            getSearchedImagePostThunk({
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
      getSearchedImagePostThunk({
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
          text={`searching images for "${searchPhase}"`}
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
            icon="camera-outline"
            text={`no images found for "${searchPhase}"`}
          />
        ) : (
          <ImageGallery
            dataState={state}
            ids={idList}
            onEndReach={onEndReachCallback}
            headerComponent={
              <SearchResultHeader
                searchPhase={searchPhase as string}
                type="images"
              />
            }
          />
        )
      ) : (
        <BlankScreenPlaceHolder
          icon="camera-outline"
          text="search for new images"
        />
      )}
    </SafeAreaView>
  );
};
export default SearchedImagePostScreen;
