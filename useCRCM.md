# useCRMC === use{Conext||Reducer||Callback||Memo}
- Why use more than the three basic Hooks (State, Ref, Effect)?
    - Improved performance
    - Global config support 
    - Cleaner code & a richer set of features

## React v16.3.0 March 29, 2018
- React team shipped new Context API to make accessing data very simple and straightforward
    - without this, prop drilling and HOCs were prevalent (ugly)
    - useContext Hook allows one to access data in any functional components without any unnatural acts
    - Creating wrapping tags in render events that have nothing to do with the UI become obsolete 
    - storing configurational information in your app and having it available in any functional component you want 

## useContext
- create shareContext at some level where all data below that level in the react component tree can share the data 
- share data without having to pass props into components 
- Creating a routing component like this might feel awkward *but*
    - do it because of how next.js routes to individual js files in pages directory
    - this allows for a single root in src directory that all pages share from
    - Navigate to app, create a context, and export it so that all other functional components may use it 


## useReducer
- useState is built on top of useReducer with a very thin layer between them 
- Reducer Defined
    - function that takes in a previous state as first parameter 
    - an action as the second parameter
    - and returns a new state
- (previousState, action) => newState
- think of it as useState, it's just useReducer has a default action type
- create more action types as we need them and have a very clear place to do state reductions  

## What is memoization?
- A method for returning cached results 


## useCallback
- caches a function
- useCallback will return a memoized version of the callback that only changes if one of the inputs has changed


## useMemo
- caches a value 
- memoizing values
- caches data on client saving compute time in the app and making it more responsive