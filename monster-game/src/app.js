new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    isGameRunning: false,
    turns: [],
  },
  mounted: function () {
    setTimeout(() => {
      this.playerHealth = 60;
    }, 1500);
    setTimeout(() => {
      this.monsterHealth = 80;
    }, 1000);
    setTimeout(() => {
      this.monsterHealth = 100;
      this.playerHealth = 100;
    }, 3000);
  },
  methods: {
    onStartGame: function() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.isGameRunning = true;
      this.turns = [];
    },
    onAttack: function() {
      const damage = this.onCalculateDamage({ max: 10, min: 3 });
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayerTurn: true,
        message: `Player hits monster for ${damage} points`
      });
      if (this.isGameWon()) { return }
      this.onMonsterAttack();
    },
    onSpecialAttack: function() {
      const damage = this.onCalculateDamage({ max: 20, min: 10 });
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayerTurn: true,
        message: `Player hits special attack to monster for ${damage} points`
      });
      if (this.isGameWon()) { return }
      this.onMonsterAttack();
    },
    onHeal: function() {
      if (this.playerHealth <= 90 ) {
        this.playerHealth += 10;
        this.turns.unshift({
          isPlayerTurn: true,
          message: `Player heals for 10 points`
        });
      } else {
        this.playerHealth = 100;
        this.turns.unshift({
          isPlayerTurn: true,
          message: `Player heals at 100 points`
        });
      }
      this.onMonsterAttack();
    },
    onGiveUp: function() {
      this.isGameRunning = false;
    },
    /**
     * Monster Utils
     */
    onMonsterAttack: function () {
      const damage = this.onCalculateDamage({ max: 12, min: 5 });
      this.playerHealth -= damage;
      this.isGameWon();
      this.turns.unshift({
        isPlayerTurn: false,
        message: `Monster hits player for ${damage} points`
      });
    },
    /**
     * Helpers
     */
    onCalculateDamage: function({ max, min }) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    isGameWon: function () {
      if (this.monsterHealth <= 0) {
        if(confirm('You won! Play another?')) {
          this.onStartGame();
        } else {
          this.isGameRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if(confirm('You Lost! Play another?')) {
          this.onStartGame();
        } else {
          this.isGameRunning = false;
        }
        return true;
      } else {
        return false;
      }
    },
  }
})