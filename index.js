import fs from 'fs';

function copyOpr(data) {
  return JSON.parse(JSON.stringify(data));
}

let data = {
  userList: [],
  selectedList: [],
  group: {}
}

data.userList = JSON.parse(fs.readFileSync('./user.json', 'utf-8'));
for (let i = 0; i < data.userList[data.userList.length-1];i++) {
  data.group[`${i}`] = [];
}
data.userList.splice(data.userList.length-1, 1)
let nowGroup = 0;
const selectUser = ()=>{
  const randomId = Math.floor(Math.random() * data.userList.length);
  const thisUser = `${data.userList[randomId]}`;
  if (nowGroup > (Object.keys(data.group).length-1)) {
    nowGroup = 0;
  };
  data.userList.splice(randomId, 1);
  data.selectedList.push(thisUser);
  let temp = data.group[`${nowGroup}`];
  temp.push(thisUser);
  data.group[`${nowGroup}`] = temp;
  nowGroup++;
  if (data.userList.length > 0) {
    selectUser()
  };
}
selectUser()

for(let i = 0; i < Object.keys(data.group).length; i++) {
  console.log(`Group ${i+1} :`)
  let temp = data.group[`${i}`];
  for (let thisId in temp) {
    console.log(` ${temp[thisId]}`)
  }
  console.log('\n')
}
console.log(`Total : ${data.selectedList.length}`)
