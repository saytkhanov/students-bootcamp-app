const initialState = {
  items: [],
  loading: false,
  deleting: false,
  error: null
};

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case "students/load/pending":
      return {
        ...state,
        loading: true,
      };
    case "students/load/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case "students/load/rejected":
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case "students/create/pending":
      return {
        ...state,
        loading: true,
      };
    case "students/create/fulfilled":
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload],
      };
    case "students/remove/fulfilled": // удаление началось
      return {
        ...state,
        deleting: false,
        items: state.items.filter((student) => student._id !== action.payload),
      };
    case "students/remove/pending":
      return {
        ...state,
        deleting: true,
      };
    default:
      return state;
  }
}

export const loadStudents = () => {
  return async (dispatch) => {
    dispatch({ type: "students/load/pending" });
   try {
     const response = await fetch(`/all`);
     const json = await response.json();
     dispatch({
       type: "students/load/fulfilled",
       payload: json,
     });
   } catch (e) {
     dispatch({ type: 'students/load/rejected', error: e.toString() });
   }
  };
};

export const createStudent = (data) => {
  return async (dispatch) => {
    dispatch({ type: "students/create/pending" });
    const response = await fetch("https://localhost:3004/student", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data)
    });
    const json = await response.json();
    dispatch({
      type: "students/create/fulfilled",
      payload: json,
    })
  };
};

export const deleteStudent = (id) => {
  return async (dispatch) => {
    dispatch({ type: "students/remove/pending" });
    await fetch(`/student/${id}`, {
      method: "DELETE",
    });
    dispatch({
      type: "students/remove/fulfilled",
      payload: id,
    });
  };
};

export const selectStudents = (state) => state.students.items;
export const selectLoadingStudents = (state) => state.students.loading
export const selectDeletingStudents = (state) => state.students.deleting