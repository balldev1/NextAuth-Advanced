"use server";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import {getUserByEmail} from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success){
        return { error: "Invalid Fields!"};
    }

    // get.values
    const { email, password,name } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password,10);

    // already email
    const existingUser = await getUserByEmail(email);

    if(existingUser) {
        return { error: "Email already in use!"};
    }

    // db.user => create.user
    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });


    return { success : "User created!"}
}