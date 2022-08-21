import {
    formatMonth,
    formatMoney,
    formatDate
} from '../../utils/formatters'

// Action Types

export const Types = {
    ADD: 'entries/ADD',
    EDIT: 'entries/EDIT',
    REMOVE: 'entries/REMOVE',
    SELECT: 'entries/SELECT',
    UNSELECT: 'entries/UNSELECT',
    UNSELECT_ALL: 'entries/UNSELECT_ALL',
    CHANGE_FILTER_TERM: 'entries/CHANGE_FILTER_TERM',
    CHANGE_CATEGORY: 'entries/CHANGE_CATEGORY'
}

// Reducer

const initialState = {
    filter: {
        term: ''
    },
    all: [
        { id: '1', date: { year: 2022, month: 8, day: 16 }, name: 'Burger King', value: -68.5, category: '2', selected: false },
        { id: '2', date: { year: 2022, month: 8, day: 15 }, name: 'Brasil Atacadista', value: -23.99, category: null, selected: false },
        { id: '3', date: { year: 2022, month: 7, day: 2 }, name: 'Salário', value: 20000, category: null, selected: false }
    ]
}

export default function reducer(state = initialState, action) {
    const entries = [...state.all]

    switch (action.type) {
        case Types.ADD:
            return {
                ...state,
                all: [
                    ...entries,
                    action.payload
                ]
            }

        case Types.EDIT:
            return {
                ...state,
                all: entries.map(e => {
                    if (e.id === action.payload.id) {
                        return { ...e, ...action.payload }
                    }

                    return e
                })
            }

        case Types.REMOVE:
            return {
                ...state,
                all: entries.filter(c => c.id !== action.payload)
            }

        case Types.SELECT:
            return {
                ...state,
                all: entries.map(e => {
                    if (e.id === action.payload) {
                        return { ...e, selected: true }
                    }

                    return e
                })
            }

        case Types.UNSELECT:
            return {
                ...state,
                all: entries.map(e => {
                    if (e.id === action.payload) {
                        return { ...e, selected: false }
                    }

                    return e
                })
            }

        case Types.UNSELECT_ALL:
            return {
                ...state,
                all: entries.map(e => ({ ...e, selected: false }))
            }

        case Types.CHANGE_FILTER_TERM:
            return {
                ...state,
                filter: {
                    term: action.payload
                }
            }

        case Types.CHANGE_CATEGORY:
            return {
                ...state,
                all: entries.map(e => {
                    if (action.payload.entryIds.includes(e.id)) {
                        return {
                            ...e,
                            category: action.payload.category
                        }
                    }

                    return e
                })
            }

        default:
            return state
    }
}

// Action Creators

export function add(name, ceil) {
    return {
        type: Types.ADD,
        payload: {
            name,
            ceil
        }
    }
}

export function edit(id, categoryFields) {
    return {
        type: Types.EDIT,
        payload: {
            ...categoryFields,
            id
        }
    }
}

export function remove(id) {
    return {
        type: Types.REMOVE,
        payload: id
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

export function changeFilterTerm(term) {
    return {
        type: Types.CHANGE_FILTER_TERM,
        payload: term
    }
}

export function changeCategory(entryIds, category) {
    return {
        type: Types.CHANGE_CATEGORY,
        payload: {
            entryIds,
            category
        }
    }
}

// Selectors

export function allEntries({ entries: entriesState }) {
    return entriesState.all
}

export function countSelectedEntries({ entries: entriesState }) {
    return entriesState.all.filter(e => e.selected).length
}

export function selectedEntries({ entries: entriesState }) {
    return entriesState.all.filter(e => e.selected)
}

export function getFilterTerm({ entries: entriesState }) {
    return entriesState.filter.term
}

export function filteredEntries({
    entries: entriesState,
    categories: categoriesState,
    months: monthsState,
    types: typesState
}) {
    const { filter: { term }, all } = entriesState
    let entries = [...all]

    if (term && term.length > 0) {
        entries = entries.filter(e =>
            e.name.includes(term) ||
            formatMoney(e.value).includes(term) ||
            formatDate(e.date).includes(term))
    }

    const { withoutCategory } = categoriesState

    const selectedCategories = categoriesState.all
        .filter(c => c.selected)
        .map(c => c.id)

    const hasSelectedCategories = selectedCategories.length > 0

    if (withoutCategory || hasSelectedCategories) {
        entries = entries.filter(e => {
            if (withoutCategory && e.category === null) {
                return true
            }

            if (hasSelectedCategories && selectedCategories.includes(e.category)) {
                return true
            }

            return false
        })
    }

    const selectedMonths = monthsState.all
        .filter(m => m.selected)
        .map(m => formatMonth(m.date))

    if (selectedMonths.length > 0) {
        entries = entries.filter(e =>
            selectedMonths.includes(formatMonth(e.date)))
    }

    const selectedTypes = typesState.all
        .filter(t => t.selected)
        .map(t => t.id)

    if (selectedTypes.length > 0) {
        entries = entries.filter(e =>
            selectedTypes.includes(e.value >= 0 ? 'C' : 'D'))
    }

    return entries
}