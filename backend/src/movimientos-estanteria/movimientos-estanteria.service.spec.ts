import { Test, TestingModule } from '@nestjs/testing';
import { MovimientosEstanteriaService } from './movimientos-estanteria.service';

describe('MovimientosEstanteriaService', () => {
  let service: MovimientosEstanteriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovimientosEstanteriaService],
    }).compile();

    service = module.get<MovimientosEstanteriaService>(MovimientosEstanteriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
