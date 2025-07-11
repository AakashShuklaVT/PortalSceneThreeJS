import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Particles {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.particlesCount = 40
        this.speed = 0.003
        this.setPositions()
        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    setPositions() {
        this.positions = new Float32Array(this.particlesCount * 3);
        this.velocities = new Float32Array(this.particlesCount * 3);

        for (let i = 0; i < this.particlesCount; i++) {
            this.positions[i * 3 + 0] = (Math.random() - 0.5) * 5;
            this.positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
            this.positions[i * 3 + 2] = (Math.random() - 0.5) * 5;

            this.velocities[i * 3 + 0] = (Math.random() - 0.5) * 0.01;
            this.velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
            this.velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
        }
    }

    moveParticles(delta) {
        for (let i = 0; i < this.particlesCount; i++) {
            const ix = i * 3;

            // Slight random adjustment to velocity
            this.velocities[ix + 0] += (Math.random() - 0.5) * 0.0005;
            this.velocities[ix + 1] += (Math.random() - 0.5) * 0.0005;
            this.velocities[ix + 2] += (Math.random() - 0.5) * 0.0005;

            // Clamp to max speed
            this.velocities[ix + 0] = Math.max(-this.speed, Math.min(this.speed, this.velocities[ix + 0]));
            this.velocities[ix + 1] = Math.max(-this.speed, Math.min(this.speed, this.velocities[ix + 1]));
            this.velocities[ix + 2] = Math.max(-this.speed, Math.min(this.speed, this.velocities[ix + 2]));

            // Update positions
            this.positions[ix + 0] += this.velocities[ix + 0];
            this.positions[ix + 1] += this.velocities[ix + 1];
            this.positions[ix + 2] += this.velocities[ix + 2];

            // Boundary bounce logic
            if (this.positions[ix + 0] < -2.5 || this.positions[ix + 0] > 2.5) {
                this.velocities[ix + 0] *= -1;
                this.positions[ix + 0] = THREE.MathUtils.clamp(this.positions[ix + 0], -2.5, 2.5);
            }
            if (this.positions[ix + 1] < 0 || this.positions[ix + 1] > 3) {
                this.velocities[ix + 1] *= -1;
                this.positions[ix + 1] = THREE.MathUtils.clamp(this.positions[ix + 1], 0, 3);
            }
            if (this.positions[ix + 2] < -2.5 || this.positions[ix + 2] > 2.5) {
                this.velocities[ix + 2] *= -1;
                this.positions[ix + 2] = THREE.MathUtils.clamp(this.positions[ix + 2], -2.5, 2.5);
            }
        }

        // Mark positions as updated
        this.geometry.attributes.position.needsUpdate = true;
    }

    setGeometry() {
        this.geometry = new THREE.BufferGeometry()
        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))
    }

    setTextures() {
        this.textures = {}
        this.textures.alpha = this.resources.items.particleTexture
    }

    setMaterial() {
        this.material = new THREE.PointsMaterial({
            size: 0.2,
            sizeAttenuation: true,
            color: new THREE.Color('#ffffff'),
            transparent: true,
            depthWrite: true,
            blending: THREE.AdditiveBlending,
            alphaMap: this.textures.alpha,
            // vertexColors: true
        })
    }

    setMesh() {
        this.mesh = new THREE.Points(this.geometry, this.material)
        this.scene.add(this.mesh)
    }

    update() {
        this.moveParticles(this.time.elapsed)
    }
}