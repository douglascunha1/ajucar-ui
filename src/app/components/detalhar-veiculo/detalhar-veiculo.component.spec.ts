import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalharVeiculoComponent } from './detalhar-veiculo.component';

describe('DetalharVeiculoComponent', () => {
  let component: DetalharVeiculoComponent;
  let fixture: ComponentFixture<DetalharVeiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalharVeiculoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalharVeiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
