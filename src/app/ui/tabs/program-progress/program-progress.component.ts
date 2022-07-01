import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ProgramService } from 'src/app/core/services/program.service';

@Component({
  selector: 'dukes-program-progress',
  templateUrl: './program-progress.component.html',
  styleUrls: ['./program-progress.component.scss']
})
export class ProgramProgressComponent implements OnInit {
  public create:boolean = false;

  constructor(private authenticationService: AuthenticationService,
    private programService: ProgramService) { }

  ngOnInit(): void {
    this.authenticationService.getInfoUser().then((currentUser: any) => {
      this.programService.getProgram(currentUser.uid).subscribe((program: any)=> {
        if(program){
          this.create= true;
          

        }

      });


    });

  
  }

}
