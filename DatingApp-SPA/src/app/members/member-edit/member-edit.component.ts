import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_modules/user';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_Services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_Services/user.service';
import { AuthService } from 'src/app/_Services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  constructor(private route: ActivatedRoute, private alertify: AlertifyService, private userService: UserService, private authService: AuthService) { }
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if(this.editForm.dirty) {
      $event.returnValue =  true;
    }
  }
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }
  updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      this.alertify.success('Profile Updated Successefully!');
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error(error);
    }); 
  }
}
