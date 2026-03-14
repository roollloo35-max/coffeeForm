import Image from "next/image";
import Logo from "@/SVGassets/logo";
import Arrow from "@/SVGassets/arrow";
import { vibes } from "@/fonts/font";
import Form from "./components/form";


export default function Home() {
  return (
    <div className="grid grid-cols-[minmax(16px,1fr)_minmax(320px,1200px)_minmax(16px,1fr)] md:mt-[200px]">

      <main className="col-start-2 flex flex-col items-center justify-center mt-[30px] relative ">
        <Image
          className="fixed md:top-45 top-1 left-[-35] md:left-[22%] xl:left-[30%] opacity-[.5] scale-[.5] md:scale-[.4] xl:scale-[.5]  z-[-50]"
          src={'/book.png'}
          alt="book"
          width={207}
          height={190}
          
        /> 
        <Image
          className="fixed md:top-30 top-5 right-1 md:right-[22%] xl:right-[30%]  opacity-[.45] scale-[.35] md:scale-[.4] xl:scale-[.5]  z-[-50]"
          src={'/spoon.png'}
          alt="book"
          width={207}
          height={190}
          
        />

        <Image
          className="fixed md:top-80 top-40 left-[-45] rotate-y-[180deg] xl:left-[30%]  md:left-[22%] opacity-[.45] scale-[.3] md:scale-[.4] xl:scale-[.5]  z-[-50]"
          src={'/cake.png'}
          alt="book"
          width={207}
          height={190}
          
        />
        <Image
          className="fixed md:top-80 top-35 right-[-15] md:right-[22%] xl:right-[30%] opacity-[.45] scale-[.3] md:scale-[.4] xl:scale-[.5]  z-[-50]"
          src={'/chery.png'}
          alt="book"
          width={207}
          height={190}
          
        />
        
         <Image
          className="fixed md:top-130 top-100 right-[-15] md:right-[22%] xl:right-[30%] rotate-z-[-20deg] opacity-[.45] scale-[.3] md:scale-[.4] xl:scale-[.5]  z-[-50]"
          src={'/music_t.png'}
          alt="book"
          width={207}
          height={190}
          
        />


        <Logo />

        <h1 className={`${vibes.className} antialiased mt-15 tracking-wide text-[34px] text-[#bda490]`}>Спасибо, что выбрали нас!</h1>
        <h2 className={`${vibes.className} antialiased text-[25px] text-[#bda490] w-[90%] text-center`}>Нам очень важно ваше мнение, оставьте отзыв.</h2>

        <Arrow />

        <Form />
      </main>

    </div>
  );
}
