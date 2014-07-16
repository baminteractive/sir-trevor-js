/*
  Text Block
*/
SirTrevor.Blocks.Text = SirTrevor.Block.extend({

  type: "text",

  markdownable: true,

  title: function() { return i18n.t('blocks:text:title'); },

  editorHTML: '<div class="st-required st-text-block" contenteditable="true"></div>',

  icon_name: 'text',

  loadData: function(data){
  	this.getTextBlock().html(this.getPreviewHTML(data.text));
  }
});