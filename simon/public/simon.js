/* global Vue */
/* global axios */

var game = new Vue ({
    el: '#game',
    
    data: {
        loading: true,
        GAME_STATES: ["loading","menu","playing","scores"],
        gameState: null,
        user: '',
        currentScore: 0,
        userScores: [],
        highScores: [],
        simonSequence: [],
        userAttempt: [],
        playingColors: [],
        simonColor: null,
        showSimonColor: false,
        numColors: [],
        allColors: ["blue","lime","purple","gold","red","darkorange","magenta", "aqua"]
    },
    
    created() {
        this.gameState = this.GAME_STATES[2]
        axios.get('/scores?max=25').then( res => { console.log(res.data) } )
        this.loading = false;
    },
})