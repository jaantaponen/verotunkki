(this.webpackJsonpverohommeli=this.webpackJsonpverohommeli||[]).push([[0],{229:function(e,t,r){},249:function(e,t,r){"use strict";r.r(t);var a=r(0),n=r(58),i=r.n(n),o=r(325),c=r(252),s=r(336),u=r(20),l=r(337),p=r(338),d=r(339),b=r(335),f=r(322),m=r(2),h=function(){return Object(m.jsxs)(f.a,{direction:"column",justifyContent:"center",alignItems:"center",spacing:1,width:"sm",sx:{pt:1,pb:4},children:[Object(m.jsx)(b.a,{variant:"body2",sx:{pt:4},color:"text.secondary",align:"center",children:"Tarkista tiedot aina itse virheiden varalta."}),Object(m.jsx)(b.a,{variant:"body2",sx:{pt:0},color:"text.secondary",align:"center",children:"Olet itse vastuussa omista veroistasi."}),Object(m.jsx)(b.a,{variant:"body2",sx:{pt:0},color:"text.secondary",align:"center",children:"Sivustolle l\xe4hett\xe4mi\xe4si tiedostoja k\xe4sitell\xe4\xe4n vain paikallisesti selaimessasi."}),Object(m.jsxs)(b.a,{variant:"body2",sx:{pt:4},color:"text.secondary",align:"center",children:["Huomasitko virheen tai sivusto ei toimi mielest\xe4si oikein? Ilmoita ongelmastasi\xa0",Object(m.jsx)(d.a,{href:"https://github.com/jaantaponen/verotunkki/issues/new",children:"t\xe4\xe4ll\xe4"})]}),Object(m.jsxs)(b.a,{variant:"body2",sx:{pt:0},color:"text.secondary",align:"center",children:["Copyright \xa9 ",Object(m.jsx)(d.a,{color:"inherit",href:"https://verotunkki.fi/",children:"Verotunkki"})," ",(new Date).getFullYear(),"."]})]})},j=r(177),v=r(343),O=r(340),x=function(){var e=Object(u.f)(),t=Object(j.a)({typography:{fontSize:14}});return Object(m.jsxs)(v.a,{theme:t,children:[Object(m.jsx)(c.a,{styles:{ul:{margin:0,padding:0,listStyle:"none"}}}),Object(m.jsx)(o.a,{}),Object(m.jsx)(s.a,{component:"main",maxWidth:"sm",sx:{height:"100vh",pt:8,pb:4},children:Object(m.jsxs)(f.a,{direction:"column",justifyContent:"space-between",alignItems:"space-between",sx:{height:"100%",pt:0,pb:2},children:[Object(m.jsxs)(f.a,{direction:"column",justifyContent:"center",alignItems:"center",spacing:6,width:"sm",children:[Object(m.jsx)(b.a,{component:"h1",variant:"h3",align:"center",color:"text.primary",gutterBottom:!0,sx:{fontWeight:"bold",pt:8},children:"VEROTUNKKI"}),Object(m.jsx)(b.a,{alignSelf:"center",align:"center",variant:"h6",sx:{pt:3},component:"p",children:"Verotunkki laskee puolestasi luovutusvoitot ja -tappiot sek\xe4 tulostaa verottajayhteensopivan raportin."}),Object(m.jsx)(b.a,{alignSelf:"center",variant:"h6",component:"p",sx:{pt:2},children:"Valitse verotettavan tulon tyyppi:"}),Object(m.jsx)(s.a,{component:"main",sx:{width:"100%",pt:4,pb:4},children:Object(m.jsxs)(f.a,{direction:"column",spacing:6,justifyContent:"center",alignItems:"center",children:[Object(m.jsx)(l.a,{sx:{maxWidth:430,width:"100%!important"},onClick:function(){e("/crypto")},children:Object(m.jsx)(O.a,{children:Object(m.jsxs)(p.a,{children:[Object(m.jsx)(b.a,{gutterBottom:!0,variant:"h5",component:"div",children:"Virtuaalivaluutat"}),Object(m.jsx)(b.a,{variant:"body2",color:"text.secondary",children:"Perus hyv\xe4 Ethereum."}),Object(m.jsxs)(b.a,{variant:"body2",color:"text.secondary",children:["Tuetut l\xe4hteet: ",Object(m.jsx)("b",{children:"Coinbase, Coinbase Pro"})]})]})})}),Object(m.jsx)(l.a,{sx:{maxWidth:430,width:"100%!important"},onClick:function(){e("/securities")},children:Object(m.jsx)(O.a,{children:Object(m.jsxs)(p.a,{children:[Object(m.jsx)(b.a,{gutterBottom:!0,variant:"h5",component:"div",children:"Arvopaperit"}),Object(m.jsx)(b.a,{variant:"body2",color:"text.secondary",children:"Osakkeet ETF:t, rahastot ja muut arvopaperit."}),Object(m.jsxs)(b.a,{variant:"body2",color:"text.secondary",children:["Tuetut l\xe4hteet: ",Object(m.jsx)("b",{children:"Degiro, Nordnet"})]})]})})})]})})]}),Object(m.jsx)(h,{})]})})]})},y=r(130),k=r(26),g=r(12),C=r(16),w=r(9),S=r(15),N=r.n(S),T=r(24),E=r.n(T),P=r(331),I=r(71),F=r(176),A=r(171),D=r.n(A),R=function(e){var t=e.zoneHeight,r=e.handleFiles;return Object(m.jsx)(s.a,{sx:{pt:4,pb:3,width:"100%","& .MuiDropzoneArea-textContainer":{color:"black"},"& .MuiDropzoneArea-text":{paddingTop:t>200?8:4,fontSize:20},"& .MuiDropzoneArea-root":{height:t}},children:Object(m.jsx)(F.a,{acceptedFiles:["text/x-csv","text/plain","application/vnd.ms-excel","application/x-csv","application/csv","text/csv","text/comma-separated-values","text/x-comma-separated-values","text/tab-separated-values"],onAdd:r,onAlert:function(e,t){},Icon:D.a,dropzoneText:t>200?"Pudota CSV-tiedostoja t\xe4h\xe4n":"Pudota lis\xe4\xe4 CSV-tiedostoja t\xe4h\xe4n",fileObjects:[]})})},B=r(109),L={"P\xe4iv\xe4ys":"date",Aika:"time",Tuote:"security",ISIN:"ISIN",Reference:"reference",Venue:"venue",Quantity:"quantity",Kurssi:"rate","Kurssi-valuutta":"rateCurrency","Markkina-arvo":"marketValue","Markkina-arvo-valuutta":"marketValueCurrency",Value:"value","Value-valuutta":"valueCurrency",Vaihtokurssi:"exchangeRate","Transaction costs":"transactionCosts","Transaction and/or third":"transactionCosts","Transaction and/or third-valuutta":"transactionCostsCurrency","Transaction costs-valuutta":"transactionCostsCurrency",Kokonaissumma:"totalAmount","Kokonaissumma-valuutta":"totalAmountCurrency","Order ID":"orderId"},W=function(e){if(L[e])return L[e]},M=r(57),U=r.n(M),V=(r(226),["portfolio","tradeid","product","side","createdat","size","sizeunit","price","fee","total","pricefeetotalunit"]),Y=["Timestamp","TransactionType","Asset","QuantityTransacted","SpotPriceCurrency","SpotPriceatTransaction","Subtotal","Total","Fees","Notes"],K=["date","time","security","ISIN","reference","venue","quantity","rate","rateCurrency","marketValue","marketValueCurrency","value","valueCurrency","exchangeRate","transactionCosts","transactionCostsCurrency","totalAmount","totalAmountCurrency","orderId","datetime"],z=["Id","Kirjauspaiva","Kauppapaiva","Maksupaiva","Salkku","Tapahtumatyyppi","Arvopaperi","Instrumenttityyppi","ISIN","Maara","Kurssi","Korko","Kokonaiskulut","KokonaiskulutValuutta","Summa","Valuutta","Hankintaarvo","Tulos","Kokonaismaara","Saldo","Vaihtokurssi","Tapahtumateksti","Mitatointipaiva","Laskelma","Vahvistusnumero","Valityspalkkio","ValityspalkkioValuutta"],q=r(94),G=r(88),H=function(e){for(var t=[],r=0;r<e.length;r+=2)t.push(e.charCodeAt(r)|e.charCodeAt(r+1)<<8);return String.fromCharCode.apply(String,t)},Q=function(){var e=Object(k.a)(N.a.mark((function e(t,r){var a;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all(t.map(function(){var e=Object(k.a)(N.a.mark((function e(t){return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all(r.map(function(){var e=Object(k.a)(N.a.mark((function e(r){var a,n,i,o,c;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.file.name,e.prev=1,n=t.data?t.data.toString().split(",")[1]:"",i="getDataNordnet"===r.name?H(atob(n)):(s=n,decodeURIComponent(escape(window.atob(s)))),o=i.toString(),e.next=7,r(o);case 7:return(c=e.sent).fileName=a,e.abrupt("return",c);case 12:return e.prev=12,e.t0=e.catch(1),e.abrupt("return",{Error:e.t0,fileName:a});case 15:case"end":return e.stop()}var s}),e,null,[[1,12]])})));return function(t){return e.apply(this,arguments)}}()));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 2:return a=e.sent,e.abrupt("return",a.flatMap((function(e){return e})));case 4:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}(),J=function(){var e=Object(k.a)(N.a.mark((function e(){return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:e.next=6;break;case 3:e.t0=e.sent.parse,e.next=9;break;case 6:return e.next=8,r.e(3).then(r.bind(null,346));case 8:e.t0=e.sent.parse;case 9:return e.abrupt("return",e.t0);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Z=function(){var e=Object(k.a)(N.a.mark((function e(t){var r,a;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ee(t);case 2:return r=e.sent,a=te(r),e.abrupt("return",{orig:{Degiro:r},rows:a});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),_=function(){var e=Object(k.a)(N.a.mark((function e(t){var r,a;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,re(t);case 2:return r=e.sent,a=ae(r),e.abrupt("return",{orig:{Nordnet:r},rows:a});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),X=function(){var e=Object(k.a)(N.a.mark((function e(t){var r,a;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ne(t);case 2:return r=e.sent,a=ie(r),e.abrupt("return",{orig:{Coinbase:r},rows:a});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),$=function(){var e=Object(k.a)(N.a.mark((function e(t){var r,a;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,oe(t);case 2:return r=e.sent,a=ce(r),e.abrupt("return",{orig:{CoinbasePro:r},rows:a});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ee=function(){var e=Object(k.a)(N.a.mark((function e(t){var r,a,n,i,o,c,s,u,l,p,d;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r="",e.next=3,J();case 3:a=e.sent,n=a(t,{cast:function(e,t){return t.header?""===e?W("".concat(r,"-valuutta")):(r=e,W(e)):String(e)},columns:!0,trim:!0}),i=[],o=!1,c=!1,e.prev=8,u=Object(B.a)(n);case 10:return e.next=12,u.next();case 12:if(!(o=!(l=e.sent).done)){e.next=18;break}p=l.value,i.push(p);case 15:o=!1,e.next=10;break;case 18:e.next=24;break;case 20:e.prev=20,e.t0=e.catch(8),c=!0,s=e.t0;case 24:if(e.prev=24,e.prev=25,!o||null==u.return){e.next=29;break}return e.next=29,u.return();case 29:if(e.prev=29,!c){e.next=32;break}throw s;case 32:return e.finish(29);case 33:return e.finish(24);case 34:if(d=i.map((function(e){return e.datetime=U()("".concat(e.date,"-").concat(e.time),"DD-MM-YYYY-HH-mm").toISOString(),e})),!i.every((function(e){return 0!==E.a.difference(E.a.sortBy(K),E.a.sortBy(Object.keys(e))).length}))){e.next=37;break}throw TypeError("All headers not found in the provided Degiro file.");case 37:return e.next=39,Promise.all(d.map(function(){var e=Object(k.a)(N.a.mark((function e(t){return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=g.a,e.t1=Object(g.a)({},t),e.t2={},e.next=5,Object(q.a)(10);case 5:return e.t3=e.sent,e.t4={Source:"Degiro",id:e.t3},e.abrupt("return",(0,e.t0)(e.t1,e.t2,e.t4));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 39:return e.abrupt("return",e.sent);case 40:case"end":return e.stop()}}),e,null,[[8,20,24,34],[25,,29,33]])})));return function(t){return e.apply(this,arguments)}}(),te=function(e){return e.map((function(e){return{id:e.id,paivays:new Date(e.datetime),tuote:e.security,isin:e.ISIN,arvo:"".concat(e.value," ").concat(e.valueCurrency),maara:e.quantity,kulut:"".concat(e.transactionCosts," ").concat(e.transactionCostsCurrency),kurssi:"".concat(e.rate," ").concat(e.rateCurrency),kokonaissumma:"".concat(e.totalAmount," ").concat(e.totalAmountCurrency),operation:e.quantity>0?"BUY":"SELL"}}))},re=function(){var e=Object(k.a)(N.a.mark((function e(t){var r,a,n,i,o,c,s,u,l;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,J();case 2:r=e.sent,a=r(t,{delimiter:["\t"],columns:!0,trim:!0,cast:function(e,t){if(t.header){var r=e;return r.includes("\xe4")&&(r=r.replace(/\xe4/g,"a")),r.includes("\xf6")&&(r=r.replace(/\xf6/g,"o")),r.includes("-")&&(r=r.replace(/-/g,"")),r.replace(/\s/g,"")}var a=t.column;return"Maara"===a||"Kurssi"===a||"Valityspalkkio"===a||"Summa"===a||"Kokonaiskulut"===a||"Kokonaismaara"===a?Number.parseFloat(e.replace(/,/g,".")):"Kirjauspaiva"===a||"Kauppapaiva"===a||"Maksupaiva"===a?U()(e,"YYYY-MM-DD").toDate():String(e)}}),n=[],i=!1,o=!1,e.prev=7,s=Object(B.a)(a);case 9:return e.next=11,s.next();case 11:if(!(i=!(u=e.sent).done)){e.next=17;break}l=u.value,n.push(l);case 14:i=!1,e.next=9;break;case 17:e.next=23;break;case 19:e.prev=19,e.t0=e.catch(7),o=!0,c=e.t0;case 23:if(e.prev=23,e.prev=24,!i||null==s.return){e.next=28;break}return e.next=28,s.return();case 28:if(e.prev=28,!o){e.next=31;break}throw c;case 31:return e.finish(28);case 32:return e.finish(23);case 33:if(!n.every((function(e){return 0!==E.a.difference(z,E.a.sortBy(Object.keys(e))).length}))){e.next=35;break}throw TypeError("All headers not found in the provided Nordnet file.");case 35:return e.next=37,Promise.all(n.map(function(){var e=Object(k.a)(N.a.mark((function e(t){return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=g.a,e.t1=Object(g.a)({},t),e.t2={},e.next=5,Object(q.a)(10);case 5:return e.t3=e.sent,e.t4={Source:"Nordnet",id:e.t3},e.abrupt("return",(0,e.t0)(e.t1,e.t2,e.t4));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 37:return e.abrupt("return",e.sent);case 38:case"end":return e.stop()}}),e,null,[[7,19,23,33],[24,,28,32]])})));return function(t){return e.apply(this,arguments)}}(),ae=function(e){return e.map((function(e){return{id:e.id,paivays:new Date(e.Kauppapaiva),tuote:e.Arvopaperi,isin:e.ISIN,arvo:"".concat(e.Summa," ").concat(e.Valuutta),maara:e.Maara,kulut:e.Kokonaiskulut.toString(),kurssi:"".concat(e.Kurssi," ").concat(e.Valuutta),kokonaissumma:"".concat(e.Summa-e.Kokonaiskulut," ").concat(e.Valuutta),operation:e.Tapahtumatyyppi}}))},ne=function(){var e=Object(k.a)(N.a.mark((function e(t){var r,a,n;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=E.a.findIndex(null===t||void 0===t?void 0:t.split("\n"),(function(e){return null===e||void 0===e?void 0:e.startsWith("Timestamp,Transaction")})),e.next=3,J();case 3:if(a=e.sent,!(n=a(t,{cast:function(e,t){return t.header?e.includes("(")?e.split("(")[0].replace(/\s/g,""):e.replace(/\s/g,""):"Timestamp"===t.column?U()(e,"YYYY-MM-DD-HH-mm-ss").toISOString():"TransactionType"===t.column?e.toUpperCase():String(e)},columns:!0,from_line:r>0?r+1:1,trim:!0})).every((function(e){return 0!==E.a.difference(Y,E.a.sortBy(Object.keys(e))).length}))){e.next=7;break}throw TypeError("All headers not found in the provided Coinbase file.");case 7:return e.next=9,Promise.all(n.map(function(){var e=Object(k.a)(N.a.mark((function e(t){return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=g.a,e.t1=Object(g.a)({},t),e.t2={},e.next=5,Object(q.a)(10);case 5:return e.t3=e.sent,e.t4={Source:"Coinbase",id:e.t3},e.abrupt("return",(0,e.t0)(e.t1,e.t2,e.t4));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 9:return e.abrupt("return",e.sent);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ie=function(e){return e.map((function(e){var t="".concat(e.Subtotal?Number(e.Subtotal):e.QuantityTransacted*e.SpotPriceatTransaction," ").concat(e.SpotPriceCurrency);return{id:e.id,paivays:e.Timestamp,tuote:e.Asset,arvo:t,maara:Number(e.QuantityTransacted),kulut:"".concat(Number(e.Fees)?Number(e.Fees):0," ").concat(e.SpotPriceCurrency),kurssi:"".concat(e.SpotPriceatTransaction," ").concat(e.SpotPriceCurrency),kokonaissumma:"".concat(Number(e.Total?e.Total:0)," ").concat(e.SpotPriceCurrency),operation:e.TransactionType}}))},oe=function(){var e=Object(k.a)(N.a.mark((function e(t){var r,a,n,i,o,c,s,u,l;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,J();case 2:r=e.sent,a=r(t,{cast:function(e,t){return t.header?e.includes("/")?e.replace(/\//g,"").replace(/\s/g,""):e.replace(/\s/g,""):"createdat"===t.column?new Date(e).toISOString():String(e)},columns:!0,trim:!0}),n=[],i=!1,o=!1,e.prev=7,s=Object(B.a)(a);case 9:return e.next=11,s.next();case 11:if(!(i=!(u=e.sent).done)){e.next=17;break}l=u.value,n.push(l);case 14:i=!1,e.next=9;break;case 17:e.next=23;break;case 19:e.prev=19,e.t0=e.catch(7),o=!0,c=e.t0;case 23:if(e.prev=23,e.prev=24,!i||null==s.return){e.next=28;break}return e.next=28,s.return();case 28:if(e.prev=28,!o){e.next=31;break}throw c;case 31:return e.finish(28);case 32:return e.finish(23);case 33:if(!n.every((function(e){return 0!==E.a.difference(E.a.sortBy(V),E.a.sortBy(Object.keys(e))).length}))){e.next=35;break}throw TypeError("All headers not found in the provided Coinbase Pro file.");case 35:return e.next=37,Promise.all(n.map(function(){var e=Object(k.a)(N.a.mark((function e(t){return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=g.a,e.t1=Object(g.a)({},t),e.t2={},e.t3=t.product.split("-")[0],e.t4="EUR"!==t.pricefeetotalunit?"Invalid currency detected":void 0,e.next=7,Object(q.a)(10);case 7:return e.t5=e.sent,e.t6={Source:"CoinbasePro",product:e.t3,Error:e.t4,id:e.t5},e.abrupt("return",(0,e.t0)(e.t1,e.t2,e.t6));case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 37:return e.abrupt("return",e.sent);case 38:case"end":return e.stop()}}),e,null,[[7,19,23,33],[24,,28,32]])})));return function(t){return e.apply(this,arguments)}}(),ce=function(e){return e.map((function(e){var t;return{id:e.id,paivays:e.createdat,tuote:e.product,arvo:"".concat(e.size*e.price," ").concat(e.pricefeetotalunit),maara:e.size,kulut:"".concat(null!==(t=e.fee)&&void 0!==t?t:e.fee," ").concat(e.pricefeetotalunit),kurssi:"".concat(e.price," ").concat(e.pricefeetotalunit),kokonaissumma:"".concat(e.total," ").concat(e.pricefeetotalunit),operation:e.side}}))},se=function(e){return new Intl.NumberFormat("en-GB",{style:"currency",currency:e})},ue=function(e){return"BUY"===e||"SELL"===e},le=function(e){var t;return 2===(null!==(t=String(e))&&void 0!==t?t:"").split(" ").length},pe={type:"string",valueFormatter:function(e){var t=e.value,r=String(t)?String(t):"0 EUR",a=2===r.split(" ").length?r.split(" "):"0 EUR";try{return se(a[1]).format(Number(a[0]))}catch(n){return r}},cellClassName:"font-tabular-nums"},de={type:"number",valueFormatter:function(e){var t=e.value,r=String(t)?String(t):"0 EUR",a=2===r.split(" ").length?r.split(" "):"0 EUR";try{return se(a[1]).format(Number(a[0]))}catch(n){return new Intl.NumberFormat("en-GB",{style:"currency",currency:"EUR"}).format(Number(r))}},cellClassName:"font-tabular-nums"},be={type:"dateTime",valueFormatter:function(e){var t=e.value;return new Date(t).toLocaleString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"})},cellClassName:"font-tabular-nums"},fe=[Object(g.a)(Object(g.a)({field:"paivays",headerName:"Paivays"},be),{},{editable:!0,minWidth:180}),{field:"operation",headerName:"Operaatio",type:"string",editable:!0,minWidth:40,preProcessEditCellProps:function(e){var t=ue(e.props.value);return Object(g.a)(Object(g.a)({},e.props),{},{error:!t})}},{field:"tuote",headerName:"Tuote",type:"string",editable:!0,minWidth:240},Object(g.a)(Object(g.a)({field:"arvo",headerName:"Arvo",editable:!0,minWidth:120},pe),{},{preProcessEditCellProps:function(e){var t=le(e.props.value);return Object(g.a)(Object(g.a)({},e.props),{},{error:!t})}}),{field:"maara",headerName:"M\xe4\xe4r\xe4 (kpl)",type:"number",editable:!0,minWidth:50},Object(g.a)(Object(g.a)({field:"kurssi",headerName:"Kurssi",editable:!0,minWidth:120},pe),{},{preProcessEditCellProps:function(e){var t=le(e.props.value);return Object(g.a)(Object(g.a)({},e.props),{},{error:!t})}}),Object(g.a)(Object(g.a)({field:"kulut",headerName:"Kulut",type:"number",editable:!0,minWidth:110},pe),{},{preProcessEditCellProps:function(e){var t=le(e.props.value);return Object(g.a)(Object(g.a)({},e.props),{},{error:!t})}}),Object(g.a)(Object(g.a)({field:"kokonaissumma",headerName:"Kokonaissumma",editable:!0,minWidth:170},pe),{},{preProcessEditCellProps:function(e){var t=le(e.props.value);return Object(g.a)(Object(g.a)({},e.props),{},{error:!t})}})],me=[Object(g.a)(Object(g.a)({field:"paivays",headerName:"Paivays"},be),{},{editable:!0,minWidth:180}),{field:"operation",headerName:"Operaatio",type:"string",editable:!0,minWidth:140,preProcessEditCellProps:function(e){var t=ue(e.props.value);return Object(g.a)(Object(g.a)({},e.props),{},{error:!t})}},{field:"tuote",headerName:"Tuote",type:"string",editable:!0,minWidth:120},Object(g.a)(Object(g.a)({field:"arvo",headerName:"Arvo",editable:!0,minWidth:120},pe),{},{preProcessEditCellProps:function(e){var t=le(e.props.value);return Object(g.a)(Object(g.a)({},e.props),{},{error:!t})}}),{field:"maara",headerName:"M\xe4\xe4r\xe4 (kpl)",type:"number",editable:!0,minWidth:120},Object(g.a)(Object(g.a)({field:"kurssi",headerName:"Kurssi",editable:!0,minWidth:120},pe),{},{preProcessEditCellProps:function(e){var t=le(e.props.value);return Object(g.a)(Object(g.a)({},e.props),{},{error:!t})}}),Object(g.a)(Object(g.a)({field:"kulut",headerName:"Kulut",type:"number",editable:!0,minWidth:110},pe),{},{preProcessEditCellProps:function(e){var t=le(e.props.value);return Object(g.a)(Object(g.a)({},e.props),{},{error:!t})}}),Object(g.a)(Object(g.a)({field:"kokonaissumma",headerName:"Kokonaissumma",editable:!0,minWidth:170},pe),{},{preProcessEditCellProps:function(e){var t=le(e.props.value);return Object(g.a)(Object(g.a)({},e.props),{},{error:!t})}})],he=function(e){return[{field:"ticker",headerName:"Tuote",type:"string",editable:!1,minWidth:"CRYPTO"===e?50:250},{field:"buydate",headerName:"Hankintap\xe4iv\xe4",type:"date",editable:!1,minWidth:120},{field:"selldate",headerName:"Luovutusp\xe4iv\xe4",type:"date",editable:!1,minWidth:120},{field:"amountsold",headerName:"Myyty kpl",type:"number",editable:!1,minWidth:50},Object(g.a)({field:"transferPrice",headerName:"Luovutushinta",editable:!1,minWidth:120},de),Object(g.a)(Object(g.a)({field:"acquisitionPrice",headerName:"Hankintahinta"},de),{},{editable:!1,minWidth:120}),Object(g.a)(Object(g.a)({field:"acquisitionFee",headerName:"Hankintakulut"},de),{},{editable:!1,minWidth:120}),Object(g.a)(Object(g.a)({field:"transferFee",headerName:"Luovutuskulut"},de),{},{editable:!1,minWidth:120}),Object(g.a)(Object(g.a)({field:"profitOrLoss",headerName:"Voitto/Tappio"},de),{},{editable:!1,minWidth:120})]},je=r(70),ve=(r(229),function(){return Object(m.jsx)(je.b,{style:{paddingLeft:24},className:je.d.toolbarContainer,children:Object(m.jsx)(je.c,{printOptions:{bodyClassName:"printTableStyles",hideToolbar:!0,hideFooter:!0,allColumns:!0}})})}),Oe=function(e){var t=e.rows,r=e.mode;return Object(m.jsx)("div",{style:{width:"100%"},children:Object(m.jsx)(je.a,{sx:{minHeight:700},rows:t,columns:he(r),components:{Toolbar:ve}})})},xe=r(263),ye=function(e){var t=e.header,r=e.content,a=e.footer,n=e.footerSecondary,i=e.contentColor,o=Object(j.a)({typography:{fontSize:14},palette:{background:{paper:"#fff"},text:{primary:"#173A5E",secondary:"#46505A"},action:{active:"#001E3C"}}});return Object(m.jsx)(v.a,{theme:o,children:Object(m.jsxs)(xe.a,{sx:{bgcolor:"background.paper",boxShadow:1,borderRadius:1,p:2,minWidth:350},children:[Object(m.jsx)(xe.a,{sx:{color:"text.secondary"},children:t}),Object(m.jsx)(xe.a,{sx:{color:"text.primary",fontSize:30,fontWeight:"medium"},children:function(e){try{return se("EUR").format(Number(e))}catch(t){return e}}(r)}),Object(m.jsx)(xe.a,{sx:{color:i,display:"inline",fontWeight:"medium",mx:.5},children:a}),Object(m.jsx)(xe.a,{sx:{color:"text.secondary",display:"inline",fontSize:12},children:n})]})})},ke=r(105),ge=r.n(ke),Ce=r(175),we=r.n(Ce),Se=r(174),Ne=r.n(Se);var Te=function(e){var t=function(e){var t=E.a.sortBy(e,(function(e){return new Date(e.date)}));return t.filter((function(e){return"SELL"===e.type})).reduce((function(e,r){return[].concat(Object(C.a)(e),[Ee(t,r)])}),[])}(e).flatMap((function(e){var t,r=E.a.sumBy(e.transactions,(function(e){return e.amountsold})),a=e.transactions.map((function(e){return Object(g.a)(Object(g.a)({},e),{},{transferFee:e.amountsold/r*e.transferFee})})),n=e.transactions[0]?e.transactions[0].transferFee:0,i=E.a.sumBy(a,(function(e){return e.transferFee}));n!==i&&console.warn("Amount of fees for do not match for ".concat(null===(t=e.transactions[0])||void 0===t?void 0:t.ticker,": ").concat(n," and ").concat(i));return a}));if(0===t.length)throw new Error("No SELL transactions found. Have you sold any asset?");return t},Ee=function(e,t){var r=0,a=[];if(E.a.orderBy(e,(function(e){return[new Date(e.date),e.type]}),["asc","desc"]).filter((function(e){var r=e.type,a=e.symbol,n=e.date;return"BUY"===r&&a===t.symbol&&n<=t.date})).forEach((function(e){var n=Math.min(t.amount,e.amount);if(0!==n){var i={ticker:t.symbol,buydate:e.date,selldate:t.date,amountsold:n,transferPrice:t.price,profitOrLoss:n*(t.price-e.price),acquisitionPrice:e.price,acquisitionFee:e.transactionFee,transferFee:t.transactionFee};a.push(i),e.amount-=n,t.amount-=n;var o=n*(t.price-e.price);r+=o}})),Math.round(t.amount)>0)throw Error("Amount of sales for ticker ".concat(t.symbol," exceeds the amount of buys by ").concat(t.amount,". In transaction made in ").concat(new Date(t.date).toLocaleString("en-GB",{timeZone:"UTC"})));return{capitalGainPerSellDate:r,transactions:a}},Pe=r(173),Ie=r.n(Pe),Fe=r(3),Ae=function(e){var t=e.rows,r=e.mode,n=e.rawDataAsColumns,i=e.rawDatatSetCallback,o=Object(a.useState)({}),c=Object(w.a)(o,2),s=c[0],u=c[1];return Object(a.useEffect)((function(){var e;if(null!==s&&void 0!==s&&null!==(e=s.row)&&void 0!==e&&e.id){var t=n.find((function(e){return e.id===s.row.id})),r=Object(g.a)(Object(g.a)({},t),{},Object(Fe.a)({},s.field,s.value.trim())),a=n.map((function(e){return e.id===r.id?r:e}));i(a)}}),[s]),Object(m.jsx)(je.a,{sx:{height:700,"& .font-tabular-nums":{fontVariantNumeric:"tabular-nums"},width:1,"& .MuiDataGrid-cell--editing":{bgcolor:"rgb(255,215,115, 0.19)",color:"#1a3e72"},"& .Mui-error":{bgcolor:function(e){return"rgb(126,10,15, ".concat("dark"===e.palette.mode?0:.1,")")},color:function(e){return"dark"===e.palette.mode?"#ff4343":"#750f0f"}}},rows:t,columns:"CRYPTO"===r?me:fe,onCellEditCommit:function(e){u(e)}})},De=[X,$],Re=[Z,_],Be=function(e){var t=e.mode,r=Object(a.useState)(400),n=Object(w.a)(r,2),i=n[0],u=n[1],l=Object(a.useState)([]),p=Object(w.a)(l,2),d=p[0],O=p[1],x=Object(a.useState)(!1),y=Object(w.a)(x,2),S=y[0],T=y[1],F=Object(a.useState)([]),A=Object(w.a)(F,2),D=A[0],B=A[1],L=Object(a.useState)([]),W=Object(w.a)(L,2),M=W[0],V=W[1],Y=Object(a.useState)({}),K=Object(w.a)(Y,2),z=K[0],q=K[1],H=Object(a.useState)([]),J=Object(w.a)(H,2),Z=J[0],_=J[1],X=Object(a.useState)(""),$=Object(w.a)(X,2),ee=$[0],te=$[1],re=Object(a.useState)(""),ae=Object(w.a)(re,2),ne=ae[0],oe=ae[1],ce=Object(a.useState)(!1),se=Object(w.a)(ce,2),ue=se[0],le=se[1],pe=Object(a.useState)({}),de=Object(w.a)(pe,2),be=de[0],fe=de[1];Object(a.useEffect)((function(){Object(k.a)(N.a.mark((function e(){var r,a,n,i,o,c,s;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(d.length>0)){e.next=9;break}return e.next=3,Q(d,"CRYPTO"===t?De:Re);case 3:r=e.sent,a=E.a.uniqBy(r.filter((function(e){return!e.Error})),(function(e){return e.fileName})),(n=E.a.uniqBy(r.filter((function(e){return e.Error})),(function(e){return e.fileName}))).length>0&&a.length!==n.length&&(i=n.find((function(e){return!a.map((function(e){return e.fileName})).includes(e.fileName)})),console.log("found error",i),(o=null!==i&&void 0!==i&&i.Error?i.Error.message:"").toString().includes("All headers not found in the provided")?(console.error("Debug Parser error: ",o),te("Error loading headers in ".concat(null===i||void 0===i?void 0:i.fileName," Are you tryin to parse in the wrong site?"))):"malformed URI sequence"===o?(console.error("Debug Parser error: ",o),te("Encoding error while trying to parse file ".concat(null===i||void 0===i?void 0:i.fileName," are you in the correct place?"))):o.startsWith("Invalid")?(te("Parser error while trying to parse file ".concat(null===i||void 0===i?void 0:i.fileName," are you in the correct place?")),console.error("Debug Parser error: ",o)):(console.error("Debug error in file ".concat(null===i||void 0===i?void 0:i.fileName,": ").concat(o)),te(o))),a.length>0&&(c=r.filter((function(e){return e.rows})),B(Object(C.a)(D.concat.apply(D,Object(C.a)(c.map((function(e){return e.rows})))))),V(Object(C.a)(D.concat.apply(D,Object(C.a)(c.map((function(e){return e.rows})))))),s=Object.assign.apply(Object,[z].concat(Object(C.a)(r.map((function(e){return e.orig}))))),console.log("nauraa",s),q(s),T(!0)),O([]);case 9:case"end":return e.stop()}}),e)})))()}),[d]),Object(a.useEffect)((function(){var e=D.find((function(e){var t;return"EUR"!==(null===e||void 0===e||null===(t=e.kokonaissumma)||void 0===t?void 0:t.split(" ")[1])&&("BUY"===e.operation||"SELL"===e.operation)}));le(!!e&&D.length>0)}),[D]),Object(a.useEffect)((function(){}),[z]),Object(a.useEffect)((function(){ee.includes("In trancactions made in")&&le(!0)}),[ee]);var me=Object(j.a)({typography:{fontSize:14}});return Object(m.jsxs)(v.a,{theme:me,children:[Object(m.jsx)(c.a,{styles:{ul:{margin:0,padding:0,listStyle:"none"}}}),Object(m.jsx)(o.a,{}),Object(m.jsxs)(s.a,{component:"main",sx:{pt:8,pb:4},children:[Object(m.jsxs)(f.a,{direction:"column",justifyContent:"center",alignItems:"center",spacing:3,width:"sm",children:[Object(m.jsx)(b.a,{component:"h1",variant:"h3",align:"center",color:"text.primary",gutterBottom:!0,sx:{fontWeight:"bold",pt:8},children:"VEROTUNKKI"}),Object(m.jsx)(b.a,{alignSelf:"center",align:"center",variant:"h6",sx:{pt:0},component:"p",children:"CRYPTO"===t?"Virtuaalivaluutat":"Arvopaperit"}),ee&&Object(m.jsx)(P.a,{severity:"error",children:ee}),0===Z.length&&Object(m.jsx)(R,{zoneHeight:i,handleFiles:function(e){return O([].concat(Object(C.a)(d),Object(C.a)(e)))}}),Z.length>0&&Object(m.jsxs)(f.a,{direction:"column",alignItems:"center",justifyContent:"center",spacing:2,sx:{pb:4},children:[Object(m.jsxs)(f.a,{direction:"row",alignItems:"center",justifyContent:"center",spacing:2,children:[Object(m.jsx)(ye,{header:"Gross Capital Gain",content:be.capitalGains.toFixed(2),footer:"Gains",footerSecondary:"before losses and fees",contentColor:"success.light"}),Object(m.jsx)(ye,{header:"Gross Capital Loss",content:be.capitalLosses.toFixed(2),footer:"Losses",footerSecondary:"before gains and fees",contentColor:"error.light"})]}),Object(m.jsxs)(f.a,{direction:"row",alignItems:"center",justifyContent:"center",spacing:2,children:[Object(m.jsx)(ye,{header:"Transaction Fees",content:be.transactionTotal.toFixed(2),footer:"Fees",footerSecondary:"acquisition and transfer Fees",contentColor:"error.light"}),Object(m.jsx)(ye,{header:"Net Capital Gain",content:be.netProfit.toFixed(2),footer:"Total",footerSecondary:"Gains with fees and losses",contentColor:be.netProfit>0?"success.light":"error.light"})]})]}),Object(m.jsx)(b.a,{alignSelf:"flex-start",sx:{pl:4},component:"p",children:"CRYPTO"===t?"Tuetut l\xe4hteet: Coinbase, Coinbase Pro":"Tuetut l\xe4hteet: Nordnet, Degiro"}),ne&&Object(m.jsx)(P.a,{severity:"error",children:ne}),ue&&Object(m.jsxs)(f.a,{direction:"row",alignItems:"flex-end",justifyContent:"center",spacing:2,sx:{pb:1},children:[Object(m.jsxs)(f.a,{direction:"column",alignItems:"center",justifyContent:"center",spacing:2,children:[Object(m.jsxs)(P.a,{severity:"warning",children:["You have made transactions that have not been traded in EUR. Do you want to use an ",Object(m.jsx)("strong",{children:"external API"})," to fetch the currency info?"]}),Object(m.jsx)(P.a,{severity:"info",children:"Note that if the error originated from Coinbase Pro, the currency transfer needs to be converted in to one buy and sell operation."})]}),Object(m.jsx)("div",{style:{paddingBottom:"4px"},children:Object(m.jsx)(I.a,{variant:"contained",sx:{minWidth:"140px",minHeight:"42px"},onClick:function(){Object(k.a)(N.a.mark((function e(){var t,r;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=[],e.next=3,Promise.all(M.map(function(){var e=Object(k.a)(N.a.mark((function e(r){var a,n,i,o,c,s,u,l,p;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=[],"BUY"!==r.operation&&"SELL"!==r.operation||"EUR"===r.kokonaissumma.split(" ")[1]){e.next=22;break}return o=U()(r.paivays).format("YYYY-MM-DD"),e.next=5,Ie.a.get("https://api.coinbase.com/v2/prices/".concat(r.tuote,"-EUR/spot?date=").concat(o));case 5:return e.next=7,e.sent.data.data;case 7:if(e.t1=n=e.sent,e.t0=null===e.t1,e.t0){e.next=11;break}e.t0=void 0===n;case 11:if(!e.t0){e.next=15;break}e.t2=void 0,e.next=16;break;case 15:e.t2=n.amount;case 16:c=e.t2,s=Number(r.kulut.split(" ")[0])/Number(r.kokonaissumma.split(" ")[0]),u=c*r.maara,l=u*s,a.push(Object(g.a)(Object(g.a)({},r),{},{kurssi:"".concat(c," EUR"),kulut:"".concat(l," EUR"),kokonaissumma:"".concat(u-l," EUR")})),null!==(i=z.CoinbasePro)&&void 0!==i&&i.find((function(e){return e.id===r.id}))&&t.push(Object(g.a)(Object(g.a)({},r),{},{operation:"BUY",id:Object(G.a)(10),tuote:"".concat(r.arvo.split(" ")[1]),kurssi:"".concat(c," EUR"),kulut:"".concat(0," EUR"),kokonaissumma:"".concat(u-l," EUR")}));case 22:return p=a.find((function(e){return e.id===r.id})),e.abrupt("return",p||r);case 24:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 3:r=e.sent,V(Object(C.a)(r.concat(t))),B(Object(C.a)(r.concat(t))),le(!1),te("");case 8:case"end":return e.stop()}}),e)})))()},endIcon:Object(m.jsx)(Ne.a,{}),children:"I accept"})})]}),S&&!ue&&Object(m.jsxs)(f.a,{direction:"row",spacing:2,children:[Object(m.jsx)(I.a,{variant:"outlined",onClick:function(){O([]),B([]),V([]),q({}),T(!1),u(400),_([])},startIcon:Object(m.jsx)(ge.a,{}),children:"Poistha"}),Object(m.jsx)(I.a,{disabled:Z.length>0,onClick:function(){try{console.log("raw",D),console.log("raw2",z);var e=function(e,t){var r=e.filter((function(e){return("CONVERT"===e.operation||"COINBASE EARN"===e.operation||"RECEIVE"===e.operation)&&t.Coinbase.map((function(e){return e.id})).includes(e.id)})),a=[];r.forEach((function(e){var r,n=null===(r=t.Coinbase)||void 0===r?void 0:r.find((function(t){return t.id===e.id}));if("CONVERT"===(null===n||void 0===n?void 0:n.TransactionType)){var i=n.Notes.split(" "),o=Number(i[4]),c=i[5];a.push(Object(g.a)(Object(g.a)({},n),{},{TransactionType:"SELL",id:Object(G.a)(10),Fees:0,Total:n.Total-n.Fees})),a.push(Object(g.a)(Object(g.a)({},n),{},{TransactionType:"BUY",id:Object(G.a)(10),Asset:c,QuantityTransacted:o,SpotPriceatTransaction:n.Subtotal/o}))}else("COINBASE EARN"===(null===n||void 0===n?void 0:n.TransactionType)||"RECEIVE"===(null===n||void 0===n?void 0:n.TransactionType))&&a.push(Object(g.a)(Object(g.a)({},n),{},{TransactionType:"BUY"}))}));var n=ie(a);return e.concat(n||[]).filter((function(e){return"BUY"===e.operation||"SELL"===e.operation})).map((function(e){return{symbol:e.tuote,date:e.paivays,price:Math.abs(Number(e.kurssi.split(" ")[0])),amount:Math.abs(e.maara),type:e.operation,transactionFee:Math.abs(Number(e.kulut.split(" ")[0]))}}))}(D,z),t=Te(e);_(t.map((function(e,t){return Object(g.a)(Object(g.a)({},e),{},{buydate:new Date(e.buydate),selldate:new Date(e.selldate),transferFee:"".concat(Number(e.transferFee)," EUR"),profitOrLoss:"".concat(Number(e.profitOrLoss)," EUR"),id:t})}))),fe({capitalGains:E.a.sumBy(t,(function(e){return e.profitOrLoss>0?e.profitOrLoss:0})),capitalLosses:E.a.sumBy(t,(function(e){return e.profitOrLoss<0?e.profitOrLoss:0})),transactionTotal:E.a.sumBy(t,(function(e){return Math.abs(e.transferFee)+Math.abs(e.acquisitionFee)})),netProfit:E.a.sumBy(t,(function(e){return e.profitOrLoss-(Math.abs(e.transferFee)+Math.abs(e.acquisitionFee))}))})}catch(r){oe(r.message)}},variant:"contained",endIcon:Object(m.jsx)(we.a,{}),children:"Laske"})]}),S&&0===Z.length&&Object(m.jsx)("div",{style:{width:"100%"},children:Object(m.jsx)(Ae,{rows:D,mode:t,rawDataAsColumns:M,rawDatatSetCallback:function(e){return V(e)}})}),Z.length>0&&Object(m.jsx)(Oe,{rows:Z,mode:t})]}),Object(m.jsx)(h,{})]})]})};i.a.render(Object(m.jsx)(y.a,{basename:"",children:Object(m.jsxs)(u.c,{children:[Object(m.jsx)(u.a,{path:"/",element:Object(m.jsx)(x,{})}),Object(m.jsx)(u.a,{path:"securities",element:Object(m.jsx)(Be,{mode:"SECURITY"})}),Object(m.jsx)(u.a,{path:"crypto",element:Object(m.jsx)(Be,{mode:"CRYPTO"})})]})}),document.getElementById("root"))}},[[249,1,2]]]);
//# sourceMappingURL=main.54a8e6d8.chunk.js.map