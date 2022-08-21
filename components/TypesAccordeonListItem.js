import React, { useState } from 'react'

import { ListItem } from '@rneui/themed'
import { StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { BadgedIcon } from './BadgedIcon'

import { 
    allTypes,
    countSelectedTypes,
    select,
    unselect,
    unselectAll
} from '../redux/ducks/types'

export const TypesAccordeonListItem = ({
    expanded: pExpanded = false,
    onExpand = () => {}
} = {}) => {

    const dispatch = useDispatch()
    const [expanded, setExpanded] = useState(pExpanded)
    const types = useSelector(allTypes)
    const selectedCount = useSelector(countSelectedTypes)

    const handleExpand = () => {
        const newExpanded = !expanded
        setExpanded(newExpanded)
        onExpand(newExpanded)
    }

    const handleSelection = type => () => {
        const newState = !type.selected

        if (newState) {
            dispatch(select(type.id))
        } else {
            dispatch(unselect(type.id))
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
                        name='swap-horiz'
                        type='material' />

                    <ListItem.Content>
                        <ListItem.Title style={styles.accordionTitle}>
                            Tipos
                        </ListItem.Title>
                    </ListItem.Content>
                </>
            }
            isExpanded={expanded}
            onPress={handleExpand}
            onLongPress={handleClearFilter}
            bottomDivider
        >
            {types.map(type => (
                <ListItem
                    key={type.id}
                    bottomDivider
                    style={[ styles.item, type.selected && styles.selectedItem ]}
                    onPress={handleSelection(type)}
                >
                    <ListItem.CheckBox 
                        value={type.id}
                        checked={type.selected}
                        onPress={handleSelection(type)}
                    />
                    <ListItem.Content>
                        <ListItem.Title>{type.label}</ListItem.Title>
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