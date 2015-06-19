(function(w, d) {
    var $ = d.querySelectorAll;
    var lp = {
        data: [],
        overlay: null,
        css: {
            insert: function (css) {
                var style = d.createElement('style');
                style.type = 'text/css';
                if (style.styleSheet){
                    style.styleSheet.cssText = css;
                } else {
                    style.appendChild(d.createTextNode(css));
                }
                d.querySelector('head').appendChild(style);
            }
        },
        init: function() {
            this.createOverlay().populcateApps();
        },
        createOverlay: function () {
            this.overlay = d.createElement('div');
            this.overlay.id = 'launchpad_overlay';
            this.overlay.style.display = 'none';
            this.overlay.addEventListener('click', this.overlayClick);
            d.body.appendChild(this.overlay);
            return this;
        },
        populcateApps: function() {
            var html = '';
            for (var i = 0; i < this.data.length; i++) {
                if (this.data[i].group) {
                    html += this.drawAppGroup(this.data[i]);
                } else {
                    html += this.drawApp(this.data[i]);
                }
            }
            this.overlay.innerHTML = html;
            return this;
        },
        drawAppGroup: function(group) {
            var h = '<div class="launchpad-app-group"><div class="launchpad-app-group-header">'+group.group+'</div>';
            h+= '<div class="launchpad-app-group-body">';
            for (var i = 0; i < group.apps.length; i++) {
                h += this.drawApp(group.apps[i]);
            }
            h += '</div></div>';
            return h;
        },
        drawApp: function(app) {
            var h = '<div class="launchpad-app-container"><a href="'+app.link+'"><div class="launchpad-app-icon">';
            h+= '<img src="'+app.icon+'" width="100%"/>';
            h += '</div></a></div>';
            return h;
        },
        toggle: function () {
            if (this.overlay.style.display == 'none') {
                this.overlay.style.display = '';
                setTimeout(function(){ launchpad.overlay.style.opacity = 0.7; }, 20);
            } else {
                this.overlay.style.display = 'none';
                this.overlay.style.opacity = 0;
            }
        },
        // toggleClass: function (element, className) {
        //     var classString = element.className, nameIndex = classString.indexOf(className);
        //     if (nameIndex == -1) {
        //         classString += ' ' + className;
        //     } else {
        //         classString = classString.substr(0, nameIndex) + classString.substr(nameIndex+className.length);
        //     }
        //     element.className = classString;
        // },
        overlayClick: function(event) {
            launchpad.toggle();
        },
        setData: function(data) {
            this.data = data;
            return this;
        }
    }
    lp.css.insert('#launchpad_overlay {\
        z-index: 200;\
        background: #000;\
        position: fixed;\
        width: 100%;\
        height: 100%;\
        top: 0px;\
        left: 0px;\
        text-align: left;\
        opacity: 0;\
        transition: opacity .25s linear;\
    }\
    .launchpad-app-container {\
        display: inline-block;\
        width: 130px;\
        height: 130px;\
        margin: 30px;\
    }\
    .launchpad-app-group-header {\
        color: #fff;\
        margin: 10px 0 10px 30px;\
    }\
    .launchpad-app-icon {\
        width: 120px;\
        height: 120px;\
        margin: 5px 0 5px 0;\
        overflow: hidden;\
        margin-left: auto;\
        margin-right: auto;\
        vertical-align: middle;\
    }\
    ');

    w.launchpad = lp;
    w.onload = function(){
        lp.init();
    };
})(window, document);