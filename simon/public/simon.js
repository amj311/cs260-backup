/* global Vue */
/* global axios */

var afterPlaySeq = function(){
    game.startUserTurn()
}


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
        simonMessage: "",
        simonSeq: [],
        simonSeqIdx: 0,
        ctDwn: 3,
        userAttempt: [],
        playingColors: [],
        simonColor: null,
        showSimonColor: false,
        numColors: 8,
        simonSpeed: 1000,
        uiColors: {play: null, scores: null, submit: null, back: null},
        allColors: ["dodgerblue","lime","blueviolet","gold","red","darkorange","magenta", "aqua"]
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
        }
        
        let scores = await axios.get('/scores?max=25')
        console.log(scores.data)
        this.loading = false;
        
        this.startGame()
    },
    
    methods: {
        randomIdxOf(array){
            return Math.round(Math.random()*(array.length-1))
        },
        
        randomFrom(array){
            return array[Math.round(Math.random()*(array.length-1))]
        },
        
        startGame(){
            this.playerTurn = false;
            this.simonSeq = []
            
            this.doSimonTurn()
        },
        
        doSimonTurn(){
            this.playerTurn = false;
            this.simonSeq.push(this.randomIdxOf(this.playingColors))
            this.playSimonSeq( this.startUserTurn )
        },
        
        playSimonSeq(done) {
            if (game.ctDwn > 0){
                game.ctDwn--
                game.simonMessage = game.ctDwn
                setTimeout( game.playSimonSeq, game.simonSpeed )
            }
            
            else {
                game.showSimonColor = true;
                
                if(game.simonSeqIdx >= game.simonSeq.length){
                    game.simonSeqIdx = 0;
                    afterPlaySeq()
                    return
                }
                game.simonColor = game.allColors[game.simonSeqIdx]
                game.simonSeqIdx++
                setTimeout( game.playSimonSeq, game.simonSpeed )
            }
            
        },
        
        startUserTurn(){
            this.showSimonColor = false;
            this.playerTurn = true;
        },
        
        onUserAttempt(colorIdx){
            this.playerTurn = false;
            this.showSimonColor = true
            this.simonColor = this.allColors[colorIdx]
            
            setTimeout( this.doSimonTurn, 1000);
        }
        
        
    },
})