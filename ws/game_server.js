#!/usr/bin/node
//#!/usr/bin/env node

var players = new Array(10);
var messages = new Array(0);

// Grass tiles
var g1 = {tileOffset:0, block:false};
var g2 = {tileOffset:1, block:false};
var g3 = {tileOffset:2, block:false};
var g4 = {tileOffset:3, block:false};
var g5 = {tileOffset:4, block:false};
// Grass in bright grass tiles
var g6 = {tileOffset:14, block:false};
var g7 = {tileOffset:15, block:false};
var g8 = {tileOffset:16, block:false};
var g9 = {tileOffset:17, block:false};
// Bright grass inner tile
var bg = {tileOffset:9, block:false};
// Bright grass corner tiles
var bg1 = {tileOffset:5, block:false};
var bg2 = {tileOffset:7, block:false};
var bg3 = {tileOffset:11, block:false};
var bg4 = {tileOffset:13, block:false};
// Bright grass edge tiles
var bg5 = {tileOffset:6, block:false};
var bg6 = {tileOffset:8, block:false};
var bg7 = {tileOffset:10, block:false};
var bg8 = {tileOffset:12, block:false};
// Water corner tiles
var wc1 = {tileOffset:18, block:true};
var wc2 = {tileOffset:20, block:true};
var wc3 = {tileOffset:24, block:true};
var wc4 = {tileOffset:26, block:true};
// Water edge tiles
var we1 = {tileOffset:19, block:true};
var we2 = {tileOffset:21, block:true};
var we3 = {tileOffset:23, block:true};
var we4 = {tileOffset:25, block:true};
// Water tile
var w = {tileOffset:22, block:true};
// Map specifications
var mapWidth = 50; // In tiles
var mapHeight = 50; // In tiles
var edgeOffsetX = 19; // In tiles
var edgeOffsetY = 18; // In tiles
var tileSet = 'woodland_tileset';
var tileWidth = 32; // In pixels
var tileHeight = 32; // Again, in pixels
var spawnPoint = {x:22, y:20};
var map = [
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,wc3,we4,we4,we4,we4,we4,we4,we4,we4,we4,we4,wc4,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,we3,g1 ,bg1,bg5,bg5,bg2,g2 ,g3 ,g4 ,g5 ,g4 ,we2,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,we3,g2 ,bg6,g6 ,g7 ,bg7,g3 ,g4 ,g5 ,g4 ,g3 ,we2,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,we3,g3 ,bg6,bg7,bg6,bg7,g4 ,g5 ,g4 ,g3 ,g2 ,we2,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,we3,g4 ,bg6,g8 ,g9 ,bg7,g5 ,g4 ,g3 ,g2 ,g1 ,we2,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,we3,g4 ,bg3,bg8,bg8,bg4,g3 ,g4 ,g5 ,g4 ,g3 ,we2,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,we3,g1 ,g2 ,g3 ,g4 ,g5 ,g2 ,g3 ,g4 ,g3 ,g2 ,we2,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,we3,g2 ,g3 ,g4 ,g3 ,g2 ,g1 ,g2 ,g3 ,g4 ,g5 ,we2,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,we3,g3 ,g4 ,g5 ,g3 ,g2 ,g1 ,g2 ,g2 ,g3 ,g4 ,we2,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,we3,g4 ,g4 ,g5 ,g3 ,g4 ,g1 ,g3 ,g4 ,g5 ,g2 ,we2,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,we3,g1 ,g2 ,g3 ,g4 ,g3 ,g2 ,g3 ,g5 ,g1 ,g2 ,we2,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,we3,g1 ,g2 ,g3 ,g4 ,g5 ,g4 ,g3 ,g4 ,g2 ,g3 ,we2,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,we3,g2 ,g3 ,g4 ,g3 ,g4 ,g5 ,g4 ,g3 ,g2 ,g1 ,we2,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,we3,g3 ,g2 ,g1 ,g2 ,g3 ,g4 ,g5 ,g4 ,g3 ,g2 ,we2,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,wc1,we1,we1,we1,we1,we1,we1,we1,we1,we1,we1,wc2,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,
w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w  ,w
];

var dateTime = require('node-datetime');
var fs = require('fs')

