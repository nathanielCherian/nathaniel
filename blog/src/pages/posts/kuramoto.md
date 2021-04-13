---
path: "/kuramoto-model"
date: 2021-13-04T18:03:48Z
title: "Spontaneous Synchronization with the Kuramoto Model"
summary: "Simulating the kuramoto model with pendulum osciliators using THREE.js"
---

<b>The kuramoto model is truly a wonder of nature</b> Multiple independent objects can synchronize themselves with nothing more than a simple means of communication. Whether it be pendulums oscilating on a mobile table or fireflies blinking in the trees, this phenomona can be seen in nature all around us.

<figure class="centered">
    <img src = "https://static.toiimg.com/imagenext/toiblogs/photo/blogs/wp-content/uploads/2018/05/fireflie-62111.jpg">
    <figcaption> An enchanted forest and the Fireflies of Malaysia <small><a href="https://timesofindia.indiatimes.com/blogs/incessant-musings/an-enchanted-forest-and-the-fireflies-of-malaysia/">(Times of India)</a></small></figcaption>
</figure>

### How does it work?
The kuramoto model relies on two basic assumptions.
1. The objects in question are *mostly* similar. (you can't pair firelies and pendulums but pendulums of different lengths are okay)
2. There is a coupling factor between the objects that allows for collective influence.

The idea is that each of the induvidual objects, lets call them oscilators (for sinisoidal behavior), is able to affect the collective decision. In turn the collective decision affects all of the induvidual oscilators, bringing them one step closer to equilibrium. 

If that didn't make sense here's a more visual explanation:
<figure class="centered">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/T58lGKREubo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</figure>

Whenever the mass on one of these meternomes swings to one side, the board (which is not fixed to the earth) moves in a opposite and equal way. If all of the pendulums are swinging in the same direction, the board simply mirrors their actions. When the initial positions are staggered the board begans to jerk irregulrarly, to maintain the position of the center of mass. This iregularity either delays or shortens the pendulumns motion, and over time will adjust until their motion is regular.

Now that that's out of the way, let's get into how we can simulate this demonstration on WebGL.

### The Math
When I first looked at this problem, I began to solve it from a physical standpoint by calculating the center of mass and periodicity of the induvidual pendulums but it became clear that this approach would not work. The better solution is to treat each meternome as an oscilator that has a phase from 0 to 2PI radians. This non-linear model can now be simulated as a kuramoto model. 

<figure class="centered">
    <img src = "https://wikimedia.org/api/rest_v1/media/math/render/svg/ea0b4e5c311c1029620dfdae47ca914bf7d68c73">
    <figcaption> The Kuramoto Equation (without noise) <small><a href="https://en.wikipedia.org/wiki/Kuramoto_model">(Wikepedia)</a></small></figcaption>
</figure>

'N' is the total number of oscilators so on every iteration we have to solve for dθ/dt and add this back to the current angle of the oscilator. dθ/dt is defined by the natural frequency (ω) of the oscilator + the weighted average of the different phases. Thinking programatically, we'll have to iterate through our pendulums again to compute the sum of all the phases (Big O nightmare). Kuramoto defined 'K' as the coupling factor, that is how strong the connection between the oscilators is. At a critial value K, the meternomes will converage to equilibrium.


### Coding Simulation
For now I will plot the radians of the meternomes on a canvas element for simplicity.'

<p class="codepen" data-height="432" data-theme-id="light" data-default-tab="js,result" data-user="nathanielcherian" data-slug-hash="GRrxaZW" style="height: 432px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Kuramoto">
  <span>See the Pen <a href="https://codepen.io/nathanielcherian/pen/GRrxaZW">
  Kuramoto</a> by Nathaniel Cherian (<a href="https://codepen.io/nathanielcherian">@nathanielcherian</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
