import * as THREE from'three';
import { Perlin } from "./perlin";
let perlin = new Perlin();
//perlin.seed(Math,random())

let xoff = 0;
let zoff= 0;
let inc = 0.05;
let amplitude = 30 + (Math.random()*70);

export type Chunk = THREE.Vector3[];

export let renderDistance = 3;
export let chunkSize = 10;

export const createChunks = () => {
let chunks:Chunk[] = [];

  for(let i=0; i < renderDistance; i++){
    for(let j=0; j< renderDistance; j++){
      let chunk:Chunk = [];
      for(let x = i*chunkSize; x <(i*chunkSize)+chunkSize; x++){
        for(let z = j*chunkSize; z <(j*chunkSize)+chunkSize; z++){
          xoff = inc*x;
          zoff = inc*z;
          let v = Math.round(perlin.noise(xoff, zoff) * amplitude /5)*5;
          
          
          chunk.push(new THREE.Vector3(x*5, v, z*5));
        }
      }
      chunks.push(chunk)
  
    }
  }
  return chunks;
}
export const chunks = createChunks();

console.log(chunks)

// function createBlocks() {
//   let blocks:THREE.Vector3[] = [];

//     for(let x=0; x <=20; x++){
//       xoff = 0;
//       for(let z=0; z< 20; z++){
//         var v = Math.round(perlin.noise(xoff, zoff) * amplitude / 5) *5;
//         blocks.push(new THREE.Vector3(x*5, v, z*5));
//         xoff += inc;
//         }
//       zoff += inc; 
//     }
//     return blocks;
    
// }
//export default blocks;