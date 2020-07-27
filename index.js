class Cat {
  constructor(playerType) {
    this.attackPower = 14;
    this.playerType = playerType;
    this.healthbar = 100;
    this.critChance = 50;
    this.critDamage = 10;
  }

  takeDamage(damageTaken) {
    this.healthbar -= damageTaken;
    
    // Update the healthbar
    let catHealth = document.getElementById("cat_health");
    catHealth.value -= damageTaken;

    // Check health everytime cat takes damage
    checkHealth();
  }
}

class Dog {
  constructor(playerType) {
    this.attackPower = 10;
    this.playerType = playerType;
    this.healthbar = 100;
    this.critChance = 20;
    this.critDamage = 10;
  }

  takeDamage(damageTaken) {
    this.healthbar -= damageTaken;

    // Update the healthbar
    let dogHealth = document.getElementById("dog_health");
    dogHealth.value -= damageTaken;

    // Check health everytime dog takes damage
    checkHealth();
  }
}

let fightDetails = {};

const startMatch = (userFighter) => {
  // Hide select screen and show match screen
  let selectScreen = document.getElementById("select-screen");
  let matchScreen = document.getElementById("match-screen");

  selectScreen.style.display = "none";
  matchScreen.style.display = "block";

  if (userFighter === "cat") {
    fightDetails.cat = new Cat("user");
    fightDetails.dog = new Dog("pc");
  } else {
    fightDetails.cat = new Cat("pc");
    fightDetails.dog = new Dog("user");
  }

  // Update html data
  document.getElementById("cat_name").innerHTML =
    fightDetails.cat.playerType === "user" ? "You" : "Enemy";
  document.getElementById("dog_name").innerHTML =
    fightDetails.dog.playerType === "user" ? "You" : "Enemy";
};

const checkHealth = () => {
  // Check the health bar for the dog and the cat
  if (cat.healthbar <= 0) {
    alert(`${cat.playerType} have lost.`);
    resetMatch();
  }
  if (dog.healthbar <= 0) {
    alert(`${dog.playerType} have lost.`);
    resetMatch();
  }
};

const resetMatch = () => {
  // Hide select screen and show match screen
  let selectScreen = document.getElementById("select-screen");
  let matchScreen = document.getElementById("match-screen");

  selectScreen.style.display = "block";
  matchScreen.style.display = "none";
  fightDetails = {};
};

const hit = () => {
  // Generate a random number, if it's less or eaquel to the critRate given to each type
  // it will add the critDamage to the normal Damage.
  let cat = fightDetails.cat;
  let dog = fightDetails.dog;

  let crit = Math.round(Math.random() * 100);
  let isCatCrit = crit >= cat.critChance;
  let isDogCrit = crit >= dog.critChance;

  // After a user attack let the pc attack automatically;
  dog.takeDamage(cat.attackpower + isCatCrit ? cat.critChance : 0);
  cat.takeDamage(dog.attackpower + isDogCrit ? dog.critChance : 0);
};
