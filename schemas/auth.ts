import { z } from 'zod'
export const registerSchema = z.object({
    fullname: z.string().min(3, "نام باید حداقل ۳ کاراکتر باشد"),
    username: z.string().min(3, "نام مستعار باید حداقل ۳ کاراکتر باشد"),
    email: z.email('ایمیل نامعتبر است'),
    password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

export type registerInput = z.infer<typeof registerSchema>
