"use strict";(self.webpackChunkmy_project=self.webpackChunkmy_project||[]).push([[2354],{12354:(Q,O,t)=>{t.r(O),t.d(O,{default:()=>F});var e=t(67294),n=t(45697),i=t.n(n),D=t(38855),v=t(90608),d=t(7681),o=t(54574),T=t(64777),b=t(63428),l=t(96404),g=t(49212),X=t(6125);const R=({value:G,onChange:Y,name:I,intlLabel:N,labelAction:A,required:k,attribute:w,description:j,placeholder:Z,disabled:H,error:q})=>{const{formatMessage:S,messages:y}=(0,g.useIntl)(),$=JSON.parse(y[(0,X.Z)("countries")]);return e.createElement(o.g,{name:I,id:I,error:q,hint:j&&S(j)},e.createElement(d.K,{spacing:1},e.createElement(T.Q,{action:A,required:k},S(N)),e.createElement(D.h,{placeholder:Z&&S(Z),"aria-label":S(N),"aria-disabled":H,disabled:H,value:G,onChange:r=>Y({target:{name:I,value:r,type:w.type}})},Object.entries($).map(([r,c])=>e.createElement(v.O,{value:r,key:r},c))),e.createElement(b.J,null),e.createElement(l.c,null)))};R.defaultProps={description:null,disabled:!1,error:null,labelAction:null,required:!1,value:""},R.propTypes={intlLabel:i().object.isRequired,onChange:i().func.isRequired,attribute:i().object.isRequired,name:i().string.isRequired,description:i().object,disabled:i().bool,error:i().string,labelAction:i().object,required:i().bool,value:i().string};const F=R},38855:(Q,O,t)=>{t.d(O,{h:()=>y,X:()=>$});var e=t(67294),n=t(45697),i=t(41363),D=t(14085),v=t(70389),d=t(7801);const o={Close:"Close",CloseSelect:"CloseSelect",First:"First",Last:"Last",Next:"Next",Open:"Open",PageDown:"PageDown",PageUp:"PageUp",Previous:"Previous",Select:"Select",Space:"Space",Type:"Type"},T={Close:"Close",First:"First",Last:"Last",Next:"Next",Open:"Open",Previous:"Previous",Select:"Select",UpLevel:"UpLevel"};function b(r=[],c=null,m=[]){const B=String(c??"").toLowerCase();return B?r.filter(f=>f.props.children.toString().toLowerCase().includes(B)&&m.indexOf(f)<0):r}function l(r,c){if(!c&&r===d.y.DOWN)return o.Open;if(r===d.y.DOWN)return o.Next;if(r===d.y.UP)return o.Previous;if(r===d.y.HOME)return o.First;if(r===d.y.END)return o.Last;if(r===d.y.ESCAPE)return o.Close;if(r===d.y.ENTER)return o.CloseSelect;if(r===d.y.BACKSPACE||r===d.y.CLEAR||r.length===1)return o.Type}function g(r,c,m){switch(m){case o.First:return 0;case o.Last:return c;case o.Previous:return Math.max(0,r-1);case o.Next:return Math.min(c,r+1);default:return r}}function X(r){(0,v.Z)(r,{scrollMode:"if-needed",block:"nearest",inline:"nearest"}).forEach(({el:c,top:m,left:B})=>{c.scrollTop=m,c.scrollLeft=B})}var R=t(11047),F=t(81318),G=t(88533),Y=t(41580),I=t(75515),N=t(88655),A=t(74020),k=t(90608),w=t(54574),j=t(64777),Z=t(63428),H=t(96404),q=t(7681),S=t(63237);const y=({children:r,clearLabel:c,creatable:m,createMessage:B,disabled:f,error:J,hasMoreItems:Ee,hint:ee,id:ge,label:_,labelAction:me,loading:te,loadingMessage:ve,noOptionsMessage:Ce,onChange:ae,onClear:oe,onCreateOption:he,onInputChange:le,onLoadMore:Oe,placeholder:be,required:se,value:P,...ye})=>{const Pe=()=>r.find(a=>a.props?.value.toLowerCase()===P.toLowerCase()).props?.children,[E,ie]=(0,e.useState)(0),[Me,De]=(0,e.useState)(null),[C,de]=(0,e.useState)(r),[L,Le]=(0,e.useState)(!1),[u,z]=(0,e.useState)(""),U=(0,e.useRef)(),V=(0,e.useRef)(!1),W=(0,e.useRef)(),ce=(0,e.useRef)(),xe=(0,e.useRef)(),ue=(0,e.useRef)(!0),p=(0,D.M)(ge),Te=`${p}-label`;if(!_&&!ye["aria-label"])throw new Error('The Combobox component needs a "label" or an "aria-label" props');(0,e.useEffect)(()=>{de(b(r,u))},[u,r]),(0,e.useEffect)(()=>{L&&U.current&&X(U.current)},[E,L]),(0,e.useLayoutEffect)(()=>{ue.current&&(ue.current=!1)},[P]);const Re=L?`${p}-${E}`:"",pe=()=>{ae(null),z("")},Ie=a=>{le&&le(a);const s=W.current.value;de(b(r,s)),ie(0),De(null),u!==s&&z(s),L||M(!0,!1)},Ae=a=>{const{key:s}=a,h=m&&u?C.length:C.length-1,K=l(s,L);switch(P&&!u&&s===d.y.BACKSPACE&&pe(),K){case o.Next:{if(E===h){x(0);break}x(g(E,h,K));break}case o.Previous:{if(E===0){x(h);break}x(g(E,h,K));break}case o.Last:case o.First:{if(E===h){x(0);break}x(g(E,h,K));break}case o.CloseSelect:a.preventDefault(),ne(E);break;case o.Close:a.preventDefault(),M(!1);break;case o.Open:M(!0);break}},Se=a=>{if(a.preventDefault(),P&&!V.current&&z(""),V.current){V.current=!1;return}M(!1,!1)},x=a=>{ie(a)},Be=a=>{x(a),ne(a)},fe=()=>{V.current=!0},ne=a=>{const s=C[a];if(z(""),s){ae(s.props.value),M(!1);return}m&&(he(u),M(!1))},M=(a,s=!0)=>{Le(a),s&&W.current.focus()},Ke=e.Children.toArray(C).map((a,s)=>{const h=E===s;return(0,e.cloneElement)(a,{id:`${p}-${s}`,"aria-selected":Me===s,"aria-posinset":s+1,"aria-setsize":e.Children.toArray(C).length,ref(K){h&&(U.current=K)},onClick:()=>Be(s),onMouseDown:fe,isSelected:h})}),$e=()=>{W.current.focus(),oe&&oe(),pe()},_e=()=>{W.current.focus(),M(!0)},Ue=()=>{const a=C.findIndex(s=>s.props?.children===u);return u&&a===-1},We=a=>{a.preventDefault(),M(a,!0)};let re;return J?re=`${p}-error`:ee&&(re=`${p}-hint`),e.createElement(w.g,{hint:ee,error:J,id:p,required:se},e.createElement(S.T,{"aria-live":"polite","aria-atomic":"false","aria-relevant":"additions text"},P),e.createElement(q.K,{spacing:_||ee||J?1:0},_&&e.createElement(j.Q,{action:me},_),e.createElement(A.d8,{ref:ce,$disabled:f,hasError:J},e.createElement(A.fv,{wrap:"wrap"},!u&&P&&e.createElement(A.K7,{id:`${p}-selected-value`},e.createElement(I.Z,null,Pe())),e.createElement(A.II,{"aria-activedescendant":Re,"aria-autocomplete":"list","aria-controls":`${p}-listbox`,"aria-disabled":f,"aria-expanded":L,"aria-haspopup":"listbox","aria-describedby":re,autoComplete:"off",autoCorrect:"off",id:p,onBlur:f?void 0:Se,onClick:f?void 0:We,onInput:f?void 0:Ie,onKeyDown:f?void 0:Ae,placeholder:P?"":be,readOnly:f,ref:W,required:se,role:"combobox",spellCheck:"off",type:"text",value:u})),e.createElement(R.k,null,(P||u)&&e.createElement(F.zb,{id:`${p}-clear`,"aria-label":c,disabled:f,paddingLeft:3,as:"button",onClick:$e,type:"button"},e.createElement(i.Cross,null)),e.createElement(F.AV,{disabled:f,paddingLeft:3,"aria-hidden":!0,as:"button",onClick:_e,tabIndex:-1,type:"button"},e.createElement(i.CarretDown,null)))),e.createElement(Z.J,null),e.createElement(H.c,null)),L&&e.createElement(G.J2,{id:`${p}-popover`,source:ce,spacing:4,fullWidth:!0,intersectionId:`${p}-listbox-popover-intersection`,onReachEnd:Ee&&!te?Oe:void 0},e.createElement("div",{role:"listbox",ref:xe,id:`${p}-listbox`,"aria-labelledby":_?Te:void 0},(Boolean(C.length)||m)&&e.createElement(e.Fragment,null,Ke,Ue()&&m&&e.createElement(k.O,{isSelected:E===C.length,ref:a=>{E===C.length&&(U.current=a)},onMouseDown:fe,onClick:()=>ne(),taindex:0},B(u))),!C.length&&!m&&!te&&e.createElement(Y.x,{paddingLeft:4,paddingRight:4,paddingTop:2,paddingBottom:2,ref:U},e.createElement(I.Z,{textColor:"neutral800"},Ce(u))),te&&e.createElement(R.k,{justifyContent:"center",alignItems:"center",paddingTop:2,paddingBottom:2},e.createElement(N.a,{small:!0},ve)))))},$=r=>e.createElement(y,{...r,creatable:!0});y.defaultProps={"aria-label":void 0,clearLabel:"clear",creatable:!1,createMessage:r=>`Create "${r}"`,disabled:!1,error:void 0,hasMoreItems:!1,hint:void 0,id:void 0,label:void 0,loading:!1,loadingMessage:"Loading content...",noOptionsMessage:()=>"No results found",onClear:void 0,onCreateOption:void 0,onInputChange:void 0,onLoadMore:void 0,placeholder:"Select or enter a value",value:void 0},$.defaultProps=y.defaultProps,y.propTypes={"aria-label":n.string,children:n.oneOfType([n.arrayOf(n.node),n.node]),clearLabel:n.string,creatable:n.bool,createMessage:n.func,disabled:n.bool,error:n.string,hasMoreItems:n.bool,id:n.string,hint:n.oneOfType([n.string,n.node,n.arrayOf(n.node)]),label:n.string,labelAction:n.element,loading:n.bool,loadingMessage:n.string,noOptionsMessage:n.func,onChange:n.func.isRequired,onClear:n.func,onCreateOption:n.func,onInputChange:n.func,onLoadMore:n.func,placeholder:n.string,value:n.string},$.propTypes={...y.propTypes,onCreateOption:n.func.isRequired}},90608:(Q,O,t)=>{t.d(O,{O:()=>v});var e=t(67294),n=t(45697),i=t(75515),D=t(74020);const v=(0,e.forwardRef)(({isSelected:d,children:o,...T},b)=>e.createElement(D.Zq,{hasRadius:!0,paddingLeft:4,paddingRight:4,paddingTop:2,paddingBottom:2,role:"option",background:"neutral0",isSelected:d,ref:b,...T},e.createElement(i.Z,{textColor:d?"primary600":"neutral800",fontWeight:d?"bold":null},o)));v.defaultProps={isSelected:!1},v.propTypes={children:n.oneOfType([n.string,n.number]).isRequired,isSelected:n.bool},v.displayName="ComboboxOption"},74020:(Q,O,t)=>{t.d(O,{II:()=>T,K7:()=>d,Zq:()=>b,d8:()=>v,fv:()=>o});var e=t(71893),n=t(41580),i=t(11047),D=t(15585);const v=(0,e.default)(i.k)`
  position: relative;
  border: 1px solid ${({theme:l,hasError:g})=>g?l.colors.danger600:l.colors.neutral200};
  padding-right: ${({theme:l})=>l.spaces[3]};
  padding-left: ${({theme:l})=>l.spaces[3]};
  border-radius: ${({theme:l})=>l.borderRadius};
  background: ${({theme:l})=>l.colors.neutral0};

  ${({theme:l,$disabled:g})=>g?`
    color: ${l.colors.neutral600};
    background: ${l.colors.neutral150};
  `:void 0}

  ${(0,D.k3)()}
`,d=e.default.div`
  padding: 1px 2px;
  grid-area: 1 / 1 / 2 / 3;
`,o=(0,e.default)(i.k)`
  display: grid;
  flex: 1 1 0%;
  position: relative;
`,T=e.default.input`
  display: inline-grid;
  grid-area: 1 / 1 / 2 / 3;
  grid-template-columns: 0px min-content;
  background: transparent;
  min-height: ${40/16}rem;
  border: none;
  flex: 1;
  font-size: ${14/16}rem;
  color: ${({theme:l})=>l.colors.neutral800};
  outline: none;
  &:focus-visible {
    outline: none;
    box-shadow: none;
    outline-offset: 0;
  }
  &[aria-disabled='true'] {
    background: inherit;
    color: inherit;
    cursor: not-allowed;
  }
`,b=(0,e.default)(n.x)`
  width: 100%;
  border: none;
  text-align: left;
  outline-offset: -3px;
  ${({isSelected:l,theme:g})=>l&&`background: ${g.colors.primary100};`}

  &:hover {
    background: ${({theme:l})=>l.colors.primary100};
  }
`}}]);
