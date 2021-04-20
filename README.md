# Cubert
A multiplayer rubiks cubing web app

# Development

* run "npm install" in both /frontent and /backend
* in /backend run "mongod" as well as "nodemon server"
* in /frontend run "ng serve"
* then access website at localhost:4200

# How the frick everything is working

* /frontend/src/index.html is where the landing page is for the website. 
* This is generic and has the <app-root> This is what calls the app.component.html
* This <router-outlet> is what calls special angular routing stuff, to whatever webpages we want to go to.
* app.routing.st is what defines the routing relationships. 
* defaults to /timer, which is what we want the landing page to be.
* now we finally see the say timer page in timerpage-component.html
* {{scramble}} is how we display some kind of variable in html
