import Experience from '../Experience.js'
import Environment from './Environment.js'
import Particles from './Particles.js'
import Portal from './Portal.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.environment = new Environment()
            this.portal = new Portal()
            this.particles = new Particles()
        })
    }

    update()
    {
        if(this.portal)
            this.portal.update()
        if(this.particles)
            this.particles.update()
    }
}