import { Component, OnInit, Input} from '@angular/core';
import { HttpService } from 'src/app/service/http.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  @Input() projects=[];

  displayedColumns: string[] = ['name', 'description','edit','delete'];

  constructor(private http:HttpService) { }

  ngOnInit(): void {   
  }

  onDelete(portfolioId:String,projectId:String){
    this.http.deleteProject(portfolioId,projectId).subscribe();
  }

}
