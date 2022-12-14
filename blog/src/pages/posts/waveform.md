---
path: "/audio-waveform"
date: 2022-12-13T18:03:48.000Z
title: "How I built the audio waveform visualizer"
summary: "Ill do this later"
image: ""
twitterImage: ""
ogImage: ""
---

Recently, I updated to ios16 and noticed that when I play music, a little waveform visualizer shows up by the song that is currently playing.

![waveform visualizer in ios16](/blog/audio/ios16.png)

I thought it would be cool to make this. The following is my journey in doing so. It's like an annotated bibliography of sorts. 

# Research
Honestly, I didn't even know the terminology for those bouncing bars but I guess they are called "audio waveform visualizers." Something like [this](https://www.youtube.com/watch?v=QBdsQBoAUc4).

I found this [article](https://css-tricks.com/making-an-audio-waveform-visualizer-with-vanilla-javascript/) on CSS-tricks by [Matthew Ström](https://css-tricks.com/author/matthewstrom/) which showed how to use Javascript's API to decode and inspect audio data. 

I used this code to visualize the data from a 6-second sample of a song. 
![the wave](/blog/audio/wave.png)

Definatly a wave. 

However, to visualize the waveform, I need to extract the different frequencies used at any given time in the song. 

Introduce the fourier transform. 

This algorithim converts a composite sin-wave into its different components. I found this [amazing interactive explenation](https://www.jezzamon.com/fourier/) of the Fourier transform by [Jez Swanson](https://www.jezzamon.com/).

Additionally, 3blue1brown made an amazing [video](https://www.youtube.com/watch?v=spUNpyF58BY) that explains this concept visually. 