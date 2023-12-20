import { Coordinate } from "src/app/models/coordinate.type";
import * as THREE from 'three';

export class Snow {
    private _flakes: SnowFlake[] = [];

    constructor(
        private flakeRadius: number = 0.25,
        private flakeSegments: number = 16,
        private flakeCount: number = 10,
        private colour: number = 0xffffff,
        private movementRadius: number = Math.PI * 2,
        private delta: number = 0.02,
        private speed: number = 0.2) {
        for (let i = 0; i < this.flakeCount; i++) {
            this.generate();
        }
    }

    public get flakes(): SnowFlake[] {
        return this._flakes;
    }

    private generate() {
        const geometry = new THREE.SphereGeometry(this.flakeRadius, this.flakeSegments, this.flakeSegments);
        const material = new THREE.MeshBasicMaterial
            ({
                color: this.colour,
                transparent: true,
                opacity: 0.7
            });
        const snowflake = new THREE.Mesh(geometry, material);
        // Random position for snowflake
        let coord: Coordinate = {
            x: THREE.MathUtils.randFloatSpread(140),
            y: THREE.MathUtils.randFloatSpread(100),
            z: THREE.MathUtils.randFloat(-60, -10)
        }
        snowflake.position.set(coord.x, coord.y, coord.z);
        //snowflake.castShadow = true;
        let phi = Math.random() * 100;
        this._flakes.push(new SnowFlake(snowflake, coord, phi));
    }

    public destroy(){
        this._flakes = null;
    }

    public move() {
        this._flakes.forEach(flake => {
            if (flake.mesh.position.y < -70) {
                flake.mesh.position.y = 50;
            } else {
                flake.mesh.position.y -= this.speed;
            }
            flake.mesh.position.x = this.movementRadius * Math.cos(flake.phi) + flake.position.x;
            flake.mesh.position.z = this.movementRadius * Math.sin(flake.phi) + flake.position.z;
            flake.phi += this.delta;
        });
    }
}

class SnowFlake {
    constructor(public mesh: THREE.Mesh, public position: Coordinate, public phi: number) { }
}

