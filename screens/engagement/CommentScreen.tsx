import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useCallback, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingIndicator from "../../components/global/LoadingIndicator";
import { getCommentInfoThunk } from "../../store/appData/reducer";
import { selectCommentScreenData } from "../../store/appData/selectors";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../store/appStore";
import { SIZE_REF_10 } from "../../utility/constants";
import { globalColors, globalLayouts } from "../../utility/styles";
import {
  PostEngagementNavigatorParamList,
  RootStackNavigatorParamList,
} from "../../utility/types";

type CommentScreenProps = CompositeScreenProps<
  MaterialTopTabScreenProps<PostEngagementNavigatorParamList, "CommentScreen">,
  StackScreenProps<RootStackNavigatorParamList>
>;

const CommentScreen = ({
  navigation,
  route: {
    params: { id, type },
  },
}: CommentScreenProps) => {
  const dispatch = useAppDispatch();

  const dataSelectorCallback = useCallback(
    (state: RootState) => {
      return selectCommentScreenData(state, type, id);
    },
    [id, type]
  );

  const { error, ids, state } = useAppSelector(dataSelectorCallback);

  useEffect(() => {
    dispatch(
      getCommentInfoThunk({ category: type, filter: id, initialRequest: true })
    );
  }, [type, id]);

  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[globalColors.screenColor, globalLayouts.screenLayout]}
    >
      {(!state || state === "loading") && (
        <LoadingIndicator color="black" size={SIZE_REF_10 * 4} />
      )}
    </SafeAreaView>
  );
};

export default CommentScreen;
