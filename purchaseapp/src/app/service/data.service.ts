import { Injectable } from '@angular/core';
import { MyLogService } from './my-log.service';

@Injectable({
    providedIn: 'root'
  })
export class DataService {
    private data: string[] = [ "Tom", "Bob", "Sam"];
    constructor(private logService: MyLogService){}

    getData(): string[] {
        return this.data;
    }
    addData(name: string){
        this.data.push(name);
        this.logService.write(`${name} is added!`)
    }
}