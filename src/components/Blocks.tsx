import {RigidBody} from "@react-three/rapier";
//import blocks from "../blocks.json";
import * as THREE from 'three';
import { Block } from "./Block";
import { Chunk } from "../chunks";
//import blocks from "../blocks";
type BlockProps = {
  blocks: Chunk;
}
export const Blocks = (props:BlockProps) => {
  const {blocks} = props;
    return (
      <>
     {blocks.map((coords, index) => <Block key={index} position={coords} type="fixed"/>)}

      </>
    )
}

