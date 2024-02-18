const fs = require('fs');
const path = require('path');
const { rimraf } = require('rimraf');
const svgSprite = require('svg-sprite');
const svgo = require('svgo');
const yargs = require('yargs');

const svgoConfig = require('./svgo.config.js');
const svgoCleanConfig = require('./svgo.clean.config.js');
const svgSpriteConfig = require('./svg-sprite.config.js');

const sprite = new svgSprite(svgSpriteConfig);
const argv = yargs
  .usage('Usage: $0 --config [config file] --output [output file]')
  .demandOption(['config', 'output'])
  .argv;
const defaultConfigFile = fs.readFileSync('svg-icons.json', 'utf8');
const { 'root-dir': defaultRootDir, icons: defaultIcons } = JSON.parse(defaultConfigFile);

const configFile = fs.readFileSync(argv.config, 'utf8');
const { 'root-dir': rootDir, icons } = JSON.parse(configFile);

Object.entries(defaultIcons).forEach(([name, file]) => {
  const iconPath = defaultRootDir + '/' + file;
  const svg = fs.readFileSync(iconPath, 'utf8');
  const tempFile = `${__dirname}/tmp/${name}.svg`;
  const { data: optimizedSvg } = svgo.optimize(svg, svgoConfig);

  if (!fs.existsSync('./tmp')) {
    fs.mkdirSync('./tmp', { recursive: true });
  }

  fs.writeFileSync(tempFile, optimizedSvg);

  sprite.add(tempFile, null, fs.readFileSync(tempFile, 'utf-8'))
});

sprite.compile((error, result) => {
  for (const mode of Object.values(result)) {
    console.log(mode);
    for (const resource of Object.values(mode)) {
      let fileContent = resource.contents;

      if (resource.path.endsWith('.svg')) {
        let svgTextDecoder = new TextDecoder("utf-8");
        const { data: optimizedSvg } = svgo.optimize(svgTextDecoder.decode(resource.contents), svgoCleanConfig);

        fileContent = optimizedSvg;
      }

      fs.mkdirSync(path.dirname(resource.path), { recursive: true });
      fs.writeFileSync(resource.path, fileContent);
    }
  }

  rimraf('tmp');
});