import Hamburger from "hamburger-react";
import { useState } from "react";
import styles from "./SlideMenu.module.css";

export default function SlideMenu({ children }) {
  const [visibility, setVisibility] = useState(styles.hidden);
  const [menuOpen, setMenuOpen] = useState(false);

  function animateMenuDrawer() {
    if (visibility === styles.visible) setVisibility(styles.hidden);
    else setVisibility(styles.visible);
  }

  return (
    <>
      <div className={styles.button}>
        <Hamburger
          toggled={menuOpen}
          toggle={setMenuOpen}
          onToggle={animateMenuDrawer}
        />
      </div>
      <div className={` ${styles.container} ${visibility}`}>{children}</div>
    </>
  );
}
