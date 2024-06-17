"use client";

import { signup } from "./actions";
import { useActionState } from "react";

export function SignUpForm() {
  const [state, action, pending] = useActionState(signup, { errors: {} });
  console.log("state: ", state);
  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your information to create an account
        </p>
      </div>
      <form className="space-y-4" action={action}>
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
          >
            Name
          </label>
          <input
            name="name"
            placeholder="John Doe"
            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400 dark:ring-gray-700 dark:focus:ring-indigo-500"
          />
          {state?.errors.name && (
            <p className="text-red-600">{state.errors.name}</p>
          )}
        </div>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
          >
            Email
          </label>
          <input
            name="email"
            placeholder="m@example.com"
            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400 dark:ring-gray-700 dark:focus:ring-indigo-500"
          />
          {state?.errors.email && (
            <p className="text-red-600">{state.errors.email}</p>
          )}
        </div>
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
          >
            Password
          </label>
          <input
            name="password"
            type="password"
            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400 dark:ring-gray-700 dark:focus:ring-indigo-500"
          />
          {state?.errors.password && (
            <p className="text-red-600">{state.errors.password}</p>
          )}
        </div>
        <button
          disabled={pending}
          type="submit"
          className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
        >
          {pending ? "Submiting..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
