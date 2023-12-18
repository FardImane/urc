// components/ThemeSwitcher.tsx
import {useTheme} from "next-themes";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      The current theme is: {theme}
      <button onClick={() => setTheme('light')}>Light </button> <br />
      <button onClick={() => setTheme('dark')}>Dark </button>
    </div>
  )
};