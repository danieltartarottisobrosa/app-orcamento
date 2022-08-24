import React, { useCallback, useState } from 'react'

import { ListItem, Dialog } from '@rneui/themed'
import { StyleSheet, ScrollView } from 'react-native'

export const SingleItemSelecionDialog = ({
    items = [],
    labelProp = 'name',
    idProp = 'id',
    onSelect, 
    ...props
} = {}) => {
    return (
        <Dialog {...props}>
            <ScrollView>
                <ListItem
                    key='without-category'
                    bottomDivider
                    onPress={() => onSelect(null)}
                >
                    <ListItem.Content>
                        <ListItem.Title>Sem Categoria</ListItem.Title>
                    </ListItem.Content>
                </ListItem>

                {items.map(item => (
                    <ListItem
                        key={item[idProp]}
                        bottomDivider
                        onPress={() => onSelect(item[idProp])}
                    >
                        <ListItem.Content>
                            <ListItem.Title>{item[labelProp]}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </ScrollView>
        </Dialog>
    )
}

const styles = StyleSheet.create({
    
})