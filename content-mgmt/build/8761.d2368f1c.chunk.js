(self.webpackChunkmy_project=self.webpackChunkmy_project||[]).push([[8761],{44174:E=>{function c(e,t,a,n){for(var l=-1,s=e==null?0:e.length;++l<s;){var o=e[l];t(n,o,a(o),e)}return n}E.exports=c},81119:(E,c,e)=>{var t=e(89881);function a(n,l,s,o){return t(n,function(i,r,m){l(o,i,s(i),m)}),o}E.exports=a},55189:(E,c,e)=>{var t=e(44174),a=e(81119),n=e(67206),l=e(1469);function s(o,i){return function(r,m){var v=l(r)?t:a,u=i?i():{};return v(r,o,n(m,2),u)}}E.exports=s},94654:(E,c,e)=>{var t=e(21078),a=e(35161);function n(l,s){return t(a(l,s),1)}E.exports=n},7739:(E,c,e)=>{var t=e(89465),a=e(55189),n=Object.prototype,l=n.hasOwnProperty,s=a(function(o,i,r){l.call(o,r)?o[r].push(i):t(o,r,[i])});E.exports=s},35161:(E,c,e)=>{var t=e(29932),a=e(67206),n=e(69199),l=e(1469);function s(o,i){var r=l(o)?t:n;return r(o,a(i,3))}E.exports=s},48734:(E,c,e)=>{"use strict";e.d(c,{U:()=>u,y:()=>m});var t=e(85893),a=e(71893),n=e(75515),l=e(14085),s=e(41580),o=e(11047),i=e(13819);const r=({theme:p,expanded:g,variant:_,disabled:y,error:d})=>d?`1px solid ${p.colors.danger600} !important`:y?`1px solid ${p.colors.neutral150}`:g?`1px solid ${p.colors.primary600}`:_==="primary"?`1px solid ${p.colors.neutral0}`:`1px solid ${p.colors.neutral100}`,m=(0,a.default)(n.Z)``,v=(0,a.default)(s.x)`
  border: ${r};

  &:hover:not([aria-disabled='true']) {
    border: 1px solid ${({theme:p})=>p.colors.primary600};

    ${m} {
      color: ${({theme:p,expanded:g})=>g?void 0:p.colors.primary700};
    }

    ${n.Z} {
      color: ${({theme:p,expanded:g})=>g?void 0:p.colors.primary600};
    }

    & > ${o.k} {
      background: ${({theme:p})=>p.colors.primary100};
    }

    [data-strapi-dropdown='true'] {
      background: ${({theme:p})=>p.colors.primary200};
    }
  }
`,u=({children:p,disabled:g=!1,error:_,expanded:y=!1,hasErrorMessage:d=!0,id:h,onToggle:f,toggle:x,size:P="M",variant:D="primary",shadow:O})=>{const B=(0,l.M)(h);return(0,t.jsxs)(i.S.Provider,{value:{expanded:y,onToggle:f,toggle:x,id:B,size:P,variant:D,disabled:g},children:[(0,t.jsx)(v,{"data-strapi-expanded":y,disabled:g,"aria-disabled":g,expanded:y,hasRadius:!0,variant:D,error:_,shadow:O,children:p}),_&&d&&(0,t.jsx)(s.x,{paddingTop:1,children:(0,t.jsx)(n.Z,{variant:"pi",textColor:"danger600",children:_})})]})}},63081:(E,c,e)=>{"use strict";e.d(c,{v:()=>l});var t=e(85893),a=e(41580),n=e(13819);const l=({children:s,...o})=>{const{expanded:i,id:r}=(0,n.A)();if(!i)return null;const m=`accordion-content-${r}`,v=`accordion-label-${r}`,u=`accordion-desc-${r}`;return(0,t.jsx)(a.x,{role:"region",id:m,"aria-labelledby":v,"aria-describedby":u,...o,children:s})}},13819:(E,c,e)=>{"use strict";e.d(c,{A:()=>n,S:()=>a});var t=e(67294);const a=(0,t.createContext)({disabled:!1,expanded:!1,id:"",size:"M",variant:"primary"}),n=()=>(0,t.useContext)(a)},74756:(E,c,e)=>{"use strict";e.d(c,{B:()=>y});var t=e(85893),a=e(41363),n=e(71893),l=e(39785),s=e(75515),o=e(11047),i=e(7681),r=e(52624),m=e(48734),v=e(13819);const u=({expanded:d,disabled:h,variant:f})=>{let x="neutral100";return d?x="primary100":h?x="neutral150":f==="primary"&&(x="neutral0"),x};var p=e(25108);const g=(0,n.default)(l.A)`
  text-align: left;

  // necessary to make the ellipsis prop work on the title
  > span {
    max-width: 100%;
  }

  svg {
    width: ${14/16}rem;
    height: ${14/16}rem;

    path {
      fill: ${({theme:d,expanded:h})=>h?d.colors.primary600:d.colors.neutral500};
    }
  }
`,_=(0,n.default)(o.k)`
  min-height: ${({theme:d,size:h})=>d.sizes.accordions[h]};
  border-radius: ${({theme:d,expanded:h})=>h?`${d.borderRadius} ${d.borderRadius} 0 0`:d.borderRadius};

  &:hover {
    svg {
      path {
        fill: ${({theme:d})=>d.colors.primary600};
      }
    }
  }
`,y=({title:d,description:h,as:f="span",togglePosition:x="right",action:P,...D})=>{const{onToggle:O,toggle:B,expanded:C,id:T,size:M,variant:$,disabled:b}=(0,v.A)(),K=`accordion-content-${T}`,A=`accordion-label-${T}`,j=`accordion-desc-${T}`,L=M==="M"?6:4,I=M==="M"?L:L-2,U=u({expanded:C,disabled:b,variant:$}),W={as:f,fontWeight:M==="S"?"bold":void 0,id:A,textColor:C?"primary600":"neutral700",ellipsis:!0,variant:M==="M"?"delta":void 0},R=C?"primary600":"neutral600",z=C?"primary200":"neutral200",S=M==="M"?`${32/16}rem`:`${24/16}rem`,Z=()=>{b||(B&&!O?(p.warn('Deprecation warning: Usage of "toggle" prop in Accordion component is deprecated. This is discouraged and will be removed in the next major release. Please use "onToggle" instead'),B()):O&&O())},F=(0,t.jsx)(o.k,{justifyContent:"center",borderRadius:"50%",height:S,width:S,transform:C?"rotate(180deg)":void 0,"data-strapi-dropdown":!0,"aria-hidden":!0,as:"span",background:z,cursor:b?"not-allowed":"pointer",onClick:Z,shrink:0,children:(0,t.jsx)(r.J,{as:a.CarretDown,width:M==="M"?`${11/16}rem`:`${8/16}rem`,color:C?"primary600":"neutral600"})});return(0,t.jsx)(_,{paddingBottom:I,paddingLeft:L,paddingRight:L,paddingTop:I,background:U,expanded:C,size:M,justifyContent:"space-between",cursor:b?"not-allowed":"",children:(0,t.jsxs)(i.K,{horizontal:!0,spacing:3,flex:1,maxWidth:"100%",children:[x==="left"&&F,(0,t.jsx)(g,{onClick:Z,"aria-disabled":b,"aria-expanded":C,"aria-controls":K,"aria-labelledby":A,"data-strapi-accordion-toggle":!0,expanded:C,type:"button",flex:1,minWidth:0,...D,children:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(m.y,{...W,children:d}),h&&(0,t.jsx)(s.Z,{as:"p",id:j,textColor:R,children:h})]})}),x==="right"&&(0,t.jsxs)(i.K,{horizontal:!0,spacing:3,children:[F,P]}),x==="left"&&P]})})}},2407:(E,c,e)=>{"use strict";e.d(c,{$:()=>m,O:()=>v});var t=e(85893),a=e(71893),n=e(41363),l=e(75515),s=e(41580),o=e(11047),i=e(63237);const r=(0,a.default)(o.k)`
  svg {
    height: ${10/16}rem;
    width: ${10/16}rem;
    path {
      fill: ${({theme:u})=>u.colors.neutral500};
    }
  }
  :last-of-type ${s.x} {
    display: none;
  }
  :last-of-type ${l.Z} {
    color: ${({theme:u})=>u.colors.neutral800};
    font-weight: ${({theme:u})=>u.fontWeights.bold};
  }
`,m=({children:u})=>(0,t.jsxs)(r,{inline:!0,as:"li",children:[(0,t.jsx)(l.Z,{variant:"pi",textColor:"neutral600",children:u}),(0,t.jsx)(s.x,{"aria-hidden":!0,paddingLeft:3,paddingRight:3,children:(0,t.jsx)(n.ChevronRight,{})})]});m.displayName="Crumb";const v=({children:u,label:p,...g})=>(0,t.jsxs)(o.k,{...g,children:[(0,t.jsx)(i.T,{children:p}),(0,t.jsx)("ol",{"aria-hidden":!0,children:u})]});v.displayName="Breadcrumbs"},36989:(E,c,e)=>{"use strict";e.d(c,{Z:()=>r});var t=e(67294),a=e(45697),n=e(71893),l=e(41580),s=e(11047);const o=(0,n.default)(s.k)`
  & > * + * {
    margin-left: ${({theme:m})=>m.spaces[2]};
  }

  margin-left: ${({pullRight:m})=>m?"auto":void 0};
`,i=(0,n.default)(o)`
  flex-shrink: 0;
`,r=({startActions:m,endActions:v})=>m||v?t.createElement(l.x,{paddingLeft:10,paddingRight:10},t.createElement(l.x,{paddingBottom:4},t.createElement(s.k,{justifyContent:"space-between",alignItems:"flex-start"},m&&t.createElement(o,{wrap:"wrap"},m),v&&t.createElement(i,{pullRight:!0},v)))):null;r.defaultProps={endActions:void 0,startActions:void 0},r.propTypes={endActions:a.node,startActions:a.node}},53192:(E,c,e)=>{"use strict";e.d(c,{m:()=>i});var t=e(67294),a=e(71893),n=e(45697),l=e(11276);const s=`${232/16}rem`,o=(0,a.default)(l.r)`
  width: ${s};
  background: ${({theme:r})=>r.colors.neutral100};
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  border-right: 1px solid ${({theme:r})=>r.colors.neutral200};
  z-index: 1;
`,i=({ariaLabel:r,...m})=>t.createElement(o,{"aria-label":r,as:"nav",...m});i.propTypes={ariaLabel:n.string.isRequired}},38702:(E,c,e)=>{"use strict";e.d(c,{p:()=>d});var t=e(67294),a=e(45697),n=e(71893),l=e(41363),s=e(11047),o=e(75515),i=e(12028),r=e(41580),m=e(70004),v=e(49123),u=e(8509),p=e(14085);const g=h=>{const f=(0,t.useRef)();return(0,t.useEffect)(()=>{f.current=h}),f.current};var _=e(7801);const y=(0,n.default)(m.i)`
  width: ${24/16}rem;
  background-color: ${({theme:h})=>h.colors.neutral200};
`,d=({as:h,label:f,searchLabel:x,searchable:P,onChange:D,value:O,onClear:B,onSubmit:C,id:T})=>{const[M,$]=(0,t.useState)(!1),b=g(M),K=(0,p.M)(T),A=(0,t.useRef)(),j=(0,t.useRef)();(0,t.useEffect)(()=>{M&&A.current&&A.current.focus(),b&&!M&&j.current&&j.current.focus()},[M,b]);const L=()=>{$(R=>!R)},I=R=>{B(R),A.current.focus()},U=R=>{R.relatedTarget?.id!==K&&$(!1)},W=R=>{R.key===_.y.ESCAPE&&$(!1)};return M?t.createElement(r.x,{paddingLeft:4,paddingTop:5,paddingBottom:2,paddingRight:4},t.createElement(u.U,null,t.createElement(v.w,{name:"searchbar",value:O,onChange:D,placeholder:"e.g: strapi-plugin-abcd",onKeyDown:W,ref:A,onBlur:U,onClear:I,onSubmit:C,clearLabel:"Clear",size:"S"},x)),t.createElement(r.x,{paddingLeft:2,paddingTop:4},t.createElement(y,null))):t.createElement(r.x,{paddingLeft:6,paddingTop:6,paddingBottom:2,paddingRight:4},t.createElement(s.k,{justifyContent:"space-between",alignItems:"flex-start"},t.createElement(o.Z,{variant:"beta",as:h},f),P&&t.createElement(i.h,{ref:j,onClick:L,label:x,icon:t.createElement(l.Search,null)})),t.createElement(r.x,{paddingTop:4},t.createElement(y,null)))};d.defaultProps={as:"h2",searchable:!1,onChange(){},onClear(){},onSubmit(){},value:"",searchLabel:"",id:void 0},d.propTypes={as:a.string,id:a.string,label:a.string.isRequired,onChange:a.func,onClear:a.func,onSubmit:a.func,searchLabel:a.string,searchable:a.bool,value:a.string}},52305:(E,c,e)=>{"use strict";e.d(c,{E:()=>p});var t=e(67294),a=e(45697),n=e(71893),l=e(41363),s=e(41580),o=e(75515),i=e(11047),r=e(63507);const m=(0,n.default)(s.x)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  color: ${({theme:g})=>g.colors.neutral800};
  svg > * {
    fill: ${({theme:g})=>g.colors.neutral600};
  }

  &.active {
    ${({theme:g})=>`
      background-color: ${g.colors.primary100};
      border-right: 2px solid ${g.colors.primary600};
      svg > * {
        fill: ${g.colors.primary700};
      }
      ${o.Z} {
        color: ${g.colors.primary700};
        font-weight: 500;
      }
      `}
  }

  &:focus-visible {
    outline-offset: -2px;
  }
`,v=(0,n.default)(l.Dot)`
  width: ${12/16}rem;
  height: ${4/16}rem;
  * {
    fill: ${({theme:g,$active:_})=>_?g.colors.primary600:g.colors.neutral600};
  }
`,u=n.default.div`
  svg {
    height: ${12/16}rem;
    width: ${12/16}rem;
  }
`,p=t.forwardRef(({children:g,icon:_,withBullet:y,as:d,isSubSectionChild:h,...f},x)=>t.createElement(m,{as:d,icon:_,background:"neutral100",paddingLeft:h?9:7,paddingBottom:2,paddingTop:2,ref:x,...f},t.createElement(i.k,null,_?t.createElement(u,null,_):t.createElement(v,null),t.createElement(s.x,{paddingLeft:2},t.createElement(o.Z,{as:"span"},g))),y&&t.createElement(s.x,{as:i.k,paddingRight:4},t.createElement(v,{$active:!0}))));p.displayName="SubNavLink",p.defaultProps={as:r.f,icon:null,isSubSectionChild:!1,withBullet:!1},p.propTypes={as:a.elementType,children:a.node.isRequired,icon:a.element,isSubSectionChild:a.bool,withBullet:a.bool}},29489:(E,c,e)=>{"use strict";e.d(c,{D:()=>y});var t=e(67294),a=e(45697),n=e(71893),l=e(41580),s=e(30190),o=e(7681),i=e(41363),r=e(75515),m=e(11047);const v=(0,n.default)(m.k)`
  border: none;
  padding: 0;
  background: transparent;
`,u=n.default.div`
  display: flex;
  align-items: center;
  transform: rotateX(${({rotated:d})=>d?"0deg":"180deg"});
`,p=({collapsable:d,label:h,onClick:f,ariaExpanded:x,ariaControls:P})=>d?t.createElement(v,{as:"button",onClick:f,"aria-expanded":x,"aria-controls":P,textAlign:"left"},t.createElement(l.x,{paddingRight:1},t.createElement(r.Z,{variant:"sigma",textColor:"neutral600"},h)),d&&t.createElement(u,{rotated:x},t.createElement(i.CarretDown,{"aria-hidden":!0}))):t.createElement(v,null,t.createElement(l.x,{paddingRight:1},t.createElement(r.Z,{variant:"sigma",textColor:"neutral600"},h)));p.defaultProps={ariaControls:null,ariaExpanded:null,collapsable:!1,onClick(){}},p.propTypes={ariaControls:a.string,ariaExpanded:a.bool,collapsable:a.bool,label:a.string.isRequired,onClick:a.func};var g=e(14085);const _=(0,n.default)(l.x)`
  svg {
    height: ${4/16}rem;
    path {
      fill: ${({theme:d})=>d.colors.neutral500};
    }
  }
`,y=({collapsable:d,label:h,badgeLabel:f,children:x,id:P})=>{const[D,O]=(0,t.useState)(!0),B=(0,g.M)(P),C=()=>{O(T=>!T)};return t.createElement(o.K,{spacing:1},t.createElement(_,{paddingLeft:6,paddingTop:2,paddingBottom:2,paddingRight:4},t.createElement(l.x,{position:"relative",paddingRight:f?6:0},t.createElement(p,{onClick:C,ariaExpanded:D,ariaControls:B,collapsable:d,label:h}),f&&t.createElement(s.C,{backgroundColor:"neutral150",textColor:"neutral600",position:"absolute",right:0,top:"50%",transform:"translateY(-50%)"},f))),(!d||D)&&t.createElement("ol",{id:B},t.Children.map(x,(T,M)=>t.createElement("li",{key:M},T))))};y.defaultProps={badgeLabel:null,collapsable:!1,id:void 0},y.propTypes={badgeLabel:a.string,children:a.node.isRequired,collapsable:a.bool,id:a.string,label:a.string.isRequired}},34446:(E,c,e)=>{"use strict";e.d(c,{Z:()=>s});var t=e(67294),a=e(45697),n=e(7681),l=e(41580);const s=({children:o,...i})=>t.createElement(l.x,{paddingTop:2,paddingBottom:4},t.createElement(n.K,{as:"ol",spacing:2,...i},t.Children.map(o,(r,m)=>t.createElement("li",{key:m},r))));s.propTypes={children:a.node.isRequired}},67109:(E,c,e)=>{"use strict";e.d(c,{Z:()=>a});var t=e(85893);function a(n){return(0,t.jsx)("svg",{width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",...n,children:(0,t.jsx)("path",{d:"M24 13.3a.2.2 0 01-.2.2H5.74l8.239 8.239a.2.2 0 010 .282L12.14 23.86a.2.2 0 01-.282 0L.14 12.14a.2.2 0 010-.282L11.86.14a.2.2 0 01.282 0L13.98 1.98a.2.2 0 010 .282L5.74 10.5H23.8c.11 0 .2.09.2.2v2.6z",fill:"#212134"})})}},17772:(E,c,e)=>{"use strict";e.d(c,{Z:()=>a});var t=e(85893);function a(n){return(0,t.jsx)("svg",{width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",...n,children:(0,t.jsx)("path",{d:"M16.235 2.824a1.412 1.412 0 010-2.824h6.353C23.368 0 24 .633 24 1.412v6.353a1.412 1.412 0 01-2.823 0V4.82l-8.179 8.178a1.412 1.412 0 01-1.996-1.996l8.178-8.178h-2.945zm4.942 10.588a1.412 1.412 0 012.823 0v9.176c0 .78-.632 1.412-1.412 1.412H1.412C.632 24 0 23.368 0 22.588V1.412C0 .632.632 0 1.412 0h9.176a1.412 1.412 0 010 2.824H2.824v18.353h18.353v-7.765z",fill:"#32324D"})})}}}]);
