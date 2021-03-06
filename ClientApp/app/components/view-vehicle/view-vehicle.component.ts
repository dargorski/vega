import { ProgressService } from './../../services/progress.service';
import { PhotoService } from './../../services/photo.service';
import { VehicleService } from './../../services/vehicle.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  vehicle;
  vehicleId;
  photos: any = [];
  progress;

  constructor(
    private zone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private toasty: ToastyService,
    private progressService: ProgressService,
    private photoService: PhotoService,
    private vehicleService: VehicleService){

      route.params.subscribe(p => {
        this.vehicleId = +p['id'];
        if(isNaN(this.vehicleId) || this.vehicleId <= 0){
          router.navigate(['/vehicles']);
        return;
        }
      })
      }

  ngOnInit() {
    this.populatePhotos();

    this.vehicleService.getVehicle(this.vehicleId)
      .subscribe(
        v => this.vehicle = v,
        err => {
          if (err.status == 404){
            this.router.navigate(['/vehicles']);
          return;
          }
        })
  }

  delete(){
    if(confirm("Are you sure?")){
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x => {
          this.router.navigate(['/vehicles']);
        })
    }
  }
  populatePhotos(){
  this.photoService.getPhotos(this.vehicleId)
      .subscribe(photos=> this.photos = photos);
  }

  uploadPhoto(){

    this.progressService.startTracking()
      .subscribe(progress =>{
         console.log(progress);
         this.zone.run(() => this.progress = progress)         
      },
      undefined,
      () => {this.progress = null;});
     
      var nativeElement:any = this.fileInput.nativeElement;
      var file = nativeElement.files[0];
      nativeElement.value = '';

    this.photoService.upload(this.vehicleId, file).subscribe(photo => {
        this.photos.push(photo);
      },
      err => this.toasty.error({
        title: 'Error',
        msg: err.text(),
        theme: 'bootstrap',
        showClose: true,
        timeout: 5000
      }),
      () => this.toasty.success({
        title: 'Success',
        msg: 'File successfully saved.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 5000
      })
    );
  }

}
