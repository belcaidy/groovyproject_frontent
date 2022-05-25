import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAddsComponent } from './create-adds.component';

describe('CreateAddsComponent', () => {
  let component: CreateAddsComponent;
  let fixture: ComponentFixture<CreateAddsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAddsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAddsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
