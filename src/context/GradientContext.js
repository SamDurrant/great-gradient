import { createContext, useReducer } from 'react'
import { v4 } from 'uuid'

const GradientContext = createContext()

let initialState = {
  max: 100,
  activeTab: 'All',
  showAllLayers: false,
  layers: [
    {
      id: v4(),
      index: 1,
      degrees: 90,
      thumbValues: [
        { id: '1', color: '#FFFFFF', stop: 0 },
        { id: '2', color: '#343434', stop: 100 },
      ],
      position: `10% 10% / 250px 250px`,
    },
    {
      id: v4(),
      index: 2,
      degrees: 75,
      thumbValues: [
        { id: '1', color: '#A30000', stop: 0 },
        { id: '2', color: '#EE8128', stop: 100 },
      ],
      position: `30% 30% / 250px 250px`,
    },
    {
      id: v4(),
      index: 3,
      degrees: 45,
      thumbValues: [
        { id: '1', color: '#00A372', stop: 0 },
        { id: '2', color: '#A30000', stop: 50 },
        { id: '3', color: '#000BA3', stop: 100 },
      ],
      position: `50% 50% / 250px 250px`,
    },
  ],
}

let reducer = (state, action) => {
  switch (action.type) {
    case 'SET-ACTIVE-LAYER':
      return {
        ...state,
        activeTab: action.payload.activeLayer,
      }
    case 'ADD-NEW-LAYER':
      let newId = v4()
      return {
        ...state,
        activeTab: newId,
        layers: [
          ...state.layers,
          {
            id: newId,
            index: state.layers.length + 1,
            degrees: 90,
            thumbValues: [
              { id: 1, color: '#ffffff', stop: 0 },
              { id: 2, color: '#343434', stop: 100 },
            ],
            position: `70% 70% / 250px 250px`,
          },
        ],
      }
    case 'REMOVE-LAYER':
      let filtered = state.layers
        .filter((layer) => layer.id !== action.payload.id)
        .map((layer, i) => {
          return { ...layer, index: i }
        })
      let active = filtered[0].id
      return {
        ...state,
        layers: [...filtered],
        activeTab: active,
      }
    case 'TOGGLE-ALL-LAYERS':
      return {
        ...state,
        showAllLayers: !state.showAllLayers,
      }
    case 'ADD-GRADIENT-TO-LAYER':
      return {
        ...state,
        layers: state.layers.map((layer) =>
          layer.id !== state.activeTab
            ? layer
            : {
                ...layer,
                thumbValues: [
                  ...layer.thumbValues,
                  { id: v4(), color: '#F8F9FA', stop: action.payload.stop },
                ],
              }
        ),
      }
    case 'REMOVE-GRADIENT-FROM-LAYER':
      return {
        ...state,
        layers: state.layers.map((layer) =>
          layer.id !== state.activeTab
            ? layer
            : {
                ...layer,
                thumbValues: layer.thumbValues.filter(
                  (tv) => tv.id !== action.payload.colorid
                ),
              }
        ),
      }
    case 'UPDATE-DEGREE-VAL':
      return {
        ...state,
        layers: state.layers.map((layer) =>
          layer.id !== state.activeTab
            ? layer
            : {
                ...layer,
                degrees: parseInt(action.payload.new),
              }
        ),
      }
    case 'UPDATE-COLOR-VAL':
      return {
        ...state,
        layers: state.layers.map((layer) =>
          layer.id !== state.activeTab
            ? layer
            : {
                ...layer,
                thumbValues: layer.thumbValues.map((tv) =>
                  tv.id !== action.payload.colorid
                    ? tv
                    : { ...tv, color: action.payload.color.toUpperCase() }
                ),
              }
        ),
      }
    case 'UPDATE-COLOR-STOP':
      return {
        ...state,
        layers: state.layers.map((layer) =>
          layer.id !== state.activeTab
            ? layer
            : {
                ...layer,
                thumbValues: layer.thumbValues.map((tv) =>
                  tv.id !== action.payload.colorid
                    ? tv
                    : { ...tv, stop: action.payload.stop }
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
