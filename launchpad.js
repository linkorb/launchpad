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
            return this.createOverlay().populcateApps();
        },
        createOverlay: function () {
            if (document.getElementById('launchpad_overlay')) {
                return this;
            }
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
            this.overlay.innerHTML = '<div class="launchpad-canvas">'+html+'</div>';
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
            if (app.icon.indexOf('http') === 0 || app.icon.indexOf('//') === 0) {
                h+= '<img src="'+app.icon+'" width="100%"/>';
            } else {
                h+=app.icon;
            }
            h += '</div><div class="launchpad-app-label">'+app.label+'</div></a></div>';
            return h;
        },
        toggle: function () {
            if (this.overlay.style.display == 'none') {
                this.overlay.style.display = '';
                setTimeout(function(){ launchpad.overlay.style.opacity = 1; }, 20);
            } else {
                this.overlay.style.display = 'none';
                this.overlay.style.opacity = 0;
            }
            this.toggleClass(d.body, 'launchpad-active');
            return this;
        },
        toggleClass: function (element, className) {
            var classString = element.className, nameIndex = classString.indexOf(className);
            if (nameIndex == -1) {
                classString += ' ' + className;
            } else {
                classString = classString.substr(0, nameIndex) + classString.substr(nameIndex+className.length);
            }
            element.className = classString;
        },
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
        position: fixed;\
        width: 100%;\
        height: 100%;\
        overflow-y: auto;\
        top: 0px;\
        left: 0px;\
        text-align: left;\
        opacity: 0;\
        transition: opacity .25s linear;\
        background-color: rgba(1, 1, 1, 0.7);\
    }\
    .launchpad-active > :not(#launchpad_overlay) {\
        -webkit-filter: blur(5px);\
        -moz-filter: blur(5px);\
        -o-filter: blur(5px);\
        -ms-filter: blur(5px);\
        filter: blur(5px);\
    }\
    .launchpad-canvas {\
        width: 100%;\
        height: auto;\
    }\
    .launchpad-app-container {\
        display: inline-block;\
        width: 130px;\
        height: 150px;\
        margin: 30px;\
    }\
    .launchpad-app-group-header {\
        color: #fff;\
        margin: 10px 0 10px 30px;\
    }\
    .launchpad-app-label {\
        height: 20px;\
        text-align: center;\
    }\
    .launchpad-app-icon {\
        width: 120px;\
        height: 120px;\
        margin: 5px 0 5px 0;\
        overflow: hidden;\
        margin: auto;\
        vertical-align: middle;\
        text-align: center;\
    }\
    .launchpad-app-icon .fa {\
        font-size: 100px;\
    }\
    ');

    w.launchpad = lp;
    w.onload = function(){
        lp.init();
    };
})(window, document);
