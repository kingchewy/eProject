import { SurgeprotectorOfCircuitbreakerPipe } from './surgeprotector-of-circuitbreaker.pipe';

describe('SurgeprotectorOfCircuitbreakerPipe', () => {
  it('create an instance', () => {
    const pipe = new SurgeprotectorOfCircuitbreakerPipe();
    expect(pipe).toBeTruthy();
  });
});
