import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SteppComponent } from './stepp.component';

describe('SteppComponent', () => {
  let component: SteppComponent;
  let fixture: ComponentFixture<SteppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SteppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SteppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
