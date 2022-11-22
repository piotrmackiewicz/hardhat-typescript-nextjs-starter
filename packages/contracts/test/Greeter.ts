import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Greeter } from "../../web/typechain-types"

describe('Greeter', async () => {
    let accounts: SignerWithAddress[];
    let greeter: Greeter;

    beforeEach(async () => {
        accounts = await ethers.getSigners();
        const GreeterFactory = await ethers.getContractFactory("Greeter");
        greeter = await GreeterFactory.deploy();
    })

    it('deploys Greeter', async () => {
        expect(await greeter.greeting()).equal("Default greeting");
    })

    it('changes greeting', async () => {
        await greeter.connect(accounts[0]).setGreeting('New test greeting');
        expect(await greeter.greeting()).equal("New test greeting");
    })
})