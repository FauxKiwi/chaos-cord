(this["webpackJsonpchaos-cord"]=this["webpackJsonpchaos-cord"]||[]).push([[4],{369:function(e,r,n){"use strict";n.r(r),n.d(r,"default",(function(){return c}));var o=n(51),t=n(52);function c(e,r){console.log("Update members");var n=e.getGuild(r.guild_id);if(n){n.members.clear();var c=r.ops[0];"SYNC"===c.op&&(c.items.filter((function(e){return"member"in e})).map((function(e){return e.member})).forEach((function(e){return n.members.cache.set(e.user.id,new t.a(n,e))})),console.log(n.members),Object(o.b)(n.members))}}}}]);
//# sourceMappingURL=4.d97ae487.chunk.js.map