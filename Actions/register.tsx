"use server"
import { prisma } from '@/Lib/prisma'
import { registerInput, registerSchema } from '@/schemas/auth'
import { hash } from 'bcryptjs'
import { Prisma } from '@/generated/prisma/client'
export type ActionState = {
    success: boolean,
    errors?: Partial<Record<keyof registerInput, string>>;
    message?: string;
    userId?: number;
}

export async function registerUser(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const data = {
        fullname: formData.get("fullname") as string,
        username: formData.get("username") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const parsed = registerSchema.safeParse(data);
    if (!parsed.success) {
        const fieldErrors: ActionState["errors"] = {};
        parsed.error.issues.forEach((issue) => {
            const fieldName = issue.path[0] as keyof registerInput;
            fieldErrors[fieldName] = issue.message;
        });
        return { success: false, errors: fieldErrors };
    }
    const hashedPassword = await hash(parsed.data.password, 12);
    try {
        const newUser = await prisma.user.create({
            data: {
                fullname: parsed.data.fullname,
                username: parsed.data.username,
                email: parsed.data.email,
                password: hashedPassword,
            },
        })
        return { success: true, message: "کاربر با موفقیت ثبت نام شد", userId: newUser.id }
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            return {
                success: false,
                message: "ایمیل یا نام کاربری قبلاً ثبت شده است",
            };
        }
        return {
            success: false,
            message: "خطایی در ثبت نام رخ داد",
        };
    }
}
