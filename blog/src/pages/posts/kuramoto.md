---
path: "/kuramoto-model"
date: 2021-04-10T18:03:48.000Z
title: "Spontaneous Synchronization with the Kuramoto Model"
summary: "Simulating the Kuramoto model with metronome oscillators using THREE.js"
---


<figure class="centered big-image">
    <img src = "/blog/kuramoto/fireflies.webp">
    <figcaption> An enchanted forest and the Fireflies of Malaysia <small><a href="https://timesofindia.indiatimes.com/blogs/incessant-musings/an-enchanted-forest-and-the-fireflies-of-malaysia/">(Times of India)</a></small></figcaption>
</figure>

<b>The Kuramoto model is truly a wonder of nature</b> Multiple independent objects can synchronize themselves with nothing more than a simple means of communication. Whether it be pendulums oscillating on a mobile table or fireflies blinking in the trees, this phenomenon can be seen in nature all around us.


### How does it work?
The Kuramoto model relies on two basic assumptions.
1. The objects in question are *mostly* similar. (you can't pair fireflies and pendulums but pendulums of different lengths are okay)
2. There is a coupling factor between the objects that allows for collective influence.

The idea is that each of the individual objects, let us call them oscillators (for their sinusoidal behavior), can affect the collective movement. In turn the collective decision affects all of the individual oscillators, bringing them one step closer to equilibrium. 

If that didn't make sense here's a more visual explanation:
<figure class="centered">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/T58lGKREubo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</figure>

Whenever the mass on one of these metronomes swings to one side, the board (which is not fixed to the earth) moves in an opposite and equal way. If all of the pendulums are swinging in the same direction, the board simply mirrors their actions. When the initial positions are staggered the board begins to jerk irregularly, to maintain the position of the center of mass. This irregularity either delays or shortens the pendulum's motion, and over time will adjust until their motion is regular.

Now that that's out of the way, let's get into how we can simulate this demonstration on WebGL.

### The Math
When I first looked at this problem, I began to solve it from a physical standpoint by calculating the center of mass and periodicity of the individual pendulums but it became clear that this approach would not work. The better solution is to treat each metronome as an oscillator that has a phase from 0 to 2PI radians. This non-linear model can now be simulated as a Kuramoto model. 

<figure class="centered">
    <img src = "https://wikimedia.org/api/rest_v1/media/math/render/svg/ea0b4e5c311c1029620dfdae47ca914bf7d68c73">
    <figcaption> The Kuramoto Equation (without noise) <small><a href="https://en.wikipedia.org/wiki/Kuramoto_model">(Wikepedia)</a></small></figcaption>
</figure>

'N' is the total number of oscillators so on every iteration we have to solve for dθ/dt and add this back to the current angle of the oscillator. dθ/dt is defined by the natural frequency (ω) of the oscillator + the weighted average of the different phases. Thinking programmatically, we'll have to iterate through our pendulums again to compute the sum of all the phases (Big O nightmare). Kuramoto defined 'K' as the coupling factor, that is how strong the connection between the oscillators is. At a critical value K, the metronomes will converge to equilibrium.


### Coding The Simulation

The steps to code the math behind this model is very straightforward.

@ Every Time interval 't'
- Iterate over oscillators (i)
- For every oscillator, iterate over the list again (j)
- Sum the sin of the phase difference sin(θj - θi) and take weighted average with constant K
- Add to the natural frequency (constant for now) to get Δθ
- **Wait until i . . N complete before adding Δθ**

This will look something like this ...

<iframe 
    width="100%"
    height="800px"
    scrolling="no" seamless="seamless"
    src="data:text/html;charset=utf-8,
    <head><base target='_blank' /></head>
    <body><script src='https://gist.github.com/nathanielCherian/dcbbb8245f3f9cc35d2586e54a1fb467.js'></script>
    </body>">
</iframe>


It can be confusing to see what's happening by reading the values in the console so I'll display the values as dots moving around a unit circle with a Canvas.

<iframe height="500" style="width: 100%;" scrolling="no" title="Kuramoto p1" src="https://codepen.io/nathanielcherian/embed/preview/GRrxaZW?height=265&theme-id=dark&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/nathanielcherian/pen/GRrxaZW'>Kuramoto p1</a> by Nathaniel Cherian
  (<a href='https://codepen.io/nathanielcherian'>@nathanielcherian</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

All of the dots start with different phases but end up converging together.

This is a great starting point but how do we transform it into the swing of a metronome?

Because a metronome's motion is sinusoidal, we can simply take the cosine of each of the oscillators. This will give us a range of numbers between -1 and 1. We'll assign a constant 'D' for our metronomes degree of rotation, PI/6 radians (30 deg.) in this case, and multiply it by the cosine we took earlier to give us a windshield-wiper like motion.

As I am now using THREE.JS to model the code, I will use the built-in renderer timer instead of the native ```setInterval()```, but the rest of the code can be kept exactly the same. THREE.JS allows us to create and rotate planes so for each metronome we'll create a new bar and place it on its own plane. These planes store their own rotation values so we can simply plug those values into our Kuramoto function.

Now all that's left to do is to model the movement of the board that is holding the metronomes. This can be done easily by adding up the cosines of all of the individual oscillators and mapping that position to the block object. Now the block will accurately represent the motion of all the metronomes.
