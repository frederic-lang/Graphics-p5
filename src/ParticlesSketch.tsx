import React from "react";
import Sketch from "react-p5";
import p5Types, { Vector } from "p5"; 

declare global {
  interface Window {
    myP5 : p5Types;
  } 
}

class Particle {
    acceleration: Vector;
    velocity: Vector;
    position: Vector;
    lifespan : number;

    constructor(position : Vector) {
        this.acceleration = window.myP5.createVector(0, 0.05);
        this.velocity = window.myP5.createVector(window.myP5.random(-1, 1), window.myP5.random(-1, 0))
        this.position = position.copy();
        this.lifespan = 255;
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.lifespan -= 2;
    }

    display() {
        window.myP5.stroke(200, this.lifespan);
        window.myP5.strokeWeight(2);
        window.myP5.fill(127, this.lifespan);
        window.myP5.ellipse(this.position.x, this.position.y, 12, 12);
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

  const members: any = {};
  for (const key of Object.keys(Object.getPrototypeOf(p5))) {
    const member = p5[key as keyof p5Types];
    if (typeof member === 'function') {
      members[key] = member.bind(p5);
    } else {
      members[key] = member;
    }
  }
  window.myP5 = {} as p5Types;
  Object.assign(window.myP5, members);

  p5.createCanvas(720, 400).parent(canvasParentRef);
  particle = new Particle(p5.createVector(360,70));
}

function draw(p5 : p5Types) {
  p5.background(51);
  particle.update();
  particle.display();
  if(particle.isDead()) {
    particle = new Particle(p5.createVector(360,70));
  }
}

export const ParticlesSketch: React.FC<{}> = () => {

  return <Sketch setup={setup} draw={draw} />;
};