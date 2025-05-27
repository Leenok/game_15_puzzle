const { createApp, ref } = Vue

createApp({
    data() {
        return {
            steps: 0,
            time: 0,
            timerId: false,
            isPlay: false,
            isWin: false,

            size: 3,
            clickNumber: 0,
            clickNumberId: 0,
            zeroId: 15,
            items: [],
            complete: [],
        }
    },
    methods:{
        start(){
            this.complete = Array.from({ length: this.size**2-1 }, (_, i) => i + 1);
            this.complete.push(0);
            const startItems = Array.from({ length: this.size**2-3 }, (_, i) => i + 1);
            this.items = startItems.toSorted(() => Math.random() - 0.5);
            this.items.push(this.size**2-2);
            this.items.push(this.size**2-1);
            this.items.push(0);

            if(this.timerId){
                clearInterval(this.timerId);
            }

            this.timerId = setInterval(()=> this.time++, 1000);
            this.isPlay = true;
            this.steps = 0;
            this.time = 0;
            this.isWin = false;
            this.zeroId = this.size**2-1;
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
            const leftInds = Array.from({ length: this.size}).map((i, ind) => this.size*ind);
            const rightInds = leftInds.map(i => i+ this.size -1);
            let canMoveIds = [this.zeroId+1, this.zeroId-1, this.zeroId+this.size, this.zeroId-this.size].filter( (i) => i >=0 && i < this.size**2);

            if(rightInds.includes(this.zeroId)){
                canMoveIds = canMoveIds.filter( (i) =>  i !== this.zeroId+1 );
            }

            if(leftInds.includes(this.zeroId)){
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
                    this.isPlay = false;
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



