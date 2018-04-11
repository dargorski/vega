import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  vehicles;
  allVehicles;
  makes;
  filter: any ={};

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe(makes => this.makes = makes);

    this.vehicleService.getVehicles()
      .subscribe(vehicles => this.vehicles = this.allVehicles = vehicles);
  }

  onFilterChange(){ //this and resetFilter() - client side filtering
    var vehicles = this.allVehicles;

    if(this.filter.makeId)
      vehicles = vehicles.filter(v => v.make.id == this.filter.makeId);


    this.vehicles = vehicles;
  }

  resetFilter(){
    this.filter = {};
    this.onFilterChange();
  }

}
