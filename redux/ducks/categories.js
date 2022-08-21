
// Action Types

export const Types = {
    ADD: 'categories/ADD',
    EDIT: 'categories/EDIT',
    REMOVE: 'categories/REMOVE',
    SELECT: 'categories/SELECT',
    UNSELECT: 'categories/UNSELECT',
    WITHOUT_CATEGORY_SELECT: 'categories/WITHOUT_CATEGORY_SELECT',
    WITHOUT_CATEGORY_UNSELECT: 'categories/WITHOUT_CATEGORY_UNSELECT',
    UNSELECT_ALL: 'categories/UNSELECT_ALL',
    LOAD_STARTED: 'categories/LOAD_STARTED',
    LOAD_SUCCESS: 'categories/LOAD_SUCCESS',
    LOAD_FAILURE: 'categories/LOAD_FAILURE'
}

// Reducer

const initialState = {
    withoutCategory: false,
    all: [
        { id: '1', name: 'Mercado', ceil: 100, selected: false },
        { id: '2', name: 'Lanches', ceil: 200, selected: false }
    ]
}

export default function reducer(state = initialState, action) {
    const categories = [...state.all]

    switch (action.type) {
        case Types.ADD:
            return {
                ...state,
                all: [
                    ...categories,
                    action.payload
                ]
            }

        case Types.EDIT:
            return {
                ...state,
                all: categories.map(c => {
                    if (c.id === action.payload.id) {
                        return { ...c, ...action.payload }
                    }

                    return c
                })
            }

        case Types.REMOVE:
            return {
                ...state,
                all: categories.filter(c => c.id !== action.payload)
            }

        case Types.SELECT:
            return {
                ...state,
                all: categories.map(c => {
                    if (c.id === action.payload) {
                        return { ...c, selected: true }
                    }

                    return c
                })
            }

        case Types.UNSELECT:
            return {
                ...state,
                all: categories.map(c => {
                    if (c.id === action.payload) {
                        return { ...c, selected: false }
                    }

                    return c
                })
            }

        case Types.UNSELECT_ALL:
            return {
                ...state,
                withoutCategory: false,
                all: categories.map(c => ({
                    ...c,
                    selected: false
                }))
            }

        case Types.WITHOUT_CATEGORY_SELECT:
            return {
                ...state,
                withoutCategory: true
            }

        case Types.WITHOUT_CATEGORY_UNSELECT:
            return {
                ...state,
                withoutCategory: false
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
            id,
            ...categoryFields
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

export function withoutCategorySelect() {
    return {
        type: Types.WITHOUT_CATEGORY_SELECT
    }
}

export function withoutCategoryUnselect() {
    return {
        type: Types.WITHOUT_CATEGORY_UNSELECT
    }
}

// Selectors

export function allCategories({ categories }) {
    return categories.all
}

export function allCategoriesById({ categories }) {
    return categories.all.reduce((obj, c) => {
        obj[c.id] = c
        return obj
    }, {})
}

export function countSelectedCategories({ categories: state }) {
    return state.all.filter(c => c.selected).length
}

export function isWithoutCategory({ categories: state }) {
    return state.withoutCategory
}

// Thunks

export function load() {
    return dispatch => {
        dispatch({
            type: Types.LOAD_STARTED
        })
    }
}