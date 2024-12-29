- createSlice = createReducer + createAction

should be usage createSlie 

createSlice is Object : {
  name,
  initalState,
  reducers {

    increment: () => {
      ...
    },

    decrement: () => {
      ...
    }

  }
}


export action  { increment, decrement } ==> createSlice.actions


*** extraReducer ***
  + addCase
  + addMatcher
  + addDefaultCase