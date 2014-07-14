/*
  Simple Linked Image Block
*/

SirTrevor.Blocks.ImageLink = SirTrevor.Block.extend({

  type: "image_link",
  title: "Linked Image",

  pastable: true,

  icon_name: 'image',

  loadData: function(data){
    // Create our image tag
    console.log('###',data)
    this.$editor.html($('<img>', { src: data.url }));
  },

  onBlockRender: function(){
    this.$inputs.find('input').on('change', _.bind(function(ev){
      this.onContentPasted(ev);
    }, this));
  },

  onContentPasted: function(ev){
    var input = $(ev.target),
      val = input.val();

    this.$inputs.hide();
    this.$editor.html($('<img>', { src: val })).show();

    this.setAndLoadData({url: val});
    this.ready();
  }

});