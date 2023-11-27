import { useEffect, useState } from "react";

const version = "v1";

export default function useTableSettings() {
  const [settings, setSettings] = useState({
    persistTableHead: false,
    dense: false,
    responsive: true,
    fixedHeader: false,
  });

  useEffect(() => {
    if (localStorage.getItem(version + "_tableSettings")) {
      setSettings(JSON.parse(localStorage.getItem(version + "_tableSettings")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(version + "_tableSettings", JSON.stringify(settings));
  }, [settings]);

  const onSettingsChange = (e) => {
    setSettings({ ...settings, [e]: !settings[e] });
  };

  return {
    settings,
    onSettingsChange,
  };
}
