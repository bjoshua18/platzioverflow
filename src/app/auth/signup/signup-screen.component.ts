import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user.model';

@Component({
  selector: 'app-signup-screen',
  templateUrl: './signup-screen.component.html'
})
export class SignupScreenComponent implements OnInit {
  signupForm: FormGroup;

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
          console.log(user);
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
