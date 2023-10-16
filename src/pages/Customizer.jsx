//? is the page responsible for shirt customization and features various functionality including uploading images, applying decals, and changing colors, with animations and tabs for an interactive user experience

import React, { useState, useEffect } from "react";
import { download } from "../assets";
//! ANIMATIONS
import { AnimatePresence, motion } from "framer-motion";
import { fadeAnimation, slideAnimation } from "../config/motion";
//! GLOBAL STATES
import { useSnapshot } from "valtio";
import state from "../store";
//! COMPONENTS
import { ColorPicker, CustomButton, FilePicker, Tab } from "../components";
//! HELPER FUNCTIONS
import { reader } from "../config/helpers";
//! CONFIG CONSTANTS
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";


const Customizer = () => {
  // states from valtio
  const snap = useSnapshot(state);

  // useState for the file upload
  const [file, setFile] = useState("");

  // the active editor tab - tabs on the left
  const [activeEditorTab, setActiveEditorTab] = useState("");

  // the active filter tab -- tabs on the bottom
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  // show editor tab content depending on the active tab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      default:
        return null;
    }
  };

  // handles retrieving the uploaded file and apply's it to shirt 
  // type = logo/decal
  // result = file code
  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  // handles the on/off of the filter tabs at the bottom
  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };

  // reads the selected file and then processes the file's content using the `handleDecals` function
  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
