import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarVeiculoComponent } from './adicionar-veiculo.component';

describe('AdicionarVeiculoComponent', () => {
  let component: AdicionarVeiculoComponent;
  let fixture: ComponentFixture<AdicionarVeiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarVeiculoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarVeiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
