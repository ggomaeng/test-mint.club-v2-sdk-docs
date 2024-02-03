'use client';
import { useEffect, useState } from 'react';
import { CopyBlock, rainbow } from 'react-code-blocks';
import { bondContract } from 'test-mint.club-v2-sdk';
import icon from '../public/apple-touch-icon.png';
import Image from 'next/image';

export default function Home() {
  const [tokenCount, setTokenCount] = useState(0);
  const [name, setName] = useState('Baby Token');
  const [symbol, setSymbol] = useState('BABY');

  useEffect(() => {
    bondContract
      .network('ethereum')
      .read({
        functionName: 'tokenCount',
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
      <div className="text-center text-lg md:text-3xl mt-20 font-bold text-white">Mint Club SDK - Minimal Example</div>
      <div className="w-[800px] max-w-full mt-10">
        <div className="mt-20 text-primary text-lg font-bold">Install</div>
        <div className="text-sm mt-4 w-full overflow-scroll">
          <CopyBlock
            customStyle={{ padding: 10 }}
            language={'ts'}
            theme={rainbow}
            wrapLongLines
            text={`npm i test-mint.club-v2-sdk`}
          />
        </div>

        <div className="mt-20 text-primary text-lg font-bold">Basic Usage</div>
        <div>
          You can basically call any read/write calls from the contract. I have provided the{' '}
          <span className="text-primary">{'"createToken"'}</span> wrapper for you in the next section. If you need any
          more wrappers like <span className="text-primary">{'"createToken"'}</span>, please let me know.
        </div>
        <div className="text-sm mt-4 w-full overflow-scroll">
          <CopyBlock
            customStyle={{ padding: 10 }}
            language={'ts'}
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
  functionName: 'tokenCount',
  args: [],
  onError: (error) => {
    console.dir(error);
  },
  onSuccess: (txHash) => {
    console.log(txHash);
  },
  onRequestSignature: () => {
    console.log('signature');
  },
  onSigned: (txHash) => {
    console.log(txHash);
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

        <div className="mt-10 text-primary text-lg font-bold">Creating tokens</div>
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
      tokenType: 'ERC20',
      name: "${name}",
      symbol: "${symbol}",
      mintRoyalty: 1, // 1%
      burnRoyalty: 1.5, // 1.5%
      reserveToken: {
        address: '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14', // WETH
        decimals: 18,
      },
      maxSupply: 10_000_000, // supply: 10M
      creatorAllocation: 10_000,
      stepData: [
        { x: 100000, y: 2 },
        { x: 200000, y: 3 },
        { x: 500000, y: 4 },
        { x: 1000000, y: 5 },
        { x: 2000000, y: 7 },
        { x: 5000000, y: 10 },
        { x: 10000000, y: 15 },
      ],

      onError: (error) => {
        console.dir(error);
      },
      onSuccess: (txHash) => {
        console.log(txHash);
      },
      onRequestSignature: () => {
        console.log('signature');
      },
      onSigned: (txHash) => {
        console.log(txHash);
      },
});
      `}
            language={'ts'}
            theme={rainbow}
            wrapLongLines
          />
        </div>
        <button
          className="bg-primary px-4 py-2 mt-5 text-black font-black"
          onClick={async () => {
            await bondContract.network('sepolia').createToken({
              tokenType: 'ERC20',
              name,
              symbol,
              mintRoyalty: 1, // 1%
              burnRoyalty: 1.5, // 1.5%
              reserveToken: {
                address: '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14', // WETH
                decimals: 18,
              },
              maxSupply: 10_000_000, // supply: 10M
              creatorAllocation: 10_000,
              stepData: [
                { x: 100000, y: 2 },
                { x: 200000, y: 3 },
                { x: 500000, y: 4 },
                { x: 1000000, y: 5 },
                { x: 2000000, y: 7 },
                { x: 5000000, y: 10 },
                { x: 10000000, y: 15 },
              ],

              onError: (error) => {
                console.dir(error);
              },
              onSuccess: (txHash) => {
                console.log(txHash);
              },
              onRequestSignature: () => {
                console.log('signature');
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
          You can read from the contract using the <code>read</code> method. It returns a promise with the result.
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

console.log(tokenCount); // some big number
      `}
            language={'ts'}
            theme={rainbow}
            wrapLongLines
          />
        </div>
        <div className="mt-4 text-white">
          Ethereum token count: <span className="text-primary">{tokenCount.toString()}</span>
        </div>
      </div>
    </div>
  );
}
