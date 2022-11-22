import { ethers } from "hardhat";
import os from 'os';
import fs from 'fs';
import path from 'path';

const deployedContracts: { name: string; address: string }[] = [];

// this function can be used in main in order to deploy contract
async function deployContract(name: string, ...constructorParams: any[]) {
  const ContractFactory = await ethers.getContractFactory(name);
  const contract = await ContractFactory.deploy(...constructorParams);
  await contract.deployed();
  deployedContracts.push({ name, address: contract.address });
  console.log(`${name} has been deployed at address: ${contract.address}`);
}

function createFileWithContractAddressesConsts() {
  let fileContent = '';
  for (const deployedContract of deployedContracts) {
    fileContent += `export const ${deployedContract.name.toUpperCase()}_ADDRESS = "${deployedContract.address}";${os.EOL}`
  }

  fs.writeFile(path.resolve(__dirname, '../../web/contractAddresses.ts'), fileContent, err => {
    if (err) return console.log(err);
  });
}

async function main() {
  await deployContract('Greeter')
  await deployContract('GreeterWithParameter', "starting greeting value for GreeterWithParameter")

  createFileWithContractAddressesConsts();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
