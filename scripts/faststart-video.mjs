import fs from "node:fs";

const [input,output]=process.argv.slice(2);
if(!input||!output)throw new Error("usage: node faststart-video.mjs input.mov output.mp4");
const source=fs.readFileSync(input);
const atoms=[];
for(let offset=0;offset+8<=source.length;){
  let size=source.readUInt32BE(offset);const type=source.toString("ascii",offset+4,offset+8);
  if(size===1)size=Number(source.readBigUInt64BE(offset+8));
  if(size<8||offset+size>source.length)throw new Error(`invalid ${type} atom`);
  atoms.push({type,offset,size});offset+=size;
}
const ftyp=atoms.find(atom=>atom.type==="ftyp");
const moov=atoms.find(atom=>atom.type==="moov");
if(!ftyp||!moov)throw new Error("ftyp/moov atom missing");
const shifted=Buffer.from(source.subarray(moov.offset,moov.offset+moov.size));
const delta=BigInt(moov.size);
for(let index=4;index<shifted.length-16;index++){
  const type=shifted.toString("ascii",index,index+4);
  if(type!=="stco"&&type!=="co64")continue;
  const boxStart=index-4;const boxSize=shifted.readUInt32BE(boxStart);
  if(boxSize<16||boxStart+boxSize>shifted.length)continue;
  const count=shifted.readUInt32BE(index+8);const width=type==="stco"?4:8;
  if(16+count*width>boxSize)continue;
  for(let entry=0;entry<count;entry++){
    const position=index+12+entry*width;
    if(width===4)shifted.writeUInt32BE(shifted.readUInt32BE(position)+Number(delta),position);
    else shifted.writeBigUInt64BE(shifted.readBigUInt64BE(position)+delta,position);
  }
}
const fd=fs.openSync(output,"w");
try{
  fs.writeSync(fd,source.subarray(ftyp.offset,ftyp.offset+ftyp.size));
  fs.writeSync(fd,shifted);
  for(const atom of atoms){if(atom.type!=="ftyp"&&atom.type!=="moov")fs.writeSync(fd,source.subarray(atom.offset,atom.offset+atom.size));}
}finally{fs.closeSync(fd)}
console.log(output);
