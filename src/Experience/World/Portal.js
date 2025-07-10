import * as THREE from 'three'
import Experience from '../Experience.js'
import { fragment } from '../Utils/Shaders/fragment.js'
import { vertex } from '../Utils/Shaders/vertex.js'

export default class Portal {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        this.portalShaderMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uColorStart: { value: new THREE.Color("#ffebee") },
                uColorEnd: { value: new THREE.Color("#b71c1c") }
            },
            vertexShader: vertex,
            fragmentShader: fragment
        });


        // Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Portal')
        }

        // Resource
        this.resource = this.resources.items.portalModel
        this.setModel()

    }

    setModel() {
        this.model = this.resource.scene
        this.scene.add(this.model)

        this.model.traverse((child) => {
            console.log(child);

            if (child instanceof THREE.Mesh && child.name == 'baked') {
                child.castShadow = true
                child.material.map = this.resources.items.portalTexture
                this.resources.items.portalTexture.colorSpace = THREE.SRGBColorSpace
                child.material.map.flipY = false
            }
            else if (child instanceof THREE.Mesh && child.name.includes('poleLight')) {
                child.material = new THREE.MeshBasicMaterial({
                    color: '#ffffe5'
                })
            }
            else if (child instanceof THREE.Mesh && child.name.includes('portal')) {
                child.material = this.portalShaderMaterial
            }
        })
    }

    update() {
        this.portalShaderMaterial.uniforms.uTime.value += this.time.delta * 0.002
    }
}