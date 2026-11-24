import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TEST_ACCOUNTS, TEST_PASSWORD } from "@/lib/test-accounts";
import { COMPANIES } from "./companies";

// Re-running the seed resets the test accounts to their initial state.
for (const account of TEST_ACCOUNTS) {
  await prisma.user.deleteMany({ where: { email: account.email } });
  await prisma.devMail.deleteMany({ where: { to: account.email } });

  const { headers, response } = await auth.api.signUpEmail({
    body: { email: account.email, password: TEST_PASSWORD, name: account.name },
    returnHeaders: true,
  });
  const userId = response.user.id;

  if (account.app || account.email2fa) {
    const cookie = headers
      .getSetCookie()
      .map((value) => value.split(";")[0])
      .join("; ");
    // Creates the TOTP secret and the recovery codes.
    await auth.api.enableTwoFactor({ body: { password: TEST_PASSWORD }, headers: new Headers({ cookie }) });
    // There is no enrollment screen in this exercise, so the factors are marked as set up here.
    // An unverified TOTP secret is not offered at sign-in: that is the "email only" account.
    await prisma.twoFactor.updateMany({ where: { userId }, data: { verified: account.app } });
    await prisma.user.update({
      where: { id: userId },
      data: { twoFactorEnabled: true, emailTwoFactorEnabled: account.email2fa },
    });
  }

  await prisma.session.deleteMany({ where: { userId } });
  console.log(`seeded ${account.email}`);
}

// The cards behind the auth screens. Replaced wholesale, like the accounts above.
await prisma.company.deleteMany();
const { count } = await prisma.company.createMany({ data: COMPANIES });
console.log(`seeded ${count} companies`);

await prisma.$disconnect();
