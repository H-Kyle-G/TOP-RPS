//choices for the computer to use
const play = [
    'Rock',
    'Paper',
    'Scissor'
];

//used to verify if a whole number was entered
const regex = new RegExp('^[0-9]$');

//global score variable
let score;

//chooses a move from the computer
function computerPlay(){
    //uses math floor + math random arrow function to return a number that is between 0 and 2 inclusive
    let randomNum = () => Math.floor(Math.random() * 3);
    //gets a random number from the above arrow funct, and uses it as an index for the choices the computer can make
    return play[randomNum()];
}

//plays a single round of Rock, Paper, Scissors
function playRound(playerSelec, computerSelec){
    //case 0 - tie, if the player and computer play the same thing, it is a tie (always)
    if(playerSelec === computerSelec) return `You tie, ${playerSelec} ties with ${computerSelec}`;

    //case 1 - win/lose, 1st it looks at the players choice, then at the computer choice
    //whatever the player plays is checked against what the computer plays to determine the outcome of the round
    //notice that we don't check for ties (since they're all handeled above) and we are just returning out of the function when the outcome is determined
    //and these returns is the reason why I am only using if, (should never make it to a further down if, if it falls into an earlier case)
    //it should never make it to the default cases (of the switch statements)
    if(playerSelec === 'Rock'){
        switch(computerSelec){
            //paper beats rock (loss)
            case 'Paper':
                if(score > 0) score--;
                return `You lose !! ${computerSelec} (computer) beats ${playerSelec} (you)`; 
            
            //rock beats scissor (win)
            case 'Scissor':
                score++
                return `You win !! ${playerSelec} (you) beats ${computerSelec} (computer)`;

            default:
                return 'ERROR';
        }
    }
    if(playerSelec === 'Paper'){
        switch(computerSelec){
            //scissor beats paper (loss)
            case 'Scissor':
                if(score > 0) score--;
                return `You lose !! ${computerSelec} (computer) beats ${playerSelec} (you)`;

            //paper beats rock (win)
            case 'Rock':
                score++;
                return `You win !! ${playerSelec} (you) beats ${computerSelec} (computer)`;                

            default:
                return 'ERROR';
        }
    }
    if(playerSelec === 'Scissor'){
        switch(computerSelec){
            //rock beats scissor (loss)
            case 'Rock':
                if(score > 0) score--;
                return `You lose !! ${computerSelec} (computer) beats ${playerSelec} (you)`;

            //scissor beats paper (win)
            case 'Paper':
                score++;
                return `You win !! ${playerSelec} (you) beats ${computerSelec} (computer)`;                

            default:
                return 'ERROR';
        }
    }
}

//function to get the number of rounds the player wants to play
function numRounds(){
    let notValid = true;
    let rounds = prompt('Please enter the number of rounds you would like to play');
    //if the player cancels the prompt, return 0
    if(rounds === null) return 0;
    //check if the player entered a valid choice (whole number)
    if(regex.test(rounds) === true){
        //set notValid to false and convert the string to a number
        notValid = false;
        rounds = parseInt(rounds);
        //must be greater than 0 ! (so if it is less than or equal to 0 it is now invalid)
        if(rounds <= 0) notValid = true;
    }
    //if the player entered an invalid number, make them re-enter it until it is valid
    while(notValid){
        rounds = prompt('Please enter a number greater than 0');
        //if the player cancels the prompt, return 0
        if(rounds === null) return 0;
        if(regex.test(rounds) === true){
            notValid = false;
            rounds = parseInt(rounds);
            if(rounds <= 0) notValid = true;
        }
    }
    //return the player's chosen number of rounds
    return rounds;
}

//function to run the game
function game(){
    //initalize the score to 0 for the game to be played
    score = 0;
    let notValid = true;
    //declare playerSelec outside the for so it can be manipulated in the for's while loop
    let playerSelec;
    
    //get from the player the # of rounds they want to play
    let rounds = numRounds();
    //if the player cancels the rounds prompt, (it returned 0) so cancel the game
    if(rounds === 0) return;

    console.log(`Number of Rounds: ${rounds}`)
    for(let i = 0; i < rounds; i++){
        //get the player's choice and convert it to how we will use it for comparisons
        playerSelec = prompt('Choose: Rock, Paper, or Scissor');
        
        //if the player cancels the choose prompt exit the game
        if(playerSelec === null){
            console.log(`Exiting game... Final score: ${score}`);
            return;
        }
        playerSelec = playerSelec.charAt(0).toUpperCase() + playerSelec.slice(1).toLowerCase();
        //check if the player gave a valid choice, if they did, set notValid to false (which effectivley skips the while loop)
        if(playerSelec === 'Rock' || playerSelec === 'Paper' || playerSelec === 'Scissor') notValid = false;

        //if the player gives an invalid choice, make them re-enter until they enter a valid choice
        //note, that if they entered an invalid option, they are not allowed to cancel until they've entered something valid!
        while(notValid){
            playerSelec = prompt('Invalid option ! Choose 1 of the following: Rock, Paper, or Scissor');
            //check 1st if they entered something, then if so transform the string 
            if(playerSelec !== null) playerSelec = playerSelec.charAt(0).toUpperCase() + playerSelec.slice(1).toLowerCase();
            //once the player's choice is valid, set notValid to false (which then exits the while loop)
            if(playerSelec === 'Rock' || playerSelec === 'Paper' || playerSelec === 'Scissor') notValid = false;
        }
        
        //get the computer choice (is a new choice every round, so can just declare/initalize it as such)
        const computerSelec = computerPlay();
        //play the current round (playRound will then output the results of each round to the console)
        console.log(`(Round ${i + 1}) ${playRound(playerSelec, computerSelec)}`);
        //for every round, notValid must be reset (we don't know if their next choice will be valid until they make it!)
        notValid = true;
    }
    //at the end of the game, output the final score        
    console.log(`Final score: ${score}`);
}
