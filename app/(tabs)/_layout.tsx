import BookIcon from "@/components/icons/Book";
import HouseIcon from "@/components/icons/House";
import PeopleIcon from "@/components/icons/People";
import { HapticTab } from "@/components/ui";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        tabBarStyle: {
          paddingBottom: 10,
          paddingTop: 10,
          height: 60,
          backgroundColor: "white",
          marginBottom: Platform.OS === "ios" ? 30 : 0,
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: 25,
          width: "87%",
          borderTopWidth: 2,
          borderColor: "#fff",
          borderWidth: 2,
          elevation: 4,
        },
        tabBarLabelStyle: {
          fontFamily: "nunito",
          fontSize: 9,
          marginTop: 3,
        },
        tabBarButton: (props) => <HapticTab {...props} />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          lazy: false,
          popToTopOnBlur: true,
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <HouseIcon
              width={24}
              height={24}
              color={focused ? "black" : "#A09FA8"}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="recipes"
        options={{
          lazy: false,
          popToTopOnBlur: true,
          headerShown: false,
          title: "Recipes",
          tabBarIcon: ({ focused }) => (
            <BookIcon
              width={25}
              height={25}
              color={focused ? "black" : "#A09FA8"}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          headerShown: false,
          lazy: false,
          popToTopOnBlur: true,
          title: "Groups",
          tabBarIcon: ({ focused }) => (
            <PeopleIcon
              width={28}
              height={28}
              color={focused ? "black" : "#A09FA8"}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
}
