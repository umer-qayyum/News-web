const Reducer = (state, action) => {
    if (action.type=="SET_LOADING") {
        return {
            ...state,
            isLoading: true,
          };
    }
        
         
  if (action.type == "GET_SERVICES") {
    return {
      ...state,
      isLoading: false,
      hits: action.payload.hits,
      nbPages:action.payload.nbPages
    };
  }
  if (action.type == "REMOVING") {
    return {
      ...state,
      hits: state.hits.filter((val) => {
        return val.objectID !== action.payload;
      }),
    };
  }
  if ("SEARCH_QUERY") {
    return {
      ...state,
      query: action.payload,
    };
  }
  if ("NEXT_PAGE") {
    let pageNumInc = state.page + 1;

    if (pageNumInc >= state.nbPages) {
      pageNumInc = 0;
    }
    return {
      ...state,
      page: pageNumInc
    };
  }

  if ("PREV_PAGE") {
    let pageNum = state.page - 1;

    if (pageNum <= 0) {
      pageNum = 0;
    }

    return {
      ...state,
      page:pageNum
    };
  }

  return state;
};
export default Reducer;
