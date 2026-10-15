"use client";
import { Eye, EyeClosed, IdCard, Lock, Mail, UserIcon } from "lucide-react"
import { registerSchema, registerInput } from '@/schemas/auth'
import { ActionState, registerUser } from '@/Actions/register'
import { useId, useState, useActionState, startTransition,useEffect } from "react"
import {useRouter} from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
const Page = () => {
    const id = useId()
    const router = useRouter()
    const [showPass, setShowPass] = useState<boolean>(false)
    const [state, formAction, isPending] = useActionState(registerUser, {
        success: false,
    } as ActionState);
    const {
        register,
        handleSubmit,
        formState: { errors: clientErrors, isReady },
    } = useForm<registerInput>({
        resolver: zodResolver(registerSchema),
        mode: "onBlur",
    });
    const getError = (field: keyof registerInput) => {
        return state.errors?.[field] || clientErrors[field]?.message;
    };

    useEffect(() => {
        if (state.success) {
            router.replace("/dashboard/:id");
        }
    }, [state.success, router]);
    const fields = [
        { name: "fullname", label: "نام و نام خانوادگی", icon: <UserIcon />, type: 'text', placeholder: "مثلا: یاسین ربانی" },
        { name: "username", label: "نام مستعار", icon: <IdCard />, type: 'text', placeholder: "Yosi" },
        { name: "email", label: "ایمیل", icon: <Mail />, type: 'text', placeholder: "mail@gmail.com" },
        // { name: 'password', label: "رمز عبور", icon: <Lock/>, type: 'password', placeholder: "حداقل ۶ کاراکتر " },
    ] as const;
    return (
        <div className=" w-full p-8 flex flex-col gap-12 bg-background mt-16 rounded-lg">
            <div className="flex justify-between items-center">
                <h4 className="text-2xl font-bold text-nowrap">ثبت نام دانش آموز</h4>
                <button className="text-primary font-semibold">ورود به حساب</button>
            </div>
            <form onSubmit={handleSubmit((data) => {
                const formData = new FormData();
                Object.entries(data).forEach(([key, value]) => formData.append(key, value));
                startTransition(() => {
                    formAction(formData)
                })
            })} className="flex flex-col gap-y-2">
                {fields.map(({ name, icon, label, placeholder, type }) => {
                    return (
                        <div key={name} className="flex flex-col items-start ">
                            <label className="font-semibold opacity-40" htmlFor={`${id}-${name}`}>{label}</label>
                            <div className="flex items-center w-full bg-third/10 p-2 rounded-lg gap-x-2">
                                {icon}
                                <input {...register(name)} type={type} className="placeholder:font-semibold" placeholder={placeholder} id={`${id}-${name}`} />
                                {getError(name) && <span className="text-red-500 text-sm">{getError(name)}</span>}
                            </div>
                        </div>
                    )
                })}
                <div className="flex flex-col items-start ">
                    <label className="font-semibold opacity-40" htmlFor={`${id}-password`}>رمز عبور</label>
                    <div className="flex items-center w-full bg-third/10 p-2 rounded-lg gap-x-2">
                        <Lock />
                        <input {...register("password")} type={showPass ? "text" : "password"} className="placeholder:font-semibold outline-0" placeholder="حداقل ۶ کاراکتر" id={`${id}-password`} />
                        <button type="button" onClick={() => setShowPass(s => !s)} >
                            {showPass ? <Eye /> : <EyeClosed />}
                        </button>
                    </div>
                    {getError("password") && <span className="text-red-500 text-sm">{getError("password")}</span>}
                </div>
                {state.message && !state.success && (
                    <p className="text-red-500 text-sm">
                        {state.message}
                    </p>
                )}
                <button className="bg-primary text-background py-1 rounded-sm mt-4" type="submit" disabled={isPending}>{isPending ? "در حال ثبت نام..." : "ثبت نام"} </button>
            </form>
        </div>
    )
}

export default Page
