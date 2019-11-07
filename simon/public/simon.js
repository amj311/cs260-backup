/* global Vue */
/* global axios */

var game = new Vue ({
    el: '#game',
    
    data: {
        gameName: "Clement Says",
        GAME_STATES: ["loading","login","menu","playing","lost","scores"],
        gameState: "loading",
        playerTurn: false,
        user: '',
        currentScore: 0,
        userScores: [],
        highScores: [],
        simonSequence: [],
        userAttempt: [],
        playingColors: [],
        simonColor: null,
        showSimonColor: false,
        numColors: 8,
        uiColors: {play: null, scores: null, submit: null, back: null},
        allColors: ["blue","lime","purple","gold","red","darkorange","magenta", "aqua"]
    },
    
    async created() {
        this.gameState = this.GAME_STATES[3]
        this.uiColors.play = this.randomFrom(this.allColors)
        this.uiColors.scores = this.randomFrom(this.allColors)
        this.uiColors.submit = this.randomFrom(this.allColors)
        this.uiColors.back = this.randomFrom(this.allColors)
        
        let colorsLeft = Array.from(this.allColors)
        for (let i = 0; i < this.numColors; i++) {
            let idx = this.randomIdxOf(colorsLeft)
            this.playingColors.push(this.allColors.indexOf(colorsLeft[idx]))
            colorsLeft.splice(idx,1)
            console.log(this.allColors[idx], colorsLeft)
        }
        
        let scores = await axios.get('/scores?max=25')
        console.log(scores.data)
        this.loading = false;
    },
    
    methods: {
        randomIdxOf(array){
            return Math.round(Math.random()*(array.length-1))
        },
        
        randomFrom(array){
            return array[Math.round(Math.random()*(array.length-1))]
        },
        
        startGame(){
            
        },
        onUserAttempt(colorIdx){
            this.showSimonColor = true
            this.simonColor = this.allColors[colorIdx]
        }
        
        
    },
})