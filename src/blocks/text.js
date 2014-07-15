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
  	console.log(this)
  	if(this.showMarkdown){
  		this.getTextBlock().html(data.text);
  	} else {
    	this.getTextBlock().html(SirTrevor.toHTML(data.text, this.type));
  	}
  }
});