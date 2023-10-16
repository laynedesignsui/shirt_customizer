//? is the homepage for the application

//! ANIMATIONS
import { motion, AnimatePresence } from "framer-motion";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";
//! GLOBAL STATES
import { useSnapshot } from "valtio";
import state from "../store";
//! COMPONENTS
import { CustomButton } from "../components";

const Home = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...slideAnimation("left")}>
          <motion.header {...slideAnimation("down")}>
            <img
              src="./starter_logo.png"
              alt="logo"
              className="w-8 h-8 object-contain"
            />
          </motion.header>

          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                DESIGN <br className="xl:block" /> YOUR TEE
              </h1>
            </motion.div>

            <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-5"
            >
              <p className="max-w-md font-normal -mt-8 text-gray-600">
              Be the designer of your wardrobe. <strong>Turn your ideas into wearable art</strong>{" "}
              with my personalized t-shirt creator, where your style takes center stage
              </p>

              <CustomButton
                type="filled"
                title="Customize It"
                handleClick={() => (state.intro = false)}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;
