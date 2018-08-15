new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    isGameRunning: false,
  },
  mounted: function () {
    setTimeout(() => {
      this.playerHealth = 50;
    }, 2000);
  },
  methods: {
    onStartGame: function() {
      this.isGameRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    onAttack: function() {
      this.monsterHealth -= this.onCalculateDamage({ max: 10, min: 3 });
      if (this.isGameWon()) { return }
      this.onMonsterAttack();
    },
    onSpecialAttack: function() { 
      this.monsterHealth -= this.onCalculateDamage({ max: 20, min: 10 });
      if (this.isGameWon()) { return }
      this.onMonsterAttack();
    },
    onHeal: function() {
      if (this.playerHealth <= 90 ) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.onMonsterAttack();
    },
    onGiveUp: function() {},

    /**
     * Monster Utils
     */
    onMonsterAttack: function () {
      this.playerHealth -= this.onCalculateDamage({ max: 12, min: 5 });
      this.isGameWon();
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