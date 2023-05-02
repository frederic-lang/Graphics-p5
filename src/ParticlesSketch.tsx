import React from "react";
import Sketch from "react-p5";
import p5Types, { Vector } from "p5"; 

class Particle {
    acceleration: Vector;
    velocity: Vector;
    position: Vector;
    lifespan : number;

    constructor(position : Vector) {
        this.acceleration = window.p5.Vector.random2D();
        this.velocity = window.p5.Vector.random2D();
        this.position = position.copy();
        this.lifespan = 255;
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.lifespan -= 2;
    }

    display() {
        window.p5.stroke(200, this.lifespan);
        window.p5.strokeWeight(2);
        window.p5.fill(127, this.lifespan);
        window.p5.ellipse(this.position.x, this.position.y, 12, 12);
    }

    run() {
        this.update();
        this.display();
    }

    isDead() {
        return this.lifespan < 0;
    }
}


let particle : Particle;

function setup(p5: p5Types, canvasParentRef: Element) {
  p5.createCanvas(720, 400).parent(canvasParentRef);
  particle = new Particle(p5.createVector(50,50));
}

function draw(p5 : p5Types) {
  p5.background(51);
  particle.display();
}

export const ParticlesSketch: React.FC<{}> = () => {

  return <Sketch setup={setup} draw={draw} />;
};