import React, { useEffect, useState, useCallback } from "react";
import {
    View,
    FlatList,
    TextInput,
    Text,
    RefreshControl,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    StatusBar
} from "react-native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Search, UserPlus, Users } from "lucide-react-native";
import { useAppDispatch, useAppSelector } from "../store";
import { getUsers, resetUsers } from "../store/userSlice";
import { User } from "../types/user.types";
import UserItem from "../components/UserItem";
import { RootStackParamList } from "../navigation/AppNavigator";
import { COLORS, SIZES, moderateScale } from "../constants/theme";

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const { users, loading, page, error, hasMore } = useAppSelector((state) => state.users);

    const [search, setSearch] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        dispatch(getUsers(1));
    }, []);

    const loadMore = () => {
        if (!loading && hasMore && search.trim() === "") {
            dispatch(getUsers(page));
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch(resetUsers());
        dispatch(getUsers(1));
        setRefreshing(false);
    }, []);

    const filteredUsers = users?.filter((u) =>
        u?.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
            
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Contacts</Text>
                    <Text style={styles.headerSubtitle}>{users.length} people found</Text>
                </View>
                <TouchableOpacity style={styles.headerIcon}>
                    <UserPlus size={moderateScale(24)} color={COLORS.primary} />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <Search size={moderateScale(20)} color={COLORS.lightText} style={styles.searchIcon} />
                <TextInput
                    placeholder="Search users by name..."
                    value={search}
                    onChangeText={setSearch}
                    style={styles.searchInput}
                    placeholderTextColor={COLORS.lightText}
                />
            </View>

            {error && page === 1 ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity style={styles.TryAgain} onPress={onRefresh}>
                        <Text style={styles.TryAgainText}>Try Again</Text>
                    </TouchableOpacity>
                </View>
            ) : loading && page === 1 ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            ) : (
                <FlatList<User>
                    data={filteredUsers}
                    keyExtractor={(item: User) => item.id.toString()}
                    renderItem={({ item }: { item: User }) => (
                        <UserItem
                            user={item}
                            onPress={() =>
                                navigation.navigate("UserDetail", { user: item })
                            }
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.1}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />
                    }
                    ListFooterComponent={
                        search.trim() !== "" ? null : loading ? (
                            <ActivityIndicator size="small" color={COLORS.primary} style={styles.loader} />
                        ) : !hasMore && users.length > 0 ? (
                            <Text style={styles.centerText}>No more users to show</Text>
                        ) : null
                    }
                    ListEmptyComponent={
                        !loading ? (
                            <View style={styles.emptyContainer}>
                                <Users size={moderateScale(48)} color={COLORS.lightText} />
                                <Text style={styles.centerText}>No users found matching "{search}"</Text>
                            </View>
                        ) : null
                    }
                />
            )}
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: SIZES.padding,
        paddingTop: moderateScale(20),
        marginBottom: moderateScale(15),
    },
    headerTitle: {
        fontSize: moderateScale(28),
        fontWeight: "800",
        color: COLORS.text,
    },
    headerSubtitle: {
        fontSize: SIZES.font,
        color: COLORS.lightText,
        marginTop: -moderateScale(2),
    },
    headerIcon: {
        width: moderateScale(45),
        height: moderateScale(45),
        borderRadius: moderateScale(22.5),
        backgroundColor: COLORS.white,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.white,
        marginHorizontal: SIZES.padding,
        marginBottom: moderateScale(20),
        borderRadius: SIZES.radius,
        paddingHorizontal: moderateScale(12),
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    searchIcon: {
        marginRight: moderateScale(8),
    },
    searchInput: {
        flex: 1,
        paddingVertical: moderateScale(12),
        fontSize: SIZES.medium,
        color: COLORS.text,
    },
    listContent: {
        paddingHorizontal: SIZES.padding,
        paddingBottom: moderateScale(100),
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loader: {
        margin: SIZES.margin,
    },
    centerText: {
        textAlign: "center",
        marginTop: SIZES.margin,
        fontSize: SIZES.medium,
        color: COLORS.lightText,
    },
    emptyContainer: {
        alignItems: "center",
        marginTop: moderateScale(50),
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: SIZES.padding,
    },
    errorText: {
        textAlign: "center",
        fontSize: SIZES.medium,
        color: COLORS.error,
        marginBottom: SIZES.margin,
    },
    TryAgain: {
        paddingHorizontal: moderateScale(30),
        paddingVertical: moderateScale(12),
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.radius,
    },
    TryAgainText: {
        color: COLORS.white,
        fontSize: SIZES.font,
        fontWeight: "bold",
    }
});