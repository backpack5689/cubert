# Cubert
Hello, and welcome to Cubert! A rubiks cube timer website for those with friends!

Our website hopes to streamline the multiplayer process with friends competiting against others by making it easier to compare times, send scrambles to your friends, and even compete at the same time against your friends (*functionality coming soon*).

## The Architecture of Our Site
Our site files are broken into the following 2 sections:

#### Frontend
The frontend contains everything in relation to the way our website *looks*. If you are modifying items in this, you are either going to be utilizing **HTML, CSS, or TypeScript**.

#### Backend
Our backend is all the files that is required in order for the websites to access the database. Pretty much everything here is going to be using **Node.js**, and contain injections of **Mongo Syntax**.

## How we Host our Site
We host our website utilizing an AWS EC2 instance running Ubuntu Server OS. Our server runs the files using Apache 2, and runs the Mongo database as well for site. 



## How to Run the Site Locally
1. Run ```npm install``` in both ```/frontent``` and ```/backend``` *(note this only needs to be done when you don't currently have the packages installed, i.e. in your first run)*
2. In ```/backend```, run ```nodemon server```
3. In ```/frontend``` run ```ng serve```
4. Then access website at ```localhost:4200```

## Notes for those Developing
If you are currently attempting to help with the development of this webapp, please see that the following items are true before submitting a merge request.

**NOTE: Merge requests that do not have the following will not be accepted**
* In ```frontend/service/api.service.ts```, you need to check the variable ```testinglocally``` is set to 0
* If your merge request contains a new package that would need to be installed with ```npm install```, your merge request needs to include a link to a video chat in which you will meet with a official cubert dev to go over the new package

***

# How the frick everything is working

* /frontend/src/index.html is where the landing page is for the website. 
* This is generic and has the <app-root> This is what calls the app.component.html
* This <router-outlet> is what calls special angular routing stuff, to whatever webpages we want to go to.
* app.routing.st is what defines the routing relationships. 
* defaults to /timer, which is what we want the landing page to be.
* now we finally see the say timer page in timerpage-component.html
* {{scramble}} is how we display some kind of variable in html
