const initialState = {
  items: [],
  loading: false,
  editing: false,
  error: null
}


export default function reducers( state= initialState, action) {
  switch (action.type){
    case "notes/load/pending":
      return {
        ...state,
        loading: true
      }
    case "notes/load/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload
      }
    case "notes/load/rejected":
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case "notes/create/pending":
      return {
        ...state,
        loading: true
      }
    case "notes/create/fulfilled":
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload]
      }
    case "notes/edit/pending":
      return  {
        ...state,
        editing: true
      };
    case "notes/edit/fulfilled":
      return {
        ...state,
        editing: false,
        items: state.items.map((item) => {
          if(item._id === action.payload.id) {
            return {
              ...item,
              ...action.payload.data
            }
          }
          return item
        })
      }
    default:
      return state
  }
}


export const loadNotes = (id) => {
  return async (dispatch) => {
    dispatch({type: "notes/load/pending" })
    try {
      const response = await fetch(`http://localhost:3004/student/${id}/note`)
      const json = await response.json();
      dispatch({
        type: "notes/load/fulfilled",
        payload: json
      })
    } catch (e) {
      dispatch({ type: 'notes/load/rejected', error: e.toString() });
    }
  }
}

export const editNote = (id, data) => {
  return async (dispatch) => {
    dispatch({type: "notes/edit/pending" });
      await fetch(`http://localhost:3004/note/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
    dispatch({
      type: "notes/edit/fulfilled",
      payload: { data, id }
    })
  }
}

export const postNote = (id, data) => {
  return async (dispatch) => {
    dispatch({type: "notes/create/pending" });
    const response = await fetch(`http://localhost:3004/student/${id}/note`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
    const json = await response.json()
    dispatch({
      type: "notes/create/fulfilled",
      payload:  json
    })
  }
}


export const selectNotes = (state) => state.notes.items;
export const selectLoadingNotes = (state) => state.notes.loading
export const selectEditingNotes = (state) => state.notes.editing

