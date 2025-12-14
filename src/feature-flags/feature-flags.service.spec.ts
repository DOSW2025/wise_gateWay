import { Test } from '@nestjs/testing';
import { FeatureFlagsService } from './feature-flags.service';

jest.mock('../config/envs', () => ({
  envs: {
    FIREBASE_PROJECT_ID: 'demo-project',
    FIREBASE_CLIENT_EMAIL: 'service@demo.iam.gserviceaccount.com',
    FIREBASE_PRIVATE_KEY: '-----BEGIN PRIVATE KEY-----\nABC\n-----END PRIVATE KEY-----\n',
    FEATURE_FLAGS_REFRESH_MS: 1000,
  },
}));

jest.mock('../config/firebase', () => ({
  getRemoteConfig: async () => ({
    getTemplate: async () => ({
      parameters: {
        enable_ia_chat: { defaultValue: { value: 'true' } },
        other_flag: { defaultValue: { value: 'false' } },
      },
    }),
  }),
}));

describe('FeatureFlagsService', () => {
  let service: FeatureFlagsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [FeatureFlagsService],
    }).compile();

    service = moduleRef.get(FeatureFlagsService);
  });

  it('returns true when Remote Config parameter is "true"', async () => {
    const enabled = await service.isEnabled('enable_ia_chat', false);
    expect(enabled).toBe(true);
  });

  it('returns false when parameter missing and default is false', async () => {
    const enabled = await service.isEnabled('missing_flag', false);
    expect(enabled).toBe(false);
  });

  it('caches values between calls within TTL', async () => {
    const first = await service.isEnabled('other_flag', true);
    const second = await service.isEnabled('other_flag', true);
    expect(first).toBe(false);
    expect(second).toBe(false);
  });
});
