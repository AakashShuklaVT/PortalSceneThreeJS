export default [
    {
        name: 'environmentMapTexture',
        type: 'cubeTexture',
        path:
        [
            'textures/environmentMap/px.jpg',
            'textures/environmentMap/nx.jpg',
            'textures/environmentMap/py.jpg',
            'textures/environmentMap/ny.jpg',
            'textures/environmentMap/pz.jpg',
            'textures/environmentMap/nz.jpg'
        ]
    },
    {
        name: 'grassColorTexture',
        type: 'texture',
        path: 'textures/dirt/color.jpg'
    },
    {
        name: 'grassNormalTexture',
        type: 'texture',
        path: 'textures/dirt/normal.jpg'
    },
    {
        name: 'foxModel',
        type: 'gltfModel',
        path: 'models/Fox/glTF/Fox.gltf'
    },
    {
        name: 'portalModel',
        type: 'gltfModel',
        path: '/models/Task-Model/portal.glb'
    },
    {
        name: 'portalTexture',
        type: 'texture',
        path: '/textures/Portal-Texture/baked.jpg'
    },
    {
        name: 'particleTexture',
        type: 'texture',
        path: '/textures/Particle-Texture/particle.png'
    },
]