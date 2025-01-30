(function ($) {
    var counterInProgress = false;
    $.fn.counterNumbers = function (newText) {
        if (counterInProgress) {
            setTimeout(() => this.counterNumbers(newText), 1000);
            return;
        }
        counterInProgress=true;
        let CHAR_NBSP = String.fromCharCode(160);
        this.text(this.text().trim());
        lengthOld = this.text().length;
        oldText = this.text();
        if (lengthOld % 2 !== 0) this.text(oldText + CHAR_NBSP);
        newText = newText.trim();
        if (newText.length % 2 !== 0) newText = newText + CHAR_NBSP;
        this.css("position", "relative");
        lengthOld = this.text().length;
        oldText = this.text();
        lengthNew = newText.length;
        if (lengthNew > lengthOld) {
            let diff = lengthNew - lengthOld;
            for (let i = 0; i < diff; i++) {
                oldText = oldText + CHAR_NBSP;
                if (oldText.length % 2 === 0 && oldText.length === lengthNew) break;
                oldText = CHAR_NBSP + oldText;
                if (oldText.length % 2 === 0 && oldText.length === lengthNew) break;
            }
            this.text(oldText);
        }
        if (lengthNew < lengthOld) {
            let diff = lengthOld - lengthNew;
            for (let i = 0; i < diff; i++) {
                newText = newText + CHAR_NBSP;
                if (newText.length % 2 === 0 && newText.length === lengthOld) break;
                newText = CHAR_NBSP + newText;
                if (newText.length % 2 === 0 && newText.length === lengthOld) break;
            }
        }
        let correctedText = this.text();
        this.text(correctedText.replace(/ /g, CHAR_NBSP));
        let originalNumber = this.text();
        let q = 0;
        let originalOriginalNumber = originalNumber;
        newText = newText.replace(/ /g, CHAR_NBSP);
        if (newText === correctedText) {
            counterInProgress = false;
            return;
        }
        if (typeof $("#example1").data("wrapped") === "undefined") this.wrap("<div class='wrapper' style='position: relative'></div>");
        this.text(correctedText);
        let originalTextLength = originalNumber.length;
        let newHtml = "";
        for (let i = 0; i < originalTextLength; i++) {
            newHtml += `<div id='letter${i}' style='display:inline'>${originalNumber[i]}</div>`;
        }
        this.html(newHtml);
        let height = this.height();
        let width = this.width();
        this.append("<div id='newContainerCntr'></div>");
        $("#newContainerCntr").width(width).height(height);
        this.css({
            overflow: "hidden",
            width: width,
            height: height
        });
        q = 0;
        originalNewText = newText;
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
        let leftpos = leftOffset;
        let toppos = $("#letter0").height();
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
            // if ($(`#letter${i}`).html() !== $(`#newLetter${i}`).html()) {
            if (newText[i] !== correctedText[i]) {
                setTimeout(() => {
                    $(`#letter${i}`).animate({top: -height + "px"}, 1000, "easeInOutSine");
                    $(`#newletter${i}`).animate({top: 0}, 1000, "easeInOutSine");
                }, j * 200);
            }
        }
        setTimeout(() => {
            newText = newText.trim();
            if (newText.length % 2 !== 0) {
                newText = newText + CHAR_NBSP;
            }
            this.text(newText);
            counterInProgress = false;
        }, 2000);
    };
})(jQuery);


(function ($) {
    let counterInProgress = false;
    $.fn.counterNumbersInit = function (newText) {
        let CHAR_NBSP = String.fromCharCode(160);
        lengthOld = this.text().length;
        oldText = this.text();
        if (lengthOld % 2 !== 0) {
            this.text(oldText + CHAR_NBSP);
        }
    };
})(jQuery);


