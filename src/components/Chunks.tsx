import { useState } from "react";
import { chunks } from "../chunks";
import { Blocks } from "./Blocks";

export const Chunks = () => {

  return (
      <>
     {chunks.map((chunk, index) => 
        <Blocks key={index} blocks={chunk}></Blocks>
     )}

      </>
  )
}