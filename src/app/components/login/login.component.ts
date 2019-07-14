import { Component, HostListener, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomHttpService } from 'src/app/services/custom-http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  public isPassVisible = false;
  public loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('', Validators.compose([
      Validators.minLength(6),
      Validators.required,
    ])),
  });
  private login$: Subscription;

  constructor(private http: CustomHttpService, private router: Router) { }

  onSubmit(value: { email: string, password: string }): void {
    this.login$ = this.http.login(value).subscribe(
      () => this.router.navigateByUrl('form'),
      () => this.loginForm.patchValue({password: ''}),
    );
  }

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    if (this.login$) {
      this.login$.unsubscribe();
    }
  }
}
