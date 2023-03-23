// Import React and the styles module
import React from "react";
import styles from "./NavBar.module.css";

// Define the NavBar function component
function NavBar({ title, setTitle }) {
  // Return a navigation bar JSX element
  return (
    <nav>
      <ul className={styles.NavBarContainer}>
        {/* An image element */}
        <img
          className={styles.GoogleDocLogo}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Google_Docs_logo_%282014-2020%29.svg/1481px-Google_Docs_logo_%282014-2020%29.svg.png"
          alt="googledoclogo"
        />
        {/* An input element */}
        <input
          className={styles.NavList}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* A menu bar element with several items */}
        <div className={styles.MenuBar}>
          <p className={styles.MenuItem}>File</p>
          <p className={styles.MenuItem}>Edit</p>
          <p className={styles.MenuItem}>View</p>
          <p className={styles.MenuItem}>Insert</p>
          <p className={styles.MenuItem}>Format</p>
          <p className={styles.MenuItem}>Help</p>
        </div>
      </ul>
    </nav>
  );
}

// Export the NavBar component as the default export
export default NavBar;
