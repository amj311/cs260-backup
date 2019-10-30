/*global axios */
/*global Vue */
var app = new Vue({
  el: '#app',
  data: {
    pokis: [],
    pokiName: '',
    pokiURL: '',
    politics: [],
  },
  created: function() {
    this.getpokis();
    this.getpolitics();
  },
  methods: {
    async getpokis() {
      // `this` points to the vm instance
      console.log("get pokis");
      var url = "http://cs260.simplyoliveapps.com:8080/pokemon";
      try {
        let response = await axios.get(url);
        this.pokis = response.data;
        console.log(this.pokis);
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },
    
    
    async getpolitics() {
      // `this` points to the vm instance
      console.log("get pokis");
      var url = "http://cs260.simplyoliveapps.com:8080/politics";
      try {
        let response = await axios.get(url);
        this.politics = response.data;
        console.log(this.politics);
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },
  }
});
