"use strict";(self.webpackChunkmy_project=self.webpackChunkmy_project||[]).push([[5175],{2542:(ir,ee,b)=>{b.r(ee),b.d(ee,{default:()=>ur});var f=b(67294),Ee=b(45697),y=b.n(Ee),S=b(71893),Ce=b(7681),re=b(75515),te=b(11047),xe=b(41580),He=b(21817),Me=b(25896),ye=b(54574),Ne=b(64777),we=b(45377),ke=b(63428),je=b(96404),Ie=b(88533),Pe=b(12645),Re=b(49212);function C(){return(C=Object.assign||function(t){for(var l=1;l<arguments.length;l++){var u=arguments[l];for(var c in u)Object.prototype.hasOwnProperty.call(u,c)&&(t[c]=u[c])}return t}).apply(this,arguments)}function O(t,l){if(t==null)return{};var u,c,s={},i=Object.keys(t);for(c=0;c<i.length;c++)l.indexOf(u=i[c])>=0||(s[u]=t[u]);return s}function $(t){var l=(0,f.useRef)(t),u=(0,f.useRef)(function(c){l.current&&l.current(c)});return l.current=t,u.current}var B=function(t,l,u){return l===void 0&&(l=0),u===void 0&&(u=1),t>u?u:t<l?l:t},F=function(t){return"touches"in t},J=function(t){return t&&t.ownerDocument.defaultView||self},oe=function(t,l,u){var c=t.getBoundingClientRect(),s=F(l)?function(i,d){for(var v=0;v<i.length;v++)if(i[v].identifier===d)return i[v];return i[0]}(l.touches,u):l;return{left:B((s.pageX-(c.left+J(t).pageXOffset))/c.width),top:B((s.pageY-(c.top+J(t).pageYOffset))/c.height)}},ne=function(t){!F(t)&&t.preventDefault()},Q=f.memo(function(t){var l=t.onMove,u=t.onKey,c=O(t,["onMove","onKey"]),s=(0,f.useRef)(null),i=$(l),d=$(u),v=(0,f.useRef)(null),m=(0,f.useRef)(!1),h=(0,f.useMemo)(function(){var N=function(x){ne(x),(F(x)?x.touches.length>0:x.buttons>0)&&s.current?i(oe(s.current,x,v.current)):k(!1)},I=function(){return k(!1)};function k(x){var g=m.current,M=J(s.current),K=x?M.addEventListener:M.removeEventListener;K(g?"touchmove":"mousemove",N),K(g?"touchend":"mouseup",I)}return[function(x){var g=x.nativeEvent,M=s.current;if(M&&(ne(g),!function(cr,sr){return sr&&!F(cr)}(g,m.current)&&M)){if(F(g)){m.current=!0;var K=g.changedTouches||[];K.length&&(v.current=K[0].identifier)}M.focus(),i(oe(M,g,v.current)),k(!0)}},function(x){var g=x.which||x.keyCode;g<37||g>40||(x.preventDefault(),d({left:g===39?.05:g===37?-.05:0,top:g===40?.05:g===38?-.05:0}))},k]},[d,i]),p=h[0],H=h[1],w=h[2];return(0,f.useEffect)(function(){return w},[w]),f.createElement("div",C({},c,{onTouchStart:p,onMouseDown:p,className:"react-colorful__interactive",ref:s,onKeyDown:H,tabIndex:0,role:"slider"}))}),L=function(t){return t.filter(Boolean).join(" ")},U=function(t){var l=t.color,u=t.left,c=t.top,s=c===void 0?.5:c,i=L(["react-colorful__pointer",t.className]);return f.createElement("div",{className:i,style:{top:100*s+"%",left:100*u+"%"}},f.createElement("div",{className:"react-colorful__pointer-fill",style:{backgroundColor:l}}))},E=function(t,l,u){return l===void 0&&(l=0),u===void 0&&(u=Math.pow(10,l)),Math.round(u*t)/u},Be={grad:.9,turn:360,rad:360/(2*Math.PI)},ae=function(t){return q(V(t))},V=function(t){return t[0]==="#"&&(t=t.substring(1)),t.length<6?{r:parseInt(t[0]+t[0],16),g:parseInt(t[1]+t[1],16),b:parseInt(t[2]+t[2],16),a:t.length===4?E(parseInt(t[3]+t[3],16)/255,2):1}:{r:parseInt(t.substring(0,2),16),g:parseInt(t.substring(2,4),16),b:parseInt(t.substring(4,6),16),a:t.length===8?E(parseInt(t.substring(6,8),16)/255,2):1}},le=function(t,l){return l===void 0&&(l="deg"),Number(t)*(Be[l]||1)},ue=function(t){var l=/hsla?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(t);return l?G({h:le(l[1],l[2]),s:Number(l[3]),l:Number(l[4]),a:l[5]===void 0?1:Number(l[5])/(l[6]?100:1)}):{h:0,s:0,v:0,a:1}},Te=ue,G=function(t){var l=t.s,u=t.l;return{h:t.h,s:(l*=(u<50?u:100-u)/100)>0?2*l/(u+l)*100:0,v:u+l,a:t.a}},ce=function(t){return Fe(D(t))},A=function(t){var l=t.s,u=t.v,c=t.a,s=(200-l)*u/100;return{h:E(t.h),s:E(s>0&&s<200?l*u/100/(s<=100?s:200-s)*100:0),l:E(s/2),a:E(c,2)}},Z=function(t){var l=A(t);return"hsl("+l.h+", "+l.s+"%, "+l.l+"%)"},X=function(t){var l=A(t);return"hsla("+l.h+", "+l.s+"%, "+l.l+"%, "+l.a+")"},D=function(t){var l=t.h,u=t.s,c=t.v,s=t.a;l=l/360*6,u/=100,c/=100;var i=Math.floor(l),d=c*(1-u),v=c*(1-(l-i)*u),m=c*(1-(1-l+i)*u),h=i%6;return{r:E(255*[c,v,d,d,m,c][h]),g:E(255*[m,c,c,v,d,d][h]),b:E(255*[d,d,m,c,c,v][h]),a:E(s,2)}},se=function(t){var l=/hsva?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(t);return l?z({h:le(l[1],l[2]),s:Number(l[3]),v:Number(l[4]),a:l[5]===void 0?1:Number(l[5])/(l[6]?100:1)}):{h:0,s:0,v:0,a:1}},Oe=se,ie=function(t){var l=/rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(t);return l?q({r:Number(l[1])/(l[2]?100/255:1),g:Number(l[3])/(l[4]?100/255:1),b:Number(l[5])/(l[6]?100/255:1),a:l[7]===void 0?1:Number(l[7])/(l[8]?100:1)}):{h:0,s:0,v:0,a:1}},$e=ie,Y=function(t){var l=t.toString(16);return l.length<2?"0"+l:l},Fe=function(t){var l=t.r,u=t.g,c=t.b,s=t.a,i=s<1?Y(E(255*s)):"";return"#"+Y(l)+Y(u)+Y(c)+i},q=function(t){var l=t.r,u=t.g,c=t.b,s=t.a,i=Math.max(l,u,c),d=i-Math.min(l,u,c),v=d?i===l?(u-c)/d:i===u?2+(c-l)/d:4+(l-u)/d:0;return{h:E(60*(v<0?v+6:v)),s:E(i?d/i*100:0),v:E(i/255*100),a:s}},z=function(t){return{h:E(t.h),s:E(t.s),v:E(t.v),a:E(t.a,2)}},fe=f.memo(function(t){var l=t.hue,u=t.onChange,c=L(["react-colorful__hue",t.className]);return f.createElement("div",{className:c},f.createElement(Q,{onMove:function(s){u({h:360*s.left})},onKey:function(s){u({h:B(l+360*s.left,0,360)})},"aria-label":"Hue","aria-valuenow":E(l),"aria-valuemax":"360","aria-valuemin":"0"},f.createElement(U,{className:"react-colorful__hue-pointer",left:l/360,color:Z({h:l,s:100,v:100,a:1})})))}),de=f.memo(function(t){var l=t.hsva,u=t.onChange,c={backgroundColor:Z({h:l.h,s:100,v:100,a:1})};return f.createElement("div",{className:"react-colorful__saturation",style:c},f.createElement(Q,{onMove:function(s){u({s:100*s.left,v:100-100*s.top})},onKey:function(s){u({s:B(l.s+100*s.left,0,100),v:B(l.v-100*s.top,0,100)})},"aria-label":"Color","aria-valuetext":"Saturation "+E(l.s)+"%, Brightness "+E(l.v)+"%"},f.createElement(U,{className:"react-colorful__saturation-pointer",top:1-l.v/100,left:l.s/100,color:Z(l)})))}),j=function(t,l){if(t===l)return!0;for(var u in t)if(t[u]!==l[u])return!1;return!0},T=function(t,l){return t.replace(/\s/g,"")===l.replace(/\s/g,"")},ve=function(t,l){return t.toLowerCase()===l.toLowerCase()||j(V(t),V(l))};function he(t,l,u){var c=$(u),s=(0,f.useState)(function(){return t.toHsva(l)}),i=s[0],d=s[1],v=(0,f.useRef)({color:l,hsva:i});(0,f.useEffect)(function(){if(!t.equal(l,v.current.color)){var h=t.toHsva(l);v.current={hsva:h,color:l},d(h)}},[l,t]),(0,f.useEffect)(function(){var h;j(i,v.current.hsva)||t.equal(h=t.fromHsva(i),v.current.color)||(v.current={hsva:i,color:h},c(h))},[i,t,c]);var m=(0,f.useCallback)(function(h){d(function(p){return Object.assign({},p,h)})},[]);return[i,m]}var ge,Le=typeof window<"u"?f.useLayoutEffect:f.useEffect,De=function(){return ge||b.nc},fr=function(t){ge=t},me=new Map,pe=function(t){Le(function(){var l=t.current?t.current.ownerDocument:document;if(l!==void 0&&!me.has(l)){var u=l.createElement("style");u.innerHTML=`.react-colorful{position:relative;display:flex;flex-direction:column;width:200px;height:200px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.react-colorful__saturation{position:relative;flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(0deg,#000,transparent),linear-gradient(90deg,#fff,hsla(0,0%,100%,0))}.react-colorful__alpha-gradient,.react-colorful__pointer-fill{content:"";position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none;border-radius:inherit}.react-colorful__alpha-gradient,.react-colorful__saturation{box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}.react-colorful__alpha,.react-colorful__hue{position:relative;height:24px}.react-colorful__hue{background:linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.react-colorful__last-control{border-radius:0 0 8px 8px}.react-colorful__interactive{position:absolute;left:0;top:0;right:0;bottom:0;border-radius:inherit;outline:none;touch-action:none}.react-colorful__pointer{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}.react-colorful__interactive:focus .react-colorful__pointer{transform:translate(-50%,-50%) scale(1.1)}.react-colorful__alpha,.react-colorful__alpha-pointer{background-color:#fff;background-image:url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>')}.react-colorful__saturation-pointer{z-index:3}.react-colorful__hue-pointer{z-index:2}`,me.set(l,u);var c=De();c&&u.setAttribute("nonce",c),l.head.appendChild(u)}},[])},P=function(t){var l=t.className,u=t.colorModel,c=t.color,s=c===void 0?u.defaultColor:c,i=t.onChange,d=O(t,["className","colorModel","color","onChange"]),v=(0,f.useRef)(null);pe(v);var m=he(u,s,i),h=m[0],p=m[1],H=L(["react-colorful",l]);return f.createElement("div",C({},d,{ref:v,className:H}),f.createElement(de,{hsva:h,onChange:p}),f.createElement(fe,{hue:h.h,onChange:p,className:"react-colorful__last-control"}))},ze={defaultColor:"000",toHsva:ae,fromHsva:function(t){return ce({h:t.h,s:t.s,v:t.v,a:1})},equal:ve},Ke=function(t){return f.createElement(P,C({},t,{colorModel:ze}))},Se=function(t){var l=t.className,u=t.hsva,c=t.onChange,s={backgroundImage:"linear-gradient(90deg, "+X(Object.assign({},u,{a:0}))+", "+X(Object.assign({},u,{a:1}))+")"},i=L(["react-colorful__alpha",l]),d=E(100*u.a);return e.createElement("div",{className:i},e.createElement("div",{className:"react-colorful__alpha-gradient",style:s}),e.createElement(Q,{onMove:function(v){c({a:v.left})},onKey:function(v){c({a:B(u.a+v.left)})},"aria-label":"Alpha","aria-valuetext":d+"%","aria-valuenow":d,"aria-valuemin":"0","aria-valuemax":"100"},e.createElement(U,{className:"react-colorful__alpha-pointer",left:u.a,color:X(u)})))},R=function(t){var l=t.className,u=t.colorModel,c=t.color,s=c===void 0?u.defaultColor:c,i=t.onChange,d=O(t,["className","colorModel","color","onChange"]),v=r(null);pe(v);var m=he(u,s,i),h=m[0],p=m[1],H=L(["react-colorful",l]);return e.createElement("div",C({},d,{ref:v,className:H}),e.createElement(de,{hsva:h,onChange:p}),e.createElement(fe,{hue:h.h,onChange:p}),e.createElement(Se,{hsva:h,onChange:p,className:"react-colorful__last-control"}))},Ae={defaultColor:"0001",toHsva:ae,fromHsva:ce,equal:ve},dr=function(t){return e.createElement(R,C({},t,{colorModel:Ae}))},Ze={defaultColor:{h:0,s:0,l:0,a:1},toHsva:G,fromHsva:A,equal:j},vr=function(t){return e.createElement(R,C({},t,{colorModel:Ze}))},Xe={defaultColor:"hsla(0, 0%, 0%, 1)",toHsva:ue,fromHsva:X,equal:T},hr=function(t){return e.createElement(R,C({},t,{colorModel:Xe}))},Ye={defaultColor:{h:0,s:0,l:0},toHsva:function(t){return G({h:t.h,s:t.s,l:t.l,a:1})},fromHsva:function(t){return{h:(l=A(t)).h,s:l.s,l:l.l};var l},equal:j},gr=function(t){return e.createElement(P,C({},t,{colorModel:Ye}))},qe={defaultColor:"hsl(0, 0%, 0%)",toHsva:Te,fromHsva:Z,equal:T},mr=function(t){return e.createElement(P,C({},t,{colorModel:qe}))},Je={defaultColor:{h:0,s:0,v:0,a:1},toHsva:function(t){return t},fromHsva:z,equal:j},pr=function(t){return e.createElement(R,C({},t,{colorModel:Je}))},Qe={defaultColor:"hsva(0, 0%, 0%, 1)",toHsva:se,fromHsva:function(t){var l=z(t);return"hsva("+l.h+", "+l.s+"%, "+l.v+"%, "+l.a+")"},equal:T},br=function(t){return e.createElement(R,C({},t,{colorModel:Qe}))},Ue={defaultColor:{h:0,s:0,v:0},toHsva:function(t){return{h:t.h,s:t.s,v:t.v,a:1}},fromHsva:function(t){var l=z(t);return{h:l.h,s:l.s,v:l.v}},equal:j},Er=function(t){return e.createElement(P,C({},t,{colorModel:Ue}))},Ve={defaultColor:"hsv(0, 0%, 0%)",toHsva:Oe,fromHsva:function(t){var l=z(t);return"hsv("+l.h+", "+l.s+"%, "+l.v+"%)"},equal:T},Cr=function(t){return e.createElement(P,C({},t,{colorModel:Ve}))},Ge={defaultColor:{r:0,g:0,b:0,a:1},toHsva:q,fromHsva:D,equal:j},xr=function(t){return e.createElement(R,C({},t,{colorModel:Ge}))},We={defaultColor:"rgba(0, 0, 0, 1)",toHsva:ie,fromHsva:function(t){var l=D(t);return"rgba("+l.r+", "+l.g+", "+l.b+", "+l.a+")"},equal:T},Hr=function(t){return e.createElement(R,C({},t,{colorModel:We}))},_e={defaultColor:{r:0,g:0,b:0},toHsva:function(t){return q({r:t.r,g:t.g,b:t.b,a:1})},fromHsva:function(t){return{r:(l=D(t)).r,g:l.g,b:l.b};var l},equal:j},Mr=function(t){return e.createElement(P,C({},t,{colorModel:_e}))},er={defaultColor:"rgb(0, 0, 0)",toHsva:$e,fromHsva:function(t){var l=D(t);return"rgb("+l.r+", "+l.g+", "+l.b+")"},equal:T},yr=function(t){return e.createElement(P,C({},t,{colorModel:er}))},rr=/^#?([0-9A-F]{3,8})$/i,tr=function(t){var l=t.color,u=l===void 0?"":l,c=t.onChange,s=t.onBlur,i=t.escape,d=t.validate,v=t.format,m=t.process,h=O(t,["color","onChange","onBlur","escape","validate","format","process"]),p=o(function(){return i(u)}),H=p[0],w=p[1],N=$(c),I=$(s),k=a(function(g){var M=i(g.target.value);w(M),d(M)&&N(m?m(M):M)},[i,m,d,N]),x=a(function(g){d(g.target.value)||w(i(u)),I(g)},[u,i,d,I]);return n(function(){w(i(u))},[u,i]),e.createElement("input",C({},h,{value:v?v(H):H,spellCheck:"false",onChange:k,onBlur:x}))},be=function(t){return"#"+t},Nr=function(t){var l=t.prefixed,u=t.alpha,c=O(t,["prefixed","alpha"]),s=a(function(d){return d.replace(/([^0-9A-F]+)/gi,"").substring(0,u?8:6)},[u]),i=a(function(d){return function(v,m){var h=rr.exec(v),p=h?h[1].length:0;return p===3||p===6||!!m&&p===4||!!m&&p===8}(d,u)},[u]);return e.createElement(tr,C({},c,{escape:s,format:l?be:void 0,process:be,validate:i}))},W=b(31606);const or=S.default.div`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  background-color: ${t=>t.color};
  border: 1px solid rgba(0, 0, 0, 0.1);
`,nr=(0,S.default)(Ke)`
  && {
    width: 100%;
    aspect-ratio: 1.5;
  }

  .react-colorful__pointer {
    width: ${({theme:t})=>t.spaces[3]};
    height: ${({theme:t})=>t.spaces[3]};
  }

  .react-colorful__saturation {
    border-radius: ${({theme:t})=>t.spaces[1]};
    border-bottom: none;
  }

  .react-colorful__hue {
    border-radius: 10px;
    height: ${({theme:t})=>t.spaces[3]};
    margin-top: ${({theme:t})=>t.spaces[2]};
  }
`,ar=(0,S.default)(He.Y)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    width: ${({theme:t})=>t.spaces[2]};
    height: ${({theme:t})=>t.spaces[2]};
  }

  svg > path {
    fill: ${({theme:t})=>t.colors.neutral500};
    justify-self: flex-end;
  }
`,lr=(0,S.default)(Ie.J2)`
  padding: ${({theme:t})=>t.spaces[2]};
  min-height: 270px;
`,_=({attribute:t,description:l,disabled:u,error:c,intlLabel:s,labelAction:i,name:d,onChange:v,required:m,value:h})=>{const[p,H]=(0,f.useState)(!1),w=(0,f.useRef)(),{formatMessage:N}=(0,Re.useIntl)(),I=h||"#000000",k={textTransform:"uppercase"},x=g=>{g.preventDefault(),g.currentTarget.contains(g.relatedTarget)||H(!1)};return f.createElement(ye.g,{name:d,id:d,error:c,hint:l&&N(l),required:m},f.createElement(Ce.K,{spacing:1},f.createElement(Ne.Q,{action:i},N(s)),f.createElement(ar,{ref:w,"aria-label":N({id:(0,W.Z)("color-picker.toggle.aria-label"),defaultMessage:"Color picker toggle"}),"aria-controls":"color-picker-value","aria-haspopup":"dialog","aria-expanded":p,"aria-disabled":u,disabled:u,onClick:()=>H(!p)},f.createElement(te.k,null,f.createElement(or,{color:I}),f.createElement(re.Z,{style:k,textColor:h?null:"neutral600",variant:"omega"},I)),f.createElement(Pe.default,{"aria-hidden":!0})),p&&f.createElement(lr,{onBlur:x,role:"dialog",source:w,spacing:4},f.createElement(Me.i,{onEscape:()=>H(!1)},f.createElement(nr,{color:I,onChange:g=>v({target:{name:d,value:g,type:t.type}})}),f.createElement(te.k,{paddingTop:3,paddingLeft:4,justifyContent:"flex-end"},f.createElement(xe.x,{paddingRight:2},f.createElement(re.Z,{variant:"omega",as:"label",textColor:"neutral600"},N({id:(0,W.Z)("color-picker.input.format"),defaultMessage:"HEX"}))),f.createElement(we._,{id:"color-picker-value","aria-label":N({id:(0,W.Z)("color-picker.input.aria-label"),defaultMessage:"Color picker input"}),style:k,value:h,placeholder:"#000000",onChange:v})))),f.createElement(ke.J,null),f.createElement(je.c,null)))};_.defaultProps={description:null,disabled:!1,error:null,labelAction:null,required:!1,value:""},_.propTypes={intlLabel:y().object.isRequired,onChange:y().func.isRequired,attribute:y().object.isRequired,name:y().string.isRequired,description:y().object,disabled:y().bool,error:y().string,labelAction:y().object,required:y().bool,value:y().string};const ur=_}}]);
