import moment from 'moment'

// Action Types

export const Types = {
    SELECT: 'types/SELECT',
    UNSELECT: 'types/UNSELECT',
    UNSELECT_ALL: 'types/UNSELECT_ALL'
}

// Reducer

const initialState = {
    all: [
        { id: 'C', label: 'Crédito', selected: false },
        { id: 'D', label: 'Débito', selected: false }
    ]
}

export default function reducer(state = initialState, action) {
    const types = state.all

    switch (action.type) {
        case Types.SELECT:
            return {
                ...state,
                all: types.map(t => {
                    if (t.id === action.payload) {
                        return { ...t, selected: true }
                    }

                    return t
                })
            }

        case Types.UNSELECT:
            return {
                ...state,
                all: types.map(t => {
                    if (t.id === action.payload) {
                        return { ...t, selected: false }
                    }

                    return t
                })
            }

        case Types.UNSELECT_ALL:
            return {
                ...state,
                all: types.map(t => ({ ...t, selected: false }))
            }

        default:
            return state
    }
}

// Action Creators

export function select(id) {
    return {
        type: Types.SELECT,
        payload: id
    }
}

export function unselect(id) {
    return {
        type: Types.UNSELECT,
        payload: id
    }
}

export function unselectAll(id) {
    return {
        type: Types.UNSELECT_ALL
    }
}

// Selectors

export function allTypes({ types }) {
    return types.all
}

export function countSelectedTypes({ types }) {
    return types.all.filter(t => t.selected).length
}