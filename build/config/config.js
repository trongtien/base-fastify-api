"use strict";var O=Object.defineProperty;var _=Object.getOwnPropertyDescriptor;var e=Object.getOwnPropertyNames;var P=Object.prototype.hasOwnProperty;var r=(E,S)=>{for(var t in S)O(E,t,{get:S[t],enumerable:!0})},p=(E,S,t,T)=>{if(S&&typeof S=="object"||typeof S=="function")for(let R of e(S))!P.call(E,R)&&R!==t&&O(E,R,{get:()=>S[R],enumerable:!(T=_(S,R))||T.enumerable});return E};var n=E=>p(O({},"__esModule",{value:!0}),E);var C={};r(C,{ENV_SCHEMA:()=>y});module.exports=n(C);var y={type:"object",required:["PORT","JWT_SECRET","COOKIE_SECRET","NODE_ENV","PORT_POSTGRES","USER_POSTGRES","PASSWORD_POSTGRES","DATABASE_POSTGRES","SCHEMA_POSTGRES","HOST_POSTGRES","SYNCHRONIZE_POSTGRES","REDIS_CLIENT","REDIS_PORT","REDIS_USER","REDIS_PASSWORD"],properties:{PORT:{type:"number"},GRPC_SERVER:{type:"string"},GRPC_CLIENT_USER:{type:"string"},JWT_SECRET:{type:"string"},COOKIE_SECRET:{type:"string"},NODE_ENV:{type:"string"},PORT_POSTGRES:{type:"number"},USER_POSTGRES:{type:"string"},PASSWORD_POSTGRES:{type:"string"},DATABASE_POSTGRES:{type:"string"},SCHEMA_POSTGRES:{type:"string"},HOST_POSTGRES:{type:"string"},SYNCHRONIZE_POSTGRES:{type:"number"},REDIS_CLIENT:{type:"string"},REDIS_PORT:{type:"number"},REDIS_USER:{type:"string"},REDIS_PASSWORD:{type:"string"}}};0&&(module.exports={ENV_SCHEMA});
//# sourceMappingURL=config.js.map
