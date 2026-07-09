const {spawn}=require("node:child_process");
const http=require("node:http");
const {chromium}=require("playwright");

const port=3020;
const server=spawn("npm",["run","dev","--","--hostname","127.0.0.1","--port",String(port)],{cwd:process.cwd(),stdio:"inherit"});
const waitForServer=()=>new Promise((resolve,reject)=>{const started=Date.now();const probe=()=>{http.get(`http://127.0.0.1:${port}`,res=>{res.resume();resolve()}).on("error",()=>{if(Date.now()-started>20000)reject(new Error("server timeout"));else setTimeout(probe,200)})};probe()});

(async()=>{try{
  await waitForServer();
  const browser=await chromium.launch({headless:true});
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  await page.goto(`http://127.0.0.1:${port}/#selected-works`,{waitUntil:"domcontentloaded"});
  const scene=page.locator('[data-project-index="0"]');
  await scene.scrollIntoViewIfNeeded();
  for(const device of ["desktop","mobile"]){
    const shell=scene.locator(`.device-${device}`);
    await shell.click({position:{x:device==="desktop"?350:45,y:device==="desktop"?220:120}});
    await page.waitForFunction(({device})=>{const video=document.querySelector(`[data-project-index="0"] .device-${device} video`);return Boolean(video&&!video.paused&&video.currentTime>.05)},{device},{timeout:15000});
    const playing=await shell.locator("video").evaluate(video=>({paused:video.paused,time:video.currentTime,ready:video.readyState}));
    await shell.click({position:{x:device==="desktop"?350:45,y:device==="desktop"?220:120}});
    const paused=await page.waitForFunction(({device})=>{const button=document.querySelector(`[data-project-index="0"] .device-${device} .device-play`);return Boolean(button)},{device},{timeout:5000}).then(()=>true);
    console.log(JSON.stringify({device,playing,paused}));
  }
  await browser.close();
}finally{server.kill("SIGTERM")}})().catch(error=>{console.error(error);process.exitCode=1});
