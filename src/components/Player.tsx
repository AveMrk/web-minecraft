import * as THREE from 'three'
import * as RAPIER from '@dimforge/rapier3d-compat'
import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier";
import { useRef, useState } from 'react';
import { usePersonalControls} from '../hooks';
import { useFrame } from '@react-three/fiber';
import { Pickaxe } from './Pickaxe';
import {chunks} from '../chunks';
import { chunkSize,renderDistance } from '../chunks';

const x = renderDistance * chunkSize / 2 *5;
const y = renderDistance * chunkSize / 2 *5;
const z = 50;
const MOVE_SPEED = 15;
let JUMP_SPEED = 0;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const rotation = new THREE.Vector3();

export const Player = () => {
  const playerRef = useRef<any>();
  const {forward, backward, left, right, jump} = usePersonalControls();
  // const action = useActions();
  const objectInHandRef = useRef<any>();

  const swaingObjectRef = useRef<any>();
  const [swaingAnimation, setSwaingAnimation] = useState(null);
  const [swaingBackAnimation, setSwaingBackAnimation] = useState(null);
  const [isswaingAnimationFinished, setSwaingAnimationFinished] = useState(true);


  const rapier = useRapier();

  useFrame((state) => {
    if(!playerRef.current) return;

    const velocity = playerRef.current.linvel();

    frontVector.set(0, 0, backward - forward);
    sideVector.set(left - right, 0, 0);
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(MOVE_SPEED).applyEuler(state.camera.rotation);

    playerRef.current.wakeUp();
    playerRef.current.setLinvel({x: direction.x, y: velocity.y, z: direction.z});


    //jumping

    const world = rapier.world;
    let maxToi = 4.0;
    let solid = true;
    const ray = world.castRay(new RAPIER.Ray(playerRef.current.translation(), {x:0, y: -1, z: 0}), maxToi, solid);
    const grounded = ray && ray.collider && Math.abs(ray.timeOfImpact) <=1.5;

    if(jump && grounded) doJump(state.camera);

    //moving camera
    const {x, y, z} = playerRef.current.translation();
    state.camera.position.set(x, y, z)

    //moving object in hand
    if(!objectInHandRef.current) return;
    objectInHandRef.current.rotation.copy(state.camera.rotation);
    objectInHandRef.current.position.copy(state.camera.position).add(state.camera.getWorldDirection(rotation));

  })
  //@ts-ignore
  const doJump = (camera) =>{
    // JUMP_SPEED += 1;
    // for(let i = 0; i < blocks.length; i++){
    //   if(camera.position.x <= blocks[i].x +2.5 
    //     && camera.position.x >= blocks[i].x - 2.5 
    //     && camera.position.z <= blocks[i].z + 5 
    //     && camera.position.z >= blocks[i].z){
    //       if(camera.position.y < blocks[i].y){
    //         camera.position.y = blocks[i].y;
    //         JUMP_SPEED = 0;
    //         break;
    //       }

    //   }
    // }
    playerRef.current.setLinvel({x:0, y:10, z: 0})
  }
  const lovestZBlock = () =>{
    let ZBlockArray = [];
    for(let i= 0; i < chunks.length; i++){
        for(let j = 0; j < chunks.length; j++){
          //@ts-ignore
          ZBlockArray.push(chunks[i][j].z);
        }
    }
    return Math.min.apply(null, ZBlockArray)
  }
  const higestZBlock = () => {
    let ZBlockArray = [];
    for(let i= 0; i < chunks.length; i++){
        for(let j = 0; j < chunks.length; j++){
          //@ts-ignore
          ZBlockArray.push(chunks[i][j].z);
        }
    }
    return Math.max.apply(null, ZBlockArray)
  }
  const lovestXBlock = () =>{
    let XBlockArray = [];
    for(let i= 0; i < chunks.length; i++){
        for(let j = 0; j < chunks.length; j++){
          //@ts-ignore
          XBlockArray.push(chunks[i][j].x);
        }
    }
    return Math.min.apply(null, XBlockArray)
  }
  const higestXBlock = () => {
    let XBlockArray = [];
    for(let i= 0; i < chunks.length; i++){
        for(let j = 0; j < chunks.length; j++){
          //@ts-ignore
          XBlockArray.push(chunks[i][j].x);
        }
    }
    return Math.max.apply(null, XBlockArray)
  }

  return (
    <>
      <RigidBody position={[x, y, z]} mass={1} ref={playerRef} lockRotations>
        <mesh castShadow>
          <capsuleGeometry args={[0.5, 0.5]}/>
          <CapsuleCollider args={[10, 0.5]}/>
        </mesh>
      </RigidBody>
    </>
  )
}