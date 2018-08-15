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
})