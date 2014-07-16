SirTrevor.BlockMixins.Markdownable = {

  mixinName: "Markdownable",
  showMarkdown: false,

  initializeMarkdownable: function() {
    SirTrevor.log("Adding Markdownable to block " + this.blockID);
    this.$control_ui = $('<div>', {'class': 'st-block__control-ui'});
    
    this.addUiControl('text', _.bind(this.toggleHandler, this));
    this.$inner.append(this.$control_ui);
  },

  toggleHandler: function() {
    this.toData();
    this.showMarkdown = !this.showMarkdown;
    this.loadData(this.blockStorage.data);
  },

  getControlTemplate: function(cmd) {
    return $("<a>",
      { 'data-icon': cmd,
        'class': 'st-icon st-block-control-ui-btn st-block-control-ui-btn--' + cmd
      });
  },

  addUiControl: function(cmd, handler) {
    this.$control_ui.append(this.getControlTemplate(cmd));
    this.$control_ui.on('click', '.st-block-control-ui-btn--' + cmd, handler);
  },

  toData: function() {
    SirTrevor.log("markdownable toData for " + this.blockID);

    var bl = this.$el,
        dataObj = {};

    /* Simple to start. Add conditions later */
    if (this.hasTextBlock()) {
      var content = this.getTextBlock().html();
      if (content.length > 0) {
        if(this.showMarkdown){
          dataObj.text = content.replace("<br>", "\n").replace(/<\/?[^>]+(>|$)/g, "");
        } else {
          dataObj.text = SirTrevor.toMarkdown(content, this.type);
        }
      }
    }

    // Add any inputs to the data attr
    if(this.$(':input').not('.st-paste-block').length > 0) {
      this.$(':input').each(function(index,input){
        if (input.getAttribute('name')) {
          dataObj[input.getAttribute('name')] = input.value;
        }
      });
    }

    // Set
    if(!_.isEmpty(dataObj)) {
      this.setData(dataObj);
    }
  },

  getPreviewHTML: function(text) {
    var previewHTML;
    text = text || '';
    
    if(this.showMarkdown){
      previewHTML = '<pre>' + text + '</pre>';
    } else {
      previewHTML = SirTrevor.toHTML(text, this.type)
    }
    return previewHTML;
  }
};
