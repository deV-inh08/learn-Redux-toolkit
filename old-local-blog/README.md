# How to use createAction and configure Store in Redux

- Configure Store: in file store.ts (global)

- Wrap main.tsx with Provider and store

- Created reducer by function (createReducer). Have callback (builder) and we can (addCase)
    + Additionally, there is an advanced usage of reducers called 'addMatcher', 'addDefaultCase'

- In addition to using the builder callback, there is also the Map Object approach. However, Map Object does not have good TS support, so it's recommended to use the builder callback when working with TS.


- Custom action ==> prepare callback in <createAction>(_, () => {...})