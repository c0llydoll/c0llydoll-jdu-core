"use strict";(self.webpackChunkmy_project=self.webpackChunkmy_project||[]).push([[302],{40316:(Q,R,e)=>{e.r(R),e.d(R,{SingleSignOn:()=>l,default:()=>r});var t=e(67294),d=e(68547),a=e(85018),x=e(17034),P=e(67838),$=e(49066),F=e(29728),A=e(185),B=e(7681),j=e(75515),C=e(20707),D=e(91216),W=e(82562),L=e(11276),z=e(74571),Z=e(49212),k=e(18446),H=e.n(k),G=e(38683),b=e(48474),M=e(87751),g=e(53209);const J=g.Ry().shape({autoRegister:g.Xg().required(d.translatedErrors.required),defaultRole:g.nK().when("autoRegister",(n,o)=>n?o.required(d.translatedErrors.required):o.nullable())}),f={...M.Z.settings.sso,readRoles:M.Z.settings.roles.read},l=()=>{const{formatMessage:n}=(0,Z.useIntl)(),{isLoading:o,allowedActions:{canUpdate:i,canReadRoles:E}}=(0,d.useRBAC)(f),[{formErrors:u,initialData:S,isLoading:p,modifiedData:h,showHeaderButtonLoader:m},O,{handleChange:v,handleSubmit:T}]=(0,b.G4)((0,G.IF)("providers/options"),J,()=>{},["autoRegister","defaultRole"]),{roles:K}=(0,b.bF)(E);(0,d.useFocusWhenNavigate)();const N=o||p;(0,t.useEffect)(()=>{if(u.defaultRole){const s='[name="defaultRole"]';document.querySelector(s).focus()}},[u]);const I=H()(S,h);return t.createElement(x.A,null,t.createElement(d.SettingsPageTitle,{name:"SSO"}),t.createElement(A.o,{tabIndex:-1},t.createElement("form",{onSubmit:s=>{if(I){s.preventDefault();return}T(s)}},t.createElement(P.T,{primaryAction:t.createElement(F.z,{"data-testid":"save-button",disabled:I,loading:m,startIcon:t.createElement(a.Z,null),type:"submit",size:"L"},n({id:"global.save",defaultMessage:"Save"})),title:n({id:"Settings.sso.title",defaultMessage:"Single Sign-On"}),subtitle:n({id:"Settings.sso.description",defaultMessage:"Configure the settings for the Single Sign-On feature."})}),t.createElement($.D,null,N?t.createElement(d.LoadingIndicatorPage,null):t.createElement(B.K,{spacing:4,background:"neutral0",padding:6,shadow:"filterShadow",hasRadius:!0},t.createElement(j.Z,{variant:"delta",as:"h2"},n({id:"global.settings",defaultMessage:"Settings"})),t.createElement(L.r,{gap:4},t.createElement(z.P,{col:6,m:6,s:12},t.createElement(C.s,{"aria-label":"autoRegister","data-testid":"autoRegister",disabled:!i,checked:h.autoRegister,hint:n({id:"Settings.sso.form.registration.description",defaultMessage:"Create new user on SSO login if no account exists"}),label:n({id:"Settings.sso.form.registration.label",defaultMessage:"Auto-registration"}),name:"autoRegister",offLabel:n({id:"app.components.ToggleCheckbox.off-label",defaultMessage:"Off"}),onLabel:n({id:"app.components.ToggleCheckbox.on-label",defaultMessage:"On"}),onChange:s=>{v({target:{name:"autoRegister",value:s.target.checked}})}})),t.createElement(z.P,{col:6,m:6,s:12},t.createElement(D.P,{disabled:!i,hint:n({id:"Settings.sso.form.defaultRole.description",defaultMessage:"It will attach the new authenticated user to the selected role"}),error:u.defaultRole?n({id:u.defaultRole.id,defaultMessage:u.defaultRole.id}):"",label:n({id:"Settings.sso.form.defaultRole.label",defaultMessage:"Default role"}),name:"defaultRole",onChange:s=>{v({target:{name:"defaultRole",value:s}})},placeholder:n({id:"components.InputSelect.option.placeholder",defaultMessage:"Choose here"}),value:h.defaultRole},K.map(({id:s,name:y})=>t.createElement(W.W,{key:s,value:s.toString()},y))))))))))},r=()=>t.createElement(d.CheckPagePermissions,{permissions:f.main},t.createElement(l,null))},20707:(Q,R,e)=>{e.d(R,{s:()=>f});var t=e(67294),d=e(71893),a=e(45697),x=e(75228),P=e(14085),$=e(54574),F=e(64777),A=e(63428),B=e(96404),j=e(7681),C=e(11047),D=e(39785),W=e(15585),L=e(75515),z=e(63237),Z=e(41580),k=e(88262);const H=d.default.label`
  position: relative;
  display: inline-block;
  z-index: 0;
  width: 100%;
`,G=(0,d.default)(Z.x)`
  cursor: ${({disabled:l})=>l?"not-allowed":void 0};
  // Masks the background of each value
  overflow: hidden;
  flex-wrap: wrap;

  ${(0,W.k3)()}
`,b=(0,d.default)(C.k).attrs({hasRadius:!0})`
  background-color: ${({theme:l,checked:c,disabled:r})=>c?r?l.colors.neutral200:l.colors.neutral0:"transparent"};
  border: 1px solid
    ${({theme:l,checked:c,disabled:r})=>c&&c!==null?r?l.colors.neutral300:l.colors.neutral200:r?l.colors.neutral150:l.colors.neutral100};
  position: relative;
  user-select: none;
  z-index: 2;
  flex: 1 1 50%;
  /**
    We declare the defined value because we want the height of the input when 
    the values are in a row to be 40px. But defining a height on the label
    would break the input when it wraps.
  */
  padding-top: ${({size:l})=>`${l==="S"?"2px":"6px"}`};
  padding-bottom: ${({size:l})=>`${l==="S"?"2px":"6px"}`};
`,M=d.default.input`
  height: 100%;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  z-index: 1;
  width: 100%;
`,g=t.forwardRef(({size:l,onLabel:c,offLabel:r,children:n,checked:o,disabled:i,onChange:E,...u},S)=>{const{error:p,hint:h,id:m,name:O,required:v}=(0,k.U)(),T="neutral600";let K=!o&&o!==null?"danger700":T,N=o?"primary600":T;const I=y=>{i||E(y)};let s;return p?s=`${m}-error`:h&&(s=`${m}-hint`),t.createElement(H,null,t.createElement(z.T,null,n),t.createElement(G,{hasRadius:!0,disabled:i,padding:1,display:"flex",background:i?"neutral150":"neutral100",borderStyle:"solid",borderWidth:"1px",borderColor:"neutral200"},t.createElement(b,{size:l,paddingLeft:3,paddingRight:3,justifyContent:"center",alignItems:"center","aria-hidden":!0,checked:o===null?!1:!o,disabled:i},t.createElement(L.Z,{variant:"pi",fontWeight:"bold",textTransform:"uppercase",textColor:i?"neutral700":K},r)),t.createElement(b,{size:l,paddingLeft:3,paddingRight:3,justifyContent:"center",alignItems:"center","aria-hidden":!0,checked:o===null?!1:o,disabled:i},t.createElement(L.Z,{variant:"pi",fontWeight:"bold",textTransform:"uppercase",textColor:i?"neutral700":N},c)),t.createElement(M,{type:"checkbox","aria-disabled":i,"aria-describedby":s,onChange:y=>I(y),name:O,ref:S,"aria-required":v,...u,checked:!(o===null||!o)})))});g.displayName="ToggleCheckbox",g.defaultProps={disabled:!1,checked:!1,onChange:void 0,size:"M"},g.propTypes={checked:a.bool,children:a.string.isRequired,disabled:a.bool,offLabel:a.string.isRequired,onChange:a.func,onLabel:a.string.isRequired,size:a.oneOf(Object.keys(x.J.input))};const U=(0,d.default)($.g)`
  max-width: 320px;
`,J=(0,d.default)(D.A)`
  align-self: flex-end;
  margin-left: auto;
`,f=({disabled:l,size:c,error:r,hint:n,label:o,name:i,labelAction:E,required:u,id:S,onClear:p,clearLabel:h,checked:m,...O})=>{const v=(0,P.M)(S);return t.createElement(U,{name:i,hint:n,error:r,id:v,required:u},t.createElement(j.K,{spacing:1},t.createElement(C.k,null,t.createElement(F.Q,{action:E},o),h&&p&&m!==null&&!l&&t.createElement(J,{onClick:p},h)),t.createElement(g,{id:v,size:c,checked:m,disabled:l,...O},o),t.createElement(A.J,null),t.createElement(B.c,null)))};f.displayName="ToggleInput",f.defaultProps={checked:!1,clearLabel:void 0,disabled:!1,error:void 0,hint:void 0,id:void 0,label:"",labelAction:void 0,name:"",onClear:void 0,required:!1,size:"M"},f.propTypes={checked:a.bool,clearLabel:a.string,disabled:a.bool,error:a.string,hint:a.oneOfType([a.string,a.node,a.arrayOf(a.node)]),id:a.string,label:a.string,labelAction:a.node,name:a.string,onClear:a.func,required:a.bool,size:a.oneOf(Object.keys(x.J.input))}}}]);
