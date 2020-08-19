# npm-typescript-library-jest-template

### This repo is designed to help get you started with pubishing an npm typscript library, as well as setup the configs to enable Jest testing.

## Setup

You should first replace all of the variables within the package.json. 
### [LIB_NAME] _the name of your library_
### [YOUR_NAME] _your name_
### [DESCRIPTION] _the description of your library_
### [REPO_URL] _the link to your github repo if you have one_
  Example: [https://github.com/amitch6097/npm-typescript-library-jest-template.git](https://github.com/amitch6097/npm-typescript-library-jest-template.git)
### [ISSUES_URL] _the link to your issues_ 
  Example: [https://github.com/amitch6097/npm-typescript-library-jest-template/issues](https://github.com/amitch6097/npm-typescript-library-jest-template/issues)
### [READ_ME_URL] _the link to your repos readme.md or docs_
  Example: [https://github.com/amitch6097/npm-typescript-library-jest-template#readme](https://github.com/amitch6097/npm-typescript-library-jest-template#readme)
  

  ### Finally run 
  ```
  npm install
  ```
  to install all dependencies.
  
  ## Adding Code
  
  You will want to add files to the [./src](https://github.com/amitch6097/npm-typescript-library-jest-template/tree/master/src) folder.  Export all of the functions and Classes you want avalible to your library users from the [./src/index.ts](https://github.com/amitch6097/npm-typescript-library-jest-template/tree/master/src/index.ts) file.
  ### To build your package run
  ```
  npm run build
  ````
  This will build a common js version of your library and a UMD version.
  
  ## Testing 
  
  Add tests to [./__tests__](https://github.com/amitch6097/npm-typescript-library-jest-template/tree/master/__tests__) folder.  The testing platform is Jest.  You can find out more about Jest [here](https://jestjs.io/)!
  ### To build your package run
  ```
  npm run test
  ````
  
  ## Publishing to NPM
  
  Before publishing you should update the version in the package.json.  Following that you can run 
  ```
  npm publish
  ```
  to publish your package to npm.
  

  
