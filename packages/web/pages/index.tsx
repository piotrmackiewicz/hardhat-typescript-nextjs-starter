import { ethers } from "ethers";
import { Greeter__factory } from "../typechain-types";
import { FormEvent, useState } from "react";
import { NextPage } from "next";
import { GREETER_ADDRESS } from "../contractAddresses";
import { useWebProvider } from "../hooks/useWebProvider";
import { useRouter } from "next/router";

interface Props {
  greeting?: string;
}

const Home: NextPage<Props> = ({ greeting }) => {
  const [greetingInputValue, setGreetingInputValue] = useState("");
  const { signer } = useWebProvider();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!greetingInputValue) {
      console.error("Error: Input value can't be empty");
      return;
    }

    if (!signer) {
      console.error("Error: No signer defined");
      return;
    }

    try {
      const greeterContract = Greeter__factory.connect(GREETER_ADDRESS, signer);
      await greeterContract.setGreeting(greetingInputValue);
      router.reload();
    } catch (err) {
      console.error(`Error: ${err}`);
    } finally {
      setGreetingInputValue("");
    }
  };

  return (
    <>
      <h1>Greeting</h1>
      <p>value: {greeting}</p>
      <form onSubmit={handleSubmit}>
        <input
          name="greeting-input"
          value={greetingInputValue}
          onChange={(e) => setGreetingInputValue(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

Home.getInitialProps = async () => {
  const greeterContract = Greeter__factory.connect(
    GREETER_ADDRESS,
    new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/")
  );
  const fetchData = async () => {
    try {
      const greeting = await greeterContract.greeting();
      return greeting;
    } catch (err) {
      console.error("Error:", err);
    }
  };
  const greeting = await fetchData();

  return {
    greeting,
  };
};

export default Home;
