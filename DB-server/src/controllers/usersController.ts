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
 export async function register(db: PrismaClient, req: express.Request, res: express.Response) : Promise<any>
 {
    const username = req.query.username as string;
    const password = req.query.password as string;
    const passwordConfirm = req.query.passwordConfirm as string;

    if(!username || !password || !passwordConfirm){
        res.status(400).end();
        return;
    }

    if(password != passwordConfirm){
        res.statusMessage = "Passwords mismatch";
        res.status(422).end(); //Unprocessable Entity
        return;
    }

    const existingUser = await usersLoader.getByUsername(db, username);
    if(existingUser){
        res.statusMessage = "User with given login already exists";
        res.status(409).end(); //Conflict
        return;
    }

    const user = await usersLoader.insert(db, username, password);
    res.send(JSON.stringify(user));
 }