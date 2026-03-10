'use client'

import { useNotification, } from "@/hooks/providerAlert";
import { useState, useRef } from "react";
import styles from "@/app/components/form.module.css";
import { bellota } from "@/fonts/font";




export default function Form() {


    let [count, setCount] = useState("")

    const textareaRef = useRef<HTMLTextAreaElement>(null);




    const { showNotification } = useNotification();

    const alertShow = () => {
        showNotification(
            <div className={`${bellota.className} bg-[#EDE2D9] flex flex-col w-full items-center rounded-[18px] shadow-(--my-shadow)`}>
                <h2 className="text-center text-[#000] pt-[30px] md:text-[150%] text-[18px] text-[700]]">
                    Спасибо вам за обратную связь  !!!
                </h2>
                <p className="text-center text-[#333] mt-[20px] pb-[30px] w-[75%] text-[100%]"  >
                    Для нас ценно любое мнение — и похвала, и пожелания.
                </p>
            </div>, 2000
        )
    }


    return (
        <section onSubmit={(e) => { e.preventDefault() }} className="flex flex-col w-[85%] mt-[20px] md:mb-[120px] md:w-[40%] items-center">

            <form action="" method="push" className={`${bellota.className} w-full flex flex-col items-center`} id="form">


                <label htmlFor="user_name"></label>
                <input type="text" className={`${styles.text_form}`} id="user_name" name="name" placeholder="Введите имя: " maxLength={50} />


                <label htmlFor="user_email"></label>
                <input type="email" className={`${styles.text_form}`} id="user_email" name="email" placeholder="Введите e-mail: " maxLength={50} />

                <div className="w-full relative mt-[60px] bg-[#EDE2D9] rounded-[10px]">
                    <label htmlFor="counter__len" className="" ></label>
                    <textarea
                        onChange={(e) => {
                            setCount(e.target.value)
                        }}
                        id="user_review "
                        className={`block w-full   pl-[16px] pt-[16px] pb-[25px] pr-[18px] outline-none carget-[#9c530f]  text-[16px] text-[#343E47] h-[200px] `}
                        name="review"
                        placeholder="Поделитесь впечатлениями о своем визите в наше заведение: "
                        value={count}
                        maxLength={600}
                        ref={textareaRef}
                    />
                    <p className="text-[#AE6931] pb-2 pl-4"> {count.length} <span> / 600 </span> </p>
                </div>

                <button
                    type="submit"
                    className=" w-[70%] 
                 h-[50px] 
                 mt-[90px] 
                 mb-[40px] 
                 bg-[#AE6931] 
                 text-[100%] 
                 text-[#EDE2D9] uppercase
                 rounded-[10px]
                 leading-[160%]
                 pt-1
                 cursor-pointer
                 "

                    id="submit" onClick={alertShow}>отправить отзыв</button>
            </form>
        </section>
    );
}