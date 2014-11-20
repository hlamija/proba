Backbone.View = Backbone.View.extend({
		remove: function() {
			$(this.el).empty().detach();
			return this;
		}
	});