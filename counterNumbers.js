	(function ($) {
		let counterInProgress = false;
		$.fn.counterNumbers   = function (newText) {
			this.css("position", "relative");
			if (counterInProgress) {
				setTimeout(() => this.counterNumbers(newText), 1000);
				return;
			}
			counterInProgress = true;
			let CHAR_NBSP          = String.fromCharCode(160);
			let correctedText = this.text();
			this.text(correctedText.replace(/ /g, CHAR_NBSP));
			let originalNumber = this.text();
			while (newText.length > originalNumber.length) originalNumber += CHAR_NBSP;
			newText = newText.replace(/ /g, CHAR_NBSP);
			if (newText === originalNumber) {
				counterInProgress = false;
				return;
			}
			if (typeof $("#example1").data("wrapped") === "undefined") this.wrap("<div class='wrapper' style='position: relative'></div>");
			this.text(originalNumber);
			let originalTextLength = originalNumber.length;
			let newHtml            = "";
			for (let i = 0; i < originalTextLength; i++) {
				newHtml += `<div id='letter${i}' style='display:inline'>${originalNumber[i]}</div>`;
			}
			this.html(newHtml);
			let height = this.height();
			let width  = this.width();
			this.append("<div id='newContainerCntr'></div>");
			$("#newContainerCntr").width(width).height(height);
			this.css({
				overflow: "hidden",
				width: width,
				height: height
			});
			while (newText.length < originalTextLength) newText += CHAR_NBSP;
			let textSpan = $("<span id='tempspan1'>").text(this.text()).css({
				position: "absolute",
				visibility: "hidden",
				whiteSpace: "nowrap",
				fontFamily: this.css("fontFamily"),
				fontSize: this.css("fontSize")
			}).appendTo("body");
			let textWidth = textSpan.width();
			textSpan.remove();
			let leftOffset = (width / 2 - textWidth / 2);
			let leftpos    = leftOffset;
			let toppos     = $("#letter0").height();
			for (let i = 0; i < newText.length; i++) {
				leftpos += i === 0 ? 0 : $(`#letter${i - 1}`).width();
				this.append(`<div id='newletter${i}' style='position:absolute;top:${toppos}px;left:${leftpos}px'>${newText[i]}</div>`);
				$(`#letter${i}`).css({
					position: "absolute",
					left: leftpos
				});
			}
			this.height(height);
			for (let i = 0; i < originalTextLength; i++) {
				let j = i % 4;
				setTimeout(() => {
					$(`#letter${i}`).animate({ top: -height + "px" }, 1000, "easeInOutSine");
					$(`#newletter${i}`).animate({ top: 0 }, 1000, "easeInOutSine");
				}, j * 200);
			}
			setTimeout(() => {
				this.text(newText);
				counterInProgress = false;
			}, 2000);
		};
	})(jQuery);
