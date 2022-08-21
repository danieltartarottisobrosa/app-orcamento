import React, { useState } from 'react'

import { Header, Icon } from '@rneui/themed'
import { View, StyleSheet, ScrollView } from 'react-native'
import {
  CategoriesAccordeonListItem,
  MonthsAccordeonListItem,
  TypesAccordeonListItem
} from '../components'

import { signOut } from 'firebase/auth'
import { auth } from '../config'

export const DrawerScreen = props => {
  const [ currentExpanded, setCurrentExpanded ] = useState(null)

  const handleLogout = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error))
  }

  const handleBack = () => {
    props.navigation.closeDrawer()
  }

  const handleExpand = name => expanded => {
    setCurrentExpanded(expanded ? name : null)
  }

  return (
    <View style={styles.screen}>
      <Header
        leftComponent={() => (
          <Icon 
            name='chevron-left'
            type='material'
            color='white'
            onPress={handleBack} />
        )}
        centerComponent={{ text: 'Filtros', style: styles.heading }}
        rightComponent={() => (
          <Icon 
            name='power-settings-new'
            type='material'
            color='white'
            onPress={handleLogout} />
        )}
      />

      <ScrollView>
        <CategoriesAccordeonListItem 
          expanded={currentExpanded === 'categories'}
          onExpand={handleExpand('categories')}/>
        <MonthsAccordeonListItem 
          expanded={currentExpanded === 'months'}
          onExpand={handleExpand('months')} />
        <TypesAccordeonListItem 
          expanded={currentExpanded === 'types'}
          onExpand={handleExpand('types')} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  heading: {
    color: 'white',
    fontSize: 21,
    fontWeight: 'bold'
  },
  item: {
    marginVertical: 3
  },
  itemName: {
    fontSize: 21
  },
  itemAge: {
    fontSize: 13
  }
})