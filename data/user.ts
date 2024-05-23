import db from "@/db/db";


export const getUserByEmail = async (email: string) => {
    try {
        const lowerCaseEmail = email.toLowerCase();
        const user = await db.user.findUnique({
            where: {
                email: lowerCaseEmail
            }
        })

        return user;
    } catch (error) {
        return null
    }
}

export const getUserById = async (id:string) => {
    try {
        const user = await db.user.findUnique({
        where: {
            id
        }
    }); 

    return user;
    } catch (error) {
        return null
    }
}