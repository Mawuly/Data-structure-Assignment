const KEY='arraygrade-records';let students=[];
const examples=[{id:1,name:'Ama Mensah',marks:[86,78,91]},{id:2,name:'Kojo Asare',marks:[72,81,69]},{id:3,name:'Esi Amegashie',marks:[94,89,96]},{id:4,name:'Kofi Nyarko',marks:[55,63,58]}];
const $=id=>document.getElementById(id);
function avg(marks){return marks.reduce((sum,n)=>sum+n,0)/marks.length}
function grade(n){return n>=80?'A':n>=70?'B':n>=60?'C':n>=50?'D':'F'}
function safe(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function save(){try{localStorage.setItem(KEY,JSON.stringify(students))}catch(e){}}
function notify(s){$('toast').textContent=s;$('toast').style.display='block';setTimeout(()=>$('toast').style.display='none',2000)}
function render(){
 const q=$('search').value.trim().toLowerCase(),filtered=students.filter(s=>s.name.toLowerCase().includes(q));
 $('count').textContent=students.length;$('shown').textContent='('+filtered.length+')';
 $('classAvg').textContent=students.length?(students.reduce((sum,s)=>sum+avg(s.marks),0)/students.length).toFixed(1)+'%':'—';
 const top=students.length?students.reduce((a,b)=>avg(a.marks)>avg(b.marks)?a:b):null;
 $('topName').textContent=top?top.name:'—';$('topAvg').textContent=top?avg(top.marks).toFixed(1)+'% average':'Add marks to begin';
 $('rows').innerHTML=filtered.map(s=>{const a=avg(s.marks),g=grade(a);return '<tr><td><b>'+safe(s.name)+'</b></td><td>'+s.marks[0]+'</td><td>'+s.marks[1]+'</td><td>'+s.marks[2]+'</td><td><b>'+a.toFixed(1)+'%</b></td><td><span class="grade '+(g==='F'?'low':'')+'">'+g+'</span></td><td><button class="remove" data-remove="'+s.id+'">Remove</button></td></tr>'}).join('');
 $('empty').style.display=filtered.length?'none':'block';$('summary').textContent='Showing '+filtered.length+' of '+students.length+' records · Grades: A ≥ 80, B ≥ 70, C ≥ 60, D ≥ 50, F < 50';
}
$('form').addEventListener('submit',e=>{e.preventDefault();$('msg').classList.remove('show');const name=$('name').value.trim(),marks=['m1','m2','m3'].map(id=>$(id).value===''?NaN:Number($(id).value));
 if(!name||marks.some(n=>!Number.isFinite(n)||n<0||n>100)){ $('msg').textContent='Enter a name and three marks between 0 and 100.';$('msg').classList.add('show');return}
 if(students.some(s=>s.name.toLowerCase()===name.toLowerCase())){$('msg').textContent='That student name already exists.';$('msg').classList.add('show');return}
 const id=students.length?Math.max(...students.map(s=>s.id))+1:1;students.push({id,name,marks});save();render();e.target.reset();notify('Student added successfully.')});
$('rows').addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(!b)return;const id=Number(b.dataset.remove);students=students.filter(s=>s.id!==id);save();render();notify('Student removed.')});
$('search').addEventListener('input',render);
$('sample').addEventListener('click',()=>{students=examples.map(s=>({...s,marks:[...s.marks]}));save();render();notify('Sample records loaded.')});
$('export').addEventListener('click',()=>{const data=[['Student','Maths','English','Science','Average','Grade'],...students.map(s=>[s.name,...s.marks,avg(s.marks).toFixed(1),grade(avg(s.marks))])];const csv=data.map(row=>row.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\r\n');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='arraygrade-results.csv';a.click();URL.revokeObjectURL(url)});
try{const data=JSON.parse(localStorage.getItem(KEY)||'[]');if(Array.isArray(data))students=data}catch(e){students=[]}render();
