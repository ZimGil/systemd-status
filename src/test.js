import chai from 'chai';
import systemdStatus from './index';
import sliceLast from './slice-last';

const expect = chai.expect;

describe('sliceLast', () => {
  it('Should remove that last part of a string based on a given seperator', () => {
    const input = 'Remove last word';
    const expected = 'Remove last';
    expect(sliceLast(input)).to.be.equal(expected);
  });

  it('Should not remove a single word', () => {
    const input = 'Leave';
    const expected = 'Leave';
    expect(sliceLast(input)).to.be.equal(expected);
  });
});

describe('systemdStatus', () => {
  it('Should throw an error if the input is not an array or a string', () => {
    expect(() => systemdStatus(1)).to.throw('Input must be an Array or a String');
  });

  it('Should throw an error if the input is an unknown service', () => {
    expect(() => systemdStatus('foobarfizz')).to.throw('Unknown service');
  });

  it('Should throw an error if the input contains an unknown service', () => {
    expect(() => {
      systemdStatus(['plexmediaserver.service', 'foobarfizz']).to.throw('Unknown service');
    });
  });

  it('Should return corrent structure when input is a known service', () => {
    const result = systemdStatus('plexmediaserver.service', shelljsExecMockSingle);
    expect(result.name).to.be.a('string');
    expect(result.name).to.equal('plexmediaserver');
    expect(result.timestamp).to.be.a('date');
    expect(result.isActive).to.be.a('boolean');
    expect(result.state).to.be.a('string');
    expect(result.isDisabled).to.be.a('boolean');
  });

  it('Should return corrent structure when input is a known service but missing timestamp (disabled service)', () => {
    const result = systemdStatus('plexmediaserver.service', shelljsExecMockSingleNoTimeStamp);
    expect(result.name).to.be.a('string');
    expect(result.name).to.equal('plexmediaserver');
    expect(result.timestamp).to.be.null;
    expect(result.isActive).to.be.a('boolean');
    expect(result.state).to.be.a('string');
    expect(result.isDisabled).to.be.a('boolean');
  });

  it('Should return corrent structure when input contains only known services', () => {
    const results = systemdStatus(['plexmediaserver.service', 'smbd.service'], shelljsExecMockMulti);
    const expectedNames = ['plexmediaserver', 'smbd'];
    results.forEach((result, index) => {
      const expectedName = expectedNames[index];
      expect(result.name).to.be.a('string');
      expect(result.name).to.equal(expectedName);
      expect(result.timestamp).to.be.a('date');
      expect(result.isActive).to.be.a('boolean');
      expect(result.state).to.be.a('string');
      expect(result.isDisabled).to.be.a('boolean');
    });
  });

  it('Should return corrent structure when input contains only known services but missing timestamp (disabled service)', () => {
    const results = systemdStatus(['plexmediaserver.service', 'smbd.service'], shelljsExecMockMultiNoTimeStamp);
    const expectedNames = ['plexmediaserver', 'smbd'];
    results.forEach((result, index) => {
      const expectedName = expectedNames[index];
      expect(result.name).to.be.a('string');
      expect(result.name).to.equal(expectedName);
      expect(result.isActive).to.be.a('boolean');
      expect(result.state).to.be.a('string');
      expect(result.isDisabled).to.be.a('boolean');
      if (result.isDisabled) {
        expect(result.timestamp).to.be.null;
      } else {
        expect(result.timestamp).to.be.a('date');
      }
    });
  });

  it('Should return an empty array in case input is an empty array', () => {
    expect(systemdStatus([])).to.be.an('array').that.is.empty;
  })
});

function shelljsExecMockSingle() {
  return [
    'Id=plexmediaserver.service',
    'ActiveState=active',
    'SubState=running',
    'UnitFileState=enabled',
    'StateChangeTimestamp=Thu 2020-06-04 01:35:33 IDT'
  ].join('\n');
}

function shelljsExecMockSingleNoTimeStamp() {
  return [
    'Id=plexmediaserver.service',
    'ActiveState=inactive',
    'SubState=dead',
    'UnitFileState=disabled',
    'StateChangeTimestamp='
  ].join('\n');
}

function shelljsExecMockMulti() {
  return [
    'Id=plexmediaserver.service',
    'ActiveState=active',
    'SubState=running',
    'UnitFileState=enabled',
    'StateChangeTimestamp=Thu 2020-06-04 01:35:33 IDT',
    '',
    'Id=smbd.service',
    'ActiveState=active',
    'SubState=running',
    'UnitFileState=enabled',
    'StateChangeTimestamp=Mon 2020-06-01 11:39:01 IDT'
  ].join('\n');
}

function shelljsExecMockMultiNoTimeStamp() {
  return [
    'Id=plexmediaserver.service',
    'ActiveState=inactive',
    'SubState=dead',
    'UnitFileState=disabled',
    'StateChangeTimestamp=',
    '',
    'Id=smbd.service',
    'ActiveState=active',
    'SubState=running',
    'UnitFileState=enabled',
    'StateChangeTimestamp=Mon 2020-06-01 11:39:01 IDT'
  ].join('\n');
}
