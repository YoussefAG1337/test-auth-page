import { getIntlayer, Locales } from "intlayer";
import Image from "next/image";

/**
 * The email is written in the language the reset was requested in. That is carried by
 * the link itself: its `callbackURL` is the localized `/reset-password` path, and the
 * default locale (English) is unprefixed.
 */
const emailLocale = (resetUrl: string) => {
  const callback = URL.canParse(resetUrl) ? new URL(resetUrl).searchParams.get("callbackURL") : null;
  return callback?.startsWith("/fr/") ? Locales.FRENCH : Locales.ENGLISH;
};

// Node 500:97: the 720px email as the user would receive it. A server component, so it
// reads its strings with getIntlayer rather than the hook.
export function ResetPasswordEmail({ resetUrl }: { resetUrl: string }) {
  const locale = emailLocale(resetUrl);
  const content = getIntlayer("reset-email", locale);

  return (
    <article
      lang={locale}
      className="flex w-full max-w-[720px] flex-col items-center gap-xl bg-[linear-gradient(162.69deg,#4b408c_0%,#272149_50%,#17132a_100%)] px-[100px] py-4xl text-center"
    >
      <div className="flex items-center gap-s">
        <Image src="/email/stolos-mark.svg" alt="" width={20} height={24} />
        <p className="text-ms font-semibold leading-6 text-white/90">Stolos</p>
      </div>

      <div className="relative flex w-full flex-col items-center gap-4xl overflow-clip rounded-m border border-white/[0.08] bg-black/30 px-xl py-4xl shadow-[0px_6px_16px_0px_rgba(0,0,0,0.16),0px_1px_5px_0px_rgba(0,0,0,0.2)]">
        <Image
          src="/email/watermark.svg"
          alt=""
          width={167}
          height={204}
          className="absolute -bottom-[76px] left-1/2 -translate-x-1/2"
        />

        <h1 className="relative text-m font-semibold leading-[30px] text-white">{content.heading}</h1>

        <a
          href={resetUrl}
          className="relative rounded-xs bg-primary-400 px-m py-sm text-s leading-5 text-white/90 transition-colors hover:bg-primary-300"
        >
          {content.cta}
        </a>

        <div className="relative flex w-full flex-col gap-xl">
          <div className="flex flex-col gap-sm">
            <p className="text-s leading-6 text-white/60">{content.body}</p>
            <p className="text-sx leading-5 text-white/40">{content.ignore}</p>
          </div>
          <p className="text-xs leading-[18px] text-white/40">
            {content.copyLink}
            <br />
            <a href={resetUrl} className="break-all text-[#e1c3ff]">
              {resetUrl}
            </a>
          </p>
        </div>
      </div>

      <p className="text-sx leading-5 text-white/40">
        {content.footerBefore}
        <span className="text-white/60 underline">Histia</span>
        {content.footerAfter}
      </p>
    </article>
  );
}
