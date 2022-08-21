import React, { useState } from 'react'

import { ListItem } from '@rneui/themed'
import { StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { BadgedIcon } from './BadgedIcon'

import { 
    allMonths,
    countSelectedMonths,
    select,
    unselect,
    unselectAll
} from '../redux/ducks/months'

import { formatMonth } from '../utils/formatters'

export const MonthsAccordeonListItem = ({
    expanded: pExpanded = false,
    onExpand = () => {}
} = {}) => {

    const dispatch = useDispatch()
    const [expanded, setExpanded] = useState(pExpanded)
    const months = useSelector(allMonths)
    const selectedCount = useSelector(countSelectedMonths)

    const handleExpand = () => {
        const newExpanded = !expanded
        setExpanded(newExpanded)
        onExpand(newExpanded)
    }

    const handleSelection = month => () => {
        const newState = !month.selected

        if (newState) {
            dispatch(select(month.id))
        } else {
            dispatch(unselect(month.id))
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
                        name='today'
                        type='material' />

                    <ListItem.Content>
                        <ListItem.Title style={styles.accordionTitle}>
                            Meses
                        </ListItem.Title>
                    </ListItem.Content>
                </>
            }
            isExpanded={expanded}
            onPress={handleExpand}
            onLongPress={handleClearFilter}
            bottomDivider
        >
            {months.map(month => (
                <ListItem
                    key={month.id}
                    bottomDivider
                    style={[ styles.item, month.selected && styles.selectedItem ]}
                    onPress={handleSelection(month)}
                >
                    <ListItem.CheckBox 
                        value={month.id}
                        checked={month.selected}
                        onPress={handleSelection(month)}
                    />
                    <ListItem.Content>
                        <ListItem.Title>{formatMonth(month.date)}</ListItem.Title>
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