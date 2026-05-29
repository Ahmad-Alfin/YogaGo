import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home as HomeIcon, Compass, Bookmark as BookmarkIcon, Bell } from "lucide-react-native";

import Home from "../screens/Home";
import Discover from "../screens/Discover";
import Bookmark from "../screens/Bookmark";
import Notification from "../screens/Notification";
import YogaDetail from "../screens/YogaDetail";
import AddBlogForm from "../screens/AddBlogForm";
import Profile from "../screens/Profile"; 

// --- 1. TAMBAHKAN IMPORT EDITCLASSFORM DI SINI ---
import EditClassForm from "../screens/EditClassForm"; 

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#4A7A64",
        tabBarInactiveTintColor: "grey",
        tabBarStyle: { height: 65, paddingBottom: 10, paddingTop: 10 },
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: ({color}) => <HomeIcon color={color} size={24}/> }} />
      <Tab.Screen name="Discover" component={Discover} options={{ tabBarIcon: ({color}) => <Compass color={color} size={24}/> }} />
      <Tab.Screen name="Bookmark" component={Bookmark} options={{ tabBarIcon: ({color}) => <BookmarkIcon color={color} size={24}/> }} />
      <Tab.Screen name="Notification" component={Notification} options={{ tabBarIcon: ({color}) => <Bell color={color} size={24}/> }} />
    </Tab.Navigator>
  );
}

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
      <Stack.Screen name="YogaDetail" component={YogaDetail} options={{ 
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS 
      }} />
      
      {/* Menggunakan name="AddBlog" untuk form tambah blog */}
      <Stack.Screen
        name="AddBlog"
        component={AddBlogForm}
        options={{
          headerShown: false, 
          animationEnabled: true,
          animationTypeForReplace: 'pop',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          animationEnabled: true,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

      {/* --- 2. TAMBAHKAN STACK.SCREEN UNTUK EDITCLASSFORM DI SINI --- */}
      <Stack.Screen
        name="EditClassForm"
        component={EditClassForm}
        options={{
          headerShown: false,
          animationEnabled: true,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

    </Stack.Navigator>
  );
};

export default Router;