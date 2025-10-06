import { Test, TestingModule } from '@nestjs/testing';
import { EstanteriaController } from './estanteria.controller';
import { EstanteriaService } from './estanteria.service';

describe('EstanteriaController', () => {
  let controller: EstanteriaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstanteriaController],
      providers: [EstanteriaService],
    }).compile();

    controller = module.get<EstanteriaController>(EstanteriaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
