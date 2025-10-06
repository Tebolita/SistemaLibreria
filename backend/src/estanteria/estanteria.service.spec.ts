import { Test, TestingModule } from '@nestjs/testing';
import { EstanteriaService } from './estanteria.service';

describe('EstanteriaService', () => {
  let service: EstanteriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstanteriaService],
    }).compile();

    service = module.get<EstanteriaService>(EstanteriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
