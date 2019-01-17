import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from '../_models/project';
import { ProjectService } from '../_services/project.service';
import { SurgeProtector } from '../_models/surgeprotectors';

import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FloorService } from '../_services/floor.service';
import { Floor } from '../_models/floor';
import { Room } from '../_models/room';
import { RoomService } from '../_services/room.service';


@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit, OnDestroy {  
  // manually add new categories or components to display in shoppinglist
  componentsToLoad: any = {surgeprotectors: false,
                          circuitbreakers: false,
                          sensors: false,
                          appliances: false                       
                          }

  loadingAllFinished: boolean = false;

  selectedProject: Project;
  selectedSurgeProtectors: SurgeProtector[];
  noSPsAvailable: boolean;

  projectsFloors: Floor[];
  countFloors: number = 0;

  roomsOfProject: Room[];
  roomsLoaded: boolean;
  

  //SUBSCRIPTIONS:
  getProjectSub: Subscription;
  getFloorsSub: Subscription;
  getRoomsSub: Subscription;

  constructor(
    private floorservice: FloorService, private roomservice: RoomService,
    private projectservice: ProjectService,
  ) { }

  ngOnInit() {
    this.getProject();
  }

  
  getProject(){
    this.getProjectSub = this.projectservice.currentProject.subscribe(project => {
      console.log("project loaded: ",project)
      if('id' in project && !this.selectedProject){
        console.log("key in project: ",project)
        this.selectedProject = project;
        this.getFloors();        
      }
    });
  }

  getFloors(){
    this.getFloorsSub = this.floorservice.getAllFloors(this.selectedProject.id)
    .subscribe(floors=>{
      console.log("floors",floors.length)

      if(floors.length != 0 || floors === undefined){
        console.log("if")
        this.projectsFloors = floors;
        this.getRoomsForAllFloors();
      } else{
        console.log("else")
        this.setComponentLoaded("sensors");
        this.setComponentLoaded('appliances');
        this.roomsLoaded = true;
      }
    })
  }

  getRoomsForAllFloors(){
    this.roomsOfProject = [];
    this.projectsFloors.forEach(floor=>{
      this.getRoomsForFloor(floor);
    })
  }
  
  getRoomsForFloor(floor){
    this.getFloorsSub = this.roomservice.getAllRooms(floor.id)
    .subscribe(rooms =>{
      console.log("getRoomsForFloor() -> rooms = ",rooms)
      if(rooms.length != 0 || rooms === undefined){
        this.addRoomsToRoomsOfProject(rooms);
      }
      this.checkLoadingFinished();
    });    
  }
  
  addRoomsToRoomsOfProject(rooms){
    console.log("gelange ich bis hier hin?=")
    rooms.forEach(room =>{
      this.roomsOfProject.push(room);
    });
    console.log("roomsOfProject",this.roomsOfProject)
  }

  checkLoadingFinished(){
    this.countFloors += 1;
    if(this.countFloors === this.projectsFloors.length){
      this.roomsLoaded = true;
      console.log("loading Finished set to true!")
    }
  }

  onSurgeProtectorsReady(surgeProtectors: SurgeProtector[]){
    console.log("onSurgeProtectorsReady-> surgeProtectors: ",surgeProtectors)
    if(surgeProtectors == null || surgeProtectors.length == 0){
      this.setComponentLoaded("surgeprotectors");
      this.setComponentLoaded('circuitbreakers');
      this.  noSPsAvailable = true;
    } else {
      this.selectedSurgeProtectors = surgeProtectors;
    }
    this.setComponentLoaded("surgeprotectors");
  }


  onCircuitBreakersReady(circuitBreakersLoaded: boolean){
    this.setComponentLoaded('circuitbreakers');
  }

  onSensorsReady(sensorsReady: boolean){
    this.setComponentLoaded('sensors');
  }

  onAppliancesReady(appliancesReady: boolean){
    this.setComponentLoaded('appliances');
  }
  

  setComponentLoaded(componentName: string){
    this.componentsToLoad[componentName] = true;
    this.checkAllLoaded();
  }


  checkAllLoaded(){
    let allLoaded = true;
    
    Object.entries(this.componentsToLoad).forEach(([key, value])  => {
      if(value == false){
        allLoaded = false;
      }
    });
    if(allLoaded){
      this.loadingAllFinished = true;
    }
  }

 
  

  toPdf(){
    var data = document.getElementById('contentToConvert');  
    html2canvas(data, {scale: 2}).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      //pdf.saveAs('MYPdf.pdf'); // Generated PDF   
      pdf.save('save.pdf')
    });  
  }  
  


  ngOnDestroy(){
    this.getProjectSub.unsubscribe();
    if(this.getFloorsSub){
      this.getFloorsSub.unsubscribe();
    }
    if(this.getRoomsSub){
      this.getRoomsSub.unsubscribe();
    }
  }
}
