var grunt = require('grunt');

//配置
grunt.config.init({
  pkg: grunt.file.readJSON('gruntPackage.json'),
  'create-windows-installer': {
    x64: {
      appDirectory: './build/飞鸟-win32-x64',
      outputDirectory: './build/win-setup',
      name: '飞鸟',
      description: '易舸软件',
      authors: '易舸软件',
      exe: '飞鸟.exe'
    }
  }
});

//加载任务
grunt.loadNpmTasks('grunt-electron-installer');

//设置为默认
grunt.registerTask('default', ['create-windows-installer']);