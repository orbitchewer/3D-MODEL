import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DObject, OBJLoader, Wireframe } from 'three-stdlib';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { StepDataService } from '../shared/services/step-data.service';
import earcut from 'earcut';
import { CSG } from 'three-csg-ts';
import { SUBTRACTION, Brush, Evaluator } from 'three-bvh-csg';
// import data from './curved_surface_with_hole.json';



@Component({
  selector: 'app-stepp',
  templateUrl: './stepp.component.html',
  styleUrls: ['./stepp.component.css']
})
export class SteppComponent implements OnInit , AfterViewInit{

color1:any ="#FFD700";

color7:any ="#FFD700";
color2:any ="#FFD700";
color3:any ="#FFD700";
color4:any ="#FFD700";
color5:any ="#FFD700";
color6:any ="#FFBF00";

 stepFileDataArr:any = [];
  stepFileData !: {
    Advanced_Face: any;
    surface:any;
    Line_bound:any;
    Bound:any;
    Oriented_Edge: any;
    Line_DTYPE:any,
    DTYPE: any;
    Line_next:any;
    Line_CP:any,
    CP_NAME: any;
    
    CP_x: any;
    CP_y: any;
    CP_z: any;
    Line_dir:any;
    DIR_NAME: any;
    dx: any;
    dy: any;
    dz: any;
    Line_refdir:any;
    rdx: any;
    rdy: any;
    rdz: any;
    radius: any;
    Line_vector:any;
    magnitude: any;
  
  }
  
  height_update:string[] = [];
  radius_update:string[] = [];
  planeUpdate:string[]=[];

  // stepFileDataArr:any=[];
  vertices:any[]=[];
  Vertices1:any[]=[];
vertices2:any[]=[];
vertices3:any[]=[];

cver=0;
cver1=0;

verticesSet =new Set();
verticesSet1 =new Set();
circle:any;  
circle1:any;
 centerPoint:any;

 ecut=0;
  // ref axis

  x:any;
  y:any;
  z:any;

  refX:any;
  refY:any;
  refZ:any;

  lineDirX:any;
  lineDirY:any;
  lineDirZ:any;

  lineX:any;
  lineY:any;
  lineZ:any;

  planeRefX:any;
  planeRefY:any;
  planeRefZ:any;

  planeX:any;
  planeY:any;
  planeZ:any;



axis_x:any;
axis_y:any;
axis_z:any;
scene :any;
camera:any;
controls:any;
renderer:any;

lx1:any;
ly1:any;
lz1:any;

lx2:any;
ly2:any;
lz2:any;

radius1:any;
radius2:any;


theta:any;
thetaa:any;

  midpoint: THREE.Vector3 = new THREE.Vector3;

px0:any;
py0:any;
pz0:any;


px1:any;
py1:any;
pz1:any;

px:any;
py:any;
pz:any;


px2:any;
py2:any;
pz2:any;

lx:any;
ly:any;
lz:any;


cx4:any;
cy4:any;
cz4:any;

cx5:any;
cy5:any;
cz5:any;

cx6:any;
cy6:any;
cz6:any;

cx7:any;
cy7:any;
cz7:any;


vx0:any;
vy0:any;
vz0:any;

vx2:any;
vy2:any;
vz2:any;

cx:any;
cy:any;
cz:any;

cx1:any;
cy1:any;
cz1:any;

cx2:any;
cy2:any;
cz2:any;

cx3:any;
cy3:any;
cz3:any;


vx:any;
vy:any;
vz:any;

vx1:any;
vy1:any;
vz1:any;

largerRadius=0;

cirx:any;
ciry:any;
cirz:any;

cirx1:any;
ciry1:any;
cirz1:any;

// xz axis

// px1=0;
// py1=9;
// pz1=0;

// px=0;
// py=0;
// pz=0;


// px2=0;
// py2=9;
// pz2=0;

// lx=0;
// ly=1;
// lz=0;


// cx4=-4.5;
// cy4=0;
// cz4=0;

// cx5=4.5;
// cy5=0;
// cz5=-5.5109105961630896E-016;

// cx6=-4.5;
// cy6=9;
// cz6=0;

// cx7=4.5;
// cy7=9;
// cz7=-5.5109105961630896E-016;


// vx0=4.5;
// vy0=9;
// vz0=-5.5109105961630896E-016;

// vx2=4.5;
// vy2=0;
// vz2=-5.5109105961630896E-016;

// cx=-4.5;
// cy=0;
// cz=0;

// cx1=4.5;
// cy1=0;
// cz1=-5.5109105961630896E-016;

// cx2=-4.5;
// cy2=9;
// cz2=0;

// cx3=4.5;
// cy3=9;
// cz3=-5.5109105961630896E-016;


// vx=4.5;
// vy=9;
// vz=-5.5109105961630896E-016;

// vx1=4.5;
// vy1=0;
// vz1=-5.5109105961630896E-016;


// xy plane

// px1=0;
// py1=0;
// pz1=9;

// px=0;
// py=0;
// pz=0;


// px2=0;
// py2=0;
// pz2=9;

// lx=0;
// ly=0;
// lz=1;


// cx4=4.5;
// cy4=0;
// cz4=0;

// cx5=-4.5;
// cy5=-5.5109105961630896E-016;
// cz5=0;

// cx6=4.5;
// cy6=0;
// cz6=9;

// cx7=-4.5;
// cy7=-5.5109105961630896E-016;
// cz7=9;


// vx0=-4.5;
// vy0=-5.5109105961630896E-016;
// vz0=9;

// vx2=-4.5;
// vy2=-5.5109105961630896E-016;
// vz2=0;

// cx=4.5;
// cy=0;
// cz=0;

// cx1=-4.5;
// cy1=-5.5109105961630896E-016;
// cz1=0;

// cx2=4.5;
// cy2=0;
// cz2=9;

// cx3=-4.5;
// cy3=-5.5109105961630896E-016;
// cz3=9;


// vx=-4.5;
// vy=-5.5109105961630896E-016;
// vz=9;

// vx1=-4.5;
// vy1=-5.5109105961630896E-016;
// vz1=0;
clickCount=0;
cir=0;
ellipse=0;


centralAxis:any;
refAxis:any;
height!: number;
  rad!: number;
  currentHeight!: number;
  currentradius!: number;

radius:any;
value:any;
smallerRadius:any;

arcAngle:any;

  @ViewChild('stepp', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
 
 

  
  constructor(private stepDataService:StepDataService) { }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.readFile(file);
    }
  }

  readFile(file: File) {
    const fileReader = new FileReader();
    
    fileReader.onload = (e) => {
      const fileContent = fileReader.result as string;
      try {
        const jsonData = JSON.parse(fileContent);
        this.processJsonData(jsonData);
      } catch (err) {
        console.error('Error parsing JSON:', err);
      }
    };

    fileReader.readAsText(file);
  }

  processJsonData(data: any) {

    if (Array.isArray(data)) {
      this.stepFileDataArr = data;
    } else if (typeof data === 'object') {
      this.stepFileDataArr = [data];
    } else {
      console.error('The JSON data is not an array or an object');
    }
    console.log('JSON data array:', this.stepFileDataArr);

    this.assigningValues();
  }



customSign(x: number): number {
    if (x === 0) {
        return 1;
    }
    return Math.sign(x);
}

