import chai from 'chai';
import systemdStatus from './index';

const expect = chai.expect;

describe('systemdStatus', () => {
  it('Should throw an error if the input is not an array or a string', () => {
    expect(() => systemdStatus(1)).to.throw('Input must be an Array or a String');
  });

  it('Should throw an error if the input is an unknown service', () => {
    expect(() => systemdStatus('foobarfizz')).to.throw('Unknown service');
  });

  it('Should throw an error if the input contains an unknown service', () => {
    expect(() => {
      systemdStatus(['systemd-sysctl.service', 'foobarfizz']).to.throw('Unknown service');
    });
  });

  it('Should return corrent structure when input is a known service', () => {
    const result = systemdStatus('systemd-sysctl.service');
    expect(result.name).to.be.a('string');
    expect(result.name).to.equal('systemd-sysctl');
    expect(result.timestamp).to.be.a('date');
    expect(result.isActive).to.be.a('boolean');
  });

  it('Should return corrent structure when input contains only known services', () => {
    const results = systemdStatus(['systemd-sysctl.service', 'systemd-journal-flush.service']);
    const expectedNames = ['systemd-sysctl', 'systemd-journal-flush'];
    results.forEach((result, index) => {
      expect(result.name).to.be.a('string');
      expect(result.name).to.equal(expectedNames[index]);
      expect(result.timestamp).to.be.a('date');
      expect(result.isActive).to.be.a('boolean');
    });
  });
});
