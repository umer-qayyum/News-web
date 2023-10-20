import React, { useContext, useReducer, useEffect } from "react";
import Reducer from "./Reducer";
let API = "http://hn.algolia.com/api/v1/search?";
let initialState = {
    isLoading: true,
  query: "CSS",
  page: 0,
  nbPages: 0,
  hits: [],
};
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const fetchApiData = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await fetch(url);
      const data = await res.json();
      // console.log(data.hits);
      dispatch({
        type: "GET_SERVICES",
        payload: {
          hits: data.hits,
          nbPages: data.nbPages,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removePost = (postID) => {
    dispatch({
      type: "REMOVING",
      payload: postID,
    });
  };
  const searchPost = (searchQuery) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: searchQuery,
    });
  };
  const getNextPage = () => {
    dispatch({
      type: "NEXT_PAGE",
    });
  };

  const getPrevPage = () => {
    dispatch({
      type: "PREV_PAGE",
    });
  };
  useEffect(() => {
    fetchApiData(`${API}query=${state.query}&page=${state.page}`);
  }, [state.query, state.page]);
  return (
    <AppContext.Provider
      value={{ ...state, removePost, searchPost, getNextPage, getPrevPage }}
    >
      {children}
    </AppContext.Provider>
  );
};
const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider, useGlobalContext };
