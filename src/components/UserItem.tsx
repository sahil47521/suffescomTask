import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Feather";
import { COLORS, SIZES, SHADOWS, moderateScale } from "../constants/theme";

const UserItem = ({ user, onPress }: any) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.card}>
            <View style={styles.avatar}>
                <Icon name="user" size={moderateScale(24)} color={COLORS.primary} />
            </View>
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>{user.name}</Text>
                <View style={styles.emailContainer}>
                    <Icon name="mail" size={moderateScale(14)} color={COLORS.lightText} />
                    <Text style={styles.email} numberOfLines={1}>{user.email}</Text>
                </View>
            </View>
            <Icon name="chevron-right" size={moderateScale(20)} color={COLORS.border} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        height: moderateScale(150),
        paddingHorizontal: SIZES.padding,
        marginBottom: SIZES.margin,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: COLORS.border,
        ...SHADOWS.card,
    },
    avatar: {
        width: moderateScale(50),
        height: moderateScale(50),
        borderRadius: moderateScale(25),
        backgroundColor: COLORS.background,
        justifyContent: "center",
        alignItems: "center",
        marginRight: SIZES.margin,
    },
    info: {
        flex: 1,
        justifyContent: "center",
    },
    name: {
        fontSize: SIZES.medium,
        color: COLORS.text,
        fontWeight: "700",
        marginBottom: moderateScale(4),
    },
    emailContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    email: {
        fontSize: SIZES.font,
        color: COLORS.lightText,
        marginLeft: moderateScale(6),
    }
});

export default React.memo(UserItem);