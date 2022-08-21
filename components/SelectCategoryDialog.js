import React, { useCallback, useState } from 'react'

import { ListItem, Dialog } from '@rneui/themed'
import { StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import {
    allCategories
} from '../redux/ducks/categories'
import { ScrollView } from 'react-native-gesture-handler'

export const SelectCategoryDialog = ({ onSelect, ...props } = {}) => {
    const categories = useSelector(allCategories)

    return (
        <Dialog {...props}>
            <ScrollView>
                <ListItem
                    key='without-category'
                    bottomDivider
                    onPress={useCallback(() => onSelect(null))}
                >
                    <ListItem.Content>
                        <ListItem.Title>Sem Categoria</ListItem.Title>
                    </ListItem.Content>
                </ListItem>

                {categories.map(category => (
                    <ListItem
                        key={category.id}
                        bottomDivider
                        onPress={useCallback(() => onSelect(category.id))}
                    >
                        <ListItem.Content>
                            <ListItem.Title>{category.name}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </ScrollView>
        </Dialog>
    )
}

const styles = StyleSheet.create({
    
})