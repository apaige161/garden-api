import { Component, OnInit } from '@angular/core';
import { faSeedling, faTimes } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'icon-seedling',
  templateUrl: './icon-seedling.component.html',
  styleUrls: ['./icon-seedling.component.css']
})
export class IconSeedlingComponent implements OnInit {

  faSeedling = faSeedling;
  faTimes = faTimes;

  constructor() { }

  ngOnInit(): void {
  }

}
