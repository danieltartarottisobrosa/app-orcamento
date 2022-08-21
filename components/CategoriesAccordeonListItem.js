import React, { useState } from 'react'

import { ListItem, Icon } from '@rneui/themed'
import { StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { BadgedIcon } from './BadgedIcon'

import {
    allCategories,
    isWithoutCategory,
    countSelectedCategories,
    select,
    unselect,
    withoutCategorySelect,
    withoutCategoryUnselect,
    unselectAll
} from '../redux/ducks/categories'

export const CategoriesAccordeonListItem = ({
    expanded: pExpanded = false,
    onExpand = () => { }
} = {}) => {

    const dispatch = useDispatch()
    const [expanded, setExpanded] = useState(pExpanded)
    const categories = useSelector(allCategories)
    const withoutCategory = useSelector(isWithoutCategory)
    const selectedCount = useSelector(countSelectedCategories) +
        (withoutCategory ? 1 : 0)

    const handleExpand = () => {
        const newExpanded = !expanded
        setExpanded(newExpanded)
        onExpand(newExpanded)
    }

    const handleWithoutCategory = () => {
        const newState = !withoutCategory

        if (newState) {
            dispatch(withoutCategorySelect())
        } else {
            dispatch(withoutCategoryUnselect())
        }
    }

    const handleSelection = category => () => {
        const newState = !category.selected

        if (newState) {
            dispatch(select(category.id))
        } else {
            dispatch(unselect(category.id))
        }
    }

    const handleClearFilter = () => {
        dispatch(unselectAll())
    }

    return (
        <ListItem.Accordion
            content={
                <>
                    <BadgedIcon
                        showBadge={selectedCount > 0}
                        badgeValue={selectedCount}
                        name='category'
                        type='material' />

                    <ListItem.Content>
                        <ListItem.Title style={styles.accordionTitle}>
                            Categorias
                        </ListItem.Title>
                    </ListItem.Content>
                </>
            }
            isExpanded={expanded}
            onPress={handleExpand}
            onLongPress={handleClearFilter}
            bottomDivider
        >
            <ListItem
                key='without-category'
                bottomDivider
                style={[styles.item, withoutCategory && styles.selectedItem]}
                onPress={handleWithoutCategory}
            >
                <ListItem.CheckBox
                    value='without-category'
                    checked={withoutCategory}
                    onPress={handleWithoutCategory}
                />
                <ListItem.Content>
                    <ListItem.Title>Sem Categoria</ListItem.Title>
                </ListItem.Content>
            </ListItem>

            {categories.map(category => (
                <ListItem
                    key={category.id}
                    bottomDivider
                    style={[styles.item, category.selected && styles.selectedItem]}
                    onPress={handleSelection(category)}
                >
                    <ListItem.CheckBox
                        value={category.id}
                        checked={category.selected}
                        onPress={handleSelection(category)}
                    />
                    <ListItem.Content>
                        <ListItem.Title>{category.name}</ListItem.Title>
                        <ListItem.Subtitle>{category.ceil}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            ))}
        </ListItem.Accordion>
    )
}

const styles = StyleSheet.create({
    accordionTitle: {
        marginLeft: 21
    },
    item: {
        paddingLeft: 13
    },
    selectedItem: {
        backgroundColor: '#aaf'
    }
})