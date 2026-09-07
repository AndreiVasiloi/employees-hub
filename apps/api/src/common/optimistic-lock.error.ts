export class OptimisticLockError extends Error {
  constructor(message = 'Resource was modified by another request') {
    super(message);
    this.name = 'OptimisticLockError';
  }
}
