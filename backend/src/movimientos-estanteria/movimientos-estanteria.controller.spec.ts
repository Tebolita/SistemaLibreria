import { Test, TestingModule } from '@nestjs/testing';
import { MovimientosEstanteriaController } from './movimientos-estanteria.controller';
import { MovimientosEstanteriaService } from './movimientos-estanteria.service';

describe('MovimientosEstanteriaController', () => {
  let controller: MovimientosEstanteriaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovimientosEstanteriaController],
      providers: [MovimientosEstanteriaService],
    }).compile();

    controller = module.get<MovimientosEstanteriaController>(MovimientosEstanteriaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
