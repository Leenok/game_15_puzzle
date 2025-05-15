const { createApp, ref } = Vue

class myGame {
    items = [];
    complete = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];


    clickNumber = 0;
    clickNumberId = 0;
    zeroId = 13;

    steps = 0;
    time = 0;
    timerId = 0;
    
    shakeArr = (arr)=>{
        this.items = arr.toSorted(() => Math.random() - 0.5);
    }

    findIndex = (clickNumber)=>{
        this.clickNumber = clickNumber;
        this.clickNumberId = this.items.flat().indexOf(clickNumber);
        this.zeroId = this.items.flat().indexOf(0);
    };

    canMove = ()=>{
        const rightInd = [3,7,11,15];
        const leftInd = [0,4,8,12];
        let canMoveIds = [this.zeroId+1, this.zeroId-1, this.zeroId+4, this.zeroId-4].filter( (i) => i >=0 && i < 16);

        if(rightInd.includes(this.zeroId)){
            canMoveIds = canMoveIds.filter( (i) =>  i !== this.zeroId+1 );
        }

        if(leftInd.includes(this.zeroId)){
            canMoveIds = canMoveIds.filter( (i) =>  i !== this.zeroId-1 )
        }

        return canMoveIds.includes(this.clickNumberId) 
    };

    move = ()=>{
        this.items[this.clickNumberId] = 0;
        this.items[this.zeroId] = this.clickNumber;
        this.findIndex(this.clickNumber);
    };

    isComplete = ()=>{
      return JSON.stringify(this.items) == JSON.stringify(this.complete);
    };
}


gameData = new myGame();
gameData.shakeArr(gameData.complete);
gameData.timerId = setInterval(()=> this.time++, 1000);

createApp({
    data() {
        return {
            blocks: gameData.items,
            steps: gameData.steps,
            time: gameData.time,
            timerId: false,
            complete: false,
        }
    },
    methods:{
        moveBlock(num){
            if(num == 0){
                return;
            }

            if(!this.timerId){
                this.timerId = setInterval(()=> this.time++, 1000);
            }
            
            gameData.findIndex(num);
            
            if(gameData.canMove()){
                this.steps ++;
                gameData.move();
                this.complete = gameData.isComplete();

            if(this.complete){
              clearInterval(this.timerId);
            }
          }
        },

        // pause(){
        //   this.isStop = true;
        //   clearInterval(this.timerId);
        //   newGame.clearTimer();
        // },

        // restart(){
        //   clearInterval(this.timerId);
        //   newGame.clearTimer();
        //   this.steps = 0;
        //   this.timer = 0;
        //   this.isFinish = false;
        //   this.isStop = false;
        //   this.my_state = newGame.shakeArr().flat();
        //   this.isStart = true;
        //   this.timerId = setInterval(()=> this.timer++, 1000);
        // },
    }
}).mount('#app')



