import { Test, TestingModule } from '@nestjs/testing';
import { InventarioEstanteriaController } from './inventario-estanteria.controller';
import { InventarioEstanteriaService } from './inventario-estanteria.service';

describe('InventarioEstanteriaController', () => {
  let controller: InventarioEstanteriaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventarioEstanteriaController],
      providers: [InventarioEstanteriaService],
    }).compile();

    controller = module.get<InventarioEstanteriaController>(InventarioEstanteriaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
