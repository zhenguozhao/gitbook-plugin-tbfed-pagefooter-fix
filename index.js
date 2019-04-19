var moment = require('moment');
module.exports = {
  book: {
    assets: './assets',
    css: [
      'footer.css'
    ],
  },
  hooks: {
    'page:before': function(page) {
      var _label = 'File Modify: ',
          _format = 'YYYY-MM-DD HH:mm:ss',
          _copy = 'Copyright'
      if(this.config.get('pluginsConfig')['tbfed-pagefooter']) {
        _label = this.config.get('pluginsConfig')['tbfed-pagefooter']['modify_label'] || _label;
        _format = this.config.get('pluginsConfig')['tbfed-pagefooter']['modify_format'] || _format;

        var _c = this.config.get('pluginsConfig')['tbfed-pagefooter']['copyright'];
        _copy = _c ? _c: _copy;
      }
      var _copy = '<span class="copyright">'+_copy+'</span>'
      var str = ' \n\n<footer class="page-footer">' + _copy +
        '<span class="footer-modification">' +
        _label +
        '\n{{file.mtime | date("' + _format +
        '")}}\n</span></footer>'
      page.content = page.content + str;
      return page;
    }
  },
  filters: {
    date: function(d, format) {
      return moment(d).format(format)
    }
  }
};
