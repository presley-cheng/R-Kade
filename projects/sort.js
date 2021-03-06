let values = [];
let w = 10;
const quickButton = document.getElementById('quick');
const mergeButton = document.getElementById('merge');
const bubbleButton = document.getElementById('bubble');
const selectButton = document.getElementById('select');
const insertButton = document.getElementById('insert');
let count_number = document.getElementById('counter');
let indicator = document.getElementById('swapText');
let allButtons = document.querySelector('.buttons');
let initial = true;

// stores the runtime comparisons for each algorithm
let comparisons = 0;

// for program to know when to stop counting
let count = 0;
let prev_count = -1;

function setup() {
    createCanvas(1000, 500);
    reset();
}

function reset() {
    values = new Array(floor(width / w));
    for (let i = 0; i < values.length; i++) {
        values[i] = random(height);
    }
}

function draw() {
    background(42, 160, 168);
    for (let i = 0; i < values.length; i++) {
        noStroke();
        rect(i * w, height - values[i], w - 1, values[i]);
    }
}

function interface(algo) {
    if (!initial)
        reset();

    switch(algo) {
        case 'q': {
            quickButton.classList.add('glow');
            quicksort(values, 0, values.length - 1);
            break;
        }
        case 'm' : {
            mergeButton.classList.add('glow');
            let aux = [];
            mergesort(values, aux, 0, values.length - 1);
            break;
        }
        case 'b' : {
            bubbleButton.classList.add('glow');
            bubblesort(values);
            break;
        }
        case 's' : {
            selectButton.classList.add('glow');
            selectionsort(values);
            break;
        }
        case 'i' : {
            insertButton.classList.add('glow');
            insertionsort(values);
            break;
        }
    }
    initial = false;
    
    // sorting in-progress indicator/restrict user from multiple clicks
    indicator.style.background = "#FFC0CB";
    allButtons.style.pointerEvents = "none";
    Timer(algo);
}

function Timer(algo) {
    var timer = setInterval(function() {
        if (prev_count === count) {
            // reset
            count = 0;
            prev_count = -1;
            comparisons = 0;

            // end timer
            clearInterval(timer);

            // indicates the sorting has finished/allowing user to click
            indicator.style.background = "#fff";
            allButtons.style.pointerEvents = "auto";

            // remove algorithm indicator
            switch(algo) {
                case 'q': {
                    quickButton.classList.remove('glow');
                    break;
                }
                case 'm' : {
                    mergeButton.classList.remove('glow');
                    break;
                }
                case 'b' : {
                    bubbleButton.classList.remove('glow');
                    break;
                }
                case 's' : {
                    selectButton.classList.remove('glow');
                    break;
                }
                case 'i' : {
                    insertButton.classList.remove('glow');
                    break;
                }
            }
            return;
        }
        prev_count = count;

        // display the current swap count
        count_number.innerHTML = comparisons;
    }, 200);
}

async function mergesort(arr, aux, left, right) {
    if (left >= right) {
        return;
    }
    else {
        const mid = Math.floor(left + (right - left) / 2);        
        await mergesort(arr, aux, left, mid);
        await mergesort(arr, aux, mid + 1, right);

        await merge(arr, aux, left, mid, right);
    }
}

async function merge(arr, aux, left, mid, right) {
    for (let i = 0; i < arr.length; i++) {
        aux[i] = arr[i];
    }

    let i = left, j = mid + 1, k;
    for (k = left; i < (mid + 1) && j <= right; k++) {
        await sleep(35);
        comparisons++;
        aux[i] < aux[j] ? arr[k] = aux[i++] : arr[k] = aux[j++];
        count++;
    }

    while (i < (mid + 1)) {
        arr[k++] = aux[i++];
    }
    while (j <= right) {
        arr[k++] = aux[j++];
    }
}

async function quicksort(arr, start, end) {
    if (start >= end) {
        return;
    }
    else {
        let index = await partition(arr, start, end);
        
        await Promise.all([
            quicksort(arr, start, index - 1),
            quicksort(arr, index + 1, end)
        ]);
    }
}

async function partition (arr, start, end) {
    let pivotValue = arr[end];
    let pivotIndex = start;

    for (let i = start; i < end; i++) {
        comparisons++;
        if (arr[i] < pivotValue) {
            await sleep(35);
            swap(arr, pivotIndex, i);
            pivotIndex++;
        }
    }
    await sleep(35);
    swap(arr, pivotIndex, end);

    return pivotIndex;
}

async function bubblesort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            comparisons++;
            if (arr[j] > arr[j + 1]) {
                await sleep(0) 
                swap(arr, j, j + 1);
            }
        }
    }
}

async function selectionsort(arr) {
    let min = -1;

    for (let i = 0; i < arr.length - 1; i++) {
        min = i;
        for (let j = arr.length - 1; j > i; j--) {
            comparisons++;
            if (arr[min] > arr[j]) {
                min = j;
            }
        }
        if (i != min) {
            await sleep(60);
            swap(arr, i, min);
        }
    }
}

async function insertionsort(arr) {
    for (let i = 1; i < arr.length; i++) {
        for (let j = i; j > 0; j--) {
            comparisons++;
            if (arr[j - 1] > arr[j]) {
                await sleep(20);
                swap(arr, j - 1, j);
            }
        }
    }
}

async function swap(arr, x, y) {
    let temp = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
    count++;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function main() {
    quickButton.addEventListener('click', () => interface('q'));
    mergeButton.addEventListener('click', () => interface('m'));
    bubbleButton.addEventListener('click', () => interface('b'));
    selectButton.addEventListener('click', () => interface('s'));
    insertButton.addEventListener('click', () => interface('i'));
}

main();