function processPlayers(){
	var updatedPlayers = [];
	for(var i = 0; i < players.length; i++) if(players[i]){
		var updatedPlayer = {i:i};
		var playerChanged = false;
		if(players[i].remove){
			players[i] = null;
			console.log('Player #' + i + ' removed.');
			playerChanged = true;
			updatedPlayer.r = 1;
		}
		else{
			still = true;
			if(players[i].l){
				if(players[i].x <= (edgeOffsetX*tileWidth + 5)){
					playerChanged = true;
					updatedPlayer.x = players[i].x = edgeOffsetX*tileWidth + 5;
					if(players[i].t != 1) updatedPlayer.t = players[i].t = 1;
				}
				else{
					playerChanged = true;
					still = false;
					players[i].x -= 4;
					updatedPlayer.x = players[i].x;
					updatedPlayer.t = players[i].t = 1;
				}
			}
			if(players[i].r){
				if((players[i].x + players[i].pw) >= ((mapWidth-edgeOffsetX) * tileWidth - 5)){
					playerChanged = true;
					updatedPlayer.x = players[i].x = (mapWidth-edgeOffsetX) * tileWidth - 5 - players[i].pw;
					if(players[i].t != 3) updatedPlayer.t = players[i].t = 3;
				}
				else{
					playerChanged = true;
					still = false;
					players[i].x += 4;
					updatedPlayer.x = players[i].x;
					updatedPlayer.t = players[i].t = 3;
				}
			}
			if(players[i].u){
				if((players[i].y + players[i].ph/2) <= (edgeOffsetY*tileHeight + 5)){
					playerChanged = true;
					updatedPlayer.y = players[i].y = edgeOffsetY*tileHeight + 5 - players[i].ph/2;
					if(players[i].t != 2) updatedPlayer.t = players[i].t = 2;
				}
				else{
					playerChanged = true;
					still = false;
					players[i].y -= 4;
					updatedPlayer.y = players[i].y;
					updatedPlayer.t = players[i].t = 2;
				}
			}
			if(players[i].d){
				if((players[i].y + players[i].ph) >= ((mapHeight-edgeOffsetY) * tileHeight - 5)){
					playerChanged = true;
					updatedPlayer.y = players[i].y = (mapHeight-edgeOffsetY) * tileHeight - 5 - players[i].ph;
					if(players[i].t != 0) updatedPlayer.t = players[i].t = 0;
				}
				else{
					playerChanged = true;
					still = false;
					players[i].y += 4;
					updatedPlayer.y = players[i].y;
					updatedPlayer.t = players[i].t = 0;
				}
			}
			if(!still){
				// Player is moving, advance animation frame. Stand up if sitting.
				playerChanged = true;
				updatedPlayer.w = players[i].w = players[i].w % 6 + 1;
				players[i].sit = false;
				players[i].sitting = false;
				updatedPlayer.sit = players[i].sit;
			}
			else{
				if(!players[i].still){ // Player went from walking to still
					playerChanged = true;
					updatedPlayer.w = players[i].w = 0;
				}
				if(players[i].sit != players[i].sitting){ // Toggle sit/stand state
					playerChanged = true;
					players[i].sitting = players[i].sit;
					updatedPlayer.w = players[i].w = (players[i].sit ? 7 : 0);
					updatedPlayer.sit = players[i].sit;
				}
/*
				if(players[i].sit && !players[i].sitting){ // Player sits
					playerChanged = true;
					players[i].sitting = true;
					updatedPlayer.w = players[i].w = 7;
				}
				else if(!players[i].sit && players[i].sitting){ // Player stands
					playerChanged = true;
					players[i].sitting = false;
					updatedPlayer.w = players[i].w = 0;
				}
*/
			}
			players[i].still = still;
			if(players[i].n){ // Tell everyone about the new guy
				players[i].n = false;
				playerChanged = true;
				updatedPlayer.x = players[i].x;
				updatedPlayer.y = players[i].y;
				updatedPlayer.w = players[i].w;
				updatedPlayer.t = players[i].t;
				updatedPlayer.cs = players[i].cs;
				updatedPlayer.pw = players[i].pw;
				updatedPlayer.ph = players[i].ph;
				updatedPlayer.sit = players[i].sit;
			}
		}
		if(playerChanged) updatedPlayers.push(updatedPlayer);
	}
	while(messages.length){
		var msg = messages.shift();
		msg.e = 'c';
		for(var i = 0; i < players.length; i++) if(players[i]) players[i].client.send(JSON.stringify(msg));
		var date = dateTime.create();
		var currentDate = date.format('Y-m-d');
		fs.appendFile(('chatlogs/' + currentDate + '.log'), ('[' + msg.t + '] ' + msg.p + ': ' + msg.m + '\n'), function(err){});
//		if('playerIndex' in ws) wss.clients.forEach(function(client) {
//			client.send({e:'c', m:});
//		});
	}
	return updatedPlayers;
}

