import React from 'react'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from '@rneui/themed'
import { RootNavigator } from './navigation/RootNavigator'
import { AuthenticatedUserProvider } from './providers'
import { store } from './redux/store'
import { theme } from './config/theme'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AuthenticatedUserProvider>
          <SafeAreaProvider>
            <RootNavigator />
          </SafeAreaProvider>
        </AuthenticatedUserProvider>
      </Provider>
    </ThemeProvider>
  )
}

export default App
