import { Test, TestingModule } from '@nestjs/testing';
import { TrasladosEstanteriaController } from './traslados-estanteria.controller';
import { TrasladosEstanteriaService } from './traslados-estanteria.service';

describe('TrasladosEstanteriaController', () => {
  let controller: TrasladosEstanteriaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrasladosEstanteriaController],
      providers: [TrasladosEstanteriaService],
    }).compile();

    controller = module.get<TrasladosEstanteriaController>(TrasladosEstanteriaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
