import 'reflect-metadata';
import { ExecutionContext } from '@nestjs/common';
import { FeatureFlagGuard } from './feature-flag.guard';
import { FeatureFlagsService } from '../../feature-flags/feature-flags.service';

const mockService: Partial<FeatureFlagsService> = {
  isEnabled: jest.fn(),
};

const makeContext = (flagKey?: string): ExecutionContext => {
  const handler = {};
  if (flagKey) {
    Reflect.defineMetadata('feature_flag_key', flagKey, handler);
  }
  return {
    getHandler: () => handler,
    getClass: () => function Dummy() {},
  } as unknown as ExecutionContext;
};

describe('FeatureFlagGuard', () => {
  let guard: FeatureFlagGuard;
  let reflector: { get: jest.Mock };

  beforeEach(() => {
    (mockService.isEnabled as jest.Mock).mockReset();
    reflector = { get: jest.fn() } as any;
    guard = new FeatureFlagGuard(reflector as unknown as Reflector, mockService as FeatureFlagsService);
  });

  it('allows when no feature flag metadata is present', async () => {
    const ctx = makeContext();
    reflector.get.mockReturnValue(undefined);
    await expect(guard.canActivate(ctx)).resolves.toBe(true);
  });

  it('throws Forbidden when feature is disabled', async () => {
    (mockService.isEnabled as jest.Mock).mockResolvedValue(false);
    const ctx = makeContext('enable_ia_chat');
    reflector.get.mockReturnValue('enable_ia_chat');
    await expect(guard.canActivate(ctx)).rejects.toThrow("Feature 'enable_ia_chat' is disabled");
    expect(mockService.isEnabled).toHaveBeenCalledWith('enable_ia_chat', false);
  });

  it('allows when feature is enabled', async () => {
    (mockService.isEnabled as jest.Mock).mockResolvedValue(true);
    const ctx = makeContext('enable_ia_chat');
    reflector.get.mockReturnValue('enable_ia_chat');
    await expect(guard.canActivate(ctx)).resolves.toBe(true);
  });
});
