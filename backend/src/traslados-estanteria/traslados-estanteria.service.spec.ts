import { Test, TestingModule } from '@nestjs/testing';
import { TrasladosEstanteriaService } from './traslados-estanteria.service';

describe('TrasladosEstanteriaService', () => {
  let service: TrasladosEstanteriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrasladosEstanteriaService],
    }).compile();

    service = module.get<TrasladosEstanteriaService>(TrasladosEstanteriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
