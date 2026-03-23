import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../screens/HomeScreen";
import UserDetailScreen from "../screens/UserDetailScreen";
import { User } from "../types/user.types";

export type RootStackParamList = {
    Home: undefined;
    UserDetail: { user: User };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Users' }} />
            <Stack.Screen name="UserDetail" component={UserDetailScreen} options={{ title: 'User Details' }} />
        </Stack.Navigator>
    )
}

export default AppNavigator
