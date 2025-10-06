import { Test, TestingModule } from '@nestjs/testing';
import { InventarioEstanteriaService } from './inventario-estanteria.service';

describe('InventarioEstanteriaService', () => {
  let service: InventarioEstanteriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventarioEstanteriaService],
    }).compile();

    service = module.get<InventarioEstanteriaService>(InventarioEstanteriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
