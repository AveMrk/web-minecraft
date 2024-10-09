import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import grassTexture from '../assets/grass_top.png'
import { CuboidCollider, RigidBody } from '@react-three/rapier';

export const Ground = () => {
  const texture = useTexture(grassTexture);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return (
    <RigidBody type="fixed" colliders={false}>
    <mesh receiveShadow position={[0, 0, 0]} rotation-x={-Math.PI/2}>
      <planeGeometry args={[500, 500]}></planeGeometry>
      <meshStandardMaterial color="green" map={texture} map-repeat={[360, 360]}></meshStandardMaterial>
    </mesh>
    <CuboidCollider args={[500, 2, 500]} position={[0, -2, 0]}/>
    </RigidBody>
  )
}