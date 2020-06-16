import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ApiserviceService } from './apiservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-tour-of-heroes';
  users: any [] = [];
  filteredUsers: any [] = [];
  showForm = false;
  searchController = new FormControl(null);
  userForm: FormGroup;
  constructor(private _fb: FormBuilder, public apiserviceService: ApiserviceService) {
  }
  ngOnInit(): void {
    this.userForm = this._fb.group({
      _id: [null],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      company: [null],
      email: [null],
      primaryMobileNumber: [null],
      alternateMobileNumber: [null]
    });
    this.searchController.valueChanges.subscribe((name) => {
      if (name) {
        this.filteredUsers = this.users.filter(e => {
          if (e.firstName.includes(name) || e.lastName.includes(name)){
            return true;
          }
        });
      } else {
        this.filteredUsers = this.users;
      }
    });
    this.getUsers();
  }
  inClickAction(user, isUpdate = true): void {
    if (isUpdate) {
      this.showForm = true;
      const ur = this.users.find(e => e.id === user.id);
      this.userForm.patchValue(ur);
    } else {
      this.apiserviceService.delete(user.id)
      .subscribe(res => {
        this.getUsers();
      }, err => this.errorResponse(err));
    }
  }
  onAdd(): void {
    this.userForm.reset();
    this.showForm = true;
  }
  onSubmit(): void {
    console.log(this.userForm);
    if (this.userForm.valid) {
      if (this.userForm.value._id) {
          this.apiserviceService.updateUser(this.userForm.value)
          .subscribe(res => {
            this.getUsers();
          }, err => this.errorResponse(err));
      } else {
        let data = {};
        Object.assign(data, this.userForm.value);
        data['id'] = this.userForm.value._id;
        delete data['_id'];
          this.apiserviceService.addUser(data)
            .subscribe(res => {
              this.getUsers();
            }, err => this.errorResponse(err));
      }
    } else {
      alert('form not valid');
    }
  }
  getUsers(): void {
    this.apiserviceService.getUsers()
    .subscribe(res => {
      this.setUsers(res);
    }, err => this.errorResponse(err));
  }
  deleteUser(id): void {
    this.apiserviceService.delete(id)
    .subscribe(res => {
      this.getUsers();
    }, err => this.errorResponse(err));
  }
  setUsers(data): void {
    this.showForm = false;
    this.users = data;
    this.searchController.patchValue(null);
    this.filteredUsers = data;
  }
  errorResponse(err): void {
    console.log(err);
  }
  onclickMore(): void {
    this.userForm.controls.alternateMobileNumber.patchValue(' ');
  }
}
