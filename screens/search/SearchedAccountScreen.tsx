import { useFocusEffect } from "@react-navigation/native";
import { PayloadAction } from "@reduxjs/toolkit";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AccountList from "../../components/global/AccountList";
import BlankScreenPlaceHolder from "../../components/global/BlankScreenPlaceHolder";
import { SearchResultHeader } from "../../components/global/Header";
import LoadingScreenPlaceHolder from "../../components/global/LoadingScreenPlaceHolder";
import RoundedIcon from "../../components/global/RoundedIcon";
import { getSearchedAccountThunk } from "../../store/appData/reducer";
import {
  selectAccountHasNewSearchPhase,
  selectSearchedAccountIdList,
  selectSearchedAccountScreenState,
  selectSearchPhase,
  selectSearchScreenError,
} from "../../store/appData/selector";
import { useAppDispatch, useAppSelector } from "../../store/appStore";
import { SIZE_REF_14, SIZE_REF_16, SIZE_REF_8 } from "../../utility/constants";
import { delay } from "../../utility/helpers";
import { globalColors, globalLayouts } from "../../utility/styles";
import { MediumText } from "../../utility/ui";

const SearchedAccountScreen = () => {
  const [isInitialPageLoading, setInitialPageLoading] =
    useState<boolean>(false);

  const dispatch = useAppDispatch();

  const state = useAppSelector(selectSearchedAccountScreenState);

  const error = useAppSelector(selectSearchScreenError);

  const idList = useAppSelector(selectSearchedAccountIdList);

  const searchPhase = useAppSelector(selectSearchPhase);

  const hasNewSearchPhase = useAppSelector(selectAccountHasNewSearchPhase);

  useFocusEffect(
    useCallback(() => {
      let timeOutId: NodeJS.Timeout;

      if (hasNewSearchPhase) {
        timeOutId = setTimeout(() => {
          dispatch(
            getSearchedAccountThunk({
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
      getSearchedAccountThunk({
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
          text={`searching accounts for "${searchPhase}"`}
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
            icon="user-outline"
            text={`no accounts found for "${searchPhase}"`}
          />
        ) : (
          <AccountList
            dataState={state}
            ids={idList}
            onEndReach={onEndReachCallback}
            headerComponent={
              <SearchResultHeader
                searchPhase={searchPhase as string}
                type="accounts"
              />
            }
          />
        )
      ) : (
        <BlankScreenPlaceHolder
          icon="user-outline"
          text="search for new accounts"
        />
      )}
    </SafeAreaView>
  );
};

export default SearchedAccountScreen;
