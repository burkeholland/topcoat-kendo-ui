(function (global) {  
   
    var viewModels = {
        layout: kendo.observable({
            switch: function(e) {
                var el = e.sender.element;
                var href = el.data("href");
                var title = el.data("title");
				
            	router.navigate(href || "/");
          		
                this.set("title", title);
        	},
            title: null 
        })
    }
    
    var layout = new kendo.Layout("#layout", { 
        model: viewModels.layout,
        init: function() {
            viewModels.layout.set("title", "Home");
        }
    });
    
    var router = new kendo.Router({
        init: function() {
            layout.render(document.body);
        }
    });
    
    router.route("/", function() {
       layout.showIn("#content", views.home); 
    });
    
    router.route("/popular", function() {
       layout.showIn("#content", views.popular);
    });
    
    router.route("/products", function() {
        layout.showIn("#content", views.products);
    });
    
    var instagram = new kendo.data.DataSource({
        transport: {
            read: {
                url: "http://www.reddit.com/r/javascript.json?jsonp=?",
                dataType: "jsonp"
            }
        },
        schema: {
			data: "data.children"
		},
        change: function(e) {
            var post = kendo.template($("#post").html());
            $.each(this.view(), function() {
                $("#reddit").append(post(this));
            })
        }
    });
    
    var views = {
        home: new kendo.View("#home"),
        popular: new kendo.View("#popular", { 
            init: function() {
                instagram.read();
        	}
        }),
        products: new kendo.View("#products")
    }
    
    document.addEventListener('deviceready', function () {
		if (parseFloat(window.device.version) === 7.0) {
			document.body.style.marginTop = "20px";
    	}
        
        navigator.splashscreen.hide();
        
        router.start();
        
    }, false);

})(window);