# Game Platform
This is an application that offers multiple games, each game offered can be played alone or with multiple players, besides that it allows you to keep track of your progress. 
What makes this special, is that the game server is thought to handle multiple threads and really having a multiplayer game experience in real time. Golang concurrency fits perfect to this pourpose.

## Reaction Game
This is one of the games developed, this game consist in clicking as much as you can a ball that appears in a canvas,
The ball speed and the number of balls that appears can be set it by they user.
### Single player
Click one player button, for one player modality, once you have fill the ballNumber and the ballSpeed you are ready to play.
### Two players
#### Creator player
There will be a player that will create the game, this one will set the ballNumber, the ballSpeed and will push the create button, is this player that has to share the room id he set.
#### Normal player
Once received the roomId just fill it and click join. ignore the ballNumber and ballSpeed, they wont be considered. 

Once both player see the canvas is time to check push the play button.

If you want to see your progress, you will have to be logged in and then in the home page, this will show you 
the ballNumber and the ballSpeed input fields, needed because you will see the progress that you have had depending the number of balls and ballSpeed you pick. The graph show the porcentage of effectivity for each day, so each bullet point in the graphic is an average of the games played each day.


### Demo
https://github.com/user-attachments/assets/79a25b3b-5a67-4bfa-9fa7-d65073a121e9



## Installation
1 => Clone the git repository

2 => Once inside the project folder
   => execute 
   ```
   # First time
   docker compose up --build
   # After first time
   docker compse up
   ```
3 => open the a web browser in the following direction: http://localhost:80/

4 => Now u can test the project.
   
