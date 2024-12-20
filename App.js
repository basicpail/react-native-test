import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import Activity from './src/screens/Activity';
import Profile from './src/screens/Profile';
import CarMonitor from './src/screens/CarMonitor';
//
import Status from './src/screens/Status';
import FriendProfile from './src/screens/FriendProfile';
import EditProfile from './src/screens/EditProfile';
import IconOcticons from 'react-native-vector-icons/Octicons';
import Ionic from 'react-native-vector-icons/Ionicons'
import Chart from './src/screens/Chart';
import StatusDetail from './src/screens/StatusDetail';


const App = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const BottomTabScreen = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            height: 60
          },
          tabBarIcon: ({focused, size, color}) => {
            let iconName;
            color = 'black';
            if (route.name === 'Home') {
              iconName = focused ? 'home-sharp' : 'home-outline';
            } else if (route.name === 'Search') {
              // iconName = focused ? 'search' : 'ios-search-outline';
              iconName = focused ? 'list-sharp' : 'list-outline';
            } else if (route.name === 'Activity') {
              // iconName = focused ? 'ios-heart' : 'ios-heart-outline';
              iconName = focused ? 'bar-chart-sharp' : 'bar-chart-outline';
            } else if (route.name === 'Profile') {
              // iconName = focused ? 'ios-person-circle' : 'ios-person-outline';
              iconName = focused ? 'person-circle' : 'person-outline';
            }

            return <Ionic name={iconName} size={size} color={color}/>
          }
        })}
      >
        <Tab.Screen name="Home" component={CarMonitor} />
        <Tab.Screen name="Search" component={StatusDetail} />
        <Tab.Screen name="Activity" component={Chart} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    )
  }

  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Bottom" component={BottomTabScreen}/>
        <Stack.Screen name="Status" component={Status}/>
        <Stack.Screen name="FriendProfile" component={FriendProfile}/>
        <Stack.Screen name="EditProfile" component={EditProfile}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
