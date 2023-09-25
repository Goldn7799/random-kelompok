import fs from 'fs';
import inquirer from 'inquirer';

const data = [];

const nameQuestion = [
  {
    type: 'input',
    name: 'value',
    message: "Enter Name[<DN> for done] : "
  }
]
const groupQuestion = [
  {
    type: 'input',
    name: 'value',
    message: "Enter Group Count : "
  }
]

const askGroupCount = async () => {
  const groupAnswer = await inquirer.prompt(groupQuestion);
  data.push(Math.floor(groupAnswer.value));
  console.log(`Done Set Group to ${Math.floor(groupAnswer.value)}`)
  fs.writeFileSync('./user.json', JSON.stringify(data), 'utf-8');
  console.log('Saved To ./user.json')
}
const askName = async () => {
  const nameAnswer = await inquirer.prompt(nameQuestion);
  if (nameAnswer.value === '<DN>') {
    console.log(`Next Setup...`)
    askGroupCount();
  } else {
    data.push(nameAnswer.value);
    console.log(`Name ${nameAnswer.value} Added`)
    askName();
  }
}
askName()