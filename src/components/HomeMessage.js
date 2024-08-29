import Link from "next/link";
import ButtonSupport from "./ButtonSupport";

const HomeMessage = () => {
  return (
    <div className="containerHomeMessage">
      <h4 className="title">#PamerAjaDulu</h4>
      <p className="subtitle">
        Jangan sungkan untuk "<b>memamerkan</b>" karya Anda 🚀
      </p>
      <p className="subtitle">
        Terinspirasi dari{" "}
        <Link
          href="https://twitter.com/aria_ghora/status/1707257423818596377"
          target="_blank"
        >
          cuitan ini
        </Link>
      </p>
      {/* <p>
        Nemu bug? Boleh bisikin{" "}
        <Link href="https://twitter.com/depapp" target="_blank">
          disini
        </Link>{" "}
        ya 🙇🏻‍♂️
      </p> */}
      <div style={{ display: 'flex', justifyContent: 'left' }}>
        <Link href="https://github.com/depapp/PamerAjaDulu" target="_blank">
          <ButtonSupport>Dukung proyek ini</ButtonSupport>
        </Link>
      </div>
    </div>
  );
};

export default HomeMessage;
