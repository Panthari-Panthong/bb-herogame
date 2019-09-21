// Write your JS here

const hero = {
  name: "Auriel",
  heroic: true,
  inventory: [],
  health: 10,
  weapon: {
    type: "Flying shuriken",
    damage: 2
  }
}


const enemy = {
  name: "Troll",
  health: 10,
  weapon: {
    type: 'Northern Axe',
    damage: 2
  }
}


function rest(object) {
  if (object.health === 10) {
    alert("health already has the value 10")
  } else {
    object.health = 10
    return object
  }
}

const imgInn = document.querySelector('#inn')
imgInn.addEventListener('click', function () {
  rest(hero)
  displayStats(hero)
})



function pickUpItem(hero, weapon) {
  hero.inventory.push(weapon)
}

const imgDagger = document.querySelector('#dagger')
imgDagger.addEventListener('click', function () {
  const weaponDagger = {
    type: "dagger",
    damage: 2
  }
  pickUpItem(hero, weaponDagger)
  displayStats(hero)
  //imgDagger.style.visibility = 'hidden'
})




function equipWeapon(hero) {
  if (hero.inventory[0]) {
    hero.weapon = hero.inventory[0]
  }

}



const imgBag = document.querySelector('#bag')
imgBag.addEventListener('click', function () {
  equipWeapon(hero)
  displayStats(hero)
})



function displayStats(hero) {
  const heroStats = document.querySelector('#heroStats')
  heroStats.textContent = null;
  const h2 = document.createElement('h2')
  h2.textContent = "Hero's stats"
  heroStats.appendChild(h2)

  const heroImg = document.createElement('img')
  heroImg.alt = hero.name;
  heroImg.src = "./img/auriel.jpg"
  heroImg.style.width = '250px'
  heroImg.style.height = '350px'
  heroStats.appendChild(heroImg)

  const name = document.createElement('h3')
  name.textContent = `Hero's name : ${hero.name}`
  heroStats.appendChild(name)

  const health = document.createElement('h3')
  health.textContent = `Health : ${hero.health}`
  heroStats.appendChild(health)

  const weapon = document.createElement('h3')
  weapon.textContent = `Weapon : ${hero.weapon.type}`
  heroStats.appendChild(weapon)

  const damage = document.createElement('h3')
  damage.textContent = `Weapon damage : ${hero.weapon.damage}`
  heroStats.appendChild(damage)

}


displayStats(hero)



function submitHeroName() {
  let heroName = document.querySelector('#heroName').value
  heroName = capitalizerFirstLetter(heroName)

  if (!heroName) {
    return true;
  }

  hero.name = heroName;
  displayStats(hero)
  document.querySelector('#heroName').value = ""
}
submitHeroName();


function capitalizerFirstLetter(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}


function enemyStats(enemy) {
  const enemyStats = document.querySelector('#enemyStats')
  enemyStats.textContent = null;

  const h2 = document.createElement('h2')
  h2.textContent = "Enemy's stats"
  enemyStats.appendChild(h2)

  const enemyImg = document.createElement('img')
  enemyImg.alt = hero.name;
  enemyImg.src = "./img/troll.jpg"
  enemyImg.style.width = '250px'
  enemyImg.style.height = '350px'
  enemyImg.style.cursor = 'pointer'
  enemyStats.appendChild(enemyImg)

  enemyImg.addEventListener('click', function () {
    enemyImg.style.visibility = 'hidden'
  })

  const enemyName = document.createElement('h3')
  enemyName.textContent = `Enemy's name : ${enemy.name}`
  enemyStats.appendChild(enemyName)

  const enemyHealth = document.createElement('h3')
  enemyHealth.textContent = `Health : ${enemy.health}`
  enemyStats.appendChild(enemyHealth)

  const enemyWeapon = document.createElement('h3')
  enemyWeapon.textContent = `Weapon : ${enemy.weapon.type}`
  enemyStats.appendChild(enemyWeapon)

  const enemyDamage = document.createElement('h3')
  enemyDamage.textContent = `Weapon damage : ${enemy.weapon.damage}`
  enemyStats.appendChild(enemyDamage)

}

enemyStats(enemy)


function heroAttack() {
  const attackBtn = document.querySelector('#attack-btn')
  const gameMessage = document.querySelector('#game-message')

  if (hero.weapon.damage === 0) {
    alert("Pick up a weapon and Equip the weapon! Enemy is about to strike!")
    enemy.health -= 0
    enemyStats(enemy)
  } else {
    let heroAttack = (1 + Math.floor(Math.random() * hero.weapon.damage))
    enemy.health -= heroAttack
    enemyStats(enemy)
  }

  if (gameOver(enemy.health)) {
    endGame("Hero Won Fight!")
    return
  }

  attackBtn.disabled = true
  gameMessage.innerHTML = "Enemy is about to strike!"

  setTimeout(enemyAttack, 1000)
}



function enemyAttack() {
  const attackBtn = document.querySelector('#attack-btn')
  let enemyAttack = (1 + Math.floor(Math.random() * enemy.weapon.damage))
  hero.health -= enemyAttack
  displayStats(hero)

  if (gameOver(hero.health)) {
    endGame("Enemy Won Fight!")
    return;
  }

  attackBtn.disabled = false

}


function endGame(message) {
  document.querySelector('#attack-btn').hidden = true
  document.querySelector('#restart-btn').hidden = false
  document.querySelector('#game-message').innerHTML = message
}


function gameOver(health) {
  return health <= 0
}


function restart() {
  location.reload()
}