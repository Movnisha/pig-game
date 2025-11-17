'use strict';
/*
Let's start implementing the game

1. Rolling the dice

user rolls a dice -> generate random dice roll -> display dice roll
                                                        |
                        switch player <-  Yes   <-   is it 1 ?
                                                        | 
                                                        | No
                                                        |
                                                Add dice roll to 
                                                 current score
                                                        |
                                                Display new score
select the dice roll button and add event listener to roll the dice
const btnRoll = document.querySelector('.btn--roll');


So in the previous lecture, 
we implemented this functionality of adding the dice to the current score 
only as the player number 0, okay? 

But now we need to make this work for both player number 0 and number 1. 
And so for that, we need to keep track of which player is actually the 
current player. 

And in order to do that, we actually need to keep track of which player 
is actually the active player in a moment that the dice was rolled. 

So basically we need to know which player is right now playing. 
And with right now I mean, whenever the button is clicked, all right? 

So we will create another variable, which will hold exactly that. 

So it will hold 0, if the current player is player 0 and it will hold 1, 
if the active player is player number 1. 

So let active player. And since we start with the first player, 
we set it to 0, because remember that player number 1 is player 0 
and player 2 is here in our code player number 1.

2. Holding current score

User click on holds score button -> add current score to total score -> score >=100? 
                                                                              | 
                                                                              |
                                                                              |
                                                                    current player wins!  
                                                                    
3. Re-setting the game      

On clicking new game btn -> remove all winners -> reset all values

*/


//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let scores, currentScore,activePlayer,playing;

const init = function(){ 
            //starting conditions        
            scores = [0,0];
            currentScore = 0;
            activePlayer = 0;
            playing = true;
            
            score0El.textContent = 0;
            score1El.textContent = 0;
            current0El.textContent = 0;
            current1El.textContent = 0;

            diceEl.classList.add('hidden');  
            player0El.classList.remove('player--winner');
            player1El.classList.remove('player--winner');
            //player0El.classList.remove('player--active');
            player1El.classList.remove('player--active');
            
            //initally we want the player 1 to be active, so 
            player0El.classList.add('player--active');
}

init();

const switchPlayer = function(){
     document.getElementById(`current--${activePlayer}`).textContent = 0;
            currentScore = 0;
            activePlayer = activePlayer === 0 ? 1 : 0;
            player0El.classList.toggle('player--active');
            player1El.classList.toggle('player--active');
}

//Rolling dice functionality
btnRoll.addEventListener('click',
    function(){
        if(playing){
                //1. Generate a random dice roll 
                const dice = Math.trunc(Math.random() * 6) + 1;

                //2. Display dice
                diceEl.classList.remove('hidden');
                diceEl.src = `dice-${dice}.png`;

                //3. Check for rolled 1: if true, switch to next player
                if(dice !== 1){
                        //Add dice to the current score 
                        currentScore+=dice;
                        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
                } else{
                //switch to next player
                        switchPlayer();
                }
            }
        }
    );

btnHold.addEventListener('click',
    function(){
       if(playing){
                //1. Add current score to active player's score
                scores[activePlayer] += currentScore;   //scores[1] = scores[1] + currentScore
                document.getElementById(`score--${activePlayer}`).textContent  = 
                                                                        scores[activePlayer];

                //2. Check if player's score >= 100
                //Finish the game
                if(scores[activePlayer] >= 100 ){
                        playing = false;
                        diceEl.classList.add('hidden');
                        document.querySelector(`.player--${activePlayer}`)
                            .classList.add('player--winner');
                        document.querySelector(`player--${activePlayer}`)
                            .classList.remove('player--active');
                }else{
                        //3. Switch to the next player
                        switchPlayer();
                }
        }
    }
);

btnNew.addEventListener('click', 
        function(){
           init();
        }
);