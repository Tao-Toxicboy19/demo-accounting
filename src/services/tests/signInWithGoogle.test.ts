import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserCredential, signInWithPopup } from 'firebase/auth';
import { signInWithGoogle } from '../singInWithGoogle';

vi.mock('firebase/auth', async () => {
  const actual =
    await vi.importActual<typeof import('firebase/auth')>('firebase/auth');
  return {
    ...actual,
    GoogleAuthProvider: vi.fn(() => ({})),
    signInWithPopup: vi.fn(),
  };
});

vi.mock('../../firebase', () => ({
  auth: {},
}));

describe('signInWithGoogle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return UserCredential when signInWithPopup succeeds', async () => {
    const mockUserCredential = {
      user: {
        uid: '123',
        displayName: 'Test User',
        email: 'test@example.com',
      },
    } as UserCredential;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (signInWithPopup as any).mockResolvedValue(mockUserCredential);

    const result = await signInWithGoogle();

    expect(signInWithPopup).toHaveBeenCalledOnce();
    expect(result).toEqual(mockUserCredential);
  });

  it('should return null when signInWithPopup throws error', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (signInWithPopup as any).mockRejectedValue(new Error('Popup blocked'));

    const result = await signInWithGoogle();

    expect(signInWithPopup).toHaveBeenCalledOnce();
    expect(result).toBeNull();
  });
});
