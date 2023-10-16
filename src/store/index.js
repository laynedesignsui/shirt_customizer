//? global states

import { proxy } from "valtio";

const state = proxy({

    // are we on the homepage
    intro: true,

    // the default color
    color: '#5A5A5A',

    // are we currently displaying the logo on shirt
    isLogoTexture: true,

    // we are currently displaying the decal on the shirt
    isFullTexture: false,

    // the initial decal image
    logoDecal: './starter_logo.png',

    // the initial full t-shirt decal
    fullDecal: './starter_decal.png'
    
});

export default state;