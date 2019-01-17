import { Component, OnInit, Input, Output } from '@angular/core';
import { Project } from '../_models/project';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  currentProject: Project;

  constructor() { }

  ngOnInit() {
  }

}
