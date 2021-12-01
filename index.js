a = document
cv = a.createElement`canvas`

S=w = cv.height = cv.width = 400
c = cv.getContext`2d`
a.body.append(cv)
e=10
f = []
r = 0
g=w/2
b = [1,2,3].map((_,i)=>({x:g,y:g-e*i}))

F=(x,y,s,z)=>{c.fillStyle=z,c.fillRect(x,y,s,s)}
d = "d"

a.addEventListener('keydown',e=>d={w:'u',d:'r',a:'l',s:'d'}[e.key])
q=Math.random

setInterval(z => {
  if (!r) {
    F(0,0,w,'#fff')
    Z=a=>~~(q() * w/e)
    q() > 0.9&&f.push({ x: Z()* e, y: Z() * e})
  
    f.map(f => F(f.x, f.y, e,"#0f0"))
    h = b[0]
  
    i=l=b.length-1
    J = { x: b[l].x, y: b[l].y }
    for (;i;i--) {
      B=b[i-1]
      b[i]={x:B.x,y:B.y}
    }
    let{x,y}=h
    x+={l:-e,r:e}[d]||0
    y+={u:-e,d:e}[d]||0
  
    h.x=x<0?w-e:x>w?0:x
    h.y=y<0?w-e:y>w?0:y
    f.map(f => {
      f.x==x&&f.y==y?(
        b.push(J),
        f.x = f.y =-S
      ):0
    })
    
    b.map((a, i)=>r=i&&a.x == h.x && a.y == h.y)
    b.map(b=>F(b.x, b.y, e, "red"))
  }
}, S-g)