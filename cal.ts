import inquirer from 'inquirer';

async function getNumberInput(promptMessage: string): Promise<number> {
  const response = await inquirer.prompt([
    {
      type: 'input',
      name: 'number',
      message: promptMessage,
      validate: (value) => {
        const parsedValue = parseFloat(value);
        if (isNaN(parsedValue)) {
          return 'Please enter a valid number.';
        }
        return true;
      },
    },
  ]);
  return parseFloat(response.number);
}

async function main() {
  console.log('Welcome to the Calculator App!\n');

  const operationChoices = [
    'Addition',
    'Subtraction',
    'Multiplication',
    'Modulus',
    'Division',
    'Exponentiation',
  ];

  const operationChoice = await inquirer.prompt([
    {
      type: 'list',
      name: 'operation',
      message: 'Select an operation:',
      choices: operationChoices,
    },
  ]);

  const num1 = await getNumberInput('Enter the first number:');
  const num2 = await getNumberInput('Enter the second number:');

  let result: number;

  switch (operationChoice.operation) {
    case 'Addition':
      result = num1 + num2;
      break;
    case 'Subtraction':
      result = num1 - num2;
      break;
    case 'Multiplication':
      result = num1 * num2;
      break;
    case 'Modulus':
      result = num1 % num2;
      break;
    case 'Division':
      if (num2 === 0) {
        console.log('Error: Division by zero is not allowed.');
        return;
      }
      result = num1 / num2;
      break;
    case 'Exponentiation':
      result = Math.pow(num1, num2);
      break;
    default:
      console.log('Invalid operation.');
      return;
  }

  console.log(`Result of ${operationChoice.operation}: ${result}`);
}

main().catch((error) => {
  console.error('An error occurred:', error);
});

