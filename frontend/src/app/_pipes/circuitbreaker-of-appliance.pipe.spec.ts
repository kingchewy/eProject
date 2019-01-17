import { CircuitbreakerOfAppliancePipe } from './circuitbreaker-of-appliance.pipe';

describe('CircuitbreakerOfAppliancePipe', () => {
  it('create an instance', () => {
    const pipe = new CircuitbreakerOfAppliancePipe();
    expect(pipe).toBeTruthy();
  });
});
