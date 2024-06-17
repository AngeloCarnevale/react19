"use server";

import { verifySession } from "../_lib/session";

export async function myAction() {
    const session = await verifySession()

    
}
