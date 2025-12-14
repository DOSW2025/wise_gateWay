import { Test } from '@nestjs/testing';
import { FeatureFlagsController } from './feature-flags.controller';
import { FeatureFlagsService } from './feature-flags.service';

describe('FeatureFlagsController', () => {
  let controller: FeatureFlagsController;
  let service: { isEnabled: jest.Mock };

  beforeEach(async () => {
    service = { isEnabled: jest.fn() } as any;
    const moduleRef = await Test.createTestingModule({
      controllers: [FeatureFlagsController],
      providers: [{ provide: FeatureFlagsService, useValue: service }],
    }).compile();

    controller = moduleRef.get(FeatureFlagsController);
  });

  it('GET /:key returns enabled state for IA key', async () => {
    service.isEnabled.mockResolvedValue(true);
    const result = await controller.getFlag({ key: 'enable_ia_chat' });
    expect(result).toEqual({ key: 'enable_ia_chat', enabled: true });
  });

  it('GET /:key returns enabled state for provided key', async () => {
    service.isEnabled.mockResolvedValue(false);
    const result = await controller.getFlag({ key: 'some_key' });
    expect(result).toEqual({ key: 'some_key', enabled: false });
  });
});
