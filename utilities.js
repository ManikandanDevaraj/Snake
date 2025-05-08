export function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function range(min, max) {
    const arr = [];
    
    for (let i = min; i < max; i++) {
        arr.push(i);
    }
    
    return arr;
}

export function choice(arr) {
    return arr[randInt(0, arr.length)];
