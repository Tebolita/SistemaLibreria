import { Test, TestingModule } from '@nestjs/testing';
import { EstadoEnvioController } from './estado-envio.controller';
import { EstadoEnvioService } from './estado-envio.service';

describe('EstadoEnvioController', () => {
  let controller: EstadoEnvioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadoEnvioController],
      providers: [EstadoEnvioService],
    }).compile();

    controller = module.get<EstadoEnvioController>(EstadoEnvioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
