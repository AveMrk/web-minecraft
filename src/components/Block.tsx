import * as THREE from 'three';
import { useCubeTexture } from '@react-three/drei';
import grassTextureTop from '../assets/grass_top.jpg'
import grassTextureSide from '../assets/grass_side.jpg'
import grassTextureBottom from '../assets/grass_bottom.jpg'
import { RigidBody } from '@react-three/rapier';
import { RigidBodyProps } from '@react-three/rapier';
import { RefAttributes } from 'react';


export const Block = (props:Omit<RigidBodyProps & RefAttributes<typeof RigidBody>, "ref">) => {
  const loader = new THREE.TextureLoader();
  const materialsArr = [
    new THREE.MeshBasicMaterial({map: loader.load( grassTextureSide), transparent: false, opacity:1, alphaMap:loader.load( grassTextureSide), color:'#766F69'}),
    new THREE.MeshBasicMaterial({map: loader.load( grassTextureSide), transparent: false, opacity:1, color:'#766F69'}),
    new THREE.MeshBasicMaterial({map: loader.load( grassTextureTop), transparent: false, opacity:1, color:'#766F69'}),
    new THREE.MeshBasicMaterial({map: loader.load( grassTextureBottom), transparent: false, opacity:1,color:'#766F69'}),
    new THREE.MeshBasicMaterial({map: loader.load( grassTextureSide), transparent: false, opacity:1,color:'#766F69'}),
    new THREE.MeshBasicMaterial({map: loader.load( grassTextureSide), transparent: false, opacity:1,color:'#766F69'})
  ];
  return (
    <RigidBody {...props}>
        <mesh castShadow  receiveShadow position={[5, 5, 5]} material={materialsArr}>
            <boxGeometry args={[5, 5, 5]}/>

        </mesh>

    </RigidBody>
    
  )
}