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
  resolve(input: SignedTokenIdentity): ResolvedIdentity {
    return {
      subject: input.subject,
      issuer: input.issuer,
      issuedAt: input.issuedAt,
      expiresAt: input.expiresAt,
    };
  }
}
