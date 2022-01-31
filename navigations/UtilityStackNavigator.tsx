import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import OthersProfileScreen from "../screens/OthersProfileScreen";
import { UtilityStackNavigatorParamList } from "../utility/types";
import SearchScreenNavigator from "./SearchScreenNavigator";

const StackNavigator = createStackNavigator<UtilityStackNavigatorParamList>();

const UtilityStackNavigator = () => {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name="OthersProfileScreen"
        component={OthersProfileScreen}
        options={
          {
            // header: (props) => <OtherUserProfileScreenHeader {...props} />,
          }
        }
      />
      <StackNavigator.Screen
        name="SearchResultScreen"
        component={SearchScreenNavigator}
        options={
          {
            // header: (props) => <SearchScreenHeader {...props} />,
          }
        }
      />
    </StackNavigator.Navigator>
  );
};

export default UtilityStackNavigator;
