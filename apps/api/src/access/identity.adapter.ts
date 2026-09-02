export interface SignedTokenIdentity {
  subject: string;
  issuer: string;
  issuedAt: Date;
  expiresAt: Date;
}

export interface ResolvedIdentity {
  subject: string;
  issuer: string;
  issuedAt: Date;
  expiresAt: Date;
}

export class IdentityAdapter {
  constructor(private readonly now: () => Date = () => new Date()) {}

  resolve(input: SignedTokenIdentity): ResolvedIdentity {
    const currentTime = this.now().getTime();

    if (
      !input.subject ||
      !input.issuer ||
      !Number.isFinite(input.issuedAt.getTime()) ||
      !Number.isFinite(input.expiresAt.getTime()) ||
      input.issuedAt.getTime() > currentTime ||
      input.expiresAt.getTime() <= currentTime
    ) {
      throw new Error('Invalid identity');
    }

    return {
      subject: input.subject,
      issuer: input.issuer,
      issuedAt: input.issuedAt,
      expiresAt: input.expiresAt,
    };
  }
}
