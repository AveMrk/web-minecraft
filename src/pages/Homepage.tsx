import React from 'react';
import { PointerLockControls, Sky } from '@react-three/drei';
import { Ground} from '../components/Ground'
import { Physics} from '@react-three/rapier';
import { Player } from '../components/Player';
import { Blocks } from '../components/Blocks';
import { Chunks } from '../components/Chunks';
//import {Goat} from './components/Mobs/Goat'
const shadowOffset = 50;

export const Homepage = () =>{
  return (
    <>    
    <PointerLockControls/>
    
     
      <Sky sunPosition={[100,100,100]}/>
      <directionalLight
        castShadow
        intensity={1.5}
        position={[100,100,0]}
        shadow-mapSize={4096}
        shadow-camera-top={shadowOffset}
        shadow-camera-bottom={-shadowOffset}
        shadow-camera-left={shadowOffset}
        shadow-camera-right={-shadowOffset}
      />
      
      <ambientLight intensity={1.5}/>
      <Physics gravity={[0, -20, 0]}>
      {/*<Ground/>*/}
        <Player></Player>
       {/* <Blocks/>*/}
       <Chunks></Chunks>
      </Physics>
      </>

  )
}