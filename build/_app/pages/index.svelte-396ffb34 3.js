import{S as d,i as p,s as g,e as x,t as b,c as k,a as v,h as y,d as c,b as j,g as m,G as O,H as r,l as f,Q as S}from"../chunks/vendor-d0274869.js";import{l as h}from"../chunks/lookup-d8466c35.js";function _(o,l,n){const e=o.slice();return e[0]=l[n],e}function u(o){let l,n=h[o[0]]+"",e,a;return{c(){l=x("a"),e=b(n),this.h()},l(s){l=k(s,"A",{href:!0});var t=v(l);e=y(t,n),t.forEach(c),this.h()},h(){j(l,"href",a=o[0])},m(s,t){m(s,l,t),O(l,e)},p:r,d(s){s&&c(l)}}}function q(o){let l,n=Object.keys(h),e=[];for(let a=0;a<n.length;a+=1)e[a]=u(_(o,n,a));return{c(){for(let a=0;a<e.length;a+=1)e[a].c();l=f()},l(a){for(let s=0;s<e.length;s+=1)e[s].l(a);l=f()},m(a,s){for(let t=0;t<e.length;t+=1)e[t].m(a,s);m(a,l,s)},p(a,[s]){if(s&0){n=Object.keys(h);let t;for(t=0;t<n.length;t+=1){const i=_(a,n,t);e[t]?e[t].p(i,s):(e[t]=u(i),e[t].c(),e[t].m(l.parentNode,l))}for(;t<e.length;t+=1)e[t].d(1);e.length=n.length}},i:r,o:r,d(a){S(e,a),a&&c(l)}}}class E extends d{constructor(l){super();p(this,l,null,q,g,{})}}export{E as default};
