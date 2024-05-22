import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailproductsComponent } from './detailproducts.component';

describe('DetailproductsComponent', () => {
  let component: DetailproductsComponent;
  let fixture: ComponentFixture<DetailproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailproductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
