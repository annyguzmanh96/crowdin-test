import { Suspense, useState } from "react";

import i18n from "i18next";
import { useTranslation, initReactI18next, Trans } from "react-i18next";
import HttpBackend from "i18next-http-backend";

import "./App.css";

i18n
  .use(initReactI18next)
  .use(HttpBackend)
  .init({
    backend: { loadPath: "/translations/{{lng}}.json" },
    lng: "es",
    fallbackLng: "es",
    interpolation: { escapeValue: false },
  });

const App = () => {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);
  const onChange = (event) => {
    i18n.changeLanguage(event.target.value);
    setCount((previousCount) => previousCount + 1);
  };

  console.log(count);
  return (
    <Suspense fallback={"Loading..."}>
      <div className="App">
        <header className="App-header">
          <h1>{t("Bienvenido")}</h1>
          <p>
            <Trans components={{ bold: <strong />, italic: <i /> }}>
              Texto ejemplo
            </Trans>
          </p>
          <p>{t("Cambios", { count })}</p>
          <select name="language" onChange={onChange}>
            <option value="es">Español</option>
            <option value="en">Inglés</option>
            <option value="fr">Francés</option>
          </select>
        </header>
      </div>
    </Suspense>
  );
};

export default App;
