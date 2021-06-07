import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardensComponent } from './gardens.component';

describe('GardensComponent', () => {
  let component: GardensComponent;
  let fixture: ComponentFixture<GardensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GardensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GardensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
