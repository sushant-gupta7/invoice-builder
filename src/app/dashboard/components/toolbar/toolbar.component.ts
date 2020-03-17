import { Component, OnInit, Output , EventEmitter} from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  clickMe() {
    this.toggleSidenav.emit();
  }

}
