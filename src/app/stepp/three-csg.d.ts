declare module 'three-csg-ts' {
    import * as THREE from 'three';
    
    export class CSG {
        static fromMesh(mesh: THREE.Mesh): CSG;
        static toMesh(csg: any, matrixWorld: THREE.Matrix4): THREE.Mesh;
        static toMesh(csg: CSG, material: THREE.Material): THREE.Mesh;
        union(csg: CSG): CSG;
        subtract(csg: CSG): CSG;
        intersect(csg: CSG): CSG;
    }
}