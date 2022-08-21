import * as React from 'react'
// import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { HomeScreen, DrawerScreen } from '../screens'

// const Stack = createStackNavigator()

// export const AppStack = () => {
//   return (
//     <Stack.Navigator
//         initialRouteName='Home'
//         screenOptions={{ headerShown: false }}>
//         <Stack.Screen name='Home' component={HomeScreen} />
//     </Stack.Navigator>
//   )
// }

const Drawer = createDrawerNavigator()

export const AppStack = () => (
  <Drawer.Navigator
    initialRouteName="Home"
    screenOptions={{ headerShown: false }}
    drawerContent={props => <DrawerScreen {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
  </Drawer.Navigator>
)