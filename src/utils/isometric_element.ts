import { P5CanvasInstance } from "@p5-wrapper/react";
import type p5 from 'p5';
import { screen_to_isometric } from "./gridgen";
import { BLOCKSIZE } from "./constants";

export default class IsometricElement {
    x: number;
    y: number;
    horizontalBlocks: number;
    verticalBlocks: number;
    spriteLoadString: string;
    sprite: p5.Image | undefined;
    isometricX: number;
    isometricY: number;

    constructor(
        x: number,
        y: number,
        horizontalBlocks: number,
        verticalBlocks: number,
        spriteLoadString: string,
    ) {
        this.x = x + 2;
        this.y = y + 5;
        this.horizontalBlocks = horizontalBlocks;
        this.verticalBlocks = verticalBlocks;
        this.spriteLoadString = spriteLoadString;
        [this.isometricX, this.isometricY] = screen_to_isometric(this.x, this.y, BLOCKSIZE);
    }

    preload(p5: P5CanvasInstance) {
        this.sprite = p5.loadImage(this.spriteLoadString);
    }

    setup(p5: P5CanvasInstance) {
        if (this.sprite) {
            this.sprite.resize(this.horizontalBlocks * BLOCKSIZE, this.verticalBlocks * BLOCKSIZE);
        }
    }

    draw(p5: P5CanvasInstance) {
        if (this.sprite) {
            p5.image(this.sprite, this.isometricX, this.isometricY - this.sprite.height);
        }
    }
}
