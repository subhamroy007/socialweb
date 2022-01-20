import React, { useCallback } from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    GAP_SIZE_REF_14,
    GAP_SIZE_REF_16,
    GAP_SIZE_REF_2,
    GAP_SIZE_REF_6,
} from "../../utility/constants/appConstants";
import CustomTextInput from "./CustomTextInput";
import Icon from "./Icon";

const TextBar = ({ style }: { style?: StyleProp<ViewStyle> }) => {
    const sendTextHandler = useCallback(() => {}, []);
    const textChangeHandler = (text: string) => {};

    return (
        <SafeAreaView style={[styles.container, style]}>
            <SafeAreaView style={styles.textBar}>
                <CustomTextInput
                    placeHolder="Message"
                    multiLine={true}
                    style={{ paddingHorizontal: GAP_SIZE_REF_14 }}
                    inputChangeHandler={textChangeHandler}
                />
                <SafeAreaView style={styles.iconContainer}>
                    <Icon
                        name="paperclip"
                        size={28}
                        onPress={() => {}}
                        color="black"
                    />
                    <Icon
                        name="camera-outline"
                        size={28}
                        onPress={() => {}}
                        color="black"
                    />
                </SafeAreaView>
            </SafeAreaView>
            <SafeAreaView style={styles.buttonContainer}>
                <Pressable
                    style={styles.button}
                    android_ripple={{ color: "grey", borderless: true }}
                    onPress={sendTextHandler}
                >
                    <Icon
                        name="send"
                        size={28}
                        onPress={() => {}}
                        color="white"
                    />
                </Pressable>
            </SafeAreaView>
        </SafeAreaView>
    );
};

export default TextBar;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "space-evenly",
    },
    textBar: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-around",
        width: "85%",
        maxHeight: 100,
        backgroundColor: "#EBEDFB",
        borderRadius: GAP_SIZE_REF_16,
        paddingHorizontal: GAP_SIZE_REF_2,
    },
    iconContainer: {
        flexDirection: "row",
        width: "20%",
        justifyContent: "space-between",
        padding: GAP_SIZE_REF_6,
    },
    buttonContainer: {
        width: "15%",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#6A53F8",
        borderRadius: GAP_SIZE_REF_16,
        alignItems: "center",
        width: "65%",
        padding: GAP_SIZE_REF_6,
    },
});
