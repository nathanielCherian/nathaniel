---
path: "/large-wooden-lego-brick-purdue"
date: 2024-2-10
title: "Project: Making a Large Wooden Lego Block"
summary: "I know nothing about manufacturing so I decided to utilize resources at Purdue's Bechtel Innovation Design Center to learn a bit more and make a larger than life lego block out of wood."
status: draft
tags: 'projects'
---

On the morning of Monday Jan 29th 2024 at around 9:30AM I had just woken up but didn't feel like getting out of bed. It was too early, I didn't have class, and I didn't have any work to do.

Thats when the idea just popped in my head: how cool would it be to have a massive wooden lego block just sitting on my desk. I wasn't sure if this was even possible, but then I remembered our school's massive makerspace: Bechtel Innovation Design Center (BIDC).

![](https://www.purdue.edu/bidc/wp-content/uploads/2020/04/Bechtel-DSC_0066_edit-featured.jpg)

I hopped out of bed, joined the BIDC discord and asked for a consult. I described my vision of the lego block and got connected with a woodshop expert. I went back later that day and met with him in person. I wanted the block to be made out of a single piece of wood, so he recommended using the CNC gantry. He was kind enough to walk me through the process of selecting wood, creating stock, and finally creating the g-code for the gantry.

### Step 1: Choosing The Wood
I went down to the stock room and chose a nice plank of Yellow Poplar wood. I took note of the dimensions and began my CAD model.

On Saturday Feb 3, I booked my first reservation to cut out my stock. It was successful! I now had a 5 x 8 x 2.25 block of wood. 

### Step 2: Creating the CAD model
I study computer science, and have never needed to use the software Fusion360. But I found a tutorial for a [simple lego brick](https://www.youtube.com/watch?v=6yPKMSb6ja8). This was surprisingly easy, and fun. 

### Step 3: Creating the CAM model
Once I had the stock and the model, I had to create the CAM, which is the path the gantry will take to machine out the lego brick.

First was to cut out the top face of the block. This was pretty straightforward. I Just had to be mindful of the spacing of the studs and the drill bit diameter. 

![](blog/wooden_lego/lego_top.gif)

Next was to do the bottom of the brick. This was significantly more challenging and required making some sacrifices: how big did I want the block to be, how did I want the inside to look, was I willing to give up some details.

![](blog/wooden_lego/lego_bottom.gif)

This was an interesting process. I had to try out many different paths and watch for "collisions" in the simulation. This took alot of trial and error. I worked alot with a TA at BIDC who worked me through this process. Because of his experience he could explain why even though the simulation looked fine, the path might hurt the model and/or the machine.

### Reflections
I'm glad I had the opportunity to do this project. I want to use this momentum to get involved in other projects on campus that I otherwise would never get the chance to do. I love doing computer science, but I also want to learn so much more. 