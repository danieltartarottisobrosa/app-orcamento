import moment from 'moment'

// Action Types

export const Types = {
    LOAD: 'months/LOAD',
    SELECT: 'months/SELECT',
    UNSELECT: 'months/UNSELECT',
    UNSELECT_ALL: 'months/UNSELECT_ALL'
}

// Reducer

const initialState = {
    all: [
        { id: '1', date: { year: 2022, month: 8 }, selected: false },
        { id: '2', date: { year: 2022, month: 7 }, selected: false },
        { id: '3', date: { year: 2022, month: 6 }, selected: false }
    ]
}

export default function reducer(state = initialState, action) {
    const months = state.all

    switch (action.type) {
        case Types.LOAD:
            return {}

        case Types.SELECT:
            return {
                ...state,
                all: months.map(m => {
                    if (m.id === action.payload) {
                        return { ...m, selected: true }
                    }

                    return m
                })
            }

        case Types.UNSELECT:
            return {
                ...state,
                all: months.map(m => {
                    if (m.id === action.payload) {
                        return { ...m, selected: false }
                    }

                    return m
                })
            }

        case Types.UNSELECT_ALL:
            return {
                ...state,
                all: months.map(m => ({ ...m, selected: false }))
            }

        default:
            return state
    }
}

// Action Creators

export function load() {
    return {
        type: Types.LOAD,
        payload: {}
    }
}

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

export function unselectAll() {
    return {
        type: Types.UNSELECT_ALL
    }
}

// Selectors

export function allMonths({ months }) {
    return months.all
}

export function countSelectedMonths({ months }) {
    return months.all.filter(m => m.selected).length
}