const { createApp, ref } = Vue

createApp({
    data() {
        return {
            steps: 0,
            time: 0,
            timerId: false,
            isPlay: false,
            isWin: false,

            size: 4,
            clickNumber: 0,
            clickNumberId: 0,
            zeroId: 15,
            items: [],
            complete: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0],
        }
    },
    methods:{
        start(){
            const startItems = [1,2,3,4,5,6,7,8,9,10,11,12,13];
            this.items = startItems.toSorted(() => Math.random() - 0.5);
            this.items.push(14);
            this.items.push(15);
            this.items.push(0);

            if(this.timerId){
                clearInterval(this.timerId);
            }

            this.timerId = setInterval(()=> this.time++, 1000);
            this.isPlay = true;
            this.steps = 0;
            this.time = 0;
            this.isWin = false;
            this.zeroId = 15;
        },
        pause(){
            this.isPlay = false;
            clearInterval(this.timerId);
            this.timerId = 0;
        },
        play(){
            this.isPlay = true;
            this.timerId = setInterval(()=> this.time++, 1000)
        },
        restart(){
            if(this.timerId){
                clearInterval(this.timerId);
            }

            this.start();
        },
        canMove(){
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
        },
        move(){
            this.items[this.clickNumberId] = 0;
            this.items[this.zeroId] = this.clickNumber;
        },
        moveBlock(clickNumber, idx){
            if(clickNumber == 0){
                return;
            }

            this.zeroId = this.items.indexOf(0);
            this.clickNumber = clickNumber;
            this.clickNumberId = idx;
            
            if(this.canMove()){
                this.steps ++;
                this.move();
                this.isWin = JSON.stringify(this.items) == JSON.stringify(this.complete);

                if(this.isWin){
                    clearInterval(this.timerId);
                }
            } 
        },
        getTime(){
            const sec = this.time%60+'';
            const min = Math.floor(this.time/60)+'';
            return `${min.padStart(2, '0')}:${sec.padStart(2, '0')}`
        },

    }, 
    computed:{ 
        // doubleCount(){
        //     console.log('double')
        //     return this.items.length * 2
        // }
    },

    watch:{
        // items(value){
        //     console.log(value)
        // },
    }
}).mount('#app')



