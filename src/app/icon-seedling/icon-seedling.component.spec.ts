import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconSeedlingComponent } from './icon-seedling.component';

describe('IconSeedlingComponent', () => {
  let component: IconSeedlingComponent;
  let fixture: ComponentFixture<IconSeedlingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconSeedlingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconSeedlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
