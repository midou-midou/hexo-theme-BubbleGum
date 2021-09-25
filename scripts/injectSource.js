const fs = require('hexo-fs');
const path = require('path');
const css = hexo.extend.helper.get('css').bind(hexo);
const js = hexo.extend.helper.get('js').bind(hexo);

// inject css assest
hexo.extend.filter.register('before_generate', () => {
    if (hexo.config.theme_config) {
      hexo.theme.config = deepMerge(hexo.theme.config, hexo.config.theme_config);
    }
    hexo.extend.injector.register('head_end', () => css('/css/color/'+ hexo.theme.config.scheme));
    hexo.extend.injector.register('head_end', () => css('/css/index'));
    // inject baidu analyze
    hexo.extend.injector.register('head_end', () => js('https://hm.baidu.com/hm.js?'+ hexo.theme.config.baidu_Analyze.id));

    // inject valine 
    hexo.extend.injector.register('head_end', () => js(hexo.theme.config.cdn.valine));

    // inject animation
    hexo.extend.injector.register('head_end', () => css(hexo.theme.config.cdn.animate));

    // inject rasterizehtml
    hexo.extend.injector.register('head_end', () => js(hexo.theme.config.cdn.rasterizehtml));

    // inject lozad
    hexo.extend.injector.register('head_end', () => js("https://cdn.bootcdn.net/ajax/libs/lozad.js/1.16.0/lozad.min.js"));
    hexo.extend.injector.register('body_end', () => js("/lib/lozad/lazyload.js"));
}, -999);

hexo.extend.filter.register('before_generate', function(){
  hexo.extend.generator.register('favicon_asset', ()=>[
      {
          path: '/favicon.ico',
          data: function(){
            return fs.createReadStream(
              path.resolve(path.resolve(__dirname, "../source/favicon"),"favicon.ico"))
          }
      },
      {
        path: '/font/Balbaleo.otf',
        data: function(){
          return fs.createReadStream(
            path.resolve(path.resolve(__dirname, "../source/font"),"Balbaleo.otf"))
        }
      },
      {
        path: '/lib/lozad/lazyload.js',
        data: function(){
          return fs.createReadStream(
            path.resolve(__dirname,"../snap/lazyload.js"))
        }
      },
      {
        path: '/img/snap/yuyy.png',
        data: function(){
          return fs.createReadStream(
            path.resolve(path.resolve(__dirname, "../source/img/snap"),"yuyy.png"))
        }
      }
  ]);
})

// lazy load tag
hexo.extend.tag.register('lazyload', (args) => {
    return '<img class="lozad" data-src='+args[0]+' />'
})