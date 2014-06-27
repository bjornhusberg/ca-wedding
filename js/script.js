


$(function() {
	FastClick.attach(document.body);

	$("#container").fadeIn(1000);

	$("#page-menu").find("a").each(function() {
		var item = $(this);
		item.click(function() {
			onPageClicked(item);
			return false;
		});
	});

	$("#lang-menu").find("a").each(function() {
		var item = $(this);
		item.click(function() {
			$("body").fadeOut(1000, function() {
				onLangClicked(item);
				$("body").fadeIn(1000);
			});
			return false;
		});
	});

	$("h1, h2").each(function() {
		$(this).after($("<div class='flags'>" + $(this).text() + "</div>"));
	});
	$(".flags").each(function() {
		flags($(this));
	})
});

function flags(element) {
	var text = element.text().toLowerCase();
	element.text("");
	for (var i = 0; i < text.length; i++) {
		var ch = text.charAt(i);
		if (ch >= 'a' && ch <= 'z') {
			element.append($("<span class='flag flags-" + ch + "'>"));
		} else if (ch == ' ') {
			element.append($("<span class='flag'></span>"));
		}
	}
}

function onLangClicked(langLink) {
	var lang = langLink.attr("id");
	$("#lang-menu a").not("#" + lang).each(function() {
		$(this).removeClass("selected");
		$("." + $(this).attr("id")).hide();
	})
	$("." + lang).show();
	langLink.addClass("selected");
}

function onPageClicked(pageLink) {
	var page = $("#page-" + pageLink.attr("id"));
	$("#page-menu a").not(pageLink).each(function() {
		$(this).removeClass("selected");
	});
	showPage(page.clone(), 500);
	pageLink.addClass("selected");
}

function showPage(page, duration) {
	var pageView = $("#page-view");
	if ($("#fullheight").is(":visible")) {
		$("#container").css("margin-top", $("#container").offset().top + "px").animate({ 'marginTop': '0px'}, duration);
		$("#fullheight").hide();
	}
	pageView.find(".page").each(function() {
		var hidePage = $(this);
		hidePage.css({position: "absolute", "z-index": -1}).fadeOut(duration, function() {
			hidePage.remove();
		}).slideUp(duration);
	});
	pageView.append(page);
	page.hide().fadeIn(duration).slideDown(duration, function() {
		page.css("position", "relative");
	});
}

