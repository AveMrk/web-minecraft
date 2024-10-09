import { useEffect, useState } from "react";
export const usePersonalControls = () => {
  const keys = {
    KeyW: 'forward',
    KeyS: 'backward',
    KeyA: 'left',
    KeyD: 'right',
    Space: 'jump',
  }

  const moveFieldByKey = (key:'KeyW'| 'KeyS' | 'KeyA' | 'KeyD' | 'Space') => keys[key];

  const [movement, setMovement] = useState({
    forward: 0,
    backward: 0,
    left: 0,
    right: 0,
    jump: 0
  })
 
  const setMovementStatus = (code:any, status:any) => {
    setMovement((m) => ({...m, [code]: status}))
  }
  
  useEffect(()=>{
    const handleKeyDown = (ev:any) => {
      setMovementStatus(moveFieldByKey(ev.code), 1)
    }
    const handleKeyUp = (ev:any) => {
      setMovementStatus(moveFieldByKey(ev.code), 0)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  })
  return movement;
}

// export const useActions = () => {
//   const [action, setAction] = useState(false);
//   useEffect(()=>{
//     //mousedown
//     const handleMouseDown = (ev:Event) => {
//       setAction(true);
//     }
//     document.addEventListener('mousedown', handleMouseDown)

//     return () => {
//       document.addEventListener('mousedown', handleMouseDown)
//     }
//   })
//   return action;
// }
