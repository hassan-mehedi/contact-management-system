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

async function getAllContactsByUser(searchTerm) {
    try {
        const user = await getUserDetails();
        const userEmail = user.email;

        const prisma = new PrismaClient();
        let data = {};

        if (searchTerm) {
            data = await prisma.contact.findMany({
                where: {
                    AND: [{ name: { contains: searchTerm, mode: "insensitive" } }, { userEmail: userEmail }],
                },
                orderBy: {
                    name: "asc",
                },
            });
        } else {
            data = await prisma.contact.findMany({
                where: {
                    userEmail: userEmail,
                },
                orderBy: {
                    name: "asc",
                },
            });
        }

        if (!data) {
            return { success: false, error: false, message: "No contacts found" };
        }

        return { success: true, message: "Successfully found the contacts", data: data };
    } catch (error) {
        return { success: false, error: true, message: "Server error", debug: error };
    }
}

async function createContact(formData) {
    try {
        const { name, email, address, phoneNumber } = formData;

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

        return { success: true, warning: false, error: false, message: "Successfully created the contact" };
    } catch (error) {
        console.error(error);
        return { success: false, warning: false, error: true, message: "Server error" };
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
        const { name, email, address, phoneNumber } = formData;

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

        return { success: true, warning: false, error: false, message: "Successfully updated the contact" };
    } catch (error) {
        console.error(error);
        return { success: false, warning: false, error: true, message: "Server error" };
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
