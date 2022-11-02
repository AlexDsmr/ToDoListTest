import { Component, OnInit } from '@angular/core';
import { Task } from '@interfaces/task.interface';
import { Observable } from 'rxjs';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter-task',
  templateUrl: './filter-task.component.html',
  styleUrls: ['./filter-task.component.scss']
})
export class FilterTaskComponent implements OnInit {
  constructor(public filterService: FilterService) {}

  onInputChange(value: string) {
    this.filterService.filter = value;
  }

  ngOnInit(): void {}
}
