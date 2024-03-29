/* Responsive Tile Gallery Version 2.0 - By Andrew Mead @ www.andrewjmead.com */

!function(a){
  a.fn.rtg=function(c){
    b.options=a.extend(!0,{},b.defaults,c),
    b.el=a(this),
    b.el.find(".rtg-images").css({height:b.options.initialHeight}),
    b.loading.start(),
    a(window).load(function(){b.init()})
  };

  var b={};
  b.switchCount=0,
  b.defaults={
    categories:!0,
    categoryOptions:{
      includeAll:!0,
      defaultCategory:!1,
      enableHashLinking:!1
    },
    lightbox:!0,
    imageWidth:250,
    spacing:10,
    center:!0,
    initialHeight:0
  },
  b.init=function(){
    b.options.lightbox&&(this.el.find(".rtg-images > li").attr("data-group","off"),
    this.el.find(".rtg-images > li").each(function(){
      var b=a(this).attr("data-title");
      b&&0!=b.length||(b="")
    }),
    a(".rtg-images").magnificPopup({
      delegate:"li",
      type:"image",
      tLoading:"Loading image #%curr%...",
      mainClass:"mfp-img-mobile",
      gallery:{
        enabled:!0,
        navigateByImgClick:!0,
        preload:[0,1]
      },
        zoom:{enabled:!0,duration:300},
        image:{
          tError:'<a href="%url%">The image #%curr%</a> could not be loaded.',
          titleSrc:function(a){
            return console.log("***** item.el.parent() *****"),
            console.log(a.el.parent()),a.el.attr("data-title")
          }
        }
      })),
      b.options.categories&&b.categories.init(),
      b.captions.init(),
      b.categories.filterBy(b.categories.currentCategory||"All"),
      b.images.resize(),
      b.images.show(),
      b.utils.addTransition(b.el.find(".rtg-images img"));
      var c,d={width:a(window).width(),height:a(window).height()},
          e=function(){
            var c={
              width:a(window).width(),
              height:a(window).height()
            };
            d.width!==c.width&&(d=c,b.images.sort(),b.images.center())
          };
      a(window).resize(function(){clearTimeout(c),c=setTimeout(e,200)}),
      b.images.sort(),
      b.images.center(),
      -1!=navigator.appVersion.indexOf("MSIE 7.")&&(b.el.find(".rtg-categories > li")
        .css("display","inline").find("a").css({display:"block",padding:"3px 7px"}),
      b.el.find(".rtg-images > li > div > p")
        .css({
          background:"url(images/ieCaptionOpacity.png)",
          filter:"progid:DXImageTransform.Microsoft.gradient(startColorstr=#00FFFFFF, endColorstr=#00FFFFFF)"
        })
      ),
      -1!=navigator.appVersion.indexOf("MSIE 8.")&&b.el.find(".rtg-images > li > div > p")
      .css({background:"url(images/ieCaptionOpacity.png)",filter:"progid:DXImageTransform.Microsoft.gradient(startColorstr=#00FFFFFF, endColorstr=#00FFFFFF)"})},
      b.loading={
        image:a("<img src='/img/graphics/loading.gif'/>"),
        start:function(){
          this.image.css({
            position:"relative",
            top:200,
            left:(b.el.width()-this.image.width())/2
          }),
          b.el.prepend(this.image)
        },
        stop:function(){
          this.image.remove()
        }
      },
      b.lightbox={},
      b.lightbox.setup=function(){},
      b.categories={},
      b.categories.init=function(){
        var c=this.getCategoryArray(),
            d=this.generateMarkup(c);
        if(b.el.prepend(d),b.el.find(".rtg-categories a")
          .on("click",function(c){b.categories.filterBy(a(c.target).attr("category"))}),
          b.options.categoryOptions&&b.options.categoryOptions.defaultCategory?-1!==c.indexOf(b.options.categoryOptions.defaultCategory)&&b.categories.setCurrentCategory(b.options.categoryOptions.defaultCategory):b.categories.setCurrentCategory("All"),
          b.options.categoryOptions.enableHashLinking){
            var e=window.location.hash;
            e&&(e=decodeURIComponent(e).substring(1),-1!==c.indexOf(e)&&b.categories.setCurrentCategory(e))
          }
      },
      b.categories.getCategoryArray=function(){
        var c=b.options.categoryOptions.includeAll?["All"]:[];
        return b.el.find(".rtg-images > li").each(function(){var b=a(this).attr("data-category");
        if(b)
          for(var d=b.split(","),e=d.length,f=0;e>f;f++){
            var g=d[f];-1==a.inArray(g,c)&&c.push(g)
          }
        }),c
      },
      b.categories.generateMarkup=function(a){
        for(var c="",d=0;d<a.length;d++)
          c+="<li>",c+=b.options.categoryOptions.enableHashLinking?"<a href='#"+encodeURIComponent(a[d])+"' category='"+a[d]+"'>"+a[d]+"</a></li>":"<a  category='"+a[d]+"'>"+a[d]+"</a></li>";
        return"<ul class='rtg-categories'>"+c+"</ul>"
      },
      b.categories.filterBy=function(c){
        b.categories.setCurrentCategory(c),
        b.el.find(".rtg-images > li").each(function(){
          var b=a(this),
              d=b.attr("data-category"),
              e=[];
              d&&(e=b.attr("data-category").split(",")),
              "All"===c||-1!==a.inArray(c,e)?(b.css({display:"block"}),b.attr("data-group","on")):(b.css({display:"none",left:"0"}),
                b.attr("data-group","off"))
        }),
        a(".rtg-images").magnificPopup({
          delegate:'li[data-group="on"]',
          type:"image",
          tLoading:"Loading image #%curr%...",
          mainClass:"mfp-img-mobile",
          gallery:{
            enabled:!0,
            navigateByImgClick:!0,
            preload:[0,1]
          },
          zoom:{
            enabled:!0,
            duration:300
          },
          image:{
            tError:'<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc:function(a){
              return console.log("***** item.el.parent() *****"),
              console.log(a.el.parent()),
              a.el.attr("data-title")
            }
          }
        }),
        b.switchCount++,
        b.images.sort(),
        b.images.center()
      },
      b.categories.setCurrentCategory=function(c){
        b.el.find(".rtg-categories > li > a.rtg-current-category").toggleClass("rtg-current-category"),
        b.el.find(".rtg-categories > li > a")
          .each(function(){
            c===a(this).html()&&a(this).toggleClass("rtg-current-category")
          }), this.currentCategory=c
      },
      b.images={},
      b.images.resize=function(){
        var c=b.el.find(".rtg-images img"),
            d=b.options;
        c.each(function(){
          var b=a(this),
              c=b.width(),
              e=b.height(),
              f=d.imageWidth/c;

          b.css({width:d.imageWidth,height:e*f}),
          b.siblings("div").css({width:d.imageWidth,height:e*f})})
      },
      b.images.show=function(){
        b.el.find(".rtg-images img")
          .css("opacity","0")
          .css("visibility","visible")
            .each(function(){
              a(this).animate({opacity:"1"},{duration:100+Math.floor(900*Math.random()),complete:function(){b.loading.stop()}})
            })
      },
      b.images.sort=function(){
        var c=b.el.find(".rtg-images img"),
            d=b.options,
            e=1+Math.floor((b.el.width()-d.imageWidth)/(d.imageWidth+d.spacing));
            e=0===e?1:e;
        var f=[],
            g=0;

        for(g;e>g;g+=1)
          f[g]=0;
        
        var h,i=0,j=0;
          
        c.each(function(){
            "none"!=a(this).parent().css("display") && (j++,h=f.min(),b.utils.transitions ? a(this).add(a(this).siblings("div")).css({top:f[h],left:h*(d.imageWidth+d.spacing)}):a(this).add(a(this).siblings("div")).animate({top:f[h],left:h*(d.imageWidth+d.spacing)},{duration:500,queue:!1}),f[h]=f[h]+a(this).height()+d.spacing,f[h]>i&&(i=f[h]))}),b.options.center&&(e=e>j?j:e),b.el.find(".rtg-images").css({height:i,width:e*(d.imageWidth+d.spacing)-d.spacing},400)},b.images.center=function(){if(b.options.center){var a=b.el.find(".rtg-images"),c=(b.el.width()-a.width())/2;c=0>=c?0:c,a.animate({left:c}),b.el.find(".rtg-categories").animate({"margin-left":c})}},b.captions={},b.captions.init=function(){b.el.find(".rtg-images img").each(function(){var b=a(this),c=b.find("a").first().attr("title"),d=a("<div></div>"),e=a("<p></p>");if(c&&0!==c.length){e.html(c).find("a").each(function(){a(this).attr("rel","")}),d.append(e),b.append(d);var f=a("<p>"+c+"</p>");f.find("a").each(function(){a(this).replaceWith(a(this).html())}),f=f.html(),b.find("a").first().attr("title",f)}}),b.captions.events()},b.captions.events=function(){var c=b.el.find(".rtg-images img");c.hover(function(){a(this).find("div").css("visibility","visible")},function(){a(this).find("div").css("visibility","hidden")})},b.utils={},b.utils.addTransition=function(c){b.utils.transitions&&c.each(function(){a(this).css({"-webkit-transition":"all 0.7s ease","-moz-transition":"all 0.7s ease","-o-transition":"all 0.7s ease",transition:"all 0.7s ease"})})},b.utils.removeTransition=function(c){b.utils.transitions&&c.each(function(){a(this).css({"-webkit-transition":"none 0.7s ease","-moz-transition":"none 0.7s ease","-o-transition":"none 0.7s ease",transition:"none 0.7s ease"})})},b.utils.transitions=function(){function a(){var a,b,c=document.createElement("div"),d=["ms","O","Webkit","Moz"];for(a in d)if(void 0!==c.style[d[a]+"Transition"]){b=d[a];break}return delete c,b}return a()}(),Array.prototype.indexOf||(Array.prototype.indexOf=function(a){var b=this.length>>>0,c=Number(arguments[1])||0;for(c=0>c?Math.ceil(c):Math.floor(c),0>c&&(c+=b);b>c;c++)if(c in this&&this[c]===a)return c;return-1}),Array.prototype.min=function(){var a=0,b=0;for(b;b<this.length;b+=1)this[b]<this[a]&&(a=b);return a}}(jQuery),function(a){var b,c,d,e,f,g,h,i="Close",j="BeforeClose",k="AfterClose",l="BeforeAppend",m="MarkupParse",n="Open",o="Change",p="mfp",q="."+p,r="mfp-ready",s="mfp-removing",t="mfp-prevent-close",u=function(){},v=!!window.jQuery,w=a(window),x=function(a,c){b.ev.on(p+a+q,c)},y=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},z=function(c,d){b.ev.triggerHandler(p+c,d),b.st.callbacks&&(c=c.charAt(0).toLowerCase()+c.slice(1),b.st.callbacks[c]&&b.st.callbacks[c].apply(b,a.isArray(d)?d:[d]))},A=function(){(b.st.focus?b.content.find(b.st.focus).eq(0):b.wrap).trigger("focus")},B=function(c){return c===h&&b.currTemplate.closeBtn||(b.currTemplate.closeBtn=a(b.st.closeMarkup.replace("%title%",b.st.tClose)),h=c),b.currTemplate.closeBtn},C=function(){a.magnificPopup.instance||(b=new u,b.init(),a.magnificPopup.instance=b)},D=function(c){if(!a(c).hasClass(t)){var d=b.st.closeOnContentClick,e=b.st.closeOnBgClick;if(d&&e)return!0;if(!b.content||a(c).hasClass("mfp-close")||b.preloader&&c===b.preloader[0])return!0;if(c===b.content[0]||a.contains(b.content[0],c)){if(d)return!0}else if(e&&a.contains(document,c))return!0;return!1}},E=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(void 0!==a.transition)return!0;for(;b.length;)if(b.pop()+"Transition"in a)return!0;return!1};u.prototype={constructor:u,init:function(){var c=navigator.appVersion;b.isIE7=-1!==c.indexOf("MSIE 7."),b.isIE8=-1!==c.indexOf("MSIE 8."),b.isLowIE=b.isIE7||b.isIE8,b.isAndroid=/android/gi.test(c),b.isIOS=/iphone|ipad|ipod/gi.test(c),b.supportsTransition=E(),b.probablyMobile=b.isAndroid||b.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),d=a(document.body),e=a(document),b.popupsCache={}},open:function(c){var d;if(c.isObj===!1){b.items=c.items.toArray(),b.index=0;var f,h=c.items;for(d=0;d<h.length;d++)if(f=h[d],f.parsed&&(f=f.el[0]),f===c.el[0]){b.index=d;break}}else b.items=a.isArray(c.items)?c.items:[c.items],b.index=c.index||0;if(b.isOpen)return b.updateItemHTML(),void 0;b.types=[],g="",b.ev=c.mainEl&&c.mainEl.length?c.mainEl.eq(0):e,c.key?(b.popupsCache[c.key]||(b.popupsCache[c.key]={}),b.currTemplate=b.popupsCache[c.key]):b.currTemplate={},b.st=a.extend(!0,{},a.magnificPopup.defaults,c),b.fixedContentPos="auto"===b.st.fixedContentPos?!b.probablyMobile:b.st.fixedContentPos,b.st.modal&&(b.st.closeOnContentClick=!1,b.st.closeOnBgClick=!1,b.st.showCloseBtn=!1,b.st.enableEscapeKey=!1),b.bgOverlay||(b.bgOverlay=y("bg").on("click"+q,function(){b.close()}),b.wrap=y("wrap").attr("tabindex",-1).on("click"+q,function(a){D(a.target)&&b.close()}),b.container=y("container",b.wrap)),b.contentContainer=y("content"),b.st.preloader&&(b.preloader=y("preloader",b.container,b.st.tLoading));var i=a.magnificPopup.modules;for(d=0;d<i.length;d++){var j=i[d];j=j.charAt(0).toUpperCase()+j.slice(1),b["init"+j].call(b)}z("BeforeOpen"),b.st.showCloseBtn&&(b.st.closeBtnInside?(x(m,function(a,b,c,d){c.close_replaceWith=B(d.type)}),g+=" mfp-close-btn-in"):b.wrap.append(B())),b.st.alignTop&&(g+=" mfp-align-top"),b.fixedContentPos?b.wrap.css({overflow:b.st.overflowY,overflowX:"hidden",overflowY:b.st.overflowY}):b.wrap.css({top:w.scrollTop(),position:"absolute"}),(b.st.fixedBgPos===!1||"auto"===b.st.fixedBgPos&&!b.fixedContentPos)&&b.bgOverlay.css({height:e.height(),position:"absolute"}),b.st.enableEscapeKey&&e.on("keyup"+q,function(a){27===a.keyCode&&b.close()}),w.on("resize"+q,function(){b.updateSize()}),b.st.closeOnContentClick||(g+=" mfp-auto-cursor"),g&&b.wrap.addClass(g);var k=b.wH=w.height(),l={};if(b.fixedContentPos&&b._hasScrollBar(k)){var o=b._getScrollbarSize();o&&(l.paddingRight=o)}b.fixedContentPos&&(b.isIE7?a("body, html").css("overflow","hidden"):l.overflow="hidden");var p=b.st.mainClass;b.isIE7&&(p+=" mfp-ie7"),p&&b._addClassToMFP(p),b.updateItemHTML(),z("BuildControls"),a("html").css(l),b.bgOverlay.add(b.wrap).prependTo(document.body),b._lastFocusedEl=document.activeElement,setTimeout(function(){b.content?(b._addClassToMFP(r),A()):b.bgOverlay.addClass(r),e.on("focusin"+q,function(c){return c.target===b.wrap[0]||a.contains(b.wrap[0],c.target)?void 0:(A(),!1)})},16),b.isOpen=!0,b.updateSize(k),z(n)},close:function(){b.isOpen&&(z(j),b.isOpen=!1,b.st.removalDelay&&!b.isLowIE&&b.supportsTransition?(b._addClassToMFP(s),setTimeout(function(){b._close()},b.st.removalDelay)):b._close())},_close:function(){z(i);var c=s+" "+r+" ";if(b.bgOverlay.detach(),b.wrap.detach(),b.container.empty(),b.st.mainClass&&(c+=b.st.mainClass+" "),b._removeClassFromMFP(c),b.fixedContentPos){var d={paddingRight:""};b.isIE7?a("body, html").css("overflow",""):d.overflow="",a("html").css(d)}e.off("keyup"+q+" focusin"+q),b.ev.off(q),b.wrap.attr("class","mfp-wrap").removeAttr("style"),b.bgOverlay.attr("class","mfp-bg"),b.container.attr("class","mfp-container"),!b.st.showCloseBtn||b.st.closeBtnInside&&b.currTemplate[b.currItem.type]!==!0||b.currTemplate.closeBtn&&b.currTemplate.closeBtn.detach(),b._lastFocusedEl&&a(b._lastFocusedEl).trigger("focus"),b.currItem=null,b.content=null,b.currTemplate=null,b.prevHeight=0,z(k)},updateSize:function(a){if(b.isIOS){var c=document.documentElement.clientWidth/window.innerWidth,d=window.innerHeight*c;b.wrap.css("height",d),b.wH=d}else b.wH=a||w.height();b.fixedContentPos||b.wrap.css("height",b.wH),z("Resize")},updateItemHTML:function(){var c=b.items[b.index];b.contentContainer.detach(),b.content&&b.content.detach(),c.parsed||(c=b.parseEl(b.index));var d=c.type;if(z("BeforeChange",[b.currItem?b.currItem.type:"",d]),b.currItem=c,!b.currTemplate[d]){var e=b.st[d]?b.st[d].markup:!1;z("FirstMarkupParse",e),b.currTemplate[d]=e?a(e):!0}f&&f!==c.type&&b.container.removeClass("mfp-"+f+"-holder");var g=b["get"+d.charAt(0).toUpperCase()+d.slice(1)](c,b.currTemplate[d]);b.appendContent(g,d),c.preloaded=!0,z(o,c),f=c.type,b.container.prepend(b.contentContainer),z("AfterChange")},appendContent:function(a,c){b.content=a,a?b.st.showCloseBtn&&b.st.closeBtnInside&&b.currTemplate[c]===!0?b.content.find(".mfp-close").length||b.content.append(B()):b.content=a:b.content="",z(l),b.container.addClass("mfp-"+c+"-holder"),b.contentContainer.append(b.content)},parseEl:function(c){var d=b.items[c],e=d.type;if(d=d.tagName?{el:a(d)}:{data:d,src:d.src},d.el){for(var f=b.types,g=0;g<f.length;g++)if(d.el.hasClass("mfp-"+f[g])){e=f[g];break}d.src=d.el.attr("data-mfp-src"),d.src||(d.src=d.el.attr("href"))}return d.type=e||b.st.type||"inline",d.index=c,d.parsed=!0,b.items[c]=d,z("ElementParse",d),b.items[c]},addGroup:function(a,c){var d=function(d){d.mfpEl=this,b._openClick(d,a,c)};c||(c={});var e="click.magnificPopup";c.mainEl=a,c.items?(c.isObj=!0,a.off(e).on(e,d)):(c.isObj=!1,c.delegate?a.off(e).on(e,c.delegate,d):(c.items=a,a.off(e).on(e,d)))},_openClick:function(c,d,e){var f=void 0!==e.midClick?e.midClick:a.magnificPopup.defaults.midClick;if(f||2!==c.which&&!c.ctrlKey&&!c.metaKey){var g=void 0!==e.disableOn?e.disableOn:a.magnificPopup.defaults.disableOn;if(g)if(a.isFunction(g)){if(!g.call(b))return!0}else if(w.width()<g)return!0;c.type&&(c.preventDefault(),b.isOpen&&c.stopPropagation()),e.el=a(c.mfpEl),e.delegate&&(e.items=d.find(e.delegate)),b.open(e)}},updateStatus:function(a,d){if(b.preloader){c!==a&&b.container.removeClass("mfp-s-"+c),d||"loading"!==a||(d=b.st.tLoading);var e={status:a,text:d};z("UpdateStatus",e),a=e.status,d=e.text,b.preloader.html(d),b.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),b.container.addClass("mfp-s-"+a),c=a}},_addClassToMFP:function(a){b.bgOverlay.addClass(a),b.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),b.wrap.removeClass(a)},_hasScrollBar:function(a){return(b.isIE7?e.height():document.body.scrollHeight)>(a||w.height())},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),z(m,[b,c,d]),a.each(c,function(a,c){if(void 0===c||c===!1)return!0;if(e=a.split("_"),e.length>1){var d=b.find(q+"-"+e[0]);if(d.length>0){var f=e[1];"replaceWith"===f?d[0]!==c[0]&&d.replaceWith(c):"img"===f?d.is("img")?d.attr("src",c):d.replaceWith('<img src="'+c+'" class="'+d.attr("class")+'" />'):d.attr(e[1],c)}}else b.find(q+"-"+a).html(c)})},_getScrollbarSize:function(){if(void 0===b.scrollbarSize){var a=document.createElement("div");a.id="mfp-sbm",a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),b.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return b.scrollbarSize}},a.magnificPopup={instance:null,proto:u.prototype,modules:[],open:function(a,b){return C(),a||(a={}),a.isObj=!0,a.index=b||0,this.instance.open(a)},close:function(){return a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&times;</button>',tClose:"Close (Esc)",tLoading:"Loading..."}},a.fn.magnificPopup=function(c){C();var d=a(this);if("string"==typeof c)if("open"===c){var e,f=v?d.data("magnificPopup"):d[0].magnificPopup,g=parseInt(arguments[1],10)||0;f.items?e=f.items[g]:(e=d,f.delegate&&(e=e.find(f.delegate)),e=e.eq(g)),b._openClick({mfpEl:e},d,f)}else b.isOpen&&b[c].apply(b,Array.prototype.slice.call(arguments,1));else v?d.data("magnificPopup",c):d[0].magnificPopup=c,b.addGroup(d,c);return d};var F,G,H,I="inline",J=function(){H&&(G.after(H.addClass(F)).detach(),H=null)};a.magnificPopup.registerModule(I,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){b.types.push(I),x(i+"."+I,function(){J()})},getInline:function(c,d){if(J(),c.src){var e=b.st.inline,f=a(c.src);if(f.length){var g=f[0].parentNode;g&&g.tagName&&(G||(F=e.hiddenClass,G=y(F),F="mfp-"+F),H=f.after(G).detach().removeClass(F)),b.updateStatus("ready")}else b.updateStatus("error",e.tNotFound),f=a("<div>");return c.inlineElement=f,f}return b.updateStatus("ready"),b._parseMarkup(d,{},c),d}}});var K,L="ajax",M=function(){K&&d.removeClass(K)};a.magnificPopup.registerModule(L,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){b.types.push(L),K=b.st.ajax.cursor,x(i+"."+L,function(){M(),b.req&&b.req.abort()})},getAjax:function(c){K&&d.addClass(K),b.updateStatus("loading");var e=a.extend({url:c.src,success:function(d,e,f){var g={data:d,xhr:f};z("ParseAjax",g),b.appendContent(a(g.data),L),c.finished=!0,M(),A(),setTimeout(function(){b.wrap.addClass(r)},16),b.updateStatus("ready"),z("AjaxContentAdded")},error:function(){M(),c.finished=c.loadError=!0,b.updateStatus("error",b.st.ajax.tError.replace("%url%",c.src))}},b.st.ajax.settings);return b.req=a.ajax(e),""}}});var N,O=function(c){if(c.data&&void 0!==c.data.title)return c.data.title;var d=b.st.image.titleSrc;if(d){if(a.isFunction(d))return d.call(b,c);if(c.el)return c.el.attr(d)||""}return""};a.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><div class="mfp-img"></div><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var a=b.st.image,c=".image";b.types.push("image"),x(n+c,function(){"image"===b.currItem.type&&a.cursor&&d.addClass(a.cursor)}),x(i+c,function(){a.cursor&&d.removeClass(a.cursor),w.off("resize"+q)}),x("Resize"+c,b.resizeImage),b.isLowIE&&x("AfterChange",b.resizeImage)},resizeImage:function(){var a=b.currItem;if(a.img&&b.st.image.verticalFit){var c=0;b.isLowIE&&(c=parseInt(a.img.css("padding-top"),10)+parseInt(a.img.css("padding-bottom"),10)),a.img.css("max-height",b.wH-c)}},_onImageHasSize:function(a){a.img&&(a.hasSize=!0,N&&clearInterval(N),a.isCheckingImgSize=!1,z("ImageHasSize",a),a.imgHidden&&(b.content&&b.content.removeClass("mfp-loading"),a.imgHidden=!1))},findImageSize:function(a){var c=0,d=a.img[0],e=function(f){N&&clearInterval(N),N=setInterval(function(){return d.naturalWidth>0?(b._onImageHasSize(a),void 0):(c>200&&clearInterval(N),c++,3===c?e(10):40===c?e(50):100===c&&e(500),void 0)},f)};e(1)},getImage:function(c,d){var e=0,f=function(){c&&(c.img[0].complete?(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("ready")),c.hasSize=!0,c.loaded=!0,z("ImageLoadComplete")):(e++,200>e?setTimeout(f,100):g()))},g=function(){c&&(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("error",h.tError.replace("%url%",c.src))),c.hasSize=!0,c.loaded=!0,c.loadError=!0)},h=b.st.image,i=d.find(".mfp-img");if(i.length){var j=new Image;j.className="mfp-img",c.img=a(j).on("load.mfploader",f).on("error.mfploader",g),j.src=c.src,i.is("img")&&(c.img=c.img.clone()),c.img[0].naturalWidth>0&&(c.hasSize=!0)}return b._parseMarkup(d,{title:O(c),img_replaceWith:c.img},c),b.resizeImage(),c.hasSize?(N&&clearInterval(N),c.loadError?(d.addClass("mfp-loading"),b.updateStatus("error",h.tError.replace("%url%",c.src))):(d.removeClass("mfp-loading"),b.updateStatus("ready")),d):(b.updateStatus("loading"),c.loading=!0,c.hasSize||(c.imgHidden=!0,d.addClass("mfp-loading"),b.findImageSize(c)),d)}}});var P,Q=function(){return void 0===P&&(P=void 0!==document.createElement("p").style.MozTransform),P};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a=b.st.zoom,c=".zoom";if(a.enabled&&b.supportsTransition){var d,e,f=a.duration,g=function(b){var c=b.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+a.duration/1e3+"s "+a.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,c.css(e),c},h=function(){b.content.css("visibility","visible")};x("BuildControls"+c,function(){if(b._allowZoom()){if(clearTimeout(d),b.content.css("visibility","hidden"),image=b._getItemToZoom(),!image)return h(),void 0;e=g(image),e.css(b._getOffset()),b.wrap.append(e),d=setTimeout(function(){e.css(b._getOffset(!0)),d=setTimeout(function(){h(),setTimeout(function(){e.remove(),image=e=null,z("ZoomAnimationEnded")},16)},f)},16)}}),x(j+c,function(){if(b._allowZoom()){if(clearTimeout(d),b.st.removalDelay=f,!image){if(image=b._getItemToZoom(),!image)return;e=g(image)}e.css(b._getOffset(!0)),b.wrap.append(e),b.content.css("visibility","hidden"),setTimeout(function(){e.css(b._getOffset())},16)}}),x(i+c,function(){b._allowZoom()&&(h(),e&&e.remove())})}},_allowZoom:function(){return"image"===b.currItem.type},_getItemToZoom:function(){return b.currItem.hasSize?b.currItem.img:!1},_getOffset:function(c){var d;d=c?b.currItem.img:b.st.zoom.opener(b.currItem.el||b.currItem);var e=d.offset(),f=parseInt(d.css("padding-top"),10),g=parseInt(d.css("padding-bottom"),10);e.top-=a(window).scrollTop()-f;var h={width:d.width(),height:(v?d.innerHeight():d[0].offsetHeight)-g-f};return Q()?h["-moz-transform"]=h.transform="translate("+e.left+"px,"+e.top+"px)":(h.ff=e.left,h.top=e.top),h}}});var R="iframe",S="//about:blank",T=function(a){if(b.currTemplate[R]){var c=b.currTemplate[R].find("iframe");c.length&&(a||(c[0].src=S),b.isIE8&&c.css("display",a?"block":"none"))}};a.magnificPopup.registerModule(R,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){b.types.push(R),x("BeforeChange",function(a,b,c){b!==c&&(b===R?T():c===R&&T(!0))}),x(i+"."+R,function(){T()})},getIframe:function(c,d){var e=c.src,f=b.st.iframe;a.each(f.patterns,function(){return e.indexOf(this.index)>-1?(this.id&&(e="string"==typeof this.id?e.substr(e.lastIndexOf(this.id)+this.id.length,e.length):this.id.call(this,e)),e=this.src.replace("%id%",e),!1):void 0});var g={};return f.srcAction&&(g[f.srcAction]=e),b._parseMarkup(d,g,c),b.updateStatus("ready"),d}}});var U=function(a){var c=b.items.length;return a>c-1?a-c:0>a?c+a:a},V=function(a,b,c){return a.replace("%curr%",b+1).replace("%total%",c)};a.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var c=b.st.gallery,d=".mfp-gallery",f=Boolean(a.fn.mfpFastClick);return b.direction=!0,c&&c.enabled?(g+=" mfp-gallery",x(n+d,function(){c.navigateByImgClick&&b.wrap.on("click"+d,".mfp-img",function(){return b.items.length>1?(b.next(),!1):void 0}),e.on("keydown"+d,function(a){37===a.keyCode?b.prev():39===a.keyCode&&b.next()})}),x("UpdateStatus"+d,function(a,c){c.text&&(c.text=V(c.text,b.currItem.index,b.items.length))}),x(m+d,function(a,d,e,f){var g=b.items.length;e.counter=g>1?V(c.tCounter,f.index,g):""}),x("BuildControls"+d,function(){if(b.items.length>1&&c.arrows&&!b.arrowLeft){var d=c.arrowMarkup,e=b.arrowLeft=a(d.replace("%title%",c.tPrev).replace("%dir%","left")).addClass(t),g=b.arrowRight=a(d.replace("%title%",c.tNext).replace("%dir%","right")).addClass(t),h=f?"mfpFastClick":"click";e[h](function(){b.prev()}),g[h](function(){b.next()}),b.isIE7&&(y("b",e[0],!1,!0),y("a",e[0],!1,!0),y("b",g[0],!1,!0),y("a",g[0],!1,!0)),b.container.append(e.add(g))}}),x(o+d,function(){b._preloadTimeout&&clearTimeout(b._preloadTimeout),b._preloadTimeout=setTimeout(function(){b.preloadNearbyImages(),b._preloadTimeout=null},16)}),x(i+d,function(){e.off(d),b.wrap.off("click"+d),b.arrowLeft&&f&&b.arrowLeft.add(b.arrowRight).destroyMfpFastClick(),b.arrowRight=b.arrowLeft=null}),void 0):!1},next:function(){b.direction=!0,b.index=U(b.index+1),b.updateItemHTML()},prev:function(){b.direction=!1,b.index=U(b.index-1),b.updateItemHTML()},goTo:function(a){b.direction=a>=b.index,b.index=a,b.updateItemHTML()},preloadNearbyImages:function(){var a,c=b.st.gallery.preload,d=Math.min(c[0],b.items.length),e=Math.min(c[1],b.items.length);for(a=1;a<=(b.direction?e:d);a++)b._preloadItem(b.index+a);for(a=1;a<=(b.direction?d:e);a++)b._preloadItem(b.index-a)},_preloadItem:function(c){if(c=U(c),!b.items[c].preloaded){var d=b.items[c];d.parsed||(d=b.parseEl(c)),z("LazyLoad",d),"image"===d.type&&(d.img=a('<img class="mfp-img" />').on("load.mfploader",function(){d.hasSize=!0}).on("error.mfploader",function(){d.hasSize=!0,d.loadError=!0,z("LazyLoadError",d)}).attr("src",d.src)),d.preloaded=!0}}}});var W="retina";a.magnificPopup.registerModule(W,{options:{replaceSrc:function(a){return a.src.replace(/\.\w+$/,function(a){return"@2x"+a})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var a=b.st.retina,c=a.ratio;c=isNaN(c)?c():c,c>1&&(x("ImageHasSize."+W,function(a,b){b.img.css({"max-width":b.img[0].naturalWidth/c,width:"100%"})}),x("ElementParse."+W,function(b,d){d.src=a.replaceSrc(d,c)}))}}}}),function(){var b=1e3,c="ontouchstart"in window,d=function(){w.off("touchmove"+f+" touchend"+f)},e="mfpFastClick",f="."+e;a.fn.mfpFastClick=function(e){return a(this).each(function(){var g,h=a(this);if(c){var i,j,k,l,m,n;h.on("touchstart"+f,function(a){l=!1,n=1,m=a.originalEvent?a.originalEvent.touches[0]:a.touches[0],j=m.clientX,k=m.clientY,w.on("touchmove"+f,function(a){m=a.originalEvent?a.originalEvent.touches:a.touches,n=m.length,m=m[0],(Math.abs(m.clientX-j)>10||Math.abs(m.clientY-k)>10)&&(l=!0,d())}).on("touchend"+f,function(a){d(),l||n>1||(g=!0,a.preventDefault(),clearTimeout(i),i=setTimeout(function(){g=!1},b),e())})})}h.on("click"+f,function(){g||e()})})},a.fn.destroyMfpFastClick=function(){a(this).off("touchstart"+f+" click"+f),c&&w.off("touchmove"+f+" touchend"+f)}}()}(window.jQuery||window.Zepto);