/*function removeClients(){
	for(var i = 0; i < players.length; i++){
		if(players[i] && 'remove' in players[i] && players[i].remove){
			players[i] = null;
			console.log('Player #' + i + ' removed.');
		}
	}
}*/

function setupNewClient(client){
	var playerslist = [];
	for(var i = 0; i < players.length; i++){
		if(players[i]) playerslist.push({i:i, x:players[i].x, y:players[i].y, w:players[i].w, t:players[i].t, cs:players[i].cs, pw:players[i].pw, ph:players[i].ph, sit:players[i].sit});
	}
	client.send(JSON.stringify({e:'i', p:playerslist, i:client.playerIndex}));
	var mapString = '';
	for(var i = 0; i < map.length; i++) mapString += String.fromCharCode(map[i].tileOffset + 32);
	client.send(JSON.stringify({e:'m', p:{m:mapString, w:mapWidth, h:mapHeight}, t:{i:tileSet, w:tileWidth, h:tileHeight}}));
}

function gameLoop(event){
//	removeClients();
	var updatedPlayers = processPlayers();
	if(updatedPlayers.length > 0){
		for(var i = 0; i < players.length; i++){
			if(players[i]){
				players[i].client.send(JSON.stringify({e:'v', p:updatedPlayers}));
			}
		}
	}
}

console.log("Server started");
var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({port: 8010});
wss.on('connection', function(ws) {
	for(var i = 0; i < players.length; i++){
		if(!players[i]){
			players[i] = {
					client:ws,
					x:(tileWidth*spawnPoint['x']), y:(tileHeight*spawnPoint['y']),
					still:true,
					sit:false, sitting:false,
					pw:64, ph:64, // Player width and height in pixels
					l:false, u:false, r:false, d:false,
					w:0, t:0, // w is used for the walk animation and t is the rotation of the player.
					cs:0, // cs is used to determine which sprite is being used for the player.
					n:true, remove:false, // n signifies that the player is new
					name:i // name is the player name
				};
			ws.playerIndex = i;
			setupNewClient(players[i].client);
			console.log('Player #' + i + ' has joined the server.');
			i = 10;
		}
	}
	if(!('playerIndex' in ws)){
		ws.send(JSON.stringify({e:'e', m:'Sorry, The server is full.'}));
		ws.close();
	}
	else ws.on('message', function(message) {
		console.log('Received from client: %s', message);
		switch(message.charAt(0)){
			case 'p':
				var k = message.charAt(1);
				console.log(k);
				if('playerIndex' in ws){
					switch(k){
						case 's':
							players[ws.playerIndex].sit = !players[ws.playerIndex].sit;
							break;
						case 'l': case 'r': case 'u': case 'd':
							players[ws.playerIndex][k] = true;
							break;
					}
				}
				break;
			case 'r':
				var k = message.charAt(1);
				console.log(k);
				if('playerIndex' in ws){
					switch(k){
//						case 's':
//							break;
						case 'l': case 'r': case 'u': case 'd':
							players[ws.playerIndex][k] = false;
							break;
					}
				}
				break;
			case 'c':
				var m = message.substr(1).trim();
				if(m){
					var date = dateTime.create();
					var currentDate = date.format('H:M:S');
					console.log('Received from client: %s', currentDate + ': ' + message.substr(1));
// use push and shift
					messages.push({
						t:currentDate,
						p:players[ws.playerIndex].name,
						m:message.substr(1)});
				}
				break;
			case 'u':
				var username = message.substr(1);
				var ok = true;
				var errMsg;
				if(ok && (!username || !username.match('^[A-z0-9]+$'))){
					ok = false;
					errMsg = 'You must enter a username and username must contain only alphanumeric characters.';
				}
				if(ok){
					console.log('Player #' + ws.playerIndex + ' has claimed the username ' + username);
					players[ws.playerIndex].name = username;
				}
				else{
					ws.send(JSON.stringify({e:'e', m:errMsg}));
					ws.close();
				}
				break;
		}
//		wss.clients.forEach(function each(client) {
//			client.send(new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + ': ' + message);
//		});
	});
	ws.on('close', function() {
		if('playerIndex' in ws){
			players[ws.playerIndex].remove = true;
			console.log('Player #' + ws.playerIndex + ' disconnected.');
		}
	});
});

setInterval(gameLoop, 125);
