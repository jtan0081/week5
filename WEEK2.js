class Queue {
    constructor() {
        this.q = [];
    }
    // get the current number of elements in the queue
    //Getter function
    get length() {
        return this.q.length
    };
    //Get all the elements 
    get queue() {
        return this.q;
    }
    // Boolean function: returns true if the queue is empty, false otherwise 
    isEmpty() {
        return 0 == this.q.length;
    };
    //adds new element to the end of the quue
    enqueue(newItem) {
        this.q.push(newItem)
    };
    //Boolean function: returns true if an item is found (first occurnace); false otherwise
    inQueue(item) {
        let i = 0;
        let isFound = false;
        while (i < this.q.length && !isFound) {
            if (this.q[i] === item) {
                isFound = true;
            } else
                i++;
        }
        return (isFound);
    }
    // pop an item from the queue
    dequeue() {
        if (0 != this.q.length) {
            let c = this.q[0];
            this.q.splice(0, 1);
            return c
        }
    };

    //lab Q
    // remove all the element in the queue
    removes() {
        while (this.q.length) {
            this.q.pop();
        }
    };
    //adds a set of item into the queue
    addAll(all){
        for(let i =0;i<all.length;i++){
            queue.enqueue(all[i]);
        }
        
    };
    //print teh content and its index
    contentIndex(){
        for(let i = 0;i<this.q.length;i++){
            console.log((i+1)+"-"+this.q[i]);
        }
    };
    //pops N elements from teh queue
    popsN(items){
        if(items<=this.q.length){
            let b = this.q[0];
            this.q.splice(0,items);
            return b
        }
    };

};

let queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
console.log(queue.length);
console.log(queue.q);
queue.dequeue();
queue.enqueue(33);
console.log(queue.q);
console.log(queue.inQueue(33));
console.log(queue.inQueue(88));
queue.removes();
console.log(queue.q);
queue.addAll([3,7,1,9]);
console.log(queue.q);
queue.contentIndex();
queue.popsN(2);
console.log(queue.q);

