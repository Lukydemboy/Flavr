import BookIcon from '@/components/icons/Book';
import CogIcon from '@/components/icons/Cog';
import HouseIcon from '@/components/icons/House';
import PeopleIcon from '@/components/icons/People';
import { HapticTab } from '@/components/ui';
import { useUpdateUser, useUser } from '@/queries/user';
import { PushNotifications } from '@/utils/push-notifications/push-notifications';
import { Tabs } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
  const { data: user } = useUser();
  const { mutateAsync: updateUser } = useUpdateUser();

  useEffect(() => {
    PushNotifications.registerForPushNotificationsAsync()
      .then(pushToken => {
        if (pushToken && user?.pushToken !== pushToken) {
          updateUser({ pushToken });
        }
      })
      .catch((error: any) => console.log('something went wrong when registering for push notifications', error));
  }, [updateUser]);

  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        tabBarStyle: {
          paddingBottom: 0,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontFamily: 'nunito',
          fontSize: 9,
          marginTop: 3,
        },
        tabBarButton: props => <HapticTab {...props} />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          lazy: false,
          popToTopOnBlur: true,
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ focused }) => <HouseIcon width={24} height={24} color={focused ? 'black' : '#A09FA8'} />,
          tabBarShowLabel: false,
        }}
      />
      {/*<Tabs.Screen
        name="recipes"
        options={{
          lazy: false,
          popToTopOnBlur: true,
          headerShown: false,
          title: 'Recipes',
          tabBarIcon: ({ focused }) => <BookIcon width={25} height={25} color={focused ? 'black' : '#A09FA8'} />,
          tabBarShowLabel: false,
        }}
      />*/}
      <Tabs.Screen
        name="groups"
        options={{
          headerShown: false,
          lazy: false,
          popToTopOnBlur: true,
          title: 'Groups',
          tabBarIcon: ({ focused }) => <PeopleIcon width={28} height={28} color={focused ? 'black' : '#A09FA8'} />,
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          lazy: false,
          popToTopOnBlur: true,
          title: 'Settings',
          tabBarIcon: ({ focused }) => <CogIcon width={24} height={24} color={focused ? 'black' : '#A09FA8'} />,
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
}
