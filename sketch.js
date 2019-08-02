let items = [];
let init = false;
let i;
let finished = false;
let colors = [];
let numSwaps = 0;
let p;
let s;
function setup() {
    createCanvas(1200, 600);
    p = createP("0");
    i = 2000;
    for (let j = 0; j <= ceil(Math.log2(i)); j++) {
        colors[j] = { r: random(0, 255), g: random(0, 200), b: random(0, 255) };
    }
    for (let j = 0; j < i; j++) {
        items.push(floor((height - 8) * random()));
    }
    s = floor((items.length / 2));
}

function swap(i, j) {
    const temp = items[i];
    items[i] = items[j];
    items[j] = temp;
    numSwaps++;
}
async function makeHeap(j) {
    if (j >= 0) {
        maxHeapify(j);
        s--;
    } else {
        init = true;
        i = items.length - 1;
    }
}
async function sortHeap(size) {
    swap(size, 0);
    maxHeapify(0);
    i--;
}
function maxHeapify(index) {
    const l = index * 2;
    const r = index * 2 + 1;
    let largest = -1;
    if ((l < i) && (items[l] > items[index])) {
        largest = l;
    } else {
        largest = index;
    }
    if ((r < i) && (items[r] > items[largest])) {
        largest = r;
    }
    if (largest != index) {
        swap(largest, index);
        maxHeapify(largest);
    }
}
async function draw() {
    background(0);
    if (!init) {
        makeHeap(s);
    } else if (!finished && init) {
        await sortHeap(i);
    }
    if (i < 0) {
        finished = true;
    }
    let xresolution = (width / (items.length));
    for (let j = 0; j < items.length; j++) {
        const item = items[j];
        if (j == 0) {
            const col = colors[0];
            fill(col.r, col.g, col.b);
        } else if (j < i) {
            const level = floor(Math.log2(j) + 1);
            const col = colors[level];
            fill(col.r, col.g, col.b);
        } else {
            fill(0, 255, 0);
        }
        stroke(255);
        strokeWeight(0.01);
        rect((j * xresolution), height, xresolution, -1 * item);
    }
    p.remove();
    p = createP("number of swaps is: " + numSwaps);
}
