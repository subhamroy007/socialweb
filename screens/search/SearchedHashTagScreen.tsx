import { useFocusEffect } from "@react-navigation/native";
import { createAsyncThunk } from "@reduxjs/toolkit";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BlankScreenPlaceHolder from "../../components/global/BlankScreenPlaceHolder";
import HashTagList from "../../components/global/HashTagList";
import { SearchResultHeader } from "../../components/global/Header";
import LoadingScreenPlaceHolder from "../../components/global/LoadingScreenPlaceHolder";
import RoundedIcon from "../../components/global/RoundedIcon";
import { getSearchedHashTagThunk } from "../../store/appData/reducer";
import {
  selectHashTagHasNewSearchPhase,
  selectSearchedHashTagIdList,
  selectSearchedHashTagScreenState,
  selectSearchPhase,
  selectSearchScreenError,
} from "../../store/appData/selector";
import { useAppDispatch, useAppSelector } from "../../store/appStore";
import {
  SIZE_REF_10,
  SIZE_REF_14,
  SIZE_REF_16,
  SIZE_REF_8,
  WINDOW_WIDTH,
} from "../../utility/constants";
import { globalColors, globalLayouts } from "../../utility/styles";
import { MediumText } from "../../utility/ui";

const SearchedHashTagScreen = () => {
  const dispatch = useAppDispatch();

  const state = useAppSelector(selectSearchedHashTagScreenState);

  const error = useAppSelector(selectSearchScreenError);

  const idList = useAppSelector(selectSearchedHashTagIdList);

  const searchPhase = useAppSelector(selectSearchPhase);

  const hasNewSearchPhase = useAppSelector(selectHashTagHasNewSearchPhase);

  useFocusEffect(
    useCallback(() => {
      let timeOutId: NodeJS.Timeout;

      if (hasNewSearchPhase) {
        timeOutId = setTimeout(() => {
          dispatch(
            getSearchedHashTagThunk({
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
      getSearchedHashTagThunk({
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
          text={`searching hashtags for "${searchPhase}"`}
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
            icon="hashtag-solid"
            text={`no hashtags found for "${searchPhase}"`}
          />
        ) : (
          <HashTagList
            dataState={state}
            ids={idList}
            onEndReach={onEndReachCallback}
            headerComponent={
              <SearchResultHeader
                searchPhase={searchPhase as string}
                type="hashtags"
              />
            }
          />
        )
      ) : (
        <BlankScreenPlaceHolder
          icon="hashtag-solid"
          text="search for new hashtags"
        />
      )}
    </SafeAreaView>
  );
};

export default SearchedHashTagScreen;
