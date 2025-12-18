# MEDP33100 - Final Project, Public Archive

## Live Demo

- [Include a link to the live version of the project hosted on Render.](https://final-project-a8gs.onrender.com)

## Project Overview

- My project is called ClueNity (Clue + Community).
This playful, jungle-themed project provides riddles—some more difficult than others—about animals and their habitats. Its purpose is not for users to find a single correct answer, but rather to encourage them to explore multiple interpretations that fit each riddle from different perspectives. Every time a user submits an answer, the website displays responses written by other users. In this way, they can see the diversity of ideas each riddle can generate and be inspired to come up with new and interesting answers.

## Endpoints

The project uses the following API endpoints:

 Riddles
- **GET /api/riddles**  
  Retrieves all riddles stored in the database. / Retrieves riddles filtered by difficulty level.

Answers
- **GET /api/answers/:riddleId**  
  Retrieves all user-submitted answers associated with a specific riddle.
- **POST /api/answers**  
  Submits a new anonymous answer for a specific riddle and saves it to the database.


## Technologies Used

- List the technologies and tools used in the project:
    - **Languages**: HTML, CSS, JavaScript.
    - **Other**: Node.js, Express.js, MongoDB Atlas, Mongoose, AI to generate the background image.

## Credits

- Background song: Backyard Safari by TechSoundtracks, 
- Image of the leaf: PNG image from Google Images.
- Resources, tutorials, or References I used to help complete the project: Codes and concepts developed in previous class assignments, the lecture recordings, and the course materials provided by Professor Dora Do.

## Future Enhancements

- Improve the overall animations and visual effects to make the website feel more like an interactive video game.
