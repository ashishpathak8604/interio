import puppeteer from 'puppeteer-core'
const CHROME='C:/Program Files/Google/Chrome/Application/chrome.exe'
const browser=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox','--disable-gpu']})
const page=await browser.newPage()
await page.goto('data:text/html,<html><body>hi</body></html>')
const result=await page.evaluate(()=>{
  const log=[]
  window.addEventListener('popstate',()=>log.push('bubble1'))
  window.addEventListener('popstate',()=>log.push('capture1'),true)
  window.addEventListener('popstate',()=>log.push('bubble2'))
  window.addEventListener('popstate',()=>{log.push('capture2-stop');},true)
  window.addEventListener('popstate',()=>log.push('bubble3'))
  window.dispatchEvent(new PopStateEvent('popstate'))
  return log
})
console.log(result)
const result2=await page.evaluate(()=>{
  const log=[]
  window.addEventListener('popstate',(e)=>{log.push('capture-stop');e.stopImmediatePropagation()},true)
  window.addEventListener('popstate',()=>log.push('bubble'))
  window.dispatchEvent(new PopStateEvent('popstate'))
  return log
})
console.log(result2)
await browser.close()
