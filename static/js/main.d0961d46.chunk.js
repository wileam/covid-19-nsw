(this["webpackJsonpcovid-19-nsw"]=this["webpackJsonpcovid-19-nsw"]||[]).push([[0],{409:function(e,a,t){e.exports=t(875)},414:function(e,a,t){},754:function(e,a,t){},874:function(e,a,t){},875:function(e,a,t){"use strict";t.r(a);for(var n=t(0),l=t.n(n),r=t(79),c=t.n(r),o=(t(414),t(886)),m=t(99),u=t(163),s=t.n(u),i=[["March 1, 2020",2,6,0],["March 2, 2020",3,9,0],["March 3, 2020",6,15,0],["March 4, 2020",7,22,1],["March 5, 2020",8,25,0],["March 6, 2020",3,28,0],["March 7, 2020",8,36,0],["March 8, 2020",4,40,1],["March 9, 2020",7,47,0],["March 10, 2020",8,55,0]],d=[["March 7, 2020 09:00:00",34,545,6217,6796],["March 7, 2020 21:00:00",36,488,6690,7214],["March 8, 2020 09:00:00",38,488,6690,7216],["March 8, 2020 21:00:00",40,576,7361,8008],["March 9, 2020 16:32:00",47,476,7848,8371]],h=i[i.length-1][1],E=i[i.length-1][2],p=i.map((function(e){return e[3]})).reduce((function(e,a){return e+a})),f=Object(m.a)(d[d.length-1],5),w=(f[0],f[1],{updated:"March 10, 2020 08:51:11",totalConfirmed:E,remain:E-p-4,today:h,death:p,recovered:4,wip:f[2],excluded:f[3],totalTested:f[4]}),g={todayData:i.map((function(e){var a=Object(m.a)(e,2),t=a[0],n=a[1];return[new Date(t),n]})),totalData:i.map((function(e){var a=Object(m.a)(e,3),t=a[0],n=(a[1],a[2]);return[new Date(t),n]})),deathData:i.map((function(e){var a=Object(m.a)(e,4),t=a[0],n=(a[1],a[2],a[3]);return[new Date(t),n]}))},v=function(e){return{legend:{show:!0},tooltip:{show:!0},xAxis:{type:"time"},yAxis:{type:"value"},series:[{type:"line",name:"total confirmed cases",data:e.totalData},{type:"bar",name:"new cases on the day",data:e.todayData},{type:"bar",name:"new death cases",data:e.deathData}]}},b=function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(s.a,{option:v(g)}))},C=[],y=[],M=[],D=[],T=0;T<d.length;T++){var x=d[T],k=new Date(x[0]);C.push([k,x[1]]),y.push([k,x[2]]),M.push([k,x[3]]),D.push([k,x[4]])}var I={totalConfirmed:C,wip:y,excluded:M,totalTested:D},N=function(e){return{legend:{show:!0},tooltip:{show:!0},xAxis:{type:"time"},yAxis:{type:"value"},series:[{type:"line",name:"total confirmed",data:e.totalConfirmed},{type:"line",name:"under investigation",data:e.wip},{type:"line",name:"tested and excluded",data:e.excluded},{type:"line",name:"total tested",data:e.totalTested}]}},S=function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(s.a,{option:N(I)}))},F=localStorage.getItem("SHOW_STATISTICS")||!1,W=function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("h2",{className:"ui small header"},"Trending:"),l.a.createElement(o.a,{columns:"equal",stackable:!0},l.a.createElement(o.a.Column,null,l.a.createElement(b,null)),F&&l.a.createElement(o.a.Column,null,l.a.createElement(S,null))))},A=t(885),H=t(883),j=(t(754),function(){var e=w.updated,a=w.totalConfirmed,t=w.remain,n=w.recovered,r=w.death,c=w.wip,m=w.excluded,u=w.totalTested;return l.a.createElement("div",{className:"summary"},l.a.createElement("h2",{className:"ui small header"},"Summary data (updated ",e," AEDT):"),l.a.createElement(o.a,{columns:4},l.a.createElement(o.a.Column,null,l.a.createElement(A.a,{color:"blue",label:"Remain",value:t})),l.a.createElement(o.a.Column,null,l.a.createElement(A.a,{label:"Total",value:a})),l.a.createElement(o.a.Column,null,l.a.createElement(A.a,{color:"grey",label:"Death",value:r})),l.a.createElement(o.a.Column,null,l.a.createElement(A.a,{color:"green",label:"Recover",value:n}))),l.a.createElement(H.a,{unstackable:!0,compact:!0},l.a.createElement(H.a.Body,null,l.a.createElement(H.a.Row,null,l.a.createElement(H.a.Cell,null,"Cases under investigation"),l.a.createElement(H.a.Cell,null,c)),l.a.createElement(H.a.Row,null,l.a.createElement(H.a.Cell,null,"Cases tested and excluded"),l.a.createElement(H.a.Cell,null,m))),l.a.createElement(H.a.Footer,null,l.a.createElement(H.a.Row,null,l.a.createElement(H.a.HeaderCell,null,"Total tested"),l.a.createElement(H.a.HeaderCell,null,u)))))}),O=t(385),R=function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("h2",{className:"ui small header"},"Confirmed cases details(best view on desktop):"),l.a.createElement(O.a,{className:"airtable-embed",url:"https://airtable.com/embed/shr289gFl44ZlCYnC?backgroundColor=teal",frameborder:"0",onmousewheel:"",width:"100%",height:"500"}))},J=t(881),B=t(887),Z=t(884),q=t(880),P=function(){return l.a.createElement(J.a,{trigger:l.a.createElement("a",{href:"#",onClick:function(e){return e.preventDefault()}},"Friends")},l.a.createElement(J.a.Header,null,"Team and Thanks"),l.a.createElement(J.a.Content,null,l.a.createElement(J.a.Description,null,l.a.createElement(B.a,null,"Team member"),l.a.createElement(Z.a,{bulleted:!0},l.a.createElement(Z.a.Item,null,l.a.createElement("a",{href:"https://wileam.com/"},"Joanna Wu"),": design and development of the website, updating the data."),l.a.createElement(Z.a.Item,null,l.a.createElement("a",{href:"https://ngot.me/"},"Henry Zhuang"),": devops and updating the data"))),l.a.createElement(q.a,null),l.a.createElement(J.a.Description,null,l.a.createElement(B.a,null,"Thanks to"),l.a.createElement(Z.a,{bulleted:!0},l.a.createElement(Z.a.Item,null,l.a.createElement("a",{href:"https://www.echartsjs.com/"},"echarts")),l.a.createElement(Z.a.Item,null,l.a.createElement("a",{href:"https://airtable.com/"},"airtable"))))))};t(873),t(874);var U=function(){return l.a.createElement("div",{className:"ui container"},l.a.createElement("header",null,l.a.createElement("h1",{className:"ui header"},"CoVid-19 Updates - NSW")),l.a.createElement(j,null),l.a.createElement(q.a,null),l.a.createElement(W,null),l.a.createElement(q.a,null),l.a.createElement(R,null),l.a.createElement("footer",null,l.a.createElement("p",null,l.a.createElement("small",null,"Made by ",l.a.createElement("a",{href:"http://wileam.com/"},"Joanna Wu")," and"," ",l.a.createElement(P,null),", data source:"," ",l.a.createElement("a",{href:"https://www.health.nsw.gov.au/Infectious/diseases/Pages/coronavirus.aspx"},"NSW Health")))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(U,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[409,1,2]]]);
//# sourceMappingURL=main.d0961d46.chunk.js.map