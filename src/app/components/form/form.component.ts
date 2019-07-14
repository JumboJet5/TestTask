import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CustomHttpService } from 'src/app/services/custom-http.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  public homeworkForm = new FormGroup({
    lesson: new FormControl('', Validators.required),
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });
  public lessons: {id: number, name: string}[] = [];
  private lessons$: Subscription;
  constructor(private http: CustomHttpService) { }

  ngOnInit(): void {
    this.lessons$ = this.http.getLessons().subscribe(resp => this.lessons = resp);
  }

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    if (this.lessons$) {
      this.lessons$.unsubscribe();
    }
  }
}
