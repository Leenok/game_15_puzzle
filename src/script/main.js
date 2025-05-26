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
    
    createItems = ()=>{
        const startItems = [1,2,3,4,5,6,7,8,9,10,11,12,13];
        this.items = startItems.toSorted(() => Math.random() - 0.5);
        this.items.push(14);
        this.items.push(15);
        this.items.push(0);
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

    newGame = ()=>{
        this.clickNumber = 0;
        this.clickNumberId = 0;
        this.zeroId = 13;

        this.steps = 0;
        this.time = 0;
        this.timerId = 0;
        this.createItems();
    }
}


gameData = new myGame();
gameData.createItems();
gameData.timerId = setInterval(()=> this.time++, 1000);

createApp({
    data() {
        return {
            blocks: gameData.items,
            steps: gameData.steps,
            time: gameData.time,
            timerId: false,
            complete: false,
            notStop: true,
            inputValue: '',
            size: 3
        }
    },
    methods:{
        moveBlock(num, ind){
            if(num == 0){
                return;
            }

            if(!this.timerId){
                this.timerId = setInterval(()=>  this.time++, 1000);
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
        getTime(){
            const sec = this.time%60+'';
            const min = Math.floor(this.time/60)+'';
            return `${min.padStart(2, '0')}:${sec.padStart(2, '0')}`
        },
        pause(){
            this.notStop = false;
            clearInterval(this.timerId);
            gameData.timerId = 0;
        },
        play(){
            this.notStop = true;
            this.timerId = setInterval(()=> this.time++, 1000)
        },
        restart(){
            this.notStop = false;
            clearInterval(this.timerId);
            newGame();
            // newGame.clearTimer();
            this.timerId = setInterval(()=> this.time++, 1000);
        },
    },
     // должны возвращать что-то и в html вызываем без ()
    //  если результат зависит от какого-то свойства 
    computed:{ 
        doubleCount(){
            console.log('double')
            return this.items.length * 2
        }
    },
    // следить за изменением какого-то свойства 
    watch:{
        inputValue(value){
            console.log(value)
        }
    }
}).mount('#app')



