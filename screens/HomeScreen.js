import React, { useCallback, useState } from 'react'

import { Header, ListItem, Icon, SearchBar, Text } from '@rneui/themed'
import { View, StyleSheet, ScrollView } from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import {
  getFilterTerm,
  select,
  unselect,
  changeFilterTerm,
  filteredEntries,
  countSelectedEntries,
  selectedEntries,
  changeCategory,
  unselectAll
} from '../redux/ducks/entries'

import {
  allCategoriesById,
  countSelectedCategories,
  unselectAll as unselectAllCategories
} from '../redux/ducks/categories'

import { 
  countSelectedTypes,
  unselectAll as unselectAllTypes
} from '../redux/ducks/types'

import {
  countSelectedMonths,
  unselectAll as unselectAllMonths
} from '../redux/ducks/months'

import { 
  formatDate,
  formatMoney
} from '../utils/formatters'
import { BadgedIcon, SelectCategoryDialog } from '../components'

export const HomeScreen = props => {
  const dispatch = useDispatch()
  const [ showCategorySelector, setShowCategorySelector ] = useState(false)
  const entries = useSelector(filteredEntries)
  const selected = useSelector(selectedEntries)
  const filterTerm = useSelector(getFilterTerm)
  const categoriesById = useSelector(allCategoriesById)
  
  const selectedEntriesCount = useSelector(countSelectedEntries)
  const selectedCategoriesCount = useSelector(countSelectedCategories)
  const selectedMonthsCount = useSelector(countSelectedMonths)
  const selectedTypesCount = useSelector(countSelectedTypes)

  const filterCount = selectedCategoriesCount + selectedMonthsCount + selectedTypesCount
  
  const getCategoryName = categoryId => {
    const found = categoriesById[categoryId]
    return found ? found.name : 'Sem Categoria'
  }

  const handleMenu = () => {
    props.navigation.openDrawer()
  }

  const handleSelection = entry => () => {
    const newState = !entry.selected

    if (newState) {
      dispatch(select(entry.id))
    } else {
      dispatch(unselect(entry.id))
    }
  }

  const handleFilterTermChange = term => {
    dispatch(changeFilterTerm(term))
  }

  const handleCategory = () => {
    if (selectedEntriesCount > 0) {
      setShowCategorySelector(!showCategorySelector)
    }
  }

  const handleCategoryChange = categoryId => {
    const entryIds = selected.map(e => e.id)
    dispatch(changeCategory(entryIds, categoryId))
    setShowCategorySelector(false)
    dispatch(unselectAll())
  }

  const handleClearAllFilters = () => {
    dispatch(unselectAllCategories())
    dispatch(unselectAllMonths())
    dispatch(unselectAllTypes())
  }

  return (
    <View style={styles.screen}>
      <Header
        leftComponent={() => (
          <View style={{ flexDirection: 'row' }}>
            <BadgedIcon
              showBadge={filterCount > 0}
              badgeValue={filterCount}
              name='menu'
              type='material'
              color='white'
              onPress={handleMenu}
              onLongPress={handleClearAllFilters} />
          </View>
        )}
        centerComponent={{ text: 'Lançamentos', style: styles.heading }}
        rightComponent={() => (
          <Icon
            style={{ opacity: selectedEntriesCount === 0 ? .5 : 1 }}
            name='category'
            type='material'
            color='white'
            onPress={handleCategory} />
        )}
      />

      <SearchBar
        placeholder='Pesquise aqui...'
        value={filterTerm}
        onChangeText={handleFilterTermChange} />

      <ScrollView>
        {entries.map(entry => (
          <ListItem
            key={entry.name}
            bottomDivider
            onPress={handleSelection(entry)}
            style={[styles.item, entry.selected && styles.selectedItem]}
          >
            <ListItem.CheckBox
              value={entry.id}
              checked={entry.selected}
              onPress={handleSelection(entry)}
            />
            <ListItem.Content>
              <ListItem.Subtitle style={styles.category}>{getCategoryName(entry.category)}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.date}>{formatDate(entry.date)}</ListItem.Subtitle>
              <ListItem.Title>{entry.name}</ListItem.Title>
              <ListItem.Subtitle style={styles.value}>{formatMoney(entry.value)}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>

      <SelectCategoryDialog
        isVisible={showCategorySelector}
        onSelect={handleCategoryChange}
        onBackdropPress={useCallback(() => setShowCategorySelector(false))} />
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
    paddingLeft: 13
  },
  selectedItem: {
    backgroundColor: '#aaf'
  },
  category: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'gray'
  },
  date: {
    position: 'absolute',
    right: 8,
    top: -1,
    fontSize: 13
  },
  value: {
    position: 'absolute',
    right: 8,
    bottom: -5,
    fontSize: 18
  }
})