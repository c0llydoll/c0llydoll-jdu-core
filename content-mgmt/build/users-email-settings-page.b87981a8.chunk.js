"use strict";(self.webpackChunkmy_project=self.webpackChunkmy_project||[]).push([[8418],{95972:(I,v,t)=>{t.r(v),t.d(v,{default:()=>oe});var e=t(67294),h=t(23724),s=t(49212),n=t(68547),r=t(14087),p=t(185),O=t(67838),g=t(49066),M=t(81912),l=t(89031);const d=async()=>{const{get:m}=(0,n.getFetchClient)(),{data:f}=await m((0,l.Gc)("email-templates"));return f},P=m=>{const{put:f}=(0,n.getFetchClient)();return f((0,l.Gc)("email-templates"),m)};var E=t(45697),a=t.n(E),u=t(38939),c=t(8060),o=t(79031),i=t(37909),R=t(15234),L=t(63237),D=t(75515),F=t(12028),U=t(52624),W=t(4585),Q=t(30815),J=t(85018);const H=({canUpdate:m,onEditClick:f})=>{const{formatMessage:y}=(0,s.useIntl)();return e.createElement(u.i,{colCount:3,rowCount:3},e.createElement(c.h,null,e.createElement(o.Tr,null,e.createElement(i.Th,{width:"1%"},e.createElement(L.T,null,y({id:(0,l.OB)("Email.template.table.icon.label"),defaultMessage:"icon"}))),e.createElement(i.Th,null,e.createElement(D.Z,{variant:"sigma",textColor:"neutral600"},y({id:(0,l.OB)("Email.template.table.name.label"),defaultMessage:"name"}))),e.createElement(i.Th,{width:"1%"},e.createElement(L.T,null,y({id:(0,l.OB)("Email.template.table.action.label"),defaultMessage:"action"}))))),e.createElement(R.p,null,e.createElement(o.Tr,{...(0,n.onRowClick)({fn:()=>f("reset_password")})},e.createElement(i.Td,null,e.createElement(U.J,null,e.createElement(Q.Z,{"aria-label":y({id:"global.reset-password",defaultMessage:"Reset password"})}))),e.createElement(i.Td,null,e.createElement(D.Z,null,y({id:"global.reset-password",defaultMessage:"Reset password"}))),e.createElement(i.Td,{...n.stopPropagation},e.createElement(F.h,{onClick:()=>f("reset_password"),label:y({id:(0,l.OB)("Email.template.form.edit.label"),defaultMessage:"Edit a template"}),noBorder:!0,icon:m&&e.createElement(W.Z,null)}))),e.createElement(o.Tr,{...(0,n.onRowClick)({fn:()=>f("email_confirmation")})},e.createElement(i.Td,null,e.createElement(U.J,null,e.createElement(J.Z,{"aria-label":y({id:(0,l.OB)("Email.template.email_confirmation"),defaultMessage:"Email address confirmation"})}))),e.createElement(i.Td,null,e.createElement(D.Z,null,y({id:(0,l.OB)("Email.template.email_confirmation"),defaultMessage:"Email address confirmation"}))),e.createElement(i.Td,{...n.stopPropagation},e.createElement(F.h,{onClick:()=>f("email_confirmation"),label:y({id:(0,l.OB)("Email.template.form.edit.label"),defaultMessage:"Edit a template"}),noBorder:!0,icon:m&&e.createElement(W.Z,null)})))))};H.propTypes={canUpdate:a().bool.isRequired,onEditClick:a().func.isRequired};const X=H;var Y=t(80831),k=t(42866),w=t(24969),q=t(59946),_=t(36856),ee=t(11276),j=t(74571),K=t(29728),Z=t(2407),te=t(64256),C=t(53209);const ae=C.Ry().shape({options:C.Ry().shape({from:C.Ry().shape({name:C.Z_().required(n.translatedErrors.required),email:C.Z_().email(n.translatedErrors.email).required(n.translatedErrors.required)}).required(),response_email:C.Z_().email(n.translatedErrors.email),object:C.Z_().required(n.translatedErrors.required),message:C.Z_().required(n.translatedErrors.required)}).required(n.translatedErrors.required)}),N=({template:m,onToggle:f,onSubmit:y})=>{const{formatMessage:T}=(0,s.useIntl)();return e.createElement(k.P,{onClose:f,labelledBy:`${T({id:(0,l.OB)("PopUpForm.header.edit.email-templates"),defaultMessage:"Edit email template"})}, ${T({id:(0,l.OB)(m.display),defaultMessage:m.display})}`},e.createElement(w.x,null,e.createElement(Z.O,{label:`${T({id:(0,l.OB)("PopUpForm.header.edit.email-templates"),defaultMessage:"Edit email template"})}, ${T({id:(0,l.OB)(m.display),defaultMessage:m.display})}`},e.createElement(Z.$,null,T({id:(0,l.OB)("PopUpForm.header.edit.email-templates"),defaultMessage:"Edit email template"})),e.createElement(Z.$,null,T({id:(0,l.OB)(m.display),defaultMessage:m.display})))),e.createElement(Y.Formik,{onSubmit:y,initialValues:m,validateOnChange:!1,validationSchema:ae,enableReinitialize:!0},({errors:B,values:b,handleChange:x,isSubmitting:S})=>e.createElement(n.Form,null,e.createElement(q.f,null,e.createElement(ee.r,{gap:5},e.createElement(j.P,{col:6,s:12},e.createElement(n.GenericInput,{intlLabel:{id:(0,l.OB)("PopUpForm.Email.options.from.name.label"),defaultMessage:"Shipper name"},name:"options.from.name",onChange:x,value:b.options.from.name,error:B?.options?.from?.name,type:"text"})),e.createElement(j.P,{col:6,s:12},e.createElement(n.GenericInput,{intlLabel:{id:(0,l.OB)("PopUpForm.Email.options.from.email.label"),defaultMessage:"Shipper email"},name:"options.from.email",onChange:x,value:b.options.from.email,error:B?.options?.from?.email,type:"text"})),e.createElement(j.P,{col:6,s:12},e.createElement(n.GenericInput,{intlLabel:{id:(0,l.OB)("PopUpForm.Email.options.response_email.label"),defaultMessage:"Response email"},name:"options.response_email",onChange:x,value:b.options.response_email,error:B?.options?.response_email,type:"text"})),e.createElement(j.P,{col:6,s:12},e.createElement(n.GenericInput,{intlLabel:{id:(0,l.OB)("PopUpForm.Email.options.object.label"),defaultMessage:"Subject"},name:"options.object",onChange:x,value:b.options.object,error:B?.options?.object,type:"text"})),e.createElement(j.P,{col:12,s:12},e.createElement(te.g,{label:T({id:(0,l.OB)("PopUpForm.Email.options.message.label"),defaultMessage:"Message"}),name:"options.message",onChange:x,value:b.options.message,error:B?.options?.message&&T({id:B.options.message,defaultMessage:B.options.message})})))),e.createElement(_.m,{startActions:e.createElement(K.z,{onClick:f,variant:"tertiary"},"Cancel"),endActions:e.createElement(K.z,{loading:S,type:"submit"},"Finish")}))))};N.propTypes={template:a().shape({display:a().string,icon:a().string,options:a().shape({from:a().shape({name:a().string,email:a().string}),message:a().string,object:a().string,response_email:a().string})}).isRequired,onSubmit:a().func.isRequired,onToggle:a().func.isRequired};const ne=N,le=()=>e.createElement(n.CheckPagePermissions,{permissions:M.Z.readEmailTemplates},e.createElement(se,null)),se=()=>{const{formatMessage:m}=(0,s.useIntl)(),{trackUsage:f}=(0,n.useTracking)(),{notifyStatus:y}=(0,r.G)(),T=(0,n.useNotification)(),{lockApp:B,unlockApp:b}=(0,n.useOverlayBlocker)(),x=(0,e.useRef)(f),S=(0,h.useQueryClient)();(0,n.useFocusWhenNavigate)();const[ie,re]=(0,e.useState)(!1),[G,de]=(0,e.useState)(null),me=(0,e.useMemo)(()=>({update:M.Z.updateEmailTemplates}),[]),{isLoading:ce,allowedActions:{canUpdate:ue}}=(0,n.useRBAC)(me),{status:pe,data:z}=(0,h.useQuery)("email-templates",()=>d(),{onSuccess(){y(m({id:(0,l.OB)("Email.template.data.loaded"),defaultMessage:"Email templates has been loaded"}))},onError(){T({type:"warning",message:{id:"notification.error",defaultMessage:"An error occured"}})}}),Ee=ce||pe!=="success",$=()=>{re(A=>!A)},ge=A=>{de(A),$()},V=(0,h.useMutation)(A=>P({"email-templates":A}),{async onSuccess(){await S.invalidateQueries("email-templates"),T({type:"success",message:{id:"notification.success.saved",defaultMessage:"Saved"}}),x.current("didEditEmailTemplates"),b(),$()},onError(){T({type:"warning",message:{id:"notification.error",defaultMessage:"An error occured"}}),b()},refetchActive:!0}),{isLoading:fe}=V,ye=A=>{B(),x.current("willEditEmailTemplates");const ve={...z,[G]:A};V.mutate(ve)};return Ee?e.createElement(p.o,{"aria-busy":"true"},e.createElement(n.SettingsPageTitle,{name:m({id:(0,l.OB)("HeaderNav.link.emailTemplates"),defaultMessage:"Email templates"})}),e.createElement(O.T,{title:m({id:(0,l.OB)("HeaderNav.link.emailTemplates"),defaultMessage:"Email templates"})}),e.createElement(g.D,null,e.createElement(n.LoadingIndicatorPage,null))):e.createElement(p.o,{"aria-busy":fe},e.createElement(n.SettingsPageTitle,{name:m({id:(0,l.OB)("HeaderNav.link.emailTemplates"),defaultMessage:"Email templates"})}),e.createElement(O.T,{title:m({id:(0,l.OB)("HeaderNav.link.emailTemplates"),defaultMessage:"Email templates"})}),e.createElement(g.D,null,e.createElement(X,{onEditClick:ge,canUpdate:ue}),ie&&e.createElement(ne,{template:z[G],onToggle:$,onSubmit:ye})))},oe=le},89031:(I,v,t)=>{t.d(v,{YX:()=>s,Gc:()=>p,OB:()=>O.Z});var e=t(96486);const s=g=>Object.keys(g).reduce((M,l)=>{const d=g[l].controllers,P=Object.keys(d).reduce((E,a)=>((0,e.isEmpty)(d[a])||(E[a]=d[a]),E),{});return(0,e.isEmpty)(P)||(M[l]={controllers:P}),M},{});var n=t(31498);const p=g=>`/${n.Z}/${g}`;var O=t(84757)},2407:(I,v,t)=>{t.d(v,{$:()=>M,O:()=>l});var e=t(85893),h=t(71893),s=t(41363),n=t(75515),r=t(41580),p=t(11047),O=t(63237);const g=(0,h.default)(p.k)`
  svg {
    height: ${10/16}rem;
    width: ${10/16}rem;
    path {
      fill: ${({theme:d})=>d.colors.neutral500};
    }
  }
  :last-of-type ${r.x} {
    display: none;
  }
  :last-of-type ${n.Z} {
    color: ${({theme:d})=>d.colors.neutral800};
    font-weight: ${({theme:d})=>d.fontWeights.bold};
  }
`,M=({children:d})=>(0,e.jsxs)(g,{inline:!0,as:"li",children:[(0,e.jsx)(n.Z,{variant:"pi",textColor:"neutral600",children:d}),(0,e.jsx)(r.x,{"aria-hidden":!0,paddingLeft:3,paddingRight:3,children:(0,e.jsx)(s.ChevronRight,{})})]});M.displayName="Crumb";const l=({children:d,label:P,...E})=>(0,e.jsxs)(p.k,{...E,children:[(0,e.jsx)(O.T,{children:P}),(0,e.jsx)("ol",{"aria-hidden":!0,children:d})]});l.displayName="Breadcrumbs"},49066:(I,v,t)=>{t.d(v,{D:()=>n});var e=t(67294),h=t(45697),s=t(41580);const n=({children:r})=>e.createElement(s.x,{paddingLeft:10,paddingRight:10},r);n.propTypes={children:h.node.isRequired}},67838:(I,v,t)=>{t.d(v,{A:()=>E,T:()=>d});var e=t(67294),h=t(71893),s=t(45697),n=t(75515),r=t(41580),p=t(11047);const O=a=>{const u=(0,e.useRef)(null),[c,o]=(0,e.useState)(!0),i=([R])=>{o(R.isIntersecting)};return(0,e.useEffect)(()=>{const R=u.current,L=new IntersectionObserver(i,a);return R&&L.observe(u.current),()=>{R&&L.disconnect()}},[u,a]),[u,c]};var g=t(98402);const M=(a,u)=>{const c=(0,g.useCallbackRef)(u);(0,e.useLayoutEffect)(()=>{const o=new ResizeObserver(c);return Array.isArray(a)?a.forEach(i=>{i.current&&o.observe(i.current)}):a.current&&o.observe(a.current),()=>{o.disconnect()}},[a,c])},l=()=>{const a=(0,e.useRef)(null),[u,c]=(0,e.useState)(null),[o,i]=O({root:null,rootMargin:"0px",threshold:0});return M(o,()=>{o.current&&c(o.current.getBoundingClientRect())}),(0,e.useEffect)(()=>{a.current&&c(a.current.getBoundingClientRect())},[a]),{containerRef:o,isVisible:i,baseHeaderLayoutRef:a,headerSize:u}},d=a=>{const{containerRef:u,isVisible:c,baseHeaderLayoutRef:o,headerSize:i}=l();return e.createElement(e.Fragment,null,e.createElement("div",{style:{height:i?.height},ref:u},c&&e.createElement(E,{ref:o,...a})),!c&&e.createElement(E,{...a,sticky:!0,width:i?.width}))};d.displayName="HeaderLayout";const P=(0,h.default)(r.x)`
  width: ${a=>a.width}px;
`,E=e.forwardRef(({navigationAction:a,primaryAction:u,secondaryAction:c,subtitle:o,title:i,sticky:R,width:L,...D},F)=>{const U=typeof o=="string";return R?e.createElement(P,{paddingLeft:6,paddingRight:6,paddingTop:3,paddingBottom:3,position:"fixed",top:0,right:0,background:"neutral0",shadow:"tableShadow",width:L,zIndex:4,"data-strapi-header-sticky":!0},e.createElement(p.k,{justifyContent:"space-between"},e.createElement(p.k,null,a&&e.createElement(r.x,{paddingRight:3},a),e.createElement(r.x,null,e.createElement(n.Z,{variant:"beta",as:"h1",...D},i),U?e.createElement(n.Z,{variant:"pi",textColor:"neutral600"},o):o),c?e.createElement(r.x,{paddingLeft:4},c):null),e.createElement(p.k,null,u?e.createElement(r.x,{paddingLeft:2},u):void 0))):e.createElement(r.x,{ref:F,paddingLeft:10,paddingRight:10,paddingBottom:8,paddingTop:a?6:8,background:"neutral100","data-strapi-header":!0},a?e.createElement(r.x,{paddingBottom:2},a):null,e.createElement(p.k,{justifyContent:"space-between"},e.createElement(p.k,null,e.createElement(n.Z,{as:"h1",variant:"alpha",...D},i),c?e.createElement(r.x,{paddingLeft:4},c):null),u),U?e.createElement(n.Z,{variant:"epsilon",textColor:"neutral600",as:"p"},o):o)});E.displayName="BaseHeaderLayout",E.defaultProps={navigationAction:void 0,primaryAction:void 0,secondaryAction:void 0,subtitle:void 0,sticky:!1,width:void 0},E.propTypes={navigationAction:s.node,primaryAction:s.node,secondaryAction:s.node,sticky:s.bool,subtitle:s.oneOfType([s.string,s.node]),title:s.string.isRequired,width:s.number},d.defaultProps={navigationAction:void 0,primaryAction:void 0,secondaryAction:void 0,subtitle:void 0},d.propTypes={navigationAction:s.node,primaryAction:s.node,secondaryAction:s.node,subtitle:s.oneOfType([s.string,s.node]),title:s.string.isRequired}},185:(I,v,t)=>{t.d(v,{o:()=>r});var e=t(67294),h=t(45697),s=t(71893);const n=s.default.main`
  // To prevent global outline on focus visible to force an outline when Main is focused
  &:focus-visible {
    outline: none;
  }
`,r=({labelledBy:p,...O})=>{const g=p||"main-content-title";return e.createElement(n,{"aria-labelledby":g,id:"main-content",tabIndex:-1,...O})};r.defaultProps={labelledBy:void 0},r.propTypes={labelledBy:h.string}}}]);
