import { matrix, multiply } from "mathjs";

export type Block = {
    x: number
    y: number
}

export function screen_to_isometric(x: number, y: number, blockSize: number) {
    // the weights as explanined in the youtube video
    const isometric_weights = matrix([
        [0.5, 0.25],
        [-0.5, 0.25]
    ]);

    // coordinatex times the size of the block 18 * 4 = 72
    // as it's scaled 4x
    const coordinate = matrix([
        [x * blockSize, y * blockSize]
    ]);

    const [isometricCoordinate] = multiply(coordinate, isometric_weights).toArray();
    return isometricCoordinate as number[];
}

export function generateGrid<T extends Block = Block>(
    rows: number, 
    cols: number, 
    blockProvider: (x: number, y: number) => T) {
    const grid: T[] = [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid.push(blockProvider(i, j));
        }
    }
    return grid;
}