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
        round: 0,
        playingColors: [],
        simonColor: null,
        showSimonColor: false,
        numColors: 5,
        simonSpeed: 1000,
        uiColors: {play: null, scores: null, submit: null, back: null},
        allColors: ["dodgerblue","lime","blueviolet","gold","red","darkorange","magenta", "aqua"]
    },
    
    async created() {
        this.simonMessage = this.gameName;
        this.gameState = this.GAME_STATES[2]
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
    },
    
    methods: {
        randomIdxOf(array){
            return Math.round(Math.random()*(array.length-1))
        },
        
        randomFrom(array){
            return array[Math.round(Math.random()*(array.length-1))]
        },
        
        startGame(){
            this.gameState = this.GAME_STATES[3]
            this.playerTurn = false;
            this.simonSeq = []
            this.round = 1;
            
            this.doSimonTurn()
        },
        
        doSimonTurn(){
            this.playerTurn = false;
            this.simonSeq.push(this.randomFrom(this.playingColors))
            this.playSimonSeq( this.startUserTurn )
        },
        
        playSimonSeq(done) {
            if (game.ctDwn > 0){
                game.showSimonColor = false;
                game.simonMessage = game.ctDwn
                game.ctDwn--
                setTimeout( game.playSimonSeq, game.simonSpeed )
            }
            
            else {
                game.simonMessage = ""
                
                if(game.simonSeqIdx >= game.simonSeq.length){
                    game.ctDwn = 3;
                    game.simonSeqIdx = 0;
                    afterPlaySeq()
                    return
                }
                game.swapSimonColor(game.allColors[game.simonSeq[game.simonSeqIdx]])
                game.simonSeqIdx++
                setTimeout( game.playSimonSeq, game.simonSpeed )
            }
            
        },
        
        swapSimonColor(colorString){
            this.simonColor = "#000"
            game.showSimonColor = true;
            setTimeout( function(){ game.simonColor = colorString }, 50 )
        },
        
        startUserTurn(){
            this.showSimonColor = false;
            this.playerTurn = true;
            this.userAttempt = [];
        },
        
        onUserAttempt(colorIdx){
            let atmptIdx = this.userAttempt.length;
            this.userAttempt.push(colorIdx)
            console.log(this.simonSeq, this.userAttempt)
            console.log(this.round, this.simonSeq.length)
            
            //this.playerTurn = false;
            this.swapSimonColor(this.allColors[colorIdx])
            
            //setTimeout( this.doSimonTurn, 2000);
        }
        
        
    },
})