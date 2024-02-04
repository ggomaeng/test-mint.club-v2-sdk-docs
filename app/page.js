"use client";
import { useEffect, useState } from "react";
import { CopyBlock, rainbow } from "react-code-blocks";
import { bondContract } from "test-mint.club-v2-sdk";
import icon from "../public/apple-touch-icon.png";
import Image from "next/image";

export default function Home() {
  const [tokenCount, setTokenCount] = useState(0);
  const [name, setName] = useState("Baby Token");
  const [symbol, setSymbol] = useState("BABY");

  useEffect(() => {
    bondContract
      .network("ethereum")
      .read({
        functionName: "tokenCount",
        args: [],
      })
      .then((count) => {
        console.log(count);
        setTokenCount(count);
      });
  }, []);

  return (
    <div className="flex items-center justify-center text-start min-h-screen flex-col px-10 py-20">
      <Image src={icon} alt="Mint Club" width={100} height={100} />
      <div className="text-center text-lg md:text-3xl mt-20 font-bold text-white">
        Mint Club SDK - Minimal Example
      </div>
      <div className="w-[800px] max-w-full mt-10">
        <div className="mt-20 text-primary text-lg font-bold">Install</div>
        <div className="text-sm mt-4 w-full overflow-scroll">
          <CopyBlock
            customStyle={{ padding: 10 }}
            language={"ts"}
            theme={rainbow}
            wrapLongLines
            text={`npm i test-mint.club-v2-sdk`}
          />
        </div>

        <div className="mt-20 text-primary text-lg font-bold">Basic Usage</div>
        <div>
          You can basically call any read/write calls from the contract. I have
          provided the <span className="text-primary">{'"createToken"'}</span>{" "}
          wrapper for you in the next section. If you need any more wrappers
          like <span className="text-primary">{'"createToken"'}</span>, please
          let me know.
        </div>
        <div className="text-sm mt-4 w-full overflow-scroll">
          <CopyBlock
            customStyle={{ padding: 10 }}
            language={"ts"}
            theme={rainbow}
            wrapLongLines
            text={`// import the sdk
import { bondContract } from 'test-mint.club-v2-sdk';

// read from contract
const data = bondContract.network('ethereum').read({
  functionName: 'tokenCount',
  args: [],
})

// write to the contract
const txReceipt = bondContract.network('ethereum').write({
  functionName: 'someWriteFunction',
  args: [...write function args],
  onRequestSignature: () => {
    console.log('signature');
  },
  onSigned: (txHash) => {
    console.log(txHash);
  },
  onSuccess: (receipt) => {
    console.log(receipt);
  },
  onError: (error) => {
    console.dir(error);
  },
})

// chain can be ['ethereum', 'optimism', 'arbitrum', 'avalanche', 'polygon', 'bnbchain', 'base', 'seoplia']
// 1 | 10 | 42161 | 43114 | 137 | 56 | 8453 | 11155111
// or you could also pass chainId
const data = bondContract.network(1).read({
  functionName: 'tokenCount',
  args: [],
})`}
          />
        </div>

        <div className="mt-10 text-primary text-lg font-bold">
          Creating tokens
        </div>
        <div>Below is the example code for creating a token.</div>
        <div className="mt-4">
          <label className="w-[120px]">Name</label>
          <input
            className="p-1 ml-2 text-black"
            value={name}
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label>Symbol</label>
          <input
            className="p-1 text-black ml-2"
            value={symbol}
            placeholder="symbol"
            onChange={(e) => setSymbol(e.target.value)}
          />
        </div>

        <div className="max-w-full text-sm mt-4 w-full overflow-scroll">
          <CopyBlock
            customStyle={{ padding: 10 }}
            text={`// creating a new token
await bondContract.network('sepolia').createToken({
      name: '${name}',
      symbol: '${symbol}',
      mintRoyalty: 1, // 1%
      burnRoyalty: 1.5, // 1.5%
      reserveToken: {
        address: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14", // WETH
        decimals: 18,
      },
      stepData: [
        // creator allocation is determined if first step price is 0
        // here the creator will get 10,000 tokens for free
        { rangeTo: 10_000, price: 0 },
        { rangeTo: 100_000, price: 2 },
        { rangeTo: 200_000, price: 3 },
        { rangeTo: 500_000, price: 4 },
        { rangeTo: 1_000_000, price: 5 },
        { rangeTo: 2_000_000, price: 7 },
        { rangeTo: 5_000_000, price: 10 },
        // max supply is determined by the last step rangeTo
        // here, the max supply is 10,000,000
        { rangeTo: 10_000_000, price: 15 },
      ],

      onError: (error) => {
        console.dir(error);
      },
      onSuccess: (txHash) => {
        console.log(txHash);
      },
      onRequestSignature: () => {
        console.log("signature");
      },
      onSigned: (txHash) => {
        console.log(txHash);
      },
});`}
            language={"ts"}
            theme={rainbow}
            wrapLongLines
          />
        </div>
        <button
          className="bg-primary px-4 py-2 mt-5 text-black font-bold"
          onClick={async () => {
            await bondContract.network("sepolia").createToken({
              name,
              symbol,
              mintRoyalty: 1, // 1%
              burnRoyalty: 1.5, // 1.5%
              reserveToken: {
                address: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14", // WETH
                decimals: 18,
              },
              stepData: [
                // creator allocation is determined if first step price is 0
                { rangeTo: 10_000, price: 0 },
                { rangeTo: 100_000, price: 2 },
                { rangeTo: 200_000, price: 3 },
                { rangeTo: 500_000, price: 4 },
                { rangeTo: 1_000_000, price: 5 },
                { rangeTo: 2_000_000, price: 7 },
                { rangeTo: 5_000_000, price: 10 },
                // max supply is determined by the last step rangeTo
                { rangeTo: 10_000_000, price: 15 },
              ],

              onError: (error) => {
                console.dir(error);
              },
              onSuccess: (txHash) => {
                console.log(txHash);
              },
              onRequestSignature: () => {
                console.log("signature");
              },
              onSigned: (txHash) => {
                console.log(txHash);
              },
            });
          }}
        >
          Create {symbol}
        </button>

        <div className="mt-20 text-primary text-lg font-bold">Read calls</div>
        <div className="text-base font-normal">
          You can read from the contract using the <code>read</code> method. It
          returns a promise with the result.
        </div>
        <div className="text-sm mt-4 w-full overflow-scroll">
          <CopyBlock
            customStyle={{ padding: 10 }}
            text={`// reading from contract on a specific network
import { bondContract } from 'test-mint.club-v2-sdk';

const tokenCount = bondContract.network('ethereum').read({
    functionName: 'tokenCount',
    args: [],
});

// you can also pass chainId
const tokenCount = bondContract.network(1).read({
    functionName: 'tokenCount',
    args: [],
});

console.log(tokenCount); // some big number`}
            language={"ts"}
            theme={rainbow}
            wrapLongLines
          />
        </div>
        <div className="mt-4 text-white">
          Ethereum token count:{" "}
          <span className="text-primary">{tokenCount.toString()}</span>
        </div>

        <div className="mt-20 text-primary text-lg font-bold">Extra ✨</div>
        <div className="text-sm mt-4 w-full overflow-scroll">
          <CopyBlock
            customStyle={{ padding: 10 }}
            text={`import { bondContract } from 'test-mint.club-v2-sdk';

 // write call should automatically prompt the user to connect wallet & switch chains
const txReceipt = await bondContract.network('sepolia').write({ ... });

// you could also pass the connected address
const txReceipt = await bondContract
      .network('sepolia')
      .withAccount('0xdeadbeef')
      .write({ ... });

// ... or a different provider than window.ethereum
const withOKX = await bondContract
      .network('sepolia')
      .withProvider(window.okex)
      .write({ ... });

const otherProvider = await bondContract
      .network('sepolia')
      .withProvider(new Web3Provider(...))
      .write({ ... });

// ... or with a private key
const txReceipt = await bondContract
      .network('sepolia')
      .withPrivateKey('0xdeadbeef')
      .write({ ... });`}
            language={"ts"}
            theme={rainbow}
            wrapLongLines
          />
        </div>
        <div className="mt-4 text-white">
          <div>
            - If you are unsure about what to pass to the read/write function,
            please refer to the{" "}
            <a
              target="_blank"
              className="text-link"
              href="https://github.com/Steemhunt/mint.club-v2-contract/blob/main/test/Bond.test.js"
            >
              the contract repo
            </a>
          </div>

          <div className="mt-5">
            - You can see all the read/write functions on{" "}
            <a
              target="_blank"
              className="text-link"
              href="https://etherscan.io/address/0xc5a076cad94176c2996b32d8466be1ce757faa27#readContract"
            >
              etherscan
            </a>
          </div>

          <div className="mt-5">
            - Need more info about Mint Club? Check the{" "}
            <a
              target="_blank"
              className="text-link"
              href="https://docs.mint.club"
            >
              docs
            </a>
          </div>

          <div className="mt-5">
            - Typescript autocomplete will help you with the function names and
            arguments needed
          </div>

          <div className="mt-10 flex gap-5 flex-wrap">
            <a
              target="_blank"
              className="text-link"
              href="https://github.com/ggomaeng/test-mint.club-v2-sdk"
            >
              SDK repo
            </a>
            <a
              target="_blank"
              className="text-link"
              href="https://github.com/ggomaeng/test-mint.club-v2-sdk-docs"
            >
              Docs repo (this website - made with React)
            </a>
          </div>
          <div className="text-grey text-sm mt-5">
            Made with ❤️ by{" "}
            <a
              target="_blank"
              className="text-link"
              href="https://twitter.com/@0xggoma"
            >
              @0xggoma
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
