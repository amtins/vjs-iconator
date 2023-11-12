# vjs iconator

Generates a sprite of SVG icons to change the default video.js icons.

## Usage

To change the appearance of the `audio-description.svg` icon to the corresponding "Material Symbols" icon, simply :

1. Download [the icon](https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/audio_description/default/48px.svg)
2. Rename the downloaded file to `audio-description.svg`.
3. Replace the file of the same name in the "icons" directory
4. Run the `npm run build` command
5. Move the generated `vjs-sprite-icons.svg` into your project

The `npm run build` command will generate a directory named `vjs-sprite` which will contain an `index.html` allowing you to view the final result, as well as the `vjs-sprite-icons.svg` file which can be used to replace the default video.js icons as follows:

```javascript
import playerIcons from './asset/vjs-sprite-icons.svg';

const player = videojs('my-player', {
  experimentalSvgIcons: playerIcons,
  // ...
});
```

Or a good old fashion copy and paste (...) :

```javascript
const player = videojs('my-player', {
  experimentalSvgIcons: `
  <svg>
  ...
  </svg>
  `,
  // ...
});
```

## References

This project uses [svgo](https://github.com/svg/svgo) and [svg-sprite](https://github.com/svg-sprite/svg-sprite).
