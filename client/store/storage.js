//persisting redux state to local storage

//loads the state from localStorage

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (!serializedState) return undefined
    else return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

// Saves the state to localStorage

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    console.log(err)
  }
}
