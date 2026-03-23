import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS, SIZES, SHADOWS, moderateScale, verticalScale } from '../constants/theme';
import Icon from 'react-native-vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'UserDetail'>;

const UserDetailScreen: React.FC<Props> = ({ route, navigation }) => {
    const insets = useSafeAreaInsets()
    const { user } = route.params;

    return (
        <ScrollView style={[styles.container, { paddingTop: insets.top }]} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.7}>
                    <Icon name="chevron-left" size={moderateScale(24)} color={COLORS.lightText} style={styles.icon} />
                    <Text style={styles.backBtnText}> Back</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.profileSection}>
                <View style={styles.avatar}>
                    <Icon name="user" size={moderateScale(48)} color={COLORS.white} />
                </View>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.username}>@{user.username || 'user_handle'}</Text>
            </View>

            <Text style={styles.sectionTitle}>Contact</Text>
            <View style={styles.card}>
                <View style={styles.infoRow}>
                    <Icon name="mail" size={moderateScale(24)} color={COLORS.lightText} style={styles.icon} />
                    <View style={styles.rowContent}>
                        <Text style={styles.label}>Email</Text>
                        <Text style={styles.value}>{user.email}</Text>
                    </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.infoRow}>
                    <Icon name="phone" size={moderateScale(24)} color={COLORS.lightText} style={styles.icon} />
                    <View style={styles.rowContent}>
                        <Text style={styles.label}>Phone</Text>
                        <Text style={styles.value}>{user.phone}</Text>
                    </View>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Address</Text>
            <View style={styles.card}>
                <View style={styles.infoRow}>
                    <Icon name="map-pin" size={moderateScale(24)} color={COLORS.lightText} style={styles.icon} />
                    <View style={styles.rowContent}>
                        <Text style={styles.label}>Location</Text>
                        <Text style={styles.value}>{user.address.street}, {user.address.suite}</Text>
                        <Text style={styles.value}>{user.address.city}, {user.address.zipcode}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    contentContainer: {
        padding: SIZES.padding,
        paddingBottom: verticalScale(40),
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: SIZES.extraLarge,
    },
    backBtn: {
        paddingVertical: SIZES.base,
        paddingRight: SIZES.padding,
        flexDirection: "row",
        alignItems: "center",
    },
    backBtnText: {
        fontSize: SIZES.medium,
        color: COLORS.primary,
        fontWeight: "600",
    },
    profileSection: {
        alignItems: "center",
        marginBottom: SIZES.extraLarge,
    },
    avatar: {
        width: moderateScale(90),
        height: moderateScale(90),
        borderRadius: moderateScale(45),
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: SIZES.margin,
        ...SHADOWS.card,
    },
    avatarText: {
        fontSize: moderateScale(40),
        color: COLORS.white,
        fontWeight: "bold",
    },
    name: {
        fontSize: SIZES.extraLarge,
        color: COLORS.text,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: SIZES.base / 2,
    },
    username: {
        fontSize: SIZES.medium,
        color: COLORS.lightText,
        textAlign: "center",
        fontWeight: "500",
    },
    sectionTitle: {
        fontSize: SIZES.large,
        color: COLORS.text,
        fontWeight: "bold",
        marginBottom: moderateScale(10),
        marginLeft: SIZES.base,
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius + 4,
        padding: SIZES.padding,
        marginBottom: SIZES.extraLarge,
        borderWidth: 1,
        borderColor: COLORS.border,
        ...SHADOWS.card,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
    },
    icon: {
        marginTop: Platform.OS === 'ios' ? moderateScale(4) : moderateScale(2),
    },
    rowContent: {
        flex: 1,
    },
    label: {
        fontSize: SIZES.small,
        color: COLORS.lightText,
        marginBottom: SIZES.base / 2,
        textTransform: "uppercase",
        letterSpacing: 0.5,
        fontWeight: "600",
    },
    value: {
        fontSize: SIZES.medium,
        color: COLORS.text,
        fontWeight: "500",
        marginBottom: SIZES.base / 2,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: SIZES.margin,
        opacity: 0.5,
    },
});

export default UserDetailScreen;
