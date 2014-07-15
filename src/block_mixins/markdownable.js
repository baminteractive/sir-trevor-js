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
  }
};
