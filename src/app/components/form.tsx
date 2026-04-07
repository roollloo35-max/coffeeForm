'use client'

import { useNotification, } from "@/hooks/providerAlert";
import React, { useState, useRef, SubmitEventHandler, useEffect } from "react";
import styles from "@/app/components/form.module.css";
import { bellota } from "@/fonts/font";
import { createClient } from "@/app/lib/supabase/client";
import z from "zod";
import { div, section } from "framer-motion/client";
import SendReview from "@/SVGassets/sendReview";



export default function Form() {

    const [isSubmit, setIsSubmit] = useState(false);
    const scrollTO = useRef<HTMLDivElement>(null);


    let [count, setCount] = useState("");
    let [nameCount, setNameCount] = useState("");
    let [emailCount, setEmailCount] = useState("");

    const textareaRef = useRef<HTMLTextAreaElement>(null);



    const { showNotification } = useNotification();

    const sabmitForm: React.FormEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault()

        const formData = new FormData(e.currentTarget)



        if ((count.trim() === "") || (nameCount.trim() === "") || (emailCount.trim() === "")) {
            showNotification(
                <div className={`${bellota.className} bg-[#EDE2D9] flex flex-col w-full items-center rounded-[18px] shadow-(--my-shadow)`}>
                    <h2 className="text-center text-[#000] pt-[30px] md:text-[150%] text-[18px] text-[700]]">
                        Ошибка  !!!
                    </h2>
                    <p className="text-center text-[#333] mt-[20px] pb-[30px] w-[75%] text-[100%]"  >
                        Пожалуйста, заполните все поля.
                    </p>
                </div>, 1500

            );
            return;
        }


        const ReviewSchema = z.object({
            name: z.string().min(1, "Имя пользователя обязательно"),
            email: z.string().email("некоректный email"),
            review: z.string().min(10, "Отзыв слишком короткий")

        })

        const userData = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            review: formData.get('review') as string,
        }

        try {
            const validateData = ReviewSchema.parse(userData)



            // const { error } = await createClient()
            //     .from('clienReview')
            //     .insert(validateData)

            // if (error) {
            //     console.error("Insert error", error)

            //     showNotification(
            //         <div className={`${bellota.className} bg-[#EDE2D9] flex flex-col w-full items-center rounded-[18px] shadow-(--my-shadow)`}>
            //             <h2 className="text-center text-[#000] pt-[30px] md:text-[150%] text-[18px] text-[700]]">
            //                 Ошибка отправки !!!
            //             </h2>
            //             <p className="text-center text-[#333] mt-[20px] pb-[30px] w-[75%] text-[100%]"  >
            //                 Попробуйте позже.
            //             </p>
            //         </div>, 1500
            //     )

            // }

            setIsSubmit(true)



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



            setNameCount("")
            setEmailCount("")
            setCount("")

        } catch (error) {
            if (error instanceof z.ZodError) {
                console.log(error.message);

                showNotification(
                    <div className={`${bellota.className} bg-[#EDE2D9] flex flex-col w-full items-center rounded-[18px] shadow-(--my-shadow)`}>
                        <h2 className="text-center text-[#000] pt-[30px] md:text-[150%] text-[18px] text-[700]]">
                            Ошибка отправки !!!
                        </h2>
                        <p className="text-center text-[#333] mt-[20px] pb-[30px] w-[75%] text-[100%]"  >
                            {error.issues[0].message}
                        </p>
                    </div>, 1500
                )

            }
        }

    }
    useEffect(() => {
        if (isSubmit && scrollTO.current) {
            scrollTO.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    })

    if (isSubmit) {
        return (
            <div ref={scrollTO} className="pb-10">
                <Promo />

            </div>

        )
    }

    return (
        <section className="flex flex-col w-[85%] mt-[20px] md:mb-[120px] md:w-[40%] items-center">

            <form action="" onSubmit={sabmitForm} method="push" className={`${bellota.className} w-full flex flex-col items-center`} id="form">


                <label htmlFor="user_name"></label>
                <input type="text" className={`${styles.text_form}`} id="user_name" name="name" placeholder="Введите имя: " value={nameCount} onChange={e => setNameCount(e.target.value)} maxLength={50} />


                <label htmlFor="user_email"></label>
                <input type="email" className={`${styles.text_form}`} id="user_email" name="email" placeholder="Введите e-mail: " value={emailCount} onChange={e => setEmailCount(e.target.value)} maxLength={50} />

                <div className="w-full relative mt-[60px] bg-[#EDE2D9] rounded-[10px]">
                    <label htmlFor="counter__len" className="" ></label>
                    <textarea
                        onChange={(e) => {
                            setCount(e.target.value)
                        }}
                        id="user_review"
                        className={`block w-full   pl-[16px] pt-[16px] pb-[25px] pr-[18px] outline-none carget-[#9c530f]  text-[16px] text-[#343E47] h-[200px] `}
                        name="review"
                        placeholder="Поделитесь впечатлениями о своем визите в наше заведение: "
                        value={count}
                        maxLength={600}
                        ref={textareaRef}
                    // required
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

                    id="submit">отправить отзыв</button>
            </form>

        </section>
    );
}

function Promo() {

    const { showNotification } = useNotification();


    const promo = useRef<HTMLParagraphElement>(null);




    const handleCopy = async () => {
        try {

            await navigator.clipboard.writeText(promo.current?.textContent ?? '')
            
             showNotification(
                <div className={`${bellota.className} bg-[#EDE2D9] flex flex-1 w-full items-center justify-center rounded-[18px] shadow-(--my-shadow) pb-6`}>
                    <h2 className="text-center text-[#000] pt-[30px] md:text-[150%] text-[18px] text-[700]]">
                        Промокод скопирован  !!!
                    </h2>
                    
                </div>, 2000
            )

        } catch (error) {

            console.error('Не удалось скопировать: ', error)
        }
    }


    return (
        <div className="flex flex-1 flex-col w-full pt-40 pb-30 items-center box-border owerflow-hidden">
            <div className={`w-full md:w-[50%]  sm:w-[50%] h-125  flex flex-col items-center `} >
                <div className="border-3 w-full  border-[#AE6931] rounded-[16px] flex p-2" >
                    <div className="border-1 w-full h-full  border-[#AE6931] rounded-[16px] p-4 flex flex-col items-center bg-[#00000030]">
                        <p className="md:text-[26px] text-[18px] text-[#BDA490]">
                            Спасибо за ваш отзыв! Мы ценим ваше мнение.
                            В качестве благодарности дарим промокод на скидку 15% на следующий заказ. :з
                        </p>
                        <p className="md:text-[65px] text-[40px] text-[#BDA490] text-center pt-10 pb-10 select-none" ref={promo}>
                            COFFEE$15
                        </p>
                        <button type="button" onClick={handleCopy} name="button" id="copyButton" className="text-[18px] cursor-pointer select-none text-[#BDA490] border-1 w-[90%]  border-[#AE6931] rounded-[16px] p-4 transition hover:scale-[1.05] ">СКОПИРОВАТЬ</button>
                    </div>
                </div>


            </div>
        </div>
    );
}