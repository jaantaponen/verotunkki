(this.webpackJsonpverohommeli=this.webpackJsonpverohommeli||[]).push([[0],{187:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a(44),i=a.n(r),c=a(251),o=a(192),s=a(264),u=a(16),l=a(265),d=a(266),p=a(267),b=a(263),m=a(245),f=a(2),h=function(){return Object(f.jsxs)(m.a,{direction:"column",justifyContent:"center",alignItems:"center",spacing:1,width:"sm",sx:{pt:2},children:[Object(f.jsx)(b.a,{alignSelf:"center",align:"center",component:"p",sx:{pt:4},children:"Tarkista tiedot aina itse virheiden varalta."}),Object(f.jsx)(b.a,{alignSelf:"center",align:"center",component:"p",sx:{pt:0},children:"Olet itse vastuussa omista veroistasi."}),Object(f.jsx)(b.a,{alignSelf:"center",align:"center",component:"p",sx:{pt:0},children:"Sivustolle l\xe4hett\xe4mi\xe4si tiedostoja k\xe4sitell\xe4\xe4n vain paikallisesti selaimessasi."}),Object(f.jsxs)(b.a,{variant:"body2",sx:{pt:2},color:"text.secondary",align:"center",children:["Copyright \xa9 ",Object(f.jsx)(p.a,{color:"inherit",href:"https://verotunkki.fi/",children:"Verotunkki"})," ",(new Date).getFullYear(),"."]})]})},j=a(132),v=a(277),x=a(269),O=function(){var t=Object(u.f)(),e=Object(j.a)({typography:{fontSize:14}});return Object(f.jsxs)(v.a,{theme:e,children:[Object(f.jsx)(o.a,{styles:{ul:{margin:0,padding:0,listStyle:"none"}}}),Object(f.jsx)(c.a,{}),Object(f.jsxs)(s.a,{component:"main",maxWidth:"sm",sx:{pt:8,pb:4},children:[Object(f.jsxs)(m.a,{direction:"column",justifyContent:"center",alignItems:"center",spacing:6,width:"sm",children:[Object(f.jsx)(b.a,{component:"h1",variant:"h3",align:"center",color:"text.primary",gutterBottom:!0,sx:{fontWeight:"bold",pt:8},children:"VEROTUNKKI"}),Object(f.jsx)(b.a,{alignSelf:"center",align:"center",variant:"h6",sx:{pt:3},component:"p",children:"Verotunkki laskee puolestasi luovutusvoitot ja -tappiot, ja ulostaa verottajayhteensopivan rapsan. Hyv\xe4 el\xe4m\xe4 vittu"}),Object(f.jsx)(b.a,{alignSelf:"center",variant:"h6",component:"p",sx:{pt:2},children:"Valitse verotettavan tulon tyyppi:"}),Object(f.jsx)(l.a,{sx:{width:450},onClick:function(){t("/crypto")},children:Object(f.jsx)(x.a,{children:Object(f.jsxs)(d.a,{children:[Object(f.jsx)(b.a,{gutterBottom:!0,variant:"h5",component:"div",children:"Virtuaalivaluutat"}),Object(f.jsx)(b.a,{variant:"body2",color:"text.secondary",children:"Perus hyv\xe4 Ethereum."}),Object(f.jsxs)(b.a,{variant:"body2",color:"text.secondary",children:["Tuetut l\xe4hteet: ",Object(f.jsx)("b",{children:"Coinbase, Coinbase Pro"})]})]})})}),Object(f.jsx)(l.a,{sx:{width:450},onClick:function(){t("/securities")},children:Object(f.jsx)(x.a,{children:Object(f.jsxs)(d.a,{children:[Object(f.jsx)(b.a,{gutterBottom:!0,variant:"h5",component:"div",children:"Arvopaperit"}),Object(f.jsx)(b.a,{variant:"body2",color:"text.secondary",children:"Osakkeet ETF:t, rahastot ja muut arvopaperit."}),Object(f.jsxs)(b.a,{variant:"body2",color:"text.secondary",children:["Tuetut l\xe4hteet: ",Object(f.jsx)("b",{children:"Degiro, Nordnet"})]})]})})})]}),Object(f.jsx)(h,{})]})]})},y=a(89),k=a(3),g=a(28),T=a(17),S=a(14),C=a(13),w=a(15),E=a.n(w),I=a(21),P=a.n(I),F=a(258),N=a(262),A=a(131),D=a(127),Y=a.n(D),K=function(t){var e=t.zoneHeight,a=t.handleFiles;return Object(f.jsx)(s.a,{sx:{pt:4,pb:3,width:"100%","& .MuiDropzoneArea-textContainer":{color:"black"},"& .MuiDropzoneArea-text":{paddingTop:e>200?8:4,fontSize:20},"& .MuiDropzoneArea-root":{height:e}},children:Object(f.jsx)(A.a,{acceptedFiles:["text/x-csv","text/plain","application/vnd.ms-excel"],onAdd:a,onDelete:function(t){return console.log("Removed File:",t)},onAlert:function(t,e){console.log("".concat(e,": ").concat(t))},Icon:Y.a,dropzoneText:e>200?"Pudota CSV-tiedostoja t\xe4h\xe4n":"Pudota lis\xe4\xe4 CSV-tiedostoja t\xe4h\xe4n",fileObjects:[]})})},V=a(79),W={"P\xe4iv\xe4ys":"date",Aika:"time",Tuote:"security",ISIN:"ISIN",Reference:"reference",Venue:"venue",Quantity:"quantity",Kurssi:"rate","Kurssi-valuutta":"rateCurrency","Markkina-arvo":"marketValue","Markkina-arvo-valuutta":"marketValueCurrency",Value:"value","Value-valuutta":"valueCurrency",Vaihtokurssi:"exchangeRate","Transaction costs":"transactionCosts","Transaction costs-valuutta":"transactionCostsCurrency",Kokonaissumma:"totalAmount","Kokonaissumma-valuutta":"totalAmountCurrency","Order ID":"orderId"},U=function(t){if(W[t])return W[t]},L=a(38),M=a.n(L),R=(a(165),["portfolio","tradeid","product","side","createdat","size","sizeunit","price","fee","total","pricefeetotalunit"]),B=["Timestamp","TransactionType","Asset","QuantityTransacted","SpotPriceCurrency","SpotPriceatTransaction","Subtotal","Total","Fees","Notes"],z=["date","time","security","ISIN","reference","venue","quantity","rate","rateCurrency","marketValue","marketValueCurrency","value","valueCurrency","exchangeRate","transactionCosts","transactionCostsCurrency","totalAmount","totalAmountCurrency","orderId","datetime"],H=["Id","Kirjauspaiva","Kauppapaiva","Maksupaiva","Salkku","Tapahtumatyyppi","Arvopaperi","Instrumenttityyppi","ISIN","Maara","Kurssi","Korko","Kokonaiskulut","KokonaiskulutValuutta","Summa","Valuutta","Hankintaarvo","Tulos","Kokonaismaara","Saldo","Vaihtokurssi","Tapahtumateksti","Mitatointipaiva","Laskelma","Vahvistusnumero","Valityspalkkio","ValityspalkkioValuutta"],q=function(t){for(var e=[],a=0;a<t.length;a+=2)e.push(t.charCodeAt(a)|t.charCodeAt(a+1)<<8);return String.fromCharCode.apply(String,e)},G=function(){var t=Object(g.a)(E.a.mark((function t(e,a){var n,r,i,c,o,s,u;return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r=[],i=0;case 2:if(!(i<a.length)){t.next=19;break}return t.prev=3,c=e[0].data?e[0].data.toString().split(",")[1]:"",o="parseNordNetCSV"===a[i].name?q(atob(c)):(l=c,decodeURIComponent(escape(window.atob(l)))),s=o.toString(),t.next=9,a[i](s);case 9:return u=t.sent,t.abrupt("return",u);case 13:t.prev=13,t.t0=t.catch(3),r.push(t.t0);case 16:i++,t.next=2;break;case 19:return t.abrupt("return",[{Source:"Error",Error:null!==(n=r.find((function(t){return t instanceof TypeError})))&&void 0!==n?n:r[0]}]);case 20:case"end":return t.stop()}var l}),t,null,[[3,13]])})));return function(e,a){return t.apply(this,arguments)}}(),Q=function(){var t=Object(g.a)(E.a.mark((function t(){return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:t.next=6;break;case 3:t.t0=t.sent.parse,t.next=9;break;case 6:return t.next=8,a.e(3).then(a.bind(null,284));case 8:t.t0=t.sent.parse;case 9:return t.abrupt("return",t.t0);case 10:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),Z=function(){var t=Object(g.a)(E.a.mark((function t(e){var a,n,r,i,c,o,s,u,l,d,p;return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a="",t.next=3,Q();case 3:n=t.sent,r=n(e,{cast:function(t,e){return e.header?""===t?U("".concat(a,"-valuutta")):(a=t,U(t)):String(t)},columns:!0,trim:!0}),i=[],c=!1,o=!1,t.prev=8,u=Object(V.a)(r);case 10:return t.next=12,u.next();case 12:if(!(c=!(l=t.sent).done)){t.next=18;break}d=l.value,i.push(d);case 15:c=!1,t.next=10;break;case 18:t.next=24;break;case 20:t.prev=20,t.t0=t.catch(8),o=!0,s=t.t0;case 24:if(t.prev=24,t.prev=25,!c||null==u.return){t.next=29;break}return t.next=29,u.return();case 29:if(t.prev=29,!o){t.next=32;break}throw s;case 32:return t.finish(29);case 33:return t.finish(24);case 34:if(p=i.map((function(t){return t.datetime=M()("".concat(t.date,"-").concat(t.time),"DD-MM-YYYY-HH-mm").toDate(),t})),!i.every((function(t){return 0!==P.a.difference(P.a.sortBy(z),P.a.sortBy(Object.keys(t))).length}))){t.next=37;break}throw TypeError("All headers not found in the provided Degiro file.");case 37:return t.abrupt("return",p.map((function(t){return Object(T.a)(Object(T.a)({},t),{},{Source:"Degiro"})})));case 38:case"end":return t.stop()}}),t,null,[[8,20,24,34],[25,,29,33]])})));return function(e){return t.apply(this,arguments)}}(),J=function(){var t=Object(g.a)(E.a.mark((function t(e){var a,n,r,i,c,o,s,u,l;return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Q();case 2:a=t.sent,n=a(e,{delimiter:["\t"],columns:!0,trim:!0,cast:function(t,e){if(e.header){var a=t;return a.includes("\xe4")&&(a=a.replace(/\xe4/g,"a")),a.includes("\xf6")&&(a=a.replace(/\xf6/g,"o")),a.includes("-")&&(a=a.replace(/-/g,"")),a.replace(/\s/g,"")}var n=e.column;return"Maara"===n||"Kurssi"===n||"Valityspalkkio"===n||"Summa"===n||"Kokonaiskulut"===n||"Kokonaismaara"===n?Number.parseFloat(t.replace(/,/g,".")):"Kirjauspaiva"===n||"Kauppapaiva"===n||"Maksupaiva"===n?M()(t,"YYYY-MM-DD").toDate():String(t)}}),r=[],i=!1,c=!1,t.prev=7,s=Object(V.a)(n);case 9:return t.next=11,s.next();case 11:if(!(i=!(u=t.sent).done)){t.next=17;break}l=u.value,r.push(l);case 14:i=!1,t.next=9;break;case 17:t.next=23;break;case 19:t.prev=19,t.t0=t.catch(7),c=!0,o=t.t0;case 23:if(t.prev=23,t.prev=24,!i||null==s.return){t.next=28;break}return t.next=28,s.return();case 28:if(t.prev=28,!c){t.next=31;break}throw o;case 31:return t.finish(28);case 32:return t.finish(23);case 33:if(!r.every((function(t){return 0!==P.a.difference(H,P.a.sortBy(Object.keys(t))).length}))){t.next=35;break}throw TypeError("All headers not found in the provided Nordnet file.");case 35:return t.abrupt("return",r.map((function(t){return Object(T.a)(Object(T.a)({},t),{},{Source:"Nordnet"})})));case 36:case"end":return t.stop()}}),t,null,[[7,19,23,33],[24,,28,32]])})));return function(e){return t.apply(this,arguments)}}(),X=function(){var t=Object(g.a)(E.a.mark((function t(e){var a,n,r;return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=P.a.findIndex(null===e||void 0===e?void 0:e.split("\n"),(function(t){return null===t||void 0===t?void 0:t.startsWith("Timestamp,Transaction")})),t.next=3,Q();case 3:if(n=t.sent,!(null!==(r=n(e,{cast:function(t,e){return e.header?t.includes("(")?t.split("(")[0].replace(/\s/g,""):t.replace(/\s/g,""):(M.a.tz,"Timestamp"===e.column?M()(t,"YYYY-MM-DD-HH-mm").tz("Europe/Helsinki").toDate():"TransactionType"===e.column?t.toUpperCase():String(t))},columns:!0,from_line:a>0?a+1:1,trim:!0}))&&void 0!==r?r:[]).every((function(t){return 0!==P.a.difference(B,P.a.sortBy(Object.keys(t))).length}))){t.next=7;break}throw TypeError("All headers not found in the provided Coinbase file.");case 7:return t.abrupt("return",r.map((function(t){return Object(T.a)(Object(T.a)({},t),{},{Source:"Coinbase"})})));case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),_=function(){var t=Object(g.a)(E.a.mark((function t(e){var a,n,r,i,c,o,s,u,l;return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Q();case 2:a=t.sent,n=a(e,{cast:function(t,e){return e.header?t.includes("/")?t.replace(/\//g,"").replace(/\s/g,""):t.replace(/\s/g,""):"createdat"===e.column?new Date(t):String(t)},columns:!0,trim:!0}),r=[],i=!1,c=!1,t.prev=7,s=Object(V.a)(n);case 9:return t.next=11,s.next();case 11:if(!(i=!(u=t.sent).done)){t.next=17;break}l=u.value,r.push(l);case 14:i=!1,t.next=9;break;case 17:t.next=23;break;case 19:t.prev=19,t.t0=t.catch(7),c=!0,o=t.t0;case 23:if(t.prev=23,t.prev=24,!i||null==s.return){t.next=28;break}return t.next=28,s.return();case 28:if(t.prev=28,!c){t.next=31;break}throw o;case 31:return t.finish(28);case 32:return t.finish(23);case 33:if(!r.every((function(t){return 0!==P.a.difference(P.a.sortBy(R),P.a.sortBy(Object.keys(t))).length}))){t.next=35;break}throw TypeError("All headers not found in the provided Coinbase Pro file.");case 35:return t.abrupt("return",r.map((function(t){return Object(T.a)(Object(T.a)({},t),{},{Source:"CoinbasePro",product:t.product.split("-")[0],Error:"EUR"!==t.pricefeetotalunit?"Invalid currency detected":void 0})})));case 36:case"end":return t.stop()}}),t,null,[[7,19,23,33],[24,,28,32]])})));return function(e){return t.apply(this,arguments)}}(),$=a(268),tt=a(271),et=a(272),at=a(273),nt=a(274),rt=a(275),it=a(276),ct=a(256),ot=[{id:"ticker",label:"Tuote",minWidth:120},{id:"buydate",label:"Hankintap\xe4iv\xe4",minWidth:150},{id:"selldate",label:"Luovutusp\xe4iv\xe4",minWidth:150},{id:"amountsold",label:"Myyty kpl",minWidth:100,format:function(t){return t.toFixed(8)}},{id:"transferPrice",label:"Luovutushinta",minWidth:120},{id:"acquisitionPrice",label:"Hankintahinta",minWidth:100,format:function(t){return t.toFixed(2)}},{id:"acquisitionFee",label:"Hankintakulut",minWidth:100},{id:"transferFee",label:"Luovutuskulut",minWidth:80},{id:"profitOrLoss",label:"Voitto/Tappio",minWidth:170,format:function(t){return t.toFixed(3)}}],st=[{id:"paivays",label:"Paivays",minWidth:150},{id:"tuote",label:"Tuote",minWidth:200},{id:"isin",label:"ISIN",minWidth:170},{id:"maara",label:"Maara",minWidth:100,format:function(t){return t.toFixed(2)}},{id:"kurssi",label:"Kurssi",minWidth:120},{id:"arvo",label:"Arvo",minWidth:100},{id:"kulut",label:"Kulut",minWidth:100},{id:"kokonaissumma",label:"Kokonaissumma",minWidth:170}],ut=[{id:"paivays",label:"Paivays",minWidth:150},{id:"operaatio",label:"Operaatio",minWidth:100},{id:"tuote",label:"Tuote",minWidth:100},{id:"arvo",label:"Arvo",minWidth:100},{id:"maara",label:"M\xe4\xe4r\xe4",minWidth:100,format:function(t){return t.toFixed(2)}},{id:"kurssi",label:"Kurssi",minWidth:120},{id:"kulut",label:"Kulut",minWidth:110,format:function(t){return t.toFixed(4)}},{id:"kokonaissumma",label:"Kokonaissumma",minWidth:170}],lt=function(t){var e=t.rows,a=t.mode,r=Object(n.useState)(0),i=Object(C.a)(r,2),c=i[0],o=i[1],s=Object(n.useState)(10),u=Object(C.a)(s,2),l=u[0],d=u[1],p=[];"SECURITY"===a?p=st:"CRYPTO"===a?p=ut:"RESULT"===a&&(p=ot);return Object(n.useEffect)((function(){window.scrollTo(0,250)}),[]),Object(f.jsx)(f.Fragment,{children:Object(f.jsxs)($.a,{sx:{width:"100%",overflow:"hidden"},children:[Object(f.jsx)(tt.a,{sx:{maxHeight:1400},children:Object(f.jsxs)(et.a,{stickyHeader:!0,"aria-label":"sticky table",children:[Object(f.jsx)(at.a,{children:Object(f.jsx)(nt.a,{children:p.map((function(t){return Object(f.jsx)(rt.a,{align:t.align,style:{minWidth:t.minWidth},children:t.label},t.id)}))})}),Object(f.jsx)(it.a,{children:e.slice(c*l,c*l+l).map((function(t,e){return Object(f.jsx)(nt.a,{hover:!0,role:"checkbox",tabIndex:-1,children:p.map((function(e){var a=t[e.id];return Object(f.jsx)(rt.a,{align:e.align,children:e.format&&"number"===typeof a?e.format(a):a},e.id)}))},e)}))})]})}),Object(f.jsx)(ct.a,{rowsPerPageOptions:[10,25,100],component:"div",count:e.length,rowsPerPage:l,page:c,onPageChange:function(t,e){o(e)},onRowsPerPageChange:function(t){d(+t.target.value),o(0)}})]})})},dt=a(74),pt=a.n(dt),bt=a(130),mt=a.n(bt),ft=a(129),ht=a.n(ft);var jt=function(t){var e=function(t){var e=t.map((function(t){return Object(T.a)({},t)}));return e.filter((function(t){return"SELL"===t.type})).reduce((function(t,a){return[].concat(Object(S.a)(t),[vt(e,a)])}),[])}(t).flatMap((function(t){var e,a=P.a.sumBy(t.transactions,(function(t){return t.amountsold})),n=t.transactions.map((function(t){return Object(T.a)(Object(T.a)({},t),{},{transferFee:t.amountsold/a*t.transferFee})})),r=t.transactions[0]?t.transactions[0].transferFee:0,i=P.a.sumBy(n,(function(t){return t.transferFee}));r!==i&&console.error("Amount of fees for do not match for ".concat(null===(e=t.transactions[0])||void 0===e?void 0:e.ticker,": ").concat(r," and ").concat(i));return n}));return e},vt=function(t,e){var a=0,n=[],r=t.filter((function(t){var a=t.type,n=t.symbol,r=t.date;return"BUY"===a&&n===e.symbol&&r<e.date}));if(P.a.orderBy(r,(function(t){return t.date}),"asc").forEach((function(t){var r=Math.min(e.amount,t.amount);if(0!==r){var i={ticker:e.symbol,buydate:t.date,selldate:e.date,amountsold:r,transferPrice:e.price,profitOrLoss:r*(e.price-t.price),acquisitionPrice:t.price,acquisitionFee:t.transactionFee,transferFee:e.transactionFee};n.push(i),t.amount-=r,e.amount-=r;var c=r*(e.price-t.price);a+=c}})),Math.round(e.amount)>0)throw Error("Amount of sales for ticker ".concat(e.symbol," exceeds the amount of buys by ").concat(e.amount,". In transaction made in ").concat(new Date(e.date).toLocaleString("en-GB",{timeZone:"UTC"})));return{capitalGainPerSellDate:a,transactions:n}},xt=a(128),Ot=a.n(xt),yt=[X,_],kt=[Z,J],gt=function(t){var e=t.mode,a=Object(n.useState)(400),r=Object(C.a)(a,2),i=r[0],u=r[1],l=Object(n.useState)([]),d=Object(C.a)(l,2),p=d[0],x=d[1],O=Object(n.useState)(!1),y=Object(C.a)(O,2),w=y[0],I=y[1],A=Object(n.useState)([]),D=Object(C.a)(A,2),Y=D[0],V=D[1],W=Object(n.useState)({}),U=Object(C.a)(W,2),L=U[0],R=U[1],B=Object(n.useState)([]),z=Object(C.a)(B,2),H=z[0],q=z[1],Q=Object(n.useState)(""),Z=Object(C.a)(Q,2),J=Z[0],X=Z[1],_=Object(n.useState)(""),$=Object(C.a)(_,2),tt=$[0],et=$[1],at=Object(n.useState)(!1),nt=Object(C.a)(at,2),rt=nt[0],it=nt[1],ct=Object(n.useState)(0),ot=Object(C.a)(ct,2),st=ot[0],ut=ot[1],dt=Object(j.a)({typography:{fontSize:14}}),bt=function(t){var e=[];Object.keys(t).forEach((function(a){if("Coinbase"===a)e.push(t.Coinbase.map((function(t){var e,a="".concat(t.Subtotal?Number(t.Subtotal).toFixed(2):(t.QuantityTransacted*t.SpotPriceatTransaction).toFixed(2)," ").concat(t.SpotPriceCurrency);return{paivays:new Date(t.Timestamp).toLocaleString("en-GB",{timeZone:"UTC"}),tuote:t.Asset,arvo:a,maara:t.QuantityTransacted,kulut:"".concat(Number(null!==(e=t.Fees)&&void 0!==e?e:0).toFixed(2)," ").concat(t.SpotPriceCurrency),kurssi:"".concat(t.SpotPriceatTransaction," ").concat(t.SpotPriceCurrency),kokonaissumma:"".concat(Number(t.Total?t.Total:0).toFixed(2)," ").concat(t.SpotPriceCurrency),operaatio:t.TransactionType}})));else if("CoinbasePro"===a){var n=t.CoinbasePro.find((function(t){return"Invalid currency detected"===(null===t||void 0===t?void 0:t.Error)}));n&&X("".concat(n.Error," In trancactions made in ").concat(n.createdat.toLocaleString("en-GB",{timeZone:"UTC"}),".")),e.push(function(t){return t.map((function(t){var e,a;return{paivays:t.createdat.toLocaleString("en-GB",{timeZone:"UTC"}),tuote:t.product,arvo:"".concat(t.size*t.price," ").concat(t.pricefeetotalunit),maara:t.size,kulut:"".concat(Number(null!==(e=t.fee)&&void 0!==e?e:0).toFixed(2)," ").concat(t.pricefeetotalunit),kurssi:"".concat(t.price," ").concat(t.pricefeetotalunit),kokonaissumma:"".concat(Number(null!==(a=t.total)&&void 0!==a?a:0).toFixed(2)," ").concat(t.pricefeetotalunit),operaatio:t.side}}))}(t.CoinbasePro))}else"Degiro"===a?e.push(function(t){return t.map((function(t){return{paivays:t.datetime.toUTCString(),tuote:t.security,isin:t.ISIN,arvo:"".concat(t.value," ").concat(t.valueCurrency),maara:t.quantity,kulut:t.transactionCosts,kurssi:"".concat(t.rate," ").concat(t.rateCurrency),kokonaissumma:"".concat(t.totalAmount," ").concat(t.totalAmountCurrency)}}))}(t.Degiro)):"Nordnet"===a&&e.push(function(t){return t.map((function(t){return{paivays:t.Kauppapaiva.toUTCString(),tuote:t.Arvopaperi,isin:t.ISIN,arvo:"".concat(t.Summa," ").concat(t.Valuutta),maara:t.Maara,kulut:t.Kokonaiskulut,kurssi:"".concat(t.Kurssi," ").concat(t.Valuutta),kokonaissumma:"".concat(t.Summa-t.Kokonaiskulut," ").concat(t.Valuutta)}}))}(t.Nordnet))})),V(P.a.flatten(e)),u(200),I(!0)};return Object(n.useEffect)((function(){Object(g.a)(E.a.mark((function t(){var a,n,r,i;return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(p.length>0)){t.next=7;break}return t.next=3,G(p,"CRYPTO"===e?yt:kt);case 3:n=t.sent,"Error"===(r=null===(a=n[0])||void 0===a?void 0:a.Source)?(i=n[0].Error.message,X("malformed URI sequence"===i?"Unable to parse file, is it encoded in a weird format?":n[0].Error.message)):(bt(Object(T.a)(Object(T.a)({},L),{},Object(k.a)({},r,n))),R(Object(T.a)(Object(T.a)({},L),{},Object(k.a)({},r,n)))),x([]);case 7:case"end":return t.stop()}}),t)})))()}),[p]),Object(n.useEffect)((function(){}),[L]),Object(n.useEffect)((function(){J.includes("In trancactions made in")&&it(!0)}),[J]),Object(f.jsxs)(v.a,{theme:dt,children:[Object(f.jsx)(o.a,{styles:{ul:{margin:0,padding:0,listStyle:"none"}}}),Object(f.jsx)(c.a,{}),Object(f.jsxs)(s.a,{component:"main",sx:{pt:8,pb:4},children:[Object(f.jsxs)(m.a,{direction:"column",justifyContent:"center",alignItems:"center",spacing:3,width:"sm",children:[Object(f.jsx)(b.a,{component:"h1",variant:"h3",align:"center",color:"text.primary",gutterBottom:!0,sx:{fontWeight:"bold",pt:8},children:"VEROTUNKKI"}),Object(f.jsx)(b.a,{alignSelf:"center",align:"center",variant:"h6",sx:{pt:0},component:"p",children:"CRYPTO"===e?"Virtuaalivaluutat":"Arvopaperit"}),J&&Object(f.jsx)(F.a,{severity:"error",children:J}),Object(f.jsx)(K,{zoneHeight:i,handleFiles:function(t){return x([].concat(Object(S.a)(p),Object(S.a)(t)))}}),Object(f.jsx)(b.a,{alignSelf:"flex-start",sx:{pl:4},component:"p",children:"CRYPTO"===e?"Tuetut l\xe4hteet: Coinbase, Coinbase Pro":"Tuetut l\xe4hteet: Nordnet, Degiro"}),tt&&Object(f.jsx)(F.a,{severity:"error",children:tt}),rt&&Object(f.jsxs)(m.a,{direction:"row",alignItems:"center",justifyContent:"center",spacing:2,children:[Object(f.jsx)(F.a,{severity:"warning",children:"You have made transactions that have not been traded in EUR. Do you want to use an external API to fetch the currency info? EXPERIMENTAL!"}),Object(f.jsx)(N.a,{variant:"contained",onClick:function(){Object(g.a)(E.a.mark((function t(){var e,a;return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.all(L.CoinbasePro.map(function(){var t=Object(g.a)(E.a.mark((function t(e){var a,n,r,i,c,o;return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=M()(e.createdat).format("YYYY-MM-DD"),t.next=3,Ot.a.get("https://api.coinbase.com/v2/prices/".concat(e.sizeunit,"-EUR/spot?date=").concat(n));case 3:return t.next=5,t.sent.data.data;case 5:if(t.t1=a=t.sent,t.t0=null===t.t1,t.t0){t.next=9;break}t.t0=void 0===a;case 9:if(!t.t0){t.next=13;break}t.t2=void 0,t.next=14;break;case 13:t.t2=a.amount;case 14:return r=t.t2,i=e.fee/e.total,c=r*e.size,o=c*i,t.abrupt("return",Object(T.a)(Object(T.a)({},e),{},{pricefeetotalunit:"EUR",price:r,fee:o,total:c-o,Error:void 0}));case 19:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()));case 2:e=t.sent,a=Object(T.a)(Object(T.a)({},L),{},{CoinbasePro:e}),R(a),bt(a),it(!1),X("");case 8:case"end":return t.stop()}}),t)})))()},endIcon:Object(f.jsx)(ht.a,{}),children:"Fetch"})]}),w&&!rt&&Object(f.jsxs)(m.a,{direction:"row",spacing:2,children:[Object(f.jsx)(N.a,{variant:"outlined",onClick:function(){x([]),V([]),R({}),I(!1),u(400),q([])},startIcon:Object(f.jsx)(pt.a,{}),children:"Poistha"}),Object(f.jsx)(N.a,{disabled:H.length>0,onClick:function(){var t=[];try{null!==L&&void 0!==L&&L.Coinbase&&t.push.apply(t,Object(S.a)(function(t){var e=[];return t.forEach((function(t){if("CONVERT"===t.TransactionType){var a=t.Notes.split(" "),n=Number(a[4]),r=a[5];e.push(Object(T.a)(Object(T.a)({},t),{},{TransactionType:"SELL",Fees:0,Total:t.Total-t.Fees})),e.push(Object(T.a)(Object(T.a)({},t),{},{TransactionType:"BUY",Asset:r,QuantityTransacted:n,SpotPriceatTransaction:t.Subtotal/n}))}else("COINBASE EARN"===t.TransactionType||"RECEIVE"===t.TransactionType)&&e.push(Object(T.a)(Object(T.a)({},t),{},{TransactionType:"BUY"}))})),t.concat(e).filter((function(t){return"BUY"===t.TransactionType||"SELL"===t.TransactionType})).map((function(t){var e;return{symbol:t.Asset,date:new Date(t.Timestamp),price:Number(t.SpotPriceatTransaction),amount:Number(t.QuantityTransacted),type:t.TransactionType,transactionFee:Number(null!==(e=t.Fees)&&void 0!==e?e:0)}}))}(L.Coinbase))),null!==L&&void 0!==L&&L.CoinbasePro&&t.push.apply(t,Object(S.a)(function(t){return t.filter((function(t){return"BUY"===t.side||"SELL"===t.side})).map((function(t){return{symbol:t.product,date:new Date(t.createdat),price:Number(t.price),amount:Number(t.size),type:t.side,transactionFee:Number(t.fee)}}))}(L.CoinbasePro))),null!==L&&void 0!==L&&L.Degiro&&t.push.apply(t,Object(S.a)(function(t){return t.map((function(t){return{symbol:t.security,date:t.datetime,price:t.rate,amount:t.quantity,type:t.quantity>0?"BUY":"SELL",transactionFee:Math.max(t.transactionCosts)}}))}(L.Degiro))),null!==L&&void 0!==L&&L.Nordnet&&t.push.apply(t,Object(S.a)(function(t){return t.filter((function(t){return"MYYNTI"===t.Tapahtumatyyppi||"OSTO"===t.Tapahtumatyyppi})).map((function(t){return{symbol:t.Arvopaperi,date:t.Kauppapaiva,price:t.Kurssi,amount:t.Maara,type:"OSTO"===t.Tapahtumatyyppi?"BUY":"SELL",transactionFee:t.Kokonaiskulut}}))}(L.Nordnet)));var e=jt(t);q(P.a.sortBy(e,(function(t){return t.selldate})).map((function(t){return Object(T.a)(Object(T.a)({},t),{},{buydate:new Date(t.buydate).toISOString().substring(0,16),selldate:new Date(t.selldate).toISOString().substring(0,16),transferFee:"".concat(Number(t.transferFee).toFixed(4)," EUR"),profitOrLoss:"".concat(t.profitOrLoss.toFixed(3)," EUR")})}))),ut(P.a.sumBy(e,(function(t){return t.profitOrLoss})))}catch(a){et(a.message)}},variant:"contained",endIcon:Object(f.jsx)(mt.a,{}),children:"Laske"})]}),w&&0===H.length&&Object(f.jsx)(lt,{mode:e,rows:Y}),H.length>0&&Object(f.jsxs)("div",{children:[Object(f.jsx)(lt,{mode:"RESULT",rows:H}),Object(f.jsxs)("p",{children:["Net Capital Gain: ",st.toFixed(2)," EUR"]})]})]}),Object(f.jsx)(h,{})]})]})};i.a.render(Object(f.jsx)(y.a,{basename:"",children:Object(f.jsxs)(u.c,{children:[Object(f.jsx)(u.a,{path:"/",element:Object(f.jsx)(O,{})}),Object(f.jsx)(u.a,{path:"securities",element:Object(f.jsx)(gt,{mode:"SECURITY"})}),Object(f.jsx)(u.a,{path:"crypto",element:Object(f.jsx)(gt,{mode:"CRYPTO"})})]})}),document.getElementById("root"))}},[[187,1,2]]]);
//# sourceMappingURL=main.c0cb1658.chunk.js.map