var grunt = require('grunt');

//配置
grunt.config.init({
  pkg: grunt.file.readJSON('gruntPackage.json'),
  'create-windows-installer': {
    x64: {
      appDirectory: './build/FlyChat-win32-x64',
      outputDirectory: './build/win-setup64',
      name: 'FlyChat',
      description: 'eaglesoft',
      authors: 'eaglesoft',
      exe: 'FlyChat.exe',
      version: '1.0.0',
      iconUrl: './assets/app_icon.ico',
      setupIcon: './assets/app_icon.ico'
    },
    ia32: {
      appDirectory: './build/FlyChat-win32-ia32',
      outputDirectory: './build/win-setup32',
      name: 'FlyChat32',
      description: 'eaglesoft',
      authors: 'eaglesoft',
      exe: 'FlyChat.exe',
      version: '1.0.0',
      iconUrl: './assets/app_icon.ico',
      setupIcon: './assets/app_icon.ico'
    }
  }
});

//加载任务
grunt.loadNpmTasks('grunt-electron-installer');

//设置为默认
grunt.registerTask('default', ['create-windows-installer']);