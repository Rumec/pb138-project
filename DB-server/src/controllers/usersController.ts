import { PrismaClient } from "@prisma/client";
import express from "express";
import * as usersLoader from "./../dataAccess/usersLoader";

/**
 * Registers an user
 * Required query parameters: "username", "password", "passwordConfirm"
 * Success conditions:
 * - password and passwordConfirm must match
 * - username must not be already used by a different user
 * 
 * Handles HTTP POST method on route: "/api/user/registration
 * @returns newly created user object (contains id)
 */
export async function register(db: PrismaClient, req: express.Request, res: express.Response): Promise<any> {
    const username = req.query.username as string;
    const password = req.query.password as string;
    const passwordConfirm = req.query.passwordConfirm as string;

    if (!username || !password || !passwordConfirm) {
        res.status(400).end();
        return;
    }

    if (password != passwordConfirm) {
        res.statusMessage = "Passwords mismatch.";
        res.status(422).end(); //Unprocessable Entity
        return;
    }

    const existingUser = await usersLoader.getByUsername(db, username);
    if (existingUser) {
        res.statusMessage = "User with given username already exists.";
        res.status(409).end(); //Conflict
        return;
    }

    const user = await usersLoader.insert(db, username, password);
    res.send(JSON.stringify(user));
}

/**
* Logs in a user
* Required query parameters: "username", "password"
* Success conditions:
* - matching user for given username and password combination exists in db
* 
* Handles HTTP POST method on route: "/api/user/login
* @returns user object
*/
export async function login(db: PrismaClient, req: express.Request, res: express.Response): Promise<any> {
    const username = req.query.username as string;
    const password = req.query.password as string;

    if (!username || !password) {
        res.status(400).end(); //Bad Request
        return;
    }

    const user = await usersLoader.getByUsername(db, username);
    
    if (!user) {
        res.statusMessage = "User with given username does not exist.";
        res.status(404).end(); //Not Found
        return;
    }

    if (password != user.password_hash) {
        //wrong password
        res.status(401).end(); //Unauthorized
        return;
    }

    res.send(JSON.stringify(user));
}