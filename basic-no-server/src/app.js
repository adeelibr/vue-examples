new Vue({
  el: '#app',
  data: {
    message: 'Welcome',
    title: 'ok',
    link: 'http://google.com',
    count: 0,
    coordinates: {
      x: 0,
      y: 0,
    },
  },
  computed: {
    countResult: function () {
      return this.count > 5 ? 'cool' : 'nice';
    }
  },
  methods: {
    onChange: function (event) {
      this.title = event.target.value;
    },
    sayHi: function () {
      return `${this.message} By Adeel`;
    },
    onIncrease: function (step, event) {
      this.count = this.count + step;
    },
    onUpdateCoordinates: function (event) {
      this.coordinates.x = event.clientX;
      this.coordinates.y = event.clientY;
    }
  }
})