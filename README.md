## Zero Ecommerce

First app, learning react

- react-reveal
- react-modal
- redux-thunk
- redux
- react-redux

Backend code is located in server directory

- app in production serving as static files in expressjs
  see, middleware static in server/index.js

- Lines
  - yarn build
  - copy the output directory ```build/``` in the ```server/``` directory
  - under server directory run yarn start for running locally

- Steps pushing to heroku
  - after run Lines section, and heroku login successfully
  - set MONGO env vars in config vars section in heroku
    - MONGO_URI
    - MONGO_DB
  - run heroku create on root dir
  - run git subtree push --prefix server heroku master

- Para cada cambio en el codigo y subir a heroku, solamente la carpeta
  server
  - run ```git subtree push --prefix server heroku master``` desde la
    carpeta root

- URL demo app
  - see https://limitless-sands-45673.herokuapp.com/

- Useful links
  - https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app
  - https://medium.com/@shalandy/deploy-git-subdirectory-to-heroku-ea05e95fce1f
  - https://stackoverflow.com/questions/7539382/how-can-i-deploy-push-only-a-subdirectory-of-my-git-repo-to-heroku
  - https://coderwall.com/p/ssxp5q/heroku-deployment-without-the-app-being-at-the-repo-root-in-a-subfolder
  - https://www.atlassian.com/git/tutorials/git-subtree
  - https://medium.com/@porteneuve/mastering-git-subtrees-943d29a798ec
  - see heroku documentation
