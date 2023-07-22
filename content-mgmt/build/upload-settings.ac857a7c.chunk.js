"use strict";(self.webpackChunkmy_project=self.webpackChunkmy_project||[]).push([[695],{85078:(U,E,t)=>{t.r(E),t.d(E,{SettingsPage:()=>W,default:()=>F});var e=t(67294),g=t(15482),a=t(49212),s=t(68547),l=t(85018),v=t(41580),b=t(11047),f=t(20707),P=t(75515),S=t(29728),D=t(185),R=t(7681),h=t(11276),n=t(74571),d=t(67838),r=t(49066),o=t(17034),u=t(11817),x=t(18446),M=t.n(x),m=t(57197);const k=i=>i;var J=t(18172),N=t(36968),c=t.n(N);const B={isLoading:!0,isSubmiting:!1,initialData:{responsiveDimensions:!0,sizeOptimization:!0,autoOrientation:!1,videoPreview:!1},modifiedData:{responsiveDimensions:!0,sizeOptimization:!0,autoOrientation:!1,videoPreview:!1}},$=(i,C)=>(0,J.default)(i,p=>{switch(C.type){case"CANCEL_CHANGES":{p.modifiedData=i.initialData;break}case"GET_DATA_SUCCEEDED":{p.isLoading=!1,p.initialData=C.data,p.modifiedData=C.data;break}case"ON_CHANGE":{c()(p,["modifiedData",...C.keys.split(".")],C.value);break}case"ON_SUBMIT":{p.isSubmiting=!0;break}case"SUBMIT_SUCCEEDED":{p.initialData=i.modifiedData,p.isSubmiting=!1;break}case"ON_SUBMIT_ERROR":{p.isSubmiting=!1;break}default:return i}});var y=t(16838),O=t(25108);const W=()=>{const{formatMessage:i}=(0,a.useIntl)(),{lockApp:C,unlockApp:p}=(0,s.useOverlayBlocker)(),H=(0,s.useNotification)(),{get:j,put:G}=(0,s.useFetchClient)();(0,s.useFocusWhenNavigate)();const[{initialData:V,isLoading:Q,isSubmiting:X,modifiedData:z},I]=(0,e.useReducer)($,B,k),q=(0,e.useRef)(!0);(0,e.useEffect)(()=>{const K=u.Z.CancelToken.source(),te=async()=>{try{const{data:{data:w}}=await j((0,m.IF)("settings"),{cancelToken:K.token});I({type:"GET_DATA_SUCCEEDED",data:w})}catch(w){O.error(w)}};return q.current&&te(),()=>{K.cancel("Operation canceled by the user."),q.current=!1}},[]);const _=M()(V,z),ee=async L=>{if(L.preventDefault(),!_){C(),I({type:"ON_SUBMIT"});try{await G((0,m.IF)("settings"),z),I({type:"SUBMIT_SUCCEEDED"}),H({type:"success",message:{id:"notification.form.success.fields"}})}catch(K){O.error(K),I({type:"ON_SUBMIT_ERROR"})}p()}},Y=({target:{name:L,value:K}})=>{I({type:"ON_CHANGE",keys:L,value:K})};return e.createElement(D.o,{tabIndex:-1},e.createElement(g.Helmet,{title:i({id:(0,m.OB)("page.title"),defaultMessage:"Settings - Media Libray"})}),e.createElement("form",{onSubmit:ee},e.createElement(d.T,{title:i({id:(0,m.OB)("settings.header.label"),defaultMessage:"Media Library"}),primaryAction:e.createElement(S.z,{disabled:_,"data-testid":"save-button",loading:X,type:"submit",startIcon:e.createElement(l.Z,null),size:"S"},i({id:"global.save",defaultMessage:"Save"})),subtitle:i({id:(0,m.OB)("settings.sub-header.label"),defaultMessage:"Configure the settings for the Media Library"})}),e.createElement(r.D,null,Q?e.createElement(s.LoadingIndicatorPage,null):e.createElement(o.A,null,e.createElement(R.K,{spacing:12},e.createElement(v.x,{background:"neutral0",padding:6,shadow:"filterShadow",hasRadius:!0},e.createElement(R.K,{spacing:4},e.createElement(b.k,null,e.createElement(P.Z,{variant:"delta",as:"h2"},i({id:(0,m.OB)("settings.blockTitle"),defaultMessage:"Asset management"}))),e.createElement(h.r,{gap:6},e.createElement(n.P,{col:6,s:12},e.createElement(f.s,{"aria-label":"responsiveDimensions","data-testid":"responsiveDimensions",checked:z.responsiveDimensions,hint:i({id:(0,m.OB)("settings.form.responsiveDimensions.description"),defaultMessage:"Enabling this option will generate multiple formats (small, medium and large) of the uploaded asset."}),label:i({id:(0,m.OB)("settings.form.responsiveDimensions.label"),defaultMessage:"Responsive friendly upload"}),name:"responsiveDimensions",offLabel:i({id:"app.components.ToggleCheckbox.off-label",defaultMessage:"Off"}),onLabel:i({id:"app.components.ToggleCheckbox.on-label",defaultMessage:"On"}),onChange:L=>{Y({target:{name:"responsiveDimensions",value:L.target.checked}})}})),e.createElement(n.P,{col:6,s:12},e.createElement(f.s,{"aria-label":"sizeOptimization","data-testid":"sizeOptimization",checked:z.sizeOptimization,hint:i({id:(0,m.OB)("settings.form.sizeOptimization.description"),defaultMessage:"Enabling this option will reduce the image size and slightly reduce its quality."}),label:i({id:(0,m.OB)("settings.form.sizeOptimization.label"),defaultMessage:"Size optimization"}),name:"sizeOptimization",offLabel:i({id:"app.components.ToggleCheckbox.off-label",defaultMessage:"Off"}),onLabel:i({id:"app.components.ToggleCheckbox.on-label",defaultMessage:"On"}),onChange:L=>{Y({target:{name:"sizeOptimization",value:L.target.checked}})}})),e.createElement(n.P,{col:6,s:12},e.createElement(f.s,{"aria-label":"autoOrientation","data-testid":"autoOrientation",checked:z.autoOrientation,hint:i({id:(0,m.OB)("settings.form.autoOrientation.description"),defaultMessage:"Enabling this option will automatically rotate the image according to EXIF orientation tag."}),label:i({id:(0,m.OB)("settings.form.autoOrientation.label"),defaultMessage:"Auto orientation"}),name:"autoOrientation",offLabel:i({id:"app.components.ToggleCheckbox.off-label",defaultMessage:"Off"}),onLabel:i({id:"app.components.ToggleCheckbox.on-label",defaultMessage:"On"}),onChange:L=>{Y({target:{name:"autoOrientation",value:L.target.checked}})}}))))))))))},F=()=>e.createElement(s.CheckPagePermissions,{permissions:y.Z.settings},e.createElement(W,null))},49066:(U,E,t)=>{t.d(E,{D:()=>s});var e=t(67294),g=t(45697),a=t(41580);const s=({children:l})=>e.createElement(a.x,{paddingLeft:10,paddingRight:10},l);s.propTypes={children:g.node.isRequired}},67838:(U,E,t)=>{t.d(E,{A:()=>h,T:()=>D});var e=t(67294),g=t(71893),a=t(45697),s=t(75515),l=t(41580),v=t(11047);const b=n=>{const d=(0,e.useRef)(null),[r,o]=(0,e.useState)(!0),u=([x])=>{o(x.isIntersecting)};return(0,e.useEffect)(()=>{const x=d.current,M=new IntersectionObserver(u,n);return x&&M.observe(d.current),()=>{x&&M.disconnect()}},[d,n]),[d,r]};var f=t(98402);const P=(n,d)=>{const r=(0,f.useCallbackRef)(d);(0,e.useLayoutEffect)(()=>{const o=new ResizeObserver(r);return Array.isArray(n)?n.forEach(u=>{u.current&&o.observe(u.current)}):n.current&&o.observe(n.current),()=>{o.disconnect()}},[n,r])},S=()=>{const n=(0,e.useRef)(null),[d,r]=(0,e.useState)(null),[o,u]=b({root:null,rootMargin:"0px",threshold:0});return P(o,()=>{o.current&&r(o.current.getBoundingClientRect())}),(0,e.useEffect)(()=>{n.current&&r(n.current.getBoundingClientRect())},[n]),{containerRef:o,isVisible:u,baseHeaderLayoutRef:n,headerSize:d}},D=n=>{const{containerRef:d,isVisible:r,baseHeaderLayoutRef:o,headerSize:u}=S();return e.createElement(e.Fragment,null,e.createElement("div",{style:{height:u?.height},ref:d},r&&e.createElement(h,{ref:o,...n})),!r&&e.createElement(h,{...n,sticky:!0,width:u?.width}))};D.displayName="HeaderLayout";const R=(0,g.default)(l.x)`
  width: ${n=>n.width}px;
`,h=e.forwardRef(({navigationAction:n,primaryAction:d,secondaryAction:r,subtitle:o,title:u,sticky:x,width:M,...m},T)=>{const k=typeof o=="string";return x?e.createElement(R,{paddingLeft:6,paddingRight:6,paddingTop:3,paddingBottom:3,position:"fixed",top:0,right:0,background:"neutral0",shadow:"tableShadow",width:M,zIndex:4,"data-strapi-header-sticky":!0},e.createElement(v.k,{justifyContent:"space-between"},e.createElement(v.k,null,n&&e.createElement(l.x,{paddingRight:3},n),e.createElement(l.x,null,e.createElement(s.Z,{variant:"beta",as:"h1",...m},u),k?e.createElement(s.Z,{variant:"pi",textColor:"neutral600"},o):o),r?e.createElement(l.x,{paddingLeft:4},r):null),e.createElement(v.k,null,d?e.createElement(l.x,{paddingLeft:2},d):void 0))):e.createElement(l.x,{ref:T,paddingLeft:10,paddingRight:10,paddingBottom:8,paddingTop:n?6:8,background:"neutral100","data-strapi-header":!0},n?e.createElement(l.x,{paddingBottom:2},n):null,e.createElement(v.k,{justifyContent:"space-between"},e.createElement(v.k,null,e.createElement(s.Z,{as:"h1",variant:"alpha",...m},u),r?e.createElement(l.x,{paddingLeft:4},r):null),d),k?e.createElement(s.Z,{variant:"epsilon",textColor:"neutral600",as:"p"},o):o)});h.displayName="BaseHeaderLayout",h.defaultProps={navigationAction:void 0,primaryAction:void 0,secondaryAction:void 0,subtitle:void 0,sticky:!1,width:void 0},h.propTypes={navigationAction:a.node,primaryAction:a.node,secondaryAction:a.node,sticky:a.bool,subtitle:a.oneOfType([a.string,a.node]),title:a.string.isRequired,width:a.number},D.defaultProps={navigationAction:void 0,primaryAction:void 0,secondaryAction:void 0,subtitle:void 0},D.propTypes={navigationAction:a.node,primaryAction:a.node,secondaryAction:a.node,subtitle:a.oneOfType([a.string,a.node]),title:a.string.isRequired}},17034:(U,E,t)=>{t.d(E,{A:()=>b});var e=t(67294),g=t(45697),a=t(71893),s=t(41580);const l=(0,a.default)(s.x)`
  display: grid;
  grid-template-columns: ${({hasSideNav:f})=>f?"auto 1fr":"1fr"};
`,v=(0,a.default)(s.x)`
  overflow-x: hidden;
`,b=({sideNav:f,children:P})=>e.createElement(l,{hasSideNav:Boolean(f)},f,e.createElement(v,{paddingBottom:10},P));b.defaultProps={sideNav:void 0},b.propTypes={children:g.node.isRequired,sideNav:g.node}},185:(U,E,t)=>{t.d(E,{o:()=>l});var e=t(67294),g=t(45697),a=t(71893);const s=a.default.main`
  // To prevent global outline on focus visible to force an outline when Main is focused
  &:focus-visible {
    outline: none;
  }
`,l=({labelledBy:v,...b})=>{const f=v||"main-content-title";return e.createElement(s,{"aria-labelledby":f,id:"main-content",tabIndex:-1,...b})};l.defaultProps={labelledBy:void 0},l.propTypes={labelledBy:g.string}},39785:(U,E,t)=>{t.d(E,{A:()=>R});var e=t(85893),g=t(67294),a=t(71893),s=t(41363),l=t(41580),v=t(75515),b=t(11047),f=t(15585);const P=a.keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`,S=a.default.div`
  animation: ${P} 2s infinite linear;
  will-change: transform;
`,D=(0,a.default)(b.k)`
  background: transparent;
  border: none;

  &[aria-disabled='true'] {
    pointer-events: none;
    svg path {
      fill: ${({theme:h})=>h.colors.neutral600};
    }
  }

  svg {
    display: flex;
    font-size: ${10/16}rem;
  }

  svg path {
    fill: ${({theme:h})=>h.colors.primary600};
  }

  ${f.BF}
`,R=g.forwardRef(({children:h,startIcon:n,endIcon:d,onClick:r,disabled:o=!1,loading:u=!1,...x},M)=>{const m=r&&!o?r:void 0,T=o||u;return(0,e.jsxs)(D,{ref:M,"aria-disabled":T,onClick:m,as:"button",type:"button",...x,children:[(n||u)&&(0,e.jsx)(l.x,{as:"span",paddingRight:2,"aria-hidden":!0,children:u?(0,e.jsx)(S,{children:(0,e.jsx)(s.Loader,{})}):n}),(0,e.jsx)(v.Z,{variant:"pi",textColor:T?"neutral600":"primary600",children:h}),d&&(0,e.jsx)(l.x,{as:"span",paddingLeft:2,"aria-hidden":!0,children:d})]})});R.displayName="TextButton"},20707:(U,E,t)=>{t.d(E,{s:()=>N});var e=t(67294),g=t(71893),a=t(45697),s=t(75228),l=t(14085),v=t(54574),b=t(64777),f=t(63428),P=t(96404),S=t(7681),D=t(11047),R=t(39785),h=t(15585),n=t(75515),d=t(63237),r=t(41580),o=t(88262);const u=g.default.label`
  position: relative;
  display: inline-block;
  z-index: 0;
  width: 100%;
`,x=(0,g.default)(r.x)`
  cursor: ${({disabled:c})=>c?"not-allowed":void 0};
  // Masks the background of each value
  overflow: hidden;
  flex-wrap: wrap;

  ${(0,h.k3)()}
`,M=(0,g.default)(D.k).attrs({hasRadius:!0})`
  background-color: ${({theme:c,checked:B,disabled:A})=>B?A?c.colors.neutral200:c.colors.neutral0:"transparent"};
  border: 1px solid
    ${({theme:c,checked:B,disabled:A})=>B&&B!==null?A?c.colors.neutral300:c.colors.neutral200:A?c.colors.neutral150:c.colors.neutral100};
  position: relative;
  user-select: none;
  z-index: 2;
  flex: 1 1 50%;
  /**
    We declare the defined value because we want the height of the input when 
    the values are in a row to be 40px. But defining a height on the label
    would break the input when it wraps.
  */
  padding-top: ${({size:c})=>`${c==="S"?"2px":"6px"}`};
  padding-bottom: ${({size:c})=>`${c==="S"?"2px":"6px"}`};
`,m=g.default.input`
  height: 100%;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  z-index: 1;
  width: 100%;
`,T=e.forwardRef(({size:c,onLabel:B,offLabel:A,children:$,checked:y,disabled:O,onChange:W,...Z},F)=>{const{error:i,hint:C,id:p,name:H,required:j}=(0,o.U)(),G="neutral600";let V=!y&&y!==null?"danger700":G,Q=y?"primary600":G;const X=I=>{O||W(I)};let z;return i?z=`${p}-error`:C&&(z=`${p}-hint`),e.createElement(u,null,e.createElement(d.T,null,$),e.createElement(x,{hasRadius:!0,disabled:O,padding:1,display:"flex",background:O?"neutral150":"neutral100",borderStyle:"solid",borderWidth:"1px",borderColor:"neutral200"},e.createElement(M,{size:c,paddingLeft:3,paddingRight:3,justifyContent:"center",alignItems:"center","aria-hidden":!0,checked:y===null?!1:!y,disabled:O},e.createElement(n.Z,{variant:"pi",fontWeight:"bold",textTransform:"uppercase",textColor:O?"neutral700":V},A)),e.createElement(M,{size:c,paddingLeft:3,paddingRight:3,justifyContent:"center",alignItems:"center","aria-hidden":!0,checked:y===null?!1:y,disabled:O},e.createElement(n.Z,{variant:"pi",fontWeight:"bold",textTransform:"uppercase",textColor:O?"neutral700":Q},B)),e.createElement(m,{type:"checkbox","aria-disabled":O,"aria-describedby":z,onChange:I=>X(I),name:H,ref:F,"aria-required":j,...Z,checked:!(y===null||!y)})))});T.displayName="ToggleCheckbox",T.defaultProps={disabled:!1,checked:!1,onChange:void 0,size:"M"},T.propTypes={checked:a.bool,children:a.string.isRequired,disabled:a.bool,offLabel:a.string.isRequired,onChange:a.func,onLabel:a.string.isRequired,size:a.oneOf(Object.keys(s.J.input))};const k=(0,g.default)(v.g)`
  max-width: 320px;
`,J=(0,g.default)(R.A)`
  align-self: flex-end;
  margin-left: auto;
`,N=({disabled:c,size:B,error:A,hint:$,label:y,name:O,labelAction:W,required:Z,id:F,onClear:i,clearLabel:C,checked:p,...H})=>{const j=(0,l.M)(F);return e.createElement(k,{name:O,hint:$,error:A,id:j,required:Z},e.createElement(S.K,{spacing:1},e.createElement(D.k,null,e.createElement(b.Q,{action:W},y),C&&i&&p!==null&&!c&&e.createElement(J,{onClick:i},C)),e.createElement(T,{id:j,size:B,checked:p,disabled:c,...H},y),e.createElement(f.J,null),e.createElement(P.c,null)))};N.displayName="ToggleInput",N.defaultProps={checked:!1,clearLabel:void 0,disabled:!1,error:void 0,hint:void 0,id:void 0,label:"",labelAction:void 0,name:"",onClear:void 0,required:!1,size:"M"},N.propTypes={checked:a.bool,clearLabel:a.string,disabled:a.bool,error:a.string,hint:a.oneOfType([a.string,a.node,a.arrayOf(a.node)]),id:a.string,label:a.string,labelAction:a.node,name:a.string,onClear:a.func,required:a.bool,size:a.oneOf(Object.keys(s.J.input))}}}]);
