"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

async function createContact(formData) {
    try {
        const name = formData.get("name");
        const email = formData.get("email");
        const phoneNumber = formData.get("phoneNumber");
        const address = formData.get("address");

        if (!name) {
            return { success: false, message: "Please fill the name field" };
        }

        if (!email && !phoneNumber && !address) {
            return { success: false, message: "Please fill at least one type of contact" };
        }

        const user = await getUserDetails();
        const userEmail = user.email;

        const prisma = new PrismaClient();
        await prisma.contact.create({
            data: {
                name,
                email,
                address,
                phoneNumber,
                userEmail,
            },
        });

        revalidatePath("/contacts");

        return { success: true, message: "Successfully created the contact" };
    } catch (error) {
        console.error(error);
    }
}

async function getContact(contactId) {
    try {
        const prisma = new PrismaClient();
        const data = await prisma.contact.findUnique({
            where: {
                id: contactId,
            },
        });

        if (!data) {
            return { success: false, error: false, message: "No contact found" };
        }

        return { success: true, message: "Successfully found the contact", data: data };
    } catch (error) {
        console.error(error);
    }
}

async function updateContact(contactId, formData) {
    try {
        const name = formData.get("name");
        const email = formData.get("email");
        const phoneNumber = formData.get("phoneNumber");
        const address = formData.get("address");

        if (!name) {
            return { success: false, message: "Please fill the name field" };
        }

        if (!email && !phoneNumber && !address) {
            return { success: false, message: "Please fill at least one type of contact" };
        }

        const user = await getUserDetails();
        const userEmail = user.email;

        const prisma = new PrismaClient();
        await prisma.contact.update({
            where: {
                id: contactId,
            },
            data: {
                name,
                email,
                address,
                phoneNumber,
                userEmail,
            },
        });

        revalidatePath("/contacts");

        return { success: true, message: "Successfully updated the contact" };
    } catch (error) {
        console.error(error);
    }
}

async function deleteContact(contactId) {
    try {
        const prisma = new PrismaClient();
        await prisma.contact.delete({
            where: {
                id: contactId,
            },
        });

        revalidatePath("/contacts");

        return { success: true, message: "Successfully deleted the contact" };
    } catch (error) {
        console.error(error);
    }
}

export { isUserAuthenticated, getAllContactsByUser, getUserDetails, createContact, getContact, updateContact, deleteContact };
