import CogIcon from '@/components/icons/Cog';
import HouseIcon from '@/components/icons/House';
import PeopleIcon from '@/components/icons/People';
import { HapticTab } from '@/components/ui';
import { Redirect, Tabs } from 'expo-router';
import { useShareIntentContext } from 'expo-share-intent';
import { Platform, PlatformIOSStatic } from 'react-native';

export default function TabLayout() {
  const { hasShareIntent } = useShareIntentContext();

  if (hasShareIntent && Platform.OS === 'android') {
    return <Redirect href={'/share-intent'} />;
  }

  const isDeviceIPad = () => {
    if (Platform.OS === 'ios') {
      const platformIOS = Platform as PlatformIOSStatic;
      return platformIOS.isPad;
    }
    return false;
  };

  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        tabBarStyle: {
          paddingBottom: isDeviceIPad() ? 10 : 0,
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
