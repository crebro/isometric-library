import type p5 from "p5";
import { Sketch } from "@p5-wrapper/react";
import IsometricElement from "./utils/isometric_element";
import { BLOCKSIZE } from "./utils/constants";

const sketch: Sketch = p5 => {
    let cubeImage: p5.Image;
    let cubeSize: number;

    let translatePos = {
        x: 0,
        y: 0,
    }
    let pressPos = {
        x: 0,
        y: 0,
    }
    let gridTranslate: p5.Vector = p5.createVector(0, 0);

    let isometricElements: IsometricElement[] = [];

    p5.preload = () => {
        cubeImage = p5.loadImage("assets/cube.png");

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 5; j++) {
                isometricElements.push(new IsometricElement(3 * j, 2 * i, 4, 8, "/assets/library/bookcase1.png"));
            }
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 7; j++) {
                isometricElements.push(new IsometricElement(2 * j + 16, 3 * i + 20, 4, 8, "/assets/library/bookcase2.png"));
            }
        }
        isometricElements.push(new IsometricElement(5, 30, 6, 12, "/assets/library/chairslong.png"));
        isometricElements.push(new IsometricElement(5, 35, 6, 12, "/assets/library/chairslong.png"));
        for (let i = 0; i < isometricElements.length; i++) {
            isometricElements[i].preload(p5);
        }
        
    }

    p5.setup = () => {
        cubeSize = BLOCKSIZE;


        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        cubeImage.resize(cubeSize, cubeSize);

        for (let i = 0; i < isometricElements.length; i++) {
            isometricElements[i].setup(p5);
        }

        gridTranslate = p5.createVector(p5.width / 2, p5.height / 8);
        
    }

    p5.draw = () => {
        p5.background(150);
        p5.translate(translatePos.x, translatePos.y);
        p5.strokeWeight(0.1);


        for (let i = 0; i < p5.width * 2 / cubeSize; i++) {
            // draw lines spanning from top to bottom at 45 degrees
            p5.line( i * cubeSize, 0, i * cubeSize - p5.width, p5.height);
        }
        for (let i = 0; i < p5.width * 2 / cubeSize; i++) {
            // draw lines spanning from bottom to top at -45 degrees
            p5.line( i * cubeSize , p5.height,  ( i * cubeSize - p5.height * Math.sqrt(3)), 0);
        }

        p5.translate(p5.width / 2, p5.height / 8);

        for (let i = 0; i < isometricElements.length; i++) {
            isometricElements[i].draw(p5);
        }

        

    }

    p5.mousePressed = () => {
        pressPos.x = p5.mouseX;
        pressPos.y = p5.mouseY;
    }

    p5.mouseDragged = () => {
        translatePos.x += p5.mouseX - pressPos.x;
        translatePos.y += p5.mouseY - pressPos.y
        pressPos.x = p5.mouseX;
        pressPos.y = p5.mouseY;
    }

    p5.mouseClicked = () => {
        for (let i = isometricElements.length - 1; i >= 0; i--) {
            if (isometricElements[i].isClickedByPoint(p5, p5.mouseX - translatePos.x - gridTranslate.x, p5.mouseY - translatePos.y - gridTranslate.y)) {
                console.log("clicked");
                break;
            }
        }
    }
}

export default sketch;
