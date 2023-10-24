// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {Switch} from '../switch'

/**
 * A function that will accept any number of functions
 * and returns a function that accepts any number of arguments
 */
const callAll = (...fns) => {
  return (...args) => {
    fns.forEach(fn => {
      fn && fn(...args)
    })
  }
}

function useToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // This is the props collection strategy
  // const togglerProps = {
  //   'aria-pressed': on,
  //   onClick: toggle,
  // }
  // return {on, toggle, togglerProps}

  const getTogglerProps = ({onClick, ...props} = {}) => {
    return {
      'aria-pressed': on,
      // onClick: () => {
      //   onClick && onClick()
      //   toggle()
      // },
      onClick: callAll(onClick, toggle),
      ...props,
    }
  }

  return {on, toggle, getTogglerProps}
}

// function App() {
//   const {on, togglerProps} = useToggle()
//   return (
//     <div>
//       <Switch on={on} {...togglerProps} />
//       <hr />
//       <button aria-label="custom-button" {...togglerProps}>
//         {on ? 'on' : 'off'}
//       </button>
//     </div>
//   )
// }

// Extra Credit - Prop Getters is the recommended strategy!
function App() {
  const {on, getTogglerProps} = useToggle()
  return (
    <div>
      <Switch {...getTogglerProps({on})} />
      <hr />
      <button
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => console.info('onButtonClick'),
        })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
