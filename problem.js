//values for all non Ace Cards
var handValues = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  'T': 10,
  'J': 10,
  'Q': 10,
  'K': 10
};

//deal a random card to player
function getRandomCard() {
  var deck = 'A23456789TJQK';
  return deck[Math.floor(Math.random() * (12 - 0 + 1))];
}

//determine score in players hand
function checkHand(array) {
  var hand = 0;
  var aces = 0;
  for (var i = 0; i < array.length; i += 1) {
    if (!handValues[array[i]]) {
      aces += 1;
    } else {
      hand += handValues[array[i]];
    }
  }
  if(hand > 21) {
    return 'busted';
  }
  for (var j = 0; j < aces; j += 1) {
    hand += 11;
    if(hand > 21) {
      hand -= 10;
    }
    if(hand > 21) {
      return 'busted';
    }
  }
  return hand;
}

//creates a new player
var Player = function(name) {
  this.name = name;
  this.hand = [];
  this.score = null;
  this.isBusted = false;
  this.finalScore = null;
};

//deal a card if players score is less than 21
Player.prototype.hit = function() {
  if (this.score < 21) {
    this.hand.push(getRandomCard());
    this.score = checkHand(this.hand);
    if(this.score === 'busted'){
      this.isBusted = true;
      this.finalScore = this.score;
    }
  }
};

//locks in a players score for evaluation in round
Player.prototype.stand = function() {
  this.finalScore = this.score;
}

//determines winning hand among players
var winner = function () {
  var winner = {name: null, finalScore: null};
  for (var i = 0; i < arguments.length; i += 1) {
    console.log(arguments[i]);
    if (arguments[i].finalScore > winner.finalScore && arguments[i].finalScore !== 'busted' ) {
      winner = arguments[i];
    }
  }

  return winner.name + ' is Winner';
}

// var Player1 = new Player('Sean');
// var Player2 = new Player('Ariel');
// var Player3 = new Player('Smokey');
// Player3.hit();
// Player3.hit();
// Player3.hit();
// Player1.hit();
// Player1.hit();
// Player1.stand();
// Player2.hit();
// Player2.hit();
// Player2.stand();
// Player3.stand();
// console.log(winner(Player1, Player2, Player3));






