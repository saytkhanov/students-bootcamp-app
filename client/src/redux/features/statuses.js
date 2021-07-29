const initialState = {
  items: [],
  loading: false,
  error: null
}


export default function reducers( state= initialState, action) {
  switch (action.type){
    case "statuses/load/pending":
      return {
        ...state,
        loading: true
      }
    case "statuses/load/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload
      }
    case "statuses/create/pending":
      return  {
        ...state,
        loading: true
      };
    case "statuses/load/rejected":
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case "statuses/create/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload
      }
    default:
      return state
  }
}


export const loadStatuses = () => {
  return async (dispatch) => {
    dispatch({type: "statuses/load/pending" })
   try {
     const response = await fetch(`/statuses`)
     const json = await response.json();
     dispatch({
       type:"statuses/load/fulfilled",
       payload: json
     })
   } catch (e) {
     dispatch({ type: 'statuses/load/rejected', error: e.toString() });
   }
  }
}

export const postStatus = (data) => {
  return async (dispatch) => {
    dispatch({type: "statuses/create/pending" });
    const response = await fetch('/status',
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        });
    const json = await response.json();
    dispatch({
      type: "statuses/create/fulfilled",
      payload: json
    })
  }
}

export const selectStatuses = (state) => state.statuses.items
export const selectLoadingStatuses = (state) => state.statuses.loading;
