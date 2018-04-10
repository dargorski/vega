import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/forkJoin';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

  makes;
  models;
  features;
  vehicle: any = {
    features: [],
    contact: {}
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private toastyService: ToastyService) { 
      route.paramMap.subscribe(p => {
        if(p.get('id'))
          this.vehicle.id = p.get('id');
      });
    }

  ngOnInit() {

    var sources = [
      this.vehicleService.getFeatures(),
      this.vehicleService.getMakes(),
    ]

    if(this.vehicle.id)
    sources.push(this.vehicleService.getVehicle(this.vehicle.id));

    Observable.forkJoin(sources).subscribe(data =>{
      this.makes = data[1];
      this.features = data[0];
      if(this.vehicle.id)
        this.vehicle = data[2];
    }, err => {
      if (err.status == 404)
          this.router.navigate(['/home']);
    })

  //   if(this.vehicle.id > 0){
  //   this.vehicleService.getVehicle(this.vehicle.id)
  //     .subscribe(v => {
  //       this.vehicle = v;
  //     }, err => {
  //       if (err.status == 404)
  //         this.router.navigate(['/home']);
  //     })
  //   }

  //   this.vehicleService.getMakes().subscribe(makes => {
  //     this.makes = makes;
  //   });

  //   this.vehicleService.getFeatures().subscribe(features => {
  //     this.features = features;
  //   })
   }

  onMakeChange(){
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
    delete this.vehicle.modelId;
  }

  onFeatureToggle(featureId, $event){
    if($event.target.checked)
      this.vehicle.features.push(featureId);
    else {
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index,1);
    }
  }

  submit(){
    this.vehicleService.create(this.vehicle)
      .subscribe(x => console.log(x));
  }


}
