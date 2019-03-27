# [Palette Picker](https://palettepicker.herokuapp.com/)

**Palette Picker** is a React, Express, and Postgres app that allows users to generate palettes of five colors and save them to project folders.

## How to Use the App:
  ### As a User:
  - Go to [the website](https://palettepicker.herokuapp.com/).
  - Click `generate palette` to generate a new set of five random colors.
  - Click on a color to lock it and prevent it from changing the next time a palette is generated.
  - Click on the hamburger icon to open the menu.
  - Click `save palette` and fill out the form to name the palette and specify which project it belongs to.
  - Click `select a project` in the menu to see all the projects.
  - Click a project to see its palettes or click the pencil icon to edit its name.
  - Click the pencil icon next to a palette to edit the palette's name.
  
  ### As a Contributor: 
  - Fork the repo
  - Open your terminal
  - `cd` to where you want the repo directory to be created
  - Clone your fork down to your machine either
    - with SSH: `git clone git@github.com:`*yourusername*`/palette-picker.git`
    - or with HTTPS: `git clone https://github.com/`*yourusername*`/palette-picker.git`
  - `cd palette-picked`
  - `npm install`
  - Follow [instructions](https://github.com/dForDeveloper/palette-picker-api) for setting up the back end repo
  - `git push` any changes up to your fork
  - Make pull requests from your fork to the original repo

## Preview of the App
![Palette Picker Preview](https://user-images.githubusercontent.com/41239540/55091824-1d097480-5077-11e9-82c0-eaf0b40eb1c7.png)


## Technologies Used:
  - React and Redux
  - Node and Express
  - PostgreSQL and Knex
  - Jest and Enzyme
  - Sass

## Contributors:
- Jeo D [@dForDeveloper](https://github.com/dForDeveloper)
