# Synth Builder
By Perry Fustero
https://synth-builder.surge.sh  <-- Click here to use Synth Builder!

## Description
Welcome to Synth Builder!  This is a simple to use website that lets you have fun right off the bat.  Start clicking around to see what kind of sounds you can come up with, or read below to learn more about the features.  

If you are familiar with using a basic synthesizer, this site should be pretty straight forward.  If you aren't -- don't worry!  This should still be pretty straight forward.  

## Features
* 'Add Oscillator' button -- Adds another synth to the site.  They can be played in tandem and layered to create complex sounds

#### Oscillator
* On/Off -- Starts and stop each individual oscillator
* Pitch text box -- Enter in a frequency value and press enter for the synth to accept it.  
* Pitch slider -- Slide this bar around to change the pitch
* Wave form -- Change the fundamental oscillator's wave form (sine, square, sawtooth, triangle)
* Partials -- These are the overtones of the wave form.  Add more to create a more dense sounding tone

#### LFO
* Frequency -- Speed/Rate of the effect
* Depth -- Depth of the effect
* Wet/Dry -- The percentage of how much effect is being heard.  All the way left (0) will have the effect not be heard.  All the way right (100) will have the source fully effected

#### Chorus
* Frequency -- Speed/Rate of the effect
* Depth -- Depth of the effect
* Wet/Dry -- The percentage of how much effect is being heard

#### Distortion (Technically BitCrusher)
* Amount -- Intensity of distortion Effect
* Wet/Dry -- The percentage of how much effect is being heard.  All the way left (0) will have the effect not be heard.  All the way right (100) will have the source fully effected

## Technologies Used
* This site is built using the React framework
* Tone.js - built on the Web Audio API supply all the sounds/filters
* npm is used for managing packages
* Javascript, CSS, and HTML