stepData():void{
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:"PLANE",
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#54",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#163",
  // Line_CP: "#163",
  // CP_NAME: null,
  // CP_x: 0.53823788487143998,
  // CP_y: 3.5083293591981,
  // CP_z: -6.9626135400485403,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#54",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#163",
  // Line_CP: "#163",
  // CP_NAME: null,
  // CP_x: 0.53823788487143998,
  // CP_y: 6.87167652557293,
  // CP_z: -6.9626135400485403,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#32",
  // DTYPE: "LINE",
  // Line_next: "#167",
  // Line_CP: "#167",
  // CP_NAME: null,
  // CP_x: 0.53823788487143998,
  // CP_y:2.5950014711927598,
  // CP_z: -6.9626135400485403,
  // Line_dir: "#139",
  // DIR_NAME: null,
  // dx: 0,
  // dy:1,
  // dz: 0,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: 10
  // };
  // this.stepFileDataArr.push(this.stepFileData);

  // this.stepFileData = {
  //   Advanced_Face: 1, surface:"PLANE",
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#54",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#163",
  // Line_CP: "#163",
  // CP_NAME: null,
  // CP_x: 0.53823788487143998,
  // CP_y: 6.87167652557293,
  // CP_z: -6.9626135400485403,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:"PLANE",
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#54",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#163",
  // Line_CP: "#163",
  // CP_NAME: null,
  // CP_x: 0.53823788487143998,
  // CP_y: 3.5083293591981,
  // CP_z: -6.9626135400485403,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);

  // this.stepFileData = {
  //   Advanced_Face: 1, surface:"PLANE",
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#52",
  // DTYPE: "CIRCLE",
  // Line_next: "#126",
  // Line_CP: "#165",
  // CP_NAME: "Origin",
  // CP_x: 1.4614262306281001,
  // CP_y: 5.1900029423855196,
  // CP_z: -6.3971957848721903,
  // Line_dir: "#137",
  // DIR_NAME: "center_axis",
  // dx: 0.52228849704920399,
  // dy: -1.23259516440783E-032,
  // dz: -0.852768858396039,
  // Line_refdir: "#138",
  // rdx: 0.852768858396039,
  // rdy: 9.4676362127459199E-017,
  // rdz: 0.52228849704920399,
  // radius: 2,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);

  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "PLANE",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#52",
  // DTYPE: null,
  // Line_next: "#126",
  // Line_CP: "#165",
  // CP_NAME: "Origin",
  // CP_x: 1.4614262306281001,
  // CP_y: 5.1900029423855196,
  // CP_z: -6.3971957848721903,
  // Line_dir: "#137",
  // DIR_NAME: "center_axis",
  // dx: 0.52228849704920399,
  // dy: -1.23259516440783E-032,
  // dz: -0.852768858396039,
  // Line_refdir: "#138",
  // rdx: 0.852768858396039,
  // rdy: 9.4676362127459199E-017,
  // rdz: 0.52228849704920399,
  // radius: 2,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#54",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#163",
  // Line_CP: "#163",
  // CP_NAME: null,
  // CP_x: -2.0559210230718601,
  // CP_y: 5.1900029423855196,
  // CP_z: 3.1750697931866099,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);

  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#54",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#163",
  // Line_CP: "#163",
  // CP_NAME: null,
  // CP_x: -5.4669964566560099,
  // CP_y: 5.1900029423855196,
  // CP_z: 1.0859158049897899,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#52",
  // DTYPE: "CIRCLE",
  // Line_next: "#126",
  // Line_CP: "#165",
  // CP_NAME: "Origin",
  // CP_x: -3.7614587398639401,
  // CP_y: 5.1900029423855196,
  // CP_z: 2.1304927990881999,
  // Line_dir: "#137",
  // DIR_NAME: "center_axis",
  // dx: 0.52228849704920399,
  // dy: 0.,
  // dz: -0.852768858396039,
  // Line_refdir: "#138",
  // rdx: 0.852768858396039,
  // rdy: 9.4676362127459199E-017,
  // rdz: 0.52228849704920399,
  // radius: 2,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);

  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#54",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#163",
  // Line_CP: "#163",
  // CP_NAME: null,
  // CP_x: -5.4669964566560099,
  // CP_y: 5.1900029423855196,
  // CP_z: 1.0859158049897899,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#54",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#163",
  // Line_CP: "#163",
  // CP_NAME: null,
  // CP_x: -2.0559210230718601,
  // CP_y: 5.1900029423855196,
  // CP_z: 3.1750697931866099,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#52",
  // DTYPE: "CIRCLE",
  // Line_next: "#126",
  // Line_CP: "#165",
  // CP_NAME: "Origin",
  // CP_x: -3.7614587398639401,
  // CP_y: 5.1900029423855196,
  // CP_z: 2.1304927990881999,
  // Line_dir: "#137",
  // DIR_NAME: "center_axis",
  // dx: 0.52228849704920399,
  // dy: 0.,
  // dz: -0.852768858396039,
  // Line_refdir: "#138",
  // rdx: 0.852768858396039,
  // rdy: 9.4676362127459199E-017,
  // rdz: 0.52228849704920399,
  // radius: 2,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#55",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#164",
  // Line_CP: "#164",
  // CP_NAME: null,
  // CP_x:-5.4669964566560099,
  // CP_y: 5.1900029423855196,
  // CP_z: 1.0859158049897899,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#56",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#166",
  // Line_CP: "#166",
  // CP_NAME: null,
  // CP_x: -1.84313614454922,
  // CP_y: 5.1900029423855196,
  // CP_z: -4.83095818094233033,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#32",
  // DTYPE: "LINE",
  // Line_next: "#167",
  // Line_CP: "#167",
  // CP_NAME: null,
  // CP_x:-5.4669964566560099,
  // CP_y: 5.1900029423855196,
  // CP_z: 1.0859158049897899,
  // Line_dir: "#139",
  // DIR_NAME: null,
  // dx: 0.52228849704920399,
  // dy: 0.,
  // dz: -0.852768858396039,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: 10
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#55",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#164",
  // Line_CP: "#164",
  // CP_NAME: null,
  // CP_x:0.53823788487143998,
  // CP_y: 6.87167652557293,
  // CP_z: -6.9626135400485403,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#56",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#166",
  // Line_CP: "#166",
  // CP_NAME: null,
  // CP_x: -1.84313614454922,
  // CP_y: 5.1900029423855196,
  // CP_z: -4.83095818094233033,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#52",
  // DTYPE: "ELLIPSE",
  // Line_next: "#126",
  // Line_CP: "#165",
  // CP_NAME: "Origin",
  // CP_x: 3.34830820925752,
  // CP_y: 5.1900029423855196,
  // CP_z:-9.4780106983438195,
  // Line_dir: "#137",
  // DIR_NAME: "center_axis",
  // dx: 0.66696032153528295,
  // dy: 0.,
  // dz: 0.74509323543939898,
  // Line_refdir: "#138",
  // rdx: 0.74509323543939898,
  // rdy: 2.7176528214331599E-017,
  // rdz: -0.66696032153528295,
  // radius: 2,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#55",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#164",
  // Line_CP: "#164",
  // CP_NAME: null,
  // CP_x:0.53823788487143998,
  // CP_y: 6.87167652557293,
  // CP_z: -6.9626135400485403,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#56",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#166",
  // Line_CP: "#166",
  // CP_NAME: null,
  // CP_x: 0.53823788487143998,
  // CP_y: 3.5083293591981,
  // CP_z: -6.9626135400485403,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);

  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#52",
  // DTYPE: "CIRCLE",
  // Line_next: "#126",
  // Line_CP: "#165",
  // CP_NAME: "Origin",
  // CP_x: 1.4614262306281001,
  // CP_y: 5.1900029423855196,
  // CP_z: -6.3971957848721903,
  // Line_dir: "#137",
  // DIR_NAME: "center_axis",
  // dx: 0.52228849704920399,
  // dy: -1.23259516440783E-032,
  // dz: -0.852768858396039,
  // Line_refdir: "#138",
  // rdx: 0.852768858396039,
  // rdy: 9.4676362127459199E-017,
  // rdz: 0.52228849704920399,
  // radius: 2,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);

  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#55",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#164",
  // Line_CP: "#164",
  // CP_NAME: null,
  // CP_x:-1.84313614454922,
  // CP_y: 5.1900029423855196,
  // CP_z: -4.8309581809423303,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#56",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#166",
  // Line_CP: "#166",
  // CP_NAME: null,
  // CP_x: 0.53823788487143998,
  // CP_y: 3.5083293591981,
  // CP_z: -6.9626135400485403,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#52",
  // DTYPE: "ELLIPSE",
  // Line_next: "#126",
  // Line_CP: "#165",
  // CP_NAME: "Origin",
  // CP_x: 3.34830820925752,
  // CP_y: 5.1900029423855196,
  // CP_z:-9.4780106983438195,
  // Line_dir: "#137",
  // DIR_NAME: "center_axis",
  // dx: 0.66696032153528295,
  // dy: 0.,
  // dz: 0.74509323543939898,
  // Line_refdir: "#138",
  // rdx: 0.74509323543939898,
  // rdy: 2.7176528214331599E-017,
  // rdz: -0.66696032153528295,
  // radius: 2,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);

  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#55",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#164",
  // Line_CP: "#164",
  // CP_NAME: null,
  // CP_x:-5.4669964566560099,
  // CP_y: 5.1900029423855196,
  // CP_z: 1.0859158049897899,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#56",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#166",
  // Line_CP: "#166",
  // CP_NAME: null,
  // CP_x: -1.84313614454922,
  // CP_y: 5.1900029423855196,
  // CP_z: -4.83095818094233033,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#32",
  // DTYPE: "LINE",
  // Line_next: "#167",
  // Line_CP: "#167",
  // CP_NAME: null,
  // CP_x: -5.4669964566560099,
  // CP_y: 5.1900029423855196,
  // CP_z: 1.0859158049897899,
  // Line_dir: "#139",
  // DIR_NAME: null,
  // dx: 0.52228849704920399,
  // dy: 0.,
  // dz: -0.852768858396039,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: 10
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#98",
  // Bound: "CYLINDRICAL_SURFACE",
  // Oriented_Edge: null,
  // Line_DTYPE: null,
  // DTYPE: null,
  // Line_next: "#125",
  // Line_CP: "#162",
  // CP_NAME: "Origin",
  // CP_x: -3.7614587398639401,
  // CP_y: 5.1900029423855196,
  // CP_z: 2.1304927990881999,
  // Line_dir: "#135",
  // DIR_NAME: "center_axis",
  // dx: 0.52228849704920399,
  // dy: 0.,
  // dz: -0.852768858396039,
  // Line_refdir: "#136",
  // rdx: 0.852768858396039,
  // rdy: 9.4676362127459199E-017,
  // rdz: 0.52228849704920399,
  // radius: 2,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#54",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#163",
  // Line_CP: "#163",
  // CP_NAME: null,
  // CP_x: 6.293889977,
  // CP_y: 10,
  // CP_z: 1.1485608120056501,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#55",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#164",
  // Line_CP: "#164",
  // CP_NAME: null,
  // CP_x: 0.2047359886,
  // CP_y: 10,
  // CP_z: 4.559636246,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#52",
  // DTYPE: "CIRCLE",
  // Line_next: "#126",
  // Line_CP: "#165",
  // CP_NAME: "Origin",
  // CP_x: 2.293889977,
  // CP_y: 10,
  // CP_z: 1.148560812,
  // Line_dir: "#137",
  // DIR_NAME: "center_axis",
  // dx: 0,
  // dy: -1,
  // dz: 0,
  // Line_refdir: "#138",
  // rdx: 0.4887287095,
  // rdy: 0,
  // rdz: 0.87243581341242704,
  // radius: 4,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#55",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#164",
  // Line_CP: "#164",
  // CP_NAME: null,
  // CP_x: 0.2047359886,
  // CP_y: 10,
  // CP_z: 4.559636246,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#56",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#166",
  // Line_CP: "#166",
  // CP_NAME: null,
  // CP_x: 0.2047359886,
  // CP_y: 0,
  // CP_z: 4.559636246,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#32",
  // DTYPE: "LINE",
  // Line_next: "#167",
  // Line_CP: "#167",
  // CP_NAME: null,
  // CP_x: 0.2047359886,
  // CP_y: 0,
  // CP_z: 4.559636246,
  // Line_dir: "#139",
  // DIR_NAME: null,
  // dx: 0,
  // dy: -1,
  // dz: 0,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: 10
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 3,
  // Line_DTYPE: "#56",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#166",
  // Line_CP: "#166",
  // CP_NAME: null,
  // CP_x: 0.2047359886,
  // CP_y: 0,
  // CP_z: 4.559636246,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 3,
  // Line_DTYPE: "#57",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#168",
  // Line_CP: "#168",
  // CP_NAME: null,
  // CP_x: 6.293889977,
  // CP_y: 0,
  // CP_z: 1.1485608120056501,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 3,
  // Line_DTYPE: "#53",
  // DTYPE: "CIRCLE",
  // Line_next: "#127",
  // Line_CP: "#169",
  // CP_NAME: "Origin",
  // CP_x: 2.2938899768341301,
  // CP_y: 0,
  // CP_z: 1.1485608120056501,
  // Line_dir: "#140",
  // DIR_NAME: "center_axis",
  // dx: 0,
  // dy: 1,
  // dz: 0,
  // Line_refdir: "#141",
  // rdx: 0.4887287095,
  // rdy: 0,
  // rdz: 0.87243581341242704,
  // radius: 4,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 4,
  // Line_DTYPE: "#57",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#168",
  // Line_CP: "#168",
  // CP_NAME: null,
  // CP_x: 6.293889977,
  // CP_y: 0,
  // CP_z: 1.1485608120056501,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 4,
  // Line_DTYPE: "#54",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#163",
  // Line_CP: "#163",
  // CP_NAME: null,
  // CP_x: 6.293889977,
  // CP_y: 10,
  // CP_z: 1.1485608120056501,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 4,
  // Line_DTYPE: "#33",
  // DTYPE: "LINE",
  // Line_next: "#170",
  // Line_CP: "#170",
  // CP_NAME: null,
  // CP_x: 6.293889977,
  // CP_y: 0,
  // CP_z: 1.1485608120056501,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: 0,
  // dy: 1,
  // dz: 0,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: 10
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#98",
  // Bound: "CYLINDRICAL_SURFACE",
  // Oriented_Edge: null,
  // Line_DTYPE: null,
  // DTYPE: null,
  // Line_next: "#125",
  // Line_CP: "#162",
  // CP_NAME: "Origin",
  // CP_x: 2.293889977,
  // CP_y: 0,
  // CP_z: 1.148560812,
  // Line_dir: "#135",
  // DIR_NAME: "center_axis",
  // dx: 0,
  // dy: 1,
  // dz: 0,
  // Line_refdir: "#136",
  // rdx: 0.4887287095,
  // rdy: 0,
  // rdz: 0.87243581341242704,
  // radius: 4,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 2, surface:"PLANE",
  // Line_bound: "#21",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#54",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#163",
  // Line_CP: "#163",
  // CP_NAME: null,
  // CP_x: 6.293889977,
  // CP_y: 10,
  // CP_z: 1.1485608120056501,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 2, surface:"PLANE",
  // Line_bound: "#21",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#55",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#164",
  // Line_CP: "#164",
  // CP_NAME: null,
  // CP_x: 0.2047359886,
  // CP_y: 10,
  // CP_z: 4.559636246,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  //   this.stepFileData = {
  //     Advanced_Face: 2, surface:"PLANE",
  // Line_bound: "#21",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#52",
  // DTYPE: "CIRCLE",
  // Line_next: "#126",
  // Line_CP: "#165",
  // CP_NAME: "Origin",
  // CP_x: 2.293889977,
  // CP_y: 10,
  // CP_z: 1.148560812,
  // Line_dir: "#137",
  // DIR_NAME: "center_axis",
  // dx: 0,
  // dy: -1,
  // dz: 0,
  // Line_refdir: "#138",
  // rdx: 0.4887287095,
  // rdy: 0,
  // rdz: 0.87243581341242704,
  // radius: 4,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  //   this.stepFileData = {

  //   Advanced_Face: 2, surface:"PLANE",
  // Line_bound: "#21",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#54",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#163",
  // Line_CP: "#163",
  // CP_NAME: null,
  // CP_x: 6.293889977,
  // CP_y: 10,
  // CP_z: 1.1485608120056501,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {Advanced_Face: 2, surface:"PLANE",
  //   Line_bound: "#21",
  //   Bound: "FACE_OUTER_BOUND",
  //   Oriented_Edge: 2,
  //   Line_DTYPE: "#58",
  //   DTYPE: "VERTEX_POINT",
  //   Line_next: "#172",
  //   Line_CP: "#172",
  //   CP_NAME: null,
  //   CP_x: 6.293889977,
  //   CP_y: 10,
  //   CP_z: -12.114709126632199,
  //   Line_dir: null,
  //   DIR_NAME: null,
  //   dx: null,
  //   dy: null,
  //   dz: null,
  //   Line_refdir: null,
  //   rdx: null,
  //   rdy: null,
  //   rdz: null,
  //   radius: null,
  //   Line_vector: null,
  //   magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 2, surface:"PLANE",
  // Line_bound: "#21",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#34",
  // DTYPE: "LINE",
  // Line_next: "#173",
  // Line_CP: "#173",
  // CP_NAME: null,
  // CP_x: 6.293889977,
  // CP_y: 10,
  // CP_z: 8.289011508,
  // Line_dir: "#145",
  // DIR_NAME: null,
  // dx: 0,
  // dy: 0,
  // dz: -1,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: "#44",
  // magnitude: 10
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {Advanced_Face: 2, surface:"PLANE",
  //   Line_bound: "#21",
  //   Bound: "FACE_OUTER_BOUND",
  //   Oriented_Edge: 3,
  //   Line_DTYPE: "#58",
  //   DTYPE: "VERTEX_POINT",
  //   Line_next: "#172",
  //   Line_CP: "#172",
  //   CP_NAME: null,
  //   CP_x: 6.293889977,
  //   CP_y: 10,
  //   CP_z: -12.114709126632199,
  //   Line_dir: null,
  //   DIR_NAME: null,
  //   dx: null,
  //   dy: null,
  //   dz: null,
  //   Line_refdir: null,
  //   rdx: null,
  //   rdy: null,
  //   rdz: null,
  //   radius: null,
  //   Line_vector: null,
  //   magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {Advanced_Face: 2, surface:"PLANE",
  //   Line_bound: "#21",
  //   Bound: "FACE_OUTER_BOUND",
  //   Oriented_Edge: 3,
  //   Line_DTYPE: "#59",
  //   DTYPE: "VERTEX_POINT",
  //   Line_next: "#174",
  //   Line_CP: "#174",
  //   CP_NAME: null,
  //   CP_x: -7.2400303,
  //   CP_y: 10,
  //   CP_z: 0,
  //   Line_dir: null,
  //   DIR_NAME: null,
  //   dx: null,
  //   dy: null,
  //   dz: null,
  //   Line_refdir: null,
  //   rdx: null,
  //   rdy: null,
  //   rdz: null,
  //   radius: null,
  //   Line_vector: null,
  //   magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 2, surface:"PLANE",
  // Line_bound: "#21",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 3,
  // Line_DTYPE: "#35",
  // DTYPE: "LINE",
  // Line_next: "#175",
  // Line_CP: "#175",
  // CP_NAME: null,
  // CP_x: 6.293889977,
  // CP_y: 10,
  // CP_z: -12.114709126632199,
  // Line_dir: "#146",
  // DIR_NAME: null,
  // dx: -0.7450932354,
  // dy: 0,
  // dz: 0.6669603215,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: "#45",
  // magnitude: 10
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {Advanced_Face: 2, surface:"PLANE",
  //   Line_bound: "#21",
  //   Bound: "FACE_OUTER_BOUND",
  //   Oriented_Edge: 4,
  //   Line_DTYPE: "#59",
  //   DTYPE: "VERTEX_POINT",
  //   Line_next: "#174",
  //   Line_CP: "#174",
  //   CP_NAME: null,
  //   CP_x: -7.2400303,
  //   CP_y: 10,
  //   CP_z: 0,
  //   Line_dir: null,
  //   DIR_NAME: null,
  //   dx: null,
  //   dy: null,
  //   dz: null,
  //   Line_refdir: null,
  //   rdx: null,
  //   rdy: null,
  //   rdz: null,
  //   radius: null,
  //   Line_vector: null,
  //   magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 2, surface:"PLANE",
  // Line_bound: "#21",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 4,
  // Line_DTYPE: "#55",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#164",
  // Line_CP: "#164",
  // CP_NAME: null,
  // CP_x: 0.2047359886,
  // CP_y: 10,
  // CP_z: 4.559636246,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 2, surface:"PLANE",
  // Line_bound: "#21",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 4,
  // Line_DTYPE: "#36",
  // DTYPE: "LINE",
  // Line_next: "#176",
  // Line_CP: "#176",
  // CP_NAME: "null",
  // CP_x: -7.2400303,
  // CP_y: 10,
  // CP_z: 0,
  // Line_dir: "#147",
  // DIR_NAME: null,
  // dx: 0.8527688584,
  // dy: 0,
  // dz: 0.522288497,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: "#46",
  // magnitude: 10
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 2, surface:"PLANE",
  //   Line_bound: "#15",
  //   Bound: "PLANE",
  //   Oriented_Edge: null,
  //   Line_DTYPE: null,
  //   DTYPE: null,
  //   Line_next: "#128",
  //   Line_CP: "#171",
  //   CP_NAME: "Origin",
  //   CP_x: -0.4730701617,
  //   CP_y: 10,
  //   CP_z: -1.912848809,
  //   Line_dir: "#143",
  //   DIR_NAME: "center_axis",
  //   dx: 0,
  //   dy: 1,
  //   dz: 0,
  //   Line_refdir: "#144",
  //   rdx: 0,
  //   rdy: 0,
  //   rdz: 1,
  //   radius: null,
  //   Line_vector: null,
  //   magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 3,surface:"PLANE",
  //   Line_bound: "#22",
  //   Bound: "FACE_OUTER_BOUND",
  //   Oriented_Edge: 1,
  //   Line_DTYPE: "#57",
  //   DTYPE: "VERTEX_POINT",
  //   Line_next: "#168",
  //   Line_CP: "#168",
  //   CP_NAME: null,
  //   CP_x: 6.293889977,
  //   CP_y: 0,
  //   CP_z: 1.1485608120056501,
  //   Line_dir: null,
  //   DIR_NAME: null,
  //   dx: null,
  //   dy: null,
  //   dz: null,
  //   Line_refdir: null,
  //   rdx: null,
  //   rdy: null,
  //   rdz: null,
  //   radius: null,
  //   Line_vector: null,
  //   magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 3,surface:"PLANE",
  // Line_bound: "#22",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#54",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#163",
  // Line_CP: "#163",
  // CP_NAME: null,
  // CP_x: 6.293889977,
  // CP_y: 10,
  // CP_z: 1.1485608120056501,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 3,surface:"PLANE",
  // Line_bound: "#22",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#33",
  // DTYPE: "LINE",
  // Line_next: "#170",
  // Line_CP: "#170",
  // CP_NAME: null,
  // CP_x: 6.293889977,
  // CP_y: 0,
  // CP_z: 1.1485608120056501,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: 0,
  // dy: 1,
  // dz: 0,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: "#43",
  // magnitude: 10
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 3,surface:"PLANE",
  // Line_bound: "#22",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#57",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#168",
  // Line_CP: "#168",
  // CP_NAME: null,
  // CP_x: 6.293889977,
  // CP_y: 0,
  // CP_z: 1.1485608120056501,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 3,surface:"PLANE",
  // Line_bound: "#22",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#60",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#178",
  // Line_CP: "#178",
  // CP_NAME: null,
  // CP_x: 6.293889977,
  // CP_y: 0,
  // CP_z: -12.114709126632199,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 3,surface:"PLANE",
  // Line_bound: "#22",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#37",
  // DTYPE: "LINE",
  // Line_next: "#179",
  // Line_CP: "#179",
  // CP_NAME: null,
  // CP_x: 6.293889977,
  // CP_y: 0,
  // CP_z: 8.289011508,
  // Line_dir: "#150",
  // DIR_NAME: null,
  // dx: 0,
  // dy: 0,
  // dz: -1,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: "#47",
  // magnitude: 10
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 3,surface:"PLANE",
  // Line_bound: "#22",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 3,
  // Line_DTYPE: "#60",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#178",
  // Line_CP: "#178",
  // CP_NAME: null,
  // CP_x: 6.293889977,
  // CP_y: 0,
  // CP_z: -12.114709126632199,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 3,surface:"PLANE",
  // Line_bound: "#22",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 3,
  // Line_DTYPE: "#58",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#172",
  // Line_CP: "#172",
  // CP_NAME: null,
  // CP_x: 6.293889977,
  // CP_y: 10,
  // CP_z: -12.114709126632199,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 3,surface:"PLANE",
  //   Line_bound: "#22",
  //   Bound: "FACE_OUTER_BOUND",
  //   Oriented_Edge: 3,
  //   Line_DTYPE: "#38",
  //   DTYPE: "LINE",
  //   Line_next: "#180",
  //   Line_CP: "#180",
  //   CP_NAME: null,
  //   CP_x: 6.293889977,
  //   CP_y: 0,
  //   CP_z: -12.114709126632199,
  //   Line_dir: "#151",
  //   DIR_NAME: null,
  //   dx: 0,
  //   dy: 1,
  //   dz: 0,
  //   Line_refdir: null,
  //   rdx: null,
  //   rdy: null,
  //   rdz: null,
  //   radius: null,
  //   Line_vector: "#48",
  //   magnitude: 10
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 3,surface:"PLANE",
  // Line_bound: "#22",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 4,
  // Line_DTYPE: "#54",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#163",
  // Line_CP: "#163",
  // CP_NAME: null,
  // CP_x: 6.293889977,
  // CP_y: 10,
  // CP_z: 1.1485608120056501,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  //   this.stepFileData = {
  //     Advanced_Face: 3,surface:"PLANE",
  // Line_bound: "#22",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 4,
  // Line_DTYPE: "#58",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#172",
  // Line_CP: "#172",
  // CP_NAME: null,
  // CP_x: 6.293889977,
  // CP_y: 10,
  // CP_z: -12.114709126632199,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);  this.stepFileData = {
  //   Advanced_Face: 3,surface:"PLANE",
  // Line_bound: "#22",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 4,
  // Line_DTYPE: "#34",
  // DTYPE: "LINE",
  // Line_next: "#173",
  // Line_CP: "#173",
  // CP_NAME: null,
  // CP_x: 6.293889977,
  // CP_y: 10,
  // CP_z: 8.289011508,
  // Line_dir: "#145",
  // DIR_NAME: null,
  // dx: 0,
  // dy: 0,
  // dz: -1,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: "#44",
  // magnitude: 10
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 3,surface:"PLANE",
  // Line_bound: "#16",
  // Bound: "PLANE",
  // Oriented_Edge: null,
  // Line_DTYPE: null,
  // DTYPE: null,
  // Line_next: "#129",
  // Line_CP: "#177",
  // CP_NAME: "Origin",
  // CP_x: 6.293889977,
  // CP_y: 0,
  // CP_z: 8.289011508,
  // Line_dir: "#148",
  // DIR_NAME: "center_axis",
  // dx: 1,
  // dy: 0,
  // dz: 0,
  // Line_refdir: "#149",
  // rdx: 0,
  // rdy: 0,
  // rdz: -1,
  // radius: null,
  // Line_vector: null,
  // magnitude: null

  // };
  // this.stepFileDataArr.push(this.stepFileData);

  // this.stepFileData = {
  //   Advanced_Face: 6,surface:"PLANE",
  //   Line_bound: "#25",
  //   Bound: "FACE_BOUND",
  //   Oriented_Edge: 1,
  //   Line_DTYPE: "#56",
  //   DTYPE: "VERTEX_POINT",
  //   Line_next: "#166",
  //   Line_CP: "#166",
  //   CP_NAME: null,
  //   CP_x: -2.0559210230718601,
  //   CP_y: 5.1900029423855196,
  //   CP_z: 3.1750697931866099,
  //   Line_dir: null,
  //   DIR_NAME: null,
  //   dx: null,
  //   dy: null,
  //   dz: null,
  //   Line_refdir: null,
  //   rdx: null,
  //   rdy: null,
  //   rdz: null,
  //   radius: null,
  //   Line_vector: null,
  //   magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  
  //   Advanced_Face: 6,surface:"PLANE",
  // Line_bound: "#25",
  // Bound: "FACE_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#57",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#168",
  // Line_CP: "#168",
  // CP_NAME: null,
  // CP_x: -5.4669964566560099,
  // CP_y: 5.1900029423855196,
  // CP_z: 1.0859158049897899,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null

  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 6,surface:"PLANE",
  //   Line_bound: "#25",
  //   Bound: "FACE_BOUND",
  //   Oriented_Edge: 1,
  //   Line_DTYPE: "#53",
  //   DTYPE: "CIRCLE",
  //   Line_next: "#127",
  //   Line_CP: "#169",
  //   CP_NAME: "Origin",
  //   CP_x: -3.7614587398639401,
  //   CP_y: 5.1900029423855196,
  //   CP_z: 2.1304927990881999,
  //   Line_dir: "#140",
  //   DIR_NAME: "center_axis",
  //   dx:0.52228849704920399,
  //   dy: 0.,
  //   dz: -0.852768858396039,
  //   Line_refdir: "#141",
  //   rdx: 0.852768858396039,
  //   rdy:9.4676362127459199E-017,
  //   rdz: 0.52228849704920399,
  //   radius: 2,
  //   Line_vector: null,
  //   magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);

  
 
  // this.stepFileData = {
  
  //   Advanced_Face: 6,surface:"PLANE",
  // Line_bound: "#25",
  // Bound: "FACE_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#57",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#168",
  // Line_CP: "#168",
  // CP_NAME: null,
  // CP_x: -5.4669964566560099,
  // CP_y: 5.1900029423855196,
  // CP_z: 1.0859158049897899,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null

  // };
  // this.stepFileDataArr.push(this.stepFileData);

  // this.stepFileData = {
  //   Advanced_Face: 6,surface:"PLANE",
  //   Line_bound: "#25",
  //   Bound: "FACE_BOUND",
  //   Oriented_Edge: 1,
  //   Line_DTYPE: "#56",
  //   DTYPE: "VERTEX_POINT",
  //   Line_next: "#166",
  //   Line_CP: "#166",
  //   CP_NAME: null,
  //   CP_x: -2.0559210230718601,
  //   CP_y: 5.1900029423855196,
  //   CP_z: 3.1750697931866099,
  //   Line_dir: null,
  //   DIR_NAME: null,
  //   dx: null,
  //   dy: null,
  //   dz: null,
  //   Line_refdir: null,
  //   rdx: null,
  //   rdy: null,
  //   rdz: null,
  //   radius: null,
  //   Line_vector: null,
  //   magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 6,surface:"PLANE",
  //   Line_bound: "#25",
  //   Bound: "FACE_BOUND",
  //   Oriented_Edge: 1,
  //   Line_DTYPE: "#53",
  //   DTYPE: "CIRCLE",
  //   Line_next: "#127",
  //   Line_CP: "#169",
  //   CP_NAME: "Origin",
  //   CP_x: -3.7614587398639401,
  //   CP_y: 5.1900029423855196,
  //   CP_z: 2.1304927990881999,
  //   Line_dir: "#140",
  //   DIR_NAME: "center_axis",
  //   dx:0.52228849704920399,
  //   dy: 0.,
  //   dz: -0.852768858396039,
  //   Line_refdir: "#141",
  //   rdx: 0.852768858396039,
  //   rdy:9.4676362127459199E-017,
  //   rdz: 0.52228849704920399,
  //   radius: 2,
  //   Line_vector: null,
  //   magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 4,surface:"PLANE",
  // Line_bound: "#23",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#55",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#164",
  // Line_CP: "#164",
  // CP_NAME: null,
  // CP_x: 0.2047359886,
  // CP_y: 10,
  // CP_z: 4.559636246,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 4,surface:"PLANE",
  // Line_bound: "#23",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#56",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#166",
  // Line_CP: "#166",
  // CP_NAME: null,
  // CP_x: 0.2047359886,
  // CP_y: 0,
  // CP_z: 4.559636246,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {

  //   Advanced_Face: 4,surface:"PLANE",
  // Line_bound: "#23",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#32",
  // DTYPE: "LINE",
  // Line_next: "#167",
  // Line_CP: "#167",
  // CP_NAME: null,
  // CP_x: 0.2047359886,
  // CP_y: 0,
  // CP_z: 4.559636246,
  // Line_dir: "#139",
  // DIR_NAME: null,
  // dx: 0,
  // dy: -1,
  // dz: 0,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: "#42",
  // magnitude: 10
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 4,surface:"PLANE",
  // Line_bound: "#23",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#59",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#174",
  // Line_CP: "#174",
  // CP_NAME: null,
  // CP_x: -7.2400303,
  // CP_y: 10,
  // CP_z: 0,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 4,surface:"PLANE",
  // Line_bound: "#23",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#55",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#164",
  // Line_CP: "#164",
  // CP_NAME: null,
  // CP_x: 0.2047359886,
  // CP_y: 10,
  // CP_z: 4.559636246,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 4,surface:"PLANE",
  // Line_bound: "#23",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#36",
  // DTYPE: "LINE",
  // Line_next: "#176",
  // Line_CP: "#176",
  // CP_NAME: "nulll",
  // CP_x: -7.2400303,
  // CP_y: 10,
  // CP_z: 0,
  // Line_dir: "#147",
  // DIR_NAME: null,
  // dx: 0.8527688584,
  // dy: 0,
  // dz: 0.522288497,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: "#46",
  // magnitude: 10
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 4,surface:"PLANE",
  // Line_bound: "#23",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 3,
  // Line_DTYPE: "#61",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#182",
  // Line_CP: "#182",
  // CP_NAME: null,
  // CP_x: -7.2400303,
  // CP_y: 0,
  // CP_z: 0,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 4,surface:"PLANE",
  // Line_bound: "#23",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 3,
  // Line_DTYPE: "#59",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#174",
  // Line_CP: "#174",
  // CP_NAME: null,
  // CP_x: -7.2400303,
  // CP_y: 10,
  // CP_z: 0,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 4,surface:"PLANE",
  // Line_bound: "#23",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 3,
  // Line_DTYPE: "#39",
  // DTYPE: "LINE",
  // Line_next: "#183",
  // Line_CP: "#183",
  // CP_NAME: "null",
  // CP_x: -7.2400303,
  // CP_y: 0,
  // CP_z: 0,
  // Line_dir: "#154",
  // DIR_NAME: null,
  // dx: 0,
  // dy: 1,
  // dz: 0,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: "#49",
  // magnitude: 10
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 4,surface:"PLANE",
  // Line_bound: "#23",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 4,
  // Line_DTYPE: "#61",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#182",
  // Line_CP: "#182",
  // CP_NAME: null,
  // CP_x: -7.2400303,
  // CP_y: 0,
  // CP_z: 0,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 4,surface:"PLANE",
  // Line_bound: "#23",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 4,
  // Line_DTYPE: "#56",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#166",
  // Line_CP: "#166",
  // CP_NAME: null,
  // CP_x: 0.2047359886,
  // CP_y: 0,
  // CP_z: 4.559636246,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 4,surface:"PLANE",
  // Line_bound: "#23",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 4,
  // Line_DTYPE: "#40",
  // DTYPE: "LINE",
  // Line_next: "#184",
  // Line_CP: "#184",
  // CP_NAME: "null",
  // CP_x: -7.2400303,
  // CP_y: 0,
  // CP_z: 0,
  // Line_dir: "#155",
  // DIR_NAME: null,
  // dx: 0.8527688584,
  // dy: 0,
  // dz: 0.522288497,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: "#50",
  // magnitude: 10
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 4,surface:"PLANE",
  // Line_bound: "#17",
  // Bound: "PLANE",
  // Oriented_Edge: "null",
  // Line_DTYPE: null,
  // DTYPE: null,
  // Line_next: "#130",
  // Line_CP: "#181",
  // CP_NAME: "Origin",
  // CP_x: -7.2400303,
  // CP_y: 0,
  // CP_z: 0,
  // Line_dir: "#152",
  // DIR_NAME: "center_axis",
  // dx: -0.522288497,
  // dy: 0,
  // dz: 0.8527688584,
  // Line_refdir: "null",
  // rdx: 0.852768858396039,
  // rdy: 0.,
  // rdz: 0.52228849704920399,
  // radius: "null",
  // Line_vector: "null",
  // magnitude: "null"
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#55",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#164",
  // Line_CP: "#164",
  // CP_NAME: null,
  // CP_x:0.53823788487143998,
  // CP_y: 6.87167652557293,
  // CP_z: -6.9626135400485403,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#56",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#166",
  // Line_CP: "#166",
  // CP_NAME: null,
  // CP_x: -1.84313614454922,
  // CP_y: 5.1900029423855196,
  // CP_z: -4.83095818094233033,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#52",
  // DTYPE: "ELLIPSE",
  // Line_next: "#126",
  // Line_CP: "#165",
  // CP_NAME: "Origin",
  // CP_x: 3.34830820925752,
  // CP_y: 5.1900029423855196,
  // CP_z:-9.4780106983438195,
  // Line_dir: "#137",
  // DIR_NAME: "center_axis",
  // dx: 0.66696032153528295,
  // dy: 0.,
  // dz: 0.74509323543939898,
  // Line_refdir: "#138",
  // rdx: 0.74509323543939898,
  // rdy: 2.7176528214331599E-017,
  // rdz: -0.66696032153528295,
  // radius: 2,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#55",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#164",
  // Line_CP: "#164",
  // CP_NAME: null,
  // CP_x:-1.84313614454922,
  // CP_y: 5.1900029423855196,
  // CP_z: -4.8309581809423303,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#56",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#166",
  // Line_CP: "#166",
  // CP_NAME: null,
  // CP_x: 0.53823788487143998,
  // CP_y: 3.5083293591981,
  // CP_z: -6.9626135400485403,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#52",
  // DTYPE: "ELLIPSE",
  // Line_next: "#126",
  // Line_CP: "#165",
  // CP_NAME: "Origin",
  // CP_x: 3.34830820925752,
  // CP_y: 5.1900029423855196,
  // CP_z:-9.4780106983438195,
  // Line_dir: "#137",
  // DIR_NAME: "center_axis",
  // dx: 0.66696032153528295,
  // dy: 0.,
  // dz: 0.74509323543939898,
  // Line_refdir: "#138",
  // rdx: 0.74509323543939898,
  // rdy: 2.7176528214331599E-017,
  // rdz: -0.66696032153528295,
  // radius: 2,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#55",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#164",
  // Line_CP: "#164",
  // CP_NAME: null,
  // CP_x: 0.53823788487143998,
  // CP_y: 3.5083293591981,
  // CP_z: -6.9626135400485403,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#56",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#166",
  // Line_CP: "#166",
  // CP_NAME: null,
  // CP_x: 0.53823788487143998,
  // CP_y: 6.87167652557293,
  // CP_z: -6.9626135400485403,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 1, surface:null,
  // Line_bound: "#20",
  // Bound: "FACE_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#32",
  // DTYPE: "LINE",
  // Line_next: "#167",
  // Line_CP: "#167",
  // CP_NAME: null,
  // CP_x: 0.2047359886,
  // CP_y: 0,
  // CP_z: 4.559636246,
  // Line_dir: "#139",
  // DIR_NAME: null,
  // dx: 0,
  // dy: -1,
  // dz: 0,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: 10
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 5,surface:"PLANE",
  // Line_bound: "#24",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#60",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#178",
  // Line_CP: "#178",
  // CP_NAME: null,
  // CP_x: 6.293889977,
  // CP_y: 0,
  // CP_z: -12.114709126632199,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
    
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 5,surface:"PLANE",
  // Line_bound: "#24",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#61",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#182",
  // Line_CP: "#182",
  // CP_NAME: null,
  // CP_x: -7.2400303,
  // CP_y: 0,
  // CP_z: 0,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 5,surface:"PLANE",
  // Line_bound: "#24",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#41",
  // DTYPE: "LINE",
  // Line_next: "#186",
  // Line_CP: "#186",
  // CP_NAME: null,
  // CP_x: 6.293889977,
  // CP_y: 0,
  // CP_z: -12.114709126632199,
  // Line_dir: "#158",
  // DIR_NAME: null,
  // dx: -0.7450932354,
  // dy: 0,
  // dz: 0.6669603215,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: 10
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 5,surface:"PLANE",
  //   Line_bound: "#24",
  //   Bound: "FACE_OUTER_BOUND",
  //   Oriented_Edge: 2,
  //   Line_DTYPE: "#61",
  //   DTYPE: "VERTEX_POINT",
  //   Line_next: "#182",
  //   Line_CP: "#182",
  //   CP_NAME: null,
  //   CP_x: -7.2400303,
  //   CP_y: 0,
  //   CP_z: 0,
  //   Line_dir: null,
  //   DIR_NAME: null,
  //   dx: null,
  //   dy: null,
  //   dz: null,
  //   Line_refdir: null,
  //   rdx: null,
  //   rdy: null,
  //   rdz: null,
  //   radius: null,
  //   Line_vector: null,
  //   magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 5,surface:"PLANE",
  // Line_bound: "#24",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#59",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#174",
  // Line_CP: "#174",
  // CP_NAME: null,
  // CP_x: -7.2400303,
  // CP_y: 10,
  // CP_z: 0,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 5,surface:"PLANE",
  // Line_bound: "#24",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#39",
  // DTYPE: "LINE",
  // Line_next: "#183",
  // Line_CP: "#183",
  // CP_NAME: null,
  // CP_x: -7.2400303,
  // CP_y: 0,
  // CP_z: 0,
  // Line_dir: "#154",
  // DIR_NAME: null,
  // dx: 0,
  // dy: 1,
  // dz: 0,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 5,surface:"PLANE",
  // Line_bound: "#24",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 3,
  // Line_DTYPE: "#58",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#172",
  // Line_CP: "#172",
  // CP_NAME: null,
  // CP_x: 6.293889977,
  // CP_y: 10,
  // CP_z: -12.114709126632199,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 5,surface:"PLANE",
  // Line_bound: "#24",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 3,
  // Line_DTYPE: "#59",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#174",
  // Line_CP: "#174",
  // CP_NAME: null,
  // CP_x: -7.2400303,
  // CP_y: 10,
  // CP_z: 0,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 5,surface:"PLANE",
  //   Line_bound: "#24",
  //   Bound: "FACE_OUTER_BOUND",
  //   Oriented_Edge: 3,
  //   Line_DTYPE: "#35",
  //   DTYPE: "LINE",
  //   Line_next: "#175",
  //   Line_CP: "#175",
  //   CP_NAME: null,
  //   CP_x: 6.293889977,
  //   CP_y: 10,
  //   CP_z: -12.114709126632199,
  //   Line_dir: "#146",
  //   DIR_NAME: null,
  //   dx: -0.7450932354,
  //   dy: 0,
  //   dz: 0.6669603215,
  //   Line_refdir: null,
  //   rdx: null,
  //   rdy: null,
  //   rdz: null,
  //   radius: null,
  //   Line_vector: null,
  //   magnitude: 10
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 5,surface:"PLANE",
  //   Line_bound: "#24",
  //   Bound: "FACE_OUTER_BOUND",
  //   Oriented_Edge: 4,
  //   Line_DTYPE: "#60",
  //   DTYPE: "VERTEX_POINT",
  //   Line_next: "#178",
  //   Line_CP: "#178",
  //   CP_NAME: null,
  //   CP_x: 6.293889977,
  //   CP_y: 0,
  //   CP_z: -12.114709126632199,
  //   Line_dir: null,
  //   DIR_NAME: null,
  //   dx: null,
  //   dy: null,
  //   dz: null,
  //   Line_refdir: null,
  //   rdx: null,
  //   rdy: null,
  //   rdz: null,
  //   radius: null,
  //   Line_vector: null,
  //   magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 5,surface:"PLANE",
  // Line_bound: "#24",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 4,
  // Line_DTYPE: "#58",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#172",
  // Line_CP: "#172",
  // CP_NAME: null,
  // CP_x: 6.293889977,
  // CP_y: 10,
  // CP_z: -12.114709126632199,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 5,surface:"PLANE",
  // Line_bound: "#24",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 4,
  // Line_DTYPE: "#38",
  // DTYPE: "LINE",
  // Line_next: "#180",
  // Line_CP: "#180",
  // CP_NAME: null,
  // CP_x: 6.293889977,
  // CP_y: 0,
  // CP_z: -12.114709126632199,
  // Line_dir: "#151",
  // DIR_NAME: null,
  // dx: 0,
  // dy: 1,
  // dz: 0,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: 10
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 5,surface:"PLANE",
  // Line_bound: "#18",
  // Bound: "PLANE",
  // Oriented_Edge: null,
  // Line_DTYPE: null,
  // DTYPE: null,
  // Line_next: "#131",
  // Line_CP: "#185",
  // CP_NAME: "Origin",
  // CP_x: 6.293889977,
  // CP_y: 0,
  // CP_z: -12.114709126632199,
  // Line_dir: "#156",
  // DIR_NAME: "center_axis",
  // dx: -0.6669603215,
  // dy: 0,
  // dz: -0.7450932354,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 6,surface:"PLANE",
  //   Line_bound: "#25",
  //   Bound: "FACE_OUTER_BOUND",
  //   Oriented_Edge: 1,
  //   Line_DTYPE: "#56",
  //   DTYPE: "VERTEX_POINT",
  //   Line_next: "#166",
  //   Line_CP: "#166",
  //   CP_NAME: null,
  //   CP_x: 0.2047359886,
  //   CP_y: 0,
  //   CP_z: 4.559636246,
  //   Line_dir: null,
  //   DIR_NAME: null,
  //   dx: null,
  //   dy: null,
  //   dz: null,
  //   Line_refdir: null,
  //   rdx: null,
  //   rdy: null,
  //   rdz: null,
  //   radius: null,
  //   Line_vector: null,
  //   magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  
  //   Advanced_Face: 6,surface:"PLANE",
  // Line_bound: "#25",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 1,
  // Line_DTYPE: "#57",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#168",
  // Line_CP: "#168",
  // CP_NAME: null,
  // CP_x: 6.293889977,
  // CP_y: 0,
  // CP_z: 1.1485608120056501,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null

  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 6,surface:"PLANE",
  //   Line_bound: "#25",
  //   Bound: "FACE_OUTER_BOUND",
  //   Oriented_Edge: 1,
  //   Line_DTYPE: "#53",
  //   DTYPE: "CIRCLE",
  //   Line_next: "#127",
  //   Line_CP: "#169",
  //   CP_NAME: "Origin",
  //   CP_x: 2.2938899768341301,
  //   CP_y: 0,
  //   CP_z: 1.1485608120056501,
  //   Line_dir: "#140",
  //   DIR_NAME: "center_axis",
  //   dx: 0,
  //   dy: 1,
  //   dz: 0,
  //   Line_refdir: "#141",
  //   rdx: 0.4887287095,
  //   rdy: 0,
  //   rdz: 0.87243581341242704,
  //   radius: 4,
  //   Line_vector: null,
  //   magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 6,surface:"PLANE",
  // Line_bound: "#25",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 2,
  // Line_DTYPE: "#61",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#182",
  // Line_CP: "#182",
  // CP_NAME: null,
  // CP_x: -7.2400303,
  // CP_y: 0,
  // CP_z: 0,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 6,surface:"PLANE",
  //   Line_bound: "#25",
  //   Bound: "FACE_OUTER_BOUND",
  //   Oriented_Edge: 2,
  //   Line_DTYPE: "#56",
  //   DTYPE: "VERTEX_POINT",
  //   Line_next: "#166",
  //   Line_CP: "#166",
  //   CP_NAME: null,
  //   CP_x: 0.2047359886,
  //   CP_y: 0,
  //   CP_z: 4.559636246,
  //   Line_dir: null,
  //   DIR_NAME: null,
  //   dx: null,
  //   dy: null,
  //   dz: null,
  //   Line_refdir: null,
  //   rdx: null,
  //   rdy: null,
  //   rdz: null,
  //   radius: null,
  //   Line_vector: null,
  //   magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 6,surface:"PLANE",
  //   Line_bound: "#25",
  //   Bound: "FACE_OUTER_BOUND",
  //   Oriented_Edge: 2,
  //   Line_DTYPE: "#40",
  //   DTYPE: "LINE",
  //   Line_next: "#184",
  //   Line_CP: "#184",
  //   CP_NAME: null,
  //   CP_x: -7.2400303,
  //   CP_y: 0,
  //   CP_z: 0,
  //   Line_dir: "#155",
  //   DIR_NAME: null,
  //   dx: 0.8527688584,
  //   dy: 0,
  //   dz: 0.522288497,
  //   Line_refdir: null,
  //   rdx: null,
  //   rdy: null,
  //   rdz: null,
  //   radius: null,
  //   Line_vector: null,
  //   magnitude: 10
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 6,surface:"PLANE",
  //   Line_bound: "#25",
  //   Bound: "FACE_OUTER_BOUND",
  //   Oriented_Edge: 3,
  //   Line_DTYPE: "#60",
  //   DTYPE: "VERTEX_POINT",
  //   Line_next: "#178",
  //   Line_CP: "#178",
  //   CP_NAME: null,
  //   CP_x: 6.293889977,
  //   CP_y: 0,
  //   CP_z: -12.114709126632199,
  //   Line_dir: null,
  //   DIR_NAME: null,
  //   dx: null,
  //   dy: null,
  //   dz: null,
  //   Line_refdir: null,
  //   rdx: null,
  //   rdy: null,
  //   rdz: null,
  //   radius: null,
  //   Line_vector: null,
  //   magnitude: null
  
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 6,surface:"PLANE",
  //   Line_bound: "#25",
  //   Bound: "FACE_OUTER_BOUND",
  //   Oriented_Edge: 3,
  //   Line_DTYPE: "#61",
  //   DTYPE: "VERTEX_POINT",
  //   Line_next: "#182",
  //   Line_CP: "#182",
  //   CP_NAME: null,
  //   CP_x: -7.2400303,
  //   CP_y: 0,
  //   CP_z: 0,
  //   Line_dir: null,
  //   DIR_NAME: null,
  //   dx: null,
  //   dy: null,
  //   dz: null,
  //   Line_refdir: null,
  //   rdx: null,
  //   rdy: null,
  //   rdz: null,
  //   radius: null,
  //   Line_vector: null,
  //   magnitude: null
  
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 6,surface:"PLANE",
  //   Line_bound: "#25",
  //   Bound: "FACE_OUTER_BOUND",
  //   Oriented_Edge: 3,
  //   Line_DTYPE: "#41",
  //   DTYPE: "LINE",
  //   Line_next: "#186",
  //   Line_CP: "#186",
  //   CP_NAME: null,
  //   CP_x: 6.293889977,
  //   CP_y: 0,
  //   CP_z: -12.114709126632199,
  //   Line_dir: "#158",
  //   DIR_NAME: null,
  //   dx: -0.7450932354,
  //   dy: 0,
  //   dz: 0.6669603215,
  //   Line_refdir: null,
  //   rdx: null,
  //   rdy: null,
  //   rdz: null,
  //   radius: null,
  //   Line_vector: null,
  //   magnitude: 10
  
  // };
  // this.stepFileDataArr.push(this.stepFileData);  
  // this.stepFileData = {
  //   Advanced_Face: 6,surface:"PLANE",
  // Line_bound: "#25",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 4,
  // Line_DTYPE: "#60",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#178",
  // Line_CP: "#178",
  // CP_NAME: null,
  // CP_x: 6.293889977,
  // CP_y: 0,
  // CP_z: 1.1485608120056501,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 6,surface:"PLANE",
  // Line_bound: "#25",
  // Bound: "FACE_OUTER_BOUND",
  // Oriented_Edge: 4,
  // Line_DTYPE: "#60",
  // DTYPE: "VERTEX_POINT",
  // Line_next: "#178",
  // Line_CP: "#178",
  // CP_NAME: null,
  // CP_x: 6.293889977,
  // CP_y: 0,
  // CP_z: -12.114709126632199,
  // Line_dir: null,
  // DIR_NAME: null,
  // dx: null,
  // dy: null,
  // dz: null,
  // Line_refdir: null,
  // rdx: null,
  // rdy: null,
  // rdz: null,
  // radius: null,
  // Line_vector: null,
  // magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 6,surface:"PLANE",
  //   Line_bound: "#25",
  //   Bound: "FACE_OUTER_BOUND",
  //   Oriented_Edge: 4,
  //   Line_DTYPE: "#37",
  //   DTYPE: "LINE",
  //   Line_next: "#179",
  //   Line_CP: "#179",
  //   CP_NAME: null,
  //   CP_x: 6.293889977,
  //   CP_y: 0,
  //   CP_z: 8.289011508,
  //   Line_dir: "#150",
  //   DIR_NAME: null,
  //   dx: 0,
  //   dy: 0,
  //   dz: -1,
  //   Line_refdir: null,
  //   rdx: null,
  //   rdy: null,
  //   rdz: null,
  //   radius: null,
  //   Line_vector: null,
  //   magnitude: 10
  // };
  // this.stepFileDataArr.push(this.stepFileData);
  // this.stepFileData = {
  //   Advanced_Face: 6,surface:"PLANE",
  //   Line_bound: "#19",
  //   Bound: "PLANE",
  //   Oriented_Edge: null,
  //   Line_DTYPE: null,
  //   DTYPE: null,
  //   Line_next: "#132",
  //   Line_CP: "#187",
  //   CP_NAME: "Origin",
  //   CP_x: -0.4730701617,
  //   CP_y: 0,
  //   CP_z: -1.9128488094682401,
  //   "Line_dir": "#159",
  //   DIR_NAME: "center_axis",
  //   dx: 0,
  //   dy: 1,
  //   dz: 0,
  //   Line_refdir: "#160",
  //   rdx: 0,
  //   rdy: 0,
  //   rdz: 1,
  //   radius: null,
  //   Line_vector: null,
  //   magnitude: null
  // };
  // this.stepFileDataArr.push(this.stepFileData);

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// this.stepFileData = {
//   Advanced_Face: 1, surface:null,
// Line_bound: "#20",
// Bound: "FACE_OUTER_BOUND",
// Oriented_Edge: 2,
// Line_DTYPE: "#55",
// DTYPE: "VERTEX_POINT",
// Line_next: "#164",
// Line_CP: "#164",
// CP_NAME: null,
// CP_x:-5.4669964566560099,
// CP_y: 5.1900029423855196,
// CP_z: 1.0859158049897899,
// Line_dir: null,
// DIR_NAME: null,
// dx: null,
// dy: null,
// dz: null,
// Line_refdir: null,
// rdx: null,
// rdy: null,
// rdz: null,
// radius: null,
// Line_vector: null,
// magnitude: null
// };
// this.stepFileDataArr.push(this.stepFileData);
// this.stepFileData = {
//   Advanced_Face: 1, surface:null,
// Line_bound: "#20",
// Bound: "FACE_OUTER_BOUND",
// Oriented_Edge: 2,
// Line_DTYPE: "#56",
// DTYPE: "VERTEX_POINT",
// Line_next: "#166",
// Line_CP: "#166",
// CP_NAME: null,
// CP_x: -1.84313614454922,
// CP_y: 5.1900029423855196,
// CP_z: -4.83095818094233033,
// Line_dir: null,
// DIR_NAME: null,
// dx: null,
// dy: null,
// dz: null,
// Line_refdir: null,
// rdx: null,
// rdy: null,
// rdz: null,
// radius: null,
// Line_vector: null,
// magnitude: null
// };
// this.stepFileDataArr.push(this.stepFileData);
// this.stepFileData = {
//   Advanced_Face: 1, surface:null,
// Line_bound: "#20",
// Bound: "",
// Oriented_Edge: 2,
// Line_DTYPE: "#32",
// DTYPE: "LINE",
// Line_next: "#167",
// Line_CP: "#167",
// CP_NAME: null,
// CP_x: 0.2047359886,
// CP_y: 0,
// CP_z: 4.559636246,
// Line_dir: "#139",
// DIR_NAME: null,
// dx: 0,
// dy: -1,
// dz: 0,
// Line_refdir: null,
// rdx: null,
// rdy: null,
// rdz: null,
// radius: null,
// Line_vector: null,
// magnitude: 10
// };
// this.stepFileDataArr.push(this.stepFileData);


// this.stepFileData = {
//   Advanced_Face: 1, surface:null,
// Line_bound: "#20",
// Bound: "FACE_OUTER_BOUND",
// Oriented_Edge: 2,
// Line_DTYPE: "#55",
// DTYPE: "VERTEX_POINT",
// Line_next: "#164",
// Line_CP: "#164",
// CP_NAME: null,
// CP_x: 0.53823788487143998,
// CP_y: 3.5083293591981,
// CP_z: -6.9626135400485403,
// Line_dir: null,
// DIR_NAME: null,
// dx: null,
// dy: null,
// dz: null,
// Line_refdir: null,
// rdx: null,
// rdy: null,
// rdz: null,
// radius: null,
// Line_vector: null,
// magnitude: null
// };
// this.stepFileDataArr.push(this.stepFileData);
// this.stepFileData = {
//   Advanced_Face: 1, surface:null,
// Line_bound: "#20",
// Bound: "FACE_OUTER_BOUND",
// Oriented_Edge: 2,
// Line_DTYPE: "#56",
// DTYPE: "VERTEX_POINT",
// Line_next: "#166",
// Line_CP: "#166",
// CP_NAME: null,
// CP_x: 0.53823788487143998,
// CP_y: 6.87167652557293,
// CP_z: -6.9626135400485403,
// Line_dir: null,
// DIR_NAME: null,
// dx: null,
// dy: null,
// dz: null,
// Line_refdir: null,
// rdx: null,
// rdy: null,
// rdz: null,
// radius: null,
// Line_vector: null,
// magnitude: null
// };
// this.stepFileDataArr.push(this.stepFileData);
// this.stepFileData = {
//   Advanced_Face: 1, surface:null,
// Line_bound: "#20",
// Bound: "",
// Oriented_Edge: 2,
// Line_DTYPE: "#32",
// DTYPE: "LINE",
// Line_next: "#167",
// Line_CP: "#167",
// CP_NAME: null,
// CP_x: 0.2047359886,
// CP_y: 0,
// CP_z: 4.559636246,
// Line_dir: "#139",
// DIR_NAME: null,
// dx: 0,
// dy: -1,
// dz: 0,
// Line_refdir: null,
// rdx: null,
// rdy: null,
// rdz: null,
// radius: null,
// Line_vector: null,
// magnitude: 10
// };
// this.stepFileDataArr.push(this.stepFileData);

// this.stepFileData = {
//   Advanced_Face: 1, surface:null,
//   Line_bound: "#19",
//   Bound: "FACE_OUTER_BOUND",
//   Oriented_Edge: 1,
//   Line_DTYPE:"#30",
//   Line_CP:"#29",
//   DTYPE: "VERTEX_POINT",
//   Line_next:null,
//   CP_NAME: null,
 
//   CP_x: 0.53823788487143998,
//   CP_y: 6.87167652557293,
//   CP_z: -6.9626135400485403,
//   Line_dir:null,
//   DIR_NAME: null,
//   dx: null,
//   dy: null,
//   dz: null,
//   Line_refdir:null,
//   rdx: null,
//   rdy: null,
//   rdz: null,
//   radius: null,
//   Line_vector:null,
//   magnitude: null,
// };
// this.stepFileDataArr.push(this.stepFileData);

// this.stepFileData = {
//   Advanced_Face: 1, surface:null,
//   Line_bound: "#19",
//   Bound: "FACE_OUTER_BOUND",
//   Oriented_Edge: 1,
//   Line_DTYPE:"#30",
//   Line_CP:"#29",
//   DTYPE: "VERTEX_POINT",
//   Line_next:null,
//   CP_NAME: null,
//   CP_x: 0.53823788487143998,
//   CP_y: 3.5083293591981,
//   CP_z: -6.9626135400485403,
//   Line_dir:null,
//   DIR_NAME: null,
//   dx: null,
//   dy: null,
//   dz: null,
//   Line_refdir:null,
//   rdx: null,
//   rdy: null,
//   rdz: null,
//   radius: null,
//   Line_vector:null,
//   magnitude: null,
// };
// this.stepFileDataArr.push(this.stepFileData);

// this.stepFileData = {
//   Advanced_Face: 1, surface:null,
//   Line_bound: "#19",
//   Bound: "",
//   Oriented_Edge: 1,
//   Line_DTYPE:"#30",
//   DTYPE: "CIRCLE",
//   Line_next:"#75",
//   Line_CP:"#29",
//   CP_NAME: "Origin",
//   CP_x: 1.4614262306281001,
//   CP_y: 5.1900029423855196,
//   CP_z: -6.3971957848721903,
//   Line_dir:"#29",
//   DIR_NAME: "center_axis",
//   dx: 0.52228849704920399,
//   dy: -1.23259516440783E-032,
//   dz: -0.852768858396039,
//   Line_refdir:"#29",
//   rdx: 1,
//   rdy: 0,
//   rdz: 0,
//   radius: 2,
//   Line_vector:null,
//   magnitude: null,
// };
// this.stepFileDataArr.push(this.stepFileData);

// this.stepFileData = {
//   Advanced_Face: 1, surface:null,
//   Line_bound: "#19",
//   Bound: "FACE_OUTER_BOUND",
//   Oriented_Edge: 1,
//   Line_DTYPE:"#30",
//   Line_CP:"#29",
//   DTYPE: "VERTEX_POINT",
//   Line_next:null,
//   CP_NAME: null,
 
//   CP_x: -2.0559210230718601,
//   CP_y: 5.1900029423855196,
//   CP_z: 3.1750697931866099,
//   Line_dir:null,
//   DIR_NAME: null,
//   dx: null,
//   dy: null,
//   dz: null,
//   Line_refdir:null,
//   rdx: null,
//   rdy: null,
//   rdz: null,
//   radius: null,
//   Line_vector:null,
//   magnitude: null,
// };
// this.stepFileDataArr.push(this.stepFileData);

// this.stepFileData = {
//   Advanced_Face: 1, surface:null,
//   Line_bound: "#19",
//   Bound: "FACE_OUTER_BOUND",
//   Oriented_Edge: 1,
//   Line_DTYPE:"#30",
//   Line_CP:"#29",
//   DTYPE: "VERTEX_POINT",
//   Line_next:null,
//   CP_NAME: null,
//   CP_x:-5.4669964566560099,
//   CP_y: 5.1900029423855196,
//   CP_z: 1.0859158049897899,
//   Line_dir:null,
//   DIR_NAME: null,
//   dx: null,
//   dy: null,
//   dz: null,
//   Line_refdir:null,
//   rdx: null,
//   rdy: null,
//   rdz: null,
//   radius: null,
//   Line_vector:null,
//   magnitude: null,
// };
// this.stepFileDataArr.push(this.stepFileData);

// this.stepFileData = {
//   Advanced_Face: 1, surface:null,
//   Line_bound: "#19",
//   Bound: "",
//   Oriented_Edge: 1,
//   Line_DTYPE:"#30",
//   DTYPE: "CIRCLE",
//   Line_next:"#75",
//   Line_CP:"#29",
//   CP_NAME: "Origin",
//   CP_x: -3.7614587398639401,
//   CP_y: 5.1900029423855196,
//   CP_z: 2.1304927990881999,
//   Line_dir:"#29",
//   DIR_NAME: "center_axis",
//   dx: 0.52228849704920399,
//   dy: 0,
//   dz: -0.852768858396039,
//   Line_refdir:"#29",
//   rdx: 1,
//   rdy: 0,
//   rdz: 0,
//   radius: 2,
//   Line_vector:null,
//   magnitude: null,
// };
// this.stepFileDataArr.push(this.stepFileData);

// this.stepFileData = {
//   Advanced_Face: 1, surface:null,
//   Line_bound: "#19",
//   Bound: "FACE_OUTER_BOUND",
//   Oriented_Edge: 1,
//   Line_DTYPE:"#30",
//   Line_CP:"#29",
//   DTYPE: "VERTEX_POINT",
//   Line_next:null,
//   CP_NAME: null,
//   CP_x:-5.4669964566560099,
//   CP_y: 5.1900029423855196,
//   CP_z: 1.0859158049897899,
//   Line_dir:null,
//   DIR_NAME: null,
//   dx: null,
//   dy: null,
//   dz: null,
//   Line_refdir:null,
//   rdx: null,
//   rdy: null,
//   rdz: null,
//   radius: null,
//   Line_vector:null,
//   magnitude: null,
// };
// this.stepFileDataArr.push(this.stepFileData);

// this.stepFileData = {
//   Advanced_Face: 1, surface:null,
//   Line_bound: "#19",
//   Bound: "FACE_OUTER_BOUND",
//   Oriented_Edge: 1,
//   Line_DTYPE:"#30",
//   Line_CP:"#29",
//   DTYPE: "VERTEX_POINT",
//   Line_next:null,
//   CP_NAME: null,
//   CP_x: -2.0559210230718601,
//   CP_y: 5.1900029423855196,
//   CP_z: 3.1750697931866099,
//   Line_dir:null,
//   DIR_NAME: null,
//   dx: null,
//   dy: null,
//   dz: null,
//   Line_refdir:null,
//   rdx: null,
//   rdy: null,
//   rdz: null,
//   radius: null,
//   Line_vector:null,
//   magnitude: null,
// };
// this.stepFileDataArr.push(this.stepFileData);

// this.stepFileData = {
//   Advanced_Face: 1, surface:null,
//   Line_bound: "#19",
//   Bound: "",
//   Oriented_Edge: 1,
//   Line_DTYPE:"#30",
//   DTYPE: "CIRCLE",
//   Line_next:"#75",
//   Line_CP:"#29",
//   CP_NAME: "Origin",
//   CP_x: -3.7614587398639401,
//   CP_y: 5.1900029423855196,
//   CP_z: 2.1304927990881999,
//   Line_dir:"#29",
//   DIR_NAME: "center_axis",
//   dx: 0.52228849704920399,
//   dy: 0,
//   dz: -0.852768858396039,
//   Line_refdir:"#29",
//   rdx: 1,
//   rdy: 0,
//   rdz: 0,
//   radius: 2,
//   Line_vector:null,
//   magnitude: null,
// };
// this.stepFileDataArr.push(this.stepFileData);




console.log(this.stepFileDataArr)
 }



 assigningValues():void{
  this.height_update = [];
  this.radius_update = [];
  this.planeUpdate=[];
  this.createCanvas();
  
  let vertexPointCount = 0;
  this.stepFileDataArr.forEach((data: any) => {
    if(data.DTYPE=="VERTEX_POINT"){
      vertexPointCount++;
      if (vertexPointCount == 1) {
        
      this.cx2=data.CP_x;
      this.cy2=data.CP_y;
      this.cz2=data.CP_z;
     
      }
      

      else if (vertexPointCount == 2) {
       
        this.cx3 = data.CP_x;
        this.cy3 = data.CP_y;
        this.cz3 = data.CP_z;

        vertexPointCount = 0;
    }

  }

    else if(data.DTYPE=="CIRCLE"||data.DTYPE=="ELLIPSE"){
      this.cir=0;
      this.ellipse=0;
      if(data.DTYPE=="CIRCLE"){
        this.cir=1;
      }
      else if(data.DTYPE=="ELLIPSE"){
        this.ellipse=1;
        
      }

     
        // this.radius1=data.radius;
        // console.log("radius1",this.radius1);
      
   this.value=0

      this.rad=data.radius;

      if(data.CP_NAME=="Origin"){
        if(this.px2==undefined && this.py2==undefined && this.pz2==undefined){
          this.px2=data.CP_x;
        this.py2=data.CP_y;
        this.pz2=data.CP_z;
       
        this.value=1;
        this.circle++;

        }

        else if(this.px2==data.CP_x && this.py2==data.CP_y && this.pz2==data.CP_z){
        this.px2=data.CP_x;
        this.py2=data.CP_y;
        this.pz2=data.CP_z;
        this.circle++;
       
        this.value=1;
        }
        else{
          this.px=data.CP_x;
          this.py=data.CP_y;
          this.pz=data.CP_z;
         this.circle1++;
          this.value=2;
        }



      }
      if(data.DIR_NAME=="center_axis"){
        this.lx=data.dx;
        this.ly=data.dy;
        this.lz=data.dz;

        this.axis_x=data.dx;
        this.axis_y=data.dy;
        this.axis_z=data.dz;

        
  this.lx1=this.px2+this.lx;
  this.ly1=this.py2+this.ly;
  this.lz1=this.pz2+this.lz;

        this.refX=data.rdx;
        this.refY=data.rdy;
        this.refZ=data.rdz;

      
      }
      this.centralAxis = new THREE.Vector3(this.axis_x,this.axis_y,this.axis_z);
this.refAxis=new THREE.Vector3(this.refX,this.refY,this.refZ);
      
      this.createGeometry();

    }  
    

    else if(data.DTYPE=="LINE"){
     


      this.lineDirX=data.dx;
      this.lineDirY=data.dy;
      this.lineDirZ=data.dz;
         
 
        this.createLine();


    }
    else if(data.Bound=="PLANE" ||data.Bound=="CYLINDRICAL_SURFACE"){

      this.planeX=data.rdx;
      this.planeY=data.rdy;
      this.planeZ=data.rdz;

      this.circle=0;
      this.circle1=0;
    }

  

   
    
    
  });
   
  const h0=new THREE.Vector3(this.px,this.py,this.pz);
  const h3=new THREE.Vector3(this.px2, this.py2,this.pz2);
  this.height=h0.distanceTo(h3);

  document.getElementById('currentHeight')!.innerText = `Current height: ${this.height}`;
 

  this.heightStepChange();
  this.radiusStepChange();
  this.planeStepChange();


console.log(this.radius_update);
console.log(this.height_update);
console.log(this.planeUpdate);


  console.log(this.stepFileDataArr);

}

createCanvas():void{

  const canvas = this.canvasRef.nativeElement;
  this.scene=new THREE.Scene();
const arrow=new THREE.Vector3(0, 1, 0);
const origin = new THREE.Vector3( 0, 0, 0 );
const length = 30;
const arrowHelper1 = new THREE.ArrowHelper(arrow, origin, length, "#00ff00" , 2 );
   this.scene.add(arrowHelper1);

   const arrow1=new THREE.Vector3(1, 0, 0);



const arrowHelper2 = new THREE.ArrowHelper(arrow1, origin, length, "#Ff0000",2 );
   this.scene.add(arrowHelper2);

   const arrow2=new THREE.Vector3(0, 0, 1);


const arrowHelper = new THREE.ArrowHelper(arrow2, origin, length, "#0000ff",2);
   this.scene.add(arrowHelper);
//   const axesHelper = new THREE.AxesHelper( 30);
  
//   this.scene.add( axesHelper );




  const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(20, 20, 21);
      this.scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff); 
      this.scene.add(ambientLight);


  
      const aspect = window.innerWidth / window.innerHeight;
      this.camera = new THREE.OrthographicCamera(
        -7 * aspect, 7 * aspect,10, -10, 1, 100
      );
      this.camera.position.set(20,25, 20);
      this.camera.lookAt(this.scene.position);
      
      

  
      
      this.renderer = new THREE.WebGLRenderer({ canvas: canvas });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
  
      this.renderer.render(this.scene, this.camera);
      this.controls = new OrbitControls( this.camera, this.renderer.domElement );
      this.controls.update();


      const yAxisLabel = 'Y Axis';
      const zAxisLabel = 'Z Axis';
      const xAxisLabel = 'X Axis';
    
      const xAxisText = this.makeTextSprite(xAxisLabel);
      const yAxisText = this.makeTextSprite(yAxisLabel);
      const zAxisText = this.makeTextSprite(zAxisLabel);
    
      xAxisText.position.set(15, 0, 0);
      yAxisText.position.set(0, 15, 0);
      zAxisText.position.set(0, 0, 15);
    
      this.scene.add(xAxisText);
      this.scene.add(yAxisText);
      this.scene.add(zAxisText);

    this.animate();
}






number_test(n: number): string | number
{
  const number_test=0;

   var result = (n - Math.floor(n)) == 0; 
  

   if (result){
    return n.toFixed(1);
   }
   else{
    return n;
   }
  
 
}





clickShade():void{


          this.assignShadeValues();
    

          

      
  }

  clickWireframe():void{


    this.assigningValues();


    


}



  assignShadeValues():void{

  let vertexPointCount = 0;  
  let faceInnerCnt=0;
  let line=0;
  this.circle=0;
  this.circle1=0;
  
  this.stepFileDataArr.forEach((data: any) => {
  if(data.Bound=="FACE_OUTER_BOUND"){
    
    if(data.DTYPE=="VERTEX_POINT"){
      vertexPointCount++;
      if (vertexPointCount == 1) {
        
      this.cx2=data.CP_x;
      this.cy2=data.CP_y;
      this.cz2=data.CP_z;

      
      }

      else if (vertexPointCount == 2) {
       
        this.cx3 = data.CP_x;
        this.cy3 = data.CP_y;
        this.cz3 = data.CP_z;

        vertexPointCount = 0;
    }

    this.addUniqueVertex(data.CP_x,data.CP_y,data.CP_z);

  }
  else if(data.DTYPE=="CIRCLE" ||data.DTYPE=="ELLIPSE"){

      this.rad=data.radius;

      if(data.CP_NAME=="Origin"){
        if(this.px2==null && this.py2==null && this.pz2==null){
          this.px2=data.CP_x;
        this.py2=data.CP_y;
        this.pz2=data.CP_z;
        this.circle++;
       
        this.radius1=data.radius;
        this.value=1;

        }
    
        else if(this.px2==data.CP_x && this.py2==data.CP_y && this.pz2==data.CP_z){
          this.value=1;
        this.px2=data.CP_x;
        this.py2=data.CP_y;
        this.pz2=data.CP_z;
        this.circle++;
        
        this.radius1=data.radius;

        }
        else{
          this.px=data.CP_x;
          this.py=data.CP_y;
          this.pz=data.CP_z;
          this.radius2=data.radius;
          this.circle1++;

          this.value=2;
        }

        this.refX=data.rdx;
        this.refY=data.rdy;
        this.refZ=data.rdz;
        // this.cirx=this.cx2;
        // this.ciry=this.cy2;
        // this.cirz=this.cz2;
      
        // this.cirx1=this.cx3;
        // this.ciry1=this.cy3;
        // this.cirz1=this.cz3;
        if(data.DTYPE=="CIRCLE"){

          this.cver++;
          this.cir=1;
         
          this.vertices3.push(this.cx2,this.cy2,this.cz2);
          this.vertices3.push(this.cx3,this.cy3,this.cz3);
         
         
        }
        if(data.DTYPE=="ELLIPSE"){
          this.ellipse=1;
         
          this.addUniqueVertex2(this.cx4,this.cy4,this.cz4);
          this.addUniqueVertex2(this.cx5,this.cy5,this.cz5);
        }
        this.axis_x=data.dx;
        this.axis_y=data.dy;
        this.axis_z=data.dz;
      }

      if (data.surface=="PLANE" && faceInnerCnt==0){
        
      
        this.shadeGeometry();
      
        
      }
   
     
  }
  else if(data.DTYPE=="LINE"){
    line++;
  
   }


  }

 if(data.Bound=="FACE_BOUND"){
    faceInnerCnt=1;
    this.cver1=1;
    
    if(data.DTYPE=="VERTEX_POINT"){
      vertexPointCount++;
      if (vertexPointCount == 1) {
        
      this.cx4=data.CP_x;
      this.cy4=data.CP_y;
      this.cz4=data.CP_z;
      }

      else if (vertexPointCount == 2) {
       
        this.cx5 = data.CP_x;
        this.cy5 = data.CP_y;
        this.cz5 = data.CP_z;

        vertexPointCount = 0;
    }

    this.addUniqueVertex1(data.CP_x,data.CP_y,data.CP_z);
  }
else if(data.DTYPE=="CIRCLE"||data.DTYPE=="ELLIPSE"){
  if(data.CP_NAME=="Origin"){

      this.px2=data.CP_x;
    this.py2=data.CP_y;
    this.pz2=data.CP_z;
    this.circle++;
   
    this.radius1=data.radius;

    this.axis_x=data.dx;
    this.axis_y=data.dy;
    this.axis_z=data.dz;

  
    this.refX=data.rdx;
    this.refY=data.rdy;
    this.refZ=data.rdz;

  if(data.DTYPE=="CIRCLE"){
    this.cver++;
    this.cir=1;
   
    this.vertices3.push(this.cx4,this.cy4,this.cz4);
    this.vertices3.push(this.cx5,this.cy5,this.cz5);
  }
  if(data.DTYPE=="ELLIPSE"){
    this.ellipse=1;
   
    this.addUniqueVertex2(this.cx4,this.cy4,this.cz4);
    this.addUniqueVertex2(this.cx5,this.cy5,this.cz5);
  }

  this.smallerRadius=data.radius;

  this.axis_x=data.dx;
        this.axis_y=data.dy;
        this.axis_z=data.dz;
}
 }

 }


 else if(data.Bound=="PLANE"){
  this.planeRefX=data.dx;
  this.planeRefY=data.dy;
  this.planeRefZ=data.dz;
  console.log(line,"jgj");
  if(faceInnerCnt==1 && line>=3){
 
    this.createHollowPlane();
    
  }
  else if(this.cver>=3 && faceInnerCnt==1){
    
      this.shadeHollowGeometry();
      
    }


    
    

  

   else if(faceInnerCnt==0){  
        if(line>2){
          this.createSegmentedplane();
        }
      
      
   
      
      
    }
    faceInnerCnt=0;
   line=0;
    this.cver=0;
    this.cir=0;
    this.ellipse=0;
    this.px2=null;
this.py2=null;
this.pz2=null;
this.vertices=[];
this.Vertices1=[];
this.vertices2=[];
this.vertices3=[];
  this.verticesSet=new Set();
  this.verticesSet1=new Set();
  this.circle=0;
  this.circle1=0;

 }

    

    else if(data.Bound=="CYLINDRICAL_SURFACE"){
     
 
if (this.ellipse==1){

this.cutouts();
this.ellipse=0;

}
 else{   
   
        this.createCylinder();

 }    

 this.cver=0;
 line=0;
this.px2=null;
this.py2=null;
this.pz2=null;
this.vertices=[];
this.Vertices1=[];
  this.verticesSet=new Set();
  this.circle=0;
  this.circle1=0;
    }

  

   
     
    
});

  }

addUniqueVertex(x: any, y: any, z: any) {
  const vertexKey = `${x},${y},${z}`;
  if (!this.verticesSet.has(vertexKey)) {
      this.verticesSet.add(vertexKey);
      this.vertices.push(x, y, z);
  }
}

addUniqueVertex1(x: any, y: any, z: any) {
  const vertexKey = `${x},${y},${z}`;
  if (!this.verticesSet.has(vertexKey)) {
      this.verticesSet.add(vertexKey);
      this.Vertices1.push(x, y, z);
  }
}
addUniqueVertex2(x: any, y: any, z: any) {
  
  const vertexKey = `${x},${y},${z}`;
  if (this.verticesSet1.has(vertexKey)) {
    const index = this.vertices2.indexOf(x);
    if (index !== -1) {
      this.vertices2.splice(index, 3);
    }
    this.verticesSet1.delete(vertexKey);
  } else {
    this.verticesSet1.add(vertexKey);
    this.vertices2.push(x, y, z);
  }


}
createSegmentedplane(): void {
  const geometry = new THREE.BufferGeometry();
  // console.log(this.vertices);


  let verticesArray=[];
  //  = new Float32Array( this.vertices);

  for (let i = 0; i < this.vertices.length; i += 3) {
    const x = this.vertices[i];
    const y = this.vertices[i + 1];
    const z = this.vertices[i + 2];
    verticesArray.push(new THREE.Vector3(x, y, z));
  }
 

  verticesArray = this.sortVerticesClockwise(verticesArray);

  console.log(verticesArray);

  const completeVertices: number[] = [];
verticesArray.forEach(v => completeVertices.push(v.x, v.y, v.z));

  const indices=[
    0,1,2,
    1,2,3,
    2,3,1,
    3,1,0


]
  geometry.setIndex(indices);


geometry.setAttribute('position', new THREE.Float32BufferAttribute(completeVertices, 3));
geometry.setIndex(indices);
  const material = new THREE.MeshBasicMaterial({ color: this.color5 , side:THREE.DoubleSide});

  const mesh = new THREE.Mesh(geometry, material);

  this.scene.add(mesh);


}


isClockwise(polygon: THREE.Vector3[]): boolean {
  let sum = 0;
  for (let i = 0; i < polygon.length; i++) {
    const current = polygon[i];
    const next = polygon[(i + 1) % polygon.length]; 
    sum += (next.x - current.x) * (next.z + current.z);
  }
  return sum >= 0;
}
sortVerticesClockwise(vertices: THREE.Vector3[]): THREE.Vector3[] {
  let centroid = new THREE.Vector3(0, 0, 0);
  for (let i = 0; i < vertices.length; i++) {
    centroid.add(vertices[i]);
  }
  centroid.divideScalar(vertices.length);

  let arrangedVertices = [];
  let angles = [];
  for (let i = 0; i < vertices.length; i++) {
    let angle = Math.atan2(vertices[i].y - centroid.y, vertices[i].x - centroid.x);
    angles.push([angle, i]);
  }
  angles.sort((a, b) => a[0] - b[0]);

  for (let i = 0; i < angles.length; i++) {
    arrangedVertices.push(vertices[angles[i][1]]);
  }

  return arrangedVertices;
}
angleInPlane(point: THREE.Vector3Like, center: THREE.Vector3Like, refDirection: THREE.Vector3Like, normal: THREE.Vector3Like) {
  const vectorFromCenter = new THREE.Vector3().subVectors(point, center).normalize();
  const refCrossNormal = new THREE.Vector3().crossVectors(refDirection, normal);
  const angle = Math.atan2(vectorFromCenter.dot(refCrossNormal), vectorFromCenter.dot(refDirection));
  return angle;

}
angleInEllipsePlane(point: THREE.Vector3,center: THREE.Vector3,refDirection: THREE.Vector3,normal: THREE.Vector3,majorAxisLength: number,minorAxisLength: number): number {
    const translatedPoint = point.clone().sub(center);
  
    const zAxis = new THREE.Vector3(0, 0, 1);
    const rotationAxis = new THREE.Vector3().crossVectors(normal, zAxis);
    const rotationAngle = Math.acos(normal.dot(zAxis));
    const rotationMatrix = new THREE.Matrix4().makeRotationAxis(rotationAxis.normalize(), rotationAngle);
  
    const rotatedPoint = translatedPoint.clone().applyMatrix4(rotationMatrix);
    const rotatedRefDirection = refDirection.clone().applyMatrix4(rotationMatrix);
  
    const scaledPoint = new THREE.Vector3(rotatedPoint.x / majorAxisLength, rotatedPoint.y / minorAxisLength, 0);
    const scaledRefDirection = new THREE.Vector3(
      rotatedRefDirection.x / majorAxisLength,
      rotatedRefDirection.y / minorAxisLength,
      0
    );
  
    const angle = Math.atan2(scaledPoint.y, scaledPoint.x) - Math.atan2(scaledRefDirection.y, scaledRefDirection.x);
    return (angle + 2 * Math.PI) % (2 * Math.PI);
  }

createHollowPlane(): void {
  let shapeVertices = [  
    //   new THREE.Vector3(5.881433191, 0,  8.246345105),
    // new THREE.Vector3(5.881433191, 0, -8.246345105),
    // new THREE.Vector3(-4.812081702, 0,8.246345105),
    //     new THREE.Vector3(-4.812081702,  0,-8.246345105 ),
  
      
      
    ];
  
    for (let i = 0; i < this.vertices.length; i += 3) {
    const x = this.vertices[i];
    const y = this.vertices[i + 1];
    const z = this.vertices[i + 2];
    shapeVertices.push(new THREE.Vector3(x, y, z));
  }
 
    shapeVertices = this.sortVerticesClockwise(shapeVertices);
 shapeVertices = shapeVertices.flatMap((vertex) => [vertex.x, vertex.y, vertex.z]);
// console.log(shapeVertices,"ff");

 let holeVertices:any = [];


  if(this.cir==1 || this.ellipse==1){
    if(this.ellipse==1){
      console.log(this.vertices2);
      let center=new THREE.Vector3(this.px2,this.py2,this.pz2);
      let refDirection=new THREE.Vector3(this.refX,this.refY,this.refZ);
      let normal=new THREE.Vector3(this.axis_x,this.axis_y,this.axis_z);
      for (let i = 0; i < this.vertices2.length; i += 6) {

        const x = this.vertices2[i];
        const y = this.vertices2[i + 1];
        const z = this.vertices2[i + 2];
        const point=(new THREE.Vector3(x, y, z));

        const x1 = this.vertices2[i+3];
        const y1 = this.vertices2[i + 4];
        const z1 = this.vertices2[i + 5];
        const point1=(new THREE.Vector3(x1, y1, z1));
      
        let angle=this.angleInEllipsePlane(point, center, refDirection, normal,6.9675097113789102,2);
        let angle2=this.angleInEllipsePlane(point1, center, refDirection, normal,6.9675097113789102,2);
        console.log(point);
      
    const holePath = new THREE.Path();
    holePath.absellipse(0, 0, 6.9675097113789102, 2, angle,angle2, false, 0);
    const holePoints = holePath.getPoints(32);
    
    // Extract 2D vertices for the hole

    holePoints.forEach(point => {
      holeVertices.push(new THREE.Vector3(point.x, point.y, 0));
    });
    }
   
   
  }

    else if(this.cir==1){
    
      let center=new THREE.Vector3(this.px2,this.py2,this.pz2);
      let refDirection=new THREE.Vector3(1,0,0);
      let normal=new THREE.Vector3(this.axis_x,this.axis_y,this.axis_z);
      for (let i = 0; i < this.vertices3.length; i += 6) {
        const x = this.vertices3[i];
        const y = this.vertices3[i + 1];
        const z = this.vertices3[i + 2];
        const point=(new THREE.Vector3(x, y, z));

        const x1 = this.vertices3[i+3];
        const y1 = this.vertices3[i + 4];
        const z1 = this.vertices3[i + 5];
        const point1=(new THREE.Vector3(x1, y1, z1));
      
        let angle=this.angleInPlane(point, center, refDirection, normal);
        let angle2=this.angleInPlane(point1, center, refDirection, normal);

      
        const holePath = new THREE.Path();
        holePath.absellipse(0, 0, this.smallerRadius, this.smallerRadius, angle, angle2, false, 0);
        const holePoints = holePath.getPoints(32);
        
        // Extract 2D vertices for the hole
    
        holePoints.forEach(point => {
          holeVertices.push(new THREE.Vector3(point.x, point.y, 0));
        });
      }
    
    }}
    // holeVertices.push(new THREE.Vector3(-3,0,-7))
    
    // Calculate the normal of the plane defined by the first three points of the shape
    const p1 = new THREE.Vector3(shapeVertices[0], shapeVertices[1], shapeVertices[2]);
    const p2 = new THREE.Vector3(shapeVertices[3], shapeVertices[4], shapeVertices[5]);
    const p3 = new THREE.Vector3(shapeVertices[6], shapeVertices[7], shapeVertices[8]);
    
    const v1 = new THREE.Vector3().subVectors(p2, p1);
    const v2 = new THREE.Vector3().subVectors(p3, p1);
    const normal = new THREE.Vector3().crossVectors(v1, v2).normalize();
    
    // Create a transformation matrix to align the XY plane with the defined plane
    const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    const rotationMatrix = new THREE.Matrix4().makeRotationFromQuaternion(quaternion);
    
    // Translate the hole vertices to align with the defined plane
    holeVertices.forEach((vertex: { applyMatrix4: (arg0: THREE.Matrix4) => void; }) => {
      vertex.applyMatrix4(rotationMatrix); // Rotate to align with the plane
    });
    
    // Now translate the hole vertices to the specified position in the plane
   
    const holeCenter = new THREE.Vector3(this.px2,this.py2,this.pz2);
    
    holeVertices.forEach((vertex: { add: (arg0: THREE.Vector3) => void; }) => {
      vertex.add(holeCenter); // Translate to the specified center
    });
   
  //  holeVertices= [ 
  //   // new THREE.Vector3(-1.850800654, 0, 5.367321877),
  //   //   new THREE.Vector3(-1.850800654, 0, -6.066513232),
  //   //   new THREE.Vector3(3.002409951, 0,-6.066513232),
  //   //   new THREE.Vector3(3.002409951,  0,5.367321877 )
  //   ];
  // for (let i = 0; i < this.Vertices1.length; i += 3) {
  //   const x = this.Vertices1[i];
  //   const y = this.Vertices1[i + 1];
  //   const z = this.Vertices1[i + 2];
  //   holeVertices.push(new THREE.Vector3(x, y, z));
  // }
  
  // holeVertices = this.sortVerticesClockwise(holeVertices);
  
  // Define shape vertices

  // Create the elliptical hole in the XY plane

  
  // Flatten hole vertices for earcut
  const transformedHoleVertices = holeVertices.flatMap((vertex: { x: any; y: any; z: any; }) => [vertex.x, vertex.y, vertex.z]);
  
  // Combine rectangle and hole vertices for earcut
  const combinedVertices = [...shapeVertices, ...transformedHoleVertices];
  
  // Define the hole indices for earcut
  const holeIndices = [shapeVertices.length / 3];
  
  // Prepare vertices for earcut (flatten 3D vertices to 2D)
  const combinedVertices2D = combinedVertices.flatMap((vertex, index) => {
    if (index % 3 !== 2) {
      return vertex; // Take only x and y coordinates
    }
    return [];
  });
  
  // Triangulate the shape with the hole using earcut
  const indices = earcut(combinedVertices2D, holeIndices);
  
  // Create a new array with 3D vertices (with correct z-coordinates)
  const vertices = [];
  for (let i = 0; i < combinedVertices2D.length; i += 2) {
    const x = combinedVertices2D[i];
    const y = combinedVertices2D[i + 1];
    const z = combinedVertices[i * 3 / 2 + 2];
    vertices.push(x, y, z);
  }
  
  // Create the BufferGeometry
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  

  // Define the clipping planes to exclude areas
  // const clipPlanes = [
  //   new THREE.Plane(new THREE.Vector3(1, 0, 0), 0), // Example plane
  //   new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0) // Example plane
  // ];
  
  // // Create the material with clipping planes
  const material = new THREE.MeshBasicMaterial({
    color: this.color5,
    side: THREE.DoubleSide,
    // clippingPlanes: clipPlanes,
    // clipShadows: true
  });
  
  // Create the mesh
  const mesh = new THREE.Mesh(geometry, material);

  // Add the mesh to the scene
  this.scene.add(mesh);







}



  shadeGeometry():void{

      //   // CIRCLE1
this.centralAxis=new THREE.Vector3(this.axis_x,this.axis_y,this.axis_z);
  const centre = new THREE.Vector3(this.px,this.py,this.pz);
  // const endPoint3 = new THREE.Vector3(this.cx2,this.cy2,this.cz2);
  // const vector3 = new THREE.Vector3().subVectors(endPoint3, centre);

  
  // const endPoint4 = new THREE.Vector3(this.cx3,this.cy3,this.cz3);
  // const vector4 = new THREE.Vector3().subVectors(endPoint4, centre);

  // this.theta=vector4.angleTo(vector3);

// CIRCLE2

const centre2 = new THREE.Vector3(this.px2,this.py2,this.pz2);

const endPoint1 = new THREE.Vector3(this.cx2,this.cy2,this.cz2);
// const vector1 = new THREE.Vector3().subVectors(endPoint1, centre2);

 

const endPoint2 = new THREE.Vector3(this.cx3,this.cy3,this.cz3);
// const vector2 = new THREE.Vector3().subVectors(endPoint2, centre2);


  if(this.value==2){


    this.createShadedArc(endPoint1,endPoint2 , centre,this.centralAxis,this.rad,32);

  }
  else if(this.value==1){

  this.createShadedArc(endPoint1,endPoint2 , centre2,this.centralAxis,this.rad,32);

}

  
  
  
}


shadeHollowGeometry():void{

  //   // CIRCLE1

const centre = new THREE.Vector3(this.px,this.py,this.pz);
const endPoint3 = new THREE.Vector3(this.cx2,this.cy2,this.cz2);
const vector3 = new THREE.Vector3().subVectors(endPoint3, centre);


const endPoint4 = new THREE.Vector3(this.cx3,this.cy3,this.cz3);
const vector4 = new THREE.Vector3().subVectors(endPoint4, centre);

this.theta=vector4.angleTo(vector3);

// CIRCLE2

const centre2 = new THREE.Vector3(this.px2,this.py2,this.pz2);

const endPoint1 = new THREE.Vector3(this.cx2,this.cy2,this.cz2);
const vector1 = new THREE.Vector3().subVectors(endPoint1, centre2);



const endPoint2 = new THREE.Vector3(this.cx3,this.cy3,this.cz3);
const vector2 = new THREE.Vector3().subVectors(endPoint2, centre2);

this.thetaa=vector1.angleTo(vector2);
if(this.theta==0){
this.theta=Math.PI*2;
}

if(this.thetaa==0){
this.thetaa=Math.PI*2;
}

if(this.value==2){

// const geo = this.createSegmentedShape(this.rad, 0, this.theta, 32,0x00ffff);

const geometry = new THREE.RingGeometry(  this.rad,this.smallerRadius, 32 ,10,0, this.theta);
const material = new THREE.MeshBasicMaterial( { color:this.color6, side: THREE.DoubleSide } ); 
const geo = new THREE.Mesh( geometry, material ); 
geo.position.set(this.px,this.py,this.pz);
geo.lookAt(this.lx1,this.ly1,this.lz1);
this.scene.add(geo);

// const geo1 = this.createSegmentedShape(this.rad, Math.PI, Math.PI +this.theta, 32,0x00ffff);
const geometry1 = new THREE.RingGeometry(  this.rad,this.smallerRadius, 32 ,10,Math.PI, this.theta );
const material1 = new THREE.MeshBasicMaterial( { color:this.color6, side: THREE.DoubleSide } ); 
const geo1 = new THREE.Mesh( geometry1, material1 ); 
geo1.position.set(this.px,this.py,this.pz);
geo1.lookAt(this.lx1,this.ly1,this.lz1);
  this.scene.add(geo1);


}

if(this.value==1){

// const geo2 = this.createSegmentedShape(this.rad, 0, this.thetaa, 32,0x00ffff);
const geometry = new THREE.RingGeometry(  this.rad,this.smallerRadius, 32 ,10,0, this.thetaa );
const material = new THREE.MeshBasicMaterial( { color: this.color6, side: THREE.DoubleSide } ); 
const geo2 = new THREE.Mesh( geometry, material ); 
geo2.position.set(this.px2,this.py2,this.pz2);
geo2.lookAt(this.lx1,this.ly1,this.lz1);
this.scene.add(geo2);


// const geo3 = this.createSegmentedShape(this.rad,Math.PI, Math.PI +this.thetaa, 32,0x00ffff);
const geometry1 = new THREE.RingGeometry(  this.rad,this.smallerRadius, 32 ,10,Math.PI ,this.thetaa );
const material1 = new THREE.MeshBasicMaterial( { color: this.color6, side: THREE.DoubleSide } ); 
const geo3 = new THREE.Mesh( geometry1, material1 ); 
geo3.position.set(this.px2,this.py2,this.pz2);
geo3.lookAt(this.lx1,this.ly1,this.lz1);
this.scene.add(geo3);


}



}

createCylinder():void{

  const h1=new THREE.Vector3(this.px,this.py,this.pz);
const h2=new THREE.Vector3(this.px2, this.py2,this.pz2);
  this.height=h1.distanceTo(h2);

  this.midpoint = new THREE.Vector3();
  this.midpoint.addVectors( h1, h2 ).divideScalar( 2 );

  const centre = new THREE.Vector3(this.px,this.py,this.pz);
  const endPoint3 = new THREE.Vector3(this.cx2,this.cy2,this.cz2);
  const vector3 = new THREE.Vector3().subVectors(endPoint3, centre);

  
  const endPoint4 = new THREE.Vector3(this.cx3,this.cy3,this.cz3);
  const vector4 = new THREE.Vector3().subVectors(endPoint4, centre);

  this.theta=vector4.angleTo(vector3);


  if(this.theta==0){
    this.theta=Math.PI*2;
  }
  
  if(this.thetaa==0){
    this.thetaa=Math.PI*2;
  }

  
if(this.cver>2){
  const geometrycylinder = new THREE.CylinderGeometry( this.radius1, this.radius2,this.height,32,32,true,0,Math.PI); 
// const materialcyl = new THREE.MeshBasicMaterial(geometrycylinder ); 
const wireframeMaterial7 = new THREE.MeshBasicMaterial({ color: this.color7 ,side:THREE.DoubleSide});

const cylinder = new THREE.Mesh( geometrycylinder , wireframeMaterial7 );
cylinder.position.set(this.midpoint.x,this.midpoint.y,this.midpoint.z);
const targetAxis = new THREE.Vector3(this.lx, this.ly, this.lz).normalize();
const defaultAxis = new THREE.Vector3(0, 1, 0);
const quaternion = new THREE.Quaternion().setFromUnitVectors(defaultAxis, targetAxis);
cylinder.quaternion.copy(quaternion);

  this.scene.add( cylinder );


const geometrycylinder1 = new THREE.CylinderGeometry( this.radius1, this.radius2,this.height,32,32,true,Math.PI,Math.PI*2); 
// const materialcyl = new THREE.MeshBasicMaterial(geometrycylinder ); 
const wireframeMaterial8 = new THREE.MeshBasicMaterial({ color: this.color7 ,side:THREE.DoubleSide});

const cylinder1 = new THREE.Mesh( geometrycylinder1 , wireframeMaterial8);
cylinder1.position.set(this.midpoint.x,this.midpoint.y,this.midpoint.z);
const targetAxis1 = new THREE.Vector3(this.lx, this.ly, this.lz).normalize();
const defaultAxis1 = new THREE.Vector3(0, 1, 0);
const quaternion1 = new THREE.Quaternion().setFromUnitVectors(defaultAxis1, targetAxis1);
cylinder1.quaternion.copy(quaternion1);

  this.scene.add( cylinder1);
  

}
else{
  console.log(this.circle);



  const geometrycylinder = new THREE.CylinderGeometry( this.radius1, this.radius2,this.height,32,32,true,-0.55,this.theta+1); 
// const materialcyl = new THREE.MeshBasicMaterial(geometrycylinder ); 
const wireframeMaterial7 = new THREE.MeshBasicMaterial({ color: this.color7 ,side:THREE.DoubleSide});

const cylinder = new THREE.Mesh( geometrycylinder , wireframeMaterial7 );
cylinder.position.set(this.midpoint.x,this.midpoint.y,this.midpoint.z);
const targetAxis = new THREE.Vector3(this.lx, this.ly, this.lz).normalize();
const defaultAxis = new THREE.Vector3(0, 1, 0);
const quaternion = new THREE.Quaternion().setFromUnitVectors(defaultAxis, targetAxis);
cylinder.quaternion.copy(quaternion);


  this.scene.add( cylinder );

}
}

  onPlaneSelectionChange(selectedValue: string): void {
    

    switch (selectedValue) {
      case 'xy':
        this.handleXYPlane(); 
        break;
      case 'xz':
        this.handleXZPlane();  
        break;
      case 'yz':
        this.handleYZPlane();  
        break;
     default:
        console.log('No valid plane selected');  
    }
  }


handleXYPlane():void {
  if(this.centralAxis.equals(new THREE.Vector3(0, 0, 1))){
    this.assigningValues();

  }
  else if(this.centralAxis.equals(new THREE.Vector3(1, 0, 0))){

    
    this.stepFileDataArr.forEach((data: any) => {
      if(data.DTYPE=="VERTEX_POINT"){
          
        this.cx=data.CP_x;
        this.cy=data.CP_y;
        this.cz=data.CP_z;
  
        data.CP_x=this.cy;
        data.CP_y=this.cz;
        data.CP_z=this.cx;
        
    }
  
      else if(data.DTYPE=="CIRCLE"){
  
        // this.rad=data.radius;
  
        if(data.CP_NAME=="Origin"){
          
          if(this.px2==data.CP_x && this.py2==data.CP_y && this.pz2==data.CP_z){
        this.px0=data.CP_y;
        this.py0=data.CP_z;
        this.pz0=data.CP_x;
  
  
        data.CP_x=this.px0;
        data.CP_y=this.py0;
        data.CP_z=this.pz0;
        
            }
            else{
              this.px1=data.CP_y;
              this.py1=data.CP_z;
              this.pz1=data.CP_x;
        
        
              data.CP_x=this.px1;
              data.CP_y=this.py1;
              data.CP_z=this.pz1;
              
            }
   
        
 
            
          
  
        }
        if(data.DIR_NAME=="center_axis"){
  
        data.dx=this.ly;
        data.dy=this.lz;
        data.dz= this.lx;

        }
       
        data.rdx=this.refY;
        data.rdy=this.refZ;
        data.rdz=this.refX;
  
      }
      
      if(data.DTYPE=="PLANE"){

        data.rdx=-this.planeRefZ;
        data.rdy=this.planeRefY;
        data.rdz=this.planeRefX;


        

      }

      else if(data.DTYPE=="LINE"){

        this.cx=data.CP_x;
        this.cy=data.CP_y;
        this.cz=data.CP_z;
  
        data.CP_x=this.cy;
        data.CP_y=this.cz;
        data.CP_z=this.cx;


        data.dx=this.lineDirZ;
        data.dy=this.lineDirY;
        data.dz=this.lineDirX;
      }
      
    });

    this.px2=this.px0;
  this.py2=this.py0;
  this.pz2=this.pz0;

  this.px=this.px1;
  this.py=this.py1;
  this.pz=this.pz1;
    this.assigningValues();
  


  }
  else if(this.centralAxis.equals(new THREE.Vector3(0, 1, 0))){

    
    this.stepFileDataArr.forEach((data: any) => {
      if(data.DTYPE=="VERTEX_POINT"){
          
        this.cx=data.CP_x;
        this.cy=data.CP_y;
        this.cz=data.CP_z;


        data.CP_x=-this.cx;
        data.CP_y=this.cz;
        data.CP_z=this.cy;
        
 

        
       
    }
  
      else if(data.DTYPE=="CIRCLE"){
  
        // this.rad=data.radius;
  
        if(data.CP_NAME=="Origin"){
          
          if(this.px2==data.CP_x && this.py2==data.CP_y && this.pz2==data.CP_z){
        this.px0=data.CP_x;
        this.py0=data.CP_z;
        this.pz0=data.CP_y;
  
  
        data.CP_x=this.px0;
        data.CP_y=this.py0;
        data.CP_z=this.pz0;
        
        }
            else{
              this.px1=data.CP_x;
              this.py1=data.CP_z;
              this.pz1=data.CP_y;
        
        
              data.CP_x=this.px1;
              data.CP_y=this.py1;
              data.CP_z=this.pz1;
              
            }
    
            data.rdx=-this.refX;
            data.rdy=this.refZ;
            data.rdz=this.refY;
        
        console.log("x",data.CP_x)
        console.log(data.CP_y)
        console.log(data.CP_z)
      
            
          
  
        }
        if(data.DIR_NAME=="center_axis"){
  
        data.dx=this.lx;
        data.dy=this.lz;
        data.dz= this.ly;
  
        console.log(data.dx);
        console.log(data.dy);
        console.log(data.dz);
  
        }
      
  
      } 

      if(data.DTYPE=="PLANE"){

        data.rdx=this.planeRefZ;
        data.rdy=this.planeRefX;
        data.rdz=this.planeRefY;


        

      }
      else if(data.DTYPE=="LINE"){

        this.cx=data.CP_x;
        this.cy=data.CP_y;
        this.cz=data.CP_z;
        // console.log("cx",data.CP_x);
        // console.log(data.CP_y);
        // console.log(data.CP_z);

        data.CP_x=-this.cx;
        data.CP_y=this.cz;
        data.CP_z=this.cy;

        data.dx=this.lineDirX;
        data.dy=this.lineDirZ;
        data.dz=this.lineDirY;
        
      }
      
    });

    this.px2=this.px0;
      this.py2=this.py0;
      this.pz2=this.pz0;

      this.px=this.px1;
      this.py=this.py1;
      this.pz=this.pz1;
  
    this.assigningValues();
  
    }

    console.log("Handling XY");
  }



handleXZPlane(): void{
  

  if(this.centralAxis.equals(new THREE.Vector3(0, 1, 0))){
    this.assigningValues();

  }
  else if(this.centralAxis.equals(new THREE.Vector3(1, 0, 0))){

    
    this.stepFileDataArr.forEach((data: any) => {
      if(data.DTYPE=="VERTEX_POINT"){
          
        this.cx=data.CP_x;
        this.cy=data.CP_y;
        this.cz=data.CP_z;
  
        data.CP_x=-this.cy;
        data.CP_y=this.cx;
        data.CP_z=this.cz;

        
        
    }
  
      else if(data.DTYPE=="CIRCLE"){
  
        // this.rad=data.radius;
  
        if(data.CP_NAME=="Origin"){
          
          if(this.px2==data.CP_x && this.py2==data.CP_y && this.pz2==data.CP_z){
        this.px0=data.CP_y;
        this.py0=data.CP_x;
        this.pz0=data.CP_z;
  
  
        data.CP_x=this.px0;
        data.CP_y=this.py0;
        data.CP_z=this.pz0;
        
            }
            else{
              this.px1=data.CP_y;
              this.py1=data.CP_x;
              this.pz1=data.CP_z;
        
        
              data.CP_x=this.px1;
              data.CP_y=this.py1;
              data.CP_z=this.pz1;
              
            }
    
            data.rdx=-this.refY;
            data.rdy=this.refX;
            data.rdz=this.refZ;
        
        console.log("x",data.CP_x)
        console.log(data.CP_y)
        console.log(data.CP_z)
      
            
          
  
        }
        if(data.DIR_NAME=="center_axis"){
  
        data.dx=this.ly;
        data.dy=this.lx;
        data.dz= this.lz;
  
      
  
        }
      
  
      } 
      if(data.DTYPE=="PLANE"){

        data.rdx=this.planeRefX;
        data.rdy=this.planeRefY;
        data.rdz=-this.planeRefZ;


        

      }
      else if(data.DTYPE=="LINE"){

        this.cx=data.CP_x;
        this.cy=data.CP_y;
        this.cz=data.CP_z;
  
        data.CP_x=-this.cy;
        data.CP_y=this.cx;
        data.CP_z=this.cz;

        data.dx=this.lineDirY;
        data.dy=this.lineDirX;
        data.dz=this.lineDirZ;
      }
    });
    
  this.px2=this.px0;
  this.py2=this.py0;
  this.pz2=this.pz0;

  this.px=this.px1;
  this.py=this.py1;
  this.pz=this.pz1;

  this.assigningValues();
  
    



  }
  else if(this.centralAxis.equals(new THREE.Vector3(0, 0, 1))){

  this.stepFileDataArr.forEach((data: any) => {
    if(data.DTYPE=="VERTEX_POINT"){
        
      this.cx=data.CP_x;
      this.cy=data.CP_y;
      this.cz=data.CP_z;

      data.CP_x=-this.cx;
      data.CP_y=this.cz;
      data.CP_z=this.cy;
      
      // console.log("cx",data.CP_x);
      // console.log(data.CP_y);
      // console.log(data.CP_z);
  }

    else if(data.DTYPE=="CIRCLE"){

      // this.rad=data.radius;

      if(data.CP_NAME=="Origin"){
        
        if(this.px2==data.CP_x && this.py2==data.CP_y && this.pz2==data.CP_z){
      this.px0=data.CP_x;
      this.py0=data.CP_z;
      this.pz0=data.CP_y;


      data.CP_x=this.px0;
      data.CP_y=this.py0;
      data.CP_z=this.pz0;
      
          }
          else{
            this.px1=data.CP_x;
            this.py1=data.CP_z;
            this.pz1=data.CP_y;
      
      
            data.CP_x=this.px1;
            data.CP_y=this.py1;
            data.CP_z=this.pz1;
            
          }
  
          data.rdx=-this.refX;
          data.rdy=this.refZ;
          data.rdz=this.refY;
      
      // console.log("x",data.CP_x)
      // console.log(data.CP_y)
      // console.log(data.CP_z)
    
          
        

      }
      if(data.DIR_NAME=="center_axis"){

      data.dx=this.lx;
      data.dy=this.lz;
      data.dz= this.ly;

      // console.log(data.dx);
      // console.log(data.dy);
      // console.log(data.dz);

      }
    

    } 
    if(data.DTYPE=="PLANE"){

      data.rdx=this.planeRefZ;
      data.rdy=this.planeRefY;
      data.rdz=this.planeRefX;


      

    }
    else if(data.DTYPE=="LINE"){

      this.cx=data.CP_x;
        this.cy=data.CP_y;
        this.cz=data.CP_z;
  
        data.CP_x=-this.cy;
        data.CP_y=this.cx;
        data.CP_z=this.cz;

     
      data.dx=this.lineDirX;
      data.dy=this.lineDirZ;
      data.dz=this.lineDirY;

    }
    
  });

  this.px2=this.px0;
  this.py2=this.py0;
  this.pz2=this.pz0;

  this.px=this.px1;
  this.py=this.py1;
  this.pz=this.pz1;
  

  this.assigningValues();


  
  
  
  
    }
    console.log("Handling XZ");
  }


handleYZPlane(): void{
  if(this.centralAxis.equals(new THREE.Vector3(1, 0, 0))){
    this.assigningValues();

  }
  else if(this.centralAxis.equals(new THREE.Vector3(0, 1, 0))){

    

      this.stepFileDataArr.forEach((data: any) => {
        if(data.DTYPE=="VERTEX_POINT"){
            
          this.cx=data.CP_x;
          this.cy=data.CP_y;
          this.cz=data.CP_z;
    
          data.CP_x=this.cy;
          data.CP_y=-this.cx;
          data.CP_z=this.cz;
          
      }
    
        else if(data.DTYPE=="CIRCLE"){
    
          // this.rad=data.radius;
    
          if(data.CP_NAME=="Origin"){
            
            if(this.px2==data.CP_x && this.py2==data.CP_y && this.pz2==data.CP_z){
          this.px0=data.CP_y;
          this.py0=data.CP_x;
          this.pz0=data.CP_z;
    
    
          data.CP_x=this.px0;
          data.CP_y=this.py0;
          data.CP_z=this.pz0;
          
              }
              else{
                this.px1=data.CP_y;
                this.py1=data.CP_x;
                this.pz1=data.CP_z;
          
          
                data.CP_x=this.px1;
                data.CP_y=this.py1;
                data.CP_z=this.pz1;
                
              }
      
        
          
          // console.log("x",data.CP_x)
          // console.log(data.CP_y)
          // console.log(data.CP_z)
        
            data.rdx=this.refY;
            data.rdy=-this.refX;
            data.rdz=this.refZ;
            
    
          }
          if(data.DIR_NAME=="center_axis"){
    
          data.dx=this.ly;
          data.dy=this.lx;
          data.dz= this.lz;
    
          // console.log(data.dx);
          // console.log(data.dy);
          // console.log(data.dz);
    
          }
        
    
        } 

        if(data.DTYPE=="PLANE"){

          data.rdx=this.planeRefY;
          data.rdy=this.planeRefX;
          data.rdz=-this.planeRefZ;


          

        }
       
        else if(data.DTYPE=="LINE"){
          this.cx=data.CP_x;
          this.cy=data.CP_y;
          this.cz=data.CP_z;
    
          data.CP_x=this.cy;
          data.CP_y=-this.cx;
          data.CP_z=this.cz;
          
          data.dx=this.lineDirY;
          data.dy=this.lineDirX;
          data.dz=this.lineDirZ;
        }
        
      });
      this.px2=this.px0;
  this.py2=this.py0;
  this.pz2=this.pz0;

  this.px=this.px1;
  this.py=this.py1;
  this.pz=this.pz1;
      this.assigningValues();
    
      
  




  }
  else if(this.centralAxis.equals(new THREE.Vector3(0, 0, 1))){

    this.stepFileDataArr.forEach((data: any) => {
      if(data.DTYPE=="VERTEX_POINT"){
          
        this.cx=data.CP_x;
        this.cy=data.CP_y;
        this.cz=data.CP_z;
  
        data.CP_x=this.cz;
        data.CP_y=this.cx;
        data.CP_z=this.cy;
        
    }
  
      else if(data.DTYPE=="CIRCLE"){
  
        // this.rad=data.radius;
  
        if(data.CP_NAME=="Origin"){
          
          if(this.px2==data.CP_x && this.py2==data.CP_y && this.pz2==data.CP_z){
        this.px0=data.CP_z;
        this.py0=data.CP_x;
        this.pz0=data.CP_y;
  
  
        data.CP_x=this.px0;
        data.CP_y=this.py0;
        data.CP_z=this.pz0;
        
            }
            else{
              this.px1=data.CP_z;
              this.py1=data.CP_x;
              this.pz1=data.CP_y;
        
        
              data.CP_x=this.px1;
              data.CP_y=this.py1;
              data.CP_z=this.pz1;
              
            }
    
      data.rdx=this.refZ;
            data.rdy=this.refX;
            data.rdz=this.refY;
        
        // console.log("x",data.CP_x)
        // console.log(data.CP_y)
        // console.log(data.CP_z)
      
            
          
  
        }
        if(data.DIR_NAME=="center_axis"){
  
        data.dx=this.lz;
        data.dy=this.lx;
        data.dz= this.ly;
  
        // console.log(data.dx);
        // console.log(data.dy);
        // console.log(data.dz);
  
        }
      
  
      } 
      if(data.DTYPE=="PLANE"){

        data.rdx=this.planeRefZ;
        data.rdy=this.planeRefY;
        data.rdz=-this.planeRefX;


        

      }
      else if(data.DTYPE=="LINE"){
        this.cx=data.CP_x;
        this.cy=data.CP_y;
        this.cz=data.CP_z;
  
        data.CP_x=this.cz;
        data.CP_y=this.cx;
        data.CP_z=this.cy;

        data.dx=this.lineDirZ;
        data.dy=this.lineDirY;
        data.dz=this.lineDirX;
      }
      
    });
    this.px2=this.px0;
  this.py2=this.py0;
  this.pz2=this.pz0;

  this.px=this.px1;
  this.py=this.py1;
  this.pz=this.pz1;
    this.assigningValues();
  
    }

  
    console.log("Handling YZ");
  }


  update_radiusdata(lineNo:string, definition: string, data1: string, datax: number, datay: any, dataz: any) {
    const x=this.number_test(datax);
    const y=this.number_test(datay);
    const z=this.number_test(dataz);
    let copmLine = `${lineNo}=${definition}(${data1},(${x},${y},${z}));`;
    this.radius_update.push(copmLine.toUpperCase());
  }


 update_radiusdata1(lineNo:string, definition: string, data1: string, dataref: string, radius: number) {
  const radi=this.number_test(radius);
  
    let copmLine = `${lineNo}=${definition}(${data1},${dataref},${radi});`;
    this.radius_update.push(copmLine.toUpperCase());
  }


  update_heightdata(lineNo:string, definition: string, data1: string, datax: any, datay:any, dataz: any) {
    const x=this.number_test(datax);
    const y=this.number_test(datay);
    const z=this.number_test(dataz);
  
    let copmLine = `${lineNo}=${definition}(${data1},(${x},${y},${z}));`;
   this.height_update.push(copmLine.toUpperCase());
  }


  updatePlaneData(lineNo:string, definition: string, data1: string, datax: any, datay:any, dataz: any) {
    const x=this.number_test(datax);
    const y=this.number_test(datay);
    const z=this.number_test(dataz);
  
    let copmLine = `${lineNo}=${definition}(${data1},(${x},${y},${z}));`;
   this.planeUpdate.push(copmLine.toUpperCase());
  }

  heightStepChange():void{
    

      this.stepFileDataArr.forEach((data: any) => {
        if(data.DTYPE=="VERTEX_POINT"){
    
    const lineNo =data.Line_CP;
    const definition = "CARTESIAN_POINT";
    const dat= "''";
    const datax = data.CP_x;
    const datay = data.CP_y;
    const dataz = data.CP_z;
    
    
      this.update_heightdata(lineNo, definition, dat, datax, datay, dataz);
        }
      
        else if(data.DTYPE=="CIRCLE"){

    const lineNo2= data.Line_CP;
    const definition = "CARTESIAN_POINT";
    const data2= data.CP_NAME;
    const datax2= data.CP_x;
    const datay2= data.CP_y;
    const dataz2= data.CP_z;




    this.update_heightdata(lineNo2, definition, data2, datax2, datay2, dataz2);


        }});
        


  
}

  radiusStepChange():void{
    // if(this.centralAxis.equals(new THREE.Vector3(1, 0, 0))){
      

        this.stepFileDataArr.forEach((data: any) => {
          if(data.DTYPE=="VERTEX_POINT"){
          
      
      const lineNo =data.Line_CP;
      const definition = "CARTESIAN_POINT";
      const dat= "''";
      const datax = data.CP_x;
      const datay = data.CP_y;
      const dataz = data.CP_z;
      
      
      this.update_radiusdata(lineNo, definition, dat, datax, datay, dataz);


          }
        
          else if(data.DTYPE=="CIRCLE"){
  
            const lineNo11= data.Line_DTYPE;
            const definition11 = "CIRCLE";
            const data11= "''";
            const dataref11= data.Line_next;
            const radius= this.rad;
          
            this.update_radiusdata1(lineNo11, definition11, data11, dataref11, radius);
  
  
          }
        
          else if(data.Bound=="CYLINDRICAL_SURFACE"){
  
            const lineNo11= data.Line_bound;
            const definition11 = "CYLINDRICAL_SURFACE";
            const data11= "''";
            const dataref11= data.Line_next;
            const radius= this.rad;
          
            this.update_radiusdata1(lineNo11, definition11, data11, dataref11, radius);
  
  
          }
          else if(data.DTYPE=="LINE"){
  
            const lineNo11= data.Line_vector;
            const definition11 = "VECTOR";
            const data11= "''";
            const dataref11= data.Line_next;
            const radius= this.rad;
          
            this.update_radiusdata1(lineNo11, definition11, data11, dataref11, radius);
  
  
          }
        
        
        });




// if(this.centralAxis.equals(new THREE.Vector3(0, 0, 1))){

//   this.stepFileDataArr.forEach((data: any) => {
//     if(data.DTYPE=="VERTEX_POINT"){
    

// const lineNo =data.Line_CP;
// const definition = "CARTESIAN_POINT";
// const dat= "''";
// const datax = data.CP_x;
// const datay = data.CP_y;
// const dataz = data.CP_z;


// this.update_radiusdata(lineNo, definition, dat, datax, datay, dataz);


//     }
  
//     else if(data.DTYPE=="CIRCLE"){

//       const lineNo11= data.Line_CP;
//       const definition11 = "CIRCLE";
//       const data11= "''";
//       const dataref11= "#75";
//       const radius= this.rad;
    
//       this.update_radiusdata1(lineNo11, definition11, data11, dataref11, radius);


//     }
  
//     else if(data.DTYPE=="CYLINDRICAL_SURFACE"){

//       const lineNo11= data.Line_CP;
//       const definition11 = "CYLINDRICAL_SURFACE";
//       const data11= "''";
//       const dataref11= "#72";
//       const radius= this.rad;
    
//       this.update_radiusdata1(lineNo11, definition11, data11, dataref11, radius);


//     }});

// console.log(this.radius_update);

//   }
//   if(this.centralAxis.equals(new THREE.Vector3(0, 1, 0))){
//     this.stepFileDataArr.forEach((data: any) => {
//       if(data.DTYPE=="VERTEX_POINT"){
      
  
//   const lineNo =data.Line_CP;
//   const definition = "CARTESIAN_POINT";
//   const dat= "''";
//   const datax = data.CP_x;
//   const datay = data.CP_y;
//   const dataz = data.CP_z;
  
  
//   this.update_radiusdata(lineNo, definition, dat, datax, datay, dataz);


//       }
    
//       else if(data.DTYPE=="CIRCLE"){

//         const lineNo11= data.Line_CP;
//         const definition11 = "CIRCLE";
//         const data11= "''";
//         const dataref11= "#75";
//         const radius= this.rad;
      
//         this.update_radiusdata1(lineNo11, definition11, data11, dataref11, radius);


//       }
    
//       else if(data.DTYPE=="CYLINDRICAL_SURFACE"){

//         const lineNo11= data.Line_CP;
//         const definition11 = "CYLINDRICAL_SURFACE";
//         const data11= "''";
//         const dataref11= "#72";
//         const radius= this.rad;
      
//         this.update_radiusdata1(lineNo11, definition11, data11, dataref11, radius);


//       }});
  

// console.log(this.radius_update);


  
}

planeStepChange():void{



  this.stepFileDataArr.forEach((data: any) => {
    if(data.DTYPE=="VERTEX_POINT"){
      const lineNo =data.Line_CP;
    const definition = "CARTESIAN_POINT";
    const dat= "''";
    const datax= data.CP_x;
    const datay= data.CP_y;
    const dataz= data.CP_z;

    
    
        this.updatePlaneData(lineNo, definition, dat, datax, datay, dataz);
        }
      
        else if(data.DTYPE=="CIRCLE"|| data.Bound=="CYLINDRICAL_SURFACE" ){
  

    const lineNo2= data.Line_CP;
    const definition = "CARTESIAN_POINT";
    const data2= "'Origin'";
    const datax2= data.CP_x;
    const datay2= data.CP_y;
    const dataz2= data.CP_z;

    const line= data.Line_dir;
    const dat=data.DIR_NAME;
    const definition1 = "DIRECTION";
    const datax=data.dx;
    const datay=data.dy;
    const dataz=data.dz;

    const line1= data.Line_refdir;
    const data1="ref_axis";
    const datax1=data.rdx;
    const datay1=data.rdy;
    const dataz1=data.rdz;

    this.updatePlaneData(lineNo2, definition, data2, datax2, datay2, dataz2);
    this.updatePlaneData(line, definition1, dat, datax, datay, dataz);
    this.updatePlaneData(line1, definition1, data1, datax1, datay1, dataz1);




        }
        else if(data.DTYPE=="LINE"){

          const lineNo =data.Line_CP;
          const definition = "CARTESIAN_POINT";
          const dat= "''";
          const datax= data.CP_x;
          const datay= data.CP_y;
          const dataz= data.CP_z;

this.updatePlaneData(lineNo, definition, dat, datax, datay, dataz);

const line= data.Line_dir;
const dat1="''";
const definition1 = "DIRECTION";
const datax1=data.dx;
const datay1=data.dy;
const dataz1=data.dz;

this.updatePlaneData(line, definition1, dat1, datax1, datay1, dataz1);
        }
      });





}

  updateHeight(): void {
    const heightInput = document.getElementById('heightInput') as HTMLInputElement;
    const newHeight = parseFloat(heightInput.value);
    if (!isNaN(newHeight) && newHeight > 0) {
      this.height = newHeight;
      document.getElementById('currentHeight')!.innerText = `Current height: ${newHeight}`;
      
      
    }
  }

  updateradius(): void {
    const radiustInput = document.getElementById('radiusinput') as HTMLInputElement;
    const newradius = parseFloat(radiustInput.value);
    if (!isNaN(newradius) && newradius > 0) {
      this.rad = newradius;
      document.getElementById('currentradius')!.innerText = `Current Radius: ${newradius}`;
      
    }
  }

  update_step():void{
    const selectElement = document.getElementById('planeSelection') as HTMLSelectElement;
    const selectedValue = selectElement.value;

    // this.updateradius();

    this.updateHeight();
  
    // this.createThree();
    this.createOnHeightChange();
    
    this.onPlaneSelectionChange(selectedValue);
    

    if(this.clickCount==1){
      this.assignShadeValues();
    }


    
    let dataObj={'heightUpdateArr':this.height_update , 'radiusUpdateArr':this.radius_update , 'planeUpdateArr':this.planeUpdate};
   
    console.log('dataobject',dataObj);

    this.stepDataService.exportStep(dataObj).subscribe((result:any)=>{
      console.log(result);
    })


  }






createArcGeometr(startPoint: THREE.Vector3, endPoint: THREE.Vector3,center: THREE.Vector3 ,normal: THREE.Vector3 , radius: number, segments: number ) {

  

  // Reference direction
  const refDirection = new THREE.Vector3(1,0,0).normalize();
  

    
  // Function to calculate angle in the plane defined by normal and refDirection
  function angleInPlane(point: THREE.Vector3Like, center: THREE.Vector3Like, refDirection: THREE.Vector3Like, normal: THREE.Vector3Like) {
    const vectorFromCenter = new THREE.Vector3().subVectors(point, center).normalize();
    const refCrossNormal = new THREE.Vector3().crossVectors(refDirection, normal);
    const angle = Math.atan2(vectorFromCenter.dot(refCrossNormal), vectorFromCenter.dot(refDirection));
    return angle;
  
  
  
  }
  
  
  
  
  const startAngle = angleInPlane(startPoint, center, refDirection, normal);
    const endAngle = angleInPlane(endPoint, center, refDirection, normal);
    
  
  
  const vectorFromCenter = new THREE.Vector3().subVectors(endPoint, center).normalize();
  const refCrossNormal = new THREE.Vector3().crossVectors(refDirection, normal);
  
  // const arrowHelper = new THREE.ArrowHelper(refCrossNormal.clone().normalize(), new THREE.Vector3(), refCrossNormal.length(), 0xff0000);
  //   this.scene.add(arrowHelper);
  
  // Create the line and add it to the scene
  console.log(startAngle," ",endAngle);
  
    const arcCurve = new THREE.EllipseCurve(
      0, 0,   // Center of the ellipse
      radius,radius,  // xRadius, yRadius
      startAngle, endAngle, // Start and end angles
      true,   // Clockwise
      0// Rotation angle
    );
  
    const points = arcCurve.getPoints(50);
    let arcGeometry = new THREE.BufferGeometry().setFromPoints(points);
  
  
    const defaultNormal = new THREE.Vector3(0, 0, 1); // Default Z-axis
    const quaternion = new THREE.Quaternion().setFromUnitVectors(defaultNormal, normal);
  
    arcGeometry.applyQuaternion(quaternion);
    if(startPoint.y==endPoint.y ){
      if( center.x!=-3.7614587398639401){
      arcGeometry.rotateX(Math.PI);}
        }
        else if(startPoint.x==endPoint.x){
          arcGeometry.rotateY(Math.PI);
        }
    
  
  
  
    arcGeometry.translate(center.x, center.y, center.z);
  
  
    const material = new THREE.LineBasicMaterial({ color: this.color3 });
  
  
    const arc = new THREE.Line(arcGeometry, material);
  
    //Add the arc to the scene
    this.scene.add(arc);
  }
  
  createShadedArc(startPoint: THREE.Vector3, endPoint: THREE.Vector3,center: THREE.Vector3 ,normal:THREE.Vector3,radius: number, segments: number){

    const refDirection = new THREE.Vector3(1,0,0).normalize();
  

    
    // Function to calculate angle in the plane defined by normal and refDirection
    function angleInPlane(point: THREE.Vector3Like, center: THREE.Vector3Like, refDirection: THREE.Vector3Like, normal: THREE.Vector3Like) {
      const vectorFromCenter = new THREE.Vector3().subVectors(point, center).normalize();
      const refCrossNormal = new THREE.Vector3().crossVectors(refDirection, normal);
      const angle = Math.atan2(vectorFromCenter.dot(refCrossNormal), vectorFromCenter.dot(refDirection));
      return angle;
    
    
    
    }
    
    
    
    
    const startAngle = angleInPlane(startPoint, center, refDirection, normal);
      const endAngle = angleInPlane(endPoint, center, refDirection, normal);
      
    
    
    const vectorFromCenter = new THREE.Vector3().subVectors(endPoint, center).normalize();
    const refCrossNormal = new THREE.Vector3().crossVectors(refDirection, normal);
    
    // const arrowHelper = new THREE.ArrowHelper(refCrossNormal.clone().normalize(), new THREE.Vector3(), refCrossNormal.length(), 0xff0000);
    //   this.scene.add(arrowHelper);
      const shape = new THREE.Shape();
    // Create the line and add it to the scene
    shape.absellipse(0, 0, radius, radius, startAngle,endAngle, true, 0);
    
    const geometry = new THREE.ShapeGeometry(shape);
    
    
     
    
    
    
    
    
    
      const defaultNormal = new THREE.Vector3(0, 0, 1); // Default Z-axis
      const quaternion = new THREE.Quaternion().setFromUnitVectors(defaultNormal, normal);
    
      geometry.applyQuaternion(quaternion);
      if(startPoint.y==endPoint.y ){
        if( center.x!=-3.7614587398639401){
        geometry.rotateX(Math.PI);}
          }
          else if(startPoint.x==endPoint.x){
            geometry.rotateY(Math.PI);
          }
      
      //Add the arc to the scene
     

   
    const material = new THREE.MeshBasicMaterial({ color: this.color4, side: THREE.DoubleSide });
    

    const ellipse = new THREE.Mesh(geometry, material);
    ellipse.position.set(center.x, center.y, center.z); 
    this.scene.add(ellipse);
  
  }


createGeometry( ){
 


  console.log("cx2",this.cx2);
  console.log(this.cy2);
  console.log(this.cz2);

  console.log("cx3",this.cx3);
  console.log(this.cy3);
  console.log(this.cz3);






  const geometry1 = new THREE.BufferGeometry();
  
  const positions = [
    // new THREE.Vector3(this.cx,this.cy,this.cz),  
    // new THREE.Vector3(this.cx1,this.cy1,this.cz1),
    new THREE.Vector3(this.cx2,this.cy2,this.cz2),
    new THREE.Vector3(this.cx3,this.cy3,this.cz3),
  
   
  
  ];
  
  const pointMaterial = new THREE.PointsMaterial({ color:this.color1, size: 3 });
  
  positions.forEach(position => {
    const pointGeometry = new THREE.BufferGeometry();
    pointGeometry.setFromPoints([position]);
    const point = new THREE.Points(pointGeometry, pointMaterial);
    this.scene.add(point);
  });

 
  //   // CIRCLE1

  const centre = new THREE.Vector3(this.px,this.py,this.pz);
  // const endPoint3 = new THREE.Vector3(this.cx2,this.cy2,this.cz2);
  // const vector3 = new THREE.Vector3().subVectors(endPoint3, centre);

  
  // const endPoint4 = new THREE.Vector3(this.cx3,this.cy3,this.cz3);
  // const vector4 = new THREE.Vector3().subVectors(endPoint4, centre);





  // this.theta=vector4.angleTo(vector3);
  

// CIRCLE2

const centre2 = new THREE.Vector3(this.px2,this.py2,this.pz2);

const endPoint1 = new THREE.Vector3(this.cx2,this.cy2,this.cz2);
// const vector1 = new THREE.Vector3().subVectors(endPoint1, centre2);

 

const endPoint2 = new THREE.Vector3(this.cx3,this.cy3,this.cz3);
// const vector2 = new THREE.Vector3().subVectors(endPoint2, centre2);

//   this.thetaa=vector1.angleTo(vector2);



if(this.theta==0){
    this.theta=Math.PI*2;
  }
  
  if(this.thetaa==0){
    this.thetaa=Math.PI*2;
  }



if(this.value==2){
  if(this.cir==1){
    this.createArcGeometr(endPoint1 , endPoint2 , centre,this.centralAxis,this.rad,30) ;
    console.log(endPoint1);
  }
  else if(this.ellipse==1){
    this.createeelipse(endPoint1 , endPoint2 , centre,this.centralAxis,this.refAxis,this.rad,30);
  }

}


else if(this.value==1){
  if(this.cir==1){
    this.createArcGeometr(endPoint1 , endPoint2 , centre2,this.centralAxis,this.rad,30) ;
  }
  else if(this.ellipse==1){

    this.createeelipse(endPoint1 , endPoint2 , centre2,this.centralAxis,this.refAxis,this.rad,30);
  }

 
}
 


  


}


createLine():void{
 
  const points = [];
  points.push( new THREE.Vector3(this.cx2,this.cy2,this.cz2) );
  points.push( new THREE.Vector3(this.cx3,this.cy3,this.cz3) );
  const geometry = new THREE.BufferGeometry().setFromPoints( points );
  const material = new THREE.LineBasicMaterial( { color: this.color2} );
  const line = new THREE.Line( geometry, material );
  this.scene.add(line);
}



createeelipse(startPoint: THREE.Vector3, endPoint: THREE.Vector3,center: THREE.Vector3 ,normal1: THREE.Vector3 ,refDirection1:THREE.Vector3, radius: number, segments: number):void{


// Normal vector (axis) of the circle's plane
const normal = normal1.normalize();

// Reference direction
const refDirection = refDirection1.normalize();

// Start and end points


  
// Function to calculate angle in the plane defined by normal and refDirection

let majorRadius=6.9675097113789102;
let  minorRadius= 2;


function angleInEllipsePlane(
  point: THREE.Vector3,
  center: THREE.Vector3,
  refDirection: THREE.Vector3,
  normal: THREE.Vector3,
  majorAxisLength: number,
  minorAxisLength: number
): number {
  const translatedPoint = point.clone().sub(center);

  const zAxis = new THREE.Vector3(0, 0, 1);
  const rotationAxis = new THREE.Vector3().crossVectors(normal, zAxis);
  const rotationAngle = Math.acos(normal.dot(zAxis));
  const rotationMatrix = new THREE.Matrix4().makeRotationAxis(rotationAxis.normalize(), rotationAngle);

  const rotatedPoint = translatedPoint.clone().applyMatrix4(rotationMatrix);
  const rotatedRefDirection = refDirection.clone().applyMatrix4(rotationMatrix);

  const scaledPoint = new THREE.Vector3(rotatedPoint.x / majorAxisLength, rotatedPoint.y / minorAxisLength, 0);
  const scaledRefDirection = new THREE.Vector3(
    rotatedRefDirection.x / majorAxisLength,
    rotatedRefDirection.y / minorAxisLength,
    0
  );

  const angle = Math.atan2(scaledPoint.y, scaledPoint.x) - Math.atan2(scaledRefDirection.y, scaledRefDirection.x);
  return (angle + 2 * Math.PI) % (2 * Math.PI);
}

const startAngle = angleInEllipsePlane(startPoint, center, refDirection, normal, majorRadius, minorRadius);
const endAngle = angleInEllipsePlane(endPoint, center, refDirection, normal, majorRadius, minorRadius);






const vectorFromCenter = new THREE.Vector3().subVectors(endPoint, center).normalize();
const refCrossNormal = new THREE.Vector3().crossVectors(refDirection, normal);

// const arrowHelper = new THREE.ArrowHelper(refCrossNormal.clone().normalize(), new THREE.Vector3(), refCrossNormal.length(), 0xff0000);
//   this.scene.add(arrowHelper);

// Create the line and add it to the scene


//   const arcCurv = new THREE.EllipseCurve(
//     center.x, center.y,   // Center of the ellipse
//     2,2,  // xRadius, yRadius
//    startAngle,endAngle, // Start and end angles
//     false,   // Clockwise
//   0// Rotation angle
//   );

//   const point = arcCurv.getPoints(50);
//   let arcGeometr = new THREE.BufferGeometry().setFromPoints(point);

  
//   const lastPoint = point[point.length - 1];
//   const lastPointX = lastPoint.x;
// const lastPointY = lastPoint.y;
// const last=new THREE.Vector3(lastPoint.x,lastPoint.y,center.z);
// const vector1 = new THREE.Vector3().subVectors(last, center);
// const axis=new THREE.Vector3(1,0,0);
// const anglee=vector1.angleTo(axis);
// console.log(anglee);


const arcCurve = new THREE.EllipseCurve(
  0, 0,   // Center of the ellipse
  6.9675097113789102,2,  // xRadius, yRadius
 startAngle,endAngle, // Start and end angles
  false,   // Clockwise
  // Rotation angle
);

const points = arcCurve.getPoints(50);
let arcGeometry = new THREE.BufferGeometry().setFromPoints(points);


  const defaultNormal = new THREE.Vector3(0, 0, 1); // Default Z-axis
  const quaternion = new THREE.Quaternion().setFromUnitVectors(defaultNormal, normal);

  arcGeometry.applyQuaternion(quaternion);
  // if(startPoint.y==endPoint.y){
    // arcGeometry.rotateX(Math.PI);
  //     }
  //     else if(startPoint.x==endPoint.x){
        // arcGeometry.rotateY(Math.PI);
  //     }
  



  arcGeometry.translate(center.x, center.y, center.z);


  const material = new THREE.LineBasicMaterial({ color: this.color4 });


  const arc = new THREE.Line(arcGeometry, material);

  //Add the arc to the scene
  this.scene.add(arc);

  console.log('Start Angle:', startAngle);
  console.log('End Angle:', endAngle);
  // console.log(result);


   
}
cutouts():void{

  
  const radiusTop = 2;
const radiusBottom = 2;
const height = 10;
const radialSegments = 32;

// Create cylinder geometry
const cylinderGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, 32, true);

const axis1 = new THREE.Vector3(0.66696032153528295, 0, 0.74509323543939898);
const point = new THREE.Vector3(3.34830820925752, 5.1900029423855196, -9.4780106983438195);

const clippingPlane = new THREE.Plane(axis1.normalize(), -point.dot(axis1.normalize()));

// Create cylinder material with clipping
const cylinderMaterial = new THREE.MeshLambertMaterial({
  color: this.color7,
  clippingPlanes: [clippingPlane], // Local clipping plane for this material only
  clipIntersection: true, // Clip where the plane intersects
  side: THREE.DoubleSide
});

const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

// Calculate the rotation matrix to align the cylinder with the central axis
const axis = new THREE.Vector3(0.52228849704920399, 0, -0.852768858396039);

const quaternion = new THREE.Quaternion();
quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), axis);

