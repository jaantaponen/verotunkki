(this.webpackJsonpverohommeli=this.webpackJsonpverohommeli||[]).push([[0],{229:function(e,t,a){},249:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a(58),i=a.n(n),o=a(325),c=a(252),s=a(336),u=a(20),l=a(337),d=a(338),p=a(339),b=a(335),f=a(322),m=a(2),j=function(){return Object(m.jsxs)(f.a,{direction:"column",justifyContent:"center",alignItems:"center",spacing:1,width:"sm",sx:{pt:1},children:[Object(m.jsx)(b.a,{variant:"body2",sx:{pt:4},color:"text.secondary",align:"center",children:"Tarkista tiedot aina itse virheiden varalta."}),Object(m.jsx)(b.a,{variant:"body2",sx:{pt:0},color:"text.secondary",align:"center",children:"Olet itse vastuussa omista veroistasi."}),Object(m.jsx)(b.a,{variant:"body2",sx:{pt:0},color:"text.secondary",align:"center",children:"Sivustolle l\xe4hett\xe4mi\xe4si tiedostoja k\xe4sitell\xe4\xe4n vain paikallisesti selaimessasi."}),Object(m.jsxs)(b.a,{variant:"body2",sx:{pt:4},color:"text.secondary",align:"center",children:["Huomasitko virheen tai sivusti ei toimi mielest\xe4si oikein? Ilmoita ongelmastasi\xa0",Object(m.jsx)(p.a,{href:"https://github.com/jaantaponen/verotunkki/issues/new",children:"t\xe4\xe4ll\xe4"})]}),Object(m.jsxs)(b.a,{variant:"body2",sx:{pt:0},color:"text.secondary",align:"center",children:["Copyright \xa9 ",Object(m.jsx)(p.a,{color:"inherit",href:"https://verotunkki.fi/",children:"Verotunkki"})," ",(new Date).getFullYear(),"."]})]})},h=a(177),v=a(343),O=a(340),x=function(){var e=Object(u.f)(),t=Object(h.a)({typography:{fontSize:14}});return Object(m.jsxs)(v.a,{theme:t,children:[Object(m.jsx)(c.a,{styles:{ul:{margin:0,padding:0,listStyle:"none"}}}),Object(m.jsx)(o.a,{}),Object(m.jsx)(s.a,{component:"main",maxWidth:"sm",sx:{height:"100vh",pt:8,pb:4},children:Object(m.jsxs)(f.a,{direction:"column",justifyContent:"space-between",alignItems:"space-between",sx:{height:"100%",pt:0,pb:2},children:[Object(m.jsxs)(f.a,{direction:"column",justifyContent:"center",alignItems:"center",spacing:6,width:"sm",children:[Object(m.jsx)(b.a,{component:"h1",variant:"h3",align:"center",color:"text.primary",gutterBottom:!0,sx:{fontWeight:"bold",pt:8},children:"VEROTUNKKI"}),Object(m.jsx)(b.a,{alignSelf:"center",align:"center",variant:"h6",sx:{pt:3},component:"p",children:"Verotunkki laskee puolestasi luovutusvoitot ja -tappiot, ja ulostaa verottajayhteensopivan reportin."}),Object(m.jsx)(b.a,{alignSelf:"center",variant:"h6",component:"p",sx:{pt:2},children:"Valitse verotettavan tulon tyyppi:"}),Object(m.jsx)(l.a,{sx:{width:450},onClick:function(){e("/crypto")},children:Object(m.jsx)(O.a,{children:Object(m.jsxs)(d.a,{children:[Object(m.jsx)(b.a,{gutterBottom:!0,variant:"h5",component:"div",children:"Virtuaalivaluutat"}),Object(m.jsx)(b.a,{variant:"body2",color:"text.secondary",children:"Perus hyv\xe4 Ethereum."}),Object(m.jsxs)(b.a,{variant:"body2",color:"text.secondary",children:["Tuetut l\xe4hteet: ",Object(m.jsx)("b",{children:"Coinbase, Coinbase Pro"})]})]})})}),Object(m.jsx)(l.a,{sx:{width:450},onClick:function(){e("/securities")},children:Object(m.jsx)(O.a,{children:Object(m.jsxs)(d.a,{children:[Object(m.jsx)(b.a,{gutterBottom:!0,variant:"h5",component:"div",children:"Arvopaperit"}),Object(m.jsx)(b.a,{variant:"body2",color:"text.secondary",children:"Osakkeet ETF:t, rahastot ja muut arvopaperit."}),Object(m.jsxs)(b.a,{variant:"body2",color:"text.secondary",children:["Tuetut l\xe4hteet: ",Object(m.jsx)("b",{children:"Degiro, Nordnet"})]})]})})})]}),Object(m.jsx)(j,{})]})})]})},y=a(130),k=a(3),g=a(27),C=a(12),w=a(16),S=a(9),T=a(15),E=a.n(T),N=a(26),P=a.n(N),I=a(331),F=a(71),A=a(176),R=a(171),D=a.n(R),L=function(e){var t=e.zoneHeight,a=e.handleFiles;return Object(m.jsx)(s.a,{sx:{pt:4,pb:3,width:"100%","& .MuiDropzoneArea-textContainer":{color:"black"},"& .MuiDropzoneArea-text":{paddingTop:t>200?8:4,fontSize:20},"& .MuiDropzoneArea-root":{height:t}},children:Object(m.jsx)(A.a,{acceptedFiles:["text/x-csv","text/plain","application/vnd.ms-excel","application/x-csv","application/csv","text/csv","text/comma-separated-values","text/x-comma-separated-values","text/tab-separated-values"],onAdd:a,onDelete:function(e){return console.log("Removed File:",e)},onAlert:function(e,t){console.log("".concat(t,": ").concat(e))},Icon:D.a,dropzoneText:t>200?"Pudota CSV-tiedostoja t\xe4h\xe4n":"Pudota lis\xe4\xe4 CSV-tiedostoja t\xe4h\xe4n",fileObjects:[]})})},U=a(109),B={"P\xe4iv\xe4ys":"date",Aika:"time",Tuote:"security",ISIN:"ISIN",Reference:"reference",Venue:"venue",Quantity:"quantity",Kurssi:"rate","Kurssi-valuutta":"rateCurrency","Markkina-arvo":"marketValue","Markkina-arvo-valuutta":"marketValueCurrency",Value:"value","Value-valuutta":"valueCurrency",Vaihtokurssi:"exchangeRate","Transaction costs":"transactionCosts","Transaction costs-valuutta":"transactionCostsCurrency",Kokonaissumma:"totalAmount","Kokonaissumma-valuutta":"totalAmountCurrency","Order ID":"orderId"},M=function(e){if(B[e])return B[e]},V=a(51),Y=a.n(V),W=(a(226),["portfolio","tradeid","product","side","createdat","size","sizeunit","price","fee","total","pricefeetotalunit"]),K=["Timestamp","TransactionType","Asset","QuantityTransacted","SpotPriceCurrency","SpotPriceatTransaction","Subtotal","Total","Fees","Notes"],z=["date","time","security","ISIN","reference","venue","quantity","rate","rateCurrency","marketValue","marketValueCurrency","value","valueCurrency","exchangeRate","transactionCosts","transactionCostsCurrency","totalAmount","totalAmountCurrency","orderId","datetime"],G=["Id","Kirjauspaiva","Kauppapaiva","Maksupaiva","Salkku","Tapahtumatyyppi","Arvopaperi","Instrumenttityyppi","ISIN","Maara","Kurssi","Korko","Kokonaiskulut","KokonaiskulutValuutta","Summa","Valuutta","Hankintaarvo","Tulos","Kokonaismaara","Saldo","Vaihtokurssi","Tapahtumateksti","Mitatointipaiva","Laskelma","Vahvistusnumero","Valityspalkkio","ValityspalkkioValuutta"],H=a(94),q=function(e){for(var t=[],a=0;a<e.length;a+=2)t.push(e.charCodeAt(a)|e.charCodeAt(a+1)<<8);return String.fromCharCode.apply(String,t)},Q=function(){var e=Object(g.a)(E.a.mark((function e(t,a){var r,n,i,o,c,s,u;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=[],i=0;case 2:if(!(i<a.length)){e.next=19;break}return e.prev=3,o=t[0].data?t[0].data.toString().split(",")[1]:"",c="getDataNordnet"===a[i].name?q(atob(o)):(l=o,decodeURIComponent(escape(window.atob(l)))),s=c.toString(),e.next=9,a[i](s);case 9:return u=e.sent,e.abrupt("return",u);case 13:e.prev=13,e.t0=e.catch(3),n.push(e.t0);case 16:i++,e.next=2;break;case 19:return e.abrupt("return",[{Source:"Error",Error:null!==(r=n.find((function(e){return e instanceof TypeError})))&&void 0!==r?r:n[0]}]);case 20:case"end":return e.stop()}var l}),e,null,[[3,13]])})));return function(t,a){return e.apply(this,arguments)}}(),J=function(){var e=Object(g.a)(E.a.mark((function e(){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:e.next=6;break;case 3:e.t0=e.sent.parse,e.next=9;break;case 6:return e.next=8,a.e(3).then(a.bind(null,346));case 8:e.t0=e.sent.parse;case 9:return e.abrupt("return",e.t0);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Z=function(){var e=Object(g.a)(E.a.mark((function e(t){var a,r;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ee(t);case 2:return a=e.sent,r=te(a),e.abrupt("return",{orig:{Degiro:a},rows:r});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),_=function(){var e=Object(g.a)(E.a.mark((function e(t){var a,r;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ae(t);case 2:return a=e.sent,r=re(a),e.abrupt("return",{orig:{Nordnet:a},rows:r});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),X=function(){var e=Object(g.a)(E.a.mark((function e(t){var a,r;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ne(t);case 2:return a=e.sent,r=ie(a),e.abrupt("return",{orig:{Coinbase:a},rows:r});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),$=function(){var e=Object(g.a)(E.a.mark((function e(t){var a,r;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,oe(t);case 2:return a=e.sent,r=ce(a),e.abrupt("return",{orig:{CoinbasePro:a},rows:r});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ee=function(){var e=Object(g.a)(E.a.mark((function e(t){var a,r,n,i,o,c,s,u,l,d,p;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="",e.next=3,J();case 3:r=e.sent,n=r(t,{cast:function(e,t){return t.header?""===e?M("".concat(a,"-valuutta")):(a=e,M(e)):String(e)},columns:!0,trim:!0}),i=[],o=!1,c=!1,e.prev=8,u=Object(U.a)(n);case 10:return e.next=12,u.next();case 12:if(!(o=!(l=e.sent).done)){e.next=18;break}d=l.value,i.push(d);case 15:o=!1,e.next=10;break;case 18:e.next=24;break;case 20:e.prev=20,e.t0=e.catch(8),c=!0,s=e.t0;case 24:if(e.prev=24,e.prev=25,!o||null==u.return){e.next=29;break}return e.next=29,u.return();case 29:if(e.prev=29,!c){e.next=32;break}throw s;case 32:return e.finish(29);case 33:return e.finish(24);case 34:if(p=i.map((function(e){return e.datetime=Y()("".concat(e.date,"-").concat(e.time),"DD-MM-YYYY-HH-mm").toISOString(),e})),!i.every((function(e){return 0!==P.a.difference(P.a.sortBy(z),P.a.sortBy(Object.keys(e))).length}))){e.next=37;break}throw TypeError("All headers not found in the provided Degiro file.");case 37:return e.next=39,Promise.all(p.map(function(){var e=Object(g.a)(E.a.mark((function e(t){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=C.a,e.t1=Object(C.a)({},t),e.t2={},e.next=5,Object(H.a)(10);case 5:return e.t3=e.sent,e.t4={Source:"Degiro",id:e.t3},e.abrupt("return",(0,e.t0)(e.t1,e.t2,e.t4));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 39:return e.abrupt("return",e.sent);case 40:case"end":return e.stop()}}),e,null,[[8,20,24,34],[25,,29,33]])})));return function(t){return e.apply(this,arguments)}}(),te=function(e){return e.map((function(e){return{id:e.id,paivays:new Date(e.datetime),tuote:e.security,isin:e.ISIN,arvo:"".concat(e.value," ").concat(e.valueCurrency),maara:e.quantity,kulut:"".concat(e.transactionCosts," ").concat(e.transactionCostsCurrency),kurssi:"".concat(e.rate," ").concat(e.rateCurrency),kokonaissumma:"".concat(e.totalAmount," ").concat(e.totalAmountCurrency),operation:e.quantity>0?"BUY":"SELL"}}))},ae=function(){var e=Object(g.a)(E.a.mark((function e(t){var a,r,n,i,o,c,s,u,l;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,J();case 2:a=e.sent,r=a(t,{delimiter:["\t"],columns:!0,trim:!0,cast:function(e,t){if(t.header){var a=e;return a.includes("\xe4")&&(a=a.replace(/\xe4/g,"a")),a.includes("\xf6")&&(a=a.replace(/\xf6/g,"o")),a.includes("-")&&(a=a.replace(/-/g,"")),a.replace(/\s/g,"")}var r=t.column;return"Maara"===r||"Kurssi"===r||"Valityspalkkio"===r||"Summa"===r||"Kokonaiskulut"===r||"Kokonaismaara"===r?Number.parseFloat(e.replace(/,/g,".")):"Kirjauspaiva"===r||"Kauppapaiva"===r||"Maksupaiva"===r?Y()(e,"YYYY-MM-DD").toDate():String(e)}}),n=[],i=!1,o=!1,e.prev=7,s=Object(U.a)(r);case 9:return e.next=11,s.next();case 11:if(!(i=!(u=e.sent).done)){e.next=17;break}l=u.value,n.push(l);case 14:i=!1,e.next=9;break;case 17:e.next=23;break;case 19:e.prev=19,e.t0=e.catch(7),o=!0,c=e.t0;case 23:if(e.prev=23,e.prev=24,!i||null==s.return){e.next=28;break}return e.next=28,s.return();case 28:if(e.prev=28,!o){e.next=31;break}throw c;case 31:return e.finish(28);case 32:return e.finish(23);case 33:if(!n.every((function(e){return 0!==P.a.difference(G,P.a.sortBy(Object.keys(e))).length}))){e.next=35;break}throw TypeError("All headers not found in the provided Nordnet file.");case 35:return e.next=37,Promise.all(n.map(function(){var e=Object(g.a)(E.a.mark((function e(t){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=C.a,e.t1=Object(C.a)({},t),e.t2={},e.next=5,Object(H.a)(10);case 5:return e.t3=e.sent,e.t4={Source:"Nordnet",id:e.t3},e.abrupt("return",(0,e.t0)(e.t1,e.t2,e.t4));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 37:return e.abrupt("return",e.sent);case 38:case"end":return e.stop()}}),e,null,[[7,19,23,33],[24,,28,32]])})));return function(t){return e.apply(this,arguments)}}(),re=function(e){return e.map((function(e){return{id:e.id,paivays:new Date(e.Kauppapaiva),tuote:e.Arvopaperi,isin:e.ISIN,arvo:"".concat(e.Summa," ").concat(e.Valuutta),maara:e.Maara,kulut:e.Kokonaiskulut.toString(),kurssi:"".concat(e.Kurssi," ").concat(e.Valuutta),kokonaissumma:"".concat(e.Summa-e.Kokonaiskulut," ").concat(e.Valuutta),operation:e.Tapahtumatyyppi}}))},ne=function(){var e=Object(g.a)(E.a.mark((function e(t){var a,r,n;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=P.a.findIndex(null===t||void 0===t?void 0:t.split("\n"),(function(e){return null===e||void 0===e?void 0:e.startsWith("Timestamp,Transaction")})),e.next=3,J();case 3:if(r=e.sent,!(n=r(t,{cast:function(e,t){return t.header?e.includes("(")?e.split("(")[0].replace(/\s/g,""):e.replace(/\s/g,""):(Y.a.tz,"Timestamp"===t.column?Y()(e,"YYYY-MM-DD-HH-mm-ss").toISOString():"TransactionType"===t.column?e.toUpperCase():String(e))},columns:!0,from_line:a>0?a+1:1,trim:!0})).every((function(e){return 0!==P.a.difference(K,P.a.sortBy(Object.keys(e))).length}))){e.next=7;break}throw TypeError("All headers not found in the provided Coinbase file.");case 7:return e.next=9,Promise.all(n.map(function(){var e=Object(g.a)(E.a.mark((function e(t){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=C.a,e.t1=Object(C.a)({},t),e.t2={},e.next=5,Object(H.a)(10);case 5:return e.t3=e.sent,e.t4={Source:"Coinbase",id:e.t3},e.abrupt("return",(0,e.t0)(e.t1,e.t2,e.t4));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 9:return e.abrupt("return",e.sent);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ie=function(e){return e.map((function(e){var t="".concat(e.Subtotal?Number(e.Subtotal):e.QuantityTransacted*e.SpotPriceatTransaction," ").concat(e.SpotPriceCurrency);return{id:e.id,paivays:new Date(e.Timestamp),tuote:e.Asset,arvo:t,maara:e.QuantityTransacted,kulut:"".concat(Number(e.Fees)?Number(e.Fees):0," ").concat(e.SpotPriceCurrency),kurssi:"".concat(e.SpotPriceatTransaction," ").concat(e.SpotPriceCurrency),kokonaissumma:"".concat(Number(e.Total?e.Total:0)," ").concat(e.SpotPriceCurrency),operation:e.TransactionType}}))},oe=function(){var e=Object(g.a)(E.a.mark((function e(t){var a,r,n,i,o,c,s,u,l;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,J();case 2:a=e.sent,r=a(t,{cast:function(e,t){return t.header?e.includes("/")?e.replace(/\//g,"").replace(/\s/g,""):e.replace(/\s/g,""):"createdat"===t.column?new Date(e).toISOString():String(e)},columns:!0,trim:!0}),n=[],i=!1,o=!1,e.prev=7,s=Object(U.a)(r);case 9:return e.next=11,s.next();case 11:if(!(i=!(u=e.sent).done)){e.next=17;break}l=u.value,n.push(l);case 14:i=!1,e.next=9;break;case 17:e.next=23;break;case 19:e.prev=19,e.t0=e.catch(7),o=!0,c=e.t0;case 23:if(e.prev=23,e.prev=24,!i||null==s.return){e.next=28;break}return e.next=28,s.return();case 28:if(e.prev=28,!o){e.next=31;break}throw c;case 31:return e.finish(28);case 32:return e.finish(23);case 33:if(!n.every((function(e){return 0!==P.a.difference(P.a.sortBy(W),P.a.sortBy(Object.keys(e))).length}))){e.next=35;break}throw TypeError("All headers not found in the provided Coinbase Pro file.");case 35:return e.next=37,Promise.all(n.map(function(){var e=Object(g.a)(E.a.mark((function e(t){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=C.a,e.t1=Object(C.a)({},t),e.t2={},e.t3=t.product.split("-")[0],e.t4="EUR"!==t.pricefeetotalunit?"Invalid currency detected":void 0,e.next=7,Object(H.a)(10);case 7:return e.t5=e.sent,e.t6={Source:"CoinbasePro",product:e.t3,Error:e.t4,id:e.t5},e.abrupt("return",(0,e.t0)(e.t1,e.t2,e.t6));case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 37:return e.abrupt("return",e.sent);case 38:case"end":return e.stop()}}),e,null,[[7,19,23,33],[24,,28,32]])})));return function(t){return e.apply(this,arguments)}}(),ce=function(e){return e.map((function(e){var t;return{id:e.id,paivays:e.createdat,tuote:e.product,arvo:"".concat(e.size*e.price," ").concat(e.pricefeetotalunit),maara:e.size,kulut:"".concat(null!==(t=e.fee)&&void 0!==t?t:e.fee," ").concat(e.pricefeetotalunit),kurssi:"".concat(e.price," ").concat(e.pricefeetotalunit),kokonaissumma:"".concat(e.total," ").concat(e.pricefeetotalunit),operation:e.side}}))},se=function(e){return new Intl.NumberFormat("en-GB",{style:"currency",currency:e})},ue=function(e){return"BUY"===e||"SELL"===e},le=function(e){var t;return 2===(null!==(t=String(e))&&void 0!==t?t:"").split(" ").length},de={type:"string",valueFormatter:function(e){var t=e.value,a=String(t)?String(t):"0 EUR",r=2===a.split(" ").length?a.split(" "):"0 EUR";try{return se(r[1]).format(Number(r[0]))}catch(n){return a}},cellClassName:"font-tabular-nums"},pe={type:"number",valueFormatter:function(e){var t=e.value,a=String(t)?String(t):"0 EUR",r=2===a.split(" ").length?a.split(" "):"0 EUR";try{return se(r[1]).format(Number(r[0]))}catch(n){return new Intl.NumberFormat("en-GB",{style:"currency",currency:"EUR"}).format(Number(a))}},cellClassName:"font-tabular-nums"},be={type:"dateTime",valueFormatter:function(e){var t=e.value;return new Date(t).toLocaleString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"})},cellClassName:"font-tabular-nums"},fe=[Object(C.a)(Object(C.a)({field:"paivays",headerName:"Paivays"},be),{},{editable:!0,minWidth:180}),{field:"operation",headerName:"Operaatio",type:"string",editable:!0,minWidth:40,preProcessEditCellProps:function(e){var t=ue(e.props.value);return Object(C.a)(Object(C.a)({},e.props),{},{error:!t})}},{field:"tuote",headerName:"Tuote",type:"string",editable:!0,minWidth:240},Object(C.a)(Object(C.a)({field:"arvo",headerName:"Arvo",editable:!0,minWidth:120},de),{},{preProcessEditCellProps:function(e){var t=le(e.props.value);return Object(C.a)(Object(C.a)({},e.props),{},{error:!t})}}),{field:"maara",headerName:"M\xe4\xe4r\xe4 (kpl)",type:"number",editable:!0,minWidth:50},Object(C.a)(Object(C.a)({field:"kurssi",headerName:"Kurssi",editable:!0,minWidth:120},de),{},{preProcessEditCellProps:function(e){var t=le(e.props.value);return Object(C.a)(Object(C.a)({},e.props),{},{error:!t})}}),Object(C.a)(Object(C.a)({field:"kulut",headerName:"Kulut",type:"number",editable:!0,minWidth:110},de),{},{preProcessEditCellProps:function(e){var t=le(e.props.value);return Object(C.a)(Object(C.a)({},e.props),{},{error:!t})}}),Object(C.a)(Object(C.a)({field:"kokonaissumma",headerName:"Kokonaissumma",editable:!0,minWidth:170},de),{},{preProcessEditCellProps:function(e){var t=le(e.props.value);return Object(C.a)(Object(C.a)({},e.props),{},{error:!t})}})],me=[Object(C.a)(Object(C.a)({field:"paivays",headerName:"Paivays"},be),{},{editable:!0,minWidth:180}),{field:"operation",headerName:"Operaatio",type:"string",editable:!0,minWidth:140,preProcessEditCellProps:function(e){var t=ue(e.props.value);return Object(C.a)(Object(C.a)({},e.props),{},{error:!t})}},{field:"tuote",headerName:"Tuote",type:"string",editable:!0,minWidth:120},Object(C.a)(Object(C.a)({field:"arvo",headerName:"Arvo",editable:!0,minWidth:120},de),{},{preProcessEditCellProps:function(e){var t=le(e.props.value);return Object(C.a)(Object(C.a)({},e.props),{},{error:!t})}}),{field:"maara",headerName:"M\xe4\xe4r\xe4 (kpl)",type:"number",editable:!0,minWidth:120},Object(C.a)(Object(C.a)({field:"kurssi",headerName:"Kurssi",editable:!0,minWidth:120},de),{},{preProcessEditCellProps:function(e){var t=le(e.props.value);return Object(C.a)(Object(C.a)({},e.props),{},{error:!t})}}),Object(C.a)(Object(C.a)({field:"kulut",headerName:"Kulut",type:"number",editable:!0,minWidth:110},de),{},{preProcessEditCellProps:function(e){var t=le(e.props.value);return Object(C.a)(Object(C.a)({},e.props),{},{error:!t})}}),Object(C.a)(Object(C.a)({field:"kokonaissumma",headerName:"Kokonaissumma",editable:!0,minWidth:170},de),{},{preProcessEditCellProps:function(e){var t=le(e.props.value);return Object(C.a)(Object(C.a)({},e.props),{},{error:!t})}})],je=function(e){return[{field:"ticker",headerName:"Tuote",type:"string",editable:!1,minWidth:"CRYPTO"===e?50:250},{field:"buydate",headerName:"Hankintap\xe4iv\xe4",type:"date",editable:!1,minWidth:120},{field:"selldate",headerName:"Luovutusp\xe4iv\xe4",type:"date",editable:!1,minWidth:120},{field:"amountsold",headerName:"Myyty kpl",type:"number",editable:!1,minWidth:50},Object(C.a)({field:"transferPrice",headerName:"Luovutushinta",editable:!1,minWidth:120},pe),Object(C.a)(Object(C.a)({field:"acquisitionPrice",headerName:"Hankintahinta"},pe),{},{editable:!1,minWidth:120}),Object(C.a)(Object(C.a)({field:"acquisitionFee",headerName:"Hankintakulut"},pe),{},{editable:!1,minWidth:120}),Object(C.a)(Object(C.a)({field:"transferFee",headerName:"Luovutuskulut"},pe),{},{editable:!1,minWidth:120}),Object(C.a)(Object(C.a)({field:"profitOrLoss",headerName:"Voitto/Tappio"},pe),{},{editable:!1,minWidth:120})]},he=a(70),ve=(a(229),function(){return Object(m.jsx)(he.b,{style:{paddingLeft:24},className:he.d.toolbarContainer,children:Object(m.jsx)(he.c,{printOptions:{bodyClassName:"printTableStyles",hideToolbar:!0,hideFooter:!0,allColumns:!0}})})}),Oe=function(e){var t=e.rows,a=e.mode;return Object(m.jsx)("div",{style:{width:"100%"},children:Object(m.jsx)(he.a,{sx:{minHeight:700},rows:t,columns:je(a),components:{Toolbar:ve}})})},xe=a(263),ye=function(e){var t=e.header,a=e.content,r=e.footer,n=e.footerSecondary,i=e.contentColor,o=Object(h.a)({typography:{fontSize:14},palette:{background:{paper:"#fff"},text:{primary:"#173A5E",secondary:"#46505A"},action:{active:"#001E3C"}}});return Object(m.jsx)(v.a,{theme:o,children:Object(m.jsxs)(xe.a,{sx:{bgcolor:"background.paper",boxShadow:1,borderRadius:1,p:2,minWidth:350},children:[Object(m.jsx)(xe.a,{sx:{color:"text.secondary"},children:t}),Object(m.jsx)(xe.a,{sx:{color:"text.primary",fontSize:30,fontWeight:"medium"},children:a}),Object(m.jsx)(xe.a,{sx:{color:i,display:"inline",fontWeight:"medium",mx:.5},children:r}),Object(m.jsx)(xe.a,{sx:{color:"text.secondary",display:"inline",fontSize:12},children:n})]})})},ke=a(105),ge=a.n(ke),Ce=a(175),we=a.n(Ce),Se=a(174),Te=a.n(Se);var Ee=function(e){var t=function(e){var t=e.map((function(e){return Object(C.a)({},e)}));return t.filter((function(e){return"SELL"===e.type})).reduce((function(e,a){return[].concat(Object(w.a)(e),[Ne(t,a)])}),[])}(e).flatMap((function(e){var t,a=P.a.sumBy(e.transactions,(function(e){return e.amountsold})),r=e.transactions.map((function(e){return Object(C.a)(Object(C.a)({},e),{},{transferFee:e.amountsold/a*e.transferFee})})),n=e.transactions[0]?e.transactions[0].transferFee:0,i=P.a.sumBy(r,(function(e){return e.transferFee}));n!==i&&console.error("Amount of fees for do not match for ".concat(null===(t=e.transactions[0])||void 0===t?void 0:t.ticker,": ").concat(n," and ").concat(i));return r}));if(0===t.length)throw new Error("No SELL transactions found. Have you sold any asset?");return t},Ne=function(e,t){var a=0,r=[];if(P.a.orderBy(e,(function(e){return[e.date,e.type]}),["asc","desc"]).filter((function(e){var a=e.type,r=e.symbol,n=e.date;return"BUY"===a&&r===t.symbol&&n<=t.date})).forEach((function(e){var n=Math.min(t.amount,e.amount);if(0!==n){var i={ticker:t.symbol,buydate:e.date,selldate:t.date,amountsold:n,transferPrice:t.price,profitOrLoss:n*(t.price-e.price),acquisitionPrice:e.price,acquisitionFee:e.transactionFee,transferFee:t.transactionFee};r.push(i),e.amount-=n,t.amount-=n;var o=n*(t.price-e.price);a+=o}})),Math.round(t.amount)>0)throw Error("Amount of sales for ticker ".concat(t.symbol," exceeds the amount of buys by ").concat(t.amount,". In transaction made in ").concat(new Date(t.date).toLocaleString("en-GB",{timeZone:"UTC"})));return{capitalGainPerSellDate:a,transactions:r}},Pe=a(173),Ie=a.n(Pe),Fe=function(e){var t=e.rows,a=e.mode,n=e.rawDataAsColumns,i=e.rawDatatSetCallback,o=Object(r.useState)({}),c=Object(S.a)(o,2),s=c[0],u=c[1];return Object(r.useEffect)((function(){var e;if(null!==s&&void 0!==s&&null!==(e=s.row)&&void 0!==e&&e.id){var t=n.find((function(e){return e.id===s.row.id})),a=Object(C.a)(Object(C.a)({},t),{},Object(k.a)({},s.field,s.value.trim())),r=n.map((function(e){return e.id===a.id?a:e}));i(r)}}),[s]),Object(m.jsx)(he.a,{sx:{height:700,"& .font-tabular-nums":{fontVariantNumeric:"tabular-nums"},width:1,"& .MuiDataGrid-cell--editing":{bgcolor:"rgb(255,215,115, 0.19)",color:"#1a3e72"},"& .Mui-error":{bgcolor:function(e){return"rgb(126,10,15, ".concat("dark"===e.palette.mode?0:.1,")")},color:function(e){return"dark"===e.palette.mode?"#ff4343":"#750f0f"}}},rows:t,columns:"CRYPTO"===a?me:fe,onCellEditCommit:function(e){u(e)}})},Ae=a(82),Re=[X,$],De=[Z,_],Le=function(e){var t=e.mode,a=Object(r.useState)(400),n=Object(S.a)(a,2),i=n[0],u=n[1],l=Object(r.useState)([]),d=Object(S.a)(l,2),p=d[0],O=d[1],x=Object(r.useState)(!1),y=Object(S.a)(x,2),T=y[0],N=y[1],A=Object(r.useState)([]),R=Object(S.a)(A,2),D=R[0],U=R[1],B=Object(r.useState)([]),M=Object(S.a)(B,2),V=M[0],W=M[1],K=Object(r.useState)({}),z=Object(S.a)(K,2),G=z[0],H=z[1],q=Object(r.useState)([]),J=Object(S.a)(q,2),Z=J[0],_=J[1],X=Object(r.useState)(""),$=Object(S.a)(X,2),ee=$[0],te=$[1],ae=Object(r.useState)(""),re=Object(S.a)(ae,2),ne=re[0],oe=re[1],ce=Object(r.useState)(!1),se=Object(S.a)(ce,2),ue=se[0],le=se[1],de=Object(r.useState)({}),pe=Object(S.a)(de,2),be=pe[0],fe=pe[1];Object(r.useEffect)((function(){Object(g.a)(E.a.mark((function e(){var a,r,n,i,o,c,s;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(p.length>0)){e.next=6;break}return e.next=3,Q(p,"CRYPTO"===t?Re:De);case 3:r=e.sent,null!==(a=r[0])&&void 0!==a&&a.Error?(n=r[0].Error.message).toString().includes("All headers not found")?te("".concat(n," Are you tryin to parse in the wrong site?")):te("malformed URI sequence"===n?"Unable to parse file, is it encoded in a weird format?":n):(i=r.orig,o=Object.keys(i),c=o[0],s=i[c],U(Object(w.a)(D.concat(r.rows))),W(Object(w.a)(D.concat(r.rows))),H(Object(C.a)(Object(C.a)({},G),{},Object(k.a)({},c,s))),N(!0)),O([]);case 6:case"end":return e.stop()}}),e)})))()}),[p]),Object(r.useEffect)((function(){console.log("rowdataa",D);var e=D.find((function(e){var t;return"EUR"!==(null===e||void 0===e||null===(t=e.kokonaissumma)||void 0===t?void 0:t.split(" ")[1])&&("BUY"===e.operation||"SELL"===e.operation)}));le(!!e&&D.length>0)}),[D]),Object(r.useEffect)((function(){}),[G]),Object(r.useEffect)((function(){ee.includes("In trancactions made in")&&le(!0)}),[ee]);var me=Object(h.a)({typography:{fontSize:14}});return Object(m.jsxs)(v.a,{theme:me,children:[Object(m.jsx)(c.a,{styles:{ul:{margin:0,padding:0,listStyle:"none"}}}),Object(m.jsx)(o.a,{}),Object(m.jsxs)(s.a,{component:"main",sx:{pt:8,pb:4},children:[Object(m.jsxs)(f.a,{direction:"column",justifyContent:"center",alignItems:"center",spacing:3,width:"sm",children:[Object(m.jsx)(b.a,{component:"h1",variant:"h3",align:"center",color:"text.primary",gutterBottom:!0,sx:{fontWeight:"bold",pt:8},children:"VEROTUNKKI"}),Object(m.jsx)(b.a,{alignSelf:"center",align:"center",variant:"h6",sx:{pt:0},component:"p",children:"CRYPTO"===t?"Virtuaalivaluutat":"Arvopaperit"}),ee&&Object(m.jsx)(I.a,{severity:"error",children:ee}),0===Z.length&&Object(m.jsx)(L,{zoneHeight:i,handleFiles:function(e){return O([].concat(Object(w.a)(p),Object(w.a)(e)))}}),Z.length>0&&Object(m.jsxs)(f.a,{direction:"column",alignItems:"center",justifyContent:"center",spacing:2,sx:{pb:4},children:[Object(m.jsxs)(f.a,{direction:"row",alignItems:"center",justifyContent:"center",spacing:2,children:[Object(m.jsx)(ye,{header:"Gross Capital Gain",content:be.capitalGains.toFixed(2),footer:"Gains",footerSecondary:"before losses and fees",contentColor:"success.light"}),Object(m.jsx)(ye,{header:"Gross Capital Loss",content:be.capitalLosses.toFixed(2),footer:"Losses",footerSecondary:"before gains and fees",contentColor:"error.light"})]}),Object(m.jsxs)(f.a,{direction:"row",alignItems:"center",justifyContent:"center",spacing:2,children:[Object(m.jsx)(ye,{header:"Transaction Fees",content:be.transactionTotal.toFixed(2),footer:"Fees",footerSecondary:"acquisition and transfer Fees",contentColor:"error.light"}),Object(m.jsx)(ye,{header:"Net Capital Gain",content:be.netProfit.toFixed(2),footer:"Total",footerSecondary:"Gains with fees and losses",contentColor:be.netProfit>0?"success.light":"error.light"})]})]}),Object(m.jsx)(b.a,{alignSelf:"flex-start",sx:{pl:4},component:"p",children:"CRYPTO"===t?"Tuetut l\xe4hteet: Coinbase, Coinbase Pro":"Tuetut l\xe4hteet: Nordnet, Degiro"}),ne&&Object(m.jsx)(I.a,{severity:"error",children:ne}),ue&&Object(m.jsxs)(f.a,{direction:"row",alignItems:"flex-end",justifyContent:"center",spacing:2,sx:{pb:1},children:[Object(m.jsxs)(f.a,{direction:"column",alignItems:"center",justifyContent:"center",spacing:2,children:[Object(m.jsxs)(I.a,{severity:"warning",children:["You have made transactions that have not been traded in EUR. Do you want to use an ",Object(m.jsx)("strong",{children:"external API"})," to fetch the currency info?"]}),Object(m.jsx)(I.a,{severity:"info",children:"Note that if the error originated from Coinbase Pro, the currency transfer needs to be converted in to one buy and sell operation."})]}),Object(m.jsx)("div",{style:{paddingBottom:"4px"},children:Object(m.jsx)(F.a,{variant:"contained",sx:{minWidth:"140px",minHeight:"42px"},onClick:function(){Object(g.a)(E.a.mark((function e(){var t,a;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=[],e.next=3,Promise.all(V.map(function(){var e=Object(g.a)(E.a.mark((function e(a){var r,n,i,o,c,s,u,l,d;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=[],"BUY"!==a.operation&&"SELL"!==a.operation||"EUR"===a.kokonaissumma.split(" ")[1]){e.next=22;break}return o=Y()(a.paivays).format("YYYY-MM-DD"),e.next=5,Ie.a.get("https://api.coinbase.com/v2/prices/".concat(a.tuote,"-EUR/spot?date=").concat(o));case 5:return e.next=7,e.sent.data.data;case 7:if(e.t1=n=e.sent,e.t0=null===e.t1,e.t0){e.next=11;break}e.t0=void 0===n;case 11:if(!e.t0){e.next=15;break}e.t2=void 0,e.next=16;break;case 15:e.t2=n.amount;case 16:c=e.t2,s=Number(a.kulut.split(" ")[0])/Number(a.kokonaissumma.split(" ")[0]),u=c*a.maara,l=u*s,r.push(Object(C.a)(Object(C.a)({},a),{},{kurssi:"".concat(c," EUR"),kulut:"".concat(l," EUR"),kokonaissumma:"".concat(u-l," EUR")})),null!==(i=G.CoinbasePro)&&void 0!==i&&i.find((function(e){return e.id===a.id}))&&t.push(Object(C.a)(Object(C.a)({},a),{},{operation:"BUY",id:Object(Ae.a)(10),tuote:"".concat(a.arvo.split(" ")[1]),kurssi:"".concat(c," EUR"),kulut:"".concat(0," EUR"),kokonaissumma:"".concat(u-l," EUR")}));case 22:return d=r.find((function(e){return e.id===a.id})),e.abrupt("return",d||a);case 24:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 3:a=e.sent,W(Object(w.a)(a.concat(t))),U(Object(w.a)(a.concat(t))),le(!1),te("");case 8:case"end":return e.stop()}}),e)})))()},endIcon:Object(m.jsx)(Te.a,{}),children:"I accept"})})]}),T&&!ue&&Object(m.jsxs)(f.a,{direction:"row",spacing:2,children:[Object(m.jsx)(F.a,{variant:"outlined",onClick:function(){O([]),U([]),W([]),H({}),N(!1),u(400),_([])},startIcon:Object(m.jsx)(ge.a,{}),children:"Poistha"}),Object(m.jsx)(F.a,{disabled:Z.length>0,onClick:function(){try{var e=V.filter((function(e){return("CONVERT"===e.operation||"COINBASE EARN"===e.operation||"RECEIVE"===e.operation)&&G.Coinbase.map((function(e){return e.id})).includes(e.id)})),t=[];e.forEach((function(e){var a,r=null===(a=G.Coinbase)||void 0===a?void 0:a.find((function(t){return t.id===e.id}));if("CONVERT"===(null===r||void 0===r?void 0:r.TransactionType)){var n=r.Notes.split(" "),i=Number(n[4]),o=n[5];t.push(Object(C.a)(Object(C.a)({},r),{},{TransactionType:"SELL",id:Object(Ae.a)(10),Fees:0,Total:r.Total-r.Fees})),t.push(Object(C.a)(Object(C.a)({},r),{},{TransactionType:"BUY",id:Object(Ae.a)(10),Asset:o,QuantityTransacted:i,SpotPriceatTransaction:r.Subtotal/i}))}else("COINBASE EARN"===(null===r||void 0===r?void 0:r.TransactionType)||"RECEIVE"===(null===r||void 0===r?void 0:r.TransactionType))&&t.push(Object(C.a)(Object(C.a)({},r),{},{id:Object(Ae.a)(10),TransactionType:"BUY"}))}));var a=ie(t),r=V.concat(a||[]).map((function(e){var t=a.find((function(t){return t.id===e.id}));return t||e})).filter((function(e){return"BUY"===e.operation||"SELL"===e.operation})).map((function(e){return{symbol:e.tuote,date:new Date(e.paivays),price:Math.abs(Number(e.kurssi.split(" ")[0])),amount:Math.abs(e.maara),type:e.operation,transactionFee:Math.abs(Number(e.kulut.split(" ")[0]))}}));console.log(r);var n=Ee(r);_(n.map((function(e,t){return Object(C.a)(Object(C.a)({},e),{},{buydate:new Date(e.buydate),selldate:new Date(e.selldate),transferFee:"".concat(Number(e.transferFee)," EUR"),profitOrLoss:"".concat(Number(e.profitOrLoss)," EUR"),id:t})}))),fe({capitalGains:P.a.sumBy(n,(function(e){return e.profitOrLoss>0?e.profitOrLoss:0})),capitalLosses:P.a.sumBy(n,(function(e){return e.profitOrLoss<0?e.profitOrLoss:0})),transactionTotal:P.a.sumBy(n,(function(e){return Math.abs(e.transferFee)+Math.abs(e.acquisitionFee)})),netProfit:P.a.sumBy(n,(function(e){return e.profitOrLoss-(Math.abs(e.transferFee)+Math.abs(e.acquisitionFee))}))})}catch(i){oe(i.message)}},variant:"contained",endIcon:Object(m.jsx)(we.a,{}),children:"Laske"})]}),T&&0===Z.length&&Object(m.jsx)("div",{style:{width:"100%"},children:Object(m.jsx)(Fe,{rows:D,mode:t,rawDataAsColumns:V,rawDatatSetCallback:function(e){return W(e)}})}),Z.length>0&&Object(m.jsx)(Oe,{rows:Z,mode:t})]}),Object(m.jsx)(j,{})]})]})};i.a.render(Object(m.jsx)(y.a,{basename:"",children:Object(m.jsxs)(u.c,{children:[Object(m.jsx)(u.a,{path:"/",element:Object(m.jsx)(x,{})}),Object(m.jsx)(u.a,{path:"securities",element:Object(m.jsx)(Le,{mode:"SECURITY"})}),Object(m.jsx)(u.a,{path:"crypto",element:Object(m.jsx)(Le,{mode:"CRYPTO"})})]})}),document.getElementById("root"))}},[[249,1,2]]]);
//# sourceMappingURL=main.e9e195b8.chunk.js.map