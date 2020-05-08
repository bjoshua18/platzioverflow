import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup-screen',
  templateUrl: './signup-screen.component.html'
})
export class SignupScreenComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&â€™*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      repeatEmail: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      repeatPassword: new FormControl(null, Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { email, repeatEmail } = this.signupForm.value;
      if (email === repeatEmail) {
        const { password, repeatPassword } = this.signupForm.value;
        if (password === repeatPassword) {
          const { firstName, lastName } = this.signupForm.value;
          const user = new User(email, password, firstName, lastName);
          this.authService.signup(user)
            .subscribe(
              data => {
                this.authService.login(data);
                return data;
              },
              error => console.error(error)
            );
        } else {
          console.log('Las contraseñas no coinciden');
        }
      } else {
        console.log('Los emails no coinciden');
      }
    } else {
      console.log('El formulario no es correcto');
    }
  }
}
