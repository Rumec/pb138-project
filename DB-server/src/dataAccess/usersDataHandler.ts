import {Prisma, PrismaClient, User} from '@prisma/client';

/**
 * Gets user by id
 * @returns user or null if doesn't exist
 */
export async function getById(db : PrismaClient, id: number) : Promise<User | null>
{
    return db.user.findUnique({ //can be only used to search by unique columns
        where: {
            id: id,
        }
    });
}

/**
 * Gets user by username (login)
 * @returns user or null if doesn't exist
 */
 export async function getByUsername(db : PrismaClient, username: string) : Promise<User | null>
 {
    return db.user.findFirst({
        where: {
            user_name: username,
        }
    });
 }

 /**
 * Creates a user.
 * Name is mocked from username (login)
 * Stores password in password_hash field and password-hashing-related fields are mocked just so that they are not null
 * @returns newly created user
 */
export async function insert(db : PrismaClient, username: string, password: string) : Promise<User>
  {
    let user: Prisma.UserCreateInput;
    user = {
        user_name: username,
        password_hash: password,
        name: username,
        salt: "saltsalt",
        algorithm: "fakehash"
    }
    return db.user.create({
        data: user
    });
}
