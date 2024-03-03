"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

async function isUserAuthenticated() {
    const { isAuthenticated } = getKindeServerSession();
    return await isAuthenticated();
}

async function getUserDetails() {
    const { getUser } = getKindeServerSession();
    return await getUser();
}

async function getAllContactsByUser() {
    try {
        const prisma = new PrismaClient();
        const data = await prisma.contact.findMany({});

        if (data.length === 0) {
            return { success: false, error: false, message: "No contacts found" };
        }

        return { success: true, message: "Successfully found the contacts", data: data };
    } catch (error) {
        return { success: false, error: true, message: "Server error", debug: error };
    }
}

async function createContact(formState, formData) {
    try {
        const name = formData.get("name");
        const email = formData.get("email");
        const phoneNumber = formData.get("phoneNumber");
        const address = formData.get("address");

        const user = await getUserDetails();
        const userEmail = user.email;

        const prisma = new PrismaClient();
        const data = await prisma.contact.create({
            data: {
                name,
                email,
                address,
                phoneNumber,
                userEmail,
            },
        });

        console.log(data);

        revalidatePath("/contacts");

        return { message: "Contact created" };
    } catch (error) {
        console.error(error);
        return { message: "Something went wrong" };
    }
}

export { isUserAuthenticated, getAllContactsByUser, getUserDetails, createContact };
