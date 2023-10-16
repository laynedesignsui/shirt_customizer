//? back splash of color for the t-shirt

//! MUTABLE REFERENCE TO DOM
import { useRef } from "react";
//! ANIMATION FUNCTION
import { easing } from "maath";
//! UPDATE ON EVERY FRAME CHANGE
import { useFrame } from "@react-three/fiber";
//! HELPER FUNCTIONS
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";

const Backdrop = () => {
  const shadows = useRef();

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={120}
      alphaTest={0.2}
      scale={5}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.4}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={5}
        intensity={0.25}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
};

export default Backdrop;