cylinderMesh.quaternion.copy(quaternion);

// Set the position of the cylinder mesh
cylinderMesh.position.set(-1.15000825461792, 5.1900029423855196, -2.133351492891995);

// Add the cylinder mesh to the scene
this.scene.add(cylinderMesh);

// Enable local clipping in renderer
this.renderer.localClippingEnabled = true;




 }



 
  ngOnInit(): void {}
    ngAfterViewInit(): void {
      // this.stepData();
      this.assigningValues();
     
      // this.createEllipse();
      // this.createeelipse();
      // this.cutouts();

 
      
    }
    
    createThree(): void {
      // const canvas = this.canvasRef.nativeElement;
      // this.scene=new THREE.Scene()
      

this.centralAxis = new THREE.Vector3(this.axis_x,this.axis_y,this.axis_z); 



if (this.centralAxis.equals(new THREE.Vector3(1, 0, 0))) {

  this.stepFileDataArr.forEach((data: any) => {
    if(data.DTYPE=="VERTEX_POINT") {
    
  data.CP_x=data.CP_x;
  data.CP_y=Math.sign(data.CP_y)*(this.rad-Math.abs(this.py2-data.CP_y))+data.CP_y;
  data.CP_z=data.CP_z;
      }

      if(data.DTYPE=="CIRCLE") {
    
        data.radius=this.rad;
        
            }

    else if(data.DTYPE=="LINE"){

      data.CP_x=data.CP_x;
      data.CP_y=Math.sign(data.CP_y)*(this.rad-Math.abs(this.py2-data.CP_y))+data.CP_y;
      data.CP_z=data.CP_z;

      data.magnitude=this.rad;
    }


  });
  this.assigningValues();
}



else if (this.centralAxis.equals(new THREE.Vector3(0, 0, 1))) {

    this.stepFileDataArr.forEach((data: any) => {
      if(data.DTYPE=="VERTEX_POINT"){

      
    data.CP_x=Math.sign(data.CP_x)*(this.rad-Math.abs(this.px2-data.CP_x))+data.CP_x;
    
    data.CP_y=data.CP_y;
    data.CP_z=data.CP_z;
      }   
      
      if(data.DTYPE=="CIRCLE") {
    
        data.radius=this.rad;
        
            }

            else if(data.DTYPE=="LINE"){
              data.CP_x=Math.sign(data.CP_x)*(this.rad-Math.abs(this.px2-data.CP_x))+data.CP_x;
    
              data.CP_y=data.CP_y;
              data.CP_z=data.CP_z;
              data.magnitude=this.rad;
            }            
  
    });

    

this.assigningValues();
  
  }

else if (this.centralAxis.equals(new THREE.Vector3(0, 1, 0))) {
  

    this.stepFileDataArr.forEach((data: any) => {
      if(data.DTYPE=="VERTEX_POINT"){
     
      
    data.CP_x=Math.sign(data.CP_x)*(this.rad-Math.abs(this.px2-data.CP_x))+data.CP_x;
    data.CP_y=data.CP_y;
    data.CP_z=data.CP_z;
        }

        if(data.DTYPE=="CIRCLE") {
    
          data.radius=this.rad;
          
              }

              else if(data.DTYPE=="LINE"){
                data.CP_x=Math.sign(data.CP_x)*(this.rad-Math.abs(this.px2-data.CP_x))+data.CP_x;
    data.CP_y=data.CP_y;
    data.CP_z=data.CP_z;
                data.magnitude=this.rad;
              }            
    

  
    });
    this.assigningValues();
  }




// }

// this.heightStepChange();
// this.radiusStepChange();
// this.planeStepChange();



  }

  createOnHeightChange():void{

 

    const h0=new THREE.Vector3(this.px,this.py,this.pz);
const h3=new THREE.Vector3(this.px2, this.py2,this.pz2);
const heightt=h0.distanceTo(h3);

   
    if (this.centralAxis.equals(new THREE.Vector3(1, 0, 0))) {

      this.stepFileDataArr.forEach((data: any) => {
        if(data.DTYPE=="VERTEX_POINT") {
          if(data.CP_x==this.px2){
    
            data.CP_x=this.customSign(data.CP_x)*(this.height)+(data.CP_x-heightt);
            data.CP_y=data.CP_y;
            data.CP_z=data.CP_z;
            this.cx6=data.CP_x;
          }     
          
        }
        if(data.DTYPE=="CIRCLE") {

          if(this.px2==data.CP_x && this.py2==data.CP_y && this.pz2==data.CP_z){
        
          data.CP_x=this.customSign(data.CP_x)*(this.height)+(data.CP_x-heightt);
          data.CP_y=data.CP_y;
          data.CP_z=data.CP_z;
          
              }
   
    
      }
    });
    this.px2=this.cx6;

      this.assigningValues();
    }
    
    
    
    else if (this.centralAxis.equals(new THREE.Vector3(0, 0, 1))) {
      console.log(this.height);
      console.log(heightt);
    
        this.stepFileDataArr.forEach((data: any) => 
          {
            if(data.DTYPE=="VERTEX_POINT") {
              if(data.CP_z==this.pz2){
        
                data.CP_x=data.CP_x;
                data.CP_y=data.CP_y;
              
                data.CP_z=this.customSign(data.CP_z)*(this.height)+(data.CP_z-heightt);
                this.cx6=data.CP_z;
              }
            
                    
              
            }
            if(data.DTYPE=="CIRCLE") {
    
              if(this.px2==data.CP_x && this.py2==data.CP_y && this.pz2==data.CP_z){
               
            
              data.CP_x=data.CP_x;
              data.CP_y=data.CP_y;
              data.CP_z=this.customSign(data.CP_z)*(this.height)+(data.CP_z-heightt);
              
                  }
         
        
          }
         
          
        });
        this.pz2=this.cx6;

        this.assigningValues();
      }
          
    
    else if (this.centralAxis.equals(new THREE.Vector3(0, 1, 0))) {
     
      
    
        this.stepFileDataArr.forEach((data: any) => 
          {
            if(data.DTYPE=="VERTEX_POINT") {
        
              if(data.CP_y==this.py2){
                data.CP_x=data.CP_x;
                
                data.CP_y=this.customSign(data.CP_y)*(this.height)+(data.CP_y-heightt);
                data.CP_z=data.CP_z;
                
                
              }   
              
            }
            if(data.DTYPE=="CIRCLE") {
           

              if(this.px2==data.CP_x && this.py2==data.CP_y && this.pz2==data.CP_z){
               
              data.CP_x=data.CP_x;
              data.CP_y=this.customSign(data.CP_y)*(this.height)+(data.CP_y-heightt);;
              data.CP_z=data.CP_z;
              
              this.cx6=data.CP_y;
              
              
                  }
        
          }
        });
        this.py2=this.cx6;
        this.assigningValues();
      }
    }

  animate() {
      requestAnimationFrame(this.animate.bind(this));

      this.controls.update();

     
      this.renderer.render(this.scene, this.camera);
  }



makeTextSprite(message: string): THREE.Sprite {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return new THREE.Sprite();

  context.font = ' 30px Calibri';
  context.fillStyle = 'white';
  context.fillText(message, 0, 18);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;

  const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(4, 2, 1); 

  return sprite;
}
  
}
