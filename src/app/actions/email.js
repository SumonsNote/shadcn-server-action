"use server";

import { EmailTemplate } from "@/components/email-template";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { Subscriber } from "../model/subs-model";

const resend = new Resend(process.env.RESEND_API);

export async function sendEmail(formData) {
  try {
    const email = formData["email"];
    const fullName = formData["fullName"];

    if (!email) return null;

    const foundSubscriber = await Subscriber.findOne({
      email: email,
    }).lean();

    if (!foundSubscriber) {
      const subscribersPayload = {
        name: fullName,
        email,
      };

      await Subscriber.create(subscribersPayload);

      const message = `Dear ${fullName}, Thank you for subscribing to tapaScript's Newsletter. The door towards the abundance of knowldge is now open. Enjoy.`;

      const sendInfo = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Congratulations! You have subscribed to snote's Newsletter.",
        react: EmailTemplate({ message }),
      });
    } else {
      throw new Error(`${email} already subscribed.`);
    }

    revalidatePath("/");
  } catch (error) {
    throw new Error(error.message);
  }
}
