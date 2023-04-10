import { z } from 'zod';
import { superValidate, setError } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
const schema = z.object({
  name: z.string().min(1, {
    message: 'Enter your name'
  }),
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'Your password must be at least 6 characters long'
  }),
  confirmPassword: z.string().min(6, {
    message: 'Confirm your password'
  })
});

export const load = (async (event) => {
  // Server API:
  const form = await superValidate(event, schema);

  // Always return { form } in load and form actions.
  return { form };
}) satisfies PageServerLoad;

export const actions = {
  default: async (event) => {
    // Same syntax as in the load function
    const form = await superValidate(event, schema);
    console.log('POST', form);

    // Convenient validation check:
    if (!form.valid) {
      return fail(400, { form });
    }

    if (form.data.password !== form.data.confirmPassword) {
      setError(form, 'confirmPassword', 'Passwords do not match');
      return fail(400, { form });
    }

    // Throwing redirect to login with email prefilled
    throw redirect(302, '/login?email=' + form.data.email)
  }
} satisfies Actions;