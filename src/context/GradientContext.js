import { createContext, useReducer } from 'react'

const GradientContext = createContext()

let initialState = {
  max: 100,
  activeTab: 1,
  showAllLayers: false,
  layers: [
    {
      id: 1,
      thumbValues: [
        { id: 1, color: '#ffffff', stop: 0 },
        { id: 2, color: '#343434', stop: 100 },
      ],
      position: `10% 10% / 250px 250px`,
    },
    {
      id: 2,
      thumbValues: [
        { id: 1, color: '#a30000', stop: 0 },
        { id: 2, color: '#ee8128', stop: 100 },
      ],
      position: `30% 30% / 250px 250px`,
    },
    {
      id: 3,
      thumbValues: [
        { id: 1, color: '#00a372', stop: 0 },
        { id: 2, color: '#000ba3', stop: 100 },
      ],
      position: `50% 50% / 250px 250px`,
    },
  ],
}

let reducer = (state, action) => {
  switch (action.type) {
    case 'SET-ACTIVE-TAB':
      return {
        ...state,
        activeTab: action.payload.activeTab,
      }
    case 'ADD-NEW-TAB':
      return {
        ...state,
        activeTab: state.layers.length + 1,
        layers: [
          ...state.layers,
          {
            id: state.layers.length + 1,
            thumbValues: [
              { id: 1, color: '#ffffff', stop: 0 },
              { id: 2, color: '#343434', stop: 100 },
            ],
            position: `70% 70% / 250px 250px`,
          },
        ],
      }
    case 'UPDATE-GRADIENT-VAL':
      return {
        ...state,
        layers: state.layers.map((layer) =>
          layer.id !== state.activeTab
            ? layer
            : {
                ...layer,
                thumbValues: layer.thumbValues.map((val) =>
                  val.id !== action.payload.id
                    ? val
                    : { ...val, stop: parseInt(action.payload.new) }
                ),
              }
        ),
      }
    default:
      return { ...state }
  }
}

const GradientProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }

  return <GradientContext.Provider value={value} {...props} />
}

export { GradientContext, GradientProvider }
