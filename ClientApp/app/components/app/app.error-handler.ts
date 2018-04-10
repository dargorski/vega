import { ToastyService } from 'ng2-toasty';
import { ErrorHandler, Inject, NgZone } from "@angular/core";

export class AppErrorHandler implements ErrorHandler {
    constructor(
        @Inject(NgZone) private ngZone: NgZone, //solved not displaying toast message, we have to inject it because errorhandler is initialized before importing toastyservice/ngzone
        @Inject(ToastyService) private toastyService: ToastyService) {}


    handleError(error: any): void {
        this.ngZone.run(() => {
            if(typeof(window)!=='undefined'){
                this.toastyService.error({
                    title: 'Error',
                    msg: 'An unexpected error happened',
                    theme: 'bootstrap',
                    showClose: true,
                    timeout: 5000
                  })}
        })


    }
}