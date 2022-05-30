import SlideMenu from "../components/SlideMenu";
import Link from "next/link";

import styles from "./Navigation.module.css";

export default function Navigation({ session }) {
  return (
    <div className={styles.navContainer}>
      <nav className="container max-w-600px">
        <div className="row">
          <div className="text-center d-inline-block col-9 h-100">
            <img src="/banner.jpeg" className={styles.bannerImg} />
          </div>
          {/* <div className="col-3" /> */}
        </div>
        <div style={{ width: "300px" }}>
          <SlideMenu>
            <div>
              <Link href={`/${session ? "logout" : "login"}`}>
                <a className="menu-item">&gt; {session ? "Logout" : "Login"}</a>
              </Link>
            </div>
            <div>
              <Link href="/">
                <a className="menu-item">&gt; All Events</a>
              </Link>
            </div>
          </SlideMenu>
        </div>
      </nav>
    </div>
  );
}
