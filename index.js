'use strict';

const exec = require('child_process').execSync;

function getMethods (platform) {
  function darwinGetMemoryUsage (memType) {
    let pos = 3;

    if (memType.split(' ').length > 1) {
      pos = 4;
    }

    const cmd = `vm_stat | grep 'Pages ${memType}:' | awk '{print $${pos}}'`;
    return exec(cmd, {'encoding' : 'utf8'});
  }

  function darwinGetTotalMemory () {
    return parseInt(exec('sysctl -n hw.memsize', {'encoding' : 'utf8'}), 10);
  }

  function darwinGetUsedMemory () {
    const memTypes = ['active', 'wired down', 'inactive'];
    const pageSize = darwinPageSize();
    
    let totalUsed = 0;

    memTypes.forEach(function (type) {
      totalUsed += parseInt(darwinGetMemoryUsage(type), 10);
    });

    return (totalUsed * pageSize);
  }

  function darwinPageSize () {
    return parseInt(exec('sysctl -n hw.pagesize', {'encoding' : 'utf8'}), 10);
  }

  function linuxGetTotalMemory ()  {
    return parseInt(exec('free -b | grep "Mem:" | awk \'{print $2}\'', {'encoding' : 'utf8'}), 10);
  }

  function linuxGetUsedMemory () {
    return parseInt(exec('free -b | grep "Mem:" | awk \'{print $7}\'', {'encoding' : 'utf8'}), 10);
  }

  const methods = {
    'linux' : {
      'getTotalMemory' : linuxGetTotalMemory,
      'getUsedMemory' : linuxGetUsedMemory
    },
    'darwin' : {
      'getTotalMemory' : darwinGetTotalMemory,
      'getUsedMemory' : darwinGetUsedMemory
    }
  };

  return methods[process.platform];
}

const methods = getMethods();

function total (format) {
  return methods.getTotalMemory();
}

function used (format) {
  return methods.getUsedMemory();
}

function free (format) {
  return methods.getTotalMemory() - methods.getUsedMemory();
} 

module.exports = {total, used, free};
