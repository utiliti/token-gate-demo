"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { getNFTs } from "./lib/hooks";

export default function Home() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [checkingNfts, setCheckingNfts] = useState(false);
  const [hasNft, setHasNft] = useState(false);

  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      setIsSignedIn(true);
      setCheckingNfts(true);
      getNFTs(address).then((res) => {
        if (res.length > 0) {
          setHasNft(true);
          setCheckingNfts(false);
        } else {
          setHasNft(false);
          setCheckingNfts(false);
        }
      });
    } else {
      setIsSignedIn(false);
      setHasNft(false);
    }
  }, [isConnected, address]);

  return (
    <main className='max-w-[1600px] mx-auto'>
      <nav className='flex justify-between items-center text-lg tracking-widest italic my-3 font-semibold'>
        <div>THE CLUB</div>
        <div className='flex items-center gap-10'>
          <div>GALLERY</div>
          <div className='text-yellow-500'>BATHROOM</div>
          <div>
            <ConnectButton />
          </div>
        </div>
      </nav>
      <section className='mt-10'>
        <>
          <div className='flex justify-center items-center'>
            {isSignedIn ? (
              <>
                {hasNft ? (
                  <>
                    <div className='w-[800px]'>
                      <iframe
                        src={
                          "https://wbo.ophir.dev/boards/the-club-board-19259257097295skljf209fu3o"
                        }
                        style={{ width: "800px", height: "800px" }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className='w-[800px] text-center'>
                      <div className='text-4xl'>
                        {checkingNfts
                          ? "CHECKING YOUR WALLET FOR NFT'S"
                          : "YOU HAVE NO CLUB NFTS"}
                      </div>
                      <p className='text-xl'>
                        You must own The Club NFT to access the Bathroom
                      </p>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className='w-[800px] text-center'>
                <div className='text-4xl'>CONNECT YOUR WALLET</div>
                <p className='text-xl'>
                  You must own The Club NFT to access the Bathroom
                </p>
              </div>
            )}

            <div>
              <Image
                alt='Toilet'
                src='/toilet.png'
                width={1000}
                height={1000}
              />
            </div>
          </div>
        </>
      </section>
    </main>
  );
